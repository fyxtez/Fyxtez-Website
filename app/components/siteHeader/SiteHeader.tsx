"use client";

import Link from "next/link";
import LogoMark from "../logo/LogoMark";

type SiteHeaderProps = {
  current?: "home" | "about" | "projects";
};

export default function SiteHeader({ current = "home" }: SiteHeaderProps) {
  const contactHref = current === "home" ? "#contact" : "/#contact";

  return (
    <header className="site-header">
      <Link className="brand" href="/" aria-label="Fyxtez home">
        <LogoMark />
        <span className="brand-name">Fyxtez</span>
      </Link>

      <nav className="site-nav" aria-label="Primary navigation">
        <Link
          className={`nav-home ${current === "home" ? "nav-active" : ""}`}
          href="/"
        >
          Home
        </Link>
        <Link
          className={`nav-about ${current === "about" ? "nav-active" : ""}`}
          href="/about"
        >
          About
        </Link>
        <Link
          className={`nav-projects ${current === "projects" ? "nav-active" : ""}`}
          href="/projects"
        >
          All Projects
        </Link>
        <Link className="nav-capabilities" href="/#capabilities">Capabilities</Link>
        <a
          className="nav-contact"
          href={contactHref}
          onClick={(event) => {
            if (current !== "home") return;

            const contact = document.getElementById("contact");
            if (!contact) return;

            event.preventDefault();
            window.history.replaceState(null, "", "#contact");
            contact.scrollIntoView({ behavior: "smooth", block: "start" });
          }}
        >
          Contact
        </a>
      </nav>

      <span className="nav-status" aria-label="Available for work">Available</span>
    </header>
  );
}
