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

// The cutter stays flat; the bend spreads toward the hand and levels out beyond it.
export function bendProfile(distance, gripDistance) {
  const lever = Math.max(48, gripDistance);
  const u = Math.min(1, Math.max(0, distance / lever));
  return { weight: u * u * (3 - 2 * u), slope: 6 * u * (1 - u) / lever };
}

const clampUnit = value => Math.min(1, Math.max(0, value));
const smooth = value => { const u = clampUnit(value); return u * u * (3 - 2 * u); };

export function tearFrame(progress) {
  const release = clampUnit((progress - .36) / .64);
  return { peel: smooth(progress / .36), release, flutter: Math.sin(release * Math.PI * 2.5) * (1 - release) };
}

export function tearFlight(progress, motion) {
  const { release, flutter } = tearFrame(progress);
  const side = Math.sign(motion.x || 1);
  return {
    x: motion.x * release * release,
    y: motion.lift * Math.sin(Math.PI * release) + 170 * release * release,
    rotation: motion.rotation * release + side * flutter * 2,
    opacity: 1 - smooth((release - .7) / .3),
  };
}

export function paperRow(width, position, bend) {
  const { anchor = 0, lever = 48, x = 0, y = 0, direction = 1, torn = false, peel = 0, release = 0, flutter = 0, side = 1 } = bend;
  const distance = direction * (position - anchor);
  const length = Math.max(48, lever);
  const pull = Math.max(-length * .55, Math.min(length * .55, x));
  const profile = bendProfile(distance, length);
  const u = clampUnit(distance / length);
  let shortening = 0;
  // Integrate the curve's projected length instead of stretching the receipt.
  for (let i = 0; i < 8; i++) {
    const t = u * (i + .5) / 8;
    const slope = pull * 6 * t * (1 - t) / length;
    shortening += (1 - Math.sqrt(1 - slope * slope)) * length * u / 8;
  }
  const depth = Math.min(160, Math.max(72, length * .65));
  const crease = torn ? side > 0 ? 1 - peel * 1.08 : peel * 1.08 : side > 0 ? 1 : 0;
  const reach = (side > 0 ? 1 - crease : crease) * width;
  const axisLength = Math.hypot(reach, depth);
  const angle = torn ? Math.min(1.25, 1.1 * Math.sin(peel * Math.PI * .75) + Math.abs(y) / 100) * (1 - release * .75) : 0;
  const tilt = Math.max(-.24, Math.min(.24, -direction * Math.atan(pull * profile.slope +
    (distance > 0 && distance < 500 ? flutter * 7 * Math.PI / 500 * Math.cos(Math.PI * distance / 500) : 0))));
  return {
    width, anchor, position, distance, depth, side,
    centerX: width / 2 + pull * profile.weight + flutter * 7 * Math.sin(Math.PI * clampUnit(distance / 500)),
    centerY: position + y * profile.weight - direction * shortening,
    tilt, cosTilt: Math.cos(tilt), sinTilt: Math.sin(tilt), cosFold: Math.cos(angle),
    crease: crease + side * distance / depth * (side > 0 ? 1 - crease : crease),
    hinge: (crease - .5) * width,
    axisX: side * reach / axisLength, axisY: direction * depth / axisLength,
    fold: angle, flutter,
  };
}

export function paperPoint(row, u) {
  let across = (u - .5) * row.width;
  let along = row.position - row.anchor;
  const folded = row.distance >= 0 && row.distance < row.depth && row.side * (u - row.crease) > 0;
  if (folded) {
    const relativeX = across - row.hinge;
    const dot = row.axisX * relativeX + row.axisY * along;
    const cosine = row.cosFold ?? Math.cos(row.fold);
    across = row.hinge + relativeX * cosine + row.axisX * dot * (1 - cosine);
    along = along * cosine + row.axisY * dot * (1 - cosine);
  }
  const lift = along - (row.position - row.anchor);
  const cosine = row.cosTilt ?? Math.cos(row.tilt), sine = row.sinTilt ?? Math.sin(row.tilt);
  return [row.centerX + across * cosine - lift * sine,
    row.centerY + across * sine + lift * cosine];
}

export function paperSection(width, position, anchor, gripDistance, x, y, direction, torn = false, peel = 0, side = 1) {
  const row = paperRow(width, position, { anchor, lever: gripDistance, x, y, direction, torn, peel, side });
  return [paperPoint(row, 0), paperPoint(row, 1)];
}

export function paperOutline(width, height, anchor, gripDistance, x, y, direction, torn = false, peel = 0, side = 1) {
  return paperContour(width, height, { anchor, lever: gripDistance, x, y, direction, torn, peel, side });
}

export function paperStations(height, bend) {
  const { anchor, lever, direction, torn } = bend;
  const start = Math.max(bend.start ?? 0, torn && direction > 0 ? anchor : 0);
  const end = Math.min(bend.end ?? height, torn && direction < 0 ? anchor : height);
  const length = Math.max(48, lever || height);
  const depth = Math.min(160, Math.max(72, length * .65));
  // Sample curvature and the active fold. Straight paper needs only its endpoints.
  return [...new Set([
    start, end,
    anchor,
    ...Array.from({ length: 25 }, (_, i) => length * i / 24)
      .filter(distance => !torn || distance >= depth).map(distance => anchor + direction * distance),
    ...(torn ? Array.from({ length: Math.ceil(depth / 6) + 1 }, (_, i) => anchor + direction * Math.min(depth, i * 6)) : []),
    ...(bend.flutter ? Array.from({ length: 17 }, (_, i) => anchor + direction * 500 * i / 16) : []),
  ])].filter(n => n >= start && n <= end).sort((a, b) => a - b);
}

export function paperContour(width, height, bend, rowAt = position => paperRow(width, position, bend)) {
  const { direction, torn, anchor } = bend;
  const start = Math.max(bend.start ?? 0, torn && direction > 0 ? anchor : 0);
  const end = Math.min(bend.end ?? height, torn && direction < 0 ? anchor : height);
  const stations = paperStations(height, bend);
  const left = [], right = [];
  for (const position of stations) {
    const row = rowAt(position);
    left.push(paperPoint(row, 0));
    right.push(paperPoint(row, 1));
  }
  const toothCount = Math.max(1, Math.floor(width / 5));
  const teeth = (position, reverse, sign) => {
    const row = rowAt(position);
    return Array.from({ length: toothCount }, (_, i) => {
      const t = (i + 1) / (toothCount + 1);
      const point = paperPoint(row, reverse ? 1 - t : t);
      point[1] += sign * (.35 + (i * 7 % 11) / 8 + (i % 3 === 0 ? .6 : 0));
      return point;
    });
  };
  return [...left, ...teeth(end, false, -1), ...right.reverse(), ...teeth(start, true, 1)]
    .map((p, i) => `${i ? 'L' : 'M'}${p.map(n => n.toFixed(2)).join(',')}`).join(' ') + ' Z';
}

export function tearMotion(orientation, sideways, vx, vy, grip = .5) {
  const speed = Math.min(3, Math.hypot(vx, vy));
  const side = Math.abs(sideways) > 4 ? Math.sign(sideways) : grip < .5 ? -1 : 1;
  return {
    x: side * Math.min(168, 42 + Math.abs(vx) * 42),
    lift: Math.max(-65, Math.min(55, vy * 35 + (orientation === 'up' ? -24 : 8))),
    rotation: side * (5 + speed * 3),
    duration: Math.round(960 - Math.min(200, speed * 100)),
  };
}

export function stepPaperSpring(value, velocity, target, elapsed) {
  const dt = Math.min(1 / 30, Math.max(0, elapsed));
  const nextVelocity = velocity + (280 * (target - value) - 26 * velocity) * dt;
  return { value: value + nextVelocity * dt, velocity: nextVelocity };
}

export function feedDuration(baseMs, height) {
  return Math.min(16000, Math.max(baseMs, baseMs * height / 650));
}
