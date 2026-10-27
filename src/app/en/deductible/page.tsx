import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Percent, ShieldCheck } from "lucide-react";
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

// ─── EN mini: Choosing the Deductible (فرانشیز) ─────────────────────
// Faithful English orientation of the authoritative Persian guide
// /deductible. hreflang is wired on the Persian page.

export function generateMetadata(): Metadata {
  const title = "Choosing the Deductible | Iran Liability Insurance";
  const description =
    "Fixed vs percentage deductibles in Iranian liability insurance: what the deductible means, its effect on premium, when a higher deductible is sensible and how it balances with the limit of liability. Persian edition is authoritative.";
  return {
    title: { absolute: title },
    description,
    alternates: {
      canonical: "/en/deductible",
      languages: {
        en: "/en/deductible",
        "fa-IR": "/deductible",
        "x-default": "/deductible",
      },
    },
    openGraph: {
      title,
      description,
      url: "/en/deductible",
      type: "article",
      locale: "en_US",
    },
  };
}

export default function EnDeductiblePage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      <EnBreadcrumbs items={[{ name: "Deductible Guide (EN)", href: "/en/deductible" }]} />

      <header className="mt-6">
        <div className="flex flex-wrap items-center gap-2">
          <Badge
            variant="secondary"
            className="border border-primary/25 bg-primary/10 text-primary hover:bg-primary/10"
          >
            <Percent className="size-3.5" aria-hidden="true" />
            General guide
          </Badge>
        </div>
        <h1 className="mt-3 text-2xl font-extrabold leading-snug sm:text-3xl">
          Choosing the Deductible in Iran
        </h1>
      </header>

      <div className="mt-6 max-w-3xl">
        <EnAnswerBlock text="The deductible is the first slice of every loss the insured accepts before the insurer pays. Iranian liability policies use a fixed deductible (a set amount per claim) or a percentage deductible (a share of the assessed loss). A higher deductible lowers the premium but shifts frequent small losses to the insured — the right level follows your claim pattern and cash capacity, and should never be traded for a lower limit of liability." />
      </div>

      <section aria-labelledby="en-ded-points" className="mt-10 max-w-3xl">
        <EnSectionHeading title="Key points in brief" icon={Percent} />
        <ul className="mt-4 space-y-3">
          {[
            "Fixed deductible: a set amount deducted from every claim — suits activities with frequent, small, predictable losses.",
            "Percentage deductible: a share of the assessed loss — the insured's slice grows with large claims; common in high-variance lines.",
            "Higher deductible is not always cheaper overall: repeated small losses paid out of pocket can outweigh the premium saving.",
            "Balance with the limit: the deductible sets where payment starts, the limit sets where it ends — never reduce the limit to fund a higher deductible.",
          ].map((t) => (
            <li key={t} className="flex items-start gap-2 text-sm leading-7 text-muted-foreground">
              <span className="mt-2.5 size-1.5 shrink-0 rounded-full bg-primary" aria-hidden="true" />
              {t}
            </li>
          ))}
        </ul>
        <Link
          href="/deductible"
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
            The full Persian guide with the worked example, common mistakes and five-step
            method:{" "}
            <Link href="/deductible" className="font-semibold text-primary hover:underline">
              راهنمای فرانشیز (صفحه فارسی)
            </Link>
          </CardContent>
        </Card>
      </section>

      <section className="mt-12 max-w-3xl">
        <EnLegalDisclaimer text="This English page is a faithful summary of the Persian guide. It contains no premiums or legal advice. Deductible terms vary by policy line and are governed by the Persian policy conditions, which always prevail." />
      </section>

      <section className="mt-8 max-w-3xl">
        <p className="flex items-start gap-2 rounded-xl border bg-card p-4 text-[13px] leading-6 text-muted-foreground">
          <ShieldCheck className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden="true" />
          Reviewed by the licensed team of Agency No. 20616, Bimeh Iran.
        </p>
      </section>

      <div className="mt-10">
        <CtaBanner
          title="Want two deductible scenarios priced?"
          text="The quotation form is in Persian — English-speaking visitors can also email us and a consultant will respond in English, usually within one business day."
        />
      </div>
    </div>
  );
}
