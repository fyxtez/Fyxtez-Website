import "./projects/ProjectsPage.css";
import Link from "next/link";
import SiteFooter from "./components/SiteFooter/SiteFooter";
import SiteHeader from "./components/SiteHeader/SiteHeader";

export default function NotFound() {
  return (
    <div className="site-shell">
      <div className="background-grid" aria-hidden="true" />
      <SiteHeader />

      <main id="main-content" className="projects-main">
        <section className="projects-hero project-route-summary">
          <div>
            <p className="eyebrow">404 · Route not found</p>
            <h1>
              Nothing is running <span>at this address.</span>
            </h1>
          </div>
          <div className="projects-hero-copy">
            <p>
              The page may have moved, or the URL may be incomplete. Return to
              the project archive to continue exploring the work.
            </p>
            <Link className="button button--accent" href="/projects">
              View All Projects <span aria-hidden="true">→</span>
            </Link>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
