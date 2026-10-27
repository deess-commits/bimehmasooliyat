// ─── Admin Session (HMAC cookie — ساده برای تک‌سرور) ────────────────
// production: ADMIN_PASSWORD از .env خوانده می‌شود؛ مقدار پیش‌فرض فقط برای سندباکس.
// ارتقا به NextAuth در فاز پنل کاربر (Phase 3) مستند شد — به docs/ARCHITECTURE.md.

import { createHash, createHmac, timingSafeEqual } from "crypto";
import { cookies } from "next/headers";

const PASSWORD = process.env.ADMIN_PASSWORD ?? "bimeh-admin-1404";
export const ADMIN_COOKIE = "bm_admin";
const TOKEN = createHmac("sha256", PASSWORD).update("bm-admin-session-v1").digest("hex");

export function verifyAdminPassword(input: string): boolean {
  const a = Buffer.from(input);
  const b = Buffer.from(PASSWORD);
  return a.length === b.length && timingSafeEqual(a, b);
}

export function adminCookieValue(): string {
  return TOKEN;
}

export function verifyAdminToken(token: string | undefined | null): boolean {
  if (!token) return false;
  const a = Buffer.from(token);
  const b = Buffer.from(TOKEN);
  return a.length === b.length && timingSafeEqual(a, b);
}

/** برای layout و صفحات سرور */
export async function isAdmin(): Promise<boolean> {
  const store = await cookies();
  return verifyAdminToken(store.get(ADMIN_COOKIE)?.value);
}

/** هش امنیتی برای لاگ‌ها — بدون ذخیره مقدار خام */
export function fingerprint(value: string): string {
  return createHash("sha256").update(value).digest("hex").slice(0, 12);
}
