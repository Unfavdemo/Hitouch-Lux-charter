import Image from "next/image";

export function FleetVehicleCard({ vehicle }) {
  return (
    <article className="luxury-card-light flex flex-col overflow-hidden p-0">
      <div className="relative aspect-[4/3] w-full shrink-0 bg-midnight">
        <Image
          src={vehicle.imageSrc}
          alt={vehicle.imageAlt}
          fill
          sizes="(min-width: 1024px) 33vw, 100vw"
          className="object-cover"
        />
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-midnight/90 via-midnight/50 to-transparent px-5 pb-4 pt-12">
          <p className="text-[10px] font-semibold uppercase tracking-[var(--tracking-nav)] text-accent-readable">
            {vehicle.class}
          </p>
        </div>
      </div>
      <div className="flex flex-1 flex-col p-6">
        <h3 className="font-serif text-xl tracking-tight text-light-ink sm:text-2xl">{vehicle.name}</h3>
        <p className="mt-2 text-sm leading-relaxed text-light-muted">{vehicle.tagline}</p>
        <dl className="mt-5 grid grid-cols-2 gap-x-4 gap-y-4 border-t border-light-ink/10 pt-5 text-sm">
          <div>
            <dt className="text-[10px] font-semibold uppercase tracking-[var(--tracking-nav)] text-accent">
              Seats
            </dt>
            <dd className="mt-1 font-medium text-light-ink">{vehicle.passengers}</dd>
          </div>
          <div>
            <dt className="text-[10px] font-semibold uppercase tracking-[var(--tracking-nav)] text-accent">
              Luggage
            </dt>
            <dd className="mt-1 font-medium text-light-ink">{vehicle.luggage} bags</dd>
          </div>
          <div>
            <dt className="text-[10px] font-semibold uppercase tracking-[var(--tracking-nav)] text-accent">
              Wi‑Fi
            </dt>
            <dd className="mt-1 font-medium text-light-ink">
              {vehicle.wifi ? "Yes" : "On request"}
            </dd>
          </div>
          <div>
            <dt className="text-[10px] font-semibold uppercase tracking-[var(--tracking-nav)] text-accent">
              Partition
            </dt>
            <dd className="mt-1 font-medium text-light-ink">
              {vehicle.partition ? "Available" : "N/A"}
            </dd>
          </div>
        </dl>
        <p className="mt-5 font-serif text-lg text-light-ink">
          {vehicle.requestQuote || vehicle.fromPriceUsd == null
            ? "Request quote"
            : `From $${vehicle.fromPriceUsd}`}
        </p>
      </div>
    </article>
  );
}
