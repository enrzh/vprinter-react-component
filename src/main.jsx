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
      <span>Items</span>
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
      <span>FEIEYUN content</span>
      <textarea className="demo-code" rows="9" value={content} onChange={event => onContentChange(event.target.value)} />
    </label>
  </div>;
}

function Demo() {
  const [mode, setMode] = useState('quick');
  const [step, setStep] = useState('setup');
  const [previewId, setPreviewId] = useState(0);
  const [printerPhase, setPrinterPhase] = useState('ready');
  const [scrollableByStyle, setScrollableByStyle] = useState({ front: true, up: false });
  const [orientation, setOrientation] = useState('front');
  const scrollable = scrollableByStyle[orientation];
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

  function followTabletopPrinter() {
    let frame;
    const stop = () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('wheel', stop);
      window.removeEventListener('touchstart', stop);
      window.removeEventListener('keydown', stop);
    };
    const follow = () => {
      const printer = preview.current?.querySelector('.vp--up[data-scrollable="false"]');
      if (!printer) return stop();
      const bottom = printer.querySelector('.vp-housing').getBoundingClientRect().bottom;
      if (bottom > window.innerHeight - 24 || window.scrollY > 0) window.scrollBy(0, bottom - window.innerHeight + 24);
      if (printer.dataset.phase === 'printing') frame = requestAnimationFrame(follow);
      else stop();
    };
    window.addEventListener('wheel', stop, { passive: true });
    window.addEventListener('touchstart', stop, { passive: true });
    window.addEventListener('keydown', stop);
    frame = requestAnimationFrame(follow);
  }

  const printerProps = mode === 'quick' ? { ticket: quickTicket } : { content: mode === 'custom' ? customContent : markupContent };
  printerProps.scrollable = scrollable;
  printerProps.orientation = orientation;
  printerProps.onPhaseChange = setPrinterPhase;
  printerProps.onTear = () => { if (orientation === 'up') requestAnimationFrame(() => preview.current?.querySelector('.demo-header-print')?.focus({ preventScroll: true })); };

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
        <span className="demo-brand-mark" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M6 8V3h12v5M6 17H4V8h16v9h-2M6 14h12v7H6zM16 11h1" /></svg></span>
        <span><strong>Virtual Printer</strong><small>An interactive paper playground</small></span>
      </div>
      <a className="demo-source" href="https://github.com/enrzh/vprinter-react-component" target="_blank" rel="noreferrer">Source ↗</a>
    </header>

    <div className="demo-workspace" data-step={step}>
      <section className="demo-setup" aria-labelledby="setup-title">
        <div className="demo-overline">Your next printout</div>
        <h1 id="setup-title">Make it print.</h1>
        <p className="demo-intro">Write a receipt. Feed the paper. Give it a tear.</p>
        <fieldset className="demo-mode-grid">
          <legend className="demo-sr-only">Print format</legend>
          {[
            ['quick', 'Quick ticket'],
            ['markup', 'FEIEYUN'],
            ['custom', 'Custom'],
          ].map(([id, label]) => <label className="demo-mode" key={id}>
            <input type="radio" name="print-format" checked={mode === id} onChange={() => setMode(id)} />
            <span>{label}</span>
          </label>)}
        </fieldset>

        {mode === 'quick' ? <QuickForm draft={quickDraft} onChange={updateQuickDraft} />
          : mode === 'markup' ? <MarkupForm exampleId={exampleId} content={markupContent} onExampleChange={chooseExample} onContentChange={setMarkupContent} />
            : <label className="demo-field demo-custom-field">
              <span>Custom content</span>
              <textarea className="demo-code" rows="15" value={customContent} onChange={event => setCustomContent(event.target.value)} />
            </label>}

        <button type="button" className="demo-next" onClick={() => { setPreviewId(id => id + 1); setShareError(''); setStep('preview'); }}>
          <span>Preview</span><ArrowIcon />
        </button>
      </section>

      <section ref={preview} className="demo-preview" aria-label="Printer preview">
        <div className="demo-preview-header">
          <button type="button" className="demo-back" aria-label="Edit input" onClick={() => setStep('setup')}><ArrowIcon direction="left" /><span>Edit input</span></button>
          <div className="demo-preview-title">
            <strong>Printer</strong>
            <label className="demo-scroll-toggle" title="Scrollable paper"><input type="checkbox" aria-label="Scrollable paper" checked={scrollable} onChange={event => setScrollableByStyle(current => ({ ...current, [orientation]: event.target.checked }))} /><span className="demo-switch" aria-hidden="true" /><span>Scroll</span></label>
          </div>
          <fieldset className="demo-style-switch">
            <legend className="demo-sr-only">Printer style</legend>
            <label><input type="radio" name="printer-style" checked={orientation === 'front'} onChange={() => setOrientation('front')} /><span>Front feed</span></label>
            <label><input type="radio" name="printer-style" checked={orientation === 'up'} onChange={() => setOrientation('up')} /><span>Tabletop</span></label>
          </fieldset>
          <div className="demo-header-actions">
            {orientation === 'up' && <button type="button" className="demo-header-print" aria-label="Print receipt" title="Print receipt" disabled={printerPhase === 'printing' || printerPhase === 'tearing'} onClick={() => {
              preview.current?.querySelector('.vp-print')?.click();
              if (!scrollable) followTabletopPrinter();
            }}>Print</button>}
            {orientation === 'up' && (printerPhase === 'printed' || printerPhase === 'tearing') && <button type="button" className="demo-header-cut" aria-label="Tear off receipt" title="Tear off receipt" disabled={printerPhase === 'tearing'} onClick={() => preview.current?.querySelector('.vp-tear')?.click()}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true"><circle cx="6" cy="6" r="3" /><circle cx="6" cy="18" r="3" /><path d="m8 8 12 12M8 16 20 4" /></svg>
            </button>}
            <button type="button" className="demo-share" aria-label={sharing ? 'Preparing image' : 'Share receipt image'} title="Share receipt image" disabled={sharing} onClick={shareReceipt}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true"><path d="M12 15V3m-4 4 4-4 4 4M6 10H4v11h16V10h-2" /></svg>
            </button>
          </div>
        </div>
        <div className="demo-preview-meta">
          <span className="demo-phase" data-phase={printerPhase}>{printerPhase === 'printing' ? 'Printing' : printerPhase === 'tearing' ? 'Tearing' : printerPhase === 'printed' ? 'Printed' : 'Ready'}</span>
          <p>{printerPhase === 'printed' ? `Pull sideways to tear.${scrollable ? ' Scroll to read.' : ''}` : printerPhase === 'printing' ? 'Fresh ink, coming through.' : printerPhase === 'tearing' ? 'Back to a clean sheet.' : 'Choose a style, then press Print.'}</p>
        </div>
        <VirtualPrinter resetKey={previewId} {...printerProps} />
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
