import { media, owned } from "@/content/media";

/**
 * Fleet catalog — aligned with Moovs vehicle classes (pricing: request quote).
 * Owned photography wired for Tahoe / Suburban; remaining vehicles still need shoots.
 */
export const fleet = [
  {
    id: "v-s-class-560",
    slug: "mercedes-s-class-560",
    name: "Mercedes-Benz S-Class 560",
    class: "Sedan",
    tagline: "Flagship sedan for discreet airport, boardroom, and evening movements",
    passengers: 3,
    luggage: 3,
    wifi: true,
    partition: false,
    fromPriceUsd: null,
    requestQuote: true,
    imageSrc: media.luxurySedanInterior,
    imageAlt: "Luxury sedan cabin with leather seating and ambient lighting",
    width: 1200,
    height: 800,
    detailIntro:
      "Three-passenger executive sedan with full amenity set for principals who need a quiet cabin between venues. Pricing is quoted per itinerary.",
    highlights: [
      "Luggage space · climate control (AC)",
      "Trash receptacle · multimedia",
      "Power outlets · USB · Wi‑Fi · Bluetooth",
      "Policy: alcohol friendly · no food, pets, or smoking",
    ],
  },
  {
    id: "v-tahoe-2024",
    slug: "chevy-tahoe-2024",
    name: "Tinted black 2024 Chevy Tahoe",
    class: "SUV",
    tagline: "Five-passenger SUV with tinted privacy glass",
    passengers: 5,
    luggage: 5,
    wifi: false,
    partition: false,
    fromPriceUsd: null,
    requestQuote: true,
    imageSrc: owned.tahoeHero,
    imageAlt: "HiTouch black SUV with VIP boarding on a city curb",
    gallery: [
      { src: owned.tahoeHero, alt: "VIP boarding a HiTouch black SUV" },
      { src: owned.tahoeBadge, alt: "HiTouch gold mark on tinted SUV glass" },
      { src: owned.tahoeGallery2, alt: "HiTouch SUVs staged on a city curb" },
      { src: owned.boarding, alt: "Guest stepping from a HiTouch SUV with team at the curb" },
      { src: owned.cabinCurbside, alt: "Guests seated inside a HiTouch SUV at the curb" },
    ],
    width: 1200,
    height: 800,
    detailIntro:
      "Straightforward five-seat SUV layout; Moovs listing shows general and multimedia as not specified for this unit. Pricing on request.",
    highlights: [
      "5 passengers · tinted black exterior (2024)",
      "Policy: no alcohol, food, pets, or smoking",
      "Request for pricing",
    ],
  },
  {
    id: "v-suburban-2025",
    slug: "chevy-suburban-2025",
    name: "Tinted black 2025 Suburban",
    class: "SUV",
    tagline: "Full-size SUV with connectivity and flexible cabin policy",
    passengers: 5,
    luggage: 6,
    wifi: true,
    partition: false,
    fromPriceUsd: null,
    requestQuote: true,
    imageSrc: owned.suburbanHero,
    imageAlt: "Tinted black 2025 Chevy Suburban with HiTouch mark at the curb",
    gallery: [
      { src: owned.suburbanHero, alt: "2025 Suburban Premier at the curb with HiTouch mark" },
      { src: owned.suburbanBadge, alt: "HiTouch mark on Suburban rear glass" },
      { src: owned.suburbanRear, alt: "Suburban Premier rear three-quarter with brand mark" },
      { src: owned.suburbanCabin, alt: "Suburban cabin with digital dash and leather seating" },
      { src: owned.fleetPair, alt: "Two HiTouch black SUVs lined up on a city street" },
      { src: owned.fleetLineupDusk, alt: "HiTouch SUV and Sprinter fleet lined up at dusk" },
    ],
    width: 1200,
    height: 800,
    detailIntro:
      "Five-passenger Suburban with strong amenity list for longer tri-state legs and family-style airport runs. Pricing on request.",
    highlights: [
      "Luggage · AC · multimedia · Bluetooth",
      "Wi‑Fi · power outlets · USB",
      "Policy: alcohol friendly · food allowed · no pets or smoking",
    ],
  },
  {
    id: "v-ford-sprinter-2025",
    slug: "ford-sprinter-2025",
    name: "2025 Ford Sprinter Van",
    class: "Shuttle van",
    tagline: "Thirteen-passenger shuttle for group movements and production scale",
    passengers: 13,
    luggage: 13,
    wifi: false,
    partition: false,
    fromPriceUsd: null,
    requestQuote: true,
    imageSrc: owned.fordSprinterHero,
    imageAlt: "HiTouch black Sprinter and SUVs lined up at dusk",
    gallery: [
      { src: owned.fordSprinterHero, alt: "HiTouch fleet lineup with Sprinter at dusk" },
      { src: owned.fleetLineupDusk, alt: "Three-vehicle HiTouch fleet at blue hour" },
      { src: owned.sprinterNightExit, alt: "Guest exiting the Sprinter at night with door assist" },
    ],
    width: 1200,
    height: 800,
    detailIntro:
      "High-capacity shuttle van for coordinated arrivals. Moovs profile lists general and multimedia amenities as not specified. Pricing on request.",
    highlights: [
      "13 passengers",
      "Policy: no alcohol, food, pets, or smoking",
      "Request for pricing",
    ],
  },
  {
    id: "v-executive-sprinter",
    slug: "executive-sprinter-jet",
    name: "Executive Sprinter",
    class: "Sprinter jet",
    tagline: "Six-passenger jet-style Sprinter with tables, galley, and entertainment",
    passengers: 6,
    luggage: 6,
    wifi: true,
    partition: true,
    fromPriceUsd: null,
    requestQuote: true,
    imageSrc: owned.executiveSprinterHero,
    imageAlt: "HiTouch Executive Sprinter with Suburbans at dusk",
    gallery: [
      { src: owned.executiveSprinterHero, alt: "Executive Sprinter centered in the HiTouch fleet lineup" },
      { src: owned.executiveSprinterCabin, alt: "Executive Sprinter cabin with leather captain chairs" },
      { src: owned.executiveSprinterCabin2, alt: "Guests celebrating inside the Executive Sprinter cabin" },
      { src: owned.mercedesSprinterHero, alt: "HiTouch chauffeur with Mercedes Sprinter at golden hour" },
      { src: owned.sprinterNightExit, alt: "Night curb exit from the lit Sprinter cabin" },
      { src: owned.sprinterNightAssist, alt: "Door assist as a guest steps from the Sprinter at night" },
    ],
    width: 1200,
    height: 800,
    detailIntro:
      "Premium six-seat executive configuration with work and refreshment amenities—ideal for road shows and VIP entourages. Pricing on request.",
    highlights: [
      "AC · luggage · tables · refrigerator",
      "Multimedia · Bluetooth · TV · Wi‑Fi · USB · power outlets",
      "Policy: food allowed · no alcohol, pets, or smoking",
    ],
  },
  {
    id: "v-escalade-2025",
    slug: "cadillac-escalade-2025",
    name: "2025 Cadillac Escalade",
    class: "SUV",
    tagline: "Six-passenger flagship SUV for principals who want maximum space",
    passengers: 6,
    luggage: 6,
    wifi: false,
    partition: false,
    fromPriceUsd: null,
    requestQuote: true,
    imageSrc: media.limousine,
    imageAlt: "Premium black SUV front three-quarter view",
    width: 1200,
    height: 800,
    detailIntro:
      "Late-model Escalade class for six passengers; Moovs listing shows general and multimedia as not specified. Pricing on request.",
    highlights: [
      "6 passengers · 2025 Cadillac Escalade",
      "Policy: no alcohol, food, pets, or smoking",
      "Request for pricing",
    ],
  },
  {
    id: "v-benz-sprinter",
    slug: "mercedes-benz-sprinter-executive",
    name: "Benz Sprinter",
    class: "Sprinter executive",
    tagline: "Thirteen-passenger executive Sprinter for large parties and events",
    passengers: 13,
    luggage: 13,
    wifi: false,
    partition: false,
    fromPriceUsd: null,
    requestQuote: true,
    imageSrc: owned.mercedesSprinterHero,
    imageAlt: "HiTouch chauffeur with Mercedes-Benz Sprinter at dusk",
    gallery: [
      { src: owned.mercedesSprinterHero, alt: "Chauffeur portrait with Mercedes Sprinter and HiTouch mark" },
      { src: owned.chauffeurSprinter, alt: "HiTouch chauffeur arms crossed at the Sprinter grille" },
      { src: owned.fleetLineupDusk, alt: "Sprinter with Suburbans staged at dusk" },
      { src: owned.sprinterNightAssist, alt: "Assisted night exit from the Sprinter" },
    ],
    width: 1200,
    height: 800,
    detailIntro:
      "High-capacity Mercedes-Benz Sprinter in executive configuration for up to thirteen guests. Moovs profile lists general and multimedia as not specified. Pricing on request.",
    highlights: [
      "13 passengers · Sprinter executive",
      "Policy: no alcohol, food, pets, or smoking",
      "Request for pricing",
    ],
  },
];

export function getVehicleById(id) {
  return fleet.find((v) => v.id === id);
}

export function recommendVehicles(passengers) {
  const sorted = [...fleet].sort((a, b) => a.passengers - b.passengers);
  return sorted.filter((v) => v.passengers >= passengers).length
    ? sorted.filter((v) => v.passengers >= passengers)
    : sorted;
}
