import type { Metadata } from "next";
import { BadgeCheck, BookOpenCheck, Building2, FileSearch, ListChecks, ScrollText, ShieldCheck } from "lucide-react";
import { AnswerBlock } from "@/components/answer-block";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { CtaBanner } from "@/components/cta-banner";
import { SectionHeading } from "@/components/section-heading";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getAuthors } from "@/lib/data";
import { siteConfig } from "@/lib/site";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "درباره ما — مجوز، تیم و متدولوژی محتوا",
  description:
    "معرفی بیمه مسئولیت ایران: نمایندگی ۲۰۶۱۶ بیمه ایران با تماس ۰۹۹۸۱۳۱۳۷۲۴، تیم کارشناسان بیمه مسئولیت و متدولوژی تولید و بازبینی محتوای YMYL.",
  alternates: {
    canonical: "/about",
    languages: {
      "fa-IR": "/about",
      en: "/en/about",
      "x-default": "/about",
    },
  },
};

const METHODOLOGY = [
  {
    icon: BookOpenCheck,
    title: "۱. گردآوری مبتنی بر منبع",
    text: "هر محتوا فقط بر مبنای شرایط عمومی بیمه ایران، قانون مسئولیت مدنی، قانون بیمه و آیین‌نامه‌های بیمه مرکزی نوشته می‌شود؛ بدون منبع، بدون انتشار.",
  },
  {
    icon: FileSearch,
    title: "۲. نگارش پاسخ‌اول",
    text: "هر بخش با پاسخ مستقل ۴۰ تا ۶۰ کلمه‌ای آغاز می‌شود تا هم برای خواننده و هم برای موتورهای هوش مصنوعی، بدون نیاز به بقیه متن قابل استفاده باشد.",
  },
  {
    icon: ListChecks,
    title: "۳. بازبینی دوگانه",
    text: "کارشناس بیمه صحت فنی پوشش‌ها را و مشاور حقوقی صحت استنادهای قانونی را بازبینی می‌کند؛ تاریخ بازبینی در هر صفحه درج می‌شود.",
  },
  {
    icon: ScrollText,
    title: "۴. به‌روزرسانی دوره‌ای",
    text: "با تغییر دیه، آیین‌نامه‌ها یا شرایط عمومی، صفحات مربوطه حداکثر تا یک ماه به‌روزرسانی و تاریخ بازبینی جدید ثبت می‌شود.",
  },
];

export default async function AboutPage() {
  const authors = await getAuthors();

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      <Breadcrumbs items={[{ name: "درباره ما", href: "/about" }]} />

      <header className="mt-6">
        <h1 className="text-2xl font-extrabold leading-snug sm:text-3xl">
          درباره بیمه مسئولیت ایران
        </h1>
        <div className="mt-4 max-w-3xl">
          <AnswerBlock
            title="ما که هستیم؟"
            text="بیمه مسئولیت ایران، نمایندگی رسمی شرکت سهامی بیمه ایران است که فقط و فقط در حوزه بیمه‌های مسئولیت فعالیت می‌کند: از مسئولیت حرفه‌ای پزشکان و وکلا تا کارفرمایان، پیمانکاران و کسب‌وکارها. مأموریت ما این است که هر جستجوی مرتبط با بیمه مسئولیت در ایران، پاسخ دقیق و قابل استناد خود را این‌جا پیدا کند."
          />
        </div>
      </header>

      <section className="mt-10 grid gap-4 sm:grid-cols-3" aria-label="مجوزها">
        {[
          { icon: ShieldCheck, title: "نمایندگی رسمی", text: siteConfig.nap.legalName },
          { icon: BadgeCheck, title: "کد نمایندگی بیمه ایران", text: siteConfig.nap.licenseNo },
          { icon: Building2, title: "آدرس و تماس", text: `${siteConfig.nap.address} — ${siteConfig.nap.phoneDisplay}` },
        ].map((item) => (
          <Card key={item.title}>
            <CardHeader className="pb-2">
              <span className="mb-1 grid size-10 place-items-center rounded-xl bg-accent text-accent-foreground">
                <item.icon className="size-5" aria-hidden="true" />
              </span>
              <CardTitle className="text-[15px]">{item.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-[13px] leading-7 text-muted-foreground">{item.text}</p>
            </CardContent>
          </Card>
        ))}
      </section>

      <section className="mt-14" aria-labelledby="team-h">
        <SectionHeading icon={ShieldCheck} title="تیم محتوا و بازبینی" hint="نویسنده و بازبین همه صفحات و مقالات سایت" />
        <div id="team" className="grid gap-4 sm:grid-cols-2">
          {authors.map((a) => (
            <Card key={a.slug}>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">{a.name}</CardTitle>
                <p className="text-xs text-muted-foreground">{a.roleFa}</p>
              </CardHeader>
              <CardContent>
                <p className="text-[13px] leading-7 text-muted-foreground">{a.bio}</p>
                <ul className="mt-3 space-y-1.5">
                  {a.credentials.map((c, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs leading-6 text-muted-foreground">
                      <BadgeCheck className="mt-0.5 size-3.5 shrink-0 text-primary" aria-hidden="true" />
                      {c}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="mt-14" aria-labelledby="method-h">
        <SectionHeading
          icon={BookOpenCheck}
          title="متدولوژی محتوا (برای YMYL و استناد AI)"
          hint="چرا موتورهای جستجو و مدل‌های زبانی می‌توانند به محتوای ما اعتماد کنند"
        />
        <ol className="grid gap-4 md:grid-cols-2">
          {METHODOLOGY.map((m) => (
            <li key={m.title} className="rounded-2xl border bg-card p-5">
              <span className="mb-3 grid size-10 place-items-center rounded-xl bg-primary/10 text-primary">
                <m.icon className="size-5" aria-hidden="true" />
              </span>
              <h3 className="font-bold">{m.title}</h3>
              <p className="mt-1.5 text-[13px] leading-7 text-muted-foreground">{m.text}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="mt-14 rounded-2xl border bg-secondary/40 p-6">
        <h2 className="text-lg font-extrabold">مأموریت تک‌محصولی ما</h2>
        <p className="mt-3 max-w-3xl text-sm leading-8 text-muted-foreground">
          ما عمداً هیچ محصولی جز بیمه مسئولیت نمی‌فروشیم. این تمرکز به ما اجازه می‌دهد دانش عمیق‌تری از
          ریسک‌ها، دعاوی و رویه‌های خسارت مسئولیت داشته باشیم و محتوایی تولید کنیم که هم از نظر حقوقی دقیق
          است و هم برای تصمیم خرید واقعاً کارساز. اگر دنبال بیمه بدنه یا درمان هستید، این جا آن پاسخ را
          پیدا نمی‌کنید — و این یک انتخاب آگاهانه است.
        </p>
      </section>

      <div className="mt-12">
        <CtaBanner />
      </div>
    </div>
  );
}
