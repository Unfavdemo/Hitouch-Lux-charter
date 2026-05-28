import { media } from "@/content/media";

/**
 * Fleet catalog — aligned with Moovs vehicle classes (pricing: request quote).
 * Replace imageSrc with licensed HiTouch photography when available.
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
    imageSrc: media.sedanAlt,
    imageAlt: "Black premium SUV in an urban setting",
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
    imageSrc: media.suv,
    imageAlt: "Large black SUV at dusk",
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
    imageSrc: media.sprinterAlt,
    imageAlt: "White passenger van on a city street",
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
    imageSrc: media.sprinterInterior,
    imageAlt: "Premium passenger van cabin with leather seating",
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
    imageSrc: media.coach,
    imageAlt: "Large passenger van on the road",
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
