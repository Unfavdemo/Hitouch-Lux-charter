"use client";

import { useState } from "react";
import {
  accommodationOptions,
  driverWaitOptions,
  guestCountOptions,
  occasionOptions,
  serviceInterestOptions,
  sixersScheduleUrl,
} from "@/content/experience-request";
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

const checkClass =
  "h-4 w-4 shrink-0 rounded border border-accent/35 bg-field accent-accent";
const radioClass =
  "mt-1 h-4 w-4 shrink-0 border border-accent/35 bg-field accent-accent";

export function ExperienceRequestForm() {
  const [pending, setPending] = useState(false);
  const [message, setMessage] = useState(null);
  const [ok, setOk] = useState(false);
  const [occasionOtherChecked, setOccasionOtherChecked] = useState(false);
  const [serviceOther, setServiceOther] = useState(false);
  const [serviceInterest, setServiceInterest] = useState("");

  const showSixersNote =
    serviceInterest === "sixers_only" || serviceInterest === "black_car_and_sixers";

  async function onSubmit(e) {
    e.preventDefault();
    setPending(true);
    setMessage(null);

    const form = e.currentTarget;
    const fd = new FormData(form);

    const serviceInterestVal = String(fd.get("serviceInterest") ?? "");
    if (!serviceInterestVal) {
      setOk(false);
      setMessage("Please select which service you are interested in.");
      setPending(false);
      return;
    }

    const occasions = fd.getAll("occasion").map(String);
    const accommodations = fd.getAll("accommodation").map(String);

    if (accommodations.includes("none") && accommodations.length > 1) {
      setOk(false);
      setMessage('If you select "No additional accommodations", uncheck the other options.');
      setPending(false);
      return;
    }

    if (occasions.includes("Other") && !String(fd.get("occasionOther") ?? "").trim()) {
      setOk(false);
      setMessage("Please describe the occasion in the “Other” field.");
      setPending(false);
      return;
    }

    if (serviceInterestVal === "other" && !String(fd.get("serviceOther") ?? "").trim()) {
      setOk(false);
      setMessage("Please describe the service in the “Other” field.");
      setPending(false);
      return;
    }

    const payload = {
      firstName: String(fd.get("firstName") ?? ""),
      lastName: String(fd.get("lastName") ?? ""),
      email: String(fd.get("email") ?? ""),
      phone: String(fd.get("phone") ?? ""),
      occasions,
      occasionOther: String(fd.get("occasionOther") ?? ""),
      serviceInterest: serviceInterestVal,
      serviceOther: String(fd.get("serviceOther") ?? ""),
      pickupDate: String(fd.get("pickupDate") ?? ""),
      pickupTime: String(fd.get("pickupTime") ?? ""),
      pickupAddress: String(fd.get("pickupAddress") ?? ""),
      destinationAddress: String(fd.get("destinationAddress") ?? ""),
      returnDate: String(fd.get("returnDate") ?? ""),
      returnTime: String(fd.get("returnTime") ?? ""),
      driverWait: String(fd.get("driverWait") ?? ""),
      guestCount: String(fd.get("guestCount") ?? ""),
      largeBagsCount: String(fd.get("largeBagsCount") ?? ""),
      accommodations,
      tripDetails: String(fd.get("tripDetails") ?? ""),
    };

    try {
      const res = await fetch("/api/experience-request", {
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
          "Thank you. Our team will contact you within 24–48 hours to finalize your experience details.",
      );
      form.reset();
      setOccasionOtherChecked(false);
      setServiceOther(false);
      setServiceInterest("");
    } catch {
      setOk(false);
      setMessage(
        "Network error. Please try again in a moment, or call our concierge team if the issue persists.",
      );
    } finally {
      setPending(false);
    }
  }

  return (
    <Card className="relative overflow-hidden p-6 sm:p-8 before:pointer-events-none before:absolute before:inset-x-8 before:top-0 before:h-px before:bg-gradient-to-r before:from-transparent before:via-accent/80 before:to-transparent">
      <form className="space-y-10" onSubmit={(ev) => void onSubmit(ev)}>
        <fieldset className={luxuryFieldset}>
          <legend className={luxuryLegend}>Contact</legend>
          <div className="mt-4 grid gap-5 sm:grid-cols-2">
            <div>
              <label className={luxuryFieldLabel} htmlFor="erf-firstName">
                First name <Req />
              </label>
              <input
                id="erf-firstName"
                name="firstName"
                required
                autoComplete="given-name"
                className={luxuryFieldInput}
              />
            </div>
            <div>
              <label className={luxuryFieldLabel} htmlFor="erf-lastName">
                Last name <Req />
              </label>
              <input
                id="erf-lastName"
                name="lastName"
                required
                autoComplete="family-name"
                className={luxuryFieldInput}
              />
            </div>
            <div>
              <label className={luxuryFieldLabel} htmlFor="erf-email">
                Email address <Req />
              </label>
              <input
                id="erf-email"
                name="email"
                type="email"
                required
                autoComplete="email"
                className={luxuryFieldInput}
              />
            </div>
            <div>
              <label className={luxuryFieldLabel} htmlFor="erf-phone">
                Phone number <Req />
              </label>
              <input
                id="erf-phone"
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
            Occasion for booking <Req />
          </legend>
          <p className="mt-2 text-xs text-charcoal">Select all that apply.</p>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {occasionOptions.map((o) => (
              <label key={o.value} className={`${luxuryChoiceLabel} items-center gap-2`}>
                <input type="checkbox" name="occasion" value={o.value} className={checkClass} />
                {o.label}
              </label>
            ))}
            <label className={`${luxuryChoiceLabel} items-center gap-2 sm:col-span-2`}>
              <input
                type="checkbox"
                name="occasion"
                value="Other"
                className={checkClass}
                checked={occasionOtherChecked}
                onChange={(e) => setOccasionOtherChecked(e.target.checked)}
              />
              Other
            </label>
          </div>
          {occasionOtherChecked ? (
            <div className="mt-4">
              <label className={luxuryFieldLabel} htmlFor="erf-occasionOther">
                Describe other occasion
              </label>
              <input id="erf-occasionOther" name="occasionOther" className={luxuryFieldInput} />
            </div>
          ) : (
            <input type="hidden" name="occasionOther" value="" />
          )}
        </fieldset>

        <fieldset className={luxuryFieldset}>
          <legend className={luxuryLegend}>
            Which service are you interested in? <Req />
          </legend>
          {showSixersNote ? (
            <p className="mt-2 text-xs leading-relaxed text-charcoal">
              If you are interested in a 76ers Game Experience, view the home game schedule
              before submitting and include the game in your trip details:{" "}
              <a
                className="font-medium text-accent underline decoration-accent/60 underline-offset-4 transition-colors hover:text-accent/90"
                href={sixersScheduleUrl}
                target="_blank"
                rel="noreferrer"
              >
                76ers schedule
              </a>
              .
            </p>
          ) : null}
          <div className="mt-4 space-y-3">
            {serviceInterestOptions.map((o) => (
              <label key={o.value} className={luxuryChoiceLabel}>
                <input
                  type="radio"
                  name="serviceInterest"
                  value={o.value}
                  className={radioClass}
                  checked={serviceInterest === o.value}
                  onChange={() => {
                    setServiceInterest(o.value);
                    setServiceOther(false);
                  }}
                />
                <span>{o.label}</span>
              </label>
            ))}
            <label className={luxuryChoiceLabel}>
              <input
                type="radio"
                name="serviceInterest"
                value="other"
                className={radioClass}
                checked={serviceInterest === "other"}
                onChange={() => {
                  setServiceInterest("other");
                  setServiceOther(true);
                }}
              />
              <span>Other</span>
            </label>
          </div>
          {serviceOther ? (
            <div className="mt-4">
              <label className={luxuryFieldLabel} htmlFor="erf-serviceOther">
                Describe other service
              </label>
              <input id="erf-serviceOther" name="serviceOther" className={luxuryFieldInput} />
            </div>
          ) : (
            <input type="hidden" name="serviceOther" value="" />
          )}
        </fieldset>

        <fieldset className={luxuryFieldset}>
          <legend className={luxuryLegend}>Itinerary</legend>
          <div className="mt-4 grid gap-5 sm:grid-cols-2">
            <div>
              <label className={luxuryFieldLabel} htmlFor="erf-pickupDate">
                Pick-up / departure date <Req />
              </label>
              <input id="erf-pickupDate" name="pickupDate" type="date" required className={luxuryFieldInput} />
            </div>
            <div>
              <label className={luxuryFieldLabel} htmlFor="erf-pickupTime">
                Pick-up time <Req />
              </label>
              <input id="erf-pickupTime" name="pickupTime" type="time" required className={luxuryFieldInput} />
            </div>
            <div className="sm:col-span-2">
              <label className={luxuryFieldLabel} htmlFor="erf-pickupAddress">
                Pick-up address <Req />
              </label>
              <input id="erf-pickupAddress" name="pickupAddress" required className={luxuryFieldInput} />
            </div>
            <div className="sm:col-span-2">
              <label className={luxuryFieldLabel} htmlFor="erf-destinationAddress">
                Destination address or venue name <Req />
              </label>
              <textarea
                id="erf-destinationAddress"
                name="destinationAddress"
                required
                rows={3}
                className={luxuryFieldInput}
                placeholder="If more than one stop, include all addresses."
              />
            </div>
            <div>
              <label className={luxuryFieldLabel} htmlFor="erf-returnDate">
                Drop-off / return date <Req />
              </label>
              <input id="erf-returnDate" name="returnDate" type="date" required className={luxuryFieldInput} />
            </div>
            <div>
              <label className={luxuryFieldLabel} htmlFor="erf-returnTime">
                Return time <Req />
              </label>
              <input id="erf-returnTime" name="returnTime" type="time" required className={luxuryFieldInput} />
            </div>
          </div>
        </fieldset>

        <fieldset className={luxuryFieldset}>
          <legend className={luxuryLegend}>
            Would you like the driver to wait between pick-up and drop-off? <Req />
          </legend>
          <p className="mt-2 text-xs leading-relaxed text-charcoal">
            If the time between destinations is less than 3 hours, the driver will automatically
            wait and this time will be included in your estimate. Destinations outside of the
            Greater Philadelphia region may incur additional fees.
          </p>
          <div className="mt-4 flex flex-wrap gap-4">
            {driverWaitOptions.map((o) => (
              <label key={o.value} className={`${luxuryChoiceLabel} items-center gap-2`}>
                <input type="radio" name="driverWait" value={o.value} required className={radioClass} />
                {o.label}
              </label>
            ))}
          </div>
        </fieldset>

        <fieldset className={luxuryFieldset}>
          <legend className={luxuryLegend}>
            Number of guests <Req />
          </legend>
          <div className="mt-4 space-y-3">
            {guestCountOptions.map((o) => (
              <label key={o.value} className={luxuryChoiceLabel}>
                <input type="radio" name="guestCount" value={o.value} required className={radioClass} />
                <span>{o.label}</span>
              </label>
            ))}
          </div>
        </fieldset>

        <fieldset className={luxuryFieldset}>
          <legend className={luxuryLegend}>
            How many bags larger than a briefcase? <Req />
          </legend>
          <label className="sr-only" htmlFor="erf-largeBagsCount">
            Bag count
          </label>
          <input
            id="erf-largeBagsCount"
            name="largeBagsCount"
            required
            min={0}
            inputMode="numeric"
            className={luxuryFieldInput}
            placeholder="Enter a number"
          />
        </fieldset>

        <fieldset className={luxuryFieldset}>
          <legend className={luxuryLegend}>
            Special accommodation requests <Req />
          </legend>
          <p className="mt-2 text-xs text-charcoal">
            Select any that apply, or choose “No additional accommodations.”
          </p>
          <div className="mt-4 space-y-3">
            {accommodationOptions.map((o) => (
              <label key={o.value} className={luxuryChoiceLabel}>
                <input type="checkbox" name="accommodation" value={o.value} className={checkClass} />
                <span>{o.label}</span>
              </label>
            ))}
          </div>
        </fieldset>

        <fieldset className={luxuryFieldset}>
          <legend className={luxuryLegend}>
            Other trip details we should know <Req />
          </legend>
          <label className="sr-only" htmlFor="erf-tripDetails">
            Trip details
          </label>
          <textarea
            id="erf-tripDetails"
            name="tripDetails"
            required
            rows={5}
            className={luxuryFieldInput}
            placeholder="Include 76ers game (if applicable), timing sensitivities, accessibility needs, or anything else."
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

        <div className="flex flex-wrap gap-3 pt-1">
          <Button type="submit" variant="primary" disabled={pending} className="min-w-[200px]">
            {pending ? "Submitting…" : "Submit request"}
          </Button>
        </div>
      </form>
    </Card>
  );
}
