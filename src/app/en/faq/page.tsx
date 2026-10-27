import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  ClipboardCheck,
  FileText,
  Gavel,
  Wallet,
} from "lucide-react";
import {
  EnAnswerBlock,
  EnBreadcrumbs,
  EnSectionHeading,
} from "@/components/en/en-blocks";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FaqSection } from "@/components/faq-section";
import { CtaBanner } from "@/components/cta-banner";
import { faqJsonLd, JsonLd } from "@/lib/seo";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: { absolute: "Liability Insurance FAQs in Iran | English Answers" },
  description:
    "Clear English answers to frequent liability insurance questions in Iran: coverage, exclusions, pricing, limits, claims procedure and the documents required.",
  alternates: {
    canonical: "/en/faq",
    languages: {
      en: "/en/faq",
      "fa-IR": "/faq",
      "x-default": "/faq",
    },
  },
  openGraph: {
    title: "Liability Insurance FAQs in Iran | English Answers",
    description:
      "Clear English answers to frequent liability insurance questions in Iran: coverage, exclusions, pricing, limits, claims procedure and the documents required.",
    url: "/en/faq",
    type: "article",
    locale: "en_US",
  },
};

// ── English FAQ data ────────────────────────────────────────────────
// Translated and adapted from the general Persian FAQ dataset (SQLite,
// /faq — the authoritative page). Rules: every answer 40-60 words and
// self-contained; no invented premiums — "issued upon official quotation";
// diyeh referenced generically against the official annual tables.

interface EnFaqItem {
  question: string;
  answer: string;
}

interface EnFaqGroup {
  id: string;
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  faqs: EnFaqItem[];
}

const EN_FAQ_GROUPS: EnFaqGroup[] = [
  {
    id: "basics",
    title: "Basics of liability insurance",
    icon: BookOpen,
    faqs: [
      {
        question: "What is liability insurance in Iran and what does it pay for?",
        answer:
          "Liability insurance is a contract in which the insurer pays the bodily injury, property damage and legal-defense costs that the insured is legally liable to cause to third parties, up to the policy limit. The legal basis is the Civil Liability Act of 1960. Losses to the insured's own person or property are never covered.",
      },
      {
        question: "What is the difference between contractual and tort liability?",
        answer:
          "Contractual liability arises from breaching a promise written into an agreement, such as a contractor missing a delivery deadline. Tort or quasi-tortious liability exists independently of any contract and is based on law, such as injuring a passer-by with falling materials. Liability insurance mainly covers tort liability; contractual coverage requires an express agreement in the policy.",
      },
      {
        question: "How is liability insurance different from accident insurance?",
        answer:
          "Accident insurance pays the insured for their own bodily injury regardless of who was at fault. Liability insurance pays damage the insured causes to other people based on their legal responsibility. An employer may hold both: accident cover for workers and employer liability insurance for their own fault-based obligations. The two policies are complementary, not substitutes.",
      },
    ],
  },
  {
    id: "coverage",
    title: "Coverage & exclusions",
    icon: ClipboardCheck,
    faqs: [
      {
        question: "What does a liability policy in Iran not cover?",
        answer:
          "The standard exclusions are intentional acts or knowing violations by the insured, criminal fines and penalties, damage to the insured's own property or employees unless expressly endorsed, activities outside the profession or scope stated in the policy, and losses involving alcohol or drugs. The full list is set out in the general conditions, which must be read before issuance.",
      },
      {
        question: "Does liability insurance cover moral (non-economic) damages?",
        answer:
          "Under Article 1 of the Civil Liability Act, moral damage such as harm to reputation can be claimed, and courts sometimes award it. Whether the policy pays depends on the general conditions and endorsements: if moral-damage cover is not expressly included or added by endorsement, the insurer has no obligation to pay such awards.",
      },
      {
        question: "Are legal defense costs covered by the policy?",
        answer:
          "Yes. Besides the main compensation, the insurer also pays the costs of defending the insured in liability proceedings — attorney fees, court and expert expenses — within the limit the policy conditions set for this heading. This matters even for unfounded lawsuits, because defending yourself is costly. Some policies assign legal-defense costs a separate sub-limit.",
      },
    ],
  },
  {
    id: "pricing",
    title: "Pricing & limits",
    icon: Wallet,
    faqs: [
      {
        question: "How is the premium of a liability policy calculated?",
        answer:
          "The premium is set from the approved rate for each line of business and risk, the chosen limit of liability, the insured's claims history, the declared scope of activity and any endorsements. Higher-bodily-injury occupations carry heavier rates. No universal figure exists: the final premium is issued upon official quotation by Bimeh Iran based on your declared risk.",
      },
      {
        question: "How should I choose the limit of liability?",
        answer:
          "The accepted starting point is the full diyeh of the year of occurrence, because the heaviest realistic loss is usually the diyeh for death. Riskier professions and projects with several potential claimants choose a multiple of that figure. A limit below the full diyeh leaves the shortfall on the insured, while an excessive limit raises the premium needlessly.",
      },
      {
        question: "Why do two similar businesses receive different liability rates?",
        answer:
          "The rate is not a function of the business title alone. The chosen limit, previous claims files, staff size and type, safety equipment, the location of the premises and any endorsements all feed the underwriter's assessment of each applicant, so two similar businesses can legitimately receive different quotations. The only valid comparison is official quotations with identical declarations.",
      },
    ],
  },
  {
    id: "claims",
    title: "Claims & disputes",
    icon: Gavel,
    faqs: [
      {
        question: "How quickly must a liability incident be reported?",
        answer:
          "The insured must notify the insurer at the first opportunity and within the period stated in the policy, which is usually a maximum of five working days. If late notification makes it harder to establish the cause or the size of the loss, payment can be reduced or rejected, so reporting promptly is advisable even for unclear incidents.",
      },
      {
        question: "What can I do if the insurer rejects my claim?",
        answer:
          "First obtain the rejection reason in writing. If the problem is curable, such as missing documents, supply them. Over the amount of loss, settlement or referral to a jointly appointed expert is possible. Ultimately, the insurance disputes commission or a court action under Article 30 of the Insurance Act of 1936 is the legal route.",
      },
      {
        question: "What happens if the damage exceeds the policy limit?",
        answer:
          "The insurer pays only within the limit of liability stated in the policy, and any remaining amount stays with the insured, whom the injured party can pursue directly. The deductible, if any, is also borne by the insured. This is why the recommended minimum limit equals the full diyeh of the year of the incident.",
      },
    ],
  },
  {
    id: "buying",
    title: "Buying & documents",
    icon: FileText,
    faqs: [
      {
        question: "Which documents are needed to issue a liability policy?",
        answer:
          "Issuance requires a completed risk declaration form, evidence of the activity such as a business license or professional permit, identification documents, and the expiring policy if you are renewing. Project policies additionally need the contract or employer's specifications. The underwriter confirms the exact list for your risk during the quotation process before the premium is finalized.",
      },
      {
        question: "Should I renew my policy or buy a new one?",
        answer:
          "Renewal continues the same policy into a new period while preserving your claims record and applying any no-claim discount; the limit and endorsements can still be revised at renewal. Buying anew creates a fresh contract, and any gap between the two policies can erase your history and discount. Renewing before expiry is strongly recommended.",
      },
    ],
  },
];

const ALL_EN_FAQS: EnFaqItem[] = EN_FAQ_GROUPS.flatMap((g) => g.faqs);

const EN_QUICK_LINKS = [
  {
    href: "/en/liability",
    label: "All 33 liability types",
    text: "Browse the full English hub of every product guide.",
  },
  {
    href: "/en/price",
    label: "How pricing works",
    text: "The eight rate drivers and the four quotation steps explained.",
  },
  {
    href: "/en/compare",
    label: "Compare coverages",
    text: "All 33 products compared in one table, by family.",
  },
  {
    href: "/en/liability/commercial/employers",
    label: "Employers liability",
    text: "The policy most businesses with staff start with.",
  },
];

export default function EnFaqPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      <JsonLd data={faqJsonLd(ALL_EN_FAQS)} />

      <EnBreadcrumbs items={[{ name: "Liability Insurance FAQs", href: "/en/faq" }]} />

      <header className="mt-6">
        <h1 className="text-2xl font-extrabold leading-snug sm:text-3xl">
          Liability Insurance in Iran — Frequently Asked Questions
        </h1>
      </header>

      <div className="mt-6 max-w-3xl">
        <EnAnswerBlock text="The answers below are based on the Civil Liability Act of 1960, the Insurance Act of 1936 (notably Articles 12 and 30), the Islamic Penal Code diyat chapter, and the general conditions of Bimeh Iran liability policies. They adapt the questions most frequently asked on the authoritative Persian edition; each answer is written to stand alone." />
      </div>

      {/* Grouped FAQ sections */}
      <div className="mt-10 flex max-w-4xl flex-col gap-12">
        {EN_FAQ_GROUPS.map((g) => (
          <section key={g.id} id={g.id} className="scroll-mt-28" aria-label={g.title}>
            <EnSectionHeading title={g.title} icon={g.icon} />
            <FaqSection faqs={g.faqs} title="" />
          </section>
        ))}
      </div>

      {/* Key English pages */}
      <section aria-labelledby="en-faq-links" className="mt-14">
        <h2 id="en-faq-links" className="sr-only">
          Key English guides
        </h2>
        <EnSectionHeading title="Continue in English" />
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {EN_QUICK_LINKS.map((l) => (
            <Card key={l.href}>
              <CardHeader className="pb-2">
                <CardTitle className="text-[15px] leading-6">{l.label}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-[13px] leading-6 text-muted-foreground">{l.text}</p>
                <Link
                  href={l.href}
                  className="mt-3 inline-flex items-center gap-1 text-sm font-bold text-primary hover:underline"
                >
                  Open
                  <ArrowRight className="size-3.5" aria-hidden="true" />
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Persian twin */}
      <section className="mt-10 max-w-3xl">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Persian twin page (authoritative)</CardTitle>
          </CardHeader>
          <CardContent className="text-sm leading-7 text-muted-foreground">
            The complete Persian edition of this page, with all general questions and answers:{" "}
            <Link href="/faq" className="font-semibold text-primary hover:underline">
              سوالات متداول بیمه مسئولیت (صفحه فارسی)
            </Link>
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
