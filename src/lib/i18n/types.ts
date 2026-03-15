export type Language = "he" | "en" | "ru";

export interface LanguageConfig {
  code: Language;
  dir: "rtl" | "ltr";
  label: string;
  flag: string;
}

export const LANGUAGES: Record<Language, LanguageConfig> = {
  he: { code: "he", dir: "rtl", label: "ישראל", flag: "🇮🇱" },
  en: { code: "en", dir: "ltr", label: "United States", flag: "🇺🇸" },
  ru: { code: "ru", dir: "ltr", label: "Россия", flag: "🇷🇺" },
};

export const STORAGE_KEY = "ghost-language";
