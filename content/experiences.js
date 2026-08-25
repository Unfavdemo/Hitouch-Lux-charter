import { media } from "@/content/media";

/**
 * Experience catalog.
 *
 * Every experience gets its own landing page and inquiry form so search and
 * answer engines have a distinct URL per intent. Game Day experiences are
 * canonicalized under /game-day/<slug>; everything else under /experiences/<slug>.
 */

export const experiencesHero = {
  eyebrow: "Private experiences · Philadelphia & tri-state",
  headline: "Tell us the occasion. We'll handle the details.",
  supporting:
    "Transportation is only the beginning. Game day, wine country, wellness, golf, dining, or something entirely your own—designed around you and run by one team from first pickup to final door.",
};

export const experiencesIntro = {
  primary: "Tell us the occasion. We'll handle the details.",
  secondary: "Transportation is only the beginning.",
};

export const featuredSprinter = {
  title: "The executive Sprinter",
  blurb:
    "A private cabin for the group that wants to arrive together—partition-ready, Wi‑Fi enabled, climate-zoned, and staged to your preferences before you step in.",
  image: media.sprinterInterior,
  alt: "Executive Sprinter interior with ambient lighting and lounge seating",
};

export const experienceCategories = [
  {
    id: "game-day",
    slug: "game-day",
    name: "Game Day",
    displayName: "GAME DAY",
    basePath: "/game-day",
    hubPath: "/game-day",
    tagline: "The game starts before tipoff.",
    blurb:
      "Private pickup, a curated vehicle experience, a coordinated arrival, and dedicated return transportation. No parking, no surge pricing, no searching for your driver after the final whistle.",
    image: media.arenaInterior,
    imageAlt: "Arena bowl lit before an event",
  },
  {
    id: "escape",
    slug: "escape",
    name: "Escape",
    displayName: "ESCAPE",
    basePath: "/experiences",
    hubPath: "/experiences#escape",
    tagline: "Leave on time. Come back unhurried.",
    blurb:
      "Wine country, the Hamptons, and weekend getaways with the driving, the timing, and the reservations already handled before you pull away from the curb.",
    image: media.vineyardRows,
    imageAlt: "Vineyard rows in late afternoon light",
  },
  {
    id: "wellness",
    slug: "wellness",
    name: "Wellness",
    displayName: "WELLNESS",
    basePath: "/experiences",
    hubPath: "/experiences#wellness",
    tagline: "Recovery that starts in the car.",
    blurb:
      "Private spa days, couples wellness, and group retreats—booked, timed, and paced so the treatment is the only thing on your mind.",
    image: media.hotStoneMassage,
    imageAlt: "Calm spa treatment room prepared for a guest",
  },
  {
    id: "leisure",
    slug: "leisure",
    name: "Leisure",
    displayName: "LEISURE",
    basePath: "/experiences",
    hubPath: "/experiences#leisure",
    tagline: "The good parts, without the logistics.",
    blurb:
      "Golf, fine dining, and date nights—tee times, tables, and timing coordinated so you arrive relaxed and leave whenever you're ready.",
    image: media.golfSwing,
    imageAlt: "Golfer mid-swing on a fairway at sunrise",
  },
  {
    id: "signature",
    slug: "signature",
    name: "Signature",
    displayName: "SIGNATURE",
    basePath: "/experiences",
    hubPath: "/experiences#signature",
    tagline: "Completely yours.",
    blurb:
      "Completely customized experiences designed around the client. If you can describe how you want the day to feel, we can build it.",
    image: media.champagnePour,
    imageAlt: "Sparkling wine poured into a chilled glass",
  },
];

/** Shared disclaimer for team-adjacent pages. */
export const teamAffiliationDisclaimer =
  "HiTouch Luxury Charter is an independent private transportation and experience company. We are not affiliated with, endorsed by, or an official partner of any professional sports team, league, or venue. Team names are used only to describe the destination of the transportation we provide.";

const experienceList = [
  // ── GAME DAY ────────────────────────────────────────────────────────────
  {
    id: "sixers-game-day",
    slug: "sixers-private-game-day",
    categoryId: "game-day",
    title: "Sixers Private Game Day",
    shortTitle: "Sixers",
    h1: "Sixers private game day transportation",
    eyebrow: "Game day · Basketball",
    tagline:
      "Private pickup, a staged cabin, and a chauffeur waiting where you left him—for every home game of the season.",
    seoTitle: "Sixers private game day transportation in Philadelphia",
    seoDescription:
      "Private Sixers game transportation in Philadelphia. Door-to-door pickup, a staged cabin, coordinated arrival at the arena, and a dedicated chauffeur for the return. No parking, no surge pricing.",
    image: media.basketballDunk,
    imageAlt: "Basketball player rising toward the rim during a night game",
    status: "live",
    intro: [
      "Basketball nights in South Philadelphia are a logistics problem disguised as an evening out. Lot traffic, a walk in the cold, a surge-priced ride home that takes forty minutes to find you.",
      "We take all of it. One chauffeur, one vehicle, one point of contact from your front door to your seat and back again.",
    ],
    highlights: [
      {
        title: "Pickup on your schedule",
        body: "We build the pickup time backward from tipoff, accounting for traffic patterns on game nights—not a generic estimate.",
      },
      {
        title: "A cabin staged for the night",
        body: "Chilled water and refreshments, climate set before you get in, and the game on if you want it. Tell us once and we remember.",
      },
      {
        title: "Coordinated arrival",
        body: "We drop as close to your entrance as access allows, so the walk from the vehicle to your seat is short and dry.",
      },
      {
        title: "Your driver is already waiting",
        body: "No app, no surge, no standing on a corner. Your chauffeur texts you a staging location before the fourth quarter ends.",
      },
    ],
    included: [
      "Round-trip private chauffeur service from your home, office, or hotel",
      "Executive sedan, SUV, or Sprinter based on your group size",
      "Pre-game route planning around event-night road closures",
      "In-cabin refreshments staged to your preferences",
      "Dedicated post-game staging location shared by text",
      "One point of contact for the entire evening",
    ],
    itinerary: [
      { label: "Two days before", detail: "We confirm pickup time, guest count, vehicle, and any pre- or post-game stops." },
      { label: "Pickup", detail: "Chauffeur arrives early, cabin already at temperature, refreshments staged." },
      { label: "Arrival", detail: "Drop as close to your entrance as access allows, with a photo of the return staging point." },
      { label: "Post-game", detail: "Your chauffeur is in position before the buzzer. You walk out and get in." },
      { label: "Optional after", detail: "Dinner, drinks, or a second stop—arranged in advance or called in from the car." },
    ],
    conciergeAddOns: [
      "Game tickets sourced through the secondary market",
      "Pre-game dinner reservations",
      "Post-game drinks or late-night dining",
      "Group coordination across multiple vehicles",
    ],
    faqs: [
      {
        question: "Do you provide Sixers tickets?",
        answer:
          "We can source tickets through the secondary market as a concierge service. HiTouch is not a ticket agency and is not affiliated with the team; tickets are purchased on your behalf and billed at cost plus a coordination fee.",
      },
      {
        question: "How much does private Sixers game transportation cost?",
        answer:
          "Pricing depends on vehicle class, pickup location, and whether you retain the chauffeur for the full evening or book round-trip only. Most game-night reservations are booked hourly with a minimum. Send us your details and we return a firm quote.",
      },
      {
        question: "Where does my driver pick me up after the game?",
        answer:
          "Your chauffeur sends a staging location and photo before the game ends. It is a consistent, easy-to-find point outside the event traffic pattern—you will not be searching for a license plate in a crowd.",
      },
      {
        question: "Can you handle a group?",
        answer:
          "Yes. An executive Sprinter keeps a group of up to fourteen together, and we run multiple vehicles in convoy for larger parties with a single coordinator managing all of them.",
      },
    ],
    searchTerms: [
      "Sixers private transportation",
      "Sixers game transportation Philadelphia",
      "private car service Sixers game",
      "76ers game day car service",
    ],
    related: ["flyers-game-night", "phillies-night-out", "fine-dining"],
  },
  {
    id: "eagles-sunday",
    slug: "eagles-sunday-experience",
    categoryId: "game-day",
    title: "Eagles Sunday Experience",
    shortTitle: "Eagles",
    h1: "Eagles Sunday private transportation",
    eyebrow: "Game day · Football",
    tagline:
      "Tailgate to kickoff to the drive home—one vehicle, one chauffeur, and nobody in your group has to stay sober for it.",
    seoTitle: "Eagles game transportation & tailgate car service in Philadelphia",
    seoDescription:
      "Private Eagles game transportation in Philadelphia. Tailgate-friendly Sprinters, coordinated arrival, and a dedicated chauffeur for the ride home. No parking pass, no surge pricing, no designated driver.",
    image: media.footballField,
    imageAlt: "Football resting on the yard line of a lit field",
    status: "live",
    intro: [
      "Sunday football is an all-day commitment. Lot passes, an early start, a long afternoon, and a drive home that somebody in your group has to stay sober for.",
      "We make the vehicle part of the day instead of the price of admission—and everyone in your party gets to enjoy it the same way.",
    ],
    highlights: [
      {
        title: "Built for the full day",
        body: "Early pickup, tailgate window, kickoff, and a return whenever your group is actually ready to leave.",
      },
      {
        title: "Tailgate-capable Sprinters",
        body: "Room for coolers, chairs, and gear—plus a warm, dry place to sit when the weather turns. It usually turns.",
      },
      {
        title: "No designated driver",
        body: "Everyone in the party gets the same Sunday. Your chauffeur handles the rest.",
      },
      {
        title: "A return that actually works",
        body: "Your chauffeur stages outside the lot exit crush and texts you the location before the two-minute warning.",
      },
    ],
    included: [
      "Round-trip private chauffeur service for the full game day",
      "Sprinter, SUV, or sedan based on group size and gear",
      "Cargo capacity for tailgate equipment and coolers",
      "Route planning around Sunday lot and highway closures",
      "Heated, dry cabin available throughout the tailgate window",
      "Dedicated post-game staging outside the exit traffic",
    ],
    itinerary: [
      { label: "The week before", detail: "We confirm kickoff time, tailgate plans, group size, and gear volume." },
      { label: "Morning pickup", detail: "Chauffeur arrives with cargo space ready and the cabin warm." },
      { label: "Tailgate", detail: "Vehicle stays accessible as your basecamp for the pre-game window." },
      { label: "Kickoff", detail: "Short walk to your gate, with the return staging point confirmed before you go in." },
      { label: "Post-game", detail: "Chauffeur is positioned clear of the lot exits. You walk to the vehicle and go." },
    ],
    conciergeAddOns: [
      "Tickets sourced through the secondary market",
      "Catering and tailgate provisioning",
      "Post-game dinner reservations",
      "Multi-vehicle coordination for large groups",
    ],
    faqs: [
      {
        question: "Can the vehicle stay with us during the tailgate?",
        answer:
          "Yes, subject to lot rules and the pass you hold. Where lot access allows, the vehicle stays with your group as a basecamp. Where it does not, your chauffeur stages nearby and returns on request.",
      },
      {
        question: "Do we need a parking pass?",
        answer:
          "For drop-off and pickup, no. If you want the vehicle to remain in the lot for the tailgate, a pass is required and we can help arrange one as a concierge service.",
      },
      {
        question: "How many people fit?",
        answer:
          "An executive SUV seats up to six comfortably with gear. An executive Sprinter carries up to fourteen with room for coolers and chairs. Larger groups run multiple vehicles under one coordinator.",
      },
      {
        question: "What happens if the game runs long?",
        answer:
          "Nothing. Overtime, weather delays, and a slow walk out are expected. Your chauffeur waits. We bill by the hour and confirm the overage with you rather than surprising you.",
      },
    ],
    searchTerms: [
      "Eagles game transportation",
      "Eagles tailgate transportation Philadelphia",
      "private car service Eagles game",
      "Philadelphia football game day car service",
    ],
    related: ["sixers-private-game-day", "phillies-night-out", "golf-experiences"],
  },
  {
    id: "phillies-night-out",
    slug: "phillies-night-out",
    categoryId: "game-day",
    title: "Phillies Night Out",
    shortTitle: "Phillies",
    h1: "Phillies night out private transportation",
    eyebrow: "Game day · Baseball",
    tagline:
      "Dinner, first pitch, and a ride home that is already outside—summer evenings without the parking lot.",
    seoTitle: "Phillies game transportation & night out car service in Philadelphia",
    seoDescription:
      "Private Phillies game transportation in Philadelphia. Dinner reservations, coordinated ballpark arrival, and a dedicated chauffeur for the ride home. No parking, no surge pricing, no waiting.",
    image: media.ballparkAerial,
    imageAlt: "Aerial view of a full ballpark during an evening game",
    status: "live",
    intro: [
      "Baseball is a long, slow, wonderful evening. It should not begin with a parking lot and end with a forty-minute wait for a rideshare.",
      "We build the night around the game: dinner before if you want it, a short walk in, and a chauffeur already in position when you decide it is time to go.",
    ],
    highlights: [
      {
        title: "Dinner first, if you like",
        body: "We coordinate the reservation, time the courses to first pitch, and move you between the two without rushing either.",
      },
      {
        title: "Client-friendly evenings",
        body: "A ballgame is one of the best rooms in business. We make the transportation invisible so the conversation isn't.",
      },
      {
        title: "Families welcome",
        body: "Car seats, extra space for a stroller, and a chauffeur who understands that leaving in the seventh is sometimes the right call.",
      },
      {
        title: "Leave when you want",
        body: "Ninth inning or seventh—your chauffeur is staged and ready either way.",
      },
    ],
    included: [
      "Round-trip private chauffeur service",
      "Executive sedan, SUV, or Sprinter",
      "Optional pre-game dinner coordination",
      "Ballpark arrival timed to first pitch",
      "Child seats on request at no additional charge",
      "Dedicated post-game staging point shared by text",
    ],
    itinerary: [
      { label: "Booking", detail: "We confirm first pitch, dinner plans, guest count, and any child seats." },
      { label: "Pickup", detail: "Chauffeur arrives ahead of schedule with the cabin ready." },
      { label: "Dinner", detail: "Optional reservation, timed so you are seated in your seats before the anthem." },
      { label: "Ballpark", detail: "Drop close to your gate; return staging point sent by text." },
      { label: "Departure", detail: "Leave in the ninth or the seventh. The vehicle is there either way." },
    ],
    conciergeAddOns: [
      "Tickets sourced through the secondary market",
      "Pre-game or post-game dinner reservations",
      "Birthday and celebration staging in the vehicle",
      "Corporate client hosting coordination",
    ],
    faqs: [
      {
        question: "Can you arrange dinner before the game?",
        answer:
          "Yes. Our concierge desk books the table and times the reservation against first pitch so you are not rushing dessert. Tell us the neighborhood or let us recommend.",
      },
      {
        question: "Is this suitable for a family with young children?",
        answer:
          "Yes. We provide properly installed child seats at no additional charge and give you the space for strollers and bags. Leaving early is expected and never a problem.",
      },
      {
        question: "Do you handle corporate client hosting at games?",
        answer:
          "Frequently. We coordinate multiple pickups across the city, consolidate everyone at the ballpark, and return each guest individually. Billing runs through your corporate account.",
      },
      {
        question: "What if the game goes into extra innings or rain delay?",
        answer:
          "Your chauffeur waits. Baseball has no clock and we plan for that. Hourly overage is confirmed with you rather than applied silently.",
      },
    ],
    searchTerms: [
      "Phillies game transportation",
      "Phillies private car service",
      "Philadelphia baseball game transportation",
      "ballpark car service Philadelphia",
    ],
    related: ["sixers-private-game-day", "fine-dining", "date-nights"],
  },
  {
    id: "flyers-game-night",
    slug: "flyers-game-night",
    categoryId: "game-day",
    title: "Flyers Game Night",
    shortTitle: "Flyers",
    h1: "Flyers game night private transportation",
    eyebrow: "Game day · Hockey",
    tagline:
      "Warm car, short walk, and a chauffeur in position before the third period ends. Winter hockey, handled.",
    seoTitle: "Flyers game transportation & hockey night car service in Philadelphia",
    seoDescription:
      "Private Flyers game transportation in Philadelphia. Warm door-to-door pickup, coordinated arena arrival, and a dedicated chauffeur waiting after the final horn. No parking, no cold walk, no surge pricing.",
    image: media.hockeyAction,
    imageAlt: "Hockey players competing for the puck during a night game",
    status: "live",
    intro: [
      "Hockey season is January in Philadelphia. The walk from a distant lot is the worst part of an otherwise great night.",
      "We shorten the walk to almost nothing on both ends, and the cabin is warm when you get back in.",
    ],
    highlights: [
      {
        title: "Warm on both ends",
        body: "Cabin pre-heated for pickup and pre-heated again before you walk out. It matters more than it sounds.",
      },
      {
        title: "The shortest possible walk",
        body: "We drop as close to your entrance as access allows and stage the return the same way.",
      },
      {
        title: "Weeknight timing",
        body: "Most hockey is a school night. We build the schedule so you get home at a reasonable hour without leaving early.",
      },
      {
        title: "Ready before the horn",
        body: "Your chauffeur is in position and texts you the location during the third period.",
      },
    ],
    included: [
      "Round-trip private chauffeur service",
      "Executive sedan, SUV, or Sprinter",
      "Pre-heated cabin at pickup and at return",
      "Route planning around winter conditions and event traffic",
      "Dedicated post-game staging location",
      "One point of contact for the evening",
    ],
    itinerary: [
      { label: "Booking", detail: "We confirm puck drop, pickup point, guest count, and any pre-game stops." },
      { label: "Pickup", detail: "Chauffeur arrives early with the cabin already warm." },
      { label: "Arrival", detail: "Drop close to your entrance; return staging point sent by text." },
      { label: "Third period", detail: "Chauffeur repositions and pre-heats the cabin." },
      { label: "Final horn", detail: "Short walk, warm car, straight home." },
    ],
    conciergeAddOns: [
      "Tickets sourced through the secondary market",
      "Pre-game dinner reservations",
      "Post-game drinks",
      "Group coordination across multiple vehicles",
    ],
    faqs: [
      {
        question: "How early should we be picked up?",
        answer:
          "We generally recommend arriving thirty to forty-five minutes before puck drop, and we build the pickup time backward from there using game-night traffic patterns rather than a generic estimate.",
      },
      {
        question: "Can you take a group to a weeknight game?",
        answer:
          "Yes. An executive Sprinter keeps a group of up to fourteen together, which is usually faster and warmer than several separate vehicles on a January weeknight.",
      },
      {
        question: "What if we want to stop for dinner or drinks?",
        answer:
          "Tell us in advance or call it in from the car. We book the reservation and adjust the evening's timing around it.",
      },
      {
        question: "Are you affiliated with the team?",
        answer:
          "No. HiTouch is an independent private transportation company. We are not affiliated with, endorsed by, or an official partner of any team, league, or venue.",
      },
    ],
    searchTerms: [
      "Flyers game transportation",
      "Flyers private car service Philadelphia",
      "Philadelphia hockey game transportation",
      "arena car service Philadelphia",
    ],
    related: ["sixers-private-game-day", "eagles-sunday-experience", "fine-dining"],
  },

  // ── ESCAPE ──────────────────────────────────────────────────────────────
  {
    id: "wine-country",
    slug: "philadelphia-wine-country-tours",
    categoryId: "escape",
    title: "Wine Country",
    shortTitle: "Wine Country",
    h1: "Philadelphia luxury wine tours",
    eyebrow: "Escape · Wine country",
    tagline:
      "Brandywine, Bucks County, and the Delaware Valley—tastings booked, routes paced, and nobody counting their pours.",
    seoTitle: "Philadelphia luxury wine tours & private winery transportation",
    seoDescription:
      "Private luxury wine tours from Philadelphia through Brandywine Valley, Bucks County, and the Delaware Valley. Tastings booked in advance, chauffeured Sprinters, and case storage for the ride home.",
    image: media.vineyardRows,
    imageAlt: "Rows of vines running toward the horizon in warm light",
    status: "live",
    intro: [
      "A good tasting day is about pace. Too many stops and it becomes a chore; too few and you have driven an hour for one glass.",
      "We build the route, book the tastings, hold the timing, and carry the cases home. You taste. That is the whole job.",
    ],
    highlights: [
      {
        title: "Tastings booked in advance",
        body: "Reserved flights and seated tastings at the estates you want—not whatever has a table when you walk in.",
      },
      {
        title: "A route that breathes",
        body: "Usually three or four estates with a real lunch in the middle. We pace it so the last stop is as good as the first.",
      },
      {
        title: "Cases come home with you",
        body: "Climate-conscious cargo space and case handling, so what you buy arrives in the same condition it left.",
      },
      {
        title: "Everyone participates",
        body: "No designated driver, no half-pours, no one watching the clock.",
      },
    ],
    included: [
      "Full-day chauffeured service with an executive SUV or Sprinter",
      "Tasting reservations at three to four estates",
      "Curated route through Brandywine Valley, Bucks County, or the Delaware Valley",
      "Lunch reservation coordinated mid-route",
      "Chilled water and refreshments between stops",
      "Case storage and handling for the return",
    ],
    itinerary: [
      { label: "Before the day", detail: "We agree on region, estate preferences, group size, and dietary needs." },
      { label: "Morning pickup", detail: "Depart with the full itinerary confirmed and printed for the cabin." },
      { label: "First tastings", detail: "Two estates, seated and reserved, with time to actually talk to the pourer." },
      { label: "Lunch", detail: "A real seated lunch—the difference between a tasting day and a long afternoon." },
      { label: "Afternoon", detail: "One or two more estates, paced to how the group is feeling." },
      { label: "Return", detail: "Cases loaded and secured; quiet cabin home." },
    ],
    conciergeAddOns: [
      "Private barrel-room or cellar tastings",
      "Winemaker meet-and-greets where available",
      "Picnic provisioning for estate grounds",
      "Overnight stays in the region",
    ],
    faqs: [
      {
        question: "Which wine regions do you cover from Philadelphia?",
        answer:
          "Brandywine Valley in Chester County, Bucks County, the Lehigh Valley, and southern New Jersey are all comfortable day trips. Longer runs to the Finger Lakes or Virginia are arranged as overnight itineraries.",
      },
      {
        question: "How long is a typical wine tour day?",
        answer:
          "Most are seven to nine hours door to door, covering three or four estates with a seated lunch. We can compress to a half day or extend into an overnight.",
      },
      {
        question: "Do you book the tastings for us?",
        answer:
          "Yes. Our concierge desk reserves each tasting in advance, which matters on weekends when estates fill. You are expected and seated rather than queuing at a bar.",
      },
      {
        question: "What size group can you take?",
        answer:
          "Two people in a sedan up to fourteen in an executive Sprinter. Beyond that we run multiple vehicles with one coordinator holding the itinerary together.",
      },
      {
        question: "Can we bring cases home?",
        answer:
          "Yes. We plan cargo space for it and handle the loading. For larger purchases we coordinate shipping directly with the estate.",
      },
    ],
    searchTerms: [
      "Philadelphia luxury wine tours",
      "Brandywine Valley wine tour transportation",
      "Bucks County winery tour car service",
      "private wine tour Philadelphia",
    ],
    related: ["weekend-getaways", "private-spa-days", "fine-dining"],
  },
  {
    id: "hamptons",
    slug: "hamptons-getaway",
    categoryId: "escape",
    title: "Hamptons",
    shortTitle: "Hamptons",
    h1: "Private Hamptons transportation from Philadelphia",
    eyebrow: "Escape · Coastal",
    tagline:
      "Door to door, Philadelphia to the East End, without the Friday jitney or an airport in the middle.",
    seoTitle: "Private Hamptons car service from Philadelphia",
    seoDescription:
      "Private chauffeured transportation from Philadelphia and the Main Line to the Hamptons. Door-to-door long-distance service, luggage handling, and on-island availability for the weekend.",
    image: media.beachSunset,
    imageAlt: "Quiet coastline at sunset with gentle surf",
    status: "by-request",
    intro: [
      "The Hamptons are five hours and three bad decisions away: the jitney, the ferry queue, or a short flight that costs you the whole afternoon anyway.",
      "We drive it. Door to door, one vehicle, your luggage handled at both ends, and the option to keep a chauffeur available once you are there.",
    ],
    highlights: [
      {
        title: "Door to door",
        body: "Your driveway in Philadelphia or on the Main Line to the house on the East End. No transfers, no terminals.",
      },
      {
        title: "The drive is usable",
        body: "Wi‑Fi, power, a workspace, and a quiet cabin. Five hours becomes a productive afternoon or a long nap.",
      },
      {
        title: "Luggage handled",
        body: "Loaded, secured, and carried in. Golf clubs, dogs, and a summer's worth of bags are all expected.",
      },
      {
        title: "Available on-island",
        body: "Retain a chauffeur for the weekend for dinners, beach clubs, and the return leg on your own schedule.",
      },
    ],
    included: [
      "Long-distance chauffeured service, Philadelphia region to the East End",
      "Executive SUV or Sprinter with luggage capacity",
      "Wi‑Fi, power, and a quiet working cabin",
      "Route and rest-stop planning around summer Friday traffic",
      "Luggage handling at both ends",
      "Optional on-island chauffeur availability for the stay",
    ],
    itinerary: [
      { label: "Planning", detail: "We confirm departure window, luggage volume, passengers, pets, and the return." },
      { label: "Departure", detail: "Pickup at your door with the cabin set up for the drive." },
      { label: "The drive", detail: "Direct route with planned stops, adjusted live for summer traffic." },
      { label: "Arrival", detail: "Luggage carried in; on-island vehicle availability confirmed if retained." },
      { label: "Return", detail: "Departure on your schedule, not the jitney's." },
    ],
    conciergeAddOns: [
      "Restaurant and beach club reservations",
      "Provisioning delivered to the house before arrival",
      "Golf tee times on the East End",
      "Chauffeur retained on-island for the weekend",
    ],
    faqs: [
      {
        question: "How long is the drive from Philadelphia to the Hamptons?",
        answer:
          "Typically five to six and a half hours depending on the crossing and the day. We plan departures around summer Friday traffic and adjust the route live.",
      },
      {
        question: "Can the chauffeur stay for the weekend?",
        answer:
          "Yes. On-island availability is arranged in advance and billed as a daily retainer. It is the difference between arriving in the Hamptons and having transportation in the Hamptons.",
      },
      {
        question: "Do you take pets?",
        answer:
          "Yes, with advance notice so we assign an appropriate vehicle and prepare the cabin.",
      },
      {
        question: "Is this cheaper than flying?",
        answer:
          "Against a private charter, usually. Against a commercial connection, it is competitive once you count the transfers on both ends—and it is door to door with your luggage never leaving the vehicle.",
      },
    ],
    searchTerms: [
      "Hamptons car service from Philadelphia",
      "private transportation to the Hamptons",
      "long distance car service Philadelphia",
      "Philadelphia to Hamptons chauffeur",
    ],
    related: ["weekend-getaways", "philadelphia-wine-country-tours", "signature-experiences"],
  },
  {
    id: "weekend-getaways",
    slug: "weekend-getaways",
    categoryId: "escape",
    title: "Weekend Getaways",
    shortTitle: "Weekend Getaways",
    h1: "Private weekend getaway transportation",
    eyebrow: "Escape · Weekends",
    tagline:
      "Cape May, the Poconos, the Jersey Shore, D.C., New York—leave Friday without the Friday.",
    seoTitle: "Luxury weekend getaway transportation from Philadelphia",
    seoDescription:
      "Private chauffeured weekend getaways from Philadelphia—Cape May, the Poconos, the Jersey Shore, New York, and Washington D.C. Door-to-door service with luggage handling and on-site availability.",
    image: media.countryEstate,
    imageAlt: "Modern retreat house at dusk surrounded by trees",
    status: "live",
    intro: [
      "The weekend is short enough without losing Friday evening to a highway and Sunday afternoon to the same highway in reverse.",
      "We take the driving. You get both ends of the weekend back.",
    ],
    highlights: [
      {
        title: "Friday becomes usable",
        body: "Work, sleep, or open a bottle. The drive stops being the price of the weekend.",
      },
      {
        title: "Any distance",
        body: "Cape May, the Poconos, the Shore, Manhattan, or D.C.—all comfortable single-leg runs.",
      },
      {
        title: "Stay covered on-site",
        body: "Retain a chauffeur for the weekend for dinners and day trips, or book one-way each direction.",
      },
      {
        title: "Everything loaded",
        body: "Bags, clubs, skis, dogs, and the cooler. We assign the vehicle to the cargo, not the other way around.",
      },
    ],
    included: [
      "Chauffeured door-to-door service to your destination",
      "Executive SUV or Sprinter sized to your group and luggage",
      "Wi‑Fi, power, and refreshments in the cabin",
      "Route planning around weekend departure traffic",
      "Luggage handling at both ends",
      "Optional on-site chauffeur availability for the stay",
    ],
    itinerary: [
      { label: "Planning", detail: "Destination, departure window, group, luggage, and return confirmed in advance." },
      { label: "Friday", detail: "Pickup at your door; the drive is yours to use however you like." },
      { label: "The weekend", detail: "Optional retained chauffeur for dinners, day trips, and local movement." },
      { label: "Return", detail: "Departure on your schedule with everything loaded for you." },
    ],
    conciergeAddOns: [
      "Hotel and restaurant reservations at the destination",
      "Provisioning delivered before arrival",
      "Spa, golf, or tasting bookings on-site",
      "Multi-family coordination across vehicles",
    ],
    faqs: [
      {
        question: "Which destinations do you cover?",
        answer:
          "Anything within a comfortable single-leg drive: the Jersey Shore, Cape May, the Poconos, the Catskills, New York, Washington D.C., Baltimore, and the Hudson Valley. Longer runs are quoted individually.",
      },
      {
        question: "Can we book one-way?",
        answer:
          "Yes. Many clients drive out with us and fly or return separately. One-way pricing accounts for the return deadhead and is quoted up front.",
      },
      {
        question: "Can we keep the vehicle for the whole weekend?",
        answer:
          "Yes. A retained chauffeur is billed daily and gives you transportation for dinners and day trips rather than only the arrival and departure.",
      },
      {
        question: "What about skis, clubs, or a dog?",
        answer:
          "All expected. Tell us in advance and we assign a vehicle with the right cargo configuration and prepare the cabin accordingly.",
      },
    ],
    searchTerms: [
      "weekend getaway car service Philadelphia",
      "private transportation Jersey Shore",
      "Poconos luxury car service",
      "Philadelphia to New York private car",
    ],
    related: ["hamptons-getaway", "philadelphia-wine-country-tours", "private-spa-days"],
  },

  // ── WELLNESS ────────────────────────────────────────────────────────────
  {
    id: "private-spa-days",
    slug: "private-spa-days",
    categoryId: "wellness",
    title: "Private Spa Days",
    shortTitle: "Private Spa Days",
    h1: "Philadelphia luxury spa day transportation",
    eyebrow: "Wellness · Spa",
    tagline:
      "Appointments booked, timing held, and a quiet cabin at both ends. The point of a spa day is not driving to it.",
    seoTitle: "Philadelphia luxury spa day & private spa transportation",
    seoDescription:
      "Curated luxury spa days in and around Philadelphia. Treatments booked in advance, chauffeured door-to-door transportation, and a quiet cabin so the calm starts before you arrive.",
    image: media.hotStoneMassage,
    imageAlt: "Serene spa treatment prepared in a candlelit room",
    status: "live",
    intro: [
      "A spa day that begins with parking and ends with rush-hour traffic is not really a spa day.",
      "We book the treatments, hold the timing, and make the transportation the quietest part of the day rather than the part that undoes it.",
    ],
    highlights: [
      {
        title: "Treatments booked for you",
        body: "We reserve the specific treatments and times you want at the property that fits—city spa, country resort, or day retreat.",
      },
      {
        title: "The calm starts in the car",
        body: "Quiet cabin, temperature set, phone off if you want it. No small talk unless you start it.",
      },
      {
        title: "Timing that holds",
        body: "Arrive with enough margin to change and settle, not sprinting to a table you paid for.",
      },
      {
        title: "Nothing to manage after",
        body: "You come out relaxed and the vehicle is there. That is the entire point.",
      },
    ],
    included: [
      "Round-trip chauffeured service, door to door",
      "Treatment reservations coordinated in advance",
      "Quiet cabin with climate and lighting set to preference",
      "Water and light refreshments staged for the return",
      "Arrival timed with margin to change and settle",
      "One point of contact for the day",
    ],
    itinerary: [
      { label: "Booking", detail: "We confirm the property, treatments, times, and how you want the cabin set." },
      { label: "Pickup", detail: "Quiet, unhurried departure with margin built into the schedule." },
      { label: "Arrival", detail: "Dropped at the entrance with time to change and settle before your first treatment." },
      { label: "During", detail: "Chauffeur remains available or returns at a set time—your call." },
      { label: "Return", detail: "Quiet cabin home. Water staged. No conversation required." },
    ],
    conciergeAddOns: [
      "Lunch reservations between treatments",
      "Flowers or champagne staged in the vehicle",
      "Overnight stays at resort properties",
      "Group spa days with multiple pickups",
    ],
    faqs: [
      {
        question: "Which spas do you work with around Philadelphia?",
        answer:
          "We coordinate with city hotel spas, Main Line day spas, and resort properties in Bucks County, the Brandywine Valley, and the Poconos. Tell us the experience you want and we will recommend the right property.",
      },
      {
        question: "Do you book the treatments?",
        answer:
          "Yes. Our concierge desk reserves the specific treatments and times, which matters at properties that book out weeks ahead. Treatment costs are billed to you directly or through us, whichever you prefer.",
      },
      {
        question: "Does the chauffeur wait?",
        answer:
          "Either way. For shorter visits the chauffeur typically waits on site. For a full day we release and return at a set time, and adjust if you run long.",
      },
      {
        question: "Can you arrange a spa day for a group?",
        answer:
          "Yes. We handle multiple pickups across the city, consolidate the group, and coordinate the property's group booking so everyone starts together.",
      },
    ],
    searchTerms: [
      "Philadelphia luxury spa day",
      "spa day transportation Philadelphia",
      "private spa experience Philadelphia",
      "Main Line spa car service",
    ],
    related: ["couples-wellness", "group-wellness-experiences", "weekend-getaways"],
  },
  {
    id: "couples-wellness",
    slug: "couples-wellness",
    categoryId: "wellness",
    title: "Couples Wellness",
    shortTitle: "Couples Wellness",
    h1: "Couples wellness & spa experiences",
    eyebrow: "Wellness · Couples",
    tagline:
      "Side-by-side treatments, a quiet lunch, and a drive home neither of you has to think about.",
    seoTitle: "Couples spa & wellness experiences in Philadelphia",
    seoDescription:
      "Private couples wellness experiences around Philadelphia. Side-by-side treatments booked in advance, chauffeured transportation, and concierge touches staged before you arrive.",
    image: media.couplesMassage,
    imageAlt: "Spa treatment room set for two with flowers and soft light",
    status: "live",
    intro: [
      "Anniversaries, birthdays, and the Saturday you both finally cleared. The occasion deserves better than one of you driving home tired.",
      "We book the couples suite, time the lunch, stage the car, and stay out of the way.",
    ],
    highlights: [
      {
        title: "Side-by-side booked",
        body: "Couples suites book out first. We reserve well ahead so you get the room, not two separate appointments.",
      },
      {
        title: "The day has a shape",
        body: "Treatments, a quiet lunch, and an unhurried return—sequenced so nothing feels rushed.",
      },
      {
        title: "Staged touches",
        body: "Champagne, flowers, or a note in the cabin. Tell us the occasion and we handle the gesture.",
      },
      {
        title: "Neither of you drives",
        body: "Which is the entire difference between a nice afternoon and an actual escape.",
      },
    ],
    included: [
      "Round-trip chauffeured service for two",
      "Couples treatment reservation coordinated in advance",
      "Optional lunch reservation between treatments",
      "Quiet cabin set to your preferences",
      "Champagne or refreshments staged on request",
      "Discreet, unobtrusive service throughout",
    ],
    itinerary: [
      { label: "Booking", detail: "We confirm the property, the couples treatment, the occasion, and any staging you want." },
      { label: "Pickup", detail: "Cabin prepared—champagne, flowers, or simply quiet, as you prefer." },
      { label: "Treatments", detail: "Arrive with margin; side-by-side reserved and waiting." },
      { label: "Lunch", detail: "Optional seated lunch timed between or after treatments." },
      { label: "Return", detail: "Unhurried drive home with nothing left to arrange." },
    ],
    conciergeAddOns: [
      "Champagne and flowers staged in the vehicle",
      "Dinner reservation to close the evening",
      "Overnight stay at a resort property",
      "Anniversary or proposal coordination",
    ],
    faqs: [
      {
        question: "How far ahead should we book a couples spa day?",
        answer:
          "Couples suites are the first thing to sell out, especially on weekends and around holidays. Two to three weeks is comfortable; more for Valentine's Day, Mother's Day, and anniversaries in peak season.",
      },
      {
        question: "Can you stage champagne or flowers in the car?",
        answer:
          "Yes. Champagne, flowers, a handwritten note, or a specific bottle you want us to source—tell us the occasion and we take care of the gesture.",
      },
      {
        question: "Can this be part of a proposal?",
        answer:
          "Often is. We coordinate quietly with the property, the restaurant, and anyone else involved, and we keep the day looking ordinary until it isn't.",
      },
      {
        question: "Do you handle overnight stays?",
        answer:
          "Yes. Resort properties in Bucks County, the Brandywine Valley, and the Poconos work well as one-night escapes with transportation both ways.",
      },
    ],
    searchTerms: [
      "couples spa day Philadelphia",
      "couples wellness experience Philadelphia",
      "anniversary spa transportation",
      "romantic spa day car service",
    ],
    related: ["private-spa-days", "date-nights", "weekend-getaways"],
  },
  {
    id: "group-wellness",
    slug: "group-wellness-experiences",
    categoryId: "wellness",
    title: "Group Wellness Experiences",
    shortTitle: "Group Wellness",
    h1: "Group wellness & retreat experiences",
    eyebrow: "Wellness · Groups",
    tagline:
      "Bridal parties, milestone birthdays, and team retreats—everyone arrives together and nobody organizes it.",
    seoTitle: "Group spa & wellness retreat transportation in Philadelphia",
    seoDescription:
      "Group wellness experiences and retreat transportation from Philadelphia. Multiple pickups, coordinated group spa bookings, and Sprinters that keep the party together.",
    image: media.wellnessRetreat,
    imageAlt: "Resort wellness pavilion beside a quiet pool",
    status: "live",
    intro: [
      "Group wellness days fail for one reason: someone has to organize them, and that person does not get to enjoy the day.",
      "We take that role. Multiple pickups, one arrival, a group booking that actually holds, and a return that does not depend on a group chat.",
    ],
    highlights: [
      {
        title: "Everyone arrives together",
        body: "Multiple pickups across the city consolidated into one vehicle and one arrival time.",
      },
      {
        title: "Group booking held",
        body: "We coordinate directly with the property so the group's treatments are sequenced, not scattered across four hours.",
      },
      {
        title: "Nobody is the organizer",
        body: "Including the person who planned it. One coordinator on our side owns the whole day.",
      },
      {
        title: "Return by request",
        body: "Individual drop-offs on the way back, so nobody is stranded and nobody waits.",
      },
    ],
    included: [
      "Executive Sprinter or multiple vehicles sized to the group",
      "Multiple pickup points consolidated into one arrival",
      "Group treatment coordination with the property",
      "Refreshments staged for the outbound and return",
      "A single coordinator managing the full day",
      "Individual drop-offs on the return",
    ],
    itinerary: [
      { label: "Planning", detail: "Guest list, pickup points, property, and treatment preferences confirmed." },
      { label: "Pickups", detail: "Multiple stops across the city, consolidated on schedule." },
      { label: "Arrival", detail: "Group arrives together with the booking already sequenced." },
      { label: "The day", detail: "Treatments, lunch, and downtime run to a schedule we hold for you." },
      { label: "Return", detail: "Individual drop-offs, so nobody is left coordinating a ride." },
    ],
    conciergeAddOns: [
      "Group lunch or dinner reservations",
      "Champagne and provisioning for the vehicle",
      "Bridal party gifting and staging",
      "Overnight group retreats",
    ],
    faqs: [
      {
        question: "How many people can you take?",
        answer:
          "Up to fourteen in a single executive Sprinter. Larger groups run multiple vehicles with one coordinator holding the schedule across all of them.",
      },
      {
        question: "Can you pick everyone up from different places?",
        answer:
          "Yes, and this is usually the part that makes or breaks a group day. We sequence multiple pickups across the city and still arrive as one group, on time.",
      },
      {
        question: "Do you coordinate the spa booking itself?",
        answer:
          "Yes. We work directly with the property so treatments are sequenced sensibly for the group rather than spread across the whole afternoon.",
      },
      {
        question: "Is this suitable for a corporate team retreat?",
        answer:
          "Yes. Group wellness days run well as team offsites and bill through a corporate account with consolidated invoicing.",
      },
    ],
    searchTerms: [
      "group spa day transportation Philadelphia",
      "bridal party spa transportation",
      "corporate wellness retreat transportation",
      "group wellness experience Philadelphia",
    ],
    related: ["private-spa-days", "couples-wellness", "signature-experiences"],
  },

  // ── LEISURE ─────────────────────────────────────────────────────────────
  {
    id: "golf-experiences",
    slug: "golf-experiences",
    categoryId: "leisure",
    title: "Golf Experiences",
    shortTitle: "Golf",
    h1: "Private golf experience transportation",
    eyebrow: "Leisure · Golf",
    tagline:
      "Tee times secured, clubs handled, and a chauffeur who understands that the round runs long.",
    seoTitle: "Luxury golf transportation & tee time coordination in Philadelphia",
    seoDescription:
      "Private golf transportation from Philadelphia. Tee times coordinated, club handling, early-morning departures, and multi-course itineraries with a chauffeur who waits through the nineteenth hole.",
    image: media.golfSwing,
    imageAlt: "Golfer mid-swing on an open fairway at sunrise",
    status: "live",
    intro: [
      "Golf runs long, starts early, and ends at the bar. None of that fits a scheduled pickup window.",
      "We plan for all three: early departure, clubs loaded, and a chauffeur who is still there when the round and the drink after it are finished.",
    ],
    highlights: [
      {
        title: "Tee times coordinated",
        body: "We secure the time where we can and build the departure backward from it, including the warm-up you actually want.",
      },
      {
        title: "Clubs handled",
        body: "Loaded, secured, and unloaded at the bag drop. Multiple sets, no problem.",
      },
      {
        title: "Early is normal",
        body: "A five-thirty departure for a seven o'clock tee time is a routine request, not an exception.",
      },
      {
        title: "The round runs long",
        body: "And so does the nineteenth hole. Your chauffeur waits. Nobody is watching a meter.",
      },
    ],
    included: [
      "Chauffeured service sized to the group and the bags",
      "Tee time coordination where the club permits",
      "Club loading and bag-drop handling",
      "Early-morning departure planning",
      "Refreshments staged for the return",
      "Chauffeur retained through the round and after",
    ],
    itinerary: [
      { label: "Planning", detail: "Course, tee time, group size, and number of bags confirmed." },
      { label: "Departure", detail: "Early pickup with clubs loaded and coffee staged." },
      { label: "Bag drop", detail: "Clubs unloaded at the drop; you walk straight to the range." },
      { label: "The round", detail: "Chauffeur stands by. Slow groups ahead of you are our problem, not yours." },
      { label: "After", detail: "Nineteenth hole at your pace, then home." },
    ],
    conciergeAddOns: [
      "Tee times at private and resort courses",
      "Multi-course golf itineraries",
      "Post-round dinner reservations",
      "Client golf outings with corporate billing",
    ],
    faqs: [
      {
        question: "Can you get us tee times?",
        answer:
          "At public and resort courses, usually. Private clubs require a member host, but we coordinate the timing and transportation around whatever access you have.",
      },
      {
        question: "How many bags fit?",
        answer:
          "An executive SUV takes four sets comfortably. A Sprinter takes a full outing's worth with players and bags together.",
      },
      {
        question: "What if the round runs long?",
        answer:
          "Expected. Golf is billed hourly with the assumption that five hours becomes six. Your chauffeur waits and we confirm overage with you rather than applying it silently.",
      },
      {
        question: "Do you handle corporate client golf outings?",
        answer:
          "Yes. Multiple pickups, consolidated arrival, coordination with the club, and consolidated invoicing through your corporate account.",
      },
    ],
    searchTerms: [
      "golf transportation Philadelphia",
      "private golf outing car service",
      "luxury golf experience Philadelphia",
      "corporate golf outing transportation",
    ],
    related: ["fine-dining", "weekend-getaways", "signature-experiences"],
  },
  {
    id: "fine-dining",
    slug: "fine-dining",
    categoryId: "leisure",
    title: "Fine Dining",
    shortTitle: "Fine Dining",
    h1: "Private fine dining transportation & reservations",
    eyebrow: "Leisure · Dining",
    tagline:
      "The table you wanted, at the time you wanted, with the car outside when you stand up.",
    seoTitle: "Philadelphia fine dining car service & restaurant reservations",
    seoDescription:
      "Private fine dining transportation in Philadelphia. Restaurant reservations coordinated by our concierge desk, door-to-door chauffeur service, and a vehicle waiting when you finish.",
    image: media.diningRoom,
    imageAlt: "Elegant dining room set for the evening service",
    status: "live",
    intro: [
      "Philadelphia's best rooms are small, booked, and unforgiving about timing. Getting the table is half of it; getting there without valet, parking, or a rushed walk is the other half.",
      "Our concierge desk books the table. The chauffeur handles everything on either side of it.",
    ],
    highlights: [
      {
        title: "Reservations, not requests",
        body: "Our concierge desk works the rooms across Rittenhouse, Old City, Fishtown, and the Main Line. Tell us the night; we will tell you where you're eating.",
      },
      {
        title: "Arrive at the door",
        body: "No valet line, no three-block walk, no circling. You are dropped at the entrance at the reservation time.",
      },
      {
        title: "Multi-stop evenings",
        body: "Cocktails, dinner, and a nightcap in three neighborhoods without thinking about any of it.",
      },
      {
        title: "The car is outside",
        body: "You stand up, you walk out, you get in. No phone, no wait, no surge.",
      },
    ],
    included: [
      "Round-trip chauffeured service for the evening",
      "Restaurant reservation coordinated by our concierge desk",
      "Door-level drop-off and pickup",
      "Multi-stop routing for cocktails and after-dinner plans",
      "Discreet chauffeur staged nearby throughout",
      "Return whenever you're ready",
    ],
    itinerary: [
      { label: "Booking", detail: "We confirm the night, the party, and the kind of room you want—or the exact restaurant." },
      { label: "Reservation", detail: "Concierge desk secures the table and confirms it back to you." },
      { label: "Pickup", detail: "Departure timed so you arrive at the reservation, not before or after it." },
      { label: "Dinner", detail: "Chauffeur stages nearby. Add a stop from the table if the night changes." },
      { label: "Return", detail: "Vehicle at the door when you stand up." },
    ],
    conciergeAddOns: [
      "Hard-to-get reservations and chef's counter seating",
      "Wine sourced ahead for corkage service",
      "Flowers or champagne staged in the vehicle",
      "Private dining room coordination for groups",
    ],
    faqs: [
      {
        question: "Can you actually get hard reservations?",
        answer:
          "Often, with notice. Our concierge desk maintains relationships across the city's dining rooms. We will be honest about what is realistic for a given night rather than promising and failing.",
      },
      {
        question: "Does the chauffeur wait during dinner?",
        answer:
          "Yes. For most evenings the chauffeur stages nearby and is at the door within a minute or two of your text. You are not on a timer.",
      },
      {
        question: "Can we add stops during the evening?",
        answer:
          "Yes. Call it in from the table. Cocktails before, a nightcap after, or a change of plan entirely—the evening is billed hourly and stays flexible.",
      },
      {
        question: "Do you handle business dinners?",
        answer:
          "Yes, including individual pickups for each guest, consolidated arrival, and separate drop-offs afterward, billed through your corporate account.",
      },
    ],
    searchTerms: [
      "Philadelphia fine dining car service",
      "restaurant reservation concierge Philadelphia",
      "private car service dinner Philadelphia",
      "date night car service Philadelphia",
    ],
    related: ["date-nights", "phillies-night-out", "golf-experiences"],
  },
  {
    id: "date-nights",
    slug: "date-nights",
    categoryId: "leisure",
    title: "Date Nights",
    shortTitle: "Date Nights",
    h1: "Private date night transportation in Philadelphia",
    eyebrow: "Leisure · Date night",
    tagline:
      "Dinner, a show, a drive along the river—planned in advance, staged quietly, and driven by someone who isn't listening.",
    seoTitle: "Philadelphia date night car service & private evening experiences",
    seoDescription:
      "Private date night transportation in Philadelphia. Dinner and theater reservations, champagne and flowers staged in the cabin, privacy glass, and a chauffeur who stays out of the evening.",
    image: media.cocktailBar,
    imageAlt: "Warmly lit bar interior in the evening",
    status: "live",
    intro: [
      "The best evenings have a shape to them. Somewhere to start, somewhere to eat, and something after—without one of you checking a map between each one.",
      "We build the shape, stage the car, and disappear into the background.",
    ],
    highlights: [
      {
        title: "The evening is planned",
        body: "Dinner, theater, a rooftop, a drive along Boathouse Row. Tell us the mood and we sequence it.",
      },
      {
        title: "Staged before you get in",
        body: "Champagne, flowers, a playlist, or complete quiet. Say it once and it's set.",
      },
      {
        title: "Genuinely private",
        body: "Privacy glass, a partition where the vehicle has one, and a chauffeur trained to be invisible.",
      },
      {
        title: "No end time",
        body: "Stay late. The car waits and the evening ends when you decide it does.",
      },
    ],
    included: [
      "Chauffeured service for the full evening",
      "Dinner and entertainment reservations coordinated in advance",
      "Champagne, flowers, or refreshments staged on request",
      "Privacy glass and a discreet chauffeur",
      "Multi-stop routing across neighborhoods",
      "Open-ended return",
    ],
    itinerary: [
      { label: "Planning", detail: "We take the occasion, the mood, and any must-haves—or build it from scratch." },
      { label: "Staging", detail: "Cabin prepared before pickup: champagne, flowers, temperature, music." },
      { label: "The evening", detail: "Cocktails, dinner, and whatever follows, sequenced and timed." },
      { label: "Between stops", detail: "A quiet drive along the river if the night wants one." },
      { label: "Home", detail: "Whenever you're ready. No end time." },
    ],
    conciergeAddOns: [
      "Theater, symphony, and concert tickets",
      "Champagne, flowers, and gifting staged in the cabin",
      "Proposal and celebration coordination",
      "Private rooftop or chef's counter bookings",
    ],
    faqs: [
      {
        question: "Can you plan the whole evening?",
        answer:
          "Yes. Give us the occasion, a budget range, and anything you know you want, and we return a proposed sequence for you to approve.",
      },
      {
        question: "Can you help with a proposal?",
        answer:
          "We do these regularly. Photographer coordination, staging in the vehicle, timing with the restaurant, and keeping the evening looking normal until the moment. Tell us the plan and we build around it.",
      },
      {
        question: "How private is the vehicle?",
        answer:
          "Privacy glass throughout, a partition in vehicles that have one, and chauffeurs trained specifically not to participate in the evening.",
      },
      {
        question: "Is there a minimum booking?",
        answer:
          "Evening bookings carry an hourly minimum that varies by vehicle and night of week. We quote it up front with no surge or after-hours multiplier.",
      },
    ],
    searchTerms: [
      "date night car service Philadelphia",
      "romantic transportation Philadelphia",
      "proposal transportation Philadelphia",
      "private evening car service Philadelphia",
    ],
    related: ["fine-dining", "couples-wellness", "signature-experiences"],
  },

  // ── SIGNATURE ───────────────────────────────────────────────────────────
  {
    id: "signature",
    slug: "signature-experiences",
    categoryId: "signature",
    title: "Signature Experiences",
    shortTitle: "Signature",
    h1: "HiTouch Signature — completely customized experiences",
    eyebrow: "Signature · Bespoke",
    tagline:
      "Completely customized experiences designed around the client. If you can describe how it should feel, we can build it.",
    seoTitle: "Bespoke luxury experiences in Philadelphia | HiTouch Signature",
    seoDescription:
      "Completely customized luxury experiences designed around the client. Multi-day itineraries, milestone celebrations, and private events—planned, staffed, and run by HiTouch in Philadelphia and the tri-state region.",
    image: media.champagnePour,
    imageAlt: "Sparkling wine being poured into a chilled glass",
    status: "live",
    intro: [
      "Some things do not fit a category. A milestone birthday that runs three days. A client visit that has to be perfect. A surprise that requires six vendors to keep a secret.",
      "Signature is where we start from a blank page. You describe the occasion and how you want it to feel. We come back with a plan, a budget, and one person who owns all of it.",
    ],
    highlights: [
      {
        title: "Start from nothing",
        body: "No package, no template. We build the itinerary around the occasion rather than fitting the occasion to a product.",
      },
      {
        title: "One owner",
        body: "A single point of contact who holds every vendor, reservation, and timing detail—and who answers the phone.",
      },
      {
        title: "Multi-day and multi-vendor",
        body: "Restaurants, hotels, tickets, staffing, florists, photographers, and vehicles, coordinated as one plan.",
      },
      {
        title: "Discretion by default",
        body: "NDAs, private staffing, and vendors who understand confidentiality. Assumed, not requested.",
      },
    ],
    included: [
      "A discovery conversation—occasion, guests, budget, and the feeling you're after",
      "A written proposal with itinerary, vendors, and transparent pricing",
      "One coordinator owning every detail from planning through execution",
      "All transportation across the itinerary",
      "Vendor sourcing, booking, and management",
      "On-the-day coordination and live adjustment",
    ],
    itinerary: [
      { label: "Discovery", detail: "A real conversation about the occasion, the guests, and the outcome you want." },
      { label: "Proposal", detail: "A written itinerary with vendors, timing, and pricing—usually within a few days." },
      { label: "Refinement", detail: "We adjust until it is right. Nothing is booked until you approve." },
      { label: "Execution", detail: "One coordinator runs the day. You are a guest at your own event." },
      { label: "After", detail: "A debrief, so the next one starts from what we already know about you." },
    ],
    conciergeAddOns: [
      "Private aviation and yacht coordination",
      "Executive protection and licensed security details",
      "Photography and videography",
      "Private chefs, staffing, and event production",
    ],
    faqs: [
      {
        question: "What kinds of experiences do you build?",
        answer:
          "Milestone birthdays and anniversaries, multi-day client visits, proposals, family reunions, bachelor and bachelorette weekends, and private events. If it involves people moving between places and details that have to be right, it fits.",
      },
      {
        question: "How far in advance should we start?",
        answer:
          "For a single evening, a week or two. For multi-day itineraries or anything involving hard-to-get venues, six to eight weeks gives us real options. We have built things faster and will tell you honestly what is achievable.",
      },
      {
        question: "How does pricing work?",
        answer:
          "We quote transportation, a coordination fee for the planning and management, and vendor costs at cost. The proposal itemizes all three so you can see exactly what you are paying for.",
      },
      {
        question: "Do you handle confidential or high-profile clients?",
        answer:
          "Yes. NDAs, vetted vendors, private staffing, and licensed security coordination are all available, and discretion is the default rather than an upgrade.",
      },
    ],
    searchTerms: [
      "bespoke luxury experience Philadelphia",
      "private event coordination Philadelphia",
      "custom luxury itinerary Philadelphia",
      "luxury concierge Philadelphia",
    ],
    related: ["date-nights", "group-wellness-experiences", "philadelphia-wine-country-tours"],
  },
];

function categoryFor(categoryId) {
  return experienceCategories.find((c) => c.id === categoryId);
}

/** Every experience, with its canonical href resolved from its category. */
export const experiences = experienceList.map((exp) => {
  const category = categoryFor(exp.categoryId);
  const basePath = category?.basePath ?? "/experiences";
  return {
    ...exp,
    href: `${basePath}/${exp.slug}`,
    categoryName: category?.name ?? "Experiences",
    categoryDisplayName: category?.displayName ?? "EXPERIENCES",
  };
});

/** @param {string} slug */
export function getExperienceBySlug(slug) {
  return experiences.find((e) => e.slug === slug);
}

/** @param {string} categoryId */
export function getExperiencesByCategory(categoryId) {
  return experiences.filter((e) => e.categoryId === categoryId);
}

/** Categories with their experiences attached, in display order. */
export const experienceCategoriesWithItems = experienceCategories.map((category) => ({
  ...category,
  items: getExperiencesByCategory(category.id),
}));

export const gameDayExperiences = getExperiencesByCategory("game-day");

/** Experiences surfaced on the home page preview, in order. */
export const featuredExperienceSlugs = [
  "sixers-private-game-day",
  "philadelphia-wine-country-tours",
  "private-spa-days",
];
