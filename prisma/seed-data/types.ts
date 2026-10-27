// ─── Seed Data Contract ────────────────────────────────────────────
// قرارداد داده برای همه فایل‌های seed. هر ایجنت محتوا باید دقیقاً همین
// اشکال (types) را خروجی بدهد. محتوا: فارسی، لحن حقوقی-فنی، بدون وعده قطعی.
// قواعد AIO: هر answerBlock و هر پاسخ FAQ بین ۴۰ تا ۶۰ کلمه مستقل و قابل‌استناد.

export type CategoryKey = "professional" | "commercial" | "corporate" | "public";

export interface SeedFaq {
  question: string;
  answer: string; // 40-60 words
}

export interface SeedStep {
  title: string;
  description: string; // 1-2 sentences
}

export interface SeedCoverage {
  title: string;
  description: string;
}

export interface SeedLegalSource {
  title: string;
  reference: string; // e.g. «قانون مسئولیت مدنی، ماده ۱»
}

export interface SeedProduct {
  slug: string; // kebab-case english
  category: CategoryKey;
  nameFa: string; // بیمه مسئولیت …
  nameEn: string;
  audienceFa: string; // مخاطب — یک عبارت
  summaryFa: string; // ~15-20 words برای کارت
  answerBlock: string; // 40-60 words — مستقل و قابل استناد
  whoCovered: string[]; // 4-6 items
  coverages: SeedCoverage[]; // 5-7
  exclusions: string[]; // 4-6 — الزامی و صریح
  conditions: string[]; // 3-5
  documents: string[]; // 4-6
  buySteps: SeedStep[]; // 4-5
  claimSteps: SeedStep[]; // 5-6
  faqs: SeedFaq[]; // 5-8 — پاسخ‌ها 40-60 کلمه
  legalSources: SeedLegalSource[]; // 2-4
  keywords: string[]; // 5-8 فارسی + ۱-۲ انگلیسی
  seoTitle: string; // ≤60 chars
  seoDescription: string; // ~140-160 chars
  priceFromFa?: string; // «از X میلیون تومان در سال» — اختیاری و نمایشی
  phase: 1 | 2;
  featured?: boolean;
  reviewDate: string; // '2025-11-20' ISO
}

export interface SeedCity {
  slug: string;
  nameFa: string;
  province: string;
  intro: string; // 60-90 words — چشم‌انداز ریسک مسئولیت این شهر
  industries: string[]; // 4-6
  productSlugs: string[]; // 4-6 معتبر از لیست محصولات
  faqs: SeedFaq[]; // 2-3 — خاص همان شهر
  order: number;
}

export interface SeedArticleSection {
  heading: string; // H2
  body: string; // 2-5 جمله، پاسخ اول
  list?: string[];
  table?: { headers: string[]; rows: string[][] };
}

export interface SeedArticle {
  slug: string;
  title: string;
  excerpt: string; // ~25-35 words
  sections: SeedArticleSection[]; // 4-7
  faqs: SeedFaq[]; // 3-4
  keywords: string[];
  seoTitle: string;
  seoDescription: string;
  readMinutes: number;
  relatedProductSlug?: string;
  authorSlug: string; // 'lead-expert' | 'legal-reviewer'
  reviewDate: string;
}

export interface SeedAuthor {
  slug: string;
  name: string;
  roleFa: string;
  bio: string; // 40-70 words
  credentials: string[]; // 3-4
  order: number;
}

export type GeneralFaqGroup = "definition" | "coverage" | "price" | "claim" | "compare";

export interface SeedGeneralFaq {
  question: string;
  answer: string; // 40-60 words
  group: GeneralFaqGroup;
}

export interface SeedCategory {
  key: CategoryKey;
  nameFa: string;
  nameEn: string;
  descriptionFa: string; // 40-60 words
  icon: string; // lucide icon name e.g. 'Stethoscope'
  order: number;
}

export interface SeedLegalSourceItem {
  title: string;
  reference: string;
  description: string;
}

// آمار دیه — نمایشی؛ باید با ابلاغیه رسمی قوه قضائیه سال جاری تطبیق شود
export interface SeedDiyehRow {
  year: string; // '1402'
  standardFa: string; // دیه کامل ماه عادی (تومان)
  sacredFa: string; // دیه کامل ماه حرام (تومان)
}

// ─── Glossary (واژه‌نامه) ──────────────────────────────────────────

export type GlossaryCategory = "base" | "legal" | "coverage" | "claim" | "market";

export interface SeedGlossaryTerm {
  slug: string; // kebab-case english
  title: string; // عنوان فارسی واژه
  category: GlossaryCategory;
  short: string; // ۱۵-۲۵ کلمه — تعریف فشرده برای کارت
  body: string; // ۱۰۰-۱۸۰ کلمه — پاسخ اول، مستقل و قابل استناد
  related?: string[]; // slug واژه‌های مرتبط
  relatedProducts?: string[]; // slug محصول مرتبط
}

// ─── Claim Guides & Cases (راهنمای خسارت + سناریوهای آموزشی) ────────

export interface SeedClaimGuide {
  slug: string; // medical | employers | public | elevators
  title: string; // راهنمای اعلام خسارت …
  answerBlock: string; // ۴۰-۶۰ کلمه مستقل
  intro: string; // ۶۰-۹۰ کلمه
  steps: SeedStep[]; // ۶-۷ مرحله از اعلام تا پرداخت
  documents: string[]; // ۵-۷ مدرک
  deadlines: { title: string; text: string }[]; // ۲-۴ مهلت کلیدی
  tips: string[]; // ۳-۵ اشتباه رایج / توصیه
  faqs: SeedFaq[]; // ۳ پاسخ ۴۰-۶۰ کلمه‌ای
  relatedProducts: string[]; // ۲-۴ slug معتبر محصول
  reviewDate: string; // ISO
}

export interface SeedClaimCase {
  slug: string;
  title: string; // سناریوی آموزشی: …
  scenario: string; // ۵۰-۸۰ کلمه شرح واقع‌نما (برچسب آموزشی الزامی در رندر)
  liability: string; // ۴۰-۶۰ کلمه تحلیل مسئولیت
  settlement: string; // ۴۰-۶۰ کلمه نحوه تسویه
  lesson: string; // ۲۰-۳۵ کلمه درس کلیدی
  relatedProducts: string[]; // ۱-۳ slug معتبر
}
