# RAPIDOSS — Front

Marketing & operations front-end for RAPIDOSS, a company that runs the delivery
operation of other companies (same-day, night line-haul, cold chain, heavy
freight, returns).

Built with **Next.js 16** (App Router), **Tailwind CSS v4** and
**Framer Motion**. Brand: black & yellow, industrial-futuristic.

## Run it

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm run lint
```

## Pages

| Route       | What it does                                                              |
| ----------- | ------------------------------------------------------------------------- |
| `/`         | Hero with live route-network canvas, scramble headlines, stats, services  |
| `/services` | The five operating modes with spec sheets                                 |
| `/network`  | Live network telemetry panel, aggregate counters, hub manifest table      |
| `/track`    | Interactive waybill tracking demo (try any `RX-` + 6 digits)              |
| `/contact`  | Quote request form with validation and animated confirmation              |
| `*`         | Custom 404 ("routing exception")                                          |

## Notable mechanics

- **`components/RouteCanvas.tsx`** — hand-rolled `<canvas>` network: bezier
  trunk routes, packets with light trails, pulsing hubs, mouse parallax.
- **`lib/tracking.ts`** — deterministic shipment generator (FNV-1a hash →
  seeded PRNG), so the same waybill always replays the same journey without
  a backend.
- **`components/ScrambleText.tsx`** — split-flap style text decode on the
  headlines.
- **`app/template.tsx`** — yellow shutter wipe between route transitions.
- Magnetic CTA buttons, scroll-reveal sections, in-view counters, CSS
  marquees, full-screen staggered mobile menu.
- All animation respects `prefers-reduced-motion`.

## Design tokens

Defined in `app/globals.css` under `@theme` — `volt` (yellow `#f5c400`),
`void`/`carbon`/`panel` (blacks), `bone`/`ash`/`smoke` (warm greys), plus
utilities for hazard stripes, blueprint grid lines and notched clip paths.
Fonts: Space Grotesk (display) and IBM Plex Mono (data), via `next/font`.
