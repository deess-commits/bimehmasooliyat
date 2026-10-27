import Link from "next/link";
import { Mail, Phone, ShieldCheck } from "lucide-react";
import { EN_BRAND } from "@/lib/en/config";
import { EnSiteHeader } from "@/components/en/en-site-header";
import { enAbout, enDisclaimers, enFooter } from "@/lib/en/content";

// English chrome — rendered INSIDE the root layout (which owns <html>).
// No <html>/<body> here; direction is fixed by the dir="ltr" wrapper below.

export default function EnLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div
      lang="en"
      dir="ltr"
      className="font-latin flex min-h-screen flex-1 flex-col bg-background text-foreground"
    >
      {/* EN header (client component — sticky-free, has its own mobile menu) */}
      <EnSiteHeader />

      <div className="flex-1 pb-14">{children}</div>

      {/* EN footer — mt-auto keeps it pinned to the viewport bottom on short pages */}
      <footer className="mt-auto border-t bg-card/50">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
          <div className="grid gap-8 md:grid-cols-3">
            <div>
              <p className="text-sm font-extrabold">{EN_BRAND.name}</p>
              <p className="mt-2 max-w-sm text-[13px] leading-6 text-muted-foreground">
                {enFooter.brandLine}
              </p>
              <p className="mt-3 text-xs leading-6 text-muted-foreground">
                {enFooter.license}
              </p>
            </div>
            <nav aria-label="English footer navigation">
              <p className="text-sm font-bold">{enFooter.navHeading}</p>
              <ul className="mt-3 space-y-2 text-sm">
                {enFooter.nav.map((n) => (
                  <li key={n.href}>
                    <Link href={n.href} className="text-muted-foreground hover:text-primary">
                      {n.label}
                    </Link>
                  </li>
                ))}
                <li>
                  <Link href={EN_BRAND.persianSite.href} className="font-semibold text-primary hover:underline">
                    {EN_BRAND.persianSite.name}
                  </Link>
                </li>
              </ul>
            </nav>
            <div>
              <p className="text-sm font-bold">Contact</p>
              <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                <li>
                  <a href={`mailto:${enFooter.email}`} className="flex items-center gap-2 hover:text-primary">
                    <Mail className="size-4" aria-hidden="true" />
                    {enFooter.email}
                  </a>
                </li>
                <li>
                  <a href={`tel:${EN_BRAND.phone}`} className="flex items-center gap-2 hover:text-primary">
                    <Phone className="size-4" aria-hidden="true" />
                    <span dir="ltr">{enFooter.phone}</span>
                  </a>
                </li>
                <li className="leading-6">{enFooter.address}</li>
              </ul>
            </div>
          </div>

          <div className="mt-8 border-t pt-6">
            <p className="text-[13px] font-bold">{enAbout.heading}</p>
            <p className="mt-2 max-w-3xl text-xs leading-6 text-muted-foreground">{enAbout.agency}</p>
            <p className="mt-4 text-[11px] leading-6 text-muted-foreground">
              {enDisclaimers.legal} {enDisclaimers.pricing}
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
