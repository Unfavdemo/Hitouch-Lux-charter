import type { MetadataRoute } from "next";
import { getSiteUrl } from "@/lib/seo/site-url";

const marketingPaths = [
  "/",
  "/about",
  "/book",
  "/book-a-ride",
  "/contact",
  "/corporate",
  "/events",
  "/experience-request",
  "/experiences",
  "/faq",
  "/fleet",
  "/privacy",
  "/services",
  "/terms",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const base = getSiteUrl();
  const lastModified = new Date();

  return marketingPaths.map((path) => ({
    url: `${base}${path}`,
    lastModified,
    changeFrequency: path === "/" ? "weekly" : "monthly",
    priority: path === "/" ? 1 : path === "/book" || path === "/corporate" ? 0.9 : 0.7,
  }));
}
