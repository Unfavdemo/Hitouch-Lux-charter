/**
 * Seed operations demo: admin user, chauffeurs, company, trips, pending submission.
 * Usage: node scripts/seed-operations-demo.mjs
 * Requires DATABASE_URL in .env
 */
import { createRequire } from "node:module";
import { randomBytes, scryptSync } from "node:crypto";

const require = createRequire(import.meta.url);
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const DEMO_PASSWORD = "HitouchDemo2026!";

function hashPassword(plain) {
  const salt = randomBytes(16);
  const hash = scryptSync(plain, salt, 64, { N: 16384, r: 8, p: 1 });
  return `scrypt:${salt.toString("base64url")}:${hash.toString("base64url")}`;
}

async function upsertUser(email, name, globalRole, phone) {
  const passwordHash = hashPassword(DEMO_PASSWORD);
  return prisma.user.upsert({
    where: { email },
    create: { email, name, passwordHash, globalRole, phone },
    update: { name, passwordHash, globalRole, phone },
  });
}

async function main() {
  if (!process.env.DATABASE_URL?.trim()) {
    console.error("DATABASE_URL is required.");
    process.exit(1);
  }

  const admin = await upsertUser(
    "ops-admin@hitouch-luxury.test",
    "Operations Admin",
    "ADMIN",
    null,
  );
  const chauffeur1 = await upsertUser(
    "driver-alpha@hitouch-luxury.test",
    "Alex Rivera",
    "CHAUFFEUR",
    "+12155550101",
  );
  const chauffeur2 = await upsertUser(
    "driver-beta@hitouch-luxury.test",
    "Jordan Lee",
    "CHAUFFEUR",
    "+12155550102",
  );

  let company = await prisma.corporateCompany.findFirst({
    where: { name: "Demo Holdings Group" },
  });
  if (!company) {
    company = await prisma.corporateCompany.create({
      data: {
        name: "Demo Holdings Group",
        contactEmail: "travel@demoholdings.test",
        phone: "+12155550999",
      },
    });
  }

  const scheduled = new Date();
  scheduled.setHours(scheduled.getHours() + 2);

  const existingTrips = await prisma.trip.count({
    where: { chauffeurId: { in: [chauffeur1.id, chauffeur2.id] }, status: { not: "COMPLETED" } },
  });

  if (existingTrips === 0) {
    await prisma.trip.create({
      data: {
        status: "ASSIGNED",
        scheduledAt: scheduled,
        pickupLabel: "PHL Terminal A — Arrivals",
        dropoffLabel: "Rittenhouse Square, Philadelphia",
        notes: "Demo active trip for driver alpha",
        chauffeurId: chauffeur1.id,
        corporateCompanyId: company.id,
        passengerTrips: {
          create: {
            name: "Morgan Blake",
            phone: "+12155550188",
            email: "morgan.blake@demoholdings.test",
            isPrimary: true,
          },
        },
      },
    });

    const scheduled2 = new Date(scheduled);
    scheduled2.setHours(scheduled2.getHours() + 3);

    await prisma.trip.create({
      data: {
        status: "ASSIGNED",
        scheduledAt: scheduled2,
        pickupLabel: "30th Street Station",
        dropoffLabel: "King of Prussia, PA",
        notes: "Demo active trip for driver beta",
        chauffeurId: chauffeur2.id,
        corporateCompanyId: company.id,
        passengerTrips: {
          create: {
            name: "Taylor Chen",
            phone: "+12155550199",
            isPrimary: true,
          },
        },
      },
    });
  }

  const pendingCount = await prisma.pendingSubmission.count({
    where: { source: "smith_intake", status: "PENDING" },
  });
  if (pendingCount === 0) {
    await prisma.pendingSubmission.create({
      data: {
        source: "smith_intake",
        status: "PENDING",
        payload: {
          name: "Sam Ortiz",
          email: "sam.ortiz@example.com",
          companyName: "Acme Events",
          tripUpdateNotes: "Need sprinter for 6 pax PHL to Center City Friday 6pm",
          transcription: "Caller asked about corporate billing and return trip.",
          receivedAt: new Date().toISOString(),
        },
      },
    });
  }

  console.log("\nOperations demo seed complete.\n");
  console.log("Staff (User ADMIN) — sign in at /login → HiTouch staff tab:");
  console.log(`  Email:    ${admin.email}`);
  console.log(`  Password: ${DEMO_PASSWORD}`);
  console.log("\nChauffeurs — sign in at /login → Driver tab:");
  console.log(`  ${chauffeur1.email} / ${DEMO_PASSWORD}`);
  console.log(`  ${chauffeur2.email} / ${DEMO_PASSWORD}`);
  console.log("\nLegacy env admin (ADMIN_USERNAME/ADMIN_PASSWORD) still works if configured.\n");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
