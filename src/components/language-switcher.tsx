"use client";

import { useLanguage } from "@/lib/i18n";
import type { Language } from "@/lib/i18n";

const LANG_LABELS: Record<Language, string> = {
  he: "HE",
  en: "EN",
  ru: "RU",
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
      className="w-8 h-8 rounded bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 hover:border-neutral-700 flex items-center justify-center text-[10px] font-mono text-neutral-400 hover:text-neutral-200 transition-colors cursor-pointer tracking-wider"
      title="Switch language"
    >
      {LANG_LABELS[language]}
    </button>
  );
}
