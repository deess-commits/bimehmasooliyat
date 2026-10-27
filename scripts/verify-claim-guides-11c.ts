import { claimCases, claimGuides } from "../prisma/seed-data/claim-guides";
import type { SeedFaq } from "../prisma/seed-data/types";

const wc = (s: string) => s.split(/\s+/).filter(Boolean).length;

// valid product slugs from the 3 product files
import { professionalProducts } from "../prisma/seed-data/products-professional";
import { commercialProducts } from "../prisma/seed-data/products-commercial";
import { corporatePublicProducts } from "../prisma/seed-data/products-corporate-public";
const validSlugs = new Set(
  [...professionalProducts, ...commercialProducts, ...corporatePublicProducts].map((p) => p.slug),
);

let fail = 0;
const check = (ok: boolean, msg: string) => {
  if (!ok) {
    fail++;
    console.log("FAIL:", msg);
  }
};

console.log("claimGuides length:", claimGuides.length);
console.log("claimCases length:", claimCases.length);
check(claimGuides.length === 6, "claimGuides must be 6");
check(claimCases.length === 7, "claimCases must be 7");

const guideSlugs = claimGuides.map((g) => g.slug);
console.log("guide slugs:", guideSlugs.join(","));
check(
  JSON.stringify(guideSlugs) === JSON.stringify(["medical", "employers", "public", "elevators", "contractors", "product-liability"]),
  "guide slugs/order mismatch",
);
check(new Set(guideSlugs).size === 6, "guide slugs unique");
check(new Set(claimCases.map((c) => c.slug)).size === 7, "case slugs unique");

const hasLatinDigit = (s: string) => /[0-9]/.test(s);
const hasEmoji = (s: string) => /[\u{1F000}-\u{1FAFF}\u{2600}-\u{27BF}\u{FE0F}\u{1F1E6}-\u{1F1FF}]/u.test(s);

for (const g of claimGuides) {
  const ab = wc(g.answerBlock);
  const intro = wc(g.intro);
  check(ab >= 40 && ab <= 60, `${g.slug} answerBlock words=${ab}`);
  check(intro >= 60 && intro <= 90, `${g.slug} intro words=${intro}`);
  check(g.steps.length >= 6 && g.steps.length <= 7, `${g.slug} steps=${g.steps.length}`);
  check(g.documents.length >= 5 && g.documents.length <= 7, `${g.slug} documents=${g.documents.length}`);
  check(g.deadlines.length >= 2 && g.deadlines.length <= 4, `${g.slug} deadlines=${g.deadlines.length}`);
  check(g.tips.length >= 3 && g.tips.length <= 5, `${g.slug} tips=${g.tips.length}`);
  check(g.faqs.length === 3, `${g.slug} faqs=${g.faqs.length}`);
  g.faqs.forEach((f: SeedFaq, i: number) => {
    const n = wc(f.answer);
    check(n >= 40 && n <= 60, `${g.slug} faq#${i + 1} answer words=${n}`);
  });
  check(g.relatedProducts.length >= 2 && g.relatedProducts.length <= 4, `${g.slug} relatedProducts count`);
  for (const s of g.relatedProducts) check(validSlugs.has(s), `${g.slug} invalid relatedProduct: ${s}`);
  check(g.reviewDate === "2026-10-24", `${g.slug} reviewDate=${g.reviewDate}`);
  const texts = [g.answerBlock, g.intro, ...g.documents, ...g.tips, ...g.faqs.map((f) => f.answer + f.question), ...g.deadlines.map((d) => d.title + d.text)];
  texts.forEach((t, i) => {
    check(!hasLatinDigit(t), `${g.slug} latin digit in text#${i}`);
    check(!hasEmoji(t), `${g.slug} emoji in text#${i}`);
  });
}

for (const c of claimCases) {
  const sc = wc(c.scenario);
  const li = wc(c.liability);
  const se = wc(c.settlement);
  const le = wc(c.lesson);
  check(sc >= 50 && sc <= 80, `${c.slug} scenario words=${sc}`);
  check(li >= 40 && li <= 60, `${c.slug} liability words=${li}`);
  check(se >= 40 && se <= 60, `${c.slug} settlement words=${se}`);
  check(le >= 20 && le <= 35, `${c.slug} lesson words=${le}`);
  check(c.relatedProducts.length >= 1 && c.relatedProducts.length <= 3, `${c.slug} relatedProducts count`);
  for (const s of c.relatedProducts) check(validSlugs.has(s), `${c.slug} invalid relatedProduct: ${s}`);
  [c.scenario, c.liability, c.settlement, c.lesson, c.title].forEach((t, i) => {
    check(!hasLatinDigit(t), `${c.slug} latin digit in text#${i}`);
    check(!hasEmoji(t), `${c.slug} emoji in text#${i}`);
  });
}

// word counts report for the two new guides + two new cases
for (const g of claimGuides.filter((x) => ["contractors", "product-liability"].includes(x.slug))) {
  console.log(`[guide ${g.slug}] answerBlock=${wc(g.answerBlock)} intro=${wc(g.intro)} steps=${g.steps.length} documents=${g.documents.length} deadlines=${g.deadlines.length} tips=${g.tips.length} faqWords=[${g.faqs.map((f) => wc(f.answer)).join(",")}]`);
}
for (const c of claimCases.filter((x) => ["case-workshop-fire", "case-food-batch-defect"].includes(x.slug))) {
  console.log(`[case ${c.slug}] scenario=${wc(c.scenario)} liability=${wc(c.liability)} settlement=${wc(c.settlement)} lesson=${wc(c.lesson)}`);
}

console.log(fail === 0 ? "ALL CHECKS PASSED" : `TOTAL FAILURES: ${fail}`);
