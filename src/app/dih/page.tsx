import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, BookMarked, CalendarClock, Gavel, Moon, Scale, Users } from "lucide-react";
import { AnswerBlock } from "@/components/answer-block";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { CtaBanner } from "@/components/cta-banner";
import { FaqSection } from "@/components/faq-section";
import { SectionHeading } from "@/components/section-heading";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { DIYEH_ANSWER, DIYEH_DISCLAIMER, DIYEH_TABLE, SACRED_MONTHS_FA } from "@/lib/diyeh";
import { datasetJsonLd, faqJsonLd, JsonLd } from "@/lib/seo";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "جدول دیه ۱۴۰۴ — مبلغ کامل، ماه حرام و روند سال‌های گذشته",
  description:
    "جدول کامل دیه ۱۴۰۲ تا ۱۴۰۴ به تومان، تفاوت ماه حرام، دیه نقص عضو و اثر مستقیم دیه بر انتخاب سقف بیمه مسئولیت — بر اساس آخرین ابلاغیه‌های رسمی.",
  alternates: {
    canonical: "/dih",
    languages: {
      "fa-IR": "/dih",
      en: "/en/dih",
      "x-default": "/dih",
    },
  },
  openGraph: {
    title: "جدول دیه ۱۴۰۴ — مرجع کامل مبلغ دیه و اثر آن بر بیمه مسئولیت",
    description: "دیه کامل ماه عادی و ماه حرام ۱۴۰۲ تا ۱۴۰۴ + راهنمای انتخاب سقف تعهد بیمه مسئولیت.",
    type: "article",
  },
};

const DIYEH_FAQS = [
  {
    question: "دیه ۱۴۰۵ چقدر است؟",
    answer:
      "تا زمان انتشار ابلاغیه رسمی سال ۱۴۰۵، آخرین رقم قطعی همان مبالغ ابلاغیه ۱۴۰۴ است. به‌محض انتشار ابلاغیه رئیس قوه قضائیه، این جدول حداکثر ظرف یک ماه به‌روزرسانی می‌شود؛ برای هر محاسبه عملی، متن ابلاغیه سال وقوع خسارت ملاک است.",
  },
  {
    question: "دیه ۱۴۰۴ چقدر است؟",
    answer:
      "دیه کامل در ماه‌های عادی سال ۱۴۰۴ بر اساس آخرین ابلاغیه رسمی اعلام‌شده یک میلیارد تومان و در ماه‌های حرام ۱٫۲ میلیارد تومان است. مبلغ هر سال با ابلاغیه رئیس قوه قضائیه تعیین می‌شود؛ پیش از هر محاسبه عملی، متن ابلاغیه سال وقوع خسارت را ملاک قرار دهید.",
  },
  {
    question: "چرا دیه در ماه‌های حرام بیشتر است؟",
    answer:
      "مطابق قانون مجازات اسلامی، دیه کامل در چهار ماه حرام یک‌سوم بیشتر از ماه‌های عادی است. این افزایش در جدول دیه لحاظ می‌شود و هنگام انتخاب سقف بیمه مسئولیت، بیشترین حالت یعنی دیه ماه حرام باید ملاک قرار گیرد تا پوشش کافی باقی بماند.",
  },
  {
    question: "دیه زن و مرد چه تفاوتی دارد؟",
    answer:
      "مطابق رویه جاری قانون مجازات اسلامی، دیه زن در ماه‌های عادی معادل نصف دیه مرد و در ماه‌های حرام برابر آن است. برای پرونده‌های خاص، تشخیص نهایی با دادگاه است؛ بیمه‌گر نیز بر اساس رأی قطعی مرجع قضایی، خسارت را تا سقف بیمه‌نامه می‌پردازد.",
  },
  {
    question: "سقف بیمه مسئولیت من باید حداقل چند باشد؟",
    answer:
      "حداقل منطقی سقف تعهد، معادل دیه کامل سال وقوع خسارت است و به‌ترجیح باید معادل دیه ماه حرام یا بیشتر تنظیم شود؛ چون ممکن است چند نفر هم‌زمان آسیب ببینند یا دادگاه حکم ضربات زیان‌بار را تشدید کند. کارشناس ما بر اساس ریسک فعالیت شما سقف مناسب را پیشنهاد می‌دهد.",
  },
  {
    question: "دیه نقص عضو چگونه محاسبه می‌شود؟",
    answer:
      "دیه صدمات ناقص مانند قطع عضو یا از دست دادن حواس، درصدی از دیه کامل است که در قانون مجازات اسلامی برای هر صدمه تعیین شده است. بیمه مسئولیت این مبالغ را مطابق رأی کارشناس یا کمیسیون پزشکی و تا سقف بیمه‌نامه می‌پردازد.",
  },
];

const KEY_POINTS = [
  {
    icon: Moon,
    title: "چهار ماه حرام",
    text: `${SACRED_MONTHS_FA}: در این چهار ماه دیه کامل یک‌سوم بیشتر است و بزرگ‌ترین سقف ممکن را طلب می‌کند.`,
  },
  {
    icon: CalendarClock,
    title: "سال وقوع، ملاک است",
    text: "ابلاغیه سال وقوع خسارت مبنای محاسبه است، نه سال خرید بیمه‌نامه؛ سقف باید با رشد سالانه دیه هم‌خوان بماند.",
  },
  {
    icon: Users,
    title: "چند زیان‌دیده",
    text: "اگر چند نفر هم‌زمان آسیب ببینند، خسارت هر نفر جداگانه محاسبه می‌شود؛ سقف پایین سریع استنفاد می‌شود.",
  },
  {
    icon: Gavel,
    title: "حکم زیان‌بار",
    text: "در موارد مقرر قانونی، دادگاه می‌تواند دیه را چند برابر کند؛ سقف تعهد باید این ریسک را نیز در نظر بگیرد.",
  },
];

const RELATED_PRODUCTS = [
  { slug: "medical-doctors", category: "professional", name: "بیمه مسئولیت پزشکان" },
  { slug: "employers", category: "commercial", name: "بیمه مسئولیت کارفرما" },
  { slug: "public-liability", category: "commercial", name: "بیمه مسئولیت مدنی عمومی" },
];

export default function DiyehPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      <JsonLd
        data={datasetJsonLd({
          name: "جدول دیه کامل ایران (۱۴۰۲–۱۴۰۴)",
          description:
            "مبالغ دیه کامل در ماه عادی و ماه حرام بر حسب تومان بر اساس ابلاغیه‌های رسمی؛ پیش از استناد با ابلاغیه سال وقوع تطبیق داده شود.",
          url: "/dih",
          dateModified: "2026-10-25",
        })}
      />
      <JsonLd data={faqJsonLd(DIYEH_FAQS)} />

      <Breadcrumbs items={[{ name: "جدول دیه ۱۴۰۴", href: "/dih" }]} />

      <header className="mt-6 max-w-3xl">
        <h1 className="text-2xl font-extrabold leading-[1.6] sm:text-3xl">
          جدول دیه ۱۴۰۴ — مبلغ کامل، ماه حرام و اثر آن بر بیمه مسئولیت
        </h1>
      </header>

      <div className="mt-6 max-w-3xl">
        <AnswerBlock title="پاسخ کوتاه" text={DIYEH_ANSWER} />
        <p className="mt-3 text-xs leading-6 text-muted-foreground">
          آخرین بازبینی این جدول: <strong className="text-foreground">۳ آبان ۱۴۰۵ (۲۰۲۶-۱۰-۲۵)</strong> — مبالغ هر سال با ابلاغیه رسمی جدید، حداکثر ظرف یک ماه به‌روزرسانی می‌شود.
        </p>
      </div>

      {/* Table */}
      <section aria-labelledby="table-h" className="mt-10">
        <SectionHeading icon={Scale} title="جدول دیه کامل — ۱۴۰۲ تا ۱۴۰۴ (تومان)" />
        <div className="max-w-2xl overflow-hidden rounded-2xl border">
          <Table>
            <TableHeader>
              <TableRow className="bg-accent/60">
                <TableHead className="text-start">سال</TableHead>
                <TableHead className="text-start">دیه کامل (ماه عادی)</TableHead>
                <TableHead className="text-start">دیه کامل (ماه حرام)</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {DIYEH_TABLE.map((r) => (
                <TableRow key={r.year} className={r.year === "۱۴۰۴" ? "bg-primary/5 font-bold" : undefined}>
                  <TableCell>{r.year}</TableCell>
                  <TableCell dir="rtl">{r.standard} تومان</TableCell>
                  <TableCell dir="rtl">{r.sacred} تومان</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <p className="mt-3 max-w-2xl text-xs leading-6 text-muted-foreground">{DIYEH_DISCLAIMER}</p>
      </section>

      {/* Key points */}
      <section aria-labelledby="points-h" className="mt-12">
        <SectionHeading
          icon={BookMarked}
          title="نکات کلیدی دیه برای انتخاب پوشش بیمه‌ای"
          hint="هر نکته مبنای قانونی مشخصی در کتاب دیات قانون مجازات اسلامی دارد."
        />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {KEY_POINTS.map((k) => (
            <Card key={k.title} className="py-5">
              <CardHeader className="pb-2">
                <span className="mb-2 grid size-10 place-items-center rounded-xl bg-primary/10 text-primary">
                  <k.icon className="size-5" aria-hidden="true" />
                </span>
                <CardTitle className="text-[15px]">{k.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-[13px] leading-7 text-muted-foreground">{k.text}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="mx-auto mt-12 max-w-4xl">
        <FaqSection faqs={DIYEH_FAQS} title="سوالات متداول جدول دیه" />
      </section>

      {/* Cross links */}
      <section aria-labelledby="rel-h" className="mt-12">
        <SectionHeading
          icon={ArrowLeft}
          title="بیمه‌های مسئولیتی که دیه را می‌پردازند"
          hint="سقف تعهد این بیمه‌نامه‌ها را بر مبنای جدول بالا تنظیم کنید."
        />
        <div className="flex flex-wrap gap-2.5">
          {RELATED_PRODUCTS.map((p) => (
            <Link
              key={p.slug}
              href={`/liability/${p.category}/${p.slug}`}
              className="inline-flex items-center gap-1.5 rounded-full border bg-card px-4 py-2 text-sm font-semibold transition-colors hover:border-primary/40 hover:text-primary"
            >
              {p.name}
              <ArrowLeft className="size-3.5" aria-hidden="true" />
            </Link>
          ))}
          <Link
            href="/blog/diyeh-1404"
            className="inline-flex items-center gap-1.5 rounded-full border bg-card px-4 py-2 text-sm font-semibold transition-colors hover:border-primary/40 hover:text-primary"
          >
            مقاله کامل: دیه ۱۴۰۴ و سقف بیمه مسئولیت
            <ArrowLeft className="size-3.5" aria-hidden="true" />
          </Link>
          <Link
            href="/coverage-limit"
            className="inline-flex items-center gap-1.5 rounded-full bg-primary px-4 py-2 text-sm font-bold text-primary-foreground transition-opacity hover:opacity-90"
          >
            راهنمای انتخاب سقف تعهد
            <ArrowLeft className="size-3.5" aria-hidden="true" />
          </Link>
        </div>
      </section>

      <div className="mt-12">
        <CtaBanner
          title="سقف تعهد بیمه‌نامه شما با دیه ۱۴۰۴ هم‌خوان است؟"
          text="کارشناس ما بر اساس فعالیت و تعداد نفرات، سقف مناسبی برای پوشش دیه و خسارات جانی پیشنهاد می‌دهد — رایگان و بدون تعهد."
        />
      </div>
    </div>
  );
}
