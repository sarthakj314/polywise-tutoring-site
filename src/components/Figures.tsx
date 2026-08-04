/* ------------------------------------------------------------------
   The Polywise line people.
   One character, one stroke weight, one set of proportions — reused
   everywhere on the site so the whole page reads as a single hand.

   Grid: every figure lives in a 60 × 100 box.
     head   r 9   at (30, 15)
     neck   (30, 24) → (30, 30)
     spine  (30, 30) → (30, 62)
     hips   (30, 62)
     floor  y = 96
   ------------------------------------------------------------------ */

import { CSSProperties, ReactNode } from "react";

export type Pose =
  | "stand"
  | "walk"
  | "think"
  | "point"
  | "raise"
  | "sit"
  | "read"
  | "listen"
  | "lift"
  | "cheer"
  | "rest";

type FigProps = {
  pose?: Pose;
  tone?: "gold" | "paper" | "dim" | "ice";
  mirror?: boolean;
  tilt?: number;
  style?: CSSProperties;
};

const TONE: Record<string, string> = {
  gold: "#dcae65",
  paper: "#efeae1",
  dim: "rgba(239,234,225,0.42)",
  ice: "#a9c9c3",
};

/** The body, drawn pose by pose. Coordinates only — colour comes from the wrapper. */
export function Body({ pose = "stand" }: { pose?: Pose }) {
  const head = <circle cx="30" cy="15" r="9" />;
  const neck = <path d="M30 24 v6" />;

  switch (pose) {
    case "walk":
      return (
        <>
          {head}
          {neck}
          <path d="M30 30 C 31 42, 29 52, 30 62" />
          <path d="M30 35 C 24 41, 20 47, 17 54" />
          <path d="M30 35 C 37 39, 42 42, 46 44" />
          <path d="M30 62 C 26 72, 22 82, 17 92 M17 92 h7" />
          <path d="M30 62 C 35 71, 40 80, 45 88 M45 88 l5 3" />
        </>
      );
    case "think":
      return (
        <>
          <circle cx="30" cy="15" r="9" transform="rotate(-10 30 15)" />
          {neck}
          <path d="M30 30 v32" />
          <path d="M30 36 L 19 46 L 24 26" />
          <path d="M30 37 C 36 43, 39 50, 40 57" />
          <path d="M30 62 C 28 74, 26 84, 25 94 M25 94 h7" />
          <path d="M30 62 C 34 74, 36 84, 37 94 M37 94 h7" />
        </>
      );
    case "point":
      return (
        <>
          {head}
          {neck}
          <path d="M30 30 v32" />
          <path d="M30 36 C 24 43, 21 50, 20 57" />
          <path d="M30 35 C 38 34, 46 33, 53 32" />
          <path d="M30 62 C 28 74, 26 84, 25 94 M25 94 h7" />
          <path d="M30 62 C 34 74, 36 84, 37 94 M37 94 h7" />
        </>
      );
    case "raise":
      return (
        <>
          {head}
          {neck}
          <path d="M30 30 v32" />
          <path d="M30 35 L 42 24 L 45 7" />
          <path d="M30 36 C 25 43, 22 50, 21 57" />
          <path d="M30 62 C 28 74, 26 84, 25 94 M25 94 h7" />
          <path d="M30 62 C 34 74, 36 84, 37 94 M37 94 h7" />
        </>
      );
    case "cheer":
      return (
        <>
          {head}
          {neck}
          <path d="M30 30 v32" />
          <path d="M30 35 L 43 26 L 47 10" />
          <path d="M30 35 L 17 26 L 13 10" />
          <path d="M30 62 C 27 74, 24 84, 22 94 M22 94 h7" />
          <path d="M30 62 C 35 74, 38 84, 40 94 M40 94 h7" />
        </>
      );
    case "sit":
      return (
        <>
          {/* chair, behind */}
          <path d="M24 62 h28 M26 40 L 26 62 M28 62 v28 M50 62 v28" opacity="0.55" />
          {head}
          {neck}
          <path d="M30 30 v30" />
          <path d="M30 37 L 40 48 L 47 53" />
          <path d="M30 60 L 48 62 L 49 90" />
        </>
      );
    case "read":
      return (
        <>
          <path d="M24 62 h28 M26 40 L 26 62 M28 62 v28 M50 62 v28" opacity="0.55" />
          <circle cx="30" cy="15" r="9" transform="rotate(9 30 15)" />
          {neck}
          <path d="M30 30 v30" />
          <path d="M30 37 L 38 46 L 44 44" />
          <path d="M36 40 L 52 35 L 56 45 L 40 50 Z" />
          <path d="M40 41 L 50 38 M42 45 L 52 42" opacity="0.7" />
          <path d="M30 60 L 48 62 L 49 90" />
        </>
      );
    case "listen":
      return (
        <>
          {head}
          <path d="M18 14 C 18 4, 42 4, 42 14" />
          <path d="M16 12 h4 v7 h-4 z" />
          <path d="M40 12 h4 v7 h-4 z" />
          {neck}
          <path d="M30 30 v32" />
          <path d="M30 36 C 24 42, 21 49, 21 56" />
          <path d="M30 36 C 36 42, 39 49, 39 56" />
          <path d="M30 62 C 28 74, 26 84, 25 94 M25 94 h7" />
          <path d="M30 62 C 34 74, 36 84, 37 94 M37 94 h7" />
        </>
      );
    case "lift":
      return (
        <>
          {head}
          {neck}
          <path d="M30 30 v32" />
          <path d="M30 34 C 24 30, 20 24, 18 18" />
          <path d="M30 34 C 36 30, 40 24, 42 18" />
          <path d="M10 16 h40" />
          <path d="M12 11 v10 M8 13 v6 M48 11 v10 M52 13 v6" />
          <path d="M30 62 C 26 72, 24 82, 23 94 M23 94 h7" />
          <path d="M30 62 C 34 72, 36 82, 37 94 M37 94 h7" />
        </>
      );
    case "rest":
      return (
        <>
          {head}
          {neck}
          <path d="M30 30 v34" />
          <path d="M30 38 L 20 52" />
          <path d="M30 38 L 40 52" />
          <path d="M30 64 L 14 84 L 30 88 L 46 84 L 30 64" />
        </>
      );
    case "stand":
    default:
      return (
        <>
          {head}
          {neck}
          <path d="M30 30 C 31 42, 29 52, 30 62" />
          <path d="M30 36 C 24 43, 21 50, 20 58" />
          <path d="M30 36 C 36 43, 39 50, 40 58" />
          <path d="M30 62 C 28 74, 26 84, 25 94 M25 94 h7" />
          <path d="M30 62 C 34 74, 36 84, 37 94 M37 94 h7" />
        </>
      );
  }
}

/** A single figure, standalone. */
export default function Person({ pose = "stand", tone = "paper", mirror, tilt = 0, style }: FigProps) {
  return (
    <svg viewBox="0 0 60 100" className="fig" style={style} aria-hidden="true">
      <g
        fill="none"
        stroke={TONE[tone]}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        transform={`${mirror ? "translate(60,0) scale(-1,1)" : ""} rotate(${tilt} 30 50)`}
      >
        <Body pose={pose} />
      </g>
    </svg>
  );
}

/** Places a figure inside a wider scene, at the same scale as everywhere else. */
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
      fill="none"
      stroke={TONE[tone]}
      strokeWidth={2 / scale}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <Body pose={pose} />
    </g>
  );
}

/** Shared props the people hold — same monoline vocabulary. */
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
