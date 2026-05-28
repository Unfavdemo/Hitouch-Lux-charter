# HiTouch Luxury Charter

Next.js (App Router) marketing site, B2B intake admin, and corporate client portal (magic link).

## Deploy on Vercel

Vercel detects **Next.js** from `package.json` and runs **`npm run build`**.

### Before you push

- **Node:** use **20.x or newer** (see `engines` in `package.json`). In Vercel: **Project → Settings → General → Node.js Version** → **20.x**.
- **CI parity:** from the repo root, `npm run build` and `npm run lint` should pass.

### Environment variables (Vercel → Settings → Environment Variables)

| Variable | Production | Notes |
|----------|------------|--------|
| `DATABASE_URL` | **Strongly recommended** | Neon/Postgres. Without it, the app uses `data/*.json`, which **does not persist** across serverless invocations—leads, experience intakes, and portal grants would be unreliable in production. |
| `ADMIN_SESSION_SECRET` | Required for `/admin` | Long random string. |
| `ADMIN_PASSWORD` | Required for `/admin` | Staff password. |
| `ADMIN_USERNAME` | Optional | Defaults to `admin` if unset. |
| `CORPORATE_PORTAL_SESSION_SECRET` | Required for `/portal/corporate` | Long random string; **different** from `ADMIN_SESSION_SECRET`. |
| `RESEND_API_KEY` | Optional | Magic-link email in production. |
| `CORPORATE_PORTAL_FROM_EMAIL` | If using Resend | Verified sender in Resend. |
| `NEXT_PUBLIC_SITE_URL` | Optional | Canonical URL (e.g. `https://www.hitouchluxurycharter.com`) for absolute links in email. |

Do **not** set `CORPORATE_PORTAL_DEV_RETURN_LINK=true` in production (it can expose magic links in API responses when email is not sent).

### After deploy

Smoke-test `/`, `/corporate`, `/portal/corporate`, and `/admin/login` on the production domain.

---

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

See [.env.example](.env.example), [docs/USER_FLOW.md](docs/USER_FLOW.md), and [docs/PRODUCT_CHECKLIST.md](docs/PRODUCT_CHECKLIST.md) for flows, env vars, and what is / isn’t built yet.

**Demo data:** `npm run seed:all` (full sample set) · `npm run seed:corporate-demo` (portal testers only).

---

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Next.js deployment](https://nextjs.org/docs/app/building-your-application/deploying)
- [Vercel Platform](https://vercel.com/new)

This repo was originally bootstrapped with [create-next-app](https://nextjs.org/docs/app/api-reference/cli/create-next-app).
