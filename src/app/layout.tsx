import type { Metadata } from "next";
import { Miriam_Libre } from "next/font/google";
import "./globals.css";

const miriamLibre = Miriam_Libre({
  weight: ["400", "700"],
  subsets: ["hebrew", "latin"],
  variable: "--font-miriam-libre",
});

export const metadata: Metadata = {
  title: "Ghost | Camera Chat",
  description: "מפסיקים לגלול. מתחילים לשוחח עם המצלמות.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="he" dir="rtl">
      <body
        className={`${miriamLibre.variable} font-sans antialiased bg-white text-neutral-950`}
      >
        {children}
      </body>
    </html>
  );
}
