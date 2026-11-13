import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { Calculator, HardHat, Stethoscope, Syringe } from "lucide-react";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { QuoteForm } from "@/components/quote-form";
import { Skeleton } from "@/components/ui/skeleton";
import { AnswerBlock } from "@/components/answer-block";
import { TrustStrip } from "@/components/trust-strip";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { getAllProducts } from "@/lib/data";
import type { SeedProduct } from "@/prisma/seed-data/types";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "استعلام قیمت بیمه مسئولیت — پاسخ حداکثر یک روز کاری",
  description:
    "استعلام رایگان قیمت تمام انواع بیمه مسئولیت: پزشکان، وکلا، مهندسان، کارفرمایان و کسب‌وکارها. پیش‌فاکتور رسمی با نرخ مصوب بیمه ایران.",
  alternates: { canonical: "/quote" },
};

const CALC_KINDS = [
  { icon: Stethoscope, label: "پزشکان" },
  { icon: Syringe, label: "پرستاران و پیراپزشکان" },
  { icon: HardHat, label: "مهندسین" },
];

export default async function QuotePage() {
  const products = (await getAllProducts()) as SeedProduct[];

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      <Breadcrumbs items={[{ name: "استعلام قیمت", href: "/quote" }]} />

      <header className="mt-6">
        <h1 className="text-2xl font-extrabold leading-snug sm:text-3xl">
          استعلام قیمت بیمه مسئولیت
        </h1>
        <div className="mt-4 max-w-3xl">
          <AnswerBlock
            title="استعلام چگونه کار می‌کند؟"
            text="فرم استعلام را در سه گام تکمیل کنید؛ کارشناس ما سقف تعهد و فرانشیز را بر اساس ریسک واقعی شما تنظیم و پیش‌فاکتور رسمی با نرخ مصوب بیمه ایران صادر می‌کند. پاسخ حداکثر تا یک روز کاری اعلام می‌شود و استعلام هیچ تعهد خریدی ایجاد نمی‌کند."
          />
        </div>
      </header>

      {/* ── محاسبه‌گر آنلاین — پیش از فرم استعلام ─────────────────────── */}
      <section
        aria-labelledby="calc-h"
        className="mt-8 rounded-3xl border-2 border-primary/30 bg-gradient-to-b from-primary/10 via-primary/5 to-transparent p-6 sm:p-8"
      >
        <h2 id="calc-h" className="flex items-center gap-2 text-lg font-extrabold sm:text-xl">
          <Calculator className="size-5 shrink-0 text-primary" aria-hidden="true" />
          قیمت را خودتان همین حالا حساب کنید
        </h2>
        <p className="mt-3 max-w-3xl text-[15px] leading-8 text-foreground/90">
          برای بیمه مسئولیت پزشکان، پرستاران و پیراپزشکان و مهندسین، محاسبه‌گر آنلاین با نرخ مصوب
          بیمه ایران ۱۴۰۵ داریم: تخصص و سقف تعهد را انتخاب کنید و قیمت نهایی را همان لحظه ببینید.
        </p>
        <div className="mt-4 flex flex-wrap gap-2" aria-label="رشته‌های دارای محاسبه‌گر آنلاین">
          {CALC_KINDS.map((k) => (
            <Badge
              key={k.label}
              variant="outline"
              className="border-primary/30 bg-background px-3 py-1.5 text-[13px] font-semibold"
            >
              <k.icon className="me-1.5 size-4 text-primary" aria-hidden="true" />
              {k.label}
            </Badge>
          ))}
        </div>
        <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-5">
          <Button size="lg" asChild className="w-full font-bold sm:w-auto">
            <Link href="/order">
              <Calculator className="size-4" aria-hidden="true" />
              محاسبه آنلاین و ثبت سفارش
            </Link>
          </Button>
          <p className="text-[13px] leading-6 text-muted-foreground">
            برای سایر رشته‌ها، فرم درخواست استعلام همین صفحه فعال است؛ پاسخ حداکثر یک روز کاری.
          </p>
        </div>
      </section>

      {/* ── فرم درخواست استعلام ───────────────────────────────────────── */}
      <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_340px]">
        <Suspense fallback={<Skeleton className="h-96 w-full rounded-2xl" />}>
          <QuoteForm products={products} />
        </Suspense>

        <aside className="space-y-5">
          <TrustStrip variant="stack" />
          <div className="rounded-2xl border bg-card p-5">
            <h2 className="text-sm font-bold">قبل از تماس کارشناس این‌ها را آماده کنید</h2>
            <ul className="mt-3 space-y-2 text-[13px] leading-7 text-muted-foreground">
              <li>• نوع دقیق حرفه یا فعالیت کسب‌وکار</li>
              <li>• تعداد کارکنان (برای بیمه مسئولیت کارفرما)</li>
              <li>• سوابق خسارت سه سال اخیر (در صورت وجود)</li>
              <li>• بیمه‌نامه مسئولیت سال قبل (برای تخفیف عدم خسارت)</li>
            </ul>
          </div>
          <div className="rounded-2xl border bg-accent/40 p-5 text-[13px] leading-7">
            <h2 className="text-sm font-bold">چرا سقف تعهد مهم است؟</h2>
            <p className="mt-2 text-muted-foreground">
              سقف تعهد پایین‌تر از دیه کامل سال جاری، شما را در قبال اختلاف مبلغ بی‌پناه می‌کند. کارشناس ما
              این عدد را بر اساس رشته و ریسک شما محاسبه می‌کند.
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
}
