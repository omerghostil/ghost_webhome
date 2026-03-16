"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTranslation } from "@/lib/i18n";
import { LanguageSwitcher } from "@/components/language-switcher";
import { MobileDrawer } from "@/components/mobile-drawer";

interface NavbarProps {
  variant?: "default" | "partners";
}

function MobileNavLink({ href, children, onClick }: { href: string; children: React.ReactNode; onClick: () => void }) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className="flex items-center px-5 py-3.5 text-sm text-neutral-700 hover:bg-neutral-50 active:bg-neutral-100 transition-colors"
    >
      {children}
    </Link>
  );
}

export function Navbar({ variant = "default" }: NavbarProps) {
  const { t } = useTranslation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  if (variant === "partners") {
    return (
      <>
        <nav className="border-b border-neutral-100 bg-white/80 backdrop-blur-md sticky top-0 z-50 safe-top">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 h-14 sm:h-16 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsMobileMenuOpen(true)}
                className="md:hidden w-10 h-10 flex items-center justify-center rounded-full hover:bg-neutral-100 active:scale-95 transition-all"
                aria-label="Open menu"
              >
                <Menu className="w-5 h-5 text-neutral-700" />
              </button>
              <Link href="/" className="flex items-center">
                <Image src="/ghost-icon.png" alt="Ghost" width={34} height={34} className="rounded-lg sm:w-[38px] sm:h-[38px]" />
              </Link>
            </div>
            <div className="hidden md:flex items-center gap-8 text-sm text-neutral-500">
              <Link href="/" className="hover:text-neutral-950 transition-colors">{t("common.nav.home")}</Link>
              <Link href="/about" className="hover:text-neutral-950 transition-colors">{t("common.nav.ourStory")}</Link>
              <Link href="/partners/login" className="hover:text-neutral-950 transition-colors font-bold text-neutral-950">
                {t("common.nav.distributorPortal")}
              </Link>
            </div>
            <div className="flex items-center gap-2 sm:gap-3">
              <LanguageSwitcher />
              <Link href="/demo">
                <Button className="bg-neutral-950 text-white hover:bg-neutral-800 rounded-full h-9 px-4 sm:px-5 text-xs font-bold">
                  {t("common.nav.bookDemo")}
                </Button>
              </Link>
            </div>
          </div>
        </nav>

        <MobileDrawer isOpen={isMobileMenuOpen} onClose={closeMobileMenu}>
          <div className="py-2">
            <MobileNavLink href="/" onClick={closeMobileMenu}>{t("common.nav.home")}</MobileNavLink>
            <MobileNavLink href="/about" onClick={closeMobileMenu}>{t("common.nav.ourStory")}</MobileNavLink>
            <MobileNavLink href="/partners/login" onClick={closeMobileMenu}>{t("common.nav.distributorPortal")}</MobileNavLink>
            <div className="border-t border-neutral-100 my-2" />
            <MobileNavLink href="/demo" onClick={closeMobileMenu}>{t("common.nav.bookDemo")}</MobileNavLink>
          </div>
        </MobileDrawer>
      </>
    );
  }

  return (
    <>
      <nav className="border-b border-neutral-100 bg-white/80 backdrop-blur-md sticky top-0 z-50 safe-top">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-14 sm:h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="md:hidden w-10 h-10 flex items-center justify-center rounded-full hover:bg-neutral-100 active:scale-95 transition-all"
              aria-label="Open menu"
            >
              <Menu className="w-5 h-5 text-neutral-700" />
            </button>
            <Link href="/" className="flex items-center">
              <Image src="/ghost-icon.png" alt="Ghost" width={34} height={34} className="rounded-lg sm:w-[38px] sm:h-[38px]" />
            </Link>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm text-neutral-500">
            <a href="/#msg1" className="hover:text-neutral-950 transition-colors">{t("common.nav.navigation")}</a>
            <a href="/#msg2" className="hover:text-neutral-950 transition-colors">{t("common.nav.chat")}</a>
            <a href="/#msg3" className="hover:text-neutral-950 transition-colors">{t("common.nav.checks")}</a>
            <a href="/#msg4" className="hover:text-neutral-950 transition-colors">{t("common.nav.alerts")}</a>
            <Link href="/about" className="hover:text-neutral-950 transition-colors">{t("common.nav.ourStory")}</Link>
            <Link href="/careers" className="hover:text-neutral-950 transition-colors">{t("common.nav.careers")}</Link>
          </div>
          <div className="flex items-center gap-2 sm:gap-3">
            <LanguageSwitcher />
            <Link href="/login" className="hidden sm:block">
              <Button variant="outline" className="border-neutral-300 text-neutral-600 hover:bg-neutral-50 rounded-full h-9 px-4 text-xs">
                {t("common.nav.login")}
              </Button>
            </Link>
            <Link href="/partners/login" className="hidden lg:block">
              <Button variant="outline" className="border-neutral-300 text-neutral-600 hover:bg-neutral-50 rounded-full h-9 px-4 text-xs">
                {t("common.nav.distributorLogin")}
              </Button>
            </Link>
            <Link href="/demo" className="hidden sm:block">
              <Button className="bg-neutral-950 text-white hover:bg-neutral-800 rounded-full h-9 px-5 text-xs font-bold">
                {t("common.nav.bookDemo")}
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      <MobileDrawer isOpen={isMobileMenuOpen} onClose={closeMobileMenu}>
        <div className="py-2">
          <MobileNavLink href="/" onClick={closeMobileMenu}>{t("common.nav.home")}</MobileNavLink>
          <MobileNavLink href="/about" onClick={closeMobileMenu}>{t("common.nav.ourStory")}</MobileNavLink>
          <MobileNavLink href="/careers" onClick={closeMobileMenu}>{t("common.nav.careers")}</MobileNavLink>
          <div className="border-t border-neutral-100 my-2" />
          <div className="px-5 py-1 text-[10px] uppercase tracking-[0.15em] text-neutral-400 font-bold">
            Ghost
          </div>
          <MobileNavLink href="/#msg1" onClick={closeMobileMenu}>{t("common.nav.navigation")}</MobileNavLink>
          <MobileNavLink href="/#msg2" onClick={closeMobileMenu}>{t("common.nav.chat")}</MobileNavLink>
          <MobileNavLink href="/#msg3" onClick={closeMobileMenu}>{t("common.nav.checks")}</MobileNavLink>
          <MobileNavLink href="/#msg4" onClick={closeMobileMenu}>{t("common.nav.alerts")}</MobileNavLink>
          <div className="border-t border-neutral-100 my-2" />
          <MobileNavLink href="/demo" onClick={closeMobileMenu}>{t("common.nav.bookDemo")}</MobileNavLink>
          <MobileNavLink href="/login" onClick={closeMobileMenu}>{t("common.nav.login")}</MobileNavLink>
          <MobileNavLink href="/partners/login" onClick={closeMobileMenu}>{t("common.nav.distributorLogin")}</MobileNavLink>
        </div>
      </MobileDrawer>
    </>
  );
}
