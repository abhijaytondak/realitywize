"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 w-full z-50 bg-white/95 backdrop-blur-md border-b transition-all duration-300 ${
        scrolled ? "border-transparent shadow-lg" : "border-gray-100"
      }`}
    >
      <div className="flex justify-between items-center px-6 md:px-10 py-2 max-w-screen-2xl mx-auto">
        <Link href="/" className="flex-shrink-0">
          <Image
            src="/logo-wide.png"
            alt="RealtyWize"
            width={180}
            height={56}
            className={`w-auto object-contain transition-all duration-300 ${
              scrolled ? "h-10 md:h-12" : "h-12 md:h-16"
            }`}
            priority
            quality={80}
            sizes="180px"
          />
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-10">
          <Link
            href="/properties"
            className="font-label uppercase tracking-[0.12em] text-[11px] text-primary font-bold border-b border-primary/20 pb-0.5 transition-colors duration-300"
          >
            Properties
          </Link>
          <Link
            href="/builders"
            className="font-label uppercase tracking-[0.12em] text-[11px] text-secondary font-medium hover:text-primary transition-colors duration-300"
          >
            Builders &amp; Investors
          </Link>
          <Link
            href="/about"
            className="font-label uppercase tracking-[0.12em] text-[11px] text-secondary font-medium hover:text-primary transition-colors duration-300"
          >
            About Us
          </Link>
          <Link
            href="/properties"
            className="bg-primary text-on-primary px-5 py-2 rounded font-label uppercase tracking-[0.15em] text-[10px] hover:bg-primary-container transition-all active:scale-95 duration-200"
          >
            Explore Properties
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden p-3 -mr-1 text-primary"
          aria-label="Toggle menu"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            {mobileOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-lg border-t border-gray-100 px-6 py-4 space-y-3">
          <Link
            href="/properties"
            className="block font-label uppercase tracking-[0.12em] text-sm text-primary font-medium py-3"
            onClick={() => setMobileOpen(false)}
          >
            Properties
          </Link>
          <Link
            href="/builders"
            className="block font-label uppercase tracking-[0.12em] text-sm text-secondary font-medium py-3"
            onClick={() => setMobileOpen(false)}
          >
            Builders &amp; Investors
          </Link>
          <Link
            href="/about"
            className="block font-label uppercase tracking-[0.12em] text-sm text-secondary font-medium py-3"
            onClick={() => setMobileOpen(false)}
          >
            About Us
          </Link>
          <Link
            href="/properties"
            className="block w-full text-center bg-primary text-on-primary px-5 py-3.5 rounded font-label uppercase tracking-[0.15em] text-xs mt-2"
            onClick={() => setMobileOpen(false)}
          >
            Explore Properties
          </Link>
        </div>
      )}
    </nav>
  );
}
