import test from 'node:test';
import assert from 'node:assert/strict';
import { cafeReceipt, calculateTotals, formatOrderDate, moneyFormatter } from './receipt.js';
import { normalizePrinterMarkup, parsePrinterMarkup, printerInputExamples, SUPPORTED_PRINTER_TAGS } from './printerMarkup.js';
import { normalizeTicket, quickTicketExample } from './simpleTicket.js';

test('reference order: $15.75 + 8.5% tax = $17.09', () => {
  assert.deepEqual(calculateTotals(cafeReceipt.items, cafeReceipt.taxBasisPoints), {
    subtotal: 1575, tax: 134, total: 1709,
  });
});

test('quantities and rounding are applied to the complete subtotal', () => {
  assert.deepEqual(calculateTotals([{ quantity: 3, unitAmount: 10 }], 850), {
    subtotal: 30, tax: 3, total: 33,
  });
  assert.deepEqual(calculateTotals([{ quantity: 2, unitAmount: 625 }], 0), {
    subtotal: 1250, tax: 0, total: 1250,
  });
});

test('malformed money, quantities and overflowing amounts are rejected', () => {
  for (const item of [
    { quantity: 0, unitAmount: 100 }, { quantity: 1.5, unitAmount: 100 },
    { quantity: 1, unitAmount: 5.5 }, { quantity: 1, unitAmount: -100 },
    { quantity: 1, unitAmount: NaN }, { quantity: 2, unitAmount: Number.MAX_SAFE_INTEGER },
  ]) assert.throws(() => calculateTotals([item], 850), RangeError);
  assert.throws(() => calculateTotals([], 850), TypeError);
  assert.throws(() => calculateTotals(cafeReceipt.items, -1), RangeError);
  assert.throws(() => calculateTotals(cafeReceipt.items, 10001), RangeError);
});

test('formatting supports different currency minor units', () => {
  assert.equal(moneyFormatter('en-US', 'USD')(1709), '$17.09');
  assert.equal(moneyFormatter('de-DE', 'EUR')(1709), '17,09 €');
  assert.equal(moneyFormatter('ja-JP', 'JPY')(1709), '￥1,709');
});

test('receipt timestamp uses its explicit timezone', () => {
  assert.equal(formatOrderDate(cafeReceipt.issuedAt, 'en-GB', 'UTC'), '27 AUG 2026 00:00');
  assert.match(formatOrderDate(cafeReceipt.issuedAt, 'en-GB', 'America/New_York'), /26 AUG 2026 20:00/);
});

test('printer markup preserves lines, whitespace, bold, centering and logos', () => {
  const lines = parsePrinterMarkup('<LOGO><BR><C><BOLD>Bestellung: 002</BOLD></C><BR>Tisch: 13');
  assert.equal(lines[0].parts[0].type, 'logo');
  assert.equal(lines[1].center, true);
  assert.deepEqual(lines[1].parts[0], { type: 'text', text: 'Bestellung: 002', bold: true, center: true });
  assert.equal(lines[2].parts[0].text, 'Tisch: 13');
});

test('adjacent centered blocks form separate lines in printer dialect output', () => {
  const lines = parsePrinterMarkup('<C><B>To Go</B></C><C><B>002</B></C>');
  assert.deepEqual(lines.filter(line => line.parts.length).map(line => line.parts[0].text), ['To Go', '002']);
  assert.ok(lines.filter(line => line.parts.length).every(line => line.center));
});

test('FEIEYUN alignment, size, QR and device commands are represented', () => {
  const lines = parsePrinterMarkup('<CB>Title</CB><BR><C><L>High</L></C><BR><C><W>Wide</W></C><BR><RIGHT>42.99</RIGHT><BR><QR>https://example.test</QR><BR><CUT><PLUGIN>');
  assert.deepEqual(lines[0].parts[0], {
    type: 'text', text: 'Title', bold: false, center: true, doubleHeight: true, doubleWidth: true,
  });
  assert.equal(lines[1].parts[0].doubleHeight, true);
  assert.equal(lines[2].parts[0].doubleWidth, true);
  assert.equal(lines[3].right, true);
  assert.deepEqual(lines[4].parts[0], { type: 'qr', text: 'https://example.test', center: false });
  assert.deepEqual(lines.filter(line => line.parts.at(-1)?.type === 'control').map(line => line.parts[0].control), ['cut', 'plugin']);
});

test('supported printer tags match the small-ticket command surface', () => {
  assert.deepEqual(SUPPORTED_PRINTER_TAGS, [
    'BOLD', 'B', 'C', 'BR', 'LOGO', 'CUT', 'PLUGIN', 'CB', 'DB', 'L', 'W', 'QR', 'RIGHT',
  ]);
});

test('FEIEYUN control tags accept escaped and case-insensitive forms', () => {
  const lines = parsePrinterMarkup('\\<right>right\\</RIGHT>\\<br>\\<cut>');
  assert.equal(lines[0].parts[0].text, 'right');
  assert.equal(lines[0].right, true);
  assert.equal(lines.find(line => line.parts[0]?.type === 'control')?.parts[0].control, 'cut');
});

test('printer markup accepts escaped tags and common entities without HTML injection', () => {
  assert.equal(normalizePrinterMarkup('\\<B>Bar &amp; Karte\\</B>'), '<B>Bar &amp; Karte</B>');
  const lines = parsePrinterMarkup('A <script>alert(1)</script> &#x20; B &nbsp; C');
  assert.equal(lines[0].parts.map(part => part.text).join(''), 'A <script>alert(1)</script>   B \u00a0 C');
});

test('all supplied input families produce printable line models', () => {
  for (const input of Object.values(printerInputExamples)) {
    const lines = parsePrinterMarkup(input);
    assert.ok(lines.length > 0);
    assert.ok(lines.some(line => line.parts.some(part => part.type === 'text' || part.type === 'logo')));
  }
});

test('settlement report keeps centered header and fixed-width totals', () => {
  const lines = parsePrinterMarkup(printerInputExamples.settlement);
  const text = lines.flatMap(line => line.parts).filter(part => part.type === 'text').map(part => part.text).join('');
  assert.equal(lines.slice(0, 4).filter(line => line.center).length, 4);
  assert.match(text, /Z#\s+Datum\s+19\.00%\s+7\.00%\s+Umsatz/);
  assert.match(text, /4446\.08/);
});

test('real-world daily report keeps its cancellation and cash-book sections', () => {
  const text = parsePrinterMarkup(printerInputExamples.realWorldDaily)
    .flatMap(line => line.parts)
    .filter(part => part.type === 'text')
    .map(part => part.text)
    .join('');
  assert.match(text, /TAGESABRECHNUNG \(Abgeschlossen\)/);
  assert.match(text, /Heute wurde storniert:/);
  assert.match(text, /01hvdv4kjcw318fr8ftg6fvhgl/);
  assert.match(text, /Bargeld am Ende des Tags:/);
  assert.match(text, /11725\.59/);
});

test('compact ticket API normalizes common item shapes without mutation', () => {
  const input = { title: 'Order 2', items: [{ quantity: 2, name: 'Wraps', amount: '23.00' }, 'Water'], total: '25.00 EUR' };
  const normalized = normalizeTicket(input);
  assert.deepEqual(normalized.items, [
    { id: 0, label: '2 x Wraps', amount: '23.00' },
    { id: 1, label: 'Water', amount: '' },
  ]);
  assert.equal(normalized.total, '25.00 EUR');
  assert.equal(input.items[0].name, 'Wraps');
  assert.equal(normalizeTicket(quickTicketExample).items.length, 3);
  assert.throws(() => normalizeTicket({ items: 'Wraps' }), TypeError);
});
