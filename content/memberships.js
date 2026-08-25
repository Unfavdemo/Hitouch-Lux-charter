import { media } from "@/content/media";

/** HiTouch Private Membership — relationship-driven, not transactional. */

export const membershipHero = {
  eyebrow: "HiTouch Private Membership",
  headline: "Transportation shouldn't be something you repeatedly arrange.",
  supporting:
    "It should already be handled. Membership places HiTouch inside how you move—one relationship, one standard, and a team that already knows your preferences.",
  image: media.sprinterInterior,
  imageAlt: "Executive Sprinter cabin staged with ambient lighting",
  cta: { label: "Request Membership", href: "#apply" },
};

export const membershipBenefits = [
  {
    id: "fleet",
    title: "Preferred fleet access",
    body: "First position on the vehicles you prefer—including the Executive Sprinter—before general availability.",
  },
  {
    id: "priority",
    title: "Priority booking",
    body: "Peak dates, game days, and holidays held for members first. Short-notice requests moved to the front of the line.",
  },
  {
    id: "concierge",
    title: "Concierge support",
    body: "A direct line to HiTouch Concierge for reservations, tickets, and special requests—well beyond the vehicle.",
  },
  {
    id: "pricing",
    title: "Preferred member pricing",
    body: "Member rates across transportation and experiences, with transparent billing and no surge pricing—ever.",
  },
  {
    id: "experiences",
    title: "Access to private HiTouch experiences",
    body: "Invitations to member-only experiences and first access to new Game Day, Escape, and Signature offerings.",
  },
];

export const foundingMembership = {
  eyebrow: "Founding Membership",
  headline: "Five memberships. By application.",
  supporting:
    "Created for individuals, families, and organizations who want HiTouch integrated into how they move. Founding Members shape the standard everyone else joins later—with terms and access that will not be offered again.",
  note: "Applications are reviewed personally. We respond to every applicant within 48 hours.",
};

export const membershipPhilosophy = {
  quote: "Once you're with HiTouch, you're taken care of.",
  body: "Membership is a relationship, not a subscription. We learn your preferences, protect your time, and treat your plans as our responsibility.",
};
