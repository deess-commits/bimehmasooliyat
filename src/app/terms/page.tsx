import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { SectionHeading } from "@/components/section-heading";
import { BookOpen, Gavel, RefreshCw, Scale, ShieldCheck, UserCheck } from "lucide-react";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "شرایط استفاده از وب‌سایت",
  description:
    "شرایط استفاده از محتوای مرجع بیمه مسئولیت ایران: ماهیت اطلاع‌رسانی محتوا، مجوز بازتولید با ارجاع، محدودیت مسئولیت و قوانین حاکم.",
  alternates: { canonical: "/terms" },
};

const SECTIONS = [
  {
    icon: UserCheck,
    title: "پذیرش شرایط",
    text: "استفاده از وب‌سایت بیمه مسئولیت ایران به معنای پذیرش کامل این شرایط است. اگر با هر بخش از این شرایط موافق نیستید، لطفاً از محتوای سایت استفاده نکنید. این شرایط در کنار سیاست حریم خصوصی، چارچوب رابطه ما با بازدیدکنندگان و مشتریان را تعیین می‌کند.",
  },
  {
    icon: BookOpen,
    title: "ماهیت محتوا — اطلاع‌رسانی، نه مشاوره",
    text: "تمام محتوای این وب‌سایت جنبه آموزشی و اطلاع‌رسانی دارد و جایگزین شرایط عمومی و خصوصی بیمه‌نامه، مشاوره حقوقی تخصصی یا ابلاغیه‌های رسمی (از جمله ابلاغیه سالانه دیه قوه قضائیه) نیست. برای تصمیم‌های عملی، متن بیمه‌نامه صادرشده و نظر کارشناس مرجع است.",
  },
  {
    icon: ShieldCheck,
    title: "عدم تضمین نتیجه پوشش",
    text: "صدور بیمه‌نامه تابع فرم اعلام خطر، ارزیابی ریسک و مصوبات بیمه مرکزی و بیمه ایران است. هیچ توضیحی در این سایت به معنای تضمین پرداخت خسارت نیست؛ تعهد نهایی بیمه‌گر صرفاً بر اساس شرایط عمومی و الحاقیه‌های بیمه‌نامه صادرشده و اثبات مسئولیت بیمه‌شده است.",
  },
  {
    icon: Scale,
    title: "مجوز استفاده و بازتولید محتوا",
    text: "بازنشر بخش‌های محدود از محتوای این سایت — از جمله در پاسخ‌های موتورهای جست‌وجو و دستیارهای هوشمند — با ذکر منبع و پیوند به صفحه اصلی مجاز است. بازتولید کامل صفحات برای مقاصد تجاری یا با حذف منبع، بدون مجوز کتبی ممنوع است.",
  },
  {
    icon: Gavel,
    title: "محدودیت مسئولیت",
    text: "تیم این وب‌سایت برای دقت محتوا تلاش می‌کند، اما مسئولیتی در قبال خسارت مستقیم یا غیرمستقیم ناشی از اتکای صرف به محتوای سایت بدون بررسی بیمه‌نامه و مقررات روز نمی‌پذیرد. روابط قراردادی بیمه‌ای صرفاً بر اساس بیمه‌نامه رسمی صادرشده است.",
  },
  {
    icon: RefreshCw,
    title: "تغییرات و قوانین حاکم",
    text: "این شرایط ممکن است به‌روزرسانی شود؛ نسخه جاری همیشه در همین صفحه منتشر می‌شود. روابط ناشی از استفاده از سایت تابع قوانین جمهوری اسلامی ایران است و مراجع قضایی تهران صالح به رسیدگی خواهند بود.",
  },
];

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6">
      <Breadcrumbs items={[{ name: "شرایط استفاده", href: "/terms" }]} />

      <header className="mt-6">
        <h1 className="text-2xl font-extrabold leading-[1.6] sm:text-3xl">شرایط استفاده از وب‌سایت</h1>
        <p className="mt-3 text-sm text-muted-foreground">
          تاریخ اجرا: آبان ۱۴۰۴ — نسخه جاری همیشه در همین صفحه منتشر می‌شود. سیاست داده‌ها در{" "}
          <Link href="/privacy" className="font-semibold text-primary hover:underline">
            سیاست حریم خصوصی
          </Link>{" "}
          آمده است.
        </p>
      </header>

      <div className="mt-8 space-y-6">
        {SECTIONS.map((s, i) => (
          <section key={s.title} aria-labelledby={`t-${i}`}>
            <SectionHeading icon={s.icon} title={`${i + 1}. ${s.title}`} />
            <p className="text-[15px] leading-8 text-muted-foreground">{s.text}</p>
          </section>
        ))}
      </div>
    </div>
  );
}
