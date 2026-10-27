// ─── Formatting Helpers (fa-IR) ────────────────────────────────────

const FA_DIGITS = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];

export function toFaDigits(input: string | number): string {
  return String(input).replace(/\d/g, (d) => FA_DIGITS[Number(d)]);
}

export function faNumber(n: number): string {
  return toFaDigits(n.toLocaleString("en-US"));
}

export function faDate(iso: string): string {
  try {
    return toFaDigits(
      new Intl.DateTimeFormat("fa-IR-u-ca-persian", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }).format(new Date(iso)),
    );
  } catch {
    return iso;
  }
}

export function productUrl(categoryKey: string, slug: string): string {
  return `/liability/${categoryKey}/${slug}`;
}
