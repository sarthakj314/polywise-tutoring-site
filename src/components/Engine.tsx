import { useReveal } from "../lib/hooks";
import { SceneEngine } from "./Scenes";

const CARDS = [
  {
    n: "A",
    t: "A bandit over rooms, not a quiz about styles",
    p: "Each environment variant is an arm. Every session updates a posterior over how much that arm actually moves your retention on that concept class. Exploration never fully stops, which is why the palace can be wrong on Monday and right by Friday.",
    spec: [
      ["policy", "Thompson sampling"],
      ["arms", "5 rooms × 4 densities"],
      ["reward", "Δ retention @ 7d"],
      ["re-trial", "weekly, unannounced"],
    ],
  },
  {
    n: "B",
    t: "One tutor adapter per learner, per domain",
    p: "A domain-tuned base model carries the subject. A small per-learner adapter carries you — your misconception history, the vocabulary you already own, the length of turn you tolerate before you disengage. Retrieval keeps it anchored to canonical sources instead of its own memory.",
    spec: [
      ["base", "domain-tuned 7B–70B"],
      ["personal", "LoRA, r=16, ~9 min"],
      ["grounding", "retrieval over vetted corpora"],
      ["refresh", "nightly on new sessions"],
    ],
  },
  {
    n: "C",
    t: "The interface itself is generated",
    p: "Not a theme switch. A constrained layout synthesizer picks components, density, typography and the order of the page from your measured attention profile, then compiles to a real component tree. Two learners on the same concept can see genuinely different pages.",
    spec: [
      ["unit", "component tree, not CSS vars"],
      ["constraints", "a11y + contrast enforced"],
      ["inputs", "attention span, error class, hour"],
      ["build", "< 400 ms"],
    ],
  },
  {
    n: "D",
    t: "Memory scheduled against your own decay",
    p: "Every concept gets a fitted forgetting curve from your own recall attempts, not a global default. The month plan is solved backwards from your deadline against those curves, so review lands the day before a concept would have slipped, and never earlier.",
    spec: [
      ["model", "per-concept decay λ"],
      ["solver", "deadline-backward scheduling"],
      ["granularity", "94 concepts / course"],
      ["drift check", "every 7 days"],
    ],
  },
];

export default function Engine() {
  const head = useReveal<HTMLDivElement>(0.12);
  const grid = useReveal<HTMLDivElement>(0.06);

  return (
    <section className="sec" id="engine">
      <div className="shell">
        <div className="sec-head">
          <span className="num">§ 04</span>
          <span className="lbl">Engine</span>
          <span className="spacer" />
          <span className="lbl">Why this is hard to build</span>
        </div>

        <div className="sec-title-row reveal" ref={head}>
          <h2 className="h2">
            Personalization is easy to claim,
            <br />
            expensive to actually do.
          </h2>
          <p className="lede">
            Most "adaptive" learning is a difficulty dial on a fixed course. Building a room means four systems
            that have to agree with each other in under a second — a policy that decides how to teach, a model
            that does the teaching, a compiler that draws the page, and a scheduler that decides when any of it
            comes back.
          </p>
        </div>

        <div className="engine-grid reveal" ref={grid}>
          {CARDS.map((c) => (
            <article className="eng" key={c.n}>
              <span className="en">{c.n}</span>
              <div className="eng-scene">
                <SceneEngine n={c.n} />
              </div>
              <h3>{c.t}</h3>
              <p>{c.p}</p>
              <div className="eng-spec">
                {c.spec.map(([k, v]) => (
                  <div key={k}>
                    <span>{k}</span>
                    <span className="dots" />
                    <b>{v}</b>
                  </div>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
