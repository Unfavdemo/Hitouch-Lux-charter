import type { TripStepInput } from "@/lib/booking/schemas";

const BASE_CENTS = {
  sedan: 18500,
  suv: 24500,
  sprinter: 39500,
} as const;

const PER_PASSENGER_CENTS = {
  sedan: 800,
  suv: 1000,
  sprinter: 1200,
} as const;

/** Rough distance band from address string length difference (deterministic mock). */
function distanceBandCents(pickup: string, destination: string): number {
  const delta = Math.abs(pickup.length - destination.length);
  if (delta < 8) return 4500;
  if (delta < 20) return 9500;
  if (delta < 40) return 14500;
  return 22000;
}

export type QuoteLineItem = {
  label: string;
  amountCents: number;
};

export type QuoteSummary = {
  lineItems: QuoteLineItem[];
  subtotalCents: number;
  estimateLabel: string;
  disclaimer: string;
};

export function buildMockQuote(trip: TripStepInput): QuoteSummary {
  const base = BASE_CENTS[trip.vehicleClass];
  const passengerAdj = Math.max(0, trip.passengers - 1) * PER_PASSENGER_CENTS[trip.vehicleClass];
  const distance = distanceBandCents(trip.pickupAddress, trip.destinationAddress);

  const lineItems: QuoteLineItem[] = [
    { label: `${capitalize(trip.vehicleClass)} base`, amountCents: base },
    { label: "Route estimate", amountCents: distance },
  ];
  if (passengerAdj > 0) {
    lineItems.push({ label: "Additional guests", amountCents: passengerAdj });
  }

  const subtotalCents = lineItems.reduce((sum, item) => sum + item.amountCents, 0);

  return {
    lineItems,
    subtotalCents,
    estimateLabel: "Indicative estimate",
    disclaimer:
      "This is a non-binding estimate for planning purposes. Final pricing is confirmed by the concierge desk after route review.",
  };
}

function capitalize(value: string): string {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

export function formatUsd(cents: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(cents / 100);
}
