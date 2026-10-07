import React, { useEffect, useId, useLayoutEffect, useMemo, useRef, useState } from 'react';
import JsBarcode from 'jsbarcode';
import { encode } from 'uqr';
import { calculateTotals, formatOrderDate, moneyFormatter } from './receipt.js';
import { parsePrinterMarkup } from './printerMarkup.js';
import { normalizeTicket } from './simpleTicket.js';
import { tearAxis, tearThreshold, tearTravel, tearMotion, tearFrame, tearFlight, stepPaperSpring, feedDuration } from './tearGesture.js';
import { rasterizePaper, paintPaper } from './paperSurface.js';
import './VirtualPrinter.css';

const useIsomorphicLayoutEffect = typeof window === 'undefined' ? useEffect : useLayoutEffect;
const PRINT_FALLBACK_MS = 3400;
const TEAR_FALLBACK_MS = 900;

function PrinterIcon() {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
    <path d="M6 8V3h12v5M6 17H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" />
    <path d="M6 14h12v7H6zM17 11h1" />
  </svg>;
}

function Barcode({ value }) {
  const element = useRef(null);
  useIsomorphicLayoutEffect(() => {
    JsBarcode(element.current, value, {
      format: 'CODE128', displayValue: false, height: 34, width: 2,
      margin: 10, background: '#171717', lineColor: '#ffffff',
    });
  }, [value]);
  return <svg className="vp-barcode" ref={element} preserveAspectRatio="none" role="img" aria-label={`Authorization barcode ${value}`} />;
}

function MarkupLogo({ logo }) {
  if (logo && typeof logo === 'string') return <img className="vp-markup-logo-image" src={logo} alt="" />;
  return logo || <span className="vp-markup-logo-mark" aria-hidden="true" />;
}

function QrCode({ text }) {
  const path = useMemo(() => {
    try {
      const qr = encode(text || ' ', { ecc: 'M', border: 2 });
      const commands = [];
      qr.data.forEach((row, y) => {
        row.forEach((dark, x) => {
          if (dark) commands.push(`M${x} ${y}h1v1h-1z`);
        });
      });
      return { d: commands.join(''), size: qr.size };
    } catch {
      return null;
    }
  }, [text]);
  if (!path) return <span className="vp-markup-qr-box" aria-hidden="true">QR</span>;
  return <svg className="vp-markup-qr-svg" viewBox={`0 0 ${path.size} ${path.size}`} aria-hidden="true"><path d={path.d} /></svg>;
}

function MarkupText({ part }) {
  const className = [part.bold && 'vp-markup-bold', part.right && 'vp-markup-part--right'].filter(Boolean).join(' ');
  if (!part.doubleHeight && !part.doubleWidth) return <span className={className || undefined}>{part.text}</span>;
  const columns = Array.from(part.text).length * (part.doubleWidth ? 2 : 1);
  const sized = part.doubleHeight && part.doubleWidth ? 'vp-markup-double' : part.doubleHeight ? 'vp-markup-double-height' : 'vp-markup-double-width';
  return <span className={`${sized} ${className}`.trim()} style={{ width: `${columns}ch` }}><span>{part.text}</span></span>;
}

function MarkupPart({ part, logo }) {
  if (part.type === 'logo') return <span className="vp-markup-logo"><MarkupLogo logo={logo} /></span>;
  if (part.type === 'qr') {
    return <span className={`vp-markup-qr ${part.center ? 'vp-markup-qr--center' : ''} ${part.right ? 'vp-markup-qr--right' : ''}`} role="img" aria-label={`QR code: ${part.text || 'empty'}`}>
      <QrCode text={part.text} />
      <code className="vp-markup-qr-value">{part.text}</code>
    </span>;
  }
  if (part.type === 'control') {
    return <span className={`vp-markup-control vp-markup-control--${part.control}`} role="img" aria-label={part.control === 'cut' ? 'Paper cut' : 'Printer plugin command'} />;
  }
  return <MarkupText part={part} />;
}

function MarkupPaper({ content, logo }) {
  const lines = parsePrinterMarkup(content);
  return <div className="vp-markup-content" role="document" aria-label="Printer document">
    {lines.map((line, lineIndex) => <div className={`vp-markup-line ${line.center ? 'vp-markup-line--center' : ''} ${line.right ? 'vp-markup-line--right' : ''}`} key={lineIndex}>
      {line.parts.map((part, partIndex) => <MarkupPart part={part} logo={logo} key={partIndex} />)}
    </div>)}
  </div>;
}

function useTabletopPrinter(enabled) {
  const [Renderer, setRenderer] = useState(null);
  useEffect(() => {
    if (!enabled) return undefined;
    let active = true;
    import('./TabletopPrinter.jsx').then(module => {
      if (active) setRenderer(() => module.TabletopPrinter);
    });
    return () => { active = false; };
  }, [enabled]);
  return enabled ? Renderer : null;
}

function TicketPaper({ ticket }) {
  const data = normalizeTicket(ticket);
  return <div className="vp-ticket-content" role="document" aria-label="Quick ticket">
    <header className="vp-ticket-heading">
      <h2>{data.title}</h2>
      {data.subtitle && <p>{data.subtitle}</p>}
    </header>
    <div className="vp-ticket-lines">
      {data.lines.map(line => <div key={line.id}>{line.text}</div>)}
    </div>
    <div className="vp-ticket-items">
      {data.items.map(item => <div className="vp-ticket-row" key={item.id}>
        <span>{item.label}</span>
        {item.amount && <strong>{item.amount}</strong>}
      </div>)}
    </div>
    {data.total && <div className="vp-ticket-total"><span>Total</span><strong>{data.total}</strong></div>}
    {data.footer && <footer className="vp-ticket-footer">{data.footer}</footer>}
  </div>;
}

/**
 * Reusable visual printer. Pass one of `receipt`, raw FEIEYUN `content`, or a
 * compact `ticket` object.
 */
export function VirtualPrinter({
  receipt,
  content,
  ticket,
  logo,
  initiallyPrinted = false,
  orientation = 'front',
  scrollable = true,
  paperMaxHeight,
  resetKey,
  onPhaseChange,
  onPrintStart,
  onPrinted,
  onTear,
  className = '',
}) {
  const hasContent = content !== undefined && content !== null;
  const hasTicket = ticket !== undefined && ticket !== null;
  const hasReceipt = receipt !== undefined && receipt !== null;
  if ([hasReceipt, hasContent, hasTicket].filter(Boolean).length !== 1) {
    throw new TypeError('VirtualPrinter requires exactly one of receipt, content, or ticket.');
  }
  if (hasContent && typeof content !== 'string') throw new TypeError('content must be a string.');
  if (hasReceipt && (typeof receipt !== 'object' || Array.isArray(receipt))) throw new TypeError('receipt must be an object.');
  if (orientation !== 'front' && orientation !== 'up') throw new TypeError('orientation must be "front" or "up".');
  const headingId = useId();
  const statusId = useId();
  const nextId = useRef(0);
  const printButton = useRef(null);
  const paperScroll = useRef(null);
  const drag = useRef(null);
  const flex = useRef(null);
  const flexFrame = useRef(0);
  const flexTimer = useRef(0);
  const surfaceCanvas = useRef(null);
  const bitmap = useRef(null);
  const [preparingPaper, setPreparingPaper] = useState(false);
  const previousResetKey = useRef(resetKey);
  const previousPhase = useRef(initiallyPrinted ? 'printed' : 'ready');
  const [job, setJob] = useState(() => ({
    id: 0, phase: initiallyPrinted ? 'printed' : 'ready', receipt: hasContent || hasTicket ? null : receipt,
    content: hasContent ? content : null, ticket: hasTicket && !hasContent ? ticket : null,
  }));
  const printing = job.phase === 'printing';
  const tearing = job.phase === 'tearing';
  const source = job.phase === 'ready' ? {
    receipt: hasContent || hasTicket ? null : receipt,
    content: hasContent ? content : null,
    ticket: hasTicket && !hasContent ? ticket : null,
  } : job;
  const data = source.receipt;
  const isMarkup = source.content !== null;
  const isTicket = !isMarkup && source.ticket !== null;
  const isScrollable = scrollable !== false;
  const Tabletop = useTabletopPrinter(orientation === 'up');
  let receiptView = null;
  if (!isMarkup && !isTicket) {
    try {
      if (!data?.merchant || !data.payment) throw new TypeError('Receipt is missing merchant or payment.');
      if (typeof data.payment.authorization !== 'string' || data.payment.authorization.length === 0) {
        throw new TypeError('Receipt authorization must be a nonempty string.');
      }
      receiptView = {
        data,
        totals: calculateTotals(data.items, data.taxBasisPoints),
        money: moneyFormatter(data.locale, data.currency),
        taxRate: new Intl.NumberFormat(data.locale, { maximumFractionDigits: 2 }).format(data.taxBasisPoints / 100),
        issued: formatOrderDate(data.issuedAt, data.locale, data.timeZone),
      };
    } catch (error) {
      receiptView = { error: error instanceof Error ? error.message : 'This receipt could not be printed.' };
    }
  }
  const statusText = printing ? 'Printing your receipt' : tearing ? 'Tearing off receipt' : job.phase === 'printed' ? 'Receipt printed' : 'Ready to print';

  useEffect(() => {
    const previous = previousPhase.current;
    if (previous !== job.phase) {
      onPhaseChange?.(job.phase);
      if (job.phase === 'printing') onPrintStart?.();
      if (job.phase === 'printed') onPrinted?.();
      if (job.phase === 'ready' && previous === 'tearing') onTear?.();
    }
    previousPhase.current = job.phase;
  }, [job.phase, onPhaseChange, onPrintStart, onPrinted, onTear]);

  useIsomorphicLayoutEffect(() => {
    if (previousResetKey.current === resetKey) return;
    stopFlex();
    previousResetKey.current = resetKey;
    drag.current = null;
    paperScroll.current?.closest('.vp')?.removeAttribute('data-dragging');
    paperScroll.current?.removeAttribute('data-tear-axis');
    paperScroll.current?.parentElement?.style.removeProperty('--vp-tear-time');
    nextId.current = 0;
    setJob(current => ({ ...current, id: 0, phase: 'ready' }));
  }, [resetKey]);

  useIsomorphicLayoutEffect(() => {
    const paper = paperScroll.current?.querySelector('.vp-paper');
    const markup = paper?.querySelector('.vp-markup-content');
    if (!markup || tearing) return;
    let lastWidth = 0, lastFont = 0, frame = 0;
    const fitText = () => {
      const width = markup.clientWidth;
      const baseFont = parseFloat(getComputedStyle(paper).fontSize);
      if (width <= 1 || !Number.isFinite(baseFont) || (width === lastWidth && baseFont === lastFont)) return;
      lastWidth = width;
      lastFont = baseFont;
      markup.style.fontSize = `${baseFont}px`;
      let widest = width;
      for (const line of markup.children) widest = Math.max(widest, line.scrollWidth);
      if (widest > width) markup.style.fontSize = `${baseFont * (width - 1) / widest}px`;
    };
    fitText();
    if (typeof ResizeObserver === 'undefined') return;
    // Fitting changes the observed height; defer resize writes to avoid observer loops.
    const observer = new ResizeObserver(() => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(fitText);
    });
    observer.observe(paper);
    return () => { observer.disconnect(); cancelAnimationFrame(frame); };
  }, [source.content, logo, orientation, job.id, job.phase]);

  useIsomorphicLayoutEffect(() => {
    const article = paperScroll.current?.querySelector('.vp-paper');
    const canvas = surfaceCanvas.current;
    if (job.phase === 'ready' || !article) {
      setPreparingPaper(false);
      return;
    }
    try {
      if (!canvas.getContext('2d')) { setPreparingPaper(false); return; }
    } catch { setPreparingPaper(false); return; }
    let cancelled = false, version = 0, frame = 0, dimensions = '';
    const refresh = async () => {
      const next = `${article.offsetWidth}:${article.offsetHeight}`;
      if (cancelled || !article.offsetWidth || !article.offsetHeight || dimensions === next) return;
      dimensions = next;
      const currentVersion = ++version;
      drag.current = null;
      stopFlex();
      article.removeAttribute('data-raster-ready');
      if (bitmap.current) bitmap.current.texture.width = 0;
      bitmap.current = null;
      setPreparingPaper(article.closest('.vp').dataset.phase === 'printing');
      // Slow or inaccessible assets must not leave printing stuck.
      const timer = window.setTimeout(() => {
        if (!cancelled && currentVersion === version) { version++; setPreparingPaper(false); }
      }, 5000);
      try {
        const result = await rasterizePaper(article);
        if (cancelled || currentVersion !== version) { result.texture.width = 0; return; }
        bitmap.current = result;
        paintPaper(canvas, result, flex.current || { direction: orientation === 'up' ? -1 : 1 });
        article.dataset.rasterReady = 'true';
      } catch {
        // Keep the complete DOM sheet visible when browser capture is unavailable.
        if (!cancelled && currentVersion === version) {
          if (bitmap.current) bitmap.current.texture.width = 0;
          bitmap.current = null;
          article.removeAttribute('data-raster-ready');
          canvas.width = canvas.height = 1;
        }
      } finally {
        window.clearTimeout(timer);
        if (!cancelled && currentVersion === version) setPreparingPaper(false);
      }
    };
    refresh();
    const observer = typeof ResizeObserver === 'undefined' ? null : new ResizeObserver(() => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(refresh);
    });
    observer?.observe(article);
    return () => {
      cancelled = true;
      observer?.disconnect();
      cancelAnimationFrame(frame);
      article.removeAttribute('data-raster-ready');
      if (bitmap.current) bitmap.current.texture.width = 0;
      bitmap.current = null;
      canvas.width = canvas.height = 1;
    };
  }, [job.id, job.phase === 'ready', orientation, logo, source.content, source.receipt, source.ticket]);

  useIsomorphicLayoutEffect(() => {
    if (!printing) return;
    const paper = paperScroll.current;
    let measuredDuration = false;
    const updateHeight = () => {
      const printer = paper.closest('.vp');
      if (!measuredDuration) {
        const base = getComputedStyle(printer).getPropertyValue('--vp-feed-duration').trim();
        const baseMs = parseFloat(base) * (base.endsWith('ms') ? 1 : 1000);
        const height = paper.querySelector('.vp-paper').offsetHeight;
        printer.style.setProperty('--vp-feed-time', `${feedDuration(Number.isFinite(baseMs) ? baseMs : orientation === 'front' ? 1900 : 2800, height)}ms`);
        measuredDuration = true;
      }
      if (orientation === 'up') printer?.style.setProperty('--vp-full-paper-height', `${paper.scrollHeight}px`);
      else {
        printer?.style.setProperty('--vp-full-paper-height', `${paper.querySelector('.vp-paper').offsetHeight}px`);
        printer?.style.setProperty('--vp-feed-visible-height', `${paper.getBoundingClientRect().height}px`);
      }
    };
    updateHeight();
    if (typeof ResizeObserver === 'undefined') return;
    const observer = new ResizeObserver(updateHeight);
    observer.observe(paper);
    if (orientation === 'front') observer.observe(paper.querySelector('.vp-paper'));
    return () => observer.disconnect();
  }, [orientation, isScrollable, printing, job.id]);

  useIsomorphicLayoutEffect(() => {
    if (job.phase === 'printed' && previousPhase.current === 'printing' && orientation === 'up' && isScrollable) {
      const paper = paperScroll.current;
      paper.scrollTop = paper.scrollHeight - paper.clientHeight;
    }
  }, [job.phase, orientation, isScrollable]);

  useEffect(() => () => stopFlex(), []);
  useIsomorphicLayoutEffect(() => {
    drag.current = null;
    paperScroll.current?.closest('.vp')?.removeAttribute('data-dragging');
    stopFlex();
  }, [orientation, isScrollable]);

  function stopFlex() {
    cancelAnimationFrame(flexFrame.current);
    window.clearTimeout(flexTimer.current);
    flexFrame.current = 0;
    flexTimer.current = 0;
    const current = flex.current;
    if (!current) return;
    for (const node of [current.paper, surfaceCanvas.current?.parentElement]) {
      node?.style.removeProperty('transform');
      node?.style.removeProperty('opacity');
      node?.style.removeProperty('transform-origin');
    }
    current.root.removeAttribute('data-flexing');
    current.root.removeAttribute('data-dragging');
    current.article.style.removeProperty('--vp-scroll-offset');
    current.article.style.removeProperty('--vp-cut-top');
    current.article.style.removeProperty('--vp-cut-bottom');
    current.paper.style.removeProperty('--vp-viewport-height');
    if (bitmap.current) paintPaper(surfaceCanvas.current, bitmap.current, { direction: current.direction });
    current.paper.scrollTop = current.scrollTop;
    flex.current = null;
  }

  function prepareFlex(gesture) {
    stopFlex();
    const paper = paperScroll.current;
    const article = paper.querySelector('.vp-paper');
    const bounds = article.getBoundingClientRect();
    const viewport = paper.getBoundingClientRect();
    const direction = orientation === 'up' ? -1 : 1;
    // Measure the outlet before changing overflow; the scroll viewport stays put during a pull.
    const anchor = Math.max(0, Math.min(bounds.height, (direction < 0 ? viewport.bottom : viewport.top) - bounds.top));
    const start = isScrollable ? Math.max(0, viewport.top - bounds.top) : 0;
    const end = isScrollable ? Math.min(bounds.height, viewport.bottom - bounds.top) : bounds.height;
    const lever = Math.max(48, Math.abs(gesture.y - bounds.top - anchor));
    const grip = bounds.width ? Math.max(0, Math.min(1, ((gesture.x ?? bounds.left + bounds.width / 2) - bounds.left) / bounds.width)) : .5;
    const root = paper.closest('.vp');
    paper.style.setProperty('--vp-viewport-height', `${viewport.height}px`);
    article.style.setProperty('--vp-scroll-offset', `${-gesture.scrollTop}px`);
    root.dataset.flexing = 'true';
    flex.current = { paper, article, root, width: bounds.width, height: bounds.height, anchor, start, end, lever, grip, direction,
      scrollTop: gesture.scrollTop, x: 0, y: 0, vx: 0, vy: 0, targetX: 0, targetY: 0, last: performance.now() };
    paintFlex();
  }

  function paintFlex() {
    const current = flex.current;
    if (!current) return;
    if (bitmap.current) paintPaper(surfaceCanvas.current, bitmap.current, current);
  }

  function animateFlex() {
    const now = performance.now();
    cancelAnimationFrame(flexFrame.current);
    window.clearTimeout(flexTimer.current);
    flexFrame.current = 0;
    flexTimer.current = 0;
    const current = flex.current;
    if (!current) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      requestFlexFrame();
      return;
    }
    if (current.tearAt) {
      current.tearProgress = (now - current.tearAt) / current.tearDuration;
      if (current.tearProgress >= 1) { finishTear(); return; }
      const motion = tearFrame(current.tearProgress);
      current.targetX = current.tearPullX * (1 - motion.release * .85) - current.tearSide * motion.flutter * 7;
      current.targetY = current.tearPullY * (1 - motion.release);
      const flight = tearFlight(current.tearProgress, current.tearMotion);
      const target = bitmap.current ? surfaceCanvas.current.parentElement : current.paper;
      target.style.transformOrigin = `${current.width * current.grip}px ${bitmap.current ? current.anchor : current.direction > 0 ? 0 : current.paper.clientHeight}px`;
      target.style.transform = `translate(${flight.x}px, ${flight.y}px) rotate(${flight.rotation}deg)`;
      target.style.opacity = flight.opacity;
    }
    const dt = (now - current.last) / 1000;
    current.last = now;
    const x = stepPaperSpring(current.x, current.vx, current.targetX, dt);
    const y = stepPaperSpring(current.y, current.vy, current.targetY, dt);
    current.x = x.value; current.vx = x.velocity;
    current.y = y.value; current.vy = y.velocity;
    paintFlex();
    const settled = Math.abs(current.x - current.targetX) + Math.abs(current.y - current.targetY) < .1 && Math.abs(current.vx) + Math.abs(current.vy) < 1;
    if (!settled || current.tearAt) requestFlexFrame(true);
    else if (!drag.current) stopFlex();
  }

  function requestFlexFrame(continuing = false) {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      const current = flex.current;
      current.x = current.targetX;
      current.y = current.targetY;
      current.vx = 0;
      current.vy = 0;
      paintFlex();
      if (!drag.current) stopFlex();
      return;
    }
    if (!flexFrame.current) {
      if (!continuing) flex.current.last = performance.now();
      flexFrame.current = requestAnimationFrame(animateFlex);
      // Some visible webviews throttle rAF; keep the texture in step with CSS motion.
      if (document.visibilityState === 'visible') flexTimer.current = window.setTimeout(animateFlex, 32);
    }
  }

  useIsomorphicLayoutEffect(() => {
    if (!tearing) return;
    // The tear animation now owns the transform. Dropping the drag flag before paint avoids a snap-back frame.
    paperScroll.current?.closest('.vp')?.removeAttribute('data-dragging');
  }, [tearing]);

  function finishTear() {
    const paper = paperScroll.current;
    const root = paper?.closest('.vp');
    // Hide the sheet before the tear animation is cancelled, or it pops back to full opacity.
    if (root?.dataset.phase === 'tearing') root.dataset.phase = 'ready';
    stopFlex();
    drag.current = null;
    root?.removeAttribute('data-dragging');
    paper?.removeAttribute('data-tear-axis');
    paper?.parentElement?.style.removeProperty('--vp-tear-time');
    setJob(current => current.phase === 'tearing' ? { ...current, phase: 'ready' } : current);
  }

  function startTear(motion) {
    if (job.phase !== 'printed') return;
    const paper = paperScroll.current;
    if (!flex.current) {
      const bounds = paper.getBoundingClientRect();
      prepareFlex({ scrollTop: paper.scrollTop, y: bounds.top + bounds.height * (orientation === 'up' ? .35 : .65) });
      flex.current.targetX = 24;
      flex.current.targetY = orientation === 'up' ? -6 : 6;
    }
    const release = motion?.duration ? motion : tearMotion(orientation, 24, .5, 0, flex.current.grip);
    paper.parentElement.style.setProperty('--vp-tear-time', `${release.duration}ms`);
    flex.current.tearDuration = release.duration;
    flex.current.tearMotion = release;
    flex.current.tearSide = Math.sign(release.x);
    flex.current.tearPullX = flex.current.targetX;
    flex.current.tearPullY = flex.current.targetY;
    flex.current.article.style.setProperty('--vp-cut-top', orientation === 'front' ? `${flex.current.anchor}px` : '-100vh');
    flex.current.article.style.setProperty('--vp-cut-bottom', orientation === 'up' ? `${flex.current.height - flex.current.anchor}px` : '-100vh');
    flex.current.tearAt = performance.now();
    requestFlexFrame();
    setJob(current => current.phase === 'printed' ? { ...current, phase: 'tearing' } : current);
  }

  function movePaper(event) {
    const gesture = drag.current;
    if (!gesture || gesture.id !== event.pointerId) return 0;
    const direction = orientation === 'up' ? -1 : 1;
    const sideways = event.clientX - gesture.x;
    const vertical = event.clientY - gesture.y;
    if (!gesture.axis) gesture.axis = tearAxis(orientation, gesture.pointerType, gesture.grip, sideways, vertical);
    if (!gesture.axis || gesture.axis === 'scroll') return 0;
    if (!flex.current) prepareFlex(gesture);
    event.currentTarget.closest('.vp')?.setAttribute('data-dragging', 'true');
    const horizontal = gesture.axis === 'horizontal';
    const distance = Math.max(0, direction * vertical);
    const along = horizontal ? Math.abs(sideways) : distance;
    const threshold = tearThreshold(orientation, gesture.axis, event.currentTarget.clientWidth);
    const travel = Math.min(tearTravel(along, threshold), orientation === 'front' ? 72 : Math.max(110, event.currentTarget.clientWidth * .65));
    gesture.sideways = sideways;
    gesture.distance = along;
    const dt = Math.max(8, event.timeStamp - (gesture.lastTime || event.timeStamp));
    gesture.vx = sideways === gesture.lastX ? (gesture.vx || 0) * Math.exp(-dt / 100) : (sideways - (gesture.lastX || 0)) / dt;
    gesture.vy = vertical === gesture.lastY ? (gesture.vy || 0) * Math.exp(-dt / 100) : (vertical - (gesture.lastY || 0)) / dt;
    gesture.lastX = sideways; gesture.lastY = vertical; gesture.lastTime = event.timeStamp;
    flex.current.targetX = horizontal ? Math.sign(sideways) * travel : Math.max(-35, Math.min(35, sideways * .45));
    flex.current.targetY = direction * Math.min(14, horizontal ? travel * .08 : travel * .35);
    requestFlexFrame();
    return gesture.distance;
  }

  function releasePaper(event, cancelled = false) {
    const gesture = drag.current;
    if (!gesture || gesture.id !== event.pointerId) return;
    const distance = cancelled ? gesture.distance || 0 : movePaper(event);
    drag.current = null;
    const paper = event.currentTarget;
    if (!gesture.axis || gesture.axis === 'scroll') {
      paper.closest('.vp')?.removeAttribute('data-dragging');
      return;
    }
    const horizontal = gesture.axis === 'horizontal';
    const threshold = tearThreshold(orientation, gesture.axis, paper.clientWidth);
    if (!cancelled && distance >= threshold) {
      paper.dataset.tearAxis = horizontal ? 'horizontal' : 'vertical';
      startTear(tearMotion(orientation, gesture.sideways || 0, gesture.vx || 0, gesture.vy || 0, flex.current.grip));
      return;
    }
    paper.closest('.vp')?.removeAttribute('data-dragging');
    if (flex.current) {
      flex.current.targetX = 0;
      flex.current.targetY = 0;
      requestFlexFrame();
    }
  }

  useEffect(() => {
    if (job.phase === 'ready' && job.id > 0) printButton.current?.focus({ preventScroll: true });
  }, [job.phase, job.id]);

  useEffect(() => {
    if (paperScroll.current) paperScroll.current.scrollTop = 0;
  }, [job.id]);

  useEffect(() => {
    if (!tearing) return;
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const onMotionChange = () => { if (motion.matches) finishTear(); };
    onMotionChange();
    motion.addEventListener('change', onMotionChange);
    const duration = parseFloat(paperScroll.current?.parentElement?.style.getPropertyValue('--vp-tear-time'));
    const timer = window.setTimeout(finishTear, Number.isFinite(duration) ? duration + 200 : TEAR_FALLBACK_MS);
    return () => { window.clearTimeout(timer); motion.removeEventListener('change', onMotionChange); };
  }, [tearing]);

  function finishPrint() {
    setJob(current => current.phase === 'printing' ? { ...current, phase: 'printed' } : current);
  }

  useEffect(() => {
    if (!printing) return;
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    // Also finish if the preference changes while a receipt is feeding.
    const onMotionChange = () => { if (motion.matches) finishPrint(); };
    onMotionChange();
    motion.addEventListener('change', onMotionChange);
    // A fallback for hidden tabs or consumers overriding the animation styles.
    const measured = parseFloat(paperScroll.current?.closest('.vp')?.style.getPropertyValue('--vp-feed-time'));
    const timer = preparingPaper ? undefined : window.setTimeout(finishPrint, Number.isFinite(measured) ? measured + 700 : PRINT_FALLBACK_MS);
    return () => {
      window.clearTimeout(timer);
      motion.removeEventListener('change', onMotionChange);
    };
  }, [job.id, printing, preparingPaper]);

  function printReceipt() {
    if (printing || tearing) return;
    stopFlex();
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    setJob({ id: ++nextId.current, phase: reduceMotion ? 'printed' : 'printing', receipt: hasContent || hasTicket ? null : receipt,
      content: hasContent ? content : null, ticket: hasTicket && !hasContent ? ticket : null });
  }

  const paperStyle = paperMaxHeight == null ? undefined : {
    '--vp-paper-height': typeof paperMaxHeight === 'number' ? `${paperMaxHeight}px` : String(paperMaxHeight),
  };
  return <section className={`vp vp--${orientation} ${className}`} data-phase={job.phase} data-paper-pending={preparingPaper ? 'true' : 'false'} data-scrollable={isScrollable ? 'true' : 'false'} style={paperStyle} aria-label={`${orientation === 'up' ? 'Upward' : 'Front-feed'} virtual receipt printer`}
    onAnimationEnd={event => { if (event.animationName === 'vp-motor-feed' && event.target === event.currentTarget) finishPrint(); }}>
    <div className="vp-machine">
      <div className="vp-housing" aria-hidden="true">{Tabletop && <Tabletop phase={job.phase} />}</div>
      <div className="vp-controls" role="group" aria-label="Printer controls">
        <button ref={printButton} className="vp-print" type="button" onClick={printReceipt} disabled={printing || tearing} aria-label={printing ? 'Printing receipt' : 'Print receipt'} title={printing ? 'Printing receipt' : 'Print receipt'} aria-describedby={statusId}>
          <PrinterIcon />
          <span className="vp-sr-only">{printing ? 'Printing receipt' : 'Print receipt'}</span>
        </button>

        {(job.phase === 'printed' || tearing) && <button className="vp-tear" type="button" aria-label="Tear off receipt" title="Tear off receipt" disabled={tearing} onClick={startTear}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true"><circle cx="6" cy="6" r="3" /><circle cx="6" cy="18" r="3" /><path d="m8 8 12 12M8 16 20 4" /></svg>
        </button>}
      </div>
      <div className="vp-status" role="status" aria-live="polite" aria-atomic="true" id={statusId}>
        <span className={`vp-status-icon ${printing ? 'vp-status-icon--printing' : ''}`} aria-hidden="true" title={statusText}>
          {printing ? <span className="vp-spinner" /> : job.phase === 'printed' ?
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="12" cy="12" r="10" /><path d="m7.5 12 3 3 6-6" /></svg> : <PrinterIcon />}
        </span>
        <span className="vp-sr-only">{statusText}</span>
      </div>
      <div className="vp-slot" aria-hidden="true" />
      <div className="vp-paper-window" aria-busy={printing}>
        <div ref={paperScroll} className="vp-paper-scroll" role="region" aria-label="Receipt paper" tabIndex={job.phase === 'printed' ? 0 : undefined}
          onPointerDown={event => {
            if (drag.current || !event.isPrimary || job.phase !== 'printed') return;
            stopFlex();
            drag.current = { id: event.pointerId, x: event.clientX, y: event.clientY, scrollTop: event.currentTarget.scrollTop, pointerType: event.pointerType, grip: !!event.target.closest('.vp-paper-grip'), lastTime: event.timeStamp, lastX: 0, lastY: 0 };
            event.currentTarget.setPointerCapture(event.pointerId);
          }}
          onPointerMove={event => {
            const distance = movePaper(event);
            if (!drag.current) return;
            const horizontal = drag.current.axis === 'horizontal';
            const farPull = orientation === 'front' ? (horizontal ? 72 : 96)
              : horizontal ? Math.max(110, event.currentTarget.clientWidth * .65)
                : Math.max(120, Math.min(180, event.currentTarget.clientHeight * .45));
            if (distance >= farPull) {
              releasePaper(event);
              if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId);
            }
          }}
          onPointerUp={releasePaper}
          onPointerCancel={event => releasePaper(event, true)}
          onLostPointerCapture={event => releasePaper(event, true)}
          onKeyDown={event => {
            if (event.target !== event.currentTarget || job.phase !== 'printed') return;
            const paper = event.currentTarget;
            const offsets = { ArrowDown: 40, ArrowUp: -40, PageDown: paper.clientHeight * .9, PageUp: -paper.clientHeight * .9, Home: -paper.scrollHeight, End: paper.scrollHeight };
            if (!(event.key in offsets)) return;
            event.preventDefault();
            paper.scrollTop += offsets[event.key];
          }}>
        <article key={job.id} className={`vp-paper ${isMarkup ? 'vp-paper--markup' : isTicket ? 'vp-paper--ticket' : ''}`} aria-labelledby={isMarkup || isTicket ? undefined : headingId} aria-label={isMarkup || isTicket ? 'Printed document' : undefined} aria-hidden={job.phase === 'ready'}>
          <svg className="vp-paper-surface" aria-hidden="true">
            <foreignObject width="100%" height="100%">
              <div className="vp-paper-plane" xmlns="http://www.w3.org/1999/xhtml"><canvas ref={surfaceCanvas} /></div>
            </foreignObject>
          </svg>
          <span className="vp-paper-grip" aria-hidden="true" />
          <div className="vp-paper-content">
          {isMarkup ? <MarkupPaper content={source.content} logo={logo} /> : isTicket ? <TicketPaper ticket={source.ticket} /> : receiptView.error ? <p className="vp-receipt-error" role="alert">{receiptView.error}</p> : <>
            <header className="vp-merchant">
              <h2 id={headingId}>{receiptView.data.merchant.name}</h2>
              <address>{receiptView.data.merchant.address.map((line, i) => <span key={i}>{line}</span>)}
                {receiptView.data.merchant.phone && <span>Tel: {receiptView.data.merchant.phone}</span>}
              </address>
            </header>

            <div className="vp-order">
              <span>ORDER #{receiptView.data.orderId}</span>
              <time dateTime={receiptView.data.issuedAt}>{receiptView.issued}</time>
            </div>
            <table className="vp-items">
              <caption className="vp-sr-only">Order items</caption>
              <thead className="vp-sr-only"><tr><th scope="col">Item and quantity</th><th scope="col">Amount</th></tr></thead>
              <tbody>{receiptView.data.items.map((item, index) => <tr key={item.id ?? index}>
                <th scope="row">{item.quantity}x {item.name}</th>
                <td>{receiptView.money(item.quantity * item.unitAmount)}</td>
              </tr>)}</tbody>
            </table>

            <dl className="vp-totals">
              <div><dt>Subtotal</dt><dd>{receiptView.money(receiptView.totals.subtotal)}</dd></div>
              <div><dt>Tax ({receiptView.taxRate}%)</dt><dd>{receiptView.money(receiptView.totals.tax)}</dd></div>
              <div className="vp-total"><dt>Total</dt><dd>{receiptView.money(receiptView.totals.total)}</dd></div>
            </dl>
            <footer className="vp-payment">
              <p className="vp-paid">Paid via {receiptView.data.payment.method}{receiptView.data.payment.last4 && ` (•••• ${receiptView.data.payment.last4})`}</p>
              <Barcode value={receiptView.data.payment.authorization} />
              <p className="vp-authorization">AUTH: {receiptView.data.payment.authorization}</p>
              <p className="vp-thanks">{receiptView.data.footer}</p>
            </footer>
          </>}
          </div>
        </article>
        </div>
      </div>
    </div>
  </section>;
}
