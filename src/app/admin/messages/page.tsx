// ─── پیام‌های صفحه تماس ─────────────────────────────────────────────

import { Card, CardContent } from "@/components/ui/card";
import { db } from "@/lib/db";
import { faDate, toFaDigits } from "@/lib/format";

export const dynamic = "force-dynamic";

export default async function AdminMessagesPage() {
  const rows = await db.contactMessage.findMany({
    orderBy: { createdAt: "desc" },
    take: 100,
  });

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-xl font-extrabold sm:text-2xl">پیام‌های تماس</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          {toFaDigits(rows.length)} پیام اخیر از فرم تماس.
        </p>
      </header>

      {rows.length === 0 ? (
        <p className="rounded-2xl border bg-card p-6 text-sm text-muted-foreground">
          هنوز پیامی ثبت نشده است.
        </p>
      ) : (
        <div className="grid gap-3">
          {rows.map((m) => (
            <Card key={m.id} className="py-4">
              <CardContent className="space-y-2">
                <div className="flex flex-wrap items-center gap-2 text-sm">
                  <span className="font-bold">{m.fullName}</span>
                  {m.phone ? (
                    <span dir="ltr" className="text-xs text-muted-foreground">{m.phone}</span>
                  ) : null}
                  {m.email ? (
                    <span dir="ltr" className="text-xs text-muted-foreground">{m.email}</span>
                  ) : null}
                  <span className="ms-auto text-xs text-muted-foreground">
                    {faDate(m.createdAt.toISOString())}
                  </span>
                </div>
                <p className="text-sm font-bold leading-7">{m.subject}</p>
                <p className="text-[13px] leading-7 text-muted-foreground">{m.message}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
