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
  luxuryRequiredMark,
} from "@/components/ui/luxury-form";

function Req() {
  return (
    <span className={luxuryRequiredMark} aria-hidden>
      *
    </span>
  );
}

const checkClass = "h-4 w-4 shrink-0 rounded border border-accent/35 bg-field accent-accent";
const radioClass = "mt-1 h-4 w-4 shrink-0 border border-accent/35 bg-field accent-accent";

const membershipTypes = [
  { value: "individual", label: "Individual" },
  { value: "family", label: "Family" },
  { value: "organization", label: "Organization" },
];

const usageOptions = [
  { value: "occasional", label: "A few trips per month" },
  { value: "weekly", label: "Weekly" },
  { value: "several-weekly", label: "Several times per week" },
  { value: "daily", label: "Daily / integrated into how we move" },
];

const needOptions = [
  { value: "executive", label: "Executive mobility" },
  { value: "airport", label: "Airport transfers" },
  { value: "game-day", label: "Game Day experiences" },
  { value: "experiences", label: "Private experiences & concierge" },
  { value: "family", label: "Family transportation" },
  { value: "corporate", label: "Corporate program" },
];

/** Premium membership intake — submissions flow into the membership lead pipeline (CRM). */
export function MembershipApplicationForm() {
  const [pending, setPending] = useState(false);
  const [message, setMessage] = useState(null);
  const [ok, setOk] = useState(false);
  const [membershipType, setMembershipType] = useState("individual");

  async function onSubmit(e) {
    e.preventDefault();
    setPending(true);
    setMessage(null);

    const form = e.currentTarget;
    const fd = new FormData(form);
    const payload = {
      firstName: String(fd.get("firstName") ?? ""),
      lastName: String(fd.get("lastName") ?? ""),
      email: String(fd.get("email") ?? ""),
      phone: String(fd.get("phone") ?? ""),
      membershipType: String(fd.get("membershipType") ?? ""),
      foundingInterest: fd.get("foundingInterest") === "yes",
      organization: String(fd.get("organization") ?? ""),
      homeBase: String(fd.get("homeBase") ?? ""),
      usageFrequency: String(fd.get("usageFrequency") ?? ""),
      primaryNeeds: fd.getAll("primaryNeeds").map(String),
      notes: String(fd.get("notes") ?? ""),
    };

    try {
      const res = await fetch("/api/membership-request", {
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
          "Thank you. Your application has been received—we respond personally within 48 hours.",
      );
      form.reset();
      setMembershipType("individual");
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
        Membership application
      </p>
      <h3 className="mt-3 font-serif text-2xl text-heading">Request Membership</h3>
      <p className="mt-2 text-sm leading-relaxed text-on-dark-muted">
        Applications are reviewed personally. Tell us how you move—we&rsquo;ll design the
        relationship around it.
      </p>
      <form className="mt-8 space-y-8" onSubmit={(ev) => void onSubmit(ev)}>
        <fieldset className={luxuryFieldset}>
          <legend className={luxuryLegend}>Contact</legend>
          <div className="mt-4 grid gap-5 sm:grid-cols-2">
            <div>
              <label className={luxuryFieldLabel} htmlFor="maf-firstName">
                First name <Req />
              </label>
              <input
                id="maf-firstName"
                name="firstName"
                required
                autoComplete="given-name"
                className={luxuryFieldInput}
              />
            </div>
            <div>
              <label className={luxuryFieldLabel} htmlFor="maf-lastName">
                Last name <Req />
              </label>
              <input
                id="maf-lastName"
                name="lastName"
                required
                autoComplete="family-name"
                className={luxuryFieldInput}
              />
            </div>
            <div>
              <label className={luxuryFieldLabel} htmlFor="maf-email">
                Email <Req />
              </label>
              <input
                id="maf-email"
                name="email"
                type="email"
                required
                autoComplete="email"
                className={luxuryFieldInput}
              />
            </div>
            <div>
              <label className={luxuryFieldLabel} htmlFor="maf-phone">
                Phone <Req />
              </label>
              <input
                id="maf-phone"
                name="phone"
                type="tel"
                required
                autoComplete="tel"
                className={luxuryFieldInput}
              />
            </div>
          </div>
        </fieldset>

        <fieldset className={luxuryFieldset}>
          <legend className={luxuryLegend}>
            Membership type <Req />
          </legend>
          <div className="mt-4 flex flex-wrap gap-4">
            {membershipTypes.map((t) => (
              <label key={t.value} className={`${luxuryChoiceLabel} items-center gap-2`}>
                <input
                  type="radio"
                  name="membershipType"
                  value={t.value}
                  required
                  className={radioClass}
                  checked={membershipType === t.value}
                  onChange={() => setMembershipType(t.value)}
                />
                {t.label}
              </label>
            ))}
          </div>
          {membershipType === "organization" ? (
            <div className="mt-5">
              <label className={luxuryFieldLabel} htmlFor="maf-organization">
                Organization name <Req />
              </label>
              <input
                id="maf-organization"
                name="organization"
                required
                className={luxuryFieldInput}
              />
            </div>
          ) : (
            <input type="hidden" name="organization" value="" />
          )}
          <label className={`${luxuryChoiceLabel} mt-5 items-center gap-2`}>
            <input type="checkbox" name="foundingInterest" value="yes" className={checkClass} />
            I&rsquo;m applying for one of the five Founding Memberships
          </label>
        </fieldset>

        <fieldset className={luxuryFieldset}>
          <legend className={luxuryLegend}>How you move</legend>
          <div className="mt-4 grid gap-5 sm:grid-cols-2">
            <div>
              <label className={luxuryFieldLabel} htmlFor="maf-homeBase">
                Home base (city / neighborhood) <Req />
              </label>
              <input id="maf-homeBase" name="homeBase" required className={luxuryFieldInput} />
            </div>
            <div>
              <label className={luxuryFieldLabel} htmlFor="maf-usageFrequency">
                Anticipated usage <Req />
              </label>
              <select
                id="maf-usageFrequency"
                name="usageFrequency"
                required
                className={luxuryFieldInput}
                defaultValue=""
              >
                <option value="" disabled>
                  Select…
                </option>
                {usageOptions.map((o) => (
                  <option key={o.value} value={o.value}>
                    {o.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <p className="mt-6 text-xs text-on-dark-muted">Primary needs—select all that apply.</p>
          <div className="mt-3 grid gap-3 sm:grid-cols-2">
            {needOptions.map((o) => (
              <label key={o.value} className={`${luxuryChoiceLabel} items-center gap-2`}>
                <input type="checkbox" name="primaryNeeds" value={o.value} className={checkClass} />
                {o.label}
              </label>
            ))}
          </div>
        </fieldset>

        <fieldset className={luxuryFieldset}>
          <legend className={luxuryLegend}>Anything else</legend>
          <label className="sr-only" htmlFor="maf-notes">
            Notes
          </label>
          <textarea
            id="maf-notes"
            name="notes"
            rows={4}
            className={`${luxuryFieldInput} mt-4`}
            placeholder="Preferences we should know, typical routes, family or team details, or what you want membership to feel like."
          />
        </fieldset>

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
        <Button type="submit" variant="primary" disabled={pending} className="w-full justify-center sm:w-auto sm:min-w-[240px]">
          {pending ? "Submitting…" : "Request Membership"}
        </Button>
      </form>
    </Card>
  );
}
