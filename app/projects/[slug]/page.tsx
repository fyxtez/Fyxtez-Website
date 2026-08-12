import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import ProjectCaseStudyLauncher from "../../components/projects/ProjectCaseStudyLauncher";
import SiteFooter from "../../components/siteFooter/SiteFooter";
import SiteHeader from "../../components/siteHeader/SiteHeader";
import { getProjectViews, projects } from "../../data/projects";

type ProjectPageProps = {
  params: Promise<{ slug: string }>;
};

function findProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}

export function generateStaticParams() {
  return projects
    .filter((project) => getProjectViews(project).length > 0)
    .map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = findProject(slug);

  if (!project) return {};

  const url = `/projects/${project.slug}`;
  const previewImage = project.images[0]?.src ?? "/opengraph-image";

  return {
    title: project.title,
    description: project.description,
    alternates: { canonical: url },
    openGraph: {
      title: `${project.title} — Fyxtez`,
      description: project.description,
      url,
      siteName: "Fyxtez",
      type: "article",
      images: [
        {
          url: previewImage,
          alt: project.images[0]?.alt ?? `${project.title} architecture case study`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${project.title} — Fyxtez`,
      description: project.description,
      images: [previewImage],
    },
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = findProject(slug);

  if (!project || getProjectViews(project).length === 0) notFound();

  return (
    <div className="site-shell">
      <div className="background-grid" aria-hidden="true" />
      <SiteHeader current="projects" />

      <main id="main-content" className="projects-main">
        <section className="projects-hero project-route-summary">
          <div>
            <p className="eyebrow">{project.category}</p>
            <h1>{project.title}</h1>
          </div>
          <div className="projects-hero-copy">
            <p>{project.description}</p>
            <ul className="tag-list" aria-label={`${project.title} technologies`}>
              {project.tags.map((tag) => (
                <li key={tag}>{tag}</li>
              ))}
            </ul>
            <Link className="text-link" href="/projects">
              ← All Projects
            </Link>
          </div>
        </section>
      </main>

      <SiteFooter />
      <ProjectCaseStudyLauncher project={project} />
    </div>
  );
}
