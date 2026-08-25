import { media } from "@/content/media";

/** Landing page editorial copy & imagery (HiTouch Luxury Charter) */

export const heroContent = {
  eyebrow: "Private mobility & curated experiences · Philadelphia",
  headline: "Your time. Your experience. Your standard.",
  supporting:
    "Private mobility and curated experiences for people who expect more from how they move.",
  image: media.cityNight,
  imageAlt: "City skyline reflected on the river at dusk",
  primaryCta: { label: "Request your experience", href: "/experience-request" },
  secondaryCta: { label: "Book transportation", href: "/book" },
};

export const homeExperienceIntro = {
  eyebrow: "Private experiences",
  headline: "Tell us the occasion. We'll handle the details.",
  supporting:
    "Transportation is only the beginning. Game day, wine country, wellness, golf, dining, or something entirely your own—each with its own team, its own timing, and one person who owns all of it.",
  viewAllLabel: "All experiences",
  viewAllHref: "/experiences",
};

export const experienceJourney = {
  eyebrow: "How it works",
  headline: "One call. Every detail handled.",
  supporting:
    "You should not have to project-manage your own evening. Tell us the occasion once; we hold everything after that.",
  steps: [
    {
      id: "tell-us",
      title: "Tell us the occasion",
      body: "A call, a form, or a text. What it is, who is coming, and how you want it to feel. That is enough for us to start.",
    },
    {
      id: "we-plan",
      title: "We plan and confirm",
      body: "Vehicle, timing, reservations, and the details you did not think to mention—returned to you in writing before anything is booked.",
    },
    {
      id: "we-handle-it",
      title: "We handle it",
      body: "One chauffeur, one point of contact, and a plan that adjusts live. You are a guest, not the coordinator.",
    },
  ],
};

export const servicesBento = [
  {
    id: "game-day",
    title: "Game day",
    blurb: "Private pickup, coordinated arrival, and a chauffeur already waiting when you walk out.",
    href: "/game-day",
    image: media.arenaInterior,
    alt: "Arena bowl lit before an event",
    layout: "large",
  },
  {
    id: "executive-mobility",
    title: "Executive mobility",
    blurb: "Recurring executive travel with a working cabin, consistent chauffeurs, and billing finance accepts.",
    href: "/executive-mobility",
    image: media.boardroomView,
    alt: "Boardroom overlooking a city skyline",
    layout: "medium",
  },
  {
    id: "experiences",
    title: "Private experiences",
    blurb: "Wine country, wellness, golf, and dining—planned, booked, and paced around the occasion.",
    href: "/experiences",
    image: media.vineyardRows,
    alt: "Vineyard rows in warm afternoon light",
    layout: "medium",
  },
  {
    id: "airport",
    title: "Airport",
    blurb: "PHL, PNE, and the private terminals—flight-aware timing, meet-and-greet, and luggage handled.",
    href: "/airport",
    image: media.airport,
    alt: "Aircraft on the tarmac at golden hour",
    layout: "banner",
  },
];

export const conciergeStatus = {
  label: "Concierge desk",
  state: "available",
  detail: "Live desk monitored · typical callback under 15 minutes during service hours",
};

export const homeConcierge = {
  eyebrow: "Begin",
  headline: "Tell us the occasion. We'll handle the details.",
  supporting:
    "Share the occasion, the guest count, and the timing. We return a plan—vehicle, route, reservations, and the details you did not think to mention.",
  primaryCta: { label: "Request your experience", href: "/experience-request" },
  secondaryCta: { label: "Book transportation", href: "/book" },
  tertiaryNote: "Already know your itinerary? Reserve online for immediate scheduling.",
  tertiaryHref: null, // filled from site.moovsBookingUrl at runtime
  tertiaryLabel: "Reserve online",
};

export const membershipTeaser = {
  eyebrow: "HiTouch Private Membership",
  headline: "Transportation shouldn't be something you repeatedly arrange.",
  supporting:
    "It should already be handled. Preferred fleet access, priority booking, concierge support, member pricing, and private HiTouch experiences.",
  note: "We are also launching a limited Founding Membership—five memberships, by application.",
  primaryCta: { label: "Request membership", href: "/memberships/apply" },
  secondaryCta: { label: "Membership details", href: "/memberships" },
  image: media.handshake,
  imageAlt: "Two people shaking hands in a bright office",
};
