import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Providers from "./providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Mini-commerce",
  description: "a mini e-commerce built with next.js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Providers>
          <div className=" flex flex-row justify-between bg-black w-full p-4 text-white">
            <h1 className=" text-3xl font-bold">Mini-Commerce</h1>
            <button>Cart</button>
          </div>
          {children}
        </Providers>
      </body>
    </html>
  );
}
