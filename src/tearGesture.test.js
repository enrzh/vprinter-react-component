import assert from 'node:assert/strict';
import test from 'node:test';
import { tearAxis, tearThreshold, tearTravel, tearMotion, tearFrame, tearFlight, bendProfile, paperStations, paperContour, paperOutline, paperSection, paperRow, paperPoint, stepPaperSpring, feedDuration } from './tearGesture.js';

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

test('paper stays pinned at the cutter and follows the grip even on a long sheet', () => {
  assert.deepEqual(bendProfile(0, 900), { weight: 0, slope: 0 });
  assert.deepEqual(bendProfile(-50, 900), { weight: 0, slope: 0 });
  assert.deepEqual(bendProfile(900, 900), { weight: 1, slope: 0 });
  const front = paperOutline(200, 900, 0, 900, 32, 8, 1);
  assert.match(front, /^M0\.00,0\.00/);
  const [frontTip] = paperSection(200, 900, 0, 900, 32, 8, 1);
  assert.equal(frontTip[0], 32);
  assert.ok(frontTip[1] > 900 && frontTip[1] < 908);
  assert.ok(front.includes(`L32.00,${frontTip[1].toFixed(2)}`));
  const upward = paperOutline(200, 900, 900, 900, -32, -8, -1);
  const [upwardTip] = paperSection(200, 0, 900, 900, -32, -8, -1);
  assert.equal(upwardTip[0], -32);
  assert.ok(upwardTip[1] < 0 && upwardTip[1] > -8);
  assert.ok(upward.startsWith(`M-32.00,${upwardTip[1].toFixed(2)}`));
  assert.ok(upward.includes('L0.00,900.00'));
  assert.ok(upward.includes('L200.00,900.00'));
});

test('a short pull releases into a bounded spring and settles back at the cutter', () => {
  let value = 0, velocity = 0;
  for (let frame = 0; frame < 30; frame++) {
    ({ value, velocity } = stepPaperSpring(value, velocity, 35, 1 / 60));
    assert.ok(value >= 0 && value < 38);
  }
  for (let frame = 0; frame < 120; frame++) ({ value, velocity } = stepPaperSpring(value, velocity, 0, 1 / 60));
  assert.ok(Math.abs(value) < .01);
  assert.ok(Math.abs(velocity) < .01);
  const delayed = stepPaperSpring(0, 0, 35, .5);
  assert.ok(delayed.value > 0 && delayed.value < 35);
});

test('scroll-mode tears keep only the viewed paper, pinned at either outlet', () => {
  for (const direction of [1, -1]) {
    const anchor = direction > 0 ? 400 : 720;
    const bend = { start: 400, end: 720, anchor, lever: 240, direction, x: 24, y: direction * 5 };
    for (const torn of [false, true]) {
      const contour = paperContour(275, 5000, { ...bend, torn, peel: .2, side: 1 });
      const points = [...contour.matchAll(/[ML](-?[\d.]+),(-?[\d.]+)/g)].map(match => [Number(match[1]), Number(match[2])]);
      assert.ok(points.length > 100, 'the free edge retains fine teeth');
      assert.ok(points.every(([, y]) => y >= 395 && y <= 730), 'hidden receipt sections never pop into the tear');
      assert.ok(points.some(([x, y]) => x === 0 && y === anchor), 'the attached corner stays at the outlet');
    }
  }
});

test('long paper feeds at the same pace instead of racing a short fixed timeout', () => {
  assert.equal(feedDuration(1900, 250), 1900);
  assert.equal(feedDuration(1900, 1950), 5700);
  assert.equal(feedDuration(2800, 1300), 5600);
  assert.equal(feedDuration(1900, 50000), 16000);
});

test('mesh detail stays bounded by curvature and keeps a fine progressive fold', () => {
  for (const direction of [1, -1]) {
    const anchor = direction > 0 ? 0 : 10000;
    const stations = paperStations(10000, { anchor, direction, lever: 500, torn: true });
    assert.ok(stations.length <= 55, 'straight receipt length does not multiply mesh rows');
    const fold = stations.map(position => direction * (position - anchor)).filter(distance => distance >= 0 && distance <= 160).sort((a, b) => a - b);
    assert.ok(fold[0] === 0);
    assert.equal(fold.at(-1), 160);
    assert.ok(fold.slice(1).every((distance, i) => distance - fold[i] <= 6), 'the active fold remains finely sampled');
  }
});

test('the pulled corner peels first while the other corner remains at the cutter', () => {
  const partial = paperOutline(200, 300, 0, 250, 0, 0, 1, true, .5, 1);
  assert.match(partial, /^M0\.00,0\.00/);
  const [attached, peeling] = paperSection(200, 0, 0, 250, 0, 0, 1, true, .5, 1);
  assert.deepEqual(attached, [0, 0]);
  assert.ok(peeling[0] < 200 && peeling[1] > 10);
  assert.ok(partial.includes(`L${peeling[0].toFixed(2)},${peeling[1].toFixed(2)}`));
  const complete = paperOutline(200, 300, 0, 250, 0, 0, 1, true, 1, 1);
  const [lastCorner] = paperSection(200, 0, 0, 250, 0, 0, 1, true, 1, 1);
  assert.ok(lastCorner[1] > 0 && lastCorner[1] < peeling[1]);
  assert.ok(complete.startsWith(`M${lastCorner.map(n => n.toFixed(2)).join(',')}`));
  const upward = paperOutline(200, 300, 300, 250, 0, 0, -1, true, .5, -1);
  const [upPeeling, upAttached] = paperSection(200, 300, 300, 250, 0, 0, -1, true, .5, -1);
  assert.ok(upPeeling[0] > 0 && upPeeling[1] < 290);
  assert.deepEqual(upAttached, [200, 300]);
  assert.ok(upward.includes(`L${upPeeling.map(n => n.toFixed(2)).join(',')}`));
  assert.ok(upward.includes('L200.00,300.00'));
});

test('release direction and speed shape a bounded throw that still falls downward', () => {
  const slow = tearMotion('front', 50, .1, 0);
  const fast = tearMotion('front', 50, 2, 0);
  assert.ok(fast.duration < slow.duration);
  assert.ok(fast.x > slow.x);
  assert.ok(fast.rotation > slow.rotation);
  const left = tearMotion('front', -50, -2, 0);
  assert.equal(left.x, -fast.x);
  assert.equal(left.rotation, -fast.rotation);
  const upward = tearMotion('up', 0, 0, -20, .2);
  assert.ok(upward.x < 0);
  assert.equal(upward.lift, -65);
  assert.ok(upward.lift + 170 > 0);
  assert.equal(upward.duration, 760);
  assert.equal(tearMotion('front', 50, 20, 20).x, 168);
});

test('the tear crosses the cutter before flight starts and the loose sheet ripples', () => {
  assert.deepEqual(tearFrame(0), { peel: 0, release: 0, flutter: 0 });
  const halfway = tearFrame(.18);
  assert.equal(halfway.peel, .5);
  assert.equal(halfway.release, 0);
  assert.equal(tearFrame(.36).peel, 1);
  assert.equal(tearFrame(.36).release, 0);
  assert.ok(Math.abs(tearFrame(.6).flutter) > .1);
  assert.deepEqual(tearFrame(1), { peel: 1, release: 1, flutter: 0 });
  const motion = tearMotion('front', 50, 1, 0);
  assert.deepEqual(tearFlight(.18, motion), { x: 0, y: 0, rotation: 0, opacity: 1 });
  const free = tearFlight(.7, motion);
  assert.ok(free.x > 0 && free.y > 0 && free.opacity === 1);
  assert.equal(tearFlight(1, motion).opacity, 0);
});

test('a diagonal fold stays continuous at its crease and foreshortens without flipping the print', () => {
  const bend = { anchor: 0, lever: 250, direction: 1, torn: true, peel: .5, side: 1 };
  const row = paperRow(200, 40, bend);
  const a = paperPoint(row, row.crease - .000001), b = paperPoint(row, row.crease + .000001);
  assert.ok(Math.hypot(a[0] - b[0], a[1] - b[1]) < .001);
  const atCut = paperRow(200, 0, bend), atEnd = paperRow(200, atCut.depth, bend);
  const hinge = paperPoint(atCut, atCut.crease), tip = paperPoint(atCut, 1), end = paperPoint(atEnd, 1);
  const area = ((tip[0] - hinge[0]) * (end[1] - hinge[1]) - (tip[1] - hinge[1]) * (end[0] - hinge[0])) / 2;
  assert.ok(area > 0 && area < (200 - hinge[0]) * atCut.depth / 2);
});
