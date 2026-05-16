import Link from "next/link";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { AdminLogoutForm } from "@/components/admin/admin-logout-form";
import { isValidAdminSession } from "@/lib/admin-auth";
import { listCorporateLeads, listEventLeads, listExperienceLeads, storageMode } from "@/lib/lead-storage";

export default async function AdminDeskLayout({ children }) {
  const jar = await cookies();
  if (!isValidAdminSession(jar)) {
    redirect("/admin/login");
  }

  let corpCount = 0;
  let eventCount = 0;
  let expCount = 0;
  try {
    const [c, e, x] = await Promise.all([
      listCorporateLeads(),
      listEventLeads(),
      listExperienceLeads(),
    ]);
    corpCount = c.length;
    eventCount = e.length;
    expCount = x.length;
  } catch {
    /* counts stay 0; pages may show errors */
  }

  const mode = storageMode();

  return (
    <div className="mx-auto flex min-h-full max-w-6xl flex-col px-4 py-8 sm:px-6 lg:px-8">
      <header className="mb-10 flex flex-col gap-4 border-b border-white/10 pb-6 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-amber-200/80">
            HiTouch · B2B desk
          </p>
          <h1 className="mt-1 font-serif text-2xl tracking-tight text-white">Intake admin</h1>
          <p className="mt-2 max-w-xl text-xs text-zinc-400">
            Corporate, event, and luxury experience form submissions. Storage:{" "}
            <span className="font-medium text-zinc-200">
              {mode === "database" ? "Neon (DATABASE_URL)" : "local file (data/b2b-leads.json)"}
            </span>
            .
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <AdminLogoutForm />
        </div>
      </header>
      <nav className="mb-8 flex flex-wrap gap-2 text-sm">
        <Link
          href="/admin"
          className="rounded-md border border-white/10 bg-white/5 px-3 py-2 text-zinc-200 hover:border-amber-200/40 hover:text-white"
        >
          Overview
        </Link>
        <Link
          href="/admin/corporate"
          className="rounded-md border border-white/10 bg-white/5 px-3 py-2 text-zinc-200 hover:border-amber-200/40 hover:text-white"
        >
          Corporate
          <span className="ml-1.5 rounded bg-white/10 px-1.5 py-0.5 text-[10px] text-zinc-400">
            {corpCount}
          </span>
        </Link>
        <Link
          href="/admin/events"
          className="rounded-md border border-white/10 bg-white/5 px-3 py-2 text-zinc-200 hover:border-amber-200/40 hover:text-white"
        >
          Events
          <span className="ml-1.5 rounded bg-white/10 px-1.5 py-0.5 text-[10px] text-zinc-400">
            {eventCount}
          </span>
        </Link>
        <Link
          href="/admin/experience"
          className="rounded-md border border-white/10 bg-white/5 px-3 py-2 text-zinc-200 hover:border-amber-200/40 hover:text-white"
        >
          Experience
          <span className="ml-1.5 rounded bg-white/10 px-1.5 py-0.5 text-[10px] text-zinc-400">
            {expCount}
          </span>
        </Link>
      </nav>
      {children}
    </div>
  );
}
