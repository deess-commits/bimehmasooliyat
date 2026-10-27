import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Building2, ShieldCheck } from "lucide-react";
import { EnAnswerBlock, EnBreadcrumbs, EnSectionHeading } from "@/components/en/en-blocks";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FaqSection } from "@/components/faq-section";
import { CtaBanner } from "@/components/cta-banner";
import { EN_CITY_GUIDES, enCityHreflangPair, getEnCityGuide } from "@/lib/en/cities";
import { faqJsonLd, JsonLd, serviceJsonLd } from "@/lib/seo";

export const revalidate = 3600;

export function generateStaticParams() {
  return EN_CITY_GUIDES.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const city = getEnCityGuide(slug);
  if (!city) return {};
  return {
    title: { absolute: city.metaTitle },
    description: city.metaDescription,
    alternates: {
      canonical: `/en/city/${city.slug}`,
      languages: enCityHreflangPair(city.slug),
    },
    openGraph: {
      title: city.metaTitle,
      description: city.metaDescription,
      url: `/en/city/${city.slug}`,
      type: "article",
      locale: "en_US",
    },
  };
}

export default async function EnCityPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const city = getEnCityGuide(slug);
  if (!city) notFound();

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      <JsonLd
        data={serviceJsonLd({
          name: `Liability insurance in ${city.nameEn}, Iran`,
          description: city.answerBlock,
          url: `/en/city/${city.slug}`,
        })}
      />
      <JsonLd data={faqJsonLd(city.faqs)} />

      <EnBreadcrumbs items={[{ name: city.nameEn, href: `/en/city/${city.slug}` }]} />

      <header className="mt-6">
        <h1 className="text-2xl font-extrabold leading-snug sm:text-3xl">{city.title}</h1>
      </header>

      <div className="mt-6 max-w-3xl">
        <EnAnswerBlock text={city.answerBlock} />
      </div>

      {/* Industries */}
      <section aria-labelledby="en-city-industries" className="mt-10 max-w-4xl">
        <h2 id="en-city-industries" className="sr-only">
          Key industries in {city.nameEn}
        </h2>
        <EnSectionHeading title={`Key industries that shape ${city.nameEn}'s risk profile`} icon={Building2} />
        <ul className="flex flex-wrap gap-2">
          {city.industries.map((ind) => (
            <li
              key={ind}
              className="rounded-full border bg-card px-4 py-1.5 text-sm font-medium"
            >
              {ind}
            </li>
          ))}
        </ul>
      </section>

      {/* Recommended products */}
      <section aria-labelledby="en-city-products" className="mt-12">
        <h2 id="en-city-products" className="sr-only">
          Recommended coverages in {city.nameEn}
        </h2>
        <EnSectionHeading title={`Recommended coverages for ${city.nameEn}`} icon={ShieldCheck} />
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {city.productRefs.map((ref) => (
            <Card key={ref.slug}>
              <CardHeader className="pb-2">
                <CardTitle className="text-[15px] leading-6">{ref.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <Link
                  href={`/en/liability/${ref.category}/${ref.slug}`}
                  className="inline-flex items-center gap-1 text-sm font-bold text-primary hover:underline"
                >
                  Read the full English guide
                  <ArrowRight className="size-3.5" aria-hidden="true" />
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="mx-auto mt-12 max-w-4xl">
        <FaqSection faqs={city.faqs} title={`${city.nameEn} liability insurance — FAQs`} />
      </section>

      {/* Persian twin */}
      <section className="mt-10 max-w-3xl">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Persian twin page (authoritative)</CardTitle>
          </CardHeader>
          <CardContent className="text-sm leading-7 text-muted-foreground">
            The complete Persian edition of this guide:{" "}
            <Link href={`/city/${city.slug}`} className="font-semibold text-primary hover:underline">
              بیمه مسئولیت در {city.nameEn} (صفحه فارسی)
            </Link>
          </CardContent>
        </Card>
      </section>

      <div className="mt-10">
        <CtaBanner
          title={`Get an official quotation for ${city.nameEn}`}
          text="The quotation form is in Persian — English-speaking visitors can also email us and a consultant will respond in English, usually within one business day."
        />
      </div>
    </div>
  );
}
