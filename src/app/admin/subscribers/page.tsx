// ─── مشترکان خبرنامه ────────────────────────────────────────────────

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { db } from "@/lib/db";
import { faDate, toFaDigits } from "@/lib/format";

export const dynamic = "force-dynamic";

export default async function AdminSubscribersPage() {
  const rows = await db.newsletterSubscriber.findMany({
    orderBy: { createdAt: "desc" },
    take: 200,
  });

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-xl font-extrabold sm:text-2xl">مشترکان خبرنامه</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          {toFaDigits(rows.length)} ایمیل ثبت‌شده — فقط برای ارسال محتوای آموزشی بیمه مسئولیت.
        </p>
      </header>

      <div className="overflow-hidden rounded-2xl border">
        <Table>
          <TableHeader>
            <TableRow className="bg-accent/60">
              <TableHead className="text-start">ایمیل</TableHead>
              <TableHead className="text-start">تاریخ عضویت</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.length === 0 ? (
              <TableRow>
                <TableCell colSpan={2} className="py-8 text-center text-sm text-muted-foreground">
                  هنوز مشترکی ثبت نشده است.
                </TableCell>
              </TableRow>
            ) : (
              rows.map((s) => (
                <TableRow key={s.id}>
                  <TableCell dir="ltr" className="text-start text-sm">{s.email}</TableCell>
                  <TableCell className="text-xs text-muted-foreground">
                    {faDate(s.createdAt.toISOString())}
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
