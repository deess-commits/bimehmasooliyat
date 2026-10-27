import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, GitCompareArrows, Scale, Users } from "lucide-react";
import {
  EnAnswerBlock,
  EnBreadcrumbs,
  EnSectionHeading,
} from "@/components/en/en-blocks";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { FaqSection } from "@/components/faq-section";
import { CtaBanner } from "@/components/cta-banner";
import { enCompare, enProductPages } from "@/lib/en/content";
import { EN_CATEGORY_LABELS, EN_CATEGORY_ORDER } from "@/lib/en/config";
import { siteConfig } from "@/lib/site";
import { faqJsonLd, JsonLd } from "@/lib/seo";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: { absolute: enCompare.metaTitle },
  description: enCompare.metaDescription,
  alternates: {
    canonical: "/en/compare",
    languages: {
      en: "/en/compare",
      "fa-IR": "/compare",
      "x-default": "/compare",
    },
  },
  openGraph: {
    title: enCompare.metaTitle,
    description: enCompare.metaDescription,
    url: "/en/compare",
    type: "article",
    locale: "en_US",
  },
};

export default function EnComparePage() {
  const grouped = EN_CATEGORY_ORDER.map((key) => ({
    key,
    label: EN_CATEGORY_LABELS[key],
    products: enProductPages.filter((p) => p.category === key),
  }));

  // Dataset — English twin of the Persian job-to-coverage table dataset
  // (matches the visible table below: same columns, same 31 rows).
  const jobDatasetJsonLd = {
    "@context": "https://schema.org",
    "@type": "Dataset",
    name: "\"Which coverage for which job?\" table — Iran liability insurance, English edition",
    description:
      "A mapping of 31 jobs and activities to the recommended Iranian liability insurance coverage and the main risk covered, based on the general conditions of Iran Insurance and the Iranian Civil Liability Act.",
    url: `${siteConfig.url}/en/compare`,
    creator: { "@id": `${siteConfig.url}/#organization` },
    inLanguage: "en",
    variableMeasured: [
      enCompare.jobsTableHead.job,
      enCompare.jobsTableHead.coverage,
      enCompare.jobsTableHead.risk,
    ],
    numberOfRows: enCompare.jobs.length,
    license: `${siteConfig.url}/terms`,
  };

  const itemListJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "All 33 liability insurance types in Iran — English comparison",
    numberOfItems: enProductPages.length,
    itemListElement: enProductPages.map((p, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: p.nameEn,
      url: `/en/liability/${p.category}/${p.slug}`,
    })),
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      <JsonLd data={itemListJsonLd} />
      <JsonLd data={jobDatasetJsonLd} />
      <JsonLd data={faqJsonLd(enCompare.faqs)} />

      <EnBreadcrumbs items={[{ name: "Compare Coverages", href: "/en/compare" }]} />

      <header className="mt-6">
        <h1 className="text-2xl font-extrabold leading-snug sm:text-3xl">{enCompare.h1}</h1>
      </header>

      <div className="mt-6 max-w-3xl">
        <EnAnswerBlock text={enCompare.answerBlock} />
      </div>

      {/* Category matrix */}
      <section aria-labelledby="en-compare-matrix" className="mt-10">
        <h2 id="en-compare-matrix" className="sr-only">
          {enCompare.matrixHeading}
        </h2>
        <EnSectionHeading title={enCompare.matrixHeading} icon={GitCompareArrows} />
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {enCompare.matrix.map((m) => (
            <div key={m.key} className="rounded-2xl border bg-card p-4">
              <Badge variant="secondary" className="mb-2">
                {m.label}
              </Badge>
              <p className="text-sm leading-7 text-muted-foreground">
                <strong className="text-foreground">Key risks:</strong> {m.risks}
              </p>
              <p className="mt-2 text-sm leading-7 text-muted-foreground">
                <strong className="text-foreground">Typical holders:</strong> {m.typical}
              </p>
              <Link
                href={`/en/liability/${m.key}`}
                className="mt-3 inline-flex items-center gap-1 text-sm font-bold text-primary hover:underline"
              >
                Browse {EN_CATEGORY_LABELS[m.key]}
                <ArrowRight className="size-3.5" aria-hidden="true" />
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* Job-to-coverage mapping — English twin of the 31-row Persian table */}
      <section aria-labelledby="en-compare-jobs" className="mt-12">
        <h2 id="en-compare-jobs" className="sr-only">
          {enCompare.jobsHeading}
        </h2>
        <EnSectionHeading title={enCompare.jobsHeading} icon={Scale} />
        <p className="-mt-2 mb-5 max-w-3xl text-sm leading-7 text-muted-foreground">
          {enCompare.jobsHint}
        </p>
        <div className="max-h-96 overflow-y-auto overflow-x-auto rounded-2xl border nice-scroll">
          <Table>
            <TableHeader>
              <TableRow className="bg-accent/60">
                <TableHead className="text-start whitespace-nowrap">{enCompare.jobsTableHead.job}</TableHead>
                <TableHead className="text-start whitespace-nowrap">{enCompare.jobsTableHead.coverage}</TableHead>
                <TableHead className="text-start">{enCompare.jobsTableHead.risk}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {enCompare.jobs.map((row) => {
                const product = enProductPages.find(
                  (p) => p.slug === row.product[1] && p.category === row.product[0],
                );
                return (
                  <TableRow key={row.job}>
                    <TableCell className="align-top text-sm font-semibold leading-7">{row.job}</TableCell>
                    <TableCell className="align-top text-sm leading-7">
                      <Link
                        href={`/en/liability/${row.product[0]}/${row.product[1]}`}
                        className="font-bold text-primary hover:underline"
                      >
                        {product?.nameEn ?? row.product[1]}
                      </Link>
                    </TableCell>
                    <TableCell className="align-top text-sm leading-7 text-muted-foreground">{row.risk}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
        <p className="mt-4 max-w-3xl text-xs leading-6 text-muted-foreground">{enCompare.jobsNote}</p>
      </section>

      {/* Full comparison table */}
      {grouped.map((group) => (
        <section
          key={group.key}
          aria-labelledby={`en-compare-${group.key}`}
          className="mt-12"
        >
          <h2 id={`en-compare-${group.key}`} className="mb-4 text-lg font-extrabold sm:text-xl">
            {group.label}{" "}
            <span className="text-sm font-semibold text-muted-foreground">
              ({group.products.length} coverages)
            </span>
          </h2>
          <div className="overflow-x-auto rounded-2xl border nice-scroll">
            <Table>
              <TableHeader>
                <TableRow className="bg-accent/60">
                  <TableHead className="text-start">{enCompare.tableHead.product}</TableHead>
                  <TableHead className="text-start">{enCompare.tableHead.audience}</TableHead>
                  <TableHead className="text-start">{enCompare.tableHead.risk}</TableHead>
                  <TableHead className="text-start whitespace-nowrap">{enCompare.quoteLink}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {group.products.map((p) => (
                  <TableRow key={p.slug}>
                    <TableCell className="align-top font-bold">
                      <Link
                        href={`/en/liability/${p.category}/${p.slug}`}
                        className="hover:text-primary"
                      >
                        {p.nameEn}
                      </Link>
                    </TableCell>
                    <TableCell className="max-w-xs align-top text-sm leading-7 text-muted-foreground">
                      {p.audienceLine}
                    </TableCell>
                    <TableCell className="align-top text-sm leading-7 text-muted-foreground">
                      {p.answerBlock.split(".")[0]}.
                    </TableCell>
                    <TableCell className="align-top">
                      <Link
                        href={`/en/liability/${p.category}/${p.slug}`}
                        className="inline-flex items-center gap-1 text-sm font-bold text-primary hover:underline"
                      >
                        Full guide
                        <ArrowRight className="size-3.5" aria-hidden="true" />
                      </Link>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </section>
      ))}

      {/* FAQ */}
      <section className="mx-auto mt-12 max-w-4xl">
        <FaqSection faqs={enCompare.faqs} title="Choosing between liability coverages — FAQs" />
      </section>

      {/* Cross links */}
      <section className="mt-12 flex flex-wrap gap-3">
        <Link
          href="/en/price"
          className="inline-flex items-center gap-2 rounded-full border bg-card px-5 py-2.5 text-sm font-semibold transition-colors hover:border-primary/40 hover:text-primary"
        >
          <Scale className="size-4" aria-hidden="true" />
          How pricing works
          <ArrowRight className="size-4" aria-hidden="true" />
        </Link>
        <Link
          href="/en/liability"
          className="inline-flex items-center gap-2 rounded-full border bg-card px-5 py-2.5 text-sm font-semibold transition-colors hover:border-primary/40 hover:text-primary"
        >
          <Users className="size-4" aria-hidden="true" />
          All 33 liability types
          <ArrowRight className="size-4" aria-hidden="true" />
        </Link>
      </section>

      <div className="mt-10">
        <CtaBanner
          title="Not sure which coverage fits? Ask us."
          text="Email us in English with a short description of your activity and we will suggest the right coverage family and limit — free of charge, without obligation."
        />
      </div>
    </div>
  );
}
