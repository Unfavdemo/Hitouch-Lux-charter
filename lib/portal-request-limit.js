/** @type {Map<string, { n: number; reset: number }>} */
const buckets = new Map();

/**
 * Sliding-window style limiter (per key).
 * @param {string} key
 * @param {{ max?: number; windowMs?: number }} opts
 */
export function allowKeyedRequest(key, opts = {}) {
  const max = opts.max ?? 5;
  const windowMs = opts.windowMs ?? 15 * 60 * 1000;
  const now = Date.now();
  let b = buckets.get(key);
  if (!b || b.reset <= now) {
    b = { n: 0, reset: now + windowMs };
    buckets.set(key, b);
  }
  if (b.n >= max) return false;
  b.n += 1;
  return true;
}
