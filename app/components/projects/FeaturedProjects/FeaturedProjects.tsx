import "./FeaturedProjects.css";
import Image from "next/image";
import Link from "next/link";
import { projects } from "../../../data/projects";

export default function FeaturedProjects() {
  const featuredProjects = projects.filter((project) => project.featured);

  return (
    <section className="section section--projects" id="projects">
      <div className="section-heading reveal">
        <p className="eyebrow">Highlighted systems</p>
        <div>
          <h2>Products built from problem to production.</h2>
          <p>
            Three end-to-end systems showing how I turn data, integrations, and
            real operational needs into reliable products—across trading, AI,
            desktop, mobile, and beyond.
          </p>
        </div>
      </div>

      <div className="featured-project-grid reveal">
        {featuredProjects.map((project, index) => (
          <article
            className={`featured-project-card featured-project-card--${project.slug}`}
            key={project.slug}
          >
            <Link
              className="featured-project-visual"
              href={`/projects/${project.slug}`}
              aria-label={`Open ${project.title} gallery`}
            >
              <Image
                src={project.images[0].src}
                alt={project.images[0].alt}
                fill
                sizes="(max-width: 800px) 100vw, 55vw"
              />
              <span className="featured-project-visual-bar">
                <span>View gallery</span>
                <small>{String(project.images.length).padStart(2, "0")} views</small>
              </span>
            </Link>

            <div className="featured-project-copy">
              <div className="featured-project-meta">
                <span>{String(index + 1).padStart(2, "0")}</span>
                <p>{project.category}</p>
              </div>
              <h3>{project.title}</h3>
              <p>{project.description}</p>
              <ul className="tag-list" aria-label={`${project.title} technologies`}>
                {project.tags.map((tag) => (
                  <li key={tag}>{tag}</li>
                ))}
              </ul>
              <span className="featured-project-access">{project.access}</span>
              <div className="featured-project-actions">
                <Link
                  className="text-link text-link--button"
                  href={`/projects/${project.slug}`}
                >
                  View gallery <span aria-hidden="true">→</span>
                </Link>
                {project.href && (
                  <a className="text-link text-link--muted" href={project.href} target="_blank" rel="noopener noreferrer">
                    {project.linkLabel} <span aria-hidden="true">↗</span>
                  </a>
                )}
              </div>
            </div>
          </article>
        ))}
      </div>

      <div className="projects-footer-link">
        <Link className="text-link" href="/projects">
          View all projects <span aria-hidden="true">→</span>
        </Link>
      </div>
    </section>
  );
}
