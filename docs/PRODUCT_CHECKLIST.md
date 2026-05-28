# HiTouch Luxury — Product checklist

What is **built and usable** vs **partial**, **stub**, or **not started**. Use this for demos, handoff, and sprint planning.

Last updated: demo-ready operations (no vendor API keys required for core flows).

---

## Demo setup (no Twilio / Resend / Smith keys)

```bash
npm run seed:all    # rich dataset
npm run dev
```

Add to `.env` (minimum):

| Variable | Purpose |
|----------|---------|
| `DATABASE_URL` + `DIRECT_URL` | All ops data |
| `USER_SESSION_SECRET` or `ADMIN_SESSION_SECRET` | Staff + driver login |
| `CORPORATE_PORTAL_SESSION_SECRET` | Corporate portal |
| `ADMIN_PASSWORD` | Optional legacy staff login |

Optional: `DEV_AUTH_HELPER=1` → `/dev/auth-test` · `NEXT_PUBLIC_DEMO_MODE=1` → demo Smith callout + webhook bypass

**Demo password** (seeded users): `HitouchDemo2026!`

| Role | Emails |
|------|--------|
| Staff | `ops-admin@hitouch-luxury.test`, `dispatch@hitouch-luxury.test` |
| Chauffeur | `driver-alpha@…` through `driver-delta@hitouch-luxury.test` |
| Corporate portal | `demo-alpha@hitouch-portal.test`, `demo-beta@hitouch-portal.test` |

---

## Fleshed out (ready to demo — no API keys)

| Area | What works |
|------|------------|
| **Marketing site** | Experience-led pages, fleet, forms, SEO, sitemap |
| **Unified login** | `/login` — Staff, Driver, Corporate |
| **Admin dashboard** | KPIs, pipeline, upcoming trips, intake preview, booking inquiry count |
| **Lead desk** | Accept · Decline · Mark pending + **auto-book** + mock lead email log |
| **Trip desk** | Create, assign, **edit**, **cancel**, passenger **tracking link** |
| **Intake queue** | **Create trip** from Smith row (pre-filled) + process/dismiss |
| **Booking inquiries** | `/admin/booking-inquiries` — list + **convert to trip** |
| **Driver app** | Status ladder; mock SMS + assign notifications in terminal |
| **Passenger tracking** | `/track/[token]` — live map + status (driver phone GPS) |
| **Live GPS** | Driver phone → OpenStreetMap map; no Google Maps API key |
| **Dispatch map** | `/admin/dispatch` — all trips on one map + trip list |
| **Corporate portal** | Magic link with **dev URL on page** (no Resend) |
| **Booking wizard** | `/book` — mock quote + DB inquiries |
| **Smith demo** | Seeded intake + demo webhook header (see below) |
| **Dev auth** | `/dev/auth-test` when `DEV_AUTH_HELPER=1` |

### Smith intake demo (no secret)

```bash
curl -X POST http://localhost:3000/api/webhooks/smith-intake \
  -H "Content-Type: application/json" \
  -H "x-hitouch-demo-webhook: 1" \
  -d '{"name":"Demo Caller","email":"demo@test.com","tripUpdateNotes":"PHL Terminal A → Rittenhouse Square"}'
```

Then open `/admin/intake` → **Create trip**.

---

## Partially built (by design or needs vendor keys)

| Area | Done | Needs external keys / future work |
|------|------|-----------------------------------|
| **Moovs** | Links + `/book` | Live booking engine (Moovs is system of record) |
| **Smith widget embed** | Demo callout + intake queue | `NEXT_PUBLIC_SMITH_AI_WIDGET_ID` |
| **SMS** | Mock logs in dev | `TWILIO_*` for real texts |
| **Email** | Mock logs + portal dev link | `RESEND_*` for real mail |
| **Reviews** | Static `content/reviews.js` | Google/Yelp API |
| **Pricing** | Mock quote in `/book` | Real distance/pricing |
| **GPS / maps** | Driver phone GPS + OSM tiles | Google/Mapbox styling, geocoded pickup pins |
| **Payments** | Invoicing field on forms | Stripe / AR |
| **RBAC** | Admin + chauffeur roles | Per-page permissions |
| **File-mode storage** | Leads without DB | No trips/users |

---

## Not started (out of scope for demo)

Replace Moovs, calendar sync, native apps, multi-tenant, audit log, auto-assign chauffeurs, E2E tests, i18n, document uploads, fleet maintenance ops, revenue reporting.

---

## 20-minute demo script

1. `npm run seed:all` → `npm run dev` → `npm run test:auth` for URLs
2. `/admin` — dashboard
3. `/admin/experience` — Accept pending → `/admin/trips` new row
4. `/admin/trips` — assign trip, **Live map** / track link, edit schedule
5. `/login` → Driver → allow GPS → open track link on another device to see the car move
6. Driver advances trip (watch terminal for mock SMS)
6. `/admin/intake` — **Create trip** from a row
7. `/admin/booking-inquiries` — **Convert to trip**
8. `/login` → Corporate → magic link on page (no Resend)
9. Optional: curl Smith demo webhook above

---

## Environment reference

| Feature | Requires |
|---------|----------|
| Full ops demo | `DATABASE_URL` |
| Staff/driver login | `USER_SESSION_SECRET` |
| Corporate portal | `CORPORATE_PORTAL_SESSION_SECRET` |
| Real SMS | `TWILIO_*` |
| Real email | `RESEND_*` |
| Smith production webhook | `SMITH_AI_WEBHOOK_SECRET` |
| Smith widget | `NEXT_PUBLIC_ENABLE_SMITH_AI=1` + widget id |
| Booking follow-up cron | Disabled (`ENABLE_BOOKING_CRON=1` + `vercel.json` crons to re-enable) |
