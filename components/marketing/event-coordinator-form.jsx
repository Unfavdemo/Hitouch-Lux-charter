"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { luxuryFieldInput, luxuryFieldLabel } from "@/components/ui/luxury-form";

export function EventCoordinatorForm() {
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
      eventName: String(fd.get("eventName") ?? ""),
      eventDate: String(fd.get("eventDate") ?? ""),
      guestCount: Number.parseInt(String(fd.get("guestCount") ?? "0"), 10),
      venues: String(fd.get("venues") ?? ""),
      checkInAssistance: fd.get("checkInAssistance") === "on",
      logisticsNotes: String(fd.get("logisticsNotes") ?? ""),
      contactName: String(fd.get("contactName") ?? ""),
      email: String(fd.get("email") ?? ""),
      phone: String(fd.get("phone") ?? ""),
    };
    try {
      const res = await fetch("/api/events", {
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
      setMessage("Thank you. An events specialist will contact you within one business day.");
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
      <h2 className="font-serif text-2xl text-heading">Event coordination inquiry</h2>
      <p className="mt-2 text-sm text-muted">
        Share production timelines and guest volumes—we respond with a coordinated
        vehicle plan and front-of-house options.
      </p>
      <form className="mt-8 space-y-5" onSubmit={(e) => void onSubmit(e)}>
        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label className={luxuryFieldLabel}>
              Event name
            </label>
            <input
              required
              name="eventName"
              className={luxuryFieldInput}
            />
          </div>
          <div>
            <label className={luxuryFieldLabel}>
              Event date
            </label>
            <input
              required
              type="date"
              name="eventDate"
              className={luxuryFieldInput}
            />
          </div>
          <div>
            <label className={luxuryFieldLabel}>
              Guest count (peak hour)
            </label>
            <input
              required
              type="number"
              min={1}
              name="guestCount"
              className={luxuryFieldInput}
            />
          </div>
          <div>
            <label className={luxuryFieldLabel}>
              Coordinator name
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
            Venues & timing notes
          </label>
          <textarea
            name="venues"
            rows={3}
            className={luxuryFieldInput}
            placeholder="Ceremony, reception, after-party, load-in windows…"
          />
        </div>
        <label className="flex cursor-pointer items-start gap-3 rounded-[var(--radius-card)] border border-accent/18 bg-field/80 p-4">
          <input type="checkbox" name="checkInAssistance" className="mt-1 h-4 w-4 rounded border border-accent/35 bg-field accent-accent" />
          <span className="text-sm text-muted">
            Request guest check-in staffing and branded welcome cues at primary
            arrival points.
          </span>
        </label>
        <div>
          <label className={luxuryFieldLabel}>
            Logistics notes
          </label>
          <textarea
            name="logisticsNotes"
            rows={4}
            className={luxuryFieldInput}
            placeholder="Multi-vehicle staging, police coordination, VIP sequencing…"
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
          {pending ? "Submitting…" : "Submit inquiry"}
        </Button>
      </form>
    </Card>
  );
}
