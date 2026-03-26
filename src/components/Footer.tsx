import Link from "next/link";
import Image from "next/image";
import { SITE_CONFIG } from "@/lib/sample-data";

export default function Footer() {
  return (
    <footer className="bg-primary text-on-primary">
      <div className="max-w-screen-2xl mx-auto px-6 md:px-10 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="md:col-span-1">
            <Image
              src="/logo.png"
              alt="RealtyWize"
              width={80}
              height={80}
              className="h-16 w-auto brightness-0 invert mb-4"
            />
            <p className="text-on-primary/70 text-sm leading-relaxed">
              Your trusted partner in finding premium properties across Noida and NCR.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-headline text-lg mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-on-primary/70 text-sm hover:text-on-primary transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/properties" className="text-on-primary/70 text-sm hover:text-on-primary transition-colors">
                  Properties
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-on-primary/70 text-sm hover:text-on-primary transition-colors">
                  About Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Property Types */}
          <div>
            <h4 className="font-headline text-lg mb-4">Property Types</h4>
            <ul className="space-y-2">
              {["Residential", "Commercial", "Industrial", "Institutional"].map((type) => (
                <li key={type}>
                  <Link
                    href={`/properties?type=${type}`}
                    className="text-on-primary/70 text-sm hover:text-on-primary transition-colors"
                  >
                    {type}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-headline text-lg mb-4">Contact</h4>
            <ul className="space-y-3 text-sm text-on-primary/70">
              <li className="flex items-start gap-2">
                <svg className="w-4 h-4 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                </svg>
                {SITE_CONFIG.office_address}
              </li>
              <li className="flex items-center gap-2">
                <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
                </svg>
                <a href={`tel:${SITE_CONFIG.contact_phone}`} className="hover:text-on-primary transition-colors">
                  {SITE_CONFIG.contact_phone}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                </svg>
                <a href={`mailto:${SITE_CONFIG.contact_email}`} className="hover:text-on-primary transition-colors">
                  {SITE_CONFIG.contact_email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-on-primary/10 mt-12 pt-8 text-center text-on-primary/50 text-xs">
          &copy; {new Date().getFullYear()} RealtyWize. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
