/** All amounts use the currency's smallest unit (cents for USD/EUR). */
export const cafeReceipt = {
  merchant: {
    name: 'AURA ARTISAN CAFÉ',
    address: ['742 Evergreen Terrace, Suite 100'],
    phone: '(555) 019-2834',
  },
  orderId: '4892',
  issuedAt: '2026-08-27T00:00:00Z',
  timeZone: 'UTC',
  locale: 'en-US',
  currency: 'USD',
  items: [
    { id: 'cortado', name: 'Oat Milk Cortado', quantity: 1, unitAmount: 550 },
    { id: 'croissant', name: 'Pistachio Croissant', quantity: 1, unitAmount: 625 },
    { id: 'drip', name: 'Single Origin Drip', quantity: 1, unitAmount: 400 },
  ],
  taxBasisPoints: 850,
  payment: { method: 'Apple Pay', last4: '4920', authorization: '829401928402' },
  footer: 'Thank you for visiting!',
};

/** Tax is added once to the subtotal, rounded to the nearest minor unit. */
export function calculateTotals(items, taxBasisPoints) {
  if (!Array.isArray(items) || items.length === 0) {
    throw new TypeError('A receipt needs at least one item.');
  }
  if (!Number.isSafeInteger(taxBasisPoints) || taxBasisPoints < 0 || taxBasisPoints > 10000) {
    throw new RangeError('taxBasisPoints must be an integer from 0 to 10000.');
  }
  const subtotal = items.reduce((sum, item) => {
    if (!Number.isSafeInteger(item.quantity) || item.quantity < 1 ||
        !Number.isSafeInteger(item.unitAmount) || item.unitAmount < 0) {
      throw new RangeError('Use a positive integer quantity and a nonnegative integer unitAmount.');
    }
    const next = sum + item.quantity * item.unitAmount;
    if (!Number.isSafeInteger(next)) throw new RangeError('Receipt amount is too large.');
    return next;
  }, 0);
  const taxProduct = subtotal * taxBasisPoints;
  if (!Number.isSafeInteger(taxProduct)) throw new RangeError('Receipt tax is too large.');
  const tax = Math.round(taxProduct / 10000);
  const total = subtotal + tax;
  if (!Number.isSafeInteger(total)) throw new RangeError('Receipt total is too large.');
  return { subtotal, tax, total };
}

export function moneyFormatter(locale, currency) {
  const formatter = new Intl.NumberFormat(locale, { style: 'currency', currency });
  const divisor = 10 ** formatter.resolvedOptions().maximumFractionDigits;
  return (minorUnits) => formatter.format(minorUnits / divisor);
}

export function formatOrderDate(issuedAt, locale, timeZone) {
  const date = new Date(issuedAt);
  const parts = new Intl.DateTimeFormat(locale, {
    day: '2-digit', month: 'short', year: 'numeric', timeZone,
  }).formatToParts(date);
  const part = type => parts.find(p => p.type === type).value;
  const day = `${part('day')} ${part('month')} ${part('year')}`;
  const time = new Intl.DateTimeFormat(locale, {
    hour: '2-digit', minute: '2-digit', hourCycle: 'h23', timeZone,
  }).format(date);
  return `${day.toUpperCase()} ${time}`;
}
