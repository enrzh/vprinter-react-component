import React, { useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { VirtualPrinter, cafeReceipt } from 'vprinter-react-component';
import 'vprinter-react-component/styles.css';

const report = ['<C><B>HOST RECEIPT</B></C>',
  ...Array.from({ length: 44 }, (_, i) => `${String(i + 1).padStart(2, '0')}  Item ${String(i + 1).padEnd(3, ' ')}              15.90`),
  '<B>END OF RECEIPT</B>'].join('\n');

function PrinterCase({ id, title, orientation = 'front', input, builtIn = false }) {
  const printer = useRef(null);
  const [phase, setPhase] = useState('ready');
  const [scrollable, setScrollable] = useState(true);
  const [controls, setControls] = useState(builtIn);
  const [width, setWidth] = useState(480);
  return <section className="host-case" id={id}>
    <h2>{title}</h2>
    <div className="host-toolbar">
      <button onClick={() => printer.current?.print()} disabled={phase === 'printing' || phase === 'tearing'}>Print</button>
      <button onClick={() => printer.current?.tear()} disabled={phase !== 'printed'}>Tear</button>
      <output aria-live="polite">{phase}</output>
      <label><input type="checkbox" checked={scrollable} onChange={e => setScrollable(e.target.checked)} /> Scroll</label>
      <label><input type="checkbox" checked={controls} onChange={e => setControls(e.target.checked)} /> Built-in controls</label>
      <label>Width <input type="range" min="240" max="600" value={width} onChange={e => setWidth(Number(e.target.value))} /></label>
    </div>
    <div className="host-stage" style={{ width }}>
      <VirtualPrinter ref={printer} {...input} orientation={orientation} scrollable={scrollable}
        controls={controls} paperMaxHeight={240} onPhaseChange={setPhase} />
    </div>
  </section>;
}

createRoot(document.getElementById('root')).render(<React.StrictMode><div className="host-grid">
  <PrinterCase id="front" title="Front feed · long markup" input={{ content: report }} />
  <PrinterCase id="up" title="Tabletop · long markup" orientation="up" input={{ content: report }} />
  <PrinterCase id="ticket" title="Quick ticket · built-in controls" builtIn input={{ ticket: {
    title: 'COFFEE', items: [{ name: 'Flat white', amount: '3.50' }], total: '3.50', footer: 'Thank you',
  } }} />
  <PrinterCase id="receipt" title="Structured receipt" input={{ receipt: cafeReceipt }} />
</div></React.StrictMode>);
