import { useState } from "react";
import { useReveal } from "../lib/hooks";
import { SceneEnter } from "./Scenes";

export default function Enroll() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const a = useReveal<HTMLDivElement>(0.2);

  return (
    <>
      <section className="cta" id="enroll">
        <div className="shell">
          <div className="cta-in reveal" ref={a}>
            <div className="cta-scene">
              <SceneEnter />
            </div>
            <span className="mono">Private cohort · 200 seats · fall 2026</span>
            <h2 className="h2" style={{ fontSize: "clamp(32px,5.4vw,74px)" }}>
              Tell us what you want to be good at.
              We'll build the room.
            </h2>
            <form
              className="enroll"
              onSubmit={(e) => {
                e.preventDefault();
                if (email.trim()) setSent(true);
              }}
            >
              <input
                type="email"
                required
                placeholder="you@wherever.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                aria-label="Email address"
              />
              <button className="btn btn-solid" type="submit">
                <span className="dot" />
                {sent ? "Seat held" : "Request a seat"}
              </button>
            </form>
            <p className="mono" style={{ textTransform: "none", letterSpacing: "0.04em", maxWidth: "46ch" }}>
              {sent
                ? "Held. You'll get four questions and your first trial room within a week."
                : "Four questions, ninety seconds, then your first trial room. No course catalog to scroll."}
            </p>
          </div>
        </div>
      </section>

      <footer className="foot">
        <div className="shell foot-in">
          <span className="mono">© 2026 Polywise LLC</span>
          <span className="mono" style={{ color: "var(--paper-faint)" }}>
            Built in California
          </span>
          <div className="foot-links">
            <a href="#atlas">Atlas</a>
            <a href="#loop">The loop</a>
            <a href="#palace">The palace</a>
            <a href="#engine">Engine</a>
            <a href="mailto:hello@polywise.net">hello@polywise.net</a>
          </div>
        </div>
      </footer>
    </>
  );
}
