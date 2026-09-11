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
`demo.css` and `main.jsx` are only used by this standalone demo.

```jsx
import { VirtualPrinter } from './VirtualPrinter.jsx';
import { cafeReceipt } from './receipt.js';

<VirtualPrinter receipt={cafeReceipt} initiallyPrinted />
```

| Prop | Default | Purpose |
| --- | --- | --- |
| `receipt` | Required | Structured receipt, following `cafeReceipt` |
| `initiallyPrinted` | `false` | Show a completed receipt on mount |
| `className` | `''` | Optional host styling hook |

Multiple instances are independent. Treat receipt data as immutable. Updated
props are captured on the next print, leaving an existing receipt intact.

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
