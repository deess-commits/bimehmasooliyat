import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  AlertTriangle,
  ArrowLeft,
  BookMarked,
  Factory,
  FileHeart,
  FileSearch,
  ShieldCheck,
} from "lucide-react";
import { AnswerBlock } from "@/components/answer-block";
import { AuthorBox } from "@/components/author-box";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { CtaBanner } from "@/components/cta-banner";
import { FaqSection } from "@/components/faq-section";
import { LegalDisclaimer } from "@/components/legal-disclaimer";
import { NumberedSteps } from "@/components/numbered-steps";
import { SectionHeading } from "@/components/section-heading";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { INDUSTRIES, INDUSTRY_REVIEWER, getIndustry } from "@/lib/industry";
import { faqJsonLd, JsonLd, serviceJsonLd } from "@/lib/seo";

export const revalidate = 3600;

export const dynamicParams = false;

export function generateStaticParams() {
  return INDUSTRIES.map((i) => ({ slug: i.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const industry = getIndustry(slug);
  if (!industry) return {};
  return {
    title: industry.title,
    description: industry.description,
    alternates: {
      canonical: `/industry/${industry.slug}`,
    },
    openGraph: {
      title: industry.title,
      description: industry.description,
      url: `/industry/${industry.slug}`,
      type: "article",
    },
  };
}

export default async function IndustryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const industry = getIndustry(slug);
  if (!industry) notFound();

  const url = `/industry/${industry.slug}`;

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      <JsonLd
        data={serviceJsonLd({
          name: industry.h1,
          description: industry.answer,
          url,
          category: `بیمه مسئولیت صنایع — ${industry.name}`,
          dateModified: industry.lastReviewedIso,
        })}
      />
      <JsonLd data={faqJsonLd(industry.faqs)} />

      <Breadcrumbs
        items={[
          { name: "بیمه مسئولیت صنایع", href: "/industry" },
          { name: industry.name, href: url },
        ]}
      />

      {/* 1) H1 یگانه */}
      <header className="mt-6">
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="secondary" className="border border-primary/25 bg-primary/10 text-primary hover:bg-primary/10">
            <Factory className="size-3.5" aria-hidden="true" />
            بیمه مسئولیت صنایع
          </Badge>
        </div>
        <h1 className="mt-3 text-2xl font-extrabold leading-[1.6] sm:text-3xl">{industry.h1}</h1>
      </header>

      {/* 2) AnswerBlock — پاسخ مستقل ۴۰–۶۰ واژه */}
      <div className="mt-6 max-w-3xl">
        <AnswerBlock title={`${industry.name} — پاسخ کوتاه`} text={industry.answer} />
      </div>

      <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_320px]">
        <div className="flex min-w-0 flex-col gap-10">
          {/* 3) ریسک‌های اصلی */}
          <section id="risks-h" aria-labelledby="risks-h">
            <SectionHeading
              icon={AlertTriangle}
              title="ریسک‌های اصلی این صنعت"
              hint="توصیف کیفی ریسک‌ها — شدت واقعی به شرایط هر کارگاه وابسته است."
            />
            <ul className="space-y-3">
              {industry.risks.map((r, i) => (
                <li key={i} className="rounded-2xl border bg-card p-4 sm:p-5">
                  <h3 className="text-[15px] font-bold">{r.title}</h3>
                  <p className="mt-2 text-sm leading-7 text-muted-foreground">{r.text}</p>
                </li>
              ))}
            </ul>
          </section>

          {/* 4) پوشش‌های پیشنهادی — لینک به محصولات واقعی */}
          <section id="cov-h" aria-labelledby="cov-h">
            <SectionHeading
              icon={FileHeart}
              title="پوشش‌های پیشنهادی"
              hint="هر پوشش به صفحه محصول واقعی با جزئیات، استثناها و شرایط صدور لینک شده است."
            />
            <ul className="grid gap-3 sm:grid-cols-2">
              {industry.coverages.map((c, i) => (
                <li key={i}>
                  <Card className="h-full py-4 transition-colors hover:border-primary/40">
                    <CardHeader className="pb-1.5">
                      <CardTitle className="text-sm">
                        <Link href={c.href} className="hover:text-primary">
                          {c.label}
                        </Link>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <p className="text-[13px] leading-7 text-muted-foreground">{c.why}</p>
                      <Link
                        href={c.href}
                        className="inline-flex items-center gap-1 text-xs font-bold text-primary hover:underline"
                      >
                        صفحه محصول و استعلام
                        <ArrowLeft className="size-3.5" aria-hidden="true" />
                      </Link>
                    </CardContent>
                  </Card>
                </li>
              ))}
            </ul>
          </section>

          {/* 5) مراحل خرید */}
          <section id="buy-h" aria-labelledby="buy-h">
            <SectionHeading icon={FileSearch} title="مراحل خرید" />
            <NumberedSteps steps={industry.steps} variant="buy" />
          </section>

          {/* 6) FAQ + FAQPage JSON-LD منطبق با مرئی */}
          <FaqSection faqs={industry.faqs} title={`سوالات متداول ${industry.name}`} />

          {/* 7) منابع قانونی */}
          <section id="legal-h" aria-labelledby="legal-h">
            <SectionHeading icon={BookMarked} title="منابع قانونی" />
            <ul className="space-y-2.5">
              {industry.sources.map((s, i) => (
                <li key={i} className="rounded-xl border bg-card p-4">
                  <p className="text-sm font-bold">
                    {s.title} <span className="font-medium text-muted-foreground">— {s.reference}</span>
                  </p>
                </li>
              ))}
            </ul>
          </section>

          {/* 8) جعبه بازبینی + سلب مسئولیت */}
          <AuthorBox
            name={INDUSTRY_REVIEWER}
            role="کارشناس بیمه‌های مسئولیت صنعتی و تجاری"
            bio={`راهنمای ${industry.name} را تیم محتوایی تخصصی نمایندگی بر مبنای شرایط عمومی بیمه ایران و قانون مسئولیت مدنی تهیه و بازبینی کرده است.`}
            reviewDate={industry.lastReviewedIso}
          />
          <p className="rounded-xl border bg-secondary/40 p-3 text-[11px] leading-6 text-muted-foreground">
            آخرین بازبینی محتوا: <strong className="text-foreground">{industry.lastReviewed}</strong> —
            بازبینی‌کننده: {INDUSTRY_REVIEWER}
          </p>
          <LegalDisclaimer />

          {/* 9) سایر صنایع */}
          <section aria-labelledby="other-h">
            <SectionHeading icon={Factory} title="سایر صنایع" />
            <div className="grid gap-3 sm:grid-cols-2">
              {INDUSTRIES.filter((i) => i.slug !== industry.slug).map((i) => (
                <Card key={i.slug} className="py-4 transition-colors hover:border-primary/40">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm">
                      <Link href={`/industry/${i.slug}`} className="hover:text-primary">
                        {i.name}
                      </Link>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="line-clamp-2 text-xs leading-6 text-muted-foreground">{i.riskSummary}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        </div>

        {/* Sidebar */}
        <aside className="top-24 h-fit space-y-4 lg:sticky" aria-label="اقدام سریع">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base">استعلام و خرید</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-[13px] leading-6 text-muted-foreground">
                ترکیب پوشش‌ها و سقف تعهد را بر اساس ریسک واقعی کارگاه شما تنظیم می‌کنیم — بدون هزینه و تعهد.
              </p>
              <Badge className="w-fit bg-primary/10 text-primary hover:bg-primary/10" variant="secondary">
                <ShieldCheck className="size-3.5" aria-hidden="true" />
                نمایندگی رسمی بیمه ایران
              </Badge>
              <Link
                href={`/quote?product=${encodeURIComponent(`بیمه مسئولیت ${industry.name}`)}`}
              >
                <span className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-4 py-3 text-sm font-bold text-primary-foreground transition-opacity hover:opacity-90">
                  <FileSearch className="size-4" aria-hidden="true" />
                  استعلام بیمه مسئولیت {industry.name}
                </span>
              </Link>
              <Link
                href="/liability"
                className="block rounded-lg border px-4 py-3 text-center text-sm font-bold hover:border-primary/40"
              >
                فهرست کامل انواع بیمه مسئولیت
              </Link>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm">در این صفحه</CardTitle>
            </CardHeader>
            <CardContent>
              <nav aria-label="فهرست بخش‌ها" className="space-y-2 text-[13px]">
                <a href="#risks-h" className="block text-muted-foreground hover:text-primary">
                  ریسک‌های اصلی
                </a>
                <a href="#cov-h" className="block text-muted-foreground hover:text-primary">
                  پوشش‌های پیشنهادی
                </a>
                <a href="#buy-h" className="block text-muted-foreground hover:text-primary">
                  مراحل خرید
                </a>
                <a href="#faq-heading" className="block text-muted-foreground hover:text-primary">
                  سوالات متداول
                </a>
                <a href="#legal-h" className="block text-muted-foreground hover:text-primary">
                  منابع قانونی
                </a>
              </nav>
            </CardContent>
          </Card>
        </aside>
      </div>

      {/* 10) CTA پایانی */}
      <div className="mt-14">
        <CtaBanner
          productName={`بیمه مسئولیت ${industry.name}`}
          industryName={industry.name}
          title={`صدور پوشش‌های ${industry.name} با نرخ مصوب بیمه ایران`}
          text="فرم استعلام را تکمیل کنید؛ پیش‌فاکتور رسمی و مشاوره سقف تعهد همان روز کاری ارسال می‌شود."
        />
      </div>
    </div>
  );
}
