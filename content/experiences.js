import { media } from "@/content/media";

/**
 * Experience catalog — five categories, each experience with its own
 * landing page at /experiences/[slug] and a dedicated inquiry form.
 * Slugs and SEO fields are keyword-targeted for Philadelphia searches.
 */

export const experiencesHero = {
  eyebrow: "Private experiences · HiTouch Concierge",
  headline: "Tell us the occasion. We'll handle the details.",
  supporting:
    "Transportation is only the beginning. Every HiTouch experience pairs private chauffeured mobility with concierge-level coordination—reservations, tickets, timing, and the details in between.",
};

export const featuredSprinter = {
  title: "The Executive Sprinter",
  blurb:
    "The centerpiece of the HiTouch fleet—a private lounge in motion for game days, wine country, and executive travel. Partition-ready, Wi-Fi enabled, and staged to your preferences before the door ever opens.",
  image: media.sprinterInterior,
  alt: "Luxury executive Sprinter interior with ambient lighting",
};

export const experienceCategories = [
  {
    id: "game-day",
    name: "Game Day",
    tagline: "The game starts before tipoff.",
    description:
      "Sixers, Eagles, Phillies, Flyers—private pickup, curated vehicle experience, coordinated arrival, and dedicated return transportation. No parking. No surge pricing. No logistics.",
    image: media.stadiumLights,
    alt: "Stadium under bright evening floodlights",
    href: "/game-day",
  },
  {
    id: "escape",
    name: "Escape",
    tagline: "Leave the itinerary to us.",
    description:
      "Wine country, the Hamptons, and weekend getaways—door-to-door escapes where the drive is part of the retreat, not the price of it.",
    image: media.winery,
    alt: "Vineyard rows in soft golden light",
    href: "/experiences#escape",
  },
  {
    id: "wellness",
    name: "Wellness",
    tagline: "Arrive already unwound.",
    description:
      "Private spa days, couples wellness, and group wellness experiences—quiet cabins, unhurried timing, and a composed return home.",
    image: media.spa,
    alt: "Relaxing spa atmosphere with soft lighting",
    href: "/experiences#wellness",
  },
  {
    id: "leisure",
    name: "Leisure",
    tagline: "Your evening, orchestrated.",
    description:
      "Golf experiences, fine dining, and date nights—reservations coordinated, doors timed, and every detail handled between them.",
    image: media.fineDining,
    alt: "Elegant fine-dining table with candlelight",
    href: "/experiences#leisure",
  },
  {
    id: "signature",
    name: "Signature",
    tagline: "Designed entirely around you.",
    description:
      "Completely customized experiences built from a single conversation—tell us how you want the day to feel and we'll architect everything else.",
    image: media.sprinterInterior,
    alt: "Executive Sprinter cabin staged with ambient lighting",
    href: "/experiences#signature",
  },
];

/** Standard disclaimer for team-adjacent experiences. */
export const teamDisclaimer =
  "HiTouch Luxury Charter is an independent private transportation and experience company. We are not affiliated with, endorsed by, or sponsored by any professional sports team, league, or venue.";

export const experiences = [
  /* ---------------- GAME DAY ---------------- */
  {
    id: "sixers",
    slug: "sixers-private-game-day",
    categoryId: "game-day",
    title: "Sixers Private Game Day",
    cardBlurb:
      "Private pickup, a curated ride to the arena in South Philadelphia, and a chauffeur waiting when the final buzzer sounds.",
    heroEyebrow: "Game Day · Basketball",
    heroHeadline: "Sixers games, without the logistics.",
    heroSupporting:
      "The game starts before tipoff. Your evening begins at your door with a staged cabin, arrives on your schedule, and ends with a dedicated return—no parking, no surge pricing, no searching for a ride after the game.",
    image: media.basketballArena,
    alt: "Basketball arena under game lights",
    seoTitle: "Sixers Private Transportation | Game Day Experience",
    seoDescription:
      "Private Sixers game day transportation in Philadelphia. Door-to-door chauffeured service to the arena, curated in-cabin experience, and dedicated return after the game. Concierge ticket coordination available.",
    included: [
      "Private pickup from home, office, or restaurant",
      "Curated vehicle experience—music, refreshments, and climate set to your brief",
      "Coordinated arrival timed to tipoff and traffic around the South Philadelphia Sports Complex",
      "Dedicated return transportation staged before the final buzzer",
    ],
    conciergeAdditions: [
      "Game ticket coordination",
      "Pre-game dinner reservations",
      "Champagne or refreshments staged in-cabin",
      "Multi-stop group pickups",
    ],
    closingLine: "Just game day, handled.",
    disclaimer: true,
  },
  {
    id: "eagles",
    slug: "eagles-sunday-experience",
    categoryId: "game-day",
    title: "Eagles Sunday Experience",
    cardBlurb:
      "Sundays in Philadelphia deserve better than stadium parking. Tailgate-to-final-whistle transportation, handled.",
    heroEyebrow: "Game Day · Football",
    heroHeadline: "Eagles Sundays, elevated.",
    heroSupporting:
      "From brunch to kickoff to the post-game exit, your Sunday moves on one seamless thread. Private pickup for your group, a staged cabin en route to the stadium, and a chauffeur positioned for the moment you're ready to leave.",
    image: media.footballStadium,
    alt: "Football stadium at night under floodlights",
    seoTitle: "Eagles Game Transportation | Private Game Day Service",
    seoDescription:
      "Private Eagles game day transportation in Philadelphia. Group pickups, chauffeured Sprinter service to the stadium, tailgate coordination, and a dedicated return after the final whistle.",
    included: [
      "Private group pickup—one address or several",
      "Executive Sprinter or SUV staged for game day",
      "Tailgate drop and coordinated stadium arrival",
      "Dedicated post-game return—no ride-share surge, no parking-lot exit lines",
    ],
    conciergeAdditions: [
      "Game ticket coordination",
      "Tailgate catering and setup coordination",
      "Pre-game restaurant reservations",
      "Cold refreshments staged in-cabin",
    ],
    closingLine: "No logistics. Just Sunday.",
    disclaimer: true,
  },
  {
    id: "phillies",
    slug: "phillies-night-out",
    categoryId: "game-day",
    title: "Phillies Night Out",
    cardBlurb:
      "Summer nights at the ballpark—private transportation, pre-game dinner coordination, and a waiting return ride.",
    heroEyebrow: "Game Day · Baseball",
    heroHeadline: "Ballpark nights, beautifully simple.",
    heroSupporting:
      "A Phillies game should feel like a night out, not a transportation project. We handle the pickup, the arrival, and the return—you handle the seventh-inning stretch.",
    image: media.baseballStadium,
    alt: "Baseball stadium glowing at night",
    seoTitle: "Phillies Game Transportation | Private Night Out",
    seoDescription:
      "Private Phillies game transportation in Philadelphia. Chauffeured service to the ballpark, pre-game dining coordination, and dedicated return transportation for couples and groups.",
    included: [
      "Private pickup timed to first pitch",
      "Curated cabin—refreshments and climate to your preference",
      "Coordinated arrival at the ballpark",
      "Dedicated return transportation waiting after the game",
    ],
    conciergeAdditions: [
      "Game ticket coordination",
      "Pre-game dinner reservations",
      "Group and family pickups",
      "Celebration staging for birthdays and milestones",
    ],
    closingLine: "One call. Every detail handled.",
    disclaimer: true,
  },
  {
    id: "flyers",
    slug: "flyers-game-night",
    categoryId: "game-day",
    title: "Flyers Game Night",
    cardBlurb:
      "Winter game nights without the cold walk from a distant lot—door-to-door service to the arena and back.",
    heroEyebrow: "Game Day · Hockey",
    heroHeadline: "Game night, door to door.",
    heroSupporting:
      "Cold nights and crowded lots are not part of the experience. Your chauffeur handles the arena approach and is staged for your exit—so the night stays about the game.",
    image: media.hockeyRink,
    alt: "Ice hockey rink under arena lights",
    seoTitle: "Flyers Game Transportation | Private Game Night Service",
    seoDescription:
      "Private Flyers game night transportation in Philadelphia. Heated chauffeured vehicles, door-to-door arena service, and dedicated return transportation after the game.",
    included: [
      "Private pickup from home, office, or dinner",
      "Warm, staged cabin for winter game nights",
      "Coordinated arena arrival",
      "Dedicated return transportation after the final horn",
    ],
    conciergeAdditions: [
      "Game ticket coordination",
      "Pre-game dinner reservations",
      "Group pickups for season-ticket circles",
      "In-cabin refreshments",
    ],
    closingLine: "Once you're with HiTouch, you're taken care of.",
    disclaimer: true,
  },

  /* ---------------- ESCAPE ---------------- */
  {
    id: "wine-country",
    slug: "wine-country-tours",
    categoryId: "escape",
    title: "Wine Country",
    cardBlurb:
      "Brandywine Valley estates and beyond—multi-vineyard routing, tasting reservations, and case storage for the ride home.",
    heroEyebrow: "Escape · Wine Country",
    heroHeadline: "A wine day where no one has to drive.",
    heroSupporting:
      "Multi-estate routing, tasting reservations coordinated ahead, and a chauffeur who paces the day so you never watch the clock. The cellar door opens; everything else is handled.",
    image: media.winery,
    alt: "Wine glasses in a vineyard setting",
    seoTitle: "Philadelphia Luxury Wine Tours | Private Wine Country Experience",
    seoDescription:
      "Private luxury wine tours from Philadelphia—Brandywine Valley, Chester County, and New Jersey wine country. Chauffeured Sprinter service, tasting reservations, and concierge coordination.",
    included: [
      "Multi-vineyard route designed around your tastes",
      "Tasting reservations coordinated by HiTouch Concierge",
      "Executive Sprinter with cooler and case storage",
      "Unhurried pacing with a composed return home",
    ],
    conciergeAdditions: [
      "Private tasting appointments",
      "Vineyard lunch reservations",
      "Champagne and charcuterie staged in-cabin",
      "Overnight escape extensions",
    ],
    closingLine: "Your plans. Our responsibility.",
  },
  {
    id: "hamptons",
    slug: "hamptons-getaway",
    categoryId: "escape",
    title: "Hamptons",
    cardBlurb:
      "Philadelphia to the Hamptons in a private cabin built for the long weekend—luggage handled, house arrival timed.",
    heroEyebrow: "Escape · The Hamptons",
    heroHeadline: "The long weekend starts at your door.",
    heroSupporting:
      "Skip the drive, the traffic apps, and the rental counter. A private long-distance cabin with Wi-Fi, refreshments, and luggage handled—so the weekend begins the moment you leave home.",
    image: media.coastalHouse,
    alt: "Coastal house on the water at dusk",
    seoTitle: "Philadelphia to the Hamptons | Private Car Service & Getaways",
    seoDescription:
      "Private chauffeured transportation from Philadelphia to the Hamptons. Long-distance executive Sprinter and SUV service with luggage handling, Wi-Fi, and concierge trip coordination.",
    included: [
      "Door-to-door long-distance service, Philadelphia to the East End",
      "Executive Sprinter or SUV with Wi-Fi and refreshments",
      "Luggage, golf bags, and beach gear handled",
      "Return scheduling on your timeline—same weekend or open-ended",
    ],
    conciergeAdditions: [
      "Restaurant reservations on arrival",
      "Grocery and champagne pre-arrival coordination",
      "Local activity bookings",
      "Multi-home group pickups",
    ],
    closingLine: "For people who value their time differently.",
  },
  {
    id: "weekend-getaways",
    slug: "weekend-getaways",
    categoryId: "escape",
    title: "Weekend Getaways",
    cardBlurb:
      "Cape May, the Poconos, New York, D.C.—a private cabin for the miles between here and away.",
    heroEyebrow: "Escape · Weekend Getaways",
    heroHeadline: "Away, without the drive.",
    heroSupporting:
      "The best part of a getaway shouldn't be surviving the traffic. Tell us where you're headed—we handle the route, the luggage, the stops, and the return.",
    image: media.openRoad,
    alt: "Open road stretching toward the horizon",
    seoTitle: "Luxury Weekend Getaway Transportation from Philadelphia",
    seoDescription:
      "Private weekend getaway transportation from Philadelphia—Cape May, the Poconos, New York, Washington D.C. and beyond. Chauffeured door-to-door service with concierge trip planning.",
    included: [
      "Door-to-door service to your destination",
      "Cabin staged for the journey—Wi-Fi, refreshments, quiet",
      "Flexible stops and scenic routing on request",
      "Scheduled return, or on-call return when plans change",
    ],
    conciergeAdditions: [
      "Hotel and dinner reservations",
      "Itinerary planning with local recommendations",
      "Flowers or champagne on arrival",
      "Pet-friendly arrangements",
    ],
    closingLine: "One call. Every detail handled.",
  },

  /* ---------------- WELLNESS ---------------- */
  {
    id: "private-spa-days",
    slug: "private-spa-days",
    categoryId: "wellness",
    title: "Private Spa Days",
    cardBlurb:
      "Appointment coordination, quiet chauffeured transfers, and a return home that keeps the calm intact.",
    heroEyebrow: "Wellness · Private Spa Days",
    heroHeadline: "The calm begins in the car.",
    heroSupporting:
      "A spa day loses something when it starts and ends behind the wheel. We coordinate your appointments, time your transfers, and keep the cabin quiet—so the reset lasts all day.",
    image: media.spa,
    alt: "Serene spa treatment room with soft lighting",
    seoTitle: "Philadelphia Luxury Spa Day | Private Spa Transportation",
    seoDescription:
      "Private luxury spa day experiences in Philadelphia and the Main Line. Spa appointment coordination, chauffeured transfers, and quiet, composed return transportation.",
    included: [
      "Spa appointment coordination through HiTouch Concierge",
      "Quiet, unhurried chauffeured transfers",
      "Cabin staged for decompression—no calls, no rush",
      "Composed return home on your schedule",
    ],
    conciergeAdditions: [
      "Spa reservations at preferred venues",
      "Post-spa lunch or dinner reservations",
      "Flowers waiting on the return ride",
      "Gift experiences for someone else",
    ],
    closingLine: "Once you're with HiTouch, you're taken care of.",
  },
  {
    id: "couples-wellness",
    slug: "couples-wellness",
    categoryId: "wellness",
    title: "Couples Wellness",
    cardBlurb:
      "Dual pickups, couples treatments coordinated, and an evening that unfolds without either of you checking the time.",
    heroEyebrow: "Wellness · Couples",
    heroHeadline: "A day designed for two.",
    heroSupporting:
      "Couples massages, private treatments, and a dinner reservation waiting afterward—coordinated as one seamless day, with a private cabin carrying you between every chapter.",
    image: media.spaStones,
    alt: "Spa stones and towels arranged in serene composition",
    seoTitle: "Couples Wellness Experience | Philadelphia Spa & Retreat Days",
    seoDescription:
      "Private couples wellness experiences in Philadelphia—couples spa coordination, chauffeured transfers, and dinner reservations arranged by HiTouch Concierge.",
    included: [
      "Couples treatment coordination at preferred spas",
      "Private chauffeured transfers for two",
      "Cabin staged with refreshments",
      "Dinner reservation timed to the end of your treatments",
    ],
    conciergeAdditions: [
      "Champagne and flowers staged in-cabin",
      "Anniversary and proposal staging",
      "Overnight extensions",
      "Fine dining reservations",
    ],
    closingLine: "Your plans. Our responsibility.",
  },
  {
    id: "group-wellness",
    slug: "group-wellness",
    categoryId: "wellness",
    title: "Group Wellness Experiences",
    cardBlurb:
      "Retreat days for friends, teams, and celebrations—group transportation and venue coordination on one thread.",
    heroEyebrow: "Wellness · Groups",
    heroHeadline: "Bring everyone. We'll handle the rest.",
    heroSupporting:
      "Wellness retreats, yoga days, and celebration resets for groups—multi-address pickups, venue coordination, and an Executive Sprinter that keeps the group together and the day on schedule.",
    image: media.yogaGroup,
    alt: "Group wellness session in a calm studio setting",
    seoTitle: "Group Wellness Experiences | Retreat Transportation Philadelphia",
    seoDescription:
      "Group wellness experiences in Philadelphia—retreat day coordination, multi-address group pickups, and executive Sprinter transportation for teams, friends, and celebrations.",
    included: [
      "Multi-address group pickups",
      "Executive Sprinter for up to your full group",
      "Venue and instructor coordination through concierge",
      "Catering and refreshment staging on request",
    ],
    conciergeAdditions: [
      "Retreat venue booking",
      "Healthy catering coordination",
      "Post-retreat dinner reservations",
      "Corporate wellness programs",
    ],
    closingLine: "Tell us the occasion. We'll handle the details.",
  },

  /* ---------------- LEISURE ---------------- */
  {
    id: "golf",
    slug: "golf-experiences",
    categoryId: "leisure",
    title: "Golf Experiences",
    cardBlurb:
      "Tee-time synchronized arrivals, club storage, and the 19th hole without a designated driver.",
    heroEyebrow: "Leisure · Golf",
    heroHeadline: "Eighteen holes. Zero logistics.",
    heroSupporting:
      "Tee times coordinated, clubs loaded, arrivals timed to warm-up—and nobody in your foursome watching their drink at the clubhouse. The round is yours; the day is ours.",
    image: media.golf,
    alt: "Golf course fairway at sunrise",
    seoTitle: "Philadelphia Golf Experiences | Private Golf Outing Transportation",
    seoDescription:
      "Private golf experiences and outing transportation in Philadelphia—tee time coordination, club storage, group pickups, and chauffeured service to premier courses and private clubs.",
    included: [
      "Tee time coordination through HiTouch Concierge",
      "Club and gear storage handled",
      "Group pickups timed to warm-up",
      "Clubhouse-to-door return—no designated driver required",
    ],
    conciergeAdditions: [
      "Tee times at preferred courses",
      "Post-round dinner reservations",
      "Multi-course golf day routing",
      "Cigars and refreshments staged in-cabin",
    ],
    closingLine: "For people who value their time differently.",
  },
  {
    id: "fine-dining",
    slug: "fine-dining",
    categoryId: "leisure",
    title: "Fine Dining",
    cardBlurb:
      "Reservations coordinated, doors timed to the course, and a quiet cabin waiting when the evening winds down.",
    heroEyebrow: "Leisure · Fine Dining",
    heroHeadline: "The table is set. So is everything else.",
    heroSupporting:
      "Philadelphia's best tables deserve a proper arrival. We coordinate the reservation, time the doors, and keep a chauffeur close—so the evening flows from aperitif to nightcap without a single logistic.",
    image: media.fineDining,
    alt: "Elegant fine-dining table with candlelight and glassware",
    seoTitle: "Fine Dining Car Service Philadelphia | Private Dinner Experiences",
    seoDescription:
      "Private fine dining experiences in Philadelphia—restaurant reservations coordinated by concierge, chauffeured arrivals, multi-venue evenings, and dedicated return service.",
    included: [
      "Reservation coordination at Philadelphia's top tables",
      "Arrival timed to your seating",
      "Chauffeur on standby through the evening",
      "Multi-venue evenings—aperitif, dinner, nightcap—on one thread",
    ],
    conciergeAdditions: [
      "Chef's table and tasting menu requests",
      "Wine pairing and sommelier coordination",
      "Flowers at the table",
      "Special occasion staging",
    ],
    closingLine: "One call. Every detail handled.",
  },
  {
    id: "date-nights",
    slug: "date-nights",
    categoryId: "leisure",
    title: "Date Nights",
    cardBlurb:
      "Dinner, theater, and after-hours—privacy glass, staged cabins, and timing that keeps the night unhurried.",
    heroEyebrow: "Leisure · Date Nights",
    heroHeadline: "Be present. We'll do the rest.",
    heroSupporting:
      "The best date nights feel effortless because someone else made them so. Reservations handled, doors timed, flowers waiting—your only job is the company.",
    image: media.dateNight,
    alt: "Intimate restaurant table with wine glasses at golden hour",
    seoTitle: "Date Night Car Service Philadelphia | Private Date Night Experiences",
    seoDescription:
      "Private date night experiences in Philadelphia—chauffeured evenings with restaurant reservations, theater timing, flowers and champagne coordination, and discreet return service.",
    included: [
      "Private chauffeured evening, door to door",
      "Reservation and showtime coordination",
      "Privacy glass and quiet cabin staging",
      "After-hours return, unhurried",
    ],
    conciergeAdditions: [
      "Flowers staged in-cabin or at the table",
      "Champagne on ice",
      "Theater and show tickets",
      "Proposal and anniversary staging",
    ],
    closingLine: "Once you're with HiTouch, you're taken care of.",
  },

  /* ---------------- SIGNATURE ---------------- */
  {
    id: "signature",
    slug: "signature-experiences",
    categoryId: "signature",
    title: "Signature Experiences",
    cardBlurb:
      "Completely customized experiences designed around the client—one conversation, and we architect everything else.",
    heroEyebrow: "Signature · Fully Bespoke",
    heroHeadline: "Designed entirely around you.",
    heroSupporting:
      "Some occasions don't fit a category—a milestone weekend, a VIP movement, a surprise that takes choreography. Tell us where you want to go and how you want it to feel. We'll handle the rest.",
    image: media.sprinterInterior,
    alt: "Custom executive Sprinter cabin with ambient lighting",
    seoTitle: "Signature Custom Experiences | HiTouch Concierge Philadelphia",
    seoDescription:
      "Completely customized private experiences in Philadelphia designed around the client—bespoke itineraries, VIP transportation, concierge coordination, and white-glove execution.",
    included: [
      "A dedicated concierge thread from first call to final door",
      "Fully bespoke itinerary—venues, timing, and vehicles",
      "VIP and multi-principal movements with discretion",
      "Every special request coordinated, not just accommodated",
    ],
    conciergeAdditions: [
      "Anything within reach—if it can be arranged, we arrange it",
      "Private event and venue coordination",
      "Security and executive protection coordination",
      "Multi-day experience management",
    ],
    closingLine: "You don't just book a vehicle. You have HiTouch.",
  },
];

/** Game Day hub page copy */
export const gameDayHub = {
  eyebrow: "HiTouch Game Day",
  headline: "The game starts before tipoff.",
  supporting:
    "Private pickup. Curated vehicle experience. Coordinated arrival. Dedicated return transportation.",
  promise:
    "No parking. No surge pricing. No searching for your driver after the game. No logistics.",
  closing: "Just game day, handled.",
};

/** @param {string} slug */
export function getExperienceBySlug(slug) {
  return experiences.find((e) => e.slug === slug) ?? null;
}

/** @param {string} categoryId */
export function getExperiencesByCategory(categoryId) {
  return experiences.filter((e) => e.categoryId === categoryId);
}

/** @param {string} id */
export function getCategoryById(id) {
  return experienceCategories.find((c) => c.id === id) ?? null;
}

export const gameDayExperiences = getExperiencesByCategory("game-day");

/** All landing page slugs (sitemap + static params) */
export const experienceSlugs = experiences.map((e) => e.slug);
