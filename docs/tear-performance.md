# Paper tearing performance

Completed 2026-10-08. These are desktop emulation measurements, not physical
mobile-device results. The physical iPhone was unavailable; connected iPhone
entries were simulators. Ego also disables WebGL, so the tabletop housing was
checked through its package build and outlet coordinates, not a rendered 3D view.

## Conditions and method

Before and after used the same Macmini9,1, macOS 27.0.1, ego Chromium, 390 × 844
viewport, DPR 2 and 4× CPU throttling. Both printers were measured with short
and long receipts, Scroll on and off. The baseline includes the existing
reusable-component API changes, which this work preserved in baseline commit
`e79e324`. Its core source hashes match the saved pre-optimization files.

The interaction benchmark mounts the real component, prepares its paper bitmap,
scrolls to the middle where applicable, and tears three times per case. It counts
texture draws, canvas allocation and JS paint submission time. Instrumentation
adds some overhead, and these times exclude compositor/display work. Long
receipts have 240 rows, a logo and a QR code; short receipts have four rows with
the same logo and code.

The isolated renderer benchmark samples 36 progressive-fold states after six
warmups. Widths are 300 px for front feed and 214 px for tabletop; receipt heights
are 240 or 6,000 px, with a 260 px scroll viewport. It separately measures a
one-pixel readback that forces queued raster work to complete. Readback changes
canvas behavior and is diagnostic, not an FPS measurement. Synthetic textures
have 1× source resolution; animated output no longer upsamples beyond its source.

Ego's idle `requestAnimationFrame` interval measured about 1,000 ms in both runs.
Attached animations therefore often use the existing 32 ms watchdog. Native
detached animation does not require repeated canvas paints. Neither that
watchdog's cadence nor native keyframe support proves a 60 Hz display result.

## Results from the real component

P95 canvas paint submission time, in milliseconds:

| Printer | Receipt | Scroll | Before | After |
| --- | --- | --- | ---: | ---: |
| Front | Short | Off | 2.0 | 1.4 |
| Front | Short | On | 1.4 | 0.8 |
| Front | Long | Off | 6.0 | 0.9 |
| Front | Long | On | 1.2 | 0.7 |
| Tabletop | Short | Off | 1.6 | 0.9 |
| Tabletop | Short | On | 1.3 | 0.8 |
| Tabletop | Long | Off | 4.4 | 1.0 |
| Tabletop | Long | On | 1.3 | 0.7 |

Long scroll-mode allocation fell from about 4.00 MP to **0.87 MP** for front
feed and **0.92 MP** for tabletop: approximately 78% and 77% less. Full receipts
still render their complete content, bounded by the existing 4 MP allocation cap.

Across three tears, the release interval previously contained 18–85 canvas
paints per case. It now contains 3–4 transition snapshots. Once the cached-flight
flag is set, every case records **zero additional canvas paints**.

## Isolated rendering cost and uncertainty

Full-length mesh draws fell from a peak of **1,274 to 209 per sample**; short
receipts fell from 384 to 119. Detail remains concentrated on the progressive
fold. Straight sections use exact rectangle draws, and all regions continue to
sample the same text/logo/code texture.

P95 forced raster completion for full long receipts fell from 288.6 to 40.6 ms
(front) and 301.4 to 33.7 ms (tabletop). Those values still exceed the 16.7 ms
budget at 4× throttling. This is an explicit remaining limitation, not a 60 FPS
claim. Raster submission and readback percentiles should not be added as if they
represented a jointly sampled frame percentile.

The first isolated long/tabletop/scroll run was mixed: paint p95 increased from
1.1 to 2.5 ms, and readback p95 from 4.9 to 13.8 ms despite fewer draws and pixels.
Three sequential paired repeats against the exact saved baseline renderer
showed substantial variability: baseline paint p95 0.8–5.9 ms versus optimized
1.9–2.5 ms, and readback p95 4.9–23.4 ms versus 15.5–17.9 ms. No consistent
speedup is claimed for that isolated case. The real-component measurements above
improved, but physical-device profiling is still needed.

## Implementation

- In scroll mode, the animated canvas contains the visible paper plus movement
  padding, positioned in the original receipt coordinates. Source texture and
  accessible full receipt content remain intact.
- Shared adaptive stations keep the fold finely sampled without subdividing a
  straight tail hundreds of times. Rows and trigonometry are reused per paint.
- Once the tear crosses the cutter, the last curved sheet is cached. Native Web
  Animations move it along the existing falling/fluttering trajectory with
  transforms and opacity. A transform-only frame-clock fallback remains available.
- The existing shadow's blur, offset and color are preserved. During flight it
  belongs to the cached canvas layer. No shadow-cost speedup is claimed, and the
  effect was not removed to improve a score.
- Attached bends use `requestAnimationFrame` first. The visible-page watchdog is
  retained because the measured ego webview stalls rAF. Cancellation, reset,
  unmount and reduced motion cancel native flight and clear temporary styles.
  A layout or printer-mode change during a tear safely completes the tear instead
  of leaving a cached sheet at stale coordinates.

## Verification and reproduction

`pnpm test` passed 27 tests with no skips. `pnpm test:package` and `pnpm build`
both exited 0. Regression checks cover bounded allocation, original texture
sampling, fine fold geometry, cutter anchoring, independent instances, public
controls, cancellation and reduced motion.

Run `pnpm dev`, then open `/benchmarks/paper-tearing.html` using ego-browser.
Use the renderer and interaction buttons on the same device/settings for each
revision. The harness is excluded from the package and ordinary demo bundle.
[Raw measurements and source hashes](../benchmarks/results-desktop-emulation.json)
include all eight cases and the anomalous case's paired repeats.

Physical mobile verification remains open: test both styles with long/full and
scrolling receipts on the actual device, check compositor/frame timings, and
confirm that rapid sideways tears, cancellation and resize remain responsive.
Only that gate can establish smooth 60 FPS on a particular phone.
