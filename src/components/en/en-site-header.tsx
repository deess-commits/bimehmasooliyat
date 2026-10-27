"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, ShieldCheck, X } from "lucide-react";

const EN_NAV = [
  { href: "/en", label: "Home" },
  { href: "/en/liability", label: "All Liability Types" },
  { href: "/en/price", label: "How Pricing Works" },
  { href: "/en/compare", label: "Compare Coverages" },
  { href: "/en/claims", label: "Claims" },
  { href: "/en/faq", label: "FAQ" },
  { href: "/en/glossary", label: "Glossary" },
  { href: "/en/about", label: "About" },
  { href: "/quote", label: "Quote" },
  { href: "/contact", label: "Contact" },
];

export function EnSiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const isActive = (href: string) =>
    href === "/en" ? pathname === "/en" : pathname.startsWith(href);

  return (
    <header className="border-b bg-card/60">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between gap-3 px-4 sm:px-6">
        <Link
          href="/en"
          className="flex items-center gap-2.5"
          aria-label="Iran Liability Insurance — English home"
        >
          <span className="grid size-9 place-items-center rounded-xl bg-primary text-primary-foreground shadow-sm">
            <ShieldCheck className="size-5" aria-hidden="true" />
          </span>
          <span className="leading-tight">
            <span className="block text-[15px] font-extrabold">Iran Liability Insurance</span>
            <span className="block text-[11px] text-muted-foreground">
              English edition — liability insurance in Iran
            </span>
          </span>
        </Link>

        {/* Desktop nav */}
        <nav
          aria-label="English navigation"
          className="hidden items-center gap-1 text-sm font-semibold md:flex"
        >
          {EN_NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isActive(item.href) ? "page" : undefined}
              className={`rounded-lg px-2.5 py-2 transition-colors hover:bg-accent lg:px-3 ${
                isActive(item.href) ? "bg-accent text-primary" : ""
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Mobile hamburger */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="en-mobile-nav"
          aria-label={open ? "Close menu" : "Open menu"}
          className="grid size-11 place-items-center rounded-lg border bg-background transition-colors hover:bg-accent md:hidden"
        >
          {open ? (
            <X className="size-5" aria-hidden="true" />
          ) : (
            <Menu className="size-5" aria-hidden="true" />
          )}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <nav
          id="en-mobile-nav"
          aria-label="English mobile navigation"
          className="border-t bg-card/95 md:hidden"
        >
          <ul className="mx-auto max-w-7xl px-4 py-2 sm:px-6">
            {EN_NAV.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  className={`block rounded-lg px-3 py-3 text-[15px] font-semibold transition-colors hover:bg-accent ${
                    isActive(item.href) ? "text-primary" : ""
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}
