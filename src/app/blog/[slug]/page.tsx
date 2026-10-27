import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Clock3, UserRound } from "lucide-react";
import { AnswerBlock } from "@/components/answer-block";
import { AuthorBox } from "@/components/author-box";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { CtaBanner } from "@/components/cta-banner";
import { FaqSection } from "@/components/faq-section";
import { LegalDisclaimer } from "@/components/legal-disclaimer";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { getArticle, getArticles, getAuthors, getProduct } from "@/lib/data";
import { faDate, productUrl, toFaDigits } from "@/lib/format";
import { INDUSTRIES } from "@/lib/industry";
import { articleJsonLd, faqJsonLd, JsonLd } from "@/lib/seo";
import type { SeedArticleSection } from "@/prisma/seed-data/types";

export const revalidate = 3600;

export async function generateStaticParams() {
  const articles = await getArticles();
  return articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticle(slug);
  if (!article) return {};
  return {
    title: article.seoTitle,
    description: article.seoDescription,
    keywords: article.keywords,
    alternates: { canonical: `/blog/${slug}` },
    openGraph: {
      title: article.seoTitle,
      description: article.seoDescription,
      url: `/blog/${slug}`,
      type: "article",
      publishedTime: new Date(article.publishedAt).toISOString(),
      modifiedTime: new Date(article.updatedAt).toISOString(),
      images: ["/og.png"],
    },
    twitter: { card: "summary_large_image", title: article.seoTitle, description: article.seoDescription },
  };
}

function Section({ s, id }: { s: SeedArticleSection; id: string }) {
  return (
    <section id={id} className="scroll-mt-28" aria-label={s.heading}>
      <h2 className="mb-3 text-lg font-extrabold sm:text-xl">{s.heading}</h2>
      <p className="text-[15px] leading-8 text-foreground/90">{s.body}</p>
      {s.list ? (
        <ul className="mt-3 space-y-2">
          {s.list.map((li, i) => (
            <li key={i} className="flex items-start gap-2 text-sm leading-7 text-muted-foreground">
              <span className="mt-2.5 size-1.5 shrink-0 rounded-full bg-primary" aria-hidden="true" />
              {li}
            </li>
          ))}
        </ul>
      ) : null}
      {s.table ? (
        <div className="mt-4 overflow-x-auto rounded-2xl border nice-scroll">
          <Table>
            <TableHeader>
              <TableRow className="bg-accent/60">
                {s.table.headers.map((h, i) => (
                  <TableHead key={i} className="text-start whitespace-nowrap">
                    {h}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {s.table.rows.map((row, i) => (
                <TableRow key={i}>
                  {row.map((cell, j) => (
                    <TableCell key={j} className="align-top text-sm leading-7">
                      {cell}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      ) : null}
    </section>
  );
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = await getArticle(slug);
  if (!article) notFound();

  const authors = await getAuthors();
  const author = authors.find((a) => a.slug === article.authorSlug);
  const related = article.relatedProductSlug ? await getProduct(article.relatedProductSlug) : null;

  // صنعت مرتبط: استخراج خودکار — صنایعی که یکی از پوشش‌هایشان همان
  // محصول مرتبط این مقاله است (سقف ۲). بدون نگاشت دستی (پل مقاله ↔ صنعت).
  const relatedIndustries =
    related
      ? INDUSTRIES.filter((ind) =>
          ind.coverages.some((c) => c.href === productUrl(related.category, related.slug)),
        ).slice(0, 2)
      : [];

  // مقالات مرتبط: رتبه‌بندی بر اساس اشتراک کلیدواژه — تطبیق زیررشته‌ای
  // (کلیدواژه‌ها صوری متفاوت دارند) + fallback «جدیدترین مقالات» تا هر
  // صفحه مقاله شبکه داخلی موضوعی داشته باشد.
  const allArticles = await getArticles();
  const norm = (s: string) => s.replace(/\u200c/g, " ").trim();
  const kwList = article.keywords.map(norm);
  const kwScore = (a: (typeof allArticles)[number]) =>
    a.keywords.filter((k) => {
      const kk = norm(k);
      return kwList.some((w) => (w.includes(kk) || kk.includes(w)) && kk.length > 3);
    }).length;
  let relatedArticles = allArticles
    .filter((a) => a.slug !== article.slug)
    .map((a) => ({ a, score: kwScore(a) }))
    .filter((x) => x.score >= 1)
    .sort((x, y) => y.score - x.score)
    .slice(0, 3)
    .map((x) => x.a);
  if (relatedArticles.length < 3) {
    const rest = allArticles
      .filter(
        (a) =>
          a.slug !== article.slug &&
          !relatedArticles.some((r) => r.slug === a.slug),
      )
      .slice(0, 3 - relatedArticles.length);
    relatedArticles = [...relatedArticles, ...rest];
  }

  const first = article.sections[0];

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      <JsonLd
        data={articleJsonLd({
          title: article.title,
          description: article.excerpt,
          url: `/blog/${article.slug}`,
          authorName: author?.name ?? "تیم بیمه مسئولیت ایران",
          datePublished: new Date(article.publishedAt).toISOString(),
          dateModified: new Date(article.updatedAt).toISOString(),
        })}
      />
      {article.faqs.length > 0 ? <JsonLd data={faqJsonLd(article.faqs)} /> : null}

      <Breadcrumbs
        items={[
          { name: "دانشنامه", href: "/blog" },
          { name: article.title, href: `/blog/${article.slug}` },
        ]}
      />

      <div className="mt-6 grid gap-10 lg:grid-cols-[1fr_320px]">
        <article className="min-w-0">
          <header>
            <h1 className="text-2xl font-extrabold leading-[1.6] sm:text-3xl">{article.title}</h1>
            <div className="mt-4 flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
              <span className="inline-flex items-center gap-1.5">
                <UserRound className="size-4" aria-hidden="true" />
                {author?.name ?? "تیم محتوایی"}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Clock3 className="size-4" aria-hidden="true" />
                {toFaDigits(article.readMinutes)} دقیقه مطالعه
              </span>
              <span>آخرین بازبینی: {faDate(article.reviewDate)}</span>
            </div>
          </header>

          {first ? (
            <div className="mt-6">
              <AnswerBlock text={first.body} title="پاسخ کوتاه" />
            </div>
          ) : null}

          <div className="prose-fa mt-8 flex flex-col gap-8">
            {article.sections.map((s, i) => (
              <Section key={i} s={s} id={`s-${i}`} />
            ))}
          </div>

          <div className="mt-10 space-y-5">
            <AuthorBox
              name={author?.name ?? "تیم محتوایی"}
              role={author?.roleFa ?? "کارشناس بیمه مسئولیت"}
              bio={author?.bio}
              reviewDate={article.reviewDate}
            />
            <LegalDisclaimer />
          </div>

          <FaqSection faqs={article.faqs} title="سوالات متداول این مقاله" />
        </article>

        <aside className="top-24 h-fit space-y-4 lg:sticky">
          {related ? (
            <div className="rounded-2xl border bg-card p-5">
              <p className="text-xs font-bold text-primary">محصول مرتبط</p>
              <Link
                href={productUrl(related.category, related.slug)}
                className="mt-2 block text-sm font-extrabold leading-7 hover:text-primary"
              >
                {related.nameFa}
              </Link>
              <p className="mt-2 text-xs leading-6 text-muted-foreground">{related.summaryFa}</p>
              <Link
                href={`/quote?product=${encodeURIComponent(related.nameFa)}&slug=${related.slug}`}
                className="mt-3 block rounded-lg bg-primary px-4 py-2.5 text-center text-xs font-bold text-primary-foreground hover:opacity-90"
              >
                استعلام قیمت این بیمه
              </Link>
            </div>
          ) : null}

          {relatedIndustries.length > 0 ? (
            <div className="rounded-2xl border bg-card p-5">
              <p className="text-xs font-bold text-primary">راهنمای صنعت مرتبط</p>
              <ul className="mt-2 space-y-2">
                {relatedIndustries.map((ind) => (
                  <li key={ind.slug}>
                    <Link
                      href={`/industry/${ind.slug}`}
                      className="block text-sm font-bold leading-7 hover:text-primary"
                    >
                      {ind.h1}
                    </Link>
                  </li>
                ))}
              </ul>
              <p className="mt-2 text-xs leading-6 text-muted-foreground">
                ریسک‌های این صنعت و پوشش‌های پیشنهادی متناظر.
              </p>
            </div>
          ) : null}

          <div className="rounded-2xl border bg-card p-5">
            <p className="text-sm font-bold">موضوعات کلیدی</p>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {article.keywords.map((k) => (
                <Badge key={k} variant="secondary" className="text-[10px]">
                  {k}
                </Badge>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border bg-accent/40 p-5 text-[13px] leading-7">
            <p className="font-bold">در این مقاله</p>
            <nav aria-label="فهرست مطالب" className="mt-2 space-y-1.5">
              {article.sections.map((s, i) => (
                <a key={i} href={`#s-${i}`} className="block text-muted-foreground hover:text-primary">
                  {s.heading}
                </a>
              ))}
            </nav>
          </div>
        </aside>
      </div>

      {relatedArticles.length > 0 ? (
        <section className="mt-12" aria-labelledby="rel-art-h">
          <h2 id="rel-art-h" className="text-lg font-extrabold sm:text-xl">
            مقالات مرتبط
          </h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-3">
            {relatedArticles.map((a) => (
              <Link
                key={a.slug}
                href={`/blog/${a.slug}`}
                className="group rounded-2xl border bg-card p-5 transition-colors hover:border-primary/40"
              >
                <p className="text-sm font-extrabold leading-7 group-hover:text-primary">{a.title}</p>
                <p className="mt-2 line-clamp-3 text-[13px] leading-6 text-muted-foreground">{a.excerpt}</p>
              </Link>
            ))}
          </div>
        </section>
      ) : null}

      <div className="mt-14">
        <CtaBanner />
      </div>
    </div>
  );
}
