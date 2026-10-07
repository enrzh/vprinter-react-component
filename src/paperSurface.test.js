import assert from 'node:assert/strict';
import test from 'node:test';
import { paintPaper } from './paperSurface.js';

test('bending and tearing draw the same ink-and-paper texture with bounded allocation', () => {
  const previousPath = globalThis.Path2D;
  globalThis.Path2D = class { constructor(path) { this.path = path; } };
  try {
    const draws = [], transforms = [], clips = [];
    const context = {
      setTransform() {}, clearRect() {}, save() {}, restore() {}, fillRect() {},
      beginPath() {}, moveTo() {}, lineTo() {}, closePath() {}, fill() {},
      clip(path) { if (path) clips.push(path.path); },
      transform(...matrix) { transforms.push(matrix); },
      drawImage(...args) { draws.push(args); },
      createLinearGradient() { return { addColorStop() {} }; },
    };
    const canvas = { width: 0, height: 0, style: {}, getContext: () => context };
    const texture = { width: 500, height: 10000 };
    const bitmap = { texture, width: 500, height: 10000 };
    paintPaper(canvas, bitmap);
    assert.equal(draws.length, 1);
    assert.equal(draws[0][0], texture);
    assert.ok(canvas.width * canvas.height < 4010000);
    assert.ok(canvas.width <= 16001 && canvas.height <= 16001);
    draws.length = 0;
    paintPaper(canvas, bitmap, { anchor: 7200, lever: 800, direction: 1, x: 45, y: 8,
      tearAt: performance.now() - 100, tearDuration: 800, tearSide: 1 });
    assert.ok(draws.length > 1 && draws.length <= 1600);
    assert.ok(draws.every(draw => draw[0] === texture));
    assert.ok(draws.every(draw => draw[2] >= 7199.6));
    assert.ok(transforms.every(matrix => matrix.every(Number.isFinite)));
    assert.notEqual(clips[0], clips[1]);
    for (const direction of [1, -1]) {
      draws.length = 0;
      paintPaper(canvas, bitmap, { start: 400, end: 720, anchor: direction > 0 ? 400 : 720,
        lever: 240, direction, x: 24, y: direction * 5, tearAt: performance.now() - 100,
        tearDuration: 800, tearSide: 1 });
      assert.ok(draws.length > 1);
      assert.ok(draws.every(draw => draw[2] >= 399.6 && draw[2] + draw[4] <= 720.4));
      assert.ok(parseFloat(canvas.style.height) < 1100, 'scroll-mode allocation excludes hidden receipt rows');
      assert.ok(parseFloat(canvas.style.top) > 0, 'the cropped canvas retains its original paper coordinates');
      assert.ok(canvas.width / parseFloat(canvas.style.width) <= texture.width / bitmap.width, 'animation does not upsample the cached ink');
    }
    draws.length = 0;
    paintPaper(canvas, bitmap, { start: 0, end: 400, anchor: 0, lever: 240, direction: 1, x: 0, y: 12 });
    assert.ok(draws.every(draw => draw[0] === texture));
    assert.ok(draws.some(draw => draw[8] > draw[4]), 'rectangle draws preserve vertical paper deformation');
  } finally {
    if (previousPath === undefined) delete globalThis.Path2D; else globalThis.Path2D = previousPath;
  }
});
