# ماتریس نیت جستجو → نگاشت URL (بند ۲ پرامپت)

قاعده: هر ردیف ماتریس باید دست‌کم یک صفحه یا بخش محتوایی اختصاصی داشته باشد. وضعیت هر ردیف در جدول زیر
✅ = پیاده‌سازی‌شده. این فایل نقشه راه تکمیل پوشش است.

## 2.1 — تعریف و آگاهی (Informational)

| جستجو | مقصد | وضعیت |
|---|---|---|
| بیمه مسئولیت چیست / مدنی چیست | `/blog/chist-bimeh-masouliyat` + بخش دانشنامه صفحه اصلی | ✅ |
| تفاوت مسئولیت مدنی و کیفری | `/blog/madani-keifari-tafavot` | ✅ |
| مسئولیت مدنی قراردادی و قهری | `/faq#definition` (پرسش اختصاصی) | ✅ |
| چه چیزهایی پوشش نمی‌دهد | بخش استثناهای هر محصول + `/faq#coverage` | ✅ |
| فرانشیز چیست | `/blog/faransiz-bimeh-masouliyat` | ✅ |
| دیه و تأثیر آن | `/blog/diyeh-1404` + جدول دیه صفحه اصلی (Dataset) | ✅ |
| قانون مسئولیت مدنی (ماده ۱) | مقاله تعریف + `/faq` + منابع قانونی هر محصول | ✅ |
| مسئولیت مدنی در قانون تجارت | جزئی — پوشش در مقاله تعریف؛ مقاله مستقل → فاز ۲+ | ⏳ |
| رابطه سببیت | `/faq#definition` (پرسش اختصاصی) | ✅ |
| خسارت معنوی | `/faq#definition` (پرسش اختصاصی) | ✅ |

## 2.2 — نوع مسئولیت / مخاطب (۳۳ صفحه محصول)

الف) حرفه‌ای → `/liability/professional/[slug]`:
medical-doctors، dentists، nurses-paramedics، pharmacists، lawyers، engineers،
accountants-auditors، financial-advisors، real-estate-agents، translators-official،
notaries، beauty-salons، it-professionals — ✅ هر ۱۳

ب) کسب‌وکار و صنعت → `/liability/commercial/[slug]`:
employers، product-liability، public-liability، contractors، construction-operations،
elevators، property-owners (شامل مستأجر/موجر)، restaurants-hotels، kindergartens،
sports-facilities، billboards، transport-carriers، fire-third-party — ✅ هر ۱۳
(+ آلودگی محیط زیست به‌صورت پوشش/استثنا در product-liability و contractors)

ج) شرکتی → `/liability/corporate/[slug]`: directors-officers (D&O + افشای اطلاعات)، cyber-liability — ✅
(مسئولیت قراردادی: بخش FAQ عمومی + مقاله تعریف)

د) عمومی و فردی → `/liability/public/[slug]`: individuals-family، animal-owners، events-insurance،
travel-tours، hunters — ✅ هر ۵

## 2.3 — استعلام قیمت و خرید (Transactional)

| جستجو | مقصد | وضعیت |
|---|---|---|
| قیمت/استعلام/خرید/صدور بیمه مسئولیت [نوع] | صفحه محصول هر ۳۳ نوع (CTA + priceFromFa) + `/quote` با پیش‌انتخاب محصول | ✅ |
| حق بیمه [نوع] | FAQ قیمت در هر محصول + `/faq#price` | ✅ |
| بیمه مسئولیت [نوع] بیمه ایران | H1/SEO هر صفحه + TrustStrip (نرخ مصوب بیمه ایران) | ✅ |
| نمایندگی بیمه مسئولیت [شهر] | `/city/[8 شهر]` + `/contact` | ✅ |

## 2.4 — خسارت و حقوقی (Post-Purchase)

| جستجو | مقصد | وضعیت |
|---|---|---|
| مراحل دریافت خسارت | `/claims` (HowTo) + claimSteps هر محصول | ✅ |
| مدارک لازم | `/claims` (جدول مدارک) + documents هر محصول | ✅ |
| نحوه اعلام خسارت | `/claims` + `/contact` (جعبه اعلام فوری) | ✅ |
| مهلت اعلام خسارت | `/claims` (جدول مهلت‌ها — ماده ۳۰ قانون بیمه) | ✅ |
| رأی دادگاه | `/claims` (بخش اختصاصی) + FAQ خسارت | ✅ |
| عدم پذیرش خسارت | `/claims` (بخش «اگر بیمه نپذیرفت») | ✅ |

## 2.5 — مقایسه و جایگزین (Comparative)

| جستجو | مقصد | وضعیت |
|---|---|---|
| مسئولیت بهتر است یا تأمین اجتماعی | `/blog/bimeh-masouliyat-ya-tamin-ejtemaei` | ✅ |
| تفاوت با بیمه حوادث | `/faq#compare` | ✅ |
| مدنی و کیفری — کدام بیمه | `/blog/madani-keifari-tafavot` | ✅ |
| پوشش‌های اصلی و اضافی | `/faq#coverage` + جدول پوشش هر محصول | ✅ |

## 2.6 — محلی (Local)

`/city/[tehran, mashhad, isfahan, shiraz, tabriz, karaj, ahvaz, qom]` — هر صفحه دارای محتوای یکتا
(چشم‌انداز ریسک شهر)، صنایع، محصولات پیشنهادی و FAQ شهری. ✅ — شهرهای بیشتر = یک آبجکت جدید در cities.ts

## 2.7 — انگلیسی (GEO بین‌المللی — فاز ۳)

| جستجو | مقصد | وضعیت |
|---|---|---|
| Iran liability insurance | نسخه `/en` — رزرو ساختار؛ فعلاً در llms.txt و `alternateName` | ⏳ فاز ۳ |

## قواعد URL (پایدار و خوانا)

- الگو: `/liability/{category}/{slug}` — category ∈ {professional, commercial, corporate, public}
- صفحات فیلتر/جستجو: فقط کلاینتی و بدون URL پارامتری ایندکس‌شدنی (کپی canonical ثابت)
- تغییر مسیرها: از `next.config.ts → redirects()` برای 301 استفاده کنید

## 2.8 — شغل‌محور (Occupation — جدول «کدام پوشش برای کدام شغل» — دسته ۱۸)

جدول مرئی ۳۱ ردیفی در `/compare` (بخش «کدام پوشش برای کدام شغل؟») + اسکیمای Dataset.
هر ردیف: شغل → لینک مستقیم صفحه محصول → ریسک اصلی. هدف: کوئری‌های «بیمه مسئولیت + شغل».

| جستجوی نمونه | مقصد (ردیف جدول) | وضعیت |
|---|---|---|
| بیمه مسئولیت پزشکان / دندان‌پزشک / پرستار / داروساز | professional (۴ ردیف) | ✅ |
| بیمه مسئولیت وکیل / مهندس / حسابدار / مشاور مالی | professional (۴ ردیف) | ✅ |
| بیمه مسئولیت مشاور املاک / مترجم / سردفتر / آرایشگر / IT | professional (۵ ردیف) | ✅ |
| بیمه مسئولیت کارفرما / پیمانکار / ساختمان | commercial (۳ ردیف) | ✅ |
| بیمه مسئولیت تولیدکننده / فروشگاه / رستوران / آسانسور | commercial (۴ ردیف) | ✅ |
| بیمه مسئولیت مالک ساختمان / مهدکودک / باشگاه / حمل‌ونقل | commercial (۴ ردیف) | ✅ |
| بیمه D&O مدیران / مسئولیت سایبری شرکت | corporate (۲ ردیف) | ✅ |
| بیمه مسئولیت خانواده / حیوانات / رویداد / آژانس / شکارچی | public (۵ ردیف) | ✅ |

## 2.9 — انگلیسی (GEO بین‌المللی — به‌روزرسانی دسته ۱۹)

| جستجو | مقصد | وضعیت |
|---|---|---|
| Iran liability insurance (EN) | `/en` + `/en/liability` (۳۳ محصول کامل) | ✅ |
| liability insurance claim in Iran (EN) | `/en/claims` + ۶ راهنمای تخصصی `/en/claims/{medical,employers,public,elevators,contractors,product-liability}` | ✅ |
| diyeh blood money Iran (EN) | `/en/dih` (جدول ۱۴۰۲–۱۴۰۴ + هشدار ابلاغیه رسمی) | ✅ |
| liability insurance glossary / terms (EN) | `/en/glossary` (۱۲ اصطلاح با لینک دوقلوی فارسی) | ✅ |
| liability insurance Tehran/Mashhad/… (EN) | `/en/city/{12}` | ✅ |

## 2.10 — صنعتی (Industry Layer — دسته ۲۰/۲۱)

لایه نیت تجاری جدید «بیمه مسئولیت + صنعت». هدف: کوئری‌هایی که نام صنعت را به جای نام پوشش می‌برند و خروجی AI برای «بیمه مسئولیت [صنعت]» است.

| کوئری هدف | صفحه | وضعیت |
|---|---|---|
| بیمه مسئولیت صنعت نساجی / کارگاه نساجی | `/industry/textile` | ✅ |
| بیمه مسئولیت صنعت غذایی / کارخانه غذایی | `/industry/food` | ✅ |
| بیمه مسئولیت صنعت خودروسازی / تعمیرگاه خودرو | `/industry/automotive` | ✅ |
| بیمه مسئولیت معدن | `/industry/mining` | ⬜ دسته ۲۱ |
| بیمه مسئولیت لجستیک و انبارداری | `/industry/logistics` | ⬜ دسته ۲۱ |
| بیمه مسئولیت هتل‌داری و گردشگری | `/industry/hospitality` | ⬜ دسته ۲۱ |
| liability insurance by industry (EN) | `/en/industry` (مینی‌هاب) | ⬜ دسته ۲۱ |

قاعده لایه صنعتی: ریسک فقط کیفی توصیف می‌شود؛ پوشش‌های پیشنهادی فقط به محصول‌های واقعی موجود لینک می‌کنند؛ هیچ آمار یا نرخ اختراعی مجاز نیست (YMYL).
