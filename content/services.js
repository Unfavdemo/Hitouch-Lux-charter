export const services = [
  {
    id: "hourly",
    name: "Hourly charter",
    headline: "Discreet mobility on your schedule",
    description:
      "Retain a chauffeur and vehicle for flexible itineraries, multi-stop days, and board-ready punctuality.",
    idealFor: ["Executive days", "Retail & gallery circuits", "Evening plans"],
  },
  {
    id: "point-to-point",
    name: "Point-to-point",
    headline: "Door-to-door, precisely timed",
    description:
      "Single-leg routing with white-glove arrival standards and proactive traffic intelligence.",
    idealFor: ["Galas", "Private dining", "Inter-city transfers"],
  },
  {
    id: "airport",
    name: "Airport transfer",
    headline: "PHL, PNE, and FBO coordination",
    description:
      "Curbside or tarmac-adjacent meet standards with luggage stewardship and flight monitoring.",
    idealFor: ["Commercial terminals", "Private aviation", "VIP arrivals"],
  },
  {
    id: "corporate-vip",
    name: "Corporate VIP",
    headline: "Recurring executive travel profiles",
    description:
      "Structured for road-show tempo, NDAs-minded discretion, and consolidated monthly invoicing.",
    idealFor: ["C-suite calendars", "Board weeks", "Investor roadshows"],
  },
  {
    id: "weddings",
    name: "Weddings",
    headline: "Ceremony-to-reception choreography",
    description:
      "Timeline-aware routing for couples, family, and wedding-party movements with photographic pauses.",
    idealFor: ["Bridal party", "Guest shuttles", "Send-off departures"],
  },
  {
    id: "wine-tours",
    name: "Wine tours",
    headline: "Leisure at cellar-door pace",
    description:
      "Spacious cabins, climate control, and curated refreshment staging for Brandywine and Bucks County itineraries.",
    idealFor: ["Weekend escapes", "Anniversaries", "Client hospitality"],
  },
];

export function getServiceById(id) {
  return services.find((s) => s.id === id);
}
