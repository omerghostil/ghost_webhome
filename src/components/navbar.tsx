"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useTranslation } from "@/lib/i18n";
import { LanguageSwitcher } from "@/components/language-switcher";

interface NavbarProps {
  variant?: "default" | "partners";
}

export function Navbar({ variant = "default" }: NavbarProps) {
  const { t } = useTranslation();

  if (variant === "partners") {
    return (
      <nav className="border-b border-neutral-100 bg-white/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center">
            <Image src="/ghost-icon.png" alt="Ghost" width={38} height={38} className="rounded-lg" />
          </Link>
          <div className="hidden md:flex items-center gap-8 text-sm text-neutral-500">
            <Link href="/" className="hover:text-neutral-950 transition-colors">{t("common.nav.home")}</Link>
            <Link href="/about" className="hover:text-neutral-950 transition-colors">{t("common.nav.ourStory")}</Link>
            <Link href="/partners/login" className="hover:text-neutral-950 transition-colors font-bold text-neutral-950">
              {t("common.nav.distributorPortal")}
            </Link>
          </div>
          <div className="flex items-center gap-3">
            <LanguageSwitcher />
            <Link href="/demo">
              <Button className="bg-neutral-950 text-white hover:bg-neutral-800 rounded-full h-9 px-5 text-xs font-bold">
                {t("common.nav.bookDemo")}
              </Button>
            </Link>
          </div>
        </div>
      </nav>
    );
  }

  return (
    <nav className="border-b border-neutral-100 bg-white/80 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center">
          <Image src="/ghost-icon.png" alt="Ghost" width={38} height={38} className="rounded-lg" />
        </Link>
        <div className="hidden md:flex items-center gap-8 text-sm text-neutral-500">
          <a href="/#msg1" className="hover:text-neutral-950 transition-colors">{t("common.nav.navigation")}</a>
          <a href="/#msg2" className="hover:text-neutral-950 transition-colors">{t("common.nav.chat")}</a>
          <a href="/#msg3" className="hover:text-neutral-950 transition-colors">{t("common.nav.checks")}</a>
          <a href="/#msg4" className="hover:text-neutral-950 transition-colors">{t("common.nav.alerts")}</a>
          <Link href="/about" className="hover:text-neutral-950 transition-colors">{t("common.nav.ourStory")}</Link>
          <Link href="/careers" className="hover:text-neutral-950 transition-colors">{t("common.nav.careers")}</Link>
        </div>
        <div className="flex items-center gap-3">
          <LanguageSwitcher />
          <Link href="/partners/login">
            <Button variant="outline" className="border-neutral-300 text-neutral-600 hover:bg-neutral-50 rounded-full h-9 px-4 text-xs">
              {t("common.nav.distributorLogin")}
            </Button>
          </Link>
          <Link href="/demo">
            <Button className="bg-neutral-950 text-white hover:bg-neutral-800 rounded-full h-9 px-5 text-xs font-bold">
              {t("common.nav.bookDemo")}
            </Button>
          </Link>
        </div>
      </div>
    </nav>
  );
}
