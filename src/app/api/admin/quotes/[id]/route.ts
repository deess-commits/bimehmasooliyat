// ─── PATCH /api/admin/quotes/[id] — تغییر وضعیت استعلام ─────────────

import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/lib/db";
import { verifyAdminToken, ADMIN_COOKIE } from "@/lib/admin-auth";

export const runtime = "nodejs";

const patchSchema = z.object({
  status: z.enum(["new", "contacted", "quoted", "won", "lost"]),
});

export async function PATCH(
  req: NextRequest,
  ctx: { params: Promise<{ id: string }> },
) {
  const token = req.cookies.get(ADMIN_COOKIE)?.value;
  if (!verifyAdminToken(token)) {
    return NextResponse.json({ error: "دسترسی غیرمجاز" }, { status: 401 });
  }

  const { id } = await ctx.params;
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "درخواست نامعتبر است" }, { status: 400 });
  }

  const parsed = patchSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "وضعیت نامعتبر است" }, { status: 422 });
  }

  try {
    const row = await db.quoteRequest.update({
      where: { id },
      data: { status: parsed.data.status },
      select: { id: true, status: true },
    });
    return NextResponse.json({ ok: true, ...row });
  } catch {
    return NextResponse.json({ error: "رکورد یافت نشد یا خطای ذخیره‌سازی" }, { status: 404 });
  }
}
