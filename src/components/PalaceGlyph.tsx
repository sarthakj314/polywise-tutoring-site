import { CSSProperties } from "react";
import { useCycle } from "../lib/hooks";
import { MODALITIES } from "../lib/data";
import { Fig } from "./Figures";

/* Chips sit on the same rays the spokes are drawn along, so every line
   lands exactly on the label it belongs to. */
const RING = 46; // % of the box
const ANGLES = [0, 1, 2, 3, 4].map((i) => (-90 + i * 72) * (Math.PI / 180));
const CHIP_POS = ANGLES.map((a, i) => ({
  left: `${50 + Math.cos(a) * RING}%`,
  top: `${50 + Math.sin(a) * RING}%`,
  transform: "translate(-50%, -50%)",
  animationDelay: `${i * 0.7}s`,
}));

/** The hero mark: a floor-plan of nested rooms with a live core. */
export default function PalaceGlyph() {
  const [active] = useCycle(MODALITIES.length, 2600);

  const rooms = [
    { s: 168, o: 0.1 },
    { s: 132, o: 0.16 },
    { s: 98, o: 0.24 },
    { s: 66, o: 0.34 },
  ];

  return (
    <div className="glyph">
      <svg viewBox="0 0 400 400" role="img" aria-label="A generated learning environment, drawn as nested rooms">
        <defs>
          <linearGradient id="gGold" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#f8e9c9" />
            <stop offset="50%" stopColor="#dcae65" />
            <stop offset="100%" stopColor="#a2682f" />
          </linearGradient>
          <radialGradient id="gCore">
            <stop offset="0%" stopColor="#f8e9c9" stopOpacity="0.9" />
            <stop offset="60%" stopColor="#dcae65" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#dcae65" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* outer dotted orbit */}
        <g className="glyph-ring">
          <circle cx="200" cy="200" r="186" fill="none" stroke="rgba(238,232,222,0.11)" strokeWidth="1" strokeDasharray="1 9" />
          <circle cx="200" cy="200" r="164" fill="none" stroke="rgba(238,232,222,0.07)" strokeWidth="1" />
        </g>

        {/* tick ring */}
        <g className="glyph-ring rev">
          {Array.from({ length: 60 }).map((_, i) => {
            const a = (i / 60) * Math.PI * 2;
            const r1 = 150;
            const r2 = i % 5 === 0 ? 140 : 145;
            return (
              <line
                key={i}
                x1={200 + Math.cos(a) * r1}
                y1={200 + Math.sin(a) * r1}
                x2={200 + Math.cos(a) * r2}
                y2={200 + Math.sin(a) * r2}
                stroke={i % 5 === 0 ? "rgba(220,174,101,0.5)" : "rgba(238,232,222,0.14)"}
                strokeWidth="1"
              />
            );
          })}
        </g>

        {/* nested rooms, rotated to read as a plan */}
        <g transform="rotate(45 200 200)">
          {rooms.map((r, i) => (
            <rect
              key={r.s}
              x={200 - r.s / 2}
              y={200 - r.s / 2}
              width={r.s}
              height={r.s}
              rx="2"
              fill="none"
              stroke="url(#gGold)"
              strokeOpacity={r.o + (i === active % rooms.length ? 0.45 : 0)}
              strokeWidth={i === active % rooms.length ? 1.6 : 1}
              style={{ transition: "stroke-opacity 0.9s ease, stroke-width 0.9s ease" }}
            />
          ))}
          {/* doorways: gaps drawn as short bright segments */}
          <line x1="200" y1="116" x2="200" y2="134" stroke="url(#gGold)" strokeWidth="2" />
          <line x1="266" y1="200" x2="284" y2="200" stroke="url(#gGold)" strokeWidth="2" opacity="0.7" />
          <line x1="116" y1="200" x2="134" y2="200" stroke="url(#gGold)" strokeWidth="2" opacity="0.5" />
        </g>

        {/* core — the person the rooms are built around */}
        <circle cx="200" cy="196" r="66" fill="url(#gCore)" />
        <circle cx="200" cy="200" r="26" fill="none" stroke="rgba(220,174,101,0.45)" strokeWidth="1">
          <animate attributeName="r" values="26;56;26" dur="4.8s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.55;0;0.55" dur="4.8s" repeatCount="indefinite" />
        </circle>
        <Fig pose="stand" x={166} y={142} scale={1.12} tone="paper" />
        <path d="M158 252 h84" stroke="rgba(220,174,101,0.5)" strokeWidth="1.4" strokeLinecap="round" />

        {/* spokes: drawn along the exact rays the chips are pinned to */}
        {MODALITIES.map((m, i) => {
          const a = ANGLES[i];
          const on = i === active;
          return (
            <line
              key={m.id}
              x1={200 + Math.cos(a) * 74}
              y1={200 + Math.sin(a) * 74}
              x2={200 + Math.cos(a) * (RING * 4 - 30)}
              y2={200 + Math.sin(a) * (RING * 4 - 30)}
              stroke={on ? "rgba(220,174,101,0.75)" : "rgba(238,232,222,0.12)"}
              strokeWidth={on ? 1.4 : 1}
              strokeDasharray={on ? "0" : "2 5"}
              style={{ transition: "stroke 0.7s ease" }}
            />
          );
        })}
      </svg>

      {MODALITIES.map((m, i) => (
        <div
          key={m.id}
          className={i === active ? "glyph-chip on" : "glyph-chip"}
          style={CHIP_POS[i] as CSSProperties}
        >
          <i />
          {m.label}
        </div>
      ))}
    </div>
  );
}
