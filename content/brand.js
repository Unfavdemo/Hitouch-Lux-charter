/**
 * Core HiTouch brand voice — reused across the marketing site so the promise
 * reads identically on every page.
 */

export const brandPromise = {
  line: "You don't just book a vehicle. You have HiTouch.",
  supporting:
    "Reliability, relationships, access, and attention to detail. Transportation is the thread—the experience is the point.",
};

/** Short reinforcement lines rotated through sections and CTA bands. */
export const brandLines = [
  "Your plans. Our responsibility.",
  "One call. Every detail handled.",
  "For people who value their time differently.",
  "Once you're with HiTouch, you're taken care of.",
];

export const philosophyQuote = {
  quote: "Service is the rent we pay for our time here on Earth.",
  attribution: "The HiTouch philosophy",
};

export const founderStory = {
  eyebrow: "Why HiTouch",
  headline: "We built the company we could never find.",
  paragraphs: [
    "HiTouch was created after one too many experiences with transportation that was unreliable and impersonal—cars that arrived late or not at all, drivers who had no idea where they were going, and companies that treated a missed pickup as somebody else's problem.",
    "We wanted to build the opposite. A reliable network of elevated experiences for people who value their time, professionalism, and attention to detail. Not a dispatch queue. A relationship.",
    "That is why we do not think of ourselves as a car company. We are the people you call when the details have to be right—and then you stop thinking about them.",
  ],
  closingLine: "Once you're with HiTouch, you're taken care of.",
};

/** The five service promises that differentiate HiTouch. */
export const servicePromises = [
  {
    id: "we-know-you",
    title: "We know you",
    body: "We remember preferences so you never have to explain them twice. Temperature, route, music, the water you drink, the door you prefer.",
  },
  {
    id: "we-anticipate",
    title: "We anticipate",
    body: "We proactively manage timing, itinerary, and details—watching flights, traffic, and run-of-show so you are never the one adjusting.",
  },
  {
    id: "we-protect-your-time",
    title: "We protect your time",
    body: "Punctuality is fundamental, not a feature. Your schedule is the standard we are measured against.",
  },
  {
    id: "we-handle-the-details",
    title: "We handle the details",
    body: "Transportation, reservations, experiences, and special requests—coordinated through one thread instead of five phone calls.",
  },
  {
    id: "we-build-relationships",
    title: "We build relationships",
    body: "Clients are relationships, not transactions. The longer you are with us, the less you have to ask for.",
  },
];

/** The three conversions the site is built to drive. */
export const conversionPaths = [
  {
    id: "transportation",
    label: "Book transportation",
    title: "Book transportation",
    blurb: "Airport runs, executive mobility, evenings out, and point-to-point service with a chauffeur who is already briefed.",
    href: "/book",
    cta: "Book transportation",
  },
  {
    id: "membership",
    label: "Request membership",
    title: "Request membership",
    blurb: "Preferred fleet access, priority booking, and concierge support for people who move often enough to stop arranging it.",
    href: "/memberships",
    cta: "Request membership",
  },
  {
    id: "experience",
    label: "Request an experience",
    title: "Request an experience",
    blurb: "Game day, wine country, wellness, golf, dining, or something entirely your own—designed around the occasion.",
    href: "/experience-request",
    cta: "Request your experience",
  },
];

/** Visual direction notes for the photography refresh (referenced by the media library). */
export const visualDirection = [
  "Executive Sprinter and full fleet",
  "Chauffeur and client interactions",
  "Executives working from the vehicle",
  "Couples and families",
  "Game day arrivals",
  "Wine, golf, and spa experiences",
  "Concierge details",
  "Philadelphia lifestyle",
];
