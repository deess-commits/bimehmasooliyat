// ─── GET /api/track?code=Q-YYMMDD-XXXX ─────────────────────────────
// پیگیری عمومی استعلام — بدون افشای اطلاعات شخصی (فقط وضعیت + محصول + تاریخ)

import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/lib/db";
import { rateLimit } from "@/lib/rate-limit";

export const runtime = "nodejs";

const trackSchema = z.object({
  code: z
    .string()
    .trim()
    .toUpperCase()
    .regex(/^Q-\d{6}-[A-Z0-9]{4}$/, "قالب کد پیگیری صحیح نیست (نمونه: Q-260101-A3B4)"),
});

function ipHash(req: NextRequest): string {
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    req.headers.get("x-real-ip") ??
    "unknown";
  // هش کوتاه فقط برای rate-limit — بدون ذخیره IP خام
  let h = 0;
  for (let i = 0; i < ip.length; i++) h = (h * 31 + ip.charCodeAt(i)) | 0;
  return String(h);
}

export async function GET(req: NextRequest) {
  // ۱) Rate limit — ۱۰ جست‌وجو در دقیقه برای هر IP
  const rl = rateLimit(`track:${ipHash(req)}`, 10, 60_000);
  if (!rl.ok) {
    return NextResponse.json(
      { error: `تعداد درخواست‌ها زیاد است؛ ${rl.retryAfterSec} ثانیه دیگر تلاش کنید` },
      { status: 429, headers: { "Retry-After": String(rl.retryAfterSec) } },
    );
  }

  // ۲) اعتبارسنجی کد
  const raw = req.nextUrl.searchParams.get("code") ?? "";
  const parsed = trackSchema.safeParse({ code: raw });
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message ?? "کد پیگیری نامعتبر است" },
      { status: 422 },
    );
  }

  // ۳) جست‌وجو — حداقل داده لازم، بدون نام/تلفن
  try {
    const row = await db.quoteRequest.findUnique({
      where: { trackingCode: parsed.data.code },
      select: {
        trackingCode: true,
        status: true,
        productName: true,
        desiredCoverage: true,
        createdAt: true,
      },
    });
    if (!row) {
      return NextResponse.json(
        { error: "استعلامی با این کد یافت نشد؛ کد را از پیامک/ایمیل ثبت استعلام بررسی کنید" },
        { status: 404 },
      );
    }
    return NextResponse.json(
      {
        ok: true,
        trackingCode: row.trackingCode,
        status: row.status,
        productName: row.productName,
        desiredCoverage: row.desiredCoverage,
        createdAt: row.createdAt.toISOString(),
      },
      { headers: { "Cache-Control": "no-store" } },
    );
  } catch {
    return NextResponse.json({ error: "خطای سرویس؛ بعداً تلاش کنید" }, { status: 500 });
  }
}
