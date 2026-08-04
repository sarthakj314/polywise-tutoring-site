import { ReactNode } from "react";
import { useReveal } from "../lib/hooks";

export type SectionMeta = {
  id: string;
  n: string;
  name: string;
  purpose: string;
  tag: string;
  hue: string;
};

export const SECTIONS: SectionMeta[] = [
  {
    id: "atlas",
    n: "01",
    name: "The atlas",
    purpose: "Everything you can learn here, and how deep each one goes.",
    tag: "8 domains · 214 tracks",
    hue: "#dcae65",
  },
  {
    id: "loop",
    n: "02",
    name: "The loop",
    purpose: "How the system earns its picture of you, and keeps re-earning it.",
    tag: "6 stages · never stops",
    hue: "#7fc9bd",
  },
  {
    id: "palace",
    n: "03",
    name: "The palace",
    purpose: "A real environment it generated for one learner. Click through it.",
    tag: "product mockup · interactive",
    hue: "#e08a5f",
  },
  {
    id: "engine",
    n: "04",
    name: "The engine",
    purpose: "The four systems underneath, and why they are hard to build.",
    tag: "under the hood",
    hue: "#9fb0e6",
  },
];

/** Every numbered section opens the same way, in its own colour. */
export default function Section({
  meta,
  band,
  children,
}: {
  meta: SectionMeta;
  band?: boolean;
  children: ReactNode;
}) {
  const open = useReveal<HTMLDivElement>(0.2);

  return (
    <section
      className={`sec sec-${meta.n}${band ? " band" : ""}`}
      id={meta.id}
      style={{ ["--sec" as string]: meta.hue }}
      data-section={meta.n}
    >
      <div className="shell">
        <div className="sec-open reveal" ref={open}>
          <span className="sec-open-n">{meta.n}</span>
          <div className="sec-open-body">
            <div className="sec-open-top">
              <span className="sec-open-name">{meta.name}</span>
              <span className="sec-open-tag">{meta.tag}</span>
            </div>
            <p className="sec-open-purpose">{meta.purpose}</p>
          </div>
        </div>
        {children}
      </div>
    </section>
  );
}
