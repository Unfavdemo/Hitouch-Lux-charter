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
import { membershipNeedOptions, travelFrequencyOptions } from "@/content/membership-form";
import { membershipTiers } from "@/content/memberships";

export function MembershipApplicationForm({ defaultFoundingInterest = false }) {
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
      membershipType: String(fd.get("membershipType") ?? ""),
      foundingInterest: fd.get("foundingInterest") === "on",
      contactName: String(fd.get("contactName") ?? ""),
      email: String(fd.get("email") ?? ""),
      phone: String(fd.get("phone") ?? ""),
      company: String(fd.get("company") ?? ""),
      city: String(fd.get("city") ?? ""),
      travelFrequency: String(fd.get("travelFrequency") ?? ""),
      primaryNeeds: fd.getAll("primaryNeeds").map(String),
      currentProvider: String(fd.get("currentProvider") ?? ""),
      notes: String(fd.get("notes") ?? ""),
    };

    try {
      const res = await fetch("/api/membership", {
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
      id="apply"
      className="relative scroll-mt-28 overflow-hidden p-6 sm:p-8 lg:p-10 before:pointer-events-none before:absolute before:inset-x-8 before:top-0 before:h-px before:bg-gradient-to-r before:from-transparent before:via-accent/80 before:to-transparent"
    >
      <p className="text-[11px] font-semibold uppercase tracking-[var(--tracking-nav)] text-accent-readable">
        By application
      </p>
      <h2 className="mt-3 font-serif text-2xl text-heading sm:text-3xl">
        Request membership
      </h2>
      <p className="mt-3 max-w-xl text-sm leading-relaxed text-charcoal">
        Membership is reviewed individually. This takes a few minutes and there is no obligation—we
        are both deciding whether it is a fit.
      </p>

      <form className="mt-8 space-y-6" onSubmit={(e) => void onSubmit(e)}>
        <fieldset className={luxuryFieldset}>
          <legend className={luxuryLegend}>Membership type</legend>
          <div className="mt-4 space-y-3">
            {membershipTiers.map((tier, index) => (
              <label
                key={tier.id}
                className="flex cursor-pointer items-start gap-3 rounded-[var(--radius-card)] border border-accent/15 bg-field/60 p-4 transition-colors hover:border-accent/40"
              >
                <input
                  type="radio"
                  name="membershipType"
                  value={tier.id}
                  defaultChecked={index === 0}
                  required
                  className="mt-1 h-4 w-4 shrink-0 border border-accent/35 bg-field accent-accent"
                />
                <span>
                  <span className="block text-sm font-semibold text-heading">{tier.name}</span>
                  <span className="mt-1 block text-xs leading-relaxed text-charcoal">
                    {tier.audience}
                  </span>
                </span>
              </label>
            ))}
          </div>
        </fieldset>

        <label className="flex cursor-pointer items-start gap-3 rounded-[var(--radius-card)] border border-accent/25 bg-accent-soft/10 p-4">
          <input
            type="checkbox"
            name="foundingInterest"
            defaultChecked={defaultFoundingInterest}
            className="mt-1 h-4 w-4 shrink-0 rounded border border-accent/35 bg-field accent-accent"
          />
          <span className="text-sm leading-relaxed text-charcoal">
            <span className="font-semibold text-heading">
              Consider me for Founding Membership.
            </span>{" "}
            Five memberships, by application, with founding rates held for the life of the
            membership.
          </span>
        </label>

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="ma-name" className={luxuryFieldLabel}>
              Name
            </label>
            <input id="ma-name" required name="contactName" autoComplete="name" className={luxuryFieldInput} />
          </div>
          <div>
            <label htmlFor="ma-phone" className={luxuryFieldLabel}>
              Phone
            </label>
            <input id="ma-phone" required name="phone" type="tel" autoComplete="tel" className={luxuryFieldInput} />
          </div>
          <div>
            <label htmlFor="ma-email" className={luxuryFieldLabel}>
              Email
            </label>
            <input id="ma-email" required name="email" type="email" autoComplete="email" className={luxuryFieldInput} />
          </div>
          <div>
            <label htmlFor="ma-company" className={luxuryFieldLabel}>
              Company or household name (optional)
            </label>
            <input id="ma-company" name="company" autoComplete="organization" className={luxuryFieldInput} />
          </div>
          <div>
            <label htmlFor="ma-city" className={luxuryFieldLabel}>
              Where are you based?
            </label>
            <input
              id="ma-city"
              name="city"
              className={luxuryFieldInput}
              placeholder="Philadelphia, Main Line, Bucks County…"
            />
          </div>
          <div>
            <label htmlFor="ma-frequency" className={luxuryFieldLabel}>
              How often do you travel?
            </label>
            <select id="ma-frequency" required name="travelFrequency" defaultValue="" className={luxuryFieldInput}>
              <option value="" disabled>
                Select one
              </option>
              {travelFrequencyOptions.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <fieldset className={luxuryFieldset}>
          <legend className={luxuryLegend}>What would you use membership for?</legend>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {membershipNeedOptions.map((o) => (
              <label key={o.value} className={luxuryChoiceLabel}>
                <input
                  type="checkbox"
                  name="primaryNeeds"
                  value={o.value}
                  className="mt-0.5 h-4 w-4 shrink-0 rounded border border-accent/35 bg-field accent-accent"
                />
                <span>{o.label}</span>
              </label>
            ))}
          </div>
        </fieldset>

        <div>
          <label htmlFor="ma-provider" className={luxuryFieldLabel}>
            How do you handle transportation today? (optional)
          </label>
          <input
            id="ma-provider"
            name="currentProvider"
            className={luxuryFieldInput}
            placeholder="Current provider, rideshare, driving yourself…"
          />
        </div>

        <div>
          <label htmlFor="ma-notes" className={luxuryFieldLabel}>
            Anything we should know?
          </label>
          <textarea
            id="ma-notes"
            name="notes"
            rows={4}
            className={luxuryFieldInput}
            placeholder="Preferences, standing commitments, what has not worked with other providers."
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
          {pending ? "Submitting…" : "Request membership"}
        </Button>
        <p className="text-xs leading-relaxed text-muted">
          Applications are reviewed individually. We call within one business day.
        </p>
      </form>
    </Card>
  );
}
