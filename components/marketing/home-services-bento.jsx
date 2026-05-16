import Image from "next/image";
import Link from "next/link";
import { servicesBento } from "@/content/home";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";

function cellClass(layout) {
  if (layout === "large") {
    return "md:col-span-7 md:row-span-2 min-h-[20rem] sm:min-h-[24rem]";
  }
  if (layout === "banner") {
    return "md:col-span-12 min-h-[16rem] sm:min-h-[18rem]";
  }
  return "md:col-span-5 min-h-[12rem] sm:min-h-[14rem]";
}

export function HomeServicesBento() {
  return (
    <Section className="bg-paper py-20 lg:py-28">
      <Container>
        <div className="max-w-2xl">
          <p className="text-[11px] font-semibold uppercase tracking-[var(--tracking-brand)] text-accent">
            Signature frames
          </p>
          <h2 className="mt-4 font-serif text-3xl font-normal tracking-tight text-light-ink sm:text-4xl">
            Every itinerary, architected.
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-light-muted sm:text-base">
            From boardroom tempo to celebration choreography—each engagement is staffed,
            routed, and reviewed by a single concierge thread.
          </p>
        </div>

        <div className="mt-14 grid auto-rows-auto grid-flow-dense gap-4 sm:gap-5 md:grid-cols-12">
          {servicesBento.map((tile) => (
            <Link
              key={tile.id}
              href={tile.href}
              className={`group relative overflow-hidden rounded-[var(--radius-card)] border border-light-ink/10 bg-midnight shadow-sm ${cellClass(tile.layout)}`}
            >
              <Image
                src={tile.image}
                alt={tile.alt}
                fill
                sizes="(min-width: 1024px) 33vw, 100vw"
                className="object-cover transition duration-700 ease-out group-hover:scale-[1.03]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-midnight via-midnight/55 to-midnight/10" />
              <div className="absolute inset-0 flex flex-col justify-end p-6 sm:p-8">
                <p className="text-[10px] font-semibold uppercase tracking-[var(--tracking-brand)] text-accent-readable">
                  {tile.title}
                </p>
                <p className="mt-2 max-w-md font-serif text-xl text-heading sm:text-2xl">
                  {tile.blurb}
                </p>
                <span className="mt-4 inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[var(--tracking-nav)] text-heading/90">
                  Explore
                  <span aria-hidden className="transition-transform group-hover:translate-x-1">
                    →
                  </span>
                </span>
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </Section>
  );
}
