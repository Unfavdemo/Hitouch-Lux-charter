import type { MetadataRoute } from "next";
import { getSiteUrl } from "@/lib/seo/site-url";
import { experienceSlugs } from "@/content/experiences";

const marketingPaths = [
  "/",
  "/about",
  "/airport",
  "/book",
  "/book-a-ride",
  "/contact",
  "/corporate",
  "/events",
  "/executive-mobility",
  "/experience-request",
  "/experiences",
  "/faq",
  "/fleet",
  "/game-day",
  "/memberships",
  "/privacy",
  "/services",
  "/terms",
  "/testimonials",
];

const highPriorityPaths = new Set([
  "/book",
  "/corporate",
  "/experiences",
  "/game-day",
  "/memberships",
]);

export default function sitemap(): MetadataRoute.Sitemap {
  const base = getSiteUrl();
  const lastModified = new Date();

  const staticEntries: MetadataRoute.Sitemap = marketingPaths.map((path) => ({
    url: `${base}${path}`,
    lastModified,
    changeFrequency: path === "/" ? "weekly" : "monthly",
    priority: path === "/" ? 1 : highPriorityPaths.has(path) ? 0.9 : 0.7,
  }));

  const experienceEntries: MetadataRoute.Sitemap = experienceSlugs.map((slug) => ({
    url: `${base}/experiences/${slug}`,
    lastModified,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  return [...staticEntries, ...experienceEntries];
}
