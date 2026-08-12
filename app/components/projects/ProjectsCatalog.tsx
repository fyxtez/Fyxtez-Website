"use client";

import Image from "next/image";
import { useState } from "react";
import { getProjectViews, projects, type Project } from "../../data/projects";
import ProjectGallery from "./ProjectGallery";

function getCaseStudyLabel(project: Project) {
  const views = getProjectViews(project);
  const hasImages = views.some((view) => view.kind === "image");
  const hasDiagrams = views.some((view) => view.kind === "diagram");

  if (hasImages && hasDiagrams) return "Gallery + architecture";
  if (hasDiagrams) return "View architecture";
  return "View gallery";
}

export default function ProjectsCatalog() {
  const [galleryProject, setGalleryProject] = useState<Project | null>(null);
  const featuredProjects = projects.filter((project) => project.featured);
  const archiveProjects = projects.filter((project) => !project.featured);

  return (
    <>
      <section className="projects-highlights" aria-labelledby="highlighted-projects-title">
        <div className="archive-section-heading reveal">
          <p className="eyebrow">Highlighted projects</p>
          <h2 id="highlighted-projects-title">The systems that define my work.</h2>
        </div>

        <div className="featured-project-grid reveal">
          {featuredProjects.map((project, index) => (
            <article
              className={`featured-project-card featured-project-card--${project.slug}`}
              key={project.slug}
            >
              <button
                className="featured-project-visual"
                type="button"
                onClick={() => setGalleryProject(project)}
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
              </button>

              <div className="featured-project-copy">
                <div className="featured-project-meta">
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <p>{project.category}</p>
                </div>
                <h2>{project.title}</h2>
                <p>{project.description}</p>
                <ul className="tag-list" aria-label={`${project.title} technologies`}>
                  {project.tags.map((tag) => (
                    <li key={tag}>{tag}</li>
                  ))}
                </ul>
                <span className="featured-project-access">{project.access}</span>
                <div className="featured-project-actions">
                  <button
                    className="text-link text-link--button"
                    type="button"
                    onClick={() => setGalleryProject(project)}
                  >
                    View gallery <span aria-hidden="true">→</span>
                  </button>
                  {project.href && (
                    <a className="text-link text-link--muted" href={project.href} target="_blank" rel="noreferrer">
                      {project.linkLabel} <span aria-hidden="true">↗</span>
                    </a>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="projects-catalog" aria-labelledby="project-archive-title">
        <div className="archive-section-heading reveal">
          <p className="eyebrow">More systems</p>
          <h2 id="project-archive-title">Additional engineering work.</h2>
        </div>

        <div className="projects-list reveal">
          {archiveProjects.map((project, index) => (
            <article
              className={`project-row ${getProjectViews(project).length ? "project-row--case-study" : ""}`}
              key={project.slug}
            >
              <span className="project-number">
                {String(index + featuredProjects.length + 1).padStart(2, "0")}
              </span>
              <div className="project-title">
                <p>{project.category}</p>
                <h2>{project.title}</h2>
              </div>
              <div className="project-detail">
                <p>{project.description}</p>
                <ul className="tag-list" aria-label={`${project.title} technologies`}>
                  {project.tags.map((tag) => (
                    <li key={tag}>{tag}</li>
                  ))}
                </ul>
              </div>
              {getProjectViews(project).length ? (
                <button
                  className="project-case-link"
                  type="button"
                  onClick={() => setGalleryProject(project)}
                  aria-label={`Open ${project.title} case study`}
                >
                  <span>{getCaseStudyLabel(project)}</span>
                  <i aria-hidden="true">↗</i>
                </button>
              ) : (
                <span className="private-label">{project.access}</span>
              )}
            </article>
          ))}
        </div>
      </section>

      <ProjectGallery
        key={galleryProject?.slug ?? "closed"}
        project={galleryProject}
        onClose={() => setGalleryProject(null)}
      />
    </>
  );
}
