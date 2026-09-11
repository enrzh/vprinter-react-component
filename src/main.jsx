import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import { VirtualPrinter } from './VirtualPrinter.jsx';
import { cafeReceipt } from './receipt.js';
import { printerExamples } from './printerExamples.js';
import './demo.css';

function Demo() {
  const [selection, setSelection] = useState('cafe');
  const activeExample = printerExamples.find(example => example.id === selection);
  return <main className="demo">
    <h1 className="demo-title">Virtual Printer</h1>
    <div className="demo-picker">
      <label htmlFor="demo-input">Input example</label>
      <select id="demo-input" value={selection} onChange={event => setSelection(event.target.value)}>
        <option value="cafe">Structured café receipt</option>
        {printerExamples.map(example => <option value={example.id} key={example.id}>{example.label}</option>)}
      </select>
    </div>
    {activeExample ? <VirtualPrinter key={selection} content={activeExample.input} initiallyPrinted />
      : <VirtualPrinter key={selection} receipt={cafeReceipt} initiallyPrinted />}
  </main>;
}

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Demo />
  </React.StrictMode>,
);
