import Image from "next/image";
import Link from "next/link";
import { CapabilitiesSidebar } from "@/components/capabilities-sidebar";
import { Button } from "@/components/ui/button";

export default function CapabilitiesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-white text-neutral-950">
      <nav className="border-b border-neutral-100 bg-white/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            <Image src="/ICON_GHOST.jpg" alt="Ghost" width={28} height={28} className="rounded-md" />
            <span className="text-sm font-bold tracking-[0.2em] uppercase">Ghost</span>
          </Link>
          <Link href="/demo">
            <Button className="bg-neutral-950 text-white hover:bg-neutral-800 rounded-full h-9 px-5 text-xs font-bold">
              קבע הדגמה
            </Button>
          </Link>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto flex">
        <CapabilitiesSidebar />
        <main className="flex-1 min-h-[calc(100vh-4rem)]">
          {children}
        </main>
      </div>
    </div>
  );
}
