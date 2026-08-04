/* ------------------------------------------------------------------
   The Polywise people.

   Not stick figures: each person is drawn as a set of tapered contours
   — shoulders wider than waist, thighs wider than calves, hands and
   feet that come to a point — generated from a skeleton in lib/draw.
   Every part is filled with the page colour and stroked, so limbs
   overlap cleanly instead of crossing through the body.

   Grid: a 60 × 100 box. Head at (30,13). Shoulders y27. Hips y53.
   Floor y96. Everything on the site uses this same rig.
   ------------------------------------------------------------------ */

import { CSSProperties, ReactNode } from "react";
import { limb, stroke, Pt } from "../lib/draw";

export type Pose =
  | "stand"
  | "walk"
  | "think"
  | "point"
  | "raise"
  | "cheer"
  | "sit"
  | "read"
  | "listen"
  | "lift"
  | "rest";

const TONE: Record<string, string> = {
  gold: "#dcae65",
  paper: "#efeae1",
  dim: "rgba(239,234,225,0.45)",
  ice: "#a9c9c3",
};

/* ---------- shared parts ---------- */

const NECK = limb(
  [
    [30, 19],
    [30, 29],
  ],
  [7, 9.5],
  { start: "flat", end: "flat" }
);

const TORSO = limb(
  [
    [30, 27],
    [30, 40],
    [30, 53],
  ],
  [21, 15.5, 17],
  { end: "flat" }
);

const TORSO_SIDE = limb(
  [
    [30, 27],
    [30.5, 41],
    [30, 53],
  ],
  [15, 13.5, 16],
  { end: "flat" }
);

const HAIR = "M23.2 7.6 C 26 4.4, 34 4.2, 36.8 7.2";

function arm(a: Pt, b: Pt, c: Pt) {
  return limb([a, b, c], [9, 6.4, 4.2], { start: "flat" });
}

function leg(a: Pt, b: Pt, c: Pt) {
  return limb([a, b, c], [13, 8.4, 5.4], { start: "flat" });
}

function foot(a: Pt, b: Pt) {
  return limb([a, b], [5.4, 3.4]);
}

type Part = { d: string; soft?: boolean };

function head(cx = 30, cy = 13, rot = 0): ReactNode {
  return (
    <g key="head" transform={rot ? `rotate(${rot} ${cx} ${cy})` : undefined}>
      <ellipse cx={cx} cy={cy} rx="7.2" ry="8.6" />
      <path d={HAIR} fill="none" opacity="0.75" transform={`translate(${cx - 30} ${cy - 13})`} />
    </g>
  );
}

/* ---------- poses ---------- */

const LEGS_TOGETHER: Part[] = [
  { d: leg([26, 49], [24.5, 73], [23.5, 92]) },
  { d: leg([34, 49], [35.5, 73], [36.5, 92]) },
  { d: foot([23.5, 92.5], [19.5, 95.5]) },
  { d: foot([36.5, 92.5], [40.5, 95.5]) },
];

const LEGS_APART: Part[] = [
  { d: leg([26, 49], [23.5, 73], [21.5, 92]) },
  { d: leg([34, 49], [36.5, 73], [38.5, 92]) },
  { d: foot([21.5, 92.5], [17.5, 95.5]) },
  { d: foot([38.5, 92.5], [42.5, 95.5]) },
];

const CHAIR: Part[] = [
  { d: stroke([[21, 63], [21, 38]]), soft: true },
  { d: stroke([[19, 63], [53, 63]]), soft: true },
  { d: stroke([[23, 63], [23, 93]]), soft: true },
  { d: stroke([[51, 63], [51, 93]]), soft: true },
];

const SEATED: Part[] = [
  { d: NECK },
  { d: TORSO_SIDE },
  { d: limb([[30, 54], [39, 58], [49, 59]], [16, 12, 9], { start: "flat" }) },
  { d: limb([[49, 59], [49.5, 74], [50, 90]], [9, 7, 5.2], { start: "flat" }) },
  { d: foot([50, 90.5], [55, 94]) },
];

/** Front-view body: neck, torso, then the legs on top so the torso ends cleanly. */
function upright(legs: Part[] = LEGS_TOGETHER): Part[] {
  return [{ d: NECK }, { d: TORSO }, ...legs];
}

function parts(pose: Pose): { back: Part[]; front: Part[]; headNode: ReactNode; extra?: Part[] } {
  switch (pose) {
    case "walk":
      return {
        back: [
          { d: arm([38, 29], [42.5, 40], [44, 50]) },
          { d: leg([32.5, 49], [38, 72], [42.5, 90]) },
          { d: foot([42.5, 90.5], [47, 94]) },
        ],
        front: [
          { d: NECK },
          { d: arm([22, 29], [17.5, 40], [16, 50]) },
          { d: TORSO_SIDE },
          { d: leg([27.5, 49], [23, 72], [19, 90]) },
          { d: foot([19, 90.5], [14.5, 94]) },
        ],
        headNode: head(30, 12, -4),
      };

    case "think":
      return {
        back: [{ d: arm([39, 29], [43.5, 41], [45, 53]) }, { d: arm([21, 29], [16.5, 41], [24.5, 25.5]) }],
        front: [...upright()],
        headNode: head(30, 13, -9),
      };

    case "point":
      return {
        back: [{ d: arm([21, 29], [17, 41], [16, 53]) }, { d: arm([39, 29], [46.5, 30.5], [55.5, 31.5]) }],
        front: [...upright()],
        headNode: head(30, 13, 3),
      };

    case "raise":
      return {
        back: [{ d: arm([21, 29], [17, 41], [16, 53]) }, { d: arm([39, 29], [44, 18], [45.5, 5]) }],
        front: [...upright()],
        headNode: head(30, 13, 4),
      };

    case "cheer":
      return {
        back: [{ d: arm([21, 29], [15.5, 18], [13.5, 5]) }, { d: arm([39, 29], [44.5, 18], [46.5, 5]) }],
        front: [...upright(LEGS_APART)],
        headNode: head(30, 13),
      };

    case "sit":
      return {
        back: [...CHAIR],
        front: [...SEATED, { d: arm([31, 30], [39, 43], [46, 50]) }],
        headNode: head(30, 13, 2),
      };

    case "read":
      return {
        back: CHAIR,
        front: [
          ...SEATED,
          { d: "M35 46 L 54 39 L 58 49 L 39 56 Z" },
          { d: "M44.5 42.5 L 56 44.5", soft: true },
          { d: arm([31, 30], [38, 42], [44.5, 47]) },
        ],
        headNode: head(30, 13, 9),
      };

    case "listen":
      return {
        back: [{ d: arm([39, 29], [43.5, 41], [45, 53]) }, { d: arm([21, 29], [17, 41], [16, 53]) }],
        front: [...upright()],
        extra: [
          { d: "M20.6 11 C 20.6 1.5, 39.4 1.5, 39.4 11" },
          { d: "M18.2 9.4 h4.4 v7.2 h-4.4 z" },
          { d: "M37.4 9.4 h4.4 v7.2 h-4.4 z" },
        ],
        headNode: head(30, 13),
      };

    case "lift":
      return {
        back: [{ d: arm([21, 29], [16.5, 21], [18.5, 12]) }, { d: arm([39, 29], [43.5, 21], [41.5, 12]) }],
        front: [...upright(LEGS_APART)],
        extra: [
          { d: "M8 9.5 h44" },
          { d: "M11 5 v9 M7 6.5 v6 M49 5 v9 M53 6.5 v6" },
        ],
        headNode: head(30, 14),
      };

    case "rest":
      return {
        back: [{ d: arm([39, 30], [45.5, 42], [40.5, 54]) }],
        front: [
          { d: NECK },
          { d: TORSO },
          { d: limb([[27, 55], [17, 73], [27, 83]], [14, 9, 6]) },
          { d: limb([[33, 55], [43, 73], [33, 83]], [14, 9, 6]) },
          { d: arm([21, 30], [14.5, 42], [19.5, 54]) },
        ],
        headNode: head(30, 13),
      };

    case "stand":
    default:
      return {
        back: [{ d: arm([39, 29], [43.5, 41], [45, 53]) }, { d: arm([21, 29], [17, 41], [16, 53]) }],
        front: [...upright()],
        headNode: head(30, 13),
      };
  }
}

function Drawing({ pose }: { pose: Pose }) {
  const { back, front, headNode, extra } = parts(pose);
  const render = (p: Part, i: number) => (
    <path key={i} d={p.d} fill={p.soft ? "none" : "var(--fig-bg, #08080a)"} opacity={p.soft ? 0.55 : 1} />
  );
  return (
    <>
      {back.map(render)}
      {front.map((p, i) => render(p, i + 100))}
      {headNode}
      {extra?.map((p, i) => (
        <path key={`x${i}`} d={p.d} fill="none" />
      ))}
    </>
  );
}

type FigProps = {
  pose?: Pose;
  tone?: "gold" | "paper" | "dim" | "ice";
  mirror?: boolean;
  tilt?: number;
  style?: CSSProperties;
};

/** A single figure, standalone. */
export default function Person({ pose = "stand", tone = "paper", mirror, tilt = 0, style }: FigProps) {
  return (
    <svg viewBox="0 0 60 100" className="fig" style={style} aria-hidden="true">
      <g
        fill="var(--fig-bg, #08080a)"
        stroke={TONE[tone]}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        transform={`${mirror ? "translate(60,0) scale(-1,1)" : ""} rotate(${tilt} 30 50)`}
      >
        <Drawing pose={pose} />
      </g>
    </svg>
  );
}

/** The same figure placed inside a wider scene, at a shared scale. */
export function Fig({
  pose = "stand",
  x = 0,
  y = 0,
  scale = 1,
  tone = "paper",
  mirror,
  tilt = 0,
}: FigProps & { x?: number; y?: number; scale?: number }) {
  return (
    <g
      transform={`translate(${x} ${y}) scale(${scale}) ${mirror ? "translate(60,0) scale(-1,1)" : ""} rotate(${tilt} 30 50)`}
      fill="var(--fig-bg, #08080a)"
      stroke={TONE[tone]}
      strokeWidth={1.5 / scale}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <Drawing pose={pose} />
    </g>
  );
}

/* ---------- the objects they hold ---------- */

export function Prop({
  kind,
  x = 0,
  y = 0,
  scale = 1,
  tone = "gold",
}: {
  kind:
    | "door"
    | "coin"
    | "paper"
    | "compass"
    | "terminal"
    | "chip"
    | "gavel"
    | "key"
    | "flag"
    | "bars"
    | "clock"
    | "block";
  x?: number;
  y?: number;
  scale?: number;
  tone?: "gold" | "paper" | "dim" | "ice";
}) {
  const shapes: Record<string, ReactNode> = {
    door: (
      <>
        <path d="M2 2 h28 v44 h-28 z" />
        <circle cx="25" cy="25" r="1.6" />
      </>
    ),
    coin: (
      <>
        <circle cx="16" cy="16" r="13" />
        <path d="M16 6 v20" />
        <path d="M21 11 C 17 7, 10 9, 11 13 C 12 17, 20 16, 21 20 C 22 24, 15 25, 11 21" />
      </>
    ),
    paper: (
      <>
        <path d="M4 2 h26 v36 h-26 z" />
        <path d="M9 12 h16 M9 19 h16 M9 26 h10" />
      </>
    ),
    compass: (
      <>
        <circle cx="18" cy="18" r="15" />
        <path d="M12 24 l8 -12 l4 16 z" />
      </>
    ),
    terminal: (
      <>
        <path d="M2 4 h40 v28 h-40 z" />
        <path d="M8 13 l5 5 l-5 5 M20 23 h12" />
      </>
    ),
    chip: (
      <>
        <path d="M8 8 h22 v22 h-22 z" />
        <path d="M14 2 v6 M24 2 v6 M14 30 v6 M24 30 v6 M2 14 h6 M2 24 h6 M30 14 h6 M30 24 h6" />
        <circle cx="19" cy="19" r="3.5" />
      </>
    ),
    gavel: (
      <>
        <path d="M4 26 l16 -16" />
        <path d="M14 2 l14 14 l-6 6 l-14 -14 z" />
        <path d="M2 32 h16" />
      </>
    ),
    key: (
      <>
        <circle cx="11" cy="11" r="7" />
        <path d="M16 16 L 34 34" />
        <path d="M26 26 L 31 21 M30 30 L 35 25" />
      </>
    ),
    flag: (
      <>
        <path d="M6 40 v-38" />
        <path d="M6 4 h22 l-6 8 l6 8 h-22" />
      </>
    ),
    bars: (
      <>
        <path d="M2 34 h36" />
        <path d="M8 34 v-10 M18 34 v-20 M28 34 v-28" />
      </>
    ),
    clock: (
      <>
        <circle cx="18" cy="18" r="15" />
        <path d="M18 9 v9 l7 5" />
      </>
    ),
    block: <path d="M2 2 h20 v20 h-20 z" />,
  };

  return (
    <g
      transform={`translate(${x} ${y}) scale(${scale})`}
      fill="none"
      stroke={TONE[tone]}
      strokeWidth={1.8 / scale}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {shapes[kind]}
    </g>
  );
}
