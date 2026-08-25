import { media } from "@/content/media";

/** Game Day hub copy. Individual team pages live in content/experiences.js. */

export const gameDayHero = {
  eyebrow: "Game day · Philadelphia",
  headline: "The game starts before tipoff.",
  supporting:
    "Private pickup. Curated vehicle experience. Coordinated arrival. Dedicated return transportation.",
  image: media.arenaInterior,
  imageAlt: "Arena bowl lit before an event",
};

export const gameDayPromise = {
  negatives: [
    "No parking.",
    "No surge pricing.",
    "No searching for your driver after the game.",
    "No logistics.",
  ],
  closing: "Just game day, handled.",
};

export const gameDayPillars = [
  {
    id: "private-pickup",
    title: "Private pickup",
    body: "From your home, office, or hotel—at a time we build backward from the start of the game, not a generic estimate.",
  },
  {
    id: "curated-cabin",
    title: "Curated vehicle experience",
    body: "Refreshments staged, climate set, the pre-game on if you want it. Sedan, SUV, or Sprinter depending on the group.",
  },
  {
    id: "coordinated-arrival",
    title: "Coordinated arrival",
    body: "Dropped as close to your entrance as access allows, with time to get in before the anthem.",
  },
  {
    id: "dedicated-return",
    title: "Dedicated return transportation",
    body: "Your chauffeur texts a staging location before the game ends and is in position when you walk out.",
  },
];

export const gameDayCorporate = {
  eyebrow: "Client hosting",
  headline: "A ballgame is one of the best rooms in business.",
  body: "We handle individual pickups across the city, consolidate your guests for arrival, and return each of them separately afterward—billed through your corporate account with the rest of your program.",
  cta: { label: "Corporate accounts", href: "/corporate" },
};
