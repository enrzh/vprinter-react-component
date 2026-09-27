import assert from 'node:assert/strict';
import test from 'node:test';
import { tearAxis } from './tearGesture.js';

test('front-feed sideways touch tears from the receipt while vertical touch scrolls', () => {
  assert.equal(tearAxis('front', 'touch', false, 30, 5), 'horizontal');
  assert.equal(tearAxis('front', 'touch', false, 5, 30), 'scroll');
  assert.equal(tearAxis('front', 'touch', true, 5, 30), 'vertical');
  assert.equal(tearAxis('front', 'mouse', false, 5, 30), 'vertical');
  assert.equal(tearAxis('up', 'touch', false, 5, -30), 'vertical');
  assert.equal(tearAxis('front', 'touch', false, 4, 3), null);
});
