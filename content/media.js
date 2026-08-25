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

  // Game day — generic sports imagery only; no team marks or venue branding.
  arenaInterior: unsplashPhoto("photo-1504450758481-7338eba7524a"),
  basketballDunk: unsplashPhoto("photo-1608245449230-4ac19066d2d0"),
  basketballHoop: unsplashPhoto("photo-1546519638-68e109498ffc"),
  footballField: unsplashPhoto("photo-1566577739112-5180d4bf9390"),
  ballparkAerial: unsplashPhoto("photo-1471295253337-3ceaaedca402"),
  hockeyAction: unsplashPhoto("photo-1580748141549-71748dbe0bdc"),

  // Escape
  coastalVillage: unsplashPhoto("photo-1533105079780-92b9be482077"),
  beachSunset: unsplashPhoto("photo-1507525428034-b723cf961d3e"),
  vineyardRows: unsplashPhoto("photo-1560493676-04071c5f467b"),
  countryEstate: unsplashPhoto("photo-1600585154340-be6161a56a0c"),
  resortPool: unsplashPhoto("photo-1571003123894-1f0594d2b5d9"),

  // Wellness
  spaFacial: unsplashPhoto("photo-1512290923902-8a9f81dc236c"),
  couplesMassage: unsplashPhoto("photo-1600334129128-685c5582fd35"),
  hotStoneMassage: unsplashPhoto("photo-1600334089648-b0d9d3028eb2"),
  sauna: unsplashPhoto("photo-1583416750470-965b2707b355"),
  wellnessRetreat: unsplashPhoto("photo-1596178065887-1198b6148b2b"),

  // Leisure
  golfSwing: unsplashPhoto("photo-1535131749006-b7f58c99034b"),
  golfHole: unsplashPhoto("photo-1587174486073-ae5e5cff23aa"),
  diningRoom: unsplashPhoto("photo-1550966871-3ed3cdb5ed0c"),
  platedCourse: unsplashPhoto("photo-1600891964092-4316c288032e"),
  rooftopTerrace: unsplashPhoto("photo-1559339352-11d035aa65de"),
  cocktailBar: unsplashPhoto("photo-1543007630-9710e4a00a20"),
  groupDining: unsplashPhoto("photo-1592861956120-e524fc739696"),

  // Concierge details
  champagnePour: unsplashPhoto("photo-1547595628-c61a29f496f0"),
  flowerBouquet: unsplashPhoto("photo-1526047932273-341f2a7631f9"),
  tableFlowers: unsplashPhoto("photo-1519225421980-715cb0215aed"),
  wineToast: unsplashPhoto("photo-1510812431401-41d2bd2722f3"),
  chefPlating: unsplashPhoto("photo-1551218808-94e220e084d2"),

  // Executive, corporate & membership
  executivePortrait: unsplashPhoto("photo-1519085360753-af0119f7cbe7"),
  boardroomView: unsplashPhoto("photo-1517502884422-41eaead166d4"),
  officeTeam: unsplashPhoto("photo-1521737604893-d14cc237f11d"),
  handshake: unsplashPhoto("photo-1521791136064-7986c2920216"),
  cityNight: unsplashPhoto("photo-1519999482648-25049ddd37b1"),
  glassTowers: unsplashPhoto("photo-1560179707-f14e90ef3623"),
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
  home: unsplashPhoto("photo-1519999482648-25049ddd37b1", { w: 2400, q: 85 }),
  gameDay: unsplashPhoto("photo-1504450758481-7338eba7524a", { w: 2000, q: 85 }),
  memberships: unsplashPhoto("photo-1618843479313-40f8afb4b4d8", { w: 2000, q: 85 }),
  executiveMobility: unsplashPhoto("photo-1517502884422-41eaead166d4", { w: 2000, q: 85 }),
  airport: unsplashPhoto("photo-1436491865332-7a61a109cc05", { w: 2000, q: 85 }),
  concierge: unsplashPhoto("photo-1519225421980-715cb0215aed", { w: 2000, q: 85 }),
  whyHitouch: unsplashPhoto("photo-1560179707-f14e90ef3623", { w: 2000, q: 85 }),
};
