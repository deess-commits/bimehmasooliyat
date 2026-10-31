import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  AlertTriangle,
  ArrowLeft,
  BookMarked,
  CheckCircle2,
  ClipboardList,
  FileHeart,
  FileSearch,
  Gavel,
  Factory,
  MapPin,
  MessageSquareQuote,
  Scale,
  Users,
  XCircle,
} from "lucide-react";
import { AnswerBlock } from "@/components/answer-block";
import { AuthorBox } from "@/components/author-box";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { CtaBanner } from "@/components/cta-banner";
import { FaqSection } from "@/components/faq-section";
import { LegalDisclaimer } from "@/components/legal-disclaimer";
import { NumberedSteps } from "@/components/numbered-steps";
import { SectionHeading } from "@/components/section-heading";
import { ShareButton } from "@/components/share-button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { getProduct, getProductFaqs, getProductsByCategory, getArticles, getCitiesForProduct } from "@/lib/data";
import { getApprovedReviews } from "@/lib/reviews";
import { EN_PAGES, enHreflangPair } from "@/lib/en/config";
import { faDate, productUrl, toFaDigits } from "@/lib/format";
import { faqJsonLd, howToJsonLd, JsonLd, serviceJsonLd } from "@/lib/seo";
import { siteConfig } from "@/lib/site";
import { INDUSTRIES } from "@/lib/industry";
import type { CategoryKey } from "@/prisma/seed-data/types";

export const revalidate = 3600;

const VALID: CategoryKey[] = ["professional", "commercial", "corporate", "public"];

const CATEGORY_LABEL: Record<CategoryKey, string> = {
  professional: "مسئولیت حرفه‌ای",
  commercial: "مسئولیت کسب‌وکار و صنعت",
  corporate: "مسئولیت شرکتی",
  public: "مسئولیت عمومی و فردی",
};

export async function generateStaticParams() {
  const slugs = await getAllProductParams();
  return slugs;
}

async function getAllProductParams() {
  const { db } = await import("@/lib/db");
  const rows = await db.liabilityProduct.findMany({
    select: { slug: true, categoryKey: true },
  });
  return rows.map((r) => ({ category: r.categoryKey, slug: r.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string; slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProduct(slug);
  if (!product) return {};
  // hreflang دوقلو انگلیسی — فقط برای ۸ محصول پرچم‌دار که صفحه EN دارند
  const hasEnTwin = EN_PAGES.some(
    (p) => p.slug === product.slug && p.category === product.category,
  );
  return {
    title: product.seoTitle,
    description: product.seoDescription,
    keywords: product.keywords,
    alternates: {
      canonical: productUrl(product.category, product.slug),
      ...(hasEnTwin ? { languages: enHreflangPair(product.category, product.slug) } : {}),
    },
    openGraph: {
      title: product.seoTitle,
      description: product.seoDescription,
      url: productUrl(product.category, product.slug),
      type: "article",
      images: [
        {
          url: `/og/${product.category}-${product.slug}.png`,
          width: 1200,
          height: 630,
          alt: `${product.nameFa} — بیمه مسئولیت ایران`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: product.seoTitle,
      description: product.seoDescription,
    },
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ category: string; slug: string }>;
}) {
  const { category, slug } = await params;
  if (!VALID.includes(category as CategoryKey)) notFound();

  const product = await getProduct(slug);
  if (!product || product.category !== category) notFound();

  const [faqs, siblings, articles, reviews, cities] = await Promise.all([
    getProductFaqs(slug),
    getProductsByCategory(category as CategoryKey),
    getArticles(),
    getApprovedReviews(product.slug),
    getCitiesForProduct(product.slug),
  ]);
  const related = siblings.filter((s) => s.slug !== slug).slice(0, 4);
  // مقالات مرتبط: اول تطبیق مستقیم relatedProductSlug، سپس fallback معنایی
  // بر اساس اشتراک کلیدواژه (≥۲ کلیدواژه مشترک) تا صفحات محصول بدون مقاله
  // مستقیم هم لینک داخلی دانشی بگیرند (عمق خزش و توصیف موضوعی).
  const productKeywords = new Set(product.keywords);
  const directArticles = articles
    .filter((a) => a.relatedProductSlug === product.slug)
    .slice(0, 3);
  const fallbackArticles = directArticles.length >= 2
    ? []
    : articles
        .filter(
          (a) =>
            a.relatedProductSlug !== product.slug &&
            a.keywords.filter((k) => productKeywords.has(k)).length >= 2,
        )
        .slice(0, 3 - directArticles.length);
  const relatedArticles = [...directArticles, ...fallbackArticles];

  const url = productUrl(product.category, product.slug);

  // صنایع مرتبط: هر صنف که این پوشش را در ترکیب پیشنهادی خود دارد
  // (استخراج خودکار از داده صنایع — بدون نگهداشت نگاشت دوباره)
  const relatedIndustries = INDUSTRIES.filter((ind) =>
    ind.coverages.some((c) => c.href === url),
  ).slice(0, 3);

  // راهنماهای مرتبط: پل محصول↔راهنما — پیش‌فرض جهانی + اختصاصی هر محصول
  const GUIDES_BY_PRODUCT: Record<string, { href: string; label: string }[]> = {
    "medical-doctors": [
      { href: "/medical-liability-guide", label: "راهنمای کامل گروه‌های درمانی" },
      { href: "/liability-mandatory", label: "آیا بیمه مسئولیت برای پزشکان اجباری است؟" },
      { href: "/policy-review-checklist", label: "چک‌لیست بازبینی قبل از امضا" },
    ],
    dentists: [
      { href: "/medical-liability-guide", label: "راهنمای کامل گروه‌های درمانی" },
      { href: "/liability-mandatory", label: "آیا بیمه مسئولیت برای دندان‌پزشکان اجباری است؟" },
      { href: "/policy-review-checklist", label: "چک‌لیست بازبینی قبل از امضا" },
    ],
    "nurses-paramedics": [
      { href: "/medical-liability-guide", label: "راهنمای کامل گروه‌های درمانی" },
      { href: "/liability-mandatory", label: "الزام بیمه مسئولیت مراکز درمانی" },
      { href: "/policy-review-checklist", label: "چک‌لیست بازبینی قبل از امضا" },
    ],
    pharmacists: [
      { href: "/medical-liability-guide", label: "راهنمای کامل گروه‌های درمانی" },
      { href: "/liability-mandatory", label: "الزام بیمه مسئولیت داروخانه‌ها" },
      { href: "/policy-review-checklist", label: "چک‌لیست بازبینی قبل از امضا" },
    ],
    engineers: [
      { href: "/liability-mandatory", label: "الزام بیمه مسئولیت مهندس ناظر" },
      { href: "/policy-review-checklist", label: "چک‌لیست بازبینی قبل از امضا" },
    ],
    employers: [
      { href: "/liability-mandatory", label: "مسئولیت کارفرما مستقل از بیمه‌نامه چیست؟" },
      { href: "/policy-review-checklist", label: "چک‌لیست بازبینی قبل از امضا" },
    ],
    kindergartens: [
      { href: "/liability-mandatory", label: "الزام بیمه مسئولیت مراکز نگهداری کودک" },
      { href: "/startup-guide", label: "راهنمای بیمه‌نامه اول مرکز نوپا" },
    ],
    "beauty-salons": [
      { href: "/liability-mandatory", label: "الزام بیمه مسئولیت مشاغل مجوزدار" },
      { href: "/policy-review-checklist", label: "چک‌لیست بازبینی قبل از امضا" },
    ],
    "sports-facilities": [
      { href: "/coverage-limit", label: "انتخاب سقف تعهد مناسب" },
      { href: "/policy-review-checklist", label: "چک‌لیست بازبینی قبل از امضا" },
    ],
    "product-liability": [
      { href: "/liability-vs-other-insurance", label: "تفاوت مسئولیت با بیمه‌های خسارتی" },
      { href: "/policy-review-checklist", label: "چک‌لیست بازبینی قبل از امضا" },
    ],
    contractors: [
      { href: "/contract-tender", label: "بیمه مسئولیت در قراردادها و مناقصات" },
      { href: "/policy-review-checklist", label: "چک‌لیست بازبینی قبل از امضا" },
    ],
    "construction-operations": [
      { href: "/contract-tender", label: "شرط بیمه مسئولیت در قرارداد عمرانی" },
      { href: "/liability-mandatory", label: "الزام بیمه مسئولیت مهندس ناظر" },
    ],
    lawyers: [
      { href: "/professional-vs-general", label: "تفاوت مسئولیت حرفه‌ای و عمومی" },
      { href: "/policy-review-checklist", label: "چک‌لیست بازبینی قبل از امضا" },
    ],
    "accountants-auditors": [
      { href: "/professional-vs-general", label: "تفاوت مسئولیت حرفه‌ای و عمومی" },
      { href: "/policy-review-checklist", label: "چک‌لیست بازبینی قبل از امضا" },
    ],
    "events-insurance": [
      { href: "/events-insurance-guide", label: "راهنمای بیمه مسئولیت رویدادها و همایش‌ها" },
      { href: "/coverage-limit", label: "انتخاب سقف تعهد مناسب" },
    ],
  };
  const relatedGuides = GUIDES_BY_PRODUCT[product.slug] ?? [
    { href: "/policy-review-checklist", label: "چک‌لیست بازبینی بیمه‌نامه قبل از امضا" },
    { href: "/coverage-limit", label: "راهنمای انتخاب سقف تعهد" },
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      <JsonLd
        data={serviceJsonLd({
          name: product.nameFa,
          description: product.answerBlock,
          url,
          category: `${CATEGORY_LABEL[product.category]} — بیمه ایران`,
          dateModified: new Date(product.reviewDate).toISOString().slice(0, 10),
        })}
      />
      {faqs.length > 0 ? <JsonLd data={faqJsonLd(faqs)} /> : null}
      <JsonLd
        data={howToJsonLd({
          name: `مراحل خرید ${product.nameFa}`,
          description: product.buySteps[0]?.description ?? "",
          steps: product.buySteps,
          url,
        })}
      />
      <JsonLd
        data={howToJsonLd({
          name: `مراحل دریافت خسارت ${product.nameFa}`,
          description: product.claimSteps[0]?.description ?? "",
          steps: product.claimSteps,
          url: "/claims",
        })}
      />

      <Breadcrumbs
        items={[
          { name: "انواع بیمه مسئولیت", href: "/liability" },
          { name: CATEGORY_LABEL[product.category], href: `/liability/${product.category}` },
          { name: product.nameFa, href: url },
        ]}
      />

      {/* 1) H1 + meta chips */}
      <header className="mt-6">
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="secondary" className="border border-primary/25 bg-primary/10 text-primary hover:bg-primary/10">
            {CATEGORY_LABEL[product.category]}
          </Badge>
          <Badge variant="outline" className="text-[11px] text-muted-foreground">
            مخاطب: {product.audienceFa}
          </Badge>
        </div>
        <h1 className="mt-3 text-2xl font-extrabold leading-[1.6] sm:text-3xl">
          {product.nameFa} — {product.audienceFa}
        </h1>
        <p className="mt-2 text-xs text-muted-foreground" dir="ltr">
          {product.nameEn}
        </p>
        <div className="mt-3">
          <ShareButton title={product.seoTitle} path={url} />
        </div>
      </header>

      <div className="mt-6 grid gap-8 lg:grid-cols-[1fr_320px]">
        {/* Main column */}
        <div className="flex min-w-0 flex-col gap-10">
          {/* 2) Answer block */}
          <AnswerBlock text={product.answerBlock} title={`${product.nameFa} — پاسخ کوتاه`} />

          {/* Price hint + quick CTA */}
          <div className="flex flex-wrap items-center gap-3 rounded-2xl border bg-card p-4">
            <Scale className="size-5 text-primary" aria-hidden="true" />
            <p className="text-sm font-bold">
              {product.priceFromFa
                ? `حق بیمه ${product.nameFa}: ${product.priceFromFa} (تخمینی — نهایی پس از استعلام و تعیین سقف تعهد)`
                : "حق بیمه پس از استعلام و تعیین سقف تعهد اعلام می‌شود"}
            </p>
          </div>

          {/* 3) Who is covered */}
          <section aria-labelledby="who-h">
            <SectionHeading icon={Users} title="چه کسانی به این بیمه‌نامه نیاز دارند؟" />
            <ul className="grid gap-2.5 sm:grid-cols-2">
              {product.whoCovered.map((w, i) => (
                <li key={i} className="flex items-start gap-2.5 rounded-xl border bg-card p-3.5 text-sm leading-7">
                  <CheckCircle2 className="mt-1 size-4.5 shrink-0 text-primary" aria-hidden="true" />
                  {w}
                </li>
              ))}
            </ul>
          </section>

          {/* 4) Coverages */}
          <section aria-labelledby="cov-h">
            <SectionHeading icon={FileHeart} title="پوشش‌ها — چه چیزی جبران می‌شود؟" />
            <div className="overflow-hidden rounded-2xl border">
              <Table>
                <TableHeader>
                  <TableRow className="bg-accent/60">
                    <TableHead className="text-start w-1/3">پوشش</TableHead>
                    <TableHead className="text-start">توضیح</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {product.coverages.map((c, i) => (
                    <TableRow key={i}>
                      <TableCell className="align-top font-bold">{c.title}</TableCell>
                      <TableCell className="align-top text-sm leading-7 text-muted-foreground">
                        {c.description}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </section>

          {/* 5) Exclusions */}
          <section aria-labelledby="exc-h">
            <SectionHeading icon={AlertTriangle} title="چه چیزی پوشش نمی‌شود؟ (استثناها)" />
            <ul className="space-y-2.5 rounded-2xl border border-destructive/20 bg-destructive/5 p-4 sm:p-5">
              {product.exclusions.map((e, i) => (
                <li key={i} className="flex items-start gap-2.5 text-sm leading-7">
                  <XCircle className="mt-1 size-4.5 shrink-0 text-destructive" aria-hidden="true" />
                  {e}
                </li>
              ))}
            </ul>
          </section>

          {/* 6) Conditions & documents */}
          <section aria-labelledby="cond-h" className="grid gap-6 md:grid-cols-2">
            <div>
              <SectionHeading icon={ClipboardList} title="شرایط صدور" />
              <ul className="space-y-2">
                {product.conditions.map((c, i) => (
                  <li key={i} className="flex items-start gap-2 rounded-lg bg-secondary/50 p-3 text-sm leading-7">
                    <CheckCircle2 className="mt-1 size-4 shrink-0 text-primary" aria-hidden="true" />
                    {c}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <SectionHeading icon={FileSearch} title="مدارک مورد نیاز" />
              <ul className="space-y-2">
                {product.documents.map((d, i) => (
                  <li key={i} className="flex items-start gap-2 rounded-lg bg-secondary/50 p-3 text-sm leading-7">
                    <FileSearch className="mt-1 size-4 shrink-0 text-muted-foreground" aria-hidden="true" />
                    {d}
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* 7) Buy process (HowTo) */}
          <section aria-labelledby="buy-h">
            <SectionHeading icon={FileSearch} title="مراحل خرید" />
            <NumberedSteps steps={product.buySteps} variant="buy" />
          </section>

          {/* 8) Claims process (HowTo) */}
          <section aria-labelledby="claim-h">
            <SectionHeading icon={Gavel} title="مراحل دریافت خسارت" />
            <NumberedSteps steps={product.claimSteps} variant="claim" />
            <p className="mt-3 text-xs leading-6 text-muted-foreground">
              مهلت اعلام خسارت و جزئیات کارشناسی طبق شرایط عمومی بیمه‌نامه و{" "}
              <Link href="/claims" className="font-semibold text-primary hover:underline">
                راهنمای کامل خسارت
              </Link>{" "}
              است.
            </p>
          </section>

          {/* 9) FAQ (FAQPage) */}
          <FaqSection faqs={faqs} title={`سوالات متداول ${product.nameFa}`} />

          {/* 9.5) Related knowledge-base articles */}
          {relatedArticles.length > 0 ? (
            <section aria-labelledby="rela-h">
              <SectionHeading icon={BookMarked} title="مطالب مرتبط از دانشنامه" />
              <ul className="space-y-2">
                {relatedArticles.map((a) => (
                  <li key={a.slug}>
                    <Link
                      href={`/blog/${a.slug}`}
                      className="flex items-center justify-between gap-3 rounded-xl border bg-card p-4 text-sm font-bold transition-colors hover:border-primary/40 hover:text-primary"
                    >
                      {a.title}
                      <ArrowLeft className="size-4 shrink-0 text-primary" aria-hidden="true" />
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          ) : null}

          {/* 9.6) Customer reviews (فقط تأییدشده — بدون رِیتینگ جعلی) */}
          {reviews.length > 0 ? (
            <section aria-labelledby="revs-h">
              <SectionHeading icon={MessageSquareQuote} title={`تجربه مشتریان (${reviews.length} نظر تأییدشده)`} />
              <ul className="space-y-3">
                {reviews.slice(0, 3).map((r) => (
                  <li key={r.id} className="rounded-2xl border bg-card p-4">
                    <div className="flex flex-wrap items-center gap-2 text-sm">
                      <span className="font-bold">{r.name}</span>
                      {r.city ? <span className="text-xs text-muted-foreground">— {r.city}</span> : null}
                      <span className="ms-auto text-xs text-amber-600" aria-label={`امتیاز ${r.rating} از ۵`}>
                        {"★".repeat(r.rating)}
                      </span>
                    </div>
                    <p className="mt-2 text-[13px] leading-7 text-muted-foreground">{r.text}</p>
                  </li>
                ))}
              </ul>
              <Link href="/reviews" className="mt-3 inline-flex items-center gap-1.5 text-sm font-bold text-primary hover:underline">
                مشاهده و ثبت نظر
                <ArrowLeft className="size-4" aria-hidden="true" />
              </Link>
            </section>
          ) : null}

          {/* 9.7) Related cities (local SEO cross-links) */}
          {cities.length > 0 ? (
            <section aria-labelledby="relc-h">
              <SectionHeading icon={MapPin} title={`استعلام در شهر شما — ${product.nameFa}`} />
              <ul className="grid gap-2.5 sm:grid-cols-2 lg:grid-cols-3">
                {cities.map((c) => (
                  <li key={c.slug}>
                    <Link
                      href={`/city/${c.slug}`}
                      className="flex items-center justify-between gap-2 rounded-xl border bg-card p-3.5 text-sm font-bold transition-colors hover:border-primary/40 hover:text-primary"
                    >
                      {product.nameFa} در {c.nameFa}
                      <ArrowLeft className="size-4 shrink-0 text-primary" aria-hidden="true" />
                    </Link>
                  </li>
                ))}
              </ul>
              <p className="mt-3 text-xs leading-6 text-muted-foreground">
                شرایط صدور و سقف تعهد در همه شهرهای ایران یکسان است؛ تفاوت فقط در ریسک‌های محلی و نحوه کارشناسی خسارت است — صفحه هر شهر را ببینید.
              </p>
            </section>
          ) : null}

          {/* 10) Legal sources */}
          <section aria-labelledby="legal-h">
            <SectionHeading icon={BookMarked} title="منابع قانونی" />
            <ul className="space-y-2.5">
              {product.legalSources.map((l, i) => (
                <li key={i} className="rounded-xl border bg-card p-4">
                  <p className="text-sm font-bold">
                    {l.title} <span className="font-medium text-muted-foreground">— {l.reference}</span>
                  </p>
                </li>
              ))}
            </ul>
          </section>

          {/* 11) Review + author + disclaimer */}
          <AuthorBox
            name="سارا محمدی"
            role="کارشناس ارشد بیمه‌های مسئولیت — بازبینی حقوقی: دکتر امیر رستمی (وکیل دادگستری)"
            bio={`${product.nameFa} را تیم محتوایی تخصصی ما بر مبنای شرایط عمومی بیمه ایران و قانون مسئولیت مدنی تهیه کرده است.`}
            reviewDate={product.reviewDate}
          />
          <LegalDisclaimer />

          {/* Related */}
          {related.length > 0 ? (
            <section aria-labelledby="rel-h">
              <SectionHeading icon={ArrowLeft} title="محصولات مرتبط" />
              <div className="grid gap-3 sm:grid-cols-2">
                {related.map((r) => (
                  <Card key={r.slug} className="py-4 transition-colors hover:border-primary/40">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm">
                        <Link href={productUrl(r.category, r.slug)} className="hover:text-primary">
                          {r.nameFa}
                        </Link>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="line-clamp-2 text-xs leading-6 text-muted-foreground">{r.summaryFa}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>
          ) : null}
        </div>

        {/* Sidebar */}
        <aside className="top-24 h-fit space-y-4 lg:sticky" aria-label="اقدام سریع">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base">استعلام و خرید</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-[13px] leading-6 text-muted-foreground">
                پوشش‌ها و سقف تعهد را بر اساس ریسک واقعی شما تنظیم می‌کنیم — بدون هزینه و تعهد.
              </p>
              <Badge className="w-fit bg-primary/10 text-primary hover:bg-primary/10" variant="secondary">
                زمان پاسخ: حداکثر {toFaDigits(1)} روز کاری
              </Badge>
              <Link href={`/quote?product=${encodeURIComponent(product.nameFa)}&slug=${product.slug}`}>
                <span className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-4 py-3 text-sm font-bold text-primary-foreground transition-opacity hover:opacity-90">
                  <FileSearch className="size-4" aria-hidden="true" />
                  استعلام {product.nameFa}
                </span>
              </Link>
              <a
                href={`tel:${siteConfig.nap.phone}`}
                className="block rounded-lg border px-4 py-3 text-center text-sm font-bold hover:border-primary/40"
              >
                <span dir="ltr">{siteConfig.nap.phoneDisplay}</span>
              </a>
              <a
                href={`https://wa.me/${siteConfig.nap.whatsapp.replace("+", "")}?text=${encodeURIComponent(`سلام — درباره ${product.nameFa} سوال دارم.`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="block rounded-lg border border-primary/30 bg-primary/5 px-4 py-3 text-center text-sm font-bold text-primary hover:bg-primary/10"
              >
                مشاوره سریع واتساپ
              </a>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm">در این صفحه</CardTitle>
            </CardHeader>
            <CardContent>
              <nav aria-label="فهرست بخش‌ها" className="space-y-2 text-[13px]">
                {[
                  ["who-h", "چه کسانی نیاز دارند؟"],
                  ["cov-h", "پوشش‌ها"],
                  ["exc-h", "استثناها"],
                  ["cond-h", "شرایط و مدارک"],
                  ["buy-h", "مراحل خرید"],
                  ["claim-h", "مراحل خسارت"],
                  ["legal-h", "منابع قانونی"],
                ].map(([id, label]) => (
                  <a key={id} href={`#${id}`} className="block text-muted-foreground hover:text-primary">
                    {label}
                  </a>
                ))}
              </nav>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm">راهنماهای مرتبط</CardTitle>
            </CardHeader>
            <CardContent>
              <nav aria-label="راهنماهای مرتبط" className="space-y-2 text-[13px]">
                <Link href="/dih" className="block text-muted-foreground hover:text-primary">
                  جدول دیه ۱۴۰۴ و انتخاب سقف
                </Link>
                <Link href="/claims" className="block text-muted-foreground hover:text-primary">
                  راهنمای کامل دریافت خسارت
                </Link>
                <Link href="/glossary" className="block text-muted-foreground hover:text-primary">
                  واژه‌نامه اصطلاحات بیمه
                </Link>
                <Link href="/compare" className="block text-muted-foreground hover:text-primary">
                  مقایسه همه پوشش‌ها
                </Link>
                <Link href="/laws" className="block text-muted-foreground hover:text-primary">
                  قوانین بیمه مسئولیت
                </Link>
              </nav>
            </CardContent>
          </Card>

          <p className="rounded-xl border bg-secondary/40 p-3 text-[11px] leading-6 text-muted-foreground">
            آخرین بازبینی محتوا: <strong className="text-foreground">{faDate(product.reviewDate)}</strong>
          </p>
        </aside>
      </div>

      {/* صنایع مرتبط — پل محصول↔صنعت */}
      {relatedIndustries.length > 0 && (
        <section aria-labelledby="ind-rel-h" className="mt-12">
          <SectionHeading icon={Factory} title="این پوشش در راهنمای صنایع" />
          <p className="mt-2 max-w-3xl text-sm leading-7 text-muted-foreground">
            اگر فعالیت شما در یکی از این صنایع است، راهنمای اختصاصی آن ترکیب پوشش‌های پیشنهادی و ریسک‌های همان صنعت را توضیح می‌دهد.
          </p>
          <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {relatedIndustries.map((ind) => (
              <Link
                key={ind.slug}
                href={`/industry/${ind.slug}`}
                className="group rounded-2xl border bg-card p-4 transition-colors hover:border-primary/40"
              >
                <p className="flex items-center gap-2 text-sm font-extrabold group-hover:text-primary">
                  <Factory className="size-4 text-muted-foreground" aria-hidden="true" />
                  {ind.name}
                </p>
                <p className="mt-1.5 text-xs leading-6 text-muted-foreground">{ind.riskSummary}</p>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* راهنماهای مرتبط — پل محصول↔راهنما */}
      <section aria-labelledby="guide-rel-h" className="mt-12">
        <SectionHeading icon={BookMarked} title="راهنماهای مرتبط با این بیمه‌نامه" />
        <p className="mt-2 max-w-3xl text-sm leading-7 text-muted-foreground">
          پیش از خرید یا در زمان صدور، این راهنماهای کاربردی تصمیم‌های کلیدی بیمه‌نامه را کوتاه و دقیق توضیح می‌دهند.
        </p>
        <div className="mt-4 flex flex-wrap gap-3">
          {relatedGuides.map((g) => (
            <Link
              key={g.href}
              href={g.href}
              className="inline-flex items-center gap-2 rounded-full border bg-card px-5 py-2.5 text-sm font-semibold transition-colors hover:border-primary/40 hover:text-primary"
            >
              {g.label}
              <ArrowLeft className="size-4" aria-hidden="true" />
            </Link>
          ))}
        </div>
      </section>

      {/* 12) Final CTA */}
      <div className="mt-14">
        <CtaBanner
          productName={product.nameFa}
          title={`صدور ${product.nameFa} با نرخ مصوب بیمه ایران`}
          text="فرم استعلام را تکمیل کنید؛ پیش‌فاکتور رسمی و مشاوره سقف تعهد همان روز کاری ارسال می‌شود."
        />
      </div>
    </div>
  );
}
