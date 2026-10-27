"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { ChevronDown, FileSearch, Landmark, Menu, Phone, Stethoscope, Factory, Users, BookOpen, ScrollText, Gauge, Percent, RefreshCw, FileText, Scale, GitCompareArrows, ClipboardCheck, Rocket, FileSignature, Briefcase, HeartPulse, CalendarHeart } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { siteConfig } from "@/lib/site";

const CATEGORY_LINKS = [
  { href: "/liability/professional", label: "مسئولیت حرفه‌ای", desc: "پزشکان، وکلا، مهندسان", icon: Stethoscope },
  { href: "/liability/commercial", label: "مسئولیت کسب‌وکار و صنعت", desc: "کارفرما، پیمانکار، تولیدکننده", icon: Factory },
  { href: "/liability/corporate", label: "مسئولیت شرکتی", desc: "مدیران (D&O)، سایبری", icon: Landmark },
  { href: "/liability/public", label: "مسئولیت عمومی و فردی", desc: "والدین، حیوانات، رویدادها", icon: Users },
];

const GUIDE_LINKS = [
  { href: "/guides", label: "همه راهنماها (هاب)", icon: ScrollText },
  { href: "/coverage-limit", label: "انتخاب سقف تعهد", icon: Gauge },
  { href: "/deductible", label: "انتخاب فرانشیز", icon: Percent },
  { href: "/renewal", label: "تمدید و الحاقیه", icon: RefreshCw },
  { href: "/documents", label: "مدارک و صدور", icon: FileText },
  { href: "/liability-mandatory", label: "اجباری یا اختیاری؟", icon: Scale },
  { href: "/liability-vs-other-insurance", label: "تفاوت با خسارتی", icon: GitCompareArrows },
  { href: "/policy-review-checklist", label: "چک‌لیست قبل از امضا", icon: ClipboardCheck },
  { href: "/startup-guide", label: "شرکت‌های تازه‌تأسیس", icon: Rocket },
  { href: "/contract-tender", label: "قراردادها و مناقصات", icon: FileSignature },
  { href: "/professional-vs-general", label: "حرفه‌ای یا عمومی؟", icon: Briefcase },
  { href: "/medical-liability-guide", label: "گروه‌های درمانی", icon: HeartPulse },
  { href: "/events-insurance-guide", label: "رویدادها و همایش‌ها", icon: CalendarHeart },
];

const NAV = [
  { href: "/claims", label: "فرایند خسارت" },
  { href: "/blog", label: "دانشنامه" },
  { href: "/faq", label: "سوالات متداول" },
  { href: "/track", label: "پیگیری استعلام" },
  { href: "/about", label: "درباره ما" },
  { href: "/contact", label: "تماس" },
];

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  // نسخه انگلیسی هدر خودش را دارد — هدر فارسی فقط برای مسیرهای فارسی
  if (pathname.startsWith("/en")) return null;

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/85 backdrop-blur supports-[backdrop-filter]:bg-background/70">
      <div className="mx-auto flex h-16 max-w-7xl items-center gap-2 px-4 sm:px-6">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 me-2 shrink-0" aria-label="بیمه مسئولیت ایران — صفحه اصلی">
          <img src="/bimeh-iran-emblem.png" alt="آرم بیمه ایران" className="size-10 shrink-0 rounded-xl bg-white object-contain p-1 shadow-sm ring-1 ring-black/5" />
          <span className="hidden sm:block leading-tight">
            <span className="block font-extrabold text-[15px]">بیمه مسئولیت ایران</span>
            <span className="block text-[11px] text-muted-foreground">نماینده رسمی بیمه ایران</span>
          </span>
        </Link>

        {/* Desktop nav — فقط در xl و بالاتر؛ زیر آن منوی Sheet */}
        <nav className="hidden xl:flex items-center gap-0.5 mx-auto" aria-label="ناوبری اصلی">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="gap-1">
                انواع بیمه مسئولیت
                <ChevronDown className="size-4" aria-hidden="true" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-80 p-2">
              <DropdownMenuLabel className="text-xs text-muted-foreground">بر اساس مخاطب</DropdownMenuLabel>
              {CATEGORY_LINKS.map((c) => (
                <DropdownMenuItem key={c.href} asChild className="items-start gap-3 py-3 cursor-pointer">
                  <Link href={c.href}>
                    <span className="mt-0.5 grid size-9 shrink-0 place-items-center rounded-lg bg-accent text-accent-foreground">
                      <c.icon className="size-4.5" aria-hidden="true" />
                    </span>
                    <span>
                      <span className="block font-semibold text-sm">{c.label}</span>
                      <span className="block text-xs text-muted-foreground">{c.desc}</span>
                    </span>
                  </Link>
                </DropdownMenuItem>
              ))}
              <DropdownMenuSeparator />
              <DropdownMenuLabel className="text-xs text-muted-foreground">راهنماهای عمومی</DropdownMenuLabel>
              {GUIDE_LINKS.map((g) => (
                <DropdownMenuItem key={g.href} asChild className="cursor-pointer">
                  <Link href={g.href}>
                    <g.icon className="size-4" aria-hidden="true" />
                    {g.label}
                  </Link>
                </DropdownMenuItem>
              ))}
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild className="cursor-pointer">
                <Link href="/liability" className="text-primary font-semibold">
                  <BookOpen className="size-4" aria-hidden="true" />
                  مشاهده همه {33}+ نوع بیمه مسئولیت
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild className="cursor-pointer">
                <Link href="/industry">
                  <Factory className="size-4" aria-hidden="true" />
                  بیمه مسئولیت به تفکیک صنعت
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {NAV.map((n) => (
            <Button key={n.href} variant="ghost" size="sm" asChild className={pathname === n.href ? "bg-accent" : ""}>
              <Link href={n.href}>{n.label}</Link>
            </Button>
          ))}

          {/* Desktop search */}
          <form action="/search" method="GET" role="search" className="hidden xl:flex items-center">
            <label htmlFor="hd-search" className="sr-only">جست‌وجو در سایت</label>
            <div className="relative">
              <FileSearch className="pointer-events-none absolute end-2.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
              <input
                id="hd-search"
                type="search"
                name="q"
                placeholder="جست‌وجو…"
                className="h-9 w-36 rounded-full border bg-background pe-9 ps-4 text-sm outline-none transition-all placeholder:text-muted-foreground focus:w-48 focus:border-primary/50"
              />
            </div>
          </form>
        </nav>

        {/* CTA + mobile */}
        <div className="ms-auto flex items-center gap-2 xl:ms-0">
          {/* EN edition pill */}
          <Link
            href="/en"
            className="inline-flex h-9 items-center rounded-full border px-3 text-xs font-bold text-muted-foreground transition-colors hover:border-primary/40 hover:text-primary"
            aria-label="English edition"
          >
            EN
          </Link>
          <a
            href={`tel:${siteConfig.nap.phone}`}
            className="hidden 2xl:inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline"
            aria-label={`تماس تلفنی: ${siteConfig.nap.phoneDisplay}`}
          >
            <Phone className="size-4" aria-hidden="true" />
            <span dir="ltr">{siteConfig.nap.phoneDisplay}</span>
          </a>
          <Button asChild className="hidden sm:inline-flex">
            <Link href="/quote">
              <FileSearch className="size-4" aria-hidden="true" />
              استعلام قیمت
            </Link>
          </Button>

          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="xl:hidden" aria-label="باز کردن منو">
                <Menu className="size-5" aria-hidden="true" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-80 overflow-y-auto nice-scroll" aria-describedby={undefined}>
              <SheetHeader>
                <SheetTitle className="text-start">بیمه مسئولیت ایران</SheetTitle>
              </SheetHeader>
              <nav className="flex flex-col gap-1 px-4 pb-6" aria-label="ناوبری موبایل">
                {/* Mobile search */}
                <form action="/search" method="GET" role="search" className="mb-2">
                  <label htmlFor="mb-search" className="sr-only">جست‌وجو در سایت</label>
                  <div className="relative">
                    <FileSearch className="pointer-events-none absolute end-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
                    <input
                      id="mb-search"
                      type="search"
                      name="q"
                      placeholder="جست‌وجو در سایت…"
                      className="h-11 w-full rounded-xl border bg-background pe-10 ps-4 text-sm outline-none placeholder:text-muted-foreground focus:border-primary/50"
                    />
                  </div>
                </form>
                <p className="mt-2 mb-1 text-xs font-semibold text-muted-foreground">انواع بیمه مسئولیت</p>
                {CATEGORY_LINKS.map((c) => (
                  <Link
                    key={c.href}
                    href={c.href}
                    onClick={() => setOpen(false)}
                    className="flex items-center gap-3 rounded-lg p-2.5 hover:bg-accent"
                  >
                    <span className="grid size-9 place-items-center rounded-lg bg-accent text-accent-foreground">
                      <c.icon className="size-4.5" aria-hidden="true" />
                    </span>
                    <span className="text-sm font-medium">{c.label}</span>
                  </Link>
                ))}
                <Link
                  href="/liability"
                  onClick={() => setOpen(false)}
                  className="mt-1 flex items-center gap-2 rounded-lg p-2.5 text-sm font-semibold text-primary hover:bg-accent"
                >
                  <BookOpen className="size-4" aria-hidden="true" />
                  همه انواع بیمه مسئولیت
                </Link>
                <Link
                  href="/industry"
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-2 rounded-lg p-2.5 text-sm font-medium hover:bg-accent"
                >
                  <Factory className="size-4 text-muted-foreground" aria-hidden="true" />
                  بیمه مسئولیت به تفکیک صنعت
                </Link>
                <p className="mt-3 mb-1 text-xs font-semibold text-muted-foreground">راهنماهای عمومی</p>
                {GUIDE_LINKS.map((g) => (
                  <Link
                    key={g.href}
                    href={g.href}
                    onClick={() => setOpen(false)}
                    className="flex items-center gap-2 rounded-lg p-2.5 text-sm font-medium hover:bg-accent"
                  >
                    <g.icon className="size-4 text-muted-foreground" aria-hidden="true" />
                    {g.label}
                  </Link>
                ))}
                <p className="mt-3 mb-1 text-xs font-semibold text-muted-foreground">خدمات</p>
                {NAV.map((n) => (
                  <Link
                    key={n.href}
                    href={n.href}
                    onClick={() => setOpen(false)}
                    className={`flex items-center gap-2 rounded-lg p-2.5 text-sm font-medium hover:bg-accent ${n.href === "/track" ? "text-primary" : ""}`}
                  >
                    <ScrollText className="size-4 text-muted-foreground" aria-hidden="true" />
                    {n.label}
                  </Link>
                ))}
                <Button asChild className="mt-4">
                  <Link href="/quote" onClick={() => setOpen(false)}>
                    استعلام قیمت بیمه مسئولیت
                  </Link>
                </Button>
                <a
                  href={`tel:${siteConfig.nap.phone}`}
                  className="mt-2 flex items-center justify-center gap-2 rounded-lg border p-2.5 text-sm font-semibold"
                >
                  <Phone className="size-4" aria-hidden="true" />
                  <span dir="ltr">{siteConfig.nap.phoneDisplay}</span>
                </a>
                <Link
                  href="/en"
                  onClick={() => setOpen(false)}
                  className="mt-2 flex items-center justify-center gap-2 rounded-full border px-3 py-2 text-xs font-bold text-muted-foreground hover:border-primary/40 hover:text-primary"
                >
                  EN — English edition
                </Link>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
