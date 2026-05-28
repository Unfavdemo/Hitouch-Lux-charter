import Link from "next/link";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
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
export default async function CorporatePortalPage({ searchParams }) {
  const jar = await cookies();

  if (!corporatePortalAuthConfigured()) {
    redirect("/login?mode=corporate");
  }

  const grantId = getGrantIdFromCookies(jar);
  const ctx = grantId ? await getPortalSessionContext(grantId) : null;

  if (!ctx) {
    const sp = await searchParams;
    const params = new URLSearchParams();
    params.set("mode", "corporate");
    if (typeof sp.corp_err === "string") params.set("corp_err", sp.corp_err);
    if (typeof sp.redirect === "string") params.set("redirect", sp.redirect);
    redirect(`/login?${params.toString()}`);
  }

  const tiles = corporatePortalTiles(site);

  return (
    <div className="flex-1 py-10 sm:py-14">
      <Container>
        <Badge>Welcome back</Badge>
        <h1 className="mt-4 font-serif text-3xl text-heading sm:text-4xl">{ctx.company}</h1>
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
                  {...(t.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                >
                  {t.buttonLabel}
                </Button>
              </div>
            </Card>
          ))}
        </div>
        <p className="mt-10 text-center text-xs text-muted">
          Wrong account?{" "}
          <Link className="font-medium text-accent-readable underline-offset-2 hover:underline" href="/login">
            Sign in with a different email
          </Link>
        </p>
      </Container>
    </div>
  );
}
