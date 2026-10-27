import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, RefreshCw, ShieldCheck } from "lucide-react";
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

// ─── EN mini: Renewal & Endorsements (تمدید و الحاقیه) ───────────────
// Faithful English orientation of the authoritative Persian guide
// /renewal. hreflang is wired on the Persian page.

export function generateMetadata(): Metadata {
  const title = "Renewal & Endorsements | Iran Liability Insurance";
  const description =
    "Renewing an Iranian liability policy before expiry, what endorsements (الحاقیه) change mid-term, matching the limit with the yearly diyeh, and the effect of claim-free history. Persian edition is authoritative.";
  return {
    title: { absolute: title },
    description,
    alternates: {
      canonical: "/en/renewal",
      languages: {
        en: "/en/renewal",
        "fa-IR": "/renewal",
        "x-default": "/renewal",
      },
    },
    openGraph: {
      title,
      description,
      url: "/en/renewal",
      type: "article",
      locale: "en_US",
    },
  };
}

export default function EnRenewalPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      <EnBreadcrumbs items={[{ name: "Renewal Guide (EN)", href: "/en/renewal" }]} />

      <header className="mt-6">
        <div className="flex flex-wrap items-center gap-2">
          <Badge
            variant="secondary"
            className="border border-primary/25 bg-primary/10 text-primary hover:bg-primary/10"
          >
            <RefreshCw className="size-3.5" aria-hidden="true" />
            General guide
          </Badge>
        </div>
        <h1 className="mt-3 text-2xl font-extrabold leading-snug sm:text-3xl">
          Renewing Liability Insurance in Iran
        </h1>
      </header>

      <div className="mt-6 max-w-3xl">
        <EnAnswerBlock text="Renewal continues liability cover for a new period before the one-year policy expires — cover exists only while the policy is in force. An endorsement (elghaghiyeh) is the official document applying mid-term changes such as raising the limit of liability or correcting details. At renewal, match the limit with the current year's diyeh and start the process several working days before expiry, because every uncovered hour is uninsured risk." />
      </div>

      <section aria-labelledby="en-ren-points" className="mt-10 max-w-3xl">
        <EnSectionHeading title="Key points in brief" icon={RefreshCw} />
        <ul className="mt-4 space-y-3">
          {[
            "Cover exists only during the policy period: any event in a lapsed period is uninsured and paid out of pocket.",
            "Renew several working days before expiry — renewal on the last day leaves no room to review the limit or deductible.",
            "Endorsements apply mid-term changes (limit increase, added cover, corrected details); renewal issues the next policy period.",
            "Match the limit with the current year's diyeh: repeating last year's limit without adjustment accepts an underinsured gap.",
            "Continuous claim-free history strengthens your negotiation position at renewal; a lapse breaks that continuity.",
          ].map((t) => (
            <li key={t} className="flex items-start gap-2 text-sm leading-7 text-muted-foreground">
              <span className="mt-2.5 size-1.5 shrink-0 rounded-full bg-primary" aria-hidden="true" />
              {t}
            </li>
          ))}
        </ul>
        <Link
          href="/renewal"
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
            The full Persian guide with endorsement use-cases, common mistakes and the five-step
            renewal method:{" "}
            <Link href="/renewal" className="font-semibold text-primary hover:underline">
              راهنمای تمدید و الحاقیه (صفحه فارسی)
            </Link>
          </CardContent>
        </Card>
      </section>

      <section className="mt-12 max-w-3xl">
        <EnLegalDisclaimer text="This English page is a faithful summary of the Persian guide. It contains no premiums or legal advice. Renewal and endorsement terms are governed by the Persian policy conditions and Iranian law, whose authoritative texts are published in Persian." />
      </section>

      <section className="mt-8 max-w-3xl">
        <p className="flex items-start gap-2 rounded-xl border bg-card p-4 text-[13px] leading-6 text-muted-foreground">
          <ShieldCheck className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden="true" />
          Reviewed by the licensed team of Agency No. 20616, Bimeh Iran.
        </p>
      </section>

      <div className="mt-10">
        <CtaBanner
          title="Planning a renewal?"
          text="The quotation form is in Persian — English-speaking visitors can also email us and a consultant will respond in English, usually within one business day."
        />
      </div>
    </div>
  );
}
