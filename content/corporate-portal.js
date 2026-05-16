/**
 * Dashboard shortcuts for corporate portal sessions (magic-link authenticated).
 * @param {{ moovsBookingUrl: string; phoneDisplay: string; phoneTel: string; email: string }} site
 */
export function corporatePortalTiles(site) {
  return [
    {
      id: "reserve",
      title: "Reserve executive travel",
      description:
        "Request live availability and confirmations through the partner booking desk.",
      href: site.moovsBookingUrl,
      external: true,
      buttonLabel: "Open booking",
    },
    {
      id: "fleet",
      title: "Review fleet classes",
      description: "Compare sedans, SUVs, and sprinters for road shows and board weeks.",
      href: "/fleet",
      external: false,
      buttonLabel: "View fleet",
    },
    {
      id: "experience",
      title: "Luxury experience intake",
      description: "Share itinerary nuance, security notes, or bespoke hospitality requests.",
      href: "/experience-request",
      external: false,
      buttonLabel: "Start questionnaire",
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
