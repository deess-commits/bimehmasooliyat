// ─── مدیریت سفارش‌های آنلاین (محاسبه + ثبت خرید) ────────────────────

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { OrderStatusSelect } from "@/components/admin/order-status-select";
import { db } from "@/lib/db";
import { faDate, faNumber, toFaDigits } from "@/lib/format";
import type { PriceBreakdown } from "@/lib/pricing";

export const dynamic = "force-dynamic";

const STATUS_LABEL: Record<string, string> = {
  new: "جدید",
  verifying: "در حال بررسی",
  issued: "صادر شد",
  rejected: "رد شد",
};

const KIND_LABEL: Record<string, string> = {
  doctors: "پزشکان",
  nurses: "پرستاران",
  engineers: "مهندسین",
};

interface ConfigShape {
  specialty?: string;
  ceiling?: string;
  coverages?: string[];
  employment?: string;
  responsibility?: string;
  field?: string;
  grade?: string;
  financial?: string;
  clauses?: string[];
  dihIncrease?: string;
  tabareh66?: string;
  noClaim?: string;
}

function configSummary(kind: string, cfg: ConfigShape): string {
  const parts: string[] = [];
  if (cfg.specialty) parts.push(cfg.specialty);
  if (kind === "doctors" && cfg.ceiling) parts.push(`دیه ${cfg.ceiling} میلیارد ریال`);
  if (kind === "nurses" && cfg.employment) parts.push(`استخدام: ${cfg.employment}`);
  if (kind === "engineers") {
    if (cfg.responsibility) parts.push(cfg.responsibility);
    if (cfg.field) parts.push(cfg.field);
    if (cfg.financial) parts.push(`تعهدات ${cfg.financial}`);
  }
  if (cfg.coverages?.length) parts.push(`پوشش‌ها: ${cfg.coverages.join("، ")}`);
  if (cfg.clauses?.length) parts.push(`کلوزها: ${cfg.clauses.join("، ")}`);
  if (cfg.dihIncrease && cfg.dihIncrease !== "none") parts.push(`افزایش دیه: ${cfg.dihIncrease}`);
  if (cfg.tabareh66 && cfg.tabareh66 !== "none") parts.push(`تبصره ۶۶: ${cfg.tabareh66}`);
  if (cfg.noClaim && cfg.noClaim !== "none") parts.push(`تخفیف: ${cfg.noClaim}`);
  return parts.join(" — ") || "—";
}

export default async function AdminOrdersPage() {
  const rows = await db.insuranceOrder.findMany({
    orderBy: { createdAt: "desc" },
    take: 100,
  });

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-xl font-extrabold sm:text-2xl">سفارش‌های آنلاین</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          {toFaDigits(rows.length)} سفارش اخیر — قیمت هر سفارش با محاسبه‌گر آنلاین محاسبه و سمت سرور
          صحت‌سنجی شده است. وضعیت را پس از تماس به‌روزرسانی کنید.
        </p>
      </header>

      <div className="overflow-x-auto rounded-2xl border">
        <Table className="min-w-[1080px]">
          <TableHeader>
            <TableRow className="bg-accent/60">
              <TableHead className="text-start">کد پیگیری</TableHead>
              <TableHead className="text-start">رشته</TableHead>
              <TableHead className="text-start">نام</TableHead>
              <TableHead className="text-start">تلفن</TableHead>
              <TableHead className="text-start">کد ملی</TableHead>
              <TableHead className="text-start">انتخاب‌ها</TableHead>
              <TableHead className="text-start">قیمت (تومان)</TableHead>
              <TableHead className="text-start">تاریخ</TableHead>
              <TableHead className="text-start">وضعیت</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.length === 0 ? (
              <TableRow>
                <TableCell colSpan={9} className="py-8 text-center text-sm text-muted-foreground">
                  هنوز سفارشی ثبت نشده است.
                </TableCell>
              </TableRow>
            ) : (
              rows.map((o) => {
                const cfg = (o.config ?? {}) as ConfigShape;
                const bd = (o.breakdown ?? {}) as unknown as PriceBreakdown;
                return (
                  <TableRow key={o.id}>
                    <TableCell className="font-mono text-xs" dir="ltr">
                      {o.trackingCode}
                    </TableCell>
                    <TableCell className="text-sm">{KIND_LABEL[o.kind] ?? o.kind}</TableCell>
                    <TableCell className="text-sm">{o.fullName}</TableCell>
                    <TableCell className="text-sm" dir="ltr">
                      {o.phone}
                    </TableCell>
                    <TableCell className="text-xs" dir="ltr">
                      {o.nationalId || "—"}
                    </TableCell>
                    <TableCell className="max-w-64 text-xs leading-6 text-muted-foreground">
                      {configSummary(o.kind, cfg)}
                      {o.licenseNumber ? (
                        <span className="mt-1 block">نظام: {o.licenseNumber}</span>
                      ) : null}
                      {o.prevPolicyNumber ? (
                        <span className="block">بیمه‌نامه قبل: {o.prevPolicyNumber}</span>
                      ) : null}
                    </TableCell>
                    <TableCell className="text-sm font-bold tabular-nums">
                      {faNumber(o.totalToman)}
                      {bd.base ? (
                        <span className="block text-[11px] font-normal text-muted-foreground">
                          پایه: {faNumber(bd.base)}
                        </span>
                      ) : null}
                    </TableCell>
                    <TableCell className="text-xs text-muted-foreground">
                      {faDate(o.createdAt.toISOString())}
                    </TableCell>
                    <TableCell>
                      <OrderStatusSelect id={o.id} status={o.status} />
                    </TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
