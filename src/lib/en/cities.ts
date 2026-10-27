// ─── English Edition — City Guides (12 city guides, waves 1-2) ──────
// Grounded in the Persian city seed data (prisma/seed-data/cities.ts).
// Rules: answer-first, 40-60 word answers, no invented prices or
// statistics. The Persian city pages remain the authoritative versions.

export interface EnCityGuide {
  slug: string;
  nameEn: string;
  title: string; // H1
  answerBlock: string;
  industries: string[];
  productRefs: { category: string; slug: string; name: string }[];
  faqs: { question: string; answer: string }[];
  metaTitle: string;
  metaDescription: string;
}

export const EN_CITY_GUIDES: readonly EnCityGuide[] = [
  {
    slug: "tehran",
    nameEn: "Tehran",
    title: "Liability Insurance in Tehran — Coverage for the Capital's Risk Landscape",
    answerBlock:
      "Tehran carries Iran's densest liability risk landscape: intense construction, aging buildings, corporate headquarters and hospitals. Employers face work-accident claims under Article 91 of the Labor Law, builders face neighbor and passer-by claims, and physicians face malpractice suits. A limit at least equal to the full diyeh of the year of occurrence is the baseline; premiums are issued upon official quotation.",
    industries: [
      "Construction and contracting",
      "Automotive and parts manufacturing",
      "Corporate headquarters and business services",
      "Healthcare and hospitals",
      "Distribution and logistics",
    ],
    productRefs: [
      { category: "commercial", slug: "employers", name: "Employers Liability Insurance" },
      { category: "commercial", slug: "contractors", name: "Contractors Liability Insurance" },
      { category: "commercial", slug: "construction-operations", name: "Construction Operations Liability" },
      { category: "professional", slug: "medical-doctors", name: "Physicians Professional Liability" },
      { category: "commercial", slug: "property-owners", name: "Property Owners Liability" },
      { category: "commercial", slug: "transport-carriers", name: "Carriers Liability Insurance" },
    ],
    faqs: [
      {
        question: "What liability insurance does a construction project in Tehran need?",
        answer:
          "A Tehran builder answers for its workers under Article 91 of the Labor Law and for damage to neighboring properties and passers-by under the Civil Liability Act. The customary package combines employer liability, construction operations liability and a structural cover through the warranty period, with the limit sized to the capital's high property values; premiums are issued upon official quotation.",
      },
      {
        question: "Why are Tehran liability rates different from smaller cities?",
        answer:
          "Underwriting weighs population density, property values and the frequency of third-party contact in your activity. Tehran's dense construction and high-value real estate push its risk profile above the national average, which insurers reflect in the rate. The approved Bimeh Iran tariff is applied in the official pro-forma invoice after the risk declaration is reviewed.",
      },
      {
        question: "Is employer liability insurance mandatory for Tehran businesses?",
        answer:
          "The Labor Law places work-related bodily injury on the employer when safety duties were breached, and many official registrations, tenders and municipal permits in Tehran require proof of employer liability coverage. The policy pays proven damages and legal-defense costs up to the chosen limit, with headcount declared at issuance.",
      },
    ],
    metaTitle: "Liability Insurance in Tehran | Official Bimeh Iran Guide",
    metaDescription:
      "Tehran liability insurance explained: employers, contractors, construction, property and medical liability, recommended limits and official quotation steps.",
  },
  {
    slug: "mashhad",
    nameEn: "Mashhad",
    title: "Liability Insurance in Mashhad — Pilgrimage Economy and Hospitality Risks",
    answerBlock:
      "Mashhad's economy is built around Imam Reza's shrine pilgrimage: hotels, guesthouses, restaurants and transport serving millions of visitors. Hospitality operators answer for guest injuries under the Civil Liability Act, carriers answer for passenger and cargo damage, and the city's food industry answers for product safety. Hospitality, carrier and product liability form the core; premiums are issued upon official quotation.",
    industries: [
      "Hotels and pilgrimage hospitality",
      "Restaurants and food services",
      "Passenger and cargo transport",
      "Food manufacturing and packaging",
      "Retail and bazaar trade",
    ],
    productRefs: [
      { category: "commercial", slug: "restaurants-hotels", name: "Restaurants & Hotels Liability" },
      { category: "commercial", slug: "transport-carriers", name: "Carriers Liability Insurance" },
      { category: "commercial", slug: "public-liability", name: "Public Liability Insurance" },
      { category: "commercial", slug: "product-liability", name: "Product Liability Insurance" },
      { category: "commercial", slug: "employers", name: "Employers Liability Insurance" },
    ],
    faqs: [
      {
        question: "What coverage do Mashhad hotels and guesthouses need?",
        answer:
          "A hotel in Mashhad answers for guest injuries such as slips, falls and elevator accidents, and for damage to guests' property, under the Civil Liability Act. Hospitality liability pays proven damages and legal-defense costs up to the limit; daily capacity and facilities set the premium basis. Limits above the diyeh benchmark are common where visitor flows peak seasonally.",
      },
      {
        question: "Do passenger carriers in Mashhad need special liability cover?",
        answer:
          "Carriers serving pilgrimage routes answer for bodily injury to passengers and third parties and for cargo damage when fault is proven. Carrier liability insurance funds those awards and the legal defense up to the policy limit, with the fleet size and routes declared at issuance; the final premium follows the official quotation.",
      },
      {
        question: "Is product liability relevant for Mashhad's food industry?",
        answer:
          "Yes. Food manufacturers and packagers answer to consumers for harm caused by contamination or defects under the Consumer Protection Act. Product liability covers proven bodily and property damage and the cost of defending the claim, with the product description, volume and distribution scope registered in the policy at issuance.",
      },
    ],
    metaTitle: "Liability Insurance in Mashhad | Official Bimeh Iran Guide",
    metaDescription:
      "Mashhad liability insurance explained: hotel, carrier and product liability in the pilgrimage economy, recommended limits and the official quotation process.",
  },
  {
    slug: "isfahan",
    nameEn: "Isfahan",
    title: "Liability Insurance in Isfahan — Industry, Tourism and Heritage Risks",
    answerBlock:
      "Isfahan combines industry — steel, refining and industrial parks — with a world-famous tourism economy around its historical bazaar. Industrial operators face worker-accident and fire-spread claims, hoteliers and restaurateurs face guest-injury claims, and handicraft exporters face product claims. Employers, contractors and hospitality liability form the core; the limit should at least equal the full diyeh of the year of occurrence.",
    industries: [
      "Steel and petrochemical industry",
      "Industrial parks and manufacturing",
      "Tourism, hotels and handicrafts",
      "Construction and restoration projects",
      "Distribution and bazaar trade",
    ],
    productRefs: [
      { category: "commercial", slug: "employers", name: "Employers Liability Insurance" },
      { category: "commercial", slug: "fire-third-party", name: "Fire Third-Party Liability" },
      { category: "commercial", slug: "restaurants-hotels", name: "Restaurants & Hotels Liability" },
      { category: "commercial", slug: "contractors", name: "Contractors Liability Insurance" },
      { category: "commercial", slug: "product-liability", name: "Product Liability Insurance" },
    ],
    faqs: [
      {
        question: "Why do Isfahan industrial units carry fire third-party liability?",
        answer:
          "Steel, refining and storage operations in Isfahan can spread fire or explosion beyond the site, and the operator answers for that damage under the Civil Liability Act with fault presumed hard to disprove. Fire third-party liability pays neighbors' and third parties' proven damages up to the limit; site layout and flammable materials feed the risk assessment.",
      },
      {
        question: "What liability risks do Isfahan hotels and restaurants carry?",
        answer:
          "Hospitality venues in Isfahan answer for guest injuries and property damage under the Civil Liability Act, from food safety to elevator and staircase accidents. Hospitality liability pays proven damages and legal-defense costs up to the limit, with daily capacity as the premium basis; the final premium follows the official Bimeh Iran quotation.",
      },
      {
        question: "Do restoration contractors for historical buildings need special cover?",
        answer:
          "Restoration work on Isfahan's heritage structures raises the value of third-party property around the site, so contractor liability with a higher limit is customary. The policy covers damage caused to the works, neighboring structures and passers-by, with the contract scope and duration declared at issuance and priced upon official quotation.",
      },
    ],
    metaTitle: "Liability Insurance in Isfahan | Official Bimeh Iran Guide",
    metaDescription:
      "Isfahan liability insurance explained: fire third-party, hospitality, contractor and product liability around steel and tourism, with official quotation steps.",
  },
  {
    slug: "kish",
    nameEn: "Kish",
    title: "Liability Insurance in Kish — Free-Zone Tourism and Event Risks",
    answerBlock:
      "Kish Island concentrates hotels, international exhibitions, shopping centers and water-sports operators in one free trade zone. Event organizers answer for visitor and exhibitor claims, diving centers answer for customer accidents, and hotels answer for guest injuries under the Civil Liability Act. Public, event and sports-facility liability sized to international visitor presence are customary; premiums are issued upon official quotation.",
    industries: [
      "Hotels and tourism",
      "International exhibitions and events",
      "Free-zone trade and exchange offices",
      "Water sports and diving centers",
      "Shopping centers",
    ],
    productRefs: [
      { category: "commercial", slug: "restaurants-hotels", name: "Restaurants & Hotels Liability" },
      { category: "public", slug: "events-insurance", name: "Event Liability Insurance" },
      { category: "commercial", slug: "sports-facilities", name: "Sports Facilities Liability" },
      { category: "commercial", slug: "public-liability", name: "Public Liability Insurance" },
      { category: "public", slug: "travel-tours", name: "Travel & Tours Liability" },
    ],
    faqs: [
      {
        question: "What insurance do exhibition organizers in Kish need?",
        answer:
          "An organizer in Kish answers to visitors and exhibitors for hall accidents, crowd incidents and damage to booth property when safety duties were breached. Event liability pays proven damages and the legal defense up to the limit; the duration, capacity and nature of the event are registered in the policy at issuance, priced upon official quotation.",
      },
      {
        question: "Do Kish water-sports centers carry liability insurance?",
        answer:
          "Yes. Operators of diving and water-sports centers answer for customer accidents, defective equipment or improper guidance, and fault-based liability applies under the Civil Liability Act. Sports-facility liability with the activity type endorsed in the policy covers proven bodily and property damages; certified instructors improve the risk assessment.",
      },
      {
        question: "Are travel agencies in Kish liable toward foreign tourists?",
        answer:
          "A Kish travel agency answers to its travelers for loss caused by faults in the services it arranges, such as bookings and tours, under general fault-based liability rules. Travel and tours liability covers those proven losses up to the limit; for foreign visitors, supplementary personal coverage is also recommended and can be quoted on request.",
      },
    ],
    metaTitle: "Liability Insurance in Kish | Official Bimeh Iran Guide",
    metaDescription:
      "Kish free-zone liability insurance explained: event, hospitality, water-sports and travel-agency liability, limits sized to visitors, official quotation.",
  },
  // ── Wave 2 (Task 16-a): Shiraz, Tabriz, Karaj, Ahvaz, Qom, Rasht, Yazd, Kerman ──
  {
    slug: "shiraz",
    nameEn: "Shiraz",
    title: "Liability Insurance in Shiraz — Agro-Industry, Energy and Tourism Risks",
    answerBlock:
      "Shiraz blends petrochemical and energy sites with orchard farming, tourism and growing construction. Contractors face worker-accident claims under Labor Law Article 91, farm employers face seasonal-worker claims, and hoteliers answer for guest injuries under the Civil Liability Act. A limit at least equal to the full diyeh of the year of occurrence is the baseline, priced upon official quotation.",
    industries: [
      "Petrochemical and energy industries",
      "Agriculture and orchard farming",
      "Tourism and hotelkeeping",
      "Building and construction",
      "Electronics and information technology",
    ],
    productRefs: [
      { category: "commercial", slug: "employers", name: "Employers Liability Insurance" },
      { category: "commercial", slug: "contractors", name: "Contractors Liability Insurance" },
      { category: "commercial", slug: "property-owners", name: "Property Owners Liability" },
      { category: "public", slug: "travel-tours", name: "Travel & Tours Liability" },
      { category: "commercial", slug: "restaurants-hotels", name: "Restaurants & Hotels Liability" },
    ],
    faqs: [
      {
        question: "What liability cover do Fars orchard and farm employers need?",
        answer:
          "An agricultural employer in Fars answers for seasonal and harvest workers injured by machinery or field accidents when safety duties were breached, under Article 91 of the Labor Law. Employer liability covers proven injury and legal-defense costs, and seasonal workers can be included by explicit endorsement; for units with cold stores, fire third-party cover manages damage spreading to neighbors.",
      },
      {
        question: "What insurance do Shiraz hotels and guesthouses need?",
        answer:
          "Hospitality operators in Shiraz answer for guest injuries and property damage caused by unsafe facilities, elevators or fire protection, under the Civil Liability Act. Restaurants and hotels liability pays proven damages and the manager's legal-defense costs up to the limit. It complements rather than replaces property insurance, and the two covers are customarily written together.",
      },
      {
        question: "Why does property owners liability matter in Shiraz's growing districts?",
        answer:
          "Shiraz's expansion into peripheral districts has made claims by neighbors and passers-by against owners and builders a common dispute in the province. Property owners liability answers for injuries and damage arising from building maintenance faults, while contractor cover addresses construction-phase accidents; limits are sized to local property values and priced upon official quotation.",
      },
    ],
    metaTitle: "Liability Insurance in Shiraz | Energy, Farms, Hotels",
    metaDescription:
      "Shiraz liability insurance explained: employer cover for seasonal farm workers, contractor and hotel guest risks, limits and the official Bimeh Iran quotation.",
  },
  {
    slug: "tabriz",
    nameEn: "Tabriz",
    title: "Liability Insurance in Tabriz — Manufacturing, Product and Export Risks",
    answerBlock:
      "Tabriz is a manufacturing pole where product liability weighs heaviest: a defective automotive part or contaminated food batch can trigger civil claims along the whole sales chain. Manufacturers customarily combine product, employer and fire third-party cover with a limit at least equal to the full diyeh of the year of occurrence; premium is issued upon official quotation.",
    industries: [
      "Automotive and parts manufacturing",
      "Machinery and industrial equipment",
      "Textiles and carpets",
      "Food manufacturing",
      "Export and distribution",
    ],
    productRefs: [
      { category: "commercial", slug: "product-liability", name: "Product Liability Insurance" },
      { category: "commercial", slug: "employers", name: "Employers Liability Insurance" },
      { category: "commercial", slug: "transport-carriers", name: "Carriers Liability Insurance" },
      { category: "commercial", slug: "fire-third-party", name: "Fire Third-Party Liability" },
      { category: "commercial", slug: "public-liability", name: "Public Liability Insurance" },
    ],
    faqs: [
      {
        question: "How is liability for manufactured goods in Tabriz insured?",
        answer:
          "A producer answers to consumers for defects in its goods, from a faulty vehicle part to contaminated food, and pays once the defect and the causal link are proven. Product liability covers the resulting bodily and property damages. Tabriz manufacturers with wide distribution networks usually choose higher limits so chain-of-sale losses stay covered.",
      },
      {
        question: "What cover do Tabriz exporters and distributors need?",
        answer:
          "The carrier and the load handler answer for damage to goods, to other vehicles and to third parties along the route. Carriers liability covers those awards alongside cargo insurance: cargo cover pays for the goods themselves, liability cover pays damage to others. For distribution fleets, third-party motor cover combined with carriers liability is the customary arrangement.",
      },
      {
        question: "Why do Tabriz factories carry fire third-party liability?",
        answer:
          "Workshop and factory fires in dense industrial districts can spread to neighboring units, and the operator answers for that damage under the Civil Liability Act with fault hard to disprove. Fire third-party liability pays neighbors' proven damages up to the limit, while employer liability handles worker accidents on the line; both are quoted together after the risk declaration.",
      },
    ],
    metaTitle: "Liability Insurance in Tabriz | Product & Factory Risks",
    metaDescription:
      "Tabriz liability insurance explained: product, employer and fire third-party cover for factories, carrier cover for exporters, limits and official quotation.",
  },
  {
    slug: "karaj",
    nameEn: "Karaj",
    title: "Liability Insurance in Karaj — Workshops, Buildings and Fleet Risks",
    answerBlock:
      "Karaj packs small workshops, greenhouses and construction sites onto Tehran's doorstep. Workshop accidents fall on employers under Article 91 of the Labor Law, while elevator upkeep drives claims against building owners. Employer, elevator and carrier cover, with limits at least equal to the full diyeh of the year of occurrence, is the baseline; premium is issued upon official quotation.",
    industries: [
      "Small industrial workshops",
      "Agriculture and greenhouses",
      "Poultry and livestock farming",
      "Transport and distribution",
      "Building and construction",
    ],
    productRefs: [
      { category: "commercial", slug: "employers", name: "Employers Liability Insurance" },
      { category: "commercial", slug: "contractors", name: "Contractors Liability Insurance" },
      { category: "commercial", slug: "transport-carriers", name: "Carriers Liability Insurance" },
      { category: "commercial", slug: "property-owners", name: "Property Owners Liability" },
      { category: "commercial", slug: "elevators", name: "Elevator Liability Insurance" },
    ],
    faqs: [
      {
        question: "Which liability policies do small workshops in Karaj need?",
        answer:
          "Any workshop that hires workers answers for work accidents under Article 91 of the Labor Law, so employer liability is the base policy. Where crews work at customer premises or damage to neighboring properties is plausible, public liability is added. Headcount and the nature of the activity set both the rate and the chosen limit.",
      },
      {
        question: "Who is responsible for an elevator accident in Karaj buildings?",
        answer:
          "The manager or owner of the building answers for elevator maintenance and safety, and pays for a fall or entrapment caused by negligence under the Civil Liability Act. Elevator liability insurance funds those damages up to the limit, and a maintenance contract with a qualified company with periodic servicing is a condition for the cover to remain valid.",
      },
      {
        question: "What liability does Karaj's intercity transport fleet carry?",
        answer:
          "Carriers based in Karaj move goods between provinces, and the carrier answers for cargo damage and for harm to third parties on the road when fault is proven. Carriers liability pays proven awards and the legal defense up to the limit, with fleet size and routes declared at issuance; the premium follows the official Bimeh Iran quotation.",
      },
    ],
    metaTitle: "Liability Insurance in Karaj | Workshops & Buildings",
    metaDescription:
      "Karaj liability insurance explained: employer cover for workshops, elevator and building owner liability, fleet risks, limits and official quotation.",
  },
  {
    slug: "ahvaz",
    nameEn: "Ahvaz",
    title: "Liability Insurance in Ahvaz — Oil, Steel and Industrial Contractor Risks",
    answerBlock:
      "Ahvaz carries Iran's heaviest industrial risk: oil, gas, refining and steel run through industrial contractors. Employers and contractors answer for work accidents under Article 91 of the Labor Law and the Civil Liability Act. Employer, contractor and fire third-party cover with limits sized to the full diyeh of the year of occurrence is the base, priced upon official quotation.",
    industries: [
      "Oil, gas and refining",
      "Steel and heavy industry",
      "Sugarcane and agriculture",
      "Industrial contracting",
      "Transport and port services",
    ],
    productRefs: [
      { category: "commercial", slug: "employers", name: "Employers Liability Insurance" },
      { category: "commercial", slug: "contractors", name: "Contractors Liability Insurance" },
      { category: "commercial", slug: "fire-third-party", name: "Fire Third-Party Liability" },
      { category: "commercial", slug: "transport-carriers", name: "Carriers Liability Insurance" },
      { category: "commercial", slug: "construction-operations", name: "Construction Operations Liability" },
    ],
    faqs: [
      {
        question: "Which insurances do industrial contractors in Ahvaz need?",
        answer:
          "A contractor in oil, gas or steel units answers for its own workers and for damage to the client's facilities and staff. The customary package is employer liability with a limit matched to the current diyeh, contractors liability, and fire third-party cover. The precise scope of operations and the project location must be written into the policy.",
      },
      {
        question: "Does employer liability insurance cover workers' accidents?",
        answer:
          "Yes. In Ahvaz's refineries and steel plants, employer liability pays for bodily and financial damage from work accidents caused by the employer's fault in providing safety equipment and safe conditions. Social security pays treatment and pension, but it does not remove the employer's fault-based liability toward the worker or the heirs, and that gap is the policy's purpose.",
      },
      {
        question: "Why is fire third-party cover emphasized in Ahvaz?",
        answer:
          "Extreme heat and aged infrastructure raise the chance of fire and explosion around Ahvaz's storage, refining and power facilities, and the operator answers for damage that spreads beyond the site under the Civil Liability Act. Fire third-party liability pays neighboring facilities' and third parties' proven damages up to the limit; site layout and stored materials feed the risk assessment.",
      },
    ],
    metaTitle: "Liability Insurance in Ahvaz | Oil, Steel, Contractors",
    metaDescription:
      "Ahvaz liability insurance explained: employer and contractor cover for oil, gas and steel, fire third-party risk, limits and the official quotation.",
  },
  {
    slug: "qom",
    nameEn: "Qom",
    title: "Liability Insurance in Qom — Pilgrimage, Food and Passenger Risks",
    answerBlock:
      "Qom mixes a pilgrimage economy with food and pharmaceutical plants. Carriers face the province's frequent claims on intercity routes, and food producers face consumer suits where defect and causation must be proven. Carrier, hospitality and product cover with a limit at least equal to the full diyeh of the year of occurrence is the baseline, issued upon official quotation.",
    industries: [
      "Pilgrimage and religious tourism services",
      "Food manufacturing",
      "Chemical and pharmaceutical industries",
      "Furniture and small workshops",
      "Passenger transport",
    ],
    productRefs: [
      { category: "public", slug: "travel-tours", name: "Travel & Tours Liability" },
      { category: "commercial", slug: "restaurants-hotels", name: "Restaurants & Hotels Liability" },
      { category: "commercial", slug: "product-liability", name: "Product Liability Insurance" },
      { category: "commercial", slug: "employers", name: "Employers Liability Insurance" },
      { category: "commercial", slug: "transport-carriers", name: "Carriers Liability Insurance" },
    ],
    faqs: [
      {
        question: "What responsibility do pilgrimage passenger carriers in Qom carry?",
        answer:
          "A passenger carrier answers for travelers' safety along the route, during boarding and alighting, and for the soundness of the vehicle. Motor third-party insurance covers part of this responsibility, while passenger carriers liability completes it for damages outside third-party scope and pays the defense costs. In peak seasons, the declared capacity and travel program must match the policy.",
      },
      {
        question: "Which cover do Qom food and drug producers need?",
        answer:
          "Producing food and pharmaceuticals exposes a unit to product liability suits: a consumer claiming harm from a defect or contamination must prove the defect and the causal link, and the policy pays the proven damages. The same employer also answers for its workers' accidents, so employer liability is the customary complement to the product policy.",
      },
      {
        question: "Do Qom's pilgrimage guesthouses and restaurants need liability cover?",
        answer:
          "Guesthouses and restaurants serving pilgrims answer for injuries and property damage to guests, from food safety incidents to staircase and heating accidents, under the Civil Liability Act. Restaurants and hotels liability pays proven damages and legal-defense costs up to the limit, with daily capacity as the premium basis, a cover customarily kept active year-round, not only in peak seasons.",
      },
    ],
    metaTitle: "Liability Insurance in Qom | Pilgrimage & Food Industry",
    metaDescription:
      "Qom liability insurance explained: passenger carrier, hospitality and product liability for the pilgrimage economy, limits and official quotation.",
  },
  {
    slug: "rasht",
    nameEn: "Rasht",
    title: "Liability Insurance in Rasht — Rice, Food and Ecolodge Risks",
    answerBlock:
      "Rasht runs on rice paddies, citrus orchards, food plants and ecolodges. Humidity raises accident risk in fields, agricultural employers answer for seasonal workers under Labor Law Article 91, and food processors face consumer claims. Employer and product liability with limits sized to the full diyeh of the year of occurrence is the base, issued upon official quotation.",
    industries: [
      "Rice cultivation and processing",
      "Citrus orchards",
      "Food, canning and dairy industries",
      "Trade and distribution across the northern markets",
      "Ecolodges, restaurants and tourism",
    ],
    productRefs: [
      { category: "commercial", slug: "employers", name: "Employers Liability Insurance" },
      { category: "commercial", slug: "product-liability", name: "Product Liability Insurance" },
      { category: "commercial", slug: "restaurants-hotels", name: "Restaurants & Hotels Liability" },
      { category: "public", slug: "travel-tours", name: "Travel & Tours Liability" },
      { category: "commercial", slug: "fire-third-party", name: "Fire Third-Party Liability" },
    ],
    faqs: [
      {
        question: "What liability do employers of paddy and farm workers in Rasht carry?",
        answer:
          "An agricultural employer in Rasht and across Gilan answers, under Article 91 of the Labor Law, for accidents to seasonal workers in the paddies, citrus orchards and processing workshops. Employer liability pays injury damage caused by faults in safety provision and covers legal-defense costs; the limit is chosen according to headcount and the nature of the activity.",
      },
      {
        question: "What insurance do Rasht's traditional restaurants and ecolodges need?",
        answer:
          "As a UNESCO creative city of gastronomy, Rasht draws many visitors to its traditional restaurants and ecolodges, and each host answers for guests' bodily and property damage, such as food poisoning, fire or falls, under the Civil Liability Act. Restaurants and hotels liability pays those damages and the defense costs; the rate is requested through the quotation form.",
      },
      {
        question: "Are Rasht's canneries and dairy plants exposed to product claims?",
        answer:
          "Yes. Canning, dairy and tea-processing plants ship across the country, and a contaminated or defective batch makes the producer answerable to consumers under the Consumer Protection Act. Product liability pays proven bodily and property damages and the cost of defending the claim, with the product line and distribution scope registered in the policy at issuance.",
      },
    ],
    metaTitle: "Liability Insurance in Rasht | Farms, Food, Ecolodges",
    metaDescription:
      "Rasht liability insurance explained: employer cover for paddy and orchard workers, food product risk, ecolodge liability and the official quotation.",
  },
  {
    slug: "yazd",
    nameEn: "Yazd",
    title: "Liability Insurance in Yazd — Kilns, Workshops and Heritage Risks",
    answerBlock:
      "Yazd's kilns, tile lines and workshops make worker accidents frequent, and employers answer under Article 91 of the Labor Law. Hotels in the UNESCO-listed historic fabric answer for guests, while adobe walls raise fire-spread risk. Employer and fire third-party cover with limits sized to the full diyeh of the year of occurrence is the base, issued upon official quotation.",
    industries: [
      "Ceramics, tile and metal industries",
      "Textiles and machine-woven carpets",
      "Mining and mineral industries",
      "Hotels in the historic fabric and world tourism",
      "Food and traditional confectionery industries",
    ],
    productRefs: [
      { category: "commercial", slug: "employers", name: "Employers Liability Insurance" },
      { category: "commercial", slug: "product-liability", name: "Product Liability Insurance" },
      { category: "commercial", slug: "contractors", name: "Contractors Liability Insurance" },
      { category: "commercial", slug: "fire-third-party", name: "Fire Third-Party Liability" },
      { category: "commercial", slug: "restaurants-hotels", name: "Restaurants & Hotels Liability" },
    ],
    faqs: [
      {
        question: "What cover do Yazd's ceramic and metal industry workers have?",
        answer:
          "A worker at Yazd's melting furnaces and ceramic lines faces thermal, mechanical and respiratory hazards, and the employer answers for the resulting damage under Article 91 of the Labor Law. Employer liability with a limit matched to the current diyeh pays that damage and the legal defense; the unit's particulars and headcount are presented for the pro-forma invoice.",
      },
      {
        question: "What responsibility do traditional hotels in Yazd's historic fabric carry?",
        answer:
          "The manager of a guesthouse in the historic fabric answers for guests' safety in the adobe structure, electrical installations and firefighting arrangements, and pays for negligent accidents under the Civil Liability Act. Hotels liability covers those damages, and fire third-party cover manages the risk of fire spreading to neighboring historic buildings.",
      },
      {
        question: "Do Yazd's tile and confectionery producers face product liability?",
        answer:
          "Yes. Tile, machine-woven fabric and traditional sweets leave Yazd for markets across the country, and a defect that harms a consumer makes the producer answerable under the Consumer Protection Act. Product liability pays proven bodily and property damages and the defense costs once the defect and causal link are established; the product range is registered in the policy.",
      },
    ],
    metaTitle: "Liability Insurance in Yazd | Tile Works & Heritage",
    metaDescription:
      "Yazd liability insurance explained: employer cover for kilns and workshops, heritage hotel liability, fire third-party risk, limits and official quotation.",
  },
  {
    slug: "kerman",
    nameEn: "Kerman",
    title: "Liability Insurance in Kerman — Pistachio, Mines and Export Risks",
    answerBlock:
      "Kerman's economy stands on pistachio orchards, copper mines, carpets and steel plants. Seasonal harvests make employer accidents routine, exports raise product liability toward buyers, and mining contractors answer for their crews and the client's facilities. Employer, product and contractor cover with limits sized to the full diyeh of the year of occurrence is the base, issued upon official quotation.",
    industries: [
      "Pistachio cultivation and export",
      "Copper mining and processing",
      "Carpets and handicrafts",
      "Automotive and steel industries",
      "Dry farming and orchards",
    ],
    productRefs: [
      { category: "commercial", slug: "employers", name: "Employers Liability Insurance" },
      { category: "commercial", slug: "product-liability", name: "Product Liability Insurance" },
      { category: "commercial", slug: "contractors", name: "Contractors Liability Insurance" },
      { category: "commercial", slug: "transport-carriers", name: "Carriers Liability Insurance" },
      { category: "commercial", slug: "fire-third-party", name: "Fire Third-Party Liability" },
    ],
    faqs: [
      {
        question: "How is insurance arranged for seasonal pistachio harvest workers in Kerman?",
        answer:
          "The orchard employer answers for harvest accidents such as falls from ladders or machinery injuries. Employer liability with the special agreement endorsement includes seasonal and contract workers in the cover. Worker numbers, the harvest season and the chosen limit set the rate, and the pro-forma invoice is issued after the quotation request.",
      },
      {
        question: "Which covers do Kerman's copper-mine contractors need?",
        answer:
          "A mine contractor answers both for its own workers and for damage to the mine operator's facilities and staff. The customary combination is employer liability with a limit matched to the current diyeh, plus contractors liability. The scope of operations, extraction depth and machinery types must appear in the policy to prevent interpretive disputes at claim time.",
      },
      {
        question: "Does exporting pistachios and carpets create product liability in Kerman?",
        answer:
          "Yes. An exporter answers to buyers and end consumers for harm caused by a defective or contaminated batch, and the claim rests on proving the defect and the causal link. Product liability pays proven damages and the defense costs, with the exported goods and destination markets registered in the policy at issuance; the premium follows official quotation.",
      },
    ],
    metaTitle: "Liability Insurance in Kerman | Pistachio, Mines, Rugs",
    metaDescription:
      "Kerman liability insurance explained: seasonal harvest worker cover, mining contractor and product liability, limits and the official Bimeh Iran quotation.",
  },
];

export function getEnCityGuide(slug: string): EnCityGuide | undefined {
  return EN_CITY_GUIDES.find((c) => c.slug === slug);
}

export function enCityHreflangPair(slug: string) {
  return {
    en: `/en/city/${slug}`,
    "fa-IR": `/city/${slug}`,
    "x-default": `/city/${slug}`,
  };
}
