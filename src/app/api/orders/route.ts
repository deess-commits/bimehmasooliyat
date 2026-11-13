import { NextRequest, NextResponse } from "next/server";
import { createHash, randomBytes } from "crypto";
import { db } from "@/lib/db";
import { orderSchema } from "@/lib/validation";
import { rateLimit } from "@/lib/rate-limit";
import {
  calculatePremium,
  KIND_LABELS,
  KIND_PRODUCT_SLUGS,
  type CalcInput,
} from "@/lib/pricing";

export const runtime = "nodejs";

function ipHash(req: NextRequest): string {
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    req.headers.get("x-real-ip") ??
    "unknown";
  return createHash("sha256").update(ip).digest("hex").slice(0, 16);
}

function orderTrackingCode(): string {
  const d = new Date();
  const yy = String(d.getFullYear()).slice(2);
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  const rand = randomBytes(2).toString("hex").toUpperCase();
  return `O-${yy}${mm}${dd}-${rand}`;
}

export async function POST(req: NextRequest) {
  // 1) Rate limit — 5 سفارش در دقیقه برای هر IP
  const rl = rateLimit(`order:${ipHash(req)}`, 5, 60_000);
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

  const parsed = orderSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message ?? "اطلاعات ناقص است" },
      { status: 422 },
    );
  }
  const data = parsed.data;

  // 3) Honeypot + captcha
  if (data.website && data.website.length > 0) {
    return NextResponse.json({ error: "درخواست رد شد" }, { status: 400 });
  }
  if (data.captcha.a + data.captcha.b !== data.captcha.answer) {
    return NextResponse.json({ error: "پاسخ سوال امنیتی نادرست است" }, { status: 422 });
  }

  // 4) محاسبه قیمت فقط سمت سرور — قیمت کلاینت هرگز پذیرفته نمی‌شود
  const breakdown = calculatePremium(data.kind, data.config as CalcInput);
  if (!breakdown) {
    return NextResponse.json(
      {
        error:
          "ترکیب انتخابی برای محاسبه آنلاین در دسترس نیست؛ از فرم استعلام عمومی استفاده کنید یا با کارشناس تماس بگیرید",
      },
      { status: 422 },
    );
  }

  // 5) Persist
  const code = orderTrackingCode();
  try {
    await db.insuranceOrder.create({
      data: {
        trackingCode: code,
        kind: data.kind,
        productSlug: KIND_PRODUCT_SLUGS[data.kind],
        productName: KIND_LABELS[data.kind],
        config: data.config,
        breakdown,
        totalToman: breakdown.total,
        fullName: data.fullName,
        nationalId: data.nationalId || null,
        phone: data.phone,
        email: data.email || null,
        city: data.city || null,
        postalCode: data.postalCode || null,
        birthYear:
          typeof data.birthYear === "number" && Number.isFinite(data.birthYear)
            ? data.birthYear
            : null,
        licenseNumber: data.licenseNumber || null,
        workAddress: data.workAddress || null,
        prevPolicyNumber: data.prevPolicyNumber || null,
        note: data.note || null,
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

  return NextResponse.json(
    { ok: true, trackingCode: code, total: breakdown.total },
    { status: 201 },
  );
}
