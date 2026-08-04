import { useState } from "react";
import { DOMAINS } from "../lib/data";
import { useReveal } from "../lib/hooks";
import { SceneDomain } from "./Scenes";
import Section, { SECTIONS } from "./Section";

export default function Atlas() {
  const [sel, setSel] = useState(0);
  const d = DOMAINS[sel];
  const head = useReveal<HTMLDivElement>(0.1);
  const body = useReveal<HTMLDivElement>(0.06);

  return (
    <Section meta={SECTIONS[0]}>
        <div className="sec-title-row reveal" ref={head}>
          <h2 className="h2">
            The catalog is deliberately
            <br />
            unreasonable in its range.
          </h2>
          <p className="lede">
            A palace is only worth building if there is somewhere to go. Polywise carries the subjects schools
            grade, the ones they skip, and the ones adults are quietly embarrassed to have missed — held to the
            same standard of rigor.
          </p>
        </div>

        <div className="atlas reveal" ref={body}>
          <div className="atlas-list">
            {DOMAINS.map((dom, i) => (
              <button
                key={dom.id}
                className={i === sel ? "atlas-row sel" : "atlas-row"}
                onClick={() => setSel(i)}
                onMouseEnter={() => setSel(i)}
                aria-pressed={i === sel}
              >
                <span className="ix">{dom.index}</span>
                <span className="nm">{dom.label}</span>
                <span className="arw" aria-hidden="true">
                  →
                </span>
              </button>
            ))}
          </div>

          <div className="atlas-panel" key={d.id}>
            <div className="atlas-top">
              <p className="blurb">{d.blurb}</p>
              <SceneDomain index={sel} />
            </div>

            <div className="atlas-meta">
              <div className="cell">
                <div className="mono">Learners inside</div>
                <div className="v">{d.learners}</div>
              </div>
              <div className="cell">
                <div className="mono">Range</div>
                <div className="v">{d.depth}</div>
              </div>
              <div className="cell">
                <div className="mono">Environments generated</div>
                <div className="v">{d.tracks.length * 5} variants</div>
              </div>
            </div>

            <div className="atlas-tracks">
              {d.tracks.map((t) => (
                <div className="track" key={t.name}>
                  <div className="tn">{t.name}</div>
                  <div className="td">{t.note}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
    </Section>
  );
}
