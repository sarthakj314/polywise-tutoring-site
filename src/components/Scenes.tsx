/* Small line-drawn scenes. Every one of them uses the same person from
   Figures.tsx at the same stroke weight, so the site reads as one hand. */

import { ReactNode } from "react";
import { Fig, Prop } from "./Figures";

const line = {
  fill: "none",
  stroke: "rgba(239,234,225,0.28)",
  strokeWidth: 2,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

const gold = {
  fill: "none",
  stroke: "rgba(220,174,101,0.75)",
  strokeWidth: 2,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

function Frame({ children, w = 260, h = 120 }: { children: ReactNode; w?: number; h?: number }) {
  return (
    <svg className="scene" viewBox={`0 0 ${w} ${h}`} aria-hidden="true">
      <g {...line}>
        <path d={`M6 ${h - 8} H ${w - 6}`} />
      </g>
      {children}
    </svg>
  );
}

/* 01 — arrival: someone walks in and names a target */
export function SceneArrival() {
  return (
    <Frame>
      <Fig pose="walk" x={26} y={16} scale={0.92} tone="paper" />
      <g {...line} opacity="0.5">
        <path d="M104 106 C 130 96, 150 96, 176 106" strokeDasharray="4 7" />
      </g>
      <Prop kind="flag" x={196} y={62} scale={1.1} tone="gold" />
      <g {...gold} opacity="0.6">
        <path d="M92 44 h44" />
        <path d="M128 38 l8 6 l-8 6" />
      </g>
    </Frame>
  );
}

/* 02 — the trials: the same person, five doors */
export function SceneTrials() {
  return (
    <Frame>
      {[0, 1, 2, 3, 4].map((i) => (
        <g key={i} transform={`translate(${10 + i * 50} 30)`} opacity={i === 2 ? 1 : 0.4}>
          <Prop kind="door" x={0} y={0} scale={1.6} tone={i === 2 ? "gold" : "dim"} />
        </g>
      ))}
      <Fig pose="stand" x={112} y={50} scale={0.62} tone="paper" />
    </Frame>
  );
}

/* 03 — signal: the room watches while you work */
export function SceneSignal() {
  return (
    <Frame>
      <Fig pose="sit" x={30} y={16} scale={0.92} tone="paper" />
      <g {...line}>
        <path d="M96 78 h72 M104 78 v26 M160 78 v26" />
      </g>
      <g {...gold} opacity="0.85">
        <path d="M112 64 h44 v-22 h-44 z" />
        <path d="M118 58 h20 M118 50 h30" opacity="0.6" />
      </g>
      <g {...gold} opacity="0.55">
        <path d="M186 96 C 200 96, 200 70, 186 70" strokeDasharray="3 5" />
        <path d="M198 100 C 218 100, 218 62, 198 62" strokeDasharray="3 5" />
        <path d="M210 104 C 236 104, 236 56, 210 56" strokeDasharray="3 5" />
      </g>
    </Frame>
  );
}

/* 04 — the read: a measured profile, not a personality quiz */
export function SceneRead() {
  return (
    <Frame>
      <Fig pose="think" x={20} y={16} scale={0.92} tone="paper" />
      <g transform="translate(108 34)">
        <Prop kind="bars" x={0} y={0} scale={1.5} tone="gold" />
      </g>
      <g {...line} opacity="0.6">
        <path d="M96 60 h16" strokeDasharray="3 4" />
      </g>
      <g {...gold} opacity="0.5">
        <circle cx="212" cy="52" r="16" />
        <circle cx="212" cy="52" r="9" />
        <circle cx="212" cy="52" r="3" />
      </g>
    </Frame>
  );
}

/* 05 — construction: the room gets built */
export function SceneBuild() {
  return (
    <Frame>
      <Fig pose="raise" x={16} y={16} scale={0.92} tone="paper" />
      <g {...gold}>
        <path d="M100 104 h26 v-22 h-26 z" />
        <path d="M126 104 h26 v-22 h-26 z" />
        <path d="M113 82 h26 v-22 h-26 z" opacity="0.8" />
        <path d="M139 82 h26 v-22 h-26 z" opacity="0.55" />
        <path d="M126 60 h26 v-22 h-26 z" opacity="0.35" />
      </g>
      <g transform="translate(196 44)">
        <Prop kind="chip" x={0} y={0} scale={0.9} tone="ice" />
      </g>
    </Frame>
  );
}

/* 06 — the palace: a room that fits one person */
export function ScenePalace() {
  return (
    <Frame>
      <g {...gold} opacity="0.75">
        <path d="M60 104 v-52 l52 -30 l52 30 v52" />
        <path d="M42 56 L 112 14 L 182 56" opacity="0.6" />
      </g>
      <Fig pose="read" x={78} y={30} scale={0.72} tone="paper" />
      <g {...line} opacity="0.5">
        <path d="M198 104 v-30 M206 104 v-44 M214 104 v-22" />
      </g>
    </Frame>
  );
}

export const STAGE_SCENES = [
  SceneArrival,
  SceneTrials,
  SceneSignal,
  SceneRead,
  SceneBuild,
  ScenePalace,
];

/* ---------- the manifesto: thirty in a room vs one room each ---------- */

export function SceneClassroom() {
  const rows = [0, 1, 2];
  const cols = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  return (
    <svg className="scene wide" viewBox="0 0 620 210" aria-hidden="true">
      <g {...line} opacity="0.5">
        <path d="M14 14 h276 v182 h-276 z" />
      </g>
      <Fig pose="point" x={20} y={92} scale={0.78} weight={0.85} tone="gold" />
      {rows.map((r) =>
        cols.map((c) => (
          <Fig
            key={`${r}-${c}`}
            pose="stand"
            x={72 + c * 21}
            y={40 + r * 52}
            scale={0.42}
            weight={0.62}
            tone="dim"
          />
        ))
      )}
      <text x="14" y="208" className="scene-cap">
        one teacher · thirty people · one explanation
      </text>

      <g {...gold} opacity="0.7">
        <path d="M330 14 h276 v182 h-276 z" />
        <path d="M386 196 v-96 l82 -44 l82 44 v96" opacity="0.6" />
      </g>
      <Fig pose="read" x={430} y={92} scale={0.86} tone="paper" />
      <g {...line} opacity="0.45">
        <path d="M352 60 h30 M352 74 h20 M352 88 h26" />
        <path d="M566 60 h24 M566 74 h30 M566 88 h18" />
      </g>
      <text x="330" y="208" className="scene-cap gold">
        one room each · rebuilt weekly
      </text>
    </svg>
  );
}

/* ---------- cta: walking in ---------- */

export function SceneEnter() {
  return (
    <svg className="scene enter" viewBox="0 0 300 120" aria-hidden="true">
      <g {...line}>
        <path d="M10 108 H 290" />
      </g>
      <Fig pose="walk" x={44} y={16} scale={0.92} tone="paper" />
      <g {...gold} opacity="0.5">
        <path d="M116 60 h34" strokeDasharray="4 6" />
        <path d="M144 55 l7 5 l-7 5" />
      </g>
      <g {...gold}>
        <path d="M168 108 V 44 L 214 20 L 260 44 v64" />
        <path d="M196 108 V 66 h36 v42" opacity="0.75" />
        <circle cx="226" cy="88" r="2" />
      </g>
    </svg>
  );
}

/* ---------- atlas: the same person, a different object ---------- */

const ATLAS_PROPS = ["coin", "paper", "compass", "terminal", "chip", "lift", "gavel", "key"] as const;

export function SceneDomain({ index }: { index: number }) {
  const kind = ATLAS_PROPS[index % ATLAS_PROPS.length];
  const isLift = kind === "lift";
  return (
    <svg className="scene small" viewBox="0 0 150 116" aria-hidden="true">
      <g {...line}>
        <path d="M8 106 H 142" />
      </g>
      {isLift ? (
        <Fig pose="lift" x={44} y={8} scale={0.94} tone="paper" />
      ) : (
        <>
          <Fig pose="point" x={10} y={8} scale={0.9} tone="paper" />
          <g transform="translate(96 40)">
            <Prop kind={kind as "coin"} x={0} y={0} scale={1.05} tone="gold" />
          </g>
        </>
      )}
    </svg>
  );
}

/* ---------- engine cards ---------- */

export function SceneEngine({ n }: { n: string }) {
  if (n === "A")
    return (
      <svg className="scene tiny" viewBox="0 0 160 84" aria-hidden="true">
        {[0, 1, 2].map((i) => (
          <g key={i} transform={`translate(${6 + i * 42} 8)`}>
            <Prop kind="door" x={0} y={0} scale={1.35} tone={i === 1 ? "gold" : "dim"} />
          </g>
        ))}
        <Fig pose="stand" x={116} y={26} scale={0.56} tone="paper" />
      </svg>
    );
  if (n === "B")
    return (
      <svg className="scene tiny" viewBox="0 0 160 84" aria-hidden="true">
        <Fig pose="stand" x={6} y={16} scale={0.66} tone="paper" />
        <g {...gold} opacity="0.6">
          <path d="M56 46 h34" strokeDasharray="4 5" />
          <path d="M84 41 l7 5 l-7 5" />
        </g>
        <g transform="translate(100 22)">
          <Prop kind="chip" x={0} y={0} scale={1.05} tone="gold" />
        </g>
      </svg>
    );
  if (n === "C")
    return (
      <svg className="scene tiny" viewBox="0 0 160 84" aria-hidden="true">
        <Fig pose="think" x={4} y={16} scale={0.66} tone="paper" />
        <g {...gold}>
          <path d="M62 12 h40 v60 h-40 z" opacity="0.45" />
          <path d="M68 20 h28 M68 30 h20 M68 40 h28 M68 50 h14" opacity="0.45" />
          <path d="M112 12 h40 v60 h-40 z" />
          <path d="M118 20 h28 M118 28 h28 M118 36 h28 M118 44 h18 M118 56 h28" />
        </g>
      </svg>
    );
  return (
    <svg className="scene tiny" viewBox="0 0 160 84" aria-hidden="true">
      <Fig pose="sit" x={2} y={12} scale={0.68} tone="paper" />
      <g {...gold} opacity="0.8">
        <path d="M66 68 C 92 68, 96 26, 150 22" strokeDasharray="4 5" />
        <path d="M66 68 C 86 68, 92 46, 118 42" />
      </g>
      <g transform="translate(112 8)">
        <Prop kind="clock" x={0} y={0} scale={0.66} tone="ice" />
      </g>
    </svg>
  );
}
