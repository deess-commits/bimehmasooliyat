// ─── English Edition Content (static, self-contained) ──────────────
// Answer-first, quotable (GEO/AIO). Rules:
//   - answerBlock and every FAQ answer: 40-60 words, standalone.
//   - No invented prices or statistics: the final premium is issued
//     upon official quotation.
//   - Iranian statutes referenced by common English title + article.

import type { EnCategory } from "@/lib/en/config";

export interface EnCoverage {
  title: string;
  description: string;
}

export interface EnStep {
  title: string;
  description: string;
}

export interface EnFaq {
  question: string;
  answer: string;
}

export interface EnLegalSource {
  title: string;
  reference: string;
}

export interface EnProductPage {
  slug: string;
  category: "professional" | "commercial" | "corporate" | "public";
  title: string; // H1
  nameEn: string; // canonical product name
  audienceLine: string;
  answerBlock: string;
  whoCovered: string[];
  coverages: EnCoverage[];
  exclusions: string[];
  conditions: string[];
  documents: string[];
  buySteps: EnStep[];
  claimSteps: EnStep[];
  faqs: EnFaq[];
  legalSources: EnLegalSource[];
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  reviewDate: string;
}

const REVIEW_DATE = "2026-10-24";

export const enProductPages: readonly EnProductPage[] = [
  // ── 1 ── medical-doctors ─────────────────────────────────────────
  {
    slug: "medical-doctors",
    category: "professional",
    title: "Physicians Professional Liability Insurance in Iran",
    nameEn: "Physicians Professional Liability Insurance",
    audienceLine:
      "For general practitioners, specialists, subspecialists and surgeons licensed by the Iranian Medical Council.",
    answerBlock:
      "Physicians professional liability insurance in Iran compensates bodily injury and financial loss that a patient suffers because of a physician's professional error — diagnostic, therapeutic or surgical — up to the policy limit, and funds the physician's legal defense before Iranian courts, the Forensic Medicine Organization and Medical Council commissions.",
    whoCovered: [
      "General practitioners holding an active Medical Council practice license",
      "Clinical specialists and subspecialists in all recognized fields",
      "Surgeons and surgical team members, provided the specialty is named in the policy schedule",
      "Physicians working in private offices, hospitals, clinics and limited surgical centers",
      "Residents and medical assistants acting under supervision, within the scope stated in the schedule",
    ],
    coverages: [
      {
        title: "Diyeh (blood money) and bodily injury",
        description:
          "Compensation for death or permanent and partial disability of a patient caused by professional error, calculated on the official diyeh schedule issued by the judiciary for the year of the incident.",
      },
      {
        title: "Patient financial loss",
        description:
          "Reimbursement of repeat treatment, medication and related services the patient is forced to bear because of a diagnostic or therapeutic error.",
      },
      {
        title: "Legal defense costs",
        description:
          "Attorney fees and court costs in criminal and civil proceedings and before the Medical Council forensic commissions, including claims that are later dismissed.",
      },
      {
        title: "Vicarious liability for auxiliary staff",
        description:
          "Liability of the physician for acts of dependent personnel such as nurses and assistants, within the scope declared in the policy.",
      },
      {
        title: "Medically indicated cosmetic procedures",
        description:
          "Where the cosmetic specialty is expressly scheduled, procedures with a therapeutic or reconstructive nature can be covered.",
      },
      {
        title: "Rehabilitation of professional reputation (optional)",
        description:
          "Under agreed endorsements, defense costs against media allegations arising from the same insured event may be added to the policy.",
      },
    ],
    exclusions: [
      "Claims arising from practice outside the specialty recorded on the physician's Medical Council license",
      "Purely aesthetic surgery with no therapeutic indication, unless expressly scheduled in the policy",
      "Claims presented after policy expiry or cancellation where the incident date itself is not covered",
      "Intentional criminal acts, patient enticement or deliberate breach of licensing regulations",
      "Diyeh amounts that are the subject of qisas (retribution) or corporal punishment",
      "Losses aggravated by the insured physician's use of alcohol or narcotics",
    ],
    conditions: [
      "A valid Medical Council practice license on the date of the incident",
      "Accurate declaration of specialty and sub-specialty at issuance",
      "No undisclosed claims history from previous policy periods",
    ],
    documents: [
      "Permanent or temporary Medical Council practice license",
      "National ID and identity documents of the physician",
      "Previous liability policy, for claims history and no-claims discount",
      "Employment certificate for hospital-based physicians",
      "List of hospitals, clinics and centers where the physician practices",
    ],
    buySteps: [
      {
        title: "Quotation and consultation",
        description:
          "Submit the quote request; an advisor proposes an adequate limit of liability for your specialty and risk profile.",
      },
      {
        title: "Documents and official proforma",
        description:
          "After the documents are received, an official proforma invoice is issued on the approved Bimeh Iran tariffs.",
      },
      {
        title: "Premium payment",
        description:
          "Pay through the banking gateway or a bank receipt; cover starts the moment issuance is confirmed.",
      },
      {
        title: "Policy delivery",
        description:
          "The printed and electronic policy, with its general conditions, is delivered within one working day.",
      },
    ],
    claimSteps: [
      {
        title: "Immediate notification",
        description:
          "Report the incident to the agency as soon as you become aware of it; the policy sets a maximum notification period of five working days.",
      },
      {
        title: "Claim form",
        description:
          "Complete and sign the claim form describing the events, dates and any comparable previous incidents.",
      },
      {
        title: "Case documents",
        description:
          "Submit the patient's medical file, operative report, prescriptions and identity documents of the parties to the claims adjuster.",
      },
      {
        title: "Expert review and medical commission",
        description:
          "In bodily-injury files, the Medical Council forensic commissions or the Forensic Medicine Organization determine fault.",
      },
      {
        title: "Agreement and payment",
        description:
          "Once liability and the diyeh amount are established, compensation is paid subject to the policy deductible.",
      },
    ],
    faqs: [
      {
        question: "What does physicians professional liability insurance cover in Iran?",
        answer:
          "It covers bodily injury to patients, including diyeh for death or disability, financial losses from repeat treatment, and the physician's legal defense costs before Iranian courts, the Forensic Medicine Organization and Medical Council commissions. Payment requires proof of professional fault and a causal link between the physician's act and the damage, and is capped by the policy limit.",
      },
      {
        question: "Is a physician's own policy enough, or does the hospital need separate cover?",
        answer:
          "A physician's policy covers only the physician's own acts and the staff under his or her direct supervision. The hospital, clinic or surgery center is a separate legal person and needs its own facility liability policy. A physician practicing in several centers should have every workplace declared in the policy schedule to avoid gaps in cover.",
      },
      {
        question: "What limit of liability is adequate for a surgeon in Iran?",
        answer:
          "A common benchmark is a limit of at least one full diyeh of the current year, plus headroom for files with several claimants. Surgeons and higher-risk specialties usually select limits of two to three times the full diyeh. A limit below the annual diyeh leaves the physician personally exposed for the difference.",
      },
      {
        question: "Are criminal defense costs covered as well?",
        answer:
          "Yes. Legal defense costs — attorney fees and court or commission expenses — are covered for criminal, civil and disciplinary proceedings arising from the same insured incident. The cover applies even when the case ends in acquittal or dismissal, because the defense costs are incurred from the outset. Amounts are limited to the sub-limit stated in the policy schedule.",
      },
      {
        question: "What happens if a patient files a claim after the policy has expired?",
        answer:
          "If the incident that caused the damage occurred during the policy period, the claim remains covered even when it is filed after expiry, because the trigger is the date of the incident rather than the date of the claim. This is why uninterrupted annual renewal is recommended, so that no active treatment period is left without cover.",
      },
      {
        question: "Is there a no-claims discount on renewal?",
        answer:
          "Yes. Under the general conditions of Bimeh Iran, a no-claims discount is applied when the previous year's policy is presented without any reported claim. The discount is tiered and grows with consecutive claim-free years. Presenting the summary of the previous policy at issuance is necessary so the discount is calculated correctly on the official quotation.",
      },
    ],
    legalSources: [
      {
        title: "Civil Liability Act of Iran (1960)",
        reference: "Articles 1 to 11 — fault-based civil liability",
      },
      {
        title: "Islamic Penal Code — Diyat chapter",
        reference: "Book Five, Articles 449 to 503",
      },
      {
        title: "General Conditions of Physicians Professional Liability Insurance (Bimeh Iran)",
        reference: "Central Insurance Regulation No. 57",
      },
      {
        title: "Independence of the Medical Profession Act",
        reference: "Adopted 1954, as amended",
      },
    ],
    metaTitle: "Physicians Professional Liability Insurance in Iran",
    metaDescription:
      "How physicians professional liability insurance works in Iran: covered risks, diyeh, legal defense costs, exclusions, and how to request an official quotation.",
    keywords: [
      "medical malpractice insurance Iran",
      "physician liability insurance Iran",
      "doctors professional indemnity Iran",
      "medical error compensation Iran",
      "diyeh medical liability Iran",
      "Iran doctor malpractice cover",
      "بیمه مسئولیت پزشکان",
    ],
    reviewDate: REVIEW_DATE,
  },

  // ── 2 ── lawyers ─────────────────────────────────────────────────
  {
    slug: "lawyers",
    category: "professional",
    title: "Lawyers Professional Liability Insurance in Iran",
    nameEn: "Lawyers and Legal Advisors Liability Insurance",
    audienceLine:
      "For attorneys at law, legal advisors and law offices registered with the Iranian bar associations.",
    answerBlock:
      "Lawyers professional liability insurance compensates financial loss that a client suffers from a lawyer's professional negligence — missed limitation deadlines, defective pleadings, wrongful advice or failure to enforce an awarded right — up to the policy limit, and covers the defense costs of disciplinary proceedings before the Iranian bar associations.",
    whoCovered: [
      "Attorneys at law holding an active license from the Iranian or provincial bar associations",
      "Law offices and legal partnerships practicing under a registered name",
      "In-house legal advisors of companies, where their role is declared in the schedule",
      "Lawyers acting as arbitrators' counsel or party representatives in arbitration mandates",
      "Trainee lawyers performing supervised work within the office's declared scope",
    ],
    coverages: [
      {
        title: "Client financial loss",
        description:
          "Compensation for pecuniary damage caused by professional mistakes such as expired limitation periods, flawed petitions, or failure to file and pursue an awarded claim.",
      },
      {
        title: "Defense and disciplinary costs",
        description:
          "Attorney fees and procedural costs of the lawyer's own defense, including proceedings before the disciplinary courts of the bar associations.",
      },
      {
        title: "Document and filing errors",
        description:
          "Loss caused by loss of original documents, incorrect drafting of contracts within the mandate, or misstatement of deadlines and forum requirements.",
      },
      {
        title: "Vicarious liability in the office",
        description:
          "Acts of trainee lawyers, assistants and employees of the law office, performed under its supervision and within the scope declared in the policy.",
      },
      {
        title: "Arbitration and settlement mandates",
        description:
          "Cover extends to representation in arbitration and negotiated settlements when these mandates are declared in the policy schedule.",
      },
      {
        title: "Continuation of open files (optional endorsement)",
        description:
          "Under agreed endorsements, open files of the expiring period can be scheduled for continued cover during the new period.",
      },
    ],
    exclusions: [
      "Acts performed without a valid power of attorney or outside the client's mandate",
      "Intentional breach, collusion with the opposing party, fraud or misappropriation of client funds",
      "Disciplinary fines, sanctions and suspension periods imposed on the lawyer",
      "Criminal liability of the lawyer for the lawyer's own offenses",
      "Incidents already known to the insured at policy inception and deliberately not declared",
    ],
    conditions: [
      "An active bar association license or membership certificate at the date of the incident",
      "Accurate declaration of the practice areas and mandate types at issuance",
      "No undisclosed claims or known circumstances from previous periods",
    ],
    documents: [
      "Bar association license or certificate of membership",
      "Identity documents of the lawyer or the office's registered lawyers",
      "Previous liability policy, for renewal and no-claims discount",
      "Description of the practice areas and typical mandate types",
      "List of practicing lawyers and trainees in the office, where applicable",
    ],
    buySteps: [
      {
        title: "Quotation and consultation",
        description:
          "Submit the quote request; the advisor reviews the office's practice profile and proposes a suitable limit of liability.",
      },
      {
        title: "Documents and official proforma",
        description:
          "After the license and practice details are received, an official proforma invoice is issued on Bimeh Iran tariffs.",
      },
      {
        title: "Premium payment",
        description:
          "Pay through the banking gateway or a bank receipt; cover starts the moment issuance is confirmed.",
      },
      {
        title: "Policy delivery",
        description:
          "The printed and electronic policy, with its general conditions and schedule of insured lawyers, is delivered within one working day.",
      },
    ],
    claimSteps: [
      {
        title: "Immediate notification",
        description:
          "Notify the agency as soon as a client alleges professional negligence; the policy sets a maximum notification period of five working days.",
      },
      {
        title: "Claim form",
        description:
          "Complete and sign the claim form describing the mandate, the alleged negligence and the claimed loss.",
      },
      {
        title: "Case documents",
        description:
          "Submit the retainer, the case file, correspondence with the client, and any court or disciplinary notices received.",
      },
      {
        title: "Expert review",
        description:
          "The claims adjuster examines the mandate and, where needed, the bar association's disciplinary opinion on the conduct.",
      },
      {
        title: "Settlement and payment",
        description:
          "After fault, causation and the loss amount are established, compensation is agreed or court-awarded and paid subject to the deductible.",
      },
      {
        title: "Subrogation and file closure",
        description:
          "The insurer may pursue recovery from responsible third parties, and the file is closed with a written settlement record.",
      },
    ],
    faqs: [
      {
        question: "What does lawyers professional liability insurance cover in Iran?",
        answer:
          "It covers pecuniary loss that a client suffers from a lawyer's professional negligence — missed limitation and procedural deadlines, defective pleadings or contracts drafted within the mandate, and failure to pursue an awarded right. Cover also includes defense costs in disciplinary proceedings. Payment requires proof of fault, causation and loss, up to the policy limit.",
      },
      {
        question: "Does the policy cover disciplinary proceedings before the bar association?",
        answer:
          "Yes. Defense costs before the disciplinary courts and disciplinary commissions of the Iranian and provincial bar associations are covered when they arise from an insured professional act. This includes attorney fees and procedural expenses. The cover responds to the defense costs themselves; any disciplinary sanction, fine or suspension is never an insured amount under the policy.",
      },
      {
        question: "Are acts of trainee lawyers and office staff covered?",
        answer:
          "Yes, within the scope declared in the policy schedule. Liability for acts of trainee lawyers, assistants and administrative staff of the law office is treated as vicarious liability of the insured lawyer, provided the work was performed under the office's supervision and within the mandate. Deliberate acts outside the mandate remain excluded.",
      },
      {
        question: "What is the right limit of liability for a lawyer?",
        answer:
          "The limit should reflect the highest-value mandate the office accepts, because a single missed deadline in a high-value case can exceed several years of fees. Many offices select a limit equal to the value of the largest active file, or a multiple of annual professional income. The adequate figure is confirmed in consultation before the official quotation.",
      },
      {
        question: "What documents are needed to buy or renew this policy?",
        answer:
          "At issuance the agency normally requests the bar association license or certificate of membership, identity documents, a description of the practice areas and, for renewals, the expiring policy to apply the no-claims discount. Law offices and partnerships should also declare the number of practicing lawyers and trainees, so that the premium quotation reflects the real exposure of the office.",
      },
      {
        question: "How is a claim reported and processed?",
        answer:
          "Notify the agency as soon as a client alleges professional negligence; the policy sets a maximum notification period of five working days. The claim form, retainer, case file, correspondence and any court or disciplinary notices are then submitted. The adjuster examines the mandate and, where needed, the bar's disciplinary opinion, before settlement subject to the policy deductible.",
      },
    ],
    legalSources: [
      {
        title: "Civil Liability Act of Iran (1960)",
        reference: "Articles 1 and 2 — fault-based civil liability",
      },
      {
        title: "Independence of the Iranian Bar Association Act",
        reference: "Adopted 1953 — disciplinary framework of the bar",
      },
      {
        title: "Iranian Insurance Act (1936)",
        reference: "Article 30 — five-day claim notification",
      },
    ],
    metaTitle: "Lawyers Professional Liability Insurance in Iran",
    metaDescription:
      "Lawyers professional liability insurance in Iran: covered client losses, disciplinary defense costs, exclusions, claim steps, and official quotation.",
    keywords: [
      "lawyers professional liability insurance Iran",
      "attorney malpractice insurance Iran",
      "legal malpractice cover Iran",
      "law firm liability insurance",
      "professional indemnity lawyers Iran",
      "بیمه مسئولیت وکلا",
    ],
    reviewDate: REVIEW_DATE,
  },

  // ── 3 ── engineers ───────────────────────────────────────────────
  {
    slug: "engineers",
    category: "professional",
    title: "Engineers Professional Liability Insurance in Iran",
    nameEn: "Engineers Professional Liability Insurance",
    audienceLine:
      "For licensed engineers and supervising engineers in civil, architectural, electrical, mechanical and other recognized disciplines.",
    answerBlock:
      "Engineers professional liability insurance compensates financial and bodily loss caused by errors in design, calculation, supervision and execution of construction or industrial projects. It applies to licensed members of the Iranian Engineering Council and covers supervision liability under Article 33 of the Engineering System Act, up to the policy limit.",
    whoCovered: [
      "Licensed members of the Iranian Engineering Council in all recognized disciplines",
      "Design engineers preparing drawings, calculations and technical specifications",
      "Supervising engineers (nazer) appointed under Article 33 of the Engineering System Act",
      "Engineers of contracting companies executing declared projects",
      "Engineering firms and design offices, with their employed engineers declared",
    ],
    coverages: [
      {
        title: "Design and calculation errors",
        description:
          "Financial loss and damage caused by defective structural, architectural or installations design, including errors in drawings, calculations and specifications.",
      },
      {
        title: "Supervision liability (Article 33)",
        description:
          "Liability of the supervising engineer for failing to detect execution that departs from approved drawings and mandatory standards.",
      },
      {
        title: "Third-party bodily injury",
        description:
          "Diyeh and medical costs when a structural or installation failure injures workers, occupants or passers-by and the insured engineer is proven liable.",
      },
      {
        title: "Employer's financial loss",
        description:
          "Compensation of the project employer's pecuniary loss caused by the engineer's professional error, as established by agreement or court ruling.",
      },
      {
        title: "Legal defense costs",
        description:
          "Attorney fees and technical-expert costs in civil and criminal proceedings arising from the insured professional services.",
      },
      {
        title: "Vicarious liability of the office",
        description:
          "Acts of junior engineers and technical staff of a design office, performed under the supervision of the insured engineer.",
      },
    ],
    exclusions: [
      "Services performed without a valid Engineering Council license or outside the declared discipline",
      "Deliberate violation of mandatory standards, the national building code or the approved drawings",
      "Projects and roles not declared in the policy schedule",
      "Administrative fines and penalties imposed by authorities",
      "Incidents arising after policy expiry where the causal error did not occur during the insured period",
    ],
    conditions: [
      "A valid Engineering Council membership license stating discipline and grade",
      "Declaration of the engineer's role — design, supervision or execution — for each project",
      "No undisclosed incidents or known claims at policy inception",
    ],
    documents: [
      "Engineering Council membership license stating discipline and grade",
      "Identity documents of the engineer or the firm's insured engineers",
      "Previous liability policy, for renewal and no-claims discount",
      "Project list with roles and contract values, for project-based policies",
    ],
    buySteps: [
      {
        title: "Quotation and consultation",
        description:
          "Submit the quote request; the advisor maps your disciplines and roles and proposes the limit structure.",
      },
      {
        title: "Documents and official proforma",
        description:
          "After the license and project details are received, an official proforma invoice is issued on Bimeh Iran tariffs.",
      },
      {
        title: "Premium payment",
        description:
          "Pay through the banking gateway or a bank receipt; cover starts the moment issuance is confirmed.",
      },
      {
        title: "Policy delivery",
        description:
          "The printed and electronic policy, with the schedule of insured engineers and projects, is delivered within one working day.",
      },
    ],
    claimSteps: [
      {
        title: "Immediate notification",
        description:
          "Notify the agency as soon as a defect or damage attributable to your services is alleged; the maximum notification period is five working days.",
      },
      {
        title: "Claim form",
        description:
          "Complete and sign the claim form describing the project, your role and the alleged professional error.",
      },
      {
        title: "Case documents",
        description:
          "Submit the design documents, supervision reports, correspondence with the employer and any official or judicial notices.",
      },
      {
        title: "Technical expert review",
        description:
          "A technical loss adjuster or court-appointed expert determines whether the design or supervision deviated from mandatory standards.",
      },
      {
        title: "Settlement and payment",
        description:
          "After fault, causation and the loss are established, compensation is agreed or court-awarded and paid subject to the deductible.",
      },
      {
        title: "File closure",
        description:
          "The settlement record closes the file; open defects can be scheduled for continuation under an agreed endorsement.",
      },
    ],
    faqs: [
      {
        question: "What does engineers professional liability insurance cover in Iran?",
        answer:
          "It covers financial and bodily loss caused by errors in design, calculation, supervision and execution of construction and industrial projects — for example a structural miscalculation or a supervision failure that leads to damage. Licensed members of the Engineering Council are covered, including the supervising engineer's liability under Article 33 of the Engineering System Act, up to the policy limit.",
      },
      {
        question: "Why does the supervising engineer (nazer) need this policy?",
        answer:
          "Under Article 33 of the Engineering System Act, the supervising engineer is responsible for checking that execution conforms to approved drawings and standards. If a defect the supervisor should have detected causes damage to the employer or third parties, the supervisor is liable alongside the executor. The policy transfers this liability to the insurer up to the policy limit.",
      },
      {
        question: "Does the policy cover projects outside the declared discipline?",
        answer:
          "No. The policy covers only services within the discipline and role recorded on the engineer's Engineering Council license and declared in the policy schedule. Services in an unlicensed discipline, or performed under another engineer's name, fall outside the cover, and resulting damage is not compensated by the insurer.",
      },
      {
        question: "What limit of liability is adequate for design and supervision work?",
        answer:
          "A practical reference is the total value of the largest project the engineer supervises or designs in the policy year, since reconstruction or strengthening costs can approach that figure. Engineering firms usually aggregate limits across projects, while individual engineers often insure per project. The final recommendation is made during consultation, and the premium is issued upon official quotation.",
      },
      {
        question: "Are claims for incidents after project handover covered?",
        answer:
          "Yes, if the causal error occurred during the insured period. Liability insurance follows the date of the incident that created the risk, not the date the claim is raised. A defect discovered two years after handover, caused by a design or supervision error made while the policy was active, is claimable, which is why continuous annual renewal is recommended.",
      },
      {
        question: "What documents are required for issuance?",
        answer:
          "The agency requests the Engineering Council membership license stating discipline and grade, identity documents, and for project-specific policies the project name, role (design, supervision or execution) and contract value. For renewals, the expiring policy is required so the no-claims discount is applied. Firms should also declare the number of insured engineers and their roles for the quotation.",
      },
    ],
    legalSources: [
      {
        title: "Engineering System Act of Iran",
        reference: "Adopted 1995 — Article 33 (supervising engineer's liability)",
      },
      {
        title: "Civil Liability Act of Iran (1960)",
        reference: "Articles 1 and 2 — fault-based civil liability",
      },
      {
        title: "Islamic Penal Code — Diyat chapter",
        reference: "Book Five, Articles 449 onwards",
      },
      {
        title: "Iranian Insurance Act (1936)",
        reference: "Article 30 — five-day claim notification",
      },
    ],
    metaTitle: "Engineers Professional Liability Insurance in Iran",
    metaDescription:
      "Engineers professional liability insurance in Iran: design and supervision errors, Article 33 liability, exclusions, claim steps, and official quotations.",
    keywords: [
      "engineers professional liability insurance Iran",
      "supervising engineer liability Iran",
      "professional indemnity engineers Iran",
      "design error insurance Iran",
      "Engineering Council liability cover",
      "بیمه مسئولیت مهندسان",
    ],
    reviewDate: REVIEW_DATE,
  },

  // ── 4 ── employers ───────────────────────────────────────────────
  {
    slug: "employers",
    category: "commercial",
    title: "Employers Liability Insurance in Iran (Labor Law Art. 91)",
    nameEn: "Employers Liability Insurance",
    audienceLine:
      "For employers in construction, industrial, service and contracting workplaces with salaried workers.",
    answerBlock:
      "Employers liability insurance compensates workers for bodily injury, death or occupational disease caused by work or workplace conditions, when the employer is legally liable under Article 91 of the Iranian Labor Law. It pays diyeh and court-awarded damages up to the policy limit and defends the employer in labor disputes.",
    whoCovered: [
      "Employers in construction, installation, industrial and service workshops",
      "Contracting companies responsible for their site workforce",
      "Factories, workshops and production units with declared workers",
      "Service businesses employing salaried staff, from offices to hospitality",
      "Project employers holding temporary workforces during execution periods",
    ],
    coverages: [
      {
        title: "Diyeh for death and disability",
        description:
          "Compensation of the employer's liability for death or permanent disability of a worker, calculated on the official diyeh schedule of the year of the incident.",
      },
      {
        title: "Partial disability percentages",
        description:
          "Payment according to the percentage of disability determined by the medical or judicial authority, as the employer's civil liability under Article 91.",
      },
      {
        title: "Occupational disease liability",
        description:
          "Liability for diseases proven to be caused by workplace conditions, following the same compensation logic as work accidents.",
      },
      {
        title: "Financial loss awards",
        description:
          "Court-awarded pecuniary damage — treatment costs and loss of income components — included in the employer's proven liability.",
      },
      {
        title: "Defense costs in labor disputes",
        description:
          "Attorney fees and procedural costs in labor-authority and court proceedings arising from the insured work injury.",
      },
      {
        title: "Supervisors' acts",
        description:
          "Vicarious liability of the employer for the acts of site supervisors and foremen within the declared workplace.",
      },
    ],
    exclusions: [
      "Intentional self-harm or injuries caused by the worker's own deliberate act",
      "Incidents outside the workplace or unrelated to the declared work activity",
      "Liability already compensated as statutory Social Security work-accident benefit for the same head of damage",
      "Criminal fines and penalties imposed on the employer",
      "Undeclared worker categories, where the insurer reduces payment in proportion to the unreported payroll",
    ],
    conditions: [
      "An employment relationship between the employer and the injured worker",
      "Declaration of the workplace, activity and worker categories at issuance",
      "Compliance with safety regulations, without prejudice to the insurer's duty per the policy terms",
    ],
    documents: [
      "Business or workshop license and activity description",
      "Worker list or declared worker categories for the schedule",
      "Identity documents of the employer (natural or legal person)",
      "Previous liability policy, for renewal and no-claims discount",
    ],
    buySteps: [
      {
        title: "Quotation and consultation",
        description:
          "Submit the quote request with the workplace profile; the advisor proposes the limit and worker categories to declare.",
      },
      {
        title: "Documents and official proforma",
        description:
          "After the activity details are received, an official proforma invoice is issued on Bimeh Iran tariffs.",
      },
      {
        title: "Premium payment",
        description:
          "Pay through the banking gateway or a bank receipt; cover starts the moment issuance is confirmed.",
      },
      {
        title: "Policy delivery",
        description:
          "The printed and electronic policy, with the declared workplaces and worker categories, is delivered within one working day.",
      },
    ],
    claimSteps: [
      {
        title: "Immediate notification",
        description:
          "Notify the agency within five working days of the incident, as the policy requires prompt written notification.",
      },
      {
        title: "Claim form",
        description:
          "Complete and sign the claim form describing the accident, the workplace conditions and the injured worker.",
      },
      {
        title: "Case documents",
        description:
          "Submit the worker's identity and employment documents, medical records, and any labor inspectorate or Social Security reports.",
      },
      {
        title: "Liability assessment",
        description:
          "The labor authority, medical commission or court establishes the causal link, the disability percentage and the employer's liability share.",
      },
      {
        title: "Agreement and payment",
        description:
          "Compensation is agreed with the claimant or fixed by ruling and paid subject to the policy deductible.",
      },
      {
        title: "File closure",
        description:
          "The settlement record closes the file; recurring workplace hazards should be corrected to preserve the no-claims record.",
      },
    ],
    faqs: [
      {
        question: "What does employers liability insurance cover in Iran?",
        answer:
          "It covers the employer's legal liability for bodily injury, death or occupational disease suffered by workers because of work or workplace conditions, as established by Article 91 of the Labor Law. Compensation follows the diyeh schedule and disability percentages, together with court-awarded financial loss, and includes defense costs in labor disputes, all up to the policy limit.",
      },
      {
        question: "Is employers liability insurance mandatory in Iran?",
        answer:
          "Article 92 of the Labor Law requires high-risk industries to insure their workers against work-related risks, and enforcement practice varies across activities. Even where enforcement is lax, the employer's civil liability under Article 91 exists from the first day of employment, so most employers treat this policy as essential risk management rather than a formality.",
      },
      {
        question: "What is the difference between this cover and Social Security work-accident insurance?",
        answer:
          "Social Security pays statutory medical and disability benefits for registered work accidents regardless of fault. Employers liability insurance responds to the employer's civil liability: compensation the employer must pay under Article 91 when workplace conditions or the employer's fault contributed to the damage. The two mechanisms are complementary; statutory benefits do not extinguish the employer's civil liability.",
      },
      {
        question: "Are day laborers and unregistered workers covered?",
        answer:
          "Cover follows the policy schedule, so every category of worker the employer wants protected must be declared at issuance, including day laborers and workers paid per task. Social Security registration is not a condition of this civil cover; if an undeclared worker is injured, the insurer may reduce payment in proportion to the unreported payroll.",
      },
      {
        question: "What limit of liability should an employer choose?",
        answer:
          "The reference point is one full diyeh of the current year for death or total permanent disability, because Article 91 liability is calculated on that basis. Workplaces with higher accident severity — construction, mining, heavy industry — usually select two or more full diyeh units per worker. The adequate limit is set in consultation before the official quotation.",
      },
      {
        question: "How is a work-injury claim reported?",
        answer:
          "Notify the agency within five working days of the incident, as the policy requires immediate written notification. The claim form, the worker's identity and employment documents, medical records, and any labor inspectorate or Social Security reports are then submitted. Liability and the disability percentage are established by the labor authority or court, and payment follows with the policy deductible.",
      },
    ],
    legalSources: [
      {
        title: "Labor Law of Iran",
        reference: "Adopted 1990 — Article 91 (employer's civil liability)",
      },
      {
        title: "Labor Law of Iran",
        reference: "Article 95 — determination of disability percentage",
      },
      {
        title: "Social Security Act of Iran",
        reference: "Work-accident statutory benefits",
      },
      {
        title: "Iranian Insurance Act (1936)",
        reference: "Article 30 — five-day claim notification",
      },
    ],
    metaTitle: "Employers Liability Insurance in Iran (Labor Law Art. 91)",
    metaDescription:
      "Employers liability insurance in Iran under Labor Law Article 91: covered worker injuries, diyeh, claim steps, exclusions, and official quotation.",
    keywords: [
      "employers liability insurance Iran",
      "employer liability Labor Law Iran",
      "work injury compensation Iran",
      "worker accident insurance Iran",
      "Article 91 Labor Law Iran",
      "بیمه مسئولیت کارفرما",
    ],
    reviewDate: REVIEW_DATE,
  },

  // ── 5 ── contractors ─────────────────────────────────────────────
  {
    slug: "contractors",
    category: "commercial",
    title: "Contractors Liability Insurance in Iran",
    nameEn: "Contractors Liability Insurance",
    audienceLine:
      "For construction, installation, industrial and service contracting companies and their subcontractors.",
    answerBlock:
      "Contractors liability insurance covers third-party bodily injury, property damage and contractual liabilities arising from construction, installation and service projects executed by a contracting company. It responds where the contractor or its subcontractors cause damage to neighbors, passers-by, the employer's property or other third parties during the execution period.",
    whoCovered: [
      "Construction and civil-engineering contracting companies",
      "Installation, electrical and mechanical contractors",
      "Industrial and service contractors working on client sites",
      "Main contractors scheduling their subcontractors under the same policy",
      "Development companies executing their own projects with hired executors",
    ],
    coverages: [
      {
        title: "Third-party bodily injury",
        description:
          "Diyeh and medical costs for injury to passers-by, neighbors and other third parties caused by the contractor's site operations.",
      },
      {
        title: "Damage to neighboring properties",
        description:
          "Property damage to adjacent buildings, structures and installations caused by excavation, shoring, demolition or heavy lifting operations.",
      },
      {
        title: "Damage to the employer's existing property",
        description:
          "Liability for damage to property belonging to the project employer that exists at the site, distinct from the works under execution.",
      },
      {
        title: "Subcontractors' acts",
        description:
          "Liability arising from operations of declared subcontractors, for which the main contractor answers toward the damaged party.",
      },
      {
        title: "Legal defense costs",
        description:
          "Attorney fees and procedural costs in civil proceedings brought by third parties for insured site damage.",
      },
      {
        title: "Contractual liability extensions",
        description:
          "Liability assumed by contract, to the extent declared in the policy schedule and consistent with the insurer's general conditions.",
      },
    ],
    exclusions: [
      "Damage to the contractor's own works, materials and equipment under execution",
      "Fines, penalties and contractual liquidated damages",
      "Deliberate violation of safety regulations and site safety plans",
      "Projects, sites or periods not declared in the policy schedule",
      "Liability of the contractor toward its own direct employees, covered under employers liability insurance",
    ],
    conditions: [
      "Declaration of the project, scope, location and execution period at issuance",
      "Compliance with the safety plan and technical specifications of the contract",
      "Limit of liability not lower than the contractually required minimum, where a contract applies",
    ],
    documents: [
      "Contract or tender award letter with the liability clause",
      "Project scope, location and execution period",
      "Company registration documents for corporate contractors",
      "List of subcontractors, where their acts are to be covered",
    ],
    buySteps: [
      {
        title: "Quotation and consultation",
        description:
          "Submit the quote request with the project or company profile; the advisor proposes a limit matching the contract requirement.",
      },
      {
        title: "Documents and official proforma",
        description:
          "After the contract details are received, an official proforma invoice is issued on Bimeh Iran tariffs.",
      },
      {
        title: "Premium payment",
        description:
          "Pay through the banking gateway or a bank receipt; cover starts on the confirmed issuance date, aligned with site possession.",
      },
      {
        title: "Policy delivery",
        description:
          "The printed and electronic policy, with the project schedule, is delivered in time for the employer's site handover checklist.",
      },
    ],
    claimSteps: [
      {
        title: "Secure the site",
        description:
          "Stop the hazardous operation and secure the scene to prevent further damage, without destroying evidence.",
      },
      {
        title: "Immediate notification",
        description:
          "Notify the agency within five working days of the incident, per the policy's notification condition.",
      },
      {
        title: "Claim form and documents",
        description:
          "Submit the claim form, site photographs, witness statements, safety records and any official inspection report.",
      },
      {
        title: "Liability assessment",
        description:
          "The adjuster assesses liability against the contract and Iranian civil liability rules, including the contractor's supervision duties.",
      },
      {
        title: "Agreement and payment",
        description:
          "Compensation to the third party is agreed or court-awarded and paid subject to the policy deductible.",
      },
      {
        title: "File closure",
        description:
          "The settlement record closes the file; repeated safety failures are recorded and affect future premium terms.",
      },
    ],
    faqs: [
      {
        question: "What does contractors liability insurance cover in Iran?",
        answer:
          "It covers third-party bodily injury and property damage arising from the execution of the declared project — for example injury to a passer-by, damage to a neighboring building or damage to the employer's existing property caused by the contractor's operations. Acts of subcontractors can be included, and the cover applies during the execution period stated in the policy schedule.",
      },
      {
        question: "Is contractors liability insurance required by construction contracts?",
        answer:
          "Yes, in most public and private tenders the employer's general conditions make third-party liability insurance a contractual requirement, with a minimum limit stated in the contract. The policy must usually remain valid until final handover and, where the contract requires it, through the defects-liability period. Presenting the policy is commonly a precondition for site possession and progress payments.",
      },
      {
        question: "Does the policy cover damage to the works themselves?",
        answer:
          "No. Liability insurance pays third parties; it does not compensate the contractor for damage to its own works, materials or equipment. Damage to the works under execution is the territory of construction-all-risk (CAR) insurance, which is usually bought alongside. The two policies are complementary: CAR protects the project asset, while liability insurance protects against claims by others.",
      },
      {
        question: "Are subcontractors' acts covered?",
        answer:
          "Yes, when subcontractors are declared in the policy schedule or when the policy is issued on a project basis that includes them. If a subcontractor's operation injures a third party, the contractor remains the principal vis-à-vis the damaged party and the policy responds to that liability. Uninsured subcontractors leave the contractor personally exposed; they should be declared in advance.",
      },
      {
        question: "What documents are needed for a project policy?",
        answer:
          "The agency normally requests the contract or tender award letter, the project's scope and location, the execution period, the limit of liability required by the contract, and the list of subcontractors where applicable. For a company-level policy, the company registration documents and payroll or workforce data are added. The official premium quotation is issued after these documents are reviewed.",
      },
      {
        question: "How is a third-party claim during execution reported?",
        answer:
          "Stop the hazardous operation, secure the site and notify the agency within five working days. The claim form, site photographs, witness statements, the project's safety records and any official report are submitted to the adjuster. Liability is assessed against the contract and Iranian civil liability rules, and compensation is paid to the third party subject to the policy deductible.",
      },
    ],
    legalSources: [
      {
        title: "Civil Liability Act of Iran (1960)",
        reference: "Articles 1 and 2 — fault-based civil liability",
      },
      {
        title: "Civil Code of Iran",
        reference: "Articles 328 to 335 — liability of possessors",
      },
      {
        title: "Labor Law of Iran",
        reference: "Article 91 — employer's liability for workers",
      },
      {
        title: "Iranian Insurance Act (1936)",
        reference: "Article 30 — five-day claim notification",
      },
    ],
    metaTitle: "Contractors Liability Insurance in Iran",
    metaDescription:
      "Contractors liability insurance in Iran: third-party injury, damage to the employer's property, subcontractor acts, exclusions, and official quotation steps.",
    keywords: [
      "contractors liability insurance Iran",
      "construction third party liability Iran",
      "contractor insurance requirements Iran",
      "subcontractor liability cover Iran",
      "project liability insurance Iran",
      "بیمه مسئولیت پیمانکاران",
    ],
    reviewDate: REVIEW_DATE,
  },

  // ── 6 ── public-liability ────────────────────────────────────────
  {
    slug: "public-liability",
    category: "commercial",
    title: "Public Liability Insurance in Iran (Third-Party)",
    nameEn: "Public Liability Insurance",
    audienceLine:
      "For shops, guilds, service units and commercial premises that host customers and third parties.",
    answerBlock:
      "Public liability insurance (civil third-party liability) compensates third parties for bodily injury and property damage that the insured business causes in the course of its activity — customers, visitors and passers-by. It is the base civil-liability cover for shops and service units and responds upon proof of fault or causation.",
    whoCovered: [
      "Retail shops, guild units and service businesses receiving customers on site",
      "Offices, consultancies and clinics receiving visitors",
      "Workshops, warehouses and small production units affecting neighbors",
      "Landlords and tenants of commercial premises",
      "Owners and possessors of buildings and installations under Civil Code possession rules",
    ],
    coverages: [
      {
        title: "Third-party bodily injury",
        description:
          "Diyeh, medical and rehabilitation costs for customers, visitors and passers-by injured on the insured premises or by the insured activity.",
      },
      {
        title: "Third-party property damage",
        description:
          "Repair or replacement of third-party property damaged by the business operations — for example fire spread, water leakage or falling objects.",
      },
      {
        title: "Fire and explosion spread",
        description:
          "Damage caused to third parties by fire or explosion originating from the insured unit, complementing fire third-party liability.",
      },
      {
        title: "Legal defense costs",
        description:
          "Attorney fees and procedural costs in civil proceedings brought by injured third parties against the insured business.",
      },
      {
        title: "Tenancy-related liability",
        description:
          "Liability of the tenant toward the landlord and of the landlord toward third parties, per the schedule of insured interests.",
      },
      {
        title: "Cross-liability between co-insureds",
        description:
          "Where several insured parties share the premises, the policy can treat each insured's liability toward the others as insurable, per the schedule.",
      },
    ],
    exclusions: [
      "Injuries to the insured's own employees, covered under employers liability insurance",
      "Damage to the insured's own property and stock",
      "Liability assumed by contract beyond what the law itself imposes",
      "Deliberate acts of the insured or violations of explicit safety orders",
      "Professional service errors, which belong to professional liability insurance",
    ],
    conditions: [
      "Accurate declaration of the business activity and premises at issuance",
      "Compliance with municipal, safety and fire regulations of the unit",
      "No undisclosed incidents or known claims at policy inception",
    ],
    documents: [
      "Business license or guild membership certificate",
      "Identity documents of the insured (natural or legal person)",
      "Description of the premises, floors and neighboring exposure",
      "Previous liability policy, for renewal and no-claims discount",
    ],
    buySteps: [
      {
        title: "Quotation and consultation",
        description:
          "Submit the quote request with the business activity; the advisor proposes a limit reflecting the premises exposure.",
      },
      {
        title: "Documents and official proforma",
        description:
          "After the activity details are received, an official proforma invoice is issued on Bimeh Iran tariffs.",
      },
      {
        title: "Premium payment",
        description:
          "Pay through the banking gateway or a bank receipt; cover starts the moment issuance is confirmed.",
      },
      {
        title: "Policy delivery",
        description:
          "The printed and electronic policy, with the declared activity and premises, is delivered within one working day.",
      },
    ],
    claimSteps: [
      {
        title: "Preserve the scene",
        description:
          "Preserve the condition that caused the damage and photograph it before cleaning or repair, where safely possible.",
      },
      {
        title: "Immediate notification",
        description:
          "Notify the agency within five working days of the incident, per the policy's notification condition.",
      },
      {
        title: "Claim form and documents",
        description:
          "Submit the claim form, the injured party's identity details, witness statements, and medical or repair invoices.",
      },
      {
        title: "Liability assessment",
        description:
          "The adjuster confirms liability under the Civil Code's possession rules or the Civil Liability Act's fault rules.",
      },
      {
        title: "Agreement and payment",
        description:
          "Compensation is agreed with the third party or fixed by ruling and paid subject to the policy deductible.",
      },
    ],
    faqs: [
      {
        question: "What does public liability insurance cover in Iran?",
        answer:
          "It covers bodily injury and property damage that the insured business causes to third parties — customers, visitors, neighbors and passers-by — in the course of its activity: a customer slipping on a wet floor, a falling sign injuring a visitor, or water leakage damaging a neighbor's stock. Payment requires proven fault or causation, up to the policy limit.",
      },
      {
        question: "Who needs public liability insurance in Iran?",
        answer:
          "Any business unit that receives third parties on its premises or affects them through its operations: shops, service units, offices receiving clients, workshops, warehouses and small production units. Landlords and tenants of commercial premises are frequent buyers because Articles 328 to 335 of the Civil Code base liability on possession and control of the property, not only on fault.",
      },
      {
        question: "Is public liability the same as professional liability?",
        answer:
          "No. Public liability covers bodily injury and property damage caused to third parties by the business's premises and operations. Professional liability covers financial loss caused by a professional service — wrong advice, a defective report, a missed deadline. A pharmacy, for example, may need both: public liability for customer injuries on site and professional liability for dispensing errors.",
      },
      {
        question: "How is the limit of liability chosen?",
        answer:
          "Consider the maximum plausible single loss: the value of neighboring property, the typical number of visitors and the severity of plausible injuries. Retail units commonly start from limits covering several units of the annual full diyeh, and landlords of large buildings choose higher limits. The final recommendation is made in consultation, and the premium is issued upon official quotation.",
      },
      {
        question: "Does the policy cover employees who are injured?",
        answer:
          "No. Workers and employees are not third parties vis-à-vis their employer; their work-related injuries fall under employers liability insurance and Social Security work-accident cover. Public liability applies to persons outside the employment relationship — customers, suppliers, visitors and neighbors. A complete small-business program therefore combines public liability with employers liability for the declared workforce.",
      },
      {
        question: "How is a claim reported?",
        answer:
          "Preserve the scene, photograph the condition that caused the damage and notify the agency within five working days. The claim form, the injured party's identity details, witness statements, and any medical or repair invoices are submitted to the adjuster. After liability is confirmed under the Civil Code or Civil Liability Act, compensation is paid subject to the policy deductible.",
      },
    ],
    legalSources: [
      {
        title: "Civil Code of Iran",
        reference: "Articles 328 to 335 — liability of possessors",
      },
      {
        title: "Civil Liability Act of Iran (1960)",
        reference: "Article 1 — compensation of damage caused by fault",
      },
      {
        title: "Iranian Insurance Act (1936)",
        reference: "Article 30 — five-day claim notification",
      },
    ],
    metaTitle: "Public Liability Insurance in Iran (Third-Party)",
    metaDescription:
      "Public liability insurance in Iran (civil third-party cover): customer and visitor injury, property damage, exclusions, claims, and official quotation.",
    keywords: [
      "public liability insurance Iran",
      "third party liability insurance Iran",
      "civil liability insurance Iran",
      "shop liability insurance Iran",
      "business general liability Iran",
      "بیمه مسئولیت مدنی عمومی",
    ],
    reviewDate: REVIEW_DATE,
  },

  // ── 7 ── product-liability ───────────────────────────────────────
  {
    slug: "product-liability",
    category: "commercial",
    title: "Product Liability Insurance in Iran",
    nameEn: "Product Liability Insurance",
    audienceLine:
      "For manufacturers, importers, distributors and consumer-goods brands selling in Iran.",
    answerBlock:
      "Product liability insurance compensates consumers for bodily injury and property damage caused by a defective product manufactured, imported or sold by the insured. In Iran it operates under the Consumer Protection Act and the Civil Liability Act, covering court-awarded damages and defense costs in defect claims, up to the policy limit.",
    whoCovered: [
      "Manufacturers of consumer and industrial goods",
      "Importers placing foreign products on the Iranian market",
      "Distributors, wholesalers and brand representatives",
      "Retailers and online sellers of declared product categories",
      "Assemblers and packagers whose processing can create defects",
    ],
    coverages: [
      {
        title: "Consumer bodily injury",
        description:
          "Diyeh, medical costs and court-awarded damages for injuries caused by a defect in the insured product.",
      },
      {
        title: "Consumer property damage",
        description:
          "Damage to consumers' property caused by the defective product — for example an appliance fire damaging the buyer's home.",
      },
      {
        title: "Defense costs",
        description:
          "Attorney fees, laboratory expenses and procedural costs in claims brought under the Consumer Protection Act and civil liability rules.",
      },
      {
        title: "Chain-of-supply liability",
        description:
          "Response to claims reaching the insured as manufacturer, importer or seller, with recovery referral to the responsible party.",
      },
      {
        title: "Product tampering extension (optional)",
        description:
          "Under agreed endorsements, losses from malicious product tampering can be scheduled, subject to the insurer's terms.",
      },
      {
        title: "Aggregate limits per product line",
        description:
          "Structure of limits per event and in the aggregate for a product line, as declared in the policy schedule.",
      },
    ],
    exclusions: [
      "The insured's own financial loss from recalling or replacing the product without third-party damage",
      "Claims arising after the product's declared shelf life or warranty period",
      "Damage caused by misuse contradicting the written instructions",
      "Products not declared in the policy schedule or produced under an unlicensed line",
      "Deliberate non-compliance with mandatory standards of the Standards Organization",
    ],
    conditions: [
      "Declaration of product categories, brands and distribution channels at issuance",
      "Compliance with mandatory national standards for the declared products",
      "Traceability of production batches for claims handling",
    ],
    documents: [
      "Business license and production or import permits",
      "Product list with categories and standard certification",
      "Annual sales data and distribution channels",
      "Previous liability policy, for renewal and no-claims discount",
    ],
    buySteps: [
      {
        title: "Quotation and consultation",
        description:
          "Submit the quote request with the product portfolio; the advisor proposes per-event and aggregate limit structures.",
      },
      {
        title: "Documents and official proforma",
        description:
          "After the product list and sales data are reviewed, an official proforma invoice is issued on Bimeh Iran tariffs.",
      },
      {
        title: "Premium payment",
        description:
          "Pay through the banking gateway or a bank receipt; cover starts the moment issuance is confirmed.",
      },
      {
        title: "Policy delivery",
        description:
          "The printed and electronic policy, with the product schedule, is delivered within one working day.",
      },
    ],
    claimSteps: [
      {
        title: "Immediate notification",
        description:
          "Notify the agency within five working days of a consumer claim or of becoming aware of a suspected defect.",
      },
      {
        title: "Claim form and evidence",
        description:
          "Submit the claim form, the defective product or samples, purchase evidence and the consumer's medical or repair documents.",
      },
      {
        title: "Technical examination",
        description:
          "Laboratory or standards-organization reports establish whether the damage is connected to a product defect.",
      },
      {
        title: "Liability assessment",
        description:
          "The adjuster determines the insured's role in the supply chain and the legal basis of liability under the Consumer Protection Act.",
      },
      {
        title: "Settlement and payment",
        description:
          "Compensation is agreed with the consumer or fixed by ruling and paid subject to the policy deductible.",
      },
      {
        title: "Batch review",
        description:
          "If the defect is systemic, remaining batches are reviewed and future production corrective measures are documented.",
      },
    ],
    faqs: [
      {
        question: "What does product liability insurance cover in Iran?",
        answer:
          "It covers bodily injury and property damage caused to consumers by a defective product that the insured manufactures, imports, distributes or sells — for example a food product causing illness or an appliance causing a fire. Compensation includes court-awarded damages, and defense costs in claims brought under the Consumer Protection Act, up to the policy limit.",
      },
      {
        question: "Who can be held liable for a defective product in Iran?",
        answer:
          "Under the Consumer Protection Act, liability can reach the manufacturer, the importer, the assembler and, in defined cases, the distributor or seller. A consumer may therefore claim from the party closest to them, and that party may in turn refer to the party responsible for the defect. The policy schedule should declare every role the business performs.",
      },
      {
        question: "Are online sellers covered?",
        answer:
          "Yes, provided the online sale of the insured products is declared at issuance. A web shop faces product liability like any physical retailer, alongside its own exposure for delivery and accurate product description. Because the platform can be pursued together with the supplier, e-commerce businesses usually combine product liability with cyber liability and professional liability for service commitments.",
      },
      {
        question: "What is excluded from product liability cover?",
        answer:
          "Standard exclusions include the business's own financial loss from recalling and replacing the product without third-party damage, losses caused after the product's declared shelf life, damage from misuse that contradicts written instructions, and claims from products the insured did not supply. Intentional non-compliance with mandatory standards also voids cover for the resulting claims.",
      },
      {
        question: "How is the limit of liability determined?",
        answer:
          "The limit should reflect the plausible aggregate of a defect affecting many consumers — the so-called shock-loss scenario — because a single production batch can generate dozens of simultaneous claims. Turnover, product category and distribution breadth drive the recommendation. The final limit is agreed in consultation, and the premium is issued upon official quotation rather than estimated here.",
      },
      {
        question: "What documents are needed for issuance and claims?",
        answer:
          "For issuance: business licence, product list with categories and standards compliance, distribution channels and annual sales data. For a claim: the claim form, the defective product or samples, purchase evidence, the consumer's medical or repair documents, and laboratory or standards-organization reports where available. These documents let the adjuster connect the defect, the damage and the insured product.",
      },
    ],
    legalSources: [
      {
        title: "Consumer Protection Act of Iran",
        reference: "Adopted 2009 — producer liability for defects",
      },
      {
        title: "Civil Liability Act of Iran (1960)",
        reference: "Article 1 — compensation of damage caused by fault",
      },
      {
        title: "Iranian Insurance Act (1936)",
        reference: "Article 30 — five-day claim notification",
      },
    ],
    metaTitle: "Product Liability Insurance in Iran",
    metaDescription:
      "Product liability insurance in Iran under the Consumer Protection Act: defective-product injuries, defense costs, exclusions, claims, and official quotation.",
    keywords: [
      "product liability insurance Iran",
      "manufacturer liability insurance Iran",
      "consumer protection act Iran insurance",
      "defective product compensation Iran",
      "importer liability insurance Iran",
      "بیمه مسئولیت محصول",
    ],
    reviewDate: REVIEW_DATE,
  },

  // ── 8 ── elevators ───────────────────────────────────────────────
  {
    slug: "elevators",
    category: "commercial",
    title: "Elevator Liability Insurance in Iran",
    nameEn: "Elevator Liability Insurance",
    audienceLine:
      "For building managers, elevator maintenance companies and installers of elevators and lifting platforms.",
    answerBlock:
      "Elevator and escalator liability insurance compensates passengers and third parties for bodily injury and property damage caused by the operation, maintenance or inspection failure of elevators and lifting equipment. It allocates cover among the building manager, the maintenance company and the installer according to their proven share of responsibility.",
    whoCovered: [
      "Building managers and residential complexes as possessors of the facility",
      "Elevator and escalator maintenance companies",
      "Installers of elevators, escalators and lifting platforms",
      "Commercial and public buildings receiving visitors — hotels, hospitals, offices",
      "Homeowners' associations scheduling common-area elevators",
    ],
    coverages: [
      {
        title: "Passenger bodily injury",
        description:
          "Diyeh, medical and rehabilitation costs for passengers injured in elevator or escalator operation failures.",
      },
      {
        title: "Third-party property damage",
        description:
          "Damage to third-party property caused by the equipment — for example freight elevators damaging goods or building parts.",
      },
      {
        title: "Building manager's liability",
        description:
          "Liability of the possessor and supervisor of the facility under the Civil Code's possession rules and technical supervision duties.",
      },
      {
        title: "Maintenance company's liability",
        description:
          "Liability of the maintenance firm for defects in upkeep, lubrication, adjustment and periodic part replacement.",
      },
      {
        title: "Installer's liability",
        description:
          "Liability for installation defects manifesting after commissioning, within the period declared in the policy schedule.",
      },
      {
        title: "Legal defense costs",
        description:
          "Attorney fees and procedural costs in civil proceedings brought by injured passengers or their families.",
      },
    ],
    exclusions: [
      "Operation of devices without a valid periodic inspection certificate",
      "Devices, addresses or periods not declared in the policy schedule",
      "Deliberate bypassing of safety devices or interference with the control system",
      "Mechanical breakdown of the device itself without third-party damage",
      "Normal wear, corrosion and aging without a causal failure event",
    ],
    conditions: [
      "A valid periodic inspection certificate for every declared device",
      "A signed maintenance contract with a qualified maintenance company, where applicable",
      "Declaration of the device list — type, address and capacity — at issuance",
    ],
    documents: [
      "Periodic inspection certificate of the elevators",
      "Maintenance contract or the maintenance company's license",
      "Device list: type, address, capacity and year of installation",
      "Identity documents of the insured manager or company",
    ],
    buySteps: [
      {
        title: "Quotation and consultation",
        description:
          "Submit the quote request with the device list; the advisor proposes the limit per device or aggregated for the building.",
      },
      {
        title: "Documents and official proforma",
        description:
          "After the inspection certificates are verified, an official proforma invoice is issued on Bimeh Iran tariffs.",
      },
      {
        title: "Premium payment",
        description:
          "Pay through the banking gateway or a bank receipt; cover starts the moment issuance is confirmed.",
      },
      {
        title: "Policy delivery",
        description:
          "The printed and electronic policy, with the device schedule, is delivered within one working day.",
      },
    ],
    claimSteps: [
      {
        title: "Take the device out of service",
        description:
          "Stop the elevator or escalator, secure the area and preserve the maintenance log before any repair.",
      },
      {
        title: "Immediate notification",
        description:
          "Notify the agency within five working days of the incident, per the policy's notification condition.",
      },
      {
        title: "Claim form and documents",
        description:
          "Submit the claim form, the periodic inspection certificate, the maintenance visit records and witness statements.",
      },
      {
        title: "Technical assessment",
        description:
          "The adjuster and, where needed, a technical expert determine which party's failure caused the accident — manager, maintenance or installer.",
      },
      {
        title: "Liability apportionment",
        description:
          "Where several parties share responsibility, liability is apportioned according to each party's proven share.",
      },
      {
        title: "Agreement and payment",
        description:
          "Compensation is agreed or court-awarded and paid subject to the policy deductible, per the apportioned shares.",
      },
    ],
    faqs: [
      {
        question: "What does elevator liability insurance cover in Iran?",
        answer:
          "It covers bodily injury to passengers and third parties and property damage caused by the operation of insured elevators, escalators and lifting platforms — entrapment injuries, door accidents or falls caused by mechanical failure. Cover responds to the liability of the parties named in the schedule, typically the building manager and the maintenance company, up to the policy limit.",
      },
      {
        question: "Who is liable when an elevator accident happens?",
        answer:
          "Responsibility is divided: the building manager is liable as the possessor and supervisor of the facility, the maintenance company for defects in upkeep, and the installer for installation defects, each according to its proven share. Iranian courts apportion liability among these parties. The policy structure should mirror this reality; joint scheduling of manager and maintenance company is therefore common.",
      },
      {
        question: "Is elevator insurance mandatory for buildings in Iran?",
        answer:
          "Technical regulations require periodic inspection of elevators, and many municipalities condition building services and permits on a valid inspection certificate and third-party liability cover. Regardless of enforcement, the building manager's liability for a defective elevator is strict under the Civil Code's provisions on possessors, so insured buildings treat the policy as core risk management for a high-severity hazard.",
      },
      {
        question: "Does the maintenance company need its own policy?",
        answer:
          "Yes. The maintenance company's contractual liability to the building and its civil liability to injured passengers are distinct from the manager's cover. A maintenance contract usually obliges the company to hold liability insurance, and maintenance firms cover their whole portfolio under a single annual policy listing every serviced device. The building manager should verify the company's policy first.",
      },
      {
        question: "What limit is adequate for a residential building?",
        answer:
          "A passenger death or severe injury claim is assessed on the diyeh schedule, so the practical floor is one full diyeh of the current year, with higher limits for hospitals, hotels and high-occupancy towers. Buildings with several elevators usually aggregate limits. The recommendation is finalized in consultation with the agency, and the premium is issued upon official quotation.",
      },
      {
        question: "How is an elevator accident claim reported?",
        answer:
          "Keep the elevator out of service, preserve the maintenance log and notify the agency within five working days. The claim form, the periodic inspection certificate, the maintenance visit records and witness statements are submitted to the adjuster. Where injury is severe, medical and forensic reports establish the damage, and payment follows the proven liability shares, subject to the deductible.",
      },
    ],
    legalSources: [
      {
        title: "Civil Code of Iran",
        reference: "Articles 328 to 335 — liability of possessors and supervisors",
      },
      {
        title: "Engineering System Act of Iran",
        reference: "Adopted 1995 — Article 33 (technical supervision)",
      },
      {
        title: "Islamic Penal Code — Diyat chapter",
        reference: "Book Five, Articles 449 onwards",
      },
      {
        title: "Iranian Insurance Act (1936)",
        reference: "Article 30 — five-day claim notification",
      },
    ],
    metaTitle: "Elevator Liability Insurance in Iran",
    metaDescription:
      "Elevator and escalator liability insurance in Iran: passenger injury, maintenance and installer liability, exclusions, claim steps, and official quotation.",
    keywords: [
      "elevator liability insurance Iran",
      "escalator liability insurance Iran",
      "building manager liability Iran",
      "elevator maintenance company insurance",
      "lift accident compensation Iran",
      "بیمه مسئولیت آسانسور",
    ],
    reviewDate: REVIEW_DATE,
  },

  // ── 9 ── dentists (wave 2) ───────────────────────────────────────
  {
    slug: "dentists",
    category: "professional",
    title: "Dentists Professional Liability Insurance in Iran",
    nameEn: "Dentists Professional Liability Insurance",
    audienceLine:
      "For general dentists, prosthodontists, implantologists and orthodontists licensed by the Iranian Medical Council.",
    answerBlock:
      "Dentists professional liability insurance in Iran compensates bodily injury and financial loss a patient suffers from professional error in implantology, prosthodontics, endodontics and anesthesia complications, up to the policy limit, and funds the dentist's legal defense before Iranian courts and the Medical Council forensic commissions where the specialty is declared in the policy.",
    whoCovered: [
      "General dentists holding an active Medical Council practice license",
      "Specialists in prosthodontics, implantology and maxillofacial procedures",
      "Orthodontists and specialists of oral and dental diseases",
      "Dentists practicing in private offices, dental clinics and treatment centers",
      "Dental assistants acting under supervision, within the scope declared in the policy",
    ],
    coverages: [
      {
        title: "Diyeh and patient bodily injury",
        description:
          "Compensation for death or disability caused by professional error in the office or clinic, calculated on the official diyeh schedule issued by the judiciary for the year of the incident.",
      },
      {
        title: "Implant and prosthesis complications",
        description:
          "Reimbursement of repeat treatment and reconstruction after implant or prosthesis failure, conditional on proof of professional fault and scheduling of the specialty in the policy.",
      },
      {
        title: "Anesthesia and drug reactions",
        description:
          "Cover for injury caused by anesthetic injection errors, drug sensitivity and anaphylactic shock, within the general conditions of the policy.",
      },
      {
        title: "Patient financial loss",
        description:
          "Reimbursement of corrective treatment, dental rework and additional services the patient is forced to bear because of an attributable professional error.",
      },
      {
        title: "Legal defense costs",
        description:
          "Attorney fees and court costs in criminal, civil and Medical Council commission proceedings arising from the insured event, including claims ending in dismissal.",
      },
      {
        title: "Liability for auxiliary staff",
        description:
          "The dentist's vicarious liability for acts of assistants and dependent personnel, within the scope recorded in the policy schedule.",
      },
    ],
    exclusions: [
      "Claims arising from procedures outside the specialty recorded on the dentist's Medical Council license",
      "Purely cosmetic services with no therapeutic indication, unless expressly scheduled in the policy",
      "Incidents occurring outside the policy period; the trigger is the incident date",
      "Intentional errors and knowing breach of Medical Council regulations",
      "Damage aggravated by worn or non-standard equipment operated without the required protocols",
      "Diyeh amounts that are the subject of qisas (retribution) or corporal punishment",
    ],
    conditions: [
      "A valid Medical Council practice license on the date of the incident",
      "Accurate declaration of the offered services — implantology, orthodontics and similar — at issuance",
      "No undisclosed claims from previous policy periods",
      "Compliance with hygiene protocols and instrument sterilization standards",
    ],
    documents: [
      "Permanent or temporary Medical Council practice license",
      "National ID and identity documents of the dentist",
      "Previous liability policy, for claims history and no-claims discount",
      "Office permit or cooperation contract with the dental clinic",
      "List of offered services, including implants and prostheses",
    ],
    buySteps: [
      {
        title: "Quotation and limit selection",
        description:
          "Submit the quote request; the advisor proposes a limit of liability and coverages matched to the services you declare.",
      },
      {
        title: "Documents and official proforma",
        description:
          "After identity and professional documents are received, an official proforma invoice is issued on the approved Bimeh Iran tariffs.",
      },
      {
        title: "Premium payment",
        description:
          "Pay through the banking gateway or a bank receipt; cover starts the moment issuance is confirmed.",
      },
      {
        title: "Policy delivery",
        description:
          "The printed and electronic policy with its general conditions is delivered within one working day.",
      },
    ],
    claimSteps: [
      {
        title: "Immediate notification",
        description:
          "Report the incident to the agency as soon as you become aware of it; the policy sets a maximum notification period of five working days.",
      },
      {
        title: "Claim form",
        description:
          "Complete and sign the claim form describing the events, the incident date and any related history.",
      },
      {
        title: "Case documents",
        description:
          "Submit the professional file, the patient's dental records and the identity documents of the parties to the claims adjuster.",
      },
      {
        title: "Expert review and medical commission",
        description:
          "The Medical Council forensic commission or the Forensic Medicine Organization establishes fault and the degree of responsibility.",
      },
      {
        title: "Agreement or judgment",
        description:
          "Once responsibility is established, the compensation is calculated by agreement of the parties or by court judgment.",
      },
      {
        title: "Payment with deductible",
        description:
          "The recoverable loss is paid to the beneficiary after deduction of the policy deductible.",
      },
    ],
    faqs: [
      {
        question: "Does dentists liability insurance cover implant complications?",
        answer:
          "When the implantology specialty is declared in the policy, losses from implant failure, infection and repeat treatment are recoverable upon proof of professional fault. Complications arising outside accepted clinical protocols or with non-standard equipment may fall under the general-conditions exclusions, which is why the offered services must be declared accurately at issuance.",
      },
      {
        question: "What does dentists liability insurance cost in Iran?",
        answer:
          "The premium is calculated from the declared specialty, the selected limit of liability and the claims history. Adding implantology or surgical services raises the rate because the severity of potential claims is higher. This site publishes no premium figures: request a quotation through the quote form and the official proforma is issued on Bimeh Iran tariffs.",
      },
      {
        question: "What happens if a patient complains about anesthesia complications?",
        answer:
          "The complaint is first examined by the Medical Council forensic commission, whose opinion is the basis for establishing fault. If an attributable error is proven, diyeh or financial loss is compensated up to the policy limit. The dentist's legal defense costs for the same proceeding are also covered as provided in the policy schedule.",
      },
      {
        question: "Does a dental clinic need its own policy separate from the dentist's?",
        answer:
          "Yes. The dentist's liability and the clinic's liability are independent obligations. The dentist's policy covers only the dentist's own acts and supervised assistants, while damage from clinic equipment, fire or management errors belongs to the facility's own liability cover. A dentist working in several centers should declare every workplace in the schedule to avoid gaps.",
      },
      {
        question: "What if a patient files a claim after the policy has expired?",
        answer:
          "If the incident that caused the damage occurred during the policy period, the claim remains covered even when it is filed after expiry, because the trigger is the date of the incident rather than the date of the complaint. Uninterrupted annual renewal is therefore recommended so that no active treatment period is left uncovered.",
      },
      {
        question: "Which losses are not covered by dentists liability insurance?",
        answer:
          "Losses from procedures outside the recorded specialty, purely cosmetic services without express scheduling, intentional errors and knowing breaches of regulations are excluded. Incidents occurring outside the policy period and damage caused by disregarding sterilization protocols are also not covered, as stated in the general conditions and the exclusions section of the policy.",
      },
    ],
    legalSources: [
      {
        title: "Civil Liability Act of Iran (1960)",
        reference: "Articles 1 to 11 — fault-based civil liability",
      },
      {
        title: "Islamic Penal Code — Diyat chapter",
        reference: "Book Five, Articles 449 to 503",
      },
      {
        title: "General Conditions of Professional Liability Insurance (Bimeh Iran)",
        reference: "Central Insurance Regulation No. 57",
      },
      {
        title: "Medical Council Disciplinary Regulations of Iran",
        reference: "Disciplinary boards and forensic commissions of the Iranian Medical Council",
      },
    ],
    metaTitle: "Dentists Professional Liability Insurance in Iran",
    metaDescription:
      "Dentists professional liability insurance in Iran: implant and prosthesis complications, anesthesia injuries, diyeh, legal defense costs and official quotation.",
    keywords: [
      "dental malpractice insurance Iran",
      "dentist liability insurance Iran",
      "dentists professional indemnity Iran",
      "dental clinic liability cover Iran",
      "dental implant complication claim Iran",
      "بیمه مسئولیت دندانپزشکان",
      "بیمه خطای دندانپزشکی",
    ],
    reviewDate: REVIEW_DATE,
  },

  // ── 10 ── pharmacists (wave 2) ───────────────────────────────────
  {
    slug: "pharmacists",
    category: "professional",
    title: "Pharmacists Professional Liability Insurance in Iran",
    nameEn: "Pharmacists Professional Liability Insurance",
    audienceLine:
      "For licensed pharmacists, pharmacy owners acting as pharmacist-in-charge and parapharmaceutical technical experts.",
    answerBlock:
      "Pharmacists professional liability insurance in Iran compensates bodily injury and financial loss caused to customers by dispensing errors — wrong drug, dose or dosage form — expired medication and unflagged drug interactions, up to the policy limit. Liability for pharmacy technicians and staff can be covered where expressly scheduled in the policy.",
    whoCovered: [
      "Licensed pharmacists registered with the Medical Council",
      "Pharmacy owners acting as the pharmacist-in-charge of a licensed pharmacy",
      "Doctor of Pharmacy graduates working in round-the-clock pharmacies",
      "Responsible technical experts of parapharmaceutical centers — cosmetics, supplements, medical devices",
      "Pharmacy technicians and staff, within the liability scope scheduled in the policy",
      "Pharmacists in drug distribution companies, under special agreement",
    ],
    coverages: [
      {
        title: "Bodily injury and diyeh",
        description:
          "Compensation for death or injury caused by a wrong or expired medicine, calculated on the official diyeh schedule of the incident year.",
      },
      {
        title: "Dispensing and dose errors",
        description:
          "Cover for damage caused by mistakes in the name, dosage form, dose or quantity of the dispensed medicine, conditional on proof of fault.",
      },
      {
        title: "Drug interactions",
        description:
          "Compensation for damage caused by failure to flag a significant drug interaction at dispensing, within the general conditions.",
      },
      {
        title: "Customer financial loss",
        description:
          "Reimbursement of follow-up treatment, hospitalization and medication costs caused by an error in the dispensing or counseling process.",
      },
      {
        title: "Legal defense costs",
        description:
          "Attorney fees and procedural costs in judicial and regulatory proceedings arising from the insured event.",
      },
      {
        title: "Liability for pharmacy staff",
        description:
          "The pharmacist's vicarious liability for acts of technicians and dependent staff, within the scope scheduled in the policy.",
      },
    ],
    exclusions: [
      "Dispensing prescription-only drugs without a physician's prescription or knowing breach of regulations",
      "Harm arising from the manufacturing quality of a medicine, which belongs to the producer's liability",
      "Incidents occurring outside the policy period; the trigger is the incident date",
      "Intentional errors, sale of unauthorized products and smuggled medicines",
      "Damage caused by the customer's own breach of storage instructions, where proven",
      "Diyeh amounts that are the subject of qisas (retribution) or corporal punishment",
    ],
    conditions: [
      "A valid pharmacy license and Medical Council permit on the date of the incident",
      "Declaration of the pharmacy's operating status — regular or round-the-clock — at issuance",
      "Compliance with drug storage and sale regulations and retention of registered prescriptions",
      "No undisclosed claims from previous policy periods",
    ],
    documents: [
      "Pharmacy license and the pharmacist's Medical Council permit",
      "National ID and identity documents",
      "Previous liability policy, for claims history and no-claims discount",
      "Identity documents of staff, where staff cover is scheduled",
      "The pharmacy's operating hours status — regular or round-the-clock",
    ],
    buySteps: [
      {
        title: "Quotation and status declaration",
        description:
          "Submit the quote request; the pharmacy's status and permitted services are reflected in the proforma.",
      },
      {
        title: "Documents and official proforma",
        description:
          "After identity and professional documents are received, an official proforma invoice is issued on the approved Bimeh Iran tariffs.",
      },
      {
        title: "Premium payment",
        description:
          "Pay through the banking gateway or a bank receipt; cover starts the moment issuance is confirmed.",
      },
      {
        title: "Policy delivery",
        description:
          "The printed and electronic policy with its general conditions is delivered within one working day.",
      },
    ],
    claimSteps: [
      {
        title: "Immediate notification",
        description:
          "Report the incident to the agency as soon as you become aware of it; the policy sets a maximum notification period of five working days.",
      },
      {
        title: "Claim form",
        description:
          "Complete and sign the claim form describing the events, the incident date and the related dispensing record.",
      },
      {
        title: "Case documents",
        description:
          "Submit the prescription, the dispensing record, the relevant batch documentation and the parties' identity documents to the adjuster.",
      },
      {
        title: "Expert review",
        description:
          "The claims adjuster establishes the insured's degree of responsibility by examining the records and the required expert opinions.",
      },
      {
        title: "Agreement or judgment",
        description:
          "Once responsibility is established, the compensation is calculated by agreement of the parties or by court judgment.",
      },
      {
        title: "Payment with deductible",
        description:
          "The recoverable loss is paid to the beneficiary after deduction of the policy deductible.",
      },
    ],
    faqs: [
      {
        question: "Does pharmacy liability insurance cover dispensing errors?",
        answer:
          "Yes. Bodily and financial damage caused by a mistake in the name, dose or dosage form of a dispensed medicine is recoverable upon proof of the pharmacist's fault, provided the matter is scheduled in the policy. Liability of technicians and pharmacy staff is covered only where expressly declared in the policy schedule.",
      },
      {
        question: "How much does pharmacists liability insurance cost in Iran?",
        answer:
          "The premium depends on the pharmacy's operating status, the selected limit of liability and the claims history. Round-the-clock pharmacies and policies adding staff cover are rated higher because the exposure is larger. No premium figures are published on this site: the official proforma is issued after the quote request is completed.",
      },
      {
        question: "Is dispensing expired medication covered?",
        answer:
          "Yes. Damage caused by dispensing an expired medicine is covered where fault in the storage or dispensing process is proven. In contrast, harm arising from the manufacturing quality of the medicine relates to the producer's product liability and, under the general-conditions exclusions, is not covered by the pharmacy's liability policy.",
      },
      {
        question: "What if a customer suffers a drug sensitivity reaction?",
        answer:
          "Cover depends on whether the reaction stemmed from a foreseeable interaction or sensitivity that should have been flagged, or from an unpredictable drug reaction. In the first case the loss is recoverable up to the policy limit once the pharmacist's fault is proven. The final assessment is made by the adjuster with specialist input under the general conditions.",
      },
      {
        question: "Is over-the-counter sale of prescription drugs covered?",
        answer:
          "No. Dispensing prescription-only medicines without a physician's prescription breaches the regulations of the Food and Drug Organization and is excluded by the policy. Retaining and presenting the registered prescriptions during claim handling is a condition of establishing cover, and repeated violations can provide grounds for rejecting the file entirely.",
      },
      {
        question: "What limit of liability is adequate for a pharmacy?",
        answer:
          "The limit should be at least equal to one full diyeh of the current year, so that in a bodily-injury file the shortfall does not remain with the pharmacist personally. High-traffic and round-the-clock pharmacies usually select higher limits. The final choice is made in the pre-issuance consultation based on daily prescription volume and the pharmacy's service class.",
      },
    ],
    legalSources: [
      {
        title: "Civil Liability Act of Iran (1960)",
        reference: "Articles 1 to 11 — fault-based civil liability",
      },
      {
        title: "Islamic Penal Code — Diyat chapter",
        reference: "Book Five, Articles 449 to 503",
      },
      {
        title: "General Conditions of Professional Liability Insurance (Bimeh Iran)",
        reference: "Central Insurance Regulation No. 57",
      },
      {
        title: "Iranian Insurance Act (1936)",
        reference: "Articles 12 and 30 — insurable interest and five-day claim notification",
      },
    ],
    metaTitle: "Pharmacists Professional Liability Insurance in Iran",
    metaDescription:
      "Pharmacists liability insurance in Iran: dispensing errors, expired medication, drug interactions, legal defense costs, exclusions and official quotation.",
    keywords: [
      "pharmacy liability insurance Iran",
      "pharmacist professional liability Iran",
      "pharmacy dispensing error insurance",
      "drug error compensation Iran",
      "بیمه مسئولیت داروسازان",
      "بیمه مسئولیت داروخانه",
      "pharmacy indemnity Iran",
    ],
    reviewDate: REVIEW_DATE,
  },

  // ── 11 ── accountants-auditors (wave 2) ──────────────────────────
  {
    slug: "accountants-auditors",
    category: "professional",
    title: "Accountants and Auditors Liability Insurance in Iran",
    nameEn: "Accountants and Auditors Liability Insurance",
    audienceLine:
      "For certified accountants, independent auditors, tax accountants and audit firms operating in Iran.",
    answerBlock:
      "Accountants and auditors professional liability insurance in Iran compensates financial loss caused to clients and third parties by defective tax returns, misleading audit reports and accounting calculation errors, up to the policy limit. Defense costs in proceedings before the Iranian Society of Certified Accountants and the courts are covered where scheduled.",
    whoCovered: [
      "Certified accountants who are members of the Iranian Society of Certified Accountants",
      "Independent auditors and members of accredited audit firms",
      "Audit firms and financial services companies, covering their members",
      "Tax accountants licensed by the Iranian Tax Administration",
      "Chief financial officers and tax advisors, within the declared scope of services",
      "Certified accountants acting as statutory inspectors and legal auditors of companies",
    ],
    coverages: [
      {
        title: "Defective tax returns",
        description:
          "Compensation for financial loss and attributable penalties arising from an incorrectly prepared tax return, where the accountant's fault is proven.",
      },
      {
        title: "Misleading audit report",
        description:
          "Cover for losses of third parties and investors who relied on a defective audit report, under the general conditions.",
      },
      {
        title: "Recording and calculation errors",
        description:
          "Compensation for damage caused by mistakes in statutory ledgers, depreciation calculations and preparation of financial statements.",
      },
      {
        title: "Client tax loss",
        description:
          "Reimbursement of tax penalties attributable to the accountant's performance, within the scope scheduled in the policy.",
      },
      {
        title: "Legal defense costs",
        description:
          "Attorney fees and procedural costs in client claims and disciplinary proceedings of the Society of Certified Accountants.",
      },
      {
        title: "Firm staff liability",
        description:
          "The firm's vicarious liability for acts of auditors and dependent staff, within the scheduled scope.",
      },
    ],
    exclusions: [
      "Loss arising from knowing collusion, deliberate manipulation of documents or participation in tax evasion",
      "Disciplinary fines payable to the Society of Certified Accountants",
      "Incidents occurring outside the policy period; the trigger is the incident date",
      "Loss caused by incorrect documents and information supplied by the client itself",
      "Internal disputes among the firm's partners and staff",
      "Tax penalties with no direct causal link to the accountant's performance",
    ],
    conditions: [
      "A valid Society of Certified Accountants membership or relevant license on the incident date",
      "Accurate declaration of the service scope — audit, tax, financial management — at issuance",
      "Retention of working papers and records to evidence compliance with professional standards",
      "No undisclosed claims from previous policy periods",
    ],
    documents: [
      "Membership certificate of the Society of Certified Accountants or the relevant tax license",
      "National ID and identity documents",
      "Previous liability policy, for claims history and no-claims discount",
      "Registration documents of the audit firm, where the policy is issued for the firm",
      "Description of services provided to clients, where required",
    ],
    buySteps: [
      {
        title: "Quotation and service scope",
        description:
          "Submit the quote request; the service scope and a matching limit of liability are proposed.",
      },
      {
        title: "Documents and official proforma",
        description:
          "After identity and professional documents are received, an official proforma invoice is issued on the approved Bimeh Iran tariffs.",
      },
      {
        title: "Premium payment",
        description:
          "Pay through the banking gateway or a bank receipt; cover starts the moment issuance is confirmed.",
      },
      {
        title: "Policy delivery",
        description:
          "The printed and electronic policy with its general conditions is delivered within one working day.",
      },
    ],
    claimSteps: [
      {
        title: "Immediate notification",
        description:
          "Report the incident to the agency as soon as a client or third party alleges professional error; the policy sets a maximum notification period of five working days.",
      },
      {
        title: "Claim form",
        description:
          "Complete and sign the claim form describing the events, the incident date and the engagement concerned.",
      },
      {
        title: "Case documents",
        description:
          "Submit the working papers, the defective report or return, and the parties' identity documents to the adjuster.",
      },
      {
        title: "Specialist review",
        description:
          "The adjuster assesses fault and the amount of loss by examining the professional records.",
      },
      {
        title: "Agreement or judgment",
        description:
          "Once responsibility is established, the compensation is calculated by agreement of the parties or by court judgment.",
      },
      {
        title: "Payment with deductible",
        description:
          "The recoverable loss is paid to the beneficiary after deduction of the policy deductible.",
      },
    ],
    faqs: [
      {
        question: "Does the policy compensate tax penalties caused by an accountant?",
        answer:
          "Penalties and tax losses directly attributable to the accountant's fault in preparing a return or recording documents are recoverable up to the policy limit once fault is proven. Penalties without a direct link to the accountant's performance, or caused by the client's own incorrect information, fall under the general-conditions exclusions.",
      },
      {
        question: "How much does accountants liability insurance cost in Iran?",
        answer:
          "The premium is set by the declared service scope, the number of clients, the selected limit of liability and the claims history. Solo practitioners with tax and audit services and full audit firms with higher limits each receive a specific rate. The official proforma is issued after the quote request is completed on Bimeh Iran tariffs.",
      },
      {
        question: "What if a third party relied on a defective audit report?",
        answer:
          "Investors, banks and other third parties that relied on an audit report and suffered loss can bring a claim. Where the auditor's failure to observe auditing standards is proven, the loss is compensated up to the policy limit. Retained working papers and review records are the decisive evidence in the auditor's defense.",
      },
      {
        question: "Is collusion with a client to evade tax covered?",
        answer:
          "No. Knowing participation in tax evasion, deliberate manipulation of documents and collusion with the client are express exclusions; besides rejecting the claim they carry disciplinary and criminal consequences. Insurance covers only losses arising from unintentional error within professional standards, subject to proof of the causal link and of fault.",
      },
      {
        question: "How is an audit firm insured?",
        answer:
          "An audit firm can take the policy in its own legal name and schedule its responsible members. The firm's limit is usually sized to the volume of audited engagements. Correct scheduling of members and timely endorsement of staff changes are conditions for the full validity of the cover in claim files.",
      },
      {
        question: "What if a client claims after the engagement is closed?",
        answer:
          "If the error that caused the loss occurred during the policy period while the services were performed, the claim is examined even when it is raised after the file is delivered or the policy expires; the trigger is the incident date, not the claim date. Continuous renewal of the policy is therefore recommended for practitioners and firms.",
      },
    ],
    legalSources: [
      {
        title: "Civil Liability Act of Iran (1960)",
        reference: "Articles 1 to 11 — fault-based civil liability",
      },
      {
        title: "Iranian Insurance Act (1936)",
        reference: "Articles 12 and 30 — insurable interest and five-day claim notification",
      },
      {
        title: "General Conditions of Professional Liability Insurance (Bimeh Iran)",
        reference: "Central Insurance Regulation No. 57",
      },
    ],
    metaTitle: "Accountants and Auditors Liability Insurance in Iran",
    metaDescription:
      "Accountants and auditors liability insurance in Iran: defective tax returns, audit report errors, defense costs, exclusions and official quotation.",
    keywords: [
      "accountants professional liability Iran",
      "auditors liability insurance Iran",
      "audit firm liability cover",
      "tax accountant indemnity Iran",
      "accounting error compensation Iran",
      "بیمه مسئولیت حسابداران رسمی",
      "بیمه مسئولیت حسابرسان",
    ],
    reviewDate: REVIEW_DATE,
  },

  // ── 12 ── real-estate-agents (wave 2) ────────────────────────────
  {
    slug: "real-estate-agents",
    category: "professional",
    title: "Real Estate Agents Liability Insurance in Iran",
    nameEn: "Real Estate Agents Liability Insurance",
    audienceLine:
      "For licensed real estate agents, estate offices, online brokers and property transaction consultants.",
    answerBlock:
      "Real estate agents liability insurance in Iran compensates financial loss suffered by buyers and sellers from incomplete title review, defective ownership disclosure, failure to report an attachment or lien on the property, and errors in the listed particulars, up to the policy limit. Legal defense costs are covered where scheduled in the policy.",
    whoCovered: [
      "Real estate agents holding a valid trade license of the real estate union",
      "Real estate offices and their staff, within the scheduled scope",
      "Licensed online real estate platforms",
      "Property transaction consultants and estate managers",
      "Residential development and sales companies, under special agreement",
    ],
    coverages: [
      {
        title: "Incomplete title review",
        description:
          "Compensation for loss caused by failure to examine the deed correctly, identify a conflicting transaction or detect a registered lien, where the agent's fault is proven.",
      },
      {
        title: "Defective ownership disclosure",
        description:
          "Cover for loss from introducing a property with disputed or unstable ownership without expressly informing the parties.",
      },
      {
        title: "Failure to disclose third-party rights",
        description:
          "Compensation for loss caused by not reporting an attachment, seizure, mortgage or registered right of use on the property.",
      },
      {
        title: "Errors in property particulars",
        description:
          "Cover for damage caused by mistakes in area, position and key particulars in the listing and the benefit-sharing contract.",
      },
      {
        title: "Legal defense costs",
        description:
          "Attorney fees and procedural costs in claims by buyers, sellers and the real estate union's regulatory bodies.",
      },
      {
        title: "Office staff liability",
        description:
          "The agent's vicarious liability for acts of office employees, within the scope scheduled in the policy.",
      },
    ],
    exclusions: [
      "Loss arising from deliberate collusion with one of the parties to the transaction",
      "Technical building defects — structure and installations — which belong to technical inspection, unless expressly scheduled",
      "Incidents occurring outside the policy period; the trigger is the incident date",
      "Activity without a valid trade license on the transaction date",
      "Disciplinary fines and refundable commissions",
      "Loss on properties without a registered deed where both parties knowingly consented",
    ],
    conditions: [
      "A valid trade license of the real estate union on the date of the error",
      "Registration of deed reviews and transaction correspondence to evidence due diligence",
      "Declaration of the office status and staff count at issuance",
      "No undisclosed claims from previous policy periods",
    ],
    documents: [
      "Trade license of the real estate union",
      "National ID and identity documents",
      "Previous liability policy, for claims history and no-claims discount",
      "Business license of the real estate office",
      "Identity documents of staff, where staff cover is scheduled",
    ],
    buySteps: [
      {
        title: "Quotation and office status",
        description:
          "Submit the quote request; the office's activity type and a matching limit of liability are reflected in the proforma.",
      },
      {
        title: "Documents and official proforma",
        description:
          "After identity and professional documents are received, an official proforma invoice is issued on the approved Bimeh Iran tariffs.",
      },
      {
        title: "Premium payment",
        description:
          "Pay through the banking gateway or a bank receipt; cover starts the moment issuance is confirmed.",
      },
      {
        title: "Policy delivery",
        description:
          "The printed and electronic policy with its general conditions is delivered within one working day.",
      },
    ],
    claimSteps: [
      {
        title: "Immediate notification",
        description:
          "Report the incident to the agency as soon as a party alleges an error; the policy sets a maximum notification period of five working days.",
      },
      {
        title: "Claim form",
        description:
          "Complete and sign the claim form describing the transaction, the alleged error and the related correspondence.",
      },
      {
        title: "Case documents",
        description:
          "Submit the deed review records, the transaction file and the parties' identity documents to the adjuster.",
      },
      {
        title: "Loss assessment",
        description:
          "The adjuster determines the degree of responsibility by examining the records and the registry inquiries.",
      },
      {
        title: "Agreement or judgment",
        description:
          "Once responsibility is established, the compensation is calculated by agreement of the parties or by court judgment.",
      },
      {
        title: "Payment with deductible",
        description:
          "The recoverable loss is paid to the beneficiary after deduction of the policy deductible.",
      },
    ],
    faqs: [
      {
        question: "What losses does real estate agents liability insurance cover?",
        answer:
          "Financial losses from incomplete title review, defective ownership disclosure, failure to report an attachment or mortgage, and errors in the property particulars are recoverable up to the policy limit once the agent's fault is proven. Technical building defects such as structural problems are, unless expressly scheduled, outside the scope of this policy.",
      },
      {
        question: "How much does a real estate office's liability insurance cost?",
        answer:
          "The premium is calculated from the office's status, the number of staff, the transaction volume, the selected limit of liability and the claims history. Adding staff cover raises the rate. This site publishes no premium figures: the official proforma is issued by the agency after the quote request is completed.",
      },
      {
        question: "What happens if the property turns out to be subject to a conflicting transaction?",
        answer:
          "If the agent, by properly examining the deed, could have identified the conflicting transaction and informed the parties, and loss results from this negligence, the loss is recoverable up to the policy limit once fault is proven. The deed review records and the registry inquiry are the agent's most important defense documents.",
      },
      {
        question: "Is the agent's commission refundable under the policy?",
        answer:
          "No. Refundable fees and commissions are excluded from compensation under the general conditions. This policy covers only bodily and financial loss attributable to the agent's fault. Refund of commission is usually a matter of agreement between the transaction parties or a court order outside the insurance policy altogether.",
      },
      {
        question: "Can an agent without a trade license be insured?",
        answer:
          "Professional liability policies are issued on the basis of a valid trade license, and unlicensed activity on the date of the error invalidates the cover. New entrants are advised to obtain the license from the real estate union first and then issue the policy, so that claim files rest on defensible documentary grounds.",
      },
      {
        question: "Are attorney fees paid when a buyer sues the agent?",
        answer:
          "Yes. Attorney fees and procedural costs in claims brought by a buyer or seller are payable where legal defense cover is scheduled in the policy. The cover applies even to proceedings ending in dismissal, because defense costs accrue from the moment the action is filed; the sub-limit is set in the policy schedule.",
      },
    ],
    legalSources: [
      {
        title: "Civil Liability Act of Iran (1960)",
        reference: "Articles 1 to 11 — fault-based civil liability",
      },
      {
        title: "Iranian Insurance Act (1936)",
        reference: "Articles 12 and 30 — insurable interest and five-day claim notification",
      },
      {
        title: "General Conditions of Professional Liability Insurance (Bimeh Iran)",
        reference: "Central Insurance Regulation No. 57",
      },
    ],
    metaTitle: "Real Estate Agents Liability Insurance in Iran",
    metaDescription:
      "Real estate agents liability insurance in Iran: title review errors, defective ownership disclosure, defense costs, exclusions and official quotation.",
    keywords: [
      "real estate agent liability Iran",
      "property broker liability insurance Iran",
      "real estate office insurance Iran",
      "conflicting transaction liability Iran",
      "بیمه مسئولیت مشاوران املاک",
      "بیمه مسئولیت دفتر املاک",
      "real estate indemnity Iran",
    ],
    reviewDate: REVIEW_DATE,
  },

  // ── 13 ── beauty-salons (wave 2) ─────────────────────────────────
  {
    slug: "beauty-salons",
    category: "professional",
    title: "Beauty Salon Liability Insurance in Iran",
    nameEn: "Beauty Salons Liability Insurance",
    audienceLine:
      "For hairdressers, beauty salons, skin and hair service specialists and licensed laser service centers.",
    answerBlock:
      "Beauty salon liability insurance in Iran compensates bodily and financial injury to clients from accidents during services, skin sensitivity reactions and instrument contamination, up to the policy limit. Injection and laser services usually require express scheduling and the relevant permit in the policy; without that scheduling they are not covered at all.",
    whoCovered: [
      "Women's and men's hairdressers holding a valid trade license",
      "Beauty and barber salons with scheduled staff cover",
      "Licensed skin, hair and nail service specialists",
      "Epilation and laser service centers holding the relevant permit, with express scheduling",
      "Bridal and makeup salons, for the scheduled related services",
      "Wedding and mobile hairdressing services, declared at issuance",
    ],
    coverages: [
      {
        title: "Injury during services",
        description:
          "Compensation for bodily and financial damage from burns, cuts and other injuries during beauty services, where fault is proven.",
      },
      {
        title: "Skin sensitivity and allergy",
        description:
          "Cover for skin reactions to cosmetics and dyes, conditional on performing a patch test and observing the protocol as scheduled.",
      },
      {
        title: "Instrument contamination and infection",
        description:
          "Compensation for infection transmitted through failure to observe sterilization standards, where fault is proven.",
      },
      {
        title: "Damage to clients' property",
        description:
          "Cover for financial damage to clients' belongings, such as clothing and personal items, during the service.",
      },
      {
        title: "Legal defense costs",
        description:
          "Attorney fees and procedural costs in client claims and proceedings of the union and regulatory bodies.",
      },
      {
        title: "Salon staff liability",
        description:
          "The owner's vicarious liability for acts of dependent staff, within the scope of services scheduled in the policy.",
      },
    ],
    exclusions: [
      "Injection, botox and laser services without the permit and express scheduling in the policy",
      "Damage caused by expired or unauthorized materials",
      "Incidents occurring outside the policy period; the trigger is the incident date",
      "Loss where no patch test was performed for sensitizing materials, per the general conditions",
      "Activity without a valid trade license on the incident date",
      "Diyeh amounts subject to qisas and loss caused by intentional error",
    ],
    conditions: [
      "A valid trade license on the date of the incident",
      "Compliance with hygiene and instrument sterilization standards, with records kept",
      "Accurate declaration of the service types — including laser and epilation — at issuance",
      "No undisclosed claims from previous policy periods",
    ],
    documents: [
      "Trade license of the hairdressers' union",
      "National ID and identity documents",
      "Previous liability policy, for claims history and no-claims discount",
      "Permits for specialized services — laser, injection — where offered",
      "Identity documents of staff, where staff cover is scheduled",
    ],
    buySteps: [
      {
        title: "Quotation and service declaration",
        description:
          "Submit the quote request; the list of offered services is the basis of the proforma.",
      },
      {
        title: "Documents and official proforma",
        description:
          "After identity and professional documents are received, an official proforma invoice is issued on the approved Bimeh Iran tariffs.",
      },
      {
        title: "Premium payment",
        description:
          "Pay through the banking gateway or a bank receipt; cover starts the moment issuance is confirmed.",
      },
      {
        title: "Policy delivery",
        description:
          "The printed and electronic policy with its general conditions is delivered within one working day.",
      },
    ],
    claimSteps: [
      {
        title: "Immediate notification",
        description:
          "Report the incident to the agency as soon as you become aware of it; the policy sets a maximum notification period of five working days.",
      },
      {
        title: "Claim form",
        description:
          "Complete and sign the claim form describing the service, the incident date and the events.",
      },
      {
        title: "Case documents",
        description:
          "Submit the client's medical records, the sterilization and patch-test records and the parties' identity documents to the adjuster.",
      },
      {
        title: "Loss assessment",
        description:
          "The adjuster determines the degree of responsibility by examining the records and the required inquiries.",
      },
      {
        title: "Agreement or judgment",
        description:
          "Once responsibility is established, the compensation is calculated by agreement of the parties or by court judgment.",
      },
      {
        title: "Payment with deductible",
        description:
          "The recoverable loss is paid to the beneficiary after deduction of the policy deductible.",
      },
    ],
    faqs: [
      {
        question: "Does beauty salon liability insurance cover skin sensitivity reactions?",
        answer:
          "Where a patch test is performed before using sensitizing materials and the result is recorded, damage from a skin reaction is recoverable once fault is proven. If the salon applied a sensitizing material without a patch test and contrary to protocol, the loss may fall outside the cover under the general-conditions exclusions.",
      },
      {
        question: "How much does beauty salon liability insurance cost in Iran?",
        answer:
          "The premium is calculated from the type of services, the number of staff, the selected limit of liability and the claims history. Laser and other specialized services raise the rate because the severity of potential claims is higher. The official proforma is issued after the quote request is completed on Bimeh Iran tariffs.",
      },
      {
        question: "Are laser and injection services covered?",
        answer:
          "Laser and injection services have a more medical character and usually require express scheduling in the policy together with the relevant permit. Without scheduling these services, damage caused by them is not covered. Declare the salon's exact service list when requesting the quotation so that the exclusions and the limit are set appropriately.",
      },
      {
        question: "What if a client claims an infection from the instruments?",
        answer:
          "Where the infection is linked to failure to observe sterilization standards, the related treatment costs and diyeh are recoverable up to the policy limit. Sterilization records, patch tests and staff training are the salon's most important defense documents; without them the salon's share of responsibility in the adjuster's assessment increases.",
      },
      {
        question: "Which losses are not covered by salon liability insurance?",
        answer:
          "Injection and laser services without permit and express scheduling, damage from expired or unauthorized materials, unlicensed activity and incidents outside the policy period are not covered. Loss caused by intentional error and matters subject to qisas are also excluded under the general conditions of the policy schedule.",
      },
      {
        question: "Are salon staff covered as well?",
        answer:
          "Yes. With express scheduling, acts of salon staff within the permitted services fall under the owner's liability cover. For this purpose the number and activity of staff must be declared at issuance and subsequent changes endorsed on the policy. Acts outside the declared services or by undeclared staff may not be covered.",
      },
    ],
    legalSources: [
      {
        title: "Civil Liability Act of Iran (1960)",
        reference: "Articles 1 to 11 — fault-based civil liability",
      },
      {
        title: "Islamic Penal Code — Diyat chapter",
        reference: "Book Five, Articles 449 to 503",
      },
      {
        title: "General Conditions of Professional Liability Insurance (Bimeh Iran)",
        reference: "Central Insurance Regulation No. 57",
      },
    ],
    metaTitle: "Beauty Salon Liability Insurance in Iran",
    metaDescription:
      "Beauty salon liability insurance in Iran: service injuries, skin sensitivity, instrument contamination, defense costs, exclusions and official quotation.",
    keywords: [
      "beauty salon liability insurance Iran",
      "hairdresser liability insurance Iran",
      "salon customer injury cover Iran",
      "laser service liability Iran",
      "beauty salon indemnity Iran",
      "بیمه مسئولیت آرایشگران",
      "بیمه مسئولیت سالن زیبایی",
    ],
    reviewDate: REVIEW_DATE,
  },

  // ── 14 ── restaurants-hotels (wave 2) ────────────────────────────
  {
    slug: "restaurants-hotels",
    category: "commercial",
    title: "Restaurant and Hotel Liability Insurance in Iran",
    nameEn: "Restaurant and Hotel Liability Insurance",
    audienceLine:
      "For managers of restaurants, cafes, hotels, guesthouses, banquet halls and catering centers.",
    answerBlock:
      "Restaurant and hotel managers liability insurance in Iran compensates bodily and financial damage to guests — food poisoning, falls and injuries on the premises, and liability for deposited property — under the Civil Liability Act and the Civil Code. Liability toward staff is covered separately and complementarily by employers liability insurance.",
    whoCovered: [
      "Restaurants, cafes and fast-food units holding the required permits",
      "Hotels, guesthouses and serviced apartments with a valid license",
      "Banquet halls and catering centers",
      "Traditional cafes and tea houses with a valid trade license",
      "Central kitchens and corporate catering units",
    ],
    coverages: [
      {
        title: "Food poisoning",
        description:
          "Compensation for guests' diyeh and treatment costs from contaminated food, where the contamination source is traced to the unit.",
      },
      {
        title: "Guest falls and injuries",
        description:
          "Cover for bodily injury from a wet floor, a defective stair or faulty furniture in the reception area.",
      },
      {
        title: "Guest property liability",
        description:
          "Compensation for damage to guests' property within the custody rules of the establishment.",
      },
      {
        title: "Damage to neighboring properties",
        description:
          "Cover for kitchen fire spreading or water leaking to adjacent units, as provided in the policy.",
      },
      {
        title: "Legal defense costs",
        description:
          "Attorney fees and procedural costs in guest complaints and regulatory proceedings.",
      },
      {
        title: "Events and banquet extension",
        description:
          "Extension of cover to temporary banquets and events within the unit's activity, under a special endorsement.",
      },
    ],
    exclusions: [
      "Serving expired or contaminated food with the manager's knowledge",
      "Kitchen staff accidents, which belong to employers liability insurance",
      "Damage to the establishment's own property and equipment",
      "Contamination from supplies procured from unlicensed sources with management's knowledge",
      "Administrative fines and closure orders of the regulatory authorities",
      "Acts of God such as flood and earthquake, unless endorsed",
    ],
    conditions: [
      "A valid trade license and environmental health certificate",
      "Compliance with the food and beverage hygiene directives",
      "Documented records of staff hygiene training courses",
    ],
    documents: [
      "Trade license and environmental health certificate",
      "Staff health cards",
      "Identity documents and articles of association of the establishment",
      "List of kitchen equipment and raw material suppliers",
      "Previous policy and claims history",
    ],
    buySteps: [
      {
        title: "Quotation by capacity",
        description:
          "Submit the quote request with the activity type, reception capacity and desired limit; the advisor delivers the final proposal.",
      },
      {
        title: "Documents and official proforma",
        description:
          "With the trade license, health certificate and identity documents, an official proforma invoice is issued on Bimeh Iran tariffs.",
      },
      {
        title: "Premium payment",
        description:
          "Pay through the banking gateway or a bank receipt; issuance starts after payment is confirmed.",
      },
      {
        title: "Policy issuance and delivery",
        description:
          "The policy, stating the address and activity type of the establishment and any agreed endorsements, is delivered.",
      },
    ],
    claimSteps: [
      {
        title: "Immediate notification",
        description:
          "Report poisoning, a guest fall or damage to deposited property immediately and keep food samples.",
      },
      {
        title: "Claim form",
        description:
          "Complete the form with the service provided, the date, the number of affected persons and the course of events.",
      },
      {
        title: "Case documents",
        description:
          "Submit the health inspection report, sampling records, supply records and the guests' medical documents.",
      },
      {
        title: "Source tracing",
        description:
          "The adjuster traces the source of contamination or the accident through the supply, storage and service chain.",
      },
      {
        title: "Responsibility and negotiation",
        description:
          "The establishment's share of responsibility and the amount of loss are negotiated with the claimants and documented in writing.",
      },
      {
        title: "Agreement and payment",
        description:
          "The loss is paid to the claimants subject to the policy deductible and up to the limit of liability.",
      },
    ],
    faqs: [
      {
        question: "How far does a restaurant's liability for food poisoning extend?",
        answer:
          "Where the contamination source traces back to ingredients, storage or preparation in the restaurant, the manager's civil liability is established and guests' diyeh and treatment costs are paid under the policy. If contamination came from an unlicensed supplier, responsibility is divided between the parties, and the procurement records become decisive.",
      },
      {
        question: "How much does restaurant and hotel liability insurance cost?",
        answer:
          "The premium is calculated from the activity type, reception capacity, daily covers served, raw material categories, the selected limit of liability and the claims history. Units with industrial kitchens and high capacity are rated on a different scale. The exact amount is stated in the official proforma issued by the agency.",
      },
      {
        question: "How is guests' property covered?",
        answer:
          "The establishment's liability for guests' property depends on the custody rules: items formally deposited in the safe or the designated custody place enjoy clearer cover. Items left in rooms or at tables can also be examined where staff negligence is proven. The sub-limit for this cover is fixed in the policy schedule.",
      },
      {
        question: "Are kitchen staff accidents covered by this policy?",
        answer:
          "No. Staff injuries during work are the subject of employers liability insurance toward workers and are not included in this policy. For full coverage of the establishment's risk, employers liability should be issued alongside it. The two policies are complementary, each covering a different group of exposed persons.",
      },
      {
        question: "What if the contamination comes from the raw material supplier?",
        answer:
          "Where it is proven that contaminated ingredients were supplied by an unlicensed or unhygienic supplier, responsibility is divided between the restaurant and the supplier. Purchase documents, invoices and the suppliers' health permits are the basis of the file. Observing a licensed supply chain reduces both the accident risk and the establishment's legal exposure.",
      },
      {
        question: "Can banquet halls and temporary catering be insured?",
        answer:
          "Yes. Banquet halls and catering centers are covered when named and addressed in the policy, and temporary activities such as banquets outside the main premises can be added under a special endorsement. High reception capacity and dense crowds make a higher limit of liability necessary for these units, which the advisor proposes.",
      },
    ],
    legalSources: [
      {
        title: "Civil Liability Act of Iran (1960)",
        reference: "Articles 1 to 11 — fault-based civil liability",
      },
      {
        title: "Civil Code of Iran",
        reference: "Articles 328 to 335 — liability of possessors and custodians",
      },
      {
        title: "Iranian Insurance Act (1936)",
        reference: "Article 12 — insurable interest",
      },
      {
        title: "Edible and Drinking Substances Act of Iran (1957)",
        reference: "Hygiene duties of food and beverage establishments",
      },
    ],
    metaTitle: "Restaurant and Hotel Liability Insurance in Iran",
    metaDescription:
      "Restaurant and hotel liability insurance in Iran: food poisoning, guest falls, deposited property, defense costs, exclusions and official quotation.",
    keywords: [
      "restaurant liability insurance Iran",
      "hotel liability insurance Iran",
      "food poisoning claim Iran",
      "guest injury insurance Iran",
      "hospitality liability insurance Iran",
      "بیمه مسئولیت رستوران",
      "بیمه مسئولیت هتل",
    ],
    reviewDate: REVIEW_DATE,
  },

  // ── 15 ── kindergartens (wave 2) ─────────────────────────────────
  {
    slug: "kindergartens",
    category: "commercial",
    title: "Kindergarten Liability Insurance in Iran",
    nameEn: "Kindergarten and Educational Centers Liability Insurance",
    audienceLine:
      "For managers of kindergartens, preschools, non-governmental schools and child education centers.",
    answerBlock:
      "Kindergarten and educational center managers liability insurance in Iran compensates bodily and financial damage to children and students during care, teaching and supervision, under the Civil Liability Act. The supervisor's liability for a minor's conduct follows Article 2 of the same Act, and payment is made up to the policy limit.",
    whoCovered: [
      "Managers of kindergartens and preschools licensed by the State Welfare Organization",
      "Managers of non-governmental schools and free-standing training institutes",
      "Rehabilitation and special-education centers for children",
      "Licensed home-based kindergartens",
      "Instructors and supervisors, within the duties entrusted to the center",
    ],
    coverages: [
      {
        title: "Child injury during care",
        description:
          "The child's diyeh and treatment costs after a fall, collision or accident while under the center's supervision.",
      },
      {
        title: "Supervision liability",
        description:
          "Cover for the supervisor's liability arising from failure to protect the child commensurate with age and condition, under Article 2 of the Civil Liability Act.",
      },
      {
        title: "Child injuring another child",
        description:
          "Compensation for damage inflicted by one child on another, within the center's duty of supervision.",
      },
      {
        title: "Damage to children's belongings",
        description:
          "Cover for financial damage to children's personal items — glasses, toys and similar — in insured incidents.",
      },
      {
        title: "Damage to neighboring properties",
        description:
          "Cover for fire and damage caused by the center's activity to adjacent properties, as provided in the policy.",
      },
      {
        title: "Legal defense costs",
        description:
          "Procedural costs in complaints by parents and supervisory bodies such as the State Welfare Organization and the Ministry of Education.",
      },
    ],
    exclusions: [
      "Operation of the center without a license from the State Welfare Organization or the Ministry of Education",
      "Intentional injury by staff with an established criminal aspect",
      "Incidents outside the center's supervisory time and premises",
      "Damage caused by disregarding equipment safety standards with the management's knowledge",
      "Contagious diseases without proof of transmission through the center's environment",
      "Acts of God, unless specially endorsed",
    ],
    conditions: [
      "A valid operating license from the State Welfare Organization or the Ministry of Education",
      "Observance of the instructor-to-child ratio and educational space standards",
      "Health records kept and parental consent forms obtained",
    ],
    documents: [
      "Establishment license of the kindergarten or school",
      "No-criminal-record certificates and health cards of instructors",
      "Identity documents and articles of association of the establishment",
      "List of instructors and the capacity of enrolled children",
      "Previous policy and incident history",
    ],
    buySteps: [
      {
        title: "Quotation by center capacity",
        description:
          "Submit the quote request stating the number of children, activity type and desired limit; the advisor delivers the final proposal.",
      },
      {
        title: "Documents and official proforma",
        description:
          "With the establishment license, instructor documents and identity documents, an official proforma invoice is issued on Bimeh Iran tariffs.",
      },
      {
        title: "Premium payment",
        description:
          "Pay through the banking gateway or a bank receipt; issuance starts after payment is confirmed.",
      },
      {
        title: "Policy issuance and delivery",
        description:
          "The policy, stating the address and capacity of the center and any agreed endorsements, is delivered in print and electronically.",
      },
    ],
    claimSteps: [
      {
        title: "Immediate notification",
        description:
          "Notify the parents and the agency of the child's injury immediately and document the scene and the evidence.",
      },
      {
        title: "Claim form",
        description:
          "Complete and sign the form with the child's attendance time, the instructor present and a precise account of the accident.",
      },
      {
        title: "Case documents",
        description:
          "Submit the medical file, the instructor's report, CCTV footage and the parents' identity documents.",
      },
      {
        title: "Assessment of responsibility",
        description:
          "The adjuster evaluates the supervision performed and whether the accident is attributable to the center's negligence.",
      },
      {
        title: "Agreement and payment",
        description:
          "Once responsibility and the amount are established, the loss is paid subject to the deductible and up to the policy limit.",
      },
    ],
    faqs: [
      {
        question: "How is the supervisor's liability for child injury determined?",
        answer:
          "Under Article 2 of the Civil Liability Act, a person obliged by law or contract to protect another is liable for the damage when injury occurs. In educational centers the adequacy of supervision relative to the child's age, instructor density and the accident circumstances is the basis of liability, and compensation is paid up to the policy limit.",
      },
      {
        question: "How much does kindergarten liability insurance cost?",
        answer:
          "The premium is calculated from the number of children, admission capacity, the center's activity type, the selected limit of liability and the claims history. Centers running excursions or child transport carry higher risk and are rated differently. The official proforma is issued after the establishment license and center details are reviewed.",
      },
      {
        question: "What if one child injures another child?",
        answer:
          "Where it is proven that supervision was not performed to the standard of care and this failure led to the injury, the center's liability is established and compensation for the injured child is paid under the policy. Supervision records, the number of instructors present and the incident report establish the management's share of responsibility.",
      },
      {
        question: "Are accidents outside the center's hours covered?",
        answer:
          "No. The cover is limited to the time and place where the child is under the center's supervision. Accidents after the child is handed back to the parents or outside the center's premises are outside the policy. Excursions and child transport are covered only under a special endorsement with additional premium.",
      },
      {
        question: "How does this policy differ from student accident insurance?",
        answer:
          "Student accident insurance typically pays fixed treatment benefits after an accident, whereas the managers liability policy compensates the center's civil liability toward the child and the family — diyeh, compensation and defense costs. The two policies are complementary, and taking them together provides more complete protection for the center and the children.",
      },
      {
        question: "Are home-based kindergartens insurable as well?",
        answer:
          "Yes. Home-based kindergartens holding a formal license from the State Welfare Organization are insurable on the same conditions as official centers. Unlicensed units or those exceeding the permitted capacity face cover rejection at claim time. Compliance with the safety standards of the care space is the core condition of the policy's validity.",
      },
    ],
    legalSources: [
      {
        title: "Civil Liability Act of Iran (1960)",
        reference: "Articles 1 to 11, in particular Article 2 — custody and supervision",
      },
      {
        title: "Civil Code of Iran",
        reference: "Articles 328 to 335 — liability of possessors and custodians",
      },
      {
        title: "Iranian Insurance Act (1936)",
        reference: "Article 12 — insurable interest",
      },
      {
        title: "Islamic Penal Code — Diyat chapter",
        reference: "Book Five, Articles 449 onwards",
      },
    ],
    metaTitle: "Kindergarten Liability Insurance in Iran",
    metaDescription:
      "Kindergarten liability insurance in Iran: child injury during care, supervision liability, defense costs, exclusions, buying and claim steps, quotation.",
    keywords: [
      "kindergarten liability insurance Iran",
      "childcare center liability Iran",
      "school manager liability insurance Iran",
      "preschool liability cover Iran",
      "child injury compensation Iran",
      "بیمه مسئولیت مهدکودک",
      "بیمه مسئولیت مراکز آموزشی",
    ],
    reviewDate: REVIEW_DATE,
  },

  // ── 16 ── transport-carriers (wave 2) ────────────────────────────
  {
    slug: "transport-carriers",
    category: "commercial",
    title: "Carriers Liability Insurance in Iran",
    nameEn: "Carriers Liability Insurance",
    audienceLine:
      "For road freight companies, truck and trailer operators, urban distribution fleets and freight terminals.",
    answerBlock:
      "Carriers liability insurance in Iran compensates damage to cargo in custody during carriage, loading, unloading and storage, under the custody rules of the Civil Code, and covers injury to third parties during transport. The limit of liability is set separately for each vehicle listed in the policy schedule.",
    whoCovered: [
      "Road and intercity freight transport companies",
      "Truck, trailer and light-truck operators holding a valid waybill",
      "Urban distribution and corporate courier units",
      "Operators of refrigerated and special cargo",
      "Warehouses and freight terminals, within the custody scope",
    ],
    coverages: [
      {
        title: "Cargo in custody",
        description:
          "Compensation for loss of or damage to entrusted cargo during carriage, loading and unloading, under the custody rules.",
      },
      {
        title: "Third-party injury during carriage",
        description:
          "Cover for bodily and financial damage to third parties from carriage operations, beyond the compulsory third-party motor insurance.",
      },
      {
        title: "Accidents during loading and unloading",
        description:
          "Compensation for damage from cargo falls, overturning and accidents in the loading and unloading yard.",
      },
      {
        title: "Special cargo under endorsement",
        description:
          "Cover for refrigerated, fragile and perishable cargo where a special endorsement is scheduled and the declared carriage conditions are observed.",
      },
      {
        title: "Legal defense costs",
        description:
          "Attorney fees and procedural costs in claims by cargo owners and third parties.",
      },
      {
        title: "Extension to drivers and staff",
        description:
          "Extension of cover to drivers and loading staff as insured persons, where scheduled in the policy.",
      },
    ],
    exclusions: [
      "Carriage without a valid waybill or of unauthorized cargo",
      "Loss from the inherent nature of the cargo, natural spoilage and defective packaging",
      "Death of and injury to the carrier's own staff, which belongs to employers liability insurance",
      "Damage to the vehicle itself and to cargo owned by the vehicle's owner",
      "Acts of God such as flood and earthquake, unless endorsed",
      "Delivery of cargo to unauthorized persons with the carrier's knowledge",
    ],
    conditions: [
      "A valid waybill and lawful carriage documents",
      "Declaration of the cargo type, value and route at issuance",
      "Observance of loading and cargo-securing rules under the traffic regulations",
    ],
    documents: [
      "Transport activity permit or smart driving card",
      "Sample waybills and carriage contracts",
      "Identity documents and the company's business license",
      "Fleet list with capacity and vehicle types",
      "Third-party and hull policies of the active fleet",
    ],
    buySteps: [
      {
        title: "Quotation by fleet",
        description:
          "Submit the quote request with the fleet size and capacity, cargo types and routes; the advisor proposes a suitable limit.",
      },
      {
        title: "Documents and official proforma",
        description:
          "With the activity permit, identity documents and vehicle details, an official proforma invoice is issued on Bimeh Iran tariffs.",
      },
      {
        title: "Premium payment",
        description:
          "Pay through the banking gateway or a bank receipt; issuance starts after payment is confirmed.",
      },
      {
        title: "Policy issuance and delivery",
        description:
          "The policy, stating the fleet details and any special-cargo endorsements, is delivered in print and electronically.",
      },
    ],
    claimSteps: [
      {
        title: "Immediate notification",
        description:
          "Report cargo loss or an accident during carriage immediately and document the state of the consignment and the vehicle.",
      },
      {
        title: "Claim form",
        description:
          "Complete and sign the form with the waybill particulars, cargo type, route and the course of events.",
      },
      {
        title: "Case documents",
        description:
          "Submit the waybill, the delivery report, the authorities' report in case of collision and the cargo owner's documents.",
      },
      {
        title: "Cargo assessment",
        description:
          "The adjuster assesses the loss of or damage to the cargo and whether the carriage matched the waybill.",
      },
      {
        title: "Responsibility and negotiation",
        description:
          "The carrier's responsibility and the amount of loss are negotiated with the cargo owner and documented in writing.",
      },
      {
        title: "Agreement and payment",
        description:
          "The loss is paid subject to the policy deductible and up to the limit of liability.",
      },
    ],
    faqs: [
      {
        question: "When does the carrier's responsibility for the cargo begin?",
        answer:
          "The carrier's responsibility begins when the cargo is taken over and the waybill is issued, and continues until delivery to the authorized recipient, covering loading, carriage, unloading and storage. The legal basis is the duty to preserve another's property in the Civil Code, and loss of entrusted cargo is compensated up to the policy limit.",
      },
      {
        question: "How much does cargo carriers liability insurance cost?",
        answer:
          "The premium is calculated from the number and capacity of the fleet, the cargo types, the carriage routes, the selected limit of liability and the claims history. Carrying valuable, refrigerated and perishable cargo is rated differently. The official proforma is issued after the fleet details and activity type are registered with the agency.",
      },
      {
        question: "Is perishable and refrigerated cargo covered?",
        answer:
          "Yes. Refrigerated, fragile and perishable cargo is covered where a special endorsement is scheduled and the declared carriage conditions are observed. Maintaining the cold chain, packaging quality and delivery timing are requirements for the validity of this cover. Loss caused by the cargo's inherent nature or defective packaging known to the carrier is excluded.",
      },
      {
        question: "How does this policy differ from cargo and motor third-party insurance?",
        answer:
          "Cargo insurance covers the goods themselves against carriage perils, and compulsory motor third-party insurance pays for injury and damage to third parties in a collision. Carriers liability insurance instead covers the carrier's legal duty to preserve entrusted cargo and losses from carriage and unloading operations. The three policies complement one another.",
      },
      {
        question: "What happens if cargo is carried without a waybill?",
        answer:
          "Carriage without a valid waybill or of unauthorized cargo is outside the cover, because the waybill is the principal document establishing responsibility, value and delivery terms. In such a situation the loss of or damage to the cargo remains entirely with the carrier, and disciplinary consequences of unlawful carriage may also arise.",
      },
      {
        question: "Is damage to a third-party vehicle during carriage covered?",
        answer:
          "Yes. Bodily and financial damage to third parties during carriage and cargo handling is covered under the carriers policy, particularly where it exceeds the compulsory motor third-party cover of the vehicle. The limit of liability is set separately for each vehicle in the schedule, and the deductible applies as stated in the policy.",
      },
    ],
    legalSources: [
      {
        title: "Civil Code of Iran",
        reference: "Articles 328 to 335 — duty to preserve another's property",
      },
      {
        title: "Civil Liability Act of Iran (1960)",
        reference: "Articles 1 to 11 — fault-based civil liability",
      },
      {
        title: "Iranian Insurance Act (1936)",
        reference: "Article 12 — insurable interest",
      },
    ],
    metaTitle: "Carriers Liability Insurance in Iran",
    metaDescription:
      "Carriers liability insurance in Iran: cargo in custody, third-party harm during carriage, defense costs, exclusions, claim steps and official quotation.",
    keywords: [
      "carriers liability insurance Iran",
      "cargo liability insurance Iran",
      "freight carrier liability Iran",
      "transport company insurance Iran",
      "cargo damage compensation Iran",
      "بیمه مسئولیت حمل‌ونقل بار",
      "carriers indemnity Iran",
    ],
    reviewDate: REVIEW_DATE,
  },

  // ── 17 ── nurses-paramedics (wave 3) ─────────────────────────────
  {
    slug: "nurses-paramedics",
    category: "professional",
    title: "Nurses and Allied Health Professionals Liability Insurance in Iran",
    nameEn: "Nurses & Allied Health Professionals Liability Insurance",
    audienceLine:
      "For nurses, midwives, physiotherapists, paramedics and operating-room, laboratory and radiology technicians licensed to practice.",
    answerBlock:
      "Nurses and allied health professionals liability insurance in Iran compensates patients for bodily injury and financial loss caused by professional error of nurses, midwives, physiotherapists and operating-room or laboratory technicians, up to the policy limit, and funds the insured professional's legal defense before Iranian courts and Medical Council disciplinary commissions.",
    whoCovered: [
      "Registered general and specialist nurses working in treatment wards",
      "Midwives and community health workers active in delivery rooms and health centers",
      "Licensed physiotherapists and occupational therapists",
      "Operating-room and anesthesia technicians acting within their assigned duties",
      "Laboratory, radiology and radiotherapy technicians",
      "Allied health professionals based in private offices, hospitals and ambulances",
    ],
    coverages: [
      {
        title: "Diyeh and bodily injury",
        description:
          "Compensation for death or disability caused by professional error during care, calculated on the official diyeh schedule issued by the judiciary for the year of the incident.",
      },
      {
        title: "Injection, medication and infusion errors",
        description:
          "Cover for wrong injections, incorrect dosage and complications of infusion therapy, subject to proof of fault and recording of the discipline in the policy.",
      },
      {
        title: "Midwifery and maternal care",
        description:
          "Compensation for damage arising from the midwife's acts during natural delivery and pre- and post-natal care, in line with the general conditions of the policy.",
      },
      {
        title: "Patient financial loss",
        description:
          "Reimbursement of follow-up treatment, re-hospitalization and related rehabilitation services the patient bears because of an attributable error.",
      },
      {
        title: "Legal defense costs",
        description:
          "Attorney fees and court costs in proceedings before Iranian courts and the commissions supervising allied-health conduct, including dismissed claims.",
      },
      {
        title: "First aid during duty",
        description:
          "Cover for first-aid actions performed during duty or on mission, within the permitted scope of each discipline declared in the policy.",
      },
    ],
    exclusions: [
      "Acts outside the permitted scope of the allied-health discipline or without the physician's order where required",
      "Services requiring a separate specialized license that are not recorded in the policy",
      "Damage caused by intentional error or knowing breach of treatment protocols",
      "Incidents occurring outside the policy period; the trigger is the incident date",
      "Damage from defective equipment whose condition was known and unreported",
      "Diyeh amounts that are the subject of qisas (retribution) or corporal punishment",
    ],
    conditions: [
      "A valid practice license or work permit on the date of the incident",
      "Accurate declaration of the discipline and workplace at issuance",
      "No undisclosed claims from previous policy periods",
      "Performance of procedures under written physician's orders where required",
    ],
    documents: [
      "Valid practice license or employment certificate",
      "National ID and identity documents",
      "Previous liability policy, for claims history and no-claims discount",
      "Employment or cooperation contract with the hospital, clinic or laboratory",
      "Description of night and emergency shifts where special cover is requested",
    ],
    buySteps: [
      {
        title: "Quotation and limit selection",
        description:
          "Submit the quote request; the advisor proposes a limit of liability matched to your discipline and workplace.",
      },
      {
        title: "Documents and official proforma",
        description:
          "After identity and professional documents are received, an official proforma invoice is issued on the approved Bimeh Iran tariffs.",
      },
      {
        title: "Premium payment",
        description:
          "Pay through the banking gateway or a bank receipt; cover starts the moment issuance is confirmed.",
      },
      {
        title: "Policy delivery",
        description:
          "The printed and electronic policy with its general conditions is delivered within one working day.",
      },
    ],
    claimSteps: [
      {
        title: "Immediate notification",
        description:
          "Report the incident to the agency as soon as you become aware of it; the policy sets a maximum notification period of five working days.",
      },
      {
        title: "Claim form",
        description:
          "Complete and sign the claim form describing the events, the incident date and the care provided.",
      },
      {
        title: "Case documents",
        description:
          "Submit the patient record, shift logs, medical orders and identity documents of the parties to the claims adjuster.",
      },
      {
        title: "Expert review and medical commission",
        description:
          "The Medical Council forensic commission or the Forensic Medicine Organization establishes fault and the degree of responsibility.",
      },
      {
        title: "Agreement and payment",
        description:
          "Once liability and the amount are established, compensation is paid subject to the policy deductible.",
      },
    ],
    faqs: [
      {
        question: "Which disciplines does nurses liability insurance cover in Iran?",
        answer:
          "Nursing, midwifery, physiotherapy, occupational therapy, operating-room and anesthesia technology, laboratory and radiology disciplines can be covered, provided the exact discipline is recorded in the policy. Acts outside the permitted scope of each discipline fall under the general-conditions exclusions and require a separate policy or a specific agreement with the insurer.",
      },
      {
        question: "How much does nurses liability insurance cost in Iran?",
        answer:
          "The premium depends on the discipline, the selected limit of liability and the declared workplace, with higher-risk disciplines such as midwifery and operating rooms rated differently. This site publishes no premium figures: the final premium is issued upon official quotation, and the proforma invoice is prepared on current Bimeh Iran tariffs.",
      },
      {
        question: "Is a midwife's delivery error covered?",
        answer:
          "When the midwifery discipline is recorded in the policy, bodily and financial damage arising from the midwife's acts during delivery and related care is recoverable upon proof of fault established by the medical commission. Procedures beyond the midwifery license, such as surgery, are not covered and fall under the exclusions of the policy.",
      },
      {
        question: "What risk does an uninsured allied health professional face?",
        answer:
          "The claimant can demand full compensation directly from the professional under the Civil Liability Act and the Diyat chapter of the Islamic Penal Code, and legal defense itself is costly. Without insurance, diyeh is paid from personal assets, particularly in bodily-injury files with high amounts, plus attorney fees and court costs.",
      },
      {
        question: "Which losses are excluded from nurses liability insurance?",
        answer:
          "Acts outside the permitted scope of the discipline, procedures performed without the physician's order where required, intentional errors and knowing breaches of treatment protocols are excluded. Incidents occurring outside the policy period and damage from defective equipment that was known and unreported are also not covered under the general conditions.",
      },
      {
        question: "Do allied health professionals get a no-claims discount?",
        answer:
          "Yes. When the previous year's policy is presented without declared claims, the no-claims discount is applied in steps under the Bimeh Iran general conditions. The previous policy schedule is required for correct calculation. If a claim occurred in the previous period, the rate is recalculated on the record and the related discount is removed.",
      },
    ],
    legalSources: [
      {
        title: "Civil Liability Act of Iran (1960)",
        reference: "Articles 1 to 11 — fault-based civil liability",
      },
      {
        title: "Islamic Penal Code — Diyat chapter",
        reference: "Book Five, Articles 449 to 503",
      },
      {
        title: "General Conditions of Professional Liability Insurance (Bimeh Iran)",
        reference: "Central Insurance Regulation No. 57",
      },
      {
        title: "Medical Council Disciplinary Regulations of Iran",
        reference: "Disciplinary boards and forensic commissions of the Iranian Medical Council",
      },
    ],
    metaTitle: "Nurses & Paramedics Liability Insurance in Iran",
    metaDescription:
      "Nurses and allied health liability insurance in Iran: injection and midwifery errors, diyeh, legal defense costs, exclusions and official quotation.",
    keywords: [
      "nurses liability insurance Iran",
      "allied health liability insurance Iran",
      "midwife malpractice insurance Iran",
      "nursing error claim Iran",
      "paramedic liability cover Iran",
      "بیمه مسئولیت پیراپزشکان",
      "بیمه مسئولیت پرستاران",
    ],
    reviewDate: REVIEW_DATE,
  },

  // ── 18 ── financial-advisors (wave 3) ────────────────────────────
  {
    slug: "financial-advisors",
    category: "professional",
    title: "Financial and Tax Advisors Liability Insurance in Iran",
    nameEn: "Financial and Tax Advisors Liability Insurance",
    audienceLine:
      "For licensed financial advisors, tax advisors licensed by the Tax Administration and financial consulting institutes.",
    answerBlock:
      "Financial and tax advisors liability insurance in Iran compensates the client's financial loss and attributable penalties caused by faulty tax advice, defective financial planning and erroneous calculations or feasibility reports, up to the policy limit, and funds the advisor's legal defense in client lawsuits and proceedings before financial regulatory bodies.",
    whoCovered: [
      "Licensed financial advisors holding an official services permit",
      "Tax advisors licensed by the Iranian Tax Administration",
      "Financial consulting institutes and their partners",
      "Investment advisors acting within the relevant permit",
      "Independent chief financial officers and corporate budgeting consultants",
      "Personal financial planning institutes working under written consulting contracts",
    ],
    coverages: [
      {
        title: "Defective tax advice",
        description:
          "Compensation of losses and attributable penalties arising from faulty tax recommendations, upon proof of the advisor's fault.",
      },
      {
        title: "Financial planning errors",
        description:
          "Cover for the client's financial loss caused by wrong analysis, defective cash-flow calculations and unrealistic project appraisals.",
      },
      {
        title: "Client penalties",
        description:
          "Compensation of penalties and financial damage attributable to the advisor's performance, within the limit recorded in the policy.",
      },
      {
        title: "Reliance on financial reports",
        description:
          "Cover for third-party losses caused by reliance on the advisor's defective reports and feasibility studies, under the general conditions.",
      },
      {
        title: "Legal defense costs",
        description:
          "Attorney fees and court costs in client lawsuits and regulatory proceedings arising from the insured event.",
      },
      {
        title: "Institute staff liability",
        description:
          "The advisor's liability for acts of dependent staff of the institute, within the scope recorded in the policy.",
      },
    ],
    exclusions: [
      "Losses from market fluctuations and the client's own decisions made without relying on the advisor's report",
      "Guaranteed investment returns or assured profit promises, where proven",
      "Incidents occurring outside the policy period; the trigger is the incident date",
      "Intentional fault, misuse of client funds and fraud",
      "Loss caused by incorrect information provided by the client",
      "Administrative penalties of financial regulatory bodies",
    ],
    conditions: [
      "A valid financial or tax services permit on the date of the error",
      "Advice delivered under written contracts with documented records evidencing performance",
      "Accurate declaration of the service scope at issuance",
      "No undisclosed claims from previous policy periods",
    ],
    documents: [
      "Valid financial or tax services permit or license",
      "National ID and identity documents",
      "Previous liability policy, for claims history and no-claims discount",
      "Sample consulting contract, where required",
      "Institute registration documents, when the policy is issued to an institute",
    ],
    buySteps: [
      {
        title: "Quotation and limit selection",
        description:
          "Submit the quote request; the advisor is asked to declare the service scope, and a limit of liability is proposed accordingly.",
      },
      {
        title: "Documents and official proforma",
        description:
          "After the permit and identity documents are received, an official proforma invoice is issued on the approved Bimeh Iran tariffs.",
      },
      {
        title: "Premium payment",
        description:
          "Pay through the banking gateway or a bank receipt; cover starts the moment issuance is confirmed.",
      },
      {
        title: "Policy delivery",
        description:
          "The printed and electronic policy with its general conditions is delivered within one working day.",
      },
    ],
    claimSteps: [
      {
        title: "Immediate notification",
        description:
          "Report the client's claim to the agency as soon as it is received; the policy sets a maximum notification period of five working days.",
      },
      {
        title: "Claim form",
        description:
          "Complete and sign the claim form describing the advice or report under challenge and the alleged loss.",
      },
      {
        title: "Case documents",
        description:
          "Submit the consulting contracts, the reports and calculations, the correspondence with the client and the regulator's findings, if any.",
      },
      {
        title: "Assessment of fault",
        description:
          "The adjuster examines whether the loss is attributable to the advisor's performance or to the client's own decisions.",
      },
      {
        title: "Agreement and payment",
        description:
          "Once liability and the amount are established, compensation is paid subject to the policy deductible.",
      },
    ],
    faqs: [
      {
        question: "Does the policy pay the client's tax penalties?",
        answer:
          "If the client's tax penalty is directly attributable to the advisor's fault in advice or report preparation, it is recoverable up to the policy limit upon proof of fault. Penalties arising from the client's own unilateral decisions or from incorrect information supplied by the client are excluded under the general conditions.",
      },
      {
        question: "How much does financial advisors liability insurance cost?",
        answer:
          "The premium is calculated from the scope of advice, the number of clients, the selected limit of liability and claims history. Institutes serving corporate clients are rated differently from independent tax advisors. No premium figures are published on this site: the final premium is issued upon official quotation on current Bimeh Iran tariffs.",
      },
      {
        question: "Are the client's investment losses covered?",
        answer:
          "Losses that directly result from the advisor's defective analysis or calculation, documented in a written report, can be examined upon proof of fault. Natural market fluctuations and the client's decisions taken without relying on the advisor's report are not covered. Guaranteed-return promises are also excluded under the policy exclusions.",
      },
      {
        question: "Is a claim covered without a written consulting contract?",
        answer:
          "The absence of a written contract makes it difficult to prove the scope of duties and to defend the advisor, because the assessment of fault is based on consulting records and declared limitations. Every engagement should be documented in a contract or written correspondence; weak documentation can increase the advisor's share of responsibility.",
      },
      {
        question: "Is an advisor with an expired permit still covered?",
        answer:
          "No. Holding a valid permit on the date of the error is a condition of cover. Professional acts performed with an expired or suspended license are not covered by professional liability insurance and may also carry disciplinary consequences. Timely renewal of the permit aligned with the policy period is essential.",
      },
      {
        question: "Are attorney fees paid when a client sues?",
        answer:
          "Yes. Attorney fees and court costs in lawsuits brought by clients are payable when legal defense cover is included in the policy. This cover applies even to proceedings ending in the advisor's acquittal, because defense costs are covered from the moment the claim is filed, within the limit stated in the policy schedule.",
      },
    ],
    legalSources: [
      {
        title: "Civil Liability Act of Iran (1960)",
        reference: "Articles 1 to 11 — fault-based civil liability",
      },
      {
        title: "Iranian Insurance Act (1936)",
        reference: "Articles 12 and 30 — insurable interest and claim notification",
      },
      {
        title: "General Conditions of Professional Liability Insurance (Bimeh Iran)",
        reference: "Central Insurance Regulation No. 57",
      },
    ],
    metaTitle: "Financial and Tax Advisors Liability Insurance in Iran",
    metaDescription:
      "Financial and tax advisors liability insurance in Iran: faulty tax advice, client penalties, planning errors, legal defense and official quotation.",
    keywords: [
      "financial advisor liability insurance Iran",
      "tax advisor liability Iran",
      "financial consulting insurance Iran",
      "professional indemnity advisors Iran",
      "faulty tax advice claim Iran",
      "بیمه مسئولیت مشاوران مالیاتی",
      "بیمه مسئولیت مشاوران مالی",
    ],
    reviewDate: REVIEW_DATE,
  },

  // ── 19 ── translators-official (wave 3) ──────────────────────────
  {
    slug: "translators-official",
    category: "professional",
    title: "Official Translators Liability Insurance in Iran",
    nameEn: "Official Translators Liability Insurance",
    audienceLine:
      "For sworn translators licensed by the Iranian Judiciary and official translation offices with active translators.",
    answerBlock:
      "Official translators liability insurance in Iran compensates the financial loss suffered by parties who rely on a sworn translation, including errors in figures, dates, document numbers and legal terminology, up to the policy limit, and funds the translator's legal defense in court proceedings and disciplinary reviews by the licensing authority.",
    whoCovered: [
      "Sworn translators licensed by the Iranian Judiciary",
      "Official court translators in common and rare languages",
      "Translators providing official services to notary offices and banks",
      "Official translation offices covering their active translators",
      "Interpreters of official meetings and arbitrations, within the permit scope",
      "The office's responsible translator for supervised translators, where expressly scheduled",
    ],
    coverages: [
      {
        title: "Defective official translation",
        description:
          "Compensation of financial loss from defective translations of registration, official and legal documents, upon proof of the translator's fault.",
      },
      {
        title: "Errors in figures and dates",
        description:
          "Cover for loss caused by wrong amounts, dates and document numbers in certified translations, under the general conditions.",
      },
      {
        title: "Legal terminology errors",
        description:
          "Compensation for mistranslated obligations and legal terms that change the meaning of the document.",
      },
      {
        title: "Third-party losses",
        description:
          "Cover for persons who relied on the certified translation and suffered damage, within the limit recorded in the policy.",
      },
      {
        title: "Legal defense costs",
        description:
          "Attorney fees and court costs in lawsuits against the translator and disciplinary reviews by the licensing authority.",
      },
      {
        title: "Translation office liability",
        description:
          "The responsible translator's liability for the acts of supervised translators, within the scope recorded in the policy.",
      },
    ],
    exclusions: [
      "Loss from illegible or incomplete source documents whose inadequacy the translator failed to declare in writing",
      "Translation without the official stamp and registration number, that is, acts outside the permit scope",
      "Incidents occurring outside the policy period; the trigger is the incident date",
      "Intentional error, knowing distortion of a document and forgery",
      "Disciplinary penalties of the translators licensing authority",
      "Loss from delivering a translation without final review",
    ],
    conditions: [
      "A valid official license from the Iranian Judiciary on the date of the error",
      "Declaration of active languages at issuance, with new languages added by endorsement",
      "Retention of the source document and translation copies to evidence correct performance",
      "No undisclosed claims from previous policy periods",
    ],
    documents: [
      "Official Judiciary translators license",
      "National ID and identity documents",
      "Previous liability policy, for claims history and no-claims discount",
      "List of active languages and official registration number",
      "Translation office documents, when the policy is issued to an office",
    ],
    buySteps: [
      {
        title: "Quotation and limit selection",
        description:
          "Submit the quote request; the active languages and the volume of certified work are declared, and a limit is proposed.",
      },
      {
        title: "Documents and official proforma",
        description:
          "After the official license and identity documents are received, an official proforma invoice is issued on the approved Bimeh Iran tariffs.",
      },
      {
        title: "Premium payment",
        description:
          "Pay through the banking gateway or a bank receipt; cover starts the moment issuance is confirmed.",
      },
      {
        title: "Policy delivery",
        description:
          "The printed and electronic policy with its general conditions is delivered within one working day.",
      },
    ],
    claimSteps: [
      {
        title: "Immediate notification",
        description:
          "Report the claim to the agency as soon as it is received; the policy sets a maximum notification period of five working days.",
      },
      {
        title: "Claim form",
        description:
          "Complete and sign the claim form describing the translation under challenge and the alleged loss.",
      },
      {
        title: "Case documents",
        description:
          "Submit the source document, the certified translation, the office records and the correspondence with the requesting authority.",
      },
      {
        title: "Expert review",
        description:
          "A sworn translation expert compares the source and the translation and establishes the fault and its effect on the loss.",
      },
      {
        title: "Agreement and payment",
        description:
          "Once liability and the amount are established, compensation is paid subject to the policy deductible.",
      },
    ],
    faqs: [
      {
        question: "Does the policy cover number errors in certified translations?",
        answer:
          "Yes. An error in an amount, date or document number in a certified translation is recoverable up to the policy limit when fault is proven and financial loss results. A second-review practice for figures and amounts reduces the risk. The original document and translation records are the primary evidence in claim assessment.",
      },
      {
        question: "How much does official translators liability insurance cost?",
        answer:
          "The premium depends on the number of active languages, the volume of certified work and the selected limit of liability. Translation offices employing several translators receive a dedicated rating. No premium figures are published here: the final premium is issued upon official quotation after the request form is completed.",
      },
      {
        question: "What if the source document is illegible?",
        answer:
          "The translator's duty is to declare the illegibility or ambiguity of the source document in writing to the authority and the applicant. If a final translation is delivered without such a declaration and damage follows, the translator may be held responsible. Defects properly attributed to the declared ambiguity of the source are outside the cover.",
      },
      {
        question: "Is non-certified translation covered too?",
        answer:
          "The scope of cover follows the official permit and the services recorded in the policy. Non-certified and commercial translation may be coverable by specific agreement and express scheduling; otherwise the policy is based on certified services bearing the official stamp and registration number. Clarify the service scope with the advisor at issuance.",
      },
      {
        question: "Which losses are excluded from translator liability cover?",
        answer:
          "Intentional error, knowing distortion of documents and forgery, translation outside the permit scope without the official stamp, and incidents outside the policy period are excluded. Disciplinary penalties of the licensing authority and loss from failing to declare inadequate source documents are also not covered under the general conditions.",
      },
      {
        question: "How does a translation office get insured?",
        answer:
          "An office can be insured in the name of the responsible translator together with the active translators of the office; recording the name of every translator who uses the official stamp is a condition of valid cover. The limit is set according to the office's legal and registration document volume, and staff changes must be endorsed promptly.",
      },
    ],
    legalSources: [
      {
        title: "Civil Liability Act of Iran (1960)",
        reference: "Articles 1 to 11 — fault-based civil liability",
      },
      {
        title: "Iranian Insurance Act (1936)",
        reference: "Articles 12 and 30 — insurable interest and claim notification",
      },
      {
        title: "General Conditions of Professional Liability Insurance (Bimeh Iran)",
        reference: "Central Insurance Regulation No. 57",
      },
    ],
    metaTitle: "Official Translators Liability Insurance in Iran",
    metaDescription:
      "Official translators liability insurance in Iran: errors in figures, dates and legal terms, third-party losses, defense costs and official quotation.",
    keywords: [
      "official translator liability insurance Iran",
      "sworn translator insurance Iran",
      "translation error claim Iran",
      "certified translation liability Iran",
      "court translator cover Iran",
      "بیمه مسئولیت مترجمان رسمی",
    ],
    reviewDate: REVIEW_DATE,
  },

  // ── 20 ── notaries (wave 3) ──────────────────────────────────────
  {
    slug: "notaries",
    category: "professional",
    title: "Notaries Public Liability Insurance in Iran",
    nameEn: "Notaries Public Liability Insurance",
    audienceLine:
      "For chief notaries (sardafatar) and assistant notaries (daftryar) appointed by the Registration Organization.",
    answerBlock:
      "Notaries public liability insurance in Iran compensates financial loss arising from defective deeds, incomplete identity verification and breaches of registration formalities at notary offices, up to the policy limit, and funds the notary's legal defense in civil claims and disciplinary proceedings of the Registration Organization and the Notaries Bar Association.",
    whoCovered: [
      "Chief notaries of official deeds appointed by the Registration Organization",
      "Assistant notaries (daftryar) working in official notary offices",
      "Notaries of marriage and divorce offices, with the office type recorded",
      "Notary offices covering both the chief notary and the assistant notary",
      "Office staff within the scope of responsibility recorded in the policy",
      "Deputy and substitute notaries during their temporary appointment",
    ],
    coverages: [
      {
        title: "Defective deed preparation",
        description:
          "Compensation of financial loss from errors in deed drafting, the description of the transaction and the deed contents, upon proof of the office's fault.",
      },
      {
        title: "Incomplete identity verification",
        description:
          "Cover for loss caused by failure to observe the full formalities of identity, capacity and intent verification under registration regulations.",
      },
      {
        title: "Registration procedure defects",
        description:
          "Compensation for damage arising from non-observance of the legal order and formalities of deed preparation and registration.",
      },
      {
        title: "Third-party losses",
        description:
          "Cover for persons who relied on the validity of the official deed and suffered damage, within the recorded limit.",
      },
      {
        title: "Legal defense costs",
        description:
          "Attorney fees and court costs in claims against the office and disciplinary reviews by the Registration Organization and the Notaries Bar.",
      },
      {
        title: "Office staff liability",
        description:
          "The chief notary's liability for the acts of the assistant notary and dependent staff, within the recorded scope.",
      },
    ],
    exclusions: [
      "Losses from forged documents where the identity-verification formalities were not fully observed",
      "Disciplinary and administrative penalties of the Registration Organization and the Notaries Bar Association",
      "Incidents occurring outside the policy period; the trigger is the incident date",
      "Knowing breach of registration regulations, drafting deeds contrary to law and bribery",
      "Acts outside the powers and jurisdiction of the notary office",
      "Loss from delivering deeds without entry in the office log",
    ],
    conditions: [
      "A valid appointment as chief notary or assistant notary on the date of the error",
      "Observance of identity-verification formalities and retention of office records to evidence correct performance",
      "Declaration of the office status — deed type and staff — at issuance",
      "No undisclosed claims from previous policy periods",
    ],
    documents: [
      "Appointment decree of the chief notary or the assistant-notary certificate",
      "National ID and identity documents",
      "Previous liability policy, for claims history and no-claims discount",
      "Office documents including the office number and registration code",
      "Staff identity documents, where personnel cover is included",
    ],
    buySteps: [
      {
        title: "Quotation and limit selection",
        description:
          "Submit the quote request; the office type and the approved limit are declared, and the rate is prepared accordingly.",
      },
      {
        title: "Documents and official proforma",
        description:
          "After the appointment decree and office documents are received, an official proforma invoice is issued on the approved Bimeh Iran tariffs.",
      },
      {
        title: "Premium payment",
        description:
          "Pay through the banking gateway or a bank receipt; cover starts the moment issuance is confirmed.",
      },
      {
        title: "Policy delivery",
        description:
          "The printed and electronic policy with its general conditions is delivered within one working day.",
      },
    ],
    claimSteps: [
      {
        title: "Immediate notification",
        description:
          "Report the claim to the agency as soon as it is received; the policy sets a maximum notification period of five working days.",
      },
      {
        title: "Claim form",
        description:
          "Complete and sign the claim form describing the deed under challenge and the alleged defect.",
      },
      {
        title: "Case documents",
        description:
          "Submit the office records, the identity-verification documents, the deed itself and any correspondence with the Registration Organization.",
      },
      {
        title: "Review of formalities",
        description:
          "The adjuster examines whether the verification and registration formalities were fully observed and whether the fault is attributable to the office.",
      },
      {
        title: "Agreement and payment",
        description:
          "Once liability and the amount are established, compensation is paid subject to the policy deductible.",
      },
    ],
    faqs: [
      {
        question: "Is notaries liability insurance mandatory in Iran?",
        answer:
          "Yes. Under the regulations of the Registration Organization of the country, chief notaries are required to obtain professional liability insurance covering damage arising from the office's performance. The policy compensates losses from defective deeds and incomplete identity verification up to the limit, and it is examined in the supervisory processes of notary offices.",
      },
      {
        question: "How much does notaries liability insurance cost?",
        answer:
          "The premium depends on the deed type, the approved limit of liability and the office's claims history. Higher limits required by the Registration Organization raise the rate. No figures are published here: the official proforma is issued upon official quotation after the request form is completed and the office documents are submitted.",
      },
      {
        question: "Is a loss from a forged document covered?",
        answer:
          "When the notary fully observed the identity-verification formalities and reviewed the documents, and the forgery was technically undetectable, the claim can be examined for cover. Drafting a deed with knowing breach of formalities or disregard of clear signs of forgery is excluded. The office's records play the decisive role in establishing the situation.",
      },
      {
        question: "Does the assistant notary need cover, or only the chief notary?",
        answer:
          "The primary liability toward visitors rests with the chief notary, but acts of the assistant notary within assigned duties can also create liability. The office policy usually covers the assistant notary and dependent staff within the recorded scope. Expressly naming the assistant notary in the policy is recommended.",
      },
      {
        question: "Which losses are not covered by notary office insurance?",
        answer:
          "Disciplinary penalties of the Registration Organization and the Bar Association, drafting deeds contrary to law, knowing breach of formalities, acts outside the office's jurisdiction and incidents outside the policy period are not covered. Losses from forged documents are examined against documented proof that the verification formalities were fully observed.",
      },
      {
        question: "How is liability toward third parties covered?",
        answer:
          "Persons who relied on the validity of an official deed prepared at the office and suffered damage can pursue their claim. Once the notary's fault in preparation or identity verification is proven, their loss is compensated up to the policy limit. Legal defense in such lawsuits is also covered under the general conditions.",
      },
    ],
    legalSources: [
      {
        title: "Civil Liability Act of Iran (1960)",
        reference: "Articles 1 to 11 — fault-based civil liability",
      },
      {
        title: "Iranian Insurance Act (1936)",
        reference: "Articles 12 and 30 — insurable interest and claim notification",
      },
      {
        title: "General Conditions of Professional Liability Insurance (Bimeh Iran)",
        reference: "Central Insurance Regulation No. 57",
      },
    ],
    metaTitle: "Notaries Public Liability Insurance in Iran",
    metaDescription:
      "Notaries public liability insurance in Iran: defective deeds, incomplete identity verification, third-party claims, defense costs and official quotation.",
    keywords: [
      "notaries liability insurance Iran",
      "notary public insurance Iran",
      "defective deed claim Iran",
      "notary office liability Iran",
      "identity verification liability Iran",
      "بیمه مسئولیت سردفتران اسناد رسمی",
    ],
    reviewDate: REVIEW_DATE,
  },

  // ── 21 ── it-professionals (wave 3) ──────────────────────────────
  {
    slug: "it-professionals",
    category: "professional",
    title: "IT and Cybersecurity Professionals Liability Insurance in Iran",
    nameEn: "IT and Cybersecurity Professionals Liability Insurance",
    audienceLine:
      "For independent developers, network and security specialists, software companies and technology freelancers working under written contracts.",
    answerBlock:
      "IT and cybersecurity professionals liability insurance in Iran compensates an employer's or client's financial loss caused by implementation errors, service outages and negligent data exposure, up to the policy limit, and funds the professional's legal defense in claims by employers and third parties arising from the insured technology services.",
    whoCovered: [
      "Independent software developers and programmers",
      "Network and infrastructure specialists working in companies",
      "Cybersecurity specialists and penetration testers with the relevant authorization",
      "Software and IT companies covering their members",
      "Technology consultants and IT project managers within the declared services",
      "Technology freelancers working under written service contracts",
    ],
    coverages: [
      {
        title: "Implementation and development errors",
        description:
          "Compensation of financial loss from critical bugs, defective project delivery and configuration mistakes, upon proof of the professional's fault.",
      },
      {
        title: "Service outage and data loss",
        description:
          "Cover for damage from service downtime and lost data caused by negligence, under the general conditions of the policy.",
      },
      {
        title: "Data exposure and privacy",
        description:
          "Compensation for unauthorized disclosure of user information resulting from negligent security practice, within the recorded limit.",
      },
      {
        title: "Breach of technical contract duties",
        description:
          "Cover for loss from failure to meet contractual service levels and technical obligations, upon proof of fault.",
      },
      {
        title: "Legal defense costs",
        description:
          "Attorney fees and court costs in employer and third-party claims arising from the insured event.",
      },
      {
        title: "Cyber incident response (optional)",
        description:
          "Incident response and forensic investigation costs, where a specific agreement is expressly endorsed on the policy.",
      },
    ],
    exclusions: [
      "Damage caused by the insured's own deliberate cyberattacks or collusion",
      "Incidents occurring outside the policy period; the trigger is the incident date",
      "Loss from use of software without a valid license",
      "Outages caused by hardware failure with no defect in the professional's services",
      "Internal disputes among partners and staff of the technology company",
      "Loss from failure to install announced security patches in time",
    ],
    conditions: [
      "Services delivered under written contracts recording the technical scope of duties",
      "Accurate declaration of the service type — development, networking or security — at issuance",
      "Observance of security standards and retention of logs to evidence performance",
      "No undisclosed claims from previous policy periods",
    ],
    documents: [
      "National ID and identity documents",
      "Service contract or a sample technical commitment letter",
      "Previous liability policy, for claims history and no-claims discount",
      "Company registration documents, when issued to a technology company",
      "Description of current services and projects, where required",
    ],
    buySteps: [
      {
        title: "Quotation and scope declaration",
        description:
          "Submit the quote request; the service type and contract volume are declared, and a limit of liability is proposed.",
      },
      {
        title: "Documents and official proforma",
        description:
          "After the identity and contract documents are received, an official proforma invoice is issued on the approved Bimeh Iran tariffs.",
      },
      {
        title: "Premium payment",
        description:
          "Pay through the banking gateway or a bank receipt; cover starts the moment issuance is confirmed.",
      },
      {
        title: "Policy delivery",
        description:
          "The printed and electronic policy with its general conditions is delivered within one working day.",
      },
    ],
    claimSteps: [
      {
        title: "Immediate notification",
        description:
          "Report the client's claim to the agency as soon as it is received; the policy sets a maximum notification period of five working days.",
      },
      {
        title: "Claim form",
        description:
          "Complete and sign the claim form describing the service under challenge and the alleged loss.",
      },
      {
        title: "Case documents",
        description:
          "Submit the service contracts, the technical logs and reports, the delivery records and the correspondence with the client.",
      },
      {
        title: "Technical assessment",
        description:
          "A technical expert examines whether the loss is attributable to the professional's services or to independent causes.",
      },
      {
        title: "Agreement and payment",
        description:
          "Once liability and the amount are established, compensation is paid subject to the policy deductible.",
      },
    ],
    faqs: [
      {
        question: "Does IT professionals liability insurance cover data exposure?",
        answer:
          "Exposure of user information caused by the professional's negligent security practice, such as a misconfigured server, is recoverable up to the limit when fault is proven and the cover is included. Exposure resulting from cyberattacks beyond accepted care standards or from intentional fault may be excluded under the general conditions.",
      },
      {
        question: "How much does software company liability insurance cost?",
        answer:
          "The premium is set by the service type, contract volume, selected limit of liability and claims history. Independent specialists and software companies with higher-risk contracts receive different ratings. No figures are published on this site: the final premium is issued upon official quotation after the service scope is declared.",
      },
      {
        question: "Is service downtime and data loss covered?",
        answer:
          "Damage from service downtime or lost data attributable to the professional's fault in implementation, backup or configuration is recoverable when recorded in the policy. Downtime caused by pure hardware failure, with no defect in the professional's services, is excluded under the general conditions of the policy.",
      },
      {
        question: "Is authorized penetration testing covered?",
        answer:
          "Yes. Penetration testing performed within the client's written authorization and the scope declared in the contract can be covered when it is included in the policy. Leaving the authorized scope, accessing undefined systems and acting without written consent create liability and fall under the policy exclusions.",
      },
      {
        question: "Which losses are excluded from IT liability insurance?",
        answer:
          "Loss from the insured's own deliberate cyberattacks, use of unlicensed software, outages from independent hardware failure and incidents outside the policy period are not covered. Failure to install announced security patches in time can also lead to rejection or reduction of cover under the general conditions.",
      },
      {
        question: "How does a written contract with the employer affect cover?",
        answer:
          "A written contract defines the scope of duties, deliverables and contractual service levels, and plays a decisive role in assessing fault. Without a contract, proving the specialist's scope of duties becomes difficult and their share of responsibility may be assessed higher. Documenting the service scope and limitations in writing is always recommended.",
      },
    ],
    legalSources: [
      {
        title: "Civil Liability Act of Iran (1960)",
        reference: "Articles 1 to 11 — fault-based civil liability",
      },
      {
        title: "Iranian Insurance Act (1936)",
        reference: "Articles 12 and 30 — insurable interest and claim notification",
      },
      {
        title: "General Conditions of Professional Liability Insurance (Bimeh Iran)",
        reference: "Central Insurance Regulation No. 57",
      },
    ],
    metaTitle: "IT Professionals Liability Insurance in Iran",
    metaDescription:
      "IT and cybersecurity professionals liability insurance in Iran: implementation errors, data exposure, service outages, defense costs and quotation.",
    keywords: [
      "IT professionals liability insurance Iran",
      "cybersecurity liability Iran",
      "software developer insurance Iran",
      "technology E&O Iran",
      "data exposure claim Iran",
      "بیمه مسئولیت متخصصان فناوری اطلاعات",
    ],
    reviewDate: REVIEW_DATE,
  },

  // ── 22 ── construction-operations (wave 3) ───────────────────────
  {
    slug: "construction-operations",
    category: "commercial",
    title: "Construction Operations Liability Insurance in Iran",
    nameEn: "Construction Operations Liability Insurance",
    audienceLine:
      "For owners and builders of buildings under construction, qualified executors, excavation contractors and site supervisors.",
    answerBlock:
      "Construction operations liability insurance in Iran compensates third parties for injury and property damage caused by building works such as excavation collapse, falling materials and damage to adjacent properties, and covers the owner's and builder's statutory warranty liability under Article 33 of the Engineering System Act, up to the policy limit.",
    whoCovered: [
      "Owners and builders of residential and commercial buildings under construction",
      "Qualified executors holding an Engineering System permit",
      "Construction companies and housing cooperatives",
      "Excavation and foundation contractors",
      "The site supervisor and the technical manager of the project",
    ],
    coverages: [
      {
        title: "Excavation collapse and damage to adjacent properties",
        description:
          "Compensation for damage to the structure and installations of neighboring properties caused by excavation collapse, vibration and ground settlement.",
      },
      {
        title: "Owner and builder warranty liability",
        description:
          "Cover of the consequences of non-observance of the national building regulations in the components defined by Article 33 of the Engineering System Act, within the statutory periods.",
      },
      {
        title: "Third-party bodily injury on site",
        description:
          "Diyeh and medical costs of passers-by and third parties injured by falling materials or collapse during construction.",
      },
      {
        title: "Damage to public utilities",
        description:
          "Compensation for damage to cables, pipelines and nearby oil and gas lines during excavation and execution.",
      },
      {
        title: "Legal defense costs",
        description:
          "Court costs in complaints by neighboring owners and in proceedings involving the municipality and the Engineering System Organization.",
      },
      {
        title: "Construction and post-delivery period",
        description:
          "Extension of cover from excavation to the end of the statutory warranty period, according to the policyholder's choice and the policy conditions.",
      },
    ],
    exclusions: [
      "Construction without a permit or contrary to the approved drawings",
      "The design consultant's and supervisor's liability for defective drawings, unless expressly scheduled in the policy",
      "Occupation or use of the building before the completion certificate is issued",
      "Settlement caused by neighboring excavations outside the policyholder's control",
      "Natural events such as earthquakes, unless a special endorsement is agreed",
      "Damage to the structure under construction itself, which belongs to contractors all-risk insurance",
    ],
    conditions: [
      "A valid building permit and approved drawings",
      "Use of a qualified executor with professional supervision under Article 33",
      "Notification of the excavation stage and receipt of safety advice before drilling starts",
      "No undisclosed claims from previous policy periods",
    ],
    documents: [
      "Building permit and approved drawings",
      "Construction management contract and the executor's technical-professional ID",
      "Supervisor's reports and stage approvals",
      "Identity documents of the owner or construction company",
      "Engineering System Organization inspection report, where available",
    ],
    buySteps: [
      {
        title: "Quotation and project review",
        description:
          "Submit the quote request; the permit, drawings, excavation depth and project duration are reviewed, and a limit is proposed.",
      },
      {
        title: "Documents and official proforma",
        description:
          "After the permit and supervision documents are received, an official proforma invoice is issued on the approved Bimeh Iran tariffs.",
      },
      {
        title: "Premium payment",
        description:
          "Pay through the banking gateway or a bank receipt; cover starts the moment issuance is confirmed, ideally before excavation begins.",
      },
      {
        title: "Policy delivery",
        description:
          "The printed and electronic policy with its general conditions is delivered within one working day.",
      },
    ],
    claimSteps: [
      {
        title: "Immediate notification",
        description:
          "Report the incident to the agency as soon as you become aware of it; the policy sets a maximum notification period of five working days.",
      },
      {
        title: "Claim form",
        description:
          "Complete and sign the claim form describing the incident, the damaged property and the construction stage.",
      },
      {
        title: "Case documents",
        description:
          "Submit the permit, approved drawings, supervision reports and, where prepared, the pre-excavation status report of adjacent properties.",
      },
      {
        title: "Adjuster assessment",
        description:
          "The claims adjuster examines the cause of the collapse or damage, the observance of the approved drawings and the fault of the parties.",
      },
      {
        title: "Agreement and payment",
        description:
          "Once liability and the amount are established, compensation is paid subject to the policy deductible.",
      },
    ],
    faqs: [
      {
        question: "What responsibilities does Article 33 of the Engineering System Act create?",
        answer:
          "Article 33 of the Engineering System and Building Control Act obliges the builder and the person responsible for execution to compensate the consequences of non-observance of the national building regulations in the defined components and within the statutory periods. This legal duty is the main reason owners and builders need construction operations liability insurance.",
      },
      {
        question: "How much does construction operations liability insurance cost?",
        answer:
          "The premium is estimated from the area and number of floors, structure type, excavation depth, construction value, project duration and claims history. Projects adjacent to old urban fabric or busy roads are rated differently. The official proforma is issued after the building permit and approved drawings are reviewed, and the final premium is issued upon official quotation.",
      },
      {
        question: "How is this different from contractors all-risk insurance?",
        answer:
          "Contractors all-risk insurance covers the structure under construction, materials and machinery against physical damage, while construction operations liability insurance compensates damage caused to third parties, adjacent properties and the statutory warranty obligations of Article 33. Purchasing both policies together is recommended for complete project risk coverage.",
      },
      {
        question: "Is excavation collapse damaging the neighbor's house covered?",
        answer:
          "Yes. Compensating adjacent properties is one of the main uses of this policy. When excavation collapse, vibration or ground settlement damages the neighboring building and compliance with approved drawings is documented, the loss is paid up to the policy limit. A pre-excavation status report makes the claim easier to prove.",
      },
      {
        question: "How long does the owner's and builder's liability last?",
        answer:
          "The statutory warranty of structural safety under Article 33 of the Engineering System Act lasts ten years for structural components and shorter statutory periods for other components. During these periods the owner and builder answer for damage caused by non-observance of the national building regulations, and the liability policy can cover this period.",
      },
      {
        question: "What happens if construction proceeds without a permit?",
        answer:
          "Building without a permit or contrary to approved drawings is outside the scope of cover, because liability insurance covers lawful, licensed activity. In that situation the owner and builder remain fully liable for collapse and other damage, and municipal and even criminal consequences may follow. Obtain the permit before any excavation begins.",
      },
    ],
    legalSources: [
      {
        title: "Engineering System Act of Iran",
        reference: "Adopted 1995 — Article 33 (builder's and supervisor's statutory liability)",
      },
      {
        title: "Civil Code of Iran",
        reference: "Articles 328 to 335 — guaranty and damage caused by buildings",
      },
      {
        title: "Civil Liability Act of Iran (1960)",
        reference: "Articles 1 to 11 — fault-based civil liability",
      },
    ],
    metaTitle: "Construction Operations Liability Insurance in Iran",
    metaDescription:
      "Construction operations liability insurance in Iran: excavation collapse, damage to adjacent properties, Article 33 warranty cover and official quotation.",
    keywords: [
      "construction liability insurance Iran",
      "excavation collapse insurance Iran",
      "Article 33 Engineering System Act insurance",
      "builder liability Iran",
      "adjacent property damage claim Iran",
      "بیمه مسئولیت عملیات ساختمانی",
    ],
    reviewDate: REVIEW_DATE,
  },

  // ── 23 ── property-owners (wave 3) ───────────────────────────────
  {
    slug: "property-owners",
    category: "commercial",
    title: "Property Owners Liability Insurance in Iran",
    nameEn: "Property Owners Liability Insurance",
    audienceLine:
      "For owners and occupiers of residential, commercial and office buildings, tenants and building managers.",
    answerBlock:
      "Property owners liability insurance in Iran compensates third parties for injury and property damage arising from occupied buildings, including facade collapse, falling objects, fire spreading to neighboring properties and water leakage, and can extend to the tenant's liability toward the landlord where expressly agreed, up to the policy limit.",
    whoCovered: [
      "Owners of residential, commercial and office buildings",
      "Tenants occupying properties, both personal and corporate",
      "Building managers of residential complexes",
      "Institutes and companies holding rented offices",
      "Property maintenance contractors within the occupier's scope of responsibility",
    ],
    coverages: [
      {
        title: "Facade collapse and falling objects",
        description:
          "Compensation for bodily and property damage to passers-by and vehicles caused by tiles, glass and objects falling from the facade.",
      },
      {
        title: "Fire spreading to adjacent properties",
        description:
          "Cover for fire extending from the insured building to neighboring properties, under the Civil Code rules and the policy conditions.",
      },
      {
        title: "Water leakage and damp",
        description:
          "Damage to lower units from worn pipes and defective waterproofing, where the occupier's responsibility is established.",
      },
      {
        title: "Occupier liability in common areas",
        description:
          "Cover for accidents on stairs, corridors and parking areas managed by occupiers and the building manager.",
      },
      {
        title: "Tenant liability toward the landlord",
        description:
          "Where expressly agreed, damage the tenant causes to the landlord's property is accepted as a covered item.",
      },
      {
        title: "Legal defense costs",
        description:
          "Court costs in complaints by neighbors and third parties arising from covered events.",
      },
    ],
    exclusions: [
      "Damage to the insured building itself, which belongs to property fire insurance",
      "Facade collapse and deterioration from neglected maintenance with the occupier's knowledge",
      "Unauthorized intervention in the structure and change of use without a permit",
      "Natural events such as earthquakes and floods, unless a special endorsement is agreed",
      "Damage from unauthorized commercial activity in a residential property",
      "Purely contractual disputes between landlord and tenant beyond statutory liability",
    ],
    conditions: [
      "Accurate declaration of the occupancy type, area and use of the property",
      "Observance of municipal regulations and periodic maintenance of the facade",
      "Notification of a change of occupier or use to the insurer",
    ],
    documents: [
      "Title deed or official lease of the property",
      "National ID and identity documents of the occupier",
      "Expert report on the facade and structure, where requested",
      "Copy of the completion certificate or the partition minutes",
      "Previous policy, for the no-claims discount",
    ],
    buySteps: [
      {
        title: "Quotation and property review",
        description:
          "Submit the quote request; the use, area, age and facade type of the property are declared, and a limit is proposed.",
      },
      {
        title: "Documents and official proforma",
        description:
          "After the deed or lease and identity documents are received, an official proforma invoice is issued on the approved Bimeh Iran tariffs.",
      },
      {
        title: "Premium payment",
        description:
          "Pay through the banking gateway or a bank receipt; cover starts the moment issuance is confirmed.",
      },
      {
        title: "Policy delivery",
        description:
          "The printed and electronic policy with its general conditions is delivered within one working day.",
      },
    ],
    claimSteps: [
      {
        title: "Immediate notification",
        description:
          "Report the incident to the agency as soon as you become aware of it; the policy sets a maximum notification period of five working days.",
      },
      {
        title: "Claim form",
        description:
          "Complete and sign the claim form describing the event, the damaged property and the occupancy circumstances.",
      },
      {
        title: "Case documents",
        description:
          "Submit the deed or lease, photographs, the expert report on the leak or collapse and the neighbor's claim documents.",
      },
      {
        title: "Adjuster assessment",
        description:
          "The claims adjuster establishes the cause of the damage and the occupier's or owner's responsibility.",
      },
      {
        title: "Agreement and payment",
        description:
          "Once liability and the amount are established, compensation is paid subject to the policy deductible.",
      },
    ],
    faqs: [
      {
        question: "Who is liable for damage to a neighbor — owner or tenant?",
        answer:
          "Under Articles 328 to 335 of the Civil Code, liability rests with the occupier of the property; in leased units the tenant is usually regarded as the occupier. However, facade deterioration or structural defects belong to the owner, whose liability remains. The policy can cover both roles when the details are recorded.",
      },
      {
        question: "How much does property owners liability insurance cost?",
        answer:
          "The premium depends on the property's use, area, building age, facade type, the selected limit of liability and claims history. Commercial properties and older buildings are rated differently from new residential units. The official proforma is issued by the Bimeh Iran agency after the property details and occupancy type are registered.",
      },
      {
        question: "Is the tenant's liability toward the landlord covered?",
        answer:
          "Yes. Where an endorsement is agreed, damage the tenant causes to the landlord's property can be accepted as a covered item in the policy. This cover is widely used by corporate tenants and rented offices. Its limit and conditions are set in the endorsement, and losses from intentional breach remain excluded.",
      },
      {
        question: "Is a facade collapse from visible deterioration paid?",
        answer:
          "Collapse caused by obvious deterioration and neglected maintenance with the occupier's knowledge is outside the scope of cover, because maintaining the building is the occupier's and owner's duty and the policy covers unforeseeable events. Periodic facade inspections with documented records are recommended for older buildings.",
      },
      {
        question: "Does this policy replace property fire insurance?",
        answer:
          "No. The two policies are complementary. Property fire insurance compensates damage to the insured's own building and contents, while owners liability insurance pays damage caused to third parties such as neighbors and passers-by. Cover for fire extending to adjacent properties can be examined in both policy families.",
      },
      {
        question: "What should we do if water leaks into the lower unit?",
        answer:
          "First have the leak's origin documented by a technical expert, then report the matter to the insurer. If the leak results from worn pipes or damp in the upper unit and the occupier's responsibility is proven, the neighbor's repair claim is paid under the policy conditions up to the limit. Photographs and the expert report speed up the file.",
      },
    ],
    legalSources: [
      {
        title: "Civil Code of Iran",
        reference: "Articles 328 to 335 — guaranty and damage caused by buildings",
      },
      {
        title: "Civil Liability Act of Iran (1960)",
        reference: "Articles 1 to 11 — fault-based civil liability",
      },
      {
        title: "Iranian Insurance Act (1936)",
        reference: "Article 12 — insurable interest",
      },
    ],
    metaTitle: "Property Owners Liability Insurance in Iran",
    metaDescription:
      "Property owners liability insurance in Iran: facade collapse, fire spread to neighbors, water leakage, tenant liability and official quotation.",
    keywords: [
      "property owners liability insurance Iran",
      "landlord liability insurance Iran",
      "tenant liability Iran",
      "water leakage claim Iran",
      "facade collapse insurance Iran",
      "بیمه مسئولیت مالکان و مستأجران",
    ],
    reviewDate: REVIEW_DATE,
  },

  // ── 24 ── sports-facilities (wave 3) ─────────────────────────────
  {
    slug: "sports-facilities",
    category: "commercial",
    title: "Sports Facilities Liability Insurance in Iran",
    nameEn: "Sports Facilities Liability Insurance",
    audienceLine:
      "For operators of pools, gyms, water parks, sports halls and academies holding an operating license.",
    answerBlock:
      "Sports facilities liability insurance in Iran compensates members and visitors for injury caused by pool accidents, defective equipment and inadequate supervision, and covers damage to visitors' property and neighboring premises, up to the policy limit, where the operator's failure to observe safety and maintenance duties is established.",
    whoCovered: [
      "Managers of public and semi-public pools holding an operating license",
      "Urban gyms and sports clubs",
      "Recreational complexes, amusement parks and water parks",
      "Football fields, sports halls and sports academies",
      "Companies managing and operating sports centers",
    ],
    coverages: [
      {
        title: "Drowning and pool accidents",
        description:
          "Diyeh and medical costs of visitors injured by drowning, slipping or impact within the pool area, where safety conditions are observed.",
      },
      {
        title: "Damage from inadequate maintenance",
        description:
          "Cover for injury caused by defective gym equipment, faulty flooring and inadequate site lighting.",
      },
      {
        title: "Sports injury to third parties",
        description:
          "Compensation for injury to spectators and visitors not participating in the sporting activity.",
      },
      {
        title: "Damage to visitors' property",
        description:
          "Cover for damage to vehicles in the parking area and personal belongings within the facility's scope of responsibility.",
      },
      {
        title: "Damage to adjacent properties",
        description:
          "Cover for water leakage and damage caused by the facility's activity to neighboring premises.",
      },
      {
        title: "Legal defense costs",
        description:
          "Court costs in complaints by visitors and proceedings of supervisory authorities.",
      },
    ],
    exclusions: [
      "Inherent injuries of sports competitions among athletes aware of the risk",
      "Use of the facilities without a lifeguard present or outside permitted hours",
      "Operation of the facility without a license and safety approval of the competent authorities",
      "Damage to the facility's own equipment, which belongs to property insurance",
      "Accidents caused by the consumption of prohibited substances on the premises",
      "Natural events such as earthquakes and floods, unless a special endorsement is agreed",
    ],
    conditions: [
      "A valid operating license and safety approval",
      "A certified lifeguard and rescue equipment according to the regulations",
      "Warning signs and posted rules for the use of the facilities",
    ],
    documents: [
      "Operating license from the Ministry of Sports and Youth",
      "Lifeguard certificate and trainer documents",
      "Identity documents and the facility's articles of association",
      "List of equipment and admission capacity",
      "Previous policy and incident records",
    ],
    buySteps: [
      {
        title: "Quotation and facility review",
        description:
          "Submit the quote request; the facility type, capacity and water sections are declared, and a limit of liability is proposed.",
      },
      {
        title: "Documents and official proforma",
        description:
          "After the operating license and safety documents are received, an official proforma invoice is issued on the approved Bimeh Iran tariffs.",
      },
      {
        title: "Premium payment",
        description:
          "Pay through the banking gateway or a bank receipt; cover starts the moment issuance is confirmed.",
      },
      {
        title: "Policy delivery",
        description:
          "The printed and electronic policy with its general conditions is delivered within one working day.",
      },
    ],
    claimSteps: [
      {
        title: "Immediate notification",
        description:
          "Report the incident to the agency as soon as you become aware of it; the policy sets a maximum notification period of five working days.",
      },
      {
        title: "Claim form",
        description:
          "Complete and sign the claim form describing the accident, the injured person and the facility section involved.",
      },
      {
        title: "Case documents",
        description:
          "Submit the operating license, lifeguard shift records, equipment maintenance log and the injured person's medical documents.",
      },
      {
        title: "Adjuster assessment",
        description:
          "The claims adjuster examines the observance of safety standards, supervision and maintenance, and establishes the facility's responsibility.",
      },
      {
        title: "Agreement and payment",
        description:
          "Once liability and the amount are established, compensation is paid subject to the policy deductible.",
      },
    ],
    faqs: [
      {
        question: "Who is liable for a drowning accident in a swimming pool?",
        answer:
          "The liability of the pool and its operator is determined under Articles 328 to 335 of the Civil Code and the safety standards. A certified lifeguard, depth markers, warning signs and water quality are the indicators of observing the duty of care. If the facility's shortfall is proven, diyeh and medical costs are paid up to the policy limit.",
      },
      {
        question: "How much does swimming pool liability insurance cost?",
        answer:
          "The premium is calculated from the facility type, daily admission capacity, the presence of a water section, pool depth, the selected limit of liability and claims history. Public pools and water parks accept higher rates than gyms. The official proforma is issued after the operating license and safety information are reviewed by the agency.",
      },
      {
        question: "Are natural sports injuries covered?",
        answer:
          "No. Inherent injuries of sports competition among athletes aware of the risk are outside the scope of liability insurance. The policy addresses the facility's shortfall in safety, equipment maintenance and supervision. Injuries to non-participating spectators and visitors, and injuries caused by defective equipment, are the main recoverable cases.",
      },
      {
        question: "What happens if the lifeguard is absent during an accident?",
        answer:
          "The presence of a certified lifeguard during operating hours is a core safety standard for pools. If an accident occurs while the lifeguard is absent, the facility's failure to observe the duty of care is established and full liability rests with the management. Documentation of the absence and the circumstances shapes the claim assessment.",
      },
      {
        question: "Are water parks and playgrounds also insurable?",
        answer:
          "Yes. Licensed water parks, amusement parks and recreational complexes can be covered when their details are recorded in the policy. Because of visitor density and the variety of devices, they usually require a higher limit of liability. Device safety standards, periodic technical inspection and supervising staff are core conditions of valid cover.",
      },
      {
        question: "How does this differ from athletes accident insurance?",
        answer:
          "Athletes accident insurance compensates the athlete's personal injury directly, without proof of fault, while sports facilities liability insurance covers the management's civil liability toward visitors and requires proof of a safety or supervision shortfall. Professional facilities are advised to hold both policies so that athletes and visitors are protected together.",
      },
    ],
    legalSources: [
      {
        title: "Civil Code of Iran",
        reference: "Articles 328 to 335 — guaranty and damage caused by property",
      },
      {
        title: "Civil Liability Act of Iran (1960)",
        reference: "Articles 1 to 11 — fault-based civil liability",
      },
      {
        title: "Iranian Insurance Act (1936)",
        reference: "Article 12 — insurable interest",
      },
    ],
    metaTitle: "Sports Facilities Liability Insurance in Iran",
    metaDescription:
      "Sports facilities liability insurance in Iran: pool accidents, defective equipment, visitor injuries, lifeguard duties and official quotation.",
    keywords: [
      "sports facility liability insurance Iran",
      "swimming pool liability Iran",
      "gym liability insurance Iran",
      "water park insurance Iran",
      "visitor injury claim Iran",
      "بیمه مسئولیت مراکز ورزشی",
    ],
    reviewDate: REVIEW_DATE,
  },

  // ── 25 ── billboards (wave 3) ────────────────────────────────────
  {
    slug: "billboards",
    category: "commercial",
    title: "Billboard Liability Insurance in Iran",
    nameEn: "Billboard Liability Insurance",
    audienceLine:
      "For companies producing and installing urban billboards, illuminated signs and roadside advertising structures.",
    answerBlock:
      "Billboard liability insurance in Iran compensates third parties for bodily injury and property damage caused by the fall of advertising structures such as hoardings, illuminated signs and roadside panels, including damage to vehicles, adjacent buildings and accidents during installation and repair, up to the policy limit, subject to valid municipal permits.",
    whoCovered: [
      "Companies producing and installing urban billboards and hoardings",
      "Owners of illuminated signs and advertising showcases",
      "Operators of advertising structures along roads and highways",
      "Advertising units of commercial centers and exhibition venues",
      "Contractors installing and maintaining advertising structures",
    ],
    coverages: [
      {
        title: "Collapse of the structure and panel",
        description:
          "Compensation for bodily and property damage caused by the fall of the structure, the panel and parts of the billboard on third parties.",
      },
      {
        title: "Damage to vehicles",
        description:
          "Cover for damage to parked or moving vehicles within the fall radius of the advertising structure.",
      },
      {
        title: "Damage to adjacent properties",
        description:
          "Compensation for damage to the facade and structure of neighboring buildings caused by the fall of the advertising structure.",
      },
      {
        title: "Accidents during installation and repair",
        description:
          "Cover for accidents during the installation, repair and relocation of structures, within the policy conditions.",
      },
      {
        title: "Wind and storm damage",
        description:
          "Where an endorsement is agreed, damage from wind within the speed declared in the policy conditions is covered.",
      },
      {
        title: "Legal defense costs",
        description:
          "Court costs in complaints by third parties, the municipality and the road maintenance organization.",
      },
    ],
    exclusions: [
      "Structures installed without a municipal permit or in prohibited routes",
      "Corrosion of the structure with the owner's knowledge and without timely repair",
      "Damage to the advertising structure and panel itself",
      "Natural events beyond the wind speed declared in the policy",
      "Structures without a valid technical inspection certificate",
      "Damage from unauthorized loading on the structure with the operator's knowledge",
    ],
    conditions: [
      "A valid municipal or road maintenance permit for each structure",
      "Periodic technical inspection of the structures and documented maintenance",
      "Declaration of the number, dimensions and exact location of the structures at issuance",
    ],
    documents: [
      "Municipal or road maintenance permit of the structure",
      "Technical drawing of the structure and the inspection certificate",
      "Identity documents and the company's business license",
      "List of the structures' locations",
      "Previous policy and incident records",
    ],
    buySteps: [
      {
        title: "Quotation and structure list",
        description:
          "Submit the quote request; the number, dimensions and locations of the structures are declared, and a limit is proposed.",
      },
      {
        title: "Documents and official proforma",
        description:
          "After the permits and technical documents are received, an official proforma invoice is issued on the approved Bimeh Iran tariffs.",
      },
      {
        title: "Premium payment",
        description:
          "Pay through the banking gateway or a bank receipt; cover starts the moment issuance is confirmed.",
      },
      {
        title: "Policy delivery",
        description:
          "The printed and electronic policy with its general conditions is delivered within one working day.",
      },
    ],
    claimSteps: [
      {
        title: "Immediate notification",
        description:
          "Report the incident to the agency as soon as you become aware of it; the policy sets a maximum notification period of five working days.",
      },
      {
        title: "Claim form",
        description:
          "Complete and sign the claim form describing the collapse, the damaged property and the structure involved.",
      },
      {
        title: "Case documents",
        description:
          "Submit the municipal permit, the technical inspection certificate, photographs of the site and the claimants' documents.",
      },
      {
        title: "Adjuster assessment",
        description:
          "The claims adjuster examines the structure's maintenance record, the wind conditions and the fault of the parties.",
      },
      {
        title: "Agreement and payment",
        description:
          "Once liability and the amount are established, compensation is paid subject to the policy deductible.",
      },
    ],
    faqs: [
      {
        question: "Who is liable when a billboard falls?",
        answer:
          "Liability rests with the operator and the owner of the structure as its possessor, and the manufacturer and installation contractor may also be held responsible when defective execution or maintenance is proven. The legal basis is Articles 328 to 335 of the Civil Code, and damage to passers-by, vehicles and adjacent buildings is compensated up to the policy limit.",
      },
      {
        question: "How is billboard liability insurance priced?",
        answer:
          "The premium is calculated from the number, dimensions and height of the structures, their location, the structure type, the selected limit of liability and claims history. Highway and rooftop billboards carry higher risk. Companies owning several structures can issue a group policy, and the official proforma is prepared from the list of locations and permits.",
      },
      {
        question: "Is storm and strong wind damage covered?",
        answer:
          "Cover for wind and storm damage depends on the policy conditions and the declared wind speed, and it is usually extendable by a specific endorsement. In every case, the structure's strength according to the standard is a condition of valid cover; a corroded or uninspected structure risks rejection even in ordinary wind.",
      },
      {
        question: "What is the situation of structures without a municipal permit?",
        answer:
          "Installing a billboard without a municipal or road maintenance permit places the activity outside the legal framework, and at the time of the accident there is a risk of claim rejection. Liability insurance covers lawful, documented activity. Verify each structure's permit before issuance and declare the list of locations precisely.",
      },
      {
        question: "Is the installation and repair period covered?",
        answer:
          "Yes. Accidents during the installation, repair and relocation of structures can be covered within the policy conditions and are among the most frequent risks in this field. For installers working at height, employers liability insurance should also be purchased as a complement. The precise conditions are set in the agreed endorsements.",
      },
      {
        question: "Is a claim paid when the structure is corroded?",
        answer:
          "Obvious corrosion of the structure with the operator's knowledge and without timely repair is outside the scope of cover, because documented maintenance is the operator's duty and the policy compensates events not attributable to the insured's shortcoming. Periodic technical inspection, the supervising engineer's report and the repair history are the key documents determining cover.",
      },
    ],
    legalSources: [
      {
        title: "Civil Code of Iran",
        reference: "Articles 328 to 335 — guaranty and damage caused by structures",
      },
      {
        title: "Civil Liability Act of Iran (1960)",
        reference: "Articles 1 to 11 — fault-based civil liability",
      },
      {
        title: "Iranian Insurance Act (1936)",
        reference: "Article 30 — five-day claim notification",
      },
    ],
    metaTitle: "Billboard Liability Insurance in Iran",
    metaDescription:
      "Billboard liability insurance in Iran: falling advertising structures, damage to vehicles and buildings, installation accidents and official quotation.",
    keywords: [
      "billboard liability insurance Iran",
      "advertising structure insurance Iran",
      "sign fall claim Iran",
      "urban billboard insurance Iran",
      "outdoor advertising liability Iran",
      "بیمه مسئولیت بیلبورد",
    ],
    reviewDate: REVIEW_DATE,
  },

  // ── 26 ── fire-third-party (wave 3) ──────────────────────────────
  {
    slug: "fire-third-party",
    category: "commercial",
    title: "Fire Third-Party Liability Insurance in Iran",
    nameEn: "Fire Third-Party Liability Insurance",
    audienceLine:
      "For owners and occupiers of residential, commercial, office and industrial units and warehouses liable for fire spreading to neighbors.",
    answerBlock:
      "Fire third-party liability insurance in Iran compensates neighboring properties and third parties for damage caused by fire, smoke, soot and firefighting water spreading from the insured unit, including gas explosions within the unit, up to the policy limit; damage to the insured's own property belongs to property fire insurance instead.",
    whoCovered: [
      "Owners and occupiers of residential and apartment units",
      "Owners of commercial, office and industrial units",
      "Managers of buildings and multi-unit complexes",
      "Mass builders during the maintenance period of delivered projects",
      "Operators of warehouses and sheds storing goods",
    ],
    coverages: [
      {
        title: "Fire damage to adjacent properties",
        description:
          "Compensation for damage to the structure and installations of neighboring properties caused by fire spreading from the insured unit.",
      },
      {
        title: "Smoke and soot damage",
        description:
          "Cover for cleaning and repair costs caused by fire soot and smoke to third-party properties.",
      },
      {
        title: "Firefighting water",
        description:
          "Compensation for water damage to adjacent and lower units caused by firefighting operations.",
      },
      {
        title: "Third-party bodily injury",
        description:
          "Cover for diyeh and medical costs of third parties injured by the covered fire incident.",
      },
      {
        title: "Gas explosion within the unit",
        description:
          "Cover of explosions of city gas and cylinders within the insured unit, according to the policy conditions.",
      },
      {
        title: "Legal defense costs",
        description:
          "Court costs in complaints by neighbors and judicial proceedings arising from the fire incident.",
      },
    ],
    exclusions: [
      "Damage to the insured unit itself and the policyholder's own assets",
      "Fires arising from unauthorized storage of flammable and explosive materials",
      "Fires caused by knowing breach of safety regulations and faulty installation of utilities",
      "Natural events such as earthquakes and floods, unless a special endorsement is agreed",
      "Damage from war operations and strikes",
      "Units whose real use was not declared to the insurer",
    ],
    conditions: [
      "Accurate declaration of the unit's use and activity at issuance",
      "Observance of the fire safety regulations of the municipality and the fire department",
      "Periodic servicing of gas and electrical installations by authorized persons",
    ],
    documents: [
      "Title deed or lease of the unit",
      "National ID and identity documents of the policyholder",
      "Fire safety certificate for commercial and industrial units",
      "Use, area and number of units",
      "Previous policy, for the no-claims discount",
    ],
    buySteps: [
      {
        title: "Quotation and unit review",
        description:
          "Submit the quote request; the use, area and activity of the unit are declared, and a limit of liability is proposed.",
      },
      {
        title: "Documents and official proforma",
        description:
          "After the deed or lease and identity documents are received, an official proforma invoice is issued on the approved Bimeh Iran tariffs.",
      },
      {
        title: "Premium payment",
        description:
          "Pay through the banking gateway or a bank receipt; cover starts the moment issuance is confirmed.",
      },
      {
        title: "Policy delivery",
        description:
          "The printed and electronic policy with its general conditions is delivered within one working day.",
      },
    ],
    claimSteps: [
      {
        title: "Immediate notification",
        description:
          "Report the incident to the agency as soon as you become aware of it; the policy sets a maximum notification period of five working days.",
      },
      {
        title: "Claim form",
        description:
          "Complete and sign the claim form describing the fire, its suspected origin and the damaged properties.",
      },
      {
        title: "Case documents",
        description:
          "Submit the deed or lease, photographs, the fire department report where issued and the neighbors' claim documents.",
      },
      {
        title: "Adjuster assessment",
        description:
          "The claims adjuster establishes the origin and spread of the fire and the responsibility of the insured unit.",
      },
      {
        title: "Agreement and payment",
        description:
          "Once liability and the amount are established, compensation is paid subject to the policy deductible.",
      },
    ],
    faqs: [
      {
        question: "How does fire third-party liability differ from ordinary fire insurance?",
        answer:
          "Ordinary fire insurance compensates the policyholder's own property, such as the building and contents, while fire third-party liability insurance pays the damage that fire, smoke or firefighting water causes to adjacent properties and third parties. The product is issued independently and matters most for adjoining units in shared buildings.",
      },
      {
        question: "How much does fire liability insurance cost?",
        answer:
          "The premium depends on the unit's use, area, type of activity, the selected limit of liability and claims history. Industrial units and storerooms holding flammable materials are rated differently from residential units. The exact amount appears in the official proforma issued by the Bimeh Iran agency after the property details are registered.",
      },
      {
        question: "Is a gas explosion covered?",
        answer:
          "Yes. Explosion of piped city gas and gas cylinders within the insured unit is coverable under the policy conditions, and the resulting damage to adjacent properties and third parties is compensated. Explosions arising from unauthorized storage of explosive materials are excluded. The precise explosion cover terms are set in the general conditions.",
      },
      {
        question: "Is damage to the insured's own unit paid?",
        answer:
          "No. This policy compensates only damage caused to third parties and adjacent properties. Damage to the insured unit itself, its contents and the policyholder's property belongs to property fire insurance. For complete fire protection, issuing both policies together is recommended so that both property and third-party liability are covered.",
      },
      {
        question: "What if the fire starts from flammable storage?",
        answer:
          "Storing unauthorized flammable and explosive materials in the unit is outside the scope of cover, and if an incident occurs, full liability for third-party damage rests with the occupier. Keeping combustible materials within permitted quantities and fire department rules is a core condition of valid cover, along with declaring the unit's true use at issuance.",
      },
      {
        question: "Is this policy issued for industrial units too?",
        answer:
          "Yes. Industrial units, warehouses and sheds can also be insured, although the risk assessment is more detailed because of fuel and raw materials. Holding a fire safety certificate and active alarm and suppression systems both reduces the probability of an incident and positively affects the premium calculation at official quotation.",
      },
    ],
    legalSources: [
      {
        title: "Iranian Insurance Act (1936)",
        reference: "Articles 12 and 30 — insurable interest and claim notification",
      },
      {
        title: "Civil Code of Iran",
        reference: "Articles 328 to 335 — guaranty and damage caused by property",
      },
      {
        title: "Civil Liability Act of Iran (1960)",
        reference: "Articles 1 to 11 — fault-based civil liability",
      },
    ],
    metaTitle: "Fire Third-Party Liability Insurance in Iran",
    metaDescription:
      "Fire third-party liability insurance in Iran: fire, smoke and firefighting water damage to neighbors, gas explosion cover and official quotation.",
    keywords: [
      "fire third party liability Iran",
      "fire liability insurance Iran",
      "fire spread to neighbor claim Iran",
      "gas explosion liability Iran",
      "apartment fire liability Iran",
      "بیمه مسئولیت آتش‌سوزی ثالث",
    ],
    reviewDate: REVIEW_DATE,
  },

  // ── 27 ── directors-officers (wave 3) ────────────────────────────
  {
    slug: "directors-officers",
    category: "corporate",
    title: "Directors and Officers (D&O) Liability Insurance in Iran",
    nameEn: "Directors & Officers (D&O) Liability Insurance",
    audienceLine:
      "For board members, chief executives and senior managers of joint-stock, listed, knowledge-based and holding companies.",
    answerBlock:
      "Directors and officers liability insurance in Iran covers the personal liability of board members and executives for claims arising from managerial decisions, breaches of the duty of care and disclosure disputes, including shareholder lawsuits and regulatory proceedings, and funds the legal defense costs, up to the policy limit, excluding proven intentional fraud.",
    whoCovered: [
      "Board members and chief executives of public and private joint-stock companies",
      "Non-executive directors and independent board members",
      "Companies admitted to the stock exchange and over-the-counter market subject to corporate governance rules",
      "Directors of startups, knowledge-based companies and investment holdings",
      "Other senior staff with managerial responsibility within the agreed scope of cover",
    ],
    coverages: [
      {
        title: "Shareholder and stakeholder claims",
        description:
          "Cover of defense costs and damages in minority shareholder lawsuits, claims of harm to share value and disputes over assembly resolutions.",
      },
      {
        title: "Breach of managerial duties",
        description:
          "Cover of claims arising from decisions contrary to regulations and breaches of the duty of care and supervision, excluding documented intentional breach.",
      },
      {
        title: "Legal defense costs",
        description:
          "Attorney fees and court costs before judicial authorities, the Securities and Exchange Organization and other regulatory bodies, even in dismissed claims.",
      },
      {
        title: "Reporting and disclosure liability",
        description:
          "Cover of claims arising from financial reporting and information disclosure, conditional on the absence of documented intentional fraud.",
      },
      {
        title: "Company cover and prior periods",
        description:
          "Within the agreed framework, claims brought against the company and events of prior periods are covered with uninterrupted renewal.",
      },
    ],
    exclusions: [
      "Intentional crimes, documented fraud and personal misappropriation of company assets",
      "Private dealings of a director outside the scope of duties for personal gain",
      "Claims presented before the start of cover and already known to the director",
      "Criminal fines and final criminal penalties",
      "Loss from withholding information or intentional non-disclosure of records to the insurer",
      "Director-versus-director claims within the same company, unless expressly scheduled",
    ],
    conditions: [
      "Formal registration of the company and declaration of the full management structure at issuance",
      "Accurate declaration of the financial statements and of current and past claims",
      "Immediate notification of any claim or warning letter received, within the policy deadline",
    ],
    documents: [
      "Company registration notice and latest changes from the Companies Registration Office",
      "Latest audited financial statements of the company",
      "List of directors, the chief executive and positions with national ID numbers",
      "Latest D&O policy, for claims history and prior-period cover",
      "Recent assembly and board minutes, where the adjuster requires them",
    ],
    buySteps: [
      {
        title: "Quotation with financial statements",
        description:
          "Submit the quote request together with the latest financial statements and the list of directors; a limit is proposed accordingly.",
      },
      {
        title: "Underwriting review",
        description:
          "The insurer reviews the industry, governance structure and claims history, and issues an official proforma invoice.",
      },
      {
        title: "Premium payment",
        description:
          "Pay through the banking gateway or a bank receipt; cover starts the moment issuance is confirmed.",
      },
      {
        title: "Policy delivery",
        description:
          "The printed and electronic policy with its general conditions is delivered within one working day.",
      },
    ],
    claimSteps: [
      {
        title: "Immediate notification",
        description:
          "Report any claim, demand letter or regulatory notice to the agency as soon as it is received; late notification can complicate cover.",
      },
      {
        title: "Claim form and documents",
        description:
          "Complete the claim form and submit the demand, summons or regulator letter together with the relevant resolutions and minutes.",
      },
      {
        title: "Defense coordination",
        description:
          "The insurer coordinates the selection of counsel; attorney fees and court costs are advanced within the policy limit.",
      },
      {
        title: "Assessment of the claim",
        description:
          "The adjuster examines the decision under challenge, the documentation and the exclusions, including intentional fraud.",
      },
      {
        title: "Settlement or judgment",
        description:
          "Compensation or a settlement is paid within the policy limit after liability is established; criminal fines remain excluded.",
      },
    ],
    faqs: [
      {
        question: "How is directors and officers (D&O) insurance priced?",
        answer:
          "The premium is determined by the company's size, capital, the number of directors, the industry and the risk level of the financial statements. Listed companies and industries with higher claim exposure receive different ratings. For an accurate estimate, the request is submitted with the latest financial statements and the list of directors, and the official proforma is issued.",
      },
      {
        question: "Which claims are not covered by D&O insurance?",
        answer:
          "Claims arising from documented intentional fraud, personal misappropriation of company assets and private dealings of a director outside the scope of duties are not covered. Claims presented before the policy started and already known to the director are also excluded. Criminal fines and penalties remain outside the cover under the general conditions.",
      },
      {
        question: "Are minority shareholder lawsuits covered?",
        answer:
          "Yes. Lawsuits by minority shareholders over damage to share value or breaches in general assembly resolutions are among the most common D&O claims. The condition for applying cover is the connection between the claim and managerial decisions taken during the policy period. Documenting resolutions and minutes plays a decisive role in establishing the facts.",
      },
      {
        question: "Is D&O insurance mandatory for listed companies in Iran?",
        answer:
          "For companies admitted to the Tehran Stock Exchange and the over-the-counter market, approving directors liability insurance in the general assembly is recommended as a corporate governance requirement and becomes mandatory in some industries. Even without compulsion, the cover protects directors' personal assets against shareholder and regulator claims.",
      },
      {
        question: "Is a director relying on an expert report still liable?",
        answer:
          "Relying on an official expert's report or an independent auditor is a factor supporting the director's good faith, but it does not justify responsibility absolutely. If the director adopts a defective report without reasonable review, a breach of the duty of care can be alleged. The policy funds the legal defense in such files up to the limit.",
      },
      {
        question: "Does D&O cover former directors too?",
        answer:
          "If the claim concerns decisions taken during the policy period, former directors are also within the scope of cover. This feature, known as cover for past directors, is stated in the general conditions. Companies are advised to confirm, in writing, the coverage status of departing directors with the insurer when board changes occur.",
      },
    ],
    legalSources: [
      {
        title: "Amendment of Parts of the Commercial Code Act (1968)",
        reference: "Article 143 — directors' duty of care toward the company and third parties",
      },
      {
        title: "Civil Liability Act of Iran (1960)",
        reference: "Articles 1 to 11 — fault-based civil liability",
      },
      {
        title: "Iranian Insurance Act (1936)",
        reference: "General provisions on liability insurance",
      },
      {
        title: "General Conditions of Liability Insurance",
        reference: "Central Insurance Regulation No. 57",
      },
    ],
    metaTitle: "D&O Liability Insurance in Iran | Directors & Officers",
    metaDescription:
      "Directors and officers (D&O) liability insurance in Iran: shareholder claims, duty-of-care breaches, defense costs, exclusions and official quotation.",
    keywords: [
      "D&O insurance Iran",
      "directors and officers liability Iran",
      "board member liability Iran",
      "shareholder lawsuit insurance Iran",
      "corporate governance insurance Iran",
      "بیمه مسئولیت مدیران",
      "بیمه D&O",
    ],
    reviewDate: REVIEW_DATE,
  },

  // ── 28 ── cyber-liability (wave 3) ───────────────────────────────
  {
    slug: "cyber-liability",
    category: "corporate",
    title: "Cyber Liability and Data Breach Insurance in Iran",
    nameEn: "Cyber Liability & Data Breach Insurance",
    audienceLine:
      "For online shops, service platforms, fintech and software companies and any business processing customer data.",
    answerBlock:
      "Cyber liability insurance in Iran compensates customers and third parties for damage caused by unauthorized disclosure of personal data, ransomware attacks and service interruption, and covers notification, forensic investigation and data recovery costs, plus legal defense in data claims, up to the policy limit, in line with the E-Commerce Act duties.",
    whoCovered: [
      "Online shops and businesses processing customer data",
      "Service platforms, technology startups and software companies",
      "Companies with online payment systems and small financial institutions",
      "Educational and medical centers holding electronic records of their visitors",
      "Accounting, legal and consulting firms holding confidential client information",
    ],
    coverages: [
      {
        title: "Personal data breach and disclosure",
        description:
          "Compensation of third parties and customers for unauthorized disclosure of personal data, including notification costs and trust-rebuilding measures.",
      },
      {
        title: "Cyberattacks and service interruption",
        description:
          "Losses from ransomware attacks, denial-of-service attacks and interruption or disruption of services, under the general conditions.",
      },
      {
        title: "Notification and data recovery costs",
        description:
          "Costs of notifying data owners, security forensics and recovery of damaged data after the incident.",
      },
      {
        title: "Legal defense and stakeholder claims",
        description:
          "Attorney fees and court costs in customer lawsuits and claims arising from data violations, even in dismissed claims.",
      },
      {
        title: "Electronic Commerce Act compliance",
        description:
          "Cover of the costs of responding to supervisory authorities and observing the duties of Article 58 of the Electronic Commerce Act, excluding monetary fines.",
      },
    ],
    exclusions: [
      "Damage caused by deliberate manipulation or fraud by the insured's own staff",
      "Disruption from documented and knowing disregard of expert security warnings",
      "Monetary fines and penalties transferable to a person",
      "Claims arising from a security flaw existing before the start of cover and known to the insured",
      "Physical theft of equipment and purely hardware damage",
    ],
    conditions: [
      "Authorized processing of personal data in line with the Electronic Commerce Act duties",
      "Implementation of minimum security measures such as encryption and incident logging",
      "Accurate declaration of the volume and type of processed customer data at issuance",
    ],
    documents: [
      "Business license, official gazette or company registration documents",
      "Description of the systems and the types of processed customer data",
      "Latest security assessment or penetration test report, where available",
      "Latest liability policy, for claims history",
      "Privacy policy and key service contracts",
    ],
    buySteps: [
      {
        title: "Quotation and system review",
        description:
          "Submit the quote request; the systems and the type and volume of processed data are declared, and a limit is proposed.",
      },
      {
        title: "Documents and official proforma",
        description:
          "After the registration documents and system descriptions are received, an official proforma invoice is issued on the approved Bimeh Iran tariffs.",
      },
      {
        title: "Premium payment",
        description:
          "Pay through the banking gateway or a bank receipt; cover starts the moment issuance is confirmed.",
      },
      {
        title: "Policy delivery",
        description:
          "The printed and electronic policy with its general conditions is delivered within one working day.",
      },
    ],
    claimSteps: [
      {
        title: "Immediate notification",
        description:
          "Report the incident to the agency immediately after discovery, within the notification deadline set by the policy.",
      },
      {
        title: "Claim form",
        description:
          "Complete and sign the claim form describing the incident, the affected data and the systems involved.",
      },
      {
        title: "Case documents",
        description:
          "Submit the system logs, the incident report, the security assessment and the correspondence with affected customers.",
      },
      {
        title: "Forensic and legal assessment",
        description:
          "Security forensics establish the scope of the breach, and the adjuster examines the policy conditions and exclusions.",
      },
      {
        title: "Notification coordination",
        description:
          "Notification of data owners is coordinated with the insurer and made in line with the legal duties.",
      },
      {
        title: "Agreement and payment",
        description:
          "Once liability and the amount are established, compensation and recovery costs are paid subject to the policy deductible.",
      },
    ],
    faqs: [
      {
        question: "How much does cyber liability insurance cost?",
        answer:
          "The premium is determined by the volume and sensitivity of processed data, the number of users, the security posture of the systems and the selected limit of liability. Small online shops pay less than data-driven platforms. For an exact rate, the request is registered with a description of the systems, and the official proforma is issued.",
      },
      {
        question: "Which events are excluded from cyber insurance?",
        answer:
          "Damage caused by deliberate manipulation or fraud by the insured's own staff, disruption from documented and knowing disregard of security warnings, and monetary penalties of convictions are not covered. A security flaw existing before the policy started and known to the insured is also excluded. Reading the general conditions before issuance is essential.",
      },
      {
        question: "What is the duty under Article 58 of the E-Commerce Act?",
        answer:
          "Article 58 of the Electronic Commerce Act places personal data and information containing the secrets of individuals' lives under protection and prohibits any invasion of them. Violating this duty can ground compensation claims by the affected persons. Cyber liability insurance funds the legal defense and compensates the damage from such invasion up to the limit.",
      },
      {
        question: "What should we do after discovering a data breach?",
        answer:
          "Isolate the affected system, preserve the evidence and log reports, and report the event to the agency immediately. Notification of data owners must be coordinated with the insurer and made in line with legal duties. Arbitrary actions such as wiping servers or negotiating independently with the attacker can complicate the recovery of the loss.",
      },
      {
        question: "Is a ransomware attack covered?",
        answer:
          "Depending on the policy conditions, losses from a ransomware attack, including system recovery costs and defense in claims by affected parties, are coverable. Paying a ransom usually requires the insurer's prior consent, and there is no guarantee that the data will be returned. The precise terms are set in the policy's special conditions.",
      },
      {
        question: "Does a small business also need cyber insurance?",
        answer:
          "Small businesses are frequent targets of automated ransomware attacks because of weaker security layers, and a customer data breach can end in heavy lawsuits and the loss of trust. The premium of this cover for small businesses is set in proportion to the data volume and usually does not create a considerable cost.",
      },
    ],
    legalSources: [
      {
        title: "Electronic Commerce Act of Iran (2004)",
        reference: "Article 58 — protection of personal data",
      },
      {
        title: "Civil Liability Act of Iran (1960)",
        reference: "Articles 1 to 11 — fault-based civil liability",
      },
      {
        title: "General Conditions of Liability Insurance",
        reference: "Central Insurance Regulation No. 57",
      },
    ],
    metaTitle: "Cyber Liability and Data Breach Insurance in Iran",
    metaDescription:
      "Cyber liability and data breach insurance in Iran: personal data leaks, ransomware, E-Commerce Act duties, defense costs and official quotation.",
    keywords: [
      "cyber liability insurance Iran",
      "data breach insurance Iran",
      "ransomware coverage Iran",
      "personal data leak claim Iran",
      "E-Commerce Act Article 58 Iran",
      "بیمه مسئولیت سایبری",
    ],
    reviewDate: REVIEW_DATE,
  },

  // ── 29 ── individuals-family (wave 3) ────────────────────────────
  {
    slug: "individuals-family",
    category: "public",
    title: "Personal and Family Liability Insurance in Iran",
    nameEn: "Personal & Family Liability Insurance",
    audienceLine:
      "For parents, legal guardians and households liable for damage caused by minor children and everyday incidents.",
    answerBlock:
      "Personal and family liability insurance in Iran compensates third parties for bodily and property damage caused by minor children under the guardian's supervision and by everyday household incidents, including diyeh and legal defense costs, up to the policy limit; it is one of the most affordable liability covers for Iranian households.",
    whoCovered: [
      "Parents and legal guardians of minor children",
      "Court-appointed guardians and legal custodians",
      "Households liable for everyday damage caused to third parties",
      "Supervisors of school trips and group children's activities, where expressly scheduled",
      "Tenants and urban and rural households, with no occupational restriction",
    ],
    coverages: [
      {
        title: "Third-party bodily injury",
        description:
          "Compensation of diyeh and medical costs of persons injured by the improper acts or keeping of minor children, on the diyeh schedule of the incident year.",
      },
      {
        title: "Third-party property damage",
        description:
          "Compensation of damage to neighbors' and third parties' property caused by children under supervision.",
      },
      {
        title: "Legal defense costs",
        description:
          "Attorney fees and court costs in lawsuits brought against the guardian, even in dismissed claims.",
      },
      {
        title: "Home and public spaces",
        description:
          "Cover of incidents occurring in the house, the shared yard, children's play areas and passages, under the general conditions.",
      },
      {
        title: "Bicycles and play equipment",
        description:
          "Damage caused by children with bicycles, scooters or play equipment to third parties, excluding the guardian's knowing breach.",
      },
    ],
    exclusions: [
      "Deliberate acts of adult children with legal capacity",
      "Damage to family members and dependents of the insured",
      "Damage from the guardian's knowing neglect of regulations, such as lending a vehicle to a person without a license",
      "Claims arising from the insured's business and professional activities",
      "Events occurring outside the policy period",
      "Intentional crimes and documented violations of the insured",
    ],
    conditions: [
      "Accurate declaration of the number and age of the children at issuance",
      "Immediate notification of the event within the policy deadline, up to five working days",
      "No undisclosed claims from previous policy periods",
    ],
    documents: [
      "National ID and identity documents of the insured and family members",
      "Birth certificate of the children under supervision",
      "Guardianship decree or legal custodian documents, where applicable",
      "Latest liability policy, for the no-claims discount",
      "Event documents and the claim file after the incident",
    ],
    buySteps: [
      {
        title: "Quotation and family details",
        description:
          "Submit the quote request; the number and age of the children and the desired limit are declared.",
      },
      {
        title: "Documents and official proforma",
        description:
          "After the identity documents are received, an official proforma invoice is issued on the approved Bimeh Iran rates.",
      },
      {
        title: "Premium payment",
        description:
          "Pay through the banking gateway or a bank receipt; cover starts the moment issuance is confirmed.",
      },
      {
        title: "Policy delivery",
        description:
          "The printed and electronic policy with its general conditions is delivered within one working day.",
      },
    ],
    claimSteps: [
      {
        title: "Immediate notification",
        description:
          "Report the event to the agency within the notification deadline, up to five working days under the policy.",
      },
      {
        title: "Claim form",
        description:
          "Complete and sign the claim form describing the event, the child involved and the damage caused.",
      },
      {
        title: "Case documents",
        description:
          "Submit the family identity documents, photographs of the damage and the claimant's certificates.",
      },
      {
        title: "Assessment of guardianship fault",
        description:
          "The adjuster examines the guardian's excess or neglect in custody under the Civil Code and establishes responsibility.",
      },
      {
        title: "Agreement and payment",
        description:
          "Once liability and the amount are established, compensation is paid subject to the policy deductible.",
      },
    ],
    faqs: [
      {
        question: "How much does parents liability insurance cost?",
        answer:
          "The premium depends on the number and age of the children, the selected limit of liability and claims history. For ordinary households this is among the most affordable liability covers. After the online request is registered, the official proforma is issued on approved Bimeh Iran rates, and different limits can be compared before purchase.",
      },
      {
        question: "Are acts of adult children covered?",
        answer:
          "The cover of this policy is limited to minor children who lack legal responsibility. Acts of adult and capable children, who are personally liable, are not covered. A separate liability policy is required for adult and independent children, and adding them to the parents' policy has no legal effect.",
      },
      {
        question: "What if my minor child damages a neighbor's property?",
        answer:
          "First report the event to the agency within the notification deadline. The guardian's liability is examined under Article 331 of the Civil Code regarding excess or neglect in custody. Send the damage documents, photographs and required certificates, and avoid arbitrary compensation before the insurer determines the file, so that the right to cover is preserved.",
      },
      {
        question: "How is the school's and teacher's liability determined?",
        answer:
          "Schools, teachers and supervisors of school trips owe a duty of care in protecting children, and neglect in custody can ground their liability. This duty is assessed under Article 331 of the Civil Code and educational regulations. Educational institutions need a separate liability policy for full cover; family insurance is not sufficient.",
      },
      {
        question: "Does the policy pay diyeh for third-party injuries?",
        answer:
          "If the injured person is a third party and the guardian's responsibility is established, diyeh and bodily injury compensation are paid up to the policy limit. Damage to the insured's own family members is not covered. The diyeh amount follows the official schedule of the incident year, and the limit should be selected accordingly.",
      },
      {
        question: "Does this policy compensate injuries to my own children?",
        answer:
          "No. This is a liability policy: it compensates the damage the child causes to third parties. For the child's own injury in an accident, individual accident insurance or health insurance is more suitable. Some policies allow a family accident cover to be added, and you can ask about it when requesting a quotation.",
      },
    ],
    legalSources: [
      {
        title: "Islamic Penal Code — minors' responsibility",
        reference: "Article 206 — age thresholds of criminal responsibility",
      },
      {
        title: "Civil Code of Iran",
        reference: "Articles 328 to 335 — guaranty of persons under custody",
      },
      {
        title: "Civil Liability Act of Iran (1960)",
        reference: "Articles 1 to 11 — fault-based civil liability",
      },
    ],
    metaTitle: "Personal and Family Liability Insurance in Iran",
    metaDescription:
      "Personal and family liability insurance in Iran: damage by minor children, diyeh, household incidents, legal defense costs and official quotation.",
    keywords: [
      "personal liability insurance Iran",
      "family liability insurance Iran",
      "parents liability Iran",
      "child damage claim Iran",
      "household liability cover Iran",
      "بیمه مسئولیت افراد و خانواده",
    ],
    reviewDate: REVIEW_DATE,
  },

  // ── 30 ── animal-owners (wave 3) ─────────────────────────────────
  {
    slug: "animal-owners",
    category: "public",
    title: "Animal Owners Liability Insurance in Iran",
    nameEn: "Animal Owners Liability Insurance",
    audienceLine:
      "For keepers of guard dogs and pets, herders and livestock farmers, and licensed breeding centers and shelters.",
    answerBlock:
      "Animal owners liability insurance in Iran compensates third parties for bodily injury and property damage caused by kept animals, from dog bites to livestock damaging crops and vehicles, including diyeh and legal defense costs, up to the policy limit; under Iranian law the keeper answers for damage caused by the animal under his or her custody.",
    whoCovered: [
      "Keepers of guard dogs and domestic animals",
      "Herders and livestock farmers liable for damage caused by their animals",
      "Licensed breeding centers and animal shelters",
      "Poultry breeders and small livestock farms",
      "Stables and horse keeping centers",
    ],
    coverages: [
      {
        title: "Bites and bodily injury",
        description:
          "Compensation of diyeh and medical costs of persons bitten or injured by the insured animal, on the diyeh schedule of the incident year.",
      },
      {
        title: "Third-party property damage",
        description:
          "Compensation of damage to others' property such as vehicles, crops and the neighbor's wall caused by the insured animal.",
      },
      {
        title: "Legal defense costs",
        description:
          "Attorney fees and court costs in lawsuits brought against the keeper of the animal, even in dismissed claims.",
      },
      {
        title: "Escape of the animal",
        description:
          "Cover of damage occurring through the escape or release of the animal from the keeping place, where keeping conditions were observed.",
      },
      {
        title: "Sudden reactions of the animal",
        description:
          "Compensation of damage from the animal's sudden reaction toward passers-by, subject to lawful and restrained keeping.",
      },
    ],
    exclusions: [
      "Damage to the owner, family and staff of the keeper",
      "Keeping protected species without a permit of the Department of Environment",
      "The animal's acts under the keeper's deliberate provocation",
      "Damage from transmission of infectious diseases, under the general conditions",
      "Claims from commercial activities such as competitions not scheduled in the policy",
      "Damage after the sale or transfer of the animal to another person",
    ],
    conditions: [
      "Lawful keeping of the animal under health and urban regulations",
      "Observance of restraint and protection at the keeping place",
      "Immediate notification of the event within the policy deadline",
    ],
    documents: [
      "National ID and identity documents of the keeper",
      "Livestock identity document or ownership papers and the vaccination card",
      "Health and municipal permits of the keeping place, where required",
      "Latest liability policy, for claims history",
      "Event documents after the incident",
    ],
    buySteps: [
      {
        title: "Quotation and animal details",
        description:
          "Submit the quote request; the animal type, number and purpose of keeping are declared, and a limit is proposed.",
      },
      {
        title: "Documents and official proforma",
        description:
          "After the ownership and vaccination documents are received, an official proforma invoice is issued on the approved Bimeh Iran rates.",
      },
      {
        title: "Premium payment",
        description:
          "Pay through the banking gateway or a bank receipt; cover starts the moment issuance is confirmed.",
      },
      {
        title: "Policy delivery",
        description:
          "The printed and electronic policy with its general conditions is delivered within one working day.",
      },
    ],
    claimSteps: [
      {
        title: "Immediate notification",
        description:
          "Report the event to the agency as soon as you become aware of it, within the notification deadline set by the policy.",
      },
      {
        title: "Claim form",
        description:
          "Complete and sign the claim form describing the event, the animal involved and the damage caused.",
      },
      {
        title: "Case documents",
        description:
          "Submit the vaccination card, the keeping permits, photographs of the site and the injured person's medical documents.",
      },
      {
        title: "Assessment of keeping conditions",
        description:
          "The adjuster examines the restraint and keeping conditions and establishes the keeper's responsibility.",
      },
      {
        title: "Agreement and payment",
        description:
          "Once liability and the amount are established, compensation is paid subject to the policy deductible.",
      },
    ],
    faqs: [
      {
        question: "How much does animal owners liability insurance cost?",
        answer:
          "The premium depends on the animal type, the number kept, the purpose of keeping such as household, guard or livestock, and the selected limit of liability. Large guard dogs and herds carry different rates. After the request is registered and the documents are sent, the official proforma is issued on approved Bimeh Iran rates.",
      },
      {
        question: "Which cases are excluded from animal liability insurance?",
        answer:
          "Damage to the owner, family members and staff of the keeper is not covered. Keeping protected species without an Environment Department permit and the animal's acts under the keeper's deliberate provocation are also excluded. Pure transmission of an infectious disease, without bodily or property damage, is not covered under the general conditions.",
      },
      {
        question: "Who is liable for a dog bite in Iran?",
        answer:
          "Under the diyat rules of the Islamic Penal Code, liability for damage caused by an animal rests with its keeper. If the dog is kept within the permitted area and restrained, and the event results from the owner's failure to restrain it, the owner's liability is established. Animal owners liability insurance is designed precisely for this obligation.",
      },
      {
        question: "What if the animal damages a farm or a neighbor's car?",
        answer:
          "Property damage to third-party assets such as crops, vehicles and buildings is compensated up to the policy limit when the connection with the insured animal is established. Photographs of the site, a loss estimate and prompt notification speed up payment. Repeated damage to the same third party requires a review of the keeping pattern.",
      },
      {
        question: "Are there special conditions for large dog breeds?",
        answer:
          "Yes. For large and guard breeds, the insurer usually requires muzzling in public passages, restrained keeping and secure fencing at the keeping place, recorded in the policy. Knowing breach of these requirements can make the cover conditional. The precise conditions for each breed are declared in the proforma and the policy's special conditions before issuance.",
      },
      {
        question: "Are breeding centers and animal shelters insurable?",
        answer:
          "Yes. Licensed breeding centers and animal shelters can receive a group policy stating the keeping capacity and the species. The proforma is issued according to the risk volume and the number of animals. For commercial activities such as training or grooming services, expressly recording those services in the policy is essential.",
      },
    ],
    legalSources: [
      {
        title: "Islamic Penal Code — Diyat chapter",
        reference: "Book Five, Articles 449 onwards — damage caused by animals",
      },
      {
        title: "Civil Code of Iran",
        reference: "Articles 328 to 335 — guaranty of animals in one's custody",
      },
      {
        title: "Civil Liability Act of Iran (1960)",
        reference: "Articles 1 to 11, including the keeper's strict liability",
      },
    ],
    metaTitle: "Animal Owners Liability Insurance in Iran",
    metaDescription:
      "Animal owners liability insurance in Iran: dog bites, livestock damage to crops and vehicles, diyeh, defense costs and official quotation by the agency.",
    keywords: [
      "animal liability insurance Iran",
      "dog bite liability Iran",
      "livestock damage insurance Iran",
      "pet owner insurance Iran",
      "animal keeper liability Iran",
      "بیمه مسئولیت حیوانات",
    ],
    reviewDate: REVIEW_DATE,
  },

  // ── 31 ── events-insurance (wave 3) ──────────────────────────────
  {
    slug: "events-insurance",
    category: "public",
    title: "Event Organizers Liability Insurance in Iran",
    nameEn: "Event Organizers Liability Insurance",
    audienceLine:
      "For organizers of conferences, concerts, exhibitions, competitions and recreational camps holding an official permit.",
    answerBlock:
      "Event organizers liability insurance in Iran compensates participants and visitors for bodily injury and compensates third parties for property damage occurring during the event, including accidents of temporary structures, and funds the organizer's legal defense, up to the policy limit, from installation of equipment until the site is cleared.",
    whoCovered: [
      "Organizers of scientific, trade and business conferences",
      "Organizers of concerts and cultural and artistic events",
      "International exhibitions and exhibitors recorded in the policy",
      "Organizers of sports competitions and recreational camps",
      "Licensed event management companies",
    ],
    coverages: [
      {
        title: "Bodily injury to attendees",
        description:
          "Compensation of diyeh and medical costs of attendees injured during the event, where the organizer's responsibility is established.",
      },
      {
        title: "Third-party property damage",
        description:
          "Compensation of damage to third-party equipment and property, including rented equipment and the venue's property.",
      },
      {
        title: "Legal defense costs",
        description:
          "Attorney fees and court costs in lawsuits brought against the organizer, even in dismissed claims.",
      },
      {
        title: "Temporary structures and stage equipment",
        description:
          "Cover of damage caused by instability or collapse of temporary structures to third parties, subject to standard installation.",
      },
      {
        title: "Installation-to-clearance period",
        description:
          "Cover from the installation of equipment until the site is cleared, on the dates recorded in the policy.",
      },
    ],
    exclusions: [
      "Accidents arising from holding the event without a permit or beyond the declared capacity",
      "Damage to the organizer's own property and staff",
      "Accidents arising from the consumption of alcohol and narcotics within the event area",
      "High-risk programs such as fireworks and stunt jumps without express scheduling in the policy",
      "Damage after the end of the cover period recorded in the policy",
      "Deliberate acts of the organizer and knowing breach of the authorities' orders",
    ],
    conditions: [
      "A valid holding permit from the competent authority",
      "Accurate declaration of the installation, holding and clearance dates at issuance",
      "Observance of the capacity and safety standards of the venue",
    ],
    documents: [
      "Event holding permit from the competent authority",
      "Rental contract of the venue",
      "Program details, attendee capacity and schedule",
      "National ID and registration documents of the organizer",
      "Latest liability policy, for claims history",
    ],
    buySteps: [
      {
        title: "Quotation and event review",
        description:
          "Submit the quote request; the event type, capacity, duration and dates are declared, and a limit is proposed.",
      },
      {
        title: "Documents and official proforma",
        description:
          "After the holding permit and venue documents are received, an official proforma invoice is issued on the approved Bimeh Iran rates.",
      },
      {
        title: "Premium payment",
        description:
          "Pay through the banking gateway or a bank receipt; cover starts the moment issuance is confirmed, before the event.",
      },
      {
        title: "Policy delivery",
        description:
          "The printed and electronic policy with its general conditions is delivered within one working day.",
      },
    ],
    claimSteps: [
      {
        title: "Immediate notification",
        description:
          "Report the event to the agency immediately and within the notification deadline set by the policy.",
      },
      {
        title: "Claim form",
        description:
          "Complete and sign the claim form describing the accident, the injured person or damaged property and its location.",
      },
      {
        title: "Case documents",
        description:
          "Submit the holding permit, the venue contract, photographs and the medical or damage documents of the claimant.",
      },
      {
        title: "Adjuster assessment",
        description:
          "The adjuster examines the safety of the venue, the observance of capacity and the organizer's responsibility.",
      },
      {
        title: "Agreement and payment",
        description:
          "Once liability and the amount are established, compensation is paid subject to the policy deductible.",
      },
    ],
    faqs: [
      {
        question: "How is event liability insurance priced?",
        answer:
          "The premium is determined by the event type, the number of attendees, the duration, the nature of the risk such as exhibition, concert or competition, and the selected limit of liability. Small one-day events cost less. After the request is registered with the event details, the official proforma is issued on Bimeh Iran rates before the event.",
      },
      {
        question: "Which events are not covered?",
        answer:
          "Events held without an official permit, programs exceeding the declared capacity and high-risk activities such as fireworks or stunt jumps without express scheduling in the policy are not covered. Damage arising from knowing breach of the orders of security and health authorities is also excluded. The detailed exclusions appear in the general conditions.",
      },
      {
        question: "Are exhibition exhibitors covered too?",
        answer:
          "The primary cover belongs to the organizer; exhibitors need a separate policy or express inclusion in the organizer's policy for their independent activity. Clarifying this at issuance prevents later disputes. It is recommended that the exhibitor contract explicitly determine the allocation of liability insurance between the parties.",
      },
      {
        question: "What is the process when a visitor is injured?",
        answer:
          "First report the event to the agency immediately and obtain the injured person's medical records. The adjuster examines the safety of the venue, the observance of capacity and security instructions, and establishes the organizer's liability. After diyeh or the loss is determined, payment is made subject to the deductible; photographs and witness certificates speed up the file.",
      },
      {
        question: "When does the cover start and end?",
        answer:
          "The cover is set by the dates recorded in the policy, usually from the start of equipment installation until the venue is cleared. Recording this period precisely in the policy is essential, because accidents outside it are not covered. For multi-stage or recurring events, each stage must be declared separately for cover.",
      },
      {
        question: "Is safety the organizer's duty or the venue owner's?",
        answer:
          "Safety responsibility is divided between the organizer and the venue owner according to the contract and each party's role. If the accident results from a structural defect of the venue, the owner's liability arises; for shortcomings in maintenance and event order, the organizer answers. Event liability insurance covers the organizer's share and reduces disputes.",
      },
    ],
    legalSources: [
      {
        title: "Civil Liability Act of Iran (1960)",
        reference: "Articles 1 to 11 — fault-based civil liability",
      },
      {
        title: "Civil Code of Iran",
        reference: "Articles 328 to 335 — guaranty and fault-based liability",
      },
      {
        title: "General Conditions of Liability Insurance",
        reference: "Central Insurance Regulation No. 57",
      },
    ],
    metaTitle: "Event Organizers Liability Insurance in Iran",
    metaDescription:
      "Event organizers liability insurance in Iran: visitor injuries, temporary structures, property damage, defense costs and official quotation.",
    keywords: [
      "event liability insurance Iran",
      "concert insurance Iran",
      "exhibition liability Iran",
      "conference insurance Iran",
      "event organizer cover Iran",
      "بیمه مسئولیت برگزاری رویداد",
    ],
    reviewDate: REVIEW_DATE,
  },

  // ── 32 ── travel-tours (wave 3) ──────────────────────────────────
  {
    slug: "travel-tours",
    category: "public",
    title: "Tour Operator Liability Insurance in Iran",
    nameEn: "Tour Operator Liability Insurance",
    audienceLine:
      "For travel agencies licensed by the Ministry of Cultural Heritage and Tourism and operators of leisure and pilgrimage tours.",
    answerBlock:
      "Tour operator liability insurance in Iran compensates travelers for bodily injury and property damage caused by the operator's shortcoming in delivering tour services, including the acts of drivers, guides and subcontractors, and funds the legal defense of the agency, up to the policy limit, from the journey's start until the travelers return.",
    whoCovered: [
      "Travel agencies licensed by the Ministry of Cultural Heritage, Tourism and Handicrafts",
      "Operators of domestic and foreign pilgrimage tours",
      "Organizers of school trips and official staff journeys",
      "Transport and accommodation contractors, where expressly scheduled",
      "Tour guides within the activity recorded in the policy",
    ],
    coverages: [
      {
        title: "Travelers' diyeh and bodily injury",
        description:
          "Compensation of diyeh and medical costs of travelers injured during tour services, where the operator's responsibility is established, on the diyeh schedule of the incident year.",
      },
      {
        title: "Travelers' financial loss and property",
        description:
          "Compensation of damage to travelers' property caused by shortcoming in keeping entrusted belongings and in the contracted tour services.",
      },
      {
        title: "Legal defense costs",
        description:
          "Attorney fees and court costs in lawsuits by travelers against the tour operator, even in dismissed claims.",
      },
      {
        title: "Contractors' and staff's acts",
        description:
          "The operator's liability for the acts of drivers, guides and tour staff within the contracted services.",
      },
      {
        title: "Tour validity period",
        description:
          "Cover from the start of the journey until the travelers' return, on the schedule recorded in the policy.",
      },
    ],
    exclusions: [
      "Accidents outside the tour's validity period or outside the declared program",
      "Damage from traveling in an unauthorized vehicle or with an unqualified driver",
      "Damage to the agency's own staff and contractors",
      "Deliberate acts of the traveler or knowing breach of the tour guide's instructions",
      "Accidents from the traveler's pre-existing illnesses not declared at registration",
      "Intentional crimes and knowing breach of tourism regulations",
    ],
    conditions: [
      "A valid agency license from the Ministry of Cultural Heritage, Tourism and Handicrafts",
      "Declaration of the number of travelers, the route and the tour duration at issuance",
      "Use of transport and accommodation contractors holding valid permits",
    ],
    documents: [
      "Agency license from the Ministry of Cultural Heritage, Tourism and Handicrafts",
      "National ID and registration documents of the agency",
      "Tour program, route and list of contractors",
      "Latest liability policy, for claims history",
      "Transport and accommodation contracts, where the adjuster requires them",
    ],
    buySteps: [
      {
        title: "Quotation and program review",
        description:
          "Submit the quote request; the route, number of travelers and duration are declared, and a limit is proposed.",
      },
      {
        title: "Documents and official proforma",
        description:
          "After the agency license and program documents are received, an official proforma invoice is issued on the approved Bimeh Iran rates.",
      },
      {
        title: "Premium payment",
        description:
          "Pay through the banking gateway or a bank receipt; cover starts the moment issuance is confirmed, before departure.",
      },
      {
        title: "Policy delivery",
        description:
          "The printed and electronic policy with its general conditions is delivered within one working day.",
      },
    ],
    claimSteps: [
      {
        title: "Immediate notification",
        description:
          "Report the event to the agency as soon as you become aware of it, within the notification deadline set by the policy.",
      },
      {
        title: "Claim form",
        description:
          "Complete and sign the claim form describing the accident, the travelers involved and the service stage.",
      },
      {
        title: "Case documents",
        description:
          "Submit the travel program, the traveler list, the contractor contracts and the medical or damage documents.",
      },
      {
        title: "Adjuster assessment",
        description:
          "The adjuster examines the operator's shortcoming in service delivery and the role of contractors and travelers.",
      },
      {
        title: "Agreement and payment",
        description:
          "Once liability and the amount are established, compensation is paid subject to the policy deductible.",
      },
    ],
    faqs: [
      {
        question: "How much does tour liability insurance cost?",
        answer:
          "The premium is determined by the tour route, the number of travelers, the journey duration, the service type, leisure or pilgrimage, and the selected limit of liability. Frequent pilgrimage tours have stepped rates. After the request is registered with the travel program, the official proforma is issued on approved Bimeh Iran rates, with annual cover available for repeated tours.",
      },
      {
        question: "Which events are excluded from tour liability cover?",
        answer:
          "Accidents outside the tour's validity period or outside the declared program, travel in unauthorized vehicles or with an unqualified driver, and travelers' pre-existing illnesses not declared at registration are not covered. Deliberate acts of the traveler are also excluded. Declaring the travel program and the subcontractor list accurately reduces the risk of rejection.",
      },
      {
        question: "Who is liable for a tour bus accident?",
        answer:
          "If the accident results from the driver's fault, a vehicle defect or choosing an unauthorized subcontractor, the tour operator's liability arises, because selecting the transport contractor is among the operator's duties. When the driver's or vehicle owner's fault is proven, their responsibility is also examined. Tour liability insurance covers the operator's share up to the limit.",
      },
      {
        question: "Does tour liability replace travel insurance?",
        answer:
          "No. The two covers are complementary. Travel insurance compensates the traveler's own medical and accident costs, while tour liability insurance answers for the damage the traveler suffers because of the operator's shortcoming. Professional agencies hold both covers and declare their scope in the travel notice issued to travelers.",
      },
      {
        question: "What matters for pilgrimage tours to Iraq (Arbaeen and others)?",
        answer:
          "For pilgrimage tours, recording the route, border crossing, transport fleet and accommodations in the policy is essential. Accidents at borders and travel in the destination country may follow different rules, which is why coordinating with the insurer before departure matters. The traveler list and the precise program accelerate both issuance and claim handling.",
      },
      {
        question: "What happens if a traveler has an accident at the hotel?",
        answer:
          "If the accident results from the operator's shortcoming in choosing the accommodation or in supervision, the agency's liability arises; for direct hotel safety defects, the primary responsibility rests with the hotel management. Determining each party's share requires examining the accommodation contract and the incident report. Tour liability insurance covers the operator's share of responsibility.",
      },
    ],
    legalSources: [
      {
        title: "Civil Liability Act of Iran (1960)",
        reference: "Articles 1 to 11 — fault-based civil liability",
      },
      {
        title: "Civil Code of Iran",
        reference: "Articles 328 to 335 — guaranty and fault-based liability",
      },
      {
        title: "Islamic Penal Code — Diyat chapter",
        reference: "Book Five, Articles 449 onwards",
      },
    ],
    metaTitle: "Tour Operator Liability Insurance in Iran",
    metaDescription:
      "Tour operator liability insurance in Iran: traveler injuries, subcontractor acts, pilgrimage and leisure tours, defense costs and official quotation.",
    keywords: [
      "tour operator liability insurance Iran",
      "travel agency insurance Iran",
      "pilgrimage tour insurance Iran",
      "traveler injury claim Iran",
      "tour bus liability Iran",
      "بیمه مسئولیت تورهای مسافرتی",
    ],
    reviewDate: REVIEW_DATE,
  },

  // ── 33 ── hunters (wave 3) ───────────────────────────────────────
  {
    slug: "hunters",
    category: "public",
    title: "Hunters and Game Wardens Liability Insurance in Iran",
    nameEn: "Hunters & Game Wardens Liability Insurance",
    audienceLine:
      "For holders of a valid hunting permit, members of licensed hunting associations and environment protection officers on duty.",
    answerBlock:
      "Hunters liability insurance in Iran compensates third parties for bodily injury caused by accidental shooting during lawful hunting and for property damage such as harm to villagers' livestock and vehicles, including diyeh and legal defense costs, up to the policy limit, within the permit and environment regulations of the incident date.",
    whoCovered: [
      "Holders of a valid hunting permit from the Department of Environment",
      "Members of licensed hunting and shooting associations",
      "Game wardens and environment protection officers on duty",
      "Shooting clubs and training ranges, where expressly scheduled",
      "Guides and companions of lawful hunting groups, recorded in the policy",
    ],
    coverages: [
      {
        title: "Diyeh for stray-shot accidents",
        description:
          "Compensation of diyeh and medical costs of persons injured during lawful hunting activity, on the diyeh schedule of the incident year.",
      },
      {
        title: "Third-party property damage",
        description:
          "Compensation of damage to third parties' property such as villagers' livestock, vehicles and equipment caused by hunting accidents.",
      },
      {
        title: "Legal defense costs",
        description:
          "Attorney fees and court costs in cases brought against the hunter, even in dismissed claims.",
      },
      {
        title: "Game wardens' incidents",
        description:
          "Cover of the game warden's liability during protection missions, under the regulations and with express scheduling in the policy.",
      },
      {
        title: "Hunting group cover",
        description:
          "Cover of the members of a hunting group under a group policy, with the member list and permitted areas declared.",
      },
    ],
    exclusions: [
      "Hunting without a permit, in prohibited areas or outside the lawful season",
      "Hunting protected species and breach of the Department of Environment rules",
      "Deliberate acts, hunting wagers and knowing breach of weapon regulations",
      "Damage to members of the hunting group not scheduled in the policy",
      "Accidents from an unauthorized weapon or unlawful weapon modifications",
      "Consumption of alcohol or narcotics by the hunter",
    ],
    conditions: [
      "A valid hunting permit and weapon card on the incident date",
      "Observance of the permitted areas, seasons and hunting quotas",
      "Immediate notification of the event within the policy deadline",
    ],
    documents: [
      "Valid hunting permit and weapon card",
      "National ID and identity documents of the insured",
      "Club or association license, for group cover",
      "Latest liability policy, for claims history",
      "Certificate of shooting safety training courses, where available",
    ],
    buySteps: [
      {
        title: "Quotation and permit validation",
        description:
          "Submit the quote request; the permit type, weapon and individual or group activity are declared, and a limit is proposed.",
      },
      {
        title: "Documents and official proforma",
        description:
          "After the hunting permit and identity documents are validated, an official proforma invoice is issued on the approved Bimeh Iran rates.",
      },
      {
        title: "Premium payment",
        description:
          "Pay through the banking gateway or a bank receipt; cover starts the moment issuance is confirmed, before the season.",
      },
      {
        title: "Policy delivery",
        description:
          "The printed and electronic policy with its general conditions is delivered within one working day.",
      },
    ],
    claimSteps: [
      {
        title: "Immediate notification",
        description:
          "Report the event to the agency as soon as you become aware of it, within the notification deadline set by the policy.",
      },
      {
        title: "Claim form",
        description:
          "Complete and sign the claim form describing the accident, the weapon involved and the injured person or damaged property.",
      },
      {
        title: "Case documents",
        description:
          "Submit the hunting permit, the weapon card, photographs of the site and the medical or damage documents.",
      },
      {
        title: "Adjuster assessment",
        description:
          "The adjuster examines the validity of the permit, the observance of hunting rules and the fault of the parties.",
      },
      {
        title: "Agreement and payment",
        description:
          "Once liability and the amount are established, compensation is paid subject to the policy deductible.",
      },
    ],
    faqs: [
      {
        question: "How much does hunters liability insurance cost?",
        answer:
          "The premium depends on the permit type, the weapon type, individual or group activity and the selected limit of liability. Group cover for clubs and associations usually carries a more affordable rate. After the request is registered and the hunting permit is validated, the official proforma is issued on approved Bimeh Iran rates, before the season.",
      },
      {
        question: "Is hunting without a permit insured?",
        answer:
          "No. Hunting without a valid permit, in prohibited areas, outside the lawful season or targeting protected species is expressly excluded. Beyond the absence of insurance cover, these violations entail prosecution under environment regulations. Hunters liability insurance covers only events during lawful hunting with full observance of the rules.",
      },
      {
        question: "What if a shot hits a villager's livestock or vehicle?",
        answer:
          "Property damage to third-party assets is compensated up to the policy limit when the connection with the lawful hunting event is established. Prompt notification, photographs of the site and the owner's certificate accelerate the assessment. Arbitrary compensation before the insurer determines the file is not recommended and can complicate the cover.",
      },
      {
        question: "Can game wardens also obtain liability cover?",
        answer:
          "Yes. Game wardens and environment protection officers on duty can be covered under a group policy of their organization or an individual policy. The condition for applying cover is performing the mission within the regulations and the orders of the Environment Department. For protection units, recording the list of officers and mission areas in the policy is recommended.",
      },
      {
        question: "Which authority issues the hunting permit in Iran?",
        answer:
          "The hunting permit is issued by the Department of Environment, and its validity follows that organization's annual regulations. The permit's validity on the incident date is the core condition for applying the insurance cover. Before every hunting trip, verify and document the permit's validity and the permitted areas.",
      },
      {
        question: "Are hunting companions covered?",
        answer:
          "Cover for companions and group members applies only when they are expressly recorded in the policy or a group policy is purchased. Losses among undeclared group members are usually excluded. For clubs and hunting guides, preparing a precise list of members and their manner of participation at issuance is essential.",
      },
    ],
    legalSources: [
      {
        title: "Islamic Penal Code — Diyat chapter",
        reference: "Book Five, Articles 449 onwards",
      },
      {
        title: "Civil Liability Act of Iran (1960)",
        reference: "Articles 1 to 11 — fault-based civil liability",
      },
      {
        title: "General Conditions of Liability Insurance",
        reference: "Central Insurance Regulation No. 57",
      },
    ],
    metaTitle: "Hunters and Game Wardens Liability Insurance in Iran",
    metaDescription:
      "Hunters and game wardens liability insurance in Iran: accidental shooting, diyeh, livestock and vehicle damage, defense costs and official quotation.",
    keywords: [
      "hunters liability insurance Iran",
      "hunting permit insurance Iran",
      "stray shot liability Iran",
      "game warden insurance Iran",
      "weapon accident liability Iran",
      "بیمه مسئولیت شکارچیان",
    ],
    reviewDate: REVIEW_DATE,
  },
];

export function getEnProductPage(
  category: string,
  slug: string,
): EnProductPage | undefined {
  return enProductPages.find((p) => p.slug === slug && p.category === category);
}

// ── EN Home ────────────────────────────────────────────────────────

export const enHome = {
  heroKicker: "Official representative of Bimeh Iran",
  heroHeadline: "Liability Insurance in Iran — The English Reference",
  heroAnswer:
    "Iran Liability Insurance is the English reference of a licensed Bimeh Iran agency dedicated exclusively to liability insurance. Here you will find how the 33 Iranian liability products work: who each one covers, what it pays, what it excludes, how to buy it and how claims are settled — based on the Civil Liability Act, the Insurance Act and the general conditions of Bimeh Iran. Premium figures are not published; the final premium is issued upon official quotation.",
  trustBullets: [
    "Official representative of Bimeh Iran — Agency No. 20616, licensed by Bimeh Iran (Iran Insurance Company).",
    "Content grounded in real statutes: the Civil Liability Act (1960), the Insurance Act (1936), the Labor Law and the Civil Code.",
    "All 33 liability products of the Persian site, each documented in a full English page.",
    "Answer-first, review-dated content written for citation by AI search engines — with no invented prices or statistics.",
  ],
  flagshipHeading: "All 33 liability products, in full English",
  flagshipIntro:
    "Each product page follows the same twelve-part structure: a standalone answer, who is covered, a coverage table, exclusions, conditions and documents, numbered buying steps, numbered claim steps, FAQs, legal sources and a dated review box.",
  allProductsHeading: "All 33 liability products",
  faqHeading: "Frequently asked questions about liability insurance in Iran",
  quoteNote:
    "The online quote form is in Persian. English-speaking visitors may submit inquiries by email in English, and a consultant will respond in English.",
  faqs: [
    {
      question: "What is liability insurance and how does it work in Iran?",
      answer:
        "Liability insurance transfers to the insurer the compensation you legally owe third parties for bodily injury, financial loss or property damage you cause. In Iran the underlying obligation comes from the Civil Liability Act, the Civil Code and specific statutes such as the Labor Law. The insurer pays proven, covered claims up to the policy limit, after the deductible.",
    },
    {
      question: "Is liability insurance mandatory in Iran?",
      answer:
        "It depends on the risk. Fire third-party liability is mandatory for insured properties, some industries must cover work-related risks under the Labor Law, and certain licensed activities require liability cover as a permit condition. For everything else, liability insurance is voluntary — but the civil liability itself is not: fault-based liability under Iranian law exists with or without insurance.",
    },
    {
      question: "How much does liability insurance cost in Iran?",
      answer:
        "The premium depends on the product, the limit of liability, the insured activity's risk class, claims history and the declared scope. This site deliberately publishes no premium figures: the final premium is issued upon official quotation by the agency on current Bimeh Iran tariffs. You can request a quotation through the quote form or by email in English.",
    },
    {
      question: "How do I file a liability claim in Iran?",
      answer:
        "Notify your insurer or agency promptly — the Insurance Act and policy conditions set a five-working-day notification practice — then complete the claim form and submit documents proving the incident, the damage and the liability. The insurer's adjuster assesses the file; bodily-injury amounts follow the official diyeh schedule of the incident year, and payment follows the policy deductible and limit.",
    },
  ] as EnFaq[],
};

// ── EN Hub (/en/liability) ─────────────────────────────────────────

export const enHub = {
  title: "All Liability Insurance Types in Iran",
  intro:
    "Iranian liability insurance is organized around one question: who can hold you legally responsible, and for how much? This hub lists all 33 liability products offered through our Bimeh Iran agency, grouped into four categories, and every one of them has full English documentation — who is covered, coverages, exclusions, conditions and documents, buying steps, claim steps, FAQs and legal sources. Every product page answers the same twelve questions in the same order, so the coverage landscape of Iran can be compared product by product. The Persian pages remain the authoritative versions, and premium levels are not shown: each quotation is issued officially upon request.",
  flagshipLabel: "Full English page",
};

// ── EN About ───────────────────────────────────────────────────────

export const enAbout = {
  heading: "About this English edition",
  agency:
    "Iran Liability Insurance is the English edition of BimehMasooliyat.ir, operated by Agency No. 20616 of Bimeh Iran (the state-owned Iran Insurance Company). The agency specializes exclusively in liability insurance: issuance for professionals, businesses and individuals, limit-of-liability advisory, and claim support. The Persian edition is the complete, authoritative site; this English edition documents all 33 products for international readers, foreign-owned businesses and AI search engines. Contact: info@bimehmasooliyat.ir — phone/WhatsApp +98 998 131 3724. Exact office address is available on request by phone.",
};

// ── EN category page intros (/en/liability/[category]) ─────────────
// Standalone answer-first descriptions, 60-90 words each.

export const enCategoryIntros: Record<string, string> = {
  professional:
    "Professional liability insurance in Iran covers the civil liability of licensed professionals for financial or bodily loss their clients suffer because of a professional error. The legal basis is the Civil Liability Act of 1960, applied through the disciplinary rules of each professional body such as the Medical Council and the Engineering System Organization. Thirteen products cover physicians, dentists, nurses, pharmacists, lawyers, engineers, accountants, advisors, translators, notaries, beauty salons and IT specialists, each documented in a full English page.",
  commercial:
    "Business and industry liability insurance in Iran covers the civil liability of employers, contractors, manufacturers and facility operators toward third parties, workers and consumers. The key statutes are the Labor Law, whose Article 91 places work-related risks on the employer, the Civil Code and the Consumer Protection Act. Thirteen products cover employers, contractors, public and product liability, elevators, construction operations, property owners, restaurants and hotels, kindergartens, sports facilities, billboards, carriers and fire third-party liability, each with premiums issued upon official quotation.",
  corporate:
    "Corporate liability insurance in Iran addresses the risks of companies and their management rather than physical operations. Two products are offered: directors and officers (D&O) insurance, protecting board members against shareholder lawsuits and claims of breaching the duty of care under the Commercial Code, and cyber liability insurance, covering data breaches, ransomware and the duties of Article 58 of the Electronic Commerce Act. Both fund the legal defense of the insured and pay proven damages up to the policy limit, with premiums issued upon official quotation.",
  public:
    "Personal and public liability insurance in Iran covers the everyday civil liability of individuals and families: parents for their minor children under Article 331 of the Civil Code, keepers of animals under the strict liability rules, organizers of events, travel agencies toward their travelers and licensed hunters. Five products are offered, each explaining who is covered, what diyeh and property damage is paid, the exclusions and the numbered claim steps, with the final premium issued upon official quotation.",
};

// ── EN Footer & Disclaimers ────────────────────────────────────────────

export const enFooter = {
  brandLine:
    "Iran Liability Insurance — English edition of BimehMasooliyat.ir, official representative of Bimeh Iran.",
  navHeading: "English edition",
  nav: [
    { label: "Home", href: "/en" },
    { label: "All Liability Types", href: "/en/liability" },
    { label: "How Pricing Works", href: "/en/price" },
    { label: "Compare Coverages", href: "/en/compare" },
    { label: "Claims", href: "/en/claims" },
    { label: "FAQ", href: "/en/faq" },
    { label: "Glossary", href: "/en/glossary" },
    { label: "About", href: "/en/about" },
    { label: "Quote (Persian form)", href: "/quote" },
    { label: "Contact", href: "/contact" },
  ],
  email: "info@bimehmasooliyat.ir",
  phone: "+98 998 131 3724",
  address: "Iran — exact office address available on request by phone",
  license: "Official agency of Bimeh Iran (Iran Insurance Company) — agency code 20616",
  persianLinkLabel: "Persian edition — بیمه مسئولیت ایران",
  disclaimer:
    "Informational content only; not legal or insurance advice. Iranian statutes are authoritative in Persian. Premiums are issued upon official quotation.",
};

export const enDisclaimers = {
  legal:
    "Important legal note: the authoritative texts of Iranian laws — including the Civil Liability Act, the Insurance Act, the Labor Law, the Civil Code and the Islamic Penal Code — are published in Persian. English titles and article references on this site are provided for orientation only; in any legal dispute the Persian official text prevails. This site is informational and does not constitute legal or insurance advice.",
  pricing:
    "No premium amounts, tariffs or statistics are invented on this site. The final premium is issued upon official quotation by the agency, based on current Bimeh Iran tariffs and the declared limit of liability.",
  quoteNote:
    "The online quote form is in Persian. English-speaking visitors may submit inquiries by email in English, and a consultant will respond in English.",
  review:
    "Reviewed by the licensed team of Agency No. 20616 of Bimeh Iran, specialized exclusively in liability insurance.",
};

// ── EN Price page (/en/price) ───────────────────────────────────────
// Rule preserved: NO premium amounts are invented in the English edition.
// The Persian /price page shows estimated starting ranges; the English
// page explains the pricing mechanics and routes to official quotation.

export interface EnPriceFactor {
  factor: string;
  effect: string;
  text: string;
}

export const enPrice = {
  metaTitle: "How Liability Insurance Pricing Works in Iran | Factors & Quotation",
  metaDescription:
    "Eight factors that set Iranian liability insurance premiums: risk code, limit of liability, headcount, deductible, claims history and endorsements. Official quotation explained.",
  h1: "How Liability Insurance Pricing Works in Iran",
  answerBlock:
    "Liability insurance in Iran has no fixed tariff: the premium is calculated from a risk declaration form. The main drivers are the activity risk code, the chosen limit of liability (at least equal to the full diyeh of the year of the incident), the number of employees or daily capacity, the deductible, prior claims history and any endorsements such as legal-defense costs. The final premium is issued upon official quotation by Bimeh Iran, usually within one business day, and issuing the policy carries no separate fee.",
  factorsHeading: "Eight factors that determine the premium",
  factorsHint:
    "Two applicants with the same occupation can still receive different rates.",
  factors: [
    {
      factor: "Activity type and risk code",
      effect: "Primary driver",
      text: "Every profession and business carries a specific risk code; a surgeon and a consulting office differ fundamentally in rate.",
    },
    {
      factor: "Limit of liability",
      effect: "Direct",
      text: "The limit should be at least equal to the full diyeh of the year of occurrence; raising it raises the rate, though not linearly.",
    },
    {
      factor: "Headcount or capacity",
      effect: "Direct",
      text: "Under employer liability the number of workers sets the base; for hospitality venues the daily capacity is used.",
    },
    {
      factor: "Chosen deductible",
      effect: "Inverse",
      text: "The larger the loss share you accept yourself, the lower the premium; the right balance depends on your finances.",
    },
    {
      factor: "Claims history",
      effect: "Direct",
      text: "A previous loss file raises next year's rate; a claim-free record is a negotiating asset.",
    },
    {
      factor: "Endorsements",
      effect: "Direct",
      text: "Coverage extensions such as moral damages, legal-defense costs or an extended discovery period each add premium.",
    },
    {
      factor: "Location and environment",
      effect: "Contributory",
      text: "Population density, building type and safety equipment (emergency exits, fire alarm) feed the risk assessment.",
    },
    {
      factor: "Discounts and payment",
      effect: "Reducing",
      text: "Annual payment, group issuance and combined packages usually carry discounts; ask during quotation.",
    },
  ] as EnPriceFactor[],
  samplesHeading: "What drives the rate for popular coverages",
  samplesHint:
    "The English edition shows no amounts: the final premium is issued upon official quotation.",
  samplesNote:
    "The Persian edition (/price) additionally lists estimated starting ranges in Iranian rial terms; those figures are indicative only and must be matched against the current Bimeh Iran tariff and your own risk assessment.",
  stepsHeading: "Four steps to an official quotation",
  steps: [
    {
      title: "Submit the quotation form",
      description:
        "Register your activity type, city, headcount and desired limit in the quotation form (in Persian).",
    },
    {
      title: "Risk assessment by the expert",
      description:
        "The underwriter maps your risk code and required coverages from the declaration form and contacts you if needed.",
    },
    {
      title: "Receive the official quotation",
      description:
        "A pro-forma invoice is issued with the approved Bimeh Iran rate, breaking down the limit and deductible.",
    },
    {
      title: "Pay and receive the policy",
      description:
        "After confirmation and payment the policy is issued the same business day and delivered electronically.",
    },
  ] as EnStep[],
  faqs: [
    {
      question: "How much does professional liability insurance cost in Iran?",
      answer:
        "The rate is calculated from the medical specialty, the type of practice (surgical or outpatient), the chosen limit and claims history, so no universal flat rate exists. Estimated starting ranges appear on the Persian pricing page, and the official pro-forma invoice is issued after the declaration form is completed.",
    },
    {
      question: "Why is there no instant online price?",
      answer:
        "Liability insurance is a risk declaration, not a fixed-price product: each applicant's activity, limit, deductible and history differ. The approved Bimeh Iran rate is issued by an underwriter after reviewing the declaration form, normally within one business day.",
    },
    {
      question: "Does raising the limit of liability increase the cost a lot?",
      answer:
        "The relationship between limit and rate is not linear; increases above the base limit usually carry a moderate factor. Because diyeh grows every year and courts may award aggregated damages, choosing a limit above the minimum is almost always sound risk management; get the exact figure through a quotation.",
    },
    {
      question: "Are there separate issuing fees?",
      answer:
        "No. The approved premium is the main cost and issuing the policy carries no separate fee. If a specific endorsement or a technical inspection is required for certain risks, you are informed before issuance so you can decide without hidden costs.",
    },
  ] as EnFaq[],
};

// ── EN Compare page (/en/compare) ───────────────────────────────────

export const enCompare = {
  metaTitle: "Compare All 33 Liability Insurance Types in Iran | Full Table",
  metaDescription:
    "A comparison table of all 33 Iranian liability insurance products: who each policy is for, its key risk and its full English guide — choose the right coverage quickly.",
  h1: "Compare All 33 Liability Insurance Types in Iran",
  answerBlock:
    "Iranian liability insurance splits into four families. Professional liability covers licensed occupations for errors in their expert service. Business and industry liability covers employers, contractors, manufacturers and facility operators toward workers, third parties and consumers. Corporate liability addresses companies and their management through D&O and cyber policies. Personal and public liability covers the everyday civil liability of individuals and families. The table below compares all 33 products; every row links to a full English guide.",
  matrixHeading: "The four liability families at a glance",
  matrix: [
    {
      key: "professional",
      label: "Professional liability",
      risks: "Error and omission in delivering an expert service",
      typical: "Physicians, lawyers, engineers, accountants, pharmacies",
    },
    {
      key: "commercial",
      label: "Business & industry liability",
      risks: "Worker accidents, third-party damage, product defects, contractor operations",
      typical: "Employers, contractors, manufacturers, hotels and restaurants",
    },
    {
      key: "corporate",
      label: "Corporate liability",
      risks: "Claims by shareholders and stakeholders against directors; cyber attacks",
      typical: "Joint-stock companies, holdings, startups, online businesses",
    },
    {
      key: "public",
      label: "Personal & public liability",
      risks: "Everyday damage to neighbors, customers and third parties",
      typical: "Property owners and tenants, parents, animal keepers, event organizers",
    },
  ] as { key: EnCategory; label: string; risks: string; typical: string }[],
  tableHead: { product: "Coverage", audience: "Who it is for", risk: "Key risk covered" },
  quoteLink: "Request an official quotation",
  // Job-to-coverage table — faithful English twin of the 31-row Persian
  // JOB_MATRIX on /compare. Every product pair must exist in enProductPages.
  jobsHeading: "Which coverage for which job?",
  jobsHint: "Find your job or activity and jump straight to the full English guide for that coverage.",
  jobsTableHead: { job: "Job / activity", coverage: "Recommended coverage", risk: "Main risk covered" },
  jobsNote: "The Persian edition is the authoritative original.",
  jobs: [
    { job: "Physician", product: ["professional", "medical-doctors"], risk: "Medical error and diyeh (blood money) awards" },
    { job: "Dentist", product: ["professional", "dentists"], risk: "Implant, prosthetics and anesthesia complications" },
    { job: "Nurses and paramedical staff", product: ["professional", "nurses-paramedics"], risk: "Injection, IV-drip and care errors" },
    { job: "Pharmacist and pharmacy", product: ["professional", "pharmacists"], risk: "Dispensing errors and drug interactions" },
    { job: "Attorney at law", product: ["professional", "lawyers"], risk: "Financial loss to the client" },
    { job: "Design and supervising engineer", product: ["professional", "engineers"], risk: "Design and supervision errors (Article 33)" },
    { job: "Accountant and auditor", product: ["professional", "accountants-auditors"], risk: "Defective tax returns and audit reports" },
    { job: "Financial and tax advisor", product: ["professional", "financial-advisors"], risk: "Penalties arising from wrong advice" },
    { job: "Real-estate agent", product: ["professional", "real-estate-agents"], risk: "Non-disclosure of defects and ownership disputes" },
    { job: "Certified translator", product: ["professional", "translators-official"], risk: "Errors in translating figures and legal terms" },
    { job: "Notary public", product: ["professional", "notaries"], risk: "Defective deed drafting and incomplete identity verification" },
    { job: "Hairdresser and beauty salon", product: ["professional", "beauty-salons"], risk: "Service injuries, skin sensitivity and infection" },
    { job: "IT professional and freelancer", product: ["professional", "it-professionals"], risk: "Implementation errors and data exposure" },
    { job: "Employer (workshop, factory or practice with staff)", product: ["commercial", "employers"], risk: "Employee work accidents and occupational claims (Article 91 of the Labor Law)" },
    { job: "Contractor", product: ["commercial", "contractors"], risk: "Third-party damage within the work-site area" },
    { job: "Construction operations owner", product: ["commercial", "construction-operations"], risk: "Excavation collapse, falling materials and damage to the adjacent property" },
    { job: "Manufacturer and importer", product: ["commercial", "product-liability"], risk: "Product defects and consumer damage" },
    { job: "Shop and service unit", product: ["commercial", "public-liability"], risk: "Bodily and property damage to customers at the place of business" },
    { job: "Restaurant and hotel", product: ["commercial", "restaurants-hotels"], risk: "Food poisoning, guest falls and property held in custody" },
    { job: "Building manager with an elevator", product: ["commercial", "elevators"], risk: "Elevator and escalator accidents" },
    { job: "Building owner and tenant", product: ["commercial", "property-owners"], risk: "Facade collapse, water leakage and fire damage to neighbors" },
    { job: "Kindergarten and training institute", product: ["commercial", "kindergartens"], risk: "Injury to a child while in care" },
    { job: "Sports club and swimming pool", product: ["commercial", "sports-facilities"], risk: "Sports accidents and defective equipment" },
    { job: "Transport and cargo operator", product: ["commercial", "transport-carriers"], risk: "Cargo damage in transit and third-party injury" },
    { job: "Directors of a joint-stock company", product: ["corporate", "directors-officers"], risk: "Shareholder claims and breach of directors' duties" },
    { job: "Online business holding customer data", product: ["corporate", "cyber-liability"], risk: "Personal data leaks and ransomware" },
    { job: "Individuals and families", product: ["public", "individuals-family"], risk: "Damage caused by minor children and household accidents" },
    { job: "Keeper of a pet or livestock", product: ["public", "animal-owners"], risk: "Bites and animal damage to third parties" },
    { job: "Event and conference organizer", product: ["public", "events-insurance"], risk: "Attendee accidents and temporary structures" },
    { job: "Travel agency and tour operator", product: ["public", "travel-tours"], risk: "Traveler accidents during the trip" },
    { job: "Licensed hunter", product: ["public", "hunters"], risk: "Accidental discharge and damage to livestock" },
  ] as { job: string; product: [EnCategory, string]; risk: string }[],
  faqs: [
    {
      question: "Which liability insurance does a small business in Iran need first?",
      answer:
        "Almost every business with staff starts with employer liability insurance, because Article 91 of the Labor Law places work-related risks on the employer and it is also required for many official registrations. Premises that receive visitors add public liability, and manufacturers add product liability under the Consumer Protection Act.",
    },
    {
      question: "What is the difference between professional and public liability?",
      answer:
        "Professional liability responds to financial or bodily loss caused by an error in your expert service, such as a wrong engineering calculation. Public liability responds to ordinary physical damage to third parties, such as a customer slipping in your shop. Many professions carry both risks and buy the two covers together.",
    },
    {
      question: "Is D&O insurance relevant for private companies in Iran?",
      answer:
        "Yes. Directors of joint-stock companies answer to shareholders and stakeholders under the Commercial Code, and claims of breaching the duty of care are not rare in disputes over management decisions. D&O insurance funds the legal defense of board members and pays proven damages up to the policy limit.",
    },
    {
      question: "How do I choose the right limit of liability?",
      answer:
        "The accepted benchmark is a limit at least equal to the full diyeh of the year of occurrence, because bodily-injury awards follow the judicial diyeh tables. Businesses with high exposure to third parties, such as contractors and hospitality venues, commonly go beyond that minimum; the quotation process shows the cost of each level.",
    },
  ] as EnFaq[],
};
