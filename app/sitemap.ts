import type { MetadataRoute } from "next";
import { experiences } from "@/content/experiences";
import { getSiteUrl } from "@/lib/seo/site-url";

/** Conversion-critical pages get the highest weight after the home page. */
const HIGH_PRIORITY = new Set([
  "/memberships",
  "/memberships/apply",
  "/book",
  "/experience-request",
  "/experiences",
  "/game-day",
  "/executive-mobility",
  "/airport",
  "/corporate",
]);

const staticPaths = [
  "/",
  "/memberships",
  "/memberships/apply",
  "/executive-mobility",
  "/experiences",
  "/game-day",
  "/corporate",
  "/airport",
  "/concierge",
  "/why-hitouch",
  "/about",
  "/book",
  "/book-a-ride",
  "/contact",
  "/events",
  "/experience-request",
  "/faq",
  "/fleet",
  "/privacy",
  "/services",
  "/terms",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const base = getSiteUrl();
  const lastModified = new Date();

  // Every experience has its own landing page, so each gets its own entry.
  const paths = [...staticPaths, ...experiences.map((e) => e.href)];

  return paths.map((path) => ({
    url: `${base}${path}`,
    lastModified,
    changeFrequency: path === "/" ? "weekly" : "monthly",
    priority: path === "/" ? 1 : HIGH_PRIORITY.has(path) ? 0.9 : 0.7,
  }));
}
