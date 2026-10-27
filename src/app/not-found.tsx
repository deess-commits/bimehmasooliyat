import Link from "next/link";
import { FileSearch, Home, Phone, Scale, ShieldAlert } from "lucide-react";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/lib/site";

const POPULAR = [
  { href: "/liability/professional/medical-doctors", label: "بیمه مسئولیت پزشکان" },
  { href: "/liability/commercial/employers", label: "بیمه مسئولیت کارفرما" },
  { href: "/liability/commercial/contractors", label: "بیمه مسئولیت پیمانکاران" },
  { href: "/industry", label: "بیمه مسئولیت به تفکیک صنعت" },
  { href: "/compare", label: "مقایسه پوشش‌ها" },
  { href: "/dih", label: "جدول دیه" },
  { href: "/claims", label: "راهنمای خسارت" },
  { href: "/glossary", label: "واژه‌نامه بیمه" },
  { href: "/quote", label: "استعلام قیمت" },
];

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[60vh] max-w-2xl flex-col items-center justify-center px-4 py-20 text-center">
      <p className="font-extrabold text-primary" dir="ltr">
        404
      </p>
      <h1 className="mt-3 text-2xl font-extrabold">این صفحه پیدا نشد</h1>
      <p className="mt-3 max-w-md text-sm leading-7 text-muted-foreground">
        ممکن است نشانی اشتباه باشد یا این نوع بیمه مسئولیت در فهرست ما وجود نداشته باشد. از فهرست کامل
        انواع بیمه مسئولیت شروع کنید.
      </p>
      <div className="mt-6 flex flex-wrap justify-center gap-3">
        <Button asChild>
          <Link href="/liability">
            <FileSearch className="size-4" aria-hidden="true" />
            انواع بیمه مسئولیت
          </Link>
        </Button>
        <Button variant="outline" asChild>
          <Link href="/">
            <Home className="size-4" aria-hidden="true" />
            صفحه اصلی
          </Link>
        </Button>
        <Button variant="outline" asChild>
          <a href={`tel:${siteConfig.nap.phone}`}>
            <Phone className="size-4" aria-hidden="true" />
            <span dir="ltr">{siteConfig.nap.phoneDisplay}</span>
          </a>
        </Button>
      </div>

      <nav aria-label="صفحات پرکاربرد" className="mt-10 w-full rounded-2xl border bg-card p-5 text-start">
        <p className="flex items-center gap-2 text-sm font-extrabold">
          <ShieldAlert className="size-4 text-primary" aria-hidden="true" />
          صفحات پرکاربرد
        </p>
        <ul className="mt-3 grid gap-2 sm:grid-cols-2">
          {POPULAR.map((p) => (
            <li key={p.href}>
              <Link
                href={p.href}
                className="flex items-center justify-between gap-2 rounded-lg border bg-background p-2.5 text-[13px] font-semibold transition-colors hover:border-primary/40 hover:text-primary"
              >
                {p.label}
                <Scale className="size-3.5 shrink-0 text-muted-foreground" aria-hidden="true" />
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
