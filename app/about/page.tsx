import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import LogoMark from "../components/logo/LogoMark";
import SiteFooter from "../components/siteFooter/SiteFooter";
import SiteHeader from "../components/siteHeader/SiteHeader";
import { projects } from "../data/projects";

const aboutDescription =
  "Meet Fyxtez, a Rust and product engineer building real-time systems, automation, integrations, and useful software across web, desktop, and mobile.";

export const metadata: Metadata = {
  title: "About",
  description: aboutDescription,
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About Fyxtez — Rust & Product Engineer",
    description: aboutDescription,
    url: "/about",
    siteName: "Fyxtez",
    type: "profile",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Fyxtez — Rust engineer building real-time systems and software products",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "About Fyxtez — Rust & Product Engineer",
    description: aboutDescription,
    images: ["/opengraph-image"],
  },
};

const principles = [
  {
    index: "01",
    title: "Start with the outcome",
    description:
      "Understand what must change for the person or business using the system, then work backward into the architecture.",
  },
  {
    index: "02",
    title: "Keep complexity earned",
    description:
      "Use the simplest design that can remain reliable under the actual load, risk, and operational constraints.",
  },
  {
    index: "03",
    title: "Own the complete path",
    description:
      "Follow data from ingestion and state through APIs, automation, and the interface where decisions are made.",
  },
  {
    index: "04",
    title: "Build for real use",
    description:
      "Good software is understandable, observable, inexpensive to run, and useful after the first impressive demo.",
  },
];

const domains = [
  {
    label: "Systems",
    title: "Rust backend & real-time",
    copy: "Async services, WebSockets, event-driven workers, live data, typed APIs, integrations, and state that has to remain predictable.",
    tags: ["Rust", "Tokio", "Axum", "WebSockets", "SQLx", "Tracing"],
  },
  {
    label: "Products",
    title: "From service to interface",
    copy: "User-facing applications that connect strong backend boundaries to clear workflows across browser, desktop, and Android.",
    tags: ["React", "TypeScript", "Tauri", "Desktop", "Android", "Responsive UI"],
  },
  {
    label: "Delivery",
    title: "Practical infrastructure",
    copy: "Linux deployments, background services, observability, external APIs, and architecture shaped by cost as well as performance.",
    tags: ["Linux", "systemd", "REST APIs", "Automation", "Monitoring", "Deployment"],
  },
];

export default function AboutPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: "About Fyxtez",
    url: "https://fyxtez.com/about",
    description: aboutDescription,
    mainEntity: {
      "@type": "Person",
      name: "Fyxtez",
      url: "https://fyxtez.com",
      jobTitle: "Rust and Product Engineer",
      description: aboutDescription,
      knowsAbout: [
        "Rust",
        "Real-time systems",
        "Product engineering",
        "Automation",
        "React",
        "Tauri",
        "Exchange integrations",
      ],
      sameAs: ["https://github.com/fyxtez", "https://t.me/fyxtez"],
    },
  };

  return (
    <div className="site-shell">
      <div className="background-grid" aria-hidden="true" />
      <SiteHeader current="about" />

      <main id="main-content" className="about-main">
        <section className="about-hero reveal">
          <div className="about-hero-copy">
            <p className="eyebrow">About Fyxtez</p>
            <h1>
              I turn complex problems into <span>working systems.</span>
            </h1>
            <p className="about-lead">
              I&apos;m a Rust and product engineer working across real-time systems,
              automation, integrations, and the applications people use to turn
              live data into decisions and action.
            </p>
            <p className="about-positioning">
              Backend depth · Product ownership · Practical infrastructure
            </p>
            <div className="about-actions">
              <Link className="button button--accent" href="/projects">
                View All Projects <span aria-hidden="true">→</span>
              </Link>
              <Link className="button" href="/#contact">
                Contact <span aria-hidden="true">↗</span>
              </Link>
            </div>
          </div>

          <aside className="about-profile" aria-label="Fyxtez engineering profile">
            <div className="about-profile-bar">
              <span>about.engineer</span>
              <span aria-hidden="true"><i /><i /><i /></span>
            </div>
            <div className="about-profile-image">
              <Image
                src="/fyxtez.jpg"
                alt="Fyxtez astronaut profile artwork"
                fill
                priority
                sizes="(max-width: 800px) 92vw, 380px"
              />
              <div>
                <LogoMark />
                <span>
                  <strong>Fyxtez</strong>
                  <small>Rust · Systems · Products</small>
                </span>
              </div>
            </div>
            <dl className="about-profile-data">
              <div><dt>Core</dt><dd>Rust engineering</dd></div>
              <div><dt>Scope</dt><dd>Backend → product</dd></div>
              <div><dt>Surfaces</dt><dd>Web · Desktop · Mobile</dd></div>
              <div><dt>Perspective</dt><dd>Engineer · Trader · Investor</dd></div>
            </dl>
          </aside>
        </section>

        <section className="about-story section reveal" aria-labelledby="about-story-title">
          <div className="about-story-heading">
            <p className="eyebrow">The work</p>
            <h2 id="about-story-title">
              Backend depth. Product ownership. Real-world feedback.
            </h2>
          </div>
          <div className="about-story-copy">
            <p>
              For more than six years, I&apos;ve been building software around live
              data, external systems, automation, and workflows where reliability
              directly changes the result. Rust became my core stack because it
              gives me the control and predictability those systems demand.
            </p>
            <p>
              I prefer owning the complete path: receiving data, shaping state,
              exposing a clear boundary, and delivering an interface that makes
              the system useful. That has taken my work across backend services,
              browser products, Linux desktop software, and Android applications.
            </p>
            <p>
              Trading is one of the demanding environments that shaped this way
              of thinking, but it is not the boundary of my work. The same method
              applies wherever there is data to understand, a process to improve,
              and a real problem worth solving.
            </p>
          </div>
        </section>

        <section className="about-evidence reveal" aria-label="Engineering experience summary">
          <div><strong>6+</strong><span>Years building</span></div>
          <div><strong>{String(projects.length).padStart(2, "0")}</strong><span>Documented systems</span></div>
          <div><strong>Rust</strong><span>Core engineering stack</span></div>
          <div><strong>3</strong><span>Web · Desktop · Mobile</span></div>
        </section>

        <section className="about-perspective section reveal">
          <div>
            <p className="eyebrow">A useful perspective</p>
            <span className="about-perspective-mark" aria-hidden="true">↳</span>
          </div>
          <div>
            <h2>Trading taught me to respect the distance between data and action.</h2>
            <p>
              Live markets expose weak assumptions quickly: stale state matters,
              latency matters, unclear interfaces matter, and failures need to be
              visible. I bring that discipline to products in any industry—not by
              forcing trading ideas onto them, but by treating data, reliability,
              risk, and user decisions as parts of one system.
            </p>
          </div>
        </section>

        <section className="section about-principles" aria-labelledby="about-principles-title">
          <div className="section-heading reveal">
            <p className="eyebrow">How I work</p>
            <div>
              <h2 id="about-principles-title">Pragmatic architecture with a clear reason to exist.</h2>
              <p>
                I care about performance and technical depth, but only when they
                improve the system people actually depend on.
              </p>
            </div>
          </div>
          <div className="about-principles-grid reveal">
            {principles.map((principle) => (
              <article key={principle.index}>
                <span>{principle.index}</span>
                <h3>{principle.title}</h3>
                <p>{principle.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="section about-domains" aria-labelledby="about-domains-title">
          <div className="section-heading reveal">
            <p className="eyebrow">What I bring</p>
            <div>
              <h2 id="about-domains-title">One engineer across the complete system.</h2>
              <p>
                Strongest in Rust backend and real-time work, with enough product
                range to carry the result all the way to the user.
              </p>
            </div>
          </div>
          <div className="about-domain-grid reveal">
            {domains.map((domain, index) => (
              <article key={domain.label}>
                <div><span>{String(index + 1).padStart(2, "0")}</span><small>{domain.label}</small></div>
                <h3>{domain.title}</h3>
                <p>{domain.copy}</p>
                <ul className="tag-list" aria-label={`${domain.title} technologies`}>
                  {domain.tags.map((tag) => <li key={tag}>{tag}</li>)}
                </ul>
              </article>
            ))}
          </div>
        </section>

        <section className="about-cta reveal">
          <div>
            <p className="eyebrow">Work together</p>
            <h2>Bring me the problem, the data, and the constraints.</h2>
            <p>
              I&apos;m interested in serious Rust, real-time, automation, integration,
              and product work where useful engineering can create a measurable result.
            </p>
          </div>
          <div className="about-cta-actions">
            <Link className="button button--accent" href="/#contact">
              Start a conversation <span aria-hidden="true">↗</span>
            </Link>
            <Link className="button" href="/projects">
              Explore the work <span aria-hidden="true">→</span>
            </Link>
            <p className="about-cv-note">
              <span>CV available upon request.</span>
              <a
                href="https://t.me/fyxtez"
                target="_blank"
                rel="noopener noreferrer"
              >
                Request via Telegram DM <span aria-hidden="true">↗</span>
              </a>
            </p>
          </div>
        </section>
      </main>

      <SiteFooter />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
        }}
      />
    </div>
  );
}
