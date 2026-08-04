import { useReveal } from "../lib/hooks";
import { SceneClassroom } from "./Scenes";

export default function Manifesto() {
  const a = useReveal<HTMLDivElement>(0.2);
  const b = useReveal<HTMLDivElement>(0.15);

  return (
    <section className="manifesto">
      <div className="shell">
        <div className="sec-title-row reveal" ref={a} style={{ paddingBottom: 0 }}>
          <blockquote>
            School had to teach thirty people at once. <em>That constraint is gone.</em>
          </blockquote>
          <div className="manifesto-side">
            <p>
              Every compromise in education — the pace, the ordering, the single explanation, the one format,
              the test on Friday whether or not you were ready — exists because a room could hold one teacher
              and thirty students. None of those compromises were ever about how people learn.
            </p>
            <p>
              We are building the version without the constraint: a room per person, rebuilt weekly, that
              measures instead of assumes. Not a course you enroll in. A place that becomes yours.
            </p>
            <p className="mono" style={{ color: "var(--gold-2)" }}>
              Polywise — Palace · MVP
            </p>
          </div>
        </div>

        <div className="scene-band reveal" ref={b}>
          <SceneClassroom />
        </div>
      </div>
    </section>
  );
}
