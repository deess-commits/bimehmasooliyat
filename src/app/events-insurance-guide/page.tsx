import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowLeft,
  Building2,
  CalendarCheck2,
  ClipboardCheck,
  Hammer,
  ListChecks,
  Megaphone,
  Scale,
  ShieldAlert,
  Tent,
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
import { faqJsonLd, howToJsonLd, JsonLd } from "@/lib/seo";

export const revalidate = 3600;

// ─── /events-insurance-guide — بیمه مسئولیت رویدادها و همایش‌ها ─────
// یازدهمین صفحه لایه راهنماهای عمومی (دوقلوی ساختاری /renewal).
// YMYL: بدون رقم اختراعی (سقف تابع تعداد حاضران و نوع رویداد؛ مبلغ نهایی
// فقط پیش‌فاکتور رسمی)؛ پوشش مشروط به شرایط بیمه‌نامه و دوره اعتبار.

export const metadata: Metadata = {
  title: "بیمه مسئولیت رویدادها و همایش‌ها | راهنما",
  description:
    "برگزارکننده همایش و نمایشگاه در برابر خسارت جانی و مالی شرکت‌کنندگان و اشخاص ثالث مسئول است؛ راهنمای بیمه رویداد، انتخاب سقف متناسب و صدور پیش از شروع مراسم.",
  alternates: {
    canonical: "/events-insurance-guide",
    languages: {
      "fa-IR": "/events-insurance-guide",
      en: "/events-insurance-guide",
      "x-default": "/events-insurance-guide",
    },
  },
  openGraph: {
    title: "بیمه مسئولیت رویدادها و همایش‌ها | راهنما",
    description:
      "مسئولیت برگزارکننده در برابر خسارت جانی و مالی شرکت‌کنندگان و اشخاص ثالث؛ راهنمای پوشش رویداد، انتخاب سقف متناسب با حاضران و صدور بیمه‌نامه پیش از شروع مراسم.",
    url: "/events-insurance-guide",
    type: "article",
    images: [
      {
        url: "/og/events-insurance-guide.png",
        width: 1200,
        height: 630,
        alt: "راهنمای بیمه مسئولیت رویدادها و همایش‌ها",
      },
    ],
  },
};

const ANSWER_TEXT =
  "برگزارکننده همایش، نمایشگاه یا مراسم در برابر خسارت جانی و مالی شرکت‌کنندگان، مهمانان و اشخاص ثالث مسئول است — از سانحه در محل تا آسیب تجهیزات مجاور. بیمه مسئولیت رویداد این مسئولیت را تا سقف تعهد پوشش می‌دهد و برای مجوز برخی مراسم‌ها نیز شرط است؛ صدور بیمه‌نامه باید پیش از شروع رویداد انجام شود.";

const EVENT_RISKS = [
  {
    icon: Users,
    title: "سانحه جانی شرکت‌کنندگان",
    text: "ازدحام در ورودی‌ها، لغزش و سقوط در سالن، آسیب از سازه‌های موقت یا برق‌گرفتگی از تاسیسات برق رویداد؛ مسئولیت درمان و دیه این حوادث بر عهده برگزارکننده است.",
  },
  {
    icon: Building2,
    title: "خسارت مالی محل برگزاری و تجهیزات",
    text: "آسیب به سالن، صندلی، کف و دیوار یا تجهیزات صوتی و تصویری اجاره‌ای در جریان نصب، برگزاری یا جمع‌آوری؛ این خسارت‌ها نیز موضوع مسئولیت برگزارکننده است.",
  },
  {
    icon: Tent,
    title: "آسیب به اشخاص ثالث بیرون رویداد",
    text: "سازه موقت، بنر یا تجهیزاتی که بر اثر ناپایداری یا سقوط به عابران، خودروها یا اموال مجاور خسارت می‌زنند؛ زیان‌دیده جزو حاضران نیست، اما خواهان جبران می‌شود.",
  },
  {
    icon: Hammer,
    title: "حوادث پیمانکاران رویداد",
    text: "حوادث در جریان صحنه‌آرایی، نورپردازی و صدا و تصویر؛ مسئولیت برگزارکننده نسبت به این حوادث و نسبت آن با اشخاص ثالث، جداگانه بررسی و تعیین می‌شود.",
  },
];

const EVENT_AUDIENCES = [
  {
    title: "برگزارکنندگان همایش‌های علمی و صنعتی",
    text: "سمینار، کنفرانس و گردهمایی تخصصی با حاضران متعدد در سالن‌های اجاره‌ای.",
  },
  {
    title: "نمایشگاه‌داران و غرفه‌داران",
    text: "نمایشگاه‌های تجاری و غرفه‌هایی که در بیمه‌نامه درج می‌شوند.",
  },
  {
    title: "سالن‌های مراسم و برگزارکنندگان جشن",
    text: "مراسم شادمانی، ترحیم و جشن‌هایی با مهمانان گسترده در فضای مسقف یا باز.",
  },
  {
    title: "برگزارکنندگان ورزشی و فرهنگی",
    text: "مسابقات، جشنواره‌ها و برنامه‌های هنری و تفریحی با تماشاگر و شرکت‌کننده.",
  },
  {
    title: "سازمان‌های دولتی برای مراسم",
    text: "دستگاه‌های عمومی برای مراسم رسمی، همایش‌های اداری و برنامه‌های عمومی.",
  },
];

const EVENT_MISTAKES = [
  "خرید بیمه‌نامه پس از شروع رویداد — پوشش فقط برای دوره اعتبار بیمه‌نامه برقرار است و رخدادهای پیش از تاریخ شروع، تحت پوشش قرار نمی‌گیرند.",
  "انتخاب سقف حداقلی بدون تناسب با تعداد شرکت‌کنندگان — در حادثه جدی، کسری خسارت بیش از سقف بر عهده خود برگزارکننده می‌ماند.",
  "فراموشی درج نام محل برگزاری و تاریخ دقیق — بیمه‌نامه‌ای که با مشخصات واقعی رویداد منطبق نباشد، هم برای مجوز و هم در زمان خسارت محل بحث می‌شود.",
];

const EVENT_STEPS = [
  {
    title: "تعیین نوع، محل و مدت رویداد",
    description:
      "نوع برنامه، سالن یا فضای برگزاری و تاریخ دقیق نصب تا جمع‌آوری را مشخص کنید؛ این مشخصات مبنای درج در بیمه‌نامه و اعتبار پوشش است.",
  },
  {
    title: "برآورد تعداد شرکت‌کنندگان",
    description:
      "حداکثر تعداد حاضران را با توجه به ظرفیت مجاز محل برآورد کنید؛ تعداد حاضران یکی از عوامل اصلی انتخاب سقف و محاسبه حق بیمه است.",
  },
  {
    title: "استعلام با شرح دقیق برنامه",
    description:
      "شرح برنامه، تجهیزات موقت، پیمانکاران و برنامه‌های خاص مانند آتش‌بازی را در استعلام اعلام کنید تا پوشش دقیقاً با رویداد شما تطبیق داده شود.",
  },
  {
    title: "تعیین سقف متناسب با حداکثر حاضران",
    description:
      "سقف تعهد را متناسب با حداکثر تعداد حاضران و شدت ریسک برنامه انتخاب کنید؛ رقم نهایی تنها در پیش‌فاکتور رسمی مشخص می‌شود.",
  },
  {
    title: "صدور پیش از شروع رویداد",
    description:
      "پرداخت و صدور بیمه‌نامه را پیش از آغاز نصب و برگزاری نهایی کنید؛ پوشش از تاریخ درج‌شده در بیمه‌نامه شروع می‌شود، نه از لحظه حادثه.",
  },
];

const EVENT_FAQS = [
  {
    question: "بیمه مسئولیت رویداد چه چیزی را پوشش می‌دهد؟",
    answer:
      "این بیمه‌نامه مسئولیت برگزارکننده را در برابر خسارت جانی و مالی وارد بر شرکت‌کنندگان، مهمانان، عوامل اجرا و اشخاص ثالث در جریان برگزاری رویداد پاسخ می‌گوید؛ از لغزش و سقوط حاضران تا آسیب به تجهیزات و اموال محل برگزاری. دامنه دقیق پوشش تابع شرایط بیمه‌نامه است و خسارت تا سقف تعهد تعیین‌شده جبران می‌شود.",
  },
  {
    question: "برای همایش یک‌روزه هم بیمه‌نامه صادر می‌شود؟",
    answer:
      "بله؛ دوره اعتبار بیمه‌نامه رویداد با مدت برگزاری هم‌تراز می‌شود و برای همایش‌های یک‌روزه، چندروزه یا نمایشگاه‌های چندروزه قابل صدور است. نکته مهم آن است که تاریخ شروع و پایان دقیق از ابتدا در بیمه‌نامه درج شود، چون پوشش فقط در همان دوره اعتبار برقرار است و رخداد خارج از آن تحت پوشش قرار نمی‌گیرد.",
  },
  {
    question: "آیا محل برگزاری خودش بیمه دارد و کفایت می‌کند؟",
    answer:
      "معمولاً خیر؛ بیمه‌نامه محل برگزاری ممکن است فقط مسئولیت خود مالک یا مدیر سالن را پوشش دهد و مسئولیت برگزارکننده برنامه را شامل نشود. در سانحه رویداد، معمولاً همه طرف‌های دخیل به‌عنوان خوانده مطرح می‌شوند و سهم مسئولیت هرکدام جداگانه بررسی می‌شود. بنابراین فرض کفایت بیمه صاحب محل، ریسک برگزارکننده را حذف نمی‌کند.",
  },
  {
    question: "سقف مناسب برای رویداد چندنفره چقدر است؟",
    answer:
      "رقم ثابتی وجود ندارد؛ سقف مناسب تابع تعداد حاضران، نوع رویداد، ماهیت محل برگزاری و شدت ریسک‌های برنامه است. همایش تخصصی با جمع محدود با جشن شلوغ در فضای باز قابل مقایسه نیست. مبنای شروع، دیه کامل سال وقوع خسارت است و سقف نهایی همراه با شرح برنامه در استعلام و پیش‌فاکتور تعیین می‌شود.",
  },
  {
    question: "آیا برای مجوز مراسم، گواهی بیمه لازم است؟",
    answer:
      "برای برخی مراسم‌ها بله؛ دستگاه‌های مجوزدهنده ممکن است ارائه گواهی بیمه مسئولیت را شرط صدور یا تمدید مجوز برگزاری قرار دهند و این الزام در هر دستگاه و هر شهر متفاوت است. اگر گواهی لازم دارید، آن را همزمان با استعلام اعلام کنید تا پس از صدور بیمه‌نامه، گواهی رسمی برای ارائه به دستگاه صادر شود.",
  },
  {
    question: "هزینه چگونه محاسبه می‌شود؟",
    answer:
      "حق بیمه رویداد بر پایه اطلاعات ریسک برآورد می‌شود: نوع برنامه، محل برگزاری، مدت، تعداد حاضران و سقف تعهد انتخابی. رقم از پیش تعیین‌شده‌ای مطرح نیست و مبلغ نهایی فقط در پیش‌فاکتور رسمی مشخص می‌شود. رویدادهای پرجمعیت یا با ریسک بالاتر، حق بیمه متفاوتی خواهند داشت؛ بنابراین شرح دقیق برنامه مبنای محاسبه است.",
  },
];

const REVIEW_DATE_ISO = "2026-10-27";

export default function EventsInsuranceGuidePage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      <JsonLd
        data={howToJsonLd({
          name: "مسیر صدور بیمه‌نامه رویداد در پنج گام",
          description:
            "روش گام‌به‌گام تهیه بیمه‌نامه مسئولیت رویداد: تعیین نوع و محل، برآورد حاضران، استعلام با شرح برنامه، تعیین سقف متناسب و صدور پیش از شروع رویداد.",
          steps: EVENT_STEPS,
          url: "/events-insurance-guide",
        })}
      />
      <JsonLd data={faqJsonLd(EVENT_FAQS)} />

      <Breadcrumbs
        items={[{ name: "بیمه مسئولیت رویدادها و همایش‌ها", href: "/events-insurance-guide" }]}
      />

      <header className="mt-6">
        <h1 className="text-2xl font-extrabold leading-[1.6] sm:text-3xl">
          بیمه مسئولیت رویدادها و همایش‌ها — راهنمای برگزارکنندگان
        </h1>
      </header>

      <div className="mt-6 max-w-3xl">
        <AnswerBlock title="پاسخ کوتاه" text={ANSWER_TEXT} />
      </div>

      {/* رخدادهای مسئولیت‌ساز */}
      <section aria-labelledby="risks-h" className="mt-10">
        <SectionHeading
          icon={Megaphone}
          title="چه رخدادهایی در یک رویداد دعوای مسئولیت می‌سازد؟"
          hint="مسئولیت برگزارکننده فقط به سالن محدود نیست؛ از حاضران تا اموال مجاور را دربر می‌گیرد."
        />
        <p className="max-w-3xl text-[15px] leading-8 text-foreground/90">
          رویداد محیطی موقتی است که چند ساعت یا چند روز با ازدحام، تجهیزات نصب‌شده و
          عوامل متعدد اداره می‌شود؛ همین ویژگی، ریسک‌های مسئولیت را متمرکز می‌کند. چهار
          دسته رخداد زیر رایج‌ترین مبدأ دعاوی علیه برگزارکنندگان است.
        </p>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          {EVENT_RISKS.map((r) => (
            <div key={r.title} className="rounded-2xl border bg-card p-5">
              <div className="flex items-center gap-2">
                <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-accent text-accent-foreground">
                  <r.icon className="size-5" aria-hidden="true" />
                </span>
                <h3 className="text-sm font-extrabold">{r.title}</h3>
              </div>
              <p className="mt-3 text-sm leading-7 text-muted-foreground">{r.text}</p>
            </div>
          ))}
        </div>
        <p className="mt-3 max-w-3xl text-xs leading-6 text-muted-foreground">
          * دامنه دقیق پوشش هر رخداد، تابع شرایط بیمه‌نامه، سقف تعهد و شرح فعالیت
          درج‌شده است.
        </p>
      </section>

      {/* چه کسانی نیاز دارند */}
      <section aria-labelledby="who-h" className="mt-12 max-w-3xl">
        <SectionHeading
          icon={CalendarCheck2}
          title="چه کسانی بیمه‌نامه رویداد نیاز دارند؟"
          hint="هر جا برنامه‌ای با حاضران و تجهیزات موقت برگزار می‌شود، مسئولیت برگزارکننده شکل می‌گیرد."
        />
        <div className="overflow-hidden rounded-2xl border">
          <ul className="divide-y">
            {EVENT_AUDIENCES.map((a) => (
              <li key={a.title} className="flex items-start gap-3 bg-card p-4">
                <span className="mt-2 size-1.5 shrink-0 rounded-full bg-primary" aria-hidden="true" />
                <span>
                  <span className="block text-sm font-bold">{a.title}</span>
                  <span className="block text-[13px] leading-6 text-muted-foreground">{a.text}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>
        <p className="text-[15px] leading-8 text-foreground/90">
          جزئیات پوشش‌ها، مستثنیات و مدارک لازم برای این محصول در صفحه اختصاصی آن آمده
          است:
        </p>
        <div className="mt-3 flex flex-wrap gap-3">
          <Link
            href="/liability/public/events-insurance"
            className="inline-flex items-center gap-2 rounded-full border bg-card px-5 py-2.5 text-sm font-semibold transition-colors hover:border-primary/40 hover:text-primary"
          >
            <Megaphone className="size-4" aria-hidden="true" />
            بیمه مسئولیت رویدادها و همایش‌ها
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
              سه اشتباه رایج برگزارکنندگان
            </h2>
          </div>
          <ul className="mt-4 space-y-3">
            {EVENT_MISTAKES.map((t) => (
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
        <SectionHeading icon={ListChecks} title="مسیر صدور بیمه‌نامه رویداد" />
        <NumberedSteps steps={EVENT_STEPS} variant="buy" />
      </section>

      {/* FAQ */}
      <section className="mx-auto mt-12 max-w-4xl">
        <FaqSection faqs={EVENT_FAQS} title="سوالات متداول بیمه مسئولیت رویدادها و همایش‌ها" />
      </section>

      {/* پل داخلی */}
      <section aria-label="پیوندهای مرتبط بیمه مسئولیت" className="mt-12 max-w-3xl">
        <div className="flex flex-wrap gap-3">
          <Link
            href="/liability/public/events-insurance"
            className="inline-flex items-center gap-2 rounded-full border bg-card px-5 py-2.5 text-sm font-semibold transition-colors hover:border-primary/40 hover:text-primary"
          >
            <Megaphone className="size-4" aria-hidden="true" />
            بیمه مسئولیت رویدادها و همایش‌ها
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
            <ClipboardCheck className="size-4" aria-hidden="true" />
            چک‌لیست بازبینی بیمه‌نامه پیش از امضا
            <ArrowLeft className="size-4" aria-hidden="true" />
          </Link>
          <Link
            href="/liability/commercial/public-liability"
            className="inline-flex items-center gap-2 rounded-full border bg-card px-5 py-2.5 text-sm font-semibold transition-colors hover:border-primary/40 hover:text-primary"
          >
            <Building2 className="size-4" aria-hidden="true" />
            بیمه مسئولیت عمومی
            <ArrowLeft className="size-4" aria-hidden="true" />
          </Link>
        </div>
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
          title="بیمه‌نامه رویداد خود را پیش از شروع برنامه نهایی کنید"
          text="نوع، محل، مدت و حداکثر تعداد حاضران رویداد را در فرم استعلام ثبت کنید؛ پیش‌فاکتور با سقف متناسب با برنامه صادر می‌شود و بیمه‌نامه پیش از آغاز رویداد آماده است — رایگان و بدون تعهد."
          href="/quote"
        />
      </div>
    </div>
  );
}
