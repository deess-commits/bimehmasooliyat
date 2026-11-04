import type { ReactNode } from "react";
import { siteConfig } from "@/lib/site";

// ─── JSON-LD Builders (AIO core) ───────────────────────────────────
// قاعده: هر خروجی باید با محتوای قابل مشاهده صفحه همخوان باشد.

export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function organizationJsonLd() {
  // YMYL: تا زمانی که نشانی دقیق تأیید نشده، address/geo در schema
  // منتشر نمی‌شود (عدم تولید داده نادرست برای موتورها و AI).
  const confirmed = siteConfig.addressConfirmed;
  return {
    "@context": "https://schema.org",
    "@type": "InsuranceAgency",
    "@id": `${siteConfig.url}/#organization`,
    name: siteConfig.nap.legalName,
    alternateName: [siteConfig.name, siteConfig.nameEn],
    url: siteConfig.url,
    logo: `${siteConfig.url}/logo.png`,
    image: `${siteConfig.url}/og.png`,
    telephone: siteConfig.nap.phoneIntl,
    email: siteConfig.nap.email,
    identifier: {
      "@type": "PropertyValue",
      name: "Agency code (Bimeh Iran)",
      value: siteConfig.nap.agencyCode,
    },
    ...(confirmed
      ? {
          address: {
            "@type": "PostalAddress",
            streetAddress: siteConfig.nap.address,
            addressCountry: "IR",
            postalCode: siteConfig.nap.postalCode,
          },
          geo: {
            "@type": "GeoCoordinates",
            latitude: siteConfig.nap.geo.lat,
            longitude: siteConfig.nap.geo.lng,
          },
        }
      : {}),
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Saturday", "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday"],
      opens: "09:00",
      closes: "18:00",
    },
    parentOrganization: {
      "@type": "Organization",
      name: siteConfig.parentOrganization.name,
      url: siteConfig.parentOrganization.url,
    },
    areaServed: {
      "@type": "Country",
      name: "Iran",
    },
    // مسیر خرید — هدف: ارجاع AI/گوگل برای «خرید بیمه مسئولیت آنلاین»
    makesOffer: {
      "@type": "Offer",
      url: `${siteConfig.url}/buy`,
      itemOffered: {
        "@type": "Service",
        name: "خرید آنلاین بیمه مسئولیت",
        serviceType: "بیمه مسئولیت",
        areaServed: { "@type": "Country", name: "Iran" },
        provider: { "@id": `${siteConfig.url}/#organization` },
      },
    },
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "sales",
        name: "استعلام قیمت و مشاوره خرید بیمه مسئولیت",
        telephone: siteConfig.nap.phoneIntl,
        email: siteConfig.nap.email,
        availableLanguage: ["fa", "en"],
        areaServed: "IR",
      },
    ],
    knowsLanguage: ["fa", "en"],
    sameAs: [...siteConfig.sameAs],
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${siteConfig.url}/#website`,
    url: siteConfig.url,
    name: siteConfig.name,
    inLanguage: "fa-IR",
    publisher: { "@id": `${siteConfig.url}/#organization` },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${siteConfig.url}/search?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}

export function breadcrumbJsonLd(items: { name: string; href: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${siteConfig.url}${item.href}`,
    })),
  };
}

/** فهرست قابل استخراج برای صفحات آرشیو (liability، category، blog) */
export function itemListJsonLd(opts: {
  name: string;
  url: string;
  items: { name: string; href: string }[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: opts.name,
    numberOfItems: opts.items.length,
    itemListElement: opts.items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      url: `${siteConfig.url}${item.href}`,
    })),
    mainEntityOfPage: {
      "@type": "CollectionPage",
      "@id": `${siteConfig.url}${opts.url}`,
    },
  };
}

export function serviceJsonLd(opts: {
  name: string;
  description: string;
  url: string;
  category?: string;
  areaServed?: string;
  provider?: string;
  dateModified?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: opts.name,
    name: opts.name,
    description: opts.description,
    url: `${siteConfig.url}${opts.url}`,
    provider: { "@id": `${siteConfig.url}/#organization` },
    areaServed: { "@type": "Country", name: opts.areaServed ?? "Iran" },
    ...(opts.category ? { category: opts.category } : {}),
    ...(opts.dateModified ? { dateModified: opts.dateModified } : {}),
  };
}

export function faqJsonLd(faqs: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };
}

export function howToJsonLd(opts: {
  name: string;
  description: string;
  steps: { title: string; description: string }[];
  url?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: opts.name,
    description: opts.description,
    ...(opts.url ? { url: `${siteConfig.url}${opts.url}` } : {}),
    step: opts.steps.map((s, i) => ({
      "@type": "HowToStep",
      position: i + 1,
      name: s.title,
      text: s.description,
    })),
  };
}

export function articleJsonLd(opts: {
  title: string;
  description: string;
  url: string;
  authorName: string;
  datePublished: string;
  dateModified: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: opts.title,
    description: opts.description,
    url: `${siteConfig.url}${opts.url}`,
    inLanguage: "fa-IR",
    author: {
      "@type": "Person",
      name: opts.authorName,
      url: `${siteConfig.url}/about#team`,
    },
    publisher: { "@id": `${siteConfig.url}/#organization` },
    datePublished: opts.datePublished,
    dateModified: opts.dateModified,
  };
}

export function datasetJsonLd(opts: {
  name: string;
  description: string;
  url: string;
  dateModified?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Dataset",
    name: opts.name,
    description: opts.description,
    url: `${siteConfig.url}${opts.url}`,
    creator: { "@id": `${siteConfig.url}/#organization` },
    isAccessibleForFree: true,
    inLanguage: "fa-IR",
    ...(opts.dateModified ? { dateModified: opts.dateModified } : {}),
    conditionsOfAccess:
      "مبالغ نمایشی است و باید با آخرین ابلاغیه رسمی قوه قضائیه تطبیق داده شود.",
  };
}
