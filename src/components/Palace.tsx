import { useState } from "react";
import { MODALITIES, Modality } from "../lib/data";
import { useReveal } from "../lib/hooks";
import { Fig } from "./Figures";

const WAVE = [
  0.3, 0.55, 0.42, 0.78, 0.9, 0.62, 0.38, 0.5, 0.72, 0.95, 0.6, 0.34, 0.46, 0.66, 0.88, 0.7, 0.44, 0.32, 0.58,
  0.8, 0.92, 0.68, 0.4, 0.52, 0.74, 0.86, 0.56, 0.36, 0.48, 0.64, 0.82, 0.6, 0.42, 0.3, 0.54, 0.76, 0.94, 0.66,
  0.38, 0.5,
];

const PLAN_W1 = [
  { t: "Diagnostic — equilibrium basics", s: "done" },
  { t: "Le Châtelier, five perturbations", s: "now" },
  { t: "ICE tables under stress", s: "todo" },
  { t: "Free-response, 2019 Q3", s: "todo" },
  { t: "Recall check — 7 days out", s: "todo" },
];

const PLAN_W6 = [
  { t: "Buffer capacity — retrieval set", s: "done" },
  { t: "Titration curves, mixed acids", s: "done" },
  { t: "Thermo ↔ equilibrium bridge", s: "now" },
  { t: "Timed FRQ block — 25 min", s: "todo" },
  { t: "Re-trial: audio room (week 6)", s: "todo" },
];

type Week = 1 | 6;

export default function Palace({ initialMode = "tutor" as Modality, initialWeek = 1 as Week }) {
  const [mode, setMode] = useState<Modality>(initialMode);
  const [week, setWeek] = useState<Week>(initialWeek);
  const [picked, setPicked] = useState<number | null>(null);
  const head = useReveal<HTMLDivElement>(0.1);
  const frame = useReveal<HTMLDivElement>(0.05);

  const fits: Record<Modality, number> =
    week === 1
      ? { tutor: 0.62, quiz: 0.58, visual: 0.55, audio: 0.51, text: 0.53 }
      : { tutor: 0.91, quiz: 0.83, visual: 0.44, audio: 0.29, text: 0.61 };

  const plan = week === 1 ? PLAN_W1 : PLAN_W6;

  const signals =
    week === 1
      ? [
          { l: "Retention @ 7d", v: "—", n: 0.12, cool: true },
          { l: "Time to first correct", v: "42s", n: 0.35 },
          { l: "Session survival", v: "17 min", n: 0.3 },
          { l: "Confidence calibration", v: "low", n: 0.24, cool: true },
        ]
      : [
          { l: "Retention @ 7d", v: "0.86", n: 0.86, cool: true },
          { l: "Time to first correct", v: "14s", n: 0.78 },
          { l: "Session survival", v: "41 min", n: 0.72 },
          { l: "Confidence calibration", v: "tight", n: 0.81, cool: true },
        ];

  return (
    <section className="sec" id="palace">
      <div className="shell">
        <div className="sec-head">
          <span className="num">§ 03</span>
          <span className="lbl">A generated palace</span>
          <span className="spacer" />
          <span className="lbl">Live template · click anything</span>
        </div>

        <div className="sec-title-row reveal" ref={head}>
          <h2 className="h2">
            This is what the system
            <br />
            handed one learner.
          </h2>
          <p className="lede">
            Ana, seventeen, AP Chemistry, exam in eleven weeks. Nothing below was chosen from a menu — the
            room, the tutor's manner, the order of the work and the shape of the page were all generated from
            her first four sessions. Slide it forward to week six and watch it move.
          </p>
        </div>

        <div className="reveal" ref={frame}>
          <div className="demo-frame">
            <div className="demo-bar">
              <div className="lights">
                <i />
                <i />
                <i />
              </div>
              <div className="demo-url">polywise.net/palace/ana · chem-equilibrium</div>
              <div className="demo-live">
                <i />
                adapting
              </div>
            </div>

            <div className="demo-body">
              {/* ---------------- left rail ---------------- */}
              <aside className="demo-rail">
                <div className="rail-user">
                  <div className="av">
                    <svg viewBox="14 0 32 62" aria-hidden="true">
                      <Fig pose="stand" x={0} y={0} scale={1} tone="gold" />
                    </svg>
                  </div>
                  <div className="who">
                    Ana R.
                    <span>week {week} · ap chem</span>
                  </div>
                </div>

                <p className="rail-label">This week's plan</p>
                {plan.map((p) => (
                  <div className={`plan-item ${p.s}`} key={p.t}>
                    <span className="tick" />
                    <span>{p.t}</span>
                  </div>
                ))}

                <p className="rail-label" style={{ marginTop: 22 }}>
                  Scheduled against
                </p>
                <div className="plan-item">
                  <span className="tick" style={{ borderStyle: "dashed" }} />
                  <span>Exam · May 8 · 11 weeks out</span>
                </div>
                <div className="plan-item">
                  <span className="tick" style={{ borderStyle: "dashed" }} />
                  <span>Peak hours · 20:00–21:30</span>
                </div>
              </aside>

              {/* ---------------- centre ---------------- */}
              <div className="demo-main">
                <div className="mode-tabs" role="tablist">
                  {MODALITIES.map((m) => (
                    <button
                      key={m.id}
                      role="tab"
                      aria-selected={mode === m.id}
                      className={mode === m.id ? "mode-tab on" : "mode-tab"}
                      onClick={() => {
                        setMode(m.id);
                        setPicked(null);
                      }}
                    >
                      <span className="mt">
                        <svg className="tab-fig" viewBox="10 0 40 100" aria-hidden="true">
                          <Fig
                            pose={
                              m.id === "tutor"
                                ? "point"
                                : m.id === "quiz"
                                ? "raise"
                                : m.id === "visual"
                                ? "think"
                                : m.id === "audio"
                                ? "listen"
                                : "read"
                            }
                            x={0}
                            y={0}
                            scale={1}
                            tone={mode === m.id ? "gold" : "dim"}
                          />
                        </svg>
                        {m.label}
                      </span>
                      <span className="ms">{m.sub}</span>
                      <span className="mode-fit">{Math.round(fits[m.id] * 100)}</span>
                    </button>
                  ))}
                </div>

                <div className="stage-area">
                  <div className="concept">
                    <h4>Le Châtelier's principle</h4>
                    <span className="tag">concept 24 / 94</span>
                    <span className="tag">mastery 0.41</span>
                  </div>

                  {mode === "tutor" && <TutorRoom week={week} />}
                  {mode === "quiz" && <QuizRoom picked={picked} setPicked={setPicked} />}
                  {mode === "visual" && <VisualRoom />}
                  {mode === "audio" && <AudioRoom />}
                  {mode === "text" && <TextRoom />}
                </div>
              </div>

              {/* ---------------- right rail ---------------- */}
              <aside className="demo-rail right">
                <p className="rail-label">Signals, live</p>
                {signals.map((s) => (
                  <div className="sig" key={s.l}>
                    <div className="sl">
                      <span>{s.l}</span>
                      <b>{s.v}</b>
                    </div>
                    <div className={s.cool ? "bar cool" : "bar"}>
                      <i style={{ width: `${s.n * 100}%` }} />
                    </div>
                  </div>
                ))}

                <div className="adapt">
                  <div className="t">Last rebuild · {week === 1 ? "2 days ago" : "yesterday"}</div>
                  <p>
                    {week === 1
                      ? "Not enough evidence yet. All five rooms stay in rotation and the interface stays deliberately plain."
                      : "Audio dropped to a 29 fit — narration is now reserved for review only. Tutor turns shortened by 40%, and the page was re-typeset denser after three consecutive sessions past 35 minutes."}
                  </p>
                </div>

                <div className="adapt" style={{ borderColor: "var(--line)", background: "rgba(255,255,255,0.02)" }}>
                  <div className="t" style={{ color: "var(--ice)" }}>
                    Next trial
                  </div>
                  <p style={{ color: "var(--paper-dim)" }}>
                    Thursday, 20:10 — buffers taught in the visual room, unannounced.
                  </p>
                </div>
              </aside>
            </div>
          </div>

          <div className="demo-under">
            <span className="mono">Watch it move —</span>
            <div className="week-toggle" role="group" aria-label="Timeline">
              {([1, 6] as Week[]).map((w) => (
                <button key={w} className={week === w ? "on" : ""} onClick={() => setWeek(w)}>
                  week {w}
                </button>
              ))}
            </div>
            <span className="mono" style={{ textTransform: "none", letterSpacing: "0.04em" }}>
              {week === 1
                ? "cold start — the system knows almost nothing about her"
                : "after 19 sessions — fit scores, plan, tone and layout have all moved"}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- rooms ---------------- */

function TutorRoom({ week }: { week: 1 | 6 }) {
  return (
    <div>
      <div className="msg ai">
        <div>
          <div className="tagline">tutor · polywise-chem-7b · adapter v14</div>
          <div className="bubble">
            {week === 1
              ? "Before I explain anything — you have a sealed flask, the reaction is at equilibrium, and I squeeze the flask to half its volume. What do you expect to happen, and why?"
              : "Squeeze the flask to half volume. Which side wins, and what is the actual mechanism — not the slogan?"}
          </div>
        </div>
      </div>
      <div className="msg me">
        <div className="bubble">
          It shifts to the side with fewer moles of gas? Because the pressure went up.
        </div>
      </div>
      <div className="msg ai">
        <div>
          <div className="tagline">probing the gap, not correcting it</div>
          <div className="bubble">
            Right conclusion. Now the part that trips people: pressure did not <em>cause</em> the shift. Q and K
            did. Write Q for 2NO₂ ⇌ N₂O₄ after the squeeze and tell me how it compares to K.
          </div>
        </div>
      </div>
      <div className="type-line">
        <span className="caret" />
        <span>Ana is typing — hesitation 3.1s, logged</span>
      </div>
    </div>
  );
}

function QuizRoom({ picked, setPicked }: { picked: number | null; setPicked: (n: number) => void }) {
  const opts = [
    "Shifts left, toward NO₂",
    "Shifts right, toward N₂O₄",
    "No shift — pressure cancels",
    "Shifts right, and K increases",
  ];
  const correct = 1;
  return (
    <div>
      <p className="quiz-q">
        A flask of 2NO₂ ⇌ N₂O₄ at equilibrium is compressed to half its volume at constant temperature. What
        happens?
      </p>
      <div className="quiz-opts">
        {opts.map((o, i) => (
          <button
            key={o}
            className={
              "quiz-opt" +
              (picked === null ? "" : i === correct ? " right" : picked === i ? " wrong" : "")
            }
            onClick={() => setPicked(i)}
          >
            <span className="key">{String.fromCharCode(65 + i)}</span>
            <span>{o}</span>
            {picked !== null && i === 3 && (
              <span className="mono" style={{ marginLeft: "auto", color: "var(--paper-faint)" }}>
                your usual trap
              </span>
            )}
          </button>
        ))}
      </div>
      <div className="quiz-meta">
        <div>
          <div className="mono">Streak</div>
          <div className="mono" style={{ color: "var(--gold-1)", fontSize: 14 }}>
            {picked === correct ? "7" : "6"}
          </div>
        </div>
        <div>
          <div className="mono">Answer window</div>
          <div className="mono" style={{ color: "var(--gold-1)", fontSize: 14 }}>
            00:18
          </div>
        </div>
        <div>
          <div className="mono">Next item difficulty</div>
          <div className="mono" style={{ color: "var(--ice)", fontSize: 14 }}>
            {picked === null ? "pending" : picked === correct ? "+1 step" : "−1 step"}
          </div>
        </div>
      </div>
    </div>
  );
}

function VisualRoom() {
  return (
    <div className="map-wrap">
      <svg viewBox="0 0 620 300">
        <path className="map-edge hot" d="M 120 60 C 210 60, 210 150, 300 150" />
        <path className="map-edge hot" d="M 300 150 C 390 150, 390 60, 480 60" />
        <path className="map-edge" d="M 120 240 C 210 240, 210 150, 300 150" />
        <path className="map-edge" d="M 300 150 C 390 150, 390 240, 480 240" />
        <path className="map-edge" d="M 480 60 C 545 60, 545 150, 545 150" />

        {[
          { x: 30, y: 40, w: 180, t: "Stress applied", k: false },
          { x: 30, y: 220, w: 180, t: "Concentration / volume / heat", k: false },
          { x: 216, y: 130, w: 168, t: "Q drifts away from K", k: true },
          { x: 400, y: 40, w: 160, t: "Net reaction re-runs", k: false },
          { x: 400, y: 220, w: 160, t: "K unchanged (unless ΔT)", k: false },
        ].map((n) => (
          <g className={n.k ? "map-node key" : "map-node"} key={n.t}>
            <rect x={n.x} y={n.y} width={n.w} height="40" rx="2" />
            <text x={n.x + 14} y={n.y + 24}>
              {n.t}
            </text>
          </g>
        ))}
        <text x="216" y="290" className="mono" fill="#6d6862" fontSize="10" fontFamily="monospace">
          the middle box is the only sentence that matters
        </text>
      </svg>
    </div>
  );
}

function AudioRoom() {
  return (
    <div className="audio-card">
      <div className="mono">Narrated depth · 6 min · voice: measured, no music</div>
      <div className="wave">
        {WAVE.map((h, i) => (
          <i key={i} style={{ height: `${h * 100}%`, animationDelay: `${(i % 12) * 0.09}s` }} />
        ))}
      </div>
      <p className="transcript">
        "…so when the volume halves, every concentration doubles at once. The ratio you call Q gets squeezed in
        a way that depends on how many gas molecules sit on each side of the arrow — <mark>and that asymmetry,
        nothing else, is what decides the direction</mark>. Temperature is the only lever that moves K itself…"
      </p>
      <div className="quiz-meta" style={{ marginTop: 18 }}>
        <div>
          <div className="mono">Replays of 00:41</div>
          <div className="mono" style={{ color: "var(--gold-1)", fontSize: 14 }}>
            3
          </div>
        </div>
        <div>
          <div className="mono">Fit for Ana</div>
          <div className="mono" style={{ color: "var(--ember)", fontSize: 14 }}>
            falling
          </div>
        </div>
      </div>
    </div>
  );
}

function TextRoom() {
  return (
    <div className="reader">
      <p className="dropcap">
        Equilibrium is not stillness. Both directions of the reaction are running at full speed; they simply
        run at the same rate, so nothing appears to move. Every intuition worth having about Le Châtelier
        starts from that sentence.
      </p>
      <div className="aside">
        note · generated for you — you lost four minutes here last Tuesday, so this paragraph was shortened and
        the worked example moved above the definition.
      </div>
      <p>
        Compress the flask and you have not changed how fast either direction wants to go. You have changed the
        crowd. The side of the arrow with more gas molecules feels the squeeze harder, the reaction quotient
        slips off K, and the system re-runs until the ratio is restored.
      </p>
    </div>
  );
}
