// ─── Site Configuration (NAP + Trust) ──────────────────────────────
// NAP واقعی نمایندگی — این مقادیر باید عیناً در Google Business Profile
// و همه دایرکتوری‌ها هم‌سان باشند (NAP consistency).
// داده تأییدشده توسط مالک نمایندگی: تلفن ۰۹۹۸۱۳۱۳۷۲۴ — کد نمایندگی ۲۰۶۱۶.
// نشانی دقیق هنوز ارائه نشده → addressConfirmed=false و آدرس/مختصات
// از JSON-LD حذف می‌شود تا محتوای نادرست تولید نشود (اصل YMYL).

export const siteConfig = {
  name: "بیمه مسئولیت ایران",
  nameEn: "Iran Liability Insurance",
  domain: "bimehmasooliyat.ir",
  url: "https://bimehmasooliyat.ir",
  tagline: "تخصصی‌ترین و کامل‌ترین مرجع بیمه مسئولیت در ایران",
  description:
    "مرجع تخصصی بیمه مسئولیت: پزشکان، وکلا، مهندسان، کارفرمایان و کسب‌وکارها. استعلام قیمت، صدور و راهنمای خسارت با نمایندگی رسمی بیمه ایران.",
  // NAP — یکسان باید در سایت، GBP و دایرکتوری‌ها باشد
  nap: {
    legalName: "نمایندگی ۲۰۶۱۶ بیمه ایران (بیمه مسئولیت ایران)",
    licenseNo: "نمایندگی رسمی شرکت سهامی بیمه ایران — کد نمایندگی ۲۰۶۱۶",
    agencyCode: "20616",
    phone: "09981313724",
    phoneDisplay: "۰۹۹۸ ۱۳۱ ۳۷۲۴",
    phoneIntl: "+989981313724",
    whatsapp: "+989981313724",
    email: "info@bimehmasooliyat.ir",
    address: "ایران — نشانی دقیق نمایندگی: با تلفن ۰۹۹۸ ۱۳۱ ۳۷۲۴ اعلام می‌شود",
    postalCode: "",
    hours: "شنبه تا پنجشنبه، ۹ تا ۱۸",
    geo: { lat: 0, lng: 0 },
  },
  addressConfirmed: false,
  sameAs: [
    "https://www.instagram.com/bimehmasooliyat",
    "https://www.linkedin.com/company/bimehmasooliyat",
    "https://www.aparat.com/bimehmasooliyat",
  ],
  parentOrganization: {
    name: "شرکت سهامی بیمه ایران",
    url: "https://bimehiran.com",
  },
  areaServed: { type: "Country", name: "ایران" },
  foundedYear: 1404,
} as const;

export type SiteConfig = typeof siteConfig;

export const BREADCRUMB_HOME = "خانه";
