"use client";

import { useEffect, useRef, useState } from "react";
import { Activity, ScanSearch, BrainCircuit } from "lucide-react";

const STAGES = [
  {
    icon: Activity,
    year: "2010+",
    title: "זיהוי תנועה",
    description: "מערכות מבוססות פיקסלים שמזהות שינוי בתמונה. ללא הבנה, ללא הקשר.",
  },
  {
    icon: ScanSearch,
    year: "2018+",
    title: "זיהוי אובייקטים",
    description: "אלגוריתמים שמסווגים אובייקטים בווידאו — אדם, רכב, חפץ. עדיין ללא הבנת סיטואציה.",
  },
  {
    icon: BrainCircuit,
    year: "2024",
    title: "Ghost",
    description: "סוכן AI שמבין את המתרחש, זוכר אירועים, ומבצע פעולות בהתאמה אישית מלאה.",
    isActive: true,
  },
];

export function EvolutionTimeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 },
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef} className="relative mt-20 pt-12 border-t border-neutral-100">
      <div className="text-center mb-12">
        <p className="text-[10px] uppercase tracking-[0.2em] text-neutral-400 font-bold">
          התפתחות ניתוח הוידאו
        </p>
      </div>

      <div className="relative max-w-4xl mx-auto">
        {/* Connecting line */}
        <div className="absolute top-[2.25rem] right-[calc(16.66%+1.25rem)] left-[calc(16.66%+1.25rem)] h-px bg-neutral-200 hidden md:block">
          <div
            className="h-full bg-neutral-950 origin-right transition-all duration-[1.8s] ease-out"
            style={{ transform: isVisible ? "scaleX(1)" : "scaleX(0)" }}
          />
        </div>

        <div className="grid md:grid-cols-3 gap-10 md:gap-6">
          {STAGES.map((stage, i) => (
            <div
              key={i}
              className="flex flex-col items-center text-center transition-all duration-700 ease-out"
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? "translateY(0)" : "translateY(24px)",
                transitionDelay: `${i * 300 + 200}ms`,
              }}
            >
              {/* Node */}
              <div
                className={`
                  relative z-10 w-10 h-10 rounded-full flex items-center justify-center mb-4
                  transition-all duration-500
                  ${stage.isActive
                    ? "bg-neutral-950 ring-4 ring-neutral-950/10"
                    : "bg-white border-2 border-neutral-200"
                  }
                `}
                style={{ transitionDelay: `${i * 300 + 400}ms` }}
              >
                <stage.icon
                  className={`w-4.5 h-4.5 ${stage.isActive ? "text-white" : "text-neutral-400"}`}
                />
              </div>

              {/* Year */}
              <span
                className={`text-[11px] font-bold tracking-wider mb-2 ${
                  stage.isActive ? "text-neutral-950" : "text-neutral-300"
                }`}
              >
                {stage.year}
              </span>

              {/* Title */}
              <h4
                className={`text-base font-bold mb-2 ${
                  stage.isActive ? "text-neutral-950" : "text-neutral-500"
                }`}
              >
                {stage.title}
              </h4>

              {/* Description */}
              <p className="text-sm text-neutral-400 leading-relaxed max-w-[240px]">
                {stage.description}
              </p>

              {/* Active indicator */}
              {stage.isActive && (
                <div
                  className="mt-4 inline-flex items-center gap-1.5 text-[10px] uppercase tracking-[0.15em] font-bold text-neutral-950 bg-neutral-100 rounded-full px-3 py-1 transition-all duration-500"
                  style={{
                    opacity: isVisible ? 1 : 0,
                    transitionDelay: `${i * 300 + 700}ms`,
                  }}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-neutral-950 animate-pulse" />
                  הדור הבא
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
