import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowLeft,
  Briefcase,
  Building2,
  Flame,
  Scale,
  ScrollText,
  ShieldAlert,
  ShieldCheck,
  TrendingUp,
  Users,
} from "lucide-react";
import { AnswerBlock } from "@/components/answer-block";
import { AuthorBox } from "@/components/author-box";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { CtaBanner } from "@/components/cta-banner";
import { FaqSection } from "@/components/faq-section";
import { LegalDisclaimer } from "@/components/legal-disclaimer";
import { SectionHeading } from "@/components/section-heading";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { faqJsonLd, JsonLd } from "@/lib/seo";

export const revalidate = 3600;

// ─── /liability-vs-other-insurance — راهنمای عمومی ششم: تفاوت بیمه مسئولیت با سایر بیمه‌های خسارتی ──────────
// دوقلوی ساختاری /renewal — مقایسه مفهومی است، نه فرایند؛ بنابراین HowTo ندارد و فقط faqJsonLd صادر می‌شود.
// YMYL و تک‌محصولی: نام بردن سایر شاخه‌های خسارتی فقط برای مقایسه مفهومی است و هرگز CTA خرید آن‌ها نیست؛
// منابع فقط واقعی (ماده ۱ و ۲ قانون مسئولیت مدنی ۱۳۳۹، اصل جبران خسارت، ماده ۳۰ قانون بیمه)؛ بدون رقم اختراعی؛
// پرداخت همیشه مشروط به «طبق شرایط بیمه‌نامه و سقف تعهد».

export const metadata: Metadata = {
  title: "تفاوت بیمه مسئولیت با بیمه‌های خسارتی",
  description:
    "در بیمه مسئولیت، زیان‌دیده «شخص ثالث» است و مبنای پرداخت، مسئولیت قانونی بیمه‌گزار است؛ در بیمه‌های خسارتی دیگر، خسارت به اموال خود بیمه‌گزار پرداخت می‌شود.",
  alternates: {
    canonical: "/liability-vs-other-insurance",
    languages: {
      "fa-IR": "/liability-vs-other-insurance",
      en: "/en/liability-vs-other-insurance",
      "x-default": "/liability-vs-other-insurance",
    },
  },
  openGraph: {
    title: "تفاوت بیمه مسئولیت با بیمه‌های خسارتی",
    description:
      "در بیمه مسئولیت، زیان‌دیده «شخص ثالث» است و مبنای پرداخت، مسئولیت قانونی بیمه‌گزار است؛ در بیمه‌های خسارتی دیگر، خسارت به اموال خود بیمه‌گزار پرداخت می‌شود.",
    url: "/liability-vs-other-insurance",
    type: "article",
    images: [
      {
        url: "/og/liability-vs-other-insurance.png",
        width: 1200,
        height: 630,
        alt: "تفاوت بیمه مسئولیت با سایر بیمه‌های خسارتی",
      },
    ],
  },
};

const ANSWER_TEXT =
  "در بیمه مسئولیت، بیمه‌گر خسارتی را می‌پردازد که بیمه‌گزار طبق قانون موظف به پرداخت آن به زیان‌دیده ثالث است (مسئولیت مدنی ماده ۱). مبنای تعهد، حکم قانون یا قرارداد است، نه خسارت به اموال خود بیمه‌گزار. این تفکیک، زیان‌دیده را «ثالث» و مبنای پرداخت را «مسئولیت قانونی» می‌کند — برخلاف بیمه‌های خسارتی که خسارت اموال/بدن خود بیمه‌گزار را جبران می‌کنند.";

const PILLARS = [
  {
    icon: ShieldCheck,
    title: "بیمه‌گر",
    text: "شرکت بیمه که طبق بیمه‌نامه، تعهد مالی بیمه‌گزار در برابر زیان‌دیده را در حدود سقف تعهد و طبق شرایط بیمه‌نامه بر عهده می‌گیرد.",
  },
  {
    icon: Briefcase,
    title: "بیمه‌گزار (مسئول)",
    text: "شخص حقیقی یا حقوقی که طبق قانون یا قرارداد در برابر زیان‌دیده مسئول است؛ همین مسئولیت قانونی او، مبنای تعهد بیمه‌گر است.",
  },
  {
    icon: Users,
    title: "زیان‌دیده (شخص ثالث)",
    text: "کسی که از فعالیت بیمه‌گزار آسیب دیده و طرف قرارداد بیمه نیست؛ حق مطالبه او از حکم قانون مانند قانون مسئولیت مدنی ناشی می‌شود.",
  },
];

const COMPARE_ROWS = [
  {
    criterion: "موضوع پرداخت",
    liability: "زیان واردشده به شخص ثالث (زیان‌دیده)",
    other: "خسارت به اموال یا بدن خود بیمه‌گزار",
  },
  {
    criterion: "مبنای تعهد بیمه‌گر",
    liability: "مسئولیت قانونی بیمه‌گزار در برابر زیان‌دیده (ماده ۱ قانون مسئولیت مدنی)",
    other: "وقوع خسارت مشمول طبق بیمه‌نامه",
  },
  {
    criterion: "زیان‌دیده مستقیم",
    liability: "شخص ثالث؛ خارج از قرارداد بیمه",
    other: "خود بیمه‌گزار",
  },
  {
    criterion: "تعیین مبلغ پرداختی",
    liability: "ماهیت زیان و مستندات، تا سقف تعهد و طبق شرایط بیمه‌نامه",
    other: "مبلغ بیمه‌شده یا ارزش روز مال بیمه‌شده",
  },
  {
    criterion: "مثال",
    liability: "آسیب به عابر در محوطه کارگاه",
    other: "خسارت به ماشین‌آلات خودتان",
  },
  {
    criterion: "نقش تقصیر",
    liability: "تقصیر یا مسئولیت مقرر قانونی، مبنای تعهد است",
    other: "جبران خسارت مال خود، بی‌ربط به تقصیر ثالث است",
  },
];

const VS_MISTAKES = [
  "فرض اینکه خسارت اموال خودتان هم از بیمه مسئولیت پرداخت می‌شود — خسارت مال خود، موضوع سایر شاخه‌های خسارتی است و از بیمه مسئولیت پرداخت نمی‌شود.",
  "فرض اینکه زیان‌دیده می‌تواند مستقیم به هر مبلغی برسد — پرداخت بر اساس ماهیت زیان و مستندات، در حدود سقف تعهد و طبق شرایط بیمه‌نامه بررسی می‌شود.",
  "خلط «مهلت مطالبه ثالث» با شرایط بیمه‌نامه — مهلت مطالبه طبق ماده ۳۰ قانون بیمه موضوعی مستقل است و دامنه پوشش را گسترش نمی‌دهد.",
];

const VS_FAQS = [
  {
    question: "بیمه مسئولیت چه تفاوتی با بیمه خسارتی دارد؟",
    answer:
      "هر دو جزو بیمه‌های خسارتی‌اند؛ موضوع پرداخت متفاوت است. در بیمه مسئولیت، بیمه‌گر زیانی را می‌پردازد که بیمه‌گزار طبق قانون مسئول جبران آن به زیان‌دیده ثالث است. در سایر شاخه‌های خسارتی، خسارت واردشده به اموال یا بدن خود بیمه‌گزار جبران می‌شود و زیان‌دیده، خودِ بیمه‌گزار است. دامنه پرداخت در هر دو، طبق شرایط بیمه‌نامه و سقف تعهد است.",
  },
  {
    question: "زیان‌دیده چه کسی است؟ آیا کارگر من ثالث است؟",
    answer:
      "زیان‌دیده، شخصی خارج از قرارداد بیمه است که از فعالیت شما ضرر می‌بیند؛ مانند مجاور، مشتری یا عابر. کارگر شما نیز نسبت به شما ثالث است و اگر در اثر فعالیت شما آسیب ببیند، مسئولیت شما در برابر او می‌تواند موضوع بیمه مسئولیت باشد؛ بررسی پرداخت نیز طبق شرایط بیمه‌نامه، ماهیت زیان و سقف تعهد انجام می‌شود.",
  },
  {
    question: "اگر هم خسارت به مال خودم بخورد هم به مجاور، کدام بیمه کدام را می‌دهد؟",
    answer:
      "دو زیان، دو مسیر جدا هستند. خسارت واردشده به اموال و ماشین‌آلات خود شما موضوع شاخه‌های خسارتی مال خود است و از بیمه مسئولیت پرداخت نمی‌شود. اما آسیبی که به مجاور یا کارگر شما رسیده باشد، مبنای مسئولیت قانونی شماست و طبق شرایط بیمه‌نامه مسئولیت و در حدود سقف تعهد بررسی می‌شود؛ همین تفکیک، اساس این راهنماست.",
  },
  {
    question: "آیا بیمه مسئولیت بدون تقصیر هم پرداخت می‌کند؟",
    answer:
      "مسئولیت ناشی از تقصیر، پایه این شاخه است (ماده ۱ قانون مسئولیت مدنی)؛ اما قانون موارد مسئولیت بدون تقصیر را نیز مقرر کرده است، مانند مسئولیت مالک نسبت به خسارات وارده از اموال و حیوانات خود (مواد ۱۱ و ۱۲). در این موارد نیز پرداخت منوط به موضوع پوشش طبق شرایط بیمه‌نامه و سقف تعهد است.",
  },
  {
    question: "مبلغ پرداختی چگونه تعیین می‌شود؟",
    answer:
      "مبلغ پرداختی با «ماهیت زیان» تعیین می‌شود؛ یعنی زیان واقعی زیان‌دیده بر اساس مستندات بررسی و تا سقف تعهد درج‌شده در بیمه‌نامه پرداخت می‌گردد. در سایر شاخه‌های خسارتی، مبنای تعیین مبلغ، مبلغ بیمه‌شده یا ارزش روز مال بیمه‌شده است. هر ادعایی درباره مبلغ قطعی، بدون بررسی پرونده و شرایط بیمه‌نامه معنا ندارد.",
  },
  {
    question: "آیا می‌توانم هم بیمه مسئولیت داشته باشم هم بیمه‌های دیگر؟",
    answer:
      "بله؛ شاخه‌های بیمه از نظر مفهومی مکمل یکدیگرند و هر یک ریسک متفاوتی را پوشش می‌دهند. اما برای شفافیت: خدمات این نمایندگی فقط بیمه مسئولیت است و صدور سایر شاخه‌ها انجام نمی‌شود. ریسک اموال خودتان را باید از مسیر همان شاخه پیگیری کنید؛ بیمه مسئولیت شما تنها زیان ثالث را طبق شرایط بیمه‌نامه و سقف تعهد جبران می‌کند.",
  },
];

const REVIEW_DATE_ISO = "2026-10-26";

export default function LiabilityVsOtherInsurancePage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      <JsonLd data={faqJsonLd(VS_FAQS)} />

      <Breadcrumbs items={[{ name: "تفاوت مسئولیت با سایر بیمه‌های خسارتی", href: "/liability-vs-other-insurance" }]} />

      <header className="mt-6">
        <h1 className="text-2xl font-extrabold leading-[1.6] sm:text-3xl">
          تفاوت بیمه مسئولیت با سایر بیمه‌های خسارتی — راهنمای کامل
        </h1>
      </header>

      <div className="mt-6 max-w-3xl">
        <AnswerBlock title="پاسخ کوتاه" text={ANSWER_TEXT} />
      </div>

      {/* سه ضلع بیمه مسئولیت */}
      <section aria-labelledby="parties-h" className="mt-10">
        <SectionHeading
          icon={Users}
          title="سه ضلع بیمه مسئولیت"
          hint="تفاوت این شاخه از نقش «زیان‌دیده ثالث» آغاز می‌شود."
        />
        <p className="max-w-3xl text-[15px] leading-8 text-foreground/90">
          در هر بیمه‌نامه مسئولیت سه طرف نقش دارند و رابطه میان آن‌ها، همین شاخه را از سایر
          بیمه‌های خسارتی جدا می‌کند: آنچه پرداخت می‌شود، تعهدی است که بیمه‌گزار در برابر
          شخص ثالث دارد و بیمه‌گر آن را طبق بیمه‌نامه بر عهده می‌گیرد.
        </p>
        <div className="mt-4 grid gap-4 sm:grid-cols-3">
          {PILLARS.map((p) => (
            <div key={p.title} className="rounded-2xl border bg-card p-5">
              <div className="flex items-center gap-2">
                <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-accent text-accent-foreground">
                  <p.icon className="size-5" aria-hidden="true" />
                </span>
                <h3 className="text-sm font-extrabold">{p.title}</h3>
              </div>
              <p className="mt-3 text-sm leading-7 text-muted-foreground">{p.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* جدول مقایسه */}
      <section aria-labelledby="cmp-h" className="mt-12">
        <SectionHeading
          icon={Scale}
          title="جدول مقایسه: بیمه مسئولیت در برابر سایر بیمه‌های خسارتی"
          hint="سایر شاخه‌های خسارتی اینجا فقط برای مقایسه مفهومی نام برده شده‌اند."
        />
        <p className="mb-4 max-w-3xl text-[15px] leading-8 text-foreground/90">
          جدول زیر مهم‌ترین تفاوت‌های این دو خانواده بیمه‌ای را در شش معیار خلاصه می‌کند.
          یادآوری مهم: دامنه دقیق پرداخت در هر شاخه‌ای، طبق شرایط همان بیمه‌نامه مشخص می‌شود
          و این جدول جایگزین شرایط عمومی و اختصاصی بیمه‌نامه نیست.
        </p>
        <div className="overflow-hidden rounded-2xl border">
          <Table>
            <TableHeader>
              <TableRow className="bg-accent/60">
                <TableHead className="text-start w-1/5">معیار</TableHead>
                <TableHead className="text-start w-2/5">بیمه مسئولیت</TableHead>
                <TableHead className="text-start">سایر بیمه‌های خسارتی</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {COMPARE_ROWS.map((r) => (
                <TableRow key={r.criterion}>
                  <TableCell className="align-top font-bold">{r.criterion}</TableCell>
                  <TableCell className="align-top text-sm font-medium leading-7">{r.liability}</TableCell>
                  <TableCell className="align-top text-sm leading-7 text-muted-foreground">{r.other}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <p className="mt-3 max-w-3xl text-xs leading-6 text-muted-foreground">
          * هرگز بیمه مسئولیت را به‌معنای پرداخت همه خسارت‌های ثالث تا هر مبلغی ندانید؛
          پرداخت همیشه طبق شرایط بیمه‌نامه، بر مبنای ماهیت زیان و در حدود سقف تعهد است.
        </p>
      </section>

      {/* یک رخداد، دو تفکیک */}
      <section aria-labelledby="event-h" className="mt-12 max-w-3xl">
        <SectionHeading
          icon={Flame}
          title="یک رخداد، دو تفکیک"
          hint="آتش‌سوزی در یک کارگاه؛ یک رخداد واحد، دو زیان متفاوت می‌سازد."
        />
        <p className="text-[15px] leading-8 text-foreground/90">
          آتش‌سوزی در یک کارگاه را در نظر بگیرید. این رخداد واحد می‌تواند هم به اموال خودِ
          کارگاه خسارت بزند و هم به افراد بیرون از آن. دو زیان، دو مسیر جداگانه دارند و
          اشتباه‌گرفتن این دو مسیر، رایج‌ترین سوءتفهم درباره بیمه مسئولیت است.
        </p>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <div className="rounded-2xl border bg-card p-5">
            <div className="flex items-center gap-2">
              <Building2 className="size-5 text-muted-foreground" aria-hidden="true" />
              <h3 className="text-sm font-extrabold">زیان اول: ساختمان و ماشین‌آلات خود کارگاه</h3>
            </div>
            <p className="mt-2 text-sm leading-7 text-muted-foreground">
              خسارت به اموال خودِ بیمه‌گزار، موضوع شاخه‌های خسارتی مال خود است و از بیمه
              مسئولیت پرداخت نمی‌شود؛ در این زیان، زیان‌دیده خودِ بیمه‌گزار است.
            </p>
          </div>
          <div className="rounded-2xl border bg-card p-5">
            <div className="flex items-center gap-2">
              <Users className="size-5 text-primary" aria-hidden="true" />
              <h3 className="text-sm font-extrabold">زیان دوم: آسیب به مجاور یا کارگر</h3>
            </div>
            <p className="mt-2 text-sm leading-7 text-muted-foreground">
              اگر حریق به مجاور یا کارگرِ حاضر در کارگاه آسیب بزند، مسئولیت قانونی بیمه‌گزار
              در برابر زیان‌دیده شکل می‌گیرد؛ اینجاست که بیمه مسئولیت وارد می‌شود — پرداخت
              طبق شرایط بیمه‌نامه و تا سقف تعهد.
            </p>
          </div>
        </div>
        <p className="mt-3 text-xs leading-6 text-muted-foreground">
          * نام بردن شاخه‌های دیگر مانند آتش‌سوزی صرفاً برای مقایسه مفهومی است و پیشنهاد
          خرید نیست؛ خدمات این نمایندگی فقط بیمه مسئولیت است.
        </p>
      </section>

      {/* اهمیت تفکیک برای سقف تعهد */}
      <section aria-labelledby="limit-h" className="mt-12 max-w-3xl">
        <SectionHeading
          icon={TrendingUp}
          title="چرا این تفکیک برای انتخاب سقف تعهد مهم است؟"
          hint="مبنای سقف، بدترین زیان ثالث است؛ نه ارزش اموال خودتان."
        />
        <p className="text-[15px] leading-8 text-foreground/90">
          اگر برای انتخاب سقف به ارزش ساختمان یا ماشین‌آلات خودتان نگاه کنید، مبنای اشتباهی
          داشته‌اید. آنچه در بیمه مسئولیت باید پوشش داده شود «بدترین زیان ثالث» است؛ یعنی
          سنگین‌ترین خسارتی که فعالیت شما می‌تواند به دیگران وارد کند و طبق قانون مسئول
          جبران آن باشید. پرداخت نیز همیشه در حدود سقف تعهد و طبق شرایط بیمه‌نامه است؛
          بنابراین سقف را با دیه سال وقوع و شدت ریسک ثالث بسنجید، نه با ارزش دارایی‌های
          خودتان.
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
            <ScrollText className="size-4" aria-hidden="true" />
            جدول دیه سالانه
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
              سه اشتباه رایج در فهم بیمه مسئولیت
            </h2>
          </div>
          <ul className="mt-4 space-y-3">
            {VS_MISTAKES.map((t) => (
              <li key={t} className="flex items-start gap-2 text-sm leading-7 text-muted-foreground">
                <span className="mt-2.5 size-1.5 shrink-0 rounded-full bg-primary" aria-hidden="true" />
                {t}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* پل داخلی */}
      <section aria-label="پیوندهای مرتبط بیمه مسئولیت" className="mt-12 max-w-3xl">
        <div className="flex flex-wrap gap-3">
          <Link
            href="/liability"
            className="inline-flex items-center gap-2 rounded-full border bg-card px-5 py-2.5 text-sm font-semibold transition-colors hover:border-primary/40 hover:text-primary"
          >
            <ShieldCheck className="size-4" aria-hidden="true" />
            همه انواع بیمه مسئولیت
            <ArrowLeft className="size-4" aria-hidden="true" />
          </Link>
          <Link
            href="/claims"
            className="inline-flex items-center gap-2 rounded-full border bg-card px-5 py-2.5 text-sm font-semibold transition-colors hover:border-primary/40 hover:text-primary"
          >
            <ScrollText className="size-4" aria-hidden="true" />
            راهنمای اعلام خسارت
            <ArrowLeft className="size-4" aria-hidden="true" />
          </Link>
        </div>
      </section>

      {/* FAQ */}
      <section className="mx-auto mt-12 max-w-4xl">
        <FaqSection faqs={VS_FAQS} title="سوالات متداول تفاوت بیمه مسئولیت با بیمه‌های خسارتی" />
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
          title="سقف تعهد بیمه مسئولیت خود را استعلام کنید"
          text="اگر فعالیت شما می‌تواند به دیگران خسارت بزند، بیمه مسئولیت موضوع شماست. اطلاعات ریسک را در فرم استعلام ثبت کنید؛ کارشناس ما سقف و پوشش مناسب را با پیش‌فاکتور رسمی بیمه ایران تنظیم می‌کند."
        />
      </div>
    </div>
  );
}
