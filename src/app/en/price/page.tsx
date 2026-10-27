import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Calculator, FileSearch, Scale, Wallet } from "lucide-react";
import {
  EnAnswerBlock,
  EnBreadcrumbs,
  EnNumberedSteps,
  EnSectionHeading,
} from "@/components/en/en-blocks";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { FaqSection } from "@/components/faq-section";
import { CtaBanner } from "@/components/cta-banner";
import { enPrice, enProductPages, enDisclaimers } from "@/lib/en/content";
import { faqJsonLd, howToJsonLd, JsonLd } from "@/lib/seo";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: { absolute: enPrice.metaTitle },
  description: enPrice.metaDescription,
  alternates: {
    canonical: "/en/price",
    languages: {
      en: "/en/price",
      "fa-IR": "/price",
      "x-default": "/price",
    },
  },
  openGraph: {
    title: enPrice.metaTitle,
    description: enPrice.metaDescription,
    url: "/en/price",
    type: "article",
    locale: "en_US",
  },
};

// Rate drivers per sample product (grounded in the Persian product pages).
const SAMPLES: { slug: string; category: string; driver: string }[] = [
  {
    slug: "medical-doctors",
    category: "professional",
    driver: "Specialty, surgical vs outpatient practice, limit, claims history",
  },
  {
    slug: "dentists",
    category: "professional",
    driver: "Clinical procedures (anesthesia, implants), number of chairs, limit",
  },
  {
    slug: "lawyers",
    category: "professional",
    driver: "Practice area, court levels represented, case volume, limit",
  },
  {
    slug: "engineers",
    category: "professional",
    driver: "Discipline, design vs supervision role, project value, ten-year warranty exposure",
  },
  {
    slug: "employers",
    category: "commercial",
    driver: "Number of workers, workplace hazard class, claims record",
  },
  {
    slug: "public-liability",
    category: "commercial",
    driver: "Visitor footfall, premises area, activity type, safety equipment",
  },
  {
    slug: "product-liability",
    category: "commercial",
    driver: "Product hazard class, production volume, distribution scope",
  },
  {
    slug: "elevators",
    category: "commercial",
    driver: "Number of units, maintenance contract, building usage type",
  },
];

export default function EnPricePage() {
  const byKey = new Map(enProductPages.map((p) => [`${p.category}/${p.slug}`, p]));
  const samples = SAMPLES.map((s) => ({
    ...s,
    page: byKey.get(`${s.category}/${s.slug}`),
  })).filter((s) => s.page);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      <JsonLd
        data={howToJsonLd({
          name: "Four steps to an official liability insurance quotation in Iran",
          description:
            "From submitting the declaration form to receiving the policy with the approved Bimeh Iran rate.",
          steps: enPrice.steps,
          url: "/en/price",
        })}
      />
      <JsonLd data={faqJsonLd(enPrice.faqs)} />

      <EnBreadcrumbs items={[{ name: "How Pricing Works", href: "/en/price" }]} />

      <header className="mt-6">
        <h1 className="text-2xl font-extrabold leading-snug sm:text-3xl">{enPrice.h1}</h1>
      </header>

      <div className="mt-6 max-w-3xl">
        <EnAnswerBlock text={enPrice.answerBlock} />
      </div>

      {/* Factors */}
      <section aria-labelledby="en-price-factors" className="mt-10">
        <h2 id="en-price-factors" className="sr-only">
          {enPrice.factorsHeading}
        </h2>
        <EnSectionHeading title={enPrice.factorsHeading} icon={Calculator} />
        <div className="overflow-x-auto rounded-2xl border nice-scroll">
          <Table>
            <TableHeader>
              <TableRow className="bg-accent/60">
                <TableHead className="text-start whitespace-nowrap">Factor</TableHead>
                <TableHead className="text-start whitespace-nowrap">Effect on rate</TableHead>
                <TableHead className="text-start">Explanation</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {enPrice.factors.map((f) => (
                <TableRow key={f.factor}>
                  <TableCell className="align-top font-bold whitespace-nowrap">{f.factor}</TableCell>
                  <TableCell className="align-top text-sm whitespace-nowrap text-primary">
                    {f.effect}
                  </TableCell>
                  <TableCell className="align-top text-sm leading-7 text-muted-foreground">
                    {f.text}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </section>

      {/* Samples */}
      <section aria-labelledby="en-price-samples" className="mt-12">
        <h2 id="en-price-samples" className="sr-only">
          {enPrice.samplesHeading}
        </h2>
        <EnSectionHeading title={enPrice.samplesHeading} icon={Wallet} />
        <p className="mb-4 max-w-3xl text-sm leading-7 text-muted-foreground">{enPrice.samplesHint}</p>
        <div className="overflow-x-auto rounded-2xl border nice-scroll">
          <Table>
            <TableHeader>
              <TableRow className="bg-accent/60">
                <TableHead className="text-start">Coverage</TableHead>
                <TableHead className="text-start">What drives the rate</TableHead>
                <TableHead className="text-start whitespace-nowrap">Full guide</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {samples.map((s) => (
                <TableRow key={s.slug}>
                  <TableCell className="font-bold">
                    <Link href={`/en/liability/${s.category}/${s.slug}`} className="hover:text-primary">
                      {s.page?.nameEn ?? s.slug}
                    </Link>
                  </TableCell>
                  <TableCell className="text-sm leading-7 text-muted-foreground">{s.driver}</TableCell>
                  <TableCell>
                    <Link
                      href={`/en/liability/${s.category}/${s.slug}`}
                      className="inline-flex items-center gap-1 text-sm font-bold text-primary hover:underline"
                    >
                      Guide
                      <ArrowRight className="size-3.5" aria-hidden="true" />
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <p className="mt-3 max-w-3xl text-xs leading-6 text-muted-foreground">{enPrice.samplesNote}</p>
      </section>

      {/* Steps */}
      <section aria-labelledby="en-price-steps" className="mt-12 max-w-3xl">
        <h2 id="en-price-steps" className="sr-only">
          {enPrice.stepsHeading}
        </h2>
        <EnSectionHeading title={enPrice.stepsHeading} icon={FileSearch} />
        <EnNumberedSteps steps={enPrice.steps} variant="buy" />
        <p className="mt-4 rounded-xl border bg-secondary/40 p-4 text-sm leading-7 text-muted-foreground">
          {enDisclaimers.quoteNote}
        </p>
      </section>

      {/* FAQ */}
      <section className="mx-auto mt-12 max-w-4xl">
        <FaqSection faqs={enPrice.faqs} title="Liability insurance pricing — FAQs" />
      </section>

      {/* Cross links */}
      <section className="mt-12 grid gap-3 sm:grid-cols-2">
        <Link
          href="/en/compare"
          className="inline-flex items-center justify-between gap-2 rounded-full border bg-card px-5 py-2.5 text-sm font-semibold transition-colors hover:border-primary/40 hover:text-primary"
        >
          <span className="inline-flex items-center gap-2">
            <Scale className="size-4" aria-hidden="true" />
            Compare all 33 coverages
          </span>
          <ArrowRight className="size-4" aria-hidden="true" />
        </Link>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Persian edition</CardTitle>
          </CardHeader>
          <CardContent className="text-sm leading-7 text-muted-foreground">
            The Persian page{" "}
            <Link href="/price" className="font-semibold text-primary hover:underline">
              قیمت بیمه مسئولیت
            </Link>{" "}
            also lists estimated starting ranges in rial terms.
          </CardContent>
        </Card>
      </section>

      <div className="mt-10">
        <CtaBanner
          title="Request an official Bimeh Iran quotation"
          text="The quotation form is in Persian — English-speaking visitors can also email us and a consultant will respond in English, usually within one business day."
        />
      </div>
    </div>
  );
}
