import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Calculator, Factory, Scale } from "lucide-react";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { CtaBanner } from "@/components/cta-banner";
import { LiabilityExplorer } from "@/components/liability-explorer";
import { AnswerBlock } from "@/components/answer-block";
import { SectionHeading } from "@/components/section-heading";
import { JsonLd, itemListJsonLd } from "@/lib/seo";
import { getAllProducts } from "@/lib/data";
import { INDUSTRIES } from "@/lib/industry";
import { toFaDigits } from "@/lib/format";
import type { SeedProduct } from "@/prisma/seed-data/types";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "همه انواع بیمه مسئولیت — ۳۳+ پوشش حرفه‌ای، تجاری، شرکتی و عمومی",
  description:
    "فهرست کامل انواع بیمه مسئولیت در ایران: پزشکان، وکلا، مهندسان، کارفرما، تولیدکنندگان، پیمانکاران، D&O، سایبری و… همراه با پوشش‌ها، استثناها و قیمت.",
  alternates: {
    canonical: "/liability",
    languages: {
      "fa-IR": "/liability",
      en: "/en/liability",
      "x-default": "/liability",
    },
  },
};

const CATEGORY_LABELS: Record<string, string> = {
  professional: "مسئولیت حرفه‌ای",
  commercial: "مسئولیت کسب‌وکار و صنعت",
  corporate: "مسئولیت شرکتی",
  public: "مسئولیت عمومی و فردی",
};

export default async function LiabilityIndexPage() {
  const products = (await getAllProducts()) as SeedProduct[];

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      <JsonLd
        data={itemListJsonLd({
          name: "همه انواع بیمه مسئولیت در ایران",
          url: "/liability",
          items: products.map((p) => ({
            name: p.nameFa,
            href: `/liability/${p.category}/${p.slug}`,
          })),
        })}
      />
      <Breadcrumbs items={[{ name: "انواع بیمه مسئولیت", href: "/liability" }]} />

      <header className="mt-6">
        <h1 className="text-2xl font-extrabold leading-snug sm:text-3xl">
          همه انواع بیمه مسئولیت — کدام برای شماست؟
        </h1>
        <div className="mt-4 max-w-3xl">
          <AnswerBlock
            title="کدام بیمه مسئولیت مناسب شماست؟"
            text="انتخاب نوع بیمه مسئولیت بر مبنای منشأ ریسک است، نه سلیقه: پزشک و وکیل به بیمه مسئولیت حرفه‌ای، کارفرما در قبال کارکنان به بیمه مسئولیت کارفرما، تولیدکننده به مسئولیت کالا و برگزارکننده رویداد به مسئولیت رویداد نیاز دارد. در فهرست زیر هر حرفه و کسب‌وکار، محصول اختصاصی خود را دارد."
          />
        </div>
      </header>

      <div className="mt-8">
        <LiabilityExplorer products={products} categoryLabels={CATEGORY_LABELS} />
      </div>

      <div className="mt-12 flex flex-wrap gap-3">
        <Link
          href="/compare"
          className="inline-flex items-center gap-2 rounded-full border bg-card px-5 py-2.5 text-sm font-semibold transition-colors hover:border-primary/40 hover:text-primary"
        >
          <Scale className="size-4" aria-hidden="true" />
          مقایسه همه ۳۳ پوشش در یک جدول
          <ArrowLeft className="size-4" aria-hidden="true" />
        </Link>
        <Link
          href="/price"
          className="inline-flex items-center gap-2 rounded-full border bg-card px-5 py-2.5 text-sm font-semibold transition-colors hover:border-primary/40 hover:text-primary"
        >
          <Calculator className="size-4" aria-hidden="true" />
          قیمت بیمه مسئولیت چگونه محاسبه می‌شود؟
          <ArrowLeft className="size-4" aria-hidden="true" />
        </Link>
        <Link
          href="/industry"
          className="inline-flex items-center gap-2 rounded-full border bg-card px-5 py-2.5 text-sm font-semibold transition-colors hover:border-primary/40 hover:text-primary"
        >
          <Factory className="size-4" aria-hidden="true" />
          بیمه مسئولیت به تفکیک صنعت
          <ArrowLeft className="size-4" aria-hidden="true" />
        </Link>
      </div>

      {/* Industry layer strip — خودکار از INDUSTRIES (۲۰ صنعت) */}
      <section aria-labelledby="ind-strip-h" className="mt-12">
        <JsonLd
          data={itemListJsonLd({
            name: `راهنماهای بیمه مسئولیت به تفکیک صنعت (${INDUSTRIES.length} صنعت)`,
            url: "/liability",
            items: INDUSTRIES.map((ind) => ({
              name: ind.name,
              href: `/industry/${ind.slug}`,
            })),
          })}
        />
        <SectionHeading
          icon={Factory}
          title={`بیمه مسئولیت به تفکیک صنعت — ${toFaDigits(INDUSTRIES.length)} راهنمای تخصصی`}
          hint="ریسک‌های اصلی صنعت شما و پوشش‌های پیشنهادی متناظر."
        />
        <div className="flex flex-wrap gap-2">
          {INDUSTRIES.map((ind) => (
            <Link
              key={ind.slug}
              href={`/industry/${ind.slug}`}
              className="inline-flex items-center rounded-full border bg-card px-4 py-2 text-[13px] font-semibold transition-colors hover:border-primary/40 hover:text-primary"
            >
              {ind.name}
            </Link>
          ))}
          <Link
            href="/industry"
            className="inline-flex items-center gap-1.5 rounded-full bg-primary px-4 py-2 text-[13px] font-bold text-primary-foreground transition-opacity hover:opacity-90"
          >
            همه راهنماهای صنایع
            <ArrowLeft className="size-3.5" aria-hidden="true" />
          </Link>
        </div>
      </section>

      <div className="mt-12">
        <CtaBanner
          title="نوع مسئولیت خود را پیدا کردید؟ استعلام بگیرید"
          text="با انتخاب محصول و تکمیل فرم استعلام، پیش‌فاکتور رسمی با نرخ مصوب بیمه ایران برای شما صادر می‌شود."
        />
      </div>
    </div>
  );
}
