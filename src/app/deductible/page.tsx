import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowLeft,
  Coins,
  Gauge,
  Percent,
  Scale,
  ShieldAlert,
  Wallet,
} from "lucide-react";
import { AnswerBlock } from "@/components/answer-block";
import { AuthorBox } from "@/components/author-box";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { CtaBanner } from "@/components/cta-banner";
import { FaqSection } from "@/components/faq-section";
import { LegalDisclaimer } from "@/components/legal-disclaimer";
import { NumberedSteps } from "@/components/numbered-steps";
import { SectionHeading } from "@/components/section-heading";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { faqJsonLd, howToJsonLd, JsonLd } from "@/lib/seo";

export const revalidate = 3600;

// ─── /deductible — راهنمای عمومی انتخاب فرانشیز ─────────────────────
// صفحه دوقلوی /coverage-limit در لایه راهنماهای عمومی.
// YMYL: بدون رقم اختراعی نرخ؛ جدول عددی فقط «مثال آموزشی» جمع/تفریق است.

export const metadata: Metadata = {
  title: "فرانشیز بیمه مسئولیت چیست و چقدر باشد؟ راهنمای انتخاب",
  description:
    "فرانشیز قطعی و درصدی در بیمه مسئولیت یعنی چه؟ اثر آن بر حق بیمه، مثال آموزشی سهم بیمه‌شده در خسارت، زمان منطقی بودن فرانشیز بالاتر و پنج گام انتخاب.",
  alternates: {
    canonical: "/deductible",
    languages: {
      "fa-IR": "/deductible",
      en: "/en/deductible",
      "x-default": "/deductible",
    },
  },
  openGraph: {
    title: "فرانشیز بیمه مسئولیت چیست و چقدر باشد؟ راهنمای انتخاب",
    description:
      "تفاوت فرانشیز قطعی و درصدی، اثر فرانشیز بر نرخ و توازن آن با سقف تعهد — با مثال آموزشی و گام‌های انتخاب.",
    url: "/deductible",
    type: "article",
    images: [{ url: "/og/deductible.png", width: 1200, height: 630, alt: "راهنمای انتخاب فرانشیز بیمه مسئولیت" }],
  },
};

const DEDUCTIBLE_STEPS = [
  {
    title: "برآورد فراوانی خسارت‌های کوچک",
    description:
      "فعالیت‌هایی با خسارت‌های ریز و مکرر (فروشگاه، رستوران) بیشتر در معرض فرانشیز قطعی‌اند؛ الگوی حوادث خود را مشخص کنید.",
  },
  {
    title: "سنجش توان مالی برای سهم اول",
    description:
      "حداکثر مبلغی که در بدترین حالت می‌توانید بی‌درنگ از جیب بپردازید را تعیین کنید؛ فرانشیز بیشتر از این حد توصیه نمی‌شود.",
  },
  {
    title: "مقایسه دو سناریو در پیش‌فاکتور",
    description:
      "دو فرانشیز متفاوت (مثلاً قطعی مشخص و درصدی) را در استعلام ثبت کنید و تفاوت واقعی نرخ را در پیش‌فاکتور رسمی ببینید.",
  },
  {
    title: "توازن فرانشیز با سقف تعهد",
    description:
      "فرانشیز بالاتر نباید بهانه کاهش سقف شود؛ سقف را بر مبنای دیه سال وقوع نگه دارید و صرفه‌جویی را از محل فرانشیز ببینید.",
  },
  {
    title: "بازنگری سالانه در تمدید",
    description:
      "در تمدید بیمه‌نامه، فرانشیز را با تجربه خسارت سال قبل و توان مالی جدید بازنگری کنید؛ سوابق بدون خسارت قدرت مذاکره شماست.",
  },
];

const DEDUCTIBLE_FAQS = [
  {
    question: "فرانشیز در بیمه مسئولیت یعنی چه؟",
    answer:
      "فرانشیز سهم اول خسارتی است که بیمه‌شده می‌پذیرد و بیمه‌گر از آن مبلغ شروع به پرداخت می‌کند. اگر خسارت کمتر از فرانشیز باشد، کل آن بر عهده بیمه‌شده است و اگر بیشتر باشد، مازاد بر فرانشیز پرداخت می‌شود. فرانشیز ابزار کنترل خسارت‌های ریز است و با سقف تعهد که پایان پرداخت را تعیین می‌کند تفاوت دارد.",
  },
  {
    question: "فرانشیز قطعی و درصدی چه فرقی دارند؟",
    answer:
      "فرانشیز قطعی مبلغی ثابت از هر خسارت است؛ مثلاً در هر رخداد مقدار مشخصی کسر می‌شود. فرانشیز درصدی نسبت به مبلغ خسارت محاسبه می‌شود؛ پس در خسارت‌های بزرگ، سهم بیمه‌شده نیز بزرگ‌تر می‌شود. در رشته‌هایی که حجم خسارت متغیر است معمولاً فرانشیز درصدی و برای خسارت‌های کوچک و مکرر فرانشیز قطعی به‌کار می‌رود.",
  },
  {
    question: "آیا فرانشیز بالاتر همیشه به‌صرفه است؟",
    answer:
      "خیر؛ فرانشیز بالاتر نرخ را کم می‌کند اما ریسک پرداخت‌های مکرر از جیب را به شما منتقل می‌کند. اگر الگوی فعالیت شما خسارت‌های کوچک و پرتکرار دارد، صرفه‌جویی نرخ ممکن است با مجموع سهم‌های اول جبران نشود. تصمیم درست را با مقایسه دو سناریو در پیش‌فاکتور و مرور سوابق خسارت خود بگیرید.",
  },
  {
    question: "می‌توان فرانشیز را حذف کرد؟",
    answer:
      "در برخی رشته‌ها با پرداخت حق بیمه بیشتر امکان کاهش فرانشیز وجود دارد، اما حذف کامل آن در همه بیمه‌نامه‌ها ممکن نیست و به تشخیص بیمه‌گر بستگی دارد. پیش از تصمیم، اثر کاهش فرانشیز بر نرخ را در استعلام ببینید؛ گاهی همان بودجه بهتر است صرف افزایش سقف تعهد شود.",
  },
  {
    question: "فرانشیز و سقف تعهد با هم چه رابطه‌ای دارند؟",
    answer:
      "این دو دو سر یک طیف‌اند: فرانشیز «شروع پرداخت» و سقف «پایان پرداخت» را تعیین می‌کند. ترکیب متعادل یعنی فرانشیز در حد توان مالی شما و سقف دست‌کم معادل دیه کامل سال وقوع. اگر برای کاهش نرخ فرانشیز را بالا می‌برید، سقف را کوتاه نکنید؛ کسری سقف خطرناک‌تر از فرانشیز بالاتر است.",
  },
  {
    question: "در زمان خسارت فرانشیز چگونه اعمال می‌شود؟",
    answer:
      "پس از تعیین مبلغ خسارت توسط کارشناس، فرانشیز مندرج در بیمه‌نامه از مبلغ قابل پرداخت کسر و بقیه توسط بیمه‌گر پرداخت می‌شود. در فرانشیز درصدی، درصد روی مبلغ خسارت نهایی اعمال می‌شود؛ به همین دلیل مبلغ دقیق دریافتی شما تا صدور برگه کارشناسی مشخص نیست و در صورت اختلاف، مراحل حل اختلاف قانون بیمه جاری است.",
  },
];

const REVIEW_DATE_ISO = "2026-10-25";

export default function DeductiblePage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      <JsonLd
        data={howToJsonLd({
          name: "پنج گام انتخاب فرانشیز بیمه مسئولیت",
          description:
            "روش گام‌به‌گام انتخاب فرانشیز بر مبنای الگوی خسارت، توان مالی و توازن با سقف تعهد.",
          steps: DEDUCTIBLE_STEPS,
          url: "/deductible",
        })}
      />
      <JsonLd data={faqJsonLd(DEDUCTIBLE_FAQS)} />
      {/* BreadcrumbList خودکار توسط کامپوننت Breadcrumbs صادر می‌شود */}
      <Breadcrumbs items={[{ name: "راهنمای فرانشیز", href: "/deductible" }]} />

      <header className="mt-6">
        <h1 className="text-2xl font-extrabold leading-[1.6] sm:text-3xl">
          فرانشیز بیمه مسئولیت چیست و چقدر باشد؟
        </h1>
      </header>

      <div className="mt-6 max-w-3xl">
        <AnswerBlock
          title="پاسخ کوتاه"
          text="فرانشیز سهم اول خسارتی است که خودتان می‌پذیرید؛ بیمه‌گر از مازاد بر آن پرداخت می‌کند. دو نوع رایج دارد: قطعی (مبلغ ثابت هر خسارت) و درصدی (درصدی از مبلغ خسارت). فرانشیز بالاتر نرخ را کم می‌کند اما سهم جیبی شما را زیاد می‌کند؛ حد منطقی آن با الگوی خسارت و توان مالی شما تعیین می‌شود."
        />
      </div>

      {/* تعریف و دو نوع */}
      <section aria-labelledby="def-h" className="mt-10 max-w-3xl">
        <SectionHeading
          icon={Percent}
          title="فرانشیز قطعی و درصدی — تفاوت در عمل"
          hint="هرکدام برای الگوی خسارت متفاوتی طراحی شده‌اند."
        />
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-2xl border bg-card p-5">
            <h3 className="text-sm font-extrabold">فرانشیز قطعی</h3>
            <p className="mt-2 text-sm leading-7 text-muted-foreground">
              مبلغی ثابت که از هر خسارت کسر می‌شود؛ چه خسارت کوچک باشد چه بزرگ،
              همان سهم اول کسر می‌شود. مناسب فعالیت‌هایی با خسارت‌های مکرر اما
              قابل‌پیش‌بینی.
            </p>
          </div>
          <div className="rounded-2xl border bg-card p-5">
            <h3 className="text-sm font-extrabold">فرانشیز درصدی</h3>
            <p className="mt-2 text-sm leading-7 text-muted-foreground">
              درصدی از مبلغ خسارت نهایی است؛ در خسارت‌های بزرگ سهم شما نیز بزرگ‌تر
              می‌شود. مناسب رشته‌هایی با دامنه خسارت متغیر مثل مسئولیت کارفرما در
              پروژه‌های بزرگ.
            </p>
          </div>
        </div>
      </section>

      {/* مثال آموزشی */}
      <section aria-labelledby="ex-h" className="mt-12">
        <SectionHeading
          icon={Scale}
          title="مثال آموزشی — سهم هر طرف در یک خسارت"
          hint="اعداد فرضی و فقط برای درک مکانیسم؛ نرخ و فرانشیز واقعی در بیمه‌نامه شما درج می‌شود."
        />
        <div className="max-w-3xl overflow-x-auto rounded-2xl border nice-scroll">
          <Table>
            <TableHeader>
              <TableRow className="bg-accent/60">
                <TableHead className="text-start whitespace-nowrap">مبلغ خسارت (فرضی)</TableHead>
                <TableHead className="text-start whitespace-nowrap">فرانشیز قطعی (فرضی)</TableHead>
                <TableHead className="text-start whitespace-nowrap">سهم بیمه‌شده</TableHead>
                <TableHead className="text-start whitespace-nowrap">پرداخت بیمه‌گر</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {[
                { loss: "۵۰ میلیون", ded: "۵ میلیون", own: "۵ میلیون (کامل)", pay: "۴۵ میلیون" },
                { loss: "۱۰۰ میلیون", ded: "۵ میلیون", own: "۵ میلیون", pay: "۹۵ میلیون" },
                { loss: "۱ میلیارد", ded: "۵ میلیون", own: "۵ میلیون", pay: "۹۹۵ میلیون" },
              ].map((r) => (
                <TableRow key={r.loss}>
                  <TableCell className="whitespace-nowrap font-bold">{r.loss} تومان</TableCell>
                  <TableCell className="whitespace-nowrap">{r.ded} تومان</TableCell>
                  <TableCell className="whitespace-nowrap">{r.own}</TableCell>
                  <TableCell className="whitespace-nowrap">{r.pay} تومان</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <p className="mt-3 max-w-3xl text-xs leading-6 text-muted-foreground">
          * این جدول صرفاً جمع و تفریق آموزشی مکانیسم فرانشیز است و هیچ ادعایی درباره
          سقف‌ها، نرخ‌ها یا فرانشیز واقعی بیمه‌نامه‌ها ندارد؛ ارقام واقعی در بیمه‌نامه و
          پیش‌فاکتور رسمی درج می‌شود.
        </p>
      </section>

      {/* توازن با سقف */}
      <section aria-labelledby="bal-h" className="mt-12 max-w-3xl">
        <SectionHeading
          icon={Wallet}
          title="توازن فرانشیز با سقف تعهد"
          hint="فرانشیز بالاتر هرگز نباید بهانه سقف پایین‌تر شود."
        />
        <p className="text-[15px] leading-8 text-foreground/90">
          فرانشیز و سقف دو سر یک طیف‌اند: فرانشیز «شروع پرداخت» را و سقف «پایان پرداخت»
          را تعیین می‌کند. اگر برای کاهش نرخ فرانشیز را بالا می‌برید، آن صرفه‌جویی را
          به کاهش سقف تبدیل نکنید؛ کسری سقف در حادثه جدی بسیار پرهزینه‌تر از
          فرانشیز بالاتر است. راهنمای کامل انتخاب سقف را در صفحه دوقلوی این
          راهنما بخوانید.
        </p>
        <div className="mt-4 flex flex-wrap gap-3">
          <Link
            href="/coverage-limit"
            className="inline-flex items-center gap-2 rounded-full border bg-card px-5 py-2.5 text-sm font-semibold transition-colors hover:border-primary/40 hover:text-primary"
          >
            <Coins className="size-4" aria-hidden="true" />
            راهنمای انتخاب سقف تعهد
            <ArrowLeft className="size-4" aria-hidden="true" />
          </Link>
          <Link
            href="/dih"
            className="inline-flex items-center gap-2 rounded-full border bg-card px-5 py-2.5 text-sm font-semibold transition-colors hover:border-primary/40 hover:text-primary"
          >
            <Scale className="size-4" aria-hidden="true" />
            جدول دیه ۱۴۰۴
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
              سه اشتباه رایج در انتخاب فرانشیز
            </h2>
          </div>
          <ul className="mt-4 space-y-3">
            {[
              "انتخاب فرانشیز بالاتر از توان پرداخت فوری — در نخستین خسارت، جریان نقدی کسب‌وکار مختل می‌شود.",
              "قضاوت صرفاً بر مبنای نرخ — بدون بررسی الگوی خسارت‌های کوچک و مکرر فعالیت خود.",
              "خواندن نکردن نحوه اعمال فرانشیز (قطعی/درصدی) در شرایط بیمه‌نامه پیش از امضا.",
            ].map((t) => (
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
        <SectionHeading icon={Gauge} title="پنج گام انتخاب فرانشیز" />
        <NumberedSteps steps={DEDUCTIBLE_STEPS} variant="buy" />
      </section>

      {/* FAQ */}
      <section className="mx-auto mt-12 max-w-4xl">
        <FaqSection faqs={DEDUCTIBLE_FAQS} title="سوالات متداول فرانشیز بیمه مسئولیت" />
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
          title="دو سناریوی فرانشیز را مقایسه کنید"
          text="فرانشیز موردنظر را در فرم استعلام ثبت کنید؛ پیش‌فاکتور رسمی با تفکیک فرانشیز و سقف و نرخ مصوب بیمه ایران ارسال می‌شود — رایگان و بدون تعهد."
        />
      </div>
    </div>
  );
}
