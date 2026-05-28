"use client";

import { useTransition } from "react";
import {
  dismissSubmission,
  markSubmissionProcessed,
} from "@/app/admin/(desk)/intake/actions";

export function IntakeSubmissionActions({ id }) {
  const [pending, startTransition] = useTransition();

  return (
    <div className="flex flex-wrap gap-2">
      <button
        type="button"
        disabled={pending}
        onClick={() =>
          startTransition(async () => {
            await markSubmissionProcessed(id);
          })
        }
        className="rounded-md border border-emerald-500/40 bg-emerald-950/30 px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-emerald-100 hover:bg-emerald-950/50 disabled:opacity-50"
      >
        Mark processed
      </button>
      <button
        type="button"
        disabled={pending}
        onClick={() =>
          startTransition(async () => {
            await dismissSubmission(id);
          })
        }
        className="rounded-md border border-white/15 px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-zinc-400 hover:border-red-400/40 hover:text-red-200 disabled:opacity-50"
      >
        Dismiss
      </button>
    </div>
  );
}
