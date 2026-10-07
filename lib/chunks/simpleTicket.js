//#region src/simpleTicket.js
function e(e, t = "") {
	return e == null ? t : String(e);
}
function t(t, n) {
	if (typeof t == "string" || typeof t == "number") return {
		id: n,
		label: String(t),
		amount: ""
	};
	if (!t || typeof t != "object") throw TypeError(`ticket.items[${n}] must be text or an object.`);
	let r = e(t.label ?? t.name ?? t.title);
	if (!r) throw TypeError(`ticket.items[${n}] requires label or name.`);
	let i = t.quantity === void 0 || t.quantity === null ? "" : `${t.quantity} x `;
	return {
		id: t.id ?? n,
		label: `${i}${r}`,
		amount: e(t.amount ?? t.total ?? t.price)
	};
}
function n(n) {
	if (!n || typeof n != "object" || Array.isArray(n)) throw TypeError("ticket must be an object.");
	let r = n.items ?? n.rows ?? [];
	if (!Array.isArray(r)) throw TypeError("ticket.items must be an array.");
	let i = n.lines ?? [];
	if (!Array.isArray(i)) throw TypeError("ticket.lines must be an array.");
	return {
		title: e(n.title, "Receipt"),
		subtitle: e(n.subtitle),
		lines: i.map((t, n) => ({
			id: n,
			text: e(t)
		})),
		items: r.map(t),
		total: e(n.total),
		footer: e(n.footer)
	};
}
var r = {
	title: "Order #029",
	subtitle: "To Go · Enrico",
	lines: ["17-11-2025 21:03", "Cash payment"],
	items: [
		{
			quantity: 1,
			name: "Deal - Smashed Burger",
			amount: "9.99"
		},
		{
			quantity: 1,
			name: "Mineralwasser still",
			amount: "2.50"
		},
		{
			quantity: 1,
			name: "Pommes",
			amount: "3.50"
		}
	],
	total: "15.99 EUR",
	footer: "Vielen Dank fuer Ihren Besuch"
};
//#endregion
export { r as n, n as t };
