import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Vanda Shop — Official Store",
  description: "Crafted with WebBlock Platform (Next.js + Prisma).",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body className="bg-[#090d16] text-slate-100 antialiased min-h-screen">
        {children}
      </body>
    </html>
  );
}
