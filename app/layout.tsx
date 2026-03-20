import { ClerkProvider } from "@clerk/nextjs";
import type { Metadata } from "next";
import { Fraunces, Geist, Geist_Mono } from "next/font/google";
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

const fraunces = Fraunces({
  variable: "--font-fraunces",
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
    <ClerkProvider
      appearance={{
        variables: {
          colorBackground: "#fffdf9",
          colorInputBackground: "#fffaf4",
          colorInputText: "#231815",
          colorText: "#231815",
          colorTextSecondary: "#6d5b4d",
          colorPrimary: "#9a3412",
          colorDanger: "#be123c",
          colorSuccess: "#047857",
          borderRadius: "1rem",
        },
        elements: {
          card: "border border-[rgba(137,98,66,0.16)] bg-[#fffdf9] shadow-[0_22px_45px_-32px_rgba(62,39,20,0.55)]",
          rootBox: "w-full",
          headerTitle: "text-[#231815]",
          headerSubtitle: "text-[#6d5b4d]",
          socialButtonsBlockButton:
            "border border-[rgba(137,98,66,0.18)] bg-[#fffaf4] text-[#231815] shadow-none hover:bg-[#fff3e6]",
          formButtonPrimary:
            "bg-[#9a3412] text-white shadow-[0_16px_28px_-18px_rgba(154,52,18,0.8)] hover:bg-[#7c2d12]",
          formFieldInput:
            "border border-[rgba(137,98,66,0.22)] bg-[#fffaf4] text-[#231815] shadow-none",
          footerActionLink: "text-[#9a3412] hover:text-[#7c2d12]",
          formFieldLabel: "text-[#6d5b4d]",
          dividerText: "text-[#8b735f]",
          dividerLine: "bg-[rgba(137,98,66,0.14)]",
          navbarButton: "text-[#231815] hover:bg-[#fff3e6]",
          userButtonPopoverCard:
            "border border-[rgba(137,98,66,0.16)] bg-[#fffdf9] shadow-[0_22px_45px_-32px_rgba(62,39,20,0.55)]",
          userButtonPopoverActionButton:
            "text-[#231815] hover:bg-[#fff3e6]",
          userPreviewMainIdentifier: "text-[#231815]",
          userPreviewSecondaryIdentifier: "text-[#6d5b4d]",
        },
      }}
    >
      <html
        lang="en"
        className={`${geistSans.variable} ${geistMono.variable} ${fraunces.variable} h-full antialiased`}
      >
        <body className="min-h-full text-stone-900">
          <a
            href="#main-content"
            className="skip-link rounded-xl bg-stone-900 px-4 py-2 text-sm font-medium text-white"
          >
            Skip to main content
          </a>
          <div className="app-shell min-h-screen lg:grid lg:grid-cols-[280px_1fr]">
            <AppSidebar />
            <div className="flex min-h-screen flex-col">
              <AppHeader />
              <main
                id="main-content"
                className="flex-1 px-4 py-6 sm:px-6 lg:px-8"
              >
                <div className="mx-auto w-full max-w-7xl">{children}</div>
              </main>
            </div>
          </div>
        </body>
      </html>
    </ClerkProvider>
  );
}
