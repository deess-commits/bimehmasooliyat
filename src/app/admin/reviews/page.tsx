// ─── مدیریت نظرات مشتریان (تأیید/رد) ────────────────────────────────

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { ReviewActions } from "@/components/admin/review-actions";
import { db } from "@/lib/db";
import { faDate, toFaDigits } from "@/lib/format";

export const dynamic = "force-dynamic";

const STATUS_BADGE: Record<string, { label: string; className: string }> = {
  pending: { label: "در انتظار", className: "border-amber-500/25 bg-amber-500/10 text-amber-700 dark:text-amber-400" },
  approved: { label: "تأییدشده", className: "border-primary/25 bg-primary/10 text-primary" },
  rejected: { label: "ردشده", className: "border-destructive/25 bg-destructive/10 text-destructive" },
};

export default async function AdminReviewsPage() {
  const rows = await db.review.findMany({
    orderBy: { createdAt: "desc" },
    take: 100,
  });
  const pending = rows.filter((r) => r.status === "pending");
  const done = rows.filter((r) => r.status !== "pending");

  function renderList(list: typeof rows, emptyText: string) {
    if (list.length === 0) {
      return <p className="rounded-2xl border bg-card p-6 text-sm text-muted-foreground">{emptyText}</p>;
    }
    return (
      <div className="grid gap-3">
        {list.map((r) => (
          <Card key={r.id} className="py-4">
            <CardContent className="space-y-2">
              <div className="flex flex-wrap items-center gap-2 text-sm">
                <span className="font-bold">{r.name}</span>
                {r.city ? <span className="text-xs text-muted-foreground">— {r.city}</span> : null}
                <Badge variant="outline" className="text-xs text-amber-600">
                  {"★".repeat(r.rating)}
                </Badge>
                {r.productSlug ? (
                  <Badge variant="outline" className="text-[11px]">{r.productSlug}</Badge>
                ) : null}
                <Badge variant="secondary" className={`border text-[11px] ${STATUS_BADGE[r.status]?.className ?? ""}`}>
                  {STATUS_BADGE[r.status]?.label ?? r.status}
                </Badge>
                <span className="ms-auto text-xs text-muted-foreground">{faDate(r.createdAt.toISOString())}</span>
              </div>
              <p className="text-[13px] leading-7 text-muted-foreground">{r.text}</p>
              <div className="pt-1">
                <ReviewActions id={r.id} status={r.status} />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-xl font-extrabold sm:text-2xl">نظرات مشتریان</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          فقط نظرات تأییدشده در سایت عمومی نمایش داده می‌شوند — بدون رِیتینگ جعلی (الزام YMYL).
        </p>
      </header>

      <section aria-labelledby="pending-reviews">
        <h2 id="pending-reviews" className="text-base font-extrabold">
          در انتظار تأیید ({toFaDigits(pending.length)})
        </h2>
        <div className="mt-3">{renderList(pending, "نظری در صف تأیید نیست — همه بررسی شده‌اند.")}</div>
      </section>

      <section aria-labelledby="done-reviews">
        <h2 id="done-reviews" className="text-base font-extrabold">
          بررسی‌شده‌ها ({toFaDigits(done.length)})
        </h2>
        <div className="mt-3">{renderList(done, "تاکنون نظری تأیید یا رد نشده است.")}</div>
      </section>
    </div>
  );
}
