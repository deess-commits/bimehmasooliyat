// ─── Zod Validation Schemas (shared client/server) ─────────────────

import { z } from "zod";

export const quoteSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(3, "نام و نام خانوادگی را کامل وارد کنید")
    .max(80, "نام بیش از حد طولانی است"),
  phone: z
    .string()
    .trim()
    .regex(/^09\d{9}$/, "شماره موبایل معتبر (۰۹xxxxxxxxx) وارد کنید"),
  city: z.string().trim().max(60).optional().or(z.literal("")),
  productSlug: z.string().trim().max(60).optional().or(z.literal("")),
  productName: z.string().trim().max(120).optional().or(z.literal("")),
  desiredCoverage: z.string().trim().max(60).optional().or(z.literal("")),
  message: z.string().trim().max(1000).optional().or(z.literal("")),
  consent: z.literal(true, {
    message: "پذیرش سیاست حریم خصوصی الزامی است",
  }),
  // Honeypot + math captcha
  website: z.string().max(0, "درخواست رد شد").optional().or(z.literal("")),
  captcha: z.object({
    a: z.number().int().min(0).max(9),
    b: z.number().int().min(0).max(9),
    answer: z.number().int(),
  }),
});

export type QuoteInput = z.infer<typeof quoteSchema>;

export const contactSchema = z.object({
  fullName: z.string().trim().min(3, "نام را کامل وارد کنید").max(80),
  phone: z
    .string()
    .trim()
    .regex(/^0\d{10}$/, "شماره تماس معتبر وارد کنید"),
  email: z.string().trim().email("ایمیل معتبر وارد کنید").optional().or(z.literal("")),
  subject: z.string().trim().min(3, "موضوع را وارد کنید").max(120),
  message: z.string().trim().min(10, "متن پیام کوتاه است").max(2000),
  website: z.string().max(0, "درخواست رد شد").optional().or(z.literal("")),
});

export type ContactInput = z.infer<typeof contactSchema>;

export const newsletterSchema = z.object({
  email: z.string().trim().email("ایمیل معتبر وارد کنید").max(160),
  website: z.string().max(0, "درخواست رد شد").optional().or(z.literal("")),
});

export type NewsletterInput = z.infer<typeof newsletterSchema>;

export const reviewSchema = z.object({
  name: z.string().trim().min(3, "نام را کامل وارد کنید").max(60),
  city: z.string().trim().max(60).optional().or(z.literal("")),
  productSlug: z.string().trim().max(60).optional().or(z.literal("")),
  rating: z.number().int().min(1, "امتیاز بین ۱ تا ۵").max(5, "امتیاز بین ۱ تا ۵"),
  text: z.string().trim().min(20, "متن نظر حداقل ۲۰ نویسه باشد").max(600, "متن نظر حداکثر ۶۰۰ نویسه"),
  website: z.string().max(0, "درخواست رد شد").optional().or(z.literal("")),
});

export type ReviewInput = z.infer<typeof reviewSchema>;
