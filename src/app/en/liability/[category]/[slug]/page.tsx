import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  AlertTriangle,
  ArrowRight,
  BookMarked,
  CheckCircle2,
  ClipboardList,
  FileHeart,
  FileSearch,
  Gavel,
  Mail,
  Scale,
  Users,
  XCircle,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { FaqSection } from "@/components/faq-section";
import { ShareButton } from "@/components/share-button";
import {
  EnAnswerBlock,
  EnBreadcrumbs,
  EnLegalDisclaimer,
  EnNumberedSteps,
  EnReviewBox,
  EnSectionHeading,
} from "@/components/en/en-blocks";
import { EN_PAGES, enHreflangPair, EN_CATEGORY_LABELS } from "@/lib/en/config";
import { enDisclaimers, getEnProductPage } from "@/lib/en/content";
import { faqJsonLd, howToJsonLd, JsonLd, serviceJsonLd } from "@/lib/seo";
import { siteConfig } from "@/lib/site";

export const revalidate = 3600;

export function generateStaticParams() {
  return EN_PAGES.map((p) => ({ category: p.category, slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string; slug: string }>;
}): Promise<Metadata> {
  const { category, slug } = await params;
  const page = getEnProductPage(category, slug);
  if (!page) return {};

  const path = `/en/liability/${page.category}/${page.slug}`;
  return {
    title: { absolute: page.metaTitle },
    description: page.metaDescription,
    keywords: page.keywords,
    alternates: {
      canonical: path,
      languages: enHreflangPair(page.category, page.slug),
    },
    openGraph: {
      title: page.metaTitle,
      description: page.metaDescription,
      url: path,
      type: "article",
      locale: "en_US",
    },
    twitter: {
      card: "summary",
      title: page.metaTitle,
      description: page.metaDescription,
    },
  };
}

export default async function EnProductPage({
  params,
}: {
  params: Promise<{ category: string; slug: string }>;
}) {
  const { category, slug } = await params;
  const product = getEnProductPage(category, slug);
  if (!product) notFound();

  const url = `/en/liability/${product.category}/${product.slug}`;
  const categoryLabel = EN_CATEGORY_LABELS[product.category];

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      <JsonLd
        data={serviceJsonLd({
          name: product.nameEn,
          description: product.answerBlock,
          url,
          category: `${categoryLabel} — Bimeh Iran`,
          dateModified: new Date(product.reviewDate).toISOString().slice(0, 10),
        })}
      />
      <JsonLd data={faqJsonLd(product.faqs)} />
      <JsonLd
        data={howToJsonLd({
          name: `How to buy ${product.nameEn} in Iran`,
          description: product.buySteps[0]?.description ?? "",
          steps: product.buySteps,
          url,
        })}
      />
      <JsonLd
        data={howToJsonLd({
          name: `How to claim ${product.nameEn} in Iran`,
          description: product.claimSteps[0]?.description ?? "",
          steps: product.claimSteps,
          url: "/en",
        })}
      />

      <EnBreadcrumbs
        items={[
          { name: "All Liability Types", href: "/en/liability" },
          { name: categoryLabel, href: `/en/liability#${product.category}` },
          { name: product.nameEn, href: url },
        ]}
      />

      {/* 1) H1 + meta chips */}
      <header className="mt-6">
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="secondary" className="border border-primary/25 bg-primary/10 text-primary hover:bg-primary/10">
            {categoryLabel}
          </Badge>
          <Badge variant="outline" className="text-[11px] text-muted-foreground">
            Who it is for: {product.audienceLine.replace(/^For /, "")}
          </Badge>
        </div>
        <h1 className="mt-3 max-w-4xl text-2xl font-extrabold leading-tight sm:text-3xl">{product.title}</h1>
        <p className="mt-2 text-sm leading-7 text-muted-foreground">{product.audienceLine}</p>
        <p className="mt-3 text-xs text-muted-foreground">
          Persian twin page (authoritative):{" "}
          <Link
            href={`/liability/${product.category}/${product.slug}`}
            className="font-semibold text-primary hover:underline"
          >
            /liability/{product.category}/{product.slug}
          </Link>
        </p>
        <div className="mt-3">
          <ShareButton
            title={product.metaTitle}
            path={url}
            label="Share"
            copiedLabel="Link copied"
          />
        </div>
      </header>

      <div className="mt-6 grid gap-8 lg:grid-cols-[1fr_320px]">
        {/* Main column */}
        <div className="flex min-w-0 flex-col gap-10">
          {/* 2) Answer block */}
          <EnAnswerBlock text={product.answerBlock} />

          {/* 3) Premium note + quick CTA */}
          <div className="flex flex-wrap items-center gap-3 rounded-2xl border bg-card p-4">
            <Scale className="size-5 text-primary" aria-hidden="true" />
            <p className="text-sm font-bold">
              The final premium is issued upon official quotation — no premium figures are published on this site.
            </p>
          </div>

          {/* 4) Who is covered */}
          <section aria-labelledby="who-h">
            <EnSectionHeading icon={Users} title="Who needs this policy?" />
            <ul className="grid gap-2.5 sm:grid-cols-2">
              {product.whoCovered.map((w, i) => (
                <li
                  key={i}
                  className="flex items-start gap-2.5 rounded-xl border bg-card p-3.5 text-sm leading-6"
                >
                  <CheckCircle2 className="mt-0.5 size-4.5 shrink-0 text-primary" aria-hidden="true" />
                  {w}
                </li>
              ))}
            </ul>
          </section>

          {/* 5) Coverages table */}
          <section aria-labelledby="cov-h">
            <EnSectionHeading icon={FileHeart} title="What is covered?" />
            <div className="overflow-hidden rounded-2xl border">
              <Table>
                <TableHeader>
                  <TableRow className="bg-accent/60">
                    <TableHead className="w-1/3 text-start">Coverage</TableHead>
                    <TableHead className="text-start">Description</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {product.coverages.map((c, i) => (
                    <TableRow key={i}>
                      <TableCell className="align-top font-bold">{c.title}</TableCell>
                      <TableCell className="align-top text-sm leading-6 text-muted-foreground">
                        {c.description}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </section>

          {/* 6) Exclusions */}
          <section aria-labelledby="exc-h">
            <EnSectionHeading icon={AlertTriangle} title="What is not covered? (Exclusions)" />
            <ul className="space-y-2.5 rounded-2xl border border-destructive/20 bg-destructive/5 p-4 sm:p-5">
              {product.exclusions.map((e, i) => (
                <li key={i} className="flex items-start gap-2.5 text-sm leading-6">
                  <XCircle className="mt-0.5 size-4.5 shrink-0 text-destructive" aria-hidden="true" />
                  {e}
                </li>
              ))}
            </ul>
          </section>

          {/* 7) Conditions & documents */}
          <section aria-labelledby="cond-h" className="grid gap-6 md:grid-cols-2">
            <div>
              <EnSectionHeading icon={ClipboardList} title="Issuance conditions" />
              <ul className="space-y-2">
                {product.conditions.map((c, i) => (
                  <li key={i} className="flex items-start gap-2 rounded-lg bg-secondary/50 p-3 text-sm leading-6">
                    <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden="true" />
                    {c}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <EnSectionHeading icon={FileSearch} title="Required documents" />
              <ul className="space-y-2">
                {product.documents.map((d, i) => (
                  <li key={i} className="flex items-start gap-2 rounded-lg bg-secondary/50 p-3 text-sm leading-6">
                    <FileSearch className="mt-0.5 size-4 shrink-0 text-muted-foreground" aria-hidden="true" />
                    {d}
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* 8) Buy steps */}
          <section aria-labelledby="buy-h">
            <EnSectionHeading icon={FileSearch} title="How to buy — step by step" />
            <EnNumberedSteps steps={product.buySteps} variant="buy" />
          </section>

          {/* 9) Claim steps */}
          <section aria-labelledby="claim-h">
            <EnSectionHeading icon={Gavel} title="How to claim — step by step" />
            <EnNumberedSteps steps={product.claimSteps} variant="claim" />
            <p className="mt-3 text-xs leading-6 text-muted-foreground">
              Claim notification deadlines and assessment details follow the policy general conditions and the Iranian
              Insurance Act (Article 30 practice: notification within five working days).
            </p>
          </section>

          {/* 10) FAQ */}
          <section aria-labelledby="faq-h">
            <EnSectionHeading icon={BookMarked} title={`FAQs — ${product.nameEn}`} />
            <FaqSection faqs={product.faqs} title="" />
          </section>

          {/* 11) Legal sources */}
          <section aria-labelledby="legal-h">
            <EnSectionHeading icon={BookMarked} title="Legal sources" />
            <ul className="space-y-2.5">
              {product.legalSources.map((l, i) => (
                <li key={i} className="rounded-xl border bg-card p-4">
                  <p className="text-sm font-bold">
                    {l.title} <span className="font-medium text-muted-foreground">— {l.reference}</span>
                  </p>
                </li>
              ))}
            </ul>
            <p className="mt-3 text-xs leading-6 text-muted-foreground">
              Iranian statutes are authoritative in Persian; English titles above are orientation references.
            </p>
          </section>

          {/* 12) Review box + disclaimer */}
          <EnReviewBox reviewDate={product.reviewDate} bio={enDisclaimers.review} />
          <EnLegalDisclaimer text={enDisclaimers.legal} />

          {/* Final CTA */}
          <section aria-labelledby="cta-h" className="rounded-2xl border border-primary/25 bg-accent/50 p-6">
            <h2 id="cta-h" className="text-lg font-extrabold sm:text-xl">
              Get {product.nameEn} through the official Bimeh Iran agency
            </h2>
            <p className="mt-2 max-w-3xl text-sm leading-7 text-muted-foreground">
              {enDisclaimers.quoteNote} The quotation is issued on current Bimeh Iran tariffs after the limit of liability
              is agreed.
            </p>
            <div className="mt-4 flex flex-wrap items-center gap-2">
              <Link
                href={`/quote?slug=${product.slug}`}
                className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-3 text-sm font-bold text-primary-foreground transition-opacity hover:opacity-90"
              >
                <FileSearch className="size-4" aria-hidden="true" />
                Open the quote form (Persian)
              </Link>
              <a
                href={`mailto:${siteConfig.nap.email}?subject=${encodeURIComponent(`Quotation request: ${product.nameEn}`)}`}
                className="inline-flex items-center gap-2 rounded-lg border px-4 py-3 text-sm font-bold hover:border-primary/40"
              >
                <Mail className="size-4" aria-hidden="true" />
                Email us in English
              </a>
            </div>
          </section>
        </div>

        {/* Sidebar */}
        <aside className="top-24 h-fit space-y-4 lg:sticky" aria-label="Quick action">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Quotation and issuance</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-[13px] leading-6 text-muted-foreground">
                Limits and coverages are tailored to your real risk — free of charge, without obligation.
              </p>
              <Badge variant="secondary" className="bg-primary/10 text-primary hover:bg-primary/10">
                Response: within 1 working day
              </Badge>
              <Link
                href={`/quote?slug=${product.slug}`}
                className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-4 py-3 text-sm font-bold text-primary-foreground transition-opacity hover:opacity-90"
              >
                <FileSearch className="size-4" aria-hidden="true" />
                Quote form (in Persian)
              </Link>
              <a
                href={`mailto:${siteConfig.nap.email}?subject=${encodeURIComponent(`Quotation request: ${product.nameEn}`)}`}
                className="block rounded-lg border px-4 py-3 text-center text-sm font-bold hover:border-primary/40"
              >
                <span className="inline-flex items-center gap-2">
                  <Mail className="size-4" aria-hidden="true" />
                  Email in English
                </span>
              </a>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm">On this page</CardTitle>
            </CardHeader>
            <CardContent>
              <nav aria-label="Page sections" className="space-y-2 text-[13px]">
                {[
                  ["who-h", "Who needs this policy?"],
                  ["cov-h", "Coverages"],
                  ["exc-h", "Exclusions"],
                  ["cond-h", "Conditions and documents"],
                  ["buy-h", "Buying steps"],
                  ["claim-h", "Claim steps"],
                  ["legal-h", "Legal sources"],
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
              <CardTitle className="text-sm">More in English</CardTitle>
            </CardHeader>
            <CardContent>
              <nav aria-label="Related English pages" className="space-y-2 text-[13px]">
                {[
                  // Same-category products first (true internal-linking signal),
                  // then other categories, then the category hub itself.
                  ...EN_PAGES.filter(
                    (p) => p.category === product.category && p.slug !== product.slug,
                  ),
                  ...EN_PAGES.filter((p) => p.category !== product.category),
                ]
                  .slice(0, 5)
                  .map((p) => {
                    const rel = getEnProductPage(p.category, p.slug);
                    return (
                      <Link
                        key={`${p.category}/${p.slug}`}
                        href={`/en/liability/${p.category}/${p.slug}`}
                        className="flex items-center justify-between gap-2 text-muted-foreground hover:text-primary"
                      >
                        <span className="truncate">{rel?.nameEn ?? p.slug}</span>
                        <ArrowRight className="size-3.5 shrink-0" aria-hidden="true" />
                      </Link>
                    );
                  })}
                <Link
                  href={`/en/liability/${product.category}`}
                  className="block font-semibold text-primary hover:underline"
                >
                  Browse {EN_CATEGORY_LABELS[product.category]}
                </Link>
                <Link href="/en/liability" className="block font-semibold text-primary hover:underline">
                  All 33 liability products
                </Link>
              </nav>
            </CardContent>
          </Card>

          <p className="rounded-xl border bg-secondary/40 p-3 text-[11px] leading-6 text-muted-foreground">
            Last reviewed:{" "}
            <strong className="text-foreground">
              {new Intl.DateTimeFormat("en-GB", { year: "numeric", month: "long", day: "numeric" }).format(
                new Date(product.reviewDate),
              )}
            </strong>
          </p>
        </aside>
      </div>
    </div>
  );
}
