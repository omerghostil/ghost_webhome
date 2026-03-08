"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { History, Radio, Bell, ArrowRight } from "lucide-react";

const CAPABILITIES = [
  {
    id: "past-search",
    href: "/past-search",
    label: "חיפוש בעבר",
    desc: "מצא כל דבר שקרה מול המצלמות",
    icon: History,
    ready: true,
  },
  {
    id: "realtime",
    href: "/realtime",
    label: "ניטור בזמן אמת",
    desc: "שאל מה קורה עכשיו מול כל מצלמה",
    icon: Radio,
    ready: false,
  },
  {
    id: "alerts",
    href: "/alerts",
    label: "התראות ובדיקות",
    desc: "ניטור פרואקטיבי, טריגרים ותזמונים",
    icon: Bell,
    ready: false,
  },
];

export function CapabilitiesSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-60 sticky top-16 h-[calc(100vh-4rem)] border-l border-neutral-100 py-6 px-5 hidden lg:block overflow-y-auto flex-shrink-0">
      <Link
        href="/"
        className="flex items-center gap-1.5 text-xs text-neutral-400 hover:text-neutral-600 transition-colors mb-8"
      >
        <ArrowRight className="w-3 h-3" />
        חזרה לעמוד הבית
      </Link>

      <p className="text-[10px] uppercase tracking-[0.15em] text-neutral-400 font-bold mb-4">
        יכולות Ghost
      </p>

      <nav className="space-y-1.5">
        {CAPABILITIES.map((cap) => {
          const isActive = pathname === cap.href;

          if (!cap.ready) {
            return (
              <div key={cap.id} className="p-3 rounded-xl text-neutral-300 cursor-not-allowed">
                <div className="flex items-center gap-2 mb-0.5">
                  <cap.icon className="w-4 h-4" strokeWidth={1.5} />
                  <span className="text-sm font-bold">{cap.label}</span>
                  <span className="text-[9px] bg-neutral-100 text-neutral-400 rounded px-1.5 py-0.5 font-bold mr-auto">
                    בקרוב
                  </span>
                </div>
                <p className="text-[11px] pr-6">{cap.desc}</p>
              </div>
            );
          }

          return (
            <Link
              key={cap.id}
              href={cap.href}
              className={`block p-3 rounded-xl transition-colors ${
                isActive
                  ? "bg-neutral-950 text-white"
                  : "hover:bg-neutral-50 text-neutral-600"
              }`}
            >
              <div className="flex items-center gap-2 mb-0.5">
                <cap.icon className="w-4 h-4" strokeWidth={1.5} />
                <span className="text-sm font-bold">{cap.label}</span>
              </div>
              <p className={`text-[11px] pr-6 ${isActive ? "text-neutral-400" : "text-neutral-400"}`}>
                {cap.desc}
              </p>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
