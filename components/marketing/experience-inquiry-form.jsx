"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  luxuryChoiceLabel,
  luxuryFieldInput,
  luxuryFieldLabel,
  luxuryFieldset,
  luxuryLegend,
} from "@/components/ui/luxury-form";

/**
 * Inquiry form scoped to a single experience landing page. The experience slug
 * is submitted with the lead so each page's conversions stay attributable.
 */
export function ExperienceInquiryForm({
  experienceSlug,
  experienceTitle,
  categoryName,
  conciergeAddOns = [],
  status = "live",
}) {
  const [pending, setPending] = useState(false);
  const [message, setMessage] = useState(null);
  const [ok, setOk] = useState(false);

  async function onSubmit(e) {
    e.preventDefault();
    setPending(true);
    setMessage(null);
    const form = e.currentTarget;
    const fd = new FormData(form);
    const payload = {
      experienceSlug,
      contactName: String(fd.get("contactName") ?? ""),
      email: String(fd.get("email") ?? ""),
      phone: String(fd.get("phone") ?? ""),
      preferredDate: String(fd.get("preferredDate") ?? ""),
      guestCount: String(fd.get("guestCount") ?? ""),
      details: String(fd.get("details") ?? ""),
      conciergeAddOns: fd.getAll("conciergeAddOns").map(String),
    };

    try {
      const res = await fetch("/api/experience-inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) {
        setOk(false);
        setMessage(data.message ?? "Unable to submit.");
        return;
      }
      setOk(true);
      setMessage(data.message);
      form.reset();
    } catch {
      setOk(false);
      setMessage("Network error. Please call the concierge line.");
    } finally {
      setPending(false);
    }
  }

  return (
    <Card
      id="inquire"
      className="relative scroll-mt-28 overflow-hidden p-6 sm:p-8 before:pointer-events-none before:absolute before:inset-x-8 before:top-0 before:h-px before:bg-gradient-to-r before:from-transparent before:via-accent/80 before:to-transparent"
    >
      <p className="text-[11px] font-semibold uppercase tracking-[var(--tracking-nav)] text-accent-readable">
        {categoryName}
      </p>
      <h2 className="mt-3 font-serif text-2xl text-heading sm:text-3xl">
        Inquire about {experienceTitle}
      </h2>
      <p className="mt-3 text-sm leading-relaxed text-charcoal">
        {status === "by-request"
          ? "This experience is arranged individually. Share the details and we will come back with a plan and pricing within one business day."
          : "Tell us the date and the occasion. We respond within one business day with a plan and a firm quote."}
      </p>

      <form className="mt-8 space-y-5" onSubmit={(e) => void onSubmit(e)}>
        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="ei-name" className={luxuryFieldLabel}>
              Name
            </label>
            <input id="ei-name" required name="contactName" autoComplete="name" className={luxuryFieldInput} />
          </div>
          <div>
            <label htmlFor="ei-phone" className={luxuryFieldLabel}>
              Phone
            </label>
            <input id="ei-phone" required name="phone" type="tel" autoComplete="tel" className={luxuryFieldInput} />
          </div>
          <div>
            <label htmlFor="ei-email" className={luxuryFieldLabel}>
              Email
            </label>
            <input id="ei-email" required name="email" type="email" autoComplete="email" className={luxuryFieldInput} />
          </div>
          <div>
            <label htmlFor="ei-date" className={luxuryFieldLabel}>
              Preferred date
            </label>
            <input id="ei-date" name="preferredDate" type="date" className={luxuryFieldInput} />
          </div>
          <div>
            <label htmlFor="ei-guests" className={luxuryFieldLabel}>
              Guests
            </label>
            <input
              id="ei-guests"
              name="guestCount"
              type="number"
              min={1}
              inputMode="numeric"
              className={luxuryFieldInput}
            />
          </div>
        </div>

        {conciergeAddOns.length > 0 ? (
          <fieldset className={luxuryFieldset}>
            <legend className={luxuryLegend}>Concierge additions (optional)</legend>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {conciergeAddOns.map((addOn) => (
                <label key={addOn} className={luxuryChoiceLabel}>
                  <input
                    type="checkbox"
                    name="conciergeAddOns"
                    value={addOn}
                    className="mt-0.5 h-4 w-4 shrink-0 rounded border border-accent/35 bg-field accent-accent"
                  />
                  <span>{addOn}</span>
                </label>
              ))}
            </div>
          </fieldset>
        ) : null}

        <div>
          <label htmlFor="ei-details" className={luxuryFieldLabel}>
            Tell us about the occasion
          </label>
          <textarea
            id="ei-details"
            name="details"
            rows={4}
            className={luxuryFieldInput}
            placeholder="Pickup area, timing, who is coming, and how you want it to feel."
          />
        </div>

        {message ? (
          <p
            className={`rounded-md border px-4 py-3 text-sm leading-relaxed ${
              ok
                ? "border-accent/40 bg-accent-soft/25 text-foreground"
                : "border-red-500/35 bg-red-950/35 text-red-100"
            }`}
            role="status"
          >
            {message}
          </p>
        ) : null}

        <Button type="submit" variant="primary" disabled={pending}>
          {pending ? "Sending…" : "Request this experience"}
        </Button>
        <p className="text-xs leading-relaxed text-muted">
          We reply within one business day. No obligation, and we never share your details.
        </p>
      </form>
    </Card>
  );
}
