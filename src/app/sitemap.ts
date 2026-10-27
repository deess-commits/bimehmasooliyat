import type { MetadataRoute } from "next";
import { getArticles, getCities, getAllProducts, getGlossaryTerms } from "@/lib/data";
import { claimGuides } from "@/prisma/seed-data/claim-guides";
import { EN_PAGES } from "@/lib/en/config";
import { EN_CITY_GUIDES } from "@/lib/en/cities";
import { INDUSTRIES } from "@/lib/industry";
import { siteConfig } from "@/lib/site";

export const revalidate = 3600;

// اسلاگ صنایع از لایه داده صنعت (SSOT) — با افزودن صنعت جدید، sitemap خودکار به‌روز می‌شود
const INDUSTRY_SLUGS = INDUSTRIES.map((i) => i.slug);

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [products, cities, articles, glossary] = await Promise.all([
    getAllProducts(),
    getCities(),
    getArticles(),
    getGlossaryTerms(),
  ]);
  const now = new Date();

  const staticPages: MetadataRoute.Sitemap = [
    { url: `${siteConfig.url}/`, priority: 1, changeFrequency: "daily", lastModified: now },
    { url: `${siteConfig.url}/liability`, priority: 0.9, changeFrequency: "daily", lastModified: now },
    { url: `${siteConfig.url}/city`, priority: 0.7, changeFrequency: "weekly", lastModified: now },
    { url: `${siteConfig.url}/quote`, priority: 0.9, changeFrequency: "weekly", lastModified: now },
    { url: `${siteConfig.url}/claims`, priority: 0.8, changeFrequency: "weekly", lastModified: now },
    { url: `${siteConfig.url}/price`, priority: 0.7, changeFrequency: "weekly", lastModified: now },
    { url: `${siteConfig.url}/reviews`, priority: 0.5, changeFrequency: "weekly", lastModified: now },
    { url: `${siteConfig.url}/dih`, priority: 0.8, changeFrequency: "weekly", lastModified: now },
    { url: `${siteConfig.url}/compare`, priority: 0.7, changeFrequency: "weekly", lastModified: now },
    { url: `${siteConfig.url}/industry`, priority: 0.7, changeFrequency: "weekly", lastModified: now },
    ...INDUSTRY_SLUGS.map((slug) => ({
      url: `${siteConfig.url}/industry/${slug}`,
      priority: 0.6,
      changeFrequency: "monthly" as const,
      lastModified: now,
    })),
    { url: `${siteConfig.url}/coverage-limit`, priority: 0.7, changeFrequency: "monthly", lastModified: now },
    { url: `${siteConfig.url}/deductible`, priority: 0.7, changeFrequency: "monthly", lastModified: now },
    { url: `${siteConfig.url}/renewal`, priority: 0.7, changeFrequency: "monthly", lastModified: now },
    { url: `${siteConfig.url}/documents`, priority: 0.7, changeFrequency: "monthly", lastModified: now },
    // راهنماهای عمومی ۵ و ۶ (دسته ۲۸): الزام قانونی + تفاوت با خسارتی
    { url: `${siteConfig.url}/liability-mandatory`, priority: 0.7, changeFrequency: "monthly", lastModified: now },
    { url: `${siteConfig.url}/liability-vs-other-insurance`, priority: 0.7, changeFrequency: "monthly", lastModified: now },
    // راهنماهای عمومی ۷ و ۸ (دسته ۲۹): چک‌لیست امضا + شرکت تازه‌تأسیس
    { url: `${siteConfig.url}/policy-review-checklist`, priority: 0.7, changeFrequency: "monthly", lastModified: now },
    { url: `${siteConfig.url}/startup-guide`, priority: 0.7, changeFrequency: "monthly", lastModified: now },
    // راهنماهای عمومی ۹ و ۱۰ (دسته ۳۰): قراردادها + حرفه‌ای/عمومی
    { url: `${siteConfig.url}/contract-tender`, priority: 0.7, changeFrequency: "monthly", lastModified: now },
    { url: `${siteConfig.url}/professional-vs-general`, priority: 0.7, changeFrequency: "monthly", lastModified: now },
    // راهنماهای عمومی ۱۱ و ۱۲ (دسته ۳۱): گروه‌های درمانی + رویدادها
    { url: `${siteConfig.url}/medical-liability-guide`, priority: 0.7, changeFrequency: "monthly", lastModified: now },
    { url: `${siteConfig.url}/events-insurance-guide`, priority: 0.7, changeFrequency: "monthly", lastModified: now },
    { url: `${siteConfig.url}/guides`, priority: 0.7, changeFrequency: "monthly", lastModified: now },
    { url: `${siteConfig.url}/blog`, priority: 0.7, changeFrequency: "weekly", lastModified: now },
    { url: `${siteConfig.url}/glossary`, priority: 0.7, changeFrequency: "weekly", lastModified: now },
    { url: `${siteConfig.url}/faq`, priority: 0.7, changeFrequency: "weekly", lastModified: now },
    { url: `${siteConfig.url}/laws`, priority: 0.6, changeFrequency: "monthly", lastModified: now },
    { url: `${siteConfig.url}/about`, priority: 0.5, changeFrequency: "monthly", lastModified: now },
    { url: `${siteConfig.url}/contact`, priority: 0.5, changeFrequency: "monthly", lastModified: now },
    { url: `${siteConfig.url}/privacy`, priority: 0.3, changeFrequency: "yearly", lastModified: now },
    { url: `${siteConfig.url}/terms`, priority: 0.3, changeFrequency: "yearly", lastModified: now },
  ];

  const categoryPages: MetadataRoute.Sitemap = [
    "professional",
    "commercial",
    "corporate",
    "public",
  ].map((key) => ({
    url: `${siteConfig.url}/liability/${key}`,
    priority: 0.8,
    changeFrequency: "weekly",
    lastModified: now,
  }));

  const productPages: MetadataRoute.Sitemap = products.map((p) => ({
    url: `${siteConfig.url}/liability/${p.category}/${p.slug}`,
    priority: 0.9,
    changeFrequency: "weekly",
    // lastmod واقعی = تاریخ بازبینی محتوای همان محصول (سیگنال تازگی دقیق)
    lastModified: new Date(p.reviewDate),
  }));

  const cityPages: MetadataRoute.Sitemap = cities.map((c) => ({
    url: `${siteConfig.url}/city/${c.slug}`,
    priority: 0.6,
    changeFrequency: "monthly",
    lastModified: now,
  }));

  const articlePages: MetadataRoute.Sitemap = articles.map((a) => ({
    url: `${siteConfig.url}/blog/${a.slug}`,
    priority: 0.7,
    changeFrequency: "monthly",
    lastModified: a.updatedAt,
  }));

  const glossaryPages: MetadataRoute.Sitemap = glossary.map((t) => ({
    url: `${siteConfig.url}/glossary/${t.slug}`,
    priority: 0.5,
    changeFrequency: "monthly",
    lastModified: now,
  }));

  const claimGuidePages: MetadataRoute.Sitemap = claimGuides.map((g) => ({
    url: `${siteConfig.url}/claims/${g.slug}`,
    priority: 0.7,
    changeFrequency: "monthly",
    lastModified: now,
  }));

  // English edition (GEO/AIO): home, hub, 4 category pages and all 33 product pages
  const enStaticPages: MetadataRoute.Sitemap = [
    { url: `${siteConfig.url}/en`, priority: 0.9, changeFrequency: "weekly", lastModified: now },
    { url: `${siteConfig.url}/en/liability`, priority: 0.8, changeFrequency: "weekly", lastModified: now },
    { url: `${siteConfig.url}/en/city`, priority: 0.6, changeFrequency: "weekly", lastModified: now },
    { url: `${siteConfig.url}/en/price`, priority: 0.7, changeFrequency: "weekly", lastModified: now },
    { url: `${siteConfig.url}/en/compare`, priority: 0.7, changeFrequency: "weekly", lastModified: now },
    { url: `${siteConfig.url}/en/claims`, priority: 0.6, changeFrequency: "weekly", lastModified: now },
    { url: `${siteConfig.url}/en/glossary`, priority: 0.6, changeFrequency: "monthly", lastModified: now },
    { url: `${siteConfig.url}/en/faq`, priority: 0.6, changeFrequency: "weekly", lastModified: now },
    { url: `${siteConfig.url}/en/about`, priority: 0.5, changeFrequency: "monthly", lastModified: now },
  ];

  const enCategoryPages: MetadataRoute.Sitemap = EN_PAGES.map((p) => p.category)
    .filter((c, i, arr) => arr.indexOf(c) === i)
    .map((key) => ({
      url: `${siteConfig.url}/en/liability/${key}`,
      priority: 0.8,
      changeFrequency: "weekly",
      lastModified: now,
    }));

  const enProductPages: MetadataRoute.Sitemap = EN_PAGES.map((p) => ({
    url: `${siteConfig.url}/en/liability/${p.category}/${p.slug}`,
    priority: 0.8,
    changeFrequency: "weekly",
    lastModified: now,
  }));

  const enCityPages: MetadataRoute.Sitemap = EN_CITY_GUIDES.map((c) => ({
    url: `${siteConfig.url}/en/city/${c.slug}`,
    priority: 0.6,
    changeFrequency: "monthly",
    lastModified: now,
  }));

  // EN claim guides (19-a) + EN diyeh reference (19-b)
  const EN_CLAIM_SLUGS = ["medical", "employers", "public", "elevators", "contractors", "product-liability"];
  const enClaimGuidePages: MetadataRoute.Sitemap = EN_CLAIM_SLUGS.map((slug) => ({
    url: `${siteConfig.url}/en/claims/${slug}`,
    priority: 0.6,
    changeFrequency: "monthly",
    lastModified: now,
  }));
  const enDihPage: MetadataRoute.Sitemap = [
    { url: `${siteConfig.url}/en/dih`, priority: 0.6, changeFrequency: "monthly", lastModified: now },
  ];
  // EN general guides (24-d): coverage-limit + deductible minis; EN renewal (25-c) + EN documents (26-b); EN minis + hub (28-c)
  const enGuidePages: MetadataRoute.Sitemap = [
    { url: `${siteConfig.url}/en/coverage-limit`, priority: 0.6, changeFrequency: "monthly", lastModified: now },
    { url: `${siteConfig.url}/en/deductible`, priority: 0.6, changeFrequency: "monthly", lastModified: now },
    { url: `${siteConfig.url}/en/renewal`, priority: 0.6, changeFrequency: "monthly", lastModified: now },
    { url: `${siteConfig.url}/en/documents`, priority: 0.6, changeFrequency: "monthly", lastModified: now },
    { url: `${siteConfig.url}/en/liability-mandatory`, priority: 0.6, changeFrequency: "monthly", lastModified: now },
    { url: `${siteConfig.url}/en/liability-vs-other-insurance`, priority: 0.6, changeFrequency: "monthly", lastModified: now },
    { url: `${siteConfig.url}/en/guides`, priority: 0.6, changeFrequency: "monthly", lastModified: now },
  ];
  // EN industry mini-hub (21-d)
  const enIndustryPage: MetadataRoute.Sitemap = [
    { url: `${siteConfig.url}/en/industry`, priority: 0.6, changeFrequency: "monthly", lastModified: now },
  ];

  return [
    ...staticPages,
    ...categoryPages,
    ...productPages,
    ...cityPages,
    ...articlePages,
    ...glossaryPages,
    ...claimGuidePages,
    ...enStaticPages,
    ...enCategoryPages,
    ...enProductPages,
    ...enCityPages,
    ...enClaimGuidePages,
    ...enDihPage,
    ...enGuidePages,
    ...enIndustryPage,
  ];
}
