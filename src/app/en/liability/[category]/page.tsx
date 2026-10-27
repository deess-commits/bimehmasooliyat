import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { EnAnswerBlock, EnBreadcrumbs } from "@/components/en/en-blocks";
import { enCategoryHreflangPair, enProductPath, EN_CATEGORY_LABELS, EN_CATEGORY_ORDER } from "@/lib/en/config";
import { enCategoryIntros, enProductPages } from "@/lib/en/content";
import { itemListJsonLd, JsonLd } from "@/lib/seo";

export const revalidate = 3600;

export function generateStaticParams() {
  return EN_CATEGORY_ORDER.map((category) => ({ category }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>;
}): Promise<Metadata> {
  const { category } = await params;
  if (!EN_CATEGORY_ORDER.includes(category as (typeof EN_CATEGORY_ORDER)[number])) return {};

  const label = EN_CATEGORY_LABELS[category];
  const intro = enCategoryIntros[category];
  const metaDescription =
    `All ${label.toLowerCase()} products in Iran in English: who is covered, coverages, exclusions, claim steps, FAQs and legal sources — full English guides.`;

  return {
    title: { absolute: `${label} Insurance in Iran — English Guides` },
    description: metaDescription,
    keywords: [
      `${label.toLowerCase()} insurance Iran`,
      "liability insurance Iran English",
      "Iran liability insurance categories",
    ],
    alternates: {
      canonical: `/en/liability/${category}`,
      languages: enCategoryHreflangPair(category),
    },
    openGraph: {
      title: `${label} Insurance in Iran`,
      description: intro.slice(0, 158),
      url: `/en/liability/${category}`,
      type: "website",
      locale: "en_US",
    },
  };
}

export default async function EnCategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  if (!EN_CATEGORY_ORDER.includes(category as (typeof EN_CATEGORY_ORDER)[number])) notFound();

  const label = EN_CATEGORY_LABELS[category];
  const intro = enCategoryIntros[category];
  const products = enProductPages
    .filter((p) => p.category === category)
    .sort((a, b) => a.slug.localeCompare(b.slug));
  const path = `/en/liability/${category}`;

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      <JsonLd
        data={itemListJsonLd({
          name: `${label} insurance in Iran — English catalogue`,
          url: path,
          items: products.map((p) => ({
            name: p.nameEn,
            href: enProductPath(p.category, p.slug),
          })),
        })}
      />

      <EnBreadcrumbs
        items={[
          { name: "All Liability Types", href: "/en/liability" },
          { name: label, href: path },
        ]}
      />

      <header className="mt-6 max-w-4xl">
        <Badge variant="secondary" className="border border-primary/25 bg-primary/10 text-primary hover:bg-primary/10">
          {products.length} products
        </Badge>
        <h1 className="mt-3 text-2xl font-extrabold leading-tight sm:text-3xl">
          {label} Insurance in Iran
        </h1>
        <div className="mt-5">
          <EnAnswerBlock text={intro} />
        </div>
        <p className="mt-4 text-sm text-muted-foreground">
          Persian category page (authoritative):{" "}
          <Link href={`/liability/${category}`} className="font-semibold text-primary hover:underline">
            /liability/{category}
          </Link>
        </p>
      </header>

      <section aria-labelledby={`${category}-products-h`} className="mt-10">
        <h2 id={`${category}-products-h`} className="text-xl font-extrabold sm:text-2xl">
          {label} products in full English
        </h2>
        <div className="mt-5 grid gap-4 md:grid-cols-2">
          {products.map((p) => (
            <Card key={p.slug} className="flex flex-col py-5 transition-colors hover:border-primary/40">
              <CardHeader className="pb-2">
                <CardTitle className="text-[15px] leading-7">
                  <Link href={enProductPath(p.category, p.slug)} className="hover:text-primary">
                    {p.title}
                  </Link>
                </CardTitle>
              </CardHeader>
              <CardContent className="flex flex-1 flex-col">
                <p className="text-[13px] leading-6 text-muted-foreground">{p.audienceLine}</p>
                <p className="mt-3 line-clamp-3 text-[13px] leading-6 text-muted-foreground">{p.answerBlock}</p>
                <Link
                  href={enProductPath(p.category, p.slug)}
                  className="mt-4 inline-flex w-fit items-center gap-1.5 text-sm font-bold text-primary hover:underline"
                >
                  Read the full English guide
                  <ArrowRight className="size-4" aria-hidden="true" />
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section aria-label="Other categories" className="mt-12 rounded-2xl border bg-accent/40 p-5">
        <p className="text-sm font-bold">Other liability categories in English</p>
        <nav aria-label="Other categories" className="mt-3 flex flex-wrap gap-2">
          {EN_CATEGORY_ORDER.filter((c) => c !== category).map((c) => (
            <Link
              key={c}
              href={`/en/liability/${c}`}
              className="rounded-lg border px-3 py-2 text-sm font-semibold hover:border-primary/40 hover:text-primary"
            >
              {EN_CATEGORY_LABELS[c]}
            </Link>
          ))}
          <Link
            href="/en/liability"
            className="rounded-lg border px-3 py-2 text-sm font-semibold hover:border-primary/40 hover:text-primary"
          >
            All 33 liability products
          </Link>
        </nav>
      </section>
    </div>
  );
}
