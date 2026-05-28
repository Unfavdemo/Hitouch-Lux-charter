/**
 * Prints local URLs and env checklist for testing staff admin + corporate portal.
 * Run: npm run test:auth
 */

import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { DEMO_PORTAL_TEST_EMAILS } from "../lib/dev-auth-helper.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");

function loadDotEnv() {
  for (const name of [".env.local", ".env"]) {
    const p = path.join(ROOT, name);
    if (!existsSync(p)) continue;
    const text = readFileSync(p, "utf8");
    for (const line of text.split("\n")) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith("#")) continue;
      const eq = trimmed.indexOf("=");
      if (eq < 1) continue;
      const key = trimmed.slice(0, eq).trim();
      let val = trimmed.slice(eq + 1).trim();
      if (
        (val.startsWith('"') && val.endsWith('"')) ||
        (val.startsWith("'") && val.endsWith("'"))
      ) {
        val = val.slice(1, -1);
      }
      if (process.env[key] === undefined) process.env[key] = val;
    }
  }
}

loadDotEnv();

const port = process.env.PORT || "3000";
const base = (process.env.NEXT_PUBLIC_SITE_URL || `http://localhost:${port}`).replace(/\/$/, "");

const u = process.env.ADMIN_USERNAME || "admin";
const hasAdminPw = Boolean(process.env.ADMIN_PASSWORD?.trim());
const hasAdminSecret = Boolean(process.env.ADMIN_SESSION_SECRET?.trim());
const hasUserSecret = Boolean(
  process.env.USER_SESSION_SECRET?.trim() || process.env.ADMIN_SESSION_SECRET?.trim(),
);
const hasPortalSecret = Boolean(process.env.CORPORATE_PORTAL_SESSION_SECRET?.trim());
const hasDb = Boolean(process.env.DATABASE_URL?.trim());

console.log("");
console.log("HiTouch — local demo & auth");
console.log("────────────────────────────");
console.log("");
console.log("Seed full demo:  npm run seed:all");
console.log("Demo password:   HitouchDemo2026!  (all seeded User accounts)");
console.log("");
console.log("Staff / driver (unified login)");
console.log(`   ${base}/login`);
console.log("   Staff:    ops-admin@hitouch-luxury.test  |  dispatch@hitouch-luxury.test");
console.log("   Drivers:  driver-alpha@hitouch-luxury.test  (+ beta, gamma, delta)");
console.log("");
console.log("Legacy staff admin");
console.log(`   ${base}/admin/login`);
console.log(`   Username: ${u}`);
console.log(
  `   Password: ${hasAdminPw ? "(ADMIN_PASSWORD in .env)" : "MISSING — set ADMIN_PASSWORD"}`,
);
console.log(
  `   User session: ${hasUserSecret ? "OK" : "MISSING — USER_SESSION_SECRET or ADMIN_SESSION_SECRET"}`,
);
console.log("");
console.log("Corporate portal");
console.log(`   ${base}/login?mode=corporate`);
console.log(`   DB: ${hasDb ? "Postgres" : "file mode — limited ops"}`);
console.log(
  `   Portal secret: ${hasPortalSecret ? "OK" : "MISSING — CORPORATE_PORTAL_SESSION_SECRET"}`,
);
console.log("   Portal emails (after seed:corporate-demo or seed:all):");
for (const em of DEMO_PORTAL_TEST_EMAILS) {
  console.log(`     • ${em}`);
}
console.log("");
console.log("Ops pages (need DATABASE_URL)");
console.log(`   ${base}/admin`);
console.log(`   ${base}/admin/dispatch   live fleet map`);
console.log(`   ${base}/admin/trips`);
console.log(`   ${base}/admin/intake`);
console.log(`   ${base}/admin/booking-inquiries`);
console.log(`   ${base}/driver/dashboard`);
console.log("");
console.log("Dev helpers");
console.log("   DEV_AUTH_HELPER=1  →  /dev/auth-test");
console.log("   Smith demo POST:    x-hitouch-demo-webhook: 1  (no SMITH_AI_WEBHOOK_SECRET)");
console.log("   Mock SMS/email:     watch the terminal running npm run dev");
console.log("");
