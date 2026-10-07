import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
import { existsSync, readFileSync } from 'node:fs';
import React, { act, createRef } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { Window } from 'happy-dom';

const esm = await import('../lib/index.js');
assert.equal(esm.VirtualPrinter.$$typeof, Symbol.for('react.forward_ref'));
assert.equal(typeof esm.parsePrinterMarkup, 'function');
assert.equal(typeof esm.normalizeTicket, 'function');
assert.ok(esm.SUPPORTED_PRINTER_TAGS.includes('QR'));
assert.equal(esm.parsePrinterMarkup('<B>Hi</B>')[0].parts[0].type, 'text');

const markupEntry = await import('../lib/markup.js');
const ticketEntry = await import('../lib/ticket.js');
assert.equal(typeof markupEntry.parsePrinterMarkup, 'function');
assert.equal(markupEntry.VirtualPrinter, undefined);
assert.equal(typeof ticketEntry.normalizeTicket, 'function');
assert.equal(ticketEntry.VirtualPrinter, undefined);

const require = createRequire(import.meta.url);
const cjs = require('../lib/index.cjs');
assert.equal(cjs.VirtualPrinter.$$typeof, Symbol.for('react.forward_ref'));
assert.equal(typeof require('../lib/markup.cjs').parsePrinterMarkup, 'function');
assert.equal(typeof require('../lib/ticket.cjs').normalizeTicket, 'function');
assert.ok(existsSync(new URL('../lib/vprinter-react-component.css', import.meta.url)));
assert.ok(existsSync(new URL('../src/styles.d.ts', import.meta.url)));

const indexSource = readFileSync(new URL('../lib/index.js', import.meta.url), 'utf8');
const cjsSource = readFileSync(new URL('../lib/index.cjs', import.meta.url), 'utf8');
assert.doesNotMatch(indexSource, /WebGLRenderer/);
assert.doesNotMatch(cjsSource, /WebGLRenderer/);
const specifier = [...indexSource.matchAll(/import\(\s*['"](\.\/[^'"]+)['"]\s*\)/g)].map(match => match[1]).find(path => path.includes('TabletopPrinter'));
assert.ok(specifier, 'tabletop printer is a separate chunk');
const chunkUrl = new URL(specifier, new URL('../lib/index.js', import.meta.url));
const chunkSource = readFileSync(chunkUrl, 'utf8');
assert.match(chunkSource, /WebGLRenderer/);
const tabletop = await import(chunkUrl.href);
assert.match(renderToStaticMarkup(React.createElement(tabletop.TabletopPrinter, { phase: 'printed' })), /vp-model-canvas/);

const css = readFileSync(new URL('../lib/vprinter-react-component.css', import.meta.url), 'utf8');
assert.match(css, /--vp-columns:\s*48/);
assert.match(readFileSync(new URL('../src/VirtualPrinter.css', import.meta.url), 'utf8'), /--vp-feed-duration:\s*1900ms/);
assert.match(css, /--vp-feed-duration:1\.9s/);
assert.match(css, /white-space:\s*pre/);
assert.doesNotMatch(css, /vp-markup-line--dense/);
assert.doesNotMatch(indexSource, /demo-share|demo-header|demo-style-switch|createPrinterImage/);

const markup = renderToStaticMarkup(React.createElement(esm.VirtualPrinter, {
  content: '<B>Smoke test</B>',
  initiallyPrinted: true,
  scrollable: false,
  paperMaxHeight: 320,
}));
assert.match(markup, /data-phase="printed"/);
assert.match(markup, /data-scrollable="false"/);
assert.match(markup, /--vp-paper-height:320px/);

const grid = renderToStaticMarkup(React.createElement(esm.VirtualPrinter, {
  content: '<W>AB</W><BR><QR>https://example.test/order/029</QR>',
  initiallyPrinted: true,
}));
assert.match(grid, /vp-markup-qr-svg/);
assert.match(grid, /width:4ch/);
assert.match(grid, /https:\/\/example\.test\/order\/029/);
assert.doesNotMatch(grid, /vp-markup-line--dense/);

const upward = renderToStaticMarkup(React.createElement(esm.VirtualPrinter, {
  content: '<B>Smoke test</B>', orientation: 'up', initiallyPrinted: true,
}));
assert.doesNotMatch(upward, /vp-model-canvas/);
assert.match(upward, /vp-housing/);
assert.match(upward, /aria-label="Printer controls"/);

const invalid = renderToStaticMarkup(React.createElement(esm.VirtualPrinter, {
  receipt: { ...esm.cafeReceipt, items: [] },
  initiallyPrinted: true,
}));
assert.match(invalid, /role="alert"/);
assert.match(invalid, /at least one item/);

const unkeyed = renderToStaticMarkup(React.createElement(esm.VirtualPrinter, {
  receipt: {
    ...esm.cafeReceipt,
    items: [
      { name: 'Soup', quantity: 1, unitAmount: 100 },
      { name: 'Bread', quantity: 2, unitAmount: 50 },
    ],
  },
  initiallyPrinted: true,
}));
assert.match(unkeyed, /1x Soup/);
assert.match(unkeyed, /2x Bread/);

const render = props => renderToStaticMarkup(React.createElement(esm.VirtualPrinter, props));
assert.throws(() => render({}), /exactly one/);
assert.throws(() => render({ content: 'x', ticket: {} }), /exactly one/);
assert.throws(() => render({ content: 42 }), /content must be a string/);
assert.throws(() => render({ receipt: 'x' }), /receipt must be an object/);

const win = new Window({ url: 'http://localhost/' });
globalThis.window = win;
globalThis.document = win.document;
globalThis.HTMLElement = win.HTMLElement;
globalThis.SVGElement = win.SVGElement;
globalThis.Element = win.Element;
globalThis.Node = win.Node;
globalThis.DocumentFragment = win.DocumentFragment;
globalThis.MutationObserver = win.MutationObserver;
globalThis.ResizeObserver = win.ResizeObserver;
globalThis.AnimationEvent = win.AnimationEvent;
globalThis.getComputedStyle = win.getComputedStyle.bind(win);
globalThis.requestAnimationFrame = callback => win.requestAnimationFrame(callback);
globalThis.cancelAnimationFrame = id => win.cancelAnimationFrame(id);
globalThis.IS_REACT_ACT_ENVIRONMENT = true;
let reduceMotion = false;
win.matchMedia = query => ({
  matches: reduceMotion && String(query).includes('prefers-reduced-motion'),
  media: String(query),
  addEventListener() {},
  removeEventListener() {},
  addListener() {},
  removeListener() {},
  dispatchEvent() { return false; },
});
globalThis.matchMedia = win.matchMedia;

const { createRoot } = await import('react-dom/client');

// Exercise the public ref against the built package with no internal buttons.
let externalPrints = 0, externalTears = 0;
const externalRef = createRef();
const external = await mount({ content: 'Original', ref: externalRef, controls: false,
  onPrinted: () => { externalPrints++; }, onTear: () => { externalTears++; } });
const sibling = await mount({ ticket: { title: 'Independent' }, initiallyPrinted: true });
assert.equal(external.host.querySelector('.vp-controls'), null);
assert.equal(typeof externalRef.current.print, 'function');
assert.equal(typeof externalRef.current.tear, 'function');
await act(async () => { externalRef.current.tear(); });
assert.equal(external.phase(), 'ready');
await act(async () => { externalRef.current.print(); externalRef.current.print(); externalRef.current.tear(); });
assert.equal(external.phase(), 'printing');
await act(async () => { external.root.render(React.createElement(esm.VirtualPrinter, {
  content: 'Updated', ref: externalRef, controls: false,
  onPrinted: () => { externalPrints++; }, onTear: () => { externalTears++; },
})); });
assert.match(external.host.textContent, /Original/);
assert.doesNotMatch(external.host.textContent, /Updated/);
await act(async () => {
  external.host.querySelector('.vp').dispatchEvent(new win.AnimationEvent('animationend', {
    animationName: 'vp-motor-feed', bubbles: true,
  }));
});
assert.equal(external.phase(), 'printed');
assert.equal(externalPrints, 1);
await act(async () => { externalRef.current.tear(); externalRef.current.tear(); externalRef.current.print(); });
assert.equal(external.phase(), 'tearing');
assert.equal(sibling.phase(), 'printed');
await act(async () => {
  for (let attempt = 0; attempt < 60 && external.phase() === 'tearing'; attempt++) {
    await new Promise(resolve => setTimeout(resolve, 25));
  }
});
assert.equal(external.phase(), 'ready');
assert.equal(externalTears, 1);
await act(async () => { externalRef.current.print(); });
assert.match(external.host.textContent, /Updated/);
assert.equal(sibling.phase(), 'printed');
await act(async () => { external.root.unmount(); sibling.root.unmount(); });
assert.equal(externalRef.current, null);

async function mount(props) {
  const host = document.createElement('div');
  document.body.appendChild(host);
  const root = createRoot(host);
  await act(async () => { root.render(React.createElement(esm.VirtualPrinter, props)); });
  const phase = () => host.querySelector('.vp')?.dataset.phase;
  const clickPrint = () => act(async () => { host.querySelector('.vp-print').click(); });
  return { root, host, phase, clickPrint };
}

const animated = await mount({ content: 'Hello' });
assert.equal(animated.phase(), 'ready');
await animated.clickPrint();
assert.equal(animated.phase(), 'printing');
await act(async () => {
  animated.host.querySelector('.vp').dispatchEvent(new win.AnimationEvent('animationend', {
    animationName: 'vp-motor-feed', bubbles: true,
  }));
});
assert.equal(animated.phase(), 'printed');
await act(async () => { animated.root.unmount(); });

const timed = await mount({ content: 'Hello again' });
await timed.clickPrint();
assert.equal(timed.phase(), 'printing');
await act(async () => { await new Promise(resolve => setTimeout(resolve, 3500)); });
assert.equal(timed.phase(), 'printed');
await act(async () => { timed.root.unmount(); });

let tears = 0;
const pulling = await mount({ content: 'Attached paper', initiallyPrinted: true, onTear: () => { tears++; } });
const independent = await mount({ content: 'Another printer', initiallyPrinted: true });
const sheet = pulling.host.querySelector('.vp-paper-scroll');
// happy-dom has no native pointer capture; gesture state remains component-owned.
sheet.setPointerCapture = () => {};
sheet.hasPointerCapture = () => false;
const pointer = (type, clientX) => act(async () => {
  sheet.dispatchEvent(new win.PointerEvent(type, { bubbles: true, pointerId: 1, isPrimary: true, pointerType: 'mouse', clientX, clientY: 80 }));
});
await pointer('pointerdown', 100);
await pointer('pointermove', 128);
assert.equal(pulling.host.querySelector('.vp').dataset.flexing, 'true');
await pointer('lostpointercapture', 128);
await act(async () => {
  for (let attempt = 0; attempt < 100 && pulling.host.querySelector('.vp').dataset.flexing; attempt++) {
    await new Promise(resolve => setTimeout(resolve, 20));
  }
});
assert.equal(pulling.phase(), 'printed');
assert.equal(pulling.host.querySelector('.vp').dataset.flexing, undefined);
assert.equal(tears, 0);
await pointer('pointerdown', 100);
await pointer('pointermove', 145);
await pointer('pointerup', 145);
assert.equal(pulling.phase(), 'tearing');
assert.equal(sheet.querySelector('.vp-paper').style.getPropertyValue('--vp-cut-bottom'), '-100vh');
assert.match(sheet.parentElement.style.getPropertyValue('--vp-tear-time'), /^\d+ms$/);
await act(async () => {
  for (let attempt = 0; attempt < 60 && pulling.phase() === 'tearing'; attempt++) {
    await new Promise(resolve => setTimeout(resolve, 25));
  }
  sheet.dispatchEvent(new win.AnimationEvent('animationend', { animationName: 'vp-tear', bubbles: true }));
  sheet.dispatchEvent(new win.AnimationEvent('animationend', { animationName: 'vp-tear', bubbles: true }));
});
assert.equal(pulling.phase(), 'ready');
assert.equal(tears, 1);
assert.equal(pulling.host.querySelectorAll('[data-paper-bend]').length, 0);
assert.equal(sheet.parentElement.style.getPropertyValue('--vp-tear-time'), '');
assert.equal(independent.phase(), 'printed');
await pulling.clickPrint();
await act(async () => {
  pulling.host.querySelector('.vp').dispatchEvent(new win.AnimationEvent('animationend', { animationName: 'vp-motor-feed', bubbles: true }));
});
await pointer('pointerdown', 100);
await pointer('pointermove', 128);
await act(async () => { pulling.root.render(React.createElement(esm.VirtualPrinter, { content: 'Replacement', resetKey: 1 })); });
assert.equal(pulling.phase(), 'ready');
assert.equal(pulling.host.querySelector('.vp').dataset.flexing, undefined);
assert.equal(pulling.host.querySelectorAll('[data-paper-bend]').length, 0);
await act(async () => { pulling.root.unmount(); independent.root.unmount(); });

reduceMotion = true;
const reduced = await mount({ content: 'Skip' });
await reduced.clickPrint();
assert.equal(reduced.phase(), 'printed');
const reducedSheet = reduced.host.querySelector('.vp-paper-scroll');
reducedSheet.setPointerCapture = () => {};
await act(async () => {
  for (const [type, clientX] of [['pointerdown', 100], ['pointermove', 125], ['pointerup', 125]]) {
    reducedSheet.dispatchEvent(new win.PointerEvent(type, { bubbles: true, pointerId: 2, isPrimary: true, pointerType: 'mouse', clientX, clientY: 80 }));
  }
});
assert.equal(reduced.phase(), 'printed');
assert.equal(reduced.host.querySelector('.vp').dataset.flexing, undefined);
await act(async () => { reduced.host.querySelector('.vp-tear').click(); });
assert.equal(reduced.phase(), 'ready');
await act(async () => { reduced.root.unmount(); });
await win.happyDOM.abort();

console.log('package exports, external controls, input snapshots, print/tear phases, pointer cancellation, independent instances, and reduced motion verified');
