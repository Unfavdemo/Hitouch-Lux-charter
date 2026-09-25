/**
 * Centralized marketing imagery.
 * Owned HiTouch assets live under /public/images; Unsplash remains only where we lack a shoot.
 */

const BASE = "https://images.unsplash.com";

/** @param {string} slug Full slug e.g. photo-1414235077428-338989a2e8c0 */
export function unsplashPhoto(slug, { w = 1200, q = 80 } = {}) {
  const path = slug.startsWith("photo-") ? slug : `photo-${slug}`;
  return `${BASE}/${path}?auto=format&fit=crop&w=${w}&q=${q}`;
}

/** Owned photography from the HiTouch JPG + RAW shoots */
export const owned = {
  boarding: "/images/marketing/hero/boarding.jpg",
  fleetPair: "/images/marketing/hero/fleet-pair.jpg",
  fleetLineupDusk: "/images/marketing/hero/fleet-lineup-dusk.jpg",
  suburbanCurb: "/images/marketing/hero/suburban-curb.jpg",
  doorService: "/images/marketing/services/door-service.jpg",
  cabinCurbside: "/images/marketing/services/cabin-curbside.jpg",
  team: "/images/marketing/about/team.jpg",
  teamPortrait: "/images/marketing/about/team-portrait.jpg",
  teamFull: "/images/marketing/about/team-full.jpg",
  chauffeurSprinter: "/images/marketing/about/chauffeur-sprinter.jpg",
  sprinterNightExit: "/images/marketing/experiences/sprinter-night-exit.jpg",
  sprinterNightAssist: "/images/marketing/experiences/sprinter-night-assist.jpg",
  suburbanHero: "/images/fleet/chevy-suburban-2025/hero.jpg",
  suburbanBadge: "/images/fleet/chevy-suburban-2025/gallery-1.jpg",
  suburbanCabin: "/images/fleet/chevy-suburban-2025/gallery-2.jpg",
  suburbanRear: "/images/fleet/chevy-suburban-2025/gallery-3.jpg",
  tahoeHero: "/images/fleet/chevy-tahoe-2024/hero.jpg",
  tahoeBadge: "/images/fleet/chevy-tahoe-2024/gallery-1.jpg",
  tahoeGallery2: "/images/fleet/chevy-tahoe-2024/gallery-2.jpg",
  executiveSprinterHero: "/images/fleet/executive-sprinter-jet/hero.jpg",
  executiveSprinterCabin: "/images/fleet/executive-sprinter-jet/gallery-1.jpg",
  executiveSprinterCabin2: "/images/fleet/executive-sprinter-jet/gallery-2.jpg",
  mercedesSprinterHero: "/images/fleet/mercedes-benz-sprinter-executive/hero.jpg",
  fordSprinterHero: "/images/fleet/ford-sprinter-2025/hero.jpg",
};

/** Curated library */
export const media = {
  fineDining: unsplashPhoto("photo-1414235077428-338989a2e8c0"),
  fineDiningHero: owned.fleetLineupDusk,
  spa: unsplashPhoto("photo-1540555700478-4be289fbecef"),
  golf: unsplashPhoto("photo-1593111774240-d529f12cf4bb"),
  winery: unsplashPhoto("photo-1506377247377-2a5b3b417ebb"),
  concert: unsplashPhoto("photo-1493225457124-a3eb161ffa5f"),
  sprinterInterior: owned.executiveSprinterCabin,
  sprinterExterior: owned.executiveSprinterHero,
  luxurySedanInterior: unsplashPhoto("photo-1618843479313-40f8afb4b4d8"),
  wedding: unsplashPhoto("photo-1519741497674-611481863552"),
  weddingHero: unsplashPhoto("photo-1519741497674-611481863552", { w: 2000 }),
  skyline: owned.team,
  skylineHero: owned.team,
  airport: unsplashPhoto("photo-1436491865332-7a61a109cc05"),
  sedanAlt: owned.tahoeHero,
  suv: owned.suburbanHero,
  sprinterAlt: owned.fordSprinterHero,
  limousine: unsplashPhoto("photo-1563720360172-67b8f3dce741"),
  coach: owned.mercedesSprinterHero,

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
  dateNight: owned.sprinterNightExit,
  champagne: unsplashPhoto("photo-1592483648228-b35146a4330c"),

  /* Wellness */
  spaStones: unsplashPhoto("photo-1544161515-4ab6ce6db874"),
  spaMassage: unsplashPhoto("photo-1600334129128-685c5582fd35"),
  yogaGroup: unsplashPhoto("photo-1544367567-0f2fcb009e0b"),

  /* Philadelphia / brand lifestyle */
  phillySkyline: owned.suburbanCurb,
};

/** Interior page hero backgrounds */
export const pageHeroes = {
  about: owned.chauffeurSprinter,
  services: owned.doorService,
  fleet: owned.fleetLineupDusk,
  events: owned.sprinterNightAssist,
  corporate: owned.fleetPair,
  experiences: owned.sprinterNightExit,
  experienceRequest: owned.boarding,
  gameDay: unsplashPhoto("photo-1459865264687-595d652de67e", { w: 2000 }),
  memberships: owned.executiveSprinterCabin,
  executiveMobility: owned.boarding,
  airport: unsplashPhoto("photo-1436491865332-7a61a109cc05", { w: 2000 }),
};
