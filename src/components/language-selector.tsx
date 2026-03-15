"use client";

import Image from "next/image";
import { useLanguage } from "@/lib/i18n";
import type { Language } from "@/lib/i18n";

const REGIONS: { code: Language; flag: string; label: string }[] = [
  { code: "he", flag: "🇮🇱", label: "ישראל" },
  { code: "en", flag: "🇺🇸", label: "United States" },
  { code: "ru", flag: "🇷🇺", label: "Россия" },
];

export function LanguageSelector() {
  const { setLanguage, isReady, hasChosenLanguage } = useLanguage();

  if (!isReady || hasChosenLanguage) return null;

  return (
    <div className="fixed inset-0 z-[9999] bg-black flex flex-col items-center justify-center gap-12 animate-fade-in">
      <div className="flex flex-col items-center gap-6">
        <div className="relative w-20 h-20 rounded-2xl overflow-hidden ring-2 ring-neutral-800">
          <Image
            src="/ghost-icon.png"
            alt="Ghost"
            fill
            className="object-cover"
            priority
          />
        </div>
        <div className="text-center">
          <h1 className="text-white text-lg font-bold tracking-tight mb-1">
            Ghost
          </h1>
          <p className="text-neutral-600 text-xs font-mono uppercase tracking-[0.3em]">
            Camera Intelligence
          </p>
        </div>
      </div>

      <div className="flex flex-col items-center gap-6">
        <p className="text-neutral-500 text-sm">
          Select your region
        </p>

        <div className="flex items-center gap-6">
          {REGIONS.map((region) => (
            <button
              key={region.code}
              onClick={() => setLanguage(region.code)}
              className="group flex flex-col items-center gap-3 cursor-pointer transition-all duration-300"
            >
              <div className="w-16 h-16 rounded-full bg-neutral-900 border-2 border-neutral-800 flex items-center justify-center text-3xl group-hover:border-neutral-600 group-hover:bg-neutral-800 group-hover:scale-110 transition-all duration-300">
                {region.flag}
              </div>
              <span className="text-xs text-neutral-600 group-hover:text-neutral-400 transition-colors font-medium">
                {region.label}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
