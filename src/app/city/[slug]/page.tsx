import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Building2, Factory, MapPin } from "lucide-react";
import { AnswerBlock } from "@/components/answer-block";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { CtaBanner } from "@/components/cta-banner";
import { FaqSection } from "@/components/faq-section";
import { ProductCard } from "@/components/product-card";
import { SectionHeading } from "@/components/section-heading";
import { getCity, getCities, getProduct } from "@/lib/data";
import { EN_CITY_GUIDES } from "@/lib/en/cities";
import { faqJsonLd, JsonLd } from "@/lib/seo";
import { siteConfig } from "@/lib/site";

export const revalidate = 3600;

const EN_CITY_SLUGS = new Set(EN_CITY_GUIDES.map((c) => c.slug));

export async function generateStaticParams() {
  const cities = await getCities();
  return cities.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const city = await getCity(slug);
  if (!city) return {};
  // EN twin exists only for the 4 flagship cities in EN_CITY_GUIDES.
  const hasEnTwin = EN_CITY_SLUGS.has(slug);
  return {
    title: `بیمه مسئولیت در ${city.nameFa} — استعلام و صدور بیمه ایران`,
    description: `بیمه مسئولیت در ${city.nameFa}: پوشش‌های متناسب با صنایع ${city.nameFa}، استعلام قیمت و صدور سریع با نمایندگی رسمی بیمه ایران. ${city.intro.slice(0, 90)}`,
    alternates: {
      canonical: `/city/${slug}`,
      ...(hasEnTwin
        ? {
            languages: {
              "fa-IR": `/city/${slug}`,
              en: `/en/city/${slug}`,
              "x-default": `/city/${slug}`,
            },
          }
        : {}),
    },
    openGraph: {
      title: `بیمه مسئولیت در ${city.nameFa}`,
      description: city.intro.slice(0, 150),
      url: `/city/${slug}`,
      images: ["/og.png"],
    },
  };
}

export default async function CityPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const city = await getCity(slug);
  if (!city) notFound();

  const products = (await Promise.all(city.productSlugs.map((s) => getProduct(s)))).filter(
    (p): p is NonNullable<typeof p> => p !== null,
  );

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      <JsonLd data={faqJsonLd(city.faqs)} />

      <Breadcrumbs
        items={[
          { name: "شهرها", href: "/city" },
          { name: `بیمه مسئولیت در ${city.nameFa}`, href: `/city/${city.slug}` },
        ]}
      />

      <header className="mt-6">
        <h1 className="text-2xl font-extrabold leading-snug sm:text-3xl">
          بیمه مسئولیت در {city.nameFa} — استعلام و صدور
        </h1>
        <p className="mt-2 inline-flex items-center gap-1.5 text-sm text-muted-foreground">
          <MapPin className="size-4" aria-hidden="true" />
          استان {city.province} — سرویس‌دهی در سراسر {city.nameFa} و حاشیه شهر
        </p>
        {EN_CITY_SLUGS.has(slug) ? (
          <p className="mt-2 text-xs text-muted-foreground">
            English version of this page:{" "}
            <Link href={`/en/city/${slug}`} className="font-semibold text-primary hover:underline">
              Liability Insurance in {city.nameFa} (EN)
            </Link>
          </p>
        ) : null}
        <div className="mt-4 max-w-3xl">
          <AnswerBlock
            title={`بیمه مسئولیت در ${city.nameFa}`}
            text={city.intro}
          />
        </div>
      </header>

      <section className="mt-10" aria-labelledby="ind-h">
        <SectionHeading
          icon={Factory}
          title={`صنایع فعال ${city.nameFa} و ریسک‌های متناسب`}
          hint="برای هر صنعت، محصول مسئولیت متناسب پیشنهاد شده است."
        />
        <ul className="flex flex-wrap gap-2">
          {city.industries.map((ind, i) => (
            <li
              key={i}
              className="rounded-full border bg-secondary/50 px-4 py-1.5 text-[13px] font-semibold"
            >
              {ind}
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-12" aria-labelledby="prod-h">
        <SectionHeading
          icon={Building2}
          title={`محصولات پیشنهادی برای ${city.nameFa}`}
          hint="با انتخاب محصول، استعلام و صدور برای مشتریان ساکن این شهر همان روز کاری انجام می‌شود."
        />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {products.map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </div>
      </section>

      <section className="mt-12 max-w-4xl">
        <FaqSection faqs={city.faqs} title={`سوالات متداول ${city.nameFa}`} />
      </section>

      <section className="mt-10 rounded-2xl border bg-card p-5 text-sm leading-7">
        <h2 className="font-bold">خدمات حضوری در {city.nameFa}</h2>
        <p className="mt-2 text-muted-foreground">
          صدور و خدمات پس از فروش برای مشتریان {city.nameFa} به‌صورت الکترونیکی و با پشتیبانی تلفنی انجام
          می‌شود؛ بیمه‌نامه چاپی با پست پیشتاز ارسال می‌گردد. برای مشاوره حضوری، با شماره{" "}
          <a href={`tel:${siteConfig.nap.phone}`} dir="ltr" className="font-bold text-primary hover:underline">
            {siteConfig.nap.phoneDisplay}
          </a>{" "}
          هماهنگ کنید.
        </p>
      </section>

      <div className="mt-12">
        <CtaBanner
          productName={`بیمه مسئولیت ${city.nameFa}`}
          title={`استعلام بیمه مسئولیت در ${city.nameFa}`}
          text="فرم استعلام را تکمیل کنید؛ پیش‌فاکتور رسمی با نرخ مصوب بیمه ایران صادر می‌شود."
        />
      </div>
    </div>
  );
}
