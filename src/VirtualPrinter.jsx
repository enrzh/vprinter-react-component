import React, { useEffect, useId, useLayoutEffect, useRef, useState } from 'react';
import JsBarcode from 'jsbarcode';
import { calculateTotals, formatOrderDate, moneyFormatter } from './receipt.js';
import { parsePrinterMarkup } from './printerMarkup.js';
import { normalizeTicket } from './simpleTicket.js';
import './VirtualPrinter.css';

const useIsomorphicLayoutEffect = typeof window === 'undefined' ? useEffect : useLayoutEffect;

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
  return logo || <span className="vp-markup-logo-mark" aria-hidden="true">𝕏</span>;
}

function MarkupPart({ part, logo }) {
  if (part.type === 'logo') {
    return <span className="vp-markup-logo"><MarkupLogo logo={logo} /></span>;
  }
  if (part.type === 'qr') {
    return <span className={`vp-markup-qr ${part.center ? 'vp-markup-qr--center' : ''} ${part.right ? 'vp-markup-qr--right' : ''}`} role="img" aria-label={`QR code: ${part.text || 'empty'}`}>
      <span className="vp-markup-qr-box" aria-hidden="true">QR</span>
      <code className="vp-markup-qr-value">{part.text}</code>
    </span>;
  }
  if (part.type === 'control') {
    return <span className={`vp-markup-control vp-markup-control--${part.control}`} role="img" aria-label={part.control === 'cut' ? 'Paper cut' : 'Printer plugin command'} aria-hidden="false" />;
  }
  const className = [
    part.bold && 'vp-markup-bold',
    part.doubleHeight && 'vp-markup-double-height',
    part.doubleWidth && 'vp-markup-double-width',
    part.right && 'vp-markup-part--right',
  ].filter(Boolean).join(' ');
  return <span className={className || undefined}>{part.text}</span>;
}

function MarkupPaper({ content, logo }) {
  const lines = parsePrinterMarkup(content);
  return <div className="vp-markup-content" role="document" aria-label="Printer document">
    {lines.map((line, lineIndex) => {
      const lineLength = line.parts.reduce((length, part) => length + (part.type === 'text' ? part.text.length : 0), 0);
      const dense = lineLength > 38 && !line.parts.some(part => part.type === 'logo');
      return <div className={`vp-markup-line ${line.center ? 'vp-markup-line--center' : ''} ${line.right ? 'vp-markup-line--right' : ''} ${dense ? 'vp-markup-line--dense' : ''}`} key={lineIndex}>
      {line.parts.map((part, partIndex) => <MarkupPart part={part} logo={logo} key={partIndex} />)}
      </div>;
    })}
  </div>;
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
  const headingId = useId();
  const statusId = useId();
  const nextId = useRef(0);
  const printButton = useRef(null);
  const paperScroll = useRef(null);
  const previousResetKey = useRef(resetKey);
  const previousPhase = useRef(initiallyPrinted ? 'printed' : 'ready');
  const [job, setJob] = useState(() => ({
    id: 0, phase: initiallyPrinted ? 'printed' : 'ready', receipt: hasContent || hasTicket ? null : receipt,
    content: hasContent ? content : null, ticket: hasTicket && !hasContent ? ticket : null,
  }));
  const printing = job.phase === 'printing';
  const tearing = job.phase === 'tearing';
  const data = job.receipt;
  const isMarkup = job.content !== null;
  const isTicket = !isMarkup && job.ticket !== null;
  const isScrollable = scrollable !== false;
  const totals = isMarkup || isTicket ? null : calculateTotals(data.items, data.taxBasisPoints);
  const money = isMarkup || isTicket ? null : moneyFormatter(data.locale, data.currency);
  const taxRate = isMarkup || isTicket ? null : new Intl.NumberFormat(data.locale, { maximumFractionDigits: 2 }).format(data.taxBasisPoints / 100);
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
    nextId.current = 0;
    setJob(current => ({ ...current, id: 0, phase: 'ready' }));
  }, [resetKey]);

  function finishTear() {
    setJob(current => current.phase === 'tearing' ? { ...current, phase: 'ready' } : current);
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
    const timer = window.setTimeout(finishTear, 550);
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
    const timer = window.setTimeout(finishPrint, 3400);
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
  return <section className={`vp ${className}`} data-phase={job.phase} data-scrollable={isScrollable ? 'true' : 'false'} style={paperStyle} aria-label="Virtual receipt printer">
    <div className="vp-machine">
      <div className="vp-housing" aria-hidden="true" />
      <button ref={printButton} className="vp-print" type="button" onClick={printReceipt} disabled={printing || tearing} aria-label={printing ? 'Printing receipt' : 'Print receipt'} title={printing ? 'Printing receipt' : 'Print receipt'} aria-describedby={statusId}>
        <PrinterIcon />
        <span className="vp-sr-only">{printing ? 'Printing receipt' : 'Print receipt'}</span>
      </button>

      {(job.phase === 'printed' || tearing) && <button className="vp-tear" type="button" aria-label="Tear off receipt" title="Tear off receipt" disabled={tearing} onClick={() => setJob(current => current.phase === 'printed' ? { ...current, phase: 'tearing' } : current)}>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true"><circle cx="6" cy="6" r="3" /><circle cx="6" cy="18" r="3" /><path d="m8 8 12 12M8 16 20 4" /></svg>
      </button>}
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
          onKeyDown={event => {
            if (event.target !== event.currentTarget || job.phase !== 'printed') return;
            const paper = event.currentTarget;
            const offsets = { ArrowDown: 40, ArrowUp: -40, PageDown: paper.clientHeight * .9, PageUp: -paper.clientHeight * .9, Home: -paper.scrollHeight, End: paper.scrollHeight };
            if (!(event.key in offsets)) return;
            event.preventDefault();
            paper.scrollTop += offsets[event.key];
          }}
          onAnimationEnd={event => { if (event.animationName === 'vp-tear' && event.target === event.currentTarget) finishTear(); }}>
        <article key={job.id} className={`vp-paper ${isMarkup ? 'vp-paper--markup' : isTicket ? 'vp-paper--ticket' : ''}`} aria-labelledby={isMarkup || isTicket ? undefined : headingId} aria-label={isMarkup || isTicket ? 'Printed document' : undefined} aria-hidden={job.phase === 'ready'}
          onAnimationEnd={event => { if (event.animationName === 'vp-feed' && event.target === event.currentTarget) finishPrint(); }}>
          {isMarkup ? <MarkupPaper content={job.content} logo={logo} /> : isTicket ? <TicketPaper ticket={job.ticket} /> : <>
            <header className="vp-merchant">
              <h2 id={headingId}>{data.merchant.name}</h2>
              <address>{data.merchant.address.map((line, i) => <span key={i}>{line}</span>)}
                {data.merchant.phone && <span>Tel: {data.merchant.phone}</span>}
              </address>
            </header>

            <div className="vp-order">
              <span>ORDER #{data.orderId}</span>
              <time dateTime={data.issuedAt}>{formatOrderDate(data.issuedAt, data.locale, data.timeZone)}</time>
            </div>
            <table className="vp-items">
              <caption className="vp-sr-only">Order items</caption>
              <thead className="vp-sr-only"><tr><th scope="col">Item and quantity</th><th scope="col">Amount</th></tr></thead>
              <tbody>{data.items.map(item => <tr key={item.id}>
                <th scope="row">{item.quantity}x {item.name}</th>
                <td>{money(item.quantity * item.unitAmount)}</td>
              </tr>)}</tbody>
            </table>

            <dl className="vp-totals">
              <div><dt>Subtotal</dt><dd>{money(totals.subtotal)}</dd></div>
              <div><dt>Tax ({taxRate}%)</dt><dd>{money(totals.tax)}</dd></div>
              <div className="vp-total"><dt>Total</dt><dd>{money(totals.total)}</dd></div>
            </dl>
            <footer className="vp-payment">
              <p className="vp-paid">Paid via {data.payment.method}{data.payment.last4 && ` (•••• ${data.payment.last4})`}</p>
              <Barcode value={data.payment.authorization} />
              <p className="vp-authorization">AUTH: {data.payment.authorization}</p>
              <p className="vp-thanks">{data.footer}</p>
            </footer>
          </>}
        </article>
        </div>
      </div>
    </div>
  </section>;
}
