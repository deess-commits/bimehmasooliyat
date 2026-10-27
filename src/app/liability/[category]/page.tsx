import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { CtaBanner } from "@/components/cta-banner";
import { AnswerBlock } from "@/components/answer-block";
import { ProductCard } from "@/components/product-card";
import { JsonLd, itemListJsonLd } from "@/lib/seo";
import { getCategories, getProductsByCategory } from "@/lib/data";
import type { CategoryKey } from "@/prisma/seed-data/types";

export const revalidate = 3600;

const VALID: CategoryKey[] = ["professional", "commercial", "corporate", "public"];

export async function generateStaticParams() {
  return VALID.map((category) => ({ category }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>;
}): Promise<Metadata> {
  const { category } = await params;
  if (!VALID.includes(category as CategoryKey)) return {};
  const cats = await getCategories();
  const cat = cats.find((c) => c.key === category);
  if (!cat) return {};
  return {
    title: `بیمه مسئولیت ${cat.nameFa} — انواع، پوشش‌ها و قیمت`,
    description: cat.descriptionFa.slice(0, 155),
    alternates: {
      canonical: `/liability/${category}`,
      languages: {
        "fa-IR": `/liability/${category}`,
        en: `/en/liability/${category}`,
        "x-default": `/liability/${category}`,
      },
    },
    openGraph: {
      title: `بیمه مسئولیت ${cat.nameFa}`,
      description: cat.descriptionFa,
      url: `/liability/${category}`,
      images: ["/og.png"],
    },
  };
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  if (!VALID.includes(category as CategoryKey)) notFound();

  const [cats, products] = await Promise.all([
    getCategories(),
    getProductsByCategory(category as CategoryKey),
  ]);
  const cat = cats.find((c) => c.key === category);
  if (!cat) notFound();

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      <JsonLd
        data={itemListJsonLd({
          name: `بیمه مسئولیت ${cat.nameFa} — فهرست محصولات`,
          url: `/liability/${category}`,
          items: products.map((p) => ({
            name: p.nameFa,
            href: `/liability/${p.category}/${p.slug}`,
          })),
        })}
      />
      <Breadcrumbs
        items={[
          { name: "انواع بیمه مسئولیت", href: "/liability" },
          { name: cat.nameFa, href: `/liability/${category}` },
        ]}
      />

      <header className="mt-6">
        <h1 className="text-2xl font-extrabold leading-snug sm:text-3xl">
          بیمه مسئولیت {cat.nameFa} — {products.length} محصول تخصصی
        </h1>
        <div className="mt-4 max-w-3xl">
          <AnswerBlock title="پاسخ کوتاه" text={cat.descriptionFa} />
        </div>
      </header>

      <section className="mt-8" aria-label={`محصولات بیمه مسئولیت ${cat.nameFa}`}>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {products.map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </div>
      </section>

      <div className="mt-12">
        <CtaBanner
          title={`بیمه مسئولیت ${cat.nameFa} خود را انتخاب کنید`}
          text="پس از انتخاب محصول، استعلام قیمت و مشاوره سقف تعهد رایگان است."
        />
      </div>
    </div>
  );
}
