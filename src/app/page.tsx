import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  BadgeCheck,
  BookOpen,
  Building2,
  Calculator,
  Factory,
  FileSearch,
  Landmark,
  MessagesSquare,
  Scale,
  ScrollText,
  ShieldCheck,
  Stethoscope,
  Users,
  Wallet,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { AnswerBlock } from "@/components/answer-block";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { CtaBanner } from "@/components/cta-banner";
import { FaqSection } from "@/components/faq-section";
import { ProductCard } from "@/components/product-card";
import { SectionHeading } from "@/components/section-heading";
import { TrustStrip } from "@/components/trust-strip";
import { getArticles, getCategories, getCities, getFeaturedProducts, getGeneralFaqs } from "@/lib/data";
import { DIYEH_DISCLAIMER, DIYEH_TABLE } from "@/lib/diyeh";
import { toFaDigits } from "@/lib/format";
import { datasetJsonLd, faqJsonLd, JsonLd } from "@/lib/seo";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "بیمه مسئولیت ایران | استعلام، خرید و راهنمای خسارت — نمایندگی رسمی بیمه ایران",
  description:
    "مرجع تخصصی بیمه مسئولیت در ایران: ۳۳+ نوع بیمه مسئولیت حرفه‌ای، تجاری، شرکتی و عمومی. تعریف و مقایسه پوشش‌ها، استعلام قیمت و راهنمای دریافت خسارت.",
  alternates: { canonical: "/" },
};

const CATEGORY_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  professional: Stethoscope,
  commercial: Factory,
  corporate: Landmark,
  public: Users,
};

const JOURNEY = [
  {
    icon: Scale,
    title: "۱. تشخیص ریسک",
    text: "بر اساس حرفه یا کسب‌وکار شما، نوع مسئولیت (حرفه‌ای، کارفرمایی، عمومی و…) و ریسک‌های مستعد خسارت مشخص می‌شود.",
  },
  {
    icon: FileSearch,
    title: "۲. استعلام قیمت",
    text: "سقف تعهد، فرانشیز و پوشش‌های اضافی تنظیم و پیش‌فاکتور رسمی با نرخ مصوب بیمه ایران صادر می‌شود.",
  },
  {
    icon: ShieldCheck,
    title: "۳. صدور بیمه‌نامه",
    text: "پس از تکمیل مدارک و پرداخت، بیمه‌نامه همان روز کاری صادر و نسخه الکترونیکی تحویل داده می‌شود.",
  },
  {
    icon: Wallet,
    title: "۴. دریافت خسارت",
    text: "از اعلام فوری رخداد تا کارشناسی و پرداخت، در تمام مراحل همراه شما هستیم (مطابق ماده ۳۰ قانون بیمه).",
  },
];

export default async function HomePage() {
  const [categories, featured, generalFaqs, cities, articles] = await Promise.all([
    getCategories(),
    getFeaturedProducts(4),
    getGeneralFaqs(),
    getCities(),
    getArticles(),
  ]);

  const homeFaqs = [
    ...generalFaqs.filter((f) => f.group === "definition").slice(0, 2),
    ...generalFaqs.filter((f) => f.group === "coverage").slice(0, 1),
    ...generalFaqs.filter((f) => f.group === "price").slice(0, 1),
    ...generalFaqs.filter((f) => f.group === "claim").slice(0, 2),
    ...generalFaqs.filter((f) => f.group === "compare").slice(0, 1),
    ...generalFaqs.filter((f) => f.group === "coverage").slice(1, 2),
  ].slice(0, 8);

  return (
    <div className="flex flex-col gap-14 pb-16 sm:gap-16">
      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="border-b bg-gradient-to-b from-accent/70 via-background to-background">
        <div className="mx-auto max-w-7xl px-4 pb-10 pt-8 sm:px-6 sm:pb-14 sm:pt-10">
          <Breadcrumbs items={[]} />
          <div className="mt-6 grid items-start gap-8 lg:grid-cols-[1fr_360px]">
            <div>
              <Badge variant="secondary" className="mb-4 border border-primary/25 bg-primary/10 text-primary hover:bg-primary/15">
                <ShieldCheck className="me-1 size-3.5" aria-hidden="true" />
                نمایندگی رسمی بیمه ایران — فقط بیمه مسئولیت
              </Badge>
              <h1 className="text-2xl font-extrabold leading-[1.5] sm:text-4xl sm:leading-[1.5]">
                خرید بیمه مسئولیت آنلاین؛ تخصصی‌ترین مرجع
                <span className="text-primary"> بیمه مسئولیت</span> در ایران
              </h1>
              <p className="mt-4 max-w-2xl text-[15px] leading-8 text-muted-foreground sm:text-base">
                از تشخیص ریسک تا دریافت خسارت: تعریف دقیق ۳۳+ نوع بیمه مسئولیت حرفه‌ای، تجاری، شرکتی و عمومی،
                مقایسه پوشش‌ها و استثناها، استعلام قیمت، خرید آنلاین با نرخ مصوب بیمه ایران، مشاوره سقف تعهد و
                راهنمای گام‌به‌گام خسارت — همه در یک جا، بر مبنای قانون مسئولیت مدنی و شرایط عمومی بیمه ایران.
              </p>
              <div className="mt-6 flex flex-wrap items-center gap-3">
                <Button size="lg" asChild className="font-bold">
                  <Link href="/quote">
                    <FileSearch className="size-4" aria-hidden="true" />
                    استعلام رایگان قیمت
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild className="font-bold">
                  <Link href="/buy">
                    راهنمای خرید آنلاین
                    <ArrowLeft className="size-4" aria-hidden="true" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link href="/liability">
                    انواع بیمه مسئولیت
                    <ArrowLeft className="size-4" aria-hidden="true" />
                  </Link>
                </Button>
              </div>
            </div>

            {/* Answer block hero */}
            <AnswerBlock
              title="بیمه مسئولیت چیست؟"
              text="بیمه مسئولیت قراردادی است که به‌موجب آن بیمه‌گر متعهد می‌شود خسارت مالی و جانی وارد شده به اشخاص ثالث در اثر فعالیت بیمه‌شده را — در صورت اثبات تقصیر و مطابق قانون مسئولیت مدنی مصوب ۱۳۳۹ — تا سقف تعهد بیمه‌نامه جبران کند. این تعهد شامل دیه، خسارت مالی و هزینه‌های دفاع حقوقی است و مجازات کیفری را پوشش نمی‌دهد."
            />
          </div>

          <div className="mt-8">
            <TrustStrip />
          </div>

          <div className="relative mt-8 overflow-hidden rounded-2xl border shadow-sm">
            <Image
              src="/hero.png"
              alt="تصویر مفهومی پوشش بیمه مسئولیت برای مشاغل و کسب‌وکارهای مختلف در ایران"
              width={1344}
              height={768}
              priority
              className="h-auto w-full object-cover"
              sizes="(max-width: 1024px) 100vw, 1200px"
            />
          </div>
        </div>
      </section>

      {/* ── Categories ───────────────────────────────────────── */}
      <section className="mx-auto w-full max-w-7xl px-4 sm:px-6" aria-labelledby="cats-h">
        <h2 id="cats-h" className="sr-only">دسته‌های بیمه مسئولیت</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((c) => {
            const Icon = CATEGORY_ICONS[c.key] ?? ShieldCheck;
            return (
              <Link key={c.key} href={`/liability/${c.key}`} className="group">
                <Card className="h-full transition-all group-hover:-translate-y-0.5 group-hover:border-primary/40 group-hover:shadow-md">
                  <CardHeader className="pb-2">
                    <span className="mb-2 grid size-11 place-items-center rounded-xl bg-accent text-accent-foreground">
                      <Icon className="size-5.5" aria-hidden="true" />
                    </span>
                    <CardTitle className="text-[15px] group-hover:text-primary">
                      بیمه مسئولیت {c.nameFa}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-[13px] leading-6">
                      {c.descriptionFa}
                    </CardDescription>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
      </section>

      {/* ── Featured products (Phase 1) ──────────────────────── */}
      <section className="mx-auto w-full max-w-7xl px-4 sm:px-6" aria-labelledby="feat-h">
        <SectionHeading
          icon={ShieldCheck}
          title="پرفروش‌ترین بیمه‌های مسئولیت"
          hint="چهار محصول اصلی با صدور سریع — جزئیات کامل پوشش، استثناها و مراحل خسارت در صفحه هر محصول."
        />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </div>
      </section>

      {/* ── Journey ──────────────────────────────────────────── */}
      <section className="border-y bg-secondary/40">
        <div className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6">
          <SectionHeading
            icon={ScrollText}
            title="مسیر شما از تشخیص ریسک تا دریافت خسارت"
            hint="هر چهار مرحله با پشتیبانی کارشناس — شفاف و مبتنی بر مقررات."
          />
          <ol className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {JOURNEY.map((j) => (
              <li key={j.title} className="rounded-2xl border bg-card p-5">
                <span className="mb-3 grid size-10 place-items-center rounded-xl bg-primary/10 text-primary">
                  <j.icon className="size-5" aria-hidden="true" />
                </span>
                <h3 className="font-bold">{j.title}</h3>
                <p className="mt-1.5 text-[13px] leading-7 text-muted-foreground">{j.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ── Definition (Informational intent 2.1) ────────────── */}
      <section className="mx-auto w-full max-w-7xl px-4 sm:px-6">
        <SectionHeading
          icon={BookOpen}
          title="بیمه مسئولیت چیست؟ (خلاصه ۶۰ ثانیه‌ای)"
          hint="پاسخ دقیق و قانون‌محور؛ نسخه کامل در دانشنامه."
        />
        <div className="grid gap-6 lg:grid-cols-[1fr_340px]">
          <AnswerBlock
            title="تعریف بیمه مسئولیت"
            text="بیمه مسئولیت نوعی بیمه اشخاص است که خسارت‌های وارد شده به ثالث را که بیمه‌شده از بابت آن‌ها مسئول شناخته می‌شود، جبران می‌کند. مبنای قانونی آن مواد ۱ تا ۱۱ قانون مسئولیت مدنی است: هرگاه زیان‌باران با فعل یا ترک فعل خود و بدون مجوز قانونی به دیگری زیان برساند، مسئول جبران است. بیمه‌نامه این هزینه — شامل دیه و خسارت مالی — را به‌جای بیمه‌شده می‌پردازد."
          />
          <div className="space-y-3">
            {articles.slice(0, 3).map((a) => (
              <Link
                key={a.slug}
                href={`/blog/${a.slug}`}
                className="flex items-center justify-between gap-3 rounded-xl border bg-card p-4 transition-colors hover:border-primary/40"
              >
                <span className="text-sm font-bold leading-6">{a.title}</span>
                <ArrowLeft className="size-4 shrink-0 text-primary" aria-hidden="true" />
              </Link>
            ))}
            <Button variant="outline" className="w-full" asChild>
              <Link href="/blog">
                ورود به دانشنامه
                <ArrowLeft className="size-4" aria-hidden="true" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* ── Diyeh dataset (2.1 + Dataset schema) ─────────────── */}
      <section className="mx-auto w-full max-w-7xl px-4 sm:px-6">
        <SectionHeading
          icon={Scale}
          title="جدول دیه — مبنای انتخاب سقف تعهد"
          hint="سقف تعهد بیمه مسئولیت شما دست‌کم باید معادل دیه کامل سال جاری باشد."
        />
        <JsonLd
          data={datasetJsonLd({
            name: "جدول دیه کامل ایران (۱۴۰۲–۱۴۰۴)",
            description:
              "مبالغ دیه کامل در ماه عادی و ماه حرام بر حسب تومان بر اساس ابلاغیه‌های رسمی؛ پیش از استناد با ابلاغیه سال وقوع تطبیق داده شود.",
            url: "/dih",
          })}
        />
        <div className="max-w-2xl overflow-hidden rounded-2xl border">
          <Table>
            <TableHeader>
              <TableRow className="bg-accent/60">
                <TableHead className="text-start">سال</TableHead>
                <TableHead className="text-start">دیه کامل (ماه عادی)</TableHead>
                <TableHead className="text-start">ماه حرام</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {DIYEH_TABLE.map((r) => (
                <TableRow key={r.year}>
                  <TableCell className="font-bold">{r.year}</TableCell>
                  <TableCell dir="rtl">{r.standard} تومان</TableCell>
                  <TableCell dir="rtl">{r.sacred} تومان</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <p className="mt-3 max-w-2xl text-xs leading-6 text-muted-foreground">{DIYEH_DISCLAIMER}</p>
        <div className="mt-4 flex flex-wrap gap-2.5">
          <Button variant="outline" size="sm" asChild>
            <Link href="/dih">
              جدول کامل دیه و سوالات متداول
              <ArrowLeft className="size-4" aria-hidden="true" />
            </Link>
          </Button>
          <Button variant="ghost" size="sm" asChild>
            <Link href="/compare">
              مقایسه انواع پوشش
              <ArrowLeft className="size-4" aria-hidden="true" />
            </Link>
          </Button>
          <Button variant="ghost" size="sm" asChild>
            <Link href="/glossary">
              واژه‌نامه اصطلاحات
              <ArrowLeft className="size-4" aria-hidden="true" />
            </Link>
          </Button>
          <Button variant="ghost" size="sm" asChild>
            <Link href="/laws">
              قوانین پایه
              <ArrowLeft className="size-4" aria-hidden="true" />
            </Link>
          </Button>
        </div>
      </section>

      {/* ── Cities (Local intent 2.6) ────────────────────────── */}
      <section className="border-y bg-secondary/40">
        <div className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6">
          <SectionHeading
            icon={Building2}
            title="بیمه مسئولیت در شهر شما"
            hint="برای هر شهر، ریسک‌های شایع و محصولات متناسب را جداگانه تحلیل کرده‌ایم."
          />
          <ul className="flex flex-wrap gap-2.5">
            {cities.map((c) => (
              <li key={c.slug}>
                <Link
                  href={`/city/${c.slug}`}
                  className="inline-flex items-center gap-1.5 rounded-full border bg-card px-4 py-2 text-sm font-semibold transition-colors hover:border-primary/40 hover:text-primary"
                >
                  بیمه مسئولیت در {c.nameFa}
                  <ArrowLeft className="size-3.5" aria-hidden="true" />
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="/city"
                className="inline-flex items-center gap-1.5 rounded-full border border-primary/30 bg-primary/5 px-4 py-2 text-sm font-bold text-primary transition-colors hover:bg-primary/10"
              >
                راهنمای همه {toFaDigits(cities.length)} شهر
                <ArrowLeft className="size-3.5" aria-hidden="true" />
              </Link>
            </li>
          </ul>
        </div>
      </section>

      {/* ── AIO/GEO: پاسخ مستقیم نیت‌های خرید ───────────────────────── */}
      <section
        aria-labelledby="buy-intent-h"
        className="mx-auto w-full max-w-7xl px-4 sm:px-6"
      >
        <div className="rounded-3xl border-2 border-primary/30 bg-gradient-to-b from-primary/10 via-primary/5 to-transparent p-6 sm:p-8">
          <h2 id="buy-intent-h" className="text-lg font-extrabold sm:text-xl">
            خرید بیمه مسئولیت — آنلاین، با مشاوره و از مرجع معتبر
          </h2>
          <div className="mt-4 max-w-3xl">
            <AnswerBlock
              title="بهترین راه خرید بیمه مسئولیت چیست؟"
              text="خرید بیمه مسئولیت در ایران از سه مسیر انجام می‌شود: خرید آنلاین از نمایندگی رسمی، استعلام و مشاوره، و مراجعه حضوری. بهترین سایت برای خرید بیمه مسئولیت مرجعی است که مجوز رسمی نمایندگی، تخصص در رشته مسئولیت، محاسبه با نرخ‌نامه مصوب شرکت بیمه، پیش‌فاکتور رسمی و پشتیبانی خسارت داشته باشد. بیمه‌مسئولیتی همه این معیارها را پوشش می‌دهد: خرید آنلاین بیمه مسئولیت با محاسبه‌گر نرخ مصوب ۱۴۰۵ برای پزشکان، پرستاران و پیراپزشکان و مهندسین؛ مشاوره خرید بیمه مسئولیت رایگان با پاسخ حداکثر یک روز کاری؛ و صدور بیمه‌نامه رسمی بیمه ایران از نمایندگی کد ۲۰۶۱۶."
            />
          </div>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                href: "/buy",
                icon: Wallet,
                title: "خرید آنلاین بیمه مسئولیت",
                text: "فرایند ۴ گامی از انتخاب پوشش تا تحویل بیمه‌نامه، بدون مراجعه حضوری.",
              },
              {
                href: "/order",
                icon: Calculator,
                title: "محاسبه آنلاین و ثبت سفارش",
                text: "قیمت لحظه‌ای با نرخ ۱۴۰۵ برای پزشکان، پرستاران و پیراپزشکان و مهندسین.",
              },
              {
                href: "/best-site",
                icon: BadgeCheck,
                title: "بهترین سایت برای خرید",
                text: "۷ معیار قابل راستی‌آزمایی برای انتخاب مرجع معتبر خرید بیمه مسئولیت.",
              },
              {
                href: "/quote",
                icon: MessagesSquare,
                title: "مشاوره خرید بیمه مسئولیت",
                text: "استعلام رایگان؛ کارشناس سقف تعهد و فرانشیز مناسب را پیشنهاد می‌کند.",
              },
            ].map((c) => (
              <Link
                key={c.href}
                href={c.href}
                className="group rounded-2xl border bg-card p-5 transition-colors hover:border-primary/40"
              >
                <c.icon className="size-5 text-primary" aria-hidden="true" />
                <h3 className="mt-3 text-[15px] font-extrabold">{c.title}</h3>
                <p className="mt-2 text-sm leading-7 text-muted-foreground">{c.text}</p>
                <span className="mt-3 inline-flex items-center gap-1 text-sm font-bold text-primary">
                  ادامه
                  <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-0.5" aria-hidden="true" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ (FAQPage schema) ─────────────────────────────── */}
      <section className="mx-auto w-full max-w-4xl px-4 sm:px-6">
        <JsonLd data={faqJsonLd(homeFaqs)} />
        <FaqSection
          faqs={homeFaqs}
          title="سوالات متداول بیمه مسئولیت"
        />
        <div className="mt-4 flex justify-center">
          <Button variant="outline" asChild>
            <Link href="/faq">
              همه {toFaDigits(generalFaqs.length)} پرسش و پاسخ
              <ArrowLeft className="size-4" aria-hidden="true" />
            </Link>
          </Button>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────── */}
      <section className="mx-auto w-full max-w-7xl px-4 sm:px-6">
        <CtaBanner
          title="هنوز مطمئن نیستید کدام بیمه مسئولیت برای شماست؟"
          text="دسته مربوط به حرفه یا کسب‌وکار خود را از منوی «انواع بیمه مسئولیت» انتخاب کنید، یا فرم استعلام را تکمیل کنید تا کارشناس ما ریسک و پوشش مناسب را رایگان تحلیل کند."
        />
      </section>
    </div>
  );
}
