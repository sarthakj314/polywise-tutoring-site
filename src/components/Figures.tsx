/* ------------------------------------------------------------------
   The Polywise people — clean monoline figures.

   Drawn the way a good pictogram set is drawn: one stroke weight, round
   caps and joins, exact geometry, no fills, no traced wobble. The torso
   is a shape rather than a line, which is what keeps these from reading
   as stick figures; everything else is a straight run with a rounded
   joint.

   The rig, in a 60 × 100 box:
     head      circle r7.5 at (30, 12)
     neck      (30, 19.5) → (30, 26)
     shoulders y26, 21 wide  · joints at (20, 31) and (40, 31)
     hips      y56, 15 wide  · joints at (26, 57) and (34, 57)
     knee      y75 · ankle y93 · floor y96
   ------------------------------------------------------------------ */

import { CSSProperties, ReactNode } from "react";

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

/* ---------- fixed parts ---------- */

const HEAD = { cx: 30, cy: 12, r: 7.5 };
const NECK = "M30 19.5 V26";

/** Shoulders 21 wide, drawn in at the waist, hips 15 wide. Corners are true arcs. */
const TORSO =
  "M19.8 30.5 C19.8 27.6 21.6 26 24 26 L36 26 C38.4 26 40.2 27.6 40.2 30.5 " +
  "L38.2 52.5 C38 55.2 36.6 56.6 34.4 56.6 L25.6 56.6 C23.4 56.6 22 55.2 21.8 52.5 Z";

/** The same torso from the side — narrower. */
const TORSO_SIDE =
  "M25.6 30.5 C25.6 27.6 27.2 26 29.4 26 L33.4 26 C35.6 26 37.2 27.6 37.2 30.5 " +
  "L36 52.5 C35.8 55.2 34.6 56.6 32.6 56.6 L27.4 56.6 C25.4 56.6 24.2 55.2 24 52.5 Z";

const line = (...pts: [number, number][]) =>
  pts.map((p, i) => `${i ? "L" : "M"}${p[0]} ${p[1]}`).join(" ");

type Part = { d: string; soft?: boolean };

/* ---------- poses ---------- */

const LEGS: Part[] = [
  { d: line([26, 57], [24.6, 75], [23.6, 93], [19.4, 95.4]) },
  { d: line([34, 57], [35.4, 75], [36.4, 93], [40.6, 95.4]) },
];

const LEGS_APART: Part[] = [
  { d: line([26, 57], [23, 75], [20.6, 93], [16.4, 95.4]) },
  { d: line([34, 57], [37, 75], [39.4, 93], [43.6, 95.4]) },
];

const ARM_L: Part = { d: line([20, 31], [16.6, 44], [15.6, 55.5]) };
const ARM_R: Part = { d: line([40, 31], [43.4, 44], [44.4, 55.5]) };

const CHAIR: Part[] = [
  { d: "M21 63 V38", soft: true },
  { d: "M19 63 H53", soft: true },
  { d: "M23.5 63 V93", soft: true },
  { d: "M50.5 63 V93", soft: true },
];

/** Side view: torso upright, thigh forward, shin down, foot out. */
const SEATED: Part[] = [
  { d: NECK },
  { d: TORSO_SIDE },
  { d: line([30, 56], [48, 58.5], [49, 75], [49.4, 92], [54.4, 94.4]) },
];

function poseParts(pose: Pose): {
  parts: Part[];
  head: { cx: number; cy: number; rot?: number };
  extra?: Part[];
} {
  const H = { cx: HEAD.cx, cy: HEAD.cy };

  switch (pose) {
    case "walk":
      return {
        parts: [
          { d: NECK },
          { d: TORSO_SIDE },
          { d: line([27, 57], [22.5, 75], [18.5, 92], [14, 94.4]) },
          { d: line([33, 57], [38, 75], [42.5, 92], [47, 94.4]) },
          { d: line([26.2, 31], [22, 43], [20.6, 54]) },
          { d: line([35.6, 31], [40, 42], [41.4, 52]) },
        ],
        head: { cx: 30, cy: 11.4, rot: -4 },
      };

    case "think":
      return {
        parts: [
          { d: NECK },
          { d: TORSO },
          ...LEGS,
          ARM_R,
          { d: line([20, 31], [15.6, 44], [24.6, 24.5]) },
        ],
        head: { cx: 30, cy: 12, rot: -9 },
      };

    case "point":
      return {
        parts: [
          { d: NECK },
          { d: TORSO },
          ...LEGS,
          ARM_L,
          { d: line([40, 31], [47.5, 31], [56, 31]) },
        ],
        head: { cx: 30, cy: 12, rot: 3 },
      };

    case "raise":
      return {
        parts: [
          { d: NECK },
          { d: TORSO },
          ...LEGS,
          ARM_L,
          { d: line([40, 31], [45, 19], [46, 5.5]) },
        ],
        head: { cx: 30, cy: 12, rot: 3 },
      };

    case "cheer":
      return {
        parts: [
          { d: NECK },
          { d: TORSO },
          ...LEGS_APART,
          { d: line([20, 31], [15, 19], [14, 5.5]) },
          { d: line([40, 31], [45, 19], [46, 5.5]) },
        ],
        head: H,
      };

    case "sit":
      return {
        parts: [...CHAIR, ...SEATED, { d: line([30.5, 32], [38, 44], [45.5, 50]) }],
        head: { cx: 30, cy: 12, rot: 2 },
      };

    case "read":
      return {
        parts: [
          ...CHAIR,
          ...SEATED,
          { d: line([30.5, 32], [37, 43], [43, 46.5]) },
          { d: "M36.5 47.5 L53.5 40.5 L57 49 L40 56 Z" },
          { d: "M45 44 L55 44.8", soft: true },
        ],
        head: { cx: 30, cy: 12, rot: 10 },
      };

    case "listen":
      return {
        parts: [{ d: NECK }, { d: TORSO }, ...LEGS, ARM_L, ARM_R],
        extra: [
          { d: "M20.8 10 C20.8 1.6 39.2 1.6 39.2 10" },
          { d: "M18.4 8.6 h4.6 v7.4 h-4.6 z" },
          { d: "M37 8.6 h4.6 v7.4 h-4.6 z" },
        ],
        head: H,
      };

    case "lift":
      return {
        parts: [
          { d: NECK },
          { d: TORSO },
          ...LEGS_APART,
          { d: line([20, 31], [16.5, 21], [18.5, 11.5]) },
          { d: line([40, 31], [43.5, 21], [41.5, 11.5]) },
        ],
        extra: [{ d: "M8 9 H52" }, { d: "M11 4.5 V13.5 M7 6 V12 M49 4.5 V13.5 M53 6 V12" }],
        head: { cx: 30, cy: 13 },
      };

    case "rest":
      return {
        parts: [
          { d: NECK },
          { d: TORSO },
          { d: line([26, 57], [17.5, 73], [29, 80.5]) },
          { d: line([34, 57], [42.5, 73], [31, 80.5]) },
          { d: line([20, 31], [14.5, 43], [19.5, 54]) },
          { d: line([40, 31], [45.5, 43], [40.5, 54]) },
        ],
        head: H,
      };

    case "stand":
    default:
      return {
        parts: [{ d: NECK }, { d: TORSO }, ...LEGS, ARM_L, ARM_R],
        head: H,
      };
  }
}

function Drawing({ pose }: { pose: Pose }) {
  const { parts, head, extra } = poseParts(pose);
  return (
    <>
      {parts.map((p, i) => (
        <path key={i} d={p.d} opacity={p.soft ? 0.5 : 1} />
      ))}
      <circle
        cx={head.cx}
        cy={head.cy}
        r={HEAD.r}
        transform={head.rot ? `rotate(${head.rot} ${head.cx} ${head.cy})` : undefined}
      />
      {extra?.map((p, i) => (
        <path key={`x${i}`} d={p.d} />
      ))}
    </>
  );
}

type FigProps = {
  pose?: Pose;
  tone?: "gold" | "paper" | "dim" | "ice";
  mirror?: boolean;
  tilt?: number;
  /** Fine adjustment of the line weight — a crowd of small figures wants a
      lighter line than a single large one, even though the rig is shared. */
  weight?: number;
  style?: CSSProperties;
};

const STROKE = 2.6;

/** A single figure, standalone. */
export default function Person({ pose = "stand", tone = "paper", mirror, tilt = 0, style }: FigProps) {
  return (
    <svg viewBox="0 0 60 100" className="fig" style={style} aria-hidden="true">
      <g
        fill="none"
        stroke={TONE[tone]}
        strokeWidth={STROKE}
        strokeLinecap="round"
        strokeLinejoin="round"
        transform={`${mirror ? "translate(60,0) scale(-1,1)" : ""} rotate(${tilt} 30 50)`}
      >
        <Drawing pose={pose} />
      </g>
    </svg>
  );
}

/** The same figure inside a wider scene, at a shared stroke weight. */
export function Fig({
  pose = "stand",
  x = 0,
  y = 0,
  scale = 1,
  tone = "paper",
  mirror,
  tilt = 0,
  weight = 1,
}: FigProps & { x?: number; y?: number; scale?: number }) {
  return (
    <g
      transform={`translate(${x} ${y}) scale(${scale}) ${mirror ? "translate(60,0) scale(-1,1)" : ""} rotate(${tilt} 30 50)`}
      fill="none"
      stroke={TONE[tone]}
      strokeWidth={(STROKE * weight) / scale}
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
      strokeWidth={2 / scale}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {shapes[kind]}
    </g>
  );
}
