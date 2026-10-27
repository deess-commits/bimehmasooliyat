import { getArticles } from "@/lib/data";
import { claimGuides } from "@/prisma/seed-data/claim-guides";
import { siteConfig } from "@/lib/site";

export const revalidate = 3600;

function esc(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export async function GET() {
  const articles = await getArticles();

  const articleItems = articles
    .map(
      (a) => `  <item>
    <title>${esc(a.title)}</title>
    <link>${siteConfig.url}/blog/${a.slug}</link>
    <guid isPermaLink="true">${siteConfig.url}/blog/${a.slug}</guid>
    <description>${esc(a.excerpt)}</description>
    <category>مقاله</category>
    <pubDate>${new Date(a.publishedAt).toUTCString()}</pubDate>
  </item>`,
    )
    .join("\n");

  // راهنماهای تخصصی خسارت — محتوای همیشه‌سبز برای خواننده‌های فید
  const guideItems = claimGuides
    .map(
      (g) => `  <item>
    <title>${esc(g.title)}</title>
    <link>${siteConfig.url}/claims/${g.slug}</link>
    <guid isPermaLink="true">${siteConfig.url}/claims/${g.slug}</guid>
    <description>${esc(g.answerBlock)}</description>
    <category>راهنمای خسارت</category>
    <pubDate>${new Date().toUTCString()}</pubDate>
  </item>`,
    )
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>${esc(siteConfig.name)} — دانشنامه بیمه مسئولیت</title>
    <link>${siteConfig.url}/blog</link>
    <description>${esc(siteConfig.description)}</description>
    <language>fa-ir</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
${articleItems}
${guideItems}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
