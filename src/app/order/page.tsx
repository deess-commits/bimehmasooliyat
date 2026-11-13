import type { Metadata } from "next";
import { Suspense } from "react";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { OrderCalculator } from "@/components/order-calculator";
import { Skeleton } from "@/components/ui/skeleton";
import { AnswerBlock } from "@/components/answer-block";
import { TrustStrip } from "@/components/trust-strip";

export const revalidate = 3600;

export const metadata: Metadata = {
  title:
    "ثبت سفارش و محاسبه آنلاین بیمه مسئولیت — پزشکان، پرستاران و مهندسین | قیمت لحظه‌ای",
  description:
    "محاسبه آنلاین و ثبت سفارش بیمه مسئولیت پزشکان، پرستاران و پیراپزشکان و مهندسین با نرخ مصوب بیمه ایران ۱۴۰۵: انتخاب تخصص، سقف دیه و پوشش‌های تکمیلی و دیدن قیمت نهایی در چند ثانیه — پرداخت نقدی یا اقساطی.",
  alternates: { canonical: "/order" },
};

const HOW_FAQS = [
  {
    q: "قیمت نمایش‌داده‌شده در محاسبه‌گر دقیق است؟",
    a: "مبنای محاسبه، جدول نرخ پایه بیمه ایران سال ۱۴۰۵ است که با فرمول «نرخ پایه × ضریب پوشش‌ها × ضریب تخفیف» و صحت‌سنجی روی ۵۵+ سناریوی واقعی کالیبره شده است. قیمت نهایی صدور پس از بررسی کارشناس ممکن است حداکثر چند درصد تفاوت داشته باشد.",
  },
  {
    q: "پس از ثبت سفارش چه اتفاقی می‌افتد؟",
    a: "کد پیگیری با پیشوند O دریافت می‌کنید. کارشناس حداکثر یک روز کاری تماس می‌گیرد، اطلاعات را برای صدور نهایی می‌کند و شیوه پرداخت را انتخاب می‌کنید: ۳۰ تا ۴۰ درصد نقد + ۲ تا ۳ قسط چک، یا پرداخت نقدی با تخفیف ۱۰ درصد.",
  },
  {
    q: "برای تخفیف عدم خسارت چه چیز لازم است؟",
    a: "شماره بیمه‌نامه سال قبل بیمه ایران و تاریخ اتمام آن. اعتبار تخفیف حداکثر ۳۰۰ روز از اتمام بیمه‌نامه قبلی است؛ برای بیمه‌نامه‌های سایر شرکت‌ها گواهی عدم خسارت لازم است.",
  },
];

export default function OrderPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      <Breadcrumbs
        items={[
          { name: "استعلام و خرید", href: "/buy" },
          { name: "ثبت سفارش آنلاین", href: "/order" },
        ]}
      />

      <header className="mt-6">
        <h1 className="text-2xl font-extrabold leading-snug sm:text-3xl">
          محاسبه آنلاین و ثبت سفارش بیمه مسئولیت
        </h1>
        <div className="mt-4 max-w-3xl">
          <AnswerBlock
            title="قیمت بیمه مسئولیت را آنلاین حساب کنید و همان‌جا سفارش دهید"
            text="رشته حرفه‌ای خود (پزشک، پرستار و پیراپزشک یا مهندس) را انتخاب کنید، تخصص و سقف دیه و پوشش‌های تکمیلی را مشخص کنید؛ قیمت نهایی سالانه بر اساس نرخ مصوب بیمه ایران ۱۴۰۵ در چند ثانیه محاسبه و سفارش صدور بیمه‌نامه با کد پیگیری ثبت می‌شود. پرداخت نقدی با تخفیف ۱۰ درصد یا اقساطی (۳۰ تا ۴۰ درصد نقد + چک) است."
          />
        </div>
      </header>

      <div className="mt-8">
        <Suspense fallback={<Skeleton className="h-[520px] w-full rounded-2xl" />}>
          <OrderCalculator />
        </Suspense>
      </div>

      <section aria-labelledby="order-faq" className="mt-10">
        <h2 id="order-faq" className="text-lg font-extrabold">
          پرسش‌های متداول ثبت سفارش آنلاین
        </h2>
        <div className="mt-4 grid gap-4 md:grid-cols-3">
          {HOW_FAQS.map((f) => (
            <div key={f.q} className="rounded-2xl border bg-card p-5">
              <h3 className="text-sm font-bold leading-7">{f.q}</h3>
              <p className="mt-2 text-[13px] leading-7 text-muted-foreground">{f.a}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="mt-10">
        <TrustStrip />
      </div>
    </div>
  );
}
