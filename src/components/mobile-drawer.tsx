"use client";

import { useEffect, useCallback, type ReactNode } from "react";
import { X } from "lucide-react";
import { useLanguage } from "@/lib/i18n";

interface MobileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  side?: "start" | "end";
}

export function MobileDrawer({ isOpen, onClose, children, side = "start" }: MobileDrawerProps) {
  const { dir } = useLanguage();

  const physicalSide = side === "start"
    ? (dir === "rtl" ? "right" : "left")
    : (dir === "rtl" ? "left" : "right");

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    },
    [onClose],
  );

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, handleKeyDown]);

  if (!isOpen) return null;

  const translateClass = physicalSide === "right"
    ? "translate-x-0"
    : "translate-x-0";

  return (
    <div className="fixed inset-0 z-[100] md:hidden">
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm animate-fade-in"
        onClick={onClose}
      />
      <div
        className={`absolute top-0 ${physicalSide === "right" ? "right-0" : "left-0"} h-full w-[280px] max-w-[85vw] bg-white shadow-2xl flex flex-col safe-top ${translateClass}`}
        style={{
          animation: `slide-in-${physicalSide} 0.25s ease-out`,
        }}
      >
        <div className="flex items-center justify-between px-5 py-4 border-b border-neutral-100">
          <span className="text-sm font-bold text-neutral-950">Ghost</span>
          <button
            onClick={onClose}
            className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-neutral-100 active:scale-95 transition-all"
            aria-label="Close menu"
          >
            <X className="w-5 h-5 text-neutral-600" />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto overscroll-contain">
          {children}
        </div>
      </div>

      <style jsx>{`
        @keyframes slide-in-right {
          from { transform: translateX(100%); }
          to { transform: translateX(0); }
        }
        @keyframes slide-in-left {
          from { transform: translateX(-100%); }
          to { transform: translateX(0); }
        }
      `}</style>
    </div>
  );
}
