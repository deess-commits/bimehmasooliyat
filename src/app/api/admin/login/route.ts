// ─── POST /api/admin/login ──────────────────────────────────────────

import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { rateLimit } from "@/lib/rate-limit";
import { ADMIN_COOKIE, adminCookieValue, fingerprint, verifyAdminPassword } from "@/lib/admin-auth";

export const runtime = "nodejs";

const loginSchema = z.object({
  password: z.string().min(1).max(120),
});

function ipHash(req: NextRequest): string {
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    req.headers.get("x-real-ip") ??
    "unknown";
  let h = 0;
  for (let i = 0; i < ip.length; i++) h = (h * 31 + ip.charCodeAt(i)) | 0;
  return String(h);
}

export async function POST(req: NextRequest) {
  // ۵ تلاش در دقیقه برای هر IP
  const rl = rateLimit(`admin-login:${ipHash(req)}`, 5, 60_000);
  if (!rl.ok) {
    return NextResponse.json(
      { error: `تلاش‌های ناموفق زیاد است؛ ${rl.retryAfterSec} ثانیه دیگر تلاش کنید` },
      { status: 429, headers: { "Retry-After": String(rl.retryAfterSec) } },
    );
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "درخواست نامعتبر است" }, { status: 400 });
  }

  const parsed = loginSchema.safeParse(body);
  if (!parsed.success || !verifyAdminPassword(parsed.data.password)) {
    // بدون لوگوی جزئیات — فقط لاگ داخلی اثر انگشت رمز اشتباه
    console.warn(`[admin] failed login fp=${fingerprint(parsed.success ? parsed.data.password : "-")}`);
    return NextResponse.json({ error: "رمز عبور نادرست است" }, { status: 401 });
  }

  const res = NextResponse.json({ ok: true });
  res.cookies.set(ADMIN_COOKIE, adminCookieValue(), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 7, // ۷ روز
  });
  return res;
}
