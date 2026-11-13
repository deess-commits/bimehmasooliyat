// ─── لایه محتوای استاتیک — بدون دیتابیس ─────────────────────────────
// منبع حقیقت محتوا، فایل‌های prisma/seed-data است. این ماژول همان
// کوئری‌های قبلی را معادل‌سازی می‌کند تا خروجی تمام صفحات بایت‌به‌بایت
// با نسخه دیتابیس‌محور یکسان بماند؛ اما هیچ دسترسی به دیتابیس ندارد.
// مزیت: تمام صفحات محتوایی روی Vercel کاملاً استاتیک/ISR از CDN سرو
// می‌شوند — سریع‌تر، ارزان‌تر و بدون وابستگی به runtime دیتابیس.
// دیتابیس فقط برای داده‌های کاربر استفاده می‌شود:
//   استعلام‌ها → /api/quote | پیام‌ها → /api/contact
//   خبرنامه → /api/newsletter | نظرات (پویا) → lib/reviews.ts

import type {
  CategoryKey,
  SeedArticle,
  SeedCity,
  SeedFaq,
  SeedGeneralFaq,
  SeedGlossaryTerm,
  SeedProduct,
} from "@/prisma/seed-data/types";
import { searchProducts as faSearchProducts } from "@/lib/product-search";
import { professionalProducts } from "@/prisma/seed-data/products-professional";
import { commercialProducts } from "@/prisma/seed-data/products-commercial";
import { corporatePublicProducts } from "@/prisma/seed-data/products-corporate-public";
import { cities as citySeed } from "@/prisma/seed-data/cities";
import { articles as articleSeed } from "@/prisma/seed-data/articles";
import { glossaryTerms as glossarySeed } from "@/prisma/seed-data/glossary";
import {
  categories as categorySeed,
  authors as authorSeed,
  generalFaqs,
  legalSourceItems,
} from "@/prisma/seed-data/site";

// تاریخ درج seed (تقویم نمایشی مقالات — همان مقدار دیتابیس قبلی)
const SEED_PUBLISHED_AT_MS = 1792909426347;

// ─── محصولات ───────────────────────────────────────────────────────

// ترتیب seed: professional → commercial → corporatePublic و order = i+1
// (مطابق prisma/seed.ts) — سپس مرتب‌سازی نهایی order asc (و nameFa به‌عنوان
// tiebreak، مطابق orderBy قبلی دیتابیس)
const sortedProducts: SeedProduct[] = [
  ...professionalProducts,
  ...commercialProducts,
  ...corporatePublicProducts,
]
  .map((p, i) => ({ p, order: i + 1 }))
  .sort((a, b) => a.order - b.order || a.p.nameFa.localeCompare(b.p.nameFa, "fa"))
  .map((x) => x.p);

/** همان خروجی mapProduct قبلی — faqs همیشه خالی (از getProductFaqs جداگانه خوانده می‌شود) */
function toPublicProduct(p: SeedProduct): SeedProduct {
  return { ...p, featured: p.featured ?? false, faqs: [] };
}

export async function getAllProducts(): Promise<SeedProduct[]> {
  return sortedProducts.map(toPublicProduct);
}

export async function getProductsByCategory(
  key: CategoryKey,
): Promise<SeedProduct[]> {
  return sortedProducts
    .filter((p) => p.category === key)
    .map(toPublicProduct);
}

export async function getProduct(slug: string): Promise<SeedProduct | null> {
  const p = sortedProducts.find((p) => p.slug === slug);
  return p ? toPublicProduct(p) : null;
}

export async function getFeaturedProducts(limit = 4): Promise<SeedProduct[]> {
  return sortedProducts
    .filter((p) => p.featured)
    .sort((a, b) => a.phase - b.phase)
    .slice(0, limit)
    .map(toPublicProduct);
}

export async function searchProducts(q: string): Promise<SeedProduct[]> {
  if (!q.trim()) return [];
  // موتور جست‌وجوی توکنی فارسی با مترادف‌ها (پزشک چشم → پزشکان)
  return faSearchProducts(sortedProducts, q)
    .slice(0, 12)
    .map((r) => toPublicProduct(r.product));
}

// ─── سوالات متداول ─────────────────────────────────────────────────

export async function getProductFaqs(slug: string): Promise<SeedFaq[]> {
  const p = sortedProducts.find((p) => p.slug === slug);
  return p ? p.faqs.map((f) => ({ question: f.question, answer: f.answer })) : [];
}

export async function getGeneralFaqs(): Promise<SeedGeneralFaq[]> {
  return generalFaqs.map((f) => ({
    question: f.question,
    answer: f.answer,
    group: f.group,
  }));
}

// ─── شهرها ─────────────────────────────────────────────────────────

const sortedCities: SeedCity[] = [...citySeed].sort((a, b) => a.order - b.order);

export async function getCities(): Promise<SeedCity[]> {
  return sortedCities;
}

export async function getCity(slug: string): Promise<SeedCity | null> {
  return sortedCities.find((c) => c.slug === slug) ?? null;
}

/** شهرهایی که این محصول در فهرست خدمات‌شان است — لینک‌سازی متقابل شهر↔محصول */
export async function getCitiesForProduct(slug: string): Promise<SeedCity[]> {
  return sortedCities.filter((c) => c.productSlugs.includes(slug)).slice(0, 6);
}

// ─── مقالات ────────────────────────────────────────────────────────

export type StaticArticle = SeedArticle & { publishedAt: Date; updatedAt: Date };

export async function getArticles(): Promise<StaticArticle[]> {
  // ترتیب آرایه = ترتیب inجکشن seed = publishedAt asc دیتابیس قبلی
  return articleSeed.map((a) => ({
    ...a,
    publishedAt: new Date(SEED_PUBLISHED_AT_MS),
    updatedAt: new Date(SEED_PUBLISHED_AT_MS),
  }));
}

export async function getArticle(slug: string): Promise<StaticArticle | null> {
  const a = articleSeed.find((a) => a.slug === slug);
  if (!a) return null;
  return {
    ...a,
    publishedAt: new Date(SEED_PUBLISHED_AT_MS),
    updatedAt: new Date(SEED_PUBLISHED_AT_MS),
  };
}

// ─── نویسندگان و منابع حقوقی ───────────────────────────────────────

export async function getAuthors() {
  return [...authorSeed].sort((a, b) => a.order - b.order);
}

export async function getLegalSources() {
  return legalSourceItems.map((l) => ({
    title: l.title,
    reference: l.reference,
    description: l.description,
  }));
}

export async function getCategories() {
  return [...categorySeed]
    .sort((a, b) => a.order - b.order)
    .map((c) => ({
      key: c.key,
      nameFa: c.nameFa,
      nameEn: c.nameEn,
      descriptionFa: c.descriptionFa,
      icon: c.icon ?? "Sparkles",
      order: c.order,
    }));
}

// ─── واژه‌نامه ──────────────────────────────────────────────────────

export async function getGlossaryTerms(): Promise<SeedGlossaryTerm[]> {
  // ترتیب آرایه = order asc دیتابیس قبلی
  return glossarySeed.map((t) => ({
    slug: t.slug,
    title: t.title,
    category: t.category,
    short: t.short,
    body: t.body,
    related: t.related ?? [],
    relatedProducts: t.relatedProducts ?? [],
  }));
}

export async function getGlossaryTerm(
  slug: string,
): Promise<SeedGlossaryTerm | null> {
  const t = glossarySeed.find((t) => t.slug === slug);
  if (!t) return null;
  return {
    slug: t.slug,
    title: t.title,
    category: t.category,
    short: t.short,
    body: t.body,
    related: t.related ?? [],
    relatedProducts: t.relatedProducts ?? [],
  };
}

// ─── برچسب گروه‌های سوالات متداول عمومی ────────────────────────────

export const FAQ_GROUP_LABEL: Record<SeedGeneralFaq["group"], string> = {
  definition: "تعریف و مفاهیم",
  coverage: "پوشش‌ها و استثناها",
  price: "قیمت و سقف تعهد",
  claim: "خسارت و دعاوی",
  compare: "مقایسه و انتخاب",
};
