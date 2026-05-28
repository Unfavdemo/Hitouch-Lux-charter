"use client";

import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { safeAdminRedirect } from "@/lib/login-redirect";

export function StaffUserLoginForm() {
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
      const res = await fetch("/api/auth/user/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.ok) {
        setMessage(data.message ?? "Sign-in failed.");
        return;
      }
      window.location.assign(safeAdminRedirect(searchParams.get("redirect")));
    } catch {
      setMessage("Network error.");
    } finally {
      setPending(false);
    }
  }

  return (
    <form className="space-y-5 border-t border-white/10 pt-6" onSubmit={(e) => void onSubmit(e)}>
      <p className="text-xs text-zinc-500">Or sign in with your staff account email</p>
      <div>
        <label
          htmlFor="staff-email"
          className="block text-xs font-semibold uppercase tracking-wider text-zinc-400"
        >
          Email
        </label>
        <input
          id="staff-email"
          type="email"
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mt-2 w-full rounded-md border border-white/15 bg-black/40 px-3 py-2.5 text-sm text-white outline-none ring-amber-200/30 focus:border-amber-200/50 focus:ring-2"
          required
        />
      </div>
      <div>
        <label
          htmlFor="staff-user-password"
          className="block text-xs font-semibold uppercase tracking-wider text-zinc-400"
        >
          Password
        </label>
        <input
          id="staff-user-password"
          type="password"
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
        className="w-full rounded-md border border-white/20 bg-white/5 px-4 py-2.5 text-sm font-semibold uppercase tracking-wider text-zinc-100 transition hover:bg-white/10 disabled:opacity-60"
      >
        {pending ? "Signing in…" : "Sign in with email"}
      </button>
    </form>
  );
}
