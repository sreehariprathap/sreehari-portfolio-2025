import type { Metadata, Viewport } from "next";
import { Chivo_Mono, Josefin_Sans } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import GlobalCursor from "@/components/ui/GlobalCursor";
import { CursorContextProvider } from "@/components/ui/cursor-context";
import React, { Suspense } from 'react';
import PerformanceMonitor from "./performance-monitor";

// Optimize font loading by preloading subsets and specifying display behavior
const chivoMono = Chivo_Mono({
  variable: "--font-chivo-mono",
  subsets: ["latin"],
  display: "swap", // Ensures text remains visible during font loading
  preload: true,
});

const josefinSans = Josefin_Sans({
  variable: "--font-josefin-sans",
  subsets: ["latin"],
  display: "swap", // Ensures text remains visible during font loading
  preload: true,
});

export const metadata: Metadata = {
  title: "Sreehari Prathap",
  description: "some guy who loves computers",
  metadataBase: new URL("https://sreehari.ca"),
  openGraph: {
    title: "Sreehari Prathap",
    description: "some guy who loves computers",
    url: "https://sreehari.ca",
    siteName: "Sreehari Prathap",
    locale: "en_US",
    type: "website",
  },
};

// Add viewport settings for better performance
export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" }
  ],
  width: "device-width",
  initialScale: 1,
};

// Loading component for Suspense fallback
const Loading = () => <div className="min-h-screen"></div>;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        {/* Preload critical resources */}
        <link 
          rel="preconnect" 
          href="https://fonts.googleapis.com" 
          crossOrigin="anonymous" 
        />
        <link 
          rel="preload" 
          href="/hari.png" 
          as="image" 
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className={`${josefinSans.variable} ${chivoMono.variable} antialiased cursor-none`}>
        {/* Performance monitoring */}
        <PerformanceMonitor />
        
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <CursorContextProvider>
            <Suspense fallback={<Loading />}>
              <GlobalCursor />
              {children}
            </Suspense>
          </CursorContextProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
