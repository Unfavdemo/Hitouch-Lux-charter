"use client";

import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";

export function TestimonialCarousel({ items, light = false }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (media.matches) return;

    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % items.length);
    }, 7000);
    return () => window.clearInterval(id);
  }, [items.length]);

  const item = items[index];

  return (
    <div className="relative">
      <Card
        variant={light ? "light" : "default"}
        className={`overflow-hidden p-8 sm:p-10 ${light ? "shadow-sm" : ""}`}
      >
        <p
          className={`text-[11px] font-semibold uppercase tracking-[var(--tracking-brand)] ${
            light ? "text-accent-on-light" : "text-accent-readable"
          }`}
          aria-live="polite"
        >
          Client reflections
        </p>
        <blockquote
          key={item.id}
          className={`mt-6 font-serif text-2xl leading-snug sm:text-3xl ${
            light ? "text-light-ink" : "text-heading"
          }`}
        >
          &ldquo;{item.quote}&rdquo;
        </blockquote>
        <footer className={`mt-8 text-sm ${light ? "text-light-muted" : "text-on-dark-muted"}`}>
          <span className={`font-medium ${light ? "text-light-ink" : "text-heading"}`}>
            {item.attribution}
          </span>
          <span className="mx-2 text-border-subtle">·</span>
          <span>{item.role}</span>
          <span className="mx-2 text-border-subtle">·</span>
          <span>{item.city}</span>
        </footer>
      </Card>

      <div
        className="mt-4 flex justify-center gap-2"
        role="tablist"
        aria-label="Testimonials"
      >
        {items.map((t, i) => (
          <button
            key={t.id}
            type="button"
            role="tab"
            aria-selected={i === index}
            className={`h-2 w-8 rounded-full border transition ${
              i === index
                ? "border-accent bg-accent"
                : light
                  ? "border-light-ink/15 bg-paper hover:border-accent/50"
                  : "border-border-subtle bg-surface hover:border-accent/50"
            }`}
            onClick={() => setIndex(i)}
          />
        ))}
      </div>
    </div>
  );
}
