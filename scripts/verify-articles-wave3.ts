// راستی‌آزمایی موج ۳ مقالات (Task 12-d) — فقط خواندنی، تغییری در داده ایجاد نمی‌کند
import { articles } from "../prisma/seed-data/articles";
import { professionalProducts } from "../prisma/seed-data/products-professional";
import { commercialProducts } from "../prisma/seed-data/products-commercial";
import { corporatePublicProducts } from "../prisma/seed-data/products-corporate-public";

const words = (s: string) => s.trim().split(/\s+/).filter(Boolean).length;
const sentences = (s: string) =>
  s
    .replace(/[.؟!…]/g, "\u0001")
    .split("\u0001")
    .map((t) => t.trim())
    .filter((t) => t.replace(/[«»\s؛:،]/g, "").length > 0).length;
const hasLatinDigit = (s: string) => /[0-9]/.test(s);
const hasEmoji = (s: string) =>
  /[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}\u{FE0F}\u{2190}-\u{21FF}\u{2B00}-\u{2BFF}]/u.test(s);
const isEnglish = (s: string) => /^[A-Za-z][A-Za-z0-9&\-.\s]*$/.test(s);

const productSlugs = [
  ...professionalProducts,
  ...commercialProducts,
  ...corporatePublicProducts,
].map((p) => p.slug);
const productSet = new Set(productSlugs);

const errors: string[] = [];
const info: string[] = [];

// ─── ۱) تعداد و یکتایی slug ───
if (articles.length !== 24) errors.push(`count=${articles.length} (باید 24 باشد)`);
const slugs = articles.map((a) => a.slug);
if (new Set(slugs).size !== slugs.length) errors.push("slug تکراری وجود دارد");
info.push(`count=${articles.length}, uniqueSlugs=${new Set(slugs).size}`);

// ─── ۲) ۱۸ مقاله قبلی دست‌نخورده ───
const prev18 = [
  "chist-bimeh-masouliyat",
  "madani-keifari-tafavot",
  "diyeh-1404",
  "faransiz-bimeh-masouliyat",
  "marhale-daryaft-khesarat",
  "bimeh-masouliyat-ya-tamin-ejtemaei",
  "tafavot-karframe-havades",
  "mostasnat-masouliyat-omoumi",
  "avamel-hagh-bimeh-masouliyat",
  "entekhab-saghf-taahod",
  "masouliyat-malekan-sakhteman",
  "bimeh-masouliyat-freelancers",
  "masouliyat-pezeski-hoghougi",
  "bimeh-masouliyat-gharardad-peymankari",
  "tafavot-omoumi-herfeii",
  "bimeh-masouliyat-frooshgah-interneti",
  "masouliyat-rooydadha-hamayesh",
  "khandan-bimehname-masouliyat",
];
prev18.forEach((s, i) => {
  if (slugs[i] !== s) errors.push(`ترتیب ۱۸ مقاله قبلی در ایندکس ${i} تغییر کرده: ${slugs[i]}`);
});

// ─── ۳) بررسی ۶ مقاله جدید (موج ۳) ───
const wave3 = articles.slice(18);
if (wave3.length !== 6) errors.push(`مقالات جدید=${wave3.length} (باید 6 باشد)`);

const expectedAuthors = [
  "lead-expert",
  "legal-reviewer",
  "lead-expert",
  "legal-reviewer",
  "lead-expert",
  "legal-reviewer",
];

const newSlugs: string[] = [];

wave3.forEach((a, idx) => {
  const tag = `[${idx + 19}] ${a.slug}`;
  newSlugs.push(a.slug);

  if (a.reviewDate !== "2026-10-24") errors.push(`${tag}: reviewDate=${a.reviewDate}`);
  if (a.authorSlug !== expectedAuthors[idx])
    errors.push(`${tag}: authorSlug=${a.authorSlug} (انتظار ${expectedAuthors[idx]})`);

  // relatedProductSlug معتبر از ۳۳ محصول
  if (!a.relatedProductSlug || !productSet.has(a.relatedProductSlug))
    errors.push(`${tag}: relatedProductSlug نامعتبر: ${a.relatedProductSlug}`);

  // excerpt 25-35
  const ex = words(a.excerpt);
  if (ex < 25 || ex > 35) errors.push(`${tag}: excerpt=${ex} کلمه (بازه 25-35)`);

  // readMinutes 5-8
  if (a.readMinutes < 5 || a.readMinutes > 8) errors.push(`${tag}: readMinutes=${a.readMinutes}`);

  // sections: دقیقاً ۶، هرکدام heading+body، بدنه ۲-۵ جمله، دقیقاً ۲ بخش با list
  if (a.sections.length !== 6) errors.push(`${tag}: sections=${a.sections.length}`);
  let listCount = 0;
  a.sections.forEach((s, si) => {
    if (!s.heading || !s.body) errors.push(`${tag}: بخش ${si + 1} بدون heading یا body`);
    const sc = sentences(s.body);
    if (sc < 2 || sc > 5) errors.push(`${tag}: بخش ${si + 1} بدنه ${sc} جمله (بازه 2-5)`);
    if (s.list) {
      listCount++;
      if (s.list.length < 3) errors.push(`${tag}: بخش ${si + 1} list کوتاه`);
    }
    if (s.table) errors.push(`${tag}: بخش ${si + 1} دارای table (خارج از قاعده موج)`);
  });
  if (listCount !== 2) errors.push(`${tag}: تعداد بخش با list=${listCount} (باید دقیقاً 2)`);

  // faqs: دقیقاً ۴، پاسخ ۴۰-۶۰ کلمه
  if (a.faqs.length !== 4) errors.push(`${tag}: faqs=${a.faqs.length}`);
  a.faqs.forEach((f, fi) => {
    const wc = words(f.answer);
    if (wc < 40 || wc > 60) errors.push(`${tag}: FAQ ${fi + 1} پاسخ ${wc} کلمه (بازه 40-60)`);
  });

  // keywords: ۷-۸ موردی، دقیقاً ۱ انگلیسی
  if (a.keywords.length < 7 || a.keywords.length > 8)
    errors.push(`${tag}: keywords=${a.keywords.length} (بازه 7-8)`);
  const enCount = a.keywords.filter(isEnglish).length;
  if (enCount !== 1) errors.push(`${tag}: کلیدواژه انگلیسی=${enCount} (باید دقیقاً 1)`);

  // seoTitle ≤60
  if (a.seoTitle.length > 60) errors.push(`${tag}: seoTitle=${a.seoTitle.length} نویسه`);

  // seoDescription 140-160 با CTA استعلام
  const sd = a.seoDescription.length;
  if (sd < 140 || sd > 160) errors.push(`${tag}: seoDescription=${sd} نویسه (بازه 140-160)`);
  if (!a.seoDescription.includes("استعلام")) errors.push(`${tag}: CTA استعلام در seoDescription نیست`);

  // بدون ایموجی / بدون رقم لاتین در همه فیلدهای متنی
  const texts: string[] = [
    a.title,
    a.excerpt,
    a.seoTitle,
    a.seoDescription,
    ...a.sections.flatMap((s) => [s.heading, s.body, ...(s.list ?? [])]),
    ...a.faqs.flatMap((f) => [f.question, f.answer]),
    ...a.keywords.filter((k) => !isEnglish(k)),
  ];
  texts.forEach((t) => {
    if (hasEmoji(t)) errors.push(`${tag}: ایموجی در: ${t.slice(0, 30)}…`);
    if (hasLatinDigit(t)) errors.push(`${tag}: رقم لاتین در: ${t.slice(0, 30)}…`);
  });

  info.push(
    `${a.slug}: sections=${a.sections.length}(list=${listCount}) faq=${a.faqs.length} excerpt=${ex} read=${a.readMinutes} kw=${a.keywords.length}(en=${enCount}) seoTitle=${a.seoTitle.length} seoDesc=${sd} product=${a.relatedProductSlug} author=${a.authorSlug}`,
  );
});

console.log("─── معلومات ───");
info.forEach((l) => console.log(l));
console.log("─── نتیجه ───");
if (errors.length) {
  console.log(`خطاها (${errors.length}):`);
  errors.forEach((e) => console.log("✗ " + e));
  process.exit(1);
} else {
  console.log("همه بررسی‌ها پاس شد ✓");
  console.log("New slugs: " + newSlugs.join(" | "));
}
