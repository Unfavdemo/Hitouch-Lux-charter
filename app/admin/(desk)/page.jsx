import Link from "next/link";
import { listCorporateLeads, listEventLeads, listExperienceLeads, storageMode } from "@/lib/lead-storage";

export default async function AdminOverviewPage() {
  let corporate = [];
  let events = [];
  let experience = [];
  let error = null;
  try {
    [corporate, events, experience] = await Promise.all([
      listCorporateLeads(),
      listEventLeads(),
      listExperienceLeads(),
    ]);
  } catch (e) {
    error = e instanceof Error ? e.message : "Could not load leads.";
  }

  const mode = storageMode();

  return (
    <div className="space-y-8">
      {error ? (
        <p className="rounded-md border border-red-500/35 bg-red-950/35 px-4 py-3 text-sm text-red-100">
          {error}
        </p>
      ) : null}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <Link
          href="/admin/corporate"
          className="rounded-lg border border-white/10 bg-white/[0.04] p-6 transition hover:border-amber-200/35"
        >
          <p className="text-[10px] font-semibold uppercase tracking-wider text-zinc-500">Corporate</p>
          <p className="mt-2 font-serif text-3xl text-white">{corporate.length}</p>
          <p className="mt-2 text-xs text-zinc-400">Account onboarding requests</p>
        </Link>
        <Link
          href="/admin/events"
          className="rounded-lg border border-white/10 bg-white/[0.04] p-6 transition hover:border-amber-200/35"
        >
          <p className="text-[10px] font-semibold uppercase tracking-wider text-zinc-500">Events</p>
          <p className="mt-2 font-serif text-3xl text-white">{events.length}</p>
          <p className="mt-2 text-xs text-zinc-400">Coordination inquiries</p>
        </Link>
        <Link
          href="/admin/experience"
          className="rounded-lg border border-white/10 bg-white/[0.04] p-6 transition hover:border-amber-200/35 sm:col-span-2 lg:col-span-1"
        >
          <p className="text-[10px] font-semibold uppercase tracking-wider text-zinc-500">Experience</p>
          <p className="mt-2 font-serif text-3xl text-white">{experience.length}</p>
          <p className="mt-2 text-xs text-zinc-400">Luxury experience intake forms</p>
        </Link>
      </div>
      <p className="text-xs leading-relaxed text-zinc-500">
        Submissions are saved when visitors use the public forms. With{" "}
        <span className="text-zinc-300">DATABASE_URL</span> unset, leads append to{" "}
        <code className="rounded bg-black/40 px-1 py-0.5 text-zinc-300">data/b2b-leads.json</code>{" "}
        (fine for local dev; use Neon or another Postgres for production / serverless).
        Current mode: <span className="font-medium text-zinc-300">{mode}</span>.
      </p>
    </div>
  );
}
