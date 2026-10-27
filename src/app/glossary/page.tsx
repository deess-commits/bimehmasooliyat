import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, BookOpen } from "lucide-react";
import { AnswerBlock } from "@/components/answer-block";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { CtaBanner } from "@/components/cta-banner";
import { SectionHeading } from "@/components/section-heading";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getGlossaryTerms } from "@/lib/data";
import { JsonLd } from "@/lib/seo";
import { toFaDigits } from "@/lib/format";
import type { GlossaryCategory } from "@/prisma/seed-data/types";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "واژه‌نامه بیمه مسئولیت — ۲۴ اصطلاح کلیدی به زبان ساده",
  description:
    "مرجع فارسی اصطلاحات بیمه مسئولیت: دیه، ارش، تسبیب، سقف تعهد، فرانشیز، دوره تعهد، کمیسیون پزشکی و… هر واژه با تعریف مستقل و مبنای قانونی.",
  alternates: {
    canonical: "/glossary",
    languages: {
      "fa-IR": "/glossary",
      en: "/en/glossary",
      "x-default": "/glossary",
    },
  },
};

const CATEGORY_LABEL: Record<GlossaryCategory, string> = {
  base: "مفاهیم پایه بیمه",
  legal: "اصطلاحات حقوقی",
  coverage: "پوشش و قرارداد",
  claim: "خسارت",
  market: "نظارت و بازار بیمه",
};

const CATEGORY_ORDER: GlossaryCategory[] = ["base", "legal", "coverage", "claim", "market"];

export default async function GlossaryPage() {
  const terms = await getGlossaryTerms();

  const itemListJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "واژه‌نامه بیمه مسئولیت",
    numberOfItems: terms.length,
    itemListElement: terms.map((t, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: t.title,
      url: `/glossary/${t.slug}`,
    })),
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      <JsonLd data={itemListJsonLd} />
      <Breadcrumbs items={[{ name: "واژه‌نامه بیمه مسئولیت", href: "/glossary" }]} />

      <header className="mt-6">
        <h1 className="text-2xl font-extrabold leading-[1.6] sm:text-3xl">
          واژه‌نامه بیمه مسئولیت — {toFaDigits(terms.length)} اصطلاح کلیدی به زبان ساده
        </h1>
      </header>

      <div className="mt-6 max-w-3xl">
        <AnswerBlock
          title="این واژه‌نامه چه کمکی می‌کند؟"
          text="این واژه‌نامه مرجع فارسی اصطلاحات کلیدی بیمه مسئولیت در ایران است؛ از تعریف حقوقی تقصیر و تسبیب تا اصطلاحات قراردادی مانند سقف تعهد، فرانشیز و دوره تعهد. هر مدخل به‌صورت مستقل و با ذکر مبنای قانونی نوشته شده تا برای کاربران و موتورهای جست‌وجوی هوشمند مرجع قابل استنادی باشد."
        />
      </div>

      {CATEGORY_ORDER.map((cat) => {
        const group = terms.filter((t) => t.category === cat);
        if (group.length === 0) return null;
        return (
          <section key={cat} aria-labelledby={`g-${cat}`} className="mt-10">
            <SectionHeading icon={BookOpen} title={CATEGORY_LABEL[cat]} hint={`${toFaDigits(group.length)} واژه`} />
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {group.map((t) => (
                <Link key={t.slug} href={`/glossary/${t.slug}`} className="group">
                  <Card className="h-full py-4 transition-all group-hover:-translate-y-0.5 group-hover:border-primary/40 group-hover:shadow-sm">
                    <CardHeader className="pb-1.5">
                      <CardTitle className="text-[15px] group-hover:text-primary">{t.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-[13px] leading-7 text-muted-foreground">{t.short}</p>
                      <span className="mt-3 inline-flex items-center gap-1 text-xs font-bold text-primary">
                        تعریف کامل
                        <ArrowLeft className="size-3.5" aria-hidden="true" />
                      </span>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </section>
        );
      })}

      <div className="mt-12">
        <CtaBanner
          title="واژه را پیدا کردید، اما کدام بیمه مسئولیت مناسب شماست؟"
          text="در صفحه انواع بیمه مسئولیت، هر حرفه و کسب‌وکار را به پوشش اختصاصی خودش پیوند زده‌ایم؛ یا مستقیم استعلام بگیرید."
        />
      </div>
    </div>
  );
}
