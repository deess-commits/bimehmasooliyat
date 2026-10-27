import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Coins, ShieldCheck } from "lucide-react";
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

// ─── EN mini: Choosing the Limit of Liability ───────────────────────
// Faithful English orientation of the authoritative Persian guide
// /coverage-limit. hreflang is wired on the Persian page.

export function generateMetadata(): Metadata {
  const title = "Choosing the Limit of Liability | Iran Liability Insurance";
  const description =
    "How to set the limit of liability in an Iranian liability policy: minimum equals the year-of-loss diyeh, contract minimums, consequences of an insufficient limit and the non-linear premium effect. Persian edition is authoritative.";
  return {
    title: { absolute: title },
    description,
    alternates: {
      canonical: "/en/coverage-limit",
      languages: {
        en: "/en/coverage-limit",
        "fa-IR": "/coverage-limit",
        "x-default": "/coverage-limit",
      },
    },
    openGraph: {
      title,
      description,
      url: "/en/coverage-limit",
      type: "article",
      locale: "en_US",
    },
  };
}

export default function EnCoverageLimitPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      <EnBreadcrumbs items={[{ name: "Limit of Liability Guide (EN)", href: "/en/coverage-limit" }]} />

      <header className="mt-6">
        <div className="flex flex-wrap items-center gap-2">
          <Badge
            variant="secondary"
            className="border border-primary/25 bg-primary/10 text-primary hover:bg-primary/10"
          >
            <Coins className="size-3.5" aria-hidden="true" />
            General guide
          </Badge>
        </div>
        <h1 className="mt-3 text-2xl font-extrabold leading-snug sm:text-3xl">
          Choosing the Limit of Liability in Iran
        </h1>
      </header>

      <div className="mt-6 max-w-3xl">
        <EnAnswerBlock text="The limit of liability is the maximum an Iranian liability policy pays per claim and over the policy period. The baseline minimum equals the full diyeh of the year the loss occurs; busy or high-risk activities should carry a multiple of it. An insufficient limit means any shortfall above it stays with the insured — review the limit at every renewal against the latest official diyeh decree." />
      </div>

      <section aria-labelledby="en-cl-points" className="mt-10 max-w-3xl">
        <EnSectionHeading title="Key points in brief" icon={Coins} />
        <ul className="mt-4 space-y-3">
          {[
            "Minimum baseline: the full diyeh of the year of loss — the official figure changes annually, so a limit set years ago shrinks in real terms.",
            "Contract minimums: contractor agreements and licensing rules often dictate a floor; a lower limit voids the contractual purpose.",
            "Insufficient-limit risk: multiple-injury awards can exceed a single-diyeh limit, and period aggregates can be consumed by small claims.",
            "Premium relation is non-linear: raising the limit from the baseline usually costs less than expected — compare scenarios in the quotation.",
          ].map((t) => (
            <li key={t} className="flex items-start gap-2 text-sm leading-7 text-muted-foreground">
              <span className="mt-2.5 size-1.5 shrink-0 rounded-full bg-primary" aria-hidden="true" />
              {t}
            </li>
          ))}
        </ul>
        <Link
          href="/coverage-limit"
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
            The full Persian guide with the diyeh table, per-activity logic and five-step
            method:{" "}
            <Link href="/coverage-limit" className="font-semibold text-primary hover:underline">
              راهنمای سقف تعهد (صفحه فارسی)
            </Link>
          </CardContent>
        </Card>
      </section>

      <section className="mt-12 max-w-3xl">
        <EnLegalDisclaimer text="This English page is a faithful summary of the Persian guide. It contains no premiums or legal advice. The Persian edition of this page and the Persian policy conditions and statutory texts always prevail." />
      </section>

      <section className="mt-8 max-w-3xl">
        <p className="flex items-start gap-2 rounded-xl border bg-card p-4 text-[13px] leading-6 text-muted-foreground">
          <ShieldCheck className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden="true" />
          Reviewed by the licensed team of Agency No. 20616, Bimeh Iran.
        </p>
      </section>

      <div className="mt-10">
        <CtaBanner
          title="Need a quotation for a specific limit?"
          text="The quotation form is in Persian — English-speaking visitors can also email us and a consultant will respond in English, usually within one business day."
        />
      </div>
    </div>
  );
}
