import { ClerkProvider } from "@clerk/nextjs";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import AppHeader from "@/components/layout/AppHeader";
import AppSidebar from "@/components/layout/AppSidebar";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Restaurant Inventory Tracker",
    template: "%s | Restaurant Inventory Tracker",
  },
  description:
    "A beginner-friendly full-stack portfolio project for tracking restaurant inventory, low-stock alerts, and prep tasks.",
  applicationName: "Restaurant Inventory Tracker",
  keywords: [
    "Next.js",
    "TypeScript",
    "Prisma",
    "PostgreSQL",
    "Clerk",
    "restaurant inventory",
    "portfolio project",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html
        lang="en"
        className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      >
        <body className="min-h-full bg-stone-100 text-stone-900">
          <a
            href="#main-content"
            className="skip-link rounded-xl bg-stone-900 px-4 py-2 text-sm font-medium text-white"
          >
            Skip to main content
          </a>
          <div className="min-h-screen lg:grid lg:grid-cols-[240px_1fr]">
            <AppSidebar />
            <div className="flex min-h-screen flex-col">
              <AppHeader />
              <main
                id="main-content"
                className="flex-1 px-4 py-6 sm:px-6 lg:px-8"
              >
                {children}
              </main>
            </div>
          </div>
        </body>
      </html>
    </ClerkProvider>
  );
}
