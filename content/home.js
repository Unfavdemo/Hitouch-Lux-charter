import { media, owned } from "@/content/media";

/** Landing page editorial copy & imagery (HiTouch Luxury Charter) */

export const heroContent = {
  eyebrow: "Luxury black car service · Philadelphia & the Main Line",
  /** Rendered as stacked, tracked uppercase lines */
  headlineLines: ["Luxury experience.", "High touch standard."],
  headline: "Luxury experience. High touch standard.",
  supporting:
    "HiTouch Luxury Charter is Philadelphia private black car service and luxury transportation for executives, airports, celebrations, and private occasions—punctual, discreet, and confirmed before a chauffeur is assigned.",
  image: media.fineDiningHero,
  imageAlt: "HiTouch Sprinter and Suburban fleet lined up at dusk",
  primaryCta: { label: "Request a quote", href: "/experience-request" },
};

/** Statement band beneath the hero */
export const brandStatement = {
  eyebrow: "The HiTouch standard",
  headline: "You don't just book a vehicle. You book luxury.",
  supporting:
    "Reliability, relationships, and attention to detail—a dedicated concierge desk that owns timing, routing, and cabin staging so your evening stays composed from curb to curb.",
};

export const homeExperienceIntro = {
  eyebrow: "How we serve you",
  headline: "Tell us the occasion. We'll handle the details.",
  supporting:
    "Executive transportation, luxury experiences, and travel—private black car service and luxury transportation staged around your itinerary, not a vehicle menu.",
  viewAllLabel: "View all offerings",
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
    "Five promises shape every assignment. They are why clients stop arranging another ride and start saying \"HiTouch is handling it.\"",
};

/** Founder story — why HiTouch exists */
export const founderStory = {
  eyebrow: "Why HiTouch exists",
  headline: "Built as the answer to unreliable, impersonal transportation.",
  body: [
    "HiTouch was created after living what most travelers quietly tolerate: late pickups, generic drivers, and service that treats the trip as a transaction instead of part of the occasion.",
    "We built the opposite—Philadelphia luxury black car service and private transportation for people who protect their time and expect professionalism. Not a fleet with a phone number, but a relationship that remembers preferences, anticipates traffic and timing, and owns how you move from door to door.",
  ],
  quote: "Service is the rent we pay for our time here on Earth.",
  quoteLabel: "The HiTouch philosophy",
  image: owned.teamPortrait,
  imageAlt: "HiTouch principals with branded fleet behind them",
};

export const conciergeStatus = {
  label: "Concierge desk",
  state: "available",
  detail: "Live routing desk monitored · typical callback under 15 minutes during service hours",
};

export const homeConcierge = {
  eyebrow: "Once you're with HiTouch, you're taken care of",
  headline: "One call. Every detail handled.",
  supporting:
    "Share your itinerary through our quote questionnaire—availability is confirmed before a chauffeur is assigned. No instant online booking.",
  primaryCta: { label: "Request a quote", href: "/experience-request" },
};
