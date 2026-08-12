import "./Home.css";
import FeaturedProjects from "./components/projects/FeaturedProjects/FeaturedProjects";
import Hero from "./components/Hero/Hero";
import LogoMark from "./components/LogoMark/LogoMark";
import SiteFooter from "./components/SiteFooter/SiteFooter";
import SiteHeader from "./components/SiteHeader/SiteHeader";

const expertise = [
  {
    index: "01",
    title: "Backend & real-time systems",
    description:
      "Production Rust services, WebSocket pipelines, exchange integrations, and APIs engineered for low latency and predictable operation.",
    tags: ["Rust", "Axum", "Tokio", "WebSockets", "Serde", "SQLx", "REST APIs"],
  },
  {
    index: "02",
    title: "Trading infrastructure",
    description:
      "Execution tooling, market-data interfaces, risk-aware automation, and responsive dashboards shaped by real trading workflows.",
    tags: ["Binance", "MEXC", "Market data", "Risk", "Execution", "Automation", "Analytics"],
  },
  {
    index: "03",
    title: "Product engineering",
    description:
      "End-to-end products across web, desktop, and Android—built with pragmatic architecture and a relentless focus on useful outcomes.",
    tags: ["React", "TypeScript", "Tauri", "Linux", "Android", "Desktop", "Responsive UI"],
  },
];

const principles = [
  "Data → transform → outcome",
  "Operational clarity over abstraction",
  "Fast systems, quiet infrastructure",
  "Build what people actually need",
];

export default function Home() {
  return (
    <div className="site-shell">
      <div className="background-grid" aria-hidden="true" />
      <SiteHeader />

      <main id="main-content">
        <Hero />

        <section className="section section--expertise" id="capabilities">
          <div className="section-heading reveal">
            <p className="eyebrow">Capabilities</p>
            <div>
              <h2>One engineer across the whole system.</h2>
              <p>
                From backend infrastructure to applications and tools people
                actually use.
              </p>
            </div>
          </div>

          <div className="expertise-grid">
            {expertise.map((item) => (
              <article className="expertise-card reveal" key={item.index}>
                <span className="card-index">{item.index}</span>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
                <ul className="tag-list" aria-label={`${item.title} technologies`}>
                  {item.tags.map((tag) => (
                    <li key={tag}>{tag}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>

        <FeaturedProjects />

        <section className="section section--approach" id="approach">
          <div className="approach-copy reveal">
            <p className="eyebrow">Working principles</p>
            <h2>Pragmatic by default. Precise where it matters.</h2>
            <p>
              I build high-signal systems that stay understandable under real
              load. The goal is not architectural theatre—it is software that
              moves quickly, fails clearly, and costs less to operate.
            </p>
          </div>

          <ol className="principles-list reveal">
            {principles.map((principle, index) => (
              <li key={principle}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                {principle}
              </li>
            ))}
          </ol>
        </section>

        <section className="section contact-panel reveal" id="contact">
          <div className="contact-copy">
            <p className="eyebrow">Open to serious work</p>
            <h2>Need a system that solves a real problem?</h2>
            <p>
              I&apos;m interested in Rust, real-time infrastructure, exchange
              integrations, automation, and useful products built to solve
              concrete problems.
            </p>
          </div>

          <div className="contact-card" aria-label="Contact Fyxtez">
            <div className="contact-card-header">
              <LogoMark />
              <div>
                <strong>Fyxtez</strong>
                <span>Project and engineering inquiries</span>
              </div>
            </div>

            <a
              className="contact-method"
              href="https://t.me/fyxtez"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="contact-method-icon contact-method-icon--telegram" aria-hidden="true">
                <svg viewBox="0 0 24 24" width="17" height="17" fill="currentColor">
                  <path d="M21.7 3.3 18.4 19c-.25 1.1-.9 1.37-1.82.85l-5.03-3.7-2.43 2.34c-.27.27-.5.5-1.02.5l.36-5.12 9.32-8.42c.4-.36-.09-.56-.63-.2L5.63 12.5.67 10.95c-1.08-.34-1.1-1.08.23-1.6L20.3 1.88c.9-.33 1.68.2 1.4 1.42Z" />
                </svg>
              </span>
              <span>
                <small>Telegram</small>
                <strong>@fyxtez</strong>
              </span>
              <span className="contact-method-arrow" aria-hidden="true">↗</span>
            </a>

            <a className="contact-method" href="mailto:fyxtez@gmail.com">
              <span className="contact-method-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <rect x="3" y="5" width="18" height="14" rx="2" />
                  <path d="m4 7 8 6 8-6" />
                </svg>
              </span>
              <span>
                <small>Email</small>
                <strong>fyxtez@gmail.com</strong>
              </span>
              <span className="contact-method-arrow" aria-hidden="true">↗</span>
            </a>

            <div className="contact-method contact-method--static">
              <span className="contact-method-icon contact-method-icon--linkedin" aria-hidden="true">
                <svg viewBox="0 0 24 24" width="17" height="17" fill="currentColor">
                  <path d="M6.5 8.2H3.2V20h3.3V8.2ZM4.85 3A1.92 1.92 0 1 0 4.85 6.84 1.92 1.92 0 0 0 4.85 3ZM20.8 13.25c0-3.55-1.9-5.2-4.43-5.2a3.82 3.82 0 0 0-3.47 1.9V8.2H9.6V20h3.3v-5.84c0-1.54.29-3.04 2.2-3.04 1.88 0 1.9 1.76 1.9 3.14V20h3.3l.5-6.75Z" />
                </svg>
              </span>
              <span>
                <small>LinkedIn</small>
                <strong>DM to connect personally</strong>
              </span>
              <span className="contact-method-note">Private</span>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
