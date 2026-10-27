import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowLeft,
  Building2,
  ClipboardCheck,
  FileText,
  ListChecks,
  ListOrdered,
  Package,
  Scale,
  ShieldAlert,
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

// ─── /startup-guide — راهنمای خرید بیمه مسئولیت برای شرکت‌های تازه‌تأسیس ──
// هفتمین صفحه لایه راهنماهای عمومی (دوقلوی ساختاری /renewal و /liability-mandatory).
// YMYL: هیچ رقم نرخ/مبلغ اختراعی؛ سقف فقط با مبنای «دیه سال وقوع مطابق ابلاغیه رسمی»؛
// مبناهای قانونی فقط واقعی (ماده ۹۱ قانون کار، قانون مسئولیت مدنی ۱۳۳۹).
// تک‌محصولی: بدون پیشنهاد بیمه غیرمسئولیت؛ هزینه تابع شرح فعالیت/تعداد نیرو/سقف.

export const metadata: Metadata = {
  title: "بیمه مسئولیت شرکت تازه‌تأسیس | راهنمای خرید",
  description:
    "شرکت تازه‌تأسیس از روز نخست مسئولیت کارکنان، مراجعان و مشتریان محصول یا خدمت را دارد؛ راهنمای اولویت‌بندی پوشش‌ها با بودجه محدود و انتخاب سقف بر پایه دیه.",
  alternates: {
    canonical: "/startup-guide",
    languages: {
      "fa-IR": "/startup-guide",
      en: "/en/startup-guide",
      "x-default": "/startup-guide",
    },
  },
  openGraph: {
    title: "بیمه مسئولیت شرکت تازه‌تأسیس | راهنمای خرید",
    description:
      "راهنمای خرید اولین بیمه‌نامه مسئولیت برای شرکت تازه‌تأسیس: سه ریسک روز نخست، اولویت‌بندی پوشش‌ها با بودجه محدود و انتخاب سقف بر پایه دیه سال وقوع.",
    url: "/startup-guide",
    type: "article",
    images: [
      {
        url: "/og/startup-guide.png",
        width: 1200,
        height: 630,
        alt: "راهنمای بیمه مسئولیت شرکت‌های تازه‌تأسیس",
      },
    ],
  },
};

const ANSWER_TEXT =
  "شرکت تازه‌تأسیس از روز نخست فعالیت با سه ریسک مسئولیت روبه‌روست: کارکنان در حوادث ناشی از کار، اشخاص حاضر در دفتر یا کارگاه و مشتریان محصول یا خدمت. به‌جای خرید همه پوشش‌ها در یک لحظه، اولویت‌بندی کنید؛ سقف هر پوشش را بر پایه دیه سال وقوع و شدت ریسک تعیین کنید و شرح فعالیت، مبنای استعلام باشد.";

const STARTUP_STEPS = [
  {
    title: "شرح دقیق فعالیت و تعداد نیرو",
    description:
      "نوع فعالیت، تعداد کارکنان و ماهیت محصول یا خدمت را شفاف بنویسید؛ همین اطلاعات مبنای صدور بیمه‌نامه و اعتبار پوشش در زمان خسارت است.",
  },
  {
    title: "استعلام با نرخ مصوب بیمه ایران",
    description:
      "پیش‌فاکتور رسمی با نرخ مصوب بیمه ایران بگیرید؛ استعلام رایگان است، تعهدی برای خرید ایجاد نمی‌کند و مبنای مقایسه سقف و پوشش‌هاست.",
  },
  {
    title: "تعیین سقف مبتنی بر دیه سال وقوع",
    description:
      "سقف را دست‌کم معادل دیه کامل سال وقوع خسارت، مطابق ابلاغیه رسمی، نگه دارید و برای ریسک‌های جدی، چند برابر آن انتخاب کنید.",
  },
  {
    title: "بازبینی استثناها پیش از امضا",
    description:
      "استثناها، فرانشیز و شرایط عمومی بیمه‌نامه را پیش از امضا بخوانید؛ هر ابهام را پیش از صدور از کارشناس بپرسید، نه پس از حادثه.",
  },
  {
    title: "تقویم تمدید و یادآور الحاقیه‌های رشد",
    description:
      "تاریخ انقضا را تقویم کنید و هر رشد نیرو یا توسعه فعالیت را با الحاقیه رسمی اعلام کنید تا بیمه‌نامه همیشه با واقعیت شرکت منطبق بماند.",
  },
];

const STARTUP_FAQS = [
  {
    question: "آیا شرکت بدون نیروی حقوقی هم بیمه کارفرما نیاز دارد؟",
    answer:
      "بیمه کارفرما مختص شرکت‌های بزرگ نیست؛ ملاک، داشتن نیروی حقوقی است. هر نیروی استخدامی، مسئولیت کارفرما را طبق ماده ۹۱ قانون کار برقرار می‌کند و این مسئولیت مستقل از بیمه‌نامه است. اگر فعلاً نیروی حقوقی ندارید، این پوشش اولویت اول شما نیست؛ اما با نخستین استخدام باید آن را بخرید و نبود بیمه، مسئولیت را حذف نمی‌کند.",
  },
  {
    question: "کدام پوشش برای شرکت خدمات‌محور اولویت دارد؟",
    answer:
      "برای شرکت خدمات‌محور، معمولاً مسئولیت عمومی و مسئولیت حرفه‌ای در صدر هستند: مسئولیت عمومی، خسارت به مراجعان و اشخاص حاضر در محل فعالیت را پاسخ می‌دهد و مسئولیت حرفه‌ای، زیان ناشی از خطای خدمت تخصصی را. اگر نیروی حقوقی هم دارید، مسئولیت کارفرما به فهرست اضافه می‌شود؛ ترتیب نهایی به شرح فعالیت و نوع قراردادهای شما بستگی دارد.",
  },
  {
    question: "آیا بیمه‌نامه مسئولیت در مناقصه‌ها و قراردادها اعتبار دارد؟",
    answer:
      "بله؛ بیمه‌نامه مسئولیت رسمی، سند قابل ارائه در مناقصه‌ها و قراردادهاست و داشتن آن از شروط متداول کارفرمایان و دستگاه‌های اجرایی است. اما دامنه و سقف بیمه‌نامه باید با شرایط همان قرارداد تطبیق داده شود؛ گاهی کارفرما سقف یا پوشش مشخصی را الزام می‌کند که به الحاقیه نیاز دارد. متن شرط بیمه قرارداد را پیش از استعلام بررسی کنید.",
  },
  {
    question: "سقف تعهد سال اول چقدر باشد؟",
    answer:
      "مبنای منطقی، دیه کامل سال وقوع خسارت است که هر سال با ابلاغیه رسمی تغییر می‌کند؛ نه عددی ثابت برای همه. سقف را دست‌کم معادل دیه همان سال انتخاب کنید و برای فعالیت‌های پرریسک یا قراردادهای با شرط سقف مشخص، چند برابر آن را در نظر بگیرید. تفصیل این موضوع در صفحه راهنمای سقف تعهد آمده است.",
  },
  {
    question: "هزینه بیمه‌نامه چگونه محاسبه می‌شود؟",
    answer:
      "حق بیمه مسئولیت، تابع شرح فعالیت، تعداد نیرو، میزان سقف تعهد و شرایط محیط کار است؛ بنابراین عددی برای همه شرکت‌های تازه‌تأسیس وجود ندارد. هرچه دامنه ریسک فعالیت و سقف انتخابی بزرگ‌تر باشد، حق بیمه نیز تغییر می‌کند. مبلغ نهایی فقط در پیش‌فاکتور رسمی با نرخ مصوب بیمه ایران مشخص می‌شود؛ استعلام رایگان است و تعهد خرید ایجاد نمی‌کند.",
  },
  {
    question: "آیا با رشد شرکت باید الحاقیه بگیریم؟",
    answer:
      "بله؛ افزایش نیرو، توسعه خط تولید، تغییر نشانی یا ورود به قراردادهای جدید، وضعیت ریسک را تغییر می‌دهد و بیمه‌نامه باید با آن منطبق بماند. این تغییرات با الحاقیه رسمی روی بیمه‌نامه جاری اعمال می‌شود؛ عدم اعلام می‌تواند در زمان خسارت محل بحث شود. پایان دوره نیز با تمدید به‌موقع و تطبیق سقف با دیه سال جدید ادامه می‌یابد.",
  },
];

const STARTUP_MISTAKES = [
  "خرید بیمه‌نامه فقط برای قبولی در قرارداد با سقف حداقلی — شرط قراردادی، تعهد به داشتن بیمه است؛ اگر سقف با ریسک واقعی فعالیت نخواند، کسری در زمان خسارت بر عهده خود شرکت می‌ماند.",
  "فراموشی اعلام رشد نیرو یا توسعه فعالیت به بیمه‌گر — بیمه‌نامه‌ای که با وضعیت واقعی شرکت منطبق نباشد، در زمان خسارت محل بحث می‌شود؛ رشد باید با الحاقیه رسمی اعلام شود.",
  "تصور اینکه مسئولیت حرفه‌ای در بیمه عمومی شامل می‌شود — پوشش‌های تخصصی حرفه، پوشش جداگانه‌ای هستند و با بیمه مسئولیت عمومی به‌تنهایی اعتبار نمی‌یابند.",
];

const RISKS = [
  {
    icon: Users,
    title: "کارکنان",
    text: "مسئولیت کارفرما در حوادث ناشی از کار، طبق ماده ۹۱ قانون کار برقرار است و مستقل از بیمه‌نامه عمل می‌کند؛ همین یک نیروی حقوقی نیز این مسئولیت را از روز نخست می‌سازد.",
  },
  {
    icon: Building2,
    title: "اشخاص حاضر در محل دفتر یا کارگاه",
    text: "مراجعان، مشتریان و همسایگان حاضر در محل فعالیت؛ خسارت بدنی یا مالی به این افراد، مسئولیت مدنی شرکت را در برابر اشخاص ثالث برمی‌انگیزد.",
  },
  {
    icon: Package,
    title: "مشتریان محصول یا خدمت",
    text: "عیب کالای تولیدی یا خطای خدمت تخصصی که به مشتری زیان بزند؛ موضوع مسئولیت تولیدکنندگان کالا یا مسئولیت حرفه‌ای است و جدا از پوشش عمومی بررسی می‌شود.",
  },
];

const PRIORITIES = [
  {
    order: "۱",
    cover: "مسئولیت کارفرما",
    when: "اگر نیروی حقوقی دارید؛ ماده ۹۱ قانون کار، مسئولیت کارفرما در حوادث ناشی از کار را مستقل از بیمه‌نامه برقرار می‌کند.",
  },
  {
    order: "۲",
    cover: "مسئولیت عمومی در برابر اشخاص ثالث",
    when: "اگر مشتری یا مراجعه‌کننده به دفتر یا کارگاه شما می‌آید؛ خسارت بدنی یا مالی به این افراد، مبنای مسئولیت مدنی شرکت است.",
  },
  {
    order: "۳",
    cover: "مسئولیت تخصصی حرفه",
    when: "اگر خدمت مشاوره‌ای یا تخصصی می‌فروشید و خطای حرفه‌ای می‌تواند به مشتری زیان بزند؛ این پوشش جداگانه صادر می‌شود.",
  },
  {
    order: "۴",
    cover: "مسئولیت تولیدکنندگان کالا",
    when: "اگر محصول تولید یا عرضه می‌کنید و عیب کالا می‌تواند به مشتری یا اشخاص ثالث خسارت بزند.",
  },
];

const REVIEW_DATE_ISO = "2026-10-27";

export default function StartupGuidePage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      <JsonLd
        data={howToJsonLd({
          name: "مسیر خرید اولین بیمه‌نامه مسئولیت برای شرکت تازه‌تأسیس",
          description:
            "روش گام‌به‌گام خرید اولین بیمه‌نامه مسئولیت شرکت: شرح فعالیت، استعلام با نرخ مصوب، تعیین سقف بر پایه دیه سال وقوع، بازبینی استثناها و تقویم تمدید.",
          steps: STARTUP_STEPS,
          url: "/startup-guide",
        })}
      />
      <JsonLd data={faqJsonLd(STARTUP_FAQS)} />

      <Breadcrumbs items={[{ name: "راهنمای بیمه مسئولیت شرکت‌های تازه‌تأسیس", href: "/startup-guide" }]} />

      <header className="mt-6">
        <h1 className="text-2xl font-extrabold leading-[1.6] sm:text-3xl">
          راهنمای بیمه مسئولیت شرکت‌های تازه‌تأسیس — خرید اولین بیمه‌نامه
        </h1>
      </header>

      <div className="mt-6 max-w-3xl">
        <AnswerBlock title="پاسخ کوتاه" text={ANSWER_TEXT} />
      </div>

      {/* ریسک‌های روز نخست */}
      <section aria-labelledby="risks-h" className="mt-10">
        <SectionHeading
          icon={Users}
          title="ریسک‌های مسئولیت از روز نخست"
          hint="مسئولیت با رشد شرکت شروع نمی‌شود؛ از اولین روز فعالیت برقرار است."
        />
        <p className="max-w-3xl text-[15px] leading-8 text-foreground/90">
          بسیاری از مؤسسان تصور می‌کنند بیمه مسئولیت موضوع مرحله رشد شرکت است؛ در حالی که
          همین فعالیت کوچک روز اول، سه ریسک مسئولیت هم‌زمان می‌سازد. شناسایی این سه ریسک،
          نقطه شروع تصمیم‌گیری برای اولین بیمه‌نامه است.
        </p>
        <div className="mt-4 grid gap-4 sm:grid-cols-3">
          {RISKS.map((r) => (
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
      </section>

      {/* اولویت‌بندی با بودجه محدود */}
      <section aria-labelledby="priority-h" className="mt-12">
        <SectionHeading
          icon={ListOrdered}
          title="اولویت‌بندی پوشش‌ها با بودجه محدود"
          hint="اولین بیمه‌نامه لازم نیست همه پوشش‌ها را هم‌زمان داشته باشد."
        />
        <p className="mb-4 max-w-3xl text-[15px] leading-8 text-foreground/90">
          چیدمان زیر، رایج‌ترین ترتیب اولویت برای سال نخست فعالیت است؛ اما هر شرکت ترکیب
          متفاوتی دارد و شرح دقیق فعالیت در استعلام، مبنای پیشنهاد کارشناس است — نه این
          جدول به‌تنهایی.
        </p>
        <div className="max-w-3xl overflow-x-auto rounded-2xl border nice-scroll">
          <Table>
            <TableHeader>
              <TableRow className="bg-accent/60">
                <TableHead className="text-start whitespace-nowrap">اولویت</TableHead>
                <TableHead className="text-start">پوشش</TableHead>
                <TableHead className="text-start">چه زمانی این اولویت است؟</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {PRIORITIES.map((p) => (
                <TableRow key={p.order}>
                  <TableCell className="whitespace-nowrap font-extrabold">{p.order}</TableCell>
                  <TableCell className="whitespace-nowrap font-bold">{p.cover}</TableCell>
                  <TableCell className="text-sm leading-7 text-muted-foreground">{p.when}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <p className="mt-3 max-w-3xl text-xs leading-6 text-muted-foreground">
          * ترتیب بالا الگوی پیشنهادی سال اول است؛ دامنه و شرایط دقیق هر پوشش در پیش‌فاکتور
          رسمی و شرایط عمومی بیمه‌نامه مشخص می‌شود.
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
            href="/documents"
            className="inline-flex items-center gap-2 rounded-full border bg-card px-5 py-2.5 text-sm font-semibold transition-colors hover:border-primary/40 hover:text-primary"
          >
            <FileText className="size-4" aria-hidden="true" />
            مدارک لازم بیمه مسئولیت
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
              سه اشتباه رایج شرکت‌های تازه‌تأسیس در خرید بیمه مسئولیت
            </h2>
          </div>
          <ul className="mt-4 space-y-3">
            {STARTUP_MISTAKES.map((t) => (
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
          title="مسیر خرید بیمه‌نامه اول در پنج گام"
        />
        <NumberedSteps steps={STARTUP_STEPS} variant="buy" />
      </section>

      {/* پل داخلی */}
      <section aria-label="پیوندهای مرتبط بیمه مسئولیت" className="mt-12 max-w-3xl">
        <div className="flex flex-wrap gap-3">
          <Link
            href="/liability/commercial/employers"
            className="inline-flex items-center gap-2 rounded-full border bg-card px-5 py-2.5 text-sm font-semibold transition-colors hover:border-primary/40 hover:text-primary"
          >
            <Users className="size-4" aria-hidden="true" />
            بیمه مسئولیت کارفرما
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
          <Link
            href="/policy-review-checklist"
            className="inline-flex items-center gap-2 rounded-full border bg-card px-5 py-2.5 text-sm font-semibold transition-colors hover:border-primary/40 hover:text-primary"
          >
            <ClipboardCheck className="size-4" aria-hidden="true" />
            چک‌لیست بازبینی بیمه‌نامه پیش از امضا
            <ArrowLeft className="size-4" aria-hidden="true" />
          </Link>
        </div>
      </section>

      {/* FAQ */}
      <section className="mx-auto mt-12 max-w-4xl">
        <FaqSection faqs={STARTUP_FAQS} title="سوالات متداول بیمه مسئولیت شرکت تازه‌تأسیس" />
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
          title="بیمه‌نامه اول شرکت خود را درست شروع کنید"
          text="اطلاعات شرکت تازه‌تأسیس خود را در فرم استعلام ثبت کنید؛ پیش‌فاکتور رسمی با نرخ مصوب بیمه ایران و سقف متناسب با ریسک فعالیت شما صادر می‌شود — رایگان و بدون تعهد."
          href="/quote"
        />
      </div>
    </div>
  );
}
