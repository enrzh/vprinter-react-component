import React, { useEffect, useMemo, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { VirtualPrinter } from './VirtualPrinter.jsx';
import { printerExamples } from './printerExamples.js';
import { printerInputExamples } from './printerMarkup.js';
import { quickTicketExample } from './simpleTicket.js';
import './demo.css';

const customStarter = `<C><BOLD>My custom printout</BOLD></C><BR>
Type anything here, including fixed-width rows.<BR>
<B>Total                         0.00</B>`;

function ArrowIcon({ direction = 'right' }) {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
    {direction === 'left' ? <path d="m14.5 5-7 7 7 7M8 12h10" /> : <path d="m9.5 5 7 7-7 7M6 12h10" />}
  </svg>;
}

function CameraIcon() {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true">
    <rect x="3" y="6" width="18" height="13" rx="3" />
    <circle cx="12" cy="12.5" r="3.2" />
    <path d="M8 6.2 9.3 4h5.4L16 6.2" />
  </svg>;
}

function FullscreenIcon({ exit = false }) {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
    {exit ? <path d="M9 4v5H4M20 9h-5V4M15 20v-5h5M4 15h5v5" /> : <path d="M4 9V4h5M15 4h5v5M20 15v5h-5M9 20H4v-5" />}
  </svg>;
}

function ModeIcon({ mode }) {
  if (mode === 'quick') return <span className="demo-mode-glyph demo-mode-glyph--spark" aria-hidden="true">✦</span>;
  if (mode === 'markup') return <span className="demo-mode-glyph demo-mode-glyph--code" aria-hidden="true">&lt;/&gt;</span>;
  return <span className="demo-mode-glyph demo-mode-glyph--custom" aria-hidden="true">Aa</span>;
}

function CameraPositionPicker({ value, onChange }) {
  return <fieldset className="demo-fieldset">
    <legend>Camera position</legend>
    <div className="demo-segmented" role="radiogroup" aria-label="Camera position">
      {['left', 'center', 'right'].map(position => <button
        type="button"
        role="radio"
        aria-checked={value === position}
        className={value === position ? 'is-selected' : ''}
        onClick={() => onChange(position)}
        key={position}
      >
        <CameraIcon />
        <span>{position[0].toUpperCase() + position.slice(1)}</span>
      </button>)}
    </div>
  </fieldset>;
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
  const [cameraPosition, setCameraPosition] = useState('center');
  const [exampleId, setExampleId] = useState('real-world-daily');
  const [markupContent, setMarkupContent] = useState(printerInputExamples.realWorldDaily);
  const [customContent, setCustomContent] = useState(customStarter);
  const previewRef = useRef(null);
  const [previewFullscreen, setPreviewFullscreen] = useState(false);
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

  useEffect(() => {
    const syncFullscreenState = () => {
      const nativeFullscreen = document.fullscreenElement || document.webkitFullscreenElement;
      setPreviewFullscreen(nativeFullscreen === previewRef.current);
    };
    document.addEventListener('fullscreenchange', syncFullscreenState);
    document.addEventListener('webkitfullscreenchange', syncFullscreenState);
    return () => {
      document.removeEventListener('fullscreenchange', syncFullscreenState);
      document.removeEventListener('webkitfullscreenchange', syncFullscreenState);
    };
  }, []);

  async function exitPreviewFullscreen() {
    const element = previewRef.current;
    const nativeFullscreen = document.fullscreenElement || document.webkitFullscreenElement;
    if (nativeFullscreen === element) {
      try {
        if (document.exitFullscreen) await document.exitFullscreen();
        else if (document.webkitExitFullscreen) document.webkitExitFullscreen();
      } catch {
        // The browser may already have left fullscreen via its own controls.
      }
    }
    setPreviewFullscreen(false);
  }

  async function togglePreviewFullscreen() {
    const element = previewRef.current;
    if (!element) return;
    const nativeFullscreen = document.fullscreenElement || document.webkitFullscreenElement;
    if (nativeFullscreen === element) {
      await exitPreviewFullscreen();
      return;
    }
    if (previewFullscreen && !nativeFullscreen) {
      await exitPreviewFullscreen();
      return;
    }
    setPreviewFullscreen(true);
    try {
      if (element.requestFullscreen) await element.requestFullscreen({ navigationUI: 'hide' });
      else if (element.webkitRequestFullscreen) element.webkitRequestFullscreen();
    } catch {
      // Keep the CSS fullscreen fallback when the host browser denies the request.
    }
  }

  const printerProps = mode === 'quick' ? { ticket: quickTicket } : { content: mode === 'custom' ? customContent : markupContent };

  return <main className="demo">
    <header className="demo-header">
      <div className="demo-brand">
        <span className="demo-brand-mark" aria-hidden="true"><CameraIcon /></span>
        <span><strong>Virtual Printer</strong><small>Preview lab</small></span>
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
          ].map(([id, label, detail]) => <button type="button" role="radio" aria-checked={mode === id} className={`demo-mode ${mode === id ? 'is-selected' : ''}`} onClick={() => setMode(id)} key={id}>
            <ModeIcon mode={id} />
            <span><strong>{label}</strong><small>{detail}</small></span>
          </button>)}
        </div>

        {mode === 'quick' ? <QuickForm draft={quickDraft} onChange={updateQuickDraft} />
          : mode === 'markup' ? <MarkupForm exampleId={exampleId} content={markupContent} onExampleChange={chooseExample} onContentChange={setMarkupContent} />
            : <label className="demo-field demo-custom-field">
              <span>Custom content <small>Plain text and FEIEYUN tags are both accepted</small></span>
              <textarea className="demo-code" rows="15" value={customContent} onChange={event => setCustomContent(event.target.value)} />
            </label>}

        <CameraPositionPicker value={cameraPosition} onChange={setCameraPosition} />
        <button type="button" className="demo-next" onClick={() => setStep('preview')}>
          <span>Open printer preview</span><ArrowIcon />
        </button>
      </section>

      <section ref={previewRef} className={`demo-preview ${previewFullscreen ? 'demo-preview--fullscreen' : ''}`} aria-label="Printer preview">
        <div className="demo-preview-header">
          <button type="button" className="demo-back" onClick={async () => { await exitPreviewFullscreen(); setStep('setup'); }}><ArrowIcon direction="left" /><span>Edit input</span></button>
          <div className="demo-preview-actions">
            <span>Printer preview</span>
            <button type="button" className="demo-fullscreen" onClick={togglePreviewFullscreen} aria-label={previewFullscreen ? 'Exit fullscreen preview' : 'Enter fullscreen preview'} title={previewFullscreen ? 'Exit fullscreen' : 'Enter fullscreen'}>
              <FullscreenIcon exit={previewFullscreen} />
            </button>
          </div>
        </div>
        <VirtualPrinter key={`${mode}-${cameraPosition}-${step}`} {...printerProps} cameraPosition={cameraPosition} initiallyPrinted />
      </section>
    </div>
  </main>;
}

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Demo />
  </React.StrictMode>,
);
