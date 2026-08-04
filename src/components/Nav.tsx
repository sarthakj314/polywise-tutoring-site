import { useEffect, useState } from "react";

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

const LINKS = [
  { href: "#atlas", label: "Atlas" },
  { href: "#loop", label: "The loop" },
  { href: "#palace", label: "The palace" },
  { href: "#engine", label: "Engine" },
];

export default function Nav() {
  const [stuck, setStuck] = useState(false);

  useEffect(() => {
    const onScroll = () => setStuck(window.scrollY > 28);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav className={stuck ? "nav stuck" : "nav"}>
      <div className="nav-in">
        <a className="brand" href="#top">
          <Mark />
          <span className="brand-name">
            poly<b>wise</b>
          </span>
        </a>
        <div className="nav-links">
          {LINKS.map((l) => (
            <a key={l.href} href={l.href}>
              {l.label}
            </a>
          ))}
        </div>
        <a className="btn btn-solid nav-cta" href="#enroll">
          Enter the palace
        </a>
      </div>
    </nav>
  );
}
