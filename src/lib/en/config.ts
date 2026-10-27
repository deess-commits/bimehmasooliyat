// ─── English Edition Configuration (Phase 3 — GEO/AIO slice) ───────
// Self-contained static English edition. The Persian site remains the
// x-default. No prices or statistics are invented here: the final
// premium is always issued upon official quotation.

export type EnCategory = "professional" | "commercial" | "corporate" | "public";

export interface EnPageRef {
  slug: string;
  category: EnCategory;
}

// All 33 products with full English pages (Waves 1-3).
// Verified against prisma/seed-data/products-*.ts:
//   professional (13): medical-doctors, lawyers, engineers (wave 1) +
//                 dentists, pharmacists, accountants-auditors,
//                 real-estate-agents, beauty-salons (wave 2) +
//                 nurses-paramedics, financial-advisors,
//                 translators-official, notaries, it-professionals (wave 3)
//   commercial (13):  employers, contractors, public-liability,
//                 product-liability, elevators (wave 1) +
//                 restaurants-hotels, kindergartens,
//                 transport-carriers (wave 2) +
//                 construction-operations, property-owners,
//                 sports-facilities, billboards, fire-third-party (wave 3)
//   corporate (2):    directors-officers, cyber-liability (wave 3)
//   public (5):       individuals-family, animal-owners,
//                 events-insurance, travel-tours, hunters (wave 3)
export const EN_PAGES: readonly EnPageRef[] = [
  { slug: "medical-doctors", category: "professional" },
  { slug: "lawyers", category: "professional" },
  { slug: "engineers", category: "professional" },
  { slug: "dentists", category: "professional" },
  { slug: "pharmacists", category: "professional" },
  { slug: "accountants-auditors", category: "professional" },
  { slug: "real-estate-agents", category: "professional" },
  { slug: "beauty-salons", category: "professional" },
  { slug: "nurses-paramedics", category: "professional" },
  { slug: "financial-advisors", category: "professional" },
  { slug: "translators-official", category: "professional" },
  { slug: "notaries", category: "professional" },
  { slug: "it-professionals", category: "professional" },
  { slug: "employers", category: "commercial" },
  { slug: "contractors", category: "commercial" },
  { slug: "public-liability", category: "commercial" },
  { slug: "product-liability", category: "commercial" },
  { slug: "elevators", category: "commercial" },
  { slug: "restaurants-hotels", category: "commercial" },
  { slug: "kindergartens", category: "commercial" },
  { slug: "transport-carriers", category: "commercial" },
  { slug: "construction-operations", category: "commercial" },
  { slug: "property-owners", category: "commercial" },
  { slug: "sports-facilities", category: "commercial" },
  { slug: "billboards", category: "commercial" },
  { slug: "fire-third-party", category: "commercial" },
  { slug: "directors-officers", category: "corporate" },
  { slug: "cyber-liability", category: "corporate" },
  { slug: "individuals-family", category: "public" },
  { slug: "animal-owners", category: "public" },
  { slug: "events-insurance", category: "public" },
  { slug: "travel-tours", category: "public" },
  { slug: "hunters", category: "public" },
] as const;

export function isEnPage(category: string, slug: string): boolean {
  return EN_PAGES.some((p) => p.slug === slug && p.category === category);
}

export function enProductPath(category: string, slug: string): string {
  return `/en/liability/${category}/${slug}`;
}

// hreflang pair for a product page that exists in both languages.
export function enHreflangPair(category: string, slug: string) {
  return {
    en: enProductPath(category, slug),
    "fa-IR": `/liability/${category}/${slug}`,
    "x-default": `/liability/${category}/${slug}`,
  };
}

// hreflang pair for a category hub page that exists in both languages.
export function enCategoryHreflangPair(category: string) {
  return {
    en: `/en/liability/${category}`,
    "fa-IR": `/liability/${category}`,
    "x-default": `/liability/${category}`,
  };
}

export const EN_CATEGORY_LABELS: Record<string, string> = {
  professional: "Professional Liability",
  commercial: "Business & Industry Liability",
  corporate: "Corporate Liability",
  public: "Personal & Public Liability",
};

export const EN_CATEGORY_DESCRIPTIONS: Record<string, string> = {
  professional:
    "Civil liability of licensed professionals — physicians, lawyers, engineers, accountants and other regulated occupations — for financial or bodily loss caused by professional error.",
  commercial:
    "Civil liability of businesses and industrial units — employers, contractors, manufacturers, shopkeepers and facility operators — toward third parties, workers and consumers.",
  corporate:
    "Liability of companies and their management — directors and officers (D&O) and cyber liability for online platforms and data-driven businesses.",
  public:
    "Everyday civil liability of individuals and families — parents, animal owners, event guests, travelers and licensed hunters.",
};

export const EN_CATEGORY_ORDER = [
  "professional",
  "commercial",
  "corporate",
  "public",
] as const;

export const EN_CATEGORY_COUNTS: Record<string, number> = {
  professional: 13,
  commercial: 13,
  corporate: 2,
  public: 5,
};

export const EN_BRAND = {
  name: "Iran Liability Insurance",
  legalName: "Bimeh Iran Agency No. 20616 — Iran Liability Insurance",
  tagline: "Liability insurance in Iran, explained in English",
  email: "info@bimehmasooliyat.ir",
  phone: "+98 998 131 3724",
  license:
    "Official agency of Bimeh Iran (Iran Insurance Company) — agency code 20616",
  persianSite: { name: "Persian edition (بیمه مسئولیت ایران)", href: "/" },
} as const;
