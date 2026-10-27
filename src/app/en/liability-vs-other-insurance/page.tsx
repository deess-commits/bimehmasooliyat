import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, GitCompareArrows, ShieldCheck } from "lucide-react";
import {
  EnAnswerBlock,
  EnBreadcrumbs,
  EnLegalDisclaimer,
  EnSectionHeading,
} from "@/components/en/en-blocks";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CtaBanner } from "@/components/cta-banner";

export const revalidate = 3600;

// ─── EN mini: Liability vs Other Indemnity Insurance (تفاوت با خسارتی دیگر) ──
// Faithful English orientation of the authoritative Persian guide
// /liability-vs-other-insurance. hreflang is wired on the Persian page.

export function generateMetadata(): Metadata {
  const title = "Liability vs Other Indemnity Insurance | Iran Liability Insurance";
  const description =
    "What makes liability insurance different from other indemnity lines in Iran: the insurer pays what the policyholder is legally obliged to pay a third party, capped by the limit of liability — not an agreed sum. Persian edition is authoritative.";
  return {
    title: { absolute: title },
    description,
    alternates: {
      canonical: "/en/liability-vs-other-insurance",
      languages: {
        en: "/en/liability-vs-other-insurance",
        "fa-IR": "/liability-vs-other-insurance",
        "x-default": "/liability-vs-other-insurance",
      },
    },
    openGraph: {
      title,
      description,
      url: "/en/liability-vs-other-insurance",
      type: "article",
      locale: "en_US",
    },
  };
}

export default function EnLiabilityVsOtherInsurancePage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      <EnBreadcrumbs
        items={[
          { name: "Liability vs Other Insurance (EN)", href: "/en/liability-vs-other-insurance" },
        ]}
      />

      <header className="mt-6">
        <div className="flex flex-wrap items-center gap-2">
          <Badge
            variant="secondary"
            className="border border-primary/25 bg-primary/10 text-primary hover:bg-primary/10"
          >
            <GitCompareArrows className="size-3.5" aria-hidden="true" />
            General guide
          </Badge>
        </div>
        <h1 className="mt-3 text-2xl font-extrabold leading-snug sm:text-3xl">
          Liability vs Other Indemnity Insurance in Iran
        </h1>
      </header>

      <div className="mt-6 max-w-3xl">
        <EnAnswerBlock text="Under liability insurance the insurer pays what the policyholder is legally obliged to pay a third party (Articles 1–2 of the Civil Liability Act 1339). The trigger is legal liability toward a third party, not damage to the policyholder's own property — unlike other indemnity lines that compensate the policyholder's own assets or body. The limit of liability, not an agreed sum, caps the payment." />
      </div>

      <section aria-labelledby="en-cmp-points" className="mt-10 max-w-3xl">
        <EnSectionHeading title="Key points in brief" icon={GitCompareArrows} />
        <ul className="mt-4 space-y-3">
          {[
            "Three parties are involved: the insurer, the insured policyholder and the injured third party who actually receives the payment.",
            "The trigger is legal liability: payment follows the policyholder's legal obligation toward the third party (Civil Liability Act 1339, Articles 1–2).",
            "The injured party is always a third party — the policy never compensates the policyholder's own property or body.",
            "The payment is sized by the nature of the loss within the limit of liability — not by an agreed sum insured.",
            "Other indemnity lines (fire, property, personal accident) can sit alongside liability cover; this site serves liability insurance only.",
          ].map((t) => (
            <li key={t} className="flex items-start gap-2 text-sm leading-7 text-muted-foreground">
              <span className="mt-2.5 size-1.5 shrink-0 rounded-full bg-primary" aria-hidden="true" />
              {t}
            </li>
          ))}
        </ul>
        <Link
          href="/liability-vs-other-insurance"
          className="mt-5 inline-flex items-center gap-1 text-sm font-bold text-primary hover:underline"
        >
          Full guide — Persian edition (authoritative)
          <ArrowRight className="size-3.5" aria-hidden="true" />
        </Link>
      </section>

      <section className="mt-10 max-w-3xl">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Persian twin page (authoritative)</CardTitle>
          </CardHeader>
          <CardContent className="text-sm leading-7 text-muted-foreground">
            The full Persian guide with the three-party payment mechanics and the comparison
            against other indemnity lines:{" "}
            <Link
              href="/liability-vs-other-insurance"
              className="font-semibold text-primary hover:underline"
            >
              تفاوت بیمه مسئولیت با سایر بیمه‌های خسارتی (صفحه فارسی)
            </Link>
          </CardContent>
        </Card>
      </section>

      <section className="mt-12 max-w-3xl">
        <EnLegalDisclaimer text="This English page is a faithful summary of the Persian guide. It contains no premiums or legal advice. Scope, exclusions and payment mechanics are governed by the Persian policy conditions, the Civil Liability Act 1339 and Iranian law, whose authoritative texts are published in Persian." />
      </section>

      <section className="mt-8 max-w-3xl">
        <p className="flex items-start gap-2 rounded-xl border bg-card p-4 text-[13px] leading-6 text-muted-foreground">
          <ShieldCheck className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden="true" />
          Reviewed by the licensed team of Agency No. 20616, Bimeh Iran — last reviewed 26 October
          2026.
        </p>
      </section>

      <div className="mt-10">
        <CtaBanner
          title="Not sure whether liability is the right line?"
          text="The quotation form is in Persian — English-speaking visitors can also email us and a consultant will respond in English, usually within one business day."
        />
      </div>
    </div>
  );
}
