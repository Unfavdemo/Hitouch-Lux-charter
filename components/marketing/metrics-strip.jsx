"use client";

import { useEffect, useRef, useState } from "react";

function usePrefersReducedMotion() {
  const [reduce, setReduce] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduce(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  return reduce;
}

function useInViewOnce() {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { rootMargin: "-10% 0px" },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return { ref, inView };
}

function useCountUp(target, active, reduceMotion) {
  const [animated, setAnimated] = useState(0);

  useEffect(() => {
    if (!active || reduceMotion) return;

    let frame;
    const duration = 1200;
    const t0 = performance.now();
    const tick = (now) => {
      const p = Math.min(1, (now - t0) / duration);
      const eased = 1 - (1 - p) ** 3;
      setAnimated(Math.round(target * eased));
      if (p < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [target, active, reduceMotion]);

  if (!active) return 0;
  if (reduceMotion) return target;
  return animated;
}

function MetricCard({ metric, light = false }) {
  const { ref, inView } = useInViewOnce();
  const reduceMotion = usePrefersReducedMotion();
  const display = useCountUp(metric.value, inView, reduceMotion);

  return (
    <div
      ref={ref}
      className={`rounded-[var(--radius-card)] border p-6 shadow-sm ${
        light ? "border-light-ink/10 bg-cream" : "border-border-subtle bg-surface"
      }`}
    >
      <p
        className={`text-[11px] font-semibold uppercase tracking-[var(--tracking-brand)] ${
          light ? "text-light-muted" : "text-on-dark-muted"
        }`}
      >
        {metric.label}
      </p>
      <p
        className={`mt-3 font-serif text-4xl sm:text-5xl ${
          light ? "text-light-ink" : "text-heading"
        }`}
      >
        {metric.prefix}
        {display}
        {metric.suffix}
      </p>
      <p
        className={`mt-3 text-sm leading-relaxed ${
          light ? "text-light-muted" : "text-on-dark-body"
        }`}
      >
        {metric.description}
      </p>
    </div>
  );
}

export function MetricsStrip({ items, light = false }) {
  return (
    <div className="grid gap-6 md:grid-cols-3">
      {items.map((m) => (
        <MetricCard key={m.id} metric={m} light={light} />
      ))}
    </div>
  );
}
