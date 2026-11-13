import type { Metadata } from "next";
import Link from "next/link";
import { LayoutDashboard, MessageSquareText, ReceiptText, ShoppingBag, Star, Users } from "lucide-react";
import { AdminLogin } from "@/components/admin/admin-login";
import { LogoutButton } from "@/components/admin/logout-button";
import { isAdmin } from "@/lib/admin-auth";

export const metadata: Metadata = {
  title: "پنل مدیریت نمایندگی",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

const NAV = [
  { href: "/admin", label: "داشبورد", icon: LayoutDashboard },
  { href: "/admin/orders", label: "سفارش‌ها", icon: ShoppingBag },
  { href: "/admin/quotes", label: "استعلام‌ها", icon: ReceiptText },
  { href: "/admin/reviews", label: "نظرات مشتریان", icon: Star },
  { href: "/admin/messages", label: "پیام‌ها", icon: MessageSquareText },
  { href: "/admin/subscribers", label: "خبرنامه", icon: Users },
];

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const authed = await isAdmin();

  if (!authed) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <AdminLogin />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      <nav aria-label="منوی مدیریت" className="mb-6 flex flex-wrap items-center gap-2 rounded-2xl border bg-card p-3">
        {NAV.map((n) => (
          <Link
            key={n.href}
            href={n.href}
            className="inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-bold text-muted-foreground transition-colors hover:bg-secondary hover:text-primary"
          >
            <n.icon className="size-4" aria-hidden="true" />
            {n.label}
          </Link>
        ))}
        <div className="ms-auto">
          <LogoutButton />
        </div>
      </nav>
      {children}
    </div>
  );
}
