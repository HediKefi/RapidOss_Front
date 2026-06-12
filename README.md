# RAPIDOSS — Front

A futuristic recreation of [rapidoss.tn](https://rapidoss.tn/), the Tunisian
delivery company — same information architecture, content and pages as the
original site, redesigned with real-time 3D, scroll motions and page
transitions. Black & yellow, industrial-futuristic.

Built with **Next.js 16** (App Router), **Tailwind CSS v4**,
**Framer Motion** and **three.js / react-three-fiber**.

## Site map (mirrors rapidoss.tn)

| Route               | Recreates                                                              |
| ------------------- | ---------------------------------------------------------------------- |
| `/{locale}`         | Their one-pager: hero "Simplement. Rapidement. Livré chez vous", the 4 services (Pickups, Livraison, Paiement, Marketing), the 3 Engagements, "Plus qu'une société, une famille !" with their 3 slogans, Accompagnement marketing, the Devis form (Tunisian city dropdown), stats 24H / +150 / 92%, partner logos, "Suivre mon colis" |
| `/{locale}/devenir-livreur` | Their `devenir-livreur.html` courier application form              |
| `/{locale}/track`   | Full tracking experience built on their real status pipeline: Préparation → Préparé → Livraison → Livré, with En Retour → Retourné and Annulé branches |
| "Se Connecter"      | Links out to their portal at rapidoss.loxbox.tn                        |

Footer carries their real contact block (Rue de la Pépinière El Agba,
phones, email), Facebook/Instagram links and the suggestions box.

## 3D & motion

- **`components/three/HeroScene.tsx`** — react-three-fiber hero: a rotating
  parcel with volt straps and glowing edges, floating satellite boxes
  (solid + wireframe), volt sparkles, an infinite grid floor, a
  mouse-parallax camera rig — and the **fleet van** driving across the
  grid on a loop. Loaded client-side only (`next/dynamic`).
- **`components/three/Van.tsx`** — low-poly RAPIDOSS delivery van built
  from primitives: volt cargo box with a black brand band, dark cab,
  emissive head/tail lights, rolling wheels and suspension bob. Featured
  in the home hero and in the "fleet cam" panel on `/devenir-livreur`
  (`VanScene`, where the floor scrolls under the van to read as driving).
- **`components/TiltCard.tsx`** — 3D cursor-tilt on the service cards with
  a tracking glare (fine pointers only).
- **`components/Reveal.tsx`** — scroll reveals, including a `swing` variant
  that racks sections in with perspective rotation.
- **`app/[locale]/template.tsx`** — yellow shutter wipe between routes.
- Scramble-text headlines, in-view counters, marquees, magnetic CTAs.
- Everything respects `prefers-reduced-motion` (the 3D scene drops to a
  static frame).

## Dark / light mode

Dark is the default; a toggle in the nav switches to a paper-toned light
theme. The theme is a `data-theme="light"` attribute on `<html>`,
persisted in `localStorage` and applied by an inline script before first
paint (no flash). All design tokens are CSS variables, so Tailwind
utilities adapt at runtime; volt shifts to a darker amber in light mode
for contrast. The WebGL scenes (fog, grid, sparkles) and the 2D route
canvas re-tint per theme via the `useTheme()` store (`lib/theme.ts`).

## Internationalisation

Three locales — **French** (default), **English** and **Arabic** — under
locale-prefixed routes (`/fr`, `/en`, `/ar`):

- `middleware.ts` redirects bare paths using Accept-Language detection.
- Dictionaries live in `lib/i18n/{en,fr,ar}.ts`; the English file is the
  canonical shape and the other locales are type-checked against it.
- Arabic renders fully **RTL** with IBM Plex Sans Arabic, mirrored
  directional UI and Arabic scramble glyphs; mechanical geometry
  (marquees, progress bars, tracking codes) stays pinned LTR.

## Tracking demo

`lib/tracking.ts` generates parcels deterministically (FNV-1a hash →
seeded PRNG) from the tracking number — same number, same journey, no
backend. Each number resolves to a delivered, returned or cancelled
journey along the real RAPIDOSS status pipeline, with localized
timestamps and a COD amount in dinars. Try `RX-` + any 6 digits.

## Run it

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm run lint
```
