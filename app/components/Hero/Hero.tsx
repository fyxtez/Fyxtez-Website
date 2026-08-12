import "./Hero.css";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="hero">
      <div className="hero-copy reveal">
        <p className="eyebrow">
          Rust engineer · Real-time systems · Automation · Product engineering
        </p>
        <h1>
          Engineering systems that solve <span>real problems.</span>
        </h1>
        <p className="hero-intro">
          I build real-time infrastructure, exchange integrations, automation,
          and focused software products where reliability, performance, and
          practical usability directly affect the outcome.
        </p>
        <p className="hero-positioning">
          Rust &amp; React · Building applications &amp; tools people use
        </p>
        <div className="hero-actions">
          <Link className="button button--accent" href="/projects">
            Explore all projects <span aria-hidden="true">→</span>
          </Link>
          <a
            className="button"
            href="https://github.com/fyxtez"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub <span aria-hidden="true">↗</span>
          </a>
        </div>
      </div>

      <aside className="hero-terminal" aria-label="Fyxtez profile summary">
        <div className="terminal-bar">
          <span>engineer.profile</span>
          <span className="terminal-dots" aria-hidden="true">
            <i />
            <i />
            <i />
          </span>
        </div>
        <div className="profile-image-wrap">
          {/* The local artwork is served directly from the public directory. */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            className="profile-image"
            src="/fyxtez.jpg"
            alt="Fyxtez astronaut profile artwork"
            width={720}
            height={720}
          />
          <div className="profile-caption">
            <strong>Fyxtez</strong>
            <span>Building applications &amp; tools people use</span>
          </div>
        </div>
        <div className="terminal-metrics">
          <div>
            <strong>6+</strong>
            <span>Years building</span>
          </div>
          <div>
            <strong>Rust</strong>
            <span>Core stack</span>
          </div>
          <div>
            <strong>24/7</strong>
            <span>Markets</span>
          </div>
        </div>
      </aside>
    </section>
  );
}
