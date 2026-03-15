"use client";

import { Clock, Search, MessageSquare, Zap } from "lucide-react";
import { useTranslation } from "@/lib/i18n";

const ADVANTAGE_ICONS = [Zap, MessageSquare, Search, Clock];

const EXAMPLES = [
  {
    environment: "קמעונאות",
    description: "זיהוי גניבות, חפצים חשודים, ציות לנהלים ואירועים חריגים בחנויות ומרכזי מסחר.",
    queries: [
      "האם היה אדם שהכניס מוצר לתיק או לכיס ללא תשלום?",
      "האם היה מישהו שפתח אריזה בחנות?",
      "האם היה אדם עם כלי נשק או חפץ חשוד?",
      "האם היו מוצרים מפוזרים על הרצפה?",
      "האם היה עובד ללא תג שם או מדים?",
      "האם היתה דלת מחסן פתוחה ללא נוכחות עובד?",
      "האם היה אדם שנראה במצוקה או שוכב על הרצפה?",
    ],
  },
  {
    environment: "מסעדות ואירועים",
    description: "בקרת סטנדרט שירות, ניקיון, מדים ותנאי הגשה באולמות ומסעדות.",
    queries: [
      "האם היו שולחנות לא ערוכים בזמן פתיחה?",
      "האם היו כלים מלוכלכים על שולחן פנוי?",
      "האם היה מלצר ללא מדים מלאים?",
      "האם היתה רצפה רטובה או מלוכלכת באזור האורחים?",
      "האם היה אוכל חשוף ללא כיסוי בדלפק?",
      "האם היתה פסולת או שקיות אשפה באזור הישיבה?",
      "האם היו נרות כבויים על שולחנות ערוכים?",
    ],
  },
  {
    environment: "בתי חולים ומוסדות",
    description: "שמירה על בטיחות, ניקיון ונגישות במסדרונות, מחלקות ואזורים ציבוריים.",
    queries: [
      "האם היה מסדרון חסום על ידי מיטות או כסאות גלגלים?",
      "האם היה אדם שוכב על הרצפה?",
      "האם היו נוזלים על הרצפה באזור המעבר?",
      "האם היה צוות ללא מדים באזור הטיפול?",
      "האם היו ציוד רפואי או עגלות חוסמים מעבר חירום?",
      "האם היה אדם שנראה במצוקה באזור ההמתנה?",
      "האם היתה דלת חדר תרופות פתוחה ללא השגחה?",
    ],
  },
  {
    environment: "רשויות מקומיות ופארקים",
    description: "ניטור מרחבים ציבוריים, פארקים, מגרשים וכיכרות עירוניות.",
    queries: [
      "האם היו בקבוקי אלכוהול נראים באזור הפארק?",
      "האם היתה אשפה או פסולת חריגה במגרש?",
      "האם היו גרפיטי חדשים על קירות או מתקנים?",
      "האם היה אדם ישן על ספסל ציבורי?",
      "האם היו רכבים חונים על מדרכה או שטח ירוק?",
      "האם היה מתקן שבור או מפגע בטיחותי בגן משחקים?",
      "האם היה אדם עם כלי נשק או התנהגות אלימה?",
    ],
  },
  {
    environment: "תעשייה ולוגיסטיקה",
    description: "ציות לנהלי בטיחות, ציוד מגן, מפגעים ותנאי עבודה במפעלים ומחסנים.",
    queries: [
      "האם היה עובד ללא קסדת מגן באזור הייצור?",
      "האם היה שפך או נוזל על רצפת המפעל?",
      "האם היתה סחורה חוסמת מעבר חירום?",
      "האם היה עובד ללא נעלי בטיחות?",
      "האם היו כלי עבודה מונחים שלא במקומם?",
      "האם היתה משאית פורקת ללא חרוטי בטיחות?",
      "האם היו סימני עישון באזור אסור?",
    ],
  },
  {
    environment: "משרדים וחברות",
    description: "אבטחה, ציות לנהלים ובקרת גישה במשרדים, חדרי שרתים ואזורים מוגבלים.",
    queries: [
      "האם היה אדם ללא תג עובד באזור המשרדים?",
      "האם היתה דלת חדר שרתים פתוחה?",
      "האם היו מסמכים חשופים על שולחנות לאחר שעות?",
      "האם היה אדם באזור מוגבל?",
      "האם היה ציוד IT מונח מחוץ לארון נעול?",
      "האם היה חלון או דלת חיצונית פתוחים?",
    ],
  },
  {
    environment: "חניונים ותחבורה",
    description: "בטיחות, סדר ופיקוח בחניונים, תחנות ואזורי תחבורה.",
    queries: [
      "האם היה רכב חונה במקום נכים ללא תו?",
      "האם היה רכב חוסם כניסת חירום?",
      "האם היה אדם ליד רכב שנראה כפורץ?",
      "האם היתה שלולית שמן או נוזל מתחת לרכב?",
      "האם היה אדם שנראה במצוקה בחניון?",
      "האם היה רכב עם אורות דולקים ודלתות פתוחות?",
    ],
  },
  {
    environment: "חינוך",
    description: "בטיחות תלמידים, אבטחת מתחם ופיקוח על אזורים רגישים במוסדות חינוך.",
    queries: [
      "האם היה אדם מבוגר לא מזוהה בחצר בית הספר?",
      "האם היו ילדים ללא השגחת מבוגר?",
      "האם היה חפץ חשוד בכניסה למוסד?",
      "האם היתה תקרית אלימות נראית?",
      "האם היו תלמידים באזור אסור כמו גג או חדר טכני?",
      "האם היה גדר פרוצה או פתח באבטחה ההיקפית?",
    ],
  },
];

export default function PastSearchPage() {
  const { t, tArray } = useTranslation();

  const advantages = tArray<{ title: string; desc: string }>("components.pastSearch.advantages").map((adv, i) => ({
    icon: ADVANTAGE_ICONS[i],
    title: adv.title,
    desc: adv.desc,
  }));

  return (
    <div className="px-8 lg:px-12 py-12">
      {/* Header */}
      <div className="max-w-3xl mb-16">
        <span className="text-[10px] uppercase tracking-[0.2em] text-neutral-400 font-bold">
          {t("components.pastSearch.badge")}
        </span>
        <h1 className="text-3xl lg:text-5xl font-bold tracking-tight mt-3 mb-6">
          {t("components.pastSearch.title")}
          <br />
          <span className="text-neutral-400">{t("components.pastSearch.titleHighlight")}</span>
        </h1>
        <p className="text-lg text-neutral-500 leading-relaxed mb-4">
          {t("components.pastSearch.description1")}
        </p>
        <p className="text-neutral-500 leading-relaxed">
          {t("components.pastSearch.description2")}
        </p>
      </div>

      {/* Advantages */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-20">
        {advantages.map((adv, i) => (
          <div key={i} className="border border-neutral-200 rounded-xl p-5 hover:border-neutral-300 transition-colors">
            <adv.icon className="w-5 h-5 text-neutral-400 mb-3" strokeWidth={1.5} />
            <h3 className="text-sm font-bold mb-1">{adv.title}</h3>
            <p className="text-xs text-neutral-500 leading-relaxed">{adv.desc}</p>
          </div>
        ))}
      </div>

      {/* Examples by environment */}
      <div className="mb-8">
        <span className="text-[10px] uppercase tracking-[0.2em] text-neutral-400 font-bold">
          {t("components.pastSearch.examplesTitle")}
        </span>
        <h2 className="text-2xl lg:text-3xl font-bold tracking-tight mt-3 mb-2">
          {t("components.pastSearch.examplesSubtitle")}
        </h2>
        <p className="text-neutral-500 mb-12">
          {t("components.pastSearch.examplesDescription")}
        </p>
      </div>

      <div className="space-y-12">
        {EXAMPLES.map((group, gi) => (
          <div key={gi}>
            <div className="flex items-baseline gap-3 mb-2">
              <h3 className="text-lg font-bold">{group.environment}</h3>
              <span className="text-xs text-neutral-400">{group.queries.length} {t("components.pastSearch.examples")}</span>
            </div>
            <p className="text-sm text-neutral-500 mb-4">{group.description}</p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
              {group.queries.map((q, qi) => (
                <div
                  key={qi}
                  className="border border-neutral-200 rounded-lg px-4 py-3 bg-white hover:border-neutral-300 transition-colors group"
                >
                  <div className="flex items-start gap-2">
                    <Search className="w-3.5 h-3.5 text-neutral-300 mt-0.5 flex-shrink-0 group-hover:text-neutral-500 transition-colors" strokeWidth={1.5} />
                    <p className="text-xs text-neutral-600 leading-relaxed">&ldquo;{q}&rdquo;</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Bottom CTA */}
      <div className="mt-20 border border-neutral-200 rounded-2xl p-8 text-center bg-neutral-50/50">
        <h3 className="text-xl font-bold mb-2">{t("components.pastSearch.ctaTitle")}</h3>
        <p className="text-sm text-neutral-500 mb-6">
          {t("components.pastSearch.ctaDescription")}
        </p>
        <a
          href="/demo"
          className="inline-flex items-center justify-center bg-neutral-950 text-white hover:bg-neutral-800 rounded-full h-11 px-7 text-sm font-bold transition-colors"
        >
          {t("components.pastSearch.ctaButton")}
        </a>
      </div>
    </div>
  );
}
