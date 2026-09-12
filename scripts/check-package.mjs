import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
import { existsSync } from 'node:fs';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';

const esm = await import('../dist/index.js');
assert.equal(typeof esm.VirtualPrinter, 'function');
assert.equal(typeof esm.parsePrinterMarkup, 'function');
assert.equal(typeof esm.normalizeTicket, 'function');
assert.ok(esm.SUPPORTED_PRINTER_TAGS.includes('QR'));

const require = createRequire(import.meta.url);
const cjs = require('../dist/index.cjs');
assert.equal(typeof cjs.VirtualPrinter, 'function');
assert.ok(existsSync(new URL('../dist/vprinter-react-component.css', import.meta.url)));

const markup = renderToStaticMarkup(React.createElement(esm.VirtualPrinter, {
  content: '<B>Smoke test</B>',
  initiallyPrinted: true,
  scrollable: false,
  paperMaxHeight: 320,
}));
assert.match(markup, /data-phase="printed"/);
assert.match(markup, /data-scrollable="false"/);
assert.match(markup, /--vp-paper-height:320px/);
assert.throws(() => esm.VirtualPrinter({}), /exactly one/);
assert.throws(() => esm.VirtualPrinter({ content: 'x', ticket: {} }), /exactly one/);
assert.throws(() => esm.VirtualPrinter({ content: 42 }), /content must be a string/);
assert.throws(() => esm.VirtualPrinter({ receipt: 'x' }), /receipt must be an object/);

console.log('package exports: ESM, CommonJS, and CSS verified');
