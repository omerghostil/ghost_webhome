"use client";

import { Camera } from "lucide-react";

interface TryGhostButtonProps {
  onClick: () => void;
}

export function TryGhostButton({ onClick }: TryGhostButtonProps) {
  return (
    <button
      onClick={onClick}
      className="hidden md:flex fixed bottom-6 left-6 z-40 items-center gap-2.5 bg-neutral-950 text-white font-bold text-sm rounded-full pl-5 pr-6 py-3.5 shadow-2xl shadow-neutral-950/30 hover:bg-neutral-800 hover:scale-[1.03] active:scale-[0.97] transition-all cursor-pointer group"
    >
      <span className="relative flex items-center justify-center">
        <span className="absolute w-9 h-9 rounded-full bg-white/10 animate-ping" />
        <Camera className="w-5 h-5 relative z-10" />
      </span>
      <span>דברו עם ghost</span>
    </button>
  );
}
