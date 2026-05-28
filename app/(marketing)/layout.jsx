import { FloatingComms } from "@/components/marketing/floating-comms";
import { PartnerLogoMarquee } from "@/components/marketing/partner-logo-marquee";
import { SiteFooter } from "@/components/marketing/site-footer";
import { SiteNav } from "@/components/marketing/site-nav";
import { SmithAiBridge } from "@/components/marketing/smith-ai-bridge";
import { SmithDemoCallout } from "@/components/marketing/smith-demo-callout";
import { site } from "@/content/site";

export default function MarketingLayout({ children }) {
  return (
    <>
      <SiteNav
        brandName={site.brandName}
        brandNameNav={site.brandNameNav}
        links={site.nav}
        phoneTel={site.phoneTel}
        phoneDisplay={site.phoneDisplay}
        primaryCta={site.primaryCta}
        signInCta={site.signInCta}
        externalBookingUrl={site.moovsBookingUrl}
      />
      <main id="main" className="flex min-w-0 flex-1 flex-col overflow-x-hidden">
        {children}
      </main>
      <PartnerLogoMarquee />
      <SiteFooter site={site} />
      <SmithAiBridge />
      <SmithDemoCallout />
      <FloatingComms
        site={{
          brandName: site.brandName,
          phoneTel: site.phoneTel,
          phoneDisplay: site.phoneDisplay,
          email: site.email,
        }}
      />
    </>
  );
}
