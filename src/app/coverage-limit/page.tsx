import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowLeft,
  Coins,
  Gauge,
  Layers,
  ShieldAlert,
  Table2,
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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { DIYEH_DISCLAIMER, DIYEH_TABLE } from "@/lib/diyeh";
import { faqJsonLd, howToJsonLd, JsonLd } from "@/lib/seo";

export const revalidate = 3600;

// ─── /coverage-limit — راهنمای عمومی انتخاب سقف تعهد ────────────────
// صفحه محتوایی عمیق لایه نیت اطلاعاتی؛ بدون رقم اختراعی نرخ.
// تنها اعداد مجاز: جدول دیه از SSOT (src/lib/diyeh.ts) با همان هشدار رسمی.

export const metadata: Metadata = {
  title: "سقف تعهد بیمه مسئولیت چقدر باشد؟ راهنمای انتخاب",
  description:
    "راهنمای انتخاب سقف تعهد بیمه مسئولیت: حداقل معادل دیه کامل سال وقوع، الزامات قرارداد کارفرما، تراکم جمعیت و ظرفیت مرکز — و عواقب کسری سقف بر بیمه‌گزار.",
  alternates: {
    canonical: "/coverage-limit",
    languages: {
      "fa-IR": "/coverage-limit",
      en: "/en/coverage-limit",
      "x-default": "/coverage-limit",
    },
  },
  openGraph: {
    title: "سقف تعهد بیمه مسئولیت چقدر باشد؟ راهنمای انتخاب",
    description:
      "حداقل منطقی سقف، عوامل مؤثر به تفکیک نوع فعالیت، عواقب سقف ناکافی و رابطه سقف با حق بیمه — بر مبنای جدول دیه رسمی و شرایط عمومی بیمه ایران.",
    url: "/coverage-limit",
    type: "article",
    images: [{ url: "/og/coverage-limit.png", width: 1200, height: 630, alt: "راهنمای انتخاب سقف تعهد بیمه مسئولیت" }],
  },
};

const LIMIT_FACTORS: { group: string; logic: string; note: string }[] = [
  {
    group: "حرفه‌های درمانی و خدماتی (پزشک، دندان‌پزشک، پیراپزشک)",
    logic: "حداقل معادل دیه کامل سال وقوع؛ با توجه به امکان صدور حکم ضربات زیان‌بار برای چند عضو، سقف بالاتر از دیه واحد توصیه می‌شود.",
    note: "در مراکز درمانی با پذیرش هم‌زمان چند بیمار، ظرفیت روزانه نیز در انتخاب سقف مؤثر است.",
  },
  {
    group: "کارفرمایان و کارگاه‌ها (بیمه مسئولیت کارفرما)",
    logic: "سقف باید تعداد کارکنان و خطرناکی فعالیت را پوشش دهد؛ در قراردادهای پیمانکاری معمولاً کارفرمای اصلی سقف حداقلی در قرارداد درج می‌کند.",
    note: "ماده ۹۱ قانون کار مسئولیت کارفرما در حوادث ناشی از کار را مستقل از تقصیر برقرار می‌کند.",
  },
  {
    group: "مراکز پذیرش و خدمات (رستوران، هتل، ورزشی، مهدکودک)",
    logic: "ظرفیت روزانه، سن مخاطبان و تراکم جمعیت محل؛ در مهدکودک‌ها مسئول نگاه‌داری بر پایه ماده ۲ قانون مسئولیت مدنی سخت‌گیرانه است.",
    note: "حضور گروه‌های سازمان‌یافته و بازدیدکنندگان موقت را نیز در برآورد سقف لحاظ کنید.",
  },
  {
    group: "ساختمان، آسانسور و املاک",
    logic: "سقف باید خرابی ساخت، سرایت آتش به املاک مجاور و حوادث آسانسور را جوابگو باشد؛ در بافت متراکم شهری خسارت همسایه‌ها چند برابر یک واحد است.",
    note: "برای آسانسور، مسؤولیت متصدی و شرکت نگهداری هر دو باید سقف کافی داشته باشند.",
  },
  {
    group: "رویدادها و تجمعات موقت",
    logic: "سقف بر مبنای حداکثر تعداد حاضران در اوج رویداد، نه میانگین؛ خسارت جمعی در یک لحظه رخ می‌دهد.",
    note: "در قرارداد اجاره مکان، معمولاً الزام سقف توسط مکان‌دهنده تعیین می‌شود.",
  },
];

const LIMIT_STEPS = [
  {
    title: "شناسایی بدترین سناریوی ممکن",
    description:
      "حداکثر تعداد آسیب‌دیدگان احتمالی در یک حادثه و بدترین نوع خسارت (فوت، نقص عضو، آسیب مال) را برای فعالیت خود مشخص کنید.",
  },
  {
    title: "تطبیق سقف با دیه سال وقوع",
    description:
      "سقف انتخابی را با جدول دیه همان سال تطبیق دهید؛ جدول هر سال با ابلاغیه رسمی تغییر می‌کند و بیمه‌نامه باید در تمدید، بالاتر از دیه جدید قرار گیرد.",
  },
  {
    title: "بررسی الزامات قراردادی و مقرراتی",
    description:
      "در قراردادهای پیمانکاری، مجوزهای صنفی و آیین‌نامه‌های ایمنی معمولاً سقف حداقلی تعیین شده است؛ کمتر از آن بیمه‌نامه کاربرد قراردادی ندارد.",
  },
  {
    title: "تعادل سقف و فرانشیز",
    description:
      "به‌جای سقف ناکافی، فرانشیز را متناسب با توان مالی خود تنظیم کنید؛ سقف پایین یعنی کسری خسارت روی دوش بیمه‌گزار باقی می‌ماند.",
  },
  {
    title: "ثبت سقف در استعلام و بازبینی سالانه",
    description:
      "سقف دلخواه را در فرم استعلام ثبت کنید تا پیش‌فاکتور دقیق بگیرید و هر سال در زمان تمدید، سقف را با دیه جدید و شرایط تازه فعالیت تطبیق دهید.",
  },
];

const LIMIT_FAQS = [
  {
    question: "سقف تعهد در بیمه مسئولیت یعنی چه؟",
    answer:
      "سقف تعهد حداکثر مبلغی است که بیمه‌گر در ازای هر خسارت و در کل دوره بیمه‌نامه می‌پردازد. اگر حکم خسارت از سقف بیشتر شود، مازاد آن بر عهده خود بیمه‌گزار است. به همین دلیل سقف باید دست‌کم معادل دیه کامل سال وقوع حادثه انتخاب شود، نه مبلغی ثابت چندساله.",
  },
  {
    question: "حداقل سقف منطقی برای بیمه مسئولیت چقدر است؟",
    answer:
      "مبنای عمومی، دیه کامل سال وقوع خسارت است که در ماه‌های عادی ۱۴۰۴ یک میلیارد تومان و در ماه‌های حرام ۱٫۲ میلیارد تومان اعلام شده است. برای فعالیت‌های پرخطر یا پرتراکم، سقف چند برابر دیه توصیه می‌شود؛ رقم نهایی به نوع فعالیت، ظرفیت و الزامات قرارداد بستگی دارد.",
  },
  {
    question: "اگر سقف بیمه‌نامه کمتر از دیه باشد چه می‌شود؟",
    answer:
      "بیمه‌گر تا سقف مندرج در بیمه‌نامه پرداخت می‌کند و کسری آن مستقیماً بر عهده بیمه‌گزار باقی می‌ماند؛ دارایی‌ها و درآمد شخص یا شرکت در معرض مطالبه قرار می‌گیرد. با رشد سالانه دیه، سقف چند سال پیش ممکن است امروز به نصف نیاز واقعی رسیده باشد.",
  },
  {
    question: "آیا سقف بالاتر یعنی حق بیمه بسیار بیشتر؟",
    answer:
      "خیر؛ رابطه سقف و حق بیمه خطی نیست. افزایش سقف از سطح پایه معمولاً با ضریب ملایمی همراه است، چون احتمال وقوع بدترین سناریو پایین است. در استعلام می‌توانید دو یا سه سناریوی سقف مختلف را مقایسه کنید و تفاوت واقعی نرخ را ببینید.",
  },
  {
    question: "سقف تعهد در طول دوره بیمه‌نامه چند بار پرداخت می‌شود؟",
    answer:
      "بستگی به شرایط عمومی بیمه‌نامه دارد: در برخی پوشش‌ها سقف «در هر خسارت» است و در برخی سقف «در طول دوره» نیز درج می‌شود. این دو عدد می‌توانند متفاوت باشند؛ پیش از خرید حتماً بپرسید سقف بیمه‌نامه شما برای هر خسارت است یا مجموع دوره و آیا تمدید دوره تعهد الحاقی دارد.",
  },
  {
    question: "هر سال باید سقف بیمه‌نامه را افزایش دهم؟",
    answer:
      "در زمان تمدید، سقف را با دیه جدید تطبیق دهید؛ چون دیه هر سال با ابلاغیه رسمی افزایش می‌یابد، حفظ سقف سال قبل عملاً یعنی کاهش پوشش واقعی. اگر فعالیت شما بزرگ‌تر شده، ظرفیت یا نفرات جدید را نیز اعلام کنید تا سقف و نرخ متناسب بازنگری شود.",
  },
];

const REVIEW_DATE_ISO = "2026-10-25";

export default function CoverageLimitPage() {
  const latest = DIYEH_TABLE[DIYEH_TABLE.length - 1];

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      <JsonLd
        data={howToJsonLd({
          name: "پنج گام انتخاب سقف تعهد بیمه مسئولیت",
          description:
            "روش گام‌به‌گام تعیین سقف تعهد بر مبنای بدترین سناریو، دیه سال وقوع و الزامات قراردادی.",
          steps: LIMIT_STEPS,
          url: "/coverage-limit",
        })}
      />
      <JsonLd data={faqJsonLd(LIMIT_FAQS)} />
      {/* BreadcrumbList خودکار توسط کامپوننت Breadcrumbs صادر می‌شود */}
      <Breadcrumbs
        items={[{ name: "راهنمای سقف تعهد", href: "/coverage-limit" }]}
      />

      <header className="mt-6">
        <h1 className="text-2xl font-extrabold leading-[1.6] sm:text-3xl">
          سقف تعهد بیمه مسئولیت چقدر باشد؟
        </h1>
      </header>

      <div className="mt-6 max-w-3xl">
        <AnswerBlock
          title="پاسخ کوتاه"
          text="سقف تعهد حداکثر پرداخت بیمه‌گر در هر خسارت و در کل دوره بیمه‌نامه است. مبنای حداقلی، دیه کامل سال وقوع خسارت است؛ برای فعالیت پرتراکم یا پرخطر باید چند برابر آن انتخاب شود. سقف ناکافی یعنی کسری خسارت مستقیماً بر عهده بیمه‌گزار می‌ماند؛ در تمدید هر سال، سقف را با دیه جدید تطبیق دهید."
        />
      </div>

      {/* تعریف */}
      <section aria-labelledby="def-h" className="mt-10 max-w-3xl">
        <SectionHeading
          icon={Layers}
          title="سقف تعهد چیست و چه فرقی با فرانشیز دارد؟"
          hint="دو عدد کلیدی بیمه‌نامه که نقش متفاوتی دارند."
        />
        <p className="text-[15px] leading-8 text-foreground/90">
          سقف تعهد سقفِ پرداخت بیمه‌گر است و فرانشیز سهم اول خسارتی است که خود شما می‌پذیرید.
          فرانشیز روی «شروع پرداخت» اثر دارد و سقف روی «پایان پرداخت»؛ افزایش فرانشیز نرخ را کم
          می‌کند اما افزایش سقف، اندازه سپر مالی شما را بزرگ‌تر می‌کند. هر دو عدد در پیش‌فاکتور
          تفکیک می‌شوند و باید هنگام خرید با هم سنجیده شوند.
        </p>
      </section>

      {/* دیه به‌عنوان مبنا */}
      <section aria-labelledby="dih-h" className="mt-12">
        <SectionHeading
          icon={Coins}
          title="چرا حداقلِ منطقی، دیه کامل سال وقوع است؟"
          hint="دیه سالانه تغییر می‌کند؛ سقف ثابت یعنی پوشش واقعی نزولی."
        />
        <div className="grid gap-6 lg:grid-cols-[1fr_1.1fr]">
          <div className="max-w-xl">
            <p className="text-[15px] leading-8 text-foreground/90">
              در پوشش‌های مرتبط با صدمه بدنی، رایج‌ترین حکم خسارت همان دیه است. اگر سقف بیمه‌نامه
              از دیه کامل سال وقوع کمتر باشد، در همان نخستین حادثه جدی با کسری تعهد روبه‌رو
              می‌شوید. جدول زیر آخرین سال اعلام‌شده است:
            </p>
            <div className="mt-4 overflow-hidden rounded-2xl border">
              <Table>
                <TableHeader>
                  <TableRow className="bg-accent/60">
                    <TableHead className="text-start">سال</TableHead>
                    <TableHead className="text-start whitespace-nowrap">دیه کامل — ماه عادی</TableHead>
                    <TableHead className="text-start whitespace-nowrap">ماه حرام</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-bold">{latest.year}</TableCell>
                    <TableCell className="whitespace-nowrap">
                      {latest.standard} تومان
                    </TableCell>
                    <TableCell className="whitespace-nowrap">{latest.sacred} تومان</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
            <p className="mt-3 text-xs leading-6 text-muted-foreground">{DIYEH_DISCLAIMER}</p>
            <Link
              href="/dih"
              className="mt-3 inline-flex items-center gap-1.5 text-sm font-bold text-primary hover:underline"
            >
              جدول کامل دیه ۱۴۰۲ تا ۱۴۰۴ و اثر آن بر سقف
              <ArrowLeft className="size-4" aria-hidden="true" />
            </Link>
          </div>

          <div className="rounded-2xl border bg-card p-5">
            <div className="flex items-center gap-2">
              <ShieldAlert className="size-5 text-primary" aria-hidden="true" />
              <h3 className="text-sm font-extrabold">عواقب سقف ناکافی</h3>
            </div>
            <ul className="mt-4 space-y-3">
              {[
                "پرداخت مازاد بر سقف از دارایی شخصی یا شرکت — شامل توقیف اموال در مرحله اجرای حکم.",
                "در صدمات بدنی متعدد، ممکن است برای چند عضو حکم ضربات زیان‌بار صادر شود؛ دیه واحد جوابگو نیست.",
                "سقف «در طول دوره» با چند خسارت کوچک مصرف می‌شود و در خسارت بزرگ بعدی، پوشش باقی نمی‌ماند.",
                "در قراردادهای پیمانکاری، سقف کمتر از حداقل قرارداد به معنای نقض تعهد بیمه‌ای است.",
              ].map((t) => (
                <li key={t} className="flex items-start gap-2 text-sm leading-7 text-muted-foreground">
                  <span className="mt-2.5 size-1.5 shrink-0 rounded-full bg-primary" aria-hidden="true" />
                  {t}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* عوامل به تفکیک فعالیت */}
      <section aria-labelledby="factors-h" className="mt-12">
        <SectionHeading
          icon={Table2}
          title="منطق انتخاب سقف به تفکیک نوع فعالیت"
          hint="یک عدد «عمومی خوب» وجود ندارد؛ منطق هر گروه متفاوت است."
        />
        <div className="overflow-x-auto rounded-2xl border nice-scroll">
          <Table>
            <TableHeader>
              <TableRow className="bg-accent/60">
                <TableHead className="text-start whitespace-nowrap">گروه فعالیت</TableHead>
                <TableHead className="text-start">منطق انتخاب سقف</TableHead>
                <TableHead className="text-start">نکته تکمیلی</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {LIMIT_FACTORS.map((f) => (
                <TableRow key={f.group}>
                  <TableCell className="align-top font-bold leading-7">{f.group}</TableCell>
                  <TableCell className="align-top text-sm leading-7 text-muted-foreground">
                    {f.logic}
                  </TableCell>
                  <TableCell className="align-top text-sm leading-7 text-muted-foreground">
                    {f.note}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </section>

      {/* رابطه سقف و نرخ */}
      <section aria-labelledby="rate-h" className="mt-12 max-w-3xl">
        <SectionHeading
          icon={TrendingUp}
          title="رابطه سقف با حق بیمه خطی نیست"
          hint="افزایش سقف معمولاً ارزان‌تر از آن است که فکر می‌کنید."
        />
        <p className="text-[15px] leading-8 text-foreground/90">
          حق بیمه بر مبنای احتمال وقوع و شدت خسارت محاسبه می‌شود؛ چون احتمال رسیدن خسارت به سقف
          بالا نسبتاً کم است، ضریب هر پله افزایش سقف ملایم‌تر از پله قبل است. نتیجه عملی: فاصله
          سقف «دیه کامل» با سقف «دو برابر دیه» معمولاً کوچک‌تر از فاصله «بدون بیمه» با «دیه
          کامل» است. برای تصمیم دقیق، در فرم استعلام سقف دلخواه را ثبت کنید تا پیش‌فاکتور با
          نرخ مصوب بیمه ایران صادر شود.
        </p>
        <div className="mt-4 flex flex-wrap gap-3">
          <Link
            href="/quote"
            className="inline-flex items-center gap-2 rounded-full border bg-card px-5 py-2.5 text-sm font-semibold transition-colors hover:border-primary/40 hover:text-primary"
          >
            <Gauge className="size-4" aria-hidden="true" />
            استعلام با سقف دلخواه
            <ArrowLeft className="size-4" aria-hidden="true" />
          </Link>
          <Link
            href="/price"
            className="inline-flex items-center gap-2 rounded-full border bg-card px-5 py-2.5 text-sm font-semibold transition-colors hover:border-primary/40 hover:text-primary"
          >
            <Coins className="size-4" aria-hidden="true" />
            عوامل مؤثر بر قیمت بیمه مسئولیت
            <ArrowLeft className="size-4" aria-hidden="true" />
          </Link>
        </div>
      </section>

      {/* گام‌ها */}
      <section aria-labelledby="steps-h" className="mt-12 max-w-3xl">
        <SectionHeading icon={Layers} title="پنج گام انتخاب سقف تعهد" />
        <NumberedSteps steps={LIMIT_STEPS} variant="buy" />
      </section>

      {/* FAQ */}
      <section className="mx-auto mt-12 max-w-4xl">
        <FaqSection faqs={LIMIT_FAQS} title="سوالات متداول سقف تعهد" />
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
          title="سقف مناسب فعالیت خود را دقیق استعلام کنید"
          text="سقف دلخواه و نوع فعالیت را در فرم استعلام ثبت کنید؛ پیش‌فاکتور رسمی با تفکیک سقف و فرانشیز و نرخ مصوب بیمه ایران برای شما ارسال می‌شود."
        />
      </div>
    </div>
  );
}
