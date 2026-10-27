// ─── In-memory Rate Limiter ────────────────────────────────────────
// برای تک‌سرور (سندباکس/VPS) کافی است؛ در محیط serverless باید Redis جایگزین شود.

interface Bucket {
  count: number;
  reset: number;
}

const buckets = new Map<string, Bucket>();

export function rateLimit(
  key: string,
  limit = 5,
  windowMs = 60_000,
): { ok: boolean; retryAfterSec: number } {
  const now = Date.now();
  const b = buckets.get(key);
  if (!b || b.reset < now) {
    buckets.set(key, { count: 1, reset: now + windowMs });
    return { ok: true, retryAfterSec: 0 };
  }
  b.count += 1;
  if (b.count > limit) {
    return { ok: false, retryAfterSec: Math.ceil((b.reset - now) / 1000) };
  }
  return { ok: true, retryAfterSec: 0 };
}

// پاک‌سازی دوره‌ای برای جلوگیری از رشد حافظه
if (typeof setInterval !== "undefined") {
  const timer = setInterval(() => {
    const now = Date.now();
    for (const [k, v] of buckets) if (v.reset < now) buckets.delete(k);
  }, 5 * 60_000);
  if (typeof timer === "object" && "unref" in timer) timer.unref();
}
