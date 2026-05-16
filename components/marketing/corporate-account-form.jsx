"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { luxuryFieldInput, luxuryFieldLabel } from "@/components/ui/luxury-form";

export function CorporateAccountForm() {
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
      company: String(fd.get("company") ?? ""),
      contactName: String(fd.get("contactName") ?? ""),
      email: String(fd.get("email") ?? ""),
      phone: String(fd.get("phone") ?? ""),
      invoicing: String(fd.get("invoicing") ?? ""),
      profileNotes: String(fd.get("profileNotes") ?? ""),
    };
    try {
      const res = await fetch("/api/corporate", {
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
      setMessage("Thank you. Our B2B desk will respond with onboarding materials.");
      form.reset();
    } catch {
      setOk(false);
      setMessage("Network error. Please call the concierge line.");
    } finally {
      setPending(false);
    }
  }

  return (
    <Card className="relative overflow-hidden p-6 sm:p-8 before:pointer-events-none before:absolute before:inset-x-8 before:top-0 before:h-px before:bg-gradient-to-r before:from-transparent before:via-accent/80 before:to-transparent">
      <h2 className="font-serif text-2xl text-heading">Corporate account intake</h2>
      <p className="mt-2 text-sm text-muted">
        Designed for recurring executive travel, consolidated reporting, and structured
        invoicing.
      </p>
      <form className="mt-8 space-y-5" onSubmit={(e) => void onSubmit(e)}>
        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label className={luxuryFieldLabel}>
              Company
            </label>
            <input
              required
              name="company"
              className={luxuryFieldInput}
            />
          </div>
          <div>
            <label className={luxuryFieldLabel}>
              Primary contact
            </label>
            <input
              required
              name="contactName"
              className={luxuryFieldInput}
            />
          </div>
          <div>
            <label className={luxuryFieldLabel}>
              Email
            </label>
            <input
              required
              type="email"
              name="email"
              className={luxuryFieldInput}
            />
          </div>
          <div>
            <label className={luxuryFieldLabel}>
              Phone
            </label>
            <input
              required
              name="phone"
              className={luxuryFieldInput}
            />
          </div>
        </div>
        <div>
          <label className={luxuryFieldLabel}>
            Invoicing preference
          </label>
          <select
            required
            name="invoicing"
            className={luxuryFieldInput}
            defaultValue="monthly-net-30"
          >
            <option value="monthly-net-15">Monthly NET 15</option>
            <option value="monthly-net-30">Monthly NET 30</option>
            <option value="card-on-file">Card on file (per trip)</option>
          </select>
        </div>
        <div>
          <label className={luxuryFieldLabel}>
            Recurring travel profile
          </label>
          <textarea
            name="profileNotes"
            rows={5}
            className={luxuryFieldInput}
            placeholder="Typical routes, principal preferences, NDAs, after-hours coverage…"
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
          {pending ? "Submitting…" : "Submit onboarding request"}
        </Button>
      </form>
    </Card>
  );
}
