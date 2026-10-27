"use client";

import { useCallback, useState } from "react";
import { Check, Share2 } from "lucide-react";

interface ShareButtonProps {
  title: string;
  /** مسیر نسبی صفحه — با origin ترکیب می‌شود */
  path: string;
  label?: string;
  copiedLabel?: string;
  className?: string;
}

/**
 * دکمه اشتراک‌گذاری بومی (Web Share API) با جایگزین «کپی لینک».
 * بدون هیچ درخواست شبکه — فقط API مرورگر.
 */
export function ShareButton({
  title,
  path,
  label = "اشتراک‌گذاری",
  copiedLabel = "کپی شد",
  className = "",
}: ShareButtonProps) {
  const [copied, setCopied] = useState(false);

  const onClick = useCallback(async () => {
    const url = `${window.location.origin}${path}`;
    const nav = window.navigator as Navigator & {
      share?: (data: { title?: string; url?: string }) => Promise<void>;
    };

    // 1) Web Share API (موبایل) — لغو توسط کاربر به کپی fallback نمی‌خواهد
    if (typeof nav.share === "function") {
      try {
        await nav.share({ title, url });
        return;
      } catch {
        return; // کاربر لغو کرد
      }
    }

    // 2) کپی لینک (دسکتاپ)
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      /* کلیپ‌بورد در دسترس نیست — بی‌صدا */
    }
  }, [path, title]);

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={copied ? copiedLabel : label}
      title={label}
      className={`inline-flex items-center gap-1.5 rounded-full border bg-card px-3 py-1.5 text-xs font-semibold text-muted-foreground transition-colors hover:border-primary/40 hover:text-primary ${className}`}
    >
      {copied ? (
        <Check className="size-3.5 text-primary" aria-hidden="true" />
      ) : (
        <Share2 className="size-3.5" aria-hidden="true" />
      )}
      {copied ? copiedLabel : label}
    </button>
  );
}
