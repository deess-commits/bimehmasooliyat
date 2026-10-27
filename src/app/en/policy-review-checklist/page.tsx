import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ClipboardCheck, ShieldCheck } from "lucide-react";
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

// ─── EN mini: Policy Review Checklist Before Signing ──────────────
// Faithful English orientation of the authoritative Persian guide
// /policy-review-checklist. hreflang is wired on the Persian page.

export function generateMetadata(): Metadata {
  const title =
    "Policy Review Checklist Before Signing Your Liability Insurance | Iran Liability Insurance";
  const description =
    "Before signing a liability insurance policy in Iran, verify eight fields: activity description, per-coverage limits, deductible, exclusions, validity period, policyholder details, additional activities and renewal terms. Persian edition is authoritative.";
  return {
    title: { absolute: title },
    description,
    alternates: {
      canonical: "/en/policy-review-checklist",
      languages: {
        en: "/en/policy-review-checklist",
        "fa-IR": "/policy-review-checklist",
        "x-default": "/policy-review-checklist",
      },
    },
    openGraph: {
      title,
      description,
      url: "/en/policy-review-checklist",
      type: "article",
      locale: "en_US",
    },
  };
}

export default function EnPolicyReviewChecklistPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      <EnBreadcrumbs
        items={[{ name: "Policy Review Checklist (EN)", href: "/en/policy-review-checklist" }]}
      />

      <header className="mt-6">
        <div className="flex flex-wrap items-center gap-2">
          <Badge
            variant="secondary"
            className="border border-primary/25 bg-primary/10 text-primary hover:bg-primary/10"
          >
            <ClipboardCheck className="size-3.5" aria-hidden="true" />
            General guide
          </Badge>
        </div>
        <h1 className="mt-3 text-2xl font-extrabold leading-snug sm:text-3xl">
          Policy Review Checklist Before Signing Your Liability Insurance
        </h1>
      </header>

      <div className="mt-6 max-w-3xl">
        <EnAnswerBlock text="Before signing a liability insurance policy in Iran, verify eight fields: the activity description, the per-coverage limit of liability, the deductible, the exclusions in the special conditions, the validity period, the policyholder details, additional activities, and the renewal terms. Fix any mismatch with the oral agreement before issuance — after issuance, changes require a formal endorsement." />
      </div>

      <section aria-labelledby="en-checklist-points" className="mt-10 max-w-3xl">
        <EnSectionHeading title="Key points in brief" icon={ClipboardCheck} />
        <ul className="mt-4 space-y-3">
          {[
            "The policy text is the benchmark at claim time — not verbal promises; anything not written in the special conditions has no documentary backing.",
            "Read the limit of each coverage separately, not just the total — in liability insurance the payable amount is the limit of the relevant section.",
            "The exclusions list in the special conditions defines exactly which events are not covered — ask a documented question about every unclear clause before signing.",
            "An incomplete activity description leaves part of the real activity effectively uncovered; every additional activity must be declared before signing.",
            "Fixing a disagreement before issuance is a simple correction request; after issuance, even a small change goes through a formal endorsement.",
          ].map((t) => (
            <li key={t} className="flex items-start gap-2 text-sm leading-7 text-muted-foreground">
              <span className="mt-2.5 size-1.5 shrink-0 rounded-full bg-primary" aria-hidden="true" />
              {t}
            </li>
          ))}
        </ul>
        <Link
          href="/policy-review-checklist"
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
            The full Persian guide with the eight-field checklist table, common mistakes and the
            five-step review process:{" "}
            <Link
              href="/policy-review-checklist"
              className="font-semibold text-primary hover:underline"
            >
              چک‌لیست بازبینی بیمه مسئولیت قبل از امضا (صفحه فارسی)
            </Link>
          </CardContent>
        </Card>
      </section>

      <section className="mt-12 max-w-3xl">
        <EnLegalDisclaimer text="This English page is a faithful summary of the Persian guide. It contains no premiums or legal advice. Policy wording, limits and deductibles are governed by the Persian policy conditions and Iranian law, whose authoritative texts are published in Persian." />
      </section>

      <section className="mt-8 max-w-3xl">
        <p className="flex items-start gap-2 rounded-xl border bg-card p-4 text-[13px] leading-6 text-muted-foreground">
          <ShieldCheck className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden="true" />
          Reviewed by the licensed team of Agency No. 20616, Bimeh Iran — last reviewed 27 October
          2026.
        </p>
      </section>

      <div className="mt-10">
        <CtaBanner
          title="Review the draft before you sign"
          text="The quotation form is in Persian — English-speaking visitors can also email us and a consultant will respond in English, usually within one business day."
        />
      </div>
    </div>
  );
}
