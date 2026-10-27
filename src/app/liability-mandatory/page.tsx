import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowLeft,
  Building2,
  Landmark,
  ListChecks,
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

// ─── /liability-mandatory — راهنمای عمومی اجباری/اختیاری بودن بیمه مسئولیت ──
// پنجمین صفحه لایه راهنماهای عمومی (دوقلوی /coverage-limit، /deductible، /renewal و /documents).
// YMYL: هیچ رقم نرخ/مبلغ اختراعی؛ دیه/سقف فقط با عبارت «مطابق ابلاغیه رسمی سال»؛
// مبناهای قانونی فقط واقعی (ماده ۱ و ۱۱ قانون مسئولیت مدنی ۱۳۳۹، ماده ۹۱ قانون کار،
// مبحث ۲ مقررات ملی ساختمان و آیین‌نامه اجرایی ماده ۳۳ قانون نظام مهندسی و کنترل
// ساختمان، مقررات نظام پزشکی و وزارت بهداشت).
// تک‌محصولی: بدون پیشنهاد بیمه غیرمسئولیت و بدون مقایسه با سایر بیمه‌ها.

export const metadata: Metadata = {
  title: "بیمه مسئولیت اجباری است یا اختیاری؟ راهنما",
  description:
    "الزام بیمه مسئولیت به فعالیت بستگی دارد؛ پزشکان و مهندس ناظر مشمول الزام‌اند. بیمه، پرداخت مسئولیت را تامین می‌کند نه حذف آن؛ راهنمای تفکیک اجباری و اختیاری.",
  alternates: {
    canonical: "/liability-mandatory",
    languages: {
      "fa-IR": "/liability-mandatory",
      en: "/en/liability-mandatory",
      "x-default": "/liability-mandatory",
    },
  },
  openGraph: {
    title: "بیمه مسئولیت اجباری است یا اختیاری؟ راهنما",
    description:
      "الزام بیمه مسئولیت به فعالیت بستگی دارد؛ بیمه، پرداخت مسئولیت قانونی را تامین می‌کند نه حذف آن — راهنمای تفکیک اجباری و اختیاری.",
    url: "/liability-mandatory",
    type: "article",
    images: [
      {
        url: "/og/liability-mandatory.png",
        width: 1200,
        height: 630,
        alt: "راهنمای اجباری یا اختیاری بودن بیمه مسئولیت",
      },
    ],
  },
};

const MANDATORY_STEPS = [
  {
    title: "بررسی مجوز و مرجع صدور",
    description:
      "مجوز فعالیت خود و مرجع صدور آن را شناسایی کنید؛ شرط بیمه معمولاً در متن مجوز یا آیین‌نامه اجرایی همان مرجع درج می‌شود.",
  },
  {
    title: "مرور مقررات حرفه‌ای صنف",
    description:
      "نظام‌های حرفه‌ای و سازمان‌های صنفی، الزامات بیمه اعضا را منتشر می‌کنند؛ مقررات حرفه‌ای صنف خود را از مرجع رسمی بخوانید، نه از شنیده‌ها.",
  },
  {
    title: "بررسی الزامات قراردادهای کاری",
    description:
      "اسناد مناقصه، قراردادهای پیمانکاری و توافق‌نامه‌های کاری را مرور کنید؛ الزام بیمه می‌تواند شرط قراردادی باشد، حتی وقتی حکم قانونی عام وجود ندارد.",
  },
  {
    title: "مشورت با کارشناس بیمه مسئولیت",
    description:
      "وضعیت دقیق فعالیت خود را با کارشناس بیمه مسئولیت در میان بگذارید؛ تشخیص درست «الزام یا اختیار» مقدمه انتخاب درست سقف و پوشش است.",
  },
  {
    title: "تعیین سقف منطقی فارغ از حداقل الزام",
    description:
      "حداقل الزام، کف ریسک است نه سقف نیاز؛ سقف را با دیه سال وقوع، مطابق ابلاغیه رسمی، و با شدت ریسک فعالیت خود تطبیق دهید.",
  },
];

const MANDATORY_FAQS = [
  {
    question: "آیا بیمه مسئولیت برای همه اجباری است؟",
    answer:
      "خیر؛ بیمه مسئولیت به‌صورت سراسری برای همه اشخاص الزامی نیست. الزام یا اختیار بودن آن به فعالیت شما بستگی دارد: برای پزشکان و مهندس ناظر، مقررات حرفه‌ای و شرط مجوز تعیین‌کننده است و برای کارفرما، تولیدکننده یا مالک ساختمان، بیمه اختیاری است، هرچند مسئولیت قانونی جبران خسارت در هر حال برقرار است. ملاک نهایی، مقررات مرجع فعالیت شماست.",
  },
  {
    question: "بیمه مسئولیت پزشکان اجباری است؟",
    answer:
      "برای پزشکان، بیمه مسئولیت حرفه‌ای جزء الزامات مطابق مقررات نظام پزشکی و وزارت بهداشت است و شرط اعتبار پروانه یا کار در مراکز درمانی محسوب می‌شود؛ جزئیات سقف و شرایط را همان مرجع تعیین می‌کند و بهتر است متن به‌روز مقررات را بررسی کنید. مسئولیت حرفه‌ای پزشک مستقل از بیمه برقرار است و بیمه، ابزار تامین پرداخت آن است.",
  },
  {
    question: "مهندس ناظر بدون بیمه مسئولیت می‌تواند پرونده نظارت بگیرد؟",
    answer:
      "خیر؛ بر اساس آیین‌نامه اجرایی ماده ۳۳ قانون نظام مهندسی و کنترل ساختمان، ارائه بیمه‌نامه مسئولیت مدنی از شرایط پذیرش پرونده نظارت است و در مبحث ۲ مقررات ملی ساختمان نیز به آن ارجاع شده است. بدون این بیمه‌نامه، ثبت پرونده در سامانه نظام مهندسی ممکن نیست و سقف پوشش باید مطابق ابلاغیه رسمی سال تعیین شود.",
  },
  {
    question: "اگر بیمه مسئولیت نداشته باشم چه ریسکی دارم؟",
    answer:
      "نداشتن بیمه، مسئولیت قانونی شما را حذف نمی‌کند؛ ماده ۱ و ۱۱ قانون مسئولیت مدنی ۱۳۳۹، جبران خسارت وارده به دیگری را بر عهده شخصی می‌داند که خسارت را وارد کرده است. محکومیت‌های مالی از طریق اجرای احکام از اموال شخصی و دارایی‌های شما وصول می‌شود؛ در حادثه جدی، این ریسک از توان مالی معمول فرد خارج است.",
  },
  {
    question: "الزام قرارداد کارفرما جای بیمه را می‌گیرد؟",
    answer:
      "خیر؛ الزام قراردادی، تعهد به داشتن بیمه‌نامه است نه پوشش واقعی ریسک. اگر سقف مورد پذیرش کارفرما کمتر از ریسک واقعی باشد، کسری در زمان خسارت بر عهده خودتان می‌ماند. ماده ۹۱ قانون کار نیز مسئولیت کارفرما را در حوادث ناشی از کار مستقل از هر شرط قراردادی برقرار می‌کند؛ بیمه، ابزار تامین مالی این تعهد است.",
  },
  {
    question: "حداقل سقف الزام قانونی برای کار من کافی است؟",
    answer:
      "حداقل سقف مقرر در مقررات یا قرارداد، کف ریسک است نه سقف نیاز واقعی شما. دیه هر سال مطابق ابلاغیه رسمی تغییر می‌کند و یک حادثه جدی می‌تواند چند مصدوم را هم‌زمان درگیر کند، حال آنکه سقف حداقلی برای چنین رخدادی طراحی نشده است. سقف را با شدت ریسک فعالیت و دیه سال وقوع تطبیق دهید.",
  },
];

const MANDATORY_MISTAKES = [
  "تصور «بیمه = رفع مسئولیت» — بیمه، پرداخت خسارت را تامین می‌کند، نه حذف تکلیف قانونی؛ رعایت مقررات ایمنی و استانداردهای حرفه همچنان بر عهده خود شماست.",
  "اتکای صرف به الزام قرارداد کارفرما برای پرسنل — شرط قراردادی، تعهد طرف قرارداد است؛ اگر دامنه یا سقف آن با ریسک واقعی نخواند، کسری در زمان خسارت بر عهده شما می‌ماند.",
  "خرید بیمه فقط به‌خاطر مجوز با سقف حداقلی و رهاکردن سقف در سال‌های بعد — دیه هر سال مطابق ابلاغیه رسمی تغییر می‌کند و سقف ثابت، در حادثه جدی کسری پوشش می‌سازد.",
];

const REVIEW_DATE_ISO = "2026-10-26";

export default function LiabilityMandatoryPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      <JsonLd
        data={howToJsonLd({
          name: "پنج گام تشخیص الزام بیمه مسئولیت در فعالیت شما",
          description:
            "روش گام‌به‌گام تشخیص اجباری یا اختیاری بودن بیمه مسئولیت: بررسی مجوز، مرور مقررات حرفه‌ای، الزامات قرارداد، مشورت کارشناسی و تعیین سقف منطقی.",
          steps: MANDATORY_STEPS,
          url: "/liability-mandatory",
        })}
      />
      <JsonLd data={faqJsonLd(MANDATORY_FAQS)} />

      <Breadcrumbs items={[{ name: "بیمه مسئولیت اجباری یا اختیاری؟", href: "/liability-mandatory" }]} />

      <header className="mt-6">
        <h1 className="text-2xl font-extrabold leading-[1.6] sm:text-3xl">
          بیمه مسئولیت اجباری است یا اختیاری؟ — راهنمای کامل
        </h1>
      </header>

      <div className="mt-6 max-w-3xl">
        <AnswerBlock
          title="پاسخ کوتاه"
          text="بیمه مسئولیت در ایران به‌صورت سراسری اجباری نیست؛ الزام آن به فعالیت بستگی دارد و برای گروهی مانند پزشکان و مهندس ناظر، شرط مجوز یا مقررات حرفه است. قانون، مسئولیت شما را در برابر اشخاص ثالث می‌سازد و بیمه، پرداخت آن را تامین مالی می‌کند؛ نداشتن بیمه، مسئولیت قانونی را حذف نمی‌کند."
        />
      </div>

      {/* معنای الزام قانونی */}
      <section aria-labelledby="meaning-h" className="mt-10 max-w-3xl">
        <SectionHeading
          icon={Landmark}
          title="الزام قانونی به چه معناست؟"
          hint="قانون، مسئولیت را می‌سازد؛ بیمه، پرداخت آن را تامین می‌کند."
        />
        <p className="text-[15px] leading-8 text-foreground/90">
          پرسش «اجباری یا اختیاری؟» در واقع ترکیبی از دو پرسش جداست. لایه نخست، خودِ
          مسئولیت قانونی است: بر پایه ماده ۱ و ۱۱ قانون مسئولیت مدنی ۱۳۳۹، هر کس به
          دیگری خسارت برساند، تعهد به جبران آن دارد. این لایه برای همه برقرار است و
          هیچ بیمه یا مجوزی آن را حذف نمی‌کند. لایه دوم، الزام به خرید بیمه است؛
          الزامی که فقط برای فعالیت‌های مشخصی در مقررات حرفه‌ای، آیین‌نامه‌ها یا شرط
          مجوز تصریح شده و بقیه را آزاد می‌گذارد — البته آزاد از بیمه، نه آزاد از
          مسئولیت.
        </p>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <div className="rounded-2xl border bg-card p-5">
            <h3 className="text-sm font-extrabold">مسئولیت قانونی — لایه تعهد</h3>
            <p className="mt-2 text-sm leading-7 text-muted-foreground">
              تعهد جبران خسارت ناشی از حادثه؛ بر پایه قانون مسئولیت مدنی، مستقل از
              داشتن یا نداشتن بیمه برای همیشه برقرار است و با مجوز یا قرارداد حذف
              نمی‌شود.
            </p>
          </div>
          <div className="rounded-2xl border bg-card p-5">
            <h3 className="text-sm font-extrabold">بیمه مسئولیت — لایه تامین مالی</h3>
            <p className="mt-2 text-sm leading-7 text-muted-foreground">
              ابزار پرداخت همان تعهد؛ تا میزان سقف و در محدوده شرایط بیمه‌نامه، بار
              پرداخت را از اموال شما به بیمه‌گر منتقل می‌کند، اما تکلیف رعایت مقررات
              ایمنی همچنان با شماست.
            </p>
          </div>
        </div>
      </section>

      {/* فعالیت‌های الزام‌دار */}
      <section aria-labelledby="where-h" className="mt-12">
        <SectionHeading
          icon={Building2}
          title="فعالیت‌هایی که بیمه مسئولیت برایشان الزام یا شرط مجوز است"
          hint="مبنای الزام در هر ردیف متفاوت است؛ قانون، مقررات حرفه یا قرارداد."
        />
        <div className="max-w-3xl overflow-x-auto rounded-2xl border nice-scroll">
          <Table>
            <TableHeader>
              <TableRow className="bg-accent/60">
                <TableHead className="text-start whitespace-nowrap">فعالیت</TableHead>
                <TableHead className="text-start">مبنای الزام</TableHead>
                <TableHead className="text-start">نکته عملی</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {[
                {
                  activity: "پزشکان و مراکز درمانی",
                  basis: "مقررات نظام پزشکی و وزارت بهداشت — شرط مجوز",
                  note: "بیمه مسئولیت حرفه‌ای بخشی از الزامات پروانه و کار در مراکز درمانی است؛ متن به‌روز مقررات مرجع را پیش از صدور بررسی کنید.",
                },
                {
                  activity: "مهندس ناظر ساختمان",
                  basis: "آیین‌نامه اجرایی ماده ۳۳ قانون نظام مهندسی و کنترل ساختمان؛ ارجاع در مبحث ۲ مقررات ملی ساختمان",
                  note: "بدون ارائه بیمه‌نامه مسئولیت، پذیرش پرونده نظارت ممکن نیست؛ سقف را با دیه سال، مطابق ابلاغیه رسمی، تطبیق دهید.",
                },
                {
                  activity: "برخی مشاغل دارای مجوز — مانند آسانسور و تاسیسات ساختمانی",
                  basis: "شرط مجوز در مقررات حرفه‌ای و آیین‌نامه‌های اجرایی مرجع صادرکننده",
                  note: "حداقل سقف و شرایط را مرجع صدور مجوز تعیین می‌کند؛ استعلام رسمی از همان مرجع، ملاک است.",
                },
                {
                  activity: "پیمانکاران در قراردادهای دولتی و پرحجم",
                  basis: "شرط قرارداد یا مجوز — نه حکم قانونی عام",
                  note: "الزام بیمه در اسناد مناقصه و متن قرارداد می‌آید؛ دامنه، استثناها و سقف را با همان سند تطبیق دهید.",
                },
              ].map((r) => (
                <TableRow key={r.activity}>
                  <TableCell className="whitespace-nowrap font-bold">{r.activity}</TableCell>
                  <TableCell className="text-sm leading-7 text-muted-foreground">{r.basis}</TableCell>
                  <TableCell className="text-sm leading-7 text-muted-foreground">{r.note}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <p className="mt-3 max-w-3xl text-xs leading-6 text-muted-foreground">
          * تفکیک این فهرست به معنای معافیت فعالیت‌های دیگر از مسئولیت قانونی نیست؛
          مبنای الزام فقط برای فعالیت‌های فوق در مقررات تصریح شده است.
        </p>
        <div className="mt-4 flex flex-wrap gap-3">
          <Link
            href="/laws"
            className="inline-flex items-center gap-2 rounded-full border bg-card px-5 py-2.5 text-sm font-semibold transition-colors hover:border-primary/40 hover:text-primary"
          >
            <Scale className="size-4" aria-hidden="true" />
            مرور قوانین مرتبط با مسئولیت
            <ArrowLeft className="size-4" aria-hidden="true" />
          </Link>
          <Link
            href="/liability/professional/medical-doctors"
            className="inline-flex items-center gap-2 rounded-full border bg-card px-5 py-2.5 text-sm font-semibold transition-colors hover:border-primary/40 hover:text-primary"
          >
            <Users className="size-4" aria-hidden="true" />
            بیمه مسئولیت پزشکان
            <ArrowLeft className="size-4" aria-hidden="true" />
          </Link>
        </div>
      </section>

      {/* اختیاری اما پرخسارت */}
      <section aria-labelledby="voluntary-h" className="mt-12 max-w-3xl">
        <SectionHeading
          icon={Users}
          title="کجا اختیاری است اما بی‌بیمه‌ماندن پرخسارت؟"
          hint="نبود الزام صریح به بیمه، به معنای نبود مسئولیت قانونی نیست."
        />
        <p className="text-[15px] leading-8 text-foreground/90">
          برای بسیاری از فعالیت‌ها، هیچ حکم صریحی مبنی بر «الزام به بیمه» وجود ندارد؛
          اما این به معنای بی‌ریسک بودن آن‌ها نیست. در این گروه، قانون تنها مسئولیت را
          برقرار می‌کند و در زمان حادثه، پرداخت خسارت بدون بیمه مستقیماً از اموال خود
          شما خواهد بود.
        </p>
        <div className="mt-4 overflow-hidden rounded-2xl border">
          <ul className="divide-y">
            {[
              {
                t: "کارفرما در برابر کارکنان",
                d: "ماده ۹۱ قانون کار، مسئولیت کارفرما را در حوادث ناشی از کار برقرار می‌کند؛ این مسئولیت مستقل از بیمه است و نداشتن بیمه‌نامه آن را حذف نمی‌کند.",
              },
              {
                t: "تولیدکنندگان و عرضه‌کنندگان محصول",
                d: "عیب محصول که به مشتری یا ثالث خسارت بزند، بر پایه قانون مسئولیت مدنی ۱۳۳۹ تعهد جبران می‌سازد؛ این تعهد نیز مستقل از بیمه است.",
              },
              {
                t: "والدین و سرپرستان",
                d: "خسارت‌هایی که افراد تحت سرپرستی به دیگران می‌زنند، در چارچوب قانون مسئولیت مدنی بر عهده سرپرست است.",
              },
              {
                t: "مالکان و مدیران ساختمان",
                d: "ریزش، انتقال حریق یا نقص تاسیسات، مسئولیت مالک را در برابر همسایه‌ها و مراجعان برمی‌انگیزد.",
              },
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
        <div className="mt-4 flex flex-wrap gap-3">
          <Link
            href="/liability/commercial/employers"
            className="inline-flex items-center gap-2 rounded-full border bg-card px-5 py-2.5 text-sm font-semibold transition-colors hover:border-primary/40 hover:text-primary"
          >
            <Users className="size-4" aria-hidden="true" />
            بیمه مسئولیت کارفرما
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
        </div>
      </section>

      {/* هشدار */}
      <section aria-labelledby="warn-h" className="mt-12 max-w-3xl">
        <div className="rounded-2xl border bg-card p-5">
          <div className="flex items-center gap-2">
            <ShieldAlert className="size-5 text-primary" aria-hidden="true" />
            <h2 id="warn-h" className="text-sm font-extrabold">
              سه اشتباه رایج درباره اجباری یا اختیاری بودن بیمه مسئولیت
            </h2>
          </div>
          <ul className="mt-4 space-y-3">
            {MANDATORY_MISTAKES.map((t) => (
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
          title="پنج گام تشخیص الزام بیمه مسئولیت در فعالیت شما"
        />
        <NumberedSteps steps={MANDATORY_STEPS} variant="buy" />
      </section>

      {/* FAQ */}
      <section className="mx-auto mt-12 max-w-4xl">
        <FaqSection faqs={MANDATORY_FAQS} title="سوالات متداول اجباری یا اختیاری بودن بیمه مسئولیت" />
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
          title="وضعیت پوشش مسئولیت خود را روشن کنید"
          text="فرم استعلام را با شرح دقیق فعالیت ثبت کنید؛ کارشناسان نمایندگی ۲۰۶۱۶ بیمه ایران الزام یا اختیار بودن بیمه برای فعالیت شما را بررسی و پیش‌فاکتور رسمی با سقف منطقی صادر می‌کنند — رایگان و بدون تعهد."
        />
      </div>
    </div>
  );
}
