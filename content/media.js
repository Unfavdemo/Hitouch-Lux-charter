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

  /* Game day */
  basketballArena: unsplashPhoto("photo-1504450758481-7338eba7524a"),
  basketballCourt: unsplashPhoto("photo-1519861531473-9200262188bf"),
  footballStadium: unsplashPhoto("photo-1489944440615-453fc2b6a9a9"),
  footballField: unsplashPhoto("photo-1566577739112-5180d4bf9390"),
  baseballStadium: unsplashPhoto("photo-1508344928928-7165b67de128"),
  hockeyRink: unsplashPhoto("photo-1515703407324-5f753afd8be8"),
  hockeyAction: unsplashPhoto("photo-1547623542-de3ff5941ddb"),
  stadiumLights: unsplashPhoto("photo-1459865264687-595d652de67e"),
  stadiumCrowd: unsplashPhoto("photo-1522778119026-d647f0596c20"),

  /* Escape & leisure */
  coastalHouse: unsplashPhoto("photo-1499793983690-e29da59ef1c2"),
  beach: unsplashPhoto("photo-1507525428034-b723cf961d3e"),
  openRoad: unsplashPhoto("photo-1469854523086-cc02fe5d8800"),
  wineGlasses: unsplashPhoto("photo-1510812431401-41d2bd2722f3"),
  restaurantInterior: unsplashPhoto("photo-1550966871-3ed3cdb5ed0c"),
  dateNight: unsplashPhoto("photo-1470337458703-46ad1756a187"),
  champagne: unsplashPhoto("photo-1592483648228-b35146a4330c"),

  /* Wellness */
  spaStones: unsplashPhoto("photo-1544161515-4ab6ce6db874"),
  spaMassage: unsplashPhoto("photo-1600334129128-685c5582fd35"),
  yogaGroup: unsplashPhoto("photo-1544367567-0f2fcb009e0b"),

  /* Philadelphia lifestyle */
  phillySkyline: unsplashPhoto("photo-1569761316261-9a8696fa2ca3"),
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
  gameDay: unsplashPhoto("photo-1459865264687-595d652de67e", { w: 2000 }),
  memberships: unsplashPhoto("photo-1684602166069-c45e86b5291e", { w: 2000 }),
  executiveMobility: unsplashPhoto("photo-1618843479313-40f8afb4b4d8", { w: 2000, q: 85 }),
  airport: unsplashPhoto("photo-1436491865332-7a61a109cc05", { w: 2000 }),
};
