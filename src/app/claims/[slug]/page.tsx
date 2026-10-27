import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AlertTriangle, ArrowLeft, CalendarClock, ClipboardList, FileHeart, Gavel, Lightbulb } from "lucide-react";
import { AnswerBlock } from "@/components/answer-block";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { CtaBanner } from "@/components/cta-banner";
import { FaqSection } from "@/components/faq-section";
import { NumberedSteps } from "@/components/numbered-steps";
import { SectionHeading } from "@/components/section-heading";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { claimGuides } from "@/prisma/seed-data/claim-guides";
import { productUrl } from "@/lib/format";
import { getProduct } from "@/lib/data";
import { faqJsonLd, howToJsonLd, JsonLd } from "@/lib/seo";
import { faDate } from "@/lib/format";

export const revalidate = 3600;

export function generateStaticParams() {
  return claimGuides.map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const guide = claimGuides.find((g) => g.slug === slug);
  if (!guide) return {};
  return {
    title: guide.title,
    description: guide.answerBlock,
    alternates: {
      canonical: `/claims/${guide.slug}`,
      languages: {
        "fa-IR": `/claims/${guide.slug}`,
        en: `/en/claims/${guide.slug}`,
        "x-default": `/claims/${guide.slug}`,
      },
    },
    openGraph: { title: guide.title, description: guide.answerBlock, type: "article" },
  };
}

export default async function ClaimGuidePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const guide = claimGuides.find((g) => g.slug === slug);
  if (!guide) notFound();

  const relatedProducts = (
    await Promise.all(guide.relatedProducts.map((s) => getProduct(s)))
  ).filter((p): p is NonNullable<typeof p> => Boolean(p));

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      <JsonLd
        data={howToJsonLd({
          name: guide.title,
          description: guide.answerBlock,
          steps: guide.steps,
          url: `/claims/${guide.slug}`,
        })}
      />
      <JsonLd data={faqJsonLd(guide.faqs)} />

      <Breadcrumbs
        items={[
          { name: "فرایند خسارت", href: "/claims" },
          { name: guide.title, href: `/claims/${guide.slug}` },
        ]}
      />

      <header className="mt-6 max-w-3xl">
        <h1 className="text-2xl font-extrabold leading-[1.6] sm:text-3xl">{guide.title}</h1>
        <p className="mt-2 text-xs text-muted-foreground">
          آخرین بازبینی: {faDate(guide.reviewDate)}
        </p>
      </header>

      <div className="mt-6 max-w-3xl space-y-6">
        <AnswerBlock title="پاسخ کوتاه" text={guide.answerBlock} />
        <p className="text-[15px] leading-8 text-foreground/90">{guide.intro}</p>
      </div>

      <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_320px]">
        <div className="flex min-w-0 flex-col gap-10">
          {/* Steps */}
          <section aria-labelledby="gsteps-h">
            <SectionHeading icon={Gavel} title="مراحل اعلام و دریافت خسارت" />
            <NumberedSteps steps={guide.steps} variant="claim" />
          </section>

          {/* Documents */}
          <section aria-labelledby="gdocs-h">
            <SectionHeading icon={ClipboardList} title="مدارک لازم" />
            <ul className="grid gap-2.5 sm:grid-cols-2">
              {guide.documents.map((d, i) => (
                <li key={i} className="flex items-start gap-2.5 rounded-xl border bg-card p-3.5 text-sm leading-7">
                  <FileHeart className="mt-1 size-4.5 shrink-0 text-primary" aria-hidden="true" />
                  {d}
                </li>
              ))}
            </ul>
          </section>

          {/* Deadlines */}
          <section aria-labelledby="gdl-h">
            <SectionHeading icon={CalendarClock} title="مهلت‌های کلیدی" />
            <div className="grid gap-3 sm:grid-cols-2">
              {guide.deadlines.map((d) => (
                <Card key={d.title} className="py-4">
                  <CardHeader className="pb-1.5">
                    <CardTitle className="text-sm">{d.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-[13px] leading-7 text-muted-foreground">{d.text}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
            <p className="mt-3 text-xs leading-6 text-muted-foreground">
              مهلت‌های قضایی را همیشه با متن ابلاغیه یا کارشناس حقوقی تطبیق دهید.
            </p>
          </section>

          {/* Tips */}
          <section aria-labelledby="gtips-h">
            <SectionHeading icon={Lightbulb} title="اشتباهات رایج و توصیه‌ها" />
            <ul className="space-y-2.5 rounded-2xl border border-amber-500/25 bg-amber-500/5 p-4 sm:p-5">
              {guide.tips.map((t, i) => (
                <li key={i} className="flex items-start gap-2.5 text-sm leading-7">
                  <AlertTriangle className="mt-1 size-4.5 shrink-0 text-amber-600" aria-hidden="true" />
                  {t}
                </li>
              ))}
            </ul>
          </section>

          {/* FAQ */}
          <FaqSection faqs={guide.faqs} title={`سوالات متداول ${guide.title}`} />

          {/* Related products */}
          {relatedProducts.length > 0 ? (
            <section aria-labelledby="grel-h">
              <SectionHeading icon={ArrowLeft} title="بیمه‌نامه‌های مرتبط" />
              <div className="flex flex-wrap gap-2.5">
                {relatedProducts.map((p) => (
                  <Link
                    key={p.slug}
                    href={productUrl(p.category, p.slug)}
                    className="inline-flex items-center gap-1.5 rounded-full border bg-card px-4 py-2 text-sm font-semibold transition-colors hover:border-primary/40 hover:text-primary"
                  >
                    {p.nameFa}
                    <ArrowLeft className="size-3.5" aria-hidden="true" />
                  </Link>
                ))}
              </div>
            </section>
          ) : null}
        </div>

        {/* Sidebar */}
        <aside className="top-24 h-fit space-y-4 lg:sticky" aria-label="اقدام سریع">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base">سوال حقوقی دارید؟</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-[13px] leading-6 text-muted-foreground">
                کارشناس خسارت ما روند پرونده شما را پیش از هر اقدام بررسی و راهنمایی می‌کند — رایگان.
              </p>
              <Link
                href="/contact"
                className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-4 py-3 text-sm font-bold text-primary-foreground transition-opacity hover:opacity-90"
              >
                تماس با کارشناس خسارت
              </Link>
              <Link
                href="/claims"
                className="block rounded-lg border px-4 py-3 text-center text-sm font-bold hover:border-primary/40"
              >
                راهنمای عمومی خسارت
              </Link>
            </CardContent>
          </Card>
          <nav aria-label="راهنماهای دیگر" className="rounded-xl border bg-secondary/40 p-4 text-[13px]">
            <p className="mb-2 font-bold">راهنماهای دیگر</p>
            {claimGuides
              .filter((g) => g.slug !== guide.slug)
              .map((g) => (
                <Link key={g.slug} href={`/claims/${g.slug}`} className="block py-1.5 text-muted-foreground hover:text-primary">
                  {g.title}
                </Link>
              ))}
          </nav>
        </aside>
      </div>

      <div className="mt-12">
        <CtaBanner
          title="پرونده خسارت دارید یا می‌خواهید ریسک‌تان را ببندید؟"
          text="از اعلام رخداد تا پرداخت، در تمام مراحل همراه شما هستیم. همین حالا با کارشناس تماس بگیرید یا استعلام پوشش بگیرید."
        />
      </div>
    </div>
  );
}
