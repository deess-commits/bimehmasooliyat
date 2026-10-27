import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Scale, ShieldCheck } from "lucide-react";
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

// ─── EN mini: Mandatory or Optional Liability Insurance (اجباری یا اختیاری) ──
// Faithful English orientation of the authoritative Persian guide
// /liability-mandatory. hreflang is wired on the Persian page.

export function generateMetadata(): Metadata {
  const title = "Is Liability Insurance Mandatory in Iran? | Iran Liability Insurance";
  const description =
    "Is liability insurance mandatory in Iran? Not universally — the obligation depends on the activity: physicians and medical centers, supervising engineers (mabhas 2) and certain licensed businesses. Persian edition is authoritative.";
  return {
    title: { absolute: title },
    description,
    alternates: {
      canonical: "/en/liability-mandatory",
      languages: {
        en: "/en/liability-mandatory",
        "fa-IR": "/liability-mandatory",
        "x-default": "/liability-mandatory",
      },
    },
    openGraph: {
      title,
      description,
      url: "/en/liability-mandatory",
      type: "article",
      locale: "en_US",
    },
  };
}

export default function EnLiabilityMandatoryPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      <EnBreadcrumbs
        items={[{ name: "Mandatory or Optional? (EN)", href: "/en/liability-mandatory" }]}
      />

      <header className="mt-6">
        <div className="flex flex-wrap items-center gap-2">
          <Badge
            variant="secondary"
            className="border border-primary/25 bg-primary/10 text-primary hover:bg-primary/10"
          >
            <Scale className="size-3.5" aria-hidden="true" />
            General guide
          </Badge>
        </div>
        <h1 className="mt-3 text-2xl font-extrabold leading-snug sm:text-3xl">
          Is Liability Insurance Mandatory in Iran?
        </h1>
      </header>

      <div className="mt-6 max-w-3xl">
        <EnAnswerBlock text="Liability insurance is not universally mandatory in Iran; the obligation depends on the activity — physicians and medical centers, supervising engineers (mabhas 2 of the national building regulations), and certain licensed businesses face legal or licensing requirements. The law creates the liability; the policy funds its payment. Being uninsured never removes the underlying legal liability." />
      </div>

      <section aria-labelledby="en-mand-points" className="mt-10 max-w-3xl">
        <EnSectionHeading title="Key points in brief" icon={Scale} />
        <ul className="mt-4 space-y-3">
          {[
            "The law creates the liability; insurance only funds its payment — the two obligations must not be confused.",
            "Mandatory-by-activity: physicians and medical centers, supervising engineers under mabhas 2 of the national building regulations, and certain licensed businesses face legal or licensing requirements.",
            "Employer liability toward workers under Article 91 of the Labour Code exists whether or not a policy is purchased.",
            "An uninsured defendant pays third-party damages out of personal or business assets — no insurer steps in.",
            "Minimum limits demanded for licensing are rarely enough — match the limit with the current year's diyeh (see the coverage-limit guide).",
          ].map((t) => (
            <li key={t} className="flex items-start gap-2 text-sm leading-7 text-muted-foreground">
              <span className="mt-2.5 size-1.5 shrink-0 rounded-full bg-primary" aria-hidden="true" />
              {t}
            </li>
          ))}
        </ul>
        <Link
          href="/liability-mandatory"
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
            The full Persian guide with the legal basis of each mandated case and the
            mandatory-versus-optional decision table:{" "}
            <Link href="/liability-mandatory" className="font-semibold text-primary hover:underline">
              بیمه مسئولیت اجباری یا اختیاری؟ (صفحه فارسی)
            </Link>
          </CardContent>
        </Card>
      </section>

      <section className="mt-12 max-w-3xl">
        <EnLegalDisclaimer text="This English page is a faithful summary of the Persian guide. It contains no premiums or legal advice. Which activities require liability insurance is governed by Iranian law, regulatory and licensing rules, whose authoritative texts are published in Persian." />
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
          title="Required to insure — or choosing to?"
          text="The quotation form is in Persian — English-speaking visitors can also email us and a consultant will respond in English, usually within one business day."
        />
      </div>
    </div>
  );
}
