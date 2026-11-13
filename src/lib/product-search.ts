// ─── موتور جست‌وجوی فارسی محصولات بیمه مسئولیت ──────────────────────
// نرمال‌سازی کامل فارسی (ی/ك عربی، نیم‌فاصله، اعراب، اعداد) + جست‌وجوی
// توکنی + مترادف‌ها؛ مثال: «پزشک چشم» → بیمه مسئولیت پزشکان
// این فایل در سمت کلاینت هم استفاده می‌شود؛ پس فقط داده سبک ایمپورت کنید.

import { DOCTOR_SPECIALTIES, NURSE_SPECIALTIES } from "@/lib/pricing-specialties";
import type { SeedProduct } from "@/prisma/seed-data/types";

/** وزن امتیاز هر فیلد — بالاتر = مرتبط‌تر */
const WEIGHTS = {
  nameFa: 30,
  audienceFa: 20,
  nameEn: 18,
  aliases: 10,
  keywords: 8,
  summaryFa: 4,
} as const;

/** حذف اعراب، یکسان‌سازی حروف عربی/فارسی، حذف نیم‌فاصله و فاصله‌های تکراری */
export function normalizeFa(input: string): string {
  return input
    .toLowerCase()
    .replace(/[\u064B-\u065F\u0670\u0640]/g, "") // اعراب و کشیده
    .replace(/\u200c|\u200f|\u200e/g, "") // نیم‌فاصله و کنترل‌ها
    .replace(/[يى]/g, "ی")
    .replace(/ك/g, "ک")
    .replace(/[ۀة]/g, "ه")
    .replace(/[أإآٱ]/g, "ا")
    .replace(/[ؤ]/g, "و")
    .replace(/[ئ]/g, "ی")
    .replace(/[۰-۹]/g, (d) => String("۰۱۲۳۴۵۶۷۸۹".indexOf(d)))
    .replace(/[٠-٩]/g, (d) => String("٠١٢٣٤٥٦٧٨٩".indexOf(d)))
    .replace(/\s+/g, " ")
    .trim();
}

/** توکن‌های یکتای پرس‌وجو (کلمات کمتر از ۲ حرفِ فارسی حذف نمی‌شوند؛ فقط خالی) */
export function tokenizeQuery(query: string): string[] {
  const normalized = normalizeFa(query);
  if (!normalized) return [];
  return Array.from(new Set(normalized.split(" ").filter((t) => t.length > 0)));
}

// ─── مترادف‌های جست‌وجو به تفکیک محصول ─────────────────────────────
// برچسب‌های تخصص‌های پزشکی/پرستاری از موتور قیمت‌گذاری می‌آید تا هر
// تخصص قابل جست‌وجو باشد (مثلاً «چشم» → لیبل چشم‌پزشکی در تخصص‌ها).

const DOCTOR_LABELS = DOCTOR_SPECIALTIES.map((s) => s.label);
const NURSE_LABELS = NURSE_SPECIALTIES.map((s) => s.label);

const PRODUCT_SEARCH_ALIASES: Record<string, string[]> = {
  "medical-doctors": [
    "پزشک چشم",
    "چشم‌پزشک",
    "چشم‌پزشکی",
    "عینک‌ساز",
    "نظام پزشکی",
    "جراح",
    "جراحی",
    "عمل جراحی",
    "متخصص",
    "فوق تخصص",
    "دستیار",
    "مطب",
    "درمانگاه",
    "کلینیک پزشکی",
    "پزشکی",
    "اورژانس",
    "بیمارستان",
    ...DOCTOR_LABELS,
  ],
  dentists: [
    "دندان",
    "دندانپزشک",
    "دندان‌پزشکی",
    "ایمپلنت",
    "ارتودنسی",
    "پروتز",
    "لثه",
    "سفید کردن دندان",
    "کلینیک دندانپزشکی",
  ],
  "nurses-paramedics": [
    "پرستار",
    "پرستاری",
    "پیراپزشک",
    "بهیار",
    "ماما",
    "مامایی",
    "اتاق عمل",
    "تکنسین",
    "تکنسین اتاق عمل",
    "فیزیوتراپی",
    "فیزیوتراپیست",
    "رادیوگرافی",
    "پرتونگاری",
    "بینایی‌سنجی",
    "گفتاردرمانی",
    "کاردرمانی",
    "آزمایشگاه",
    "کمک بهیار",
    "تزریقات",
    "سرم",
    ...NURSE_LABELS,
  ],
  pharmacists: ["داروخانه", "دارو", "داروساز", "شیمی", "مسئول فنی", "فروش دارو"],
  lawyers: ["وکیل", "وکالت", "حقوق", "حقوقدان", "دادگستری", "مشاور حقوقی", "کارشناس حقوقی"],
  engineers: [
    "مهندس",
    "مهندسی",
    "عمران",
    "معماری",
    "برق",
    "مکانیک",
    "تاسیسات",
    "نقشه‌برداری",
    "شهرسازی",
    "آتش‌نشان مهندس",
    "گاز",
    "نظام مهندسی",
    "ناظر",
    "نظارت",
    "محاسبات",
    "پایه یک",
    "ارشد",
    "طراح",
    "اتاق مهندسی",
  ],
  "accountants-auditors": ["حسابدار", "حسابرس", "حسابرسی", "مالی رسمی", "دفتر مالی"],
  "financial-advisors": ["مشاور مالی", "مالیات", "مالیات‌پرداز", "مشاوره مالیاتی"],
  "real-estate-agents": ["املاک", "مشاور املاک", "بنگاه", "مسکن", "بازرگانی املاک"],
  "translators-official": ["مترجم", "ترجمه", "دارالترجمه", "ترجمه رسمی"],
  notaries: ["سردفتر", "دفتریار", "دفتر اسناد رسمی", "دفتر ازدواج", "اجاره‌نامه"],
  "beauty-salons": [
    "آرایشگاه",
    "زیبایی",
    "پیرایش",
    "سالن زیبایی",
    "ناخن",
    "ابرو",
    "اپیلاسیون",
    "میکروبلیدینگ",
    "لیفت",
    "کراتین",
    "گریم",
  ],
  "it-professionals": [
    "آی‌تی",
    "IT",
    "نرم‌افزار",
    "سخت‌افزار",
    "برنامه‌نویس",
    "دیتا",
    "امنیت سایبری",
    "هاست",
    "توسعه‌دهنده",
  ],
  employers: [
    "کارفرما",
    "کارگر",
    "کارکنان",
    "کارمند",
    "کارگاه",
    "کارخانه",
    "قانون کار",
    "حادثه کار",
    "حوادث کارکنان",
    "کارگر ساختمانی",
  ],
  "product-liability": ["تولیدکننده", "تولید", "کالا", "محصول", "سازنده", "خطای تولید"],
  "public-liability": ["کسبه", "اصناف", "مغازه", "فروشگاه", "عمومی", "ثالث", "نمایشگاه‌دار"],
  contractors: ["پیمانکار", "مقاطعه‌کار", "مقاوله", "پیمان", "پروژه", "بارگذاری"],
  "construction-operations": ["ساختمان", "ساختمانی", "اسکلت", "گودبرداری", "انهدام", "نظارت ساختمان", "تخریب"],
  elevators: ["آسانسور", "بالابر", "پله‌برقی", "نگهدارنده آسانسور", "شرکت آسانسور", "خدمات آسانسور"],
  "property-owners": ["مالک", "ملک", "اجاره‌دهنده", "مستغلات", "متصرف", "ساختمان اجاره‌ای", "مسئولیت مالک"],
  "restaurants-hotels": ["رستوران", "هتل", "کافه", "تالار", "فست‌فود", "پذیرایی", "مسافرخانه", "موکب"],
  kindergartens: ["مهدکودک", "مهد", "کودکستان", "پیش‌دبستانی", "آموزشگاه", "مدرسه", "کلاس آموزشی"],
  "sports-facilities": ["ورزشی", "استخر", "باشگاه", "سونا", "بدنسازی", "پیست", "مجموعه ورزشی", "فیتنس"],
  billboards: ["تابلو", "تبلیغاتی", "بیلبورد", "بیلبُرد", "استرابورد", "تبلیغات محیطی"],
  "transport-carriers": ["حمل‌ونقل", "حمل و نقل", "باربری", "بار", "کامیون", "لوری", "متصدی حمل", "ترانزیت"],
  "fire-third-party": ["آتش‌سوزی", "حریق", "انفجار", "سی‌ان‌ای", "تعمیرکار"],
  "directors-officers": ["دی‌اند‌او", "D&O", "مدیران", "هیئت مدیره", "سهام‌داران", "بورس", "شرکت سهامی"],
  "cyber-liability": ["سایبری", "هک", "نفوذ", "داده", "نشتی داده", "باج‌افزار", "اطلاعاتی"],
  "individuals-family": ["والدین", "خانواده", "سرپرست", "فردی", "فرزند", "متولی"],
  "animal-owners": ["حیوان", "سگ", "گربه", "دام", "نگهداری حیوان", "پت", "اصطبل"],
  "events-insurance": ["رویداد", "همایش", "کنگره", "نمایشگاه", "جشن", "مراسم", "سمینار", "کنفرانس", "برنامه اجرایی"],
  "travel-tours": ["تور", "سیاحتی", "زیارتی", "مسافر", "گردشگری", "راهنمای تور", "کویرنوردی", "سفر"],
  hunters: ["شکارچی", "شکار", "محیط‌بان", "جنگل‌بان", "اسلحه شکاری", "گشت‌محیطی"],
};

function fieldsFor(product: SeedProduct): { text: string; weight: number }[] {
  const aliases = PRODUCT_SEARCH_ALIASES[product.slug] ?? [];
  const fields: { text: string; weight: number }[] = [
    { text: normalizeFa(product.nameFa), weight: WEIGHTS.nameFa },
    { text: normalizeFa(product.audienceFa ?? ""), weight: WEIGHTS.audienceFa },
    { text: normalizeFa(product.nameEn ?? ""), weight: WEIGHTS.nameEn },
    { text: normalizeFa(product.summaryFa ?? ""), weight: WEIGHTS.summaryFa },
    { text: normalizeFa(product.keywords.join(" ، ")), weight: WEIGHTS.keywords },
  ];
  if (aliases.length > 0) {
    fields.push({ text: normalizeFa(aliases.join(" ، ")), weight: WEIGHTS.aliases });
  }
  return fields.filter((f) => f.text.length > 0);
}

export interface ProductSearchResult {
  product: SeedProduct;
  score: number;
}

/**
 * جست‌وجوی توکنی: همه توکن‌های پرس‌وجو باید در حداقل یک فیلد محصول باشند.
 * امتیاز هر توکن = وزن بیشترین فیلدی که آن توکن را دارد؛
 * برچسب کامل پرس‌وجو (بدون فاصله) در نام محصول، امتیاز بیشتری می‌دهد.
 */
export function searchProducts(products: SeedProduct[], query: string): ProductSearchResult[] {
  const tokens = tokenizeQuery(query);
  if (tokens.length === 0) return [];

  const normalizedQuery = normalizeFa(query).replace(/ /g, "");

  const results: ProductSearchResult[] = [];
  for (const product of products) {
    const fields = fieldsFor(product);
    let score = 0;
    let allMatch = true;

    for (const token of tokens) {
      let best = 0;
      for (const field of fields) {
        if (field.text.includes(token)) {
          best = Math.max(best, field.weight);
        }
      }
      if (best === 0) {
        allMatch = false;
        break;
      }
      score += best;
    }

    if (!allMatch) continue;

    // پرس‌وجوی چسبیده (مثل «چشمسazکی») در نام یا مترادف‌ها
    const nameFlat = normalizeFa(product.nameFa).replace(/ /g, "");
    if (nameFlat.includes(normalizedQuery)) score += 50;

    results.push({ product, score });
  }

  return results.sort((a, b) => b.score - a.score);
}
