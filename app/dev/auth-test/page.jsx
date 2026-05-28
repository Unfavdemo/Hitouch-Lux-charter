import Link from "next/link";
import { notFound } from "next/navigation";
import { adminAuthConfigured } from "@/lib/admin-auth";
import { corporatePortalAuthConfigured } from "@/lib/corporate-portal-auth";
import { DEMO_PORTAL_TEST_EMAILS, isDevAuthHelperEnabled } from "@/lib/dev-auth-helper";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Auth test (dev)",
  robots: { index: false, follow: false },
};

export default function DevAuthTestPage() {
  if (!isDevAuthHelperEnabled()) {
    notFound();
  }

  const adminReady = adminAuthConfigured();
  const portalReady = corporatePortalAuthConfigured();

  return (
    <div className="min-h-screen bg-zinc-950 px-4 py-12 text-zinc-100">
      <div className="mx-auto max-w-lg space-y-8">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-amber-200/80">
            Development only
          </p>
          <h1 className="mt-2 font-serif text-2xl text-white">Test admin &amp; corporate portal</h1>
          <p className="mt-2 text-sm text-zinc-400">
            This page exists only when <code className="text-amber-200/90">DEV_AUTH_HELPER=1</code> and{" "}
            <code className="text-amber-200/90">NODE_ENV=development</code>. Remove the flag before any
            public deploy.
          </p>
        </div>

        <section className="rounded-lg border border-white/10 bg-white/[0.03] p-5">
          <h2 className="text-xs font-semibold uppercase tracking-wider text-zinc-500">Staff admin</h2>
          <ul className="mt-3 list-inside list-disc space-y-1 text-sm text-zinc-300">
            <li>
              Set <code className="text-zinc-200">ADMIN_PASSWORD</code> and{" "}
              <code className="text-zinc-200">ADMIN_SESSION_SECRET</code> in <code className="text-zinc-200">.env</code>{" "}
              (optional: <code className="text-zinc-200">ADMIN_USERNAME</code>, default <code className="text-zinc-200">admin</code>).
            </li>
            <li>
              Open{" "}
              <Link className="text-amber-200 underline-offset-2 hover:underline" href="/login?mode=staff">
                /login
              </Link>{" "}
              and sign in with those credentials.
            </li>
          </ul>
          <p className="mt-3 text-xs text-zinc-500">
            Status:{" "}
            {adminReady ? (
              <span className="text-emerald-300/90">admin env looks ready</span>
            ) : (
              <span className="text-amber-200/90">missing ADMIN_PASSWORD or ADMIN_SESSION_SECRET</span>
            )}
          </p>
        </section>

        <section className="rounded-lg border border-white/10 bg-white/[0.03] p-5">
          <h2 className="text-xs font-semibold uppercase tracking-wider text-zinc-500">Corporate portal (magic link)</h2>
          <ol className="mt-3 list-inside list-decimal space-y-2 text-sm text-zinc-300">
            <li>
              Set <code className="text-zinc-200">CORPORATE_PORTAL_SESSION_SECRET</code> in <code className="text-zinc-200">.env</code>{" "}
              (required for verify + session).
            </li>
            <li>
              From the repo root run: <code className="text-zinc-200">npm run seed:corporate-demo</code> (creates demo leads + portal grants).
            </li>
            <li>
              Use one of the links below — you will be redirected through verify and into the portal dashboard.
            </li>
          </ol>
          <p className="mt-3 text-xs text-zinc-500">
            Portal session env:{" "}
            {portalReady ? (
              <span className="text-emerald-300/90">CORPORATE_PORTAL_SESSION_SECRET set</span>
            ) : (
              <span className="text-amber-200/90">set CORPORATE_PORTAL_SESSION_SECRET</span>
            )}
          </p>
          <div className="mt-4 flex flex-col gap-2">
            {DEMO_PORTAL_TEST_EMAILS.map((email) => (
              <Link
                key={email}
                href={`/api/dev/portal-magic-link?email=${encodeURIComponent(email)}`}
                className="rounded-md border border-emerald-500/35 bg-emerald-950/20 px-3 py-2 text-center text-sm font-medium text-emerald-100 transition hover:border-emerald-400/50 hover:bg-emerald-950/35"
              >
                Sign in as portal · {email}
              </Link>
            ))}
          </div>
        </section>

        <p className="text-center text-xs text-zinc-600">
          CLI: <code className="text-zinc-500">npm run test:auth</code>
        </p>
      </div>
    </div>
  );
}
