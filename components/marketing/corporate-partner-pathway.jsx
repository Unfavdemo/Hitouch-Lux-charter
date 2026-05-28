import { Card } from "@/components/ui/card";

const steps = [
  {
    title: "Account intake",
    detail:
      "Executive assistants and hotel partners submit company profile, billing preferences, and principal notes—NET 15 or NET 30 terms captured up front.",
  },
  {
    title: "Structured invoicing",
    detail:
      "Finance receives consolidated monthly statements with line-item transparency, W-9, and COI packets aligned to procurement standards.",
  },
  {
    title: "Dedicated account lead",
    detail:
      "A single concierge thread manages routing changes, after-hours coverage, and venue protocols across road shows and property portfolios.",
  },
];

export function CorporatePartnerPathway() {
  return (
    <div>
      <p className="text-[11px] font-semibold uppercase tracking-[var(--tracking-brand)] text-accent-readable">
        For executive assistants & hotel partners
      </p>
      <h2 className="mt-4 font-serif text-3xl text-heading sm:text-4xl">
        A corporate pathway built for delegated booking.
      </h2>
      <div className="mt-10 grid gap-5 md:grid-cols-3">
        {steps.map((step, idx) => (
          <Card key={step.title} className="border-border-subtle bg-page p-6">
            <span className="text-[11px] font-semibold uppercase tracking-widest text-accent-readable">
              Phase {idx + 1}
            </span>
            <h3 className="mt-3 font-serif text-xl text-heading">{step.title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-charcoal">{step.detail}</p>
          </Card>
        ))}
      </div>
    </div>
  );
}
