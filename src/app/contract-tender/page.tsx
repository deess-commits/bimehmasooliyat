import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowLeft,
  Building2,
  ClipboardCheck,
  FileBadge,
  FileSignature,
  Gavel,
  ListChecks,
  Scale,
  ShieldAlert,
  Stamp,
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

// ─── /contract-tender — بیمه مسئولیت در قراردادها و مناقصات ─────────
// هشتمین صفحه لایه راهنماهای عمومی (دوقلوی ساختاری /renewal).
// YMYL: بدون رقم اختراعی؛ سقف فقط «مورد درخواست کارفرما در شرط بیمه»؛
// صداقت تک‌محصولی: بیمه تضمین (وجه‌الضمان/حسن انجام کار) محصول دیگری است
// که این نمایندگی ارائه نمی‌کند — بیمه مسئولیت فقط خسارت جانی/مالی ثالث.

export const metadata: Metadata = {
  title: "بیمه مسئولیت در قراردادها و مناقصات | راهنما",
  description:
    "ارائه گواهی بیمه مسئولیت در قراردادهای پیمانکاری شرط پرداخت است؛ راهنمای تطبیق سقف تعهد با متن قرارداد، صدور گواهی رسمی و تفاوت بیمه مسئولیت با بیمه تضمین.",
  alternates: {
    canonical: "/contract-tender",
    languages: {
      "fa-IR": "/contract-tender",
      en: "/en/contract-tender",
      "x-default": "/contract-tender",
    },
  },
  openGraph: {
    title: "بیمه مسئولیت در قراردادها و مناقصات | راهنما",
    description:
      "در بسیاری از قراردادها ارائه گواهی بیمه مسئولیت شرط پرداخت است؛ راهنمای تطبیق سقف و پوشش با متن قرارداد، صدور گواهی رسمی برای کارفرما و تفاوت صادقانه با بیمه تضمین.",
    url: "/contract-tender",
    type: "article",
    images: [
      {
        url: "/og/contract-tender.png",
        width: 1200,
        height: 630,
        alt: "راهنمای بیمه مسئولیت در قراردادها و مناقصات",
      },
    ],
  },
};

const ANSWER_TEXT =
  "در بسیاری از قراردادهای پیمانکاری، خدماتی و تدارکاتی، ارائه گواهی بیمه مسئولیت شرط پرداخت یا اجرای کار است. سقف تعهد و پوشش درخواستی کارفرما باید پیش از صدور با متن قرارداد تطبیق داده شود و پس از صدور بیمه‌نامه، صدور گواهی رسمی به نام کارفرما برای ارائه در پروژه یا مناقصه ممکن است.";

const CONTRACT_PLACES = [
  {
    icon: FileBadge,
    title: "شرط ارائه گواهی بیمه‌نامه در قرارداد",
    text: "بسیاری از قراردادهای پیمانکاری، خدماتی و تدارکاتی، ارائه گواهی بیمه مسئولیت را شرط پرداخت صورت‌وضعیت یا شروع کار قرار می‌دهند؛ این شرط به موضوع بیمه مسئولیت برمی‌گردد و مبنای استعلام شماست.",
    note: "* این شرط فقط خسارت جانی و مالی وارد بر اشخاص ثالث را پوشش می‌دهد؛ همه تعهدات پیمانکار در برابر کارفرما موضوع بیمه مسئولیت نیست.",
  },
  {
    icon: Scale,
    title: "سقف تعهد موضوع شرط بیمه در متن قرارداد",
    text: "سقف تعهد، همان مبلغی است که کارفرما یا پیمانکار اصلی در شرط بیمه درج می‌کند؛ در قراردادهای عمرانی مشمول شرایط عمومی پیمان، ماده ۱۸ بیمه کارها و ماده ۱۹ بیمه اشخاص ثالث را جداگانه الزامی می‌کند و هرکدام سقف خود را دارند.",
    note: "* بیمه کارها محصولی متفاوت از مسئولیت است؛ بیمه مسئولیت فقط بخش اشخاص ثالث همان شرط را پاسخ می‌گوید.",
  },
  {
    icon: Stamp,
    title: "گواهی رسمی برای ارائه در اجرا و مناقصه",
    text: "پس از صدور بیمه‌نامه، گواهی رسمی بیمه‌گر قابل ارائه به کارفرما، دستگاه برگزارکننده مناقصه یا پیمانکار اصلی است و در پرونده قرارداد بایگانی می‌شود؛ گواهی مکمل بیمه‌نامه است، نه جایگزین آن.",
    note: "* صدور گواهی پس از صدور بیمه‌نامه ممکن است؛ خود گواهی پوشش بیمه‌ای ایجاد نمی‌کند.",
  },
];

const TENDER_STEPS = [
  {
    title: "استخراج شرط بیمه از متن قرارداد",
    description:
      "عبارت مربوط به بیمه را از متن قرارداد یا اسناد مناقصه عیناً استخراج کنید؛ سقف درخواستی، مدت اعتبار و نام ذی‌نفع در همان عبارت مشخص شده است.",
  },
  {
    title: "ارسال شرح پروژه و سقف درخواستی",
    description:
      "نوع فعالیت، محل اجرا، مدت قرارداد و شرط بیمه استخراج‌شده را برای کارشناس ارسال کنید؛ این اطلاعات مبنای صدور پیش‌فاکتور و اعتبار پوشش در زمان خسارت است.",
  },
  {
    title: "صدور پیش‌فاکتور و تطبیق با متن قرارداد",
    description:
      "پیش‌فاکتور را سطر به سطر با شرط بیمه مقایسه کنید؛ سقف، شرح فعالیت و مدت باید عیناً با متن قرارداد بخواند و هر اختلافی پیش از صدور اصلاح شود.",
  },
  {
    title: "صدور بیمه‌نامه و گواهی رسمی",
    description:
      "پس از پرداخت، بیمه‌نامه صادر می‌شود و گواهی رسمی برای ارائه به کارفرما یا دستگاه مناقصه‌گذار آماده می‌گردد؛ رونوشت آن را در پرونده قرارداد بایگانی کنید.",
  },
  {
    title: "یادآور تمدید تا پایان قرارداد",
    description:
      "تاریخ انقضا را تقویم کنید؛ پوشش باید تا پایان دوره قرارداد و دوره تضمین آن بدون وقفه ادامه یابد و تمدید چند روز پیش از انقضا انجام شود.",
  },
];

const CONTRACT_FAQS = [
  {
    question: "گواهی بیمه مسئولیت برای مناقصه چه مشخصاتی دارد؟",
    answer:
      "گواهی بیمه مسئولیت برای مناقصه معمولاً شامل نام بیمه‌گزار، شرح فعالیت یا پروژه، سقف تعهد و دوره اعتبار بیمه‌نامه است و در قالب گواهی رسمی بیمه‌گر صادر می‌شود. دامنه دقیق مشخصات درخواستی هر مناقصه متفاوت است؛ بنابراین متن اسناد مناقصه را پیش از استعلام ارسال کنید تا گواهی دقیقاً با همان شرط تطبیق داده شود.",
  },
  {
    question: "اگر متن قرارداد سقف بالایی خواسته باشد؟",
    answer:
      "ممکن است؛ سقف تعهد بیمه‌نامه مسئولیت آزادانه و متناسب با درخواست کارفرما قابل تعیین است و حق بیمه بر پایه همان سقف محاسبه می‌شود. ابتدا عبارت شرط بیمه را از متن قرارداد استخراج کنید، سپس استعلام با همان سقف بگیرید. مبلغ نهایی هم فقط در پیش‌فاکتور رسمی مشخص می‌شود؛ هیچ رقم از پیش اعلام‌شده‌ای وجود ندارد.",
  },
  {
    question: "آیا بیمه‌نامه قراردادی به نام کارفرما هم صادر می‌شود؟",
    answer:
      "بله؛ پس از صدور بیمه‌نامه، گواهی رسمی بیمه‌گری قابل ارائه به کارفرما یا دستگاه برگزارکننده مناقصه است. درج نام کارفرما به‌عنوان ذی‌نفع یا اشاره به شرط قرارداد در بیمه‌نامه، به شرایط صدور و توافق با بیمه‌گر بستگی دارد؛ بنابراین این درخواست را همزمان با استعلام و پیش از صدور اعلام کنید تا در بیمه‌نامه یا الحاقیه لحاظ شود.",
  },
  {
    question: "برای قرارداد کوتاه‌مدت بیمه‌نامه چندماهه ممکن است؟",
    answer:
      "بله؛ بیمه‌نامه مسئولیت برای دوره‌های کوتاه‌تر از یک سال نیز صادر می‌شود و می‌تواند با مدت قرارداد شما هم‌تراز شود. مدت دقیق را همزمان با سقف و شرح پروژه اعلام کنید تا دوره اعتبار از تاریخ شروع کار آغاز شود. برای قراردادهای با تمدید خودکار، فراموش نکنید که تمدید بیمه‌نامه هم باید همزمان انجام شود.",
  },
  {
    question: "تمدید بیمه‌نامه قرارداد چگونه انجام می‌شود؟",
    answer:
      "تمدید بیمه‌نامه قرارداد مانند هر بیمه مسئولیت دیگری انجام می‌شود: چند روز کاری پیش از انقضا استعلام دهید، سقف و شرح پروژه را با وضعیت فعلی کار تطبیق دهید و بیمه‌نامه جدید را پیش از پایان دوره قبلی صادر کنید. اگر قرارداد تا پایان دوره تضمین ادامه دارد، پوشش نباید حتی یک روز وقفه داشته باشد.",
  },
  {
    question: "آیا بیمه مسئولیت جایگزین بیمه تضمین است؟",
    answer:
      "خیر؛ این دو محصول جایگزین هم نیستند. بیمه تضمین مانند وجه‌الضمان و حسن انجام کار، تعهد بیمه‌گر به پرداخت مبلغ مشخص به کارفرما در صورت تخلف پیمانکار است و این نمایندگی آن را ارائه نمی‌کند. بیمه مسئولیت اما فقط خسارت جانی و مالی به اشخاص ثالث را پاسخ می‌دهد؛ این دو معمولاً دو شرط جداگانه در یک قراردادند.",
  },
];

const CONTRACT_MISTAKES = [
  "خرید سقف کمتر از متن قرارداد — شرط بیمه برآورده نمی‌شود، ارائه گواهی ممکن نمی‌گردد و کسری خسارت در حادثه بر عهده خود بیمه‌گزار می‌ماند.",
  "فراموشی درج نام کارفرما یا شرح دقیق پروژه — بیمه‌نامه‌ای که با متن قرارداد منطبق نباشد، هم در ارائه به کارفرما و هم در زمان خسارت محل بحث می‌شود.",
  "تمدید نکردن بیمه‌نامه تا پایان دوره تضمین قرارداد — حوادث دوره تضمین هم مشمول مسئولیت است؛ وقفه پوشش پس از تحویل، این دوره را بی‌پوشش می‌گذارد.",
];

const REVIEW_DATE_ISO = "2026-10-27";

export default function ContractTenderPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      <JsonLd
        data={howToJsonLd({
          name: "مسیر صدور بیمه‌نامه مسئولیت برای قرارداد در پنج گام",
          description:
            "روش گام‌به‌گام تهیه بیمه‌نامه مسئولیت برای قرارداد: استخراج شرط بیمه، ارسال شرح پروژه، تطبیق پیش‌فاکتور با متن، صدور گواهی رسمی و تمدید تا پایان دوره تضمین.",
          steps: TENDER_STEPS,
          url: "/contract-tender",
        })}
      />
      <JsonLd data={faqJsonLd(CONTRACT_FAQS)} />

      <Breadcrumbs items={[{ name: "بیمه مسئولیت در قراردادها و مناقصات", href: "/contract-tender" }]} />

      <header className="mt-6">
        <h1 className="text-2xl font-extrabold leading-[1.6] sm:text-3xl">
          بیمه مسئولیت در قراردادها و مناقصات — راهنمای کارفرما و پیمانکار
        </h1>
      </header>

      <div className="mt-6 max-w-3xl">
        <AnswerBlock title="پاسخ کوتاه" text={ANSWER_TEXT} />
      </div>

      {/* کجای قرارداد */}
      <section aria-labelledby="place-h" className="mt-10">
        <SectionHeading
          icon={FileSignature}
          title="کجای قرارداد بیمه مسئولیت می‌آید؟"
          hint="بیمه مسئولیت معمولاً یکی از شروط بیمه در همان قرارداد است، نه سندی جدا از پروژه."
        />
        <p className="max-w-3xl text-[15px] leading-8 text-foreground/90">
          در اسناد قرارداد و مناقصه، شرط بیمه معمولاً چند بیمه‌نامه را هم‌زمان الزام می‌کند و
          بیمه مسئولیت یکی از آن‌هاست. سه جایگاه زیر رایج‌ترین نقش بیمه مسئولیت در یک
          قرارداد است؛ دامنه دقیق هر مورد به متن همان قرارداد بستگی دارد.
        </p>
        <div className="mt-4 grid gap-4 sm:grid-cols-3">
          {CONTRACT_PLACES.map((p) => (
            <div key={p.title} className="rounded-2xl border bg-card p-5">
              <div className="flex items-center gap-2">
                <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-accent text-accent-foreground">
                  <p.icon className="size-5" aria-hidden="true" />
                </span>
                <h3 className="text-sm font-extrabold">{p.title}</h3>
              </div>
              <p className="mt-3 text-sm leading-7 text-muted-foreground">{p.text}</p>
              <p className="mt-3 border-t pt-3 text-xs leading-6 text-muted-foreground">{p.note}</p>
            </div>
          ))}
        </div>
      </section>

      {/* تفاوت با بیمه تضمین */}
      <section aria-labelledby="guarantee-h" className="mt-12 max-w-3xl">
        <SectionHeading
          icon={Gavel}
          title="تفاوت بیمه مسئولیت با بیمه تضمین در قراردادها"
          hint="این دو محصول جایگزین هم نیستند و در اسناد مناقصه دو شرط جداگانه‌اند."
        />
        <div className="rounded-2xl border-2 border-primary/25 bg-accent/60 p-5 sm:p-6">
          <p className="text-[15px] leading-8 text-foreground/90">
            بیمه تضمین — مانند وجه‌الضمان، حسن انجام تعهدات و پیش‌پرداخت — تعهد بیمه‌گر به
            پرداخت مبلغ مشخص به کارفرما در صورت اجرا نکردن تعهدات پیمانکار است و این
            نمایندگی آن را ارائه نمی‌کند. بیمه مسئولیت اما فقط خسارت جانی و مالی وارد بر
            اشخاص ثالث در جریان اجرای کار را پاسخ می‌دهد و موضوع همین صفحات است.
          </p>
          <ul className="mt-4 space-y-3">
            <li className="flex items-start gap-2 text-sm leading-7 text-muted-foreground">
              <span className="mt-2.5 size-1.5 shrink-0 rounded-full bg-primary" aria-hidden="true" />
              اگر سند مناقصه «بیمه تضمین» خواست، این درخواست را ما برآورده نمی‌کنیم؛ به بیمه‌گر یا نمایندگی گارانتی مراجعه کنید.
            </li>
            <li className="flex items-start gap-2 text-sm leading-7 text-muted-foreground">
              <span className="mt-2.5 size-1.5 shrink-0 rounded-full bg-primary" aria-hidden="true" />
              اگر همان سند «بیمه مسئولیت» یا «بیمه اشخاص ثالث» را شرط کرده بود، آن شرط دقیقاً موضوع کار ماست و با متن قرارداد تطبیق داده می‌شود.
            </li>
            <li className="flex items-start gap-2 text-sm leading-7 text-muted-foreground">
              <span className="mt-2.5 size-1.5 shrink-0 rounded-full bg-primary" aria-hidden="true" />
              داشتن بیمه مسئولیت، شرط تضمین را برآورده نمی‌کند و برعکس؛ هر شرط سند خودش را می‌خواهد.
            </li>
          </ul>
        </div>
      </section>

      {/* هشدار */}
      <section aria-labelledby="warn-h" className="mt-12 max-w-3xl">
        <div className="rounded-2xl border bg-card p-5">
          <div className="flex items-center gap-2">
            <ShieldAlert className="size-5 text-primary" aria-hidden="true" />
            <h2 id="warn-h" className="text-sm font-extrabold">
              سه اشتباه رایج در تهیه بیمه‌نامه برای قرارداد
            </h2>
          </div>
          <ul className="mt-4 space-y-3">
            {CONTRACT_MISTAKES.map((t) => (
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
          title="مسیر صدور بیمه‌نامه برای قرارداد در پنج گام"
        />
        <NumberedSteps steps={TENDER_STEPS} variant="buy" />
      </section>

      {/* پل داخلی */}
      <section aria-label="پیوندهای مرتبط بیمه مسئولیت" className="mt-12 max-w-3xl">
        <div className="flex flex-wrap gap-3">
          <Link
            href="/liability/commercial/contractors"
            className="inline-flex items-center gap-2 rounded-full border bg-card px-5 py-2.5 text-sm font-semibold transition-colors hover:border-primary/40 hover:text-primary"
          >
            <Building2 className="size-4" aria-hidden="true" />
            بیمه مسئولیت پیمانکاران
            <ArrowLeft className="size-4" aria-hidden="true" />
          </Link>
          <Link
            href="/liability/commercial/construction-operations"
            className="inline-flex items-center gap-2 rounded-full border bg-card px-5 py-2.5 text-sm font-semibold transition-colors hover:border-primary/40 hover:text-primary"
          >
            <Building2 className="size-4" aria-hidden="true" />
            بیمه مسئولیت عملیات ساختمانی
            <ArrowLeft className="size-4" aria-hidden="true" />
          </Link>
          <Link
            href="/liability/commercial/employers"
            className="inline-flex items-center gap-2 rounded-full border bg-card px-5 py-2.5 text-sm font-semibold transition-colors hover:border-primary/40 hover:text-primary"
          >
            <Users className="size-4" aria-hidden="true" />
            بیمه مسئولیت کارفرما
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
            href="/coverage-limit"
            className="inline-flex items-center gap-2 rounded-full border bg-card px-5 py-2.5 text-sm font-semibold transition-colors hover:border-primary/40 hover:text-primary"
          >
            <Scale className="size-4" aria-hidden="true" />
            راهنمای انتخاب سقف تعهد
            <ArrowLeft className="size-4" aria-hidden="true" />
          </Link>
        </div>
      </section>

      {/* FAQ */}
      <section className="mx-auto mt-12 max-w-4xl">
        <FaqSection faqs={CONTRACT_FAQS} title="سوالات متداول بیمه مسئولیت در قراردادها و مناقصات" />
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
          title="بیمه‌نامه قرارداد خود را بدون تأخیر آماده کنید"
          text="شرط بیمه متن قرارداد یا اسناد مناقصه را برای ما ارسال کنید؛ پیش‌فاکتور با سقف درخواستی کارفرما صادر می‌شود و پس از صدور بیمه‌نامه، گواهی رسمی برای ارائه دریافت می‌کنید — رایگان و بدون تعهد."
          href="/quote"
        />
      </div>
    </div>
  );
}
