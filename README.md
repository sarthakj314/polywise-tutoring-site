# Polywise — Palace

The MVP marketing site for Polywise: an AI-personalized learning environment that teaches
every concept five ways, measures which one a learner actually retains, and then generates
the tutor, the interface and the month of work that fit the result.

Live sections:

| §  | Section     | What it does                                                                    |
| -- | ----------- | ------------------------------------------------------------------------------- |
| —  | Hero        | Positioning + the palace mark (nested rooms around one person)                   |
| 01 | Atlas       | The eight domains and their tracks, hover/click to explore                       |
| 02 | The loop    | Six-stage scroll-drawn roadmap with the weekly return arrow                      |
| 03 | The palace  | Interactive template of a generated environment — five rooms, week 1 vs week 6   |
| 04 | Engine      | The four systems (bandit, tutor adapters, layout synthesis, spaced scheduling)   |
| —  | Manifesto   | The one-teacher-thirty-students constraint, and its absence                      |
| —  | Enroll      | Cohort CTA + footer                                                              |

## Running it

```sh
npm install
npm run dev      # http://localhost:8080
npm run build    # production build into docs/ (GitHub Pages serves from there)
```

## Stack

Vite + React 18 + TypeScript. No UI framework and no CSS framework — `src/index.css` is a
single hand-authored stylesheet, and every icon and illustration is inline SVG. The only
runtime dependencies are `react` and `react-dom`.

## The drawing system

All illustrations come from two files, so the whole site reads as one hand:

- `src/components/Figures.tsx` — one character, drawn as a clean monoline
  pictogram: a single stroke weight, round caps and joins, no fills, no traced
  wobble. The torso is a shape (a stroked, waisted rounded rectangle) rather
  than a line, which is what keeps it from reading as a stick figure; limbs are
  straight runs with rounded joints. The rig, in a 60 × 100 box: head circle
  r7.5 at (30,12) · neck to y26 · shoulders y26, 21 wide, joints at (20,31) and
  (40,31) · hips y56, 15 wide, joints at (26,57) and (34,57) · knee y75 ·
  ankle y93 · floor y96. Add a pose to the `poseParts()` switch; never draw a
  person inline anywhere else.
- `src/components/Scenes.tsx` — compositions built from those parts: the six
  roadmap scenes, the classroom comparison, the per-domain vignettes, the engine
  diagrams, the CTA.

Stroke weight is normalised through `scale` (`strokeWidth={STROKE * weight / scale}`),
so a figure placed at any size keeps the same line thickness as everything around
it. `weight` trims that where a crowd of small figures would otherwise look heavy
(the thirty students in the manifesto run at 0.62).

If you'd rather use a drawing from elsewhere, `tools/` has two importers that
normalise any source into this same rig — `import-figure.mjs` for SVG (rendered
in headless Chromium so transforms, arcs and primitives all resolve) and
`trace-figure.py` for raster line art (skeletonised to a centre line). Both emit
a paste-ready pose block. See `art/README.md`.

## Type & color

- Display: Fraunces · Body: Instrument Sans · Labels: IBM Plex Mono (loaded from Google Fonts
  in `index.html`; every family has a system fallback stack in `src/index.css`).
- Near-black ground (`#08080a`) with a champagne→copper gradient (`--grad-warm`) as the brand
  accent, plus a cold `--ice` for measured/telemetry values.
- Each numbered section owns a hue, declared once in `SECTIONS` (`src/components/Section.tsx`)
  and exposed to its subtree as `--sec`: 01 champagne, 02 teal, 03 ember, 04 periwinkle. The
  opener, the nav pip, the sticky "where am I" bar, card borders and chips all read from it, so
  you can tell which part of the argument you are in from any scroll position.

## Deploying

`npm run build` writes to `docs/`, which GitHub Pages serves at the `CNAME` domain
(`www.polywise.net`). `public/CNAME` is copied into the build automatically.
