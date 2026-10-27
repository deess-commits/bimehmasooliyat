import type { Metadata } from "next";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { ContactForm } from "@/components/contact-form";
import { CtaBanner } from "@/components/cta-banner";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "تماس با ما — اعلام خسارت، مشاوره و استعلام",
  description:
    "تماس با بیمه مسئولیت ایران: تلفن، آدرس، ساعات کاری و فرم پیام. برای اعلام خسارت فوری از تماس تلفنی استفاده کنید.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      <Breadcrumbs items={[{ name: "تماس با ما", href: "/contact" }]} />

      <header className="mt-6">
        <h1 className="text-2xl font-extrabold leading-snug sm:text-3xl">تماس با بیمه مسئولیت ایران</h1>
        <p className="mt-3 max-w-2xl text-[15px] leading-8 text-muted-foreground">
          برای استعلام قیمت، اعلام خسارت یا سوالات فنی در تماس باشید. NAP ما در همه دایرکتوری‌ها و Google
          Business Profile یکسان است.
        </p>
      </header>

      <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_360px]">
        <ContactForm />

        <aside className="space-y-4">
          <div className="rounded-2xl border bg-card p-5">
            <h2 className="text-sm font-bold">اطلاعات تماس (NAP)</h2>
            <ul className="mt-4 space-y-3.5 text-sm">
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 size-4.5 shrink-0 text-primary" aria-hidden="true" />
                <span className="leading-7">{siteConfig.nap.address}</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="size-4.5 shrink-0 text-primary" aria-hidden="true" />
                <a href={`tel:${siteConfig.nap.phone}`} dir="ltr" className="font-bold hover:text-primary">
                  {siteConfig.nap.phoneDisplay}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="size-4.5 shrink-0 text-primary" aria-hidden="true" />
                <a href={`mailto:${siteConfig.nap.email}`} dir="ltr" className="hover:text-primary">
                  {siteConfig.nap.email}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Clock className="size-4.5 shrink-0 text-primary" aria-hidden="true" />
                <span>{siteConfig.nap.hours}</span>
              </li>
            </ul>
          </div>

          <div className="rounded-2xl border-2 border-destructive/25 bg-destructive/5 p-5">
            <h2 className="text-sm font-bold text-destructive">اعلام خسارت فوری</h2>
            <p className="mt-2 text-[13px] leading-7 text-muted-foreground">
              رخداد را حداکثر تا ۵ روز کاری اعلام کنید (ماده ۳۰ قانون بیمه). تماس تلفنی، زمانی را از دست
              نمی‌دهد:
            </p>
            <a
              href={`tel:${siteConfig.nap.phone}`}
              className="mt-3 block rounded-lg bg-destructive px-4 py-3 text-center text-sm font-bold text-white hover:opacity-90"
              dir="ltr"
            >
              {siteConfig.nap.phoneDisplay}
            </a>
          </div>

          <div className="rounded-2xl border bg-secondary/40 p-5 text-[13px] leading-7 text-muted-foreground">
            <h2 className="text-sm font-bold text-foreground">{siteConfig.nap.legalName}</h2>
            <p className="mt-1">{siteConfig.nap.licenseNo}</p>
          </div>
        </aside>
      </div>

      <div className="mt-14">
        <CtaBanner />
      </div>
    </div>
  );
}
