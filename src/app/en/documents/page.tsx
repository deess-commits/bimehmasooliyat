import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, FileText, ShieldCheck } from "lucide-react";
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

// ─── EN mini: Documents & Issuance (مدارک و فرایند صدور) ─────────────
// Faithful English orientation of the authoritative Persian guide
// /documents. hreflang is wired on the Persian page.

export function generateMetadata(): Metadata {
  const title = "Documents & Issuance | Iran Liability Insurance";
  const description =
    "Which documents an Iranian liability policy requires — identity or company registration papers, activity description, staff lists under Labor Law Art. 91 — and the five-step issuance journey from quotation to e-policy. Persian edition is authoritative.";
  return {
    title: { absolute: title },
    description,
    alternates: {
      canonical: "/en/documents",
      languages: {
        en: "/en/documents",
        "fa-IR": "/documents",
        "x-default": "/documents",
      },
    },
    openGraph: {
      title,
      description,
      url: "/en/documents",
      type: "article",
      locale: "en_US",
    },
  };
}

export default function EnDocumentsPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      <EnBreadcrumbs items={[{ name: "Documents Guide (EN)", href: "/en/documents" }]} />

      <header className="mt-6">
        <div className="flex flex-wrap items-center gap-2">
          <Badge
            variant="secondary"
            className="border border-primary/25 bg-primary/10 text-primary hover:bg-primary/10"
          >
            <FileText className="size-3.5" aria-hidden="true" />
            General guide
          </Badge>
        </div>
        <h1 className="mt-3 text-2xl font-extrabold leading-snug sm:text-3xl">
          Documents and the Issuance Journey in Iran
        </h1>
      </header>

      <div className="mt-6 max-w-3xl">
        <EnAnswerBlock text="Issuing an Iranian liability policy needs identity or registration papers, a precise description of the activity and risk details such as headcount and floor area; the exact list varies by cover. The journey runs from a quotation request through risk review — with a survey where needed — to an official quotation, payment and an electronic policy. Declaring the activity accurately matters: a mismatch can be disputed at claim time." />
      </div>

      <section aria-labelledby="en-doc-points" className="mt-10 max-w-3xl">
        <EnSectionHeading title="Key points in brief" icon={FileText} />
        <ul className="mt-4 space-y-3">
          {[
            "Baseline documents: national ID or company registration, latest official-gazette changes, business licence, activity description.",
            "Employers add staff lists and job descriptions — the basis of employer-liability risk under Labor Law Article 91.",
            "Contractors and projects add contract papers and site details; the exact list follows each cover's conditions.",
            "Information must match reality: inaccurate declarations can complicate the claim settlement.",
            "After issuance, corrections are applied by official endorsement (see the renewal guide).",
          ].map((t) => (
            <li key={t} className="flex items-start gap-2 text-sm leading-7 text-muted-foreground">
              <span className="mt-2.5 size-1.5 shrink-0 rounded-full bg-primary" aria-hidden="true" />
              {t}
            </li>
          ))}
        </ul>
        <Link
          href="/documents"
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
            The full Persian guide with the document table by applicant type and the five-step
            issuance journey:{" "}
            <Link href="/documents" className="font-semibold text-primary hover:underline">
              مدارک و فرایند صدور (صفحه فارسی)
            </Link>
          </CardContent>
        </Card>
      </section>

      <section className="mt-12 max-w-3xl">
        <EnLegalDisclaimer text="This English page is a faithful summary of the Persian guide. It contains no premiums or legal advice. Required documents and issuance terms are governed by the Persian policy conditions and Iranian law, whose authoritative texts are published in Persian." />
      </section>

      <section className="mt-8 max-w-3xl">
        <p className="flex items-start gap-2 rounded-xl border bg-card p-4 text-[13px] leading-6 text-muted-foreground">
          <ShieldCheck className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden="true" />
          Reviewed by the licensed team of Agency No. 20616, Bimeh Iran.
        </p>
      </section>

      <div className="mt-10">
        <CtaBanner
          title="Preparing a policy application?"
          text="The quotation form is in Persian — English-speaking visitors can also email us and a consultant will respond in English, usually within one business day."
        />
      </div>
    </div>
  );
}
