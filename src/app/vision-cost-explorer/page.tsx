"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { isAuthenticated } from "@/lib/local-auth";
import { VisionCostExplorerShell } from "@/components/vision-cost-explorer/vision-cost-explorer-shell";

export default function VisionCostExplorerPage() {
  const router = useRouter();
  const [isAuthed, setIsAuthed] = useState(false);

  useEffect(() => {
    if (!isAuthenticated()) {
      router.replace("/login");
    } else {
      setIsAuthed(true);
    }
  }, [router]);

  if (!isAuthed) {
    return (
      <div className="h-screen bg-neutral-950 flex items-center justify-center">
        <div className="w-5 h-5 border-2 border-neutral-700 border-t-white rounded-full animate-spin" />
      </div>
    );
  }

  return <VisionCostExplorerShell />;
}
