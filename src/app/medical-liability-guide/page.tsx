import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowLeft,
  Briefcase,
  ListChecks,
  Scale,
  ShieldAlert,
  Stethoscope,
} from "lucide-react";
import { AnswerBlock } from "@/components/answer-block";
import { AuthorBox } from "@/components/author-box";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { CtaBanner } from "@/components/cta-banner";
import { FaqSection } from "@/components/faq-section";
import { LegalDisclaimer } from "@/components/legal-disclaimer";
import { NumberedSteps } from "@/components/numbered-steps";
import { SectionHeading } from "@/components/section-heading";
import { faqJsonLd, howToJsonLd, JsonLd } from "@/lib/seo";

export const revalidate = 3600;

// ─── /medical-liability-guide — راهنمای عمومی: بیمه مسئولیت گروه‌های درمانی ──────────
// دهمین صفحه لایه راهنماهای عمومی (دوقلوی ساختاری /renewal) — تجمیع چهار محصول
// پزشکان / دندان‌پزشکان / پیراپزشکان / داروسازان. کاندیدای استناد AI برای
// «بیمه مسئولیت درمان» و «بیمه مسئولیت پزشکی».
// YMYL: بدون رقم اختراعی دیه؛ مبناهای قانونی فقط مقررات نظام پزشکی/وزارت بهداشت
// و قانون مسئولیت مدنی ۱۳۳۹؛ پرداخت مشروط به شرایط بیمه‌نامه و سقف تعهد.

export const metadata: Metadata = {
  title: "بیمه مسئولیت گروه‌های درمانی | راهنمای کامل",
  description:
    "راهنمای بیمه مسئولیت گروه‌های درمانی: پزشکان، دندان‌پزشکان، پیراپزشکان و داروسازان؛ الزام مقررات نظام پزشکی، سقف بر پایه دیه سال وقوع و گام‌های صدور.",
  alternates: {
    canonical: "/medical-liability-guide",
    languages: {
      "fa-IR": "/medical-liability-guide",
      en: "/medical-liability-guide",
      "x-default": "/medical-liability-guide",
    },
  },
  openGraph: {
    title: "بیمه مسئولیت گروه‌های درمانی | راهنمای کامل",
    description:
      "راهنمای بیمه مسئولیت گروه‌های درمانی: پزشکان، دندان‌پزشکان، پیراپزشکان و داروسازان؛ الزام مقررات نظام پزشکی، سقف بر پایه دیه سال وقوع و گام‌های صدور.",
    url: "/medical-liability-guide",
    type: "article",
    images: [
      {
        url: "/og/medical-liability-guide.png",
        width: 1200,
        height: 630,
        alt: "بیمه مسئولیت گروه‌های درمانی",
      },
    ],
  },
};

const ANSWER_TEXT =
  "ارائه‌دهندگان خدمات درمانی، از پزشک و دندان‌پزشک تا پیراپزشک و داروساز، در برابر زیان ناشی از خطای اجرای خدمت پاسخ‌گو هستند و الزام بیمه برای این گروه‌ها بر پایه مقررات نظام پزشکی و وزارت بهداشت است. بیمه مسئولیت حرفه‌ای، پرداخت زیان را تا سقف تعهد تامین می‌کند؛ سقف باید با دیه سال وقوع و شدت ریسک درمانی سنجیده شود.";

const MEDICAL_GROUPS = [
  {
    group: "پزشکان",
    text: "خطای تشخیص و درمان در مطب، کلینیک یا بیمارستان؛ سنگین‌ترین ریسک جانی میان گروه‌های درمانی.",
    href: "/liability/professional/medical-doctors",
    label: "بیمه مسئولیت پزشکان",
  },
  {
    group: "دندان‌پزشکان",
    text: "خطای اجرای درمان دندانی، ریسک بی‌حسی و رخدادهای یونیت و اتاق عمل کوچک مطب.",
    href: "/liability/professional/dentists",
    label: "بیمه مسئولیت دندانپزشکان",
  },
  {
    group: "پیراپزشکان و پرستاران",
    text: "خطای اجرای دستور پزشک، خدمات تزریق و پانسمان و خدمات پاراکلینیک در مراکز درمانی.",
    href: "/liability/professional/nurses-paramedics",
    label: "بیمه مسئولیت پیراپزشکان",
  },
  {
    group: "داروسازان",
    text: "خطای تحویل دارو، اشتباه در مقدار یا شکل دارو و نصح دارویی نادرست در داروخانه.",
    href: "/liability/professional/pharmacists",
    label: "بیمه مسئولیت داروسازان",
  },
];

const LEGAL_POINTS = [
  {
    t: "شرط مجوز در مقررات صنف درمان",
    d: "الزام بیمه مسئولیت حرفه‌ای گروه‌های درمانی، در چارچوب مقررات سازمان نظام پزشکی و وزارت بهداشت و شرایط صدور و تمدید پروانه فعالیت تعریف می‌شود؛ متن مقررات گروه خود را ملاک بگیرید.",
  },
  {
    t: "بیمه، پرداخت مسئولیت را تامین می‌کند نه حذف آن",
    d: "مبنای مسئولیت، قانون مسئولیت مدنی ۱۳۳۹ است و با شخص خطاکار می‌ماند؛ بیمه‌گر طبق شرایط بیمه‌نامه و در سقف تعهد پرداخت می‌کند و فراتر از آن بر عهده خود بیمه‌گزار است.",
  },
];

const MEDICAL_MISTAKES = [
  "اتکای صرف به حداقل سقف الزام مجوز — حداقل مصوبه، هدف بیمه‌نامه نیست؛ در حادثه جدی، کسری سقف از عهده خود شما پرداخت می‌شود.",
  "فراموشی اعلام تجهیزات و روش‌های درمانی جدید به بیمه‌گر — عدم انطباق بیمه‌نامه با وضعیت واقعی فعالیت، در زمان خسارت محل بحث می‌شود.",
  "تصور پوشش حوادث محل مطب در بیمه حرفه‌ای — پوشش رخدادهای محل فعالیت، موضوع بیمه مسئولیت عمومی جداگانه است.",
];

const ISSUING_STEPS = [
  {
    title: "تعیین تخصص و نوع محل ارائه خدمت",
    description:
      "رشته دقیق و محل فعالیت را مشخص کنید: مطب، داروخانه، کلینیک یا همکاری در مرکز درمانی. شرح فعالیت در بیمه‌نامه باید با واقعیت خدمت شما یکی باشد و هر محل جدید، جداگانه اعلام شود.",
  },
  {
    title: "اعلام تجهیزات و روش‌های درمانی",
    description:
      "فهرست تجهیزات و روش‌های درمانی که به‌کار می‌برید را به بیمه‌گر اعلام کنید؛ هر روش درمانی جدید در دوره بیمه‌نامه با الحاقیه و در تمدید، با به‌روزرسانی شرح فعالیت اعتبار می‌یابد.",
  },
  {
    title: "تعیین سقف بر پایه دیه سال وقوع",
    description:
      "سقف را دست‌کم معادل دیه کامل سال وقوع خسارت و متناسب با شدت ریسک درمانی تخصص خود تعیین کنید؛ دیه هر سال با ابلاغیه رسمی تغییر می‌کند، پس سقف ثابت برای همه سال‌ها وجود ندارد.",
  },
  {
    title: "استعلام و مقایسه گزینه‌های سقف و فرانشیز",
    description:
      "چند پیش‌فاکتور رسمی بگیرید و سقف تعهد، فرانشیز و شرح فعالیت را با هم مقایسه کنید؛ نرخ و شرایط نهایی فقط در پیش‌فاکتور رسمی بیمه‌گر معتبر است و استعلام هیچ تعهدی ندارد.",
  },
  {
    title: "تمدید سالانه با دیه جدید",
    description:
      "چند روز پیش از انقضا تمدید کنید، سقف را با دیه سال جدید تطبیق دهید و تغییرات تجهیزات، روش‌ها یا محل را اعلام کنید تا پوشش بدون هیچ وقفه‌ای ادامه یابد.",
  },
];

const MEDICAL_FAQS = [
  {
    question: "آیا بیمه مسئولیت پزشکان اجباری است؟",
    answer:
      "برای گروه‌های درمانی، داشتن بیمه مسئولیت حرفه‌ای در چارچوب مقررات سازمان نظام پزشکی و وزارت بهداشت از شرایط صدور و تمدید پروانه فعالیت است؛ بنابراین پزشک بدون این بیمه‌نامه نمی‌تواند پروانه داشته باشد. حتی در مواردی که الزام صریح نباشد، خرید این بیمه‌نامه حکیمانه است؛ چون یک ادعای خسارت جانی درمانی می‌تواند از توان مالی فرد فراتر رود.",
  },
  {
    question: "تفاوت بیمه پزشکان با پیراپزشکان چیست؟",
    answer:
      "تفاوت اصلی در موضوع خدمت است: بیمه پزشکان، زیان ناشی از خطای تشخیص و درمان توسط پزشک را پاسخ می‌گوید و بیمه پیراپزشکان، خطای گروه‌های وابسته مانند پرستاران و تکنسین‌های پاراکلینیک را پوشش می‌دهد. هر رشته، بیمه‌نامه اختصاصی خود را با شرح فعالیت همان رشته می‌گیرد و نمی‌توان با یک بیمه‌نامه، دو رشته را پوشش داد.",
  },
  {
    question: "داروساز به چه دعوایی پاسخ‌گوست؟",
    answer:
      "داروساز در برابر زیانی پاسخ‌گوست که از خطای اجرای خدمت دارویی او ناشی شود؛ مانند تحویل داروی اشتباه، اشتباه در مقدار یا شکل دارو و نصح نادرست دارویی که به زیان جانی بیمار بینجامد. این دعوا ذیل بیمه مسئولیت حرفه‌ای داروسازان و در حدود سقف تعهد بررسی می‌شود و مبنای مسئولیت، همان قواعد عمومی قانون مسئولیت مدنی ۱۳۳۹ است.",
  },
  {
    question: "سقف تعهد مناسب چقدر باشد؟",
    answer:
      "سقف ثابت و واحدی برای همه وجود ندارد؛ مبنای حداقلی، دیه کامل سال وقوع خسارت است که هر سال با ابلاغیه رسمی تغییر می‌کند. شدت ریسک درمانی، پیچیدگی پرونده‌ها و تراکم مراجعان تعیین می‌کند که سقف باید چند برابر این مبنا باشد؛ برای تصمیم نهایی، پیش‌فاکتور رسمی و شرایط بیمه‌نامه را ملاک بگیرید.",
  },
  {
    question: "آیا بیمه حرفه‌ای حوادث محل مطب را پوشش می‌دهد؟",
    answer:
      "خیر؛ موضوع بیمه مسئولیت حرفه‌ای، خطای اجرای خدمت درمانی است نه رخدادهای محل. اگر مراجع در مطب دچار لغزش شود یا به اموال او خسارت وارد شود، این دعوا ذیل بیمه مسئولیت عمومی و جدا از بیمه‌نامه حرفه‌ای بررسی می‌شود. برای پوشش مناسب، هر دو ریسک را اعلام کنید تا دو بیمه‌نامه مکمل با سقف مستقل صادر شود.",
  },
  {
    question: "تمدید هر سال چه چیزی را باید بازبینی کرد؟",
    answer:
      "در هر تمدید، سه محور را بازبینی کنید: تطبیق سقف تعهد با دیه سال جدید که با ابلاغیه رسمی افزایش می‌یابد، اعلام تجهیزات و روش‌های درمانی جدید یا تغییر محل فعالیت به بیمه‌گر و بازنگری فرانشیز و پوشش‌ها با تجربه سال قبل. تمدید زودهنگام پیش از انقضا فرصت مقایسه می‌دهد و وقفه در آن، پوشش را قطع می‌کند.",
  },
];

const REVIEW_DATE_ISO = "2026-10-27";

export default function MedicalLiabilityGuidePage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      <JsonLd
        data={howToJsonLd({
          name: "مسیر صدور بیمه‌نامه مسئولیت گروه‌های درمانی",
          description:
            "روش گام‌به‌گام صدور بیمه مسئولیت درمان: تعیین تخصص و محل خدمت، اعلام تجهیزات، تعیین سقف با دیه سال وقوع، مقایسه پیش‌فاکتورها و تمدید سالانه.",
          steps: ISSUING_STEPS,
          url: "/medical-liability-guide",
        })}
      />
      <JsonLd data={faqJsonLd(MEDICAL_FAQS)} />

      <Breadcrumbs
        items={[{ name: "بیمه مسئولیت گروه‌های درمانی", href: "/medical-liability-guide" }]}
      />

      <header className="mt-6">
        <h1 className="text-2xl font-extrabold leading-[1.6] sm:text-3xl">
          بیمه مسئولیت گروه‌های درمانی — راهنمای کامل
        </h1>
      </header>

      <div className="mt-6 max-w-3xl">
        <AnswerBlock title="پاسخ کوتاه" text={ANSWER_TEXT} />
      </div>

      {/* گروه‌های پوشش داده شده */}
      <section aria-labelledby="groups-h" className="mt-10">
        <SectionHeading
          icon={Stethoscope}
          title="چه کسانی در این راهنما پوشش داده شده‌اند؟"
          hint="چهار گروه ارائه‌دهنده خدمت درمانی، هر یک با بیمه‌نامه اختصاصی رشته خود."
        />
        <p className="mb-4 max-w-3xl text-[15px] leading-8 text-foreground/90">
          این راهنما چهار گروه اصلی ارائه‌دهنده خدمت درمانی را در بر می‌گیرد. ریسک هر گروه
          متفاوت است و برای هر رشته، بیمه‌نامه اختصاصی با شرح فعالیت همان رشته صادر می‌شود؛
          صفحه اختصاصی هر گروه را ببینید.
        </p>
        <div className="max-w-3xl overflow-hidden rounded-2xl border">
          <ul className="divide-y">
            {MEDICAL_GROUPS.map((g) => (
              <li
                key={g.group}
                className="flex flex-col gap-3 bg-card p-4 sm:flex-row sm:items-center sm:justify-between"
              >
                <div>
                  <span className="block text-sm font-bold">{g.group}</span>
                  <span className="block text-[13px] leading-6 text-muted-foreground">
                    {g.text}
                  </span>
                </div>
                <Link
                  href={g.href}
                  className="inline-flex shrink-0 items-center gap-2 rounded-full border bg-card px-4 py-2 text-xs font-semibold transition-colors hover:border-primary/40 hover:text-primary"
                >
                  <Briefcase className="size-3.5" aria-hidden="true" />
                  {g.label}
                  <ArrowLeft className="size-3.5" aria-hidden="true" />
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <p className="mt-3 max-w-3xl text-xs leading-6 text-muted-foreground">
          * دامنه دقیق پوشش هر گروه، طبق شرایط اختصاصی بیمه‌نامه همان رشته و در حدود سقف تعهد
          مشخص می‌شود.
        </p>
      </section>

      {/* الزام قانونی */}
      <section aria-labelledby="legal-h" className="mt-12 max-w-3xl">
        <SectionHeading
          icon={Scale}
          title="الزام قانونی"
          hint="الزام بیمه گروه‌های درمانی، ریشه در مقررات مجوز فعالیت دارد."
        />
        <p className="text-[15px] leading-8 text-foreground/90">
          صدور، تمدید و نظارت بر پروانه فعالیت گروه‌های درمانی، در چارچوب مقررات سازمان نظام
          پزشکی و وزارت بهداشت انجام می‌شود و داشتن بیمه مسئولیت حرفه‌ای برای این گروه‌ها بخشی
          از الزامات همین مقررات است؛ جزئیات هر گروه، طبق مصوبه و مقررات همان گروه بررسی
          می‌شود. نکته مهم دیگر این است که بیمه، جای مسئولیت قانونی نمی‌نشیند؛ تنها پرداخت
          مالی آن را در سقف پوشش تامین می‌کند.
        </p>
        <div className="mt-4 overflow-hidden rounded-2xl border">
          <ul className="divide-y">
            {LEGAL_POINTS.map((p) => (
              <li key={p.t} className="flex items-start gap-3 bg-card p-4">
                <span className="mt-2 size-1.5 shrink-0 rounded-full bg-primary" aria-hidden="true" />
                <span>
                  <span className="block text-sm font-bold">{p.t}</span>
                  <span className="block text-[13px] leading-6 text-muted-foreground">{p.d}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>
        <div className="mt-4 flex flex-wrap gap-3">
          <Link
            href="/liability-mandatory"
            className="inline-flex items-center gap-2 rounded-full border bg-card px-5 py-2.5 text-sm font-semibold transition-colors hover:border-primary/40 hover:text-primary"
          >
            <Scale className="size-4" aria-hidden="true" />
            راهنمای الزام بیمه مسئولیت
            <ArrowLeft className="size-4" aria-hidden="true" />
          </Link>
        </div>
      </section>

      {/* هشدار */}
      <section aria-labelledby="warn-h" className="mt-12 max-w-3xl">
        <div className="rounded-2xl border bg-card p-5">
          <div className="flex items-center gap-2">
            <ShieldAlert className="size-5 text-primary" aria-hidden="true" />
            <h2 id="warn-h" className="text-sm font-extrabold">
              سه اشتباه رایج در خرید بیمه مسئولیت درمانی
            </h2>
          </div>
          <ul className="mt-4 space-y-3">
            {MEDICAL_MISTAKES.map((t) => (
              <li key={t} className="flex items-start gap-2 text-sm leading-7 text-muted-foreground">
                <span className="mt-2.5 size-1.5 shrink-0 rounded-full bg-primary" aria-hidden="true" />
                {t}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* گام‌ها */}
      <section aria-labelledby="steps-h" className="mt-12 max-w-3xl">
        <SectionHeading
          icon={ListChecks}
          title="مسیر صدور بیمه‌نامه درمانی"
          hint="از تعیین تخصص تا تمدید سالانه با دیه جدید."
        />
        <NumberedSteps steps={ISSUING_STEPS} variant="buy" />
      </section>

      {/* پل داخلی */}
      <section aria-label="پیوندهای مرتبط بیمه مسئولیت" className="mt-12 max-w-3xl">
        <div className="flex flex-wrap gap-3">
          <Link
            href="/liability/professional/medical-doctors"
            className="inline-flex items-center gap-2 rounded-full border bg-card px-5 py-2.5 text-sm font-semibold transition-colors hover:border-primary/40 hover:text-primary"
          >
            <Stethoscope className="size-4" aria-hidden="true" />
            بیمه مسئولیت پزشکان
            <ArrowLeft className="size-4" aria-hidden="true" />
          </Link>
          <Link
            href="/liability/professional/dentists"
            className="inline-flex items-center gap-2 rounded-full border bg-card px-5 py-2.5 text-sm font-semibold transition-colors hover:border-primary/40 hover:text-primary"
          >
            <Briefcase className="size-4" aria-hidden="true" />
            بیمه مسئولیت دندانپزشکان
            <ArrowLeft className="size-4" aria-hidden="true" />
          </Link>
          <Link
            href="/liability/professional/nurses-paramedics"
            className="inline-flex items-center gap-2 rounded-full border bg-card px-5 py-2.5 text-sm font-semibold transition-colors hover:border-primary/40 hover:text-primary"
          >
            <Briefcase className="size-4" aria-hidden="true" />
            بیمه مسئولیت پیراپزشکان
            <ArrowLeft className="size-4" aria-hidden="true" />
          </Link>
          <Link
            href="/liability/professional/pharmacists"
            className="inline-flex items-center gap-2 rounded-full border bg-card px-5 py-2.5 text-sm font-semibold transition-colors hover:border-primary/40 hover:text-primary"
          >
            <Briefcase className="size-4" aria-hidden="true" />
            بیمه مسئولیت داروسازان
            <ArrowLeft className="size-4" aria-hidden="true" />
          </Link>
          <Link
            href="/liability-mandatory"
            className="inline-flex items-center gap-2 rounded-full border bg-card px-5 py-2.5 text-sm font-semibold transition-colors hover:border-primary/40 hover:text-primary"
          >
            <Scale className="size-4" aria-hidden="true" />
            الزام بیمه مسئولیت
            <ArrowLeft className="size-4" aria-hidden="true" />
          </Link>
        </div>
      </section>

      {/* FAQ */}
      <section className="mx-auto mt-12 max-w-4xl">
        <FaqSection faqs={MEDICAL_FAQS} title="سوالات متداول بیمه مسئولیت گروه‌های درمانی" />
      </section>

      {/* اعتبار محتوا */}
      <div className="mt-12 space-y-5">
        <AuthorBox
          name="تیم تخصصی نمایندگی ۲۰۶۱۶ بیمه ایران"
          role="کارشناس بیمه مسئولیت"
          reviewDate={REVIEW_DATE_ISO}
        />
        <LegalDisclaimer />
      </div>

      <div className="mt-10">
        <CtaBanner
          title="بیمه مسئولیت تخصص درمانی خود را استعلام کنید"
          text="تخصص، محل خدمت و تجهیزات خود را در فرم استعلام ثبت کنید؛ پیش‌فاکتور رسمی با سقف متناسب با ریسک درمانی و نرخ مصوب بیمه ایران صادر می‌شود — رایگان و بدون تعهد."
        />
      </div>
    </div>
  );
}
