import { BadgeCheck, Building2, FileCheck2, HandHeart, PhoneCall } from "lucide-react";
import { siteConfig } from "@/lib/site";

const TRUST_ITEMS = [
  { icon: Building2, title: "نماینده رسمی بیمه ایران", desc: "صدور مستقیم با نرخ مصوب" },
  { icon: BadgeCheck, title: "پروانه بیمه مرکزی", desc: "نظام صنفی بیمه‌گری" },
  { icon: FileCheck2, title: "صدور سریع", desc: "همان روز کاری پس از مدارک" },
  { icon: HandHeart, title: "همراهی در خسارت", desc: "از اعلام تا پرداخت" },
];

export function TrustStrip({ variant = "grid" }: { variant?: "grid" | "stack" }) {
  if (variant === "stack") {
    return (
      <ul className="space-y-2.5" aria-label="مزایای خرید از ما">
        {TRUST_ITEMS.map((t) => (
          <li key={t.title} className="flex items-center gap-3 rounded-xl border bg-card p-3">
            <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-accent text-accent-foreground">
              <t.icon className="size-4.5" aria-hidden="true" />
            </span>
            <span className="leading-tight">
              <span className="block text-[13px] font-bold">{t.title}</span>
              <span className="block text-[11px] text-muted-foreground">{t.desc}</span>
            </span>
          </li>
        ))}
      </ul>
    );
  }
  return (
    <ul className="grid grid-cols-2 gap-3 lg:grid-cols-4" aria-label="مزایای خرید از ما">
      {TRUST_ITEMS.map((t) => (
        <li key={t.title} className="flex items-center gap-3 rounded-xl border bg-card p-3.5">
          <span className="grid size-10 shrink-0 place-items-center rounded-lg bg-accent text-accent-foreground">
            <t.icon className="size-5" aria-hidden="true" />
          </span>
          <span className="leading-tight">
            <span className="block text-[13px] font-bold">{t.title}</span>
            <span className="block text-[11px] text-muted-foreground">{t.desc}</span>
          </span>
        </li>
      ))}
    </ul>
  );
}

export function PhoneQuickCta() {
  return (
    <a
      href={`tel:${siteConfig.nap.phone}`}
      className="inline-flex items-center gap-2 rounded-xl border bg-card px-4 py-3 text-sm font-bold hover:border-primary/40"
    >
      <PhoneCall className="size-4 text-primary" aria-hidden="true" />
      مشاوره تلفنی: <span dir="ltr">{siteConfig.nap.phoneDisplay}</span>
    </a>
  );
}
