"use client";

import { useEffect, useRef, useState } from "react";

interface GhostTypingTextProps {
  text: string;
  className?: string;
  charDelay?: number;
  startDelay?: number;
}

/**
 * רכיב הקלדה רפאימית — הטקסט מופיע תו-תו כאילו רוח רפאים מקלידה אותו.
 * מופעל אוטומטית כשהאלמנט נכנס לתצוגה (Intersection Observer).
 */
export function GhostTypingText({
  text,
  className = "",
  charDelay = 25,
  startDelay = 400,
}: GhostTypingTextProps) {
  const [displayedCount, setDisplayedCount] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  const containerRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasStarted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!hasStarted) return;

    const timeout = setTimeout(() => {
      if (displayedCount >= text.length) return;

      const interval = setInterval(() => {
        setDisplayedCount((prev) => {
          if (prev >= text.length) {
            clearInterval(interval);
            return prev;
          }
          return prev + 1;
        });
      }, charDelay);

      return () => clearInterval(interval);
    }, displayedCount === 0 ? startDelay : 0);

    return () => clearTimeout(timeout);
  }, [hasStarted, displayedCount, text.length, charDelay, startDelay]);

  const isComplete = displayedCount >= text.length;

  return (
    <p ref={containerRef} className={className} dir="rtl">
      <span className="opacity-90">{text.slice(0, displayedCount)}</span>
      {hasStarted && !isComplete && (
        <span className="inline-block w-[2px] h-[1em] bg-neutral-400/60 align-middle mr-0.5 animate-pulse" />
      )}
      {!hasStarted && <span className="invisible">{text}</span>}
    </p>
  );
}
