// ─── داشبورد ادمین — شمارش‌ها و آخرین استعلام‌ها ────────────────────

import Link from "next/link";
import { ArrowLeft, MessageSquareText, ReceiptText, Star, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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

const STATUS_LABEL: Record<string, string> = {
  new: "جدید",
  contacted: "تماس انجام شد",
  quoted: "پیش‌فاکتور ارسال شد",
  won: "خرید نهایی شد",
  lost: "منتفی",
};

export default async function AdminDashboardPage() {
  const [quotesTotal, quotesNew, reviewsPending, messages, subscribers, latest] =
    await Promise.all([
      db.quoteRequest.count(),
      db.quoteRequest.count({ where: { status: "new" } }),
      db.review.count({ where: { status: "pending" } }),
      db.contactMessage.count(),
      db.newsletterSubscriber.count(),
      db.quoteRequest.findMany({
        orderBy: { createdAt: "desc" },
        take: 6,
        select: {
          id: true,
          trackingCode: true,
          fullName: true,
          phone: true,
          productName: true,
          status: true,
          createdAt: true,
        },
      }),
    ]);

  const tiles = [
    {
      label: "استعلام‌های جدید",
      value: quotesNew,
      icon: ReceiptText,
      href: "/admin/quotes",
      note: `از مجموع ${toFaDigits(quotesTotal)} استعلام`,
    },
    {
      label: "نظرات در انتظار تأیید",
      value: reviewsPending,
      icon: Star,
      href: "/admin/reviews",
      note: "تأیید/رد پیش از انتشار",
    },
    {
      label: "پیام‌های تماس",
      value: messages,
      icon: MessageSquareText,
      href: "/admin/messages",
      note: "از صفحه تماس",
    },
    {
      label: "مشترکان خبرنامه",
      value: subscribers,
      icon: Users,
      href: "/admin/subscribers",
      note: "ایمیل‌های ثبت‌شده",
    },
  ];

  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-xl font-extrabold sm:text-2xl">داشبورد مدیریت</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          نمای کلی عملیات روزانه نمایندگی — استعلام‌ها، نظرات و پیام‌ها.
        </p>
      </header>

      <section aria-label="شمارش‌ها" className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {tiles.map((t) => (
          <Link key={t.href} href={t.href} className="group">
            <Card className="h-full py-4 transition-colors group-hover:border-primary/40">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-sm text-muted-foreground">
                  <t.icon className="size-4 text-primary" aria-hidden="true" />
                  {t.label}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-extrabold">{toFaDigits(t.value)}</p>
                <p className="mt-1 text-[11px] text-muted-foreground">{t.note}</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </section>

      <section aria-labelledby="latest-quotes">
        <div className="flex items-center justify-between">
          <h2 id="latest-quotes" className="text-base font-extrabold">
            آخرین استعلام‌ها
          </h2>
          <Link href="/admin/quotes" className="inline-flex items-center gap-1 text-sm font-bold text-primary hover:underline">
            همه استعلام‌ها
            <ArrowLeft className="size-4" aria-hidden="true" />
          </Link>
        </div>
        <div className="mt-3 overflow-hidden rounded-2xl border">
          <Table>
            <TableHeader>
              <TableRow className="bg-accent/60">
                <TableHead className="text-start">کد</TableHead>
                <TableHead className="text-start">نام</TableHead>
                <TableHead className="text-start">تلفن</TableHead>
                <TableHead className="text-start">محصول</TableHead>
                <TableHead className="text-start">وضعیت</TableHead>
                <TableHead className="text-start">تاریخ</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {latest.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="py-8 text-center text-sm text-muted-foreground">
                    هنوز استعلامی ثبت نشده است.
                  </TableCell>
                </TableRow>
              ) : (
                latest.map((q) => (
                  <TableRow key={q.id}>
                    <TableCell className="font-mono text-xs" dir="ltr">{q.trackingCode}</TableCell>
                    <TableCell className="text-sm">{q.fullName}</TableCell>
                    <TableCell className="text-sm" dir="ltr">{q.phone}</TableCell>
                    <TableCell className="text-sm">{q.productName ?? "—"}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className="text-xs">
                        {STATUS_LABEL[q.status] ?? q.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-xs text-muted-foreground">
                      {faDate(q.createdAt.toISOString())}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </section>
    </div>
  );
}
