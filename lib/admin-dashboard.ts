import { countOpenBookingInquiries } from "@/lib/booking/inquiry-admin";
import { parseIntakePayload } from "@/lib/intake-service";
import {
  listCorporateLeads,
  listEventLeads,
  listExperienceLeads,
} from "@/lib/lead-storage";
import { isPrismaConfigured, prisma } from "@/lib/prisma";
import { formatTripStatus, TripStatus, type TripStatusValue } from "@/lib/trip-status";

export type AdminDashboardData = {
  leads: {
    corporate: number;
    events: number;
    experience: number;
    pendingTotal: number;
  };
  ops: {
    activeTrips: number;
    inProgressTrips: number;
    pendingIntake: number;
    openBookingInquiries: number;
    chauffeurs: number;
    tripsToday: number;
    completedToday: number;
  } | null;
  tripByStatus: { status: TripStatusValue; count: number; label: string }[];
  upcomingTrips: {
    id: string;
    scheduledAt: Date;
    status: TripStatusValue;
    statusLabel: string;
    pickupLabel: string;
    dropoffLabel: string;
    chauffeurName: string | null;
    companyName: string | null;
    passengerName: string | null;
  }[];
  recentIntake: {
    id: string;
    createdAt: Date;
    name: string;
    email: string | null;
    companyName: string | null;
    notesSnippet: string | null;
  }[];
  pendingLeads: {
    id: string;
    type: "corporate" | "events" | "experience";
    title: string;
    subtitle: string;
    createdAt: Date;
    href: string;
  }[];
  storageMode: string;
};

function startOfToday(): Date {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  return d;
}

function endOfToday(): Date {
  const d = new Date();
  d.setHours(23, 59, 59, 999);
  return d;
}

export async function getAdminDashboardData(): Promise<AdminDashboardData> {
  const [corporate, events, experience] = await Promise.all([
    listCorporateLeads(),
    listEventLeads(),
    listExperienceLeads(),
  ]);

  const pendingCorporate = corporate.filter((l) => l.status === "pending");
  const pendingEvents = events.filter((l) => l.status === "pending");
  const pendingExperience = experience.filter((l) => l.status === "pending");

  const pendingLeads: AdminDashboardData["pendingLeads"] = [
    ...pendingCorporate.slice(0, 4).map((l) => ({
      id: String(l.id),
      type: "corporate" as const,
      title: String(l.company),
      subtitle: String(l.contactName),
      createdAt: new Date(String(l.createdAt)),
      href: "/admin/corporate",
    })),
    ...pendingEvents.slice(0, 4).map((l) => ({
      id: String(l.id),
      type: "events" as const,
      title: String(l.eventName),
      subtitle: String(l.contactName),
      createdAt: new Date(String(l.createdAt)),
      href: "/admin/events",
    })),
    ...pendingExperience.slice(0, 4).map((l) => {
      const payload =
        l.payload && typeof l.payload === "object" && !Array.isArray(l.payload)
          ? (l.payload as Record<string, unknown>)
          : {};
      const contact =
        typeof payload.contactName === "string"
          ? payload.contactName
          : typeof payload.name === "string"
            ? payload.name
            : "Experience inquiry";
      return {
        id: String(l.id),
        type: "experience" as const,
        title: contact,
        subtitle: "Luxury experience form",
        createdAt: new Date(String(l.createdAt)),
        href: "/admin/experience",
      };
    }),
  ]
    .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
    .slice(0, 8);

  const base: AdminDashboardData = {
    leads: {
      corporate: corporate.length,
      events: events.length,
      experience: experience.length,
      pendingTotal:
        pendingCorporate.length + pendingEvents.length + pendingExperience.length,
    },
    ops: null,
    tripByStatus: [],
    upcomingTrips: [],
    recentIntake: [],
    pendingLeads,
    storageMode: isPrismaConfigured() ? "database" : "file",
  };

  if (!isPrismaConfigured()) return base;

  const todayStart = startOfToday();
  const todayEnd = endOfToday();
  const [
    activeTrips,
    inProgressTrips,
    pendingIntake,
    openBookingInquiries,
    chauffeurs,
    tripsToday,
    completedToday,
    statusGroups,
    upcoming,
    intakeRows,
  ] = await Promise.all([
    prisma.trip.count({
      where: { status: { notIn: [TripStatus.COMPLETED, TripStatus.CANCELLED] } },
    }),
    prisma.trip.count({
      where: {
        status: {
          in: [TripStatus.IN_ROUTE, TripStatus.ARRIVED, TripStatus.PASSENGER_ONBOARD],
        },
      },
    }),
    prisma.pendingSubmission.count({ where: { status: "PENDING" } }),
    countOpenBookingInquiries(),
    prisma.user.count({ where: { globalRole: "CHAUFFEUR" } }),
    prisma.trip.count({
      where: { scheduledAt: { gte: todayStart, lte: todayEnd } },
    }),
    prisma.trip.count({
      where: {
        status: TripStatus.COMPLETED,
        updatedAt: { gte: todayStart, lte: todayEnd },
      },
    }),
    prisma.trip.groupBy({
      by: ["status"],
      _count: { status: true },
      where: { status: { notIn: [TripStatus.COMPLETED, TripStatus.CANCELLED] } },
    }),
    prisma.trip.findMany({
      where: { status: { notIn: [TripStatus.COMPLETED, TripStatus.CANCELLED] } },
      include: {
        chauffeur: { select: { name: true } },
        corporateCompany: { select: { name: true } },
        passengerTrips: { take: 1, orderBy: { isPrimary: "desc" } },
      },
      orderBy: { scheduledAt: "asc" },
      take: 8,
    }),
    prisma.pendingSubmission.findMany({
      where: { status: "PENDING" },
      orderBy: { createdAt: "desc" },
      take: 6,
    }),
  ]);

  const allStatuses: TripStatusValue[] = [
    TripStatus.ASSIGNED,
    TripStatus.IN_ROUTE,
    TripStatus.ARRIVED,
    TripStatus.PASSENGER_ONBOARD,
  ];
  const countMap = new Map(statusGroups.map((g) => [g.status, g._count.status]));
  const tripByStatus = allStatuses.map((status) => ({
    status,
    count: countMap.get(status) ?? 0,
    label: formatTripStatus(status),
  }));

  return {
    ...base,
    ops: {
      activeTrips,
      inProgressTrips,
      pendingIntake,
      openBookingInquiries,
      chauffeurs,
      tripsToday,
      completedToday,
    },
    tripByStatus,
    upcomingTrips: upcoming.map((t) => ({
      id: t.id,
      scheduledAt: t.scheduledAt,
      status: t.status,
      statusLabel: formatTripStatus(t.status),
      pickupLabel: t.pickupLabel,
      dropoffLabel: t.dropoffLabel,
      chauffeurName: t.chauffeur?.name ?? null,
      companyName: t.corporateCompany?.name ?? null,
      passengerName: t.passengerTrips[0]?.name ?? null,
    })),
    recentIntake: intakeRows.map((row) => {
      const fields = parseIntakePayload(row.payload);
      const notes = fields.tripUpdateNotes ?? fields.transcription ?? null;
      return {
        id: row.id,
        createdAt: row.createdAt,
        name: fields.name ?? "Unknown caller",
        email: fields.email ?? null,
        companyName: fields.companyName ?? null,
        notesSnippet: notes ? (notes.length > 120 ? `${notes.slice(0, 120)}…` : notes) : null,
      };
    }),
  };
}
