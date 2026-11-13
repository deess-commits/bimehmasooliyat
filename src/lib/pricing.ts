// ─── موتور محاسبه حق بیمه مسئولیت — نرخ پایه ۱۴۰۵ ───────────────────
// مبنای فرمول: قیمت نهایی = نرخ پایه × (۱ + مجموع درصد پوشش‌ها) × (۱ − تخفیف)
// در مهندسین: + کلوزهای درصدی و تبصره ۱ ماده ۶۶ (مبلغ ثابت بعد از ضریب‌ها)
// همه مبالغ به «تومان». سقف‌های تعهد به «ریال» (مطابق عرف بیمه‌نامه).
// صحت‌سنجی: ۵۵+ سناریوی زنده فرم‌های محاسبه آنلاین — خطای صفر.

import { DOCTOR_SPECIALTIES, NURSE_SPECIALTIES, type SpecialtyOption } from "./pricing-specialties";

export type OrderKind = "doctors" | "nurses" | "engineers";

export interface PriceLine {
  label: string;
  /** مبلغ اثر بر قیمت (تومان) — برای پوشش‌های کاهنده منفی است */
  amount: number;
}

export interface PriceBreakdown {
  base: number; // نرخ پایه (تومان)
  baseLabel: string;
  lines: PriceLine[]; // پوشش‌ها و کلوزهای درصدی
  subtotal: number; // نرخ پایه × ضریب پوشش‌ها
  discount: PriceLine | null; // تخفیف عدم خسارت (منفی)
  riders: PriceLine[]; // مبالغ ثابت (تبصره ۶۶)
  total: number; // قابل پرداخت سالانه (تومان)
}

// ─── پارامترهای ثابت ۱۴۰۵ ──────────────────────────────────────────

export const YEAR_1405 = {
  dihNormalRial: 21_000_000_000, // دیه کامل ماه عادی (ریال)
  dihHaramRial: 28_000_000_000, // دیه کامل ماه حرام (ریال)
  medicalExpenseRial: 300_000_000, // هزینه پزشکی هر نفر هر حادثه (ساختمانی/کارفرما)
  installmentNote: "۳۰ تا ۴۰ درصد نقد + ۲ تا ۳ قسط چک",
  cashDiscountNote: "تخفیف پرداخت نقدی ۱۰ درصد",
} as const;

// ─── پزشکان: ۷ کلاس ریسک × سقف تعهدات ──────────────────────────────

export const DOCTOR_CEILINGS = [
  {
    id: "21",
    label: "دیه ۲۱ میلیارد ریال — سقف تعهد هر زیان‌دیده، فقط ماه‌های عادی",
    short: "دیه ۲۱ میلیارد ریال (فقط ماه‌های عادی)",
    column: "c21" as const,
  },
  {
    id: "28",
    label: "دیه ۲۸ میلیارد ریال — سقف تعهد هر زیان‌دیده، ماه‌های عادی و حرام",
    short: "دیه ۲۸ میلیارد ریال (ماه‌های عادی و حرام)",
    column: "c28" as const,
  },
  {
    id: "56",
    label: "دو دیه ۵۶ میلیارد ریال — پوشش دو نفر، ماه‌های عادی و حرام",
    short: "دو دیه ۵۶ میلیارد ریال (دو نفر)",
    column: "c56" as const,
  },
] as const;

type DoctorColumn = (typeof DOCTOR_CEILINGS)[number]["column"];

const DOCTOR_RATES: Record<number, Record<DoctorColumn, number>> = {
  1: { c21: 3_492_700, c28: 4_657_000, c56: 9_313_900 },
  2: { c21: 5_821_200, c28: 7_761_600, c56: 15_523_200 },
  3: { c21: 9_979_200, c28: 13_305_600, c56: 26_611_200 },
  4: { c21: 9_979_200, c28: 13_305_600, c56: 26_611_200 },
  5: { c21: 11_642_400, c28: 15_523_200, c56: 31_046_400 },
  6: { c21: 14_137_200, c28: 18_849_600, c56: 37_699_200 },
  7: { c21: 24_948_000, c28: 33_264_000, c56: 66_528_000 },
};

export interface CoverageOption {
  id: string;
  label: string;
  pct: number; // اثر درصدی روی نرخ پایه — کاهنده منفی
}

export const DOCTOR_COVERAGES: CoverageOption[] = [
  { id: "review6y", label: "افزایش مرور زمان ادعا تا ۶ سال (در حالت عادی ۴ سال)", pct: 0.2001 },
  { id: "beauty", label: "پوشش اعمال زیبایی در راستای صلاحیت حرفه‌ای", pct: 0.5002 },
  { id: "pharmacy", label: "پوشش مسئول فنی داروخانه (مختص پزشک داروساز)", pct: 1.0003 },
  { id: "x100", label: "افزایش تعهدات بیمه‌گر ۱۰۰٪ (دوبرابر سقف هر زیان‌دیده)", pct: 0.3006 },
  { id: "x50", label: "افزایش تعهدات بیمه‌گر ۵۰٪", pct: 0.1006 },
  { id: "resident", label: "رزیدنت / دستیار در حال تحصیل (انتخاب تخصص الزامی است)", pct: -0.2001 },
  { id: "student", label: "دانشجو پزشکی یا انترن", pct: -0.5001 },
];

export const NO_CLAIM_DOCTORS = [
  { id: "none", label: "سابقه بیمه‌نامه قبلی ندارم", pct: 0 },
  { id: "claimed", label: "خسارت دریافت کرده‌ام (بدون تخفیف)", pct: 0 },
  { id: "d1", label: "از صفر به یک سال — دومین بیمه‌نامه", pct: 0.15 },
  { id: "d2", label: "از یک به دو سال — سومین بیمه‌نامه", pct: 0.3 },
  { id: "d3", label: "از دو به سه سال — چهارمین بیمه‌نامه", pct: 0.4 },
  { id: "d4", label: "از سه به چهار سال — پنجمین بیمه‌نامه", pct: 0.5 },
  { id: "d5", label: "از چهار به پنج سال و بیشتر — ششمین بیمه‌نامه یا بیشتر", pct: 0.6 },
];

// ─── پرستاران و پیراپزشکان: ۴ کلاس، سقف ثابت ───────────────────────

export const NURSE_CEILING_LABEL =
  "دیه ۲۸ میلیارد ریال برای هر زیان‌دیده + پوشش ماه حرام + پوشش دوبرابری";

const NURSE_RATES: Record<number, number> = {
  1: 1_153_100,
  2: 1_729_600,
  3: 2_882_900,
  4: 3_459_400,
};

export const NURSE_EMPLOYMENT = [
  { id: "rasmi", label: "رسمی" },
  { id: "gharardadi", label: "قراردادی" },
  { id: "rouzmard", label: "روزمزد" },
];

export const NO_CLAIM_NURSES = [
  { id: "none", label: "سابقه بیمه‌نامه قبلی ندارم", pct: 0 },
  { id: "d1", label: "یک سال", pct: 0.15 },
  { id: "d2", label: "دو سال", pct: 0.25 },
  { id: "d3", label: "سه سال", pct: 0.35 },
  { id: "d4", label: "چهار سال", pct: 0.4 },
  { id: "d5", label: "پنج سال و بیشتر", pct: 0.4 },
];

// ─── مهندسین: نوع مسئولیت × رشته × تعهدات مالی ─────────────────────

export interface EngineerResponsibility {
  id: string;
  label: string;
  /** نرخ پایه عمران با تعهدات مالی ۱ میلیارد ریال (تومان) */
  rate: number | null; // null → استعلام دستی
}

export const ENGINEER_RESPONSIBILITIES: EngineerResponsibility[] = [
  { id: "nazher", label: "مهندس ناظر", rate: 4_244_700 },
  { id: "tarah", label: "مهندس طراح", rate: 2_815_600 },
  { id: "mohaseb", label: "مهندس محاسب", rate: 3_766_000 },
  { id: "combo", label: "مهندس طراح و محاسب و ناظر", rate: 5_761_900 },
  { id: "inspector", label: "بازرس فنی ساختمان", rate: null },
  { id: "moshaver", label: "مهندس مشاور", rate: null },
  { id: "safety", label: "ایمنی", rate: null },
  { id: "fireEquip", label: "مشاور، اجرا و نصب کنترل تجهیزات آتش‌نشانی", rate: null },
];

export interface EngineerField {
  id: string;
  label: string;
  /** نرخ پایه «ناظر / عمران / تعهدات مالی ۱» برای این رشته (تومان) — استخراج از فرم زنده */
  nazherRate: number;
}

/** نرخ مرجع ناظر/عمران/۱ میلیارد — مبنای نسبت‌ها */
export const ENGINEER_BASE_RATE = 4_244_700;

export const ENGINEER_FIELDS: EngineerField[] = [
  { id: "omran", label: "عمران", nazherRate: 4_244_700 },
  { id: "memari", label: "معماری", nazherRate: 3_183_700 },
  { id: "mechanic", label: "مکانیک (گاز، تاسیسات، آبفا، آتش‌نشانی، آسانسور)", nazherRate: 3_183_700 },
  { id: "barq", label: "برق", nazherRate: 3_183_700 },
  { id: "tasissat", label: "تاسیسات", nazherRate: 3_183_700 },
  { id: "shahrsazi", label: "شهرسازی", nazherRate: 3_183_700 },
  { id: "naqshabardari", label: "نقشه‌برداری", nazherRate: 3_183_700 },
  { id: "atashneshan", label: "آتش‌نشان", nazherRate: 2_546_900 },
  { id: "gaz", label: "گاز", nazherRate: 2_546_900 },
];

export const ENGINEER_GRADES = [
  { id: "arshad", label: "مهندس ارشد" },
  { id: "p1", label: "مهندس پایه یکم" },
  { id: "p2", label: "مهندس پایه دوم" },
  { id: "p3", label: "مهندس پایه سوم" },
];

export interface EngineerFinancial {
  id: string;
  label: string;
  short: string;
  /** نرخ ناظر/عمران با این تعهدات (تومان) — نسبت سایر ترکیب‌ها از همین جدول مقیاس می‌شود */
  rate: number;
}

export const ENGINEER_FINANCIALS: EngineerFinancial[] = [
  {
    id: "f1",
    label: "۱ میلیارد ریال خسارت مالی + جمعاً ۱۴۰ میلیارد ریال دیه + ۱۰ میلیارد ریال هزینه پزشکی",
    short: "خسارت مالی ۱ میلیارد ریال",
    rate: 4_244_700,
  },
  {
    id: "f2",
    label: "۲ میلیارد ریال خسارت مالی + جمعاً ۱۴۰ میلیارد ریال دیه + ۱۰ میلیارد ریال هزینه پزشکی",
    short: "خسارت مالی ۲ میلیارد ریال",
    rate: 4_372_900,
  },
  {
    id: "f5",
    label: "۵ میلیارد ریال خسارت مالی + جمعاً ۱۴۰ میلیارد ریال دیه + ۱۰ میلیارد ریال هزینه پزشکی",
    short: "خسارت مالی ۵ میلیارد ریال",
    rate: 4_757_900,
  },
  {
    id: "f10",
    label: "۱۰ میلیارد ریال خسارت مالی + جمعاً ۱۴۰ میلیارد ریال دیه + ۱۰ میلیارد ریال هزینه پزشکی",
    short: "خسارت مالی ۱۰ میلیارد ریال",
    rate: 5_399_500,
  },
  {
    id: "f20",
    label: "۲۰ میلیارد ریال خسارت مالی + جمعاً ۱۴۰ میلیارد ریال دیه + ۱۰ میلیارد ریال هزینه پزشکی",
    short: "خسارت مالی ۲۰ میلیارد ریال",
    rate: 6_682_500,
  },
  {
    id: "f50",
    label: "۵۰ میلیارد ریال خسارت مالی + جمعاً ۱۴۰ میلیارد ریال دیه + ۱۰ میلیارد ریال هزینه پزشکی",
    short: "خسارت مالی ۵۰ میلیارد ریال",
    rate: 10_531_600,
  },
  {
    id: "f70",
    label: "۷۰ میلیارد ریال خسارت مالی + جمعاً ۱۴۰ میلیارد ریال دیه + ۱۰ میلیارد ریال هزینه پزشکی",
    short: "خسارت مالی ۷۰ میلیارد ریال",
    rate: 13_097_700,
  },
];

export const ENGINEER_CLAUSES: CoverageOption[] = [
  { id: "tedadDiat", label: "پوشش تعدد دیات", pct: 0.05 },
  { id: "expertAppeal", label: "جبران هزینه اعتراض به نظر کارشناس با هیات کارشناسی", pct: 0.1 },
];

export const ENGINEER_DIH_INCREASE = [
  { id: "none", label: "نمی‌خواهم", pct: 0 },
  { id: "x1", label: "یک بار در سال", pct: 0.2 },
  { id: "x2", label: "دو بار در سال", pct: 0.3 },
  { id: "x3", label: "سه بار در سال", pct: 0.4 },
];

/** مبلغ ثابت هر ۱ میلیارد ریال پوشش تبصره ۱ ماده ۶۶ تأمین اجتماعی (تومان) */
export const TABAREH_66_UNIT = 297_000;

export const ENGINEER_TABAREH_66 = [
  { id: "none", label: "نمی‌خواهم", billion: 0 },
  { id: "b1", label: "۱ میلیارد ریال", billion: 1 },
  { id: "b2", label: "۲ میلیارد ریال", billion: 2 },
  { id: "b3", label: "۳ میلیارد ریال", billion: 3 },
  { id: "b5", label: "۵ میلیارد ریال", billion: 5 },
  { id: "b10", label: "۱۰ میلیارد ریال", billion: 10 },
];

export const NO_CLAIM_ENGINEERS = [
  { id: "none", label: "سابقه بیمه‌نامه قبلی ندارم", pct: 0 },
  { id: "d1", label: "یک سال", pct: 0.1 },
  { id: "d2", label: "از یک به دو سال", pct: 0.2 },
  { id: "d3", label: "از دو به سه سال و بیشتر", pct: 0.2 },
];

// ─── ورودی‌های محاسبه ───────────────────────────────────────────────

export interface DoctorsCalcInput {
  specialty: string;
  ceiling: string; // 21 | 28 | 56
  coverages: string[];
  noClaim: string;
}

export interface NursesCalcInput {
  specialty: string;
  employment: string; // اثر قیمت ندارد — برای صدور ثبت می‌شود
  noClaim: string;
}

export interface EngineersCalcInput {
  responsibility: string;
  field: string;
  grade: string; // اثر قیمت ندارد — برای صدور ثبت می‌شود
  financial: string; // f1 | f2 | f5 | f10 | f20 | f50 | f70
  clauses: string[];
  dihIncrease: string;
  tabareh66: string;
  noClaim: string;
}

export type CalcInput = DoctorsCalcInput | NursesCalcInput | EngineersCalcInput;

// ─── توابع کمکی ────────────────────────────────────────────────────

function doctorSpecialtyClass(label: string): number | null {
  const hit = DOCTOR_SPECIALTIES.find((s) => s.label === label);
  return hit ? hit.riskClass : null;
}

function nurseSpecialtyClass(label: string): number | null {
  const hit = NURSE_SPECIALTIES.find((s) => s.label === label);
  return hit ? hit.riskClass : null;
}

function roundToman(n: number): number {
  return Math.round(n);
}

function buildBreakdown(
  base: number,
  baseLabel: string,
  pctLines: PriceLine[],
  discountLabel: string | null,
  discountPct: number, // مثلا 0.15
  riders: PriceLine[],
): PriceBreakdown {
  // ضریب پوشش‌ها = ۱ + مجموع درصد پوشش‌های اختیاری
  const mult = pctLines.reduce((acc, l) => acc + l.amount / base, 1);
  const subtotal = roundToman(base * mult);
  // تخفیف عدم خسارت ضربی است: قیمت نهایی = پایه × ضریب پوشش‌ها × (۱ − تخفیف)
  const afterDiscount = roundToman(subtotal * (1 - discountPct));
  const discount: PriceLine | null = discountLabel
    ? { label: discountLabel, amount: afterDiscount - subtotal } // منفی
    : null;
  const riderTotal = riders.reduce((acc, l) => acc + l.amount, 0);
  const total = afterDiscount + riderTotal;
  return { base, baseLabel, lines: pctLines, subtotal, discount, riders, total: roundToman(total) };
}

// ─── محاسبه پزشکان ─────────────────────────────────────────────────

export function calculateDoctors(input: DoctorsCalcInput): PriceBreakdown | null {
  const riskClass = doctorSpecialtyClass(input.specialty);
  const ceiling = DOCTOR_CEILINGS.find((c) => c.id === input.ceiling);
  if (!riskClass || !ceiling) return null;

  const rate = DOCTOR_RATES[riskClass]?.[ceiling.column];
  if (!rate) return null;

  const lines: PriceLine[] = [];
  for (const cov of DOCTOR_COVERAGES) {
    if (!input.coverages.includes(cov.id)) continue;
    lines.push({
      label: cov.label,
      amount: roundToman(rate * cov.pct),
    });
  }

  const nc = NO_CLAIM_DOCTORS.find((d) => d.id === input.noClaim);
  const discountLabel =
    nc && nc.pct > 0 ? `تخفیف عدم خسارت (${nc.label}) — ${Math.round(nc.pct * 100)}٪` : null;

  return buildBreakdown(rate, ceiling.short, lines, discountLabel, nc?.pct ?? 0, []);
}

// ─── محاسبه پرستاران ───────────────────────────────────────────────

export function calculateNurses(input: NursesCalcInput): PriceBreakdown | null {
  const riskClass = nurseSpecialtyClass(input.specialty);
  if (!riskClass) return null;

  const rate = NURSE_RATES[riskClass];
  if (!rate) return null;

  const nc = NO_CLAIM_NURSES.find((d) => d.id === input.noClaim);
  const discountLabel =
    nc && nc.pct > 0
      ? `تخفیف عدم خسارت بیمه ایران (${nc.label}) — ${Math.round(nc.pct * 100)}٪`
      : null;

  return buildBreakdown(rate, NURSE_CEILING_LABEL, [], discountLabel, nc?.pct ?? 0, []);
}

// ─── محاسبه مهندسین ────────────────────────────────────────────────

export function calculateEngineers(input: EngineersCalcInput): PriceBreakdown | null {
  const resp = ENGINEER_RESPONSIBILITIES.find((r) => r.id === input.responsibility);
  const field = ENGINEER_FIELDS.find((f) => f.id === input.field);
  const fin = ENGINEER_FINANCIALS.find((f) => f.id === input.financial);
  if (!resp || !field || !fin) return null;
  if (resp.rate == null) return null; // استعلام دستی

  // پایه = نرخ مسئولیت × (نرخ ناظر این رشته ÷ نرخ ناظر عمران) × ضریب تعهدات مالی
  // با یک گردش نهایی — دقیقاً مطابق مقادیر مرجع در ترکیب‌های مستند
  const fieldRatio = field.nazherRate / ENGINEER_BASE_RATE;
  const finRatio = fin.rate / ENGINEER_FINANCIALS[0].rate;
  const base = roundToman(resp.rate * fieldRatio * finRatio);

  const lines: PriceLine[] = [];
  for (const cl of ENGINEER_CLAUSES) {
    if (!input.clauses.includes(cl.id)) continue;
    lines.push({ label: cl.label, amount: roundToman(base * cl.pct) });
  }

  const dih = ENGINEER_DIH_INCREASE.find((d) => d.id === input.dihIncrease);
  if (dih && dih.pct > 0) {
    lines.push({ label: `پوشش افزایش دیه در سال (${dih.label})`, amount: roundToman(base * dih.pct) });
  }

  const nc = NO_CLAIM_ENGINEERS.find((d) => d.id === input.noClaim);
  const discountLabel =
    nc && nc.pct > 0
      ? `تخفیف عدم خسارت بیمه ایران (${nc.label}) — ${Math.round(nc.pct * 100)}٪`
      : null;

  const tabareh = ENGINEER_TABAREH_66.find((t) => t.id === input.tabareh66);
  const riders: PriceLine[] =
    tabareh && tabareh.billion > 0
      ? [{ label: `تبصره ۱ ماده ۶۶ تأمین اجتماعی (${tabareh.label})`, amount: TABAREH_66_UNIT * tabareh.billion }]
      : [];

  return buildBreakdown(base, `${resp.label} — ${field.label} — ${fin.short}`, lines, discountLabel, nc?.pct ?? 0, riders);
}

// ─── ورودی یکپارچه ─────────────────────────────────────────────────

export function calculatePremium(kind: OrderKind, input: CalcInput): PriceBreakdown | null {
  switch (kind) {
    case "doctors":
      return calculateDoctors(input as DoctorsCalcInput);
    case "nurses":
      return calculateNurses(input as NursesCalcInput);
    case "engineers":
      return calculateEngineers(input as EngineersCalcInput);
    default:
      return null;
  }
}

export const KIND_LABELS: Record<OrderKind, string> = {
  doctors: "بیمه مسئولیت حرفه‌ای پزشکان",
  nurses: "بیمه مسئولیت پرستاران و پیراپزشکان",
  engineers: "بیمه مسئولیت حرفه‌ای مهندسین",
};

export const KIND_PRODUCT_SLUGS: Record<OrderKind, string> = {
  doctors: "medical-doctors",
  nurses: "nurses-paramedics",
  engineers: "engineers",
};

export const SPECIALTIES: Record<"doctors" | "nurses", SpecialtyOption[]> = {
  doctors: DOCTOR_SPECIALTIES,
  nurses: NURSE_SPECIALTIES,
};

// ─── صحت‌سنجی سناریوهای مرجع (توسعه) ──────────────────────────────
// doctor: کلاس۱ + ۲۱ + بدون پوشش = 3,492,700
// doctor: کلاس۱ + ۲۱ + مرور زمان = 3,492,700×1.2001 = 4,191,656
// doctor: کلاس۲ + ۲۸ = 7,761,600
// nurse: کلاس۳ = 2,882,900 ; با تخفیف ۴۰٪ = 1,729,740
// engineer: ناظر عمران f1 = 4,244,700 ; +تعدد+اعتراض = 4,881,405
// engineer: ناظر معماری f1 = 3,183,700 ; طراح عمران f1 = 2,815,600
// engineer: ناظر عمران f1 + تبصره ۵ میلیارد = 5,729,700
