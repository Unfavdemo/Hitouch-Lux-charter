"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  luxuryFieldInput,
  luxuryFieldLabel,
  luxuryRequiredMark,
} from "@/components/ui/luxury-form";

function Req() {
  return (
    <span className={luxuryRequiredMark} aria-hidden>
      *
    </span>
  );
}

const guestOptions = ["1–2", "3–6", "7–10", "11–14", "15+"];

/**
 * Lightweight inquiry form embedded on each experience landing page.
 * Submissions flow into the experience lead pipeline (CRM) tagged with the
 * experience slug so the concierge desk knows exactly what was requested.
 */
export function ExperienceInquiryForm({ experienceSlug, experienceTitle }) {
  const [pending, setPending] = useState(false);
  const [message, setMessage] = useState(null);
  const [ok, setOk] = useState(false);
  const idPrefix = `eif-${experienceSlug}`;

  async function onSubmit(e) {
    e.preventDefault();
    setPending(true);
    setMessage(null);

    const form = e.currentTarget;
    const fd = new FormData(form);
    const payload = {
      experienceSlug,
      experienceTitle,
      firstName: String(fd.get("firstName") ?? ""),
      lastName: String(fd.get("lastName") ?? ""),
      email: String(fd.get("email") ?? ""),
      phone: String(fd.get("phone") ?? ""),
      preferredDate: String(fd.get("preferredDate") ?? ""),
      guestCount: String(fd.get("guestCount") ?? ""),
      details: String(fd.get("details") ?? ""),
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
      setMessage(
        data.message ??
          "Thank you. Your concierge will reach out within 24 hours to design the details.",
      );
      form.reset();
    } catch {
      setOk(false);
      setMessage(
        "Network error. Please try again in a moment, or call our concierge line if the issue persists.",
      );
    } finally {
      setPending(false);
    }
  }

  return (
    <Card className="relative overflow-hidden p-6 sm:p-8 before:pointer-events-none before:absolute before:inset-x-8 before:top-0 before:h-px before:bg-gradient-to-r before:from-transparent before:via-accent/80 before:to-transparent">
      <p className="text-[11px] font-semibold uppercase tracking-[var(--tracking-nav)] text-accent-readable">
        Begin your inquiry
      </p>
      <h3 className="mt-3 font-serif text-2xl text-heading">{experienceTitle}</h3>
      <p className="mt-2 text-sm leading-relaxed text-on-dark-muted">
        Tell us the occasion. We&rsquo;ll handle the details—your concierge responds within 24
        hours.
      </p>
      <form className="mt-8 space-y-5" onSubmit={(ev) => void onSubmit(ev)}>
        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label className={luxuryFieldLabel} htmlFor={`${idPrefix}-firstName`}>
              First name <Req />
            </label>
            <input
              id={`${idPrefix}-firstName`}
              name="firstName"
              required
              autoComplete="given-name"
              className={luxuryFieldInput}
            />
          </div>
          <div>
            <label className={luxuryFieldLabel} htmlFor={`${idPrefix}-lastName`}>
              Last name <Req />
            </label>
            <input
              id={`${idPrefix}-lastName`}
              name="lastName"
              required
              autoComplete="family-name"
              className={luxuryFieldInput}
            />
          </div>
          <div>
            <label className={luxuryFieldLabel} htmlFor={`${idPrefix}-email`}>
              Email <Req />
            </label>
            <input
              id={`${idPrefix}-email`}
              name="email"
              type="email"
              required
              autoComplete="email"
              className={luxuryFieldInput}
            />
          </div>
          <div>
            <label className={luxuryFieldLabel} htmlFor={`${idPrefix}-phone`}>
              Phone <Req />
            </label>
            <input
              id={`${idPrefix}-phone`}
              name="phone"
              type="tel"
              required
              autoComplete="tel"
              className={luxuryFieldInput}
            />
          </div>
          <div>
            <label className={luxuryFieldLabel} htmlFor={`${idPrefix}-preferredDate`}>
              Preferred date
            </label>
            <input
              id={`${idPrefix}-preferredDate`}
              name="preferredDate"
              type="date"
              className={luxuryFieldInput}
            />
          </div>
          <div>
            <label className={luxuryFieldLabel} htmlFor={`${idPrefix}-guestCount`}>
              Guests
            </label>
            <select
              id={`${idPrefix}-guestCount`}
              name="guestCount"
              className={luxuryFieldInput}
              defaultValue=""
            >
              <option value="" disabled>
                Select…
              </option>
              {guestOptions.map((o) => (
                <option key={o} value={o}>
                  {o}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div>
          <label className={luxuryFieldLabel} htmlFor={`${idPrefix}-details`}>
            Tell us about the occasion
          </label>
          <textarea
            id={`${idPrefix}-details`}
            name="details"
            rows={4}
            className={luxuryFieldInput}
            placeholder="Dates you're considering, who's joining, and how you want the day to feel."
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
        <Button type="submit" variant="primary" disabled={pending} className="w-full justify-center sm:w-auto sm:min-w-[220px]">
          {pending ? "Submitting…" : "Request This Experience"}
        </Button>
      </form>
    </Card>
  );
}
