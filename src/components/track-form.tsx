"use client";

// ─── فرم پیگیری استعلام (کلاینتی) ───────────────────────────────────

import { useState } from "react";
import { Loader2, PackageSearch, Search } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { faDate } from "@/lib/format";

interface TrackResult {
  ok: true;
  trackingCode: string;
  status: string;
  productName: string | null;
  desiredCoverage: string | null;
  createdAt: string;
}

const STATUS_LABEL: Record<string, string> = {
  new: "ثبت شده — در صف بررسی",
  contacted: "تماس کارشناس انجام شد",
  quoted: "پیش‌فاکتور رسمی ارسال شد",
  won: "خرید نهایی شد",
  lost: "منتفی شد",
};

const STATUS_TONE: Record<string, string> = {
  new: "border-primary/25 bg-primary/10 text-primary",
  contacted: "border-amber-500/25 bg-amber-500/10 text-amber-700 dark:text-amber-400",
  quoted: "border-primary/25 bg-primary/10 text-primary",
  won: "border-emerald-500/25 bg-emerald-500/10 text-emerald-700 dark:text-emerald-400",
  lost: "border-destructive/25 bg-destructive/10 text-destructive",
};

const STEPS = ["new", "contacted", "quoted", "won"] as const;

export function TrackForm() {
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<TrackResult | null>(null);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setResult(null);
    setLoading(true);
    try {
      const res = await fetch(`/api/track?code=${encodeURIComponent(code.trim())}`);
      const body = await res.json();
      if (!res.ok) {
        setError(body.error ?? "خطای غیرمنتظره — دوباره تلاش کنید");
      } else {
        setResult(body as TrackResult);
      }
    } catch {
      setError("ارتباط با سرور برقرار نشد؛ اتصال اینترنت را بررسی کنید");
    } finally {
      setLoading(false);
    }
  }

  const activeIdx = result ? STEPS.indexOf(result.status as (typeof STEPS)[number]) : -1;
  const lost = result?.status === "lost";

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-base">
            <PackageSearch className="size-5 text-primary" aria-hidden="true" />
            کد پیگیری استعلام
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={submit} className="flex flex-col gap-3 sm:flex-row sm:items-end">
            <div className="flex-1 space-y-1.5">
              <Label htmlFor="track-code">کد پیگیری</Label>
              <Input
                id="track-code"
                dir="ltr"
                placeholder="Q-260101-A3B4"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="text-start font-mono tracking-wider"
                required
                maxLength={16}
                autoComplete="off"
              />
            </div>
            <Button type="submit" disabled={loading || code.trim().length < 6} className="min-h-11">
              {loading ? (
                <Loader2 className="size-4 animate-spin" aria-hidden="true" />
              ) : (
                <Search className="size-4" aria-hidden="true" />
              )}
              پیگیری
            </Button>
          </form>
          {error ? (
            <Alert variant="destructive" className="mt-4">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          ) : null}
        </CardContent>
      </Card>

      {result ? (
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base">وضعیت استعلام <span dir="ltr" className="font-mono">{result.trackingCode}</span></CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="secondary" className={`${STATUS_TONE[result.status] ?? ""} border`}>
                {STATUS_LABEL[result.status] ?? result.status}
              </Badge>
              {result.productName ? (
                <Badge variant="outline" className="text-xs">{result.productName}</Badge>
              ) : null}
              {result.desiredCoverage ? (
                <Badge variant="outline" className="text-xs">سقف موردنظر: {result.desiredCoverage}</Badge>
              ) : null}
            </div>

            {!lost ? (
              <ol className="grid gap-2 sm:grid-cols-4" aria-label="مراحل بررسی استعلام">
                {STEPS.map((s, i) => (
                  <li
                    key={s}
                    className={`rounded-lg border p-2.5 text-center text-xs leading-6 ${
                      i <= activeIdx
                        ? "border-primary/40 bg-primary/10 font-bold text-primary"
                        : "text-muted-foreground"
                    }`}
                  >
                    {STATUS_LABEL[s]}
                  </li>
                ))}
              </ol>
            ) : (
              <p className="rounded-lg bg-secondary/60 p-3 text-sm leading-7 text-muted-foreground">
                این درخواست منتفی شده است؛ در صورت تمایل می‌توانید با شرایط جدید دوباره استعلام ثبت کنید.
              </p>
            )}

            <p className="text-xs text-muted-foreground">
              تاریخ ثبت: {faDate(result.createdAt)} — پیش‌فاکتور رسمی حداکثر یک روز کاری پس از تماس کارشناس ارسال می‌شود.
            </p>
          </CardContent>
        </Card>
      ) : null}
    </div>
  );
}
