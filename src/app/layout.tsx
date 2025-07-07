import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Providers from "./providers";
import Header from "./header";

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
    default: "Mini-Commerce | Your Tiny E-Shop",
    template: "%s | Mini-Commerce"
  },
  description: "A lightweight e-commerce demo built with Next.js 14",
  metadataBase: new URL('https://mini-commerce-liart.vercel.app/'), 
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "Mini-Commerce",
    description: "Browse products and manage your cart in this demo store",
    url: "https://mini-commerce-liart.vercel.app/", 
    siteName: "Mini-Commerce",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Mini-Commerce: A Next.js e-commerce demo",
      }
    ],
    locale: 'en_US',
    type: 'website',
  },
  
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
    },
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="scroll-smooth">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-200`}>
        <Providers>
          <Header />
          <main className="pt-20 min-h-screen container mx-auto px-4 sm:px-6 lg:px-8">
            {children}
          </main>
          {/* footer  */}
        </Providers>
      </body>
    </html>
  );
}