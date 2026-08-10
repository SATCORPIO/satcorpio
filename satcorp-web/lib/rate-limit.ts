/**
 * A per-key sliding window, held in process.
 *
 * Single-instance, self-hosted deployment, so an in-process map is honest.
 * Behind more than one replica this needs to move to Redis.
 *
 * Each intake pipeline takes its own limiter so a burst of partner enquiries
 * cannot lock a client out of the engagement brief.
 */
export function createRateLimit({
  windowMs = 60_000,
  max = 3,
}: { windowMs?: number; max?: number } = {}) {
  const attempts = new Map<string, number[]>();

  return function rateLimited(key: string): boolean {
    const now = Date.now();
    const recent = (attempts.get(key) ?? []).filter((t) => now - t < windowMs);
    recent.push(now);
    attempts.set(key, recent);

    // Keep the map from growing without bound on a long-lived process.
    if (attempts.size > 5000) {
      for (const [k, times] of attempts) {
        if (times.every((t) => now - t >= windowMs)) attempts.delete(k);
      }
    }

    return recent.length > max;
  };
}
