"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from "react";
import {
  type Language,
  LANGUAGES,
  STORAGE_KEY,
  LANGUAGE_GATE_VERSION,
  LANGUAGE_GATE_STORAGE_KEY,
} from "./types";
import { getTranslations } from "./translations";

interface LanguageContextValue {
  language: Language;
  setLanguage: (lang: Language) => void;
  dir: "rtl" | "ltr";
  isReady: boolean;
  hasChosenLanguage: boolean;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>("he");
  const [isReady, setIsReady] = useState(false);
  const [hasChosenLanguage, setHasChosenLanguage] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY) as Language | null;
    const gateOk =
      localStorage.getItem(LANGUAGE_GATE_STORAGE_KEY) === LANGUAGE_GATE_VERSION;

    if (stored && stored in LANGUAGES) {
      setLanguageState(stored);
      const config = LANGUAGES[stored];
      document.documentElement.lang = config.code;
      document.documentElement.dir = config.dir;
    }

    setHasChosenLanguage(gateOk);
    setIsReady(true);
  }, []);

  const setLanguage = useCallback((lang: Language) => {
    setLanguageState(lang);
    setHasChosenLanguage(true);
    localStorage.setItem(STORAGE_KEY, lang);
    localStorage.setItem(LANGUAGE_GATE_STORAGE_KEY, LANGUAGE_GATE_VERSION);

    const config = LANGUAGES[lang];
    document.documentElement.lang = config.code;
    document.documentElement.dir = config.dir;
  }, []);

  const dir = LANGUAGES[language].dir;

  return (
    <LanguageContext.Provider
      value={{ language, setLanguage, dir, isReady, hasChosenLanguage }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider");
  return ctx;
}

type NestedRecord = { [key: string]: string | string[] | NestedRecord | NestedRecord[] };

function getNestedValue(obj: NestedRecord, path: string): unknown {
  return path.split(".").reduce<unknown>((acc, key) => {
    if (acc && typeof acc === "object" && !Array.isArray(acc)) {
      return (acc as NestedRecord)[key];
    }
    return undefined;
  }, obj);
}

export function useTranslation() {
  const { language } = useLanguage();
  const translations = getTranslations(language);

  const t = useCallback(
    (key: string, fallback?: string): string => {
      const value = getNestedValue(translations as unknown as NestedRecord, key);
      if (typeof value === "string") return value;
      return fallback ?? key;
    },
    [translations],
  );

  const tArray = useCallback(
    <T = unknown>(key: string): T[] => {
      const value = getNestedValue(translations as unknown as NestedRecord, key);
      if (Array.isArray(value)) return value as T[];
      return [];
    },
    [translations],
  );

  return { t, tArray, language };
}
