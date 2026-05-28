"use client";

import { useSearchParams } from "next/navigation";
import { useState } from "react";

export function DriverLoginForm() {
  const searchParams = useSearchParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [pending, setPending] = useState(false);
  const [message, setMessage] = useState(null);

  async function onSubmit(e) {
    e.preventDefault();
    setPending(true);
    setMessage(null);
    try {
      const res = await fetch("/api/auth/driver/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.ok) {
        setMessage(data.message ?? "Sign-in failed.");
        return;
      }
      const raw = searchParams.get("redirect");
      const safe =
        typeof raw === "string" && raw.startsWith("/driver") ? raw : "/driver/dashboard";
      window.location.assign(safe);
    } catch {
      setMessage("Network error.");
    } finally {
      setPending(false);
    }
  }

  return (
    <form className="mt-8 space-y-5" onSubmit={(e) => void onSubmit(e)}>
      <div>
        <label
          htmlFor="driver-email"
          className="block text-xs font-semibold uppercase tracking-wider text-zinc-400"
        >
          Email
        </label>
        <input
          id="driver-email"
          type="email"
          name="email"
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mt-2 w-full rounded-md border border-white/15 bg-black/40 px-3 py-2.5 text-sm text-white outline-none ring-amber-200/30 focus:border-amber-200/50 focus:ring-2"
          required
        />
      </div>
      <div>
        <label
          htmlFor="driver-password"
          className="block text-xs font-semibold uppercase tracking-wider text-zinc-400"
        >
          Password
        </label>
        <input
          id="driver-password"
          type="password"
          name="password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mt-2 w-full rounded-md border border-white/15 bg-black/40 px-3 py-2.5 text-sm text-white outline-none ring-amber-200/30 focus:border-amber-200/50 focus:ring-2"
          required
        />
      </div>
      {message ? (
        <p
          className="rounded-md border border-red-500/35 bg-red-950/40 px-3 py-2 text-sm text-red-100"
          role="alert"
        >
          {message}
        </p>
      ) : null}
      <button
        type="submit"
        disabled={pending}
        className="w-full rounded-md bg-amber-200/90 px-4 py-2.5 text-sm font-semibold uppercase tracking-wider text-black transition hover:bg-amber-200 disabled:opacity-60"
      >
        {pending ? "Signing in…" : "Sign in"}
      </button>
    </form>
  );
}
