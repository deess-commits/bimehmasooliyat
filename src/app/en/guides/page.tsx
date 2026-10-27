import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  CalendarClock,
  ClipboardCheck,
  Coins,
  FileText,
  GitCompareArrows,
  Percent,
  Rocket,
  Scale,
  ScrollText,
  ShieldCheck,
} from "lucide-react";
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

// ─── EN mini-hub: General Guides for Liability Insurance in Iran ──────
// English entry point to the eight general guides; the Persian hub
// /guides is authoritative. hreflang is wired on the Persian page.

export function generateMetadata(): Metadata {
  const title = "General Guides | Iran Liability Insurance";
  const description =
    "Eight practical guides to liability insurance in Iran in English: limit of liability, deductible, renewal and endorsements, issuance documents, mandatory-vs-optional status, liability vs other indemnity lines, policy review checklist and startup guide. Persian authoritative.";
  return {
    title: { absolute: title },
    description,
    alternates: {
      canonical: "/en/guides",
      languages: {
        en: "/en/guides",
        "fa-IR": "/guides",
        "x-default": "/guides",
      },
    },
    openGraph: {
      title,
      description,
      url: "/en/guides",
      type: "article",
      locale: "en_US",
    },
  };
}

// Eight general guides — EN cards link to the EN minis; the Persian
// edition of every guide is the authoritative text.
const EN_GUIDES = [
  {
    href: "/en/coverage-limit",
    icon: Coins,
    title: "Choosing the Limit of Liability",
    text: "A logical minimum limit based on the diyeh of the year of occurrence, a decision table by activity and the consequences of an insufficient limit.",
  },
  {
    href: "/en/deductible",
    icon: Percent,
    title: "Choosing the Deductible",
    text: "Fixed versus percentage deductibles, their effect on the premium and balancing the deductible with the limit of liability.",
  },
  {
    href: "/en/renewal",
    icon: CalendarClock,
    title: "Renewal & Endorsements",
    text: "Renewing before expiry, what endorsements change mid-term, revisiting the limit with the yearly diyeh and a five-step uninterrupted renewal.",
  },
  {
    href: "/en/documents",
    icon: FileText,
    title: "Documents & Issuance",
    text: "Baseline documents and papers by applicant type — including employer staff lists under Labor Law Article 91 — and the five-step issuance journey.",
  },
  {
    href: "/en/liability-mandatory",
    icon: Scale,
    title: "Mandatory or Optional?",
    text: "Liability insurance is not universally mandatory: the obligation depends on the activity — and being uninsured never removes the underlying legal liability.",
  },
  {
    href: "/en/liability-vs-other-insurance",
    icon: GitCompareArrows,
    title: "Liability vs Other Indemnity Insurance",
    text: "The insurer pays what the policyholder is legally obliged to pay a third party, capped by the limit of liability — not damage to the policyholder's own assets.",
  },
  {
    href: "/en/policy-review-checklist",
    icon: ClipboardCheck,
    title: "Policy Review Checklist",
    text: "Eight fields to verify before signing — activity description, per-coverage limits, deductible, exclusions and renewal terms; after issuance, changes need a formal endorsement.",
  },
  {
    href: "/en/startup-guide",
    icon: Rocket,
    title: "Liability Insurance for New Companies",
    text: "Three day-one risk groups, a first-year priority order for coverages, a limit based on the diyeh of the year of occurrence and honest notes on contracts and tenders.",
  },
];

export default function EnGuidesHubPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      <EnBreadcrumbs items={[{ name: "General Guides (EN)", href: "/en/guides" }]} />

      <header className="mt-6">
        <div className="flex flex-wrap items-center gap-2">
          <Badge
            variant="secondary"
            className="border border-primary/25 bg-primary/10 text-primary hover:bg-primary/10"
          >
            <ScrollText className="size-3.5" aria-hidden="true" />
            General guides
          </Badge>
        </div>
        <h1 className="mt-3 text-2xl font-extrabold leading-snug sm:text-3xl">
          General Guides — Liability Insurance in Iran
        </h1>
      </header>

      <div className="mt-6 max-w-3xl">
        <EnAnswerBlock text="Eight practical guides cover the key decisions of every Iranian liability policy: the limit of liability, the deductible choice, renewal and endorsements, issuance documents, whether liability insurance is mandatory or optional, how liability differs from other indemnity lines, the policy review checklist before signing, and the buying guide for newly established companies. Each Persian guide is authoritative; these English pages are faithful summaries." />
      </div>

      {/* Eight general guide cards — links point to the EN minis */}
      <section aria-labelledby="en-guides-list" className="mt-10">
        <EnSectionHeading
          title="Eight general guides — EN summaries, Persian authoritative"
          icon={ScrollText}
        />
        <p className="mb-5 max-w-3xl text-sm leading-7 text-muted-foreground">
          Each card links to the English summary of one guide; the full Persian guide behind every
          page is the authoritative text. The guides are independent and complete — the list order
          is a suggested reading order.
        </p>
        <div className="grid gap-4 sm:grid-cols-2">
          {EN_GUIDES.map((g) => (
            <Link key={g.href} href={g.href} className="group">
              <Card className="h-full transition-all group-hover:-translate-y-0.5 group-hover:border-primary/40 group-hover:shadow-md">
                <CardHeader className="pb-2">
                  <span className="mb-2 grid size-11 place-items-center rounded-xl bg-accent text-accent-foreground">
                    <g.icon className="size-5.5" aria-hidden="true" />
                  </span>
                  <CardTitle className="text-[15px] group-hover:text-primary">{g.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-[13px] leading-6 text-muted-foreground">{g.text}</p>
                  <span className="mt-3 inline-flex items-center gap-1 text-xs font-bold text-primary">
                    Read the English summary
                    <ArrowRight
                      className="size-3.5 transition-transform group-hover:translate-x-0.5"
                      aria-hidden="true"
                    />
                  </span>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      <section className="mt-10 max-w-3xl">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Persian twin page (authoritative)</CardTitle>
          </CardHeader>
          <CardContent className="text-sm leading-7 text-muted-foreground">
            The full Persian guides hub with all eight deep guides:{" "}
            <Link href="/guides" className="font-semibold text-primary hover:underline">
              راهنماهای عمومی بیمه مسئولیت (صفحه فارسی)
            </Link>
          </CardContent>
        </Card>
      </section>

      <section className="mt-12 max-w-3xl">
        <EnLegalDisclaimer text="This English hub is a faithful orientation layer over the Persian guides. It contains no premiums or legal advice. Cover terms, limits and deductibles are governed by the Persian policy conditions and Iranian law, whose authoritative texts are published in Persian." />
      </section>

      <section className="mt-8 max-w-3xl">
        <p className="flex items-start gap-2 rounded-xl border bg-card p-4 text-[13px] leading-6 text-muted-foreground">
          <ShieldCheck className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden="true" />
          Guides reviewed by the licensed team of Agency No. 20616, Bimeh Iran.
        </p>
      </section>

      <div className="mt-10">
        <CtaBanner
          title="Read the guides — ready for a quotation?"
          text="The quotation form is in Persian — English-speaking visitors can also email us and a consultant will respond in English, usually within one business day."
        />
      </div>
    </div>
  );
}
