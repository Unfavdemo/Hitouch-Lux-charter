import { media } from "@/content/media";

export const experiencesHero = {
  eyebrow: "Curated itineraries",
  headline: "Commission the feeling—not just the fleet.",
  supporting:
    "Each experience pairs discreet chauffeur service with venue timing, cabin staging, and concierge buffers. Choose a package or describe the mood—we architect the movement.",
};

export const featuredSprinter = {
  title: "Custom-built executive Sprinter",
  blurb:
    "A mobile salon for road shows, artist movements, and multi-stop tasting days—partition-ready, Wi‑Fi enabled, and staged to your preferences.",
  image: media.sprinterInterior,
  alt: "Luxury executive van interior with ambient lighting",
};

export const experiencePackages = [
  {
    id: "spa-retreat",
    slug: "spa-day-couples-retreat",
    title: "Spa day / couple's retreat",
    blurb: "Dual pickups, wellness venue timing, and a composed return with refreshments staged in-cabin.",
    image: media.spa,
    alt: "Relaxing spa atmosphere with soft lighting",
    href: "/experience-request",
  },
  {
    id: "golf",
    slug: "golf-outings",
    title: "Golf outings",
    blurb: "Tee-time synchronized arrivals, club storage, and flexible loops between courses and private clubs.",
    image: media.golf,
    alt: "Golf course fairway at sunrise",
    href: "/experience-request",
  },
  {
    id: "date-night",
    slug: "date-night",
    title: "Date night experience",
    blurb: "Restaurant hops, theater doors, and after-hours returns with privacy glass and quiet cabin staging.",
    image: media.fineDining,
    alt: "Fine dining table setting",
    href: "/experience-request",
  },
  {
    id: "winery-brunch",
    slug: "winery-brunch",
    title: "Winery & brunch experience",
    blurb: "Multi-estate routing, tasting timers, and cooler-ready Sprinters for case storage on return.",
    image: media.winery,
    alt: "Wine glasses in a vineyard setting",
    href: "/experience-request",
  },
  {
    id: "vip-artist",
    slug: "vip-artist-transportation",
    title: "VIP artist transportation",
    blurb: "Venue-to-venue discretion, security coordination, and overnight-ready vehicles for touring principals.",
    image: media.concert,
    alt: "Concert stage lights and crowd silhouettes",
    href: "/experience-request",
  },
];
