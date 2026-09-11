import React, { useEffect, useId, useRef, useState } from 'react';
import JsBarcode from 'jsbarcode';
import { calculateTotals, formatOrderDate, moneyFormatter } from './receipt.js';
import './VirtualPrinter.css';

function PrinterIcon() {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
    <path d="M6 8V3h12v5M6 17H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" />
    <path d="M6 14h12v7H6zM17 11h1" />
  </svg>;
}

function CupIcon() {
  return <svg viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" aria-hidden="true">
    <path d="M6 10h14v8a5 5 0 0 1-5 5h-4a5 5 0 0 1-5-5zM20 11h2a4 4 0 0 1 0 8h-2M9 4v2m5-3v3m5-2v2" />
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

/**
 * Reusable visual printer. Import with its CSS (included above).
 * receipt: the structured shape shown in cafeReceipt; never card numbers, only last4.
 * initiallyPrinted: show a completed receipt on mount (default false).
 * className: optional host styling hook. Each instance owns its own print state.
 * A print captures the receipt prop; later prop updates apply to the next print.
 */
export function VirtualPrinter({ receipt, initiallyPrinted = false, className = '' }) {
  const headingId = useId();
  const statusId = useId();
  const nextId = useRef(0);
  const [job, setJob] = useState(() => ({
    id: 0, phase: initiallyPrinted ? 'printed' : 'ready', receipt,
  }));
  const printing = job.phase === 'printing';
  const data = job.receipt;
  const totals = calculateTotals(data.items, data.taxBasisPoints);
  const money = moneyFormatter(data.locale, data.currency);
  const taxRate = new Intl.NumberFormat(data.locale, { maximumFractionDigits: 2 }).format(data.taxBasisPoints / 100);

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
    setJob({ id: ++nextId.current, phase: reduceMotion ? 'printed' : 'printing', receipt });
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
        <article key={job.id} className="vp-paper" aria-labelledby={headingId} aria-hidden={job.phase === 'ready'}
          onAnimationEnd={event => { if (event.animationName === 'vp-feed' && event.target === event.currentTarget) finishPrint(); }}>
          <header className="vp-merchant">
            <span className="vp-cup"><CupIcon /></span>
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
        </article>
      </div>
    </div>
  </section>;
}
