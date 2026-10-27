import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, BookOpen, ClipboardCheck, Gavel, Scale, Wallet } from "lucide-react";
import { AnswerBlock } from "@/components/answer-block";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { CtaBanner } from "@/components/cta-banner";
import { FaqSection } from "@/components/faq-section";
import { SectionHeading } from "@/components/section-heading";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getArticles, getGeneralFaqs, FAQ_GROUP_LABEL } from "@/lib/data";
import { faqJsonLd, JsonLd } from "@/lib/seo";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "سوالات متداول بیمه مسئولیت — پاسخ‌های قانون‌محور",
  description:
    "پاسخ دقیق به پرتکرارترین سوالات بیمه مسئولیت: تعریف، پوشش‌ها و استثناها، قیمت و سقف تعهد، مهلت اعلام خسارت و مقایسه با بیمه حوادث.",
  alternates: {
    canonical: "/faq",
    languages: {
      "fa-IR": "/faq",
      en: "/en/faq",
      "x-default": "/faq",
    },
  },
};

const GROUP_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  definition: BookOpen,
  coverage: ClipboardCheck,
  price: Wallet,
  claim: Gavel,
  compare: Scale,
};

export default async function FaqPage() {
  const [generalFaqs, articles] = await Promise.all([getGeneralFaqs(), getArticles()]);

  const groups = Object.keys(FAQ_GROUP_LABEL) as (keyof typeof FAQ_GROUP_LABEL)[];

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      <JsonLd data={faqJsonLd(generalFaqs)} />

      <Breadcrumbs items={[{ name: "سوالات متداول", href: "/faq" }]} />

      <header className="mt-6">
        <h1 className="text-2xl font-extrabold leading-snug sm:text-3xl">
          سوالات متداول بیمه مسئولیت
        </h1>
        <div className="mt-4 max-w-3xl">
          <AnswerBlock
            title="پاسخ‌ها مبتنی بر چیست؟"
            text="تمام پاسخ‌های این صفحه بر مبنای قانون مسئولیت مدنی مصوب ۱۳۳۹، قانون بیمه مصوب ۱۳۱۶ و شرایط عمومی بیمه‌های مسئولیت بیمه ایران تنظیم و توسط کارشناس بیمه و مشاور حقوقی بازبینی شده است. برای جزئیات هر محصول، صفحه اختصاصی همان محصول را ببینید."
          />
        </div>
      </header>

      <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_320px]">
        <div className="flex flex-col gap-12">
          {groups.map((g) => {
            const items = generalFaqs.filter((f) => f.group === g);
            if (!items.length) return null;
            const Icon = GROUP_ICONS[g] ?? BookOpen;
            return (
              <section key={g} id={g} className="scroll-mt-28" aria-labelledby={`g-${g}`}>
                <SectionHeading icon={Icon} title={FAQ_GROUP_LABEL[g]} hint={`${items.length} پرسش`} />
                <FaqSection faqs={items} title="" />
              </section>
            );
          })}
        </div>

        <aside className="top-24 h-fit space-y-4 lg:sticky">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm">مقالات پیشنهادی</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {articles.slice(0, 4).map((a) => (
                <Link
                  key={a.slug}
                  href={`/blog/${a.slug}`}
                  className="flex items-center justify-between gap-2 rounded-lg border p-3 text-[13px] font-semibold hover:border-primary/40 hover:text-primary"
                >
                  {a.title}
                  <ArrowLeft className="size-3.5 shrink-0" aria-hidden="true" />
                </Link>
              ))}
            </CardContent>
          </Card>
        </aside>
      </div>

      <div className="mt-14">
        <CtaBanner />
      </div>
    </div>
  );
}
