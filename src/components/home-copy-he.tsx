"use client";

import { motion } from "framer-motion";

interface ExampleItem {
  sector: string;
  text: string;
}

interface VisualStep {
  label: string;
  description: string;
}

interface PanelData {
  id: "msg2" | "msg3" | "msg4";
  index: string;
  label: string;
  title: string;
  subtitle: string;
  shortDescription: string;
  bullets: string[];
  examples: ExampleItem[];
  query: string;
  visualSteps: VisualStep[];
  resultTitle: string;
  resultLines: string[];
}

const PANELS: PanelData[] = [
  {
    id: "msg2",
    index: "01",
    label: "עבר",
    title: "אל תחפשו שעות של הקלטות.",
    subtitle: "פשוט שואלים מה היה ו-Ghost מחזיר את הרגעים המדויקים.",
    shortDescription:
      "במקום לשבת על ארכיון וידאו ולהריץ קדימה ואחורה, אתם כותבים שאלה אחת בשפה טבעית ומקבלים נקודת זמן רלוונטית עם הקשר ברור.",
    bullets: [
      "חיפוש לפי סצנה שלמה: הקשר, חפצים, מיקום וחריגות.",
      "איתור מהיר באירועים ישנים בלי לנחש טווחי זמן מראש.",
      "תוצאות שמוכנות לפעולה: רגע, תיאור, ומה לבדוק הלאה.",
      "שפה טבעית מלאה גם לשאלות מורכבות ולא רק מילות מפתח.",
    ],
    examples: [
      {
        sector: "בטחוני",
        text: "מתי נראה שער שירות פתוח בזווית חריגה ולידו עגלת מתכת עם ארגז אפור.",
      },
      {
        sector: "מודיעין וחקירה מורשית",
        text: "מצא את כל הפעמים שבהן נראתה מזוודה קשיחה כהה סמוך לדלת צדדית באזור רגיש.",
      },
      {
        sector: "עירוני",
        text: "מתי נראתה רמפה לנכים חסומה על ידי עגלה, קרטונים או שקי פסולת.",
      },
      {
        sector: "תעשייה",
        text: "מתי הופיעה נזילה ליד קו ייצור לצד דלי פלסטיק שהונח מתחתיה.",
      },
    ],
    query: "מתי נשארה קופסה גדולה ליד הגדר ההיקפית ולידה עגלת שירות פתוחה",
    visualSteps: [
      { label: "שאלה", description: "הגדרת סצנה בשפה טבעית" },
      { label: "איתור", description: "סריקת היסטוריה בין מצלמות" },
      { label: "תוצאה", description: "רגע מדויק עם הקשר ויזואלי" },
    ],
    resultTitle: "פלט אופרטיבי",
    resultLines: [
      "נמצא אירוע ב-02:14:22 במצלמת שער מזרח.",
      "זוהתה קופסה כהה צמודה לגדר ועגלת שירות פתוחה.",
      "המלצה: לאמת סגירת שער ולבדוק מקור החפץ.",
    ],
  },
  {
    id: "msg3",
    index: "02",
    label: "הווה",
    title: "תראו מה קורה עכשיו.",
    subtitle: "שואלים כמו שמדברים עם בן אדם ומקבלים תשובה ברורה מיד.",
    shortDescription:
      "המצלמות מסודרות כערוצי שיחה במקום גריד צפוף. נכנסים לאזור הנכון ב-3CLICKS, שואלים שאלה אחת, ומבינים את המצב ברגע.",
    bullets: [
      "כל מצלמה היא שיחה וכל קבוצת מצלמות היא קבוצה תפעולית.",
      "ניווט טבעי לפי מבנה ארגוני גם בפריסה רב-אתרית.",
      "תשובות תיאוריות עם הקשר ויזואלי ולא רק זוהתה תנועה.",
      "זיהוי סימנים ראשונים לבעיה לפני שהיא הופכת לאירוע.",
    ],
    examples: [
      {
        sector: "משטרתי",
        text: "מה רואים עכשיו בתחנת ההמתנה, האם יש תיק גדול או חפץ שחוסם מעבר.",
      },
      {
        sector: "מסחר",
        text: "האם אזור הקופה נקי או שיש מגש, שקית פתוחה וכוס שלא פונתה.",
      },
      {
        sector: "בטחוני",
        text: "האם שער החירום סגור לגמרי או נשאר פתוח מעט.",
      },
      {
        sector: "עירוני",
        text: "מה מצב פינת הרחוב עכשיו, האם פח עולה על גדותיו או שלט נפל.",
      },
    ],
    query: "מה מצב הכניסה הראשית עכשיו, יש משהו חריג לעין",
    visualSteps: [
      { label: "ניווט", description: "מפעל ישראל > משרדים > לובי" },
      { label: "שאלה", description: "מה רואים עכשיו" },
      { label: "תשובה", description: "מצב עדכני ותיאור ברור" },
    ],
    resultTitle: "תשובת מצב בזמן אמת",
    resultLines: [
      "הכניסה פתוחה והמעבר תקין.",
      "נראית עגלת ציוד סמוך לדלת צד, לא חוסמת כרגע.",
      "מומלץ לפנות את העגלה למניעת עומס.",
    ],
  },
  {
    id: "msg4",
    index: "03",
    label: "עתיד",
    title: "תגידו פעם אחת מה לבדוק.",
    subtitle: "Ghost ממשיך לבד לפי זמן, אזור ומשימה שהוגדרה.",
    shortDescription:
      "הופכים בדיקות חוזרות לאוטומציה ברורה: מה לבדוק, איפה לבדוק, ומתי לבדוק. המערכת ממשיכה לבד גם כשהצוות עסוק בדברים אחרים.",
    bullets: [
      "הגדרת משימות בשפה חופשית ללא בניית חוקים מורכבים.",
      "תזמון גמיש: כל שעה, סוף משמרת, או טריגר אירוע.",
      "כיסוי ארגוני מלא ממצלמה בודדת ועד כל האתרים.",
      "התראות יציבות ועקביות שמונעות פספוסי שגרה.",
    ],
    examples: [
      {
        sector: "תעשייה",
        text: "בסוף כל משמרת בדוק אם נתיב המלגזות פנוי ומגני מכונה במקום.",
      },
      {
        sector: "מודיעין וחקירה מורשית",
        text: "כל 30 דקות בדוק אם נשארו מעטפות, קלסרים או מזוודות באזור ההמתנה.",
      },
      {
        sector: "מסחר",
        text: "ב-09:00 וב-18:00 בדוק אם הוויטרינה מלאה והשילוט ישר.",
      },
      {
        sector: "עירוני",
        text: "בכל בוקר בדוק אם יש מפגע שחוסם רמפה לנכים או מעבר הולכי רגל.",
      },
    ],
    query: "כל שעה בדוק אם שער החירום נשאר פתוח והמעבר אליו פנוי",
    visualSteps: [
      { label: "הגדרה", description: "מה לבדוק, מתי, איפה" },
      { label: "הרצה", description: "בדיקה אוטומטית לפי תזמון" },
      { label: "התראה", description: "דוח והמלצה לפעולה" },
    ],
    resultTitle: "בדיקה אוטומטית",
    resultLines: [
      "בוצעה בדיקה מחזורית בשעה 21:00.",
      "שער חירום צפון זוהה פתוח חלקית במשך 11 דקות.",
      "נשלחה התראה לערוץ תפעול + סיכום יומי.",
    ],
  },
];

/**
 * מציג שלושה מקטעי נחיתה בגובה מסך מלא עבור עבר, הווה ועתיד.
 */
export function HomeCopyHe() {
  return (
    <section className="border-t border-neutral-100 bg-white text-neutral-950">
      {PANELS.map((panel, index) => (
        <article
          key={panel.id}
          id={panel.id}
          className={`min-h-[100svh] flex items-center ${index !== 0 ? "border-t border-neutral-100" : ""}`}
        >
          <div className="max-w-6xl mx-auto w-full px-6 py-10 lg:py-16">
            <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              >
                <div className="inline-flex items-center gap-2 text-[11px] font-bold text-neutral-500 border border-neutral-200 rounded-full px-3 py-1.5 mb-5">
                  <span className="font-mono">{panel.index}</span>
                  <span className="w-1 h-1 rounded-full bg-neutral-300" />
                  <span>{panel.label}</span>
                </div>

                <h2 className="text-3xl lg:text-5xl font-bold tracking-tight leading-[1.1] mb-4">
                  {panel.title}
                </h2>
                <p className="text-neutral-500 text-lg leading-relaxed mb-6 max-w-xl">
                  {panel.subtitle}
                </p>
                <p className="text-neutral-600 text-sm leading-relaxed mb-6 max-w-xl">
                  {panel.shortDescription}
                </p>

                <div className="space-y-2.5">
                  {panel.bullets.map((bullet) => (
                    <div
                      key={bullet}
                      className="flex items-center gap-2.5 text-sm text-neutral-700"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-neutral-900" />
                      <span>{bullet}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-7">
                  <p className="text-[11px] uppercase tracking-[0.16em] text-neutral-400 font-bold mb-3">
                    דוגמאות שימוש מורחבות
                  </p>
                  <div className="grid sm:grid-cols-2 gap-2.5">
                    {panel.examples.map((example) => (
                      <div
                        key={`${panel.id}-${example.sector}`}
                        className="rounded-xl border border-neutral-200 bg-white px-3.5 py-3"
                      >
                        <p className="text-[11px] font-bold text-neutral-500 mb-1">{example.sector}</p>
                        <p className="text-[12px] text-neutral-700 leading-relaxed">{example.text}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.97 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.55, ease: "easeOut", delay: 0.05 }}
                className="relative"
              >
                <div className="rounded-3xl border border-neutral-200 bg-neutral-50 p-6 lg:p-8 shadow-[0_20px_50px_rgba(0,0,0,0.06)]">
                  <p className="text-[10px] uppercase tracking-[0.16em] text-neutral-400 font-bold mb-4">
                    המחשה בסגנון Evolution
                  </p>

                  <div className="rounded-2xl border border-neutral-200 bg-white p-4 mb-4">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="w-2 h-2 rounded-full bg-neutral-900 animate-pulse" />
                      <span className="text-xs text-neutral-500">שיחה עם מצלמה</span>
                    </div>
                    <p className="text-sm text-neutral-900 leading-relaxed">{panel.query}</p>
                  </div>

                  <div className="relative mb-4 pt-4 pb-2 px-2">
                    <div className="absolute top-7 right-7 left-7 h-px bg-neutral-200" />
                    <motion.div
                      className="absolute top-7 right-7 left-7 h-px bg-neutral-900 origin-right"
                      animate={{ scaleX: [0, 1] }}
                      transition={{ duration: 1.15, ease: "easeOut", repeat: Infinity, repeatDelay: 0.7 }}
                    />
                    <div className="grid grid-cols-3 gap-3">
                      {panel.visualSteps.map((step, stepIndex) => (
                        <div key={step.label} className="text-center relative z-10">
                          <motion.div
                            className="w-9 h-9 mx-auto rounded-full border-2 border-neutral-200 bg-white flex items-center justify-center mb-2"
                            animate={{ borderColor: ["#e5e5e5", "#0a0a0a", "#e5e5e5"] }}
                            transition={{
                              duration: 2.1,
                              repeat: Infinity,
                              ease: "easeInOut",
                              delay: stepIndex * 0.2,
                            }}
                          >
                            <span className="text-[10px] font-mono text-neutral-700">{stepIndex + 1}</span>
                          </motion.div>
                          <p className="text-[11px] font-bold text-neutral-700">{step.label}</p>
                          <p className="text-[10px] text-neutral-500 mt-1">{step.description}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="rounded-2xl border border-neutral-200 bg-white p-4">
                    <p className="text-[11px] uppercase tracking-[0.14em] text-neutral-400 font-bold mb-2">
                      {panel.resultTitle}
                    </p>
                    <div className="space-y-1.5">
                      {panel.resultLines.map((line, lineIndex) => (
                        <motion.div
                          key={`${panel.id}-line-${lineIndex}`}
                          className="text-xs text-neutral-700 leading-relaxed"
                          animate={{ opacity: [0.45, 1, 0.45] }}
                          transition={{
                            duration: 2.4,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: lineIndex * 0.3,
                          }}
                        >
                          {line}
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </article>
      ))}
    </section>
  );
}
