"use client";

import { Navbar } from "@/components/navbar";
import { CapabilitiesSidebar, CapabilitiesMobileToggle } from "@/components/capabilities-sidebar";

export default function CapabilitiesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-white text-neutral-950">
      <Navbar />

      <div className="max-w-7xl mx-auto flex">
        <CapabilitiesSidebar />
        <main className="flex-1 min-h-[calc(100vh-4rem)]">
          {children}
        </main>
      </div>

      <CapabilitiesMobileToggle />
    </div>
  );
}
