import type { Metadata, Viewport } from "next";
import { Miriam_Libre, Rubik } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/lib/i18n";
import { LanguageSelector } from "@/components/language-selector";
import { TryGhostWrapper } from "@/components/try-ghost-wrapper";

const miriamLibre = Miriam_Libre({
  weight: ["400", "700"],
  subsets: ["hebrew", "latin"],
  variable: "--font-miriam-libre",
});

const rubik = Rubik({
  weight: ["400", "500", "700"],
  subsets: ["hebrew", "latin", "cyrillic"],
  variable: "--font-rubik",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: "cover",
  themeColor: "#000000",
};

export const metadata: Metadata = {
  title: "Ghost | Camera Chat",
  description: "Stop scrolling. Start talking to your cameras.",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Ghost",
  },
  icons: {
    apple: "/ghost-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="he" dir="rtl" suppressHydrationWarning>
      <body
        className={`${miriamLibre.variable} ${rubik.variable} font-sans antialiased bg-white text-neutral-950`}
      >
        <LanguageProvider>
          <LanguageSelector />
          {children}
          <TryGhostWrapper />
        </LanguageProvider>
      </body>
    </html>
  );
}
