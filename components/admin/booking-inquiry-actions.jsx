"use client";

import { useTransition } from "react";
import { convertInquiryToTripAction } from "@/app/admin/(desk)/booking-inquiries/actions";

export function BookingInquiryActions({ inquiryId, canConvert }) {
  const [pending, startTransition] = useTransition();

  if (!canConvert) {
    return <span className="text-xs text-zinc-600">Awaiting trip details</span>;
  }

  return (
    <button
      type="button"
      disabled={pending}
      onClick={() =>
        startTransition(async () => {
          await convertInquiryToTripAction(inquiryId);
        })
      }
      className="rounded-md border border-amber-400/40 bg-amber-950/30 px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-amber-100 hover:bg-amber-950/50 disabled:opacity-50"
    >
      {pending ? "Converting…" : "Convert to trip"}
    </button>
  );
}
