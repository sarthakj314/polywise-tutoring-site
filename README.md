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

- `src/components/Figures.tsx` — one character in a 60 × 100 box (head r9 at 30,15; hips at
  30,62; floor at 96), drawn in eleven poses, plus a small library of props at the same
  stroke weight. Never redraw a person inline; add a pose here instead.
- `src/components/Scenes.tsx` — compositions built from those parts: the six roadmap scenes,
  the classroom comparison, the per-domain vignettes, the engine diagrams, the CTA.

Stroke weight is normalised through the `scale` prop (`strokeWidth={2 / scale}`), so a figure
placed at any size keeps the same line thickness as everything around it.

## Type & color

- Display: Fraunces · Body: Instrument Sans · Labels: IBM Plex Mono (loaded from Google Fonts
  in `index.html`; every family has a system fallback stack in `src/index.css`).
- Near-black ground (`#08080a`) with a champagne→copper gradient (`--grad-warm`) as the only
  accent, plus a cold `--ice` used exclusively for measured/telemetry values.

## Deploying

`npm run build` writes to `docs/`, which GitHub Pages serves at the `CNAME` domain
(`www.polywise.net`). `public/CNAME` is copied into the build automatically.
