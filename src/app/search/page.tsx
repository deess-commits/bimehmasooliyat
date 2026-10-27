import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, BookOpen, FileSearch, Gavel, HelpCircle, Landmark, Scale, SearchX } from "lucide-react";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getArticles, getCities, getGlossaryTerms, getGeneralFaqs, searchProducts } from "@/lib/data";
import { productUrl, toFaDigits } from "@/lib/format";
import { claimGuides } from "@/prisma/seed-data/claim-guides";

export const revalidate = 0;

export const metadata: Metadata = {
  title: "جست‌وجو در مرجع بیمه مسئولیت",
  description: "جست‌وجوی میان انواع بیمه مسئولیت، واژه‌نامه، مقالات و صفحات شهری.",
  robots: { index: false, follow: true },
};

interface SearchParams {
  q?: string;
}

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const q = ((await searchParams).q ?? "").trim();
  const hasQuery = q.length >= 2;

  const [products, glossary, articles, cities, faqs] = hasQuery
    ? await Promise.all([
        searchProducts(q),
        getGlossaryTerms(),
        getArticles(),
        getCities(),
        getGeneralFaqs(),
      ])
    : [[], [], [], [], []];

  const gTerms = hasQuery ? glossary.filter((t) => (t.title + t.short).includes(q)).slice(0, 8) : [];
  const aHits = hasQuery ? articles.filter((a) => (a.title + a.excerpt).includes(q)).slice(0, 8) : [];
  const cHits = hasQuery ? cities.filter((c) => c.nameFa.includes(q)).slice(0, 8) : [];
  const fHits = hasQuery
    ? faqs.filter((f) => (f.question + f.answer).includes(q)).slice(0, 6)
    : [];
  const gHits = hasQuery
    ? claimGuides
        .filter((g) => (g.title + g.answerBlock + g.intro).includes(q))
        .slice(0, 6)
    : [];
  const total =
    products.length + gTerms.length + aHits.length + cHits.length + fHits.length + gHits.length;

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6">
      <Breadcrumbs items={[{ name: "جست‌وجو", href: "/search" }]} />

      <header className="mt-6">
        <h1 className="text-2xl font-extrabold leading-[1.6] sm:text-3xl">جست‌وجو در مرجع بیمه مسئولیت</h1>
      </header>

      {/* Search form */}
      <form action="/search" method="GET" className="mt-6 flex gap-2" role="search">
        <Input
          type="search"
          name="q"
          defaultValue={q}
          placeholder="مثلاً: بیمه مسئولیت پزشکان، دیه، فرانشیز…"
          aria-label="عبارت جست‌وجو"
          className="h-12 bg-background"
        />
        <Button type="submit" className="h-12 shrink-0 font-bold">
          <FileSearch className="size-4" aria-hidden="true" />
          جست‌وجو
        </Button>
      </form>

      {!hasQuery ? (
        <div className="mt-10 space-y-3">
          <p className="text-sm font-semibold text-muted-foreground">جست‌وجوهای پرکاربرد:</p>
          <div className="flex flex-wrap gap-2.5">
            {["پزشکان", "کارفرما", "دیه", "فرانشیز", "سقف تعهد", "آسانسور", "وکلا", "پیمانکار"].map((s) => (
              <Link
                key={s}
                href={`/search?q=${encodeURIComponent(s)}`}
                className="rounded-full border bg-card px-4 py-2 text-sm font-semibold transition-colors hover:border-primary/40 hover:text-primary"
              >
                {s}
              </Link>
            ))}
          </div>
        </div>
      ) : total === 0 ? (
        <div className="mt-10 rounded-2xl border border-dashed p-10 text-center">
          <SearchX className="mx-auto size-10 text-muted-foreground" aria-hidden="true" />
          <p className="mt-3 font-bold">نتیجه‌ای برای «{q}» پیدا نشد</p>
          <p className="mt-1 text-sm text-muted-foreground">
            املای عبارت را بررسی کنید یا از فهرست کامل انواع بیمه مسئولیت شروع کنید.
          </p>
          <div className="mt-4 flex justify-center gap-2">
            <Button variant="outline" asChild>
              <Link href="/liability">همه انواع بیمه مسئولیت</Link>
            </Button>
          </div>
        </div>
      ) : (
        <div className="mt-8 space-y-8">
          <p className="text-sm text-muted-foreground">
            {toFaDigits(total)} نتیجه برای «{q}»
          </p>

          {products.length > 0 ? (
            <section aria-labelledby="sr-p">
              <h2 id="sr-p" className="mb-3 flex items-center gap-2 text-lg font-bold">
                <Landmark className="size-5 text-primary" aria-hidden="true" />
                انواع بیمه مسئولیت
              </h2>
              <div className="grid gap-3 sm:grid-cols-2">
                {products.map((p) => (
                  <Link key={p.slug} href={productUrl(p.category, p.slug)} className="group">
                    <Card className="h-full py-4 transition-all group-hover:border-primary/40">
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

          {gTerms.length > 0 ? (
            <section aria-labelledby="sr-g">
              <h2 id="sr-g" className="mb-3 flex items-center gap-2 text-lg font-bold">
                <BookOpen className="size-5 text-primary" aria-hidden="true" />
                واژه‌نامه
              </h2>
              <ul className="space-y-2">
                {gTerms.map((t) => (
                  <li key={t.slug}>
                    <Link
                      href={`/glossary/${t.slug}`}
                      className="flex items-center justify-between gap-3 rounded-xl border bg-card p-4 text-sm font-bold transition-colors hover:border-primary/40 hover:text-primary"
                    >
                      {t.title}
                      <ArrowLeft className="size-4 shrink-0 text-primary" aria-hidden="true" />
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          ) : null}

          {aHits.length > 0 ? (
            <section aria-labelledby="sr-a">
              <h2 id="sr-a" className="mb-3 flex items-center gap-2 text-lg font-bold">
                <Scale className="size-5 text-primary" aria-hidden="true" />
                دانشنامه
              </h2>
              <ul className="space-y-2">
                {aHits.map((a) => (
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

          {fHits.length > 0 ? (
            <section aria-labelledby="sr-f">
              <h2 id="sr-f" className="mb-3 flex items-center gap-2 text-lg font-bold">
                <HelpCircle className="size-5 text-primary" aria-hidden="true" />
                سوالات متداول
              </h2>
              <ul className="space-y-2">
                {fHits.map((f, i) => (
                  <li key={i} className="rounded-xl border bg-card p-4">
                    <Link href={`/faq#faq-${i}`} className="text-sm font-bold hover:text-primary">
                      {f.question}
                    </Link>
                    <p className="mt-1 line-clamp-2 text-xs leading-6 text-muted-foreground">{f.answer}</p>
                  </li>
                ))}
              </ul>
            </section>
          ) : null}

          {gHits.length > 0 ? (
            <section aria-labelledby="sr-gu">
              <h2 id="sr-gu" className="mb-3 flex items-center gap-2 text-lg font-bold">
                <Gavel className="size-5 text-primary" aria-hidden="true" />
                راهنماهای خسارت
              </h2>
              <ul className="space-y-2">
                {gHits.map((g) => (
                  <li key={g.slug}>
                    <Link
                      href={`/claims/${g.slug}`}
                      className="flex items-center justify-between gap-3 rounded-xl border bg-card p-4 text-sm font-bold transition-colors hover:border-primary/40 hover:text-primary"
                    >
                      {g.title}
                      <ArrowLeft className="size-4 shrink-0 text-primary" aria-hidden="true" />
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          ) : null}

          {cHits.length > 0 ? (
            <section aria-labelledby="sr-c">
              <h2 id="sr-c" className="mb-3 text-lg font-bold">صفحات شهری</h2>
              <div className="flex flex-wrap gap-2.5">
                {cHits.map((c) => (
                  <Link
                    key={c.slug}
                    href={`/city/${c.slug}`}
                    className="rounded-full border bg-card px-4 py-2 text-sm font-semibold transition-colors hover:border-primary/40 hover:text-primary"
                  >
                    بیمه مسئولیت در {c.nameFa}
                  </Link>
                ))}
              </div>
            </section>
          ) : null}
        </div>
      )}
    </div>
  );
}
