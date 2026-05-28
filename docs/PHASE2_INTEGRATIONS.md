# Phase 2 — Integrations & growth layer

This document covers work scoped after Phase 1 (Prisma, `/book`, `/experiences`, corporate wireframes, inquiry follow-up cron).

## Implemented (Phase 2)

| Area | Location |
|------|----------|
| Success Story + review masonry | `components/marketing/success-story.jsx`, `review-masonry.jsx`, home + about |
| Partner marquee | `components/marketing/partner-logo-marquee.jsx`, marketing layout footer |
| SEO / AEO | `lib/seo/*`, `app/sitemap.ts`, `app/robots.ts`, JSON-LD on key pages |
| Smith.ai webhook + embed hook | `app/api/integrations/smith-ai/webhook`, `smith-ai-bridge.jsx`, `ConciergeCallLog` model |
| AEO snippets | `content/aeo-snippets.js` merged into FAQ schema on `/` and `/corporate` |

## Smith.ai virtual receptionist

### Prerequisites

1. Create a Smith.ai account and enable API access for your workspace.
2. Obtain `SMITH_AI_API_KEY` and webhook signing secret `SMITH_AI_WEBHOOK_SECRET`.
3. Decide embed vs API-only:
   - **Embed:** chat/voice widget on marketing pages (feature-flagged).
   - **API:** route inbound events to HiTouch lead tables.

### Implementation steps

| Step | Task |
|------|------|
| 1 | Add env vars to Vercel: `SMITH_AI_API_KEY`, `SMITH_AI_WEBHOOK_SECRET`, optional `NEXT_PUBLIC_SMITH_AI_WIDGET_ID`. |
| 2 | Create `app/api/integrations/smith-ai/webhook/route.ts` — verify signature, parse event payload, log to Postgres (`ConciergeCallLog` model or append to `BookingInquiry.tripPayload`). |
| 3 | When a `/book` wizard session exists, pass `inquiryId` into Smith.ai custom fields from `BookingWizard` so voice/chat escalations attach to the same lead row. |
| 4 | Optional embed in `app/(marketing)/layout.jsx` behind `NEXT_PUBLIC_ENABLE_SMITH_AI=1`; update CSP `script-src` / `connect-src` for Smith.ai domains. |
| 5 | Map high-intent events (missed call, completed intake) to `scheduleTouchback` only when no `COMPLETED` booking inquiry exists. |
| 6 | QA on staging with Smith.ai test mode before enabling production widget. |

### Suggested Prisma addition (future)

```prisma
model ConciergeCallLog {
  id        String   @id @default(uuid()) @db.Uuid
  createdAt DateTime @default(now())
  source    String   // smith_ai
  inquiryId String?  @db.Uuid
  payload   Json
}
```

---

## SEO & AEO (Answer Engine Optimization)

### File layout (recommended)

```
lib/seo/
  metadata.ts    # buildPageMetadata({ title, description, path, image })
  json-ld.ts     # localBusiness(), service(), faqPage(), breadcrumb()
app/
  sitemap.ts
  robots.ts
```

### Traditional SEO

- Per-route `metadata` exports (title, description, `openGraph`, `twitter`, canonical via `metadataBase`).
- `app/sitemap.ts` — include `/`, `/experiences`, `/corporate`, `/book`, `/fleet`, `/services`, `/faq`.
- Semantic HTML: one `h1` per page, logical heading order, descriptive link text.

### AEO (AI / answer engines)

- Add concise Q&A blocks in `content/` (e.g. “What areas does HiTouch serve?”, “How does corporate NET 30 billing work?”).
- Emit `FAQPage` JSON-LD on `/faq` and corporate service pages.
- `LocalBusiness` + `Service` schema on home and contact with `areaServed`, `telephone`, `priceRange`.
- Use plain-language first sentences in metadata descriptions (models often quote the lede).
- Optional `speakable` CSS selector on hero/supporting paragraphs.

### Pages to prioritize

1. `/` — LocalBusiness + primary services
2. `/corporate` — Service + FAQ snippets for B2B terms
3. `/experiences` — ItemList of curated packages
4. `/book` — WebPage + clear “estimate not final price” disclaimer in copy

---

## Phase 2 UI components (not in Phase 1 scope)

- `components/marketing/success-story.jsx` — award badge slot + masonry reviews
- `components/marketing/review-masonry.jsx` — Google/Yelp-shaped placeholders
- `components/marketing/partner-logo-marquee.jsx` — `content/partners.js` logo strip
