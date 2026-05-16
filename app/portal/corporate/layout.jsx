import Link from "next/link";
import { cookies } from "next/headers";
import { CorporatePortalLogoutButton } from "@/components/portal/corporate-portal-logout-button";
import {
  corporatePortalAuthConfigured,
  getGrantIdFromCookies,
} from "@/lib/corporate-portal-auth";
import { getPortalSessionContext } from "@/lib/corporate-portal-storage";

/** @type {import('next').Metadata} */
export const metadata = {
  title: "Corporate client portal",
  robots: { index: false, follow: false },
};

export default async function CorporatePortalLayout({ children }) {
  const jar = await cookies();
  const grantId =
    corporatePortalAuthConfigured() ? getGrantIdFromCookies(jar) : null;
  const ctx =
    grantId && corporatePortalAuthConfigured()
      ? await getPortalSessionContext(grantId)
      : null;

  return (
    <div className="flex min-h-full flex-col bg-page text-light-ink">
      <header className="border-b border-accent/15 bg-surface/80 backdrop-blur-sm">
        <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-muted">
              HiTouch · Corporate clients
            </p>
            <Link
              href="/portal/corporate"
              className="mt-1 font-serif text-xl text-heading hover:text-accent-readable"
            >
              Client portal
            </Link>
          </div>
          {ctx ? (
            <div className="flex flex-wrap items-center gap-3">
              <p className="max-w-xs truncate text-sm text-muted">
                <span className="font-medium text-heading">{ctx.company}</span>
                <span className="mx-1 text-muted">·</span>
                {ctx.email}
              </p>
              <CorporatePortalLogoutButton />
            </div>
          ) : (
            <Link
              href="/"
              className="text-xs font-semibold uppercase tracking-wider text-muted hover:text-heading"
            >
              ← Marketing site
            </Link>
          )}
        </div>
      </header>
      <div className="flex flex-1 flex-col">{children}</div>
    </div>
  );
}
