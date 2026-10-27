import type { Metadata } from "next";
import { Suspense } from "react";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { QuoteForm } from "@/components/quote-form";
import { Skeleton } from "@/components/ui/skeleton";
import { AnswerBlock } from "@/components/answer-block";
import { TrustStrip } from "@/components/trust-strip";
import { getAllProducts } from "@/lib/data";
import type { SeedProduct } from "@/prisma/seed-data/types";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "استعلام قیمت بیمه مسئولیت — پاسخ حداکثر یک روز کاری",
  description:
    "استعلام رایگان قیمت تمام انواع بیمه مسئولیت: پزشکان، وکلا، مهندسان، کارفرمایان و کسب‌وکارها. پیش‌فاکتور رسمی با نرخ مصوب بیمه ایران.",
  alternates: { canonical: "/quote" },
};

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
