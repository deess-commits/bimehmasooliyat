import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { EnBreadcrumbs } from "@/components/en/en-blocks";
import {
  enProductPath,
  EN_CATEGORY_DESCRIPTIONS,
  EN_CATEGORY_LABELS,
  EN_CATEGORY_ORDER,
} from "@/lib/en/config";
import { enProductPages, enHub } from "@/lib/en/content";
import { JsonLd } from "@/lib/seo";
import { siteConfig } from "@/lib/site";
import type { SeedProduct } from "@/prisma/seed-data/types";
import { professionalProducts } from "@/prisma/seed-data/products-professional";
import { commercialProducts } from "@/prisma/seed-data/products-commercial";
import { corporatePublicProducts } from "@/prisma/seed-data/products-corporate-public";

export const metadata: Metadata = {
  title: { absolute: "All Liability Insurance Types in Iran — English Catalogue" },
  description:
    "All 33 liability insurance products in Iran, in English: professional, business, corporate and personal liability. Every product has a full English guide with coverages, exclusions, claim steps, FAQs and legal sources.",
  keywords: [
    "types of liability insurance Iran",
    "liability insurance list Iran",
    "professional liability Iran",
    "business liability insurance Iran",
    "personal liability insurance Iran",
  ],
  alternates: {
    canonical: "/en/liability",
    languages: {
      en: "/en/liability",
      "fa-IR": "/liability",
      "x-default": "/liability",
    },
  },
};

const ALL_PRODUCTS: SeedProduct[] = [
  ...professionalProducts,
  ...commercialProducts,
  ...corporatePublicProducts,
];

function productsOf(key: string): SeedProduct[] {
  return ALL_PRODUCTS.filter((p) => p.category === key);
}

export default function EnLiabilityHubPage() {
  const url = `${siteConfig.url}/en/liability`;

  const itemList = EN_CATEGORY_ORDER.flatMap((key) =>
    productsOf(key).map((p) => ({
      "@type": "ListItem",
      position: 0, // assigned below
      name: p.nameEn,
      url: `${siteConfig.url}${enProductPath(p.category, p.slug)}`,
    })),
  ).map((item, i) => ({ ...item, position: i + 1 }));

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "ItemList",
          name: "All liability insurance types in Iran — English catalogue",
          numberOfItems: itemList.length,
          itemListElement: itemList,
        }}
      />

      <EnBreadcrumbs items={[{ name: "All Liability Types", href: "/en/liability" }]} />

      <header className="mt-6 max-w-4xl">
        <h1 className="text-2xl font-extrabold leading-tight sm:text-3xl">{enHub.title}</h1>
        <p className="mt-4 text-[15px] leading-7 text-muted-foreground">{enHub.intro}</p>
      </header>

      {EN_CATEGORY_ORDER.map((key) => {
        const products = productsOf(key);
        const categoryHref = `/en/liability/${key}`;
        return (
          <section key={key} id={key} aria-labelledby={`${key}-h`} className="mt-12 scroll-mt-24">
            <div className="flex flex-wrap items-center gap-3">
              <h2 id={`${key}-h`} className="text-xl font-extrabold sm:text-2xl">
                {EN_CATEGORY_LABELS[key]}
              </h2>
              <Badge variant="outline" className="text-[11px] text-muted-foreground">
                {products.length} products
              </Badge>
              <Link
                href={categoryHref}
                className="ms-auto inline-flex items-center gap-1.5 text-sm font-bold text-primary hover:underline"
              >
                Browse {EN_CATEGORY_LABELS[key]}
                <ArrowRight className="size-4" aria-hidden="true" />
              </Link>
            </div>
            <p className="mt-2 max-w-3xl text-sm leading-7 text-muted-foreground">
              {EN_CATEGORY_DESCRIPTIONS[key]}
            </p>

            {/* Full English pages — all products of the category */}
            <div className="mt-5 grid gap-3 md:grid-cols-2">
              {products.map((p) => {
                const en = enProductPages.find((e) => e.slug === p.slug && e.category === p.category);
                if (!en) return null;
                return (
                  <Card key={p.slug} className="py-4 transition-colors hover:border-primary/40">
                    <CardHeader className="pb-2">
                      <div className="flex items-center gap-2">
                        <Badge variant="secondary" className="border border-primary/25 bg-primary/10 text-[11px] text-primary hover:bg-primary/10">
                          {enHub.flagshipLabel}
                        </Badge>
                      </div>
                      <CardTitle className="mt-2 text-[15px] leading-7">
                        <Link href={enProductPath(p.category, p.slug)} className="hover:text-primary">
                          {en.title}
                        </Link>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-[13px] leading-6 text-muted-foreground">{en.audienceLine}</p>
                      <Link
                        href={enProductPath(p.category, p.slug)}
                        className="mt-3 inline-flex items-center gap-1.5 text-sm font-bold text-primary hover:underline"
                      >
                        Read the full English guide
                        <ArrowRight className="size-4" aria-hidden="true" />
                      </Link>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </section>
        );
      })}

      {/* Closing note */}
      <section aria-label="Note on authoritative language" className="mt-12 rounded-2xl border bg-accent/40 p-5">
        <p className="flex items-start gap-2.5 text-[13px] leading-7 text-muted-foreground">
          <CheckCircle2 className="mt-1 size-4.5 shrink-0 text-primary" aria-hidden="true" />
          <span>
            Each product also has a complete Persian page with the full policy conditions in Persian, which remains the
            authoritative version. Request an official quotation for any product via the{" "}
            <Link href="/quote" className="font-semibold text-primary hover:underline">
              quote form
            </Link>{" "}
            or by email in English.
          </span>
        </p>
      </section>
    </div>
  );
}
