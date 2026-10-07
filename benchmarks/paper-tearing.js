import React, { createRef } from 'react';
import { createRoot } from 'react-dom/client';
import { VirtualPrinter } from '../src/VirtualPrinter.jsx';
import { paintPaper } from '../src/paperSurface.js';

// Benchmark-only instrumentation; nothing here is included in the package or demo.
const recorded = new WeakMap();
let records = [], tracking = false, tearStarted = 0, tearDuration = 0;
const prototype = CanvasRenderingContext2D.prototype;
for (const name of ['setTransform', 'save', 'restore', 'drawImage']) {
  const original = prototype[name];
  prototype[name] = function (...args) {
    if (name === 'setTransform' && tracking && (this.canvas.dataset.benchmark || this.canvas.closest('.vp-paper-plane'))) {
      recorded.set(this, { at: performance.now(), depth: 0, draws: 0 });
    }
    const entry = recorded.get(this);
    if (entry && name === 'save') entry.depth++;
    if (entry && name === 'drawImage') entry.draws++;
    const result = original.apply(this, args);
    if (entry && name === 'restore' && --entry.depth === 0) {
      records.push({ at: entry.at, ms: performance.now() - entry.at, draws: entry.draws,
        pixels: this.canvas.width * this.canvas.height, detached: tearStarted && entry.at - tearStarted >= tearDuration * .36,
        cachedFlight: this.canvas.closest('.vp')?.dataset.detached === 'true' });
      recorded.delete(this);
    }
    return result;
  };
}

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
const wait = async predicate => {
  const deadline = performance.now() + 7000;
  while (!predicate()) { if (performance.now() > deadline) throw new Error('Benchmark readiness timed out'); await sleep(20); }
};
const percentile = (values, p) => values.length ? [...values].sort((a, b) => a - b)[Math.min(values.length - 1, Math.floor(values.length * p))] : null;
const summary = values => ({ samples: values.length, p50: percentile(values, .5), p95: percentile(values, .95), max: values.length ? Math.max(...values) : null });
const cases = ['front', 'up'].flatMap(orientation => [false, true].flatMap(long => [false, true].map(scrollable => ({ orientation, long, scrollable }))));
const progress = text => { document.querySelector('#progress').textContent = text; };
const root = createRoot(document.querySelector('#printer'));
let instance = 0;

async function frameCadence() {
  const stamps = [];
  let frame;
  const sample = time => { stamps.push(time); frame = requestAnimationFrame(sample); };
  frame = requestAnimationFrame(sample);
  await sleep(3200);
  cancelAnimationFrame(frame);
  return summary(stamps.slice(1).map((time, i) => time - stamps[i]));
}

export async function measureRenderer({ painter = paintPaper, scenarios = cases } = {}) {
  const results = [];
  for (const scenario of scenarios) {
    progress(JSON.stringify(scenario));
    const width = scenario.orientation === 'front' ? 300 : 214, height = scenario.long ? 6000 : 240;
    const texture = document.createElement('canvas');
    texture.width = width; texture.height = height;
    const ink = texture.getContext('2d');
    ink.fillStyle = '#fff'; ink.fillRect(0, 0, width, height);
    ink.fillStyle = '#222'; ink.font = '12px monospace';
    for (let y = 20; y < height; y += 20) ink.fillText(`Paper row ${y / 20}   15.90`, 10, y);
    const canvas = document.createElement('canvas'); canvas.dataset.benchmark = 'true';
    const context = canvas.getContext('2d');
    const start = scenario.scrollable && scenario.long ? 1800 : 0;
    const end = scenario.scrollable ? start + Math.min(height, 260) : height;
    const anchor = scenario.orientation === 'front' ? start : end;
    const bitmap = { texture, width, height, paperColor: '#fff' };
    const times = [], fences = [];
    records = []; tracking = true; tearStarted = 0;
    for (let sample = -6; sample < 36; sample++) {
      const p = (Math.max(0, sample) + 1) / 36;
      const before = performance.now();
      painter(canvas, bitmap, { direction: scenario.orientation === 'front' ? 1 : -1,
        start, end, anchor, lever: (end - start) * .65, x: 24 + Math.sin(p * Math.PI) * 12,
        y: scenario.orientation === 'front' ? 6 : -6, grip: .65,
        tearAt: 1, tearDuration: 900, tearProgress: p * .36, tearSide: 1 });
      const submitted = performance.now();
      // One-pixel readback fences raster work. Record it separately from JS submission.
      context.getImageData(0, 0, 1, 1);
      if (sample >= 0) { times.push(submitted - before); fences.push(performance.now() - submitted); }
    }
    tracking = false;
    results.push({ ...scenario, width, height, paintMs: summary(times), rasterFenceMs: summary(fences),
      draws: summary(records.slice(6).map(entry => entry.draws)), pixels: Math.max(...records.map(entry => entry.pixels)) });
    texture.width = canvas.width = 0;
    await sleep(20);
  }
  return { environment: { userAgent: navigator.userAgent, viewport: [innerWidth, innerHeight], dpr: devicePixelRatio },
    rafIntervalMs: await frameCadence(), results };
}

export async function measureInteractions({ shadow = true, repeats = 3 } = {}) {
  const override = document.createElement('style');
  if (!shadow) override.textContent = '.vp[data-flexing="true"] .vp-paper-surface,.vp[data-flexing="true"] canvas {filter:none!important}';
  document.head.append(override);
  const results = [];
  try {
    for (const scenario of cases) {
      progress(JSON.stringify(scenario));
      const samples = [], intervals = [], durations = [], drawCounts = [], pixels = [];
      let detachedPaints = 0;
      let cachedFlightPaints = 0;
      for (let repeat = 0; repeat < repeats; repeat++) {
        const ref = createRef();
        const content = ['<C><B>PERFORMANCE RECEIPT</B></C>', '<LOGO>',
          ...Array.from({ length: scenario.long ? 240 : 4 }, (_, i) => `${i + 1} Paper item             15.90`),
          '<QR>https://example.test/receipt/029</QR>', '<B>END OF RECEIPT</B>'].join('\n');
        root.render(React.createElement(VirtualPrinter, { key: ++instance, ref, content,
          initiallyPrinted: true, orientation: scenario.orientation, scrollable: scenario.scrollable, paperMaxHeight: 260 }));
        await wait(() => ref.current && document.querySelector('#printer [data-raster-ready="true"]'));
        const paper = document.querySelector('#printer .vp-paper-scroll');
        paper.scrollTop = Math.round((paper.scrollHeight - paper.clientHeight) / 2);
        records = []; tracking = true; tearStarted = performance.now();
        ref.current.tear();
        tearDuration = parseFloat(paper.parentElement.style.getPropertyValue('--vp-tear-time'));
        await wait(() => document.querySelector('#printer .vp').dataset.phase === 'ready');
        tracking = false;
        durations.push(performance.now() - tearStarted);
        const paints = records.filter(entry => entry.at - tearStarted < tearDuration);
        samples.push(...paints.map(entry => entry.ms)); drawCounts.push(...paints.map(entry => entry.draws));
        pixels.push(...paints.map(entry => entry.pixels));
        detachedPaints += paints.filter(entry => entry.detached).length;
        cachedFlightPaints += paints.filter(entry => entry.cachedFlight).length;
        intervals.push(...paints.slice(1).map((entry, i) => entry.at - paints[i].at));
      }
      results.push({ ...scenario, paintMs: summary(samples), canvasPaintIntervalMs: summary(intervals),
        durationMs: summary(durations), drawCounts: summary(drawCounts), canvasPixels: summary(pixels), detachedPaints, cachedFlightPaints });
    }
  } finally { override.remove(); tracking = false; }
  return { shadow, repeats, results };
}

window.paperBenchmark = { measureRenderer, measureInteractions };
for (const [id, run] of [['renderer', measureRenderer], ['interaction', measureInteractions]]) {
  document.querySelector('#' + id).onclick = async () => {
    try { const results = await run(); document.querySelector('#results').textContent = JSON.stringify(results, null, 2); progress('Done'); }
    catch (error) { progress(error.message); }
  };
}
