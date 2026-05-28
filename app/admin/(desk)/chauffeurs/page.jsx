import { CreateChauffeurForm } from "@/components/admin/create-chauffeur-form";
import { listChauffeurs } from "@/lib/trip-service";

export const dynamic = "force-dynamic";

export default async function AdminChauffeursPage() {
  let chauffeurs = [];
  let error = null;
  try {
    chauffeurs = await listChauffeurs();
  } catch (e) {
    error = e instanceof Error ? e.message : "Could not load chauffeurs.";
  }

  return (
    <div className="space-y-8">
      <div>
        <h2 className="font-serif text-xl text-white">Chauffeurs</h2>
        <p className="mt-2 max-w-2xl text-sm text-zinc-400">
          Driver accounts sign in at <code className="text-zinc-300">/login</code> → Driver tab.
        </p>
      </div>

      {error ? (
        <p className="rounded-md border border-red-500/35 bg-red-950/35 px-4 py-3 text-sm text-red-100">
          {error}
        </p>
      ) : null}

      <CreateChauffeurForm />

      <ul className="divide-y divide-white/10 rounded-lg border border-white/10">
        {chauffeurs.map((c) => (
          <li key={c.id} className="flex flex-wrap items-center justify-between gap-2 px-4 py-3">
            <div>
              <p className="font-medium text-white">{c.name}</p>
              <p className="text-sm text-zinc-400">{c.email}</p>
            </div>
            {c.phone ? <p className="text-sm text-zinc-500">{c.phone}</p> : null}
          </li>
        ))}
        {chauffeurs.length === 0 && !error ? (
          <li className="px-4 py-8 text-center text-sm text-zinc-500">No chauffeurs yet.</li>
        ) : null}
      </ul>
    </div>
  );
}
