//#region src/printerMarkup.js
var e = Object.freeze([
	"BOLD",
	"B",
	"C",
	"BR",
	"LOGO",
	"CUT",
	"PLUGIN",
	"CB",
	"DB",
	"L",
	"W",
	"QR",
	"RIGHT"
]), t = e.join("|"), n = RegExp(`</?(?:${t})\\s*/?\\s*>`, "gi"), r = /^<\/?\s*([A-Z]+)\s*\/?\s*>$/i;
function i(e) {
	return String(e ?? "").replace(RegExp(`\\\\(?=</?\\s*(?:${t})\\b)`, "gi"), "").replace(/\r\n?/g, "\n");
}
function a(e) {
	return e.replace(/&(?:#(\d+)|#x([\da-f]+)|nbsp|amp|lt|gt|quot|apos);/gi, (e, t, n) => {
		let r = t ? Number(t) : n ? parseInt(n, 16) : null;
		return r === null ? {
			nbsp: "\xA0",
			amp: "&",
			lt: "<",
			gt: ">",
			quot: "\"",
			apos: "'"
		}[e.slice(1, -1).toLowerCase()] ?? e : !Number.isInteger(r) || r < 0 || r > 1114111 ? e : String.fromCodePoint(r);
	});
}
function o(e) {
	let t = e.stack, n = "left";
	for (let e = t.length - 1; e >= 0; --e) {
		if (t[e] === "RIGHT") {
			n = "right";
			break;
		}
		if (t[e] === "C" || t[e] === "CB") {
			n = "center";
			break;
		}
	}
	return {
		bold: t.includes("B") || t.includes("BOLD"),
		center: n === "center",
		right: n === "right",
		doubleHeight: t.includes("L") || t.includes("CB") || t.includes("DB"),
		doubleWidth: t.includes("W") || t.includes("CB") || t.includes("DB")
	};
}
function s(e) {
	let t = o(e);
	return {
		parts: [],
		center: t.center,
		right: t.right
	};
}
function c(e, t) {
	e.at(-1).parts.at(-1)?.type === "control" && e.push(s(t));
}
function l(e, t, n) {
	let r = o(n), i = {
		type: "text",
		text: a(t),
		bold: r.bold,
		center: r.center
	};
	r.right && (i.right = !0), r.doubleHeight && (i.doubleHeight = !0), r.doubleWidth && (i.doubleWidth = !0), e.at(-1).parts.push(i);
}
function u(e, t, n) {
	if (n.qrText !== null) {
		n.qrText += a(t);
		return;
	}
	c(e, n);
	let r = o(n), i = t.split("\n");
	i.forEach((t, a) => {
		t && l(e, t, n), a < i.length - 1 && (e.at(-1).center ||= r.center, e.at(-1).right ||= r.right, e.push(s(n)));
	});
}
function d(e) {
	let t = i(e), a = {
		stack: [],
		qrText: null
	}, l = [s(a)], d = 0;
	for (let e of t.matchAll(n)) {
		u(l, t.slice(d, e.index), a);
		let n = e[0], i = n.match(r)?.[1]?.toUpperCase(), f = /^<\//.test(n);
		if (i === "BR") {
			if (a.qrText !== null) a.qrText += "\n";
			else {
				let e = o(a);
				l.at(-1).center ||= e.center, l.at(-1).right ||= e.right, l.push(s(a));
			}
		} else if (i === "LOGO" && !f) {
			c(l, a);
			let e = o(a);
			l.at(-1).parts.push({
				type: "logo",
				center: e.center,
				right: e.right
			});
		} else if (i === "QR") {
			if (f) {
				c(l, a);
				let e = o(a), t = {
					type: "qr",
					text: a.qrText ?? "",
					center: e.center
				};
				e.right && (t.right = !0), l.at(-1).parts.push(t), a.qrText = null;
			} else a.qrText === null && (a.qrText = "");
		} else if (i === "CUT" || i === "PLUGIN") f || (l.at(-1).parts.length && l.push(s(a)), l.at(-1).parts.push({
			type: "control",
			control: i.toLowerCase()
		}));
		else if (!f) a.stack.push(i);
		else {
			let r = a.stack.lastIndexOf(i);
			r >= 0 && a.stack.splice(r, 1), (i === "C" || i === "CB") && (l.at(-1).center ||= !0), i === "RIGHT" && (l.at(-1).right ||= !0), (i === "C" || i === "CB") && /^\s*<C(?:B)?\b/i.test(t.slice(e.index + n.length)) && l.push({
				parts: [],
				center: !0,
				right: !1
			});
		}
		d = e.index + n.length;
	}
	if (u(l, t.slice(d), a), a.qrText !== null) {
		let e = o(a);
		l.at(-1).parts.push({
			type: "qr",
			text: a.qrText,
			center: e.center
		});
	}
	return l;
}
var f = {
	order: "10-09-2026 22:10\n\n<BOLD>Bestellungsnummer: 002</BOLD>\n\nBestellung-ID: ******2aad\n\n<B>Tisch: 13 (Space)</B>\n\n------------------------------------------------\n\n<B>Baldmoeglichst</B>\n\n------------------------------------------------\n\n<B>1 x 63 DRAGON RIVER</B>\n\n<B>1 x Chicken</B>\n\n<B>1 x 58 Curry -Crispy Chicken</B>\n\n<B>1 x Kinder bis 6J Buffet</B>",
	receipt: "<LOGO><BR><C>(0° Preview) - Enrico</C><C>This Address doesn't exist 1A<BR>41468 Nowhere</C><C>Tel.: +490000000000</C><C>Email: demo@example.com</C><C>St.-Nr.: 88888888</C><BR><BR><BOLD>Zwischenbon</BOLD><BR><BOLD>Bestellungsnummer: 029</BOLD><BR>Bestellung-ID: e17e<BR>Gedruckt um: 17-11-2025 21:03<BR><BOLD>Ausser Haus</BOLD><BR>Kunde: enrico etst<BR>Abholungszeit: baldmoeglichst (17-11-2025)<BR>Telefonnummer: 00000000000<BR>Zahlungsmethode: Bar<BR>------------------------------------------------<BR>4 001 # DEAL - Smashed Burger. 9.99 39.96<BR> Doppel<BR> Mineralwasser still<BR> Pommes<BR>------------------------------------------------<BR><BR><BOLD>Rechnungsbetrag</BOLD> <B>39.96€</B><BR><BR><BOLD>Zahlungsbetrag</BOLD> <B>39.96€</B><BR>================================================<BR> MWST NETTO STEUER BRUTTO<BR> 19.00% 0.00 0.00 0.00<BR> 7.00% 37.35 2.61 39.96<BR><BR><C>Vielen Dank fuer Ihren Besuch</C><BR><BR>------------------------------------------------<BR><BR>Storniert: 0.00<BR><BR><C><B>To Go</B></C><C><B>enrico etst</B></C><C><B>029</B></C>",
	alert: "<C><B>21:00 17-11-2025</B></C><BR><BR><C><B>Neue Lieferbestellung</B></C><BR><BR><B>Kunde:</B><BR><B>TEST ALLO</B><BR><BR><B>Lieferzeit:</B><BR><B>06:00 (18-11-2025)</B><BR><BR><C>Bitte bestaetigen Sie im System!</C><BR><BR>",
	controls: "<CB>FEIEYUN small ticket</CB><BR><C><L>Double height</L></C><BR><C><W>Double width</W></C><BR><RIGHT>Right aligned 42.99</RIGHT><BR><QR>https://example.test/order/029</QR><BR><CUT><PLUGIN>",
	realWorldDaily: "TAGESABRECHNUNG (Abgeschlossen)\nKopie\nZ-Nummer: 003\nGestartet um: 12-02-2025 12:00\nErstellt um: 17-03-2025 18:49\nErstellt von: allo Zhan\nGedruckt um: 19-03-2025 13:40\nGedruckt von:   \nKonto: demo@example.com\nGedruckt: 2x\n\n----------------------------------------\nSPARTE                              BRUTTO\n----------------------------------------\n3 Sonstige .                       -40.00  -2%\n78 Sonstige                       1475.00  74%\n53 Sonstige                        495.00  25%\n30 Sonstige                         22.00   1%\n1 Rabatt                            -0.25   0%\n2 Wraps                             23.00   1%\n1 Biryani                           14.00   1%\n1 SIGN. COC.                        12.50   1%\n----------------------------------------\nUmsatz   7.00%                       0.00\nUmsatz  19.00%                    2001.25\n========================================\nUmsatz                              2001.25\n\nBar (Trinkgeld)                       33.23\nUnbar (Trinkgeld)                      0.00\n========================================\nTrinkgeld                             33.23\n\nBar                                  1745.68\nKarte                                 275.80\nOnline                                  0.00\nGutschein                              13.00\n========================================\nTotal                                2034.48\n----------------------------------------\nUmsatz                              2001.25\nTrinkgeld                             33.23\n\n========================================\nMWST   7.00%       0.00   NETTO:      0.00\nMWST  19.00%     319.53   NETTO:   1681.72\nMWST   0.00%       0.00   NETTO:     33.23\n----------------------------------------\nTotal                  319.53       1714.95\n========================================\n\n                    7.00%        19.00%\nDineIn                0.00          2453.25\nPickup                0.00             0.00\n----------------------------------------\nTotal                 0.00          2453.25\n========================================\n\nErste Bonierung:    12:02\nLetzte Bonierung:   20:27\n----------------------------------------\n\nHeute wurde storniert:              299.90\n\n12:04 1 Bar Item 1                    1.00 (3)\n15:31 1 First Item                   10.90\n15:33 2 Second Cat item              22.00\n11:22 1 36                           36.00 (1)\n11:22 1 45                           45.00 (1)\n16:27 1 First Item                   27.00 (!!!)\n16:27 1 36                           36.00 (!!!)\n16:27 10 Second Cat item            110.00 (!!!)\n13:53 1 Veg Biryani                   12.00 (!!!)\n\n----------------------------------------\nStornierte Bestellungen\n\nBestellnummer\n001                                  -40.00\n001                                  -40.00\n012                                 -372.00\n----------------------------------------\n01hvdv4kjcw318fr8ftg6fvhgl           -452.00\n\nSumme                                -452.00\n----------------------------------------\n\nKassenbuch Bargeld\n\nKassenstand:                           0.00\n\nAnfangssaldo                       10000.00\nEdeka                                 -20.09\n\nBargeld am Ende des Tags:          11725.59\n----------------------------------------\n\nKundenkarten\n\nEinnahmen:                            210.00\nBareinnahmen:                         210.00\nVouchers:                               0.00\nSonstige Einnahmen:                    0.00\nAusgabe:                               13.00\nAnpassung:                              0.00\n----------------------------------------\n\nVery Suspicious Company GmbH - Enrico\nThis Address doesn't exist 1A, 41468 Nowhere\nSt.-Nr.:    88888888",
	daily: "TAGESABRECHNUNG (Vorlaeufig)\n\nKonto: demo@example.com\n\nGestartet um: 09-08-2026 15:37\n\nGedruckt um: 11-09-2026 18:35\n\nGedruckt von:  \n\n----------------------------------------\n\nSPARTE                       BRUTTO\n\n----------------------------------------\n\n1 FUSION RO.                  16.50  38%\n1 Chicken B.                   7.99  19%\n1 Curry                       18.50  43%\n1 All You C.                   0.00   0%\n----------------------------------------\nUmsatz   7.00%                42.99\nUmsatz  19.00%                 0.00\n========================================\n<BOLD>Umsatz                             42.99</BOLD>\nBar (Trinkgeld)                     0.00\nUnbar (Trinkgeld)                   0.00\n========================================\nTrinkgeld                           0.00\n========================================\n<BOLD>Bar                                42.99</BOLD>\n<BOLD>Karte                               0.00</BOLD>\nOnline                              0.00\n========================================\n<B>Total          42.99</B>\n----------------------------------------\nUmsatz                             42.99\nTrinkgeld                           0.00\nBar                                42.99\nBar (Trinkgeld)                     0.00\nUnbar (Trinkgeld)                   0.00\nBar Gutschein                       0.00\n========================================\nBar abzugeben                      42.99\n========================================\nMWST   7.00%      2.81  NETTO:     40.18\nMWST  19.00%      0.00  NETTO:      0.00\nMWST   0.00%      0.00  NETTO:      0.00\n----------------------------------------\nTotal             2.81             40.18\n========================================\nZahlungsmethode\nMethode (Anz.) Brutto 7% Netto 19% Netto\nBar (1)         42.99    40.18         -\n                    MwSt:2.81",
	settlement: "<C>Preview - Enrico</C><C>This Address doesn't exist 1A, 41468 Nowhere</C><C>Tel.: +490000000000</C><C>St.-Nr.: 88888888</C><BR><BR>Gedruckt um: 11-09-2026 18:35<BR><BR><BR>Z#   Datum         19.00%     7.00%    Umsatz<BR>------------------------------------------------<BR>005  25-04-2025   4132.42     86.70   4219.12<BR>006  25-04-2025    113.03     12.30    125.33<BR>007  29-04-2025     16.80      0.00     16.80<BR>008  29-04-2025     16.80      0.00     16.80<BR>009  01-05-2025     41.60      0.00     41.60<BR>------------------------------------------------<BR>                  4320.65     99.00   4419.65<BR><BR><BR><BR>MWST                                    Summe<BR>------------------------------------------------<BR>19.00%                                 689.85<BR>7.00%                                    6.48<BR>------------------------------------------------<BR>                                       696.33<BR><BR><BR><BR>Zahlungsmethode                        Umsatz<BR>------------------------------------------------<BR>Bar                                   4258.43<BR>Karte                                   76.50<BR>Gutschein                               84.72<BR>------------------------------------------------<BR>                                      4419.65<BR><BR><BR><BR>                                Summe<BR>------------------------------------------------<BR>Umsatz                                4419.65<BR>Trinkgeld                               26.43<BR>------------------------------------------------<BR>                                      4446.08<BR><BR>"
};
//#endregion
export { f as i, i as n, d as r, e as t };
