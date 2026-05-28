/**
 * Rich demo dataset for local/staging QA (requires DATABASE_URL).
 * Usage: npm run seed:all
 *
 * Idempotent: safe to re-run; upserts users, skips duplicate trips-by-source.
 */
import { readFileSync, existsSync } from "node:fs";
import { createRequire } from "node:module";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { randomBytes, scryptSync } from "node:crypto";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");
const require = createRequire(import.meta.url);
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();
const DEMO_PASSWORD = "HitouchDemo2026!";

function loadDotEnv() {
  for (const name of [".env.local", ".env"]) {
    const p = path.join(ROOT, name);
    if (!existsSync(p)) continue;
    for (const line of readFileSync(p, "utf8").split("\n")) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith("#")) continue;
      const eq = trimmed.indexOf("=");
      if (eq < 1) continue;
      const key = trimmed.slice(0, eq).trim();
      let val = trimmed.slice(eq + 1).trim();
      if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
        val = val.slice(1, -1);
      }
      if (process.env[key] === undefined) process.env[key] = val;
    }
  }
}

function hashPassword(plain) {
  const salt = randomBytes(16);
  const hash = scryptSync(plain, salt, 64, { N: 16384, r: 8, p: 1 });
  return `scrypt:${salt.toString("base64url")}:${hash.toString("base64url")}`;
}

async function upsertUser(email, name, globalRole, phone) {
  return prisma.user.upsert({
    where: { email },
    create: { email, name, passwordHash: hashPassword(DEMO_PASSWORD), globalRole, phone },
    update: { name, passwordHash: hashPassword(DEMO_PASSWORD), globalRole, phone },
  });
}

function hoursFromNow(h) {
  const d = new Date();
  d.setHours(d.getHours() + h);
  return d;
}

function daysFromNow(days, hour = 14) {
  const d = new Date();
  d.setDate(d.getDate() + days);
  d.setHours(hour, 0, 0, 0);
  return d;
}

async function ensureTripFromLead(scope, leadId, data) {
  const existing = await prisma.trip.findFirst({
    where: { sourceScope: scope, sourceLeadId: leadId },
  });
  if (existing) return existing;
  const trip = await prisma.trip.create({ data: { ...data, sourceScope: scope, sourceLeadId: leadId } });
  return trip;
}

async function seedUsers() {
  const admin = await upsertUser("ops-admin@hitouch-luxury.test", "Operations Admin", "ADMIN", null);
  const admin2 = await upsertUser("dispatch@hitouch-luxury.test", "Dispatch Lead", "ADMIN", "+12155550001");
  const drivers = [
    await upsertUser("driver-alpha@hitouch-luxury.test", "Alex Rivera", "CHAUFFEUR", "+12155550101"),
    await upsertUser("driver-beta@hitouch-luxury.test", "Jordan Lee", "CHAUFFEUR", "+12155550102"),
    await upsertUser("driver-gamma@hitouch-luxury.test", "Casey Morgan", "CHAUFFEUR", "+12155550103"),
    await upsertUser("driver-delta@hitouch-luxury.test", "Sam Okonkwo", "CHAUFFEUR", "+12155550104"),
  ];
  return { admin, admin2, drivers };
}

async function seedCompanies() {
  const specs = [
    { name: "Demo Holdings Group", contactEmail: "travel@demoholdings.test", phone: "+12155550999" },
    { name: "Meridian Private Bank", contactEmail: "concierge@meridianpb.test", phone: "+12155550200" },
    { name: "Keystone Pharma", contactEmail: "events@keystonepharma.test", phone: "+16105550300" },
  ];
  const out = [];
  for (const s of specs) {
    let c = await prisma.corporateCompany.findFirst({ where: { name: s.name } });
    if (!c) c = await prisma.corporateCompany.create({ data: s });
    out.push(c);
  }
  return out;
}

async function seedB2bLeads(companies) {
  const corpRows = [
    {
      company: "Penn Venture Partners",
      contactName: "Riley Chen",
      email: "riley.chen@pennventure.test",
      phone: "+12155551001",
      invoicing: "Net 30",
      profileNotes: "Monthly PHL ↔ NYC shuttle interest.",
      status: "pending",
    },
    {
      company: "Schuylkill Arts Foundation",
      contactName: "Jordan Park",
      email: "jordan@schuylkillarts.test",
      phone: "+12155551002",
      invoicing: "PO required",
      profileNotes: "Gala season — needs sprinter fleet quote.",
      status: "pending",
    },
    {
      company: "Atlantic Bio Labs",
      contactName: "Dr. Amira Hassan",
      email: "amira@atlanticbio.test",
      phone: "+12155551003",
      invoicing: "Net 45",
      profileNotes: "Accepted — onboarding call scheduled.",
      status: "accepted",
    },
  ];

  for (const r of corpRows) {
    const exists = await prisma.corporateLead.findFirst({ where: { email: r.email } });
    if (!exists) {
      await prisma.corporateLead.create({
        data: {
          ...r,
          reviewedAt: r.status !== "pending" ? new Date() : null,
        },
      });
    }
  }

  const eventRows = [
    {
      eventName: "Wedding — Whitman Estate",
      eventDate: daysFromNow(12),
      guestCount: 85,
      venues: "Ceremony: St. Asaphs, Bryn Mawr · Reception: Philadelphia Cricket Club",
      checkInAssistance: true,
      logisticsNotes: "Bridal party staging at 2pm.",
      contactName: "Elena Whitman",
      email: "elena@whitmanwedding.test",
      phone: "+12155552001",
      status: "pending",
    },
    {
      eventName: "Sixers playoff hospitality",
      eventDate: daysFromNow(3),
      guestCount: 24,
      venues: "Wells Fargo Center VIP",
      checkInAssistance: false,
      logisticsNotes: "Multiple pickup windows — see manifest.",
      contactName: "Marcus Reid",
      email: "marcus@sixershosp.test",
      phone: "+12155552002",
      status: "accepted",
    },
    {
      eventName: "Charity gala preview",
      eventDate: daysFromNow(30),
      guestCount: 120,
      venues: "Kimmel Center",
      contactName: "Sofia Nunez",
      email: "sofia@gala.test",
      phone: "+12155552003",
      status: "declined",
    },
  ];

  for (const r of eventRows) {
    const exists = await prisma.eventLead.findFirst({ where: { email: r.email } });
    if (!exists) {
      await prisma.eventLead.create({
        data: {
          ...r,
          reviewedAt: r.status !== "pending" ? new Date() : null,
        },
      });
    }
  }

  const expPayloads = [
    {
      firstName: "Victoria",
      lastName: "Lang",
      email: "v.lang@winerytour.test",
      phone: "+12155553001",
      pickupDate: daysFromNow(5).toISOString().slice(0, 10),
      pickupTime: "10:00",
      pickupAddress: "Rittenhouse Hotel, Philadelphia",
      destinationAddress: "Chaddsford Winery, Chadds Ford PA",
      returnDate: daysFromNow(5).toISOString().slice(0, 10),
      returnTime: "18:00",
      serviceInterest: "wine_tour",
      guestCount: "4",
      driverWait: "yes",
      occasions: ["Anniversary"],
      accommodations: ["champagne"],
      tripDetails: "Prefer Sprinter, quiet driver.",
      status: "pending",
    },
    {
      firstName: "James",
      lastName: "Ortiz",
      email: "j.ortiz@airportvip.test",
      phone: "+12155553002",
      pickupDate: daysFromNow(1).toISOString().slice(0, 10),
      pickupTime: "06:30",
      pickupAddress: "PHL Terminal A",
      destinationAddress: "Four Seasons Philadelphia",
      returnDate: daysFromNow(1).toISOString().slice(0, 10),
      returnTime: "07:15",
      serviceInterest: "airport",
      guestCount: "2",
      driverWait: "no",
      occasions: ["Business"],
      accommodations: ["none"],
      tripDetails: "Flight AA1842 — meet at baggage claim.",
      status: "accepted",
    },
  ];

  for (const p of expPayloads) {
    const exists = await prisma.experienceLead.findFirst({
      where: { payload: { path: ["email"], equals: p.email } },
    });
    if (!exists) {
      const { status, ...payload } = p;
      await prisma.experienceLead.create({
        data: {
          status,
          reviewedAt: status !== "pending" ? new Date() : null,
          payload,
        },
      });
    }
  }

  // Demo portal grants (fixed emails)
  const portalLeads = [
    {
      id: "a1000000-0000-4000-8000-000000000001",
      company: "Demo Alpha Logistics",
      contactName: "Alex Demo",
      email: "demo-alpha@hitouch-portal.test",
      phone: "+12155550101",
      invoicing: "Net 30",
      profileNotes: "Portal QA alpha.",
      status: "accepted",
    },
    {
      id: "a1000000-0000-4000-8000-000000000002",
      company: "Demo Beta Capital",
      contactName: "Blair Demo",
      email: "demo-beta@hitouch-portal.test",
      phone: "+12155550102",
      invoicing: "PO required",
      profileNotes: "Portal QA beta.",
      status: "accepted",
    },
  ];

  for (const pl of portalLeads) {
    let lead = await prisma.corporateLead.findUnique({ where: { id: pl.id } });
    if (!lead) {
      lead = await prisma.corporateLead.create({
        data: {
          id: pl.id,
          company: pl.company,
          contactName: pl.contactName,
          email: pl.email,
          phone: pl.phone,
          invoicing: pl.invoicing,
          profileNotes: pl.profileNotes,
          status: pl.status,
          reviewedAt: new Date(),
        },
      });
    }
    const grant = await prisma.corporatePortalGrant.findFirst({
      where: { corporateLeadId: lead.id, revokedAt: null },
    });
    if (!grant) {
      await prisma.corporatePortalGrant.create({
        data: { corporateLeadId: lead.id, email: pl.email },
      });
    }
  }
}

async function seedBookingInquiries() {
  const samples = [
    {
      contactName: "Chris Nolan",
      email: "chris.nolan@sample.test",
      phone: "+12155554001",
      status: "CONTACT_CAPTURED",
      lastStep: "contact",
    },
    {
      contactName: "Dana Kim",
      email: "dana.kim@sample.test",
      phone: "+12155554002",
      status: "QUOTED",
      lastStep: "trip",
      tripPayload: {
        pickupAddress: "30th Street Station",
        dropoffAddress: "Atlantic City",
        pickupDate: daysFromNow(7).toISOString().slice(0, 10),
        pickupTime: "09:00",
      },
      quoteSummary: { totalUsd: 485, vehicleClass: "Executive SUV", milesEstimate: 62 },
    },
    {
      contactName: "Evan Moss",
      email: "evan.moss@sample.test",
      phone: "+12155554003",
      status: "ABANDONED",
      lastStep: "trip",
      abandonedAt: hoursFromNow(-2),
    },
  ];

  for (const s of samples) {
    const exists = await prisma.bookingInquiry.findFirst({ where: { email: s.email } });
    if (!exists) {
      await prisma.bookingInquiry.create({
        data: {
          contactName: s.contactName,
          email: s.email,
          phone: s.phone,
          status: s.status,
          lastStep: s.lastStep,
          tripPayload: s.tripPayload ?? undefined,
          quoteSummary: s.quoteSummary ?? undefined,
          quotedAt: s.status === "QUOTED" ? new Date() : null,
          abandonedAt: s.abandonedAt ?? null,
        },
      });
    }
  }
}

async function seedTrips(drivers, companies) {
  const [alpha, beta, gamma, delta] = drivers;
  const [holdings, meridian, keystone] = companies;

  const tripSpecs = [
    {
      status: "ASSIGNED",
      scheduledAt: hoursFromNow(2),
      pickupLabel: "PHL Terminal A — Arrivals",
      dropoffLabel: "Rittenhouse Square",
      chauffeurId: alpha.id,
      corporateCompanyId: holdings.id,
      passenger: { name: "Morgan Blake", phone: "+12155550188", email: "morgan@demoholdings.test" },
      notes: "Demo — assigned, en route soon",
    },
    {
      status: "IN_ROUTE",
      scheduledAt: hoursFromNow(-0.5),
      pickupLabel: "Four Seasons Philadelphia",
      dropoffLabel: "PHL Terminal F",
      chauffeurId: beta.id,
      corporateCompanyId: meridian.id,
      passenger: { name: "James Ortiz", phone: "+12155553002" },
      notes: "Airport departure — live on road",
    },
    {
      status: "ARRIVED",
      scheduledAt: hoursFromNow(0),
      pickupLabel: "Comcast Center",
      dropoffLabel: "Parc restaurant, Rittenhouse",
      chauffeurId: gamma.id,
      corporateCompanyId: keystone.id,
      passenger: { name: "Dr. Amira Hassan", phone: "+12155551003" },
      notes: "Client dinner — chauffeur curbside",
    },
    {
      status: "PASSENGER_ONBOARD",
      scheduledAt: hoursFromNow(-1),
      pickupLabel: "Wells Fargo Center",
      dropoffLabel: "Center City hotel block",
      chauffeurId: delta.id,
      passenger: { name: "Marcus Reid", phone: "+12155552002" },
      notes: "Sixers hospitality run",
    },
    {
      status: "ASSIGNED",
      scheduledAt: hoursFromNow(6),
      pickupLabel: "King of Prussia Mall",
      dropoffLabel: "30th Street Station",
      chauffeurId: null,
      notes: "Unassigned — needs dispatch",
    },
    {
      status: "COMPLETED",
      scheduledAt: hoursFromNow(-26),
      pickupLabel: "Main Line estate",
      dropoffLabel: "PHL",
      chauffeurId: alpha.id,
      corporateCompanyId: holdings.id,
      passenger: { name: "Taylor Chen", phone: "+12155550199" },
      notes: "Completed yesterday",
    },
  ];

  for (const spec of tripSpecs) {
    const dup = await prisma.trip.findFirst({
      where: { pickupLabel: spec.pickupLabel, scheduledAt: spec.scheduledAt },
    });
    if (dup) continue;
    await prisma.trip.create({
      data: {
        status: spec.status,
        scheduledAt: spec.scheduledAt,
        pickupLabel: spec.pickupLabel,
        dropoffLabel: spec.dropoffLabel,
        notes: spec.notes,
        chauffeurId: spec.chauffeurId,
        corporateCompanyId: spec.corporateCompanyId ?? null,
        ...(spec.passenger
          ? {
              passengerTrips: {
                create: {
                  ...spec.passenger,
                  isPrimary: true,
                  email: spec.passenger.email ?? null,
                },
              },
            }
          : {}),
      },
    });
  }

  // Trips linked to accepted leads (simulates auto-book)
  const acceptedExp = await prisma.experienceLead.findFirst({
    where: { status: "accepted" },
  });
  if (acceptedExp) {
    await ensureTripFromLead("experience", acceptedExp.id, {
      status: "ASSIGNED",
      scheduledAt: daysFromNow(1, 6),
      pickupLabel: "PHL Terminal A",
      dropoffLabel: "Four Seasons Philadelphia",
      chauffeurId: alpha.id,
      notes: "Auto-booked from approved experience request",
      passengerTrips: {
        create: { name: "James Ortiz", phone: "+12155553002", isPrimary: true },
      },
    });
  }

  const acceptedEvent = await prisma.eventLead.findFirst({ where: { status: "accepted" } });
  if (acceptedEvent) {
    await ensureTripFromLead("events", acceptedEvent.id, {
      status: "ASSIGNED",
      scheduledAt: daysFromNow(3, 14),
      pickupLabel: acceptedEvent.venues ?? acceptedEvent.eventName,
      dropoffLabel: "Per event logistics",
      chauffeurId: beta.id,
      notes: `Auto-booked — ${acceptedEvent.eventName}`,
      passengerTrips: {
        create: {
          name: acceptedEvent.contactName,
          phone: acceptedEvent.phone,
          email: acceptedEvent.email,
          isPrimary: true,
        },
      },
    });
  }
}

async function seedIntake() {
  const pending = [
    {
      name: "Sam Ortiz",
      email: "sam.ortiz@acme.test",
      companyName: "Acme Events",
      tripUpdateNotes: "Sprinter for 6 pax PHL → Center City Friday 6pm",
      transcription: "Asked about corporate billing.",
    },
    {
      name: "Linda Cho",
      email: "linda@biotech.test",
      companyName: "Helix Biotech",
      tripUpdateNotes: "Change pickup to Terminal B — flight delayed",
      transcription: "Repeat client, wants same chauffeur as last month.",
    },
    {
      name: "Unknown caller",
      email: null,
      companyName: null,
      tripUpdateNotes: "Callback requested — missed connection",
      transcription: "Line dropped before email captured.",
    },
    {
      name: "Robert Klein",
      email: "r.klein@lawfirm.test",
      companyName: "Klein & Partners",
      tripUpdateNotes: "Three vehicles for deposition week",
      transcription: "Needs NET 30 setup first.",
    },
  ];

  for (const p of pending) {
    const exists = await prisma.pendingSubmission.findFirst({
      where: {
        status: "PENDING",
        payload: { path: ["name"], equals: p.name },
      },
    });
    if (!exists) {
      await prisma.pendingSubmission.create({
        data: {
          source: "smith_intake",
          status: "PENDING",
          payload: { ...p, receivedAt: new Date().toISOString() },
        },
      });
    }
  }

  if ((await prisma.pendingSubmission.count({ where: { status: "PROCESSED" } })) < 2) {
    await prisma.pendingSubmission.create({
      data: {
        source: "smith_intake",
        status: "PROCESSED",
        processedAt: hoursFromNow(-48),
        payload: {
          name: "Prior caller",
          email: "done@example.test",
          companyName: "Processed Co",
          tripUpdateNotes: "Already handled by dispatch.",
          receivedAt: hoursFromNow(-72).toISOString(),
        },
      },
    });
  }
}

/** Demo GPS dots (Philadelphia area) for map preview without a real phone. */
async function seedTripLocations() {
  const samples = [
    { status: "IN_ROUTE", lat: 39.9526, lng: -75.1652 },
    { status: "ARRIVED", lat: 39.9493, lng: -75.1711 },
    { status: "PASSENGER_ONBOARD", lat: 39.945, lng: -75.18 },
  ];
  for (const s of samples) {
    const trip = await prisma.trip.findFirst({
      where: { status: s.status },
      select: { id: true },
    });
    if (!trip) continue;
    await prisma.$executeRaw`
      INSERT INTO trip_locations (trip_id, latitude, longitude, accuracy_meters)
      VALUES (${trip.id}::uuid, ${s.lat}, ${s.lng}, ${15})
      ON CONFLICT (trip_id) DO UPDATE SET
        latitude = EXCLUDED.latitude,
        longitude = EXCLUDED.longitude,
        accuracy_meters = EXCLUDED.accuracy_meters,
        updated_at = NOW()
    `;
  }
}

async function main() {
  loadDotEnv();
  if (!process.env.DATABASE_URL?.trim()) {
    console.error("DATABASE_URL is required. Copy .env.example → .env and set Neon URL.");
    process.exit(1);
  }

  console.log("\nSeeding HiTouch demo dataset…\n");

  const { admin, drivers } = await seedUsers();
  const companies = await seedCompanies();
  await seedB2bLeads(companies);
  await seedBookingInquiries();
  await seedTrips(drivers, companies);
  await seedTripLocations();
  await seedIntake();

  const counts = await Promise.all([
    prisma.corporateLead.count(),
    prisma.eventLead.count(),
    prisma.experienceLead.count(),
    prisma.trip.count(),
    prisma.pendingSubmission.count({ where: { status: "PENDING" } }),
    prisma.bookingInquiry.count(),
    prisma.corporatePortalGrant.count({ where: { revokedAt: null } }),
  ]);

  console.log("Counts after seed:");
  console.log(`  Corporate leads:     ${counts[0]}`);
  console.log(`  Event leads:         ${counts[1]}`);
  console.log(`  Experience leads:    ${counts[2]}`);
  console.log(`  Trips:               ${counts[3]}`);
  console.log(`  Intake (pending):    ${counts[4]}`);
  console.log(`  Booking inquiries:   ${counts[5]}`);
  console.log(`  Portal grants:       ${counts[6]}`);
  console.log("\nSign-in (password for all demo users):", DEMO_PASSWORD);
  console.log("  Staff:  ops-admin@hitouch-luxury.test  |  dispatch@hitouch-luxury.test");
  console.log("  Driver: driver-alpha@hitouch-luxury.test  (+ beta, gamma, delta)");
  console.log("  Portal: demo-alpha@hitouch-portal.test  |  demo-beta@hitouch-portal.test");
  console.log("\nPages to explore:");
  console.log("  /admin          dashboard");
  console.log("  /admin/trips    trip desk");
  console.log("  /admin/intake   Smith queue");
  console.log("  /driver/dashboard");
  console.log("  /login?mode=corporate\n");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
