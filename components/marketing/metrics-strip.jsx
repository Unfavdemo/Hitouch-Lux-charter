"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

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
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });
  const reduce = useReducedMotion();
  const display = useCountUp(metric.value, inView, !!reduce);

  return (
    <motion.div
      ref={ref}
      initial={reduce ? false : { opacity: 0, y: 12 }}
      whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.5 }}
      className={`rounded-[var(--radius-card)] border p-6 shadow-sm ${
        light
          ? "border-light-ink/10 bg-cream"
          : "border-border-subtle bg-surface"
      }`}
    >
      <p
        className={`text-[11px] font-semibold uppercase tracking-[var(--tracking-brand)] ${
          light ? "text-light-muted" : "text-muted"
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
          light ? "text-light-muted" : "text-muted"
        }`}
      >
        {metric.description}
      </p>
    </motion.div>
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
