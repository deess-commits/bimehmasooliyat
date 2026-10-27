import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowLeft,
  ClipboardList,
  FileCheck2,
  FileSearch,
  RefreshCw,
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

// ─── /documents — راهنمای عمومی مدارک لازم و فرایند صدور بیمه مسئولیت ─
// چهارمین صفحه لایه راهنماهای عمومی (دوقلوی /coverage-limit، /deductible و /renewal).
// YMYL: بدون رقم اختراعی نرخ یا مدت قطعی؛ مبناهای قانونی فقط واقعی (ماده ۹۱
// قانون کار فقط در ردیف کارفرما)؛ پوشش مشروط به درج در بیمه‌نامه و شرایط عمومی.

export const metadata: Metadata = {
  title: "مدارک لازم بیمه مسئولیت و فرایند صدور — راهنمای کامل",
  description:
    "مدارک لازم صدور بیمه مسئولیت به تفکیک نوع بیمه‌گزار، نقش شرح فعالیت و اطلاعات ریسک، پنج گام فرایند صدور از استعلام تا تحویل بیمه‌نامه — استعلام ثبت کنید.",
  alternates: {
    canonical: "/documents",
    languages: {
      "fa-IR": "/documents",
      en: "/en/documents",
      "x-default": "/documents",
    },
  },
  openGraph: {
    title: "مدارک لازم بیمه مسئولیت و فرایند صدور — راهنمای کامل",
    description:
      "مدارک هویتی و ثبتی، شرح فعالیت و اطلاعات ریسک به تفکیک نوع بیمه‌گزار — راهنمای گام‌به‌گام فرایند صدور بیمه مسئولیت.",
    url: "/documents",
    type: "article",
    images: [{ url: "/og/documents.png", width: 1200, height: 630, alt: "راهنمای مدارک لازم و فرایند صدور بیمه مسئولیت" }],
  },
};

const DOCUMENTS_STEPS = [
  {
    title: "ثبت استعلام و شرح دقیق فعالیت",
    description:
      "نوع فعالیت، محل فعالیت، تعداد پرسنل و ریسک‌های اصلی را دقیق و کامل ثبت کنید؛ کیفیت همین اطلاعات تعیین می‌کند پیش‌فاکتور چقدر به وضعیت واقعی پرونده نزدیک باشد.",
  },
  {
    title: "بررسی کارشناسی و بازدید در صورت نیاز",
    description:
      "کارشناس اطلاعات ریسک را بررسی می‌کند و در صورت نیاز، مدارک تکمیلی درخواست می‌شود. در برخی ریسک‌های صنعتی یا پروژه‌ای، بازدید محل فعالیت نیز شرط بررسی پرونده است.",
  },
  {
    title: "دریافت پیش‌فاکتور با سقف و فرانشیز",
    description:
      "پیش‌فاکتور رسمی، سقف تعهد، فرانشیز و پوشش‌های قابل درج را مشخص می‌کند. پیش از پرداخت، تطبیق سقف با نیاز واقعی و انطباق شرح فعالیت با وضعیت خود را کنترل کنید.",
  },
  {
    title: "پرداخت حق بیمه",
    description:
      "پس از تأیید پیش‌فاکتور و صحت مشخصات بیمه‌گذار، پرداخت انجام می‌شود. مشخصات و مبلغ درج‌شده را پیش از پرداخت با پیش‌فاکتور تطبیق دهید تا نیازی به اصلاح پس از صدور نباشد.",
  },
  {
    title: "صدور و تحویل بیمه‌نامه",
    description:
      "بیمه‌نامه به‌صورت الکترونیکی صادر و تحویل می‌شود. تاریخ شروع و پایان، سقف تعهد، فرانشیز و شرح فعالیت را کنترل کنید و نسخه بیمه‌نامه را برای ارجاع در زمان خسارت نگه دارید.",
  },
];

const DOCUMENTS_FAQS = [
  {
    question: "صدور بیمه مسئولیت با این مدارک چقدر زمان می‌برد؟",
    answer:
      "زمان صدور به نوع ریسک بستگی دارد و هیچ مدت قطعی برای همه پرونده‌ها وجود ندارد. استعلام‌هایی با اطلاعات کامل و مدارک آماده معمولاً سریع‌تر به پیش‌فاکتور و صدور می‌رسند؛ پرونده‌هایی که بازدید یا مدارک تکمیلی لازم دارند، فرایند طولانی‌تری خواهند داشت. ثبت استعلام دقیق و آماده‌سازی مدارک پایه، فرایند را کوتاه‌تر می‌کند.",
  },
  {
    question: "آیا بدون بازدید کارشناس هم بیمه‌نامه صادر می‌شود؟",
    answer:
      "برای بسیاری از ریسک‌های ساده و استعلام‌هایی با اطلاعات کامل، صدور بدون بازدید رایج است؛ اما تصمیم نهایی با بیمه‌گر است. در ریسک‌های صنعتی، پروژه‌های بزرگ یا فعالیت‌های پرخطر، بیمه‌گر ممکن است بازدید کارشناسی یا مدارک تکمیلی را شرط صدور بداند. شرح دقیق فعالیت در استعلام، مسیر بررسی را روان‌تر می‌کند.",
  },
  {
    question: "اگر اطلاعات نادرست در استعلام بدهم چه پیامدی دارد؟",
    answer:
      "اطلاعات ناقص یا نادرست درباره فعالیت، تعداد پرسنل یا محل، اعتبار پوشش در زمان خسارت را تهدید می‌کند؛ چون بیمه‌گر ریسک را بر مبنای همان اطلاعات پذیرفته است. عدم انطباق بیمه‌نامه با وضعیت واقعی می‌تواند در بررسی خسارت محل اختلاف شود. اطلاعات را همان‌گونه که واقعیت دارد ثبت کنید و اصلاحات بعدی را از مسیر الحاقیه انجام دهید.",
  },
  {
    question: "اگر بعد از صدور متوجه اشتباهی در بیمه‌نامه شوم چه کنم؟",
    answer:
      "اصلاح مشخصات، شرح فعالیت، سقف تعهد یا سایر موارد از مسیر الحاقیه روی همان بیمه‌نامه انجام می‌شود و نیازی به صدور بیمه‌نامه جدید نیست. هرچه درخواست اصلاح زودتر ثبت شود، ریسک اختلاف در زمان خسارت کمتر است. راهنمای کامل کاربردهای الحاقیه و تفاوت آن با تمدید، در صفحه تمدید و الحاقیه آمده است.",
  },
  {
    question: "آیا بیمه مسئولیت با اعتبار کوتاه‌مدت هم صادر می‌شود؟",
    answer:
      "دوره پوشش معمولاً یک‌ساله است؛ اما برای پروژه‌های مشخص، صدور بیمه‌نامه با دوره کوتاه‌تر و هماهنگ با مدت پیمان رایج است. اعتبار پوشش دقیقاً از تاریخ درج‌شده در بیمه‌نامه آغاز و در تاریخ پایان خاتمه می‌یابد و رخدادهای خارج از این بازه پوشش ندارند. جزئیات دوره در بیمه‌نامه و شرایط عمومی آن مشخص می‌شود.",
  },
  {
    question: "هزینه صدور بیمه مسئولیت چگونه تعیین می‌شود؟",
    answer:
      "حق بیمه بر اساس ارزیابی ریسک — نوع فعالیت، سقف تعهد، فرانشیز و اطلاعات پرونده — تعیین می‌شود و رقم نهایی فقط در پیش‌فاکتور رسمی اعلام می‌گردد؛ ارائه عدد قطعی پیش از بررسی کامل پرونده درست نیست. برای آگاهی از مبلغ واقعی پرونده خود، استعلام ثبت کنید تا پیش‌فاکتور رسمی برایتان صادر شود.",
  },
];

const DOCUMENTS_MISTAKES = [
  "شرح مبهم فعالیت در استعلام — عبارت کلی بدون ذکر نوع کار، محیط و گروه ثالث در معرض ریسک، ارزیابی را نادقیق می‌کند و در زمان خسارت محل اختلاف می‌شود.",
  "ارسال مدارک ناقص یا مغایر با وضعیت واقعی — بررسی پرونده متوقف می‌شود و در صورت صدور، عدم انطباق مدارک با واقعیت می‌تواند در زمان مطالبه علیه بیمه‌گزار استناد شود.",
  "کنترل‌نکردن بیمه‌نامه پس از دریافت — اشتباه در نام، شرح فعالیت یا تاریخ‌ها، بدون اصلاح با الحاقیه، هنگام طرح خسارت مسئله‌ساز می‌شود.",
];

const REVIEW_DATE_ISO = "2026-10-26";

export default function DocumentsPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      <JsonLd
        data={howToJsonLd({
          name: "پنج گام فرایند صدور بیمه مسئولیت از استعلام تا تحویل بیمه‌نامه",
          description:
            "روش گام‌به‌گام صدور بیمه مسئولیت: ثبت استعلام با شرح دقیق فعالیت، بررسی کارشناسی، پیش‌فاکتور، پرداخت و صدور بیمه‌نامه الکترونیکی.",
          steps: DOCUMENTS_STEPS,
          url: "/documents",
        })}
      />
      <JsonLd data={faqJsonLd(DOCUMENTS_FAQS)} />

      <Breadcrumbs items={[{ name: "مدارک و فرایند صدور", href: "/documents" }]} />

      <header className="mt-6">
        <h1 className="text-2xl font-extrabold leading-[1.6] sm:text-3xl">
          مدارک لازم و فرایند صدور بیمه مسئولیت — راهنمای کامل
        </h1>
      </header>

      <div className="mt-6 max-w-3xl">
        <AnswerBlock
          text="برای صدور بیمه مسئولیت معمولاً مدارک هویتی یا ثبتی، شرح دقیق فعالیت و اطلاعات ریسک مانند تعداد پرسنل و نشانی محل فعالیت لازم است. فهرست دقیق مدارک به نوع پوشش و نوع بیمه‌گزار بستگی دارد؛ کارشناس پس از بررسی استعلام، مدارک لازم همان پرونده را اعلام می‌کند."
        />
      </div>

      {/* مدارک پایه */}
      <section aria-labelledby="base-h" className="mt-12">
        <SectionHeading
          icon={FileCheck2}
          title="مدارک پایه — برای همه بیمه‌گزاران"
          hint="این مدارک مبنای احراز هویت و ارزیابی ریسک در هر پرونده است."
        />
        <div className="max-w-3xl overflow-x-auto rounded-2xl border nice-scroll">
          <Table>
            <TableHeader>
              <TableRow className="bg-accent/60">
                <TableHead className="text-start whitespace-nowrap">مدرک</TableHead>
                <TableHead className="text-start">نقش در ارزیابی ریسک</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {[
                {
                  doc: "تصویر کارت ملی هوشمند",
                  why: "احراز هویت بیمه‌گزار حقیقی و درج صحیح مشخصات در بیمه‌نامه.",
                },
                {
                  doc: "مدارک ثبتی اشخاص حقوقی — آگهی تأسیس و آخرین تغییرات روزنامه رسمی",
                  why: "انطباق نام، شناسه ملی و موضوع فعالیت شرکت با بیمه‌نامه.",
                },
                {
                  doc: "جواز کسب یا مجوز فعالیت",
                  why: "اثبات قانونی‌بودن فعالیت؛ پذیرش برخی ریسک‌ها منوط به داشتن مجوز است.",
                },
                {
                  doc: "شرح کتبی فعالیت",
                  why: "مبنای اصلی ارزیابی ریسک: نوع کار، محیط فعالیت و گروه ثالث در معرض خسارت.",
                },
                {
                  doc: "اطلاعات کمی ریسک",
                  why: "تعداد پرسنل، مساحت محل فعالیت و تجهیزات اصلی؛ ورودی تعیین شرایط و سقف تعهد.",
                },
                {
                  doc: "سوابق بیمه‌ای — بیمه‌نامه دوره قبل و سوابق خسارت",
                  why: "تجربه خسارت دوره قبل، در شرایط و نرخ دوره جدید لحاظ می‌شود.",
                },
              ].map((r) => (
                <TableRow key={r.doc}>
                  <TableCell className="whitespace-nowrap font-bold">{r.doc}</TableCell>
                  <TableCell className="text-sm leading-7 text-muted-foreground">{r.why}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <p className="mt-3 max-w-3xl text-xs leading-6 text-muted-foreground">
          * فهرست نهایی مدارک هر پرونده پس از بررسی استعلام توسط کارشناس اعلام می‌شود و
          بسته به نوع پوشش می‌تواند متفاوت باشد.
        </p>
      </section>

      {/* مدارک اختصاصی */}
      <section aria-labelledby="specific-h" className="mt-12">
        <SectionHeading
          icon={Users}
          title="مدارک اختصاصی — به تفکیک نوع بیمه‌گزار"
          hint="علاوه بر مدارک پایه، هر نوع بیمه‌گزار این مدارک را آماده می‌کند."
        />
        <div className="max-w-4xl overflow-x-auto rounded-2xl border nice-scroll">
          <Table>
            <TableHeader>
              <TableRow className="bg-accent/60">
                <TableHead className="text-start whitespace-nowrap">نوع بیمه‌گزار</TableHead>
                <TableHead className="text-start">مدارک اختصاصی رایج</TableHead>
                <TableHead className="text-start">نکته کارشناسی</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {[
                {
                  type: "اشخاص حقیقی و حرفه‌ای مستقل",
                  docs: "تصویر کارت ملی؛ شرح فردی فعالیت؛ در صورت داشتن، تصویر پروانه یا مجوز حرفه‌ای.",
                  note: "مجوز حرفه‌ای، اعتبار شرح فعالیت را نزد بیمه‌گر تقویت می‌کند.",
                },
                {
                  type: "کسب‌وکار و شرکت",
                  docs: "آگهی تأسیس و آخرین تغییرات روزنامه رسمی، جواز کسب یا مجوز، شناسه ملی و کد اقتصادی، شرح فعالیت واحدها.",
                  note: "تغییرات ثبتی ثبت‌نشده باید پیش از صدور اصلاح شود.",
                },
                {
                  type: "پروژه و پیمانکاری",
                  docs: "مشخصات پیمان یا قرارداد، دامنه کار و محوطه، مدت پروژه، شرح کارگاه و ماشین‌آلات.",
                  note: "سقف تعهد و مدت بیمه‌نامه باید با شرایط پیمان هماهنگ باشد.",
                },
                {
                  type: "کارفرما",
                  docs: "فهرست اسامی پرسنل و شرح شغل هر گروه شغلی؛ در صورت نیاز، نمونه قرارداد کار.",
                  note: "تعهد کارفرما به بیمه‌کردن کارگران در ماده ۹۱ قانون کار تصریح شده است؛ لیست پرسنل و شرح شغل، مبنای ارزیابی این ریسک است.",
                },
              ].map((r) => (
                <TableRow key={r.type}>
                  <TableCell className="whitespace-nowrap font-bold">{r.type}</TableCell>
                  <TableCell className="text-sm leading-7 text-muted-foreground">{r.docs}</TableCell>
                  <TableCell className="text-sm leading-7 text-muted-foreground">{r.note}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <p className="mt-3 max-w-3xl text-xs leading-6 text-muted-foreground">
          * مدارک درخواستی هر پرونده در نهایت مطابق نوع پوشش و شرایط عمومی بیمه‌نامه توسط
          بیمه‌گر تعیین می‌شود.
        </p>
      </section>

      {/* فرایند صدور */}
      <section aria-labelledby="process-h" className="mt-12 max-w-3xl">
        <SectionHeading
          icon={ClipboardList}
          title="فرایند صدور از استعلام تا بیمه‌نامه"
          hint="هر گام پیش از گام بعد تکمیل می‌شود؛ کیفیت استعلام سرعت کل فرایند را تعیین می‌کند."
        />
        <NumberedSteps steps={DOCUMENTS_STEPS} variant="buy" />
        <p className="mt-4 text-[15px] leading-8 text-foreground/90">
          بیمه‌نامه پس از صدور، سند نهایی شماست؛ پوشش‌های درج‌شده، سقف و فرانشیز فقط
          مطابق متن بیمه‌نامه و شرایط عمومی آن اعتبار دارند. تغییرات میان‌دوره‌ای از مسیر
          الحاقیه و ادامه پوشش در سال بعد از مسیر تمدید انجام می‌شود.
        </p>
        <div className="mt-4 flex flex-wrap gap-3">
          <Link
            href="/renewal"
            className="inline-flex items-center gap-2 rounded-full border bg-card px-5 py-2.5 text-sm font-semibold transition-colors hover:border-primary/40 hover:text-primary"
          >
            <RefreshCw className="size-4" aria-hidden="true" />
            تمدید و الحاقیه
            <ArrowLeft className="size-4" aria-hidden="true" />
          </Link>
          <Link
            href="/quote"
            className="inline-flex items-center gap-2 rounded-full border bg-card px-5 py-2.5 text-sm font-semibold transition-colors hover:border-primary/40 hover:text-primary"
          >
            <FileSearch className="size-4" aria-hidden="true" />
            استعلام
            <ArrowLeft className="size-4" aria-hidden="true" />
          </Link>
        </div>
      </section>

      {/* هشدار */}
      <section aria-labelledby="mistakes-h" className="mt-12 max-w-3xl">
        <div className="rounded-2xl border bg-card p-5">
          <div className="flex items-center gap-2">
            <ShieldAlert className="size-5 text-primary" aria-hidden="true" />
            <h2 id="mistakes-h" className="text-sm font-extrabold">
              سه اشتباه رایج در تهیه مدارک و صدور بیمه مسئولیت
            </h2>
          </div>
          <ul className="mt-4 space-y-3">
            {DOCUMENTS_MISTAKES.map((t) => (
              <li key={t} className="flex items-start gap-2 text-sm leading-7 text-muted-foreground">
                <span className="mt-2.5 size-1.5 shrink-0 rounded-full bg-primary" aria-hidden="true" />
                {t}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* FAQ */}
      <section className="mx-auto mt-12 max-w-4xl">
        <FaqSection faqs={DOCUMENTS_FAQS} title="سوالات متداول مدارک و فرایند صدور" />
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
          title="مدارک خود را آماده کنید و استعلام بدهید"
          text="اطلاعات فعالیت خود را در فرم استعلام ثبت کنید؛ کارشناس مدارک لازم همان پرونده را اعلام و پیش‌فاکتور رسمی با سقف و فرانشیز مشخص صادر می‌کند — رایگان و بدون تعهد."
        />
      </div>
    </div>
  );
}
