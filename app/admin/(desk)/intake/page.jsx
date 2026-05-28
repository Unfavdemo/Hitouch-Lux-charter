import { PendingSubmissionStatus } from "@prisma/client";
import { IntakeCreateTripForm } from "@/components/admin/intake-create-trip-form";
import { IntakeSubmissionActions } from "@/components/admin/intake-submission-actions";
import { intakePayloadToTripDraft } from "@/lib/intake-to-trip";
import { listPendingSubmissions, parseIntakePayload } from "@/lib/intake-service";
import { listChauffeurs } from "@/lib/trip-service";

export const dynamic = "force-dynamic";

export default async function AdminIntakePage() {
  let submissions = [];
  let chauffeurs = [];
  let error = null;
  try {
    [submissions, chauffeurs] = await Promise.all([
      listPendingSubmissions(PendingSubmissionStatus.PENDING),
      listChauffeurs(),
    ]);
  } catch (e) {
    error = e instanceof Error ? e.message : "Could not load intake queue.";
  }

  return (
    <div className="space-y-8">
      <div>
        <h2 className="font-serif text-xl text-white">Smith.ai intake queue</h2>
        <p className="mt-2 max-w-2xl text-sm text-zinc-400">
          Staged submissions from{" "}
          <code className="text-zinc-300">/api/webhooks/smith-intake</code>. Create a trip in one
          click — or mark processed after manual handling. Demo webhook (no secret): POST with header{" "}
          <code className="text-zinc-300">x-hitouch-demo-webhook: 1</code>.
        </p>
      </div>

      {error ? (
        <p className="rounded-md border border-red-500/35 bg-red-950/35 px-4 py-3 text-sm text-red-100">
          {error}
        </p>
      ) : null}

      {submissions.length === 0 && !error ? (
        <p className="rounded-lg border border-white/10 bg-white/[0.03] px-4 py-8 text-center text-sm text-zinc-500">
          No pending submissions. Run <code className="text-zinc-400">npm run seed:all</code>.
        </p>
      ) : (
        <ul className="space-y-4">
          {submissions.map((row) => {
            const fields = parseIntakePayload(row.payload);
            const draft = intakePayloadToTripDraft(row.payload);
            const formDraft = {
              scheduledAt: draft.scheduledAt.toISOString().slice(0, 16),
              pickupLabel: draft.pickupLabel,
              dropoffLabel: draft.dropoffLabel,
              passengerName: draft.passenger.name,
              passengerPhone: draft.passenger.phone,
              notes: draft.notes ?? "",
            };
            const created = new Date(row.createdAt).toLocaleString();
            return (
              <li
                key={row.id}
                className="rounded-lg border border-white/10 bg-white/[0.03] p-5"
              >
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <p className="text-xs text-zinc-500">{created}</p>
                    <p className="mt-1 font-medium text-white">
                      {fields.name ?? "Unknown caller"}
                      {fields.companyName ? (
                        <span className="font-normal text-zinc-400"> · {fields.companyName}</span>
                      ) : null}
                    </p>
                    {fields.email ? (
                      <p className="mt-1 text-sm text-zinc-400">{fields.email}</p>
                    ) : null}
                  </div>
                  <IntakeSubmissionActions id={row.id} />
                </div>
                {fields.tripUpdateNotes ? (
                  <p className="mt-4 text-sm leading-relaxed text-zinc-300">
                    <span className="text-[10px] font-semibold uppercase tracking-wider text-zinc-500">
                      Notes ·{" "}
                    </span>
                    {fields.tripUpdateNotes}
                  </p>
                ) : null}
                {fields.transcription ? (
                  <details className="mt-4">
                    <summary className="cursor-pointer text-xs font-semibold uppercase tracking-wider text-amber-200/80">
                      Transcription
                    </summary>
                    <p className="mt-2 text-sm leading-relaxed text-zinc-400">{fields.transcription}</p>
                  </details>
                ) : null}
                <IntakeCreateTripForm
                  submissionId={row.id}
                  draft={formDraft}
                  chauffeurs={chauffeurs}
                />
                <details className="mt-4">
                  <summary className="cursor-pointer text-xs font-semibold uppercase tracking-wider text-zinc-500">
                    Raw payload
                  </summary>
                  <pre className="mt-2 max-h-48 overflow-auto rounded-md bg-black/40 p-3 text-xs text-zinc-400">
                    {JSON.stringify(row.payload, null, 2)}
                  </pre>
                </details>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
