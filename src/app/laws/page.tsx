import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, BookMarked, Scale, ShieldQuestion } from "lucide-react";
import { AnswerBlock } from "@/components/answer-block";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { CtaBanner } from "@/components/cta-banner";
import { FaqSection } from "@/components/faq-section";
import { LegalDisclaimer } from "@/components/legal-disclaimer";
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
import { getLegalSources } from "@/lib/data";
import { JsonLd, faqJsonLd } from "@/lib/seo";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "قوانین و مبناهای حقوقی بیمه مسئولیت در ایران",
  description:
    "نقشه کامل قوانین مرتبط با بیمه مسئولیت: قانون مسئولیت مدنی ۱۳۳۹، مواد ۳۲۸ تا ۳۳۵ قانون مدنی، ماده ۳۰ و ۳۱ قانون بیمه، ماده ۹۱ قانون کار و کتاب دیات — به زبان ساده.",
  alternates: { canonical: "/laws" },
};

const LAW_FAQS = [
  {
    question: "قانون اصلی بیمه مسئولیت در ایران کدام است؟",
    answer:
      "مبنای اصلی، قانون مسئولیت مدنی مصوب ۱۳۳۹ است که در مواد ۱ تا ۱۱ اصل جبران خسارت مبتنی بر تقصیر را تعریف می‌کند. قواعد تکمیلی در مواد ۳۲۸ به بعد قانون مدنی، ماده ۹۱ قانون کار و مواد ۳۰ و ۳۱ قانون بیمه ۱۳۱۶ و کتاب دیات قانون مجازات اسلامی آمده است.",
  },
  {
    question: "آیا خرید بیمه مسئولیت اجباری است؟",
    answer:
      "برای برخی فعالیت‌ها الزام قانونی یا قراردادی وجود دارد؛ مانند مسئولیت کارفرما در شمول ماده ۹۲ قانون کار، الزام بیمه مسئولیت مهندسان ناظر در مقررات نظام مهندسی و شرط قراردادهای پیمانکاری عمومی. برای سایر مشاغل خرید بیمه مسئولیت اختیاری اما از نظر مدیریت ریسک ضروری است.",
  },
  {
    question: "ماده ۳۰ قانون بیمه چه می‌گوید؟",
    answer:
      "به‌موجب ماده ۳۰ قانون بیمه، پس از پرداخت خسارت، بیمه‌گر در حدود مبلغی که پرداخت کرده جایگزین زیان‌دیده می‌شود و می‌تواند به مسئول حادثه مراجعه کند. ماده ۳۱ نیز حق دعوای مستقیم زیان‌دیده علیه بیمه‌گر مسئول را به رسمیت می‌شناسد.",
  },
];

const KEY_ARTICLES = [
  {
    law: "قانون مسئولیت مدنی ۱۳۳۹",
    ref: "مواد ۱ تا ۱۱",
    topic: "اصل جبران خسارت مبتنی بر تقصیر؛ فعل یا ترک فعل زیان‌بار و ضمان قهری",
    who: "همه اشخاص و کسب‌وکارها",
  },
  {
    law: "قانون مدنی",
    ref: "مواد ۳۲۸ تا ۳۳۵",
    topic: "مسئولیت متصرفی، سقوط اجسام از بنا و خرابی ساختمان",
    who: "مالکان و مستأجران ساختمان",
  },
  {
    law: "قانون کار ۱۳۶۹",
    ref: "ماده ۹۱ و ۹۲",
    topic: "مسئولیت کارفرما در حوادث ناشی از کار و الزام تهیه بیمه‌نامه",
    who: "کارفرمایان",
  },
  {
    law: "قانون بیمه ۱۳۱۶",
    ref: "ماده ۳۰ و ۳۱",
    topic: "جایگزینی بیمه‌گر پس از پرداخت و دعوای مستقیم زیان‌دیده علیه بیمه‌گر",
    who: "زیان‌دیدگان و بیمه‌گزاران",
  },
  {
    law: "قانون مجازات اسلامی",
    ref: "مواد ۴۴۹ به بعد (دیات)",
    topic: "مبلغ دیه، تفاوت ماه حرام، دیه نقص عضو و ارش",
    who: "مشاغل پرخطر جانی",
  },
  {
    law: "آیین‌نامه ۵۷ بیمه مرکزی",
    ref: "شرایط عمومی",
    topic: "شرایط عمومی بیمه مسئولیت مدنی در قبال اشخاص ثالث",
    who: "بیمه‌گزاران مسئولیت عمومی",
  },
];

export default async function LawsPage() {
  const sources = await getLegalSources();

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      <JsonLd data={faqJsonLd(LAW_FAQS)} />
      <Breadcrumbs items={[{ name: "قوانین بیمه مسئولیت", href: "/laws" }]} />

      <header className="mt-6">
        <h1 className="text-2xl font-extrabold leading-[1.6] sm:text-3xl">
          قوانین و مبناهای حقوقی بیمه مسئولیت در ایران
        </h1>
      </header>

      <div className="mt-6 max-w-3xl">
        <AnswerBlock
          title="مبنای حقوقی بیمه مسئولیت چیست؟"
          text="مبنای بیمه مسئولیت در ایران، قانون مسئولیت مدنی مصوب ۱۳۳۹ است: هرگاه زیان‌باران با فعل یا ترک فعل خود و بدون مجوز قانونی به دیگری زیان برساند، مسئول جبران است. قواعد تکمیلی در مواد ۳۲۸ تا ۳۳۵ قانون مدنی، ماده ۹۱ و ۹۲ قانون کار، مواد ۳۰ و ۳۱ قانون بیمه ۱۳۱۶ و کتاب دیات قانون مجازات اسلامی آمده است."
        />
      </div>

      {/* Key articles table */}
      <section aria-labelledby="key-h" className="mt-10">
        <SectionHeading
          icon={Scale}
          title="نقشه مواد کلیدی — به زبان ساده"
          hint="برای متن دقیق هر ماده، به نسخه رسمی قوانین مراجعه کنید."
        />
        <div className="overflow-x-auto rounded-2xl border nice-scroll">
          <Table>
            <TableHeader>
              <TableRow className="bg-accent/60">
                <TableHead className="text-start whitespace-nowrap">قانون</TableHead>
                <TableHead className="text-start whitespace-nowrap">مواد</TableHead>
                <TableHead className="text-start">موضوع کلیدی</TableHead>
                <TableHead className="text-start whitespace-nowrap">برای چه کسی؟</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {KEY_ARTICLES.map((a) => (
                <TableRow key={a.ref}>
                  <TableCell className="align-top font-bold">{a.law}</TableCell>
                  <TableCell className="align-top text-sm whitespace-nowrap text-muted-foreground">{a.ref}</TableCell>
                  <TableCell className="align-top text-sm leading-7 text-muted-foreground">{a.topic}</TableCell>
                  <TableCell className="align-top text-sm whitespace-nowrap">{a.who}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </section>

      {/* Curated sources from DB */}
      <section aria-labelledby="src-h" className="mt-12">
        <SectionHeading icon={BookMarked} title="منابع حقوقی منتخب تیم محتوا" hint="پایه علمی همه صفحات این مرجع." />
        <div className="grid gap-3 sm:grid-cols-2">
          {sources.map((s) => (
            <Card key={s.reference} className="py-4">
              <CardHeader className="pb-1.5">
                <CardTitle className="text-sm">
                  {s.title} <span className="font-medium text-muted-foreground">— {s.reference}</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-[13px] leading-7 text-muted-foreground">{s.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="mx-auto mt-12 max-w-4xl">
        <FaqSection faqs={LAW_FAQS} title="سوالات متداول قوانین بیمه مسئولیت" />
      </section>

      {/* Cross links */}
      <section aria-labelledby="rel-h" className="mt-12">
        <SectionHeading icon={ShieldQuestion} title="مراحل بعدی" />
        <div className="flex flex-wrap gap-2.5">
          <Link
            href="/liability"
            className="inline-flex items-center gap-1.5 rounded-full border bg-card px-4 py-2 text-sm font-semibold transition-colors hover:border-primary/40 hover:text-primary"
          >
            انواع بیمه مسئولیت
            <ArrowLeft className="size-3.5" aria-hidden="true" />
          </Link>
          <Link
            href="/glossary"
            className="inline-flex items-center gap-1.5 rounded-full border bg-card px-4 py-2 text-sm font-semibold transition-colors hover:border-primary/40 hover:text-primary"
          >
            واژه‌نامه اصطلاحات
            <ArrowLeft className="size-3.5" aria-hidden="true" />
          </Link>
          <Link
            href="/dih"
            className="inline-flex items-center gap-1.5 rounded-full border bg-card px-4 py-2 text-sm font-semibold transition-colors hover:border-primary/40 hover:text-primary"
          >
            جدول دیه ۱۴۰۴
            <ArrowLeft className="size-3.5" aria-hidden="true" />
          </Link>
        </div>
      </section>

      <div className="mt-10 max-w-3xl">
        <LegalDisclaimer />
      </div>

      <div className="mt-8">
        <CtaBanner
          title="بیمه‌نامه‌ای هم‌خوان با الزامات قانونی فعالیت خود بگیرید"
          text="کارشناس ما می‌داند کدام فعالیت‌ها الزام قانونی بیمه مسئولیت دارند و حداقل سقف لازم برای شما چقدر است — مشاوره رایگان."
        />
      </div>
    </div>
  );
}
