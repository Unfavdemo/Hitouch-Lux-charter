"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";

export function FloatingComms({ site }) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const drawerRef = useRef(null);
  const titleId = useId();

  const closeDrawer = useCallback(() => setDrawerOpen(false), []);

  useEffect(() => {
    if (!drawerOpen) return;
    const node = drawerRef.current;
    if (!node) return;

    const focusable = node.querySelectorAll(
      'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])',
    );
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    first?.focus();

    const onKey = (e) => {
      if (e.key === "Escape") {
        e.preventDefault();
        closeDrawer();
        return;
      }
      if (e.key !== "Tab" || focusable.length === 0) return;
      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault();
          last?.focus();
        }
      } else if (document.activeElement === last) {
        e.preventDefault();
        first?.focus();
      }
    };

    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [drawerOpen, closeDrawer]);

  return (
    <>
      <div className="pointer-events-none fixed bottom-4 right-4 z-[60] flex max-w-[calc(100%-2rem)] flex-col items-end gap-3 sm:bottom-8 sm:right-8">
        <div
          className={`pointer-events-auto w-full max-w-[20rem] origin-bottom-right transition ${
            chatOpen ? "scale-100 opacity-100" : "pointer-events-none scale-95 opacity-0"
          }`}
          aria-hidden={!chatOpen}
        >
          <div className="rounded-lg border border-accent/20 bg-surface p-4 shadow-xl shadow-black/50">
            <p className="font-serif text-lg text-heading">Concierge desk</p>
            <p className="mt-2 text-sm text-charcoal">
              Live chat integration is not connected. For immediate assistance,
              call or open the contact drawer.
            </p>
            <div className="mt-4 flex gap-2">
              <button
                type="button"
                className="flex-1 rounded-md border border-accent/25 px-3 py-2 text-xs font-semibold uppercase tracking-widest text-heading transition-colors hover:border-accent hover:bg-accent-soft/20"
                onClick={() => {
                  setChatOpen(false);
                  setDrawerOpen(true);
                }}
              >
                Contact
              </button>
              <a
                className="flex-1 rounded-md bg-accent px-3 py-2 text-center text-xs font-semibold uppercase tracking-widest text-ink shadow-sm transition-[filter] hover:brightness-110"
                href={`tel:${site.phoneTel}`}
              >
                Call now
              </a>
            </div>
          </div>
        </div>

        <div className="pointer-events-auto flex flex-col items-end gap-2">
          <button
            type="button"
            onClick={() => setChatOpen((v) => !v)}
            className="inline-flex h-12 items-center gap-2 rounded-full border border-accent/40 bg-surface px-4 text-xs font-semibold uppercase tracking-widest text-heading shadow-md transition-colors hover:border-accent hover:bg-accent-soft/25"
            aria-expanded={chatOpen}
          >
            <span
              className="inline-block h-2 w-2 rounded-full bg-emerald-500"
              aria-hidden
            />
            Concierge online
          </button>
          <button
            type="button"
            onClick={() => setDrawerOpen(true)}
            className="rounded-full border border-accent/30 bg-midnight px-5 py-3 text-xs font-semibold uppercase tracking-widest text-heading shadow-lg transition-colors hover:border-accent hover:bg-midnight/90"
          >
            Private line
          </button>
        </div>
      </div>

      {drawerOpen && (
        <div className="fixed inset-0 z-[70] overflow-hidden">
          <button
            type="button"
            className="absolute inset-0 bg-midnight/50 backdrop-blur-sm"
            aria-label="Close contact drawer"
            onClick={closeDrawer}
          />
          <div
            ref={drawerRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            className="absolute right-0 top-0 flex h-full w-full max-w-md flex-col border-l border-border-subtle bg-page shadow-2xl"
          >
            <div className="flex items-center justify-between border-b border-border-subtle px-5 py-4">
              <p id={titleId} className="font-serif text-xl text-heading">
                Contact {site.brandName}
              </p>
              <button
                type="button"
                className="rounded-md border border-border-subtle px-2 py-1 text-xs uppercase tracking-widest text-charcoal hover:text-accent-readable"
                onClick={closeDrawer}
              >
                Close
              </button>
            </div>
            <div className="flex-1 space-y-6 overflow-y-auto px-5 py-6 text-sm text-charcoal">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[var(--tracking-brand)] text-charcoal">
                  Phone
                </p>
                <a
                  className="mt-2 block font-medium text-heading"
                  href={`tel:${site.phoneTel}`}
                >
                  {site.phoneDisplay}
                </a>
              </div>
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[var(--tracking-brand)] text-charcoal">
                  Email
                </p>
                <a
                  className="mt-2 block font-medium text-heading"
                  href={`mailto:${site.email}`}
                >
                  {site.email}
                </a>
              </div>
              <p className="text-xs leading-relaxed">
                Requests submitted through Moovs partner booking are acknowledged
                within one business day. For time-sensitive movements, call
                directly.
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
