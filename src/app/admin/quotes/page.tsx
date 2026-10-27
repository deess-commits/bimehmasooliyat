// ─── مدیریت استعلام‌ها ──────────────────────────────────────────────

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { QuoteStatusSelect } from "@/components/admin/quote-status-select";
import { db } from "@/lib/db";
import { faDate, toFaDigits } from "@/lib/format";

export const dynamic = "force-dynamic";

export default async function AdminQuotesPage() {
  const rows = await db.quoteRequest.findMany({
    orderBy: { createdAt: "desc" },
    take: 100,
  });

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-xl font-extrabold sm:text-2xl">استعلام‌های قیمت</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          {toFaDigits(rows.length)} استعلام اخیر — وضعیت هر مورد را پس از تماس به‌روزرسانی کنید.
        </p>
      </header>

      <div className="overflow-x-auto rounded-2xl border">
        <Table className="min-w-[960px]">
          <TableHeader>
            <TableRow className="bg-accent/60">
              <TableHead className="text-start">کد پیگیری</TableHead>
              <TableHead className="text-start">نام</TableHead>
              <TableHead className="text-start">تلفن</TableHead>
              <TableHead className="text-start">شهر</TableHead>
              <TableHead className="text-start">محصول</TableHead>
              <TableHead className="text-start">سقف موردنظر</TableHead>
              <TableHead className="text-start">پیام</TableHead>
              <TableHead className="text-start">تاریخ</TableHead>
              <TableHead className="text-start">وضعیت</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.length === 0 ? (
              <TableRow>
                <TableCell colSpan={9} className="py-8 text-center text-sm text-muted-foreground">
                  هنوز استعلامی ثبت نشده است.
                </TableCell>
              </TableRow>
            ) : (
              rows.map((q) => (
                <TableRow key={q.id}>
                  <TableCell className="font-mono text-xs" dir="ltr">{q.trackingCode}</TableCell>
                  <TableCell className="text-sm">{q.fullName}</TableCell>
                  <TableCell className="text-sm" dir="ltr">{q.phone}</TableCell>
                  <TableCell className="text-sm">{q.city || "—"}</TableCell>
                  <TableCell className="text-sm">{q.productName || "—"}</TableCell>
                  <TableCell className="text-sm">{q.desiredCoverage || "—"}</TableCell>
                  <TableCell className="max-w-40 truncate text-xs text-muted-foreground" title={q.message ?? ""}>
                    {q.message || "—"}
                  </TableCell>
                  <TableCell className="text-xs text-muted-foreground">
                    {faDate(q.createdAt.toISOString())}
                  </TableCell>
                  <TableCell>
                    <QuoteStatusSelect id={q.id} status={q.status} />
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
