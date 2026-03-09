"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const REALTIME_QUERIES = [
  "האם מול ארון החשמל הראשי מונח סולם פתוח או עגלת ציוד שחוסמים גישה?",
  "האם על רצפת אזור ההעמסה נראית שלולית נוזל ליד משטח עץ עם קרטונים?",
  "האם השער ההיקפי סגור ונעול בשרשרת מסביב לשני צדי השער לפי הנוהל?",
  "האם באזור היציע נראה עשן או חפץ בוער נראה לעין?",
  "האם אחת מדלתות יציאת החירום חסומה על ידי עגלת שינוע ועליה ארגזים?",
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring" as const, damping: 25, stiffness: 120 },
  },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

export function RealtimeCheckSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <section
      id="msg3"
      ref={ref}
      className="bg-neutral-900 text-white relative overflow-hidden"
    >
      <div className="max-w-6xl mx-auto px-6 py-24 lg:py-32">
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={stagger}
        >
          {/* תג זמן — הווה */}
          <motion.div variants={fadeUp} className="mb-10">
            <div className="inline-flex items-center gap-2.5 text-xs border border-neutral-700 rounded-full px-4 py-2 bg-neutral-800/80">
              <span className="font-mono font-bold text-neutral-500">03</span>
              <div className="w-px h-3 bg-neutral-700" />
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="font-bold text-white">הווה</span>
            </div>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <motion.div variants={fadeUp}>
              <h2 className="text-3xl lg:text-4xl font-bold tracking-tight mb-5">
                תארו במילים מה לבדוק.
                <br />
                <span className="text-neutral-500">Ghost יענה תוך שניות.</span>
              </h2>
              <p className="text-neutral-400 leading-relaxed max-w-lg">
                שלחו הודעה לכל מצלמה או קבוצת מצלמות ותארו את מה שחשוב לכם
                לבדוק — בטיחות, סדר, תחזוקה, אבטחה. Ghost מנתח את הסצנה הנוכחית
                ומחזיר תשובה מיידית עם צילום רלוונטי. בלי רשימת זיהויים סגורה.
                בלי חוקים קשיחים.
              </p>
            </motion.div>

            <motion.div variants={stagger} className="space-y-2.5">
              {REALTIME_QUERIES.map((q, i) => (
                <motion.div
                  key={i}
                  variants={fadeUp}
                  className="flex items-center gap-3 border border-neutral-700/50 rounded-xl px-4 py-3.5 bg-neutral-800/30 hover:border-neutral-600 hover:bg-neutral-800/50 transition-all duration-300"
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse flex-shrink-0" />
                  <p className="text-xs text-neutral-300 leading-relaxed">
                    &ldquo;{q}&rdquo;
                  </p>
                  <span className="text-[10px] text-emerald-600 font-bold mr-auto whitespace-nowrap tracking-wider">
                    LIVE
                  </span>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
