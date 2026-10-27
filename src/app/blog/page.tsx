import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, BookOpen, Clock3 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { AnswerBlock } from "@/components/answer-block";
import { CtaBanner } from "@/components/cta-banner";
import { JsonLd, itemListJsonLd } from "@/lib/seo";
import { getArticles } from "@/lib/data";
import { faDate, toFaDigits } from "@/lib/format";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "دانشنامه بیمه مسئولیت — تعریف، دیه، فرانشیز و راهنمای خسارت",
  description:
    "مقالات تخصصی بیمه مسئولیت: تعریف قانونی، تفاوت مسئولیت مدنی و کیفری، دیه ۱۴۰۴، فرانشیز، مراحل خسارت و مقایسه با تأمین اجتماعی.",
  alternates: { canonical: "/blog" },
};

export default async function BlogIndexPage() {
  const articles = await getArticles();

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      <JsonLd
        data={itemListJsonLd({
          name: "دانشنامه بیمه مسئولیت — فهرست مقالات",
          url: "/blog",
          items: articles.map((a) => ({ name: a.title, href: `/blog/${a.slug}` })),
        })}
      />
      <Breadcrumbs items={[{ name: "دانشنامه", href: "/blog" }]} />

      <header className="mt-6">
        <h1 className="text-2xl font-extrabold leading-snug sm:text-3xl">دانشنامه بیمه مسئولیت</h1>
        <div className="mt-4 max-w-3xl">
          <AnswerBlock
            title="دانشنامه چیست؟"
            text="دانشنامه بیمه مسئولیت ایران، پاسخ‌های قانون‌محور و بازبینی‌شده به جستجوهای رایج بیمه مسئولیت است: از تعریف قانونی و تفاوت مسئولیت مدنی و کیفری تا جدول دیه، فرانشیز و مراحل خسارت. هر مقاله پیش از انتشار توسط کارشناس بیمه و مشاور حقوقی بازبینی می‌شود."
          />
        </div>
      </header>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {articles.map((a) => (
          <Card key={a.slug} className="group flex h-full flex-col transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md">
            <CardHeader className="pb-3">
              <Badge variant="secondary" className="w-fit text-[11px]">
                <Clock3 className="me-1 size-3" aria-hidden="true" />
                {toFaDigits(a.readMinutes)} دقیقه مطالعه
              </Badge>
              <CardTitle className="mt-2 text-[15px] leading-7 group-hover:text-primary">
                <Link href={`/blog/${a.slug}`}>{a.title}</Link>
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-1 flex-col justify-between">
              <p className="text-[13px] leading-7 text-muted-foreground">{a.excerpt}</p>
              <div className="mt-4 flex items-center justify-between border-t pt-3 text-xs">
                <span className="text-muted-foreground">بازبینی: {faDate(a.reviewDate)}</span>
                <span className="inline-flex items-center gap-1 font-bold text-primary">
                  خواندن
                  <ArrowLeft className="size-3.5" aria-hidden="true" />
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-12">
        <CtaBanner
          title="سوال تخصصی دارید که در مقالات نیست؟"
          text="از کارشناس بیمه مسئولیت ما بپرسید — پاسخ رایگان و مبتنی بر مقررات جاری."
          href="/contact"
          cta="پرسش از کارشناس"
        />
      </div>
    </div>
  );
}
