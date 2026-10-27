import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BookOpen } from "lucide-react";
import {
  EnAnswerBlock,
  EnBreadcrumbs,
  EnSectionHeading,
} from "@/components/en/en-blocks";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CtaBanner } from "@/components/cta-banner";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: { absolute: "Liability Insurance Glossary in English | 12 Key Terms" },
  description:
    "English definitions of twelve key liability-insurance terms — diyeh, limit of liability, deductible, endorsement — each linked to its full Persian definition.",
  alternates: {
    canonical: "/en/glossary",
    languages: {
      en: "/en/glossary",
      "fa-IR": "/glossary",
      "x-default": "/glossary",
    },
  },
  openGraph: {
    title: "Liability Insurance Glossary in English | 12 Key Terms",
    description:
      "English definitions of twelve key liability-insurance terms — diyeh, limit of liability, deductible, endorsement — each linked to its full Persian definition.",
    url: "/en/glossary",
    type: "article",
    locale: "en_US",
  },
};

// ── English glossary — 12 key liability-insurance terms ────────────
// Adapted from the authoritative Persian glossary (/glossary, SQLite).
// Rules: every definition 40-60 words and self-contained; legal anchors
// limited to statutes already cited on the site (Civil Liability Act
// 1960 Art. 1, Insurance Act 1936 Arts. 12 and 30, Penal Code diyat
// chapter, Central Insurance Regulation No. 57). No invented numbers.

interface EnGlossaryTerm {
  term: string;
  termFa: string;
  definition: string;
  faHref: string;
}

const EN_GLOSSARY_TERMS: EnGlossaryTerm[] = [
  {
    term: "Limit of Liability",
    termFa: "سقف تعهد",
    definition:
      "The limit of liability is the maximum amount the insurer will pay for covered losses during the policy period, as stated in the schedule under Article 12 of the Insurance Act of 1936. Any judgment, settlement or diyeh award above this cap remains the insured's personal responsibility under the Civil Liability Act of 1960.",
    faHref: "/glossary/saghf-taahod",
  },
  {
    term: "Diyeh (Blood Money)",
    termFa: "دیه",
    definition:
      "Diyeh is the legally fixed compensation payable for bodily injury or death under the diyat chapter of the Islamic Penal Code, with annual amounts set by the judiciary's official table. Article 30 of the Insurance Act of 1936 obliges the insurer to pay a court-awarded diyeh within the policy limit.",
    faHref: "/glossary/diyeh",
  },
  {
    term: "Third Party",
    termFa: "شخص ثالث",
    definition:
      "A third party is any person other than the insurer and the insured who suffers bodily, property or moral damage caused by the insured's act or product. Article 30 of the Insurance Act of 1936 directs the insurer to pay the insured's debt to third parties within the insured amount.",
    faHref: "/glossary/sales",
  },
  {
    term: "Fault / Tortious Liability",
    termFa: "تقصیر و تسبیب",
    definition:
      "Tortious liability in Iranian law covers both direct fault (taqsir), meaning intentional or negligent breach of a legal duty, and tasbib, causing loss indirectly by creating or opening a source of danger. Article 1 of the Civil Liability Act of 1960 makes either form of wrongdoing compensable toward the injured party.",
    faHref: "/glossary/tasbib",
  },
  {
    term: "Deductible (Franchise)",
    termFa: "فرانشیز",
    definition:
      "The deductible, called franchise in Iranian policies, is the fixed amount or percentage of each loss that the general conditions leave on the insured; the insurer never pays this share. A higher deductible lowers the premium but increases the insured's out-of-pocket participation in every claim, including losses below the deductible.",
    faHref: "/glossary/franshiz",
  },
  {
    term: "Endorsement",
    termFa: "الحاقیه",
    definition:
      "An endorsement is a written annex attached to the main policy that alters coverage during its validity: raising the limit of liability, adding or removing insured persons, or changing the declared activity. Under Article 12 of the Insurance Act of 1936 any contract change requires mutual written agreement, which the endorsement documents.",
    faHref: "/glossary/elhaghie",
  },
  {
    term: "Policyholder vs. Insured",
    termFa: "بیمه‌گزار و بیمه‌شده",
    definition:
      "The policyholder is the contracting party who buys the policy and pays the premium, while the insured is the person whose civil liability toward third parties is covered. In liability insurance they may be the same person, or the policyholder may cover the liability of employees and collaborators named in the policy.",
    faHref: "/glossary/bimegozar-bimeh-shode",
  },
  {
    term: "Premium",
    termFa: "حق بیمه",
    definition:
      "The premium is the price of the insurer's undertaking, an essential element of the contract under Article 12 of the Insurance Act of 1936, whose amount and payment terms must appear in the policy. It is rated from the activity's risk, the chosen limit, headcount, deductible and claims history, and is issued upon official quotation.",
    faHref: "/glossary/hagh-bimeh",
  },
  {
    term: "Claim Notification",
    termFa: "اعلام خسارت",
    definition:
      "Claim notification is the insured's duty to inform the insurer in writing of an incident within the period stated in the policy, usually a maximum of five working days. The notice should state the time and place of the event, a description of what happened, the injured party's details and the first documents.",
    faHref: "/glossary/elam-khesarat",
  },
  {
    term: "Loss Adjuster (Insurance Expert)",
    termFa: "کارشناس بیمه",
    definition:
      "The loss adjuster is the insurance expert who, after notification, examines whether the incident occurred, the degree of the insured's responsibility and the amount of loss within the policy framework. In bodily-injury files the adjuster's report is completed by medical commission opinions or a final court judgment establishing liability and quantum.",
    faHref: "/glossary/karshenas-bimeh",
  },
  {
    term: "General Conditions",
    termFa: "شرایط عمومی",
    definition:
      "The general conditions are the standard policy wordings approved by Central Insurance and attached to every liability policy, framed by Regulation No. 57. They define the coverage, the notification duty, the exclusions such as intentional acts and undeclared activities, the deductible and the dispute procedure, forming the fixed rules of the contract.",
    faHref: "/glossary/sharayet-omoumi",
  },
  {
    term: "Haram Months (diyeh surcharge)",
    termFa: "ماه‌های حرام",
    definition:
      "The haram months are Rajab, Dhu al-Qa'dah, Dhu al-Hijjah and Muharram, in which the diyeh doubles: under the diyat chapter of the Islamic Penal Code a bodily injury committed in these months is compensated at twice the ordinary amount, which directly affects how high a liability policy's limit should be chosen.",
    faHref: "/glossary/mah-haram",
  },
];

export default function EnGlossaryPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      <EnBreadcrumbs
        items={[{ name: "Liability Insurance Glossary (EN)", href: "/en/glossary" }]}
      />

      <header className="mt-6">
        <h1 className="text-2xl font-extrabold leading-snug sm:text-3xl">
          Liability Insurance Glossary — 12 Key Terms in English
        </h1>
      </header>

      <div className="mt-6 max-w-3xl">
        <EnAnswerBlock text="This glossary explains twelve key liability-insurance terms in English, each anchored to the Civil Liability Act of 1960, the Insurance Act of 1936 and the Islamic Penal Code diyat chapter, exactly as used on the authoritative Persian edition. Every entry is self-contained and links to the full Persian definition." />
      </div>

      <section aria-labelledby="en-glossary-terms" className="mt-10">
        <h2 id="en-glossary-terms" className="sr-only">
          Glossary terms
        </h2>
        <EnSectionHeading title="Twelve terms, from limit of liability to haram months" icon={BookOpen} />
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {EN_GLOSSARY_TERMS.map((t) => (
            <Card key={t.faHref} className="flex h-full flex-col">
              <CardHeader className="pb-2">
                <CardTitle className="text-[15px] leading-6">{t.term}</CardTitle>
                <p lang="fa" dir="rtl" className="mt-1 text-base font-bold text-primary">
                  {t.termFa}
                </p>
              </CardHeader>
              <CardContent className="flex flex-1 flex-col justify-between gap-3">
                <p className="text-[13px] leading-6 text-muted-foreground">{t.definition}</p>
                <Link
                  href={t.faHref}
                  className="inline-flex items-center gap-1 text-sm font-bold text-primary hover:underline"
                >
                  Full Persian definition
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
            The full Persian glossary, with 24+ terms across five categories and complete legal
            references:{" "}
            <Link href="/glossary" className="font-semibold text-primary hover:underline">
              واژه‌نامه تخصصی بیمه مسئولیت (صفحه فارسی)
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
