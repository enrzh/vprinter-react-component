# React Virtual Printer

An interactive React receipt printer with front-feed and tabletop styles.
Paper feeds through the outlet, bends under your hand and tears sideways, with
the printed text moving on the same paper surface. Long receipts can scroll or
grow to their full length.

The reusable component owns the printer, paper and interaction logic. The demo
owns its forms, header, style picker, image sharing and page layout. Component
styles use the `vp` namespace; they do not style the host's body, forms or buttons.

**[Open the demo](https://enrzh.github.io/vprinter-react-component/)**

The demo starts with an input step and a printer preview step. On small screens
these are two focused screens; on larger screens they sit side by side. Choose a
quick ticket, edit a FEIEYUN payload, or write a custom layout, then open the
preview. Switch between front-feed and tabletop styles in the preview; the
scrollable-paper switch sits beside the Printer title. Each preview opens with
an empty printer. Front feed prints from its casing; Tabletop prints from the
preview header, with Cut beside it after printing. Tabletop shows the full
receipt by default; turn on Scroll to constrain long paper. Drag the printed
paper upward or swipe it sideways to tear on Tabletop; swipe Front-feed paper
sideways, pull its top edge downward, or use the scissors button to leave the
printer ready for another copy.
Printing a full-length tabletop receipt scrolls the page to keep the printer
visible.
Short pulls snap back; far pulls tear without waiting for release.
The paper stays attached at the cutter as you pull: its curve follows where you
grab it, with a small amount of spring and resistance. A tear travels across the
edge before the loose sheet falls away. The pulled corner peels first, and your
release speed and grip position shape its fall. The Cut button uses the same motion.
The tear opens across the cutter before the sheet moves away. A diagonal crease
folds the released corner, then relaxes into a small ripple during the drop.
Each print is captured as one bitmap containing the paper, text, logos and codes.
The same surface feeds, bends and tears, so the text follows the paper exactly.
It refreshes when the layout changes, retains accessible DOM content, and falls
back to the complete DOM sheet if browser capture fails.
Printing feeds the existing text through the slot, bottom first for Front feed
and top first for Tabletop, with synchronized paper and printer movement. A
subtle curl catches the light along the free edge as the paper feeds.
Scroll previews retain a zigzag free edge, and the visible sheet tears at the
printer outlet without hidden receipt sections jumping into view. Native paper
scrollbars are hidden so they cannot intercept a sideways pull.
Long receipts scroll with a mouse wheel or keyboard;
front-feed paper also supports touch scrolling, while upward-feed paper uses
touch dragging to tear. These icon buttons have accessible labels.
The demo's share icon exports the printer and the entire receipt without controls,
including all rows and fixed-width columns. Tabletop images have a solid background;
front-feed images are transparent. Supported devices open the native
share sheet; other browsers download `receipt.png`. External logos must allow
cross-origin image access to be included in the export.
Image sharing is exclusive to the demo. The component lazily loads
`html-to-image` to prepare its paper bitmap; the share button stays in the demo.

## Run locally

Requires Node 24 and pnpm 11.19.0.

```sh
pnpm install --frozen-lockfile
pnpm dev
pnpm test
pnpm build
pnpm build:lib
pnpm preview
```

The production build is `dist/`. Relative asset URLs support the GitHub Pages
project path or another static subdirectory. No external fonts, images, API calls,
payment processing, secrets, or physical printing are involved.

## Reuse the component

Install directly from the repository in an existing React app:

```sh
npm install github:enrzh/vprinter-react-component
# or: pnpm add github:enrzh/vprinter-react-component
```

Then import the component by package name. Pass one input and it is ready to
drop into your own layout:

```jsx
import { VirtualPrinter } from 'vprinter-react-component';
import 'vprinter-react-component/styles.css';

<VirtualPrinter
  content={`<C><B>Order #029</B></C>\n1 x Burger       9.99\n<B>Total          9.99</B>`}
  orientation="front"
/>
```

Built-in Print/Tear buttons and paper gestures work immediately. Use
`orientation="up"` for the tabletop printer. Scrolling defaults to `true`;
set `scrollable={false}` for a full-length printout. No provider, demo stylesheet
or page wrapper is required. React 18 and newer are supported.

The package ships prebuilt ESM and CommonJS in `lib/`. Installing from GitHub
does not run a build. `vprinter-react-component/markup` and
`vprinter-react-component/ticket` are parser-only entry points. The tabletop
model is a separate chunk and loads only when `orientation` is `"up"`. CSS stays
an explicit side-effect import, so the app chooses when to load the printer styles.

Long receipts scroll by default. Set `scrollable={false}` when the full paper
should remain visible and grow with its content:

```jsx
<VirtualPrinter content={report} scrollable={false} />
```

React is a peer dependency, so the app's existing React runtime is reused.

### External Print/Tear buttons

A component ref exposes `print()` and `tear()`. They use the same animation and
interaction logic as the built-in buttons. `controls={false}` removes those
buttons when your app supplies its own; omit it to keep both available.

```jsx
import { useRef, useState } from 'react';
import { VirtualPrinter } from 'vprinter-react-component';
import 'vprinter-react-component/styles.css';

export function ReceiptPreview({ content }) {
  const printer = useRef(null);
  const [phase, setPhase] = useState('ready');
  const busy = phase === 'printing' || phase === 'tearing';

  return <>
    <button disabled={busy} onClick={() => printer.current?.print()}>Print</button>
    <button disabled={phase !== 'printed'} onClick={() => printer.current?.tear()}>Tear</button>
    <VirtualPrinter
      ref={printer}
      content={content}
      orientation="up"
      scrollable
      controls={false}
      onPhaseChange={setPhase}
    />
  </>;
}
```

For TypeScript, import `type VirtualPrinterHandle` from the same package and
use `useRef<VirtualPrinterHandle>(null)`. Each ref controls only its own printer.
Print calls while busy are ignored; Tear calls only act on a completed print.
`onPhaseChange` reports transitions rather than the initial state, so initialize
your host state to `printed` when using `initiallyPrinted`.
External buttons own their keyboard focus; use `onTear` if your app wants to
return focus to its Print button.

For a source-copy integration, copy `src/VirtualPrinter.jsx`,
`src/TabletopPrinter.jsx`, `src/tearGesture.js`, `src/paperSurface.js`, `src/VirtualPrinter.css`,
`src/receipt.js`, `src/simpleTicket.js`, and `src/printerMarkup.js` into a React
app and install `html-to-image`, `jsbarcode`, `three`, and `uqr`.
The component imports its scoped CSS. The demo files, including `demoImage.js`,
are not needed to use the component.

```jsx
import { VirtualPrinter } from './VirtualPrinter.jsx';
import { cafeReceipt } from './receipt.js';

<VirtualPrinter receipt={cafeReceipt} initiallyPrinted />
```

Raw printer content is supported through the `content` prop. The component turns
the payload into safe text nodes, so user-provided content cannot become HTML:

```jsx
const order = `10-09-2026 22:10
<BOLD>Bestellungsnummer: 002</BOLD>
Bestellung-ID: ******2aad
<B>Tisch: 13 (Space)</B>
------------------------------------------------
<B>1 x 63 DRAGON RIVER</B>`;

<VirtualPrinter content={order} initiallyPrinted />
```

For the quick path, pass `ticket` with a title and simple rows. Items may be
strings or objects with `name`/`label`, optional `quantity`, and optional
`amount`:

```jsx
<VirtualPrinter ticket={{
  title: 'Order #029',
  subtitle: 'To Go · Enrico',
  items: [
    { quantity: 1, name: 'Smashed Burger', amount: '9.99' },
    { name: 'Pommes', amount: '3.50' },
  ],
  total: '13.49 EUR',
  footer: 'Vielen Dank fuer Ihren Besuch',
}} initiallyPrinted />
```

Supported FEIEYUN small-ticket commands are `<B>` and `<BOLD>` for bold text,
`<C>` and `<RIGHT>` for alignment, `<CB>`/`<DB>` for centered or double-size
text, `<L>` and `<W>` for doubled height or width, `<BR>` for a line break, and
`<LOGO>` for a logo slot. `<QR>...</QR>` draws a scannable code and shows its
payload as text, while `<CUT>` and `<PLUGIN>` are shown as non-executing printer control
markers. Tags are case-insensitive. Existing newlines, repeated spaces,
separators, Unicode and common entities such as `&nbsp;` and `&#x20;` are
preserved. Payloads that contain escaped tags such as `\\<B>text\\</B>` are
accepted too. Unknown tags remain literal text. Adjacent centered blocks
(`<C>To Go</C><C>029</C>`) become separate lines, matching the printer dialect.
Pass `logo` as an image URL or React node to replace the default mark used by
`<LOGO>`. Markup paper is a 48-column slip (`--vp-columns`, set it to `32` for
58mm). Every markup line keeps its spaces. Wide content, including doubled
characters, automatically reduces the document's font size to fit the paper
without horizontal scrolling. It refits when the paper width or printer style
changes. Long receipts can still scroll vertically.

`SUPPORTED_PRINTER_TAGS` is exported when an integration needs to validate a
payload before displaying it. The component remains a visual preview: `<CUT>`
and `<PLUGIN>` are shown as markers, and no network request or hardware action
is made.

The demo includes a `Real-world Tagesabrechnung` example transcribed from a
completed restaurant day report, including canceled items, canceled orders,
cash-book balances, and customer-card totals.

`<B>` remains bold for compatibility with the restaurant payloads shown here;
use `<CB>`, `<DB>`, `<L>`, or `<W>` when the source intends enlarged printer
text. Doubled characters reserve their columns on the slip. This component is a
visual preview and does not send commands to a physical printer, open a cash
drawer, or play audio.

| Prop | Default | Purpose |
| --- | --- | --- |
| `receipt` | One of `receipt`/`content`/`ticket` | Structured receipt, following `cafeReceipt` |
| `content` | One of `receipt`/`content`/`ticket` | Raw printer markup/plain text |
| `ticket` | One of `receipt`/`content`/`ticket` | Compact title/items/total/footer ticket |
| `logo` | Default mark | Image URL or React node for `<LOGO>` |
| `initiallyPrinted` | `false` | Show a completed receipt on mount |
| `scrollable` | `true` | Constrain long paper to a scrollable area, or show the full receipt |
| `controls` | `true` | Show built-in Print/Tear buttons; set `false` for host-only controls |
| `orientation` | `'front'` | Use `'up'` for the Three.js tabletop printer modeled after the N80 silhouette |
| `paperMaxHeight` | `60svh` | CSS height (or number of pixels) for scrollable paper |
| `resetKey` | `undefined` | Change this value to return the printer to an empty ready state |
| `onPhaseChange` | `undefined` | Called with `ready`, `printing`, `printed`, or `tearing` after a phase change |
| `onPrintStart` | `undefined` | Called when a print job starts |
| `onPrinted` | `undefined` | Called when paper finishes feeding |
| `onTear` | `undefined` | Called after a tear-off returns the printer to ready |
| `className` | `''` | Optional host styling hook |

Multiple instances are independent. Treat receipt data as immutable. Updated
props are captured on the next print, leaving an existing receipt intact. Use
exactly one of `receipt`, `content`, or `ticket` per instance.

Resize the component's container to change its width. Bitmap paper and markup
font fitting update with it. Keyboard users can operate built-in or host buttons
and use Arrow keys, Page Up/Down, Home and End in the paper region. Reduced
motion skips print/tear animation. The component never scrolls the host page;
the demo's page-following behavior for full-length tabletop prints is separate.
The tabletop model requires WebGL. If bitmap capture fails, paper remains
readable as DOM content, with simpler tear visuals. External logos must permit
cross-origin image access to participate in bitmap animation.

`cafeReceipt` documents the complete data shape. Item IDs must be unique;
quantities are positive integers, amounts are nonnegative integers in the
currency's smallest unit, and `taxBasisPoints` is a percentage in hundredths
(850 = 8.5%). Tax is added and rounded once for the subtotal. This is an
exclusive-tax display model, not a fiscal receipt or VAT compliance engine.

Use an ISO timestamp, explicit IANA `timeZone`, and a valid Intl locale/currency.
Pass only a masked payment `last4`, never a full card number. `authorization`
must be a nonempty printable ASCII string suitable for CODE128. The barcode
uses light bars on dark to match the reference; its value is also displayed in
text for accessibility and readers that cannot scan inverted barcodes.

Set `--vp-paper-height` on the component to change the scroll area height
(default: `60svh`). The demo starts empty; consumers can still use
`initiallyPrinted` to show paper immediately.

`paperMaxHeight` is the JavaScript equivalent of that CSS variable. For a
controlled reset, increment `resetKey` after changing the payload instead of
remounting the component:

```jsx
<VirtualPrinter
  content={invoice}
  resetKey={invoiceVersion}
  paperMaxHeight="24rem"
  onPrinted={() => setLastPrint(Date.now())}
/>
```

The CSS variables `--vp-ink`, `--vp-muted`, `--vp-paper`, `--vp-columns`, and
`--vp-feed-duration` can be overridden on the component. The base feed animation
is 2.8 seconds, and the front printer uses 1.9 seconds. A custom duration sets
the minimum for short receipts; receipts over 650 pixels take proportionally
longer, up to 16 seconds. The fallback follows that measured duration with a
700-millisecond allowance. Reduced motion skips feeding, spring settling and
tear-off animations. A structured receipt with invalid items, tax, or payment data
stays on screen and shows the reason, instead of blanking the surrounding page.

## Build and deployment

### Check the installed package in another app

`examples/host` is a small independent host with both styles, long receipts,
all three input APIs, resize/scroll switches, external buttons and four separate
instances. It imports the installed package and its CSS, never the demo source.
To verify the exact files that ship, first run `pnpm test:package`, then
`pnpm pack --pack-destination /tmp`. Copy `examples/host` to a temporary folder
and run there:

```sh
npm install /tmp/vprinter-react-component-1.0.0.tgz
npm run dev -- --port 5181
npm run build
```

This host fixture is excluded from the published package.

[GitHub Actions](https://github.com/enrzh/vprinter-react-component/actions/workflows/pages.yml)
installs the locked dependencies, runs the tests and builds the demo. Pull requests
run these checks without deploying. Pushes to `main` also publish `dist/` with
the official GitHub Pages actions. A manual workflow run can redeploy `main`.

In **Settings → Pages**, the source is **GitHub Actions**. No custom domain is
needed. This repository and its deployment are independent of the aiity.de website.
