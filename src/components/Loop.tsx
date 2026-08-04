import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { STAGES } from "../lib/data";
import { useReveal, useScrollProgress } from "../lib/hooks";
import { STAGE_SCENES } from "./Scenes";

type Node = { x: number; y: number };

export default function Loop() {
  const cards = useRef<(HTMLDivElement | null)[]>([]);
  const wrap = useRef<HTMLDivElement | null>(null);
  const [box, setBox] = useState({ w: 0, h: 0 });
  const [nodes, setNodes] = useState<Node[]>([]);
  const [len, setLen] = useState(0);
  const pathRef = useRef<SVGPathElement | null>(null);
  const { ref: progRef, p } = useScrollProgress<HTMLDivElement>();
  const head = useReveal<HTMLDivElement>(0.12);

  // measure card centres → node coordinates on the spine
  useLayoutEffect(() => {
    const measure = () => {
      const el = wrap.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      setBox({ w: r.width, h: r.height });
      const pts: Node[] = [];
      cards.current.forEach((c) => {
        if (!c) return;
        const cr = c.getBoundingClientRect();
        pts.push({ x: r.width / 2, y: cr.top - r.top + cr.height / 2 });
      });
      setNodes(pts);
    };
    measure();
    const ro = new ResizeObserver(measure);
    if (wrap.current) ro.observe(wrap.current);
    window.addEventListener("resize", measure);
    const t = setTimeout(measure, 400); // after webfonts settle
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
      clearTimeout(t);
    };
  }, []);

  const bulge = Math.min(box.w * 0.17, 200);

  const spine = nodes.length
    ? nodes
        .map((n, i) => {
          if (i === 0) return `M ${n.x} ${n.y}`;
          const prev = nodes[i - 1];
          const dir = i % 2 === 1 ? 1 : -1;
          const dy = (n.y - prev.y) * 0.42;
          return `C ${prev.x + dir * bulge} ${prev.y + dy}, ${n.x + dir * bulge} ${n.y - dy}, ${n.x} ${n.y}`;
        })
        .join(" ")
    : "";

  const last = nodes[nodes.length - 1];
  const first = nodes[0];
  const ret =
    last && first
      ? `M ${last.x} ${last.y + 26}
         C ${last.x + bulge * 1.5} ${last.y + 90}, ${box.w - 18} ${last.y + 40}, ${box.w - 18} ${last.y - 60}
         L ${box.w - 18} ${first.y - 78}
         C ${box.w - 18} ${first.y - 128}, ${box.w * 0.62} ${first.y - 128}, ${first.x + 16} ${first.y - 128}`
      : "";

  useEffect(() => {
    if (pathRef.current) setLen(pathRef.current.getTotalLength());
  }, [spine]);

  // eased draw so the line finishes a touch before the last card leaves
  const drawn = Math.min(1, p * 1.14);
  const litCount = nodes.length ? Math.round(drawn * (nodes.length + 0.35)) : 0;

  return (
    <section className="sec" id="loop">
      <div className="shell">
        <div className="sec-head">
          <span className="num">§ 02</span>
          <span className="lbl">The loop</span>
          <span className="spacer" />
          <span className="lbl">Six stages · runs continuously</span>
        </div>

        <div className="sec-title-row reveal" ref={head}>
          <h2 className="h2">
            How a room gets built
            <br />
            around a single person.
          </h2>
          <p className="lede">
            Nothing here is a preference survey. The system earns its picture of you by watching you work, and
            it re-earns it every week — the path below is a circle, not a line.
          </p>
        </div>

        <div className="loop" ref={progRef}>
          <div className="loop-canvas" ref={wrap}>
            <svg viewBox={`0 0 ${box.w || 1} ${box.h || 1}`} preserveAspectRatio="none" aria-hidden="true">
              <defs>
                <linearGradient id="loopGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#f8e9c9" />
                  <stop offset="45%" stopColor="#dcae65" />
                  <stop offset="100%" stopColor="#a2682f" />
                </linearGradient>
                <marker id="loopArrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
                  <path d="M 0 0 L 10 5 L 0 10 z" fill="rgba(220,174,101,0.85)" />
                </marker>
              </defs>

              <path className="loop-path-bg" d={spine} />
              <path
                ref={pathRef}
                className="loop-path-fg"
                d={spine}
                style={{
                  strokeDasharray: len,
                  strokeDashoffset: len * (1 - drawn),
                  transition: "stroke-dashoffset 0.18s linear",
                }}
              />

              {/* the return: it never stops running */}
              <path
                d={ret}
                fill="none"
                stroke="rgba(220,174,101,0.42)"
                strokeWidth="1.3"
                strokeDasharray="5 8"
                markerEnd="url(#loopArrow)"
                style={{ opacity: drawn > 0.82 ? 1 : 0, transition: "opacity 0.8s ease" }}
              >
                <animate attributeName="stroke-dashoffset" from="0" to="-26" dur="1.4s" repeatCount="indefinite" />
              </path>

              {nodes.map((n, i) => (
                <g key={i}>
                  <circle
                    cx={n.x}
                    cy={n.y}
                    r={i < litCount ? 5.5 : 4}
                    fill={i < litCount ? "#dcae65" : "#08080a"}
                    stroke={i < litCount ? "rgba(220,174,101,0.9)" : "rgba(238,232,222,0.28)"}
                    strokeWidth="1.2"
                    style={{ transition: "all 0.5s ease" }}
                  />
                  {i < litCount && (
                    <circle cx={n.x} cy={n.y} r="12" fill="none" stroke="rgba(220,174,101,0.22)" strokeWidth="1" />
                  )}
                </g>
              ))}
            </svg>
          </div>

          <div className="loop-stages">
            {STAGES.map((s, i) => (
              <div className={`stage ${i % 2 ? "right" : ""} ${i < litCount ? "lit" : ""}`} key={s.n}>
                <div
                  className="stage-card"
                  ref={(el) => {
                    cards.current[i] = el;
                  }}
                >
                  <div className="stage-n">
                    <span>{s.n}</span>
                    <span className="ln" />
                    <span>{s.kicker}</span>
                  </div>
                  <div className="stage-scene">{(() => {
                    const S = STAGE_SCENES[i];
                    return <S />;
                  })()}</div>
                  <h3>{s.title}</h3>
                  <p>{s.body}</p>
                  <div className="chips">
                    {s.meta.map((m) => (
                      <span className="chip" key={m}>
                        {m}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="loop-return">
            <span className="mono" style={{ color: "var(--gold-2)" }}>
              ↻ week n+1
            </span>
            <span className="txt">
              The trials never really stop. Every week a slice of your work is quietly served in a different
              room, and <b>the palace is rebuilt against what that reveals</b> — the arrow above runs back to
              stage two, forever.
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
