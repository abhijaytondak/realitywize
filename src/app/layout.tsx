import type { Metadata } from "next";
import { Noto_Serif, Manrope } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import "./globals.css";

const notoSerif = Noto_Serif({
  subsets: ["latin"],
  variable: "--font-headline",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: "RealtyWize | Premium Property Listings in Noida & NCR",
  description:
    "Discover premium residential, commercial, and industrial properties across Noida and NCR. Browse listings, view details, and submit enquiries.",
  openGraph: {
    title: "RealtyWize | Premium Property Listings",
    description: "Discover premium properties across Noida and NCR.",
    images: ["/logo-wide.png"],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${notoSerif.variable} ${manrope.variable}`}>
      <body className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 pt-20">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
