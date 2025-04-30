import type { Metadata } from "next";
import { Geist, Geist_Mono, Chivo_Mono, Josefin_Sans } from "next/font/google";
import "./globals.css";
import { DotBackground } from "@/components/ui/dotBackground";
import { ThemeProvider } from "@/components/theme-provider";
import { HeroHighlight, Highlight } from "@/components/ui/hero-highlight";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const chivoMono = Chivo_Mono({
  variable: "--font-chivo-mono",
  subsets: ["latin"],
});

const josefinSans = Josefin_Sans({
  variable: "--font-josefin-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Sreehari Prathap",
  description: "some guy who loves computers",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${josefinSans.variable} ${chivoMono.variable} antialiased relative`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >

          <div className="fixed inset-0 z-0">
            <HeroHighlight >
                <div className="relative z-10">
                  {children}
                </div>
            </HeroHighlight >
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
