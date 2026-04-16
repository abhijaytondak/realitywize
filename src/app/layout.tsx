import type { Metadata } from "next";
import { Noto_Serif, Manrope } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Analytics } from "@vercel/analytics/next";
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
  metadataBase: new URL("https://realitywize.vercel.app"),
  title: {
    default: "RealtyWize | Premium Property Listings in Noida & NCR",
    template: "%s | RealtyWize",
  },
  description:
    "Discover premium residential, commercial, and industrial properties across Noida, Greater Noida, and the Yamuna Expressway corridor. Verified listings, expert guidance, and exclusive builder collaborations from ₹10 Crore.",
  keywords: [
    "real estate Noida",
    "property in Noida",
    "Greater Noida properties",
    "Yamuna Expressway real estate",
    "luxury homes Noida",
    "commercial property NCR",
    "Sector 150 Noida",
    "Jewar Airport properties",
    "YEIDA properties",
    "builder collaboration Noida",
    "investment properties India",
  ],
  authors: [{ name: "RealtyWize" }],
  creator: "RealtyWize",
  publisher: "RealtyWize",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://realitywize.vercel.app",
    siteName: "RealtyWize",
    title: "RealtyWize | Premium Property Listings in Noida & NCR",
    description:
      "Discover premium residential, commercial, and industrial properties across Noida, Greater Noida, and the Yamuna Expressway corridor.",
  },
  twitter: {
    card: "summary_large_image",
    title: "RealtyWize | Premium Property Listings in Noida & NCR",
    description:
      "Discover premium residential, commercial, and industrial properties across Noida and NCR.",
    creator: "@realtywize",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  category: "real estate",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${notoSerif.variable} ${manrope.variable}`}>
      <body className="min-h-screen flex flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "RealEstateAgent",
              "@id": "https://realitywize.vercel.app/#organization",
              name: "RealtyWize",
              url: "https://realitywize.vercel.app",
              logo: {
                "@type": "ImageObject",
                url: "https://realitywize.vercel.app/logo.png",
                width: 1024,
                height: 1024,
              },
              image: "https://realitywize.vercel.app/logo.png",
              description:
                "Premium residential, commercial, and industrial property listings in Noida, Greater Noida, and the Yamuna Expressway corridor.",
              address: {
                "@type": "PostalAddress",
                streetAddress: "Plot 22, Sector 150, Noida Expressway",
                addressLocality: "Noida",
                addressRegion: "Uttar Pradesh",
                postalCode: "201310",
                addressCountry: "IN",
              },
              contactPoint: {
                "@type": "ContactPoint",
                telephone: "+91-9876543210",
                contactType: "Customer Service",
                email: "info@realitywize.com",
                areaServed: "IN",
                availableLanguage: ["English", "Hindi"],
              },
              areaServed: [
                { "@type": "City", name: "Noida" },
                { "@type": "City", name: "Greater Noida" },
                { "@type": "Place", name: "Yamuna Expressway Corridor" },
              ],
              priceRange: "₹₹₹",
              sameAs: [],
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "@id": "https://realitywize.vercel.app/#website",
              url: "https://realitywize.vercel.app",
              name: "RealtyWize",
              description: "Premium Property Listings in Noida & NCR",
              publisher: { "@id": "https://realitywize.vercel.app/#organization" },
              potentialAction: {
                "@type": "SearchAction",
                target: {
                  "@type": "EntryPoint",
                  urlTemplate: "https://realitywize.vercel.app/properties?search={search_term_string}",
                },
                "query-input": "required name=search_term_string",
              },
              inLanguage: "en-IN",
            }),
          }}
        />
        <Navbar />
        <main className="flex-1 pt-20">{children}</main>
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
