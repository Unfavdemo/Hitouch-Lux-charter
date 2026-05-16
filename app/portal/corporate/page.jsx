import Link from "next/link";
import { Suspense } from "react";
import { cookies } from "next/headers";
import { CorporatePortalLoginForm } from "@/components/portal/corporate-portal-login-form";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { corporatePortalTiles } from "@/content/corporate-portal";
import { site } from "@/content/site";
import {
  corporatePortalAuthConfigured,
  getGrantIdFromCookies,
} from "@/lib/corporate-portal-auth";
import { getPortalSessionContext } from "@/lib/corporate-portal-storage";

function LoginFallback() {
  return <div className="h-40 animate-pulse rounded-md bg-accent-soft/20" aria-hidden />;
}

export default async function CorporatePortalPage({ searchParams }) {
  const sp = await searchParams;
  const errKey = typeof sp.corp_err === "string" ? sp.corp_err : null;

  const jar = await cookies();
  const grantId =
    corporatePortalAuthConfigured() ? getGrantIdFromCookies(jar) : null;
  const ctx =
    grantId && corporatePortalAuthConfigured()
      ? await getPortalSessionContext(grantId)
      : null;

  if (ctx) {
    const tiles = corporatePortalTiles(site);
    return (
      <div className="flex-1 py-10 sm:py-14">
        <Container>
          <Badge>Welcome back</Badge>
          <h1 className="mt-4 font-serif text-3xl text-heading sm:text-4xl">
            {ctx.company}
          </h1>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted sm:text-base">
            Your shortcuts to booking, fleet context, and concierge channels. Moovs remains the
            system of record for live availability and confirmations.
          </p>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {tiles.map((t) => (
              <Card key={t.id} className="flex flex-col p-5">
                <h2 className="font-serif text-lg text-heading">{t.title}</h2>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{t.description}</p>
                <div className="mt-5">
                  <Button
                    href={t.href}
                    variant="secondary"
                    className="w-full border-heading/25 text-heading sm:w-auto"
                    {...(t.external
                      ? { target: "_blank", rel: "noopener noreferrer" }
                      : {})}
                  >
                    {t.buttonLabel}
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </Container>
      </div>
    );
  }

  return (
    <div className="flex flex-1 flex-col items-center justify-center px-4 py-16 sm:py-20">
      <div className="w-full max-w-md rounded-[var(--radius-card)] border border-accent/15 bg-surface p-8 shadow-sm shadow-black/20 ring-1 ring-inset ring-accent/5">
        <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-muted">
          Magic link sign-in
        </p>
        <h1 className="mt-2 font-serif text-2xl text-heading">Corporate client portal</h1>
        <p className="mt-3 text-sm leading-relaxed text-muted">
          Enter the email address your HiTouch onboarding team enabled. We will send a single-use
          link that expires in 30 minutes.
        </p>
        <Suspense fallback={<LoginFallback />}>
          <CorporatePortalLoginForm initialErrorKey={errKey} />
        </Suspense>
        <p className="mt-8 text-center text-xs text-muted">
          Need access?{" "}
          <Link className="font-medium text-accent-readable underline-offset-2 hover:underline" href="/corporate">
            Corporate onboarding
          </Link>{" "}
          or{" "}
          <Link className="font-medium text-accent-readable underline-offset-2 hover:underline" href="/contact">
            contact concierge
          </Link>
          .
        </p>
      </div>
    </div>
  );
}
