import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Rocket, ShieldCheck } from "lucide-react";
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

// ─── EN mini: Liability Insurance for Newly Established Companies ──
// Faithful English orientation of the authoritative Persian guide
// /startup-guide. hreflang is wired on the Persian page.

export function generateMetadata(): Metadata {
  const title =
    "Liability Insurance for Newly Established Companies | Iran Liability Insurance";
  const description =
    "A newly established company in Iran faces three day-one liability risk groups: employees, third parties on the premises, and customers of its product or service. First-year priority order and limits based on the diyeh. Persian edition is authoritative.";
  return {
    title: { absolute: title },
    description,
    alternates: {
      canonical: "/en/startup-guide",
      languages: {
        en: "/en/startup-guide",
        "fa-IR": "/startup-guide",
        "x-default": "/startup-guide",
      },
    },
    openGraph: {
      title,
      description,
      url: "/en/startup-guide",
      type: "article",
      locale: "en_US",
    },
  };
}

export default function EnStartupGuidePage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      <EnBreadcrumbs items={[{ name: "Startup Guide (EN)", href: "/en/startup-guide" }]} />

      <header className="mt-6">
        <div className="flex flex-wrap items-center gap-2">
          <Badge
            variant="secondary"
            className="border border-primary/25 bg-primary/10 text-primary hover:bg-primary/10"
          >
            <Rocket className="size-3.5" aria-hidden="true" />
            General guide
          </Badge>
        </div>
        <h1 className="mt-3 text-2xl font-extrabold leading-snug sm:text-3xl">
          Liability Insurance for Newly Established Companies in Iran
        </h1>
      </header>

      <div className="mt-6 max-w-3xl">
        <EnAnswerBlock text="A newly established company faces three liability risk groups from day one: employees, third parties on the premises, and customers of its product or service. Prioritize coverage instead of buying everything at once and base each limit on the diyeh of the year of occurrence — liability insurance is also a common requirement in Iranian contracts and tenders." />
      </div>

      <section aria-labelledby="en-startup-points" className="mt-10 max-w-3xl">
        <EnSectionHeading title="Key points in brief" icon={Rocket} />
        <ul className="mt-4 space-y-3">
          {[
            "Employer liability toward workers under Article 91 of the Labour Code exists from the first hire — independent of whether a policy is purchased.",
            "A common first-year priority order: employer liability → public liability toward third parties → professional liability → product liability; every company has a different mix, and the declared activity is the basis of the proposal.",
            "A formal liability policy is a commonly accepted document in Iranian contracts and tenders — match its scope and limit with the insurance clause of each contract.",
            "Growth — more staff, expanded activity, a new address — changes the risk and must be declared with a formal endorsement so the policy keeps matching the company.",
            "Public liability does not cover professional errors — specialised professional liability is issued as a separate coverage.",
          ].map((t) => (
            <li key={t} className="flex items-start gap-2 text-sm leading-7 text-muted-foreground">
              <span className="mt-2.5 size-1.5 shrink-0 rounded-full bg-primary" aria-hidden="true" />
              {t}
            </li>
          ))}
        </ul>
        <Link
          href="/startup-guide"
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
            The full Persian guide with the three day-one risk cards, the first-year priority table
            and the five-step buying path:{" "}
            <Link href="/startup-guide" className="font-semibold text-primary hover:underline">
              راهنمای بیمه مسئولیت شرکت‌های تازه‌تأسیس (صفحه فارسی)
            </Link>
          </CardContent>
        </Card>
      </section>

      <section className="mt-12 max-w-3xl">
        <EnLegalDisclaimer text="This English page is a faithful summary of the Persian guide. It contains no premiums or legal advice. Coverage terms, limits and the diyeh basis are governed by the Persian policy conditions and Iranian law, whose authoritative texts are published in Persian." />
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
          title="Starting your company's first policy?"
          text="The quotation form is in Persian — English-speaking visitors can also email us and a consultant will respond in English, usually within one business day."
        />
      </div>
    </div>
  );
}
