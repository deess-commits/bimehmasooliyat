import { NextRequest, NextResponse } from "next/server";
import { createHash } from "crypto";
import { db } from "@/lib/db";
import { newsletterSchema } from "@/lib/validation";
import { rateLimit } from "@/lib/rate-limit";

export const runtime = "nodejs";

function ipHash(req: NextRequest): string {
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    req.headers.get("x-real-ip") ??
    "unknown";
  return createHash("sha256").update(ip).digest("hex").slice(0, 16);
}

export async function POST(req: NextRequest) {
  // 1) Rate limit — ۳ درخواست در دقیقه برای هر IP
  const rl = rateLimit(`news:${ipHash(req)}`, 3, 60_000);
  if (!rl.ok) {
    return NextResponse.json(
      { error: `تعداد درخواست‌ها زیاد است؛ ${rl.retryAfterSec} ثانیه دیگر تلاش کنید` },
      { status: 429, headers: { "Retry-After": String(rl.retryAfterSec) } },
    );
  }

  // 2) Parse + validate
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "درخواست نامعتبر است" }, { status: 400 });
  }

  const parsed = newsletterSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message ?? "اطلاعات ناقص است" },
      { status: 422 },
    );
  }

  // 3) Honeypot
  if (parsed.data.website && parsed.data.website.length > 0) {
    return NextResponse.json({ error: "درخواست رد شد" }, { status: 400 });
  }

  // 4) Upsert — ایمیل تکراری هم پاسخ موفق می‌گیرد (بدون افشای وجود حساب)
  try {
    await db.newsletterSubscriber.upsert({
      where: { email: parsed.data.email },
      create: { email: parsed.data.email, ipHash: ipHash(req) },
      update: {},
    });
  } catch {
    return NextResponse.json(
      { error: "خطای ذخیره‌سازی؛ لطفاً دوباره تلاش کنید" },
      { status: 500 },
    );
  }

  return NextResponse.json(
    { ok: true, message: "ایمیل شما ثبت شد؛ تغییرات دیه، نرخ‌ها و آیین‌نامه‌ها را ماهانه دریافت می‌کنید." },
    { status: 201 },
  );
}
