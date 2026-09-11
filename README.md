# React Virtual Printer

A reusable React + CSS receipt printer based on the Aura Artisan Café reference.

**[Open the demo](https://enrzh.github.io/vprinter-react-component/)**

The demo opens with a completed receipt. **Print Receipt** replays the paper feed;
the status changes while printing and the button prevents duplicate jobs.
Reduced motion displays the completed receipt immediately, including when the
system preference changes during a print. All receipt content is structured data;
quantities, subtotal, tax and total are calculated in integer minor units.

## Run locally

Requires Node 24 and pnpm 11.19.0.

```sh
pnpm install --frozen-lockfile
pnpm dev
pnpm test
pnpm build
pnpm preview
```

The production build is `dist/`. Relative asset URLs support the GitHub Pages
project path or another static subdirectory. No external fonts, images, API calls,
payment processing, secrets, or physical printing are involved.

## Reuse the component

Copy `src/VirtualPrinter.jsx`, `src/VirtualPrinter.css`, and `src/receipt.js`
into a React app and install `jsbarcode`. The component imports its scoped CSS;
`printerMarkup.js`, `printerExamples.js`, `demo.css` and `main.jsx` are only used
by the standalone demo, except when you want the raw-input parser.

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

`<B>` remains bold for compatibility with the restaurant payloads shown here;
use `<CB>`, `<DB>`, `<L>`, or `<W>` when the source intends enlarged printer
text. This component is a visual preview and does not send commands to a
physical printer, open a cash drawer, play audio, or produce a scannable QR code.

| Prop | Default | Purpose |
| --- | --- | --- |
| `receipt` | Required when `content` is absent | Structured receipt, following `cafeReceipt` |
| `content` | Required when `receipt` is absent | Raw printer markup/plain text |
| `logo` | Default mark | Image URL or React node for `<LOGO>` |
| `initiallyPrinted` | `false` | Show a completed receipt on mount |
| `className` | `''` | Optional host styling hook |

Multiple instances are independent. Treat receipt data as immutable. Updated
props are captured on the next print, leaving an existing receipt intact. Use
exactly one of `receipt` or `content` per instance.

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
