"use client";

export function AdminLogoutForm() {
  async function logout() {
    await fetch("/api/auth/logout", { method: "POST" });
    window.location.href = "/login?mode=staff";
  }

  return (
    <button
      type="button"
      onClick={() => void logout()}
      className="rounded-md border border-white/15 bg-transparent px-3 py-2 text-xs font-semibold uppercase tracking-wider text-zinc-300 transition hover:border-red-400/50 hover:text-red-200"
    >
      Sign out
    </button>
  );
}
