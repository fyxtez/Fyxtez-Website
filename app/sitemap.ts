import type { MetadataRoute } from "next";
import { getProjectViews, projects } from "./data/projects";

export default function sitemap(): MetadataRoute.Sitemap {
  const projectPages: MetadataRoute.Sitemap = projects
    .filter((project) => getProjectViews(project).length > 0)
    .map((project) => ({
      url: `https://fyxtez.com/projects/${project.slug}`,
      changeFrequency: "monthly",
      priority: project.featured ? 0.8 : 0.65,
    }));

  return [
    { url: "https://fyxtez.com", changeFrequency: "monthly", priority: 1 },
    {
      url: "https://fyxtez.com/about",
      changeFrequency: "monthly",
      priority: 0.85,
    },
    {
      url: "https://fyxtez.com/projects",
      changeFrequency: "monthly",
      priority: 0.9,
    },
    ...projectPages,
  ];
}
