import { paperContour, paperStations, paperRow, paperPoint, tearFrame } from './tearGesture.js';

// Bound each bitmap to 4 MP, including on long receipts and high-DPI screens.
function pixelRatio(width, height) {
  return Math.min(2, Math.sqrt(4000000 / (width * height)), 16000 / Math.max(width, height));
}

export async function rasterizePaper(article) {
  const { toCanvas } = await import('html-to-image');
  await document.fonts?.ready;
  const width = article.offsetWidth, height = article.offsetHeight;
  const texture = await toCanvas(article, {
    width, height, pixelRatio: pixelRatio(width, height), skipFonts: true,
    filter: node => !node.classList?.contains('vp-paper-surface') && !node.classList?.contains('vp-paper-grip'),
    style: { transform: 'none', visibility: 'visible' },
  });
  if (!texture.width || !texture.height) {
    texture.width = 0;
    throw new Error('The paper bitmap has no drawable pixels.');
  }
  return { texture, width, height, paperColor: getComputedStyle(article).backgroundColor };
}

export function paintPaper(canvas, bitmap, bend = {}) {
  const { texture, width, height } = bitmap;
  const direction = bend.direction || 1;
  const anchor = bend.anchor ?? (direction > 0 ? 0 : height);
  const lever = bend.lever || height;
  const x = bend.x || 0, y = bend.y || 0;
  const torn = Boolean(bend.tearAt);
  const motion = torn ? tearFrame(bend.tearProgress ?? (performance.now() - bend.tearAt) / bend.tearDuration) : { peel: 0, release: 0, flutter: 0 };
  const { peel, release, flutter } = motion;
  const side = bend.tearSide || 1;
  const start = Math.max(bend.start ?? 0, torn && direction > 0 ? anchor : 0);
  const end = Math.min(bend.end ?? height, torn && direction < 0 ? anchor : height);
  const padding = direction > 0 ? 128 : Math.ceil(Math.max(128, width * .7));
  const outputWidth = width + padding * 2, outputHeight = end - start + padding * 2;
  // A cropped surface needs movement padding, not pixels beyond its source resolution.
  const ratio = Math.min(pixelRatio(outputWidth, outputHeight), texture.width / width);
  const pixelWidth = Math.max(1, Math.floor(outputWidth * ratio));
  const pixelHeight = Math.max(1, Math.floor(outputHeight * ratio));
  if (canvas.width !== pixelWidth || canvas.height !== pixelHeight || canvas.style.width !== `${outputWidth}px` || canvas.style.height !== `${outputHeight}px`) {
    canvas.width = pixelWidth;
    canvas.height = pixelHeight;
    Object.assign(canvas.style, { left: `${-padding}px`, width: `${outputWidth}px`, height: `${outputHeight}px` });
  }
  canvas.style.top = `${start - padding}px`;
  const context = canvas.getContext('2d');
  context.setTransform(ratio, 0, 0, ratio, padding * ratio, (padding - start) * ratio);
  context.clearRect(-padding, start - padding, outputWidth, outputHeight);
  context.save();
  const shape = { anchor, lever, x, y, direction, torn, peel, side, release, flutter, start: bend.start, end: bend.end };
  const rows = new Map();
  const rowAt = position => {
    if (!rows.has(position)) rows.set(position, paperRow(width, position, shape));
    return rows.get(position);
  };
  context.clip(new Path2D(paperContour(width, height, shape, rowAt)));
  context.fillStyle = bitmap.paperColor || '#fff';
  context.fillRect(-padding, start - padding, outputWidth, outputHeight);
  if (!x && !y && !torn) context.drawImage(texture, 0, 0, width, height);
  else {
    // Both halves of each mesh cell sample the same ink-and-paper texture.
    const stations = paperStations(height, shape);
    const triangle = (points, across, down, origin, u0, u1, position, size) => {
      const cellWidth = (u1 - u0) * width;
      context.save();
      context.beginPath();
      // A small overlap prevents white antialias seams between texture cells.
      const winding = Math.sign((points[1][0] - points[0][0]) * (points[2][1] - points[0][1]) - (points[1][1] - points[0][1]) * (points[2][0] - points[0][0])) || 1;
      const expanded = points.map((point, i) => {
        const previous = points[(i + 2) % 3], next = points[(i + 1) % 3];
        const before = [point[0] - previous[0], point[1] - previous[1]], after = [next[0] - point[0], next[1] - point[1]];
        const a = Math.max(.001, Math.hypot(...before)), b = Math.max(.001, Math.hypot(...after));
        const n1 = [winding * before[1] / a, -winding * before[0] / a], n2 = [winding * after[1] / b, -winding * after[0] / b];
        const scale = Math.min(2, .4 / Math.max(.02, 1 + n1[0] * n2[0] + n1[1] * n2[1]));
        return [point[0] + (n1[0] + n2[0]) * scale, point[1] + (n1[1] + n2[1]) * scale];
      });
      context.moveTo(...expanded[0]); context.lineTo(...expanded[1]); context.lineTo(...expanded[2]);
      context.closePath(); context.clip();
      context.transform(across[0] / cellWidth, across[1] / cellWidth, down[0] / size, down[1] / size, ...origin);
      const leftOverlap = Math.min(.4, u0 * width), rightOverlap = Math.min(.4, (1 - u1) * width);
      const topOverlap = Math.min(.4, position - start), bottomOverlap = Math.min(.4, Math.max(0, end - position - size));
      context.drawImage(texture, (u0 * width - leftOverlap) * texture.width / width, (position - topOverlap) * texture.height / height,
        (cellWidth + leftOverlap + rightOverlap) * texture.width / width, (size + topOverlap + bottomOverlap) * texture.height / height,
        -leftOverlap, -topOverlap, cellWidth + leftOverlap + rightOverlap, size + topOverlap + bottomOverlap);
      context.restore();
    };
    for (let station = 0; station < stations.length - 1; station++) {
      const position = stations[station], size = stations[station + 1] - position;
      const upper = rowAt(position), lower = rowAt(stations[station + 1]);
      const nearCut = torn && (upper.distance >= 0 && upper.distance < upper.depth || lower.distance >= 0 && lower.distance < lower.depth);
      if (!nearCut && !flutter && upper.tilt === 0 && lower.tilt === 0 && upper.centerX === lower.centerX) {
        // Axis-aligned paper is one rectangle, including any vertical bend between these rows.
        const topOverlap = Math.min(.4, position - start), bottomOverlap = Math.min(.4, Math.max(0, end - position - size));
        const verticalScale = (lower.centerY - upper.centerY) / size;
        context.drawImage(texture, 0, (position - topOverlap) * texture.height / height,
          texture.width, (size + topOverlap + bottomOverlap) * texture.height / height,
          upper.centerX - width / 2, upper.centerY - topOverlap * verticalScale, width, (size + topOverlap + bottomOverlap) * verticalScale);
        continue;
      }
      const columns = nearCut ? [...new Set([0, 1,
        Math.max(0, Math.min(1, upper.crease)), Math.max(0, Math.min(1, lower.crease))])].sort((a, b) => a - b) : [0, 1];
      for (let column = 0; column < columns.length - 1; column++) {
        const u0 = columns[column], u1 = columns[column + 1], cellWidth = (u1 - u0) * width;
        if (cellWidth < .001) continue;
        const left = paperPoint(upper, u0), right = paperPoint(upper, u1);
        const below = paperPoint(lower, u0), lowerRight = paperPoint(lower, u1);
        if (upper.crease < lower.crease) {
          triangle([left, right, lowerRight], [right[0] - left[0], right[1] - left[1]], [lowerRight[0] - right[0], lowerRight[1] - right[1]], left, u0, u1, position, size);
          triangle([left, lowerRight, below], [lowerRight[0] - below[0], lowerRight[1] - below[1]], [below[0] - left[0], below[1] - left[1]], left, u0, u1, position, size);
        } else {
          triangle([left, right, below], [right[0] - left[0], right[1] - left[1]], [below[0] - left[0], below[1] - left[1]], left, u0, u1, position, size);
          const across = [lowerRight[0] - below[0], lowerRight[1] - below[1]];
          triangle([right, lowerRight, below], across, [lowerRight[0] - right[0], lowerRight[1] - right[1]], [right[0] - across[0], right[1] - across[1]], u0, u1, position, size);
        }
      }
    }
  }
  if (torn && peel > 0) {
    const boundary = [], edge = [];
    const atCut = rowAt(anchor);
    for (let sample = 0; sample <= Math.ceil(atCut.depth / 4); sample++) {
      const distance = Math.min(atCut.depth, sample * 4);
      const row = rowAt(anchor + direction * distance);
      const u = Math.max(0, Math.min(1, row.crease));
      boundary.push(paperPoint(row, u));
      edge.push(paperPoint(row, side > 0 ? 1 : 0));
    }
    context.beginPath();
    context.moveTo(...boundary[0]);
    for (const point of [...edge, ...boundary.reverse()]) context.lineTo(...point);
    context.closePath();
    context.fillStyle = `rgba(0,0,0,${.16 * (1 - Math.cos(atCut.fold))})`;
    context.fill();
  }
  if (x || y) {
    const light = context.createLinearGradient(width * (bend.grip ?? .5), anchor, width * (1 - (bend.grip ?? .5)), anchor + direction * lever);
    light.addColorStop(0, '#00000000');
    light.addColorStop(.35, '#00000005');
    light.addColorStop(.52, '#ffffff12');
    light.addColorStop(1, '#00000000');
    context.globalAlpha = Math.min(1, Math.hypot(x, y) / 45);
    context.fillStyle = light;
    context.fillRect(-padding, start - padding, outputWidth, outputHeight);
  }
  context.restore();
}
