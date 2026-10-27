import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowLeft,
  Briefcase,
  ListChecks,
  Scale,
  ShieldAlert,
  ShieldCheck,
  Stethoscope,
  Users,
} from "lucide-react";
import { AnswerBlock } from "@/components/answer-block";
import { AuthorBox } from "@/components/author-box";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { CtaBanner } from "@/components/cta-banner";
import { FaqSection } from "@/components/faq-section";
import { LegalDisclaimer } from "@/components/legal-disclaimer";
import { NumberedSteps } from "@/components/numbered-steps";
import { SectionHeading } from "@/components/section-heading";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { faqJsonLd, howToJsonLd, JsonLd } from "@/lib/seo";

export const revalidate = 3600;

// ─── /professional-vs-general — راهنمای عمومی: تفاوت بیمه مسئولیت حرفه‌ای و عمومی ──────────
// نهمین صفحه لایه راهنماهای عمومی (دوقلوی ساختاری /renewal + جدول مقایسه /liability-vs-other-insurance).
// YMYL: مبنای قانونی فقط ماده ۱ قانون مسئولیت مدنی ۱۳۳۹ و مصوبات شورای عالی بیمه (بدون رقم اختراعی)؛
// پرداخت همیشه مشروط به «طبق شرایط بیمه‌نامه و سقف تعهد»؛ دو بیمه‌نامه مکمل یکدیگرند، نه جایگزین.

export const metadata: Metadata = {
  title: "تفاوت بیمه مسئولیت حرفه‌ای و عمومی | راهنما",
  description:
    "مسئولیت عمومی، خسارت جانی و مالی به اشخاص ثالث در محل فعالیت است و مسئولیت حرفه‌ای، زیان خطای خدمت تخصصی؛ مقایسه پنج‌معیاره و چهار گام برای انتخاب ترکیب.",
  alternates: {
    canonical: "/professional-vs-general",
    languages: {
      "fa-IR": "/professional-vs-general",
      en: "/professional-vs-general",
      "x-default": "/professional-vs-general",
    },
  },
  openGraph: {
    title: "تفاوت بیمه مسئولیت حرفه‌ای و عمومی | راهنما",
    description:
      "مسئولیت عمومی، خسارت جانی و مالی به اشخاص ثالث در محل فعالیت است و مسئولیت حرفه‌ای، زیان خطای خدمت تخصصی؛ مقایسه پنج‌معیاره و چهار گام برای انتخاب ترکیب.",
    url: "/professional-vs-general",
    type: "article",
    images: [
      {
        url: "/og/professional-vs-general.png",
        width: 1200,
        height: 630,
        alt: "تفاوت بیمه مسئولیت حرفه‌ای و عمومی",
      },
    ],
  },
};

const ANSWER_TEXT =
  "بیمه مسئولیت عمومی، خسارت جانی و مالی به اشخاص ثالث در محل فعالیت را پاسخ می‌گوید؛ مانند لغزش مراجع یا آسیب به ملک مجاور. مسئولیت حرفه‌ای، زیان ناشی از خطای اجرای خدمت تخصصی را جبران می‌کند؛ مانند تشخیص نادرست، مشاوره ناقص یا گزارش اشتباه. بسیاری از مشاغل به هر دو نیاز دارند و دو بیمه‌نامه مکمل یکدیگرند، نه جایگزین.";

const GENERAL_EXAMPLES = [
  {
    t: "لغزش مراجع روی پله یا کف خیس",
    d: "آسیب جانی به مراجع، مشتری یا عابری که به محل فعالیت شما وارد شده است.",
  },
  {
    t: "سقوط اشیا بر سر حاضران",
    d: "افتادن اجسام از قفسه، داربست یا طبقه بالا و آسیب به شخص حاضر در محل.",
  },
  {
    t: "خسارت به ملک مجاور",
    d: "نفوذ آب، گسترش آتش یا هر زیان مالی به دارایی همسایه و مجاور محل فعالیت.",
  },
];

const PROFESSIONAL_EXAMPLES = [
  {
    t: "تشخیص یا اجرای نادرست در خدمت درمانی",
    d: "خطای پزشک، دندانپزشک یا پیراپزشک که به زیان جانی بیمار می‌انجامد.",
  },
  {
    t: "مشاوره یا گزارش تخصصی ناقص و اشتباه",
    d: "گزارش محاسبه، طراحی یا مشاوره‌ای که تصمیم زیان‌باری برای کارفرما می‌سازد.",
  },
  {
    t: "از دست رفتن مهلت به زیان موکل",
    d: "گذشت مهلت اداری یا قانونی توسط وکیل یا مشاور که زیان مالی برای موکل به بار می‌آورد.",
  },
];

const COMPARE_ROWS = [
  {
    criterion: "مبنای خسارت",
    general: "رخداد فیزیکی در محل فعالیت که به اشخاص ثالث زیان می‌زند",
    professional: "خطا در اجرای خدمت تخصصی برخلاف استاندارد حرفه",
  },
  {
    criterion: "زیان‌دیده نوعی",
    general: "هر شخص حاضر در محل؛ مراجع، عابر یا مجاور",
    professional: "گیرنده خدمت؛ بیمار، موکل یا کارفرما",
  },
  {
    criterion: "مثال",
    general: "لغزش مراجع روی پله یا سقوط اجسام",
    professional: "تشخیص نادرست، مشاوره ناقص یا گزارش اشتباه",
  },
  {
    criterion: "چه کسی نیاز دارد",
    general: "هر فعالیتی با حضور اشخاص ثالث؛ فروشگاه، کارگاه، دفتر",
    professional: "مشاغل خدمت‌دهنده تخصصی؛ پزشک، مهندس، وکیل، حسابدار",
  },
  {
    criterion: "مکمل بودن",
    general: "خطای حرفه‌ای را پوشش نمی‌دهد",
    professional: "خسارت‌های محل فعالیت را پوشش نمی‌دهد",
  },
];

const DUAL_JOBS = [
  {
    job: "پزشک دارای مطب",
    text: "عمومی برای ریسک مراجعان حاضر در مطب، حرفه‌ای برای خطای تشخیص و درمان.",
    href: "/liability/professional/medical-doctors",
    label: "بیمه مسئولیت پزشکان",
  },
  {
    job: "مهندس دارای دفتر",
    text: "عمومی برای حضور مراجعان و مجاوران، حرفه‌ای برای نقص نقشه یا محاسبه.",
    href: "/liability/professional/engineers",
    label: "بیمه مسئولیت مهندسان",
  },
  {
    job: "وکیل با دفتر پذیرش",
    text: "عمومی برای مراجعان دفتر، حرفه‌ای برای از دست رفتن مهلت یا مشاوره ناقص.",
    href: "/liability/professional/lawyers",
    label: "بیمه مسئولیت وکلا",
  },
  {
    job: "سالن زیبایی",
    text: "عمومی برای لغزش مشتری، حرفه‌ای برای آسیب ناشی از اجرای خدمت زیبایی.",
    href: "/liability/professional/beauty-salons",
    label: "بیمه مسئولیت سالن‌های زیبایی",
  },
  {
    job: "دفتر حسابداری",
    text: "عمومی برای حضور مشتریان، حرفه‌ای برای گزارش مالی اشتباه و زیان آن.",
    href: "/liability/professional/accountants-auditors",
    label: "بیمه مسئولیت حسابداران",
  },
];

const DUAL_MISTAKES = [
  "تصور اینکه بیمه عمومی خطای حرفه‌ای را هم پوشش می‌دهد — پوشش عمومی رخداد محل فعالیت است؛ خطای اجرای خدمت، موضوع بیمه‌نامه حرفه‌ای است.",
  "خرید فقط بیمه عمومی برای مشاغل خدماتی — یک خطای تخصصی می‌تواند سنگین‌ترین زیان شما باشد و از دامنه بیمه عمومی بیرون است.",
  "فراموشی افزایش سقف بیمه‌نامه حرفه‌ای با رشد حجم کار — سقفی که برای دفتر کوچک کافی بود، با رشد پرونده‌ها و مراجعان ممکن است کسری پیدا کند.",
];

const PICK_STEPS = [
  {
    title: "تفکیک ریسک محل از ریسک خدمت",
    description:
      "فهرست کنید چه رخدادهایی در محل فعالیت ممکن است به اشخاص ثالث زیان بزند و چه خطاهایی در اجرای خدمت تخصصی می‌تواند زیان‌ساز شود؛ این تفکیک، مبنای انتخاب دو بیمه‌نامه است.",
  },
  {
    title: "بررسی الزام مقررات صنف",
    description:
      "برخی گروه‌های حرفه‌ای طبق مصوبات شورای عالی بیمه و مقررات صنفی خود به بیمه حرفه‌ای الزام دارند؛ الزام رشته خود را پیش از تعیین سقف بررسی کنید.",
  },
  {
    title: "تعیین سقف هر بیمه‌نامه جداگانه",
    description:
      "سقف بیمه عمومی را با بدترین زیان ثالث در محل و سقف حرفه‌ای را با سنگین‌ترین زیان محتمل خدمت بسنجید؛ دو ریسک متفاوت، دو سقف مستقل می‌خواهند.",
  },
  {
    title: "استعلام ترکیبی",
    description:
      "هر دو ریسک را در یک استعلام اعلام کنید تا پیش‌فاکتور هر دو بیمه‌نامه با شرح فعالیت واقعی صادر شود؛ استعلام رسمی رایگان است و هیچ تعهدی ایجاد نمی‌کند.",
  },
];

const PG_FAQS = [
  {
    question: "آیا بیمه مسئولیت عمومی خطای حرفه‌ای را پوشش می‌دهد؟",
    answer:
      "خیر؛ مرز اصلی این دو بیمه‌نامه همین است. بیمه عمومی رخدادهای فیزیکی محل فعالیت مانند لغزش مراجع یا سقوط اجسام را پاسخ می‌گوید و خطای اجرای خدمت تخصصی از دامنه آن بیرون است. برای زیان ناشی از تشخیص نادرست یا گزارش اشتباه، بیمه‌نامه مسئولیت حرفه‌ای جداگانه لازم است؛ پرداخت هر دو طبق شرایط بیمه‌نامه و سقف تعهد بررسی می‌شود.",
  },
  {
    question: "کدام گروه‌ها بیمه مسئولیت حرفه‌ای اجباری دارند؟",
    answer:
      "الزام بیمه حرفه‌ای گروه‌به‌گروه تعیین می‌شود: برای گروه‌های درمانی و برخی مشاغل تخصصی دیگر، مصوبات شورای عالی بیمه و مقررات صنفی، صدور این بیمه‌نامه را شرط فعالیت یا اخذ مجوز کرده است. فهرست دقیق گروه‌ها و سقف الزامی هر رشته در همین مصوبات آمده است؛ برای گروه خود، متن مصوبه همان رشته را ملاک بگیرید.",
  },
  {
    question: "آیا دو بیمه‌نامه جداگانه صادر می‌شود؟",
    answer:
      "بله؛ چون دو موضوع پوشش متفاوت‌اند، هر یک بیمه‌نامه مستقل خود را دارد: بیمه‌نامه عمومی با سقف، فرانشیز و حق بیمه مخصوص ریسک محل و بیمه‌نامه حرفه‌ای با شرایط اختصاصی همان رشته. دو بیمه‌نامه جای یکدیگر را نمی‌گیرند و بهتر است تاریخ انقضای هر دو هم‌زمان تنظیم شود تا بازنگری ترکیبی و تمدید هم‌زمان امکان‌پذیر باشد.",
  },
  {
    question: "سقف بیمه‌نامه حرفه‌ای چگونه تعیین می‌شود؟",
    answer:
      "سقف حرفه‌ای با سنگین‌ترین زیان محتمل خدمت شما سنجیده می‌شود: ماهیت خدمت، پیچیدگی پرونده‌ها و حجم کار عوامل اصلی هستند و برای گروه‌های درمانی، دیه سال وقوع نقطه مرجع مهم است. سقف ثابت مناسب همه سال‌ها وجود ندارد؛ با رشد حجم کار سقف را بازنگری کنید و انتخاب نهایی را با پیش‌فاکتور رسمی و شرایط بیمه‌نامه هم‌راستا کنید.",
  },
  {
    question: "برای دفتر کوچک هم بیمه مسئولیت عمومی لازم است؟",
    answer:
      "بله؛ اندازه دفتر، ریسک ثالث را حذف نمی‌کند. تا زمانی که مراجع، همسایه یا مشتری به محل شما وارد می‌شود، احتمال لغزش، آسیب یا خسارت به اموال او وجود دارد و طبق قانون مسئولیت مدنی ۱۳۳۹ جبران آن با شماست. برای دفتر کوچک، سقف معمولاً با بدترین زیان ثالث ممکن تعیین می‌شود نه با اندازه کسب‌وکار.",
  },
  {
    question: "هزینه خرید ترکیب عمومی و حرفه‌ای چگونه محاسبه می‌شود؟",
    answer:
      "حق بیمه هر بیمه‌نامه جداگانه محاسبه می‌شود و ترکیبی از شرح فعالیت، تعداد پرسنل، حجم کار و سقف تعهد انتخابی است. هیچ نرخ عمومی یا درصد ثابتی وجود ندارد و هر عددی پیش از بررسی کامل ریسک، مبنا نیست. مبنای معتبر فقط پیش‌فاکتور رسمی بیمه‌گر است؛ استعلام هر دو ریسک در یک فرم، مقایسه و تصمیم را ساده‌تر می‌کند.",
  },
];

const REVIEW_DATE_ISO = "2026-10-27";

export default function ProfessionalVsGeneralPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      <JsonLd
        data={howToJsonLd({
          name: "چهار گام انتخاب ترکیب بیمه مسئولیت عمومی و حرفه‌ای",
          description:
            "روش گام‌به‌گام انتخاب: تفکیک ریسک محل از ریسک خدمت، بررسی الزام مقررات صنف، تعیین سقف جداگانه و استعلام ترکیبی.",
          steps: PICK_STEPS,
          url: "/professional-vs-general",
        })}
      />
      <JsonLd data={faqJsonLd(PG_FAQS)} />

      <Breadcrumbs items={[{ name: "مسئولیت حرفه‌ای یا عمومی", href: "/professional-vs-general" }]} />

      <header className="mt-6">
        <h1 className="text-2xl font-extrabold leading-[1.6] sm:text-3xl">
          مسئولیت حرفه‌ای یا عمومی؟ تفاوت و انتخاب
        </h1>
      </header>

      <div className="mt-6 max-w-3xl">
        <AnswerBlock title="پاسخ کوتاه" text={ANSWER_TEXT} />
      </div>

      {/* مسئولیت عمومی */}
      <section aria-labelledby="general-h" className="mt-10">
        <SectionHeading
          icon={ShieldCheck}
          title="مسئولیت عمومی چه چیزی را پاسخ می‌گوید؟"
          hint="ریسکِ محل فعالیت؛ هر کسی که در آن حاضر است."
        />
        <p className="max-w-3xl text-[15px] leading-8 text-foreground/90">
          بیمه مسئولیت عمومی ریسکِ «محل و محیط فعالیت» را پاسخ می‌گوید: رخدادهای فیزیکی‌ای که در
          کارگاه، فروشگاه، مطب یا دفتر برای اشخاص ثالث پیش می‌آید. مبنای این مسئولیت، ماده ۱
          قانون مسئولیت مدنی ۱۳۳۹ است و موضوع پوشش، حادثه است نه خدمت؛ یعنی به مهارت تخصصی شما
          کاری ندارد و به حضور اشخاص ثالث در محل شما مربوط می‌شود.
        </p>
        <div className="mt-4 rounded-2xl border bg-card p-5">
          <h3 className="text-sm font-extrabold">نمونه‌های پوشش عمومی</h3>
          <ul className="mt-4 divide-y">
            {GENERAL_EXAMPLES.map((e) => (
              <li key={e.t} className="flex items-start gap-3 py-3 first:pt-0 last:pb-0">
                <span className="mt-2 size-1.5 shrink-0 rounded-full bg-primary" aria-hidden="true" />
                <span>
                  <span className="block text-sm font-bold">{e.t}</span>
                  <span className="block text-[13px] leading-6 text-muted-foreground">{e.d}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>
        <p className="mt-3 max-w-3xl text-xs leading-6 text-muted-foreground">
          * دامنه دقیق پرداخت، طبق شرایط بیمه‌نامه مسئولیت عمومی و در حدود سقف تعهد بررسی می‌شود.
        </p>
      </section>

      {/* مسئولیت حرفه‌ای */}
      <section aria-labelledby="prof-h" className="mt-12">
        <SectionHeading
          icon={Stethoscope}
          title="مسئولیت حرفه‌ای چه چیزی را پاسخ می‌گوید؟"
          hint="ریسکِ خدمت؛ خطا در اجرای کار تخصصی."
        />
        <p className="max-w-3xl text-[15px] leading-8 text-foreground/90">
          بیمه مسئولیت حرفه‌ای ریسکِ «اجرای خدمت» را پاسخ می‌گوید: زمانی که خدمت تخصصی برخلاف
          استاندارد حرفه‌ای اجرا شود و همین خطا، زیان جانی یا مالی برای گیرنده خدمت بسازد. مبنای
          این مسئولیت نیز همان ماده ۱ قانون مسئولیت مدنی ۱۳۳۹ است و پوشش گروه‌های حرفه‌ای در قالب
          مصوبات شورای عالی بیمه و شرایط اختصاصی هر رشته طراحی می‌شود.
        </p>
        <div className="mt-4 rounded-2xl border bg-card p-5">
          <h3 className="text-sm font-extrabold">نمونه‌های پوشش حرفه‌ای</h3>
          <ul className="mt-4 divide-y">
            {PROFESSIONAL_EXAMPLES.map((e) => (
              <li key={e.t} className="flex items-start gap-3 py-3 first:pt-0 last:pb-0">
                <span className="mt-2 size-1.5 shrink-0 rounded-full bg-primary" aria-hidden="true" />
                <span>
                  <span className="block text-sm font-bold">{e.t}</span>
                  <span className="block text-[13px] leading-6 text-muted-foreground">{e.d}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>
        <p className="mt-3 max-w-3xl text-xs leading-6 text-muted-foreground">
          * فهرست گروه‌های حرفه‌ای و جزئیات پوشش هر گروه، طبق مصوبات شورای عالی بیمه و در شرایط
          اختصاصی بیمه‌نامه همان رشته مشخص می‌شود؛ پرداخت در حدود سقف تعهد است.
        </p>
      </section>

      {/* جدول مقایسه */}
      <section aria-labelledby="cmp-h" className="mt-12">
        <SectionHeading
          icon={Scale}
          title="جدول مقایسه: مسئولیت عمومی در برابر مسئولیت حرفه‌ای"
          hint="پنج معیار، دو بیمه‌نامه مکمل."
        />
        <p className="mb-4 max-w-3xl text-[15px] leading-8 text-foreground/90">
          جدول زیر تفاوت این دو بیمه‌نامه را در پنج معیار خلاصه می‌کند. یادآوری مهم: دامنه دقیق
          پرداخت در هر بیمه‌نامه طبق شرایط همان بیمه‌نامه مشخص می‌شود و این جدول جایگزین شرایط
          عمومی و اختصاصی بیمه‌نامه نیست.
        </p>
        <div className="overflow-hidden rounded-2xl border">
          <Table>
            <TableHeader>
              <TableRow className="bg-accent/60">
                <TableHead className="w-1/5 text-start">معیار</TableHead>
                <TableHead className="w-2/5 text-start">مسئولیت عمومی</TableHead>
                <TableHead className="text-start">مسئولیت حرفه‌ای</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {COMPARE_ROWS.map((r) => (
                <TableRow key={r.criterion}>
                  <TableCell className="align-top font-bold">{r.criterion}</TableCell>
                  <TableCell className="align-top text-sm font-medium leading-7">{r.general}</TableCell>
                  <TableCell className="align-top text-sm leading-7 text-muted-foreground">
                    {r.professional}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <p className="mt-3 max-w-3xl text-xs leading-6 text-muted-foreground">
          * نتیجه جدول: هیچ‌کدام جایگزین دیگری نیست؛ دو ریسک متفاوت، دو بیمه‌نامه مستقل می‌خواهند.
        </p>
      </section>

      {/* مشاغل نیازمند هر دو */}
      <section aria-labelledby="jobs-h" className="mt-12">
        <SectionHeading
          icon={Users}
          title="کدام مشاغل به هر دو نیاز دارند؟"
          hint="هر جا ریسک محل و ریسک خدمت هم‌زمان است، دو بیمه‌نامه مکمل لازم است."
        />
        <p className="mb-4 max-w-3xl text-[15px] leading-8 text-foreground/90">
          برای مشاغل زیر، هم اشخاص ثالثی وارد محل فعالیت شما می‌شوند و هم خدمت تخصصی تحویل
          می‌دهید؛ بنابراین ریسک محل و ریسک خدمت هر دو واقعی‌اند و یک بیمه‌نامه، هر دو را نمی‌پوشاند.
        </p>
        <div className="max-w-3xl overflow-hidden rounded-2xl border">
          <ul className="divide-y">
            {DUAL_JOBS.map((j) => (
              <li
                key={j.job}
                className="flex flex-col gap-3 bg-card p-4 sm:flex-row sm:items-center sm:justify-between"
              >
                <div>
                  <span className="block text-sm font-bold">{j.job}</span>
                  <span className="block text-[13px] leading-6 text-muted-foreground">{j.text}</span>
                </div>
                <Link
                  href={j.href}
                  className="inline-flex shrink-0 items-center gap-2 rounded-full border bg-card px-4 py-2 text-xs font-semibold transition-colors hover:border-primary/40 hover:text-primary"
                >
                  <Briefcase className="size-3.5" aria-hidden="true" />
                  {j.label}
                  <ArrowLeft className="size-3.5" aria-hidden="true" />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* هشدار */}
      <section aria-labelledby="warn-h" className="mt-12 max-w-3xl">
        <div className="rounded-2xl border bg-card p-5">
          <div className="flex items-center gap-2">
            <ShieldAlert className="size-5 text-primary" aria-hidden="true" />
            <h2 id="warn-h" className="text-sm font-extrabold">
              سه اشتباه رایج در انتخاب میان مسئولیت عمومی و حرفه‌ای
            </h2>
          </div>
          <ul className="mt-4 space-y-3">
            {DUAL_MISTAKES.map((t) => (
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
          title="چهار گام انتخاب ترکیب مناسب"
          hint="از تفکیک ریسک‌ها تا استعلام ترکیبی."
        />
        <NumberedSteps steps={PICK_STEPS} variant="buy" />
      </section>

      {/* پل داخلی */}
      <section aria-label="پیوندهای مرتبط بیمه مسئولیت" className="mt-12 max-w-3xl">
        <div className="flex flex-wrap gap-3">
          <Link
            href="/liability/professional"
            className="inline-flex items-center gap-2 rounded-full border bg-card px-5 py-2.5 text-sm font-semibold transition-colors hover:border-primary/40 hover:text-primary"
          >
            <Briefcase className="size-4" aria-hidden="true" />
            همه بیمه‌نامه‌های مسئولیت حرفه‌ای
            <ArrowLeft className="size-4" aria-hidden="true" />
          </Link>
          <Link
            href="/liability/commercial/public-liability"
            className="inline-flex items-center gap-2 rounded-full border bg-card px-5 py-2.5 text-sm font-semibold transition-colors hover:border-primary/40 hover:text-primary"
          >
            <ShieldCheck className="size-4" aria-hidden="true" />
            بیمه مسئولیت عمومی
            <ArrowLeft className="size-4" aria-hidden="true" />
          </Link>
          <Link
            href="/liability/professional/medical-doctors"
            className="inline-flex items-center gap-2 rounded-full border bg-card px-5 py-2.5 text-sm font-semibold transition-colors hover:border-primary/40 hover:text-primary"
          >
            <Stethoscope className="size-4" aria-hidden="true" />
            بیمه مسئولیت پزشکان
            <ArrowLeft className="size-4" aria-hidden="true" />
          </Link>
          <Link
            href="/coverage-limit"
            className="inline-flex items-center gap-2 rounded-full border bg-card px-5 py-2.5 text-sm font-semibold transition-colors hover:border-primary/40 hover:text-primary"
          >
            <Scale className="size-4" aria-hidden="true" />
            راهنمای انتخاب سقف تعهد
            <ArrowLeft className="size-4" aria-hidden="true" />
          </Link>
          <Link
            href="/policy-review-checklist"
            className="inline-flex items-center gap-2 rounded-full border bg-card px-5 py-2.5 text-sm font-semibold transition-colors hover:border-primary/40 hover:text-primary"
          >
            <ListChecks className="size-4" aria-hidden="true" />
            چک‌لیست بازبینی بیمه‌نامه
            <ArrowLeft className="size-4" aria-hidden="true" />
          </Link>
        </div>
      </section>

      {/* FAQ */}
      <section className="mx-auto mt-12 max-w-4xl">
        <FaqSection faqs={PG_FAQS} title="سوالات متداول تفاوت مسئولیت حرفه‌ای و عمومی" />
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
          title="ترکیب عمومی و حرفه‌ای مناسب کسب‌وکار خود را استعلام کنید"
          text="ریسک محل و ریسک خدمت خود را در فرم استعلام ثبت کنید؛ کارشناس ما سقف هر دو بیمه‌نامه را جداگانه با پیش‌فاکتور رسمی بیمه ایران تنظیم می‌کند — رایگان و بدون تعهد."
        />
      </div>
    </div>
  );
}
