"use client";

import { useLanguage } from "@/lib/i18n";
import type { Language } from "@/lib/i18n";

const FLAGS: Record<Language, string> = {
  he: "🇮🇱",
  en: "🇺🇸",
  ru: "🇷🇺",
};

const NEXT_LANG: Record<Language, Language> = {
  he: "en",
  en: "ru",
  ru: "he",
};

export function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();

  const handleCycle = () => {
    setLanguage(NEXT_LANG[language]);
    window.location.reload();
  };

  return (
    <button
      onClick={handleCycle}
      className="w-8 h-8 rounded-full bg-neutral-100 hover:bg-neutral-200 flex items-center justify-center text-sm transition-colors cursor-pointer"
      title="Switch language"
    >
      {FLAGS[language]}
    </button>
  );
}
