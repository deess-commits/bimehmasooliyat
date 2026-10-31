import type { Metadata } from "next";
import { Star, ShieldCheck, MessageSquareQuote } from "lucide-react";
import { AnswerBlock } from "@/components/answer-block";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { ReviewForm } from "@/components/review-form";
import { SectionHeading } from "@/components/section-heading";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getAllProducts } from "@/lib/data";
import { getApprovedReviews } from "@/lib/reviews";
import { JsonLd } from "@/lib/seo";
import { faDate } from "@/lib/format";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "نظرات مشتریان بیمه مسئولیت — تجربه واقعی بیمه‌گزاران",
  description:
    "نظرات واقعی بیمه‌گزاران بیمه مسئولیت درباره صدور، مشاوره سقف تعهد و روند خسارت. فقط نظرات بررسی‌شده و تأییدشده منتشر می‌شود.",
  alternates: { canonical: "/reviews" },
};

function Stars({ rating }: { rating: number }) {
  return (
    <span className="inline-flex items-center gap-0.5" aria-label={`امتیاز ${rating} از ۵`}>
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          className={`size-4 ${i <= rating ? "fill-amber-400 text-amber-500" : "text-muted-foreground/40"}`}
          aria-hidden="true"
        />
      ))}
    </span>
  );
}

export default async function ReviewsPage() {
  const [reviews, products] = await Promise.all([
    getApprovedReviews(),
    getAllProducts(),
  ]);

  const productNames = new Map(products.map((p) => [p.slug, p.nameFa]));

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      <Breadcrumbs items={[{ name: "نظرات مشتریان", href: "/reviews" }]} />

      <header className="mt-6">
        <h1 className="text-2xl font-extrabold leading-[1.6] sm:text-3xl">
          نظرات مشتریان — تجربه واقعی بیمه‌گزاران
        </h1>
      </header>

      <div className="mt-6 max-w-3xl">
        <AnswerBlock
          title="سیاست انتشار نظرات"
          text="در این صفحه فقط نظرات واقعی بیمه‌گزاران پس از بررسی و تأیید کارشناس منتشر می‌شود. برای حفظ اعتماد، امتیاز جمعی ساختگی نمایش داده نمی‌شود؛ هر نظر با امتیاز فردی خودِ نویسنده درج می‌شود و می‌توانید پیش و پس از خرید، با کارشناس مستقیماً گفت‌وگو کنید."
        />
      </div>

      <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_380px]">
        {/* Approved reviews */}
        <section aria-labelledby="list-h">
          <SectionHeading
            icon={MessageSquareQuote}
            title={reviews.length > 0 ? `${reviews.length} نظر تأییدشده` : "نظرات تأییدشده"}
            hint="جدیدترین نظرها در ابتدا"
          />
          {reviews.length === 0 ? (
            <Card className="border-dashed">
              <CardContent className="flex flex-col items-center gap-3 p-10 text-center">
                <ShieldCheck className="size-10 text-primary" aria-hidden="true" />
                <p className="font-bold">هنوز نظری تأیید نشده است</p>
                <p className="max-w-md text-sm leading-7 text-muted-foreground">
                  شما می‌توانید اولین نفر باشید؛ تجربه خود از خرید یا خسارت بیمه مسئولیت را بنویسید تا پس از
                  بررسی، همین‌جا منتشر شود.
                </p>
              </CardContent>
            </Card>
          ) : (
            <ul className="space-y-4">
              {reviews.map((r) => (
                <li key={r.id}>
                  <Card className="py-5">
                    <CardContent className="space-y-2.5">
                      <div className="flex flex-wrap items-center gap-2.5">
                        <span className="text-sm font-bold">{r.name}</span>
                        {r.city ? <Badge variant="outline" className="text-[11px]">{r.city}</Badge> : null}
                        {r.productSlug && productNames.get(r.productSlug) ? (
                          <Badge variant="secondary" className="text-[11px]">
                            {productNames.get(r.productSlug)}
                          </Badge>
                        ) : null}
                        <Stars rating={r.rating} />
                        <span className="ms-auto text-[11px] text-muted-foreground">
                          {faDate(r.createdAt.toISOString())}
                        </span>
                      </div>
                      <p className="text-sm leading-7 text-muted-foreground">{r.text}</p>
                    </CardContent>
                  </Card>
                </li>
              ))}
            </ul>
          )}
        </section>

        {/* Form */}
        <aside className="h-fit lg:sticky lg:top-24" aria-label="ثبت نظر جدید">
          <SectionHeading icon={Star} title="تجربه خود را ثبت کنید" />
          <ReviewForm
            products={products.map((p) => ({ slug: p.slug, nameFa: p.nameFa }))}
          />
        </aside>
      </div>
    </div>
  );
}
