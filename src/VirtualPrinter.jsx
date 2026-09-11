import React, { useEffect, useId, useRef, useState } from 'react';
import JsBarcode from 'jsbarcode';
import { calculateTotals, formatOrderDate, moneyFormatter } from './receipt.js';
import { parsePrinterMarkup } from './printerMarkup.js';
import { normalizeTicket } from './simpleTicket.js';
import './VirtualPrinter.css';

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
export function VirtualPrinter({ receipt, content, ticket, logo, initiallyPrinted = false, className = '' }) {
  const hasContent = content !== undefined && content !== null;
  const hasTicket = ticket !== undefined && ticket !== null;
  if (!hasContent && !hasTicket && !receipt) throw new TypeError('VirtualPrinter requires receipt, content, or ticket.');
  const headingId = useId();
  const statusId = useId();
  const nextId = useRef(0);
  const [job, setJob] = useState(() => ({
    id: 0, phase: initiallyPrinted ? 'printed' : 'ready', receipt: hasContent || hasTicket ? null : receipt,
    content: hasContent ? content : null, ticket: hasTicket && !hasContent ? ticket : null,
  }));
  const printing = job.phase === 'printing';
  const data = job.receipt;
  const isMarkup = job.content !== null;
  const isTicket = !isMarkup && job.ticket !== null;
  const totals = isMarkup || isTicket ? null : calculateTotals(data.items, data.taxBasisPoints);
  const money = isMarkup || isTicket ? null : moneyFormatter(data.locale, data.currency);
  const taxRate = isMarkup || isTicket ? null : new Intl.NumberFormat(data.locale, { maximumFractionDigits: 2 }).format(data.taxBasisPoints / 100);

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
    if (printing) return;
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    setJob({ id: ++nextId.current, phase: reduceMotion ? 'printed' : 'printing', receipt: hasContent || hasTicket ? null : receipt,
      content: hasContent ? content : null, ticket: hasTicket && !hasContent ? ticket : null });
  }

  return <section className={`vp ${className}`} data-phase={job.phase} aria-label="Virtual receipt printer">
    <button className="vp-print" type="button" onClick={printReceipt} disabled={printing} aria-describedby={statusId}>
      <PrinterIcon />
      <span>{printing ? 'Printing…' : 'Print Receipt'}</span>
    </button>

    <div className="vp-machine">
      <div className="vp-housing" aria-hidden="true" />
      <div className="vp-status" role="status" aria-live="polite" aria-atomic="true" id={statusId}>
        <span className={`vp-status-icon ${printing ? 'vp-status-icon--printing' : ''}`} aria-hidden="true">
          {printing ? <span className="vp-spinner" /> : job.phase === 'printed' ?
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="12" cy="12" r="10" /><path d="m7.5 12 3 3 6-6" /></svg> : <PrinterIcon />}
        </span>
        <span>{printing ? 'Printing your receipt…' : job.phase === 'printed' ? 'Transaction complete' : 'Ready to print'}</span>
      </div>
      <div className="vp-slot" aria-hidden="true" />
      <div className="vp-paper-window" aria-busy={printing}>
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
  </section>;
}
