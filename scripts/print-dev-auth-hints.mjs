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
const hasPortalSecret = Boolean(process.env.CORPORATE_PORTAL_SESSION_SECRET?.trim());
const hasDb = Boolean(process.env.DATABASE_URL?.trim());

console.log("");
console.log("HiTouch — local auth testing");
console.log("────────────────────────────");
console.log("");
console.log("1) Staff admin (username + password)");
console.log(`   ${base}/admin/login`);
console.log(`   Username: ${u}  (from ADMIN_USERNAME or default admin)`);
console.log(
  `   Password: ${hasAdminPw ? "(set in ADMIN_PASSWORD — type it on the form)" : "MISSING — set ADMIN_PASSWORD in .env"}`,
);
console.log(
  `   Session:  ${hasAdminSecret ? "ADMIN_SESSION_SECRET is set" : "MISSING — set ADMIN_SESSION_SECRET in .env"}`,
);
console.log("");
console.log("2) Corporate portal (magic link)");
console.log(`   Seed demo leads + grants:  npm run seed:corporate-demo`);
console.log(`   Storage: ${hasDb ? "Postgres (DATABASE_URL)" : "data/b2b-leads.json + data/corporate-portal.json"}`);
console.log(
  `   Portal session secret: ${hasPortalSecret ? "CORPORATE_PORTAL_SESSION_SECRET is set" : "MISSING — required for verify"}`,
);
console.log("");
console.log("   Demo emails (after seed):");
for (const em of DEMO_PORTAL_TEST_EMAILS) {
  console.log(`     • ${em}`);
}
console.log("");
console.log("3) One-click portal (dev only)");
console.log("   Add to .env:  DEV_AUTH_HELPER=1");
console.log(`   Then open:     ${base}/dev/auth-test`);
console.log("   (Or hit /api/dev/portal-magic-link?email=… — same guard.)");
console.log("");
