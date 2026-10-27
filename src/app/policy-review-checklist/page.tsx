import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowLeft,
  CalendarClock,
  ClipboardCheck,
  FileText,
  ListChecks,
  Percent,
  RefreshCw,
  Scale,
  ShieldAlert,
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

// ─── /policy-review-checklist — چک‌لیست بازبینی بیمه مسئولیت قبل از امضا ────
// ششمین صفحه لایه راهنماهای عمومی (دوقلوی /coverage-limit، /deductible، /renewal،
// /documents و /liability-mandatory). کاندیدای استناد AI برای کوئری
// «قبل از امضای بیمه‌نامه چه چیزهایی را بررسی کنیم».
// YMYL: هیچ رقم نرخ/مبلغ اختراعی؛ دیه/سقف فقط با عبارت «مطابق ابلاغیه رسمی سال»؛
// بازبینی توسط کارشناس نمایندگی رایگان است (بدون رقم یا کارمزد اختراعی).
// تک‌محصولی: بدون پیشنهاد بیمه غیرمسئولیت و بدون مقایسه با سایر بیمه‌ها.

export const metadata: Metadata = {
  title: "چک‌لیست بازبینی بیمه مسئولیت قبل از امضا",
  description:
    "پیش از امضای بیمه مسئولیت هشت فیلد را بسنجید: شرح فعالیت، سقف تفکیکی، فرانشیز، استثناها، مدت اعتبار، اطلاعات بیمه‌گزار و تمدید؛ چک‌لیست و پنج گام بازبینی.",
  alternates: {
    canonical: "/policy-review-checklist",
    languages: {
      "fa-IR": "/policy-review-checklist",
      en: "/en/policy-review-checklist",
      "x-default": "/policy-review-checklist",
    },
  },
  openGraph: {
    title: "چک‌لیست بازبینی بیمه مسئولیت قبل از امضا",
    description:
      "هشت فیلد کلیدی بیمه مسئولیت که پیش از امضا باید تطبیق دهید؛ چک‌لیست کامل بازبینی و پنج گام روش بازبینی پیش از پرداخت.",
    url: "/policy-review-checklist",
    type: "article",
    images: [
      {
        url: "/og/policy-review-checklist.png",
        width: 1200,
        height: 630,
        alt: "چک‌لیست بازبینی بیمه مسئولیت قبل از امضا",
      },
    ],
  },
};

const REVIEW_STEPS = [
  {
    title: "دریافت پیش‌نویس بیمه‌نامه پیش از پرداخت",
    description:
      "پیش از هر پرداختی، پیش‌نویس کامل بیمه‌نامه شامل شرایط خصوصی را بخواهید؛ چیزی که فقط شفاهی توضیح داده شده باشد، در سند پشتوانه ندارد.",
  },
  {
    title: "مقایسه سطر به سطر با فرم استعلام",
    description:
      "پیش‌نویس را با فرم استعلام و توافق شفاهی خود تطبیق دهید؛ شرح فعالیت، سقف‌ها و پوشش‌ها باید عیناً همان چیزی باشد که اعلام کرده‌اید.",
  },
  {
    title: "پرسش مستند درباره هر استثنا",
    description:
      "درباره هر بند استثنا که روشن نیست، پرسش دقیق بپرسید و پاسخ را کتبی یا در متن بیمه‌نامه بخواهید؛ استثنای مبهم، ریسک پنهان است.",
  },
  {
    title: "درخواست اصلاح پیش از صدور",
    description:
      "هر اختلاف را در همین مرحله برای اصلاح اعلام کنید؛ پس از صدور بیمه‌نامه، اصلاح فقط با الحاقیه رسمی انجام می‌شود.",
  },
  {
    title: "نگهداری رونوشت الحاقیه‌ها و تمدیدها",
    description:
      "رونوشت بیمه‌نامه، الحاقیه‌ها و رسیدها را در پرونده فعالیت نگه دارید؛ در تمدید و اعلام تغییرات، همین اسناد مبنای بازبینی دوره جدید است.",
  },
];

const REVIEW_FAQS = [
  {
    question: "آیا می‌توان پس از صدور، بیمه‌نامه را اصلاح کرد؟",
    answer:
      "بله؛ اصلاح پس از صدور فقط با الحاقیه رسمی ممکن است، نه با توافق شفاهی یا تلفنی. هر تغییری مانند اصلاح شرح فعالیت، افزایش سقف یا تصحیح مشخصات با صدور الحاقیه روی همان بیمه‌نامه اعمال می‌شود. به همین دلیل هر اختلاف را پیش از امضا روشن کنید؛ الحاقیه برای اصلاحات دیرهنگام است، نه جبران بازبینی انجام‌نشده.",
  },
  {
    question: "استثناها کجای بیمه‌نامه درج می‌شوند و چرا مهم‌اند؟",
    answer:
      "استثناها در شرایط خصوصی بیمه‌نامه فهرست می‌شوند و مهم‌ترین بخش سند برای شما هستند، چون دقیقاً مشخص می‌کنند چه رخدادهایی پوشش ندارند. این فهرست را سطر به سطر بخوانید و درباره هر بندی که با تصور شما از پوشش نمی‌خواند، پرسش مستند بپرسید. پوشش‌هایی که در ذهن شماست ولی در متن نیست، در خسارت به یاری نمی‌آید.",
  },
  {
    question: "سقف تفکیکی یعنی چه؟",
    answer:
      "سقف تفکیکی یعنی برای هر پوشش، جدا از بقیه، یک سقف مشخص درج شده است؛ سقف دیه، خسارت بدنی و خسارت مالی هر کدام سقف خود را دارند. اتکا فقط به «مجموع سقف» این تصور اشتباه را می‌سازد که همه مبلغ برای هر نوع خسارت در دسترس است؛ در حادثه، هر پوشش تا سقف همان بند پرداخت می‌شود.",
  },
  {
    question: "اگر شرح فعالیت ناقص باشد چه می‌شود؟",
    answer:
      "شرح فعالیت، مبنای تعیین پوشش است؛ اگر در بیمه‌نامه کامل یا دقیق نباشد، بخشی از فعالیت واقعی شما عملاً بی‌پوشش مانده است. در زمان خسارت، رخدادی که با شرح درج‌شده نمی‌خواند محل بحث و اختلاف می‌شود. شرح فعالیت را با توافق شفاهی و فرم استعلام تطبیق دهید و هر فعالیت الحاقی را جداگانه اعلام کنید، پیش از امضا.",
  },
  {
    question: "چرا تاریخ شروع و پایان بیمه‌نامه مهم است؟",
    answer:
      "پوشش بیمه‌ای فقط در بازه اعتبار بیمه‌نامه برقرار است؛ از تاریخ و ساعت شروع تا پایان. این بازه را با دوره قراردادها و فعالیت خود تطبیق دهید تا هیچ بخشی از کار، حتی چند روز، بدون پوشش نماند. تمدید نیز باید پیش از پایان انجام شود تا پوشش جدید بدون وقفه از لحظه انقضا آغاز شود.",
  },
  {
    question: "آیا بازبینی بیمه‌نامه قبل از امضا هزینه دارد؟",
    answer:
      "خیر؛ بازبینی پیش‌نویس بیمه‌نامه توسط کارشناس نمایندگی هزینه‌ای ندارد و بخشی از خدمات استعلام و صدور است. پیش‌نویس را پیش از پرداخت دریافت کنید، فیلدهای کلیدی را با کارشناس مرور کنید و پرسش‌های خود درباره استثناها و سقف‌ها بپرسید. اگر پس از امضا به اصلاح نیاز پیدا کنید، موضوع فقط با صدور الحاقیه پیگیری می‌شود.",
  },
];

const REVIEW_MISTAKES = [
  "خواندن نکردن استثناها و اتکا به وعده شفاهی — چیزی که در شرایط خصوصی درج نشده باشد، در خسارت پشتوانه سند ندارد؛ هر تضمین شفاهی را به درج در متن بیمه‌نامه تبدیل کنید.",
  "بررسی نکردن سقف تفکیکی هر پوشش — مجموع سقف، تضمینی برای کفایت هر بند نیست؛ سقف هر پوشش را جداگانه با ریسک فعالیت و دیه سال وقوع، مطابق ابلاغیه رسمی، بسنجید.",
  "امضای بیمه‌نامه با اطلاعات ناقص شرکت یا فعالیت — ناهمخوانی نام حقوقی، شناسه ملی یا شرح فعالیت در زمان خسارت محل اختلاف می‌شود؛ اصلاح پس از صدور فقط با الحاقیه ممکن است.",
];

const REVIEW_DATE_ISO = "2026-10-27";

export default function PolicyReviewChecklistPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      <JsonLd
        data={howToJsonLd({
          name: "روند بازبینی بیمه مسئولیت پیش از امضا",
          description:
            "روش گام‌به‌گام بازبینی بیمه مسئولیت پیش از امضا: دریافت پیش‌نویس، مقایسه با فرم استعلام، پرسش درباره استثناها، اصلاح پیش از صدور و نگهداری اسناد.",
          steps: REVIEW_STEPS,
          url: "/policy-review-checklist",
        })}
      />
      <JsonLd data={faqJsonLd(REVIEW_FAQS)} />

      <Breadcrumbs items={[{ name: "چک‌لیست بازبینی بیمه مسئولیت", href: "/policy-review-checklist" }]} />

      <header className="mt-6">
        <h1 className="text-2xl font-extrabold leading-[1.6] sm:text-3xl">
          چک‌لیست بازبینی بیمه مسئولیت قبل از امضا
        </h1>
      </header>

      <div className="mt-6 max-w-3xl">
        <AnswerBlock
          title="پاسخ کوتاه"
          text="پیش از امضای بیمه مسئولیت، هشت فیلد را بازبینی کنید: شرح فعالیت، سقف تعهد به تفکیک پوشش‌ها، فرانشیز، استثناها، مدت اعتبار، اطلاعات بیمه‌گزار، فعالیت‌های الحاقی و شرایط تمدید. هر اختلاف با توافق شفاهی را در همین مرحله اصلاح کنید؛ پس از صدور بیمه‌نامه، اصلاح فقط با الحاقیه رسمی ممکن است."
        />
      </div>

      {/* چرا پیش از امضا */}
      <section aria-labelledby="why-h" className="mt-10 max-w-3xl">
        <SectionHeading
          icon={ClipboardCheck}
          title="چرا بازبینی باید پیش از امضا انجام شود؟"
          hint="بعد از امضا، متن بیمه‌نامه ملاک است؛ نه توافق‌های شفاهی."
        />
        <p className="text-[15px] leading-8 text-foreground/90">
          بیمه‌نامه سند رسمی است و در زمان خسارت، متن آن ملاک بررسی است؛ نه توافق‌های
          شفاهی و وعده‌های گفتاری. به همین دلیل مرحله پیش از امضا، تنها فرصت ارزان و
          سریع برای رفع اختلاف‌هاست. هشت فیلدی که در چک‌لیست زیر آمده، فیلدهایی است که
          بیشترین اختلاف خسارتی از بی‌توجهی به آن‌ها شروع می‌شود؛ بازبینی هر هشت فیلد
          چند دقیقه بیش از شما وقت نمی‌گیرد.
        </p>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <div className="rounded-2xl border bg-card p-5">
            <h3 className="text-sm font-extrabold">اصلاح پیش از صدور</h3>
            <p className="mt-2 text-sm leading-7 text-muted-foreground">
              پیش‌نویس هنوز سند نهایی نیست؛ هر اختلاف فقط با یک اعلام اصلاح برطرف
              می‌شود و بیمه‌نامه درست صادر خواهد شد.
            </p>
          </div>
          <div className="rounded-2xl border bg-card p-5">
            <h3 className="text-sm font-extrabold">اصلاح پس از صدور — فقط با الحاقیه</h3>
            <p className="mt-2 text-sm leading-7 text-muted-foreground">
              پس از صدور، هر اصلاحی حتی کوچک مسیر رسمی الحاقیه را طی می‌کند و تا آن
              زمان، متن فعلی ملاک بررسی خسارت است.
            </p>
          </div>
        </div>
      </section>

      {/* چک‌لیست هشت‌فیلدی */}
      <section aria-labelledby="checklist-h" className="mt-12">
        <SectionHeading
          icon={ListChecks}
          title="چک‌لیست هشت‌فیلدی بازبینی بیمه‌نامه"
          hint="هر هشت ردیف را پیش از امضا تطبیق دهید؛ ترتیب، از مهم‌ترین فیلدها شروع می‌شود."
        />
        <div className="max-w-3xl overflow-x-auto rounded-2xl border nice-scroll">
          <Table>
            <TableHeader>
              <TableRow className="bg-accent/60">
                <TableHead className="text-start whitespace-nowrap">فیلد بازبینی</TableHead>
                <TableHead className="text-start">چه چیزی را بررسی کنیم</TableHead>
                <TableHead className="text-start">نکته عملی</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {[
                {
                  field: "۱. شرح فعالیت و پوشش‌های درج‌شده",
                  check: "شرح فعالیت باید دقیقاً با توافق شفاهی و فرم استعلام یکی باشد؛ هر فعالیت اضافه یا حذف‌شده، دامنه پوشش را تغییر می‌دهد.",
                  note: "هر تفاوت، حتی ظاهری، را پیش از امضا اعلام کنید.",
                },
                {
                  field: "۲. سقف تعهد به تفکیک هر پوشش",
                  check: "سقف هر پوشش را جداگانه بخوانید، نه فقط مجموع را؛ در بیمه‌های مسئولیت، ملاک پرداخت، سقف همان بند است.",
                  note: "سقف را با دیه سال وقوع، مطابق ابلاغیه رسمی، تطبیق دهید.",
                },
                {
                  field: "۳. فرانشیز هر پوشش",
                  check: "قطعی یا درصدی بودن فرانشیز هر بند را مشخص کنید؛ فرانشیز، سهم پرداخت خود شما در هر خسارت است.",
                  note: "اثر فرانشیز را در پرداخت واقعی خسارت بسنجید، نه فقط در متن.",
                },
                {
                  field: "۴. استثناهای درج‌شده در شرایط خصوصی",
                  check: "فهرست استثناها مهم‌ترین بخش بیمه‌نامه است؛ مشخص می‌کند چه رخدادهایی پوشش ندارند.",
                  note: "درباره هر بند مبهم، پیش از امضا پرسش مستند بپرسید.",
                },
                {
                  field: "۵. مدت اعتبار و تاریخ شروع و پایان",
                  check: "بازه اعتبار، حتی چند روز، باید با دوره قراردادها و فعالیت شما بخواند.",
                  note: "پوشش فقط در همین بازه برقرار است؛ وقفه یعنی ریسک بی‌پوشش.",
                },
                {
                  field: "۶. صحت اطلاعات بیمه‌گزار",
                  check: "نام حقوقی، شناسه ملی و آدرس محل فعالیت باید عیناً با مدارک ثبتی یکی باشد.",
                  note: "اشتباه مشخصات، بررسی پرونده خسارت را دشوار می‌کند.",
                },
                {
                  field: "۷. فعالیت‌های الحاقی",
                  check: "فعالیت‌های جانبی و الحاقی را فهرست کنید و ببینید در شرح فعالیت آمده‌اند یا پوشش جداگانه می‌خواهند.",
                  note: "فعالیت اعلام‌نشده، در دامنه پوشش نیست.",
                },
                {
                  field: "۸. شرایط تمدید و مهلت‌های اعلام تغییرات",
                  check: "مهلت‌های اعلام تغییرات و روند تمدید را از قبل بدانید تا در دوره بعد، سقف و اطلاعات به‌روز بماند.",
                  note: "دیه هر سال مطابق ابلاغیه رسمی تغییر می‌کند؛ سقف را در تمدید دوباره بسنجید.",
                },
              ].map((r) => (
                <TableRow key={r.field}>
                  <TableCell className="whitespace-nowrap font-bold">{r.field}</TableCell>
                  <TableCell className="text-sm leading-7 text-muted-foreground">{r.check}</TableCell>
                  <TableCell className="text-sm leading-7 text-muted-foreground">{r.note}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
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
            href="/deductible"
            className="inline-flex items-center gap-2 rounded-full border bg-card px-5 py-2.5 text-sm font-semibold transition-colors hover:border-primary/40 hover:text-primary"
          >
            <Percent className="size-4" aria-hidden="true" />
            راهنمای فرانشیز بیمه مسئولیت
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
              سه اشتباه رایج در بازبینی بیمه مسئولیت پیش از امضا
            </h2>
          </div>
          <ul className="mt-4 space-y-3">
            {REVIEW_MISTAKES.map((t) => (
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
          icon={CalendarClock}
          title="روند بازبینی پیش از امضا — پنج گام"
        />
        <NumberedSteps steps={REVIEW_STEPS} variant="buy" />
        <div className="mt-5 flex flex-wrap gap-3">
          <Link
            href="/documents"
            className="inline-flex items-center gap-2 rounded-full border bg-card px-5 py-2.5 text-sm font-semibold transition-colors hover:border-primary/40 hover:text-primary"
          >
            <FileText className="size-4" aria-hidden="true" />
            مدارک مورد نیاز بیمه مسئولیت
            <ArrowLeft className="size-4" aria-hidden="true" />
          </Link>
          <Link
            href="/renewal"
            className="inline-flex items-center gap-2 rounded-full border bg-card px-5 py-2.5 text-sm font-semibold transition-colors hover:border-primary/40 hover:text-primary"
          >
            <RefreshCw className="size-4" aria-hidden="true" />
            راهنمای تمدید و الحاقیه
            <ArrowLeft className="size-4" aria-hidden="true" />
          </Link>
          <Link
            href="/liability-mandatory"
            className="inline-flex items-center gap-2 rounded-full border bg-card px-5 py-2.5 text-sm font-semibold transition-colors hover:border-primary/40 hover:text-primary"
          >
            <ListChecks className="size-4" aria-hidden="true" />
            بیمه مسئولیت اجباری است یا اختیاری؟
            <ArrowLeft className="size-4" aria-hidden="true" />
          </Link>
        </div>
      </section>

      {/* FAQ */}
      <section className="mx-auto mt-12 max-w-4xl">
        <FaqSection faqs={REVIEW_FAQS} title="سوالات متداول بازبینی بیمه مسئولیت قبل از امضا" />
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
          title="بیمه‌نامه خود را پیش از امضا بازبینی کنید"
          text="فرم استعلام را ثبت کنید؛ پیش‌نویس بیمه‌نامه و شرایط خصوصی پیش از پرداخت در اختیار شما قرار می‌گیرد و کارشناسان نمایندگی ۲۰۶۱۶ بیمه ایران فیلدهای کلیدی را با شما مرور می‌کنند — رایگان و بدون تعهد."
        />
      </div>
    </div>
  );
}
