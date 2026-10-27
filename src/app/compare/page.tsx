import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, BookOpen, Factory, GitCompareArrows, Scale } from "lucide-react";
import { AnswerBlock } from "@/components/answer-block";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { CtaBanner } from "@/components/cta-banner";
import { SectionHeading } from "@/components/section-heading";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getAllProducts } from "@/lib/data";
import { productUrl } from "@/lib/format";
import { siteConfig } from "@/lib/site";
import { JsonLd, faqJsonLd } from "@/lib/seo";
import type { CategoryKey, SeedProduct } from "@/prisma/seed-data/types";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "مقایسه انواع بیمه مسئولیت — جدول کامل ۳۳ پوشش",
  description:
    "جدول مقایسه‌ای همه انواع بیمه مسئولیت در ایران: مخاطب هر پوشش، کاربرد کلیدی و قیمت شروع تخمینی — برای انتخاب سریع بیمه‌نامه مناسب.",
  alternates: {
    canonical: "/compare",
    languages: {
      "fa-IR": "/compare",
      en: "/en/compare",
      "x-default": "/compare",
    },
  },
};

const GROUPS: { key: CategoryKey; label: string }[] = [
  { key: "professional", label: "بیمه مسئولیت حرفه‌ای" },
  { key: "commercial", label: "بیمه مسئولیت کسب‌وکار و صنعت" },
  { key: "corporate", label: "بیمه مسئولیت شرکتی" },
  { key: "public", label: "بیمه مسئولیت عمومی و فردی" },
];

const CATEGORY_MATRIX: { key: CategoryKey; risks: string; typical: string }[] = [
  {
    key: "professional",
    risks: "خطا و قصور در انجام خدمت تخصصی",
    typical: "پزشکان، وکلا، مهندسان، حسابداران، داروخانه‌ها",
  },
  {
    key: "commercial",
    risks: "حوادث کارکنان، خسارت به ثالث، عیب محصول و عملیات پیمانکاری",
    typical: "کارفرمایان، پیمانکاران، تولیدکنندگان، هتل‌ها و رستوران‌ها",
  },
  {
    key: "corporate",
    risks: "ادعای سهامداران و ذی‌نفعان علیه مدیران؛ حملات سایبری",
    typical: "شرکت‌های سهامی، هلدینگ‌ها، استارتاپ‌ها، کسب‌وکارهای آنلاین",
  },
  {
    key: "public",
    risks: "خسارت روزمره به همسایگان، مشتریان و افراد ثالث",
    typical: "مالکان و مستأجران، والدین، نگهدارندگان حیوانات، برگزارکنندگان رویداد",
  },
];

// جدول «کدام پوشش برای کدام شغل» — هدف استخراج AI برای جست‌وجوهای
// «بیمه مسئولیت + شغل». هر ردیف دقیقاً به یک صفحه محصول واقعی لینک است.
const JOB_MATRIX: { job: string; product: [CategoryKey, string]; risk: string }[] = [
  { job: "پزشک", product: ["professional", "medical-doctors"], risk: "خطای درمانی و دیه" },
  { job: "دندان‌پزشک", product: ["professional", "dentists"], risk: "عوارض ایمپلنت، پروتز و بی‌حسی" },
  { job: "پرستار و پیراپزشک", product: ["professional", "nurses-paramedics"], risk: "خطای تزریق، سرم و مراقبت" },
  { job: "داروساز و داروخانه", product: ["professional", "pharmacists"], risk: "خطای تحویل و تداخل دارویی" },
  { job: "وکیل دادگستری", product: ["professional", "lawyers"], risk: "خسارت مالی به موکل" },
  { job: "مهندس طراح و ناظر", product: ["professional", "engineers"], risk: "خطای طراحی و نظارت (ماده ۳۳)" },
  { job: "حسابدار و حسابرس", product: ["professional", "accountants-auditors"], risk: "اظهارنامه و گزارش ممیزی معیوب" },
  { job: "مشاور مالی و مالیاتی", product: ["professional", "financial-advisors"], risk: "جریمه ناشی از مشاوره نادرست" },
  { job: "مشاور املاک", product: ["professional", "real-estate-agents"], risk: "عدم اظهار عیب و تعارض مالکیت" },
  { job: "مترجم رسمی", product: ["professional", "translators-official"], risk: "خطای ترجمه اعداد و اصطلاحات حقوقی" },
  { job: "سردفتر اسناد رسمی", product: ["professional", "notaries"], risk: "تنظیم سند معیوب و احراز هویت ناقص" },
  { job: "آرایشگر و سالن زیبایی", product: ["professional", "beauty-salons"], risk: "آسیب خدمات، حساسیت پوستی و عفونت" },
  { job: "متخصص فناوری اطلاعات و فریلنسر", product: ["professional", "it-professionals"], risk: "خطای پیاده‌سازی و افشای داده" },
  { job: "کارفرما (کارگاه، کارخانه، مطب با پرسنل)", product: ["commercial", "employers"], risk: "حوادث و بیمه‌های شغلی کارکنان (ماده ۹۱ قانون کار)" },
  { job: "پیمانکار", product: ["commercial", "contractors"], risk: "خسارت به ثالث در محدوده کارگاه" },
  { job: "مالک عملیات ساختمانی", product: ["commercial", "construction-operations"], risk: "ریزش گود، سقوط مصالح و خسارت به ملک مجاور" },
  { job: "تولیدکننده و واردکننده کالا", product: ["commercial", "product-liability"], risk: "عیب کالا و خسارت مصرف‌کننده" },
  { job: "فروشگاه و واحد خدماتی", product: ["commercial", "public-liability"], risk: "آسیب بدنی و مالی مشتری در محل فعالیت" },
  { job: "رستوران و هتل", product: ["commercial", "restaurants-hotels"], risk: "مسمومیت غذایی، سقوط مهمان و اموال امانی" },
  { job: "مدیر ساختمان دارای آسانسور", product: ["commercial", "elevators"], risk: "حوادث آسانسور و پله برقی" },
  { job: "مالک و مستأجر ساختمان", product: ["commercial", "property-owners"], risk: "سقوط نما، نشت آب و آتش‌سوزی به همسایه" },
  { job: "مهدکودک و آموزشگاه", product: ["commercial", "kindergartens"], risk: "آسیب کودک در زمان نگهداری" },
  { job: "باشگاه ورزشی و استخر", product: ["commercial", "sports-facilities"], risk: "حوادث ورزشی و نقص تجهیزات" },
  { job: "متصدی حمل‌ونقل و بار", product: ["commercial", "transport-carriers"], risk: "خسارت بار در حین حمل و آسیب به ثالث" },
  { job: "مدیران شرکت سهامی", product: ["corporate", "directors-officers"], risk: "ادعای سهامداران و تخلف از وظایف مدیران" },
  { job: "کسب‌وکار آنلاین با داده مشتری", product: ["corporate", "cyber-liability"], risk: "نشت داده شخصی و باج‌افزار" },
  { job: "افراد و خانواده‌ها", product: ["public", "individuals-family"], risk: "خسارت ناشی از فرزند صغیر و حوادث منزل" },
  { job: "دارنده حیوان خانگی یا دام", product: ["public", "animal-owners"], risk: "گازگرفتگی و خسارت دام به ثالث" },
  { job: "برگزارکننده رویداد و همایش", product: ["public", "events-insurance"], risk: "حوادث حاضران و سازه‌های موقت" },
  { job: "آژانس مسافرتی و تورگردان", product: ["public", "travel-tours"], risk: "حوادث مسافر در سفر" },
  { job: "شکارچی دارای پروانه", product: ["public", "hunters"], risk: "شلیک اشتباهی و خسارت به دام‌ها" },
];

const COMPARE_FAQS = [
  {
    question: "کدام بیمه مسئولیت برای کسب‌وکار کوچک مناسب‌تر است؟",
    answer:
      "برای بیشتر کسب‌وکارهای کوچک، ترکیب بیمه مسئولیت کارفرما (در قبال کارکنان) و مسئولیت عمومی (در قبال مشتریان و همسایگان) نقطه شروع است. اگر خدمت تخصصی ارائه می‌دهید، پوشش حرفه‌ای خطای کار را نیز اضافه کنید. انتخاب نهایی بر اساس منشأ ریسک و سقف تعهد پس از استعلام انجام می‌شود.",
  },
  {
    question: "تفاوت مسئولیت عمومی و مسئولیت حرفه‌ای در چیست؟",
    answer:
      "مسئولیت عمومی خسارات بدنی و مالی به اشخاص ثالث را که در محل فعالیت رخ می‌دهد پوشش می‌دهد؛ اما مسئولیت حرفه‌ای صرفاً خسارت ناشی از خطا، قصور یا غفلت در انجام خدمت تخصصی است. یک پزشک معمولاً به هر دو نیاز دارد، زیرا ریسک محیط مطب و ریسک تصمیم درمانی از دو منبع متفاوت است.",
  },
  {
    question: "آیا با این جدول می‌توان قیمت نهایی را تعیین کرد؟",
    answer:
      "جدول مقایسه فقط مقیاس هزینه و کاربرد هر پوشش را نشان می‌دهد. قیمت نهایی به فرم اعلام خطر، سقف تعهد انتخابی، سوابق خسارت و فرانشیز توافقی بستگی دارد و در قالب پیش‌فاکتور رسمی پس از استعلام صادر می‌شود؛ بنابراین اعداد این صفحه جایگزین استعلام نیستند.",
  },
];

export default async function ComparePage() {
  const products = await getAllProducts();

  const itemListJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "مقایسه انواع بیمه مسئولیت در ایران",
    numberOfItems: products.length,
    itemListElement: products.map((p, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: p.nameFa,
      url: productUrl(p.category, p.slug),
    })),
  };

  // Dataset — جدول «کدام پوشش برای کدام شغل» به‌صورت داده ساخت‌یافته
  // (مطابق محتوای مرئی جدول؛ برای استخراج دقیق‌تر توسط موتورها و AI)
  const jobDatasetJsonLd = {
    "@context": "https://schema.org",
    "@type": "Dataset",
    name: "جدول «کدام پوشش بیمه مسئولیت برای کدام شغل» — بیمه ایران",
    description:
      "نگاشت ۳۱ شغل و فعالیت به پوشش بیمه مسئولیت متناسب و ریسک اصلی تحت پوشش، بر مبنای شرایط عمومی بیمه ایران و قانون مسئولیت مدنی.",
    url: `${siteConfig.url}/compare`,
    creator: { "@id": `${siteConfig.url}/#organization` },
    inLanguage: "fa-IR",
    variableMeasured: ["شغل / فعالیت", "پوشش پیشنهادی", "ریسک اصلی تحت پوشش"],
    numberOfRows: JOB_MATRIX.length,
    license: `${siteConfig.url}/terms`,
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      <JsonLd data={itemListJsonLd} />
      <JsonLd data={jobDatasetJsonLd} />
      <JsonLd data={faqJsonLd(COMPARE_FAQS)} />
      <Breadcrumbs items={[{ name: "مقایسه انواع بیمه مسئولیت", href: "/compare" }]} />

      <header className="mt-6">
        <h1 className="text-2xl font-extrabold leading-[1.6] sm:text-3xl">
          مقایسه انواع بیمه مسئولیت — کدام پوشش برای شماست؟
        </h1>
      </header>

      <div className="mt-6 max-w-3xl">
        <AnswerBlock
          title="چگونه انواع بیمه مسئولیت را مقایسه کنیم؟"
          text="برای مقایسه انواع بیمه مسئولیت سه معیار را در نظر بگیرید: منشأ ریسک (خطای حرفه‌ای، حوادث کارکنان، خسارت به ثالث یا عیب کالا)، سقف تعهد متناسب با دیه سال وقوع و فرانشیز قابل پرداخت. جدول زیر پوشش‌های بیمه مسئولیت را بر اساس همین معیارها کنار هم گذاشته تا کوتاه‌ترین مسیر تا بیمه‌نامه مناسب شما باشد."
        />
      </div>

      <section aria-labelledby="cmp-matrix" className="mt-10">
        <SectionHeading icon={Scale} title="چهار دسته مسئولیت در یک نگاه" />
        <div className="overflow-x-auto rounded-2xl border nice-scroll">
          <Table>
            <TableHeader>
              <TableRow className="bg-accent/60">
                <TableHead className="text-start whitespace-nowrap">دسته</TableHead>
                <TableHead className="text-start">منشأ اصلی ریسک</TableHead>
                <TableHead className="text-start">مشاغل و مخاطبان نمونه</TableHead>
                <TableHead className="text-start whitespace-nowrap">تعداد پوشش</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {CATEGORY_MATRIX.map((m) => {
                const g = GROUPS.find((x) => x.key === m.key);
                const count = products.filter((p) => p.category === m.key).length;
                return (
                  <TableRow key={m.key}>
                    <TableCell className="align-top font-bold">
                      <Link href={`/liability/${m.key}`} className="hover:text-primary">
                        {g?.label}
                      </Link>
                    </TableCell>
                    <TableCell className="align-top text-sm leading-7 text-muted-foreground">{m.risks}</TableCell>
                    <TableCell className="align-top text-sm leading-7 text-muted-foreground">{m.typical}</TableCell>
                    <TableCell className="align-top text-sm font-bold">{count}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      </section>

      <section aria-labelledby="cmp-job" className="mt-10">
        <SectionHeading
          icon={Scale}
          title="کدام پوشش برای کدام شغل؟"
          hint="شغل یا فعالیت خود را پیدا کنید و مستقیم به راهنمای کامل همان پوشش بروید."
        />
        <div className="overflow-x-auto rounded-2xl border nice-scroll">
          <Table>
            <TableHeader>
              <TableRow className="bg-accent/60">
                <TableHead className="text-start whitespace-nowrap">شغل / فعالیت</TableHead>
                <TableHead className="text-start whitespace-nowrap">پوشش پیشنهادی</TableHead>
                <TableHead className="text-start">ریسک اصلی تحت پوشش</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {JOB_MATRIX.map((row) => (
                <TableRow key={row.job}>
                  <TableCell className="align-top text-sm font-semibold leading-7">{row.job}</TableCell>
                  <TableCell className="align-top text-sm leading-7">
                    <Link
                      href={productUrl(row.product[0], row.product[1])}
                      className="font-bold text-primary hover:underline"
                    >
                      {products.find((p) => p.slug === row.product[1])?.nameFa ?? row.product[1]}
                    </Link>
                  </TableCell>
                  <TableCell className="align-top text-sm leading-7 text-muted-foreground">{row.risk}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </section>

      {GROUPS.map((g) => {
        const rows = products.filter((p) => p.category === g.key);
        if (rows.length === 0) return null;
        return (
          <section key={g.key} aria-labelledby={`cmp-${g.key}`} className="mt-10">
            <SectionHeading icon={GitCompareArrows} title={g.label} hint={`${rows.length} پوشش`} />
            <div className="overflow-x-auto rounded-2xl border nice-scroll">
              <Table>
                <TableHeader>
                  <TableRow className="bg-accent/60">
                    <TableHead className="text-start whitespace-nowrap">نوع بیمه</TableHead>
                    <TableHead className="text-start whitespace-nowrap">مخاطب</TableHead>
                    <TableHead className="text-start">کاربرد کلیدی</TableHead>
                    <TableHead className="text-start whitespace-nowrap">شروع قیمت (تخمینی)</TableHead>
                    <TableHead className="text-start">جزئیات</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {rows.map((p) => (
                    <CompareRow key={p.slug} p={p} />
                  ))}
                </TableBody>
              </Table>
            </div>
          </section>
        );
      })}

      <p className="mt-4 max-w-3xl text-xs leading-6 text-muted-foreground">
        * قیمت‌های «شروع» تخمینی و برای آشنایی با مقیاس هزینه است؛ نرخ نهایی بر اساس فرم اعلام خطر، سقف تعهد و
        سوابق خسارت پس از استعلام اعلام می‌شود. تحلیل عمق هر پوشش در{" "}
        <Link href="/price" className="font-semibold text-primary hover:underline">راهنمای قیمت</Link> و{" "}
        <Link href="/faq" className="font-semibold text-primary hover:underline">سوالات متداول</Link> آمده است.
      </p>

      <section aria-labelledby="cmp-faq" className="mt-10">
        <SectionHeading icon={GitCompareArrows} title="پرسش‌های متداول مقایسه" />
        <div className="mt-4 grid gap-4">
          {COMPARE_FAQS.map((f) => (
            <div key={f.question} className="rounded-2xl border bg-card p-5">
              <h3 className="text-sm font-extrabold leading-7">{f.question}</h3>
              <p className="mt-2 text-[13px] leading-7 text-muted-foreground">{f.answer}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="mt-8 flex flex-wrap gap-3">
        <Link
          href="/industry"
          className="inline-flex items-center gap-2 rounded-full border bg-card px-5 py-2.5 text-sm font-semibold transition-colors hover:border-primary/40 hover:text-primary"
        >
          <Factory className="size-4" aria-hidden="true" />
          بیمه مسئولیت به تفکیک صنعت
          <ArrowLeft className="size-4" aria-hidden="true" />
        </Link>
        <Link
          href="/liability"
          className="inline-flex items-center gap-2 rounded-full border bg-card px-5 py-2.5 text-sm font-semibold transition-colors hover:border-primary/40 hover:text-primary"
        >
          <BookOpen className="size-4" aria-hidden="true" />
          فهرست کامل انواع بیمه مسئولیت
          <ArrowLeft className="size-4" aria-hidden="true" />
        </Link>
      </div>

      <div className="mt-12">
        <CtaBanner
          title="پوشش خود را پیدا کردید؟ پیش‌فاکتور رسمی بگیرید"
          text="با تکمیل فرم استعلام، سقف تعهد و نرخ دقیق بیمه ایران برای فعالیت شما محاسبه و همان روز کاری ارسال می‌شود."
        />
      </div>
    </div>
  );
}

function CompareRow({ p }: { p: SeedProduct }) {
  return (
    <TableRow>
      <TableCell className="align-top font-bold">
        <Link href={productUrl(p.category, p.slug)} className="hover:text-primary">
          {p.nameFa}
        </Link>
      </TableCell>
      <TableCell className="align-top text-sm text-muted-foreground">{p.audienceFa}</TableCell>
      <TableCell className="align-top text-sm leading-7 text-muted-foreground">{p.summaryFa}</TableCell>
      <TableCell className="align-top text-sm whitespace-nowrap">{p.priceFromFa ?? "پس از استعلام"}</TableCell>
      <TableCell className="align-top">
        <Link
          href={productUrl(p.category, p.slug)}
          className="inline-flex items-center gap-1 text-sm font-bold text-primary hover:underline"
        >
          جزئیات و خرید
          <ArrowLeft className="size-3.5" aria-hidden="true" />
        </Link>
      </TableCell>
    </TableRow>
  );
}
