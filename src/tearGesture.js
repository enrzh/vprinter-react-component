export function tearAxis(orientation, pointerType, grip, sideways, vertical) {
  if (Math.max(Math.abs(sideways), Math.abs(vertical)) < 10) return null;
  if (Math.abs(sideways) > Math.abs(vertical)) return 'horizontal';
  return orientation === 'front' && pointerType !== 'mouse' && !grip ? 'scroll' : 'vertical';
}

export function tearThreshold(orientation, axis, width) {
  if (axis === 'horizontal') return orientation === 'front' ? 34 : Math.min(72, Math.max(36, width * 0.28));
  return orientation === 'up' ? 40 : 32;
}

// The sheet lags the finger while it is still held, then meets the finger at the rip.
export function tearTravel(distance, threshold) {
  if (!(distance > 0) || !(threshold > 0)) return 0;
  const held = Math.min(1, distance / threshold);
  return distance * (2 + 3 * held) / 5;
}
