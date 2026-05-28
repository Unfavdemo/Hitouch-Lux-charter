"use client";

import { useState, useTransition } from "react";
import { createChauffeurAction } from "@/app/admin/(desk)/trips/actions";

export function CreateChauffeurForm() {
  const [pending, startTransition] = useTransition();
  const [message, setMessage] = useState(null);

  function onSubmit(e) {
    e.preventDefault();
    setMessage(null);
    const form = e.currentTarget;
    const formData = new FormData(form);
    startTransition(async () => {
      const result = await createChauffeurAction(formData);
      if (!result.ok) {
        setMessage(result.error ?? "Failed.");
        return;
      }
      form.reset();
      setMessage("Chauffeur created.");
    });
  }

  return (
    <form
      onSubmit={onSubmit}
      className="space-y-4 rounded-lg border border-white/10 bg-white/[0.03] p-5"
    >
      <h3 className="text-sm font-semibold uppercase tracking-wider text-zinc-400">
        Add chauffeur
      </h3>
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block text-xs text-zinc-500">
          Name
          <input
            name="name"
            required
            className="mt-1 w-full rounded-md border border-white/15 bg-black/40 px-3 py-2 text-sm text-white"
          />
        </label>
        <label className="block text-xs text-zinc-500">
          Email
          <input
            name="email"
            type="email"
            required
            className="mt-1 w-full rounded-md border border-white/15 bg-black/40 px-3 py-2 text-sm text-white"
          />
        </label>
        <label className="block text-xs text-zinc-500">
          Phone
          <input
            name="phone"
            className="mt-1 w-full rounded-md border border-white/15 bg-black/40 px-3 py-2 text-sm text-white"
          />
        </label>
        <label className="block text-xs text-zinc-500">
          Temporary password
          <input
            name="password"
            type="password"
            required
            minLength={8}
            className="mt-1 w-full rounded-md border border-white/15 bg-black/40 px-3 py-2 text-sm text-white"
          />
        </label>
      </div>
      {message ? (
        <p className="text-sm text-amber-200/90" role="status">
          {message}
        </p>
      ) : null}
      <button
        type="submit"
        disabled={pending}
        className="rounded-md bg-amber-200/90 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-black disabled:opacity-50"
      >
        {pending ? "Creating…" : "Create chauffeur"}
      </button>
    </form>
  );
}
