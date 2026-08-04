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

- `src/lib/draw.ts` — `limb(spine, widths, caps)` offsets a few joint points into a closed,
  tapered contour. That is what makes the people contour drawings rather than stick figures:
  shoulders wider than waist, thighs wider than calves, hands and feet that come to a point.
  Caps are round where a limb ends in the open and flat where it disappears under another part.
- `src/components/Figures.tsx` — one character in a 60 × 100 box (head at 30,13; shoulders y27;
  hips y53; floor y96), in eleven poses, plus props at the same stroke weight. Parts are filled
  with `--fig-bg` (set per surface in CSS) and stroked, so limbs overlap cleanly. Never redraw a
  person inline; add a pose here instead.
- `src/components/Scenes.tsx` — compositions built from those parts: the six roadmap scenes,
  the classroom comparison, the per-domain vignettes, the engine diagrams, the CTA.

Stroke weight is normalised through the `scale` prop (`strokeWidth={1.5 / scale}`), so a figure
placed at any size keeps the same line thickness as everything around it.

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
