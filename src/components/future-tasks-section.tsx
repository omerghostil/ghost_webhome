"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  Bell,
  Calendar,
  Radio,
  Smartphone,
  MessageSquare,
  Mail,
  Phone,
  Volume2,
  ArrowUpRight,
} from "lucide-react";

const ALERT_CHANNELS = [
  { name: "אפליקציית Ghost", icon: Smartphone },
  { name: "WhatsApp", icon: MessageSquare },
  { name: "אימייל", icon: Mail },
  { name: "שיחה טלפונית", icon: Phone },
  { name: "אזעקה במתחם", icon: Volume2 },
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
  visible: { transition: { staggerChildren: 0.1 } },
};

export function FutureTasksSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <section id="msg4" ref={ref} className="bg-white text-neutral-950 relative">
      <div className="max-w-6xl mx-auto px-6 py-24 lg:py-32">
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={stagger}
        >
          {/* תג זמן — עתיד */}
          <motion.div variants={fadeUp} className="mb-10">
            <div className="inline-flex items-center gap-2.5 text-xs border border-neutral-200 rounded-full px-4 py-2">
              <span className="font-mono font-bold text-neutral-400">04</span>
              <div className="w-px h-3 bg-neutral-200" />
              <ArrowUpRight className="w-3.5 h-3.5 text-neutral-400" />
              <span className="font-bold text-neutral-950">עתיד</span>
            </div>
          </motion.div>

          {/* כותרת */}
          <motion.div variants={fadeUp} className="max-w-2xl mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold tracking-tight mb-5">
              משימות, בדיקות והתראות
              <br />
              <span className="text-neutral-400">בשפה טבעית.</span>
            </h2>
            <p className="text-neutral-500 leading-relaxed">
              הגדירו בדיקות קבועות, בדיקות לפי טריגר, משימות מותאמות אישית
              וניטור רציף — הכל במילים. Ghost לא דורש אימון מודלים לכל צורך חדש.
              המשתמש מגדיר, Ghost מבצע.
            </p>
          </motion.div>

          {/* שלוש כרטיסיות */}
          <motion.div variants={stagger} className="grid lg:grid-cols-3 gap-4">
            {/* ניטור רציף */}
            <motion.div
              variants={fadeUp}
              className="border border-neutral-200 rounded-2xl p-6 bg-white hover:border-neutral-300 transition-colors"
            >
              <Bell className="w-5 h-5 text-neutral-400 mb-4" strokeWidth={1.5} />
              <h3 className="font-bold text-sm mb-3">ניטור רציף</h3>
              <div className="bg-neutral-50 border border-neutral-100 rounded-xl p-3.5 text-xs text-neutral-600 leading-relaxed mb-4">
                &ldquo;בדוק רציף אם נראים עשן, אש גלויה או חפץ בוער במתחם. בכל
                זיהוי — התראה קריטית מיידית.&rdquo;
              </div>
              <p className="text-[10px] uppercase tracking-[0.15em] text-neutral-400 font-bold mb-2.5">
                ערוצי התראה:
              </p>
              <div className="flex flex-wrap gap-2">
                {ALERT_CHANNELS.map((ch, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-1.5 text-[10px] text-neutral-500 bg-neutral-50 border border-neutral-100 rounded-md px-2 py-1"
                  >
                    <ch.icon className="w-3 h-3" />
                    {ch.name}
                  </div>
                ))}
              </div>
            </motion.div>

            {/* בדיקה מתוזמנת */}
            <motion.div
              variants={fadeUp}
              className="border border-neutral-200 rounded-2xl p-6 bg-white hover:border-neutral-300 transition-colors"
            >
              <Calendar className="w-5 h-5 text-neutral-400 mb-4" strokeWidth={1.5} />
              <h3 className="font-bold text-sm mb-3">בדיקה מתוזמנת</h3>
              <div className="bg-neutral-50 border border-neutral-100 rounded-xl p-3.5 text-xs text-neutral-600 leading-relaxed">
                &ldquo;בכל יום בשעה 21:00 בדוק האם במטבח כל דלתות המקררים
                סגורות, אין ציוד חם נראה דולק, השיש פנוי ממפגעים והרצפה נקייה
                ממפגעי החלקה.&rdquo;
              </div>
              <div className="mt-3 flex items-center gap-2 text-[10px] text-neutral-400">
                <div className="bg-neutral-100 rounded-md px-2 py-1 font-mono">כל יום</div>
                <div className="bg-neutral-100 rounded-md px-2 py-1 font-mono">21:00</div>
                <div className="bg-neutral-100 rounded-md px-2 py-1">חוזר</div>
              </div>
            </motion.div>

            {/* בדיקה לפי טריגר */}
            <motion.div
              variants={fadeUp}
              className="border border-neutral-200 rounded-2xl p-6 bg-white hover:border-neutral-300 transition-colors"
            >
              <Radio className="w-5 h-5 text-neutral-400 mb-4" strokeWidth={1.5} />
              <h3 className="font-bold text-sm mb-3">בדיקה לפי טריגר</h3>
              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2">
                  <div className="bg-neutral-950 text-white text-[10px] font-bold rounded-md px-2 py-1">
                    טריגר
                  </div>
                  <span className="text-xs text-neutral-500">
                    דלת ארון חשמל ראשי נפתחת
                  </span>
                </div>
                <div className="w-px h-3 bg-neutral-200 mr-4" />
                <div className="flex items-center gap-2">
                  <div className="bg-neutral-950 text-white text-[10px] font-bold rounded-md px-2 py-1">
                    בדיקה
                  </div>
                  <span className="text-xs text-neutral-500">
                    לבוש לפי #מדי_עבודה_חשמלאי_מורשה
                  </span>
                </div>
                <div className="w-px h-3 bg-neutral-200 mr-4" />
                <div className="flex items-center gap-2">
                  <div className="bg-neutral-950 text-white text-[10px] font-bold rounded-md px-2 py-1">
                    פעולה
                  </div>
                  <span className="text-xs text-neutral-500">
                    התראה אם לא עומד בנוהל
                  </span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
