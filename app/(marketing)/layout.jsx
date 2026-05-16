import { FloatingComms } from "@/components/marketing/floating-comms";
import { SiteFooter } from "@/components/marketing/site-footer";
import { SiteNav } from "@/components/marketing/site-nav";
import { site } from "@/content/site";

export default function MarketingLayout({ children }) {
  return (
    <>
      <SiteNav
        brandName={site.brandName}
        links={site.nav}
        phoneTel={site.phoneTel}
        phoneDisplay={site.phoneDisplay}
        externalBookingUrl={site.moovsBookingUrl}
      />
      <main id="main" className="flex flex-1 flex-col">
        {children}
      </main>
      <SiteFooter site={site} />
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
