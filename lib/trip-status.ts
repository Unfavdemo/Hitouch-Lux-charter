/** Trip lifecycle values — kept in sync with prisma/schema.prisma enum TripStatus */

export const TripStatus = {
  ASSIGNED: "ASSIGNED",
  IN_ROUTE: "IN_ROUTE",
  ARRIVED: "ARRIVED",
  PASSENGER_ONBOARD: "PASSENGER_ONBOARD",
  COMPLETED: "COMPLETED",
  CANCELLED: "CANCELLED",
} as const;

export type TripStatusValue = (typeof TripStatus)[keyof typeof TripStatus];

export const ACTIVE_TRIP_STATUSES: TripStatusValue[] = [
  TripStatus.ASSIGNED,
  TripStatus.IN_ROUTE,
  TripStatus.ARRIVED,
  TripStatus.PASSENGER_ONBOARD,
];

export function isActiveTripStatus(status: TripStatusValue): boolean {
  return ACTIVE_TRIP_STATUSES.includes(status);
}

const DRIVER_TRANSITIONS: Partial<Record<TripStatusValue, TripStatusValue>> = {
  ASSIGNED: TripStatus.IN_ROUTE,
  IN_ROUTE: TripStatus.ARRIVED,
  ARRIVED: TripStatus.PASSENGER_ONBOARD,
  PASSENGER_ONBOARD: TripStatus.COMPLETED,
};

export function getNextTripStatus(current: TripStatusValue): TripStatusValue | null {
  return DRIVER_TRANSITIONS[current] ?? null;
}

export function getDriverActionLabel(status: TripStatusValue): string | null {
  switch (status) {
    case TripStatus.ASSIGNED:
      return "Start route";
    case TripStatus.IN_ROUTE:
      return "Mark arrived";
    case TripStatus.ARRIVED:
      return "Passenger onboard";
    case TripStatus.PASSENGER_ONBOARD:
      return "Complete ride";
    default:
      return null;
  }
}

export function formatTripStatus(status: string): string {
  if (status === TripStatus.CANCELLED) return "Cancelled";
  return status.replace(/_/g, " ").toLowerCase().replace(/\b\w/g, (c) => c.toUpperCase());
}

export function isTripStatusValue(value: string): value is TripStatusValue {
  return Object.values(TripStatus).includes(value as TripStatusValue);
}
