import { useEffect, useState } from "react";
import { SECTIONS } from "./Section";

function Mark() {
  return (
    <svg className="brand-mark" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <defs>
        <linearGradient id="markGrad" x1="0" y1="0" x2="24" y2="24">
          <stop offset="0%" stopColor="#f8e9c9" />
          <stop offset="55%" stopColor="#dcae65" />
          <stop offset="100%" stopColor="#a2682f" />
        </linearGradient>
      </defs>
      <rect x="1.5" y="1.5" width="21" height="21" rx="1.5" stroke="url(#markGrad)" strokeWidth="1.2" />
      <rect x="6.5" y="6.5" width="11" height="11" rx="0.8" stroke="url(#markGrad)" strokeWidth="1" opacity="0.75" />
      <rect x="10.6" y="10.6" width="2.8" height="2.8" fill="url(#markGrad)" />
    </svg>
  );
}

export default function Nav() {
  const [stuck, setStuck] = useState(false);
  const [active, setActive] = useState(-1);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let raf = 0;
    const measure = () => {
      raf = 0;
      setStuck(window.scrollY > 28);
      const doc = document.documentElement;
      setProgress(window.scrollY / Math.max(doc.scrollHeight - window.innerHeight, 1));
      // whichever section owns the top third of the screen
      const line = window.innerHeight * 0.34;
      let found = -1;
      SECTIONS.forEach((s, i) => {
        const el = document.getElementById(s.id);
        if (!el) return;
        const r = el.getBoundingClientRect();
        if (r.top <= line && r.bottom > line) found = i;
      });
      setActive(found);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(measure);
    };
    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  const here = active >= 0 ? SECTIONS[active] : null;

  return (
    <nav className={stuck ? "nav stuck" : "nav"} style={here ? { ["--sec" as string]: here.hue } : undefined}>
      <div className="nav-in">
        <a className="brand" href="#top">
          <Mark />
          <span className="brand-name">
            poly<b>wise</b>
          </span>
        </a>

        <div className="nav-links">
          {SECTIONS.map((s, i) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              className={i === active ? "on" : ""}
              style={{ ["--sec" as string]: s.hue }}
            >
              <i className="nav-pip" />
              {s.n} {s.name.replace("The ", "")}
            </a>
          ))}
        </div>

        <a className="btn btn-solid nav-cta" href="#enroll">
          Enter the palace
        </a>
      </div>

      {/* where you are, in the section's own colour */}
      <div className={here ? "nav-where on" : "nav-where"}>
        <div className="nav-where-in">
          <span className="nav-where-n">§ {here?.n ?? "—"}</span>
          <span className="nav-where-name">{here?.name ?? "Polywise"}</span>
          <span className="nav-where-purpose">{here?.purpose ?? ""}</span>
        </div>
      </div>

      <div className="nav-progress" style={{ transform: `scaleX(${progress})` }} />
    </nav>
  );
}
