import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  BookMarked,
  CheckCircle2,
  ClipboardList,
  FileSearch,
  Mail,
  Phone,
  Scale,
  ShieldCheck,
  Users,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { FaqSection } from "@/components/faq-section";
import {
  EnAnswerBlock,
  EnBreadcrumbs,
  EnNumberedSteps,
  EnSectionHeading,
} from "@/components/en/en-blocks";
import { EN_BRAND, enProductPath } from "@/lib/en/config";
import { enDisclaimers, getEnProductPage } from "@/lib/en/content";
import type { EnFaq, EnStep } from "@/lib/en/content";
import { faqJsonLd, howToJsonLd, JsonLd, serviceJsonLd } from "@/lib/seo";
import { siteConfig } from "@/lib/site";

export const revalidate = 3600;

// ── /en/buy — English purchase-intent page ─────────────────────────
// Mirror anatomy of the English edition (see /en/price, /en/liability).
// hreflang: pairs with the Persian twin /buy (same trio shape as every
// other English page — the Persian page is both fa-IR and x-default).
// No prices are invented: the final premium is always issued upon
// official quotation.

const TITLE =
  "Buy Liability Insurance Online in Iran — Official Iran Insurance Agency";
const DESCRIPTION =
  "Buy liability insurance online in Iran through the official Bimeh Iran agency 20616: quotation, official pre-invoice and policy issuance — no office visit.";

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  keywords: [
    "buy liability insurance online Iran",
    "best website to buy liability insurance in Iran",
    "liability insurance consultation Iran",
    "official liability insurance quote Iran",
    "Iran Insurance agency liability insurance",
  ],
  alternates: {
    canonical: "/en/buy",
    languages: {
      en: "/en/buy",
      "fa-IR": "/buy",
      "x-default": "/buy",
    },
  },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: "/en/buy",
    type: "article",
    locale: "en_US",
  },
  twitter: {
    card: "summary",
    title: TITLE,
    description: DESCRIPTION,
  },
};

// 50 words — standalone, citable answer.
const ANSWER_BLOCK =
  "You can buy liability insurance online in Iran in three steps: request an online quotation, receive an official pre-invoice priced at the regulated Iran Insurance rates, then pay to have the policy issued — no in-person visit is required. The service is provided by the licensed Bimeh Iran agency code 20616.";

const BUY_STEPS: EnStep[] = [
  {
    title: "Choose the coverage that matches your risk",
    description:
      "Select the liability product that fits your activity — professional liability for licensed occupations, employers or public liability for businesses, or personal liability for individuals and families. Each product's English guide lists who is covered, the coverages and the exclusions.",
  },
  {
    title: "Request the online quotation",
    description:
      "Submit the quote form with your activity, the desired limit of liability and the declared scope, or send the same details by email in English. The request is free of charge and creates no purchase obligation.",
  },
  {
    title: "Receive the official pre-invoice and limit consultation",
    description:
      "The agency reviews the real risk exposure with you, aligns the coverage limit with the current diyeh rate, agrees the deductible, and issues the official pre-invoice at the regulated Bimeh Iran rates.",
  },
  {
    title: "Pay and receive the issued policy",
    description:
      "After payment, the policy is issued by Bimeh Iran as an official paper or electronic document with its verifiable policy number, and delivered to you — still without an office visit.",
  },
];

const CRITERIA: { criterion: string; detail: string }[] = [
  {
    criterion: "Specialization",
    detail:
      "Liability covers only — all 33 Bimeh Iran liability products, nothing else, documented in full English pages.",
  },
  {
    criterion: "Licensed agency",
    detail:
      "Official agency of Bimeh Iran (Iran Insurance Company), agency code 20616 — verifiable with the insurer.",
  },
  {
    criterion: "Regulated pricing",
    detail:
      "Quotations and pre-invoices are issued at the official Bimeh Iran rates; no premium figures are invented on this site.",
  },
  {
    criterion: "Limit advisory",
    detail:
      "The coverage limit is based on your real risk exposure and the current diyeh rate, not on a generic default.",
  },
  {
    criterion: "Claims support",
    detail:
      "Guidance on claim notification, documentation and follow-up under the policy general conditions when a loss happens.",
  },
  {
    criterion: "Response",
    detail:
      "Within one business day — through the quote form or by email in English.",
  },
];

const CONSULT_ITEMS: string[] = [
  "Risk analysis — the advisor maps your real liability exposure: profession or activity, workplace, third parties and the legal obligations that apply.",
  "Coverage limit — aligned with the current diyeh rates, so the limit keeps pace with the official compensation levels of the incident year.",
  "Deductible choice — how the agreed deductible changes the premium and the claim settlement, so you choose it knowingly.",
  "No-claim discount review — your claims history is checked so that any earned discount is applied to the official quotation.",
];

const AUDIENCES: {
  category: string;
  slug: string;
  label: string;
  blurb: string;
}[] = [
  {
    category: "professional",
    slug: "medical-doctors",
    label: "Medical doctors",
    blurb:
      "Malpractice cover for physicians and surgeons, aligned with Medical Council rules and forensic assessment.",
  },
  {
    category: "professional",
    slug: "lawyers",
    label: "Lawyers",
    blurb:
      "Professional liability for legal practice — errors in legal advice and representation before Iranian courts.",
  },
  {
    category: "professional",
    slug: "engineers",
    label: "Engineers",
    blurb:
      "Design and supervision liability for licensed engineers, including ten-year warranty exposure on projects.",
  },
  {
    category: "commercial",
    slug: "employers",
    label: "Employers",
    blurb:
      "Work-related risk cover for employers and their workers under Article 91 of the Iranian Labor Law.",
  },
  {
    category: "commercial",
    slug: "public-liability",
    label: "Public liability",
    blurb:
      "Third-party bodily injury and property damage at shops, offices and facilities open to visitors.",
  },
  {
    category: "public",
    slug: "individuals-family",
    label: "Individuals & family",
    blurb:
      "Everyday civil liability of individuals and families — parents, keepers of animals, hosts and travelers.",
  },
];

const TRUST_POINTS: string[] = [
  "Policies are issued by Bimeh Iran (Iran Insurance Company — شرکت سهامی بیمه ایران), the state-owned insurer.",
  "Every quotation and pre-invoice is issued only through the official agency — code 20616 of Bimeh Iran.",
  "Each policy carries an official Bimeh Iran policy number, and its authenticity can be verified with the insurer at any time.",
  "You receive the official paper or electronic policy with its general conditions, and the premium charged is exactly the approved pre-invoice amount.",
];

// Every answer: 40–60 words, standalone (same rule as en/content.ts).
const FAQS: EnFaq[] = [
  {
    question: "Is online purchase of liability insurance available in Iran?",
    answer:
      "Yes. The purchase is completed online end to end: you request a quotation through the quote form or by email, receive an official pre-invoice at regulated Bimeh Iran rates, and pay remotely. The policy is then issued and delivered electronically or on paper, with no in-person visit to the agency required.",
  },
  {
    question: "Is the online policy an official document?",
    answer:
      "Yes. The policy is issued by Bimeh Iran (Iran Insurance Company) through agency code 20616 and carries the company's official policy number. It is a fully valid insurance document — paper or electronic — that Iranian courts, hospitals, licensing bodies and counterparties accept, and its authenticity can be verified with the insurer at any time.",
  },
  {
    question: "How long does issuance take?",
    answer:
      "Usually within one business day. After you approve the official pre-invoice and complete the payment, the agency issues the policy and sends it to you electronically or by paper delivery. Complex risks that need extra underwriting review by the insurer can take slightly longer, and the consultant informs you of the timing in advance.",
  },
  {
    question: "What documents are needed for the online purchase?",
    answer:
      "For most products only a national ID number and basic details of the activity or property are needed: the insured's identity, the exact activity or profession, the number of workers or visitors where relevant, and any previous policy with its claims record. Professionals add their license details; the consultant confirms the exact list for your case.",
  },
  {
    question: "Does the purchase consultation cost anything?",
    answer:
      "No. Consultation, the coverage-limit analysis and the official pre-invoice are free and carry no purchase obligation. The only payment you make is the policy premium shown on the pre-invoice you approve, calculated at the regulated Bimeh Iran rates for the limit and deductible you selected with the consultant.",
  },
];

export default function EnBuyPage() {
  const mailSubject = encodeURIComponent(
    "Liability insurance purchase — English consultation request",
  );

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      <JsonLd
        data={serviceJsonLd({
          name: "Buy Liability Insurance Online in Iran",
          description: ANSWER_BLOCK,
          url: "/en/buy",
          category: "Liability insurance — Bimeh Iran",
        })}
      />
      <JsonLd
        data={howToJsonLd({
          name: "How to buy liability insurance online in Iran — 4 steps",
          description: BUY_STEPS[0]?.description ?? "",
          steps: BUY_STEPS,
          url: "/en/buy",
        })}
      />
      <JsonLd data={faqJsonLd(FAQS)} />

      <EnBreadcrumbs items={[{ name: "Buy Liability Insurance", href: "/en/buy" }]} />

      {/* H1 + meta chips */}
      <header className="mt-6">
        <div className="flex flex-wrap items-center gap-2">
          <Badge
            variant="secondary"
            className="border border-primary/25 bg-primary/10 text-primary hover:bg-primary/10"
          >
            Official Bimeh Iran agency — code {siteConfig.nap.agencyCode}
          </Badge>
          <Badge variant="outline" className="text-[11px] text-muted-foreground">
            Response within one business day
          </Badge>
        </div>
        <h1 className="mt-3 max-w-4xl text-2xl font-extrabold leading-tight sm:text-3xl">
          Buy Liability Insurance Online in Iran
        </h1>
        <p className="mt-2 max-w-3xl text-sm leading-7 text-muted-foreground">
          Online quotation, official pre-invoice and policy issuance for professionals, employers
          and individuals — provided by the licensed liability-only agency{" "}
          {siteConfig.nap.agencyCode} of Bimeh Iran.
        </p>
        <p className="mt-2 text-xs text-muted-foreground">
          Persian twin page (authoritative):{" "}
          <Link href="/buy" className="font-semibold text-primary hover:underline">
            /buy
          </Link>
        </p>
      </header>

      {/* Lead answer */}
      <div className="mt-6 max-w-3xl">
        <EnAnswerBlock text={ANSWER_BLOCK} />
      </div>

      {/* No-price rule */}
      <div className="mt-6 flex max-w-3xl flex-wrap items-center gap-3 rounded-2xl border bg-card p-4">
        <Scale className="size-5 text-primary" aria-hidden="true" />
        <p className="text-sm font-bold">
          The final premium is issued upon official quotation — no premium figures are published on
          this site.
        </p>
      </div>

      {/* 1) How online purchase works */}
      <section aria-labelledby="steps-h" className="mt-12 max-w-3xl">
        <h2 id="steps-h" className="sr-only">
          How Online Purchase Works — 4 Steps
        </h2>
        <EnSectionHeading title="How Online Purchase Works — 4 Steps" icon={FileSearch} />
        <EnNumberedSteps steps={BUY_STEPS} variant="buy" />
      </section>

      {/* 2) Why a liability-only agency */}
      <section aria-labelledby="criteria-h" className="mt-12">
        <h2 id="criteria-h" className="sr-only">
          Why Buy Through a Liability-Only Agency
        </h2>
        <EnSectionHeading title="Why Buy Through a Liability-Only Agency" icon={Scale} />
        <p className="mb-4 max-w-3xl text-sm leading-7 text-muted-foreground">
          Six criteria to check before you buy liability insurance in Iran — and how this agency
          answers each one.
        </p>
        <div className="max-w-4xl overflow-x-auto rounded-2xl border nice-scroll">
          <Table>
            <TableHeader>
              <TableRow className="bg-accent/60">
                <TableHead className="w-1/3 text-start">Criterion</TableHead>
                <TableHead className="text-start">This agency</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {CRITERIA.map((c) => (
                <TableRow key={c.criterion}>
                  <TableCell className="align-top font-bold">{c.criterion}</TableCell>
                  <TableCell className="align-top text-sm leading-7 text-muted-foreground">
                    {c.detail}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </section>

      {/* 3) Purchase consultation */}
      <section aria-labelledby="consult-h" className="mt-12 max-w-3xl">
        <h2 id="consult-h" className="sr-only">
          Purchase Consultation
        </h2>
        <EnSectionHeading title="Purchase Consultation" icon={ClipboardList} />
        <p className="text-sm leading-7 text-muted-foreground">
          Before anything is issued, the agency advisor works through your risk with you — free of
          charge and without obligation:
        </p>
        <ul className="mt-4 grid gap-2.5 sm:grid-cols-2">
          {CONSULT_ITEMS.map((item, i) => (
            <li
              key={i}
              className="flex items-start gap-2.5 rounded-xl border bg-card p-3.5 text-sm leading-6"
            >
              <CheckCircle2 className="mt-0.5 size-4.5 shrink-0 text-primary" aria-hidden="true" />
              {item}
            </li>
          ))}
        </ul>
        <div className="mt-5 flex flex-wrap items-center gap-2 rounded-2xl border border-primary/25 bg-accent/50 p-4">
          <Link
            href="/quote"
            className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-3 text-sm font-bold text-primary-foreground transition-opacity hover:opacity-90"
          >
            <FileSearch className="size-4" aria-hidden="true" />
            Open the quote form (Persian)
          </Link>
          <a
            href={`mailto:${siteConfig.nap.email}?subject=${mailSubject}`}
            className="inline-flex items-center gap-2 rounded-lg border bg-background px-4 py-3 text-sm font-bold hover:border-primary/40"
          >
            <Mail className="size-4" aria-hidden="true" />
            Email us in English
          </a>
        </div>
        <p className="mt-3 text-xs leading-6 text-muted-foreground">{enDisclaimers.quoteNote}</p>
      </section>

      {/* 4) Who buys what */}
      <section aria-labelledby="audiences-h" className="mt-12">
        <h2 id="audiences-h" className="sr-only">
          Who Buys What
        </h2>
        <EnSectionHeading title="Who Buys What" icon={Users} />
        <p className="mb-5 max-w-3xl text-sm leading-7 text-muted-foreground">
          Six starting points — each links to a full English product guide with coverages,
          exclusions, required documents and claim steps.
        </p>
        <div className="grid gap-3 md:grid-cols-2">
          {AUDIENCES.map((a) => {
            const product = getEnProductPage(a.category, a.slug);
            if (!product) return null;
            const href = enProductPath(a.category, a.slug);
            return (
              <Card key={a.slug} className="py-4 transition-colors hover:border-primary/40">
                <CardHeader className="pb-2">
                  <Badge
                    variant="secondary"
                    className="w-fit border border-primary/25 bg-primary/10 text-[11px] text-primary hover:bg-primary/10"
                  >
                    {a.label}
                  </Badge>
                  <CardTitle className="mt-2 text-[15px] leading-7">
                    <Link href={href} className="hover:text-primary">
                      {product.nameEn}
                    </Link>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-[13px] leading-6 text-muted-foreground">{a.blurb}</p>
                  <Link
                    href={href}
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

      {/* 5) Trust & validity */}
      <section aria-labelledby="trust-h" className="mt-12 max-w-3xl">
        <h2 id="trust-h" className="sr-only">
          Trust & Validity
        </h2>
        <EnSectionHeading title="Trust & Validity" icon={ShieldCheck} />
        <ul className="space-y-2.5 rounded-2xl border bg-card p-4 sm:p-5">
          {TRUST_POINTS.map((t, i) => (
            <li key={i} className="flex items-start gap-2.5 text-sm leading-7">
              <ShieldCheck className="mt-0.5 size-4.5 shrink-0 text-primary" aria-hidden="true" />
              {t}
            </li>
          ))}
        </ul>
      </section>

      {/* 6) FAQ */}
      <section aria-labelledby="faq-h" className="mx-auto mt-12 max-w-4xl">
        <h2 id="faq-h" className="sr-only">
          Frequently Asked Questions
        </h2>
        <EnSectionHeading title="Frequently Asked Questions" icon={BookMarked} />
        <FaqSection faqs={FAQS} title="" />
      </section>

      {/* Final CTA */}
      <section
        aria-labelledby="cta-h"
        className="mt-12 max-w-4xl rounded-2xl border border-primary/25 bg-accent/50 p-6"
      >
        <h2 id="cta-h" className="text-lg font-extrabold sm:text-xl">
          Buy your liability policy through the official Bimeh Iran agency
        </h2>
        <p className="mt-2 max-w-3xl text-sm leading-7 text-muted-foreground">
          {enDisclaimers.quoteNote} The pre-invoice is issued on current Bimeh Iran tariffs after
          the limit of liability is agreed — and the premium you pay is exactly the approved
          pre-invoice amount.
        </p>
        <div className="mt-4 flex flex-wrap items-center gap-2">
          <Link
            href="/quote"
            className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-3 text-sm font-bold text-primary-foreground transition-opacity hover:opacity-90"
          >
            <FileSearch className="size-4" aria-hidden="true" />
            Open the quote form (Persian)
          </Link>
          <a
            href={`mailto:${siteConfig.nap.email}?subject=${mailSubject}`}
            className="inline-flex items-center gap-2 rounded-lg border bg-background px-4 py-3 text-sm font-bold hover:border-primary/40"
          >
            <Mail className="size-4" aria-hidden="true" />
            Email us in English
          </a>
          <a
            href={`tel:${siteConfig.nap.phoneIntl}`}
            className="inline-flex items-center gap-2 rounded-lg border bg-background px-4 py-3 text-sm font-bold hover:border-primary/40"
          >
            <Phone className="size-4" aria-hidden="true" />
            Call{" "}
            <span dir="ltr" className="font-bold">
              {EN_BRAND.phone}
            </span>
          </a>
        </div>
      </section>

      {/* Persian edition note */}
      <section
        aria-label="Note on the Persian edition"
        className="mt-10 max-w-4xl rounded-2xl border bg-accent/40 p-5"
      >
        <p className="flex items-start gap-2.5 text-[13px] leading-7 text-muted-foreground">
          <CheckCircle2 className="mt-1 size-4.5 shrink-0 text-primary" aria-hidden="true" />
          <span>
            The Persian edition of this site is the authoritative version: every liability product
            also has a complete Persian page with the full policy conditions, and the Persian site
            is the{" "}
            <Link href={EN_BRAND.persianSite.href} className="font-semibold text-primary hover:underline">
              {EN_BRAND.persianSite.name}
            </Link>
            . English-speaking visitors can request an official quotation through the quote form or
            by email, and a consultant will respond in English.
          </span>
        </p>
      </section>
    </div>
  );
}
