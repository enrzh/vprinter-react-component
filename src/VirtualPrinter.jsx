import React, { useEffect, useId, useLayoutEffect, useMemo, useRef, useState } from 'react';
import JsBarcode from 'jsbarcode';
import { encode } from 'uqr';
import { calculateTotals, formatOrderDate, moneyFormatter } from './receipt.js';
import { parsePrinterMarkup } from './printerMarkup.js';
import { normalizeTicket } from './simpleTicket.js';
import { tearAxis } from './tearGesture.js';
import './VirtualPrinter.css';

const useIsomorphicLayoutEffect = typeof window === 'undefined' ? useEffect : useLayoutEffect;
const PRINT_FALLBACK_MS = 3400;

function PrinterIcon() {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
    <path d="M6 8V3h12v5M6 17H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" />
    <path d="M6 14h12v7H6zM17 11h1" />
  </svg>;
}

function Barcode({ value }) {
  const element = useRef(null);
  useEffect(() => {
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
    previousResetKey.current = resetKey;
    drag.current = null;
    paperScroll.current?.closest('.vp')?.removeAttribute('data-dragging');
    paperScroll.current?.removeAttribute('data-tear-axis');
    for (const property of ['--vp-drag-x', '--vp-drag-y', '--vp-drag-rotate', '--vp-tear-x', '--vp-tear-y', '--vp-tear-rotate']) {
      paperScroll.current?.style.removeProperty(property);
    }
    paperScroll.current?.querySelector('.vp-paper')?.style.removeProperty('--vp-scroll-offset');
    paperScroll.current?.parentElement?.style.removeProperty('--vp-pull');
    nextId.current = 0;
    setJob(current => ({ ...current, id: 0, phase: 'ready' }));
  }, [resetKey]);

  useIsomorphicLayoutEffect(() => {
    if (!printing) return;
    const paper = paperScroll.current;
    const updateHeight = () => {
      const printer = paper.closest('.vp');
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

  function finishTear() {
    drag.current = null;
    paperScroll.current?.closest('.vp')?.removeAttribute('data-dragging');
    paperScroll.current?.removeAttribute('data-tear-axis');
    for (const property of ['--vp-drag-x', '--vp-drag-y', '--vp-drag-rotate', '--vp-tear-x', '--vp-tear-y', '--vp-tear-rotate']) {
      paperScroll.current?.style.removeProperty(property);
    }
    paperScroll.current?.querySelector('.vp-paper')?.style.removeProperty('--vp-scroll-offset');
    paperScroll.current?.parentElement?.style.removeProperty('--vp-pull');
    setJob(current => current.phase === 'tearing' ? { ...current, phase: 'ready' } : current);
  }

  function startTear() {
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
    event.currentTarget.closest('.vp')?.setAttribute('data-dragging', 'true');
    const horizontal = gesture.axis === 'horizontal';
    const distance = Math.max(0, direction * vertical);
    const pull = horizontal ? 0 : distance;
    gesture.sideways = sideways;
    event.currentTarget.style.setProperty('--vp-drag-y', `${direction * pull}px`);
    if (orientation === 'up') event.currentTarget.parentElement.style.setProperty('--vp-pull', `${pull}px`);
    event.currentTarget.style.setProperty('--vp-drag-x', `${horizontal ? sideways : orientation === 'up' ? 0 : Math.max(-40, Math.min(40, sideways * .35))}px`);
    event.currentTarget.style.setProperty('--vp-drag-rotate', `${horizontal ? Math.max(-8, Math.min(8, sideways * .06)) : orientation === 'up' ? 0 : Math.max(-4, Math.min(4, sideways * .04))}deg`);
    gesture.distance = horizontal ? Math.abs(sideways) : distance;
    return gesture.distance;
  }

  function releasePaper(event, cancelled = false) {
    const gesture = drag.current;
    if (!gesture || gesture.id !== event.pointerId) return;
    const distance = cancelled ? gesture.distance || 0 : movePaper(event);
    drag.current = null;
    const paper = event.currentTarget;
    paper.closest('.vp')?.removeAttribute('data-dragging');
    if (gesture.axis === 'scroll') {
      paper.querySelector('.vp-paper')?.style.removeProperty('--vp-scroll-offset');
      return;
    }
    const horizontal = gesture.axis === 'horizontal';
    const threshold = horizontal
      ? (orientation === 'front' ? 30 : Math.min(72, Math.max(36, paper.clientWidth * .28)))
      : (orientation === 'up' ? 36 : 18);
    if (distance >= threshold) {
      if (horizontal) {
        const side = Math.sign(gesture.sideways);
        if (orientation === 'front') paper.dataset.tearAxis = 'horizontal';
        paper.style.setProperty('--vp-tear-x', `${side * 260}px`);
        paper.style.setProperty('--vp-tear-y', orientation === 'up' ? '-80px' : '35px');
        paper.style.setProperty('--vp-tear-rotate', `${side * 9}deg`);
      }
      startTear();
    } else {
      paper.style.removeProperty('--vp-drag-x');
      paper.style.removeProperty('--vp-drag-y');
      paper.style.removeProperty('--vp-drag-rotate');
      paper.querySelector('.vp-paper')?.style.removeProperty('--vp-scroll-offset');
      paper.scrollTop = gesture.scrollTop;
      paper.parentElement.style.removeProperty('--vp-pull');
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
    const timer = window.setTimeout(finishTear, 620);
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
    const timer = window.setTimeout(finishPrint, PRINT_FALLBACK_MS);
    return () => {
      window.clearTimeout(timer);
      motion.removeEventListener('change', onMotionChange);
    };
  }, [job.id, printing]);

  function printReceipt() {
    if (printing || tearing) return;
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    setJob({ id: ++nextId.current, phase: reduceMotion ? 'printed' : 'printing', receipt: hasContent || hasTicket ? null : receipt,
      content: hasContent ? content : null, ticket: hasTicket && !hasContent ? ticket : null });
  }

  const paperStyle = paperMaxHeight == null ? undefined : {
    '--vp-paper-height': typeof paperMaxHeight === 'number' ? `${paperMaxHeight}px` : String(paperMaxHeight),
  };
  return <section className={`vp vp--${orientation} ${className}`} data-phase={job.phase} data-scrollable={isScrollable ? 'true' : 'false'} style={paperStyle} aria-label={`${orientation === 'up' ? 'Upward' : 'Front-feed'} virtual receipt printer`}>
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
      <div className="vp-paper-window" aria-busy={printing}
        onAnimationEnd={event => { if (['vp-reveal', 'vp-feed-front', 'vp-feed-up-window'].includes(event.animationName) && event.target === event.currentTarget) finishPrint(); }}>
        <div ref={paperScroll} className="vp-paper-scroll" role="region" aria-label="Receipt paper" tabIndex={job.phase === 'printed' ? 0 : undefined}
          onPointerDown={event => {
            if (drag.current || !event.isPrimary || job.phase !== 'printed') return;
            drag.current = { id: event.pointerId, x: event.clientX, y: event.clientY, scrollTop: event.currentTarget.scrollTop, pointerType: event.pointerType, grip: !!event.target.closest('.vp-paper-grip') };
            if (orientation === 'front') event.currentTarget.querySelector('.vp-paper')?.style.setProperty('--vp-scroll-offset', `${-event.currentTarget.scrollTop}px`);
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
          onKeyDown={event => {
            if (event.target !== event.currentTarget || job.phase !== 'printed') return;
            const paper = event.currentTarget;
            const offsets = { ArrowDown: 40, ArrowUp: -40, PageDown: paper.clientHeight * .9, PageUp: -paper.clientHeight * .9, Home: -paper.scrollHeight, End: paper.scrollHeight };
            if (!(event.key in offsets)) return;
            event.preventDefault();
            paper.scrollTop += offsets[event.key];
          }}
          onAnimationEnd={event => { if (['vp-tear', 'vp-tear-up', 'vp-tear-side'].includes(event.animationName) && event.target === event.currentTarget) finishTear(); }}>
        <article key={job.id} className={`vp-paper ${isMarkup ? 'vp-paper--markup' : isTicket ? 'vp-paper--ticket' : ''}`} aria-labelledby={isMarkup || isTicket ? undefined : headingId} aria-label={isMarkup || isTicket ? 'Printed document' : undefined} aria-hidden={job.phase === 'ready'}>
          <span className="vp-paper-grip" aria-hidden="true" />
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
        </article>
        </div>
      </div>
    </div>
  </section>;
}
