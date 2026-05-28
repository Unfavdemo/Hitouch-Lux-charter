"use client";

import { useCallback, useEffect, useState } from "react";
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

const STORAGE_KEY = "hitouch_booking_inquiry_id";

function Req() {
  return (
    <span className={luxuryRequiredMark} aria-hidden>
      *
    </span>
  );
}

function formatUsd(cents) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(cents / 100);
}

export function BookingWizard({ moovsBookingUrl }) {
  const [step, setStep] = useState(1);
  const [inquiryId, setInquiryId] = useState(null);
  const [pending, setPending] = useState(false);
  const [message, setMessage] = useState(null);
  const [quote, setQuote] = useState(null);

  useEffect(() => {
    const stored = sessionStorage.getItem(STORAGE_KEY);
    if (stored) setInquiryId(stored);
  }, []);

  const persistInquiryId = useCallback((id) => {
    setInquiryId(id);
    sessionStorage.setItem(STORAGE_KEY, id);
    window.dispatchEvent(new Event("hitouch-inquiry-updated"));
  }, []);

  const abandonIfNeeded = useCallback(async () => {
    if (!inquiryId || step >= 3 || quote) return;
    try {
      await fetch(`/api/booking/inquiry/${inquiryId}/abandon`, { method: "POST" });
    } catch {
      /* best-effort */
    }
  }, [inquiryId, step, quote]);

  useEffect(() => {
    const onBeforeUnload = () => {
      if (inquiryId && step < 3 && !quote) {
        navigator.sendBeacon?.(`/api/booking/inquiry/${inquiryId}/abandon`, "{}");
      }
    };
    window.addEventListener("beforeunload", onBeforeUnload);
    return () => window.removeEventListener("beforeunload", onBeforeUnload);
  }, [inquiryId, step, quote]);

  async function onContactSubmit(e) {
    e.preventDefault();
    setPending(true);
    setMessage(null);
    const fd = new FormData(e.currentTarget);
    const payload = {
      contactName: String(fd.get("contactName") ?? ""),
      email: String(fd.get("email") ?? ""),
      phone: String(fd.get("phone") ?? ""),
    };
    try {
      const res = await fetch("/api/booking/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) {
        setMessage(data.message ?? "Unable to save your details.");
        return;
      }
      persistInquiryId(data.inquiryId);
      setStep(2);
    } catch {
      setMessage("Network error. Please try again or call the concierge line.");
    } finally {
      setPending(false);
    }
  }

  async function onTripSubmit(e) {
    e.preventDefault();
    if (!inquiryId) {
      setMessage("Please complete your contact details first.");
      setStep(1);
      return;
    }
    setPending(true);
    setMessage(null);
    const fd = new FormData(e.currentTarget);
    const payload = {
      pickupDate: String(fd.get("pickupDate") ?? ""),
      pickupTime: String(fd.get("pickupTime") ?? ""),
      pickupAddress: String(fd.get("pickupAddress") ?? ""),
      destinationAddress: String(fd.get("destinationAddress") ?? ""),
      vehicleClass: String(fd.get("vehicleClass") ?? "sedan"),
      passengers: Number(fd.get("passengers") ?? 1),
      notes: String(fd.get("notes") ?? ""),
    };
    try {
      const res = await fetch(`/api/booking/inquiry/${inquiryId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) {
        setMessage(data.message ?? "Unable to generate estimate.");
        return;
      }
      setQuote(data.quoteSummary);
      setStep(3);
    } catch {
      setMessage("Network error. Please try again.");
    } finally {
      setPending(false);
    }
  }

  async function onComplete() {
    if (!inquiryId) return;
    setPending(true);
    try {
      const res = await fetch(`/api/booking/inquiry/${inquiryId}/complete`, {
        method: "POST",
      });
      const data = await res.json();
      if (!res.ok || !data.ok) {
        setMessage(data.message ?? "Unable to confirm.");
        return;
      }
      sessionStorage.removeItem(STORAGE_KEY);
      setMessage("Thank you. A concierge will confirm final pricing and availability shortly.");
    } catch {
      setMessage("Network error. Please call the private line.");
    } finally {
      setPending(false);
    }
  }

  return (
    <Card className="relative overflow-hidden border-border-subtle bg-surface p-6 sm:p-10 before:pointer-events-none before:absolute before:inset-x-8 before:top-0 before:h-px before:bg-gradient-to-r before:from-transparent before:via-accent/80 before:to-transparent">
      <p className="text-[11px] font-semibold uppercase tracking-[var(--tracking-brand)] text-accent-readable">
        Step {step} of 3
      </p>
      <h2 className="mt-3 font-serif text-2xl text-heading sm:text-3xl">
        {step === 1 && "Your contact details"}
        {step === 2 && "Trip preferences"}
        {step === 3 && "Indicative estimate"}
      </h2>
      <p className="mt-2 max-w-xl text-sm leading-relaxed text-charcoal">
        {step === 1 &&
          "We save your information first so our concierge can follow up—even if you pause before viewing pricing."}
        {step === 2 && "Tell us about your movement. Estimates are for planning; final pricing is confirmed by the desk."}
        {step === 3 && "Review your indicative quote, then request concierge confirmation or continue online."}
      </p>

      {step === 1 ? (
        <form className="mt-8 space-y-5" onSubmit={(e) => void onContactSubmit(e)}>
          <div>
            <label className={luxuryFieldLabel}>
              Full name <Req />
            </label>
            <input required name="contactName" className={luxuryFieldInput} autoComplete="name" />
          </div>
          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label className={luxuryFieldLabel}>
                Email <Req />
              </label>
              <input required type="email" name="email" className={luxuryFieldInput} autoComplete="email" />
            </div>
            <div>
              <label className={luxuryFieldLabel}>
                Phone <Req />
              </label>
              <input required name="phone" type="tel" className={luxuryFieldInput} autoComplete="tel" />
            </div>
          </div>
          {message ? <p className="text-sm text-red-200">{message}</p> : null}
          <Button type="submit" variant="primary" disabled={pending}>
            {pending ? "Saving…" : "Continue to trip details"}
          </Button>
        </form>
      ) : null}

      {step === 2 ? (
        <form className="mt-8 space-y-6" onSubmit={(e) => void onTripSubmit(e)}>
          <fieldset className={luxuryFieldset}>
            <legend className={luxuryLegend}>Pickup</legend>
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label className={luxuryFieldLabel}>Date</label>
                <input required type="date" name="pickupDate" className={luxuryFieldInput} />
              </div>
              <div>
                <label className={luxuryFieldLabel}>Time</label>
                <input required type="time" name="pickupTime" className={luxuryFieldInput} />
              </div>
            </div>
            <div className="mt-5">
              <label className={luxuryFieldLabel}>Pickup address</label>
              <input required name="pickupAddress" className={luxuryFieldInput} placeholder="Hotel, venue, or address" />
            </div>
          </fieldset>
          <div>
            <label className={luxuryFieldLabel}>Destination</label>
            <input required name="destinationAddress" className={luxuryFieldInput} />
          </div>
          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label className={luxuryFieldLabel}>Vehicle class</label>
              <select name="vehicleClass" className={luxuryFieldInput} defaultValue="sedan">
                <option value="sedan">Executive sedan</option>
                <option value="suv">Executive SUV</option>
                <option value="sprinter">Executive Sprinter</option>
              </select>
            </div>
            <div>
              <label className={luxuryFieldLabel}>Passengers</label>
              <input required type="number" name="passengers" min={1} max={14} defaultValue={2} className={luxuryFieldInput} />
            </div>
          </div>
          <div>
            <label className={luxuryFieldLabel}>Notes (optional)</label>
            <textarea name="notes" rows={3} className={luxuryFieldInput} placeholder="Stops, luggage, discretion requests…" />
          </div>
          <div className="flex flex-wrap gap-3">
            <Button
              type="button"
              variant="ghost"
              className="border border-border-subtle"
              onClick={() => {
                void abandonIfNeeded();
                setStep(1);
              }}
            >
              Back
            </Button>
            <Button type="submit" variant="primary" disabled={pending}>
              {pending ? "Calculating…" : "View indicative estimate"}
            </Button>
          </div>
          {message ? <p className="text-sm text-red-200">{message}</p> : null}
        </form>
      ) : null}

      {step === 3 && quote ? (
        <div className="mt-8 space-y-6">
          <div className="rounded-[var(--radius-card)] border border-border-subtle bg-page p-6">
            <p className="text-[11px] font-semibold uppercase tracking-[var(--tracking-nav)] text-accent-readable">
              {quote.estimateLabel}
            </p>
            <ul className="mt-4 space-y-2 text-sm text-charcoal">
              {quote.lineItems.map((item) => (
                <li key={item.label} className="flex justify-between gap-4">
                  <span>{item.label}</span>
                  <span className="font-medium text-heading">{formatUsd(item.amountCents)}</span>
                </li>
              ))}
            </ul>
            <p className="mt-4 flex justify-between border-t border-border-subtle pt-4 font-serif text-xl text-heading">
              <span>Estimated total</span>
              <span>{formatUsd(quote.subtotalCents)}</span>
            </p>
            <p className="mt-4 text-xs leading-relaxed text-charcoal">{quote.disclaimer}</p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Button type="button" variant="primary" disabled={pending} onClick={() => void onComplete()}>
              {pending ? "Sending…" : "Request concierge confirmation"}
            </Button>
            <Button href={moovsBookingUrl} target="_blank" rel="noopener noreferrer" variant="secondary">
              Continue on Moovs
            </Button>
          </div>
          {message ? (
            <p
              className={`rounded-md border px-4 py-3 text-sm ${
                message.startsWith("Thank")
                  ? "border-accent/40 bg-accent-soft/25 text-foreground"
                  : "border-red-500/35 text-red-100"
              }`}
              role="status"
            >
              {message}
            </p>
          ) : null}
        </div>
      ) : null}
    </Card>
  );
}
