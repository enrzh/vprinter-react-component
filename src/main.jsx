import React from 'react';
import { createRoot } from 'react-dom/client';
import { VirtualPrinter } from './VirtualPrinter.jsx';
import { cafeReceipt } from './receipt.js';
import './demo.css';

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <main className="demo">
      <h1 className="demo-title">Virtual Printer</h1>
      <VirtualPrinter receipt={cafeReceipt} initiallyPrinted />
    </main>
  </React.StrictMode>,
);
