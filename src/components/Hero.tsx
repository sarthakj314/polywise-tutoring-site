import PalaceGlyph from "./PalaceGlyph";
import { SIGNALS } from "../lib/data";
import { useReveal } from "../lib/hooks";

const FACTS = [
  { k: "Five", rest: " rooms", body: "Every concept is taught five ways before we commit to one." },
  { k: "38", rest: " signals", body: "Captured per session — latency, re-reads, hesitation, survival." },
  { k: "One", rest: " model each", body: "A tutor adapter fine-tuned on your domain and your mistakes." },
  { k: "7", rest: " days", body: "How long we wait before re-testing what you actually kept." },
];

export default function Hero() {
  const left = useReveal<HTMLDivElement>(0.05);
  const right = useReveal<HTMLDivElement>(0.05);
  const foot = useReveal<HTMLDivElement>(0.05);

  return (
    <header className="hero" id="top">
      <div className="shell">
        <div className="hero-grid">
          <div className="reveal" ref={left}>
            <div className="hero-eyebrow">
              <span className="pip" />
              <span className="mono" style={{ color: "var(--paper)" }}>
                MVP — private cohort · fall 2026
              </span>
            </div>

            <h1 className="display">
              A learning environment
              <br />
              <em>built around you</em>,
              <br />
              rebuilt every week.
            </h1>

            <p className="lede hero-sub">
              Polywise teaches the same idea five different ways, measures which one your mind actually keeps,
              and then generates the tutor, the interface and the month of work that fit the answer. Personal
              finance to organic chemistry. AP Bio to attention heads.
            </p>

            <div className="hero-actions">
              <a className="btn btn-solid" href="#enroll">
                <span className="dot" />
                Enter the palace
              </a>
              <a className="btn btn-ghost" href="#palace">
                See one that was generated
              </a>
            </div>
          </div>

          <div className="reveal d2" ref={right}>
            <PalaceGlyph />
          </div>
        </div>

        <div className="hero-foot reveal d3" ref={foot}>
          {FACTS.map((f) => (
            <div key={f.k}>
              <span className="k">
                <span>{f.k}</span>
                {f.rest}
              </span>
              <p>{f.body}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="ticker">
        <div className="ticker-row">
          {[0, 1].flatMap((dup) =>
            SIGNALS.map((s) => (
              <span className="ticker-item" key={`${dup}-${s}`} aria-hidden={dup === 1}>
                {s}
              </span>
            ))
          )}
        </div>
      </div>
    </header>
  );
}
