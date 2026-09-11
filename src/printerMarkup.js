const SUPPORTED_TAGS = 'BOLD|B|C|BR|LOGO|CUT|PLUGIN|CB|DB|L|W|QR|RIGHT';
const TAG_PATTERN = new RegExp(`</?(?:${SUPPORTED_TAGS})\\s*/?\\s*>`, 'gi');
const TAG_NAME_PATTERN = /^<\/?\s*([A-Z]+)\s*\/?\s*>$/i;

/** Normalize only control-code escapes and line endings; payload stays text. */
export function normalizePrinterMarkup(input) {
  return String(input ?? '')
    .replace(new RegExp(`\\\\(?=</?\\s*(?:${SUPPORTED_TAGS})\\b)`, 'gi'), '')
    .replace(/\r\n?/g, '\n');
}

function decodeEntities(text) {
  return text.replace(/&(?:#(\d+)|#x([\da-f]+)|nbsp|amp|lt|gt|quot|apos);/gi, (entity, decimal, hex) => {
    const codePoint = decimal ? Number(decimal) : hex ? parseInt(hex, 16) : null;
    if (codePoint !== null) {
      if (!Number.isInteger(codePoint) || codePoint < 0 || codePoint > 0x10ffff) return entity;
      return String.fromCodePoint(codePoint);
    }
    const name = entity.slice(1, -1).toLowerCase();
    return { nbsp: '\u00a0', amp: '&', lt: '<', gt: '>', quot: '"', apos: "'" }[name] ?? entity;
  });
}

function styleFor(state) {
  const stack = state.stack;
  let align = 'left';
  for (let index = stack.length - 1; index >= 0; index -= 1) {
    if (stack[index] === 'RIGHT') {
      align = 'right';
      break;
    }
    if (stack[index] === 'C' || stack[index] === 'CB') {
      align = 'center';
      break;
    }
  }
  return {
    bold: stack.includes('B') || stack.includes('BOLD'),
    center: align === 'center',
    right: align === 'right',
    doubleHeight: stack.includes('L') || stack.includes('CB') || stack.includes('DB'),
    doubleWidth: stack.includes('W') || stack.includes('CB') || stack.includes('DB'),
  };
}

function newLine(state) {
  const style = styleFor(state);
  return { parts: [], center: style.center, right: style.right };
}

function ensureWritableLine(lines, state) {
  if (lines.at(-1).parts.at(-1)?.type === 'control') lines.push(newLine(state));
}

function pushTextPart(lines, text, state) {
  const style = styleFor(state);
  const part = { type: 'text', text: decodeEntities(text), bold: style.bold, center: style.center };
  if (style.right) part.right = true;
  if (style.doubleHeight) part.doubleHeight = true;
  if (style.doubleWidth) part.doubleWidth = true;
  lines.at(-1).parts.push(part);
}

function addText(lines, text, state) {
  if (state.qrText !== null) {
    state.qrText += decodeEntities(text);
    return;
  }
  ensureWritableLine(lines, state);
  const style = styleFor(state);
  const pieces = text.split('\n');
  pieces.forEach((piece, index) => {
    if (piece) pushTextPart(lines, piece, state);
    if (index < pieces.length - 1) {
      lines.at(-1).center ||= style.center;
      lines.at(-1).right ||= style.right;
      lines.push(newLine(state));
    }
  });
}

/** Parse the lightweight command language emitted by restaurant printers. */
export function parsePrinterMarkup(input) {
  const source = normalizePrinterMarkup(input);
  const state = { stack: [], qrText: null };
  const lines = [newLine(state)];
  let cursor = 0;

  for (const match of source.matchAll(TAG_PATTERN)) {
    addText(lines, source.slice(cursor, match.index), state);
    const tag = match[0];
    const name = tag.match(TAG_NAME_PATTERN)?.[1]?.toUpperCase();
    const closing = /^<\//.test(tag);
    if (name === 'BR') {
      if (state.qrText !== null) state.qrText += '\n';
      else {
        const style = styleFor(state);
        lines.at(-1).center ||= style.center;
        lines.at(-1).right ||= style.right;
        lines.push(newLine(state));
      }
    } else if (name === 'LOGO' && !closing) {
      ensureWritableLine(lines, state);
      const style = styleFor(state);
      lines.at(-1).parts.push({ type: 'logo', center: style.center, right: style.right });
    } else if (name === 'QR') {
      if (closing) {
        ensureWritableLine(lines, state);
        const style = styleFor(state);
        const part = { type: 'qr', text: state.qrText ?? '', center: style.center };
        if (style.right) part.right = true;
        lines.at(-1).parts.push(part);
        state.qrText = null;
      } else if (state.qrText === null) state.qrText = '';
    } else if (name === 'CUT' || name === 'PLUGIN') {
      if (!closing) {
        if (lines.at(-1).parts.length) lines.push(newLine(state));
        lines.at(-1).parts.push({ type: 'control', control: name.toLowerCase() });
      }
    } else if (!closing) {
      state.stack.push(name);
    } else {
      const index = state.stack.lastIndexOf(name);
      if (index >= 0) state.stack.splice(index, 1);
      if (name === 'C' || name === 'CB') lines.at(-1).center ||= true;
      if (name === 'RIGHT') lines.at(-1).right ||= true;
      // Some printer dialects use adjacent centered blocks as implicit lines:
      // <C>To Go</C><C>Name</C>. Do not add a blank line when <BR> follows.
      if ((name === 'C' || name === 'CB') && /^\s*<C(?:B)?\b/i.test(source.slice(match.index + tag.length))) {
        lines.push({ parts: [], center: true, right: false });
      }
    }
    cursor = match.index + tag.length;
  }
  addText(lines, source.slice(cursor), state);
  if (state.qrText !== null) {
    const style = styleFor(state);
    lines.at(-1).parts.push({ type: 'qr', text: state.qrText, center: style.center });
  }
  return lines;
}

export const printerInputExamples = {
  order: `10-09-2026 22:10

<BOLD>Bestellungsnummer: 002</BOLD>

Bestellung-ID: ******2aad

<B>Tisch: 13 (Space)</B>

------------------------------------------------

<B>Baldmoeglichst</B>

------------------------------------------------

<B>1 x 63 DRAGON RIVER</B>

<B>1 x Chicken</B>

<B>1 x 58 Curry -Crispy Chicken</B>

<B>1 x Kinder bis 6J Buffet</B>`,
  receipt: `<LOGO><BR><C>(0° Preview) - Enrico</C><C>This Address doesn't exist 1A<BR>41468 Nowhere</C><C>Tel.: +4915224683481</C><C>Email: enrico@allo.restaurant</C><C>St.-Nr.: 88888888</C><BR><BR><BOLD>Zwischenbon</BOLD><BR><BOLD>Bestellungsnummer: 029</BOLD><BR>Bestellung-ID: e17e<BR>Gedruckt um: 17-11-2025 21:03<BR><BOLD>Ausser Haus</BOLD><BR>Kunde: enrico etst<BR>Abholungszeit: baldmoeglichst (17-11-2025)<BR>Telefonnummer: 015224683481<BR>Zahlungsmethode: Bar<BR>------------------------------------------------<BR>4 001 # DEAL - Smashed Burger. 9.99 39.96<BR> Doppel<BR> Mineralwasser still<BR> Pommes<BR>------------------------------------------------<BR><BR><BOLD>Rechnungsbetrag</BOLD> <B>39.96€</B><BR><BR><BOLD>Zahlungsbetrag</BOLD> <B>39.96€</B><BR>================================================<BR> MWST NETTO STEUER BRUTTO<BR> 19.00% 0.00 0.00 0.00<BR> 7.00% 37.35 2.61 39.96<BR><BR><C>Vielen Dank fuer Ihren Besuch</C><BR><BR>------------------------------------------------<BR><BR>Storniert: 0.00<BR><BR><C><B>To Go</B></C><C><B>enrico etst</B></C><C><B>029</B></C>`,
  alert: `<C><B>21:00 17-11-2025</B></C><BR><BR><C><B>Neue Lieferbestellung</B></C><BR><BR><B>Kunde:</B><BR><B>TEST ALLO</B><BR><BR><B>Lieferzeit:</B><BR><B>06:00 (18-11-2025)</B><BR><BR><C>Bitte bestaetigen Sie im System!</C><BR><BR>`,
  controls: `<CB>FEIEYUN small ticket</CB><BR><C><L>Double height</L></C><BR><C><W>Double width</W></C><BR><RIGHT>Right aligned 42.99</RIGHT><BR><QR>https://example.test/order/029</QR><BR><CUT><PLUGIN>`,
  daily: `TAGESABRECHNUNG (Vorlaeufig)

Konto: enrico@allo.restaurant

Gestartet um: 09-08-2026 15:37

Gedruckt um: 11-09-2026 18:35

Gedruckt von:  

----------------------------------------

SPARTE                       BRUTTO

----------------------------------------

1 FUSION RO.                  16.50  38%
1 Chicken B.                   7.99  19%
1 Curry                       18.50  43%
1 All You C.                   0.00   0%
----------------------------------------
Umsatz   7.00%                42.99
Umsatz  19.00%                 0.00
========================================
<BOLD>Umsatz                             42.99</BOLD>
Bar (Trinkgeld)                     0.00
Unbar (Trinkgeld)                   0.00
========================================
Trinkgeld                           0.00
========================================
<BOLD>Bar                                42.99</BOLD>
<BOLD>Karte                               0.00</BOLD>
Online                              0.00
========================================
<B>Total          42.99</B>
----------------------------------------
Umsatz                             42.99
Trinkgeld                           0.00
Bar                                42.99
Bar (Trinkgeld)                     0.00
Unbar (Trinkgeld)                   0.00
Bar Gutschein                       0.00
========================================
Bar abzugeben                      42.99
========================================
MWST   7.00%      2.81  NETTO:     40.18
MWST  19.00%      0.00  NETTO:      0.00
MWST   0.00%      0.00  NETTO:      0.00
----------------------------------------
Total             2.81             40.18
========================================
Zahlungsmethode
Methode (Anz.) Brutto 7% Netto 19% Netto
Bar (1)         42.99    40.18         -
                    MwSt:2.81`,
  settlement: `<C>𝕏 - Enrico</C><C>This Address doesn't exist 1A, 41468 Nowhere</C><C>Tel.: +4915224683481</C><C>St.-Nr.: 88888888</C><BR><BR>Gedruckt um: 11-09-2026 18:35<BR><BR><BR>Z#   Datum         19.00%     7.00%    Umsatz<BR>------------------------------------------------<BR>005  25-04-2025   4132.42     86.70   4219.12<BR>006  25-04-2025    113.03     12.30    125.33<BR>007  29-04-2025     16.80      0.00     16.80<BR>008  29-04-2025     16.80      0.00     16.80<BR>009  01-05-2025     41.60      0.00     41.60<BR>------------------------------------------------<BR>                  4320.65     99.00   4419.65<BR><BR><BR><BR>MWST                                    Summe<BR>------------------------------------------------<BR>19.00%                                 689.85<BR>7.00%                                    6.48<BR>------------------------------------------------<BR>                                       696.33<BR><BR><BR><BR>Zahlungsmethode                        Umsatz<BR>------------------------------------------------<BR>Bar                                   4258.43<BR>Karte                                   76.50<BR>Gutschein                               84.72<BR>------------------------------------------------<BR>                                      4419.65<BR><BR><BR><BR>                                Summe<BR>------------------------------------------------<BR>Umsatz                                4419.65<BR>Trinkgeld                               26.43<BR>------------------------------------------------<BR>                                      4446.08<BR><BR>`,
};
