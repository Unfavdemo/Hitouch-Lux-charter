import { media } from "@/content/media";

/** High Touch Private Membership — convenience and priority access. */

export const membershipHero = {
  eyebrow: "High Touch Private Membership",
  headline: "Priority access. Convenience at your fingertips.",
  supporting:
    "Skip repeating the full quote form every time. Members get a direct line, remembered preferences, and priority staging when you need to move.",
  image: media.sprinterInterior,
  imageAlt: "Guests in the Executive Sprinter cabin with ambient LED lighting",
  cta: { label: "Apply for membership", href: "#apply" },
};

export const membershipBenefits = [
  {
    id: "priority",
    title: "Priority access",
    body: "Peak dates and short-notice requests move to the front of the line—without starting from a blank form.",
  },
  {
    id: "convenience",
    title: "Convenience at your fingertips",
    body: "One relationship that already knows your preferences, addresses, and how you like to travel.",
  },
  {
    id: "concierge",
    title: "Direct concierge line",
    body: "Call or message for private transportation, airport runs, and special requests—handled end to end.",
  },
];

export const foundingMembership = {
  eyebrow: "Founding Membership",
  headline: "Limited founding seats. By application.",
  supporting:
    "For clients who want HiTouch as their default private transportation—priority access and member rates that stay with you.",
  note: "We respond to every applicant within 48 hours.",
};

export const membershipPhilosophy = {
  quote: "Once you're with HiTouch, you're taken care of.",
  body: "Membership is built for convenience—not exclusivity theater. We learn how you move so every trip starts faster.",
};
