import test from 'node:test';
import assert from 'node:assert/strict';
import { cafeReceipt, calculateTotals, formatOrderDate, moneyFormatter } from './receipt.js';

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
