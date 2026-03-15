import { he } from "./he";
import { en } from "./en";
import { ru } from "./ru";
import type { Language } from "../types";

const TRANSLATIONS: Record<Language, typeof he> = { he, en, ru };

export function getTranslations(language: Language) {
  return TRANSLATIONS[language];
}
