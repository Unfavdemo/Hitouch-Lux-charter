"use client";

export default function DriverError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="mx-auto flex min-h-full max-w-lg flex-col items-center justify-center px-4 py-16 text-center">
      <h1 className="font-serif text-xl text-white">Something went wrong</h1>
      <p className="mt-3 text-sm text-zinc-400">
        {error.message || "The driver dashboard could not load. Please try again."}
      </p>
      <button
        type="button"
        onClick={reset}
        className="mt-8 rounded-md bg-amber-200/90 px-5 py-2.5 text-sm font-semibold uppercase tracking-wider text-black"
      >
        Try again
      </button>
    </div>
  );
}
