import { db } from "@/lib/db";
import type {
  CategoryKey,
  SeedArticle,
  SeedCity,
  SeedFaq,
  SeedGeneralFaq,
  SeedGlossaryTerm,
  SeedProduct,
} from "@/prisma/seed-data/types";

// ─── Mappers: Prisma row → typed shape ─────────────────────────────

type ProductRow = {
  slug: string;
  categoryKey: string;
  nameFa: string;
  nameEn: string;
  audienceFa: string;
  summaryFa: string;
  answerBlock: string;
  whoCovered: unknown;
  coverages: unknown;
  exclusions: unknown;
  conditions: unknown;
  documents: unknown;
  buySteps: unknown;
  claimSteps: unknown;
  legalSources: unknown;
  keywords: unknown;
  seoTitle: string;
  seoDescription: string;
  priceFromFa: string | null;
  phase: number;
  featured: boolean;
  reviewDate: string;
  order: number;
};

function mapProduct(row: ProductRow): SeedProduct {
  return {
    slug: row.slug,
    category: row.categoryKey as CategoryKey,
    nameFa: row.nameFa,
    nameEn: row.nameEn,
    audienceFa: row.audienceFa,
    summaryFa: row.summaryFa,
    answerBlock: row.answerBlock,
    whoCovered: row.whoCovered as string[],
    coverages: row.coverages as SeedProduct["coverages"],
    exclusions: row.exclusions as string[],
    conditions: row.conditions as string[],
    documents: row.documents as string[],
    buySteps: row.buySteps as SeedProduct["buySteps"],
    claimSteps: row.claimSteps as SeedProduct["claimSteps"],
    legalSources: row.legalSources as SeedProduct["legalSources"],
    keywords: row.keywords as string[],
    seoTitle: row.seoTitle,
    seoDescription: row.seoDescription,
    priceFromFa: row.priceFromFa ?? undefined,
    phase: row.phase as 1 | 2,
    featured: row.featured,
    reviewDate: row.reviewDate,
    faqs: [],
  };
}

// ─── Queries ───────────────────────────────────────────────────────

export async function getAllProducts(): Promise<SeedProduct[]> {
  const rows = await db.liabilityProduct.findMany({
    orderBy: [{ order: "asc" }, { nameFa: "asc" }],
  });
  return rows.map(mapProduct);
}

export async function getProductsByCategory(
  key: CategoryKey,
): Promise<SeedProduct[]> {
  const rows = await db.liabilityProduct.findMany({
    where: { categoryKey: key },
    orderBy: [{ order: "asc" }, { nameFa: "asc" }],
  });
  return rows.map(mapProduct);
}

export async function getProduct(slug: string): Promise<SeedProduct | null> {
  const row = await db.liabilityProduct.findUnique({ where: { slug } });
  return row ? mapProduct(row) : null;
}

export async function getFeaturedProducts(limit = 4): Promise<SeedProduct[]> {
  const rows = await db.liabilityProduct.findMany({
    where: { featured: true },
    orderBy: [{ phase: "asc" }, { order: "asc" }],
    take: limit,
  });
  return rows.map(mapProduct);
}

export async function searchProducts(q: string): Promise<SeedProduct[]> {
  const rows = await db.liabilityProduct.findMany({
    where: {
      OR: [
        { nameFa: { contains: q } },
        { summaryFa: { contains: q } },
        { audienceFa: { contains: q } },
        { nameEn: { contains: q } },
      ],
    },
    orderBy: { order: "asc" },
    take: 12,
  });
  return rows.map(mapProduct);
}

export async function getProductFaqs(slug: string): Promise<SeedFaq[]> {
  const rows = await db.faq.findMany({
    where: { productSlug: slug },
    orderBy: { order: "asc" },
  });
  return rows.map((r) => ({ question: r.question, answer: r.answer }));
}

export async function getGeneralFaqs(): Promise<SeedGeneralFaq[]> {
  const rows = await db.faq.findMany({
    where: { productSlug: null },
    orderBy: { order: "asc" },
  });
  return rows.map((r) => ({
    question: r.question,
    answer: r.answer,
    group: (r.group ?? "definition") as SeedGeneralFaq["group"],
  }));
}

export async function getCities(): Promise<SeedCity[]> {
  const rows = await db.city.findMany({ orderBy: { order: "asc" } });
  return rows.map((r) => ({
    slug: r.slug,
    nameFa: r.nameFa,
    province: r.province,
    intro: r.intro,
    industries: r.industries as unknown as string[],
    productSlugs: r.productSlugs as unknown as string[],
    faqs: r.faqs as unknown as SeedFaq[],
    order: r.order,
  }));
}

export async function getCity(slug: string): Promise<SeedCity | null> {
  const row = await db.city.findUnique({ where: { slug } });
  if (!row) return null;
  return {
    slug: row.slug,
    nameFa: row.nameFa,
    province: row.province,
    intro: row.intro,
    industries: row.industries as unknown as string[],
    productSlugs: row.productSlugs as unknown as string[],
    faqs: row.faqs as unknown as SeedFaq[],
    order: row.order,
  };
}

/** شهرهایی که این محصول در فهرست خدمات‌شان است — لینک‌سازی متقابل شهر↔محصول */
export async function getCitiesForProduct(slug: string): Promise<SeedCity[]> {
  const cities = await getCities();
  return cities.filter((c) => c.productSlugs.includes(slug)).slice(0, 6);
}

export async function getArticles(): Promise<
  (SeedArticle & { publishedAt: Date; updatedAt: Date })[]
> {
  const rows = await db.article.findMany({ orderBy: { publishedAt: "asc" } });
  return rows.map((r) => ({
    slug: r.slug,
    title: r.title,
    excerpt: r.excerpt,
    sections: r.sections as unknown as SeedArticle["sections"],
    faqs: r.faqs as unknown as SeedFaq[],
    keywords: r.keywords as unknown as string[],
    seoTitle: r.seoTitle,
    seoDescription: r.seoDescription,
    readMinutes: r.readMinutes,
    relatedProductSlug: r.relatedProductSlug ?? undefined,
    authorSlug: r.authorSlug,
    reviewDate: r.reviewDate,
    publishedAt: r.publishedAt,
    updatedAt: r.updatedAt,
  }));
}

export async function getArticle(slug: string) {
  const row = await db.article.findUnique({ where: { slug } });
  if (!row) return null;
  const article: SeedArticle & { publishedAt: Date; updatedAt: Date } = {
    slug: row.slug,
    title: row.title,
    excerpt: row.excerpt,
    sections: row.sections as unknown as SeedArticle["sections"],
    faqs: row.faqs as unknown as SeedFaq[],
    keywords: row.keywords as unknown as string[],
    seoTitle: row.seoTitle,
    seoDescription: row.seoDescription,
    readMinutes: row.readMinutes,
    relatedProductSlug: row.relatedProductSlug ?? undefined,
    authorSlug: row.authorSlug,
    reviewDate: row.reviewDate,
    publishedAt: row.publishedAt,
    updatedAt: row.updatedAt,
  };
  return article;
}

export async function getAuthors() {
  const rows = await db.author.findMany({ orderBy: { order: "asc" } });
  return rows.map((r) => ({
    slug: r.slug,
    name: r.name,
    roleFa: r.roleFa,
    bio: r.bio,
    credentials: r.credentials as string[],
    order: r.order,
  }));
}

export async function getLegalSources() {
  const rows = await db.legalSource.findMany({ orderBy: { order: "asc" } });
  return rows.map((r) => ({
    title: r.title,
    reference: r.reference,
    description: r.description,
  }));
}

export async function getCategories() {
  const rows = await db.liabilityCategory.findMany({ orderBy: { order: "asc" } });
  return rows.map((r) => ({
    key: r.key as CategoryKey,
    nameFa: r.nameFa,
    nameEn: r.nameEn,
    descriptionFa: r.descriptionFa,
    icon: r.icon ?? "Sparkles",
    order: r.order,
  }));
}

// ─── Glossary ──────────────────────────────────────────────────────

export async function getGlossaryTerms(): Promise<SeedGlossaryTerm[]> {
  const rows = await db.glossaryTerm.findMany({ orderBy: { order: "asc" } });
  return rows.map((r) => ({
    slug: r.slug,
    title: r.title,
    category: r.category as SeedGlossaryTerm["category"],
    short: r.short,
    body: r.body,
    related: (r.related as string[]) ?? [],
    relatedProducts: (r.relatedProducts as string[] | null) ?? undefined,
  }));
}

export async function getGlossaryTerm(
  slug: string,
): Promise<SeedGlossaryTerm | null> {
  const row = await db.glossaryTerm.findUnique({ where: { slug } });
  if (!row) return null;
  return {
    slug: row.slug,
    title: row.title,
    category: row.category as SeedGlossaryTerm["category"],
    short: row.short,
    body: row.body,
    related: (row.related as string[]) ?? [],
    relatedProducts: (row.relatedProducts as string[] | null) ?? undefined,
  };
}

// ─── Reviews (فقط تأییدشده — بدون رِیتینگ جعلی) ─────────────────────

export interface PublicReview {
  id: string;
  name: string;
  city?: string;
  productSlug?: string;
  rating: number;
  text: string;
  createdAt: Date;
}

export async function getApprovedReviews(
  productSlug?: string,
): Promise<PublicReview[]> {
  const rows = await db.review.findMany({
    where: { status: "approved", ...(productSlug ? { productSlug } : {}) },
    orderBy: { createdAt: "desc" },
    take: 50,
  });
  return rows.map((r) => ({
    id: r.id,
    name: r.name,
    city: r.city ?? undefined,
    productSlug: r.productSlug ?? undefined,
    rating: r.rating,
    text: r.text,
    createdAt: r.createdAt,
  }));
}

export const FAQ_GROUP_LABEL: Record<SeedGeneralFaq["group"], string> = {
  definition: "تعریف و مفاهیم",
  coverage: "پوشش‌ها و استثناها",
  price: "قیمت و سقف تعهد",
  claim: "خسارت و دعاوی",
  compare: "مقایسه و انتخاب",
};
