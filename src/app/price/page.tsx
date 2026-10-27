import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Calculator, FileSearch, Scale, Wallet } from "lucide-react";
import { AnswerBlock } from "@/components/answer-block";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { CtaBanner } from "@/components/cta-banner";
import { FaqSection } from "@/components/faq-section";
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
import { getAllProducts } from "@/lib/data";
import { productUrl } from "@/lib/format";
import { faqJsonLd, howToJsonLd, JsonLd } from "@/lib/seo";
import type { SeedProduct } from "@/prisma/seed-data/types";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "قیمت بیمه مسئولیت — عوامل مؤثر، بازه شروع و راهنمای پیش‌فاکتور",
  description:
    "چرا نرخ بیمه مسئولیت ثابت نیست؟ ۸ عامل مؤثر بر قیمت، بازه شروع تخمینی پوشش‌های پرطرفدار و مراحل دریافت پیش‌فاکتور رسمی بیمه ایران.",
  alternates: {
    canonical: "/price",
    languages: {
      "fa-IR": "/price",
      en: "/en/price",
      "x-default": "/price",
    },
  },
};

const PRICE_FACTORS = [
  {
    factor: "نوع فعالیت و کد ریسک",
    effect: "تعیین‌کننده اصلی",
    text: "هر حرفه و کسب‌وکار کد ریسک مشخصی دارد؛ جراح با دفتر مشاوره، تفاوت بنیادین در نرخ دارد.",
  },
  {
    factor: "سقف تعهد",
    effect: "مستقیم",
    text: "سقف باید دست‌کم معادل دیه کامل سال وقوع باشد؛ افزایش سقف نرخ را بالا می‌برد اما نه به نسبت خطی.",
  },
  {
    factor: "تعداد نفرات یا ظرفیت",
    effect: "مستقیم",
    text: "در بیمه کارفرما تعداد کارکنان و در مراکز پذیرش، ظرفیت روزانه مبنای محاسبه است.",
  },
  {
    factor: "فرانشیز انتخابی",
    effect: "معکوس",
    text: "سهم خسارتی که خودتان می‌پذیرید بیشتر باشد، حق بیمه کمتر می‌شود؛ توازن با توان مالی شماست.",
  },
  {
    factor: "سوابق خسارت",
    effect: "مستقیم",
    text: "پرونده خسارت قبلی نرخ سال بعد را افزایش می‌دهد؛ سابقه بدون خسارت مزیت مذاکره است.",
  },
  {
    factor: "پوشش‌های الحاقی",
    effect: "مستقیم",
    text: "پوشش خسارت معنوی، هزینه دفاع حقوقی یا تمدید دوره تعهد، هرکدام حق بیمه اضافه دارند.",
  },
  {
    factor: "موقعیت و شرایط محیطی",
    effect: "تکمیلی",
    text: "تراکم جمعیت، نوع ساختمان و تجهیزات ایمنی (خروج اضطراری، اعلام حریق) در ارزیابی مؤثر است.",
  },
  {
    factor: "تخفیف‌ها و پرداخت",
    effect: "کاهنده",
    text: "پرداخت یک‌جا، صدور گروهی و بسته‌های ترکیبی معمولاً تخفیف دارند؛ در استعلام بپرسید.",
  },
];

const SAMPLE_SLUGS: { category: string; slug: string }[] = [
  { category: "professional", slug: "medical-doctors" },
  { category: "professional", slug: "dentists" },
  { category: "professional", slug: "lawyers" },
  { category: "professional", slug: "engineers" },
  { category: "commercial", slug: "employers" },
  { category: "commercial", slug: "public-liability" },
  { category: "commercial", slug: "product-liability" },
  { category: "commercial", slug: "elevators" },
];

const PRICE_FAQS = [
  {
    question: "قیمت بیمه مسئولیت پزشکان چقدر است؟",
    answer:
      "نرخ بر اساس تخصص، نوع فعالیت (جراحی یا سرپایی)، سقف تعهد و سوابق خسارت محاسبه می‌شود؛ به همین دلیل نرخ ثابت «عمومی» وجود ندارد. بازه شروع تخمینی در همین صفحه درج شده و پیش‌فاکتور رسمی پس از تکمیل فرم اعلام خطر صادر می‌شود.",
  },
  {
    question: "چرا قیمت آنلاین و فوری نمایش داده نمی‌شود؟",
    answer:
      "بیمه مسئولیت یک ریسک‌نامه است، نه محصول قیمت ثابت: ارزیابی فعالیت، سقف، فرانشیز و سوابق هر متقاضی متفاوت است. نرخ مصوب بیمه ایران پس از بررسی فرم اعلام خطر توسط کارشناس اعلام و پیش‌فاکتور رسمی صادر می‌شود؛ معمولاً همان روز کاری.",
  },
  {
    question: "آیا افزایش سقف تعهد هزینه را خیلی بالا می‌برد؟",
    answer:
      "رابطه سقف و نرخ خطی نیست؛ افزایش از سقف پایه معمولاً با ضریب ملایمی همراه است. با توجه به رشد سالانه دیه و امکان حکم ضربات زیان‌بار، انتخاب سقف بالاتر از حداقل از نظر مدیریت ریسک تقریباً همیشه به‌صرفه است؛ مبلغ دقیق را در استعلام بگیرید.",
  },
  {
    question: "هزینه صدور یا مقدمات جداگانه دارد؟",
    answer:
      "خیر؛ حق بیمه مصوب همان هزینه اصلی است و صدور بیمه‌نامه هزینه جداگانه‌ای ندارد. در صورت نیاز به الحاقیه‌های خاص یا بازدید فنی برای برخی ریسک‌ها، پیش از صدور به شما اطلاع داده می‌شود تا بدون هزینه پنهان تصمیم بگیرید.",
  },
];

const QUOTE_STEPS = [
  {
    title: "تکمیل فرم استعلام",
    description: "نوع فعالیت، شهر، تعداد نفرات و سقف تقریبی دلخواه را در فرم استعلام ثبت کنید.",
  },
  {
    title: "ارزیابی ریسک توسط کارشناس",
    description: "کارشناس، کد ریسک و پوشش‌های لازم را بر اساس فرم اعلام خطر مشخص و در صورت نیاز با شما تماس می‌گیرد.",
  },
  {
    title: "دریافت پیش‌فاکتور رسمی",
    description: "پیش‌فاکتور با نرخ مصوب بیمه ایران، تفکیک سقف و فرانشیز صادر و برای شما ارسال می‌شود.",
  },
  {
    title: "پرداخت و صدور بیمه‌نامه",
    description: "پس از تأیید و پرداخت، بیمه‌نامه همان روز کاری صادر و نسخه الکترونیکی تحویل داده می‌شود.",
  },
];

export default async function PricePage() {
  const products = await getAllProducts();
  const bySlug = new Map<string, SeedProduct>(products.map((p) => [p.slug, p]));
  const samples = SAMPLE_SLUGS.map((s) => bySlug.get(s.slug)).filter(
    (p): p is SeedProduct => Boolean(p),
  );

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      <JsonLd
        data={howToJsonLd({
          name: "مراحل دریافت پیش‌فاکتور بیمه مسئولیت",
          description: "چهار گام از استعلام تا صدور بیمه‌نامه با نرخ مصوب بیمه ایران.",
          steps: QUOTE_STEPS,
          url: "/price",
        })}
      />
      <JsonLd data={faqJsonLd(PRICE_FAQS)} />

      <Breadcrumbs items={[{ name: "قیمت بیمه مسئولیت", href: "/price" }]} />

      <header className="mt-6">
        <h1 className="text-2xl font-extrabold leading-[1.6] sm:text-3xl">
          قیمت بیمه مسئولیت — چگونه محاسبه می‌شود؟
        </h1>
      </header>

      <div className="mt-6 max-w-3xl">
        <AnswerBlock
          title="پاسخ کوتاه"
          text="قیمت بیمه مسئولیت نرخ ثابتی ندارد و بر اساس فرم اعلام خطر محاسبه می‌شود؛ عوامل اصلی عبارت‌اند از کد ریسک فعالیت، سقف تعهد (حداقل معادل دیه کامل سال وقوع)، تعداد نفرات یا ظرفیت، فرانشیز و سوابق خسارت. نرخ نهایی با نرخ‌نامه مصوب بیمه ایران در پیش‌فاکتور رسمی اعلام می‌شود و صدور بیمه‌نامه هزینه جداگانه ندارد."
        />
      </div>

      {/* Factors */}
      <section aria-labelledby="factors-h" className="mt-10">
        <SectionHeading
          icon={Calculator}
          title="هشت عامل مؤثر بر قیمت بیمه مسئولیت"
          hint="دو متقاضی با فعالیت مشابه هم می‌توانند نرخ متفاوت بگیرند."
        />
        <div className="overflow-x-auto rounded-2xl border nice-scroll">
          <Table>
            <TableHeader>
              <TableRow className="bg-accent/60">
                <TableHead className="text-start whitespace-nowrap">عامل</TableHead>
                <TableHead className="text-start whitespace-nowrap">اثر بر نرخ</TableHead>
                <TableHead className="text-start">توضیح</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {PRICE_FACTORS.map((f) => (
                <TableRow key={f.factor}>
                  <TableCell className="align-top font-bold whitespace-nowrap">{f.factor}</TableCell>
                  <TableCell className="align-top text-sm whitespace-nowrap text-primary">{f.effect}</TableCell>
                  <TableCell className="align-top text-sm leading-7 text-muted-foreground">{f.text}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </section>

      {/* Sample prices */}
      <section aria-labelledby="samples-h" className="mt-12">
        <SectionHeading
          icon={Wallet}
          title="بازه شروع تخمینی پوشش‌های پرطرفدار"
          hint="فقط برای درک مقیاس هزینه؛ نرخ نهایی پس از استعلام اعلام می‌شود."
        />
        <div className="max-w-3xl overflow-hidden rounded-2xl border">
          <Table>
            <TableHeader>
              <TableRow className="bg-accent/60">
                <TableHead className="text-start">پوشش</TableHead>
                <TableHead className="text-start whitespace-nowrap">شروع قیمت (تخمینی)</TableHead>
                <TableHead className="text-start">جزئیات</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {samples.map((p) => (
                <TableRow key={p.slug}>
                  <TableCell className="font-bold">
                    <Link href={productUrl(p.category, p.slug)} className="hover:text-primary">
                      {p.nameFa}
                    </Link>
                  </TableCell>
                  <TableCell className="whitespace-nowrap">{p.priceFromFa ?? "پس از استعلام"}</TableCell>
                  <TableCell>
                    <Link
                      href={productUrl(p.category, p.slug)}
                      className="inline-flex items-center gap-1 text-sm font-bold text-primary hover:underline"
                    >
                      جزئیات
                      <ArrowLeft className="size-3.5" aria-hidden="true" />
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <p className="mt-3 max-w-3xl text-xs leading-6 text-muted-foreground">
          * مبالغ تخمینی و برای آشنایی با مقیاس است و باید با نرخ‌نامه جاری بیمه ایران و ارزیابی ریسک شما
          تطبیق داده شود.
        </p>
      </section>

      {/* Quote steps */}
      <section aria-labelledby="steps-h" className="mt-12 max-w-3xl">
        <SectionHeading icon={FileSearch} title="چهار گام تا پیش‌فاکتور رسمی" />
        <NumberedSteps steps={QUOTE_STEPS} variant="buy" />
      </section>

      {/* FAQ */}
      <section className="mx-auto mt-12 max-w-4xl">
        <FaqSection faqs={PRICE_FAQS} title="سوالات متداول قیمت بیمه مسئولیت" />
      </section>

      {/* Cross link */}
      <section className="mt-12">
        <div className="flex flex-wrap gap-3">
          <Link
            href="/coverage-limit"
            className="inline-flex items-center gap-2 rounded-full border bg-card px-5 py-2.5 text-sm font-semibold transition-colors hover:border-primary/40 hover:text-primary"
          >
            <Wallet className="size-4" aria-hidden="true" />
            سقف تعهد چقدر باشد؟ راهنمای انتخاب
            <ArrowLeft className="size-4" aria-hidden="true" />
          </Link>
          <Link
            href="/deductible"
            className="inline-flex items-center gap-2 rounded-full border bg-card px-5 py-2.5 text-sm font-semibold transition-colors hover:border-primary/40 hover:text-primary"
          >
            <Calculator className="size-4" aria-hidden="true" />
            فرانشیز چقدر باشد؟ راهنمای انتخاب
            <ArrowLeft className="size-4" aria-hidden="true" />
          </Link>
          <Link
            href="/compare"
            className="inline-flex items-center gap-2 rounded-full border bg-card px-5 py-2.5 text-sm font-semibold transition-colors hover:border-primary/40 hover:text-primary"
          >
            <Scale className="size-4" aria-hidden="true" />
            مقایسه همه پوشش‌ها و قیمت شروع
            <ArrowLeft className="size-4" aria-hidden="true" />
          </Link>
        </div>
      </section>

      <div className="mt-10">
        <CtaBanner
          title="پیش‌فاکتور رسمی بیمه ایران را همین امروز بگیرید"
          text="فرم استعلام را تکمیل کنید؛ سقف و فرانشیز مناسب فعالیت شما محاسبه و پیش‌فاکتور همان روز کاری ارسال می‌شود — رایگان و بدون تعهد."
        />
      </div>
    </div>
  );
}
