import { media } from "@/content/media";

/** HiTouch Private Membership */

export const membershipHero = {
  eyebrow: "By application",
  headline: "HiTouch Private Membership",
  supporting:
    "Transportation shouldn't be something you repeatedly arrange. It should already be handled.",
  image: media.luxurySedanInterior,
  imageAlt: "Executive vehicle interior prepared for a client",
};

export const membershipIntro = {
  eyebrow: "The idea",
  headline: "Membership is a relationship, not a block of hours.",
  paragraphs: [
    "Most transportation companies sell you time. You buy a bucket of hours, you draw it down, and when it runs out you are a stranger again.",
    "Membership works differently. We learn how you move—the airports you use, the restaurants you return to, the seat you prefer, the buffer you like before a meeting—and then we stop asking. Over time you tell us less and less, and more of it is simply handled.",
  ],
};

export const membershipBenefits = [
  {
    id: "fleet",
    title: "Preferred fleet access",
    body: "First call on the executive Sprinter and preferred vehicles, including the nights and weekends when availability is tightest.",
  },
  {
    id: "priority",
    title: "Priority booking",
    body: "Member requests are placed ahead of the general queue—including same-day changes and the game nights everyone wants at once.",
  },
  {
    id: "concierge",
    title: "Concierge support",
    body: "Restaurants, tickets, spa appointments, tee times, flowers, and special requests handled through the same thread as your transportation.",
  },
  {
    id: "pricing",
    title: "Preferred member pricing",
    body: "Member rates across the fleet, with no surge, no after-hours multiplier, and monthly consolidated billing.",
  },
  {
    id: "experiences",
    title: "Access to private HiTouch experiences",
    body: "Invitations to member-only experiences and first access to seasonal itineraries before they are offered publicly.",
  },
];

export const foundingMembership = {
  eyebrow: "Founding membership",
  headline: "Five memberships. By application.",
  supporting:
    "Created for individuals, families, and organizations who want HiTouch integrated into how they move.",
  detail: [
    "Founding members help shape the program itself—the vehicles we add, the experiences we build, and the standards we hold ourselves to. In exchange, founding terms are held for the life of the membership.",
    "Applications are reviewed individually. We are looking for fit rather than volume, and we would rather serve five relationships properly than fifty adequately.",
  ],
  points: [
    "Founding rates held for the life of the membership",
    "Direct line to the founder, not a dispatch queue",
    "First access to new vehicles and experiences",
    "Input on the experiences we build next",
    "Reviewed individually—fit matters more than volume",
  ],
  cta: { label: "Request membership", href: "/memberships/apply" },
};

export const membershipTiers = [
  {
    id: "individual",
    name: "Individual",
    audience: "For one principal who moves frequently.",
    body: "Airport work, executive mobility, and evenings out, with your preferences held on file and a single point of contact.",
  },
  {
    id: "family",
    name: "Family",
    audience: "For a household with more than one calendar.",
    body: "Multiple named passengers, school and activity runs, child seats held on file, and vetted chauffeurs assigned consistently.",
  },
  {
    id: "organization",
    name: "Organization",
    audience: "For teams hosting clients and moving executives.",
    body: "Named travelers, consolidated invoicing, duty-of-care documentation, and a dedicated account lead.",
  },
];

export const membershipProcess = [
  {
    step: "Application",
    detail: "You tell us how you move today and what is not working. It takes a few minutes.",
  },
  {
    step: "Conversation",
    detail: "We call within one business day. This is a real conversation, not a sales script—we are both deciding on fit.",
  },
  {
    step: "Proposal",
    detail: "A written membership proposal with the tier, rates, and terms that match how you actually travel.",
  },
  {
    step: "Onboarding",
    detail: "We build your profile: preferences, addresses, passengers, billing, and the details you should never have to repeat.",
  },
];
