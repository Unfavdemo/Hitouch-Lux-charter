/**
 * Centralized marketing imagery — Unsplash photo slugs verified HTTP 200.
 * Replace with HiTouch-owned assets in /public when available.
 */

const BASE = "https://images.unsplash.com";

/** @param {string} slug Full slug e.g. photo-1414235077428-338989a2e8c0 */
export function unsplashPhoto(slug, { w = 1200, q = 80 } = {}) {
  const path = slug.startsWith("photo-") ? slug : `photo-${slug}`;
  return `${BASE}/${path}?auto=format&fit=crop&w=${w}&q=${q}`;
}

/** Curated library (all URLs tested) */
export const media = {
  fineDining: unsplashPhoto("photo-1414235077428-338989a2e8c0"),
  fineDiningHero: unsplashPhoto("photo-1414235077428-338989a2e8c0", { w: 2400, q: 85 }),
  spa: unsplashPhoto("photo-1540555700478-4be289fbecef"),
  golf: unsplashPhoto("photo-1593111774240-d529f12cf4bb"),
  winery: unsplashPhoto("photo-1506377247377-2a5b3b417ebb"),
  concert: unsplashPhoto("photo-1493225457124-a3eb161ffa5f"),
  sprinterInterior: unsplashPhoto("photo-1684602166069-c45e86b5291e", { w: 2000 }),
  sprinterExterior: unsplashPhoto("photo-1765461734605-34657fa04db2", { w: 2000 }),
  luxurySedanInterior: unsplashPhoto("photo-1618843479313-40f8afb4b4d8"),
  wedding: unsplashPhoto("photo-1519741497674-611481863552"),
  weddingHero: unsplashPhoto("photo-1519741497674-611481863552", { w: 2000 }),
  skyline: unsplashPhoto("photo-1486406146926-c627a92ad1ab"),
  skylineHero: unsplashPhoto("photo-1486406146926-c627a92ad1ab", { w: 2000 }),
  airport: unsplashPhoto("photo-1436491865332-7a61a109cc05"),
  sedanAlt: unsplashPhoto("photo-1519641471654-76ce0107ad1b"),
  suv: unsplashPhoto("photo-1533473359331-0135ef1b58bf"),
  sprinterAlt: unsplashPhoto("photo-1544620347-c4fd4a3d5957"),
  limousine: unsplashPhoto("photo-1563720360172-67b8f3dce741"),
  coach: unsplashPhoto("photo-1558618666-fcd25c85cd64"),
};

/** Interior page hero backgrounds */
export const pageHeroes = {
  about: media.skylineHero,
  services: unsplashPhoto("photo-1506377247377-2a5b3b417ebb", { w: 2000 }),
  fleet: unsplashPhoto("photo-1618843479313-40f8afb4b4d8", { w: 2000, q: 85 }),
  events: media.weddingHero,
  corporate: media.skylineHero,
  experiences: unsplashPhoto("photo-1540555700478-4be289fbecef", { w: 2000 }),
  experienceRequest: unsplashPhoto("photo-1414235077428-338989a2e8c0", { w: 2000 }),
};
