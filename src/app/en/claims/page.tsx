import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  ClipboardList,
  FileText,
  Gavel,
} from "lucide-react";
import {
  EnAnswerBlock,
  EnBreadcrumbs,
  EnLegalDisclaimer,
  EnNumberedSteps,
  EnSectionHeading,
} from "@/components/en/en-blocks";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FaqSection } from "@/components/faq-section";
import { CtaBanner } from "@/components/cta-banner";
import { faqJsonLd, howToJsonLd, JsonLd } from "@/lib/seo";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: { absolute: "Liability Claim Process in Iran | English Guide" },
  description:
    "How to file a liability claim in Iran in five steps: notify within five working days, secure evidence, loss adjustment, settlement, dispute routes.",
  alternates: {
    canonical: "/en/claims",
    languages: {
      en: "/en/claims",
      "fa-IR": "/claims",
      "x-default": "/claims",
    },
  },
  openGraph: {
    title: "Liability Claim Process in Iran | English Guide",
    description:
      "How to file a liability claim in Iran in five steps: notify within five working days, secure evidence, loss adjustment, settlement, dispute routes.",
    url: "/en/claims",
    type: "article",
    locale: "en_US",
  },
};

// ── English claims guide — adapted from the authoritative Persian ──
// /claims page (claimGuides seed). Rules: answer block and every step
// and FAQ answer 40-60 words; deadlines follow Insurance Act 1936
// Art. 30 (five-working-day notification) as cited site-wide; no
// invented amounts, statistics or addresses.

const EN_CLAIM_STEPS: { title: string; description: string }[] = [
  {
    title: "Notify the insurer",
    description:
      "Report the incident to the agency as soon as you learn of it, in writing, before the deadline the policy states — usually a maximum of five working days. Describe what happened, where and when, name the injured party and mention every similar prior notice honestly. A lawsuit against you never replaces notifying the insurer.",
  },
  {
    title: "Secure evidence and documents",
    description:
      "Do not alter, repair or reconstruct the scene before the adjuster's visit; emergency rescue measures are allowed and their reasonable costs are recoverable. Photograph the location, collect witness names, keep the official report and gather the policy schedule, identity documents and professional licenses. Preserve every invoice, since the file is judged on documents.",
  },
  {
    title: "Loss adjustment (کارشناس بیمه)",
    description:
      "The insurer appoints a loss adjuster (کارشناس بیمه) who inspects the scene, reviews the documents, hears both sides and consults technical bodies. In bodily-injury claims the adjuster's report is completed by a medical commission or a court judgment fixing the percentage of fault. Full cooperation and accurate statements protect your coverage.",
  },
  {
    title: "Settlement offer and payment",
    description:
      "Once fault and quantum are established, the insurer computes the payable amount: proven loss minus the deductible, capped at the limit of liability. In bodily-injury matters the court's final judgment on the insured's liability binds the insurer. Payment follows the general conditions after the settlement agreement or the enforceable judgment.",
  },
  {
    title: "Dispute routes",
    description:
      "If the claim is rejected or the offered amount seems wrong, first demand the rejection reasons in writing and challenge them with documents. Over the amount of loss, a jointly appointed expert can arbitrate. Ultimately, the insurance disputes commission or a court action under Article 30 of the Insurance Act of 1936 settles the case.",
  },
];

const EN_CLAIM_DOCUMENTS: string[] = [
  "The completed and signed claim notification form",
  "Copy of the policy schedule and the premium payment receipt",
  "Identity documents of the insured and of the claimant",
  "Evidence of the incident: photographs, witness statements, official reports",
  "Medical records, invoices or repair estimates for the claimed loss",
  "Professional documents where applicable: medical license, business permit, contract",
];

const EN_FA_GUIDES: {
  slug: string;
  enHref: string;
  faHref: string;
  title: string;
  text: string;
}[] = [
  {
    slug: "medical",
    enHref: "/en/claims/medical",
    faHref: "/claims/medical",
    title: "Medical malpractice",
    text: "The medical commission route, proving the fault percentage and the bodily-injury file.",
  },
  {
    slug: "employers",
    enHref: "/en/claims/employers",
    faHref: "/claims/employers",
    title: "Employers",
    text: "Work-related injury to workers, the employer's fault-based liability and expected documents.",
  },
  {
    slug: "public",
    enHref: "/en/claims/public",
    faHref: "/claims/public",
    title: "Public & shop liability",
    text: "Injuries to visitors and passers-by on premises, occupier liability and property-damage files.",
  },
  {
    slug: "elevators",
    enHref: "/en/claims/elevators",
    faHref: "/claims/elevators",
    title: "Elevators",
    text: "Passenger injury claims, inspection records and maintenance documentation.",
  },
  {
    slug: "contractors",
    enHref: "/en/claims/contractors",
    faHref: "/claims/contractors",
    title: "Contractors",
    text: "Third-party damage on construction sites and the project documents that support the file.",
  },
  {
    slug: "product-liability",
    enHref: "/en/claims/product-liability",
    faHref: "/claims/product-liability",
    title: "Product liability",
    text: "Injury or damage caused by defective products and the consumer-protection route.",
  },
];

const EN_CLAIM_FAQS: { question: string; answer: string }[] = [
  {
    question: "How fast must I report a liability claim in Iran?",
    answer:
      "As soon as you learn of the incident, and in any case within the period stated in the policy, which is usually a maximum of five working days. If late notification makes the cause or size of the loss harder to establish, the insurer may reduce or reject payment to the extent of the prejudice.",
  },
  {
    question: "Who pays the diyeh in a liability claim?",
    answer:
      "The insured is legally liable for the diyeh, but when bodily-injury cover is included and the insured's liability is proven, Article 30 of the Insurance Act of 1936 obliges the insurer to pay the court-awarded diyeh within the policy limit. The Islamic Penal Code diyat chapter and the judiciary's annual table set the amount.",
  },
  {
    question: "What if the insurer rejects my claim?",
    answer:
      "Ask for the rejection reasons in writing first. If the problem is curable, such as missing documents, supply them and ask the file to be reopened. Over the amount of loss, settlement or a jointly appointed expert is possible. The final route is the insurance disputes commission or a court under Article 30 of the Insurance Act.",
  },
];

export default function EnClaimsPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      <JsonLd
        data={howToJsonLd({
          name: "Liability claim process in Iran",
          description:
            "Five steps from notification to payment, based on Article 30 of the Insurance Act of 1936.",
          steps: EN_CLAIM_STEPS,
          url: "/en/claims",
        })}
      />
      <JsonLd data={faqJsonLd(EN_CLAIM_FAQS)} />

      <EnBreadcrumbs items={[{ name: "Liability Claim Process (EN)", href: "/en/claims" }]} />

      <header className="mt-6">
        <h1 className="text-2xl font-extrabold leading-snug sm:text-3xl">
          The Liability Claim Process in Iran — Step by Step
        </h1>
      </header>

      <div className="mt-6 max-w-3xl">
        <EnAnswerBlock text="A liability claim in Iran moves through five stages: notify the insurer fast — the policy usually sets a maximum of five working days — document the scene, cooperate with the insurer-appointed loss adjuster, receive settlement within the limit of liability, and take disputes to the insurance disputes commission or a court under Article 30 of the Insurance Act of 1936." />
      </div>

      {/* Five steps */}
      <section aria-labelledby="en-claims-steps" className="mt-10 max-w-3xl">
        <h2 id="en-claims-steps" className="sr-only">
          Claim steps
        </h2>
        <EnSectionHeading title="Five steps from notification to payment" icon={Gavel} />
        <EnNumberedSteps steps={EN_CLAIM_STEPS} variant="claim" />
      </section>

      {/* Documents checklist */}
      <section aria-labelledby="en-claims-docs" className="mt-12">
        <h2 id="en-claims-docs" className="sr-only">
          Documents usually required
        </h2>
        <EnSectionHeading title="Documents usually required" icon={FileText} />
        <ul className="grid gap-2.5 sm:grid-cols-2">
          {EN_CLAIM_DOCUMENTS.map((d, i) => (
            <li
              key={i}
              className="flex items-start gap-2 rounded-xl border bg-card p-3.5 text-sm leading-7"
            >
              <ClipboardList className="mt-1 size-4 shrink-0 text-primary" aria-hidden="true" />
              {d}
            </li>
          ))}
        </ul>
        <p className="mt-4 max-w-3xl rounded-xl border bg-secondary/40 p-4 text-sm leading-7 text-muted-foreground">
          The list above is indicative. The loss adjuster confirms the exact list of documents for
          your case after the first review of the file.
        </p>
      </section>

      {/* Specialized claim guides — EN rendering + authoritative Persian original */}
      <section aria-labelledby="en-claims-guides" className="mt-12">
        <h2 id="en-claims-guides" className="sr-only">
          Specialized claim guides
        </h2>
        <EnSectionHeading title="Specialized claim guides — EN renderings, Persian authoritative" icon={ClipboardList} />
        <p className="mb-5 max-w-3xl text-sm leading-7 text-muted-foreground">
          Six specialized claim guides, each available as an English rendering for orientation and as
          the full Persian original. The Persian edition of every guide is the authoritative text.
        </p>
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
          {EN_FA_GUIDES.map((g) => (
            <Card
              key={g.slug}
              className="flex h-full flex-col py-4 transition-all hover:border-primary/40 hover:shadow-sm"
            >
              <CardHeader className="pb-1.5">
                <CardTitle className="text-sm">{g.title}</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-1 flex-col justify-between gap-3">
                <p className="text-xs leading-6 text-muted-foreground">{g.text}</p>
                <div className="flex flex-col items-start gap-1.5">
                  <Link
                    href={g.enHref}
                    className="inline-flex items-center gap-1 text-xs font-bold text-primary"
                  >
                    {g.title} claim guide (EN)
                    <ArrowRight className="size-3.5" aria-hidden="true" />
                  </Link>
                  <Link
                    href={g.faHref}
                    className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-primary"
                  >
                    Persian original (authoritative)
                    <ArrowRight className="size-3.5" aria-hidden="true" />
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* FAQs */}
      <section aria-labelledby="en-claims-faq" className="mx-auto mt-12 max-w-4xl">
        <h2 id="en-claims-faq" className="sr-only">
          Claim FAQs
        </h2>
        <FaqSection faqs={EN_CLAIM_FAQS} title="Liability claims — English FAQs" />
      </section>

      {/* YMYL note */}
      <section className="mt-12 max-w-3xl">
        <EnLegalDisclaimer text="Deadlines and procedures follow the general conditions of each policy and Iranian law, whose authoritative texts are published in Persian. This English guide orients the reader; the Persian edition of this page is authoritative, and in any dispute the official Persian statutory text prevails. It is informational content, not legal or insurance advice." />
      </section>

      {/* Persian twin */}
      <section className="mt-10 max-w-3xl">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Persian twin page (authoritative)</CardTitle>
          </CardHeader>
          <CardContent className="text-sm leading-7 text-muted-foreground">
            The complete Persian edition of this guide, with six steps, deadlines table and case
            scenarios:{" "}
            <Link href="/claims" className="font-semibold text-primary hover:underline">
              مراحل دریافت خسارت بیمه مسئولیت (صفحه فارسی)
            </Link>
          </CardContent>
        </Card>
      </section>

      <div className="mt-10">
        <CtaBanner
          title="Need to notify a claim or review your coverage?"
          text="English-speaking visitors can email us and a consultant will respond in English, usually within one business day. The claim form and quotation form are in Persian."
        />
      </div>
    </div>
  );
}
