import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, BookMarked, Scale } from "lucide-react";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { CtaBanner } from "@/components/cta-banner";
import { LegalDisclaimer } from "@/components/legal-disclaimer";
import { SectionHeading } from "@/components/section-heading";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getGlossaryTerm, getGlossaryTerms, getProduct } from "@/lib/data";
import { productUrl } from "@/lib/format";
import { JsonLd } from "@/lib/seo";
import { siteConfig } from "@/lib/site";

export const revalidate = 3600;

export async function generateStaticParams() {
  const { db } = await import("@/lib/db");
  const rows = await db.glossaryTerm.findMany({ select: { slug: true } });
  return rows.map((r) => ({ term: r.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ term: string }>;
}): Promise<Metadata> {
  const { term } = await params;
  const t = await getGlossaryTerm(term);
  if (!t) return {};
  return {
    title: `${t.title} چیست؟ — واژه‌نامه بیمه مسئولیت`,
    description: t.short,
    alternates: { canonical: `/glossary/${t.slug}` },
    openGraph: {
      title: `${t.title} چیست؟`,
      description: t.short,
      type: "article",
    },
  };
}

function definedTermJsonLd(opts: { title: string; short: string; slug: string }) {
  return {
    "@context": "https://schema.org",
    "@type": "DefinedTerm",
    name: opts.title,
    description: opts.short,
    url: `${siteConfig.url}/glossary/${opts.slug}`,
    inDefinedTermSet: {
      "@type": "DefinedTermSet",
      name: "واژه‌نامه بیمه مسئولیت",
      url: `${siteConfig.url}/glossary`,
    },
  };
}

// پیوند واژه‌نامه ↔ راهنماهای عمومی — فقط برای واژه‌هایی که راهنمای
// عمومی اختصاصی دارند (نگاشت صریح و صادقانه).
const TERM_GUIDE_LINKS: Record<string, { href: string; label: string }> = {
  "saghf-taahod": {
    href: "/coverage-limit",
    label: "راهنمای کامل: سقف تعهد چقدر باشد؟",
  },
  franshiz: {
    href: "/deductible",
    label: "راهنمای کامل: فرانشیز چقدر باشد؟",
  },
};

export default async function GlossaryTermPage({
  params,
}: {
  params: Promise<{ term: string }>;
}) {
  const { term } = await params;
  const [t, allTerms] = await Promise.all([getGlossaryTerm(term), getGlossaryTerms()]);
  if (!t) notFound();

  const relatedSlugs = t.related ?? [];
  const relatedTerms = allTerms.filter((x) => relatedSlugs.includes(x.slug));
  const relatedProducts = t.relatedProducts
    ? (await Promise.all(t.relatedProducts.map((s) => getProduct(s)))).filter(
        (p): p is NonNullable<typeof p> => Boolean(p),
      )
    : [];

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      <JsonLd
        data={definedTermJsonLd({ title: t.title, short: t.short, slug: t.slug })}
      />
      <Breadcrumbs
        items={[
          { name: "واژه‌نامه بیمه مسئولیت", href: "/glossary" },
          { name: t.title, href: `/glossary/${t.slug}` },
        ]}
      />

      <article className="mt-6 max-w-3xl">
        <Badge variant="secondary" className="border border-primary/25 bg-primary/10 text-primary hover:bg-primary/10">
          واژه‌نامه بیمه مسئولیت
        </Badge>
        <h1 className="mt-3 text-2xl font-extrabold leading-[1.6] sm:text-3xl">{t.title} چیست؟</h1>

        <div className="mt-6 rounded-2xl border-r-4 border-primary bg-accent/50 p-5">
          <p className="text-[15px] font-bold leading-8">{t.short}</p>
        </div>

        <div className="prose-fa mt-6 space-y-4 text-[15px] leading-8 text-foreground/90">
          {t.body.split(". ").length > 2 ? (
            <>
              <p>{t.body.split(". ").slice(0, 2).join(". ")}</p>
              <p>{t.body.split(". ").slice(2).join(". ")}</p>
            </>
          ) : (
            <p>{t.body}</p>
          )}
        </div>
      </article>

      {/* Related guides — پیوند واژه‌نامه ↔ راهنماهای عمومی (نگاشت صریح) */}
      {TERM_GUIDE_LINKS[t.slug] ? (
        <section aria-labelledby="relg-h" className="mt-10">
          <SectionHeading icon={BookMarked} title="راهنمای کاربردی مرتبط" />
          <Link
            href={TERM_GUIDE_LINKS[t.slug].href}
            className="inline-flex items-center gap-2 rounded-full border bg-card px-5 py-2.5 text-sm font-semibold transition-colors hover:border-primary/40 hover:text-primary"
          >
            {TERM_GUIDE_LINKS[t.slug].label}
            <ArrowLeft className="size-4" aria-hidden="true" />
          </Link>
        </section>
      ) : null}

      {/* Related terms */}
      {relatedTerms.length > 0 ? (
        <section aria-labelledby="relt-h" className="mt-10">
          <SectionHeading icon={BookMarked} title="واژه‌های مرتبط" />
          <div className="flex flex-wrap gap-2.5">
            {relatedTerms.map((r) => (
              <Link
                key={r.slug}
                href={`/glossary/${r.slug}`}
                className="inline-flex items-center gap-1.5 rounded-full border bg-card px-4 py-2 text-sm font-semibold transition-colors hover:border-primary/40 hover:text-primary"
              >
                {r.title}
                <ArrowLeft className="size-3.5" aria-hidden="true" />
              </Link>
            ))}
          </div>
        </section>
      ) : null}

      {/* Related products */}
      {relatedProducts.length > 0 ? (
        <section aria-labelledby="relp-h" className="mt-10">
          <SectionHeading
            icon={Scale}
            title="بیمه‌های مسئولیت مرتبط با این واژه"
            hint="جزئیات کامل پوشش‌ها و استثناها در صفحه هر محصول."
          />
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {relatedProducts.map((p) => (
              <Link key={p.slug} href={productUrl(p.category, p.slug)} className="group">
                <Card className="h-full py-4 transition-all group-hover:border-primary/40 group-hover:shadow-sm">
                  <CardHeader className="pb-1.5">
                    <CardTitle className="text-sm group-hover:text-primary">{p.nameFa}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="line-clamp-2 text-xs leading-6 text-muted-foreground">{p.summaryFa}</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </section>
      ) : null}

      <div className="mt-10 max-w-3xl">
        <LegalDisclaimer />
      </div>

      <div className="mt-8">
        <CtaBanner
          title="هنوز سوال دارید؟ کارشناس بیمه مسئولیت پاسخ می‌دهد"
          text="فرم استعلام را تکمیل کنید؛ ضمن پیش‌فاکتور رسمی، هر اصطلاح بیمه‌نامه را هم به زبان ساده توضیح می‌دهیم."
        />
      </div>
    </div>
  );
}
