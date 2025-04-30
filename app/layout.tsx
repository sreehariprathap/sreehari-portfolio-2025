import type { Metadata } from "next";
import { Geist, Geist_Mono, Chivo_Mono, Josefin_Sans } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import GlobalCursor from "@/components/ui/GlobalCursor";
import { CursorContextProvider } from "@/components/ui/cursor-context";

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
    <html lang="en" className="scroll-smooth">
      <body className={`${josefinSans.variable} ${chivoMono.variable} antialiased cursor-none`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <CursorContextProvider>
            <GlobalCursor />
            {children}
          </CursorContextProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
