import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Building2, MapPin } from "lucide-react";
import { AnswerBlock } from "@/components/answer-block";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { CtaBanner } from "@/components/cta-banner";
import { FaqSection } from "@/components/faq-section";
import { SectionHeading } from "@/components/section-heading";
import { Badge } from "@/components/ui/badge";
import { getCities } from "@/lib/data";
import { faqJsonLd, itemListJsonLd, JsonLd } from "@/lib/seo";
import { toFaDigits } from "@/lib/format";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "بیمه مسئولیت در شهرهای ایران — راهنمای ۴۴ شهر",
  description:
    "راهنمای بیمه مسئولیت در ۴۴ شهر ایران: ریسک‌های شایع هر شهر، صنایع اصلی، پوشش‌های پیشنهادی و نکات کارشناسی خسارت — با شرایط عمومی یکسان و نرخ مصوب بیمه ایران.",
  alternates: {
    canonical: "/city",
    languages: {
      "fa-IR": "/city",
      en: "/en/city",
      "x-default": "/city",
    },
  },
  openGraph: {
    title: "بیمه مسئولیت در شهرهای ایران — راهنمای ۴۴ شهر",
    description:
      "برای هر شهر، صنایع اصلی و پوشش‌های پیشنهادی بیمه مسئولیت را جداگانه تحلیل کرده‌ایم.",
    url: "/city",
    images: ["/og.png"],
  },
};

const CITY_FAQS = [
  {
    question: "آیا شرایط صدور بیمه مسئولیت در شهرهای مختلف فرق می‌کند؟",
    answer:
      "خیر؛ شرایط عمومی بیمه‌نامه و نرخ مصوب بیمه ایران در سراسر کشور یکسان است. تفاوت شهرها در ریسک‌های شایع محلی است — مانند ساخت‌وساز پرتراکم تهران یا صنایع فولاد اهواز — که بر ارزیابی ریسک و انتخاب سقف تعهد اثر می‌گذارد، نه بر شرایط قرارداد.",
  },
  {
    question: "خسارت در شهرستان‌ها چگونه کارشناسی و پرداخت می‌شود؟",
    answer:
      "شبکه پرداخت خسارت بیمه ایران در همه مراکز استان و بیشتر شهرستان‌ها فعال است. پس از اعلام خسارت، کارشناس محلی ارزیابی را انجام می‌دهد و بر اساس مستندات و رأی مرجع قضایی، خسارت تا سقف بیمه‌نامه پرداخت می‌شود؛ راهنمای کامل در صفحه فرایند خسارت آمده است.",
  },
  {
    question: "سقف تعهد بیمه مسئولیت در شهر من چقدر باشد؟",
    answer:
      "مبنای مشترک همه شهرها، دیه کامل سال وقوع خسارت است؛ طبق آخرین ابلاغیه رسمی (۱۴۰۴) یک میلیارد تومان در ماه عادی و ۱٫۲ میلیارد تومان در ماه حرام. در شهرهای پرتراکم یا صنایع پرخطر، سقف بالاتر توصیه می‌شود؛ کارشناس ما بر اساس فعالیت شما پیشنهاد دقیق می‌دهد.",
  },
];

export default async function CityHubPage() {
  const cities = await getCities();

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      <JsonLd
        data={itemListJsonLd({
          name: "راهنمای بیمه مسئولیت در شهرهای ایران",
          url: "/city",
          items: cities.map((c) => ({
            name: `بیمه مسئولیت در ${c.nameFa}`,
            href: `/city/${c.slug}`,
          })),
        })}
      />
      <JsonLd data={faqJsonLd(CITY_FAQS)} />

      <Breadcrumbs items={[{ name: "شهرها", href: "/city" }]} />

      <header className="mt-6 max-w-3xl">
        <h1 className="text-2xl font-extrabold leading-[1.6] sm:text-3xl">
          بیمه مسئولیت در شهرهای ایران — راهنمای {toFaDigits(cities.length)} شهر
        </h1>
      </header>

      <div className="mt-6 max-w-3xl">
        <AnswerBlock
          title="پاسخ کوتاه"
          text="بیمه مسئولیت در همه شهرهای ایران با شرایط عمومی یکسان و نرخ مصوب بیمه ایران صادر می‌شود؛ تفاوت شهرها در ریسک‌های شایع فعالیت‌های محلی است — از ساخت‌وساز پرتراکم تهران و صنایع نفت اهواز تا کشاورزی و شیلات گیلان. در راهنمای هر شهر، صنایع اصلی، پوشش‌های پیشنهادی و نکات کارشناسی خسارت را جداگانه تحلیل کرده‌ایم؛ سقف تعهد باید دست‌کم معادل دیه کامل سال وقوع باشد."
        />
      </div>

      <section aria-labelledby="city-h" className="mt-10">
        <SectionHeading
          icon={Building2}
          title="راهنمای شهرها"
          hint="برای هر شهر: صنایع اصلی، محصولات مرتبط و پرسش‌های خاص همان شهر."
        />
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {cities.map((c) => (
            <li key={c.slug}>
              <Link
                href={`/city/${c.slug}`}
                className="group flex h-full flex-col rounded-2xl border bg-card p-4 transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md"
              >
                <div className="flex items-center justify-between gap-2">
                  <h2 className="text-[15px] font-bold group-hover:text-primary">
                    بیمه مسئولیت در {c.nameFa}
                  </h2>
                  <ArrowLeft className="size-4 shrink-0 text-primary opacity-0 transition-opacity group-hover:opacity-100" aria-hidden="true" />
                </div>
                <Badge variant="outline" className="mt-2 w-fit gap-1 text-[11px] text-muted-foreground">
                  <MapPin className="size-3" aria-hidden="true" />
                  {c.province}
                </Badge>
                <p className="mt-2 line-clamp-2 text-[13px] leading-6 text-muted-foreground">
                  {c.intro}
                </p>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="mx-auto mt-12 max-w-4xl">
        <FaqSection faqs={CITY_FAQS} title="سوالات متداول بیمه مسئولیت در شهرها" />
      </section>

      <div className="mx-auto mt-8 max-w-4xl">
        <Link
          href="/industry"
          className="inline-flex items-center gap-2 rounded-full border bg-card px-5 py-2.5 text-sm font-semibold transition-colors hover:border-primary/40 hover:text-primary"
        >
          <Building2 className="size-4" aria-hidden="true" />
          بیمه مسئولیت به تفکیک صنعت
          <ArrowLeft className="size-4" aria-hidden="true" />
        </Link>
      </div>

      <div className="mt-12">
        <CtaBanner
          title="در شهر شما هم صدور همان روز کاری است"
          text="نوع بیمه مسئولیت و سقف تعهد را بر اساس فعالیت و شهر شما تنظیم می‌کنیم؛ پیش‌فاکتور رسمی بیمه ایران رایگان صادر می‌شود."
        />
      </div>
    </div>
  );
}
