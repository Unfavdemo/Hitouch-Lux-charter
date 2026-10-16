/**
 * Dashboard shortcuts for corporate portal sessions (magic-link authenticated).
 * @param {{ phoneDisplay: string; phoneTel: string; email: string }} site
 */
export function corporatePortalTiles(site) {
  return [
    {
      id: "quote",
      title: "Request a quote",
      description:
        "Submit itinerary details through the questionnaire. Availability is confirmed before assignment.",
      href: "/experience-request",
      external: false,
      buttonLabel: "Request a quote",
    },
    {
      id: "fleet",
      title: "Preview the fleet",
      description: "See cabin standards—HiTouch assigns the vehicle from your itinerary.",
      href: "/fleet",
      external: false,
      buttonLabel: "Preview the fleet",
    },
    {
      id: "contact",
      title: "Concierge desk",
      description: "Reach the private line or email for same-day adjustments and duty-of-care.",
      href: "/contact",
      external: false,
      buttonLabel: "Contact HiTouch",
    },
    {
      id: "phone",
      title: "Private line",
      description: `Call ${site.phoneDisplay} for live dispatch coordination.`,
      href: `tel:${site.phoneTel}`,
      external: false,
      buttonLabel: "Call now",
    },
    {
      id: "email",
      title: "Email concierge",
      description: "Ideal for procurement packets, COIs, and consolidated itinerary edits.",
      href: `mailto:${site.email}`,
      external: false,
      buttonLabel: "Send email",
    },
  ];
}
