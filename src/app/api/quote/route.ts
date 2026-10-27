import { NextRequest, NextResponse } from "next/server";
import { createHash, randomBytes } from "crypto";
import { db } from "@/lib/db";
import { quoteSchema } from "@/lib/validation";
import { rateLimit } from "@/lib/rate-limit";

export const runtime = "nodejs";

function ipHash(req: NextRequest): string {
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    req.headers.get("x-real-ip") ??
    "unknown";
  return createHash("sha256").update(ip).digest("hex").slice(0, 16);
}

function trackingCode(): string {
  const d = new Date();
  const yy = String(d.getFullYear()).slice(2);
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  const rand = randomBytes(2).toString("hex").toUpperCase();
  return `Q-${yy}${mm}${dd}-${rand}`;
}

export async function POST(req: NextRequest) {
  // 1) Rate limit — 5 درخواست در دقیقه برای هر IP
  const rl = rateLimit(`quote:${ipHash(req)}`, 5, 60_000);
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

  const parsed = quoteSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message ?? "اطلاعات ناقص است" },
      { status: 422 },
    );
  }
  const data = parsed.data;

  // 3) Honeypot + captcha verification
  if (data.website && data.website.length > 0) {
    return NextResponse.json({ error: "درخواست رد شد" }, { status: 400 });
  }
  if (data.captcha.a + data.captcha.b !== data.captcha.answer) {
    return NextResponse.json({ error: "پاسخ سوال امنیتی نادرست است" }, { status: 422 });
  }

  // 4) Persist (بدون داده حساس در لاگ)
  const code = trackingCode();
  try {
    await db.quoteRequest.create({
      data: {
        trackingCode: code,
        fullName: data.fullName,
        phone: data.phone,
        city: data.city || null,
        productSlug: data.productSlug || null,
        productName: data.productName || null,
        desiredCoverage: data.desiredCoverage || null,
        message: data.message || null,
        source: "website",
        status: "new",
        ipHash: ipHash(req),
      },
    });
  } catch {
    return NextResponse.json(
      { error: "خطای ذخیره‌سازی؛ لطفاً دوباره تلاش کنید" },
      { status: 500 },
    );
  }

  return NextResponse.json({ ok: true, trackingCode: code }, { status: 201 });
}
