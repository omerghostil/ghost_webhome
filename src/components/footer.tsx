"use client";

import Image from "next/image";
import { useTranslation } from "@/lib/i18n";

export function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="border-t border-neutral-200 py-8">
      <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <Image src="/ghost-icon.png" alt="Ghost" width={20} height={20} className="rounded-sm grayscale opacity-40" />
          <span className="text-xs font-bold tracking-[0.15em] text-neutral-300 uppercase">Ghost</span>
        </div>
        <p className="text-xs text-neutral-300">{t("common.footer.rights")}</p>
      </div>
    </footer>
  );
}
