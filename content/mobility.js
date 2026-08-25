import { media } from "@/content/media";

/** Executive Mobility and Airport service pages. */

export const executiveMobility = {
  hero: {
    eyebrow: "Executive mobility",
    headline: "Your time, protected by someone whose only job is protecting it.",
    supporting:
      "Recurring executive car service for principals, deal teams, and the assistants who keep their calendars intact. One chauffeur who knows the route, the preferences, and the buffer you need before you walk into the room.",
    image: media.boardroomView,
    imageAlt: "Boardroom overlooking a city skyline",
  },
  intro: {
    eyebrow: "For people who value their time differently",
    headline: "The car should be the least interesting part of your day.",
    supporting:
      "Executive mobility is not a nicer ride to the same meeting. It is thirty minutes you get back, a call you can take in private, and the confidence that the timing is already handled.",
  },
  pillars: [
    {
      id: "consistency",
      title: "The same chauffeur",
      body: "Wherever possible we assign consistently, so your chauffeur learns the route, the building, the door, and the way you like the car before you ask.",
    },
    {
      id: "office",
      title: "A working cabin",
      body: "Wi‑Fi, power, quiet, and privacy glass. Take the call. Read the deck. Arrive having already used the time.",
    },
    {
      id: "discretion",
      title: "Discretion assumed",
      body: "Chauffeurs briefed on confidentiality. NDAs available. Nothing discussed in the cabin leaves it.",
    },
    {
      id: "punctuality",
      title: "Punctuality as the standard",
      body: "We arrive early, every time, and we build buffers into the schedule so a closed lane is not your problem.",
    },
    {
      id: "assistants",
      title: "Built for assistants",
      body: "One contact who answers, confirms in writing, and handles the change at 6:40pm without needing the background re-explained.",
    },
    {
      id: "billing",
      title: "Billing that finance accepts",
      body: "Monthly consolidated invoicing with line-item detail, NET 15 and NET 30 terms, and insurance certificates on request.",
    },
  ],
  useCases: [
    "Daily and recurring executive travel",
    "Investor road shows and multi-stop deal days",
    "Board weeks and quarterly meeting cycles",
    "Client hosting and inbound visitor programs",
    "Airport transfers for the executive team",
    "After-hours and weekend availability",
  ],
  faqs: [
    {
      question: "What is executive car service?",
      answer:
        "Executive car service is scheduled, chauffeured transportation with a vetted professional driver, a private working cabin, and a single point of contact managing the schedule. It differs from rideshare in that the vehicle and chauffeur are reserved for you, the timing is planned rather than dispatched, and the service is consistent trip to trip.",
    },
    {
      question: "How much does executive car service cost in Philadelphia?",
      answer:
        "Recurring executive travel is typically booked hourly with a minimum, or on a monthly program rate for consistent volume. Point-to-point transfers are quoted as a flat rate. Members receive preferred pricing with no surge or after-hours multiplier.",
    },
    {
      question: "Can we get the same chauffeur every time?",
      answer:
        "Wherever scheduling permits, yes—and this is one of the most requested parts of the program. A consistent chauffeur learns the buildings, the routes, the preferences, and the rhythm of the calendar.",
    },
    {
      question: "Do you work with executive assistants?",
      answer:
        "Constantly. Assistants are our most frequent point of contact. You get one person who answers, confirms every booking in writing, and handles late changes without needing the situation re-explained.",
    },
    {
      question: "Do you provide insurance certificates and duty-of-care documentation?",
      answer:
        "Yes. Certificates of insurance, vehicle maintenance records, and chauffeur vetting documentation are available for procurement and risk teams on request.",
    },
  ],
  searchTerms: [
    "Philadelphia executive car service",
    "corporate car service Philadelphia",
    "executive chauffeur Philadelphia",
    "business car service Main Line",
  ],
};

export const airportService = {
  hero: {
    eyebrow: "Airport",
    headline: "Flight-aware arrivals and departures.",
    supporting:
      "PHL, PNE, Trenton-Mercer, and the private terminals—monitored against your actual flight, not your scheduled one. Meet-and-greet inside, luggage handled, and a vehicle already waiting when you clear.",
    image: media.airport,
    imageAlt: "Aircraft on the tarmac at golden hour",
  },
  intro: {
    eyebrow: "Arrival & departure",
    headline: "The two most stressful parts of a trip, taken off your list.",
    supporting:
      "We watch the flight. If you land early, we are early. If you sit on the tarmac for fifty minutes, nothing changes for you and nothing changes on your bill.",
  },
  airports: [
    {
      code: "PHL",
      name: "Philadelphia International",
      detail: "All terminals, domestic and international. Curbside or inside meet-and-greet at baggage claim with a name board.",
    },
    {
      code: "PNE",
      name: "Northeast Philadelphia",
      detail: "General aviation and private terminals with tarmac-adjacent access where the FBO permits.",
    },
    {
      code: "TTN",
      name: "Trenton-Mercer",
      detail: "Short-haul commercial service, with routing planned around the Route 1 corridor.",
    },
    {
      code: "EWR / JFK / BWI",
      name: "Regional connections",
      detail: "Long-distance transfers to Newark, JFK, LaGuardia, Baltimore, and Dulles when the flight you need is not out of Philadelphia.",
    },
  ],
  pillars: [
    {
      id: "flight-tracking",
      title: "Live flight monitoring",
      body: "We track your inbound flight and adjust the pickup automatically. Early, late, or diverted—the vehicle moves with the aircraft.",
    },
    {
      id: "meet-greet",
      title: "Meet-and-greet inside",
      body: "Your chauffeur meets you at baggage claim with a name board and handles the bags from there. Curbside if you prefer speed.",
    },
    {
      id: "wait-time",
      title: "Generous included wait time",
      body: "Complimentary wait built into every arrival, so customs, a slow carousel, or a gate change does not become a line item.",
    },
    {
      id: "fbo",
      title: "Private aviation",
      body: "FBO coordination at PNE and regional fields, with tarmac-adjacent pickup where the operator allows it.",
    },
    {
      id: "departures",
      title: "Departure buffers",
      body: "We build the departure backward from your gate time using the actual security wait, not an optimistic guess.",
    },
    {
      id: "families",
      title: "Families and luggage",
      body: "Child seats installed at no charge, and a vehicle assigned to your luggage volume rather than your headcount.",
    },
  ],
  faqs: [
    {
      question: "Do you track my flight?",
      answer:
        "Yes. Every airport reservation is monitored against live flight data. If you land forty minutes early or two hours late, we adjust automatically and you do not need to call us.",
    },
    {
      question: "How much wait time is included after landing?",
      answer:
        "Complimentary wait time is included on every arrival, measured from actual touchdown rather than the scheduled time. International arrivals receive a longer window for customs.",
    },
    {
      question: "Will my driver meet me inside the terminal?",
      answer:
        "If you would like. Meet-and-greet at baggage claim with a name board is included on request, and your chauffeur handles the luggage from there. Curbside pickup is available if you prefer to move faster.",
    },
    {
      question: "Do you serve private terminals and FBOs?",
      answer:
        "Yes. We coordinate with FBOs at Northeast Philadelphia and regional fields, including tarmac-adjacent pickup where the operator permits it.",
    },
    {
      question: "Can you handle transfers to Newark, JFK, or BWI?",
      answer:
        "Yes. Long-distance airport transfers to Newark, JFK, LaGuardia, Baltimore, and Dulles are quoted as a flat rate and are frequently more comfortable than connecting through Philadelphia.",
    },
  ],
  searchTerms: [
    "PHL airport car service",
    "Philadelphia airport private transportation",
    "PHL black car service",
    "private jet FBO transportation Philadelphia",
  ],
};
