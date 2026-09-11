function text(value, fallback = '') {
  return value === undefined || value === null ? fallback : String(value);
}

function normalizeItem(item, index) {
  if (typeof item === 'string' || typeof item === 'number') {
    return { id: index, label: String(item), amount: '' };
  }
  if (!item || typeof item !== 'object') throw new TypeError(`ticket.items[${index}] must be text or an object.`);
  const label = text(item.label ?? item.name ?? item.title);
  if (!label) throw new TypeError(`ticket.items[${index}] requires label or name.`);
  const quantity = item.quantity === undefined || item.quantity === null ? '' : `${item.quantity} x `;
  return {
    id: item.id ?? index,
    label: `${quantity}${label}`,
    amount: text(item.amount ?? item.total ?? item.price),
  };
}

/** Normalize the compact ticket API without mutating caller data. */
export function normalizeTicket(input) {
  if (!input || typeof input !== 'object' || Array.isArray(input)) {
    throw new TypeError('ticket must be an object.');
  }
  const sourceItems = input.items ?? input.rows ?? [];
  if (!Array.isArray(sourceItems)) throw new TypeError('ticket.items must be an array.');
  const lines = input.lines ?? [];
  if (!Array.isArray(lines)) throw new TypeError('ticket.lines must be an array.');
  return {
    title: text(input.title, 'Receipt'),
    subtitle: text(input.subtitle),
    lines: lines.map((line, index) => ({ id: index, text: text(line) })),
    items: sourceItems.map(normalizeItem),
    total: text(input.total),
    footer: text(input.footer),
  };
}

export const quickTicketExample = {
  title: 'Order #029',
  subtitle: 'To Go · Enrico',
  lines: ['17-11-2025 21:03', 'Cash payment'],
  items: [
    { quantity: 1, name: 'Deal - Smashed Burger', amount: '9.99' },
    { quantity: 1, name: 'Mineralwasser still', amount: '2.50' },
    { quantity: 1, name: 'Pommes', amount: '3.50' },
  ],
  total: '15.99 EUR',
  footer: 'Vielen Dank fuer Ihren Besuch',
};
