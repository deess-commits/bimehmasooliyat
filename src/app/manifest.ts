import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${siteConfig.name} — مرجع بیمه مسئولیت`,
    short_name: siteConfig.name,
    description: siteConfig.description,
    start_url: "/",
    display: "standalone",
    dir: "rtl",
    lang: "fa-IR",
    background_color: "#ffffff",
    theme_color: "#047857",
    icons: [
      {
        src: "/bimeh-iran-emblem.png",
        sizes: "256x256",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/logo.png",
        sizes: "316x316",
        type: "image/png",
        purpose: "any",
      },
    ],
  };
}
