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
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center">
            <Image src="/ghost-icon.png" alt="Ghost" width={38} height={38} className="rounded-lg" />
          </Link>
          <div className="hidden md:flex items-center gap-8 text-sm text-neutral-500">
            <Link href="/#msg1" className="hover:text-neutral-950 transition-colors">ניווט</Link>
            <Link href="/#msg2" className="hover:text-neutral-950 transition-colors">שיחה</Link>
            <Link href="/#msg3" className="hover:text-neutral-950 transition-colors">בדיקות</Link>
            <Link href="/#msg4" className="hover:text-neutral-950 transition-colors">התראות</Link>
            <Link href="/about" className="hover:text-neutral-950 transition-colors">הסיפור שלנו</Link>
            <Link href="/careers" className="hover:text-neutral-950 transition-colors">קריירה</Link>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/partners/login">
              <Button variant="outline" className="border-neutral-300 text-neutral-600 hover:bg-neutral-50 rounded-full h-9 px-4 text-xs">
                כניסה למפיצים
              </Button>
            </Link>
            <Link href="/demo">
              <Button className="bg-neutral-950 text-white hover:bg-neutral-800 rounded-full h-9 px-5 text-xs font-bold">
                קבע הדגמה
              </Button>
            </Link>
          </div>
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
