export function tearAxis(orientation, pointerType, grip, sideways, vertical) {
  if (Math.max(Math.abs(sideways), Math.abs(vertical)) < 10) return null;
  if (Math.abs(sideways) > Math.abs(vertical)) return 'horizontal';
  return orientation === 'front' && pointerType !== 'mouse' && !grip ? 'scroll' : 'vertical';
}
