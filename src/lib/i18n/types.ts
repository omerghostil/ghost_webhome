export type Language = "he" | "en" | "ru";

export interface LanguageConfig {
  code: Language;
  dir: "rtl" | "ltr";
  label: string;
}

export const LANGUAGES: Record<Language, LanguageConfig> = {
  he: { code: "he", dir: "rtl", label: "עברית" },
  en: { code: "en", dir: "ltr", label: "English" },
  ru: { code: "ru", dir: "ltr", label: "Русский" },
};

/** מפתח שמירת השפה הנבחרת ב-localStorage */
export const STORAGE_KEY = "ghost-language";

/**
 * גרסת שער בחירת השפה (מסך הפתיחה). שינוי הערך מציג מחדש את המסך לכל המשתמשים פעם אחת.
 */
export const LANGUAGE_GATE_VERSION = "2";

/** מפתח לאישור מעבר במסך בחירת השפה לפי גרסה */
export const LANGUAGE_GATE_STORAGE_KEY = "ghost-lang-gate";
