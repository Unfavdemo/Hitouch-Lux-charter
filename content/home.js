import { media } from "@/content/media";

/** Landing page editorial copy & imagery (HiTouch Luxury Charter) */

export const heroContent = {
  eyebrow: "Curated luxury experiences · Philadelphia & tri-state",
  headline: "The evening begins before you arrive.",
  supporting:
    "We choreograph atmosphere, timing, and arrival—so every chapter of your night feels intentional, not incidental.",
  image: media.fineDiningHero,
  imageAlt: "Elegant fine-dining table with candlelight and glassware",
  primaryCta: { label: "Explore curated experiences", href: "/experiences" },
  secondaryCta: { label: "Design your evening", href: "/experience-request" },
};

export const homeExperienceIntro = {
  eyebrow: "Curated for you",
  headline: "Experiences built around how you want to feel—not just where you need to go.",
  supporting:
    "Each package pairs discreet chauffeur service with venue timing, cabin staging, and concierge buffers. Pick a frame—or tell us the mood and we architect the rest.",
  viewAllLabel: "View all experiences",
  viewAllHref: "/experiences",
};

/** Package ids shown on the home preview (order preserved) */
export const featuredExperienceIds = ["date-night", "winery-brunch", "spa-retreat"];

export const experienceJourney = {
  eyebrow: "The HiTouch method",
  headline: "Luxury is the sequence—not the sedan.",
  supporting:
    "Transportation is the thread that ties your evening together. We design the cadence so you stay present from first pickup to last gesture.",
  steps: [
    {
      id: "listen",
      title: "Listen & interpret",
      body: "Occasion, guest list, energy level, and non-negotiables—captured in one concierge thread, not a generic form.",
    },
    {
      id: "choreograph",
      title: "Choreograph the arc",
      body: "Venue buffers, cabin staging, multi-stop pacing, and contingency routes—mapped before wheels roll.",
    },
    {
      id: "deliver",
      title: "Deliver the arrival",
      body: "Discreet chauffeurs, immaculate cabins, and timing that feels invisible until the door opens exactly when it should.",
    },
  ],
};

export const valuePillars = [
  {
    id: "atmosphere",
    title: "Atmosphere, staged in motion",
    body: "Climate, lighting, refreshments, and music are set to your brief—so the cabin reads as an extension of the venue, not a commute.",
    span: "tall",
  },
  {
    id: "discreet",
    title: "Presence without performance",
    body: "Chauffeurs trained in discretion and front-of-house poise. Executive protection and licensed security details on request.",
    span: "default",
  },
  {
    id: "cadence",
    title: "Cadence you can trust",
    body: "Flight-aware airport work, multi-venue weddings, road-show tempo—one team owns the clock so you own the room.",
    span: "wide",
  },
];

export const philosophyIntro = {
  eyebrow: "Our promise",
  headline:
    "You are not booking a ride—you are commissioning an experience that begins at pickup and ends with a composed exit.",
  supporting:
    "HiTouch Luxury Charter is a concierge-led studio for movement: we script arrivals, protect your privacy, and make the journey feel as considered as the destination.",
};

export const servicesBento = [
  {
    id: "celebration",
    title: "Celebration choreography",
    blurb: "Weddings, galas, and milestone weekends—multi-venue sequencing with guest movements treated like a performance.",
    href: "/events",
    image: media.wedding,
    alt: "Elegant wedding celebration setting",
    layout: "large",
  },
  {
    id: "corporate",
    title: "Executive programs",
    blurb: "Road shows and board evenings with consolidated reporting and cabins tuned for confidential conversation.",
    href: "/corporate",
    image: media.skyline,
    alt: "Modern glass office towers at dusk",
    layout: "medium",
  },
  {
    id: "leisure",
    title: "Leisure & tasting days",
    blurb: "Wine country, brunch circuits, and spa retreats—pacing that leaves room for the experience itself.",
    href: "/experiences",
    image: media.winery,
    alt: "Vineyard rows in soft light",
    layout: "medium",
  },
  {
    id: "arrival",
    title: "Arrival & departure rituals",
    blurb: "PHL, PNE, and private FBOs—meet-and-greet, luggage assist, and flight-aware timing that protects your buffer.",
    href: "/services",
    image: media.airport,
    alt: "Aircraft and airport runway at golden hour",
    layout: "banner",
  },
];

export const conciergeStatus = {
  label: "Experience concierge",
  state: "available",
  detail: "Live routing desk monitored · typical callback under 15 minutes during service hours",
};

export const homeConcierge = {
  eyebrow: "Begin your experience",
  headline: "Tell us the occasion—we'll architect the movement.",
  supporting:
    "Share your vision, guest count, and timing. Our concierge team returns a choreographed proposal—vehicle class, route cadence, and cabin staging included.",
  primaryCta: { label: "Request a curated experience", href: "/experience-request" },
  secondaryCta: { label: "Get a trip estimate", href: "/book" },
  tertiaryNote: "Already know your itinerary? Reserve online for immediate scheduling.",
  tertiaryHref: null, // filled from site.moovsBookingUrl at runtime
  tertiaryLabel: "Reserve online",
};
