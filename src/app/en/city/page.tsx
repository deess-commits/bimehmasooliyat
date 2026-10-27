import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Building2 } from "lucide-react";
import { EnAnswerBlock, EnBreadcrumbs, EnSectionHeading } from "@/components/en/en-blocks";
import { CtaBanner } from "@/components/cta-banner";
import { EN_CITY_GUIDES } from "@/lib/en/cities";
import { itemListJsonLd, JsonLd } from "@/lib/seo";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: { absolute: "Liability Insurance City Guides in Iran | English Edition" },
  description:
    "English guides to liability insurance in 12 major Iranian cities — Tehran, Mashhad, Isfahan, Kish, Shiraz, Tabriz and more — with local industries, recommended coverages and quotation steps.",
  alternates: {
    canonical: "/en/city",
    languages: {
      en: "/en/city",
      "fa-IR": "/city",
      "x-default": "/city",
    },
  },
  openGraph: {
    title: "Liability Insurance City Guides in Iran | English Edition",
    description:
      "English liability-insurance guides for 12 major Iranian cities, each linked to full English product guides.",
    url: "/en/city",
    type: "website",
    locale: "en_US",
  },
};

export default function EnCityHubPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      <JsonLd
        data={itemListJsonLd({
          name: "Liability insurance city guides in Iran (English)",
          url: "/en/city",
          items: EN_CITY_GUIDES.map((c) => ({
            name: `Liability Insurance in ${c.nameEn}`,
            href: `/en/city/${c.slug}`,
          })),
        })}
      />

      <EnBreadcrumbs items={[{ name: "City Guides", href: "/en/city" }]} />

      <header className="mt-6 max-w-3xl">
        <h1 className="text-2xl font-extrabold leading-tight sm:text-3xl">
          Liability Insurance in Iran — City Guides
        </h1>
      </header>

      <div className="mt-6 max-w-3xl">
        <EnAnswerBlock text="These English city guides explain the local liability-risk landscape of twelve major Iranian cities — from Tehran's dense construction to Ahvaz's heavy industry — and link each recommendation to a full English product guide. Coverage terms and Bimeh Iran tariffs are identical nationwide; cities differ in prevailing industries, property values and claims handling. The complete 44-city network is published in the authoritative Persian edition." />
      </div>

      <section aria-labelledby="en-city-hub-h" className="mt-10">
        <EnSectionHeading title="All English city guides" icon={Building2} />
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {EN_CITY_GUIDES.map((c) => {
            const angle = c.title.split("—")[1]?.trim() ?? "";
            return (
              <li key={c.slug}>
                <Link
                  href={`/en/city/${c.slug}`}
                  className="group flex h-full flex-col rounded-2xl border bg-card p-5 transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md"
                >
                  <h2 className="text-[15px] font-bold leading-6 group-hover:text-primary">
                    Liability Insurance in {c.nameEn}
                  </h2>
                  <p className="mt-1.5 text-[13px] leading-6 text-muted-foreground">{angle}</p>
                  <span className="mt-3 inline-flex items-center gap-1 text-sm font-bold text-primary">
                    Read the guide
                    <ArrowRight className="size-3.5" aria-hidden="true" />
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </section>

      <section className="mt-10 max-w-3xl">
        <div className="rounded-2xl border bg-card p-5">
          <h2 className="text-sm font-bold">The full 44-city network is in Persian</h2>
          <p className="mt-2 text-sm leading-7 text-muted-foreground">
            Every Iranian city has its own Persian guide with local industries, product
            recommendations and city-specific FAQs.{" "}
            <Link href="/city" className="font-semibold text-primary hover:underline">
              Browse all 44 Persian city guides
            </Link>{" "}
            — the Persian edition is the authoritative version of this site.
          </p>
        </div>
      </section>

      <div className="mt-10">
        <CtaBanner
          title="Get an official quotation for your city"
          text="The quotation form is in Persian — English-speaking visitors can also email us and a consultant will respond in English, usually within one business day."
        />
      </div>
    </div>
  );
}
