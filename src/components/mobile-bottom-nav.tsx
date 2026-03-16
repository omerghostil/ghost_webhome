"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Play, Camera, Info, Menu } from "lucide-react";
import { useState } from "react";
import { useTranslation } from "@/lib/i18n";
import { MobileDrawer } from "@/components/mobile-drawer";

const NAV_ITEMS = [
  { id: "home", href: "/", icon: Home, labelKey: "common.nav.home" },
  { id: "demo", href: "/demo", icon: Play, labelKey: "common.nav.bookDemo" },
  { id: "tryGhost", href: "#try-ghost", icon: Camera, labelKey: "common.buttons.freeDemo", isSpecial: true },
  { id: "about", href: "/about", icon: Info, labelKey: "common.nav.ourStory" },
  { id: "more", href: "#more", icon: Menu, labelKey: "more" },
] as const;

interface MobileBottomNavProps {
  onTryGhost?: () => void;
}

export function MobileBottomNav({ onTryGhost }: MobileBottomNavProps) {
  const pathname = usePathname();
  const { t } = useTranslation();
  const [isMoreOpen, setIsMoreOpen] = useState(false);

  const moreLabel = t("common.nav.home") === "ראשי" ? "עוד" : "More";

  return (
    <>
      <nav className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-white/95 backdrop-blur-lg border-t border-neutral-200 safe-bottom">
        <div className="flex items-center justify-around h-14 px-1 max-w-lg mx-auto">
          {NAV_ITEMS.map((item) => {
            const isActive = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);

            if (item.id === "tryGhost") {
              return (
                <button
                  key={item.id}
                  onClick={onTryGhost}
                  className="flex flex-col items-center justify-center gap-0.5 w-14 h-12 rounded-xl -mt-4 bg-neutral-950 text-white shadow-lg shadow-neutral-950/20 active:scale-95 transition-transform"
                >
                  <item.icon className="w-5 h-5" />
                </button>
              );
            }

            if (item.id === "more") {
              return (
                <button
                  key={item.id}
                  onClick={() => setIsMoreOpen(true)}
                  className="flex flex-col items-center justify-center gap-0.5 min-w-[56px] py-1 active:scale-95 transition-transform"
                >
                  <item.icon className="w-5 h-5 text-neutral-400" />
                  <span className="text-[10px] text-neutral-400">{moreLabel}</span>
                </button>
              );
            }

            return (
              <Link
                key={item.id}
                href={item.href}
                className="flex flex-col items-center justify-center gap-0.5 min-w-[56px] py-1 active:scale-95 transition-transform"
              >
                <item.icon className={`w-5 h-5 ${isActive ? "text-neutral-950" : "text-neutral-400"}`} />
                <span className={`text-[10px] ${isActive ? "text-neutral-950 font-bold" : "text-neutral-400"}`}>
                  {t(item.labelKey)}
                </span>
              </Link>
            );
          })}
        </div>
      </nav>

      <MobileDrawer isOpen={isMoreOpen} onClose={() => setIsMoreOpen(false)}>
        <div className="py-2">
          <MoreNavLink href="/careers" onClick={() => setIsMoreOpen(false)}>
            {t("common.nav.careers")}
          </MoreNavLink>
          <MoreNavLink href="/login" onClick={() => setIsMoreOpen(false)}>
            {t("common.nav.login")}
          </MoreNavLink>
          <MoreNavLink href="/partners/login" onClick={() => setIsMoreOpen(false)}>
            {t("common.nav.distributorLogin")}
          </MoreNavLink>
          <MoreNavLink href="/partners/join" onClick={() => setIsMoreOpen(false)}>
            {t("common.nav.distributorPortal")}
          </MoreNavLink>
        </div>
      </MobileDrawer>
    </>
  );
}

function MoreNavLink({ href, children, onClick }: { href: string; children: React.ReactNode; onClick: () => void }) {
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
