import Image from "next/image";
import { LuxuryEyebrow } from "@/components/marketing/luxury-eyebrow";
import { Button } from "@/components/ui/button";

export function FeaturedSprinterSpotlight({ sprinter }) {
  return (
    <div className="luxury-image-card overflow-hidden lg:grid lg:grid-cols-2">
      <div className="relative aspect-[16/10] min-h-[16rem] lg:aspect-auto lg:min-h-[22rem]">
        <Image
          src={sprinter.image}
          alt={sprinter.alt}
          fill
          sizes="(min-width: 1024px) 50vw, 100vw"
          className="object-cover opacity-95 transition duration-700 hover:scale-[1.03]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-midnight via-midnight/35 to-transparent lg:bg-gradient-to-r lg:from-transparent lg:via-midnight/20 lg:to-midnight" />
        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-br from-accent/15 via-transparent to-transparent"
          aria-hidden
        />
      </div>
      <div className="relative flex flex-col justify-center border-t border-white/10 bg-gradient-to-br from-surface/90 to-midnight p-8 sm:p-10 lg:border-t-0 lg:border-l lg:p-12">
        <LuxuryEyebrow light={false}>Featured vehicle</LuxuryEyebrow>
        <h2 className="luxury-display mt-5 text-3xl text-heading sm:text-4xl">{sprinter.title}</h2>
        <p className="mt-4 max-w-prose text-sm leading-relaxed text-on-dark-body sm:text-base">
          {sprinter.blurb}
        </p>
        <div className="mt-8 h-px w-12 bg-gradient-to-r from-accent-readable/90 to-transparent" aria-hidden />
        <div className="mt-8">
          <Button href="/fleet" variant="outlineLight">
            Explore fleet
          </Button>
        </div>
      </div>
    </div>
  );
}
