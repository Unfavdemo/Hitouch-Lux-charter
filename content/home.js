import { media } from "@/content/media";

/** Landing page editorial copy & imagery (HiTouch Luxury Charter) */

export const heroContent = {
  eyebrow: "Private mobility & curated experiences · Philadelphia",
  /** Rendered as stacked, tracked uppercase lines */
  headlineLines: ["Your time.", "Your experience.", "Your standard."],
  headline: "Your time. Your experience. Your standard.",
  supporting:
    "Private mobility and curated experiences for people who expect more from how they move.",
  image: media.fineDiningHero,
  imageAlt: "Elegant fine-dining table with candlelight and glassware",
  primaryCta: { label: "Request Your Experience", href: "/experience-request" },
  secondaryCta: { label: "Book Transportation", href: "/book" },
};

/** Statement band beneath the hero */
export const brandStatement = {
  eyebrow: "The HiTouch standard",
  headline: "You don't just book a vehicle. You have HiTouch.",
  supporting:
    "Reliability, relationships, access, and attention to detail—concierge-level service that treats your plans as our responsibility.",
};

export const homeExperienceIntro = {
  eyebrow: "Private experiences",
  headline: "Tell us the occasion. We'll handle the details.",
  supporting:
    "Transportation is only the beginning. Game Day, Escape, Wellness, Leisure, and Signature—each experience pairs private mobility with concierge coordination.",
  viewAllLabel: "Explore all experiences",
  viewAllHref: "/experiences",
};

export const experienceJourney = {
  eyebrow: "One call. Every detail handled.",
  headline: "How HiTouch works.",
  supporting:
    "You make one call. We take responsibility for everything that follows—so the only thing you manage is being present.",
  steps: [
    {
      id: "know",
      title: "We know you",
      body: "Preferences, temperatures, seating, timing—captured once and remembered on every trip, so you never explain yourself twice.",
    },
    {
      id: "anticipate",
      title: "We anticipate",
      body: "Timing, itinerary, traffic, and contingencies managed proactively—decisions made before they become questions.",
    },
    {
      id: "deliver",
      title: "We deliver",
      body: "A composed chauffeur, a staged cabin, and a door that opens exactly when it should. Every time.",
    },
  ],
};

/** Five service promises — the Why HiTouch differentiators */
export const servicePromises = [
  {
    id: "know-you",
    title: "We know you",
    body: "We remember preferences so clients don't have to repeatedly explain them.",
  },
  {
    id: "anticipate",
    title: "We anticipate",
    body: "We proactively manage timing, itinerary, and details.",
  },
  {
    id: "protect-time",
    title: "We protect your time",
    body: "Punctuality is fundamental. It is the floor, not the ceiling.",
  },
  {
    id: "handle-details",
    title: "We handle the details",
    body: "Transportation, reservations, experiences, and special requests.",
  },
  {
    id: "relationships",
    title: "We build relationships",
    body: "Clients are relationships—not transactions.",
  },
];

export const philosophyIntro = {
  eyebrow: "Why HiTouch",
  headline: "For people who value their time differently.",
  supporting:
    "Five promises define every HiTouch experience. They are why clients stop thinking \"I need a ride\" and start saying \"HiTouch is handling it.\"",
};

/** Founder story — why HiTouch exists */
export const founderStory = {
  eyebrow: "Why HiTouch exists",
  headline: "Built as the answer to unreliable, impersonal transportation.",
  body: [
    "HiTouch was created after experiencing what most people quietly tolerate: transportation that is unreliable, impersonal, and indifferent to the moment it serves.",
    "We wanted to build the opposite—a reliable network of elevated experiences for people who value their time, professionalism, and attention to detail. Not a fleet with a phone number, but a relationship that remembers you, anticipates for you, and takes responsibility for how you move.",
  ],
  quote: "Service is the rent we pay for our time here on Earth.",
  quoteLabel: "The HiTouch philosophy",
  image: media.phillySkyline,
  imageAlt: "Philadelphia architecture and city life at dusk",
};

export const servicesBento = [
  {
    id: "game-day",
    title: "Game Day",
    blurb: "Sixers, Eagles, Phillies, Flyers—private pickup, coordinated arrival, dedicated return. Just game day, handled.",
    href: "/game-day",
    image: media.stadiumLights,
    alt: "Stadium under bright evening floodlights",
    layout: "large",
  },
  {
    id: "memberships",
    title: "Private Membership",
    blurb: "Transportation that's already handled—preferred fleet access, priority booking, and concierge support.",
    href: "/memberships",
    image: media.sprinterInterior,
    alt: "Executive Sprinter cabin with ambient lighting",
    layout: "medium",
  },
  {
    id: "executive",
    title: "Executive Mobility",
    blurb: "Executive car service for principals and teams—punctual, discreet, and consistent.",
    href: "/executive-mobility",
    image: media.skyline,
    alt: "Modern glass office towers at dusk",
    layout: "medium",
  },
  {
    id: "airport",
    title: "Airport",
    blurb: "PHL, PNE, and private FBOs—flight-aware timing, meet-and-greet, and luggage handled.",
    href: "/airport",
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
  eyebrow: "Once you're with HiTouch, you're taken care of",
  headline: "One call. Every detail handled.",
  supporting:
    "Book transportation, request a membership, or design an experience—however you begin, the same standard takes over from there.",
  primaryCta: { label: "Request Your Experience", href: "/experience-request" },
  secondaryCta: { label: "Book Transportation", href: "/book" },
  membershipCta: { label: "Request Membership", href: "/memberships" },
  tertiaryNote: "Already know your itinerary? Reserve online for immediate scheduling.",
  tertiaryHref: null, // filled from site.moovsBookingUrl at runtime
  tertiaryLabel: "Reserve online",
};
