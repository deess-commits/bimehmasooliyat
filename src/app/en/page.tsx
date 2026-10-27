import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  BookOpen,
  CheckCircle2,
  FileSearch,
  Gavel,
  Landmark,
  Scale,
  Stethoscope,
  Users,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FaqSection } from "@/components/faq-section";
import { EnAnswerBlock } from "@/components/en/en-blocks";
import { enProductPath, EN_CATEGORY_COUNTS, EN_CATEGORY_DESCRIPTIONS, EN_CATEGORY_LABELS, EN_CATEGORY_ORDER } from "@/lib/en/config";
import { enHome, enProductPages, enDisclaimers } from "@/lib/en/content";
import { JsonLd } from "@/lib/seo";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: { absolute: "Liability Insurance in Iran — English Reference | Iran Liability Insurance" },
  description:
    "English reference for liability insurance in Iran: how all 33 liability products work — coverage, exclusions, buying and claim steps — by a licensed Bimeh Iran agency.",
  keywords: [
    "liability insurance Iran",
    "Iran liability insurance English",
    "professional liability Iran",
    "third party insurance Iran",
    "Bimeh Iran agency",
  ],
  alternates: {
    canonical: "/en",
    languages: {
      en: "/en",
      "fa-IR": "/",
      "x-default": "/",
    },
  },
  robots: { index: true, follow: true },
};

const CATEGORY_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  professional: Stethoscope,
  commercial: Landmark,
  corporate: Scale,
  public: Users,
};

export default function EnHomePage() {
  const url = `${siteConfig.url}/en`;

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      {/* JSON-LD: WebSite (EN node) + WebPage */}
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebSite",
          "@id": `${url}/#website-en`,
          url,
          name: "Iran Liability Insurance — English Edition",
          inLanguage: "en",
          publisher: { "@id": `${siteConfig.url}/#organization` },
        }}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          "@id": `${url}/#webpage`,
          url,
          name: "Liability Insurance in Iran — The English Reference",
          description: enHome.heroAnswer,
          inLanguage: "en",
          isPartOf: { "@id": `${url}/#website-en` },
          about: { "@id": `${siteConfig.url}/#organization` },
        }}
      />

      {/* Hero — answer first */}
      <section aria-labelledby="en-hero-h" className="mt-4">
        <Badge variant="secondary" className="border border-primary/25 bg-primary/10 text-primary hover:bg-primary/10">
          {enHome.heroKicker}
        </Badge>
        <h1 id="en-hero-h" className="mt-3 max-w-4xl text-2xl font-extrabold leading-tight sm:text-4xl">
          {enHome.heroHeadline}
        </h1>
        <div className="mt-5 max-w-4xl">
          <EnAnswerBlock text={enHome.heroAnswer} />
        </div>
      </section>

      {/* Trust strip */}
      <section aria-label="Trust signals" className="mt-8 grid gap-2.5 sm:grid-cols-2">
        {enHome.trustBullets.map((b, i) => (
          <p
            key={i}
            className="flex items-start gap-2.5 rounded-xl border bg-card p-3.5 text-sm leading-6 text-muted-foreground"
          >
            <CheckCircle2 className="mt-0.5 size-4.5 shrink-0 text-primary" aria-hidden="true" />
            <span>{b}</span>
          </p>
        ))}
      </section>

      {/* 4 category cards */}
      <section aria-labelledby="en-cats-h" className="mt-12">
        <h2 id="en-cats-h" className="text-xl font-extrabold sm:text-2xl">
          The four categories of Iranian liability insurance
        </h2>
        <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {EN_CATEGORY_ORDER.map((key) => {
            const Icon = CATEGORY_ICONS[key];
            return (
              <Link key={key} href={`/en/liability#${key}`} className="group">
                <Card className="h-full py-4 transition-colors group-hover:border-primary/40">
                  <CardHeader className="pb-2">
                    <span className="grid size-10 place-items-center rounded-xl bg-accent text-accent-foreground">
                      <Icon className="size-5" aria-hidden="true" />
                    </span>
                    <CardTitle className="mt-2 text-sm leading-6">{EN_CATEGORY_LABELS[key]}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-[13px] leading-6 text-muted-foreground">
                      {EN_CATEGORY_DESCRIPTIONS[key]}
                    </p>
                    <p className="mt-3 text-xs font-bold text-primary">
                      {EN_CATEGORY_COUNTS[key]} products
                    </p>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
      </section>

      {/* 33 full English product cards */}
      <section aria-labelledby="en-flag-h" className="mt-12">
        <h2 id="en-flag-h" className="text-xl font-extrabold sm:text-2xl">
          {enHome.flagshipHeading}
        </h2>
        <p className="mt-2 max-w-3xl text-sm leading-7 text-muted-foreground">{enHome.flagshipIntro}</p>
        <div className="mt-5 grid gap-4 md:grid-cols-2">
          {enProductPages.map((p) => (
            <Card key={p.slug} className="flex flex-col py-5 transition-colors hover:border-primary/40">
              <CardHeader className="pb-2">
                <div className="flex flex-wrap items-center gap-2">
                  <Badge variant="secondary" className="text-[11px]">
                    {EN_CATEGORY_LABELS[p.category]}
                  </Badge>
                </div>
                <CardTitle className="mt-2 text-base leading-7">
                  <Link href={enProductPath(p.category, p.slug)} className="hover:text-primary">
                    {p.title}
                  </Link>
                </CardTitle>
              </CardHeader>
              <CardContent className="flex flex-1 flex-col">
                <p className="text-[13px] leading-6 text-muted-foreground">{p.audienceLine}</p>
                <p className="mt-3 line-clamp-3 text-[13px] leading-6 text-muted-foreground">{p.answerBlock}</p>
                <Link
                  href={enProductPath(p.category, p.slug)}
                  className="mt-4 inline-flex w-fit items-center gap-1.5 text-sm font-bold text-primary hover:underline"
                >
                  Read the full English guide
                  <ArrowRight className="size-4" aria-hidden="true" />
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* All products + quote CTA */}
      <section aria-labelledby="en-all-h" className="mt-12 grid gap-4 md:grid-cols-2">
        <Link
          href="/en/liability"
          className="group flex items-center gap-4 rounded-2xl border bg-card p-5 transition-colors hover:border-primary/40"
        >
          <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-accent text-accent-foreground">
            <BookOpen className="size-5" aria-hidden="true" />
          </span>
          <span>
            <span className="block text-base font-extrabold">{enHome.allProductsHeading}</span>
            <span className="mt-1 block text-[13px] leading-6 text-muted-foreground">
              Full catalogue of the Persian site — all 33 products documented in full English pages, grouped into four categories.
            </span>
          </span>
          <ArrowRight className="ms-auto size-5 shrink-0 text-primary transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
        </Link>
        <div className="rounded-2xl border bg-card p-5">
          <div className="flex items-start gap-4">
            <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-accent text-accent-foreground">
              <FileSearch className="size-5" aria-hidden="true" />
            </span>
            <div>
              <p className="text-base font-extrabold">Request an official quotation</p>
              <p className="mt-1 text-[13px] leading-6 text-muted-foreground">{enDisclaimers.quoteNote}</p>
              <div className="mt-3 flex flex-wrap items-center gap-2">
                <Link
                  href="/quote"
                  className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-bold text-primary-foreground transition-opacity hover:opacity-90"
                >
                  <FileSearch className="size-4" aria-hidden="true" />
                  Open the quote form
                </Link>
                <a
                  href="mailto:info@bimehmasooliyat.ir"
                  className="inline-flex items-center gap-2 rounded-lg border px-4 py-2.5 text-sm font-bold hover:border-primary/40"
                >
                  Email us in English
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Claims pointer */}
      <section aria-labelledby="en-claim-h" className="mt-8 rounded-2xl border bg-accent/40 p-5">
        <div className="flex items-start gap-4">
          <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-background text-foreground shadow-sm">
            <Gavel className="size-5" aria-hidden="true" />
          </span>
          <div>
            <h2 id="en-claim-h" className="text-base font-extrabold">
              Claims in brief
            </h2>
            <p className="mt-1 max-w-3xl text-[13px] leading-6 text-muted-foreground">
              Notify the insurer within five working days (Insurance Act, Article 30 practice), document the scene, and let
              the adjuster establish liability. Every flagship page on this site carries a numbered claim guide; the full
              Persian claims center is at{" "}
              <Link href="/claims" className="font-semibold text-primary hover:underline">
                /claims
              </Link>
              .
            </p>
          </div>
        </div>
      </section>

      {/* Quick links — pricing, comparison, city guides */}
      <section aria-label="Explore the English edition" className="mt-10">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { href: "/en/price", title: "How Pricing Works", text: "The eight factors behind every Iranian liability premium." },
            { href: "/en/compare", title: "Compare Coverages", text: "All 33 products compared by audience and key risk." },
            { href: "/en/city/tehran", title: "Tehran Guide", text: "The capital's construction, medical and employer risks." },
            { href: "/en/city", title: "All City Guides", text: "Twelve English city guides — Shiraz, Tabriz, Ahvaz and more." },
            { href: "/en/faq", title: "FAQ", text: "Fourteen answer-first English answers on Iranian liability insurance." },
            { href: "/en/claims", title: "Claim Process (EN)", text: "Five claim steps, the documents checklist and three FAQs in English." },
            { href: "/en/glossary", title: "Glossary (EN)", text: "Twelve core terms — diyeh, limit, deductible — each with its Persian twin." },
            { href: "/en/dih", title: "Diyeh Reference (EN)", text: "The 1402–1404 blood-money table and how it sets the limit of liability." },
            { href: "/en/about", title: "About the Agency", text: "Who we are, our methodology and how to reach us in English." },
          ].map((q) => (
            <Link
              key={q.href}
              href={q.href}
              className="group rounded-2xl border bg-card p-4 transition-colors hover:border-primary/40"
            >
              <span className="block text-sm font-extrabold group-hover:text-primary">{q.title}</span>
              <span className="mt-1 block text-[13px] leading-6 text-muted-foreground">{q.text}</span>
              <span className="mt-2 inline-flex items-center gap-1 text-xs font-bold text-primary">
                Open
                <ArrowRight className="size-3.5" aria-hidden="true" />
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* EN FAQ */}
      <section aria-label="Frequently asked questions" className="mt-12">
        <FaqSection faqs={enHome.faqs} title={enHome.faqHeading} />
      </section>

      {/* Legal disclaimer */}
      <section aria-label="Disclaimer" className="mt-10">
        <div className="rounded-2xl border border-amber-600/30 bg-amber-500/5 p-4 sm:p-5">
          <p className="text-xs font-bold tracking-wide text-amber-700 dark:text-amber-400">Disclaimer</p>
          <p className="mt-1.5 text-[13px] leading-7 text-muted-foreground">{enDisclaimers.legal}</p>
          <p className="mt-2 text-[13px] leading-7 text-muted-foreground">{enDisclaimers.pricing}</p>
        </div>
        <p className="mt-4 flex items-center gap-1.5 text-xs text-muted-foreground">
          <BadgeCheck className="size-4 text-primary" aria-hidden="true" />
          Official representative of Bimeh Iran — agency code 20616, licensed by Bimeh Iran (Iran Insurance Company).
        </p>
      </section>
    </div>
  );
}
