// ─── Prisma Seed ───────────────────────────────────────────────────
// Usage: bun run db:seed
import { PrismaClient, Prisma } from "@prisma/client";

// Helper: تبدیل امن آرایه‌های seed به InputJsonValue (قرارداد Json-only در SQLite)
const json = (v: unknown) => v as Prisma.InputJsonValue;

import { professionalProducts } from "./seed-data/products-professional";
import { commercialProducts } from "./seed-data/products-commercial";
import { corporatePublicProducts } from "./seed-data/products-corporate-public";
import { cities } from "./seed-data/cities";
import { articles } from "./seed-data/articles";
import { glossaryTerms } from "./seed-data/glossary";
import {
  categories,
  authors,
  generalFaqs,
  legalSourceItems,
} from "./seed-data/site";

const db = new PrismaClient();

async function main() {
  console.log("🌱 Seeding BimehMasooliyat.ir …");

  // Idempotent: پاک‌سازی ترتیبی
  await db.faq.deleteMany();
  await db.article.deleteMany();
  await db.city.deleteMany();
  await db.liabilityProduct.deleteMany();
  await db.liabilityCategory.deleteMany();
  await db.author.deleteMany();
  await db.legalSource.deleteMany();
  await db.glossaryTerm.deleteMany();

  // Categories
  for (const c of categories) {
    await db.liabilityCategory.create({
      data: {
        key: c.key,
        nameFa: c.nameFa,
        nameEn: c.nameEn,
        descriptionFa: c.descriptionFa,
        icon: c.icon,
        order: c.order,
      },
    });
  }
  console.log(`  ✓ ${categories.length} categories`);

  // Products
  const all = [...professionalProducts, ...commercialProducts, ...corporatePublicProducts];
  for (const [i, p] of all.entries()) {
    await db.liabilityProduct.create({
      data: {
        slug: p.slug,
        categoryKey: p.category,
        nameFa: p.nameFa,
        nameEn: p.nameEn,
        audienceFa: p.audienceFa,
        summaryFa: p.summaryFa,
        answerBlock: p.answerBlock,
        whoCovered: json(p.whoCovered),
        coverages: json(p.coverages),
        exclusions: json(p.exclusions),
        conditions: json(p.conditions),
        documents: json(p.documents),
        buySteps: json(p.buySteps),
        claimSteps: json(p.claimSteps),
        legalSources: json(p.legalSources),
        keywords: json(p.keywords),
        seoTitle: p.seoTitle,
        seoDescription: p.seoDescription,
        priceFromFa: p.priceFromFa ?? null,
        phase: p.phase,
        featured: p.featured ?? false,
        reviewDate: p.reviewDate,
        order: i + 1,
      },
    });
    // Product FAQs
    for (const [j, f] of p.faqs.entries()) {
      await db.faq.create({
        data: {
          question: f.question,
          answer: f.answer,
          productSlug: p.slug,
          order: j + 1,
        },
      });
    }
  }
  console.log(`  ✓ ${all.length} products + product FAQs`);

  // General FAQs
  for (const [i, f] of generalFaqs.entries()) {
    await db.faq.create({
      data: {
        question: f.question,
        answer: f.answer,
        group: f.group,
        order: i + 1,
      },
    });
  }
  console.log(`  ✓ ${generalFaqs.length} general FAQs`);

  // Cities
  for (const c of cities) {
    await db.city.create({
      data: {
        slug: c.slug,
        nameFa: c.nameFa,
        province: c.province,
        intro: c.intro,
        industries: json(c.industries),
        productSlugs: json(c.productSlugs),
        faqs: json(c.faqs),
        order: c.order,
      },
    });
  }
  console.log(`  ✓ ${cities.length} cities`);

  // Articles
  for (const a of articles) {
    await db.article.create({
      data: {
        slug: a.slug,
        title: a.title,
        excerpt: a.excerpt,
        sections: json(a.sections),
        faqs: json(a.faqs),
        keywords: json(a.keywords),
        seoTitle: a.seoTitle,
        seoDescription: a.seoDescription,
        readMinutes: a.readMinutes,
        relatedProductSlug: a.relatedProductSlug ?? null,
        authorSlug: a.authorSlug,
        reviewDate: a.reviewDate,
      },
    });
  }
  console.log(`  ✓ ${articles.length} articles`);

  // Authors + Legal sources
  for (const a of authors) {
    await db.author.create({
      data: {
        slug: a.slug,
        name: a.name,
        roleFa: a.roleFa,
        bio: a.bio,
        credentials: json(a.credentials),
        order: a.order,
      },
    });
  }
  for (const [i, l] of legalSourceItems.entries()) {
    await db.legalSource.create({
      data: { title: l.title, reference: l.reference, description: l.description, order: i + 1 },
    });
  }
  console.log(`  ✓ ${authors.length} authors, ${legalSourceItems.length} legal sources`);

  // Glossary
  for (const [i, t] of glossaryTerms.entries()) {
    await db.glossaryTerm.create({
      data: {
        slug: t.slug,
        title: t.title,
        category: t.category,
        short: t.short,
        body: t.body,
        related: json(t.related ?? []),
        relatedProducts: json(t.relatedProducts ?? []),
        order: i + 1,
      },
    });
  }
  console.log(`  ✓ ${glossaryTerms.length} glossary terms`);

  console.log("✅ Seed complete.");
}

main()
  .catch((e) => {
    console.error("❌ Seed failed:", e);
    process.exit(1);
  })
  .finally(() => db.$disconnect());
