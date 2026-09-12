# React Virtual Printer

A small React receipt printer. It renders only the printer; it does not set a
page background or add a card around itself.

**[Open the demo](https://enrzh.github.io/vprinter-react-component/)**

The demo starts with an input step and a printer preview step. On small screens
these are two focused screens; on larger screens they sit side by side. Choose a
quick ticket, edit a FEIEYUN payload, or write a custom layout, then open the
preview. Each preview opens with an empty printer. The white printer icon on
the casing feeds the paper; the scissors button tears it off and leaves the
printer ready for another copy. Long receipts scroll beneath the casing using
touch, a mouse wheel, or the keyboard. These icon buttons have accessible labels.
The demo's share icon exports the printer and the entire receipt as a transparent PNG,
including all rows and fixed-width columns. Supported devices open the native
share sheet; other browsers download `receipt.png`. External logos must allow
cross-origin image access to be included in the export.
Image sharing is exclusive to the demo. Neither the share button nor its
image-export dependency is included in the installed React component.

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

<VirtualPrinter content={`<C><BOLD>Order #029</BOLD></C>\n1 x Burger       9.99\n<B>Total          9.99</B>`} initiallyPrinted />
```

The package builds its ESM and CommonJS entry points during installation, so
GitHub installs work with the normal React bundlers as well as Node-based
tooling. The packaged build keeps CSS as an explicit side-effect import so
consumers can choose when to load the printer styles.

Long receipts scroll by default. Set `scrollable={false}` when the full paper
should remain visible and grow with its content:

```jsx
<VirtualPrinter content={report} scrollable={false} />
```

React is a peer dependency, so the app's existing React runtime is reused.

For a source-copy integration, copy `src/VirtualPrinter.jsx`,
`src/VirtualPrinter.css`, `src/receipt.js`, `src/simpleTicket.js`,
and `src/printerMarkup.js` into a React app and install `jsbarcode`.
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
`<LOGO>` for a logo slot. `<QR>...</QR>` is shown as a safe QR preview with its
payload, while `<CUT>` and `<PLUGIN>` are shown as non-executing printer control
markers. Tags are case-insensitive. Existing newlines, repeated spaces,
separators, Unicode and common entities such as `&nbsp;` and `&#x20;` are
preserved. Payloads that contain escaped tags such as `\\<B>text\\</B>` are
accepted too. Unknown tags remain literal text. Adjacent centered blocks
(`<C>To Go</C><C>029</C>`) become separate lines, matching the printer dialect.
Pass `logo` as an image URL or React node to replace the default mark used by
`<LOGO>`. Long fixed-width report rows keep their spacing and can be scrolled
inside the paper on narrow screens.

`SUPPORTED_PRINTER_TAGS` is exported when an integration needs to validate a
payload before displaying it. The component remains a visual preview: `<CUT>`
and `<PLUGIN>` are shown as markers, and no network request or hardware action
is made.

The demo includes a `Real-world Tagesabrechnung` example transcribed from a
completed restaurant day report, including canceled items, canceled orders,
cash-book balances, and customer-card totals.

`<B>` remains bold for compatibility with the restaurant payloads shown here;
use `<CB>`, `<DB>`, `<L>`, or `<W>` when the source intends enlarged printer
text. This component is a visual preview and does not send commands to a
physical printer, open a cash drawer, play audio, or produce a scannable QR code.

| Prop | Default | Purpose |
| --- | --- | --- |
| `receipt` | One of `receipt`/`content`/`ticket` | Structured receipt, following `cafeReceipt` |
| `content` | One of `receipt`/`content`/`ticket` | Raw printer markup/plain text |
| `ticket` | One of `receipt`/`content`/`ticket` | Compact title/items/total/footer ticket |
| `logo` | Default mark | Image URL or React node for `<LOGO>` |
| `initiallyPrinted` | `false` | Show a completed receipt on mount |
| `scrollable` | `true` | Constrain long paper to a scrollable area, or show the full receipt |
| `paperMaxHeight` | `60svh` | CSS height (or number of pixels) for scrollable paper |
| `resetKey` | `undefined` | Change this value to return the printer to an empty ready state |
| `onPhaseChange` | `undefined` | Called with `ready`, `printing`, `printed`, or `tearing` after a phase change |
| `onPrintStart` | `undefined` | Called when paper starts feeding |
| `onPrinted` | `undefined` | Called when paper finishes feeding |
| `onTear` | `undefined` | Called after a tear-off returns the printer to ready |
| `className` | `''` | Optional host styling hook |

Multiple instances are independent. Treat receipt data as immutable. Updated
props are captured on the next print, leaving an existing receipt intact. Use
exactly one of `receipt`, `content`, or `ticket` per instance.

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

The CSS variables `--vp-ink`, `--vp-muted`, `--vp-paper`, and
`--vp-feed-duration` can be overridden on the component. The default animation
lasts 2.8 seconds; keep custom durations below the 3.4-second fallback completion.

## Build and deployment

[GitHub Actions](https://github.com/enrzh/vprinter-react-component/actions/workflows/pages.yml)
installs the locked dependencies, runs the tests and builds the demo. Pull requests
run these checks without deploying. Pushes to `main` also publish `dist/` with
the official GitHub Pages actions. A manual workflow run can redeploy `main`.

In **Settings → Pages**, the source is **GitHub Actions**. No custom domain is
needed. This repository and its deployment are independent of the aiity.de website.
