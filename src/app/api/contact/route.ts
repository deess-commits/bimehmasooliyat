import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { contactSchema } from "@/lib/validation";
import { rateLimit } from "@/lib/rate-limit";

export const runtime = "nodejs";

function ipKey(req: NextRequest): string {
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    req.headers.get("x-real-ip") ??
    "unknown";
  return `contact:${ip}`;
}

export async function POST(req: NextRequest) {
  const rl = rateLimit(ipKey(req), 5, 60_000);
  if (!rl.ok) {
    return NextResponse.json(
      { error: `تعداد درخواست‌ها زیاد است؛ ${rl.retryAfterSec} ثانیه دیگر تلاش کنید` },
      { status: 429 },
    );
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "درخواست نامعتبر است" }, { status: 400 });
  }

  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message ?? "اطلاعات ناقص است" },
      { status: 422 },
    );
  }

  if (parsed.data.website && parsed.data.website.length > 0) {
    return NextResponse.json({ error: "درخواست رد شد" }, { status: 400 });
  }

  try {
    await db.contactMessage.create({
      data: {
        fullName: parsed.data.fullName,
        phone: parsed.data.phone,
        email: parsed.data.email || null,
        subject: parsed.data.subject,
        message: parsed.data.message,
      },
    });
  } catch {
    return NextResponse.json({ error: "خطای ذخیره‌سازی؛ دوباره تلاش کنید" }, { status: 500 });
  }

  return NextResponse.json({ ok: true }, { status: 201 });
}
