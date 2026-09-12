import React, { useMemo, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { VirtualPrinter } from './VirtualPrinter.jsx';
import { printerExamples } from './printerExamples.js';
import { printerInputExamples } from './printerMarkup.js';
import { quickTicketExample } from './simpleTicket.js';
import { createPrinterImage, downloadPrinterImage } from './demoImage.js';
import './demo.css';

const customStarter = `<C><BOLD>My custom printout</BOLD></C><BR>
Type anything here, including fixed-width rows.<BR>
<B>Total                         0.00</B>`;

function ArrowIcon({ direction = 'right' }) {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
    {direction === 'left' ? <path d="m14.5 5-7 7 7 7M8 12h10" /> : <path d="m9.5 5 7 7-7 7M6 12h10" />}
  </svg>;
}

function QuickForm({ draft, onChange }) {
  return <div className="demo-form">
    <label className="demo-field">
      <span>Title</span>
      <input value={draft.title} onChange={event => onChange('title', event.target.value)} />
    </label>
    <label className="demo-field">
      <span>Subtitle</span>
      <input value={draft.subtitle} onChange={event => onChange('subtitle', event.target.value)} />
    </label>
    <label className="demo-field">
      <span>Items <small>one per line, optional amount after |</small></span>
      <textarea rows="5" value={draft.items} onChange={event => onChange('items', event.target.value)} />
    </label>
    <div className="demo-form-row">
      <label className="demo-field">
        <span>Total</span>
        <input value={draft.total} onChange={event => onChange('total', event.target.value)} />
      </label>
      <label className="demo-field">
        <span>Footer</span>
        <input value={draft.footer} onChange={event => onChange('footer', event.target.value)} />
      </label>
    </div>
  </div>;
}

function MarkupForm({ exampleId, content, onExampleChange, onContentChange }) {
  return <div className="demo-form">
    <label className="demo-field">
      <span>Example payload</span>
      <select value={exampleId} onChange={event => onExampleChange(event.target.value)}>
        {printerExamples.map(example => <option value={example.id} key={example.id}>{example.label}</option>)}
      </select>
    </label>
    <label className="demo-field">
      <span>FEIEYUN content <small>markup or plain text</small></span>
      <textarea className="demo-code" rows="9" value={content} onChange={event => onContentChange(event.target.value)} />
    </label>
  </div>;
}

function Demo() {
  const [mode, setMode] = useState('quick');
  const [step, setStep] = useState('setup');
  const [previewId, setPreviewId] = useState(0);
  const [scrollable, setScrollable] = useState(true);
  const preview = useRef(null);
  const [sharing, setSharing] = useState(false);
  const [shareError, setShareError] = useState('');
  const [exampleId, setExampleId] = useState('real-world-daily');
  const [markupContent, setMarkupContent] = useState(printerInputExamples.realWorldDaily);
  const [customContent, setCustomContent] = useState(customStarter);
  const [quickDraft, setQuickDraft] = useState(() => ({
    title: quickTicketExample.title,
    subtitle: quickTicketExample.subtitle,
    items: quickTicketExample.items.map(item => `${item.quantity} x ${item.name} | ${item.amount}`).join('\n'),
    total: quickTicketExample.total,
    footer: quickTicketExample.footer,
  }));

  const quickTicket = useMemo(() => ({
    title: quickDraft.title,
    subtitle: quickDraft.subtitle,
    items: quickDraft.items.split('\n').map(line => line.trim()).filter(Boolean).map((line, index) => {
      const separator = line.lastIndexOf('|');
      return { id: index, label: separator < 0 ? line : line.slice(0, separator).trim(), amount: separator < 0 ? '' : line.slice(separator + 1).trim() };
    }),
    total: quickDraft.total,
    footer: quickDraft.footer,
  }), [quickDraft]);

  function updateQuickDraft(field, value) {
    setQuickDraft(current => ({ ...current, [field]: value }));
  }

  function chooseExample(id) {
    setExampleId(id);
    const next = printerExamples.find(example => example.id === id);
    if (next) setMarkupContent(next.input);
  }

  const printerProps = mode === 'quick' ? { ticket: quickTicket } : { content: mode === 'custom' ? customContent : markupContent };
  printerProps.scrollable = scrollable;

  async function shareReceipt() {
    const printer = preview.current?.querySelector('.vp');
    if (sharing || printer?.dataset.phase !== 'printed') return;
    setSharing(true);
    setShareError('');
    try {
      const file = await createPrinterImage(printer);
      if (navigator.canShare?.({ files: [file] })) {
        try { await navigator.share({ files: [file] }); }
        catch (error) { if (error.name !== 'AbortError') downloadPrinterImage(file); }
      } else downloadPrinterImage(file);
    } catch {
      setShareError('Could not share the image. Try again; external logos must allow image access.');
    } finally { setSharing(false); }
  }

  return <main className="demo">
    <header className="demo-header">
      <div className="demo-brand">
        <span className="demo-brand-mark" aria-hidden="true">VP</span>
        <span><strong>Virtual Printer</strong><small>React component</small></span>
      </div>
      <span className="demo-step-indicator"><b>{step === 'setup' ? '01' : '02'}</b> / 02</span>
    </header>

    <div className="demo-workspace" data-step={step}>
      <section className="demo-setup" aria-labelledby="setup-title">
        <div className="demo-overline">Input</div>
        <h1 id="setup-title">Choose a print format</h1>
        <p className="demo-lede">Pick a quick ticket, raw FEIEYUN markup, or bring your own layout.</p>
        <div className="demo-mode-grid" role="radiogroup" aria-label="Print format">
          {[
            ['quick', 'Quick ticket', 'Title, items and total'],
            ['markup', 'FEIEYUN markup', 'Use printer commands'],
            ['custom', 'Custom layout', 'Write your own payload'],
          ].map(([id, label, detail]) => <button type="button" role="radio" aria-label={label} aria-checked={mode === id} className={`demo-mode ${mode === id ? 'is-selected' : ''}`} onClick={() => setMode(id)} key={id}>
            <span><strong>{label}</strong><small>{detail}</small></span>
          </button>)}
        </div>

        {mode === 'quick' ? <QuickForm draft={quickDraft} onChange={updateQuickDraft} />
          : mode === 'markup' ? <MarkupForm exampleId={exampleId} content={markupContent} onExampleChange={chooseExample} onContentChange={setMarkupContent} />
            : <label className="demo-field demo-custom-field">
              <span>Custom content <small>Plain text and FEIEYUN tags are both accepted</small></span>
              <textarea className="demo-code" rows="15" value={customContent} onChange={event => setCustomContent(event.target.value)} />
            </label>}

        <fieldset className="demo-print-layout">
          <legend>Receipt height</legend>
          <label><input type="radio" name="receipt-height" checked={scrollable} onChange={() => setScrollable(true)} /> Scroll long receipts</label>
          <label><input type="radio" name="receipt-height" checked={!scrollable} onChange={() => setScrollable(false)} /> Show full receipt</label>
        </fieldset>

        <button type="button" className="demo-next" onClick={() => { setPreviewId(id => id + 1); setShareError(''); setStep('preview'); }}>
          <span>Open printer preview</span><ArrowIcon />
        </button>
      </section>

      <section ref={preview} className="demo-preview" aria-label="Printer preview">
        <div className="demo-preview-header">
          <button type="button" className="demo-back" onClick={() => setStep('setup')}><ArrowIcon direction="left" /><span>Edit input</span></button>
          <span>Printer preview</span>
          <button type="button" className="demo-share" aria-label={sharing ? 'Preparing image' : 'Share receipt image'} title="Share receipt image" disabled={sharing} onClick={shareReceipt}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true"><path d="M12 15V3m-4 4 4-4 4 4M6 10H4v11h16V10h-2" /></svg>
          </button>
        </div>
        <VirtualPrinter key={`${mode}-${previewId}`} {...printerProps} />
        {shareError && <p role="alert">{shareError}</p>}
      </section>
    </div>
  </main>;
}

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Demo />
  </React.StrictMode>,
);
