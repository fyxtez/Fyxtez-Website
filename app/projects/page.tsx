import type { Metadata } from "next";
import ProjectsCatalog from "../components/projects/ProjectsCatalog";
import SiteFooter from "../components/siteFooter/SiteFooter";
import SiteHeader from "../components/siteHeader/SiteHeader";
import { projects } from "../data/projects";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Selected Rust, trading infrastructure, automation, and product engineering projects by Fyxtez.",
};

export default function ProjectsPage() {
  return (
    <div className="site-shell">
      <div className="background-grid" aria-hidden="true" />
      <SiteHeader current="projects" />

      <main className="projects-main">
        <section className="projects-hero reveal">
          <div>
            <p className="eyebrow">Project archive</p>
            <h1>
              Systems built to <span>do the work.</span>
            </h1>
          </div>
          <div className="projects-hero-copy">
            <p>
              A selection of production tools and applied experiments across
              real-time infrastructure, trading, automation, and user-facing
              applications.
            </p>
            <div className="projects-count">
              <strong>{String(projects.length).padStart(2, "0")}</strong>
              documented builds
            </div>
          </div>
        </section>

        <ProjectsCatalog />
      </main>

      <SiteFooter />
    </div>
  );
}
