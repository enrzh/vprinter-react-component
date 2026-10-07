import assert from 'node:assert/strict';
import test from 'node:test';
import { tearAxis, tearThreshold, tearTravel } from './tearGesture.js';

test('front-feed sideways touch tears from the receipt while vertical touch scrolls', () => {
  assert.equal(tearAxis('front', 'touch', false, 30, 5), 'horizontal');
  assert.equal(tearAxis('front', 'touch', false, 5, 30), 'scroll');
  assert.equal(tearAxis('front', 'touch', true, 5, 30), 'vertical');
  assert.equal(tearAxis('front', 'mouse', false, 5, 30), 'vertical');
  assert.equal(tearAxis('up', 'touch', false, 5, -30), 'vertical');
  assert.equal(tearAxis('front', 'touch', false, 4, 3), null);
});

test('a tear holds the sheet, then lets it catch the finger', () => {
  assert.equal(tearTravel(0, 32), 0);
  assert.equal(tearTravel(-8, 32), 0);
  assert.ok(tearTravel(16, 32) < 14);
  assert.equal(tearTravel(32, 32), 32);
  assert.equal(tearTravel(90, 32), 90);
  assert.equal(tearThreshold('front', 'vertical', 400), 32);
  assert.equal(tearThreshold('front', 'horizontal', 400), 34);
  assert.equal(tearThreshold('up', 'vertical', 200), 40);
  assert.equal(tearThreshold('up', 'horizontal', 100), 36);
  assert.equal(tearThreshold('up', 'horizontal', 400), 72);
});
