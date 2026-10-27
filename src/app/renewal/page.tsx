import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowLeft,
  CalendarClock,
  FilePlus2,
  RefreshCw,
  Scale,
  ShieldAlert,
  TrendingUp,
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

// ─── /renewal — راهنمای عمومی تمدید و الحاقیه بیمه مسئولیت ──────────
// سومین صفحه لایه راهنماهای عمومی (دوقلوی /coverage-limit و /deductible).
// YMYL: بدون رقم اختراعی نرخ؛ مبناهای قانونی فقط واقعی؛ پوشش مشروط به
// شرایط عمومی بیمه‌نامه.

export const metadata: Metadata = {
  title: "تمدید و الحاقیه بیمه مسئولیت — راهنمای کامل و زمان‌بندی",
  description:
    "چه زمانی بیمه مسئولیت را تمدید کنیم؟ تفاوت تمدید و الحاقیه، بازنگری سقف تعهد با دیه سالانه، اثر سوابق بدون خسارت و پنج گام تمدید بدون وقفه پوشش.",
  alternates: {
    canonical: "/renewal",
    languages: {
      "fa-IR": "/renewal",
      en: "/en/renewal",
      "x-default": "/renewal",
    },
  },
  openGraph: {
    title: "تمدید و الحاقیه بیمه مسئولیت — راهنمای کامل و زمان‌بندی",
    description:
      "تمدید پیش از انقضا، کاربردهای الحاقیه و بازنگری سقف تعهد با دیه هر سال — راهنمای گام‌به‌گام تمدید بیمه مسئولیت.",
    url: "/renewal",
    type: "article",
    images: [{ url: "/og/renewal.png", width: 1200, height: 630, alt: "راهنمای تمدید و الحاقیه بیمه مسئولیت" }],
  },
};

const RENEWAL_STEPS = [
  {
    title: "بازنگری اطلاعات ریسک",
    description:
      "هر تغییری در فعالیت، تعداد پرسنل، آدرس محیط کار یا نوع مشاغل را فهرست کنید؛ این اطلاعات مبنای صدور بیمه‌نامه جدید و اعتبار پوشش در زمان خسارت است.",
  },
  {
    title: "مرور سوابق خسارت دوره قبل",
    description:
      "خسارت‌های اعلام‌شده و علل آن‌ها را مرور کنید. سوابق بدون خسارت قدرت مذاکره شما در تمدید است و الگوی خسارت، انتخاب فرانشیز و سقف دوره جدید را شکل می‌دهد.",
  },
  {
    title: "تطبیق سقف تعهد با دیه سال جدید",
    description:
      "دیه هر سال با ابلاغیه رسمی تغییر می‌کند؛ سقفی که سال گذشته کافی بود، امسال ممکن است کسری داشته باشد. سقف را دست‌کم معادل دیه کامل سال وقوع نگه دارید.",
  },
  {
    title: "درخواست پیش‌فاکتور تمدید پیش از انقضا",
    description:
      "چند روز کاری پیش از پایان بیمه‌نامه استعلام بدهید تا فرصت مقایسه سقف، فرانشیز و پوشش‌ها داشته باشید؛ تمدید در روز آخر، امکان بازنگری را از شما می‌گیرد.",
  },
  {
    title: "پرداخت و دریافت بیمه‌نامه پیش از انقضا",
    description:
      "پرداخت را طوری برنامه‌ریزی کنید که بیمه‌نامه جدید پیش از ساعت انقضای بیمه‌نامه قبلی صادر شده باشد؛ هر ساعت وقفه یعنی ریسک بی‌پوشش برای فعالیت شما.",
  },
];

const RENEWAL_FAQS = [
  {
    question: "بیمه مسئولیت را چه زمانی تمدید کنیم؟",
    answer:
      "بهترین زمان، چند روز کاری پیش از تاریخ انقضای بیمه‌نامه است. تمدید زودهنگام به شما فرصت می‌دهد اطلاعات ریسک را به‌روز کنید، سقف و فرانشیز را با تجربه سال قبل بازنگری کنید و بدون هیچ وقفه‌ای پوشش جدید از لحظه انقضا آغاز شود؛ چون پوشش بیمه‌ای فقط در دوره اعتبار بیمه‌نامه برقرار است.",
  },
  {
    question: "اگر بیمه مسئولیت تمدید نشود چه اتفاقی می‌افتد؟",
    answer:
      "از ساعت انقضا، پوشش به‌طور کامل قطع می‌شود و هر رخداد جدید در دوره بدون بیمه‌نامه، هزینه آن مستقیماً بر عهده خودتان است. رخدادهایی که در دوره اعتبار بیمه‌نامه قبلی اتفاق افتاده‌اند طبق شرایط همان بیمه‌نامه بررسی می‌شوند، اما وقفه تمدید، پیوستگی سوابق را می‌شکند و معمولاً در تمدیدهای بعدی به زیان شما تمام می‌شود.",
  },
  {
    question: "الحاقیه چیست و چه تفاوتی با تمدید دارد؟",
    answer:
      "الحاقیه سند رسمی اعمال تغییرات روی همان بیمه‌نامه جاری است؛ مانند افزایش سقف تعهد، افزودن پوشش تکمیلی، اصلاح مشخصات یا اعلام تغییر فعالیت. تمدید اما صدور بیمه‌نامه جدید برای دوره بعدی است. تغییرات میان‌دوره‌ای با الحاقیه و ادامه پوشش برای دوره جدید با تمدید انجام می‌شود و هیچ‌کدام جای دیگری را نمی‌گیرد.",
  },
  {
    question: "در تمدید، سقف تعهد را چگونه انتخاب کنیم؟",
    answer:
      "مبنای حداقلی، دیه کامل سال وقوع خسارت است که هر سال با ابلاغیه رسمی تغییر می‌کند؛ بنابراین تکرار سقف سال قبل بدون تطبیق، یعنی پذیرش کسری پوشش. برای فعالیت‌های پرخطر یا پرتراکم، سقف باید چند برابر دیه تعیین شود. راهنمای کامل انتخاب سقف در صفحه اختصاصی سقف تعهد آمده است.",
  },
  {
    question: "سوابق بدون خسارت چه اثری بر تمدید دارد؟",
    answer:
      "سابقه دوره‌های پیوسته بدون خسارت، نشانگر کنترل ریسک شماست و قدرت مذاکره در تمدید را افزایش می‌دهد؛ نرخ نهایی همیشه پس از بررسی کامل ریسک در پیش‌فاکتور رسمی مشخص می‌شود و هیچ کاهشی تضمین‌شده نیست. وقفه در تمدید، این پیوستگی را می‌شکند و معمولاً به ضرر بیمه‌گزار تمام می‌شود.",
  },
  {
    question: "دعوایی که پس از انقضا مطرح می‌شود با کدام بیمه‌نامه بررسی می‌شود؟",
    answer:
      "در بیمه‌های مسئولیت ملاک، تاریخ وقوع رخداد است نه تاریخ طرح دعوا؛ پس دعوای ناشی از رخدادی که در دوره اعتبار بیمه‌نامه قبلی رخ داده، طبق شرایط همان بیمه‌نامه بررسی می‌شود. مهلت و نحوه مطالبه نیز مطابق ماده ۳۰ قانون بیمه و شرایط عمومی بیمه‌نامه است؛ برای موارد مشخص با کارشناس تماس بگیرید.",
  },
];

const RENEWAL_MISTAKES = [
  "تمدید در روز آخر یا پس از انقضا — هر وقفه‌ای حتی چند ساعت، فعالیت را در برابر رخدادهای جدید بی‌پوشش می‌کند.",
  "تکرار سقف سال قبل بدون تطبیق با دیه سال جدید — کسری سقف در حادثه جدی بر عهده خود بیمه‌گزار می‌ماند.",
  "اعلام نکردن تغییر فعالیت یا تعداد پرسنل — عدم انطباق بیمه‌نامه با وضعیت واقعی می‌تواند در زمان خسارت محل بحث شود.",
];

const REVIEW_DATE_ISO = "2026-10-26";

export default function RenewalPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      <JsonLd
        data={howToJsonLd({
          name: "پنج گام تمدید بیمه مسئولیت بدون وقفه پوشش",
          description:
            "روش گام‌به‌گام تمدید بیمه مسئولیت: بازنگری ریسک، مرور سوابق، تطبیق سقف با دیه جدید و صدور پیش از انقضا.",
          steps: RENEWAL_STEPS,
          url: "/renewal",
        })}
      />
      <JsonLd data={faqJsonLd(RENEWAL_FAQS)} />

      <Breadcrumbs items={[{ name: "راهنمای تمدید و الحاقیه", href: "/renewal" }]} />

      <header className="mt-6">
        <h1 className="text-2xl font-extrabold leading-[1.6] sm:text-3xl">
          تمدید و الحاقیه بیمه مسئولیت — راهنمای کامل
        </h1>
      </header>

      <div className="mt-6 max-w-3xl">
        <AnswerBlock
          title="پاسخ کوتاه"
          text="تمدید یعنی ادامه پوشش برای دوره جدید، پیش از انقضای بیمه‌نامه یک‌ساله؛ چون پوشش بیمه‌ای فقط در دوره اعتبار بیمه‌نامه برقرار است. الحاقیه نیز سند رسمی اعمال تغییرات میان‌دوره‌ای مانند افزایش سقف یا اصلاح مشخصات است. در تمدید، سقف تعهد را با دیه سال جدید تطبیق دهید و تمدید را چند روز پیش از انقضا انجام دهید."
        />
      </div>

      {/* چرا پیش از انقضا */}
      <section aria-labelledby="why-h" className="mt-10 max-w-3xl">
        <SectionHeading
          icon={CalendarClock}
          title="چرا تمدید باید پیش از انقضا انجام شود؟"
          hint="پوشش بیمه‌ای فقط در دوره اعتبار بیمه‌نامه معتبر است."
        />
        <p className="text-[15px] leading-8 text-foreground/90">
          در بیمه‌های مسئولیت، ملاک اصلی بررسی خسارت، تاریخ وقوع رخداد است؛ اما این اصل
          به معنای بی‌اهمیتی دوره پوشش نیست. رخدادی که در دوره بدون بیمه‌نامه اتفاق
          بیفتد، هیچ پوششی ندارد و هزینه آن مستقیماً بر عهده بیمه‌گزار است. علاوه بر
          این، پیوستگی دوره‌های تمدید، سوابق ریسک شما را می‌سازد و وقفه در آن معمولاً
          در تمدیدهای بعدی به زیان شما تمام می‌شود.
        </p>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <div className="rounded-2xl border bg-card p-5">
            <h3 className="text-sm font-extrabold">تمدید زودهنگام</h3>
            <p className="mt-2 text-sm leading-7 text-muted-foreground">
              فرصت بازنگری اطلاعات، مقایسه سقف و فرانشیز و آغاز پوشش جدید از لحظه
              انقضا؛ پیوستگی سوابق حفظ می‌شود.
            </p>
          </div>
          <div className="rounded-2xl border bg-card p-5">
            <h3 className="text-sm font-extrabold">وقفه پوشش</h3>
            <p className="mt-2 text-sm leading-7 text-muted-foreground">
              هر رخداد در دوره بدون بیمه‌نامه بی‌پوشش است؛ پیوستگی سوابق می‌شکند و
              بازگشت به چرخه تمدید معمولاً پرهزینه‌تر است.
            </p>
          </div>
        </div>
      </section>

      {/* الحاقیه */}
      <section aria-labelledby="endorse-h" className="mt-12">
        <SectionHeading
          icon={FilePlus2}
          title="الحاقیه چیست و چه کاربردهایی دارد؟"
          hint="هر تغییر روی بیمه‌نامه جاری، فقط با الحاقیه رسمی اعتبار می‌یابد."
        />
        <div className="max-w-3xl overflow-hidden rounded-2xl border">
          <ul className="divide-y">
            {[
              { t: "افزایش یا کاهش سقف تعهد", d: "مثلاً هم‌تراز کردن سقف با دیه جدید وسط دوره." },
              { t: "افزودن پوشش یا ذی‌نفع جدید", d: "افزودن پوشش‌های تکمیلی یا اضافه‌کردن طرف قرارداد." },
              { t: "اصلاح مشخصات بیمه‌شده", d: "تصحیح نام، شناسه یا نشانی فعالیت." },
              { t: "اعلام تغییر فعالیت یا پرسنل", d: "انطباق بیمه‌نامه با وضعیت واقعی کسب‌وکار." },
              { t: "انتقال تعهدات", d: "مانند انتقال حقوق و تعهدات بیمه‌نامه در صورت فوت بیمه‌گذار مطابق ماده ۲۱ قانون بیمه." },
            ].map((r) => (
              <li key={r.t} className="flex items-start gap-3 bg-card p-4">
                <span className="mt-2 size-1.5 shrink-0 rounded-full bg-primary" aria-hidden="true" />
                <span>
                  <span className="block text-sm font-bold">{r.t}</span>
                  <span className="block text-[13px] leading-6 text-muted-foreground">{r.d}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>
        <p className="mt-3 max-w-3xl text-xs leading-6 text-muted-foreground">
          * دامنه دقیق هر تغییر و اثر آن بر حق بیمه، در شرایط عمومی بیمه‌نامه و پیش‌فاکتور
          رسمی مشخص می‌شود.
        </p>
      </section>

      {/* بازنگری سقف */}
      <section aria-labelledby="limit-h" className="mt-12 max-w-3xl">
        <SectionHeading
          icon={TrendingUp}
          title="بازنگری سقف در تمدید — دیه هر سال تغییر می‌کند"
          hint="سقفی که امسال کافی است، سال بعد ممکن است کسری داشته باشد."
        />
        <p className="text-[15px] leading-8 text-foreground/90">
          مهم‌ترین تصمیم هر تمدید، انتخاب سقف تعهد است. چون دیه هر سال با ابلاغیه رسمی
          افزایش می‌یابد، تکرار مکانیکی سقف سال قبل یعنی پذیرش کسری پوشش نسبت به سال
          جدید. سقف را دست‌کم معادل دیه کامل سال وقوع نگه دارید و برای فعالیت‌های
          پرخطر، چند برابر آن انتخاب کنید.
        </p>
        <div className="mt-4 flex flex-wrap gap-3">
          <Link
            href="/coverage-limit"
            className="inline-flex items-center gap-2 rounded-full border bg-card px-5 py-2.5 text-sm font-semibold transition-colors hover:border-primary/40 hover:text-primary"
          >
            <Scale className="size-4" aria-hidden="true" />
            راهنمای انتخاب سقف تعهد
            <ArrowLeft className="size-4" aria-hidden="true" />
          </Link>
          <Link
            href="/dih"
            className="inline-flex items-center gap-2 rounded-full border bg-card px-5 py-2.5 text-sm font-semibold transition-colors hover:border-primary/40 hover:text-primary"
          >
            <Scale className="size-4" aria-hidden="true" />
            جدول دیه سالانه
            <ArrowLeft className="size-4" aria-hidden="true" />
          </Link>
        </div>
      </section>

      {/* سوابق خسارت */}
      <section aria-labelledby="hist-h" className="mt-12 max-w-3xl">
        <SectionHeading
          icon={RefreshCw}
          title="سوابق خسارت و اثر آن بر تمدید"
          hint="پیوستگی دوره‌ها بخشی از پرونده ریسک شماست."
        />
        <p className="text-[15px] leading-8 text-foreground/90">
          بیمه‌گر در تمدید، تجربه خسارت دوره قبل را در کنار اطلاعات فعلی ریسک بررسی
          می‌کند. دوره‌های پیوسته بدون خسارت، نشانگر کنترل ریسک است و قدرت مذاکره شما
          را بالا می‌برد؛ خسارت‌های اعلام‌شده نیز به‌معنای قطع پوشش نیستند، اما ممکن است
          روی شرایط دوره جدید اثر بگذارند. نرخ نهایی همیشه در پیش‌فاکتور رسمی مشخص
          می‌شود و هیچ وعده کاهش یا افزایش قطعی وجود ندارد.
        </p>
      </section>

      {/* هشدار */}
      <section aria-labelledby="warn-h" className="mt-12 max-w-3xl">
        <div className="rounded-2xl border bg-card p-5">
          <div className="flex items-center gap-2">
            <ShieldAlert className="size-5 text-primary" aria-hidden="true" />
            <h2 id="warn-h" className="text-sm font-extrabold">
              سه اشتباه رایج در تمدید بیمه مسئولیت
            </h2>
          </div>
          <ul className="mt-4 space-y-3">
            {RENEWAL_MISTAKES.map((t) => (
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
        <SectionHeading icon={CalendarClock} title="پنج گام تمدید بدون وقفه پوشش" />
        <NumberedSteps steps={RENEWAL_STEPS} variant="buy" />
      </section>

      {/* FAQ */}
      <section className="mx-auto mt-12 max-w-4xl">
        <FaqSection faqs={RENEWAL_FAQS} title="سوالات متداول تمدید و الحاقیه" />
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
          title="تمدید خود را زودهنگام شروع کنید"
          text="اطلاعات ریسک خود را در فرم استعلام ثبت کنید؛ پیش‌فاکتور تمدید با سقف به‌روز و نرخ مصوب بیمه ایران پیش از انقضای بیمه‌نامه فعلی صادر می‌شود — رایگان و بدون تعهد."
        />
      </div>
    </div>
  );
}
