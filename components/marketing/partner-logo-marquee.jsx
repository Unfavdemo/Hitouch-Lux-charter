import { partnerLogos } from "@/content/partners";

function LogoTile({ partner }) {
  return (
    <div className="mx-6 flex h-16 w-44 shrink-0 items-center justify-center rounded-md border border-white/10 bg-midnight/60 px-4">
      <div className="text-center">
        <p className="text-[10px] font-semibold uppercase tracking-[var(--tracking-brand)] text-accent-readable">
          {partner.abbr}
        </p>
        <p className="mt-1 text-[11px] leading-tight text-charcoal">{partner.name}</p>
      </div>
    </div>
  );
}

export function PartnerLogoMarquee() {
  const track = [...partnerLogos, ...partnerLogos];

  return (
    <div className="relative overflow-hidden border-y border-white/10 bg-charcoal-footer py-10">
      <p className="mb-8 text-center text-[11px] font-semibold uppercase tracking-[var(--tracking-brand)] text-accent-readable">
        Trusted by select partners
      </p>
      <div className="flex w-max animate-partner-marquee">
        {track.map((partner, index) => (
          <LogoTile key={`${partner.id}-${index}`} partner={partner} />
        ))}
      </div>
    </div>
  );
}
