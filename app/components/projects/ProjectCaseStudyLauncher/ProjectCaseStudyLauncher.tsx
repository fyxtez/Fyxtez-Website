"use client";

import "./ProjectCaseStudyLauncher.css";

import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import type { Project } from "../../../data/projects";

const ProjectGallery = dynamic(() => import("../ProjectGallery/ProjectGallery"), {
  ssr: false,
  loading: () => (
    <div className="gallery-loading-backdrop" role="status" aria-live="polite">
      Loading case study…
    </div>
  ),
});

export default function ProjectCaseStudyLauncher({ project }: { project: Project }) {
  const router = useRouter();

  return (
    <ProjectGallery
      project={project}
      onClose={() => router.push("/projects", { scroll: false })}
    />
  );
}
