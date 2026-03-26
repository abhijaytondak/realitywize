import Link from "next/link";
import Image from "next/image";
import PropertyCard from "@/components/PropertyCard";
import InquiryForm from "@/components/InquiryForm";
import { getFeaturedProperties, getSiteConfig, getHomeContent } from "@/lib/supabase/queries";
import { PropertyType } from "@/lib/types";

const PROPERTY_TYPES: { type: PropertyType; icon: string; desc: string }[] = [
  { type: "Residential", icon: "M19 9.3V4h-3v2.6L12 3 2 12h3v8h5v-6h4v6h5v-8h3l-3-2.7z", desc: "Apartments, Villas, Plots & more" },
  { type: "Commercial", icon: "M12 7V3H2v18h20V7H12zM6 19H4v-2h2v2zm0-4H4v-2h2v2zm0-4H4V9h2v2zm0-4H4V5h2v2zm4 12H8v-2h2v2zm0-4H8v-2h2v2zm0-4H8V9h2v2zm0-4H8V5h2v2zm10 12h-8v-2h2v-2h-2v-2h2v-2h-2V9h8v10zm-2-8h-2v2h2v-2zm0 4h-2v2h2v-2z", desc: "Offices, Shops, Showrooms" },
  { type: "Industrial", icon: "M22 10V6c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v4c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2zm-2 0H4V6h16v4zM22 16v4c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2v-4c0-1.1.9-2 2-2h16c1.1 0 2 .9 2 2zm-2 0H4v4h16v-4z", desc: "Warehouses, Factories, Plots" },
  { type: "Institutional", icon: "M12 3L1 9l4 2.18v6L12 21l7-3.82v-6l2-1.09V17h2V9L12 3zm6.82 6L12 12.72 5.18 9 12 5.28 18.82 9zM17 15.99l-5 2.73-5-2.73v-3.72L12 15l5-2.73v3.72z", desc: "Schools, Hospitals, IT Parks" },
];

const WHY_US_ICONS = [
  "M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z",
  "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z",
  "M11.8 10.9c-2.27-.59-3-1.2-3-2.15 0-1.09 1.01-1.85 2.7-1.85 1.78 0 2.44.85 2.5 2.1h2.21c-.07-1.72-1.12-3.3-3.21-3.81V3h-3v2.16c-1.94.42-3.5 1.68-3.5 3.61 0 2.31 1.91 3.46 4.7 4.13 2.5.6 3 1.48 3 2.41 0 .69-.49 1.79-2.7 1.79-2.06 0-2.87-.92-2.98-2.1h-2.2c.12 2.19 1.76 3.42 3.68 3.83V21h3v-2.15c1.95-.37 3.5-1.5 3.5-3.55 0-2.84-2.43-3.81-4.7-4.4z",
];

export const revalidate = 60;

export default async function HomePage() {
  const [featured, siteConfig, cms] = await Promise.all([
    getFeaturedProperties(),
    getSiteConfig(),
    getHomeContent(),
  ]);

  const { hero, whyUs, inquiry } = cms;
  const heroImage = hero.bg_image || featured[0]?.images[0]?.url;

  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-[85vh] flex items-center overflow-hidden bg-primary">
        {heroImage && (
          <div className="absolute inset-0">
            <Image src={heroImage} alt="Hero background" fill className="object-cover opacity-30" priority />
            <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/70 to-transparent" />
          </div>
        )}
        <div className="relative z-10 max-w-screen-2xl mx-auto px-6 md:px-10 py-20">
          <span className="inline-block font-label uppercase tracking-[0.2em] text-primary-fixed text-xs mb-6">{hero.badge}</span>
          <h1 className="font-headline text-4xl md:text-6xl lg:text-7xl text-on-primary max-w-3xl leading-tight mb-6">{hero.headline}</h1>
          <p className="text-on-primary/80 text-lg md:text-xl max-w-xl mb-10 leading-relaxed font-body">{hero.description}</p>
          <div className="flex flex-wrap gap-4">
            <Link href={hero.btn1_link} className="bg-on-primary text-primary px-8 py-4 rounded-md font-label uppercase tracking-[0.2em] text-sm hover:bg-primary-fixed transition-all">{hero.btn1_text}</Link>
            <Link href={hero.btn2_link} className="border border-on-primary/30 text-on-primary px-8 py-4 rounded-md font-label uppercase tracking-[0.2em] text-sm hover:bg-on-primary/10 transition-all">{hero.btn2_text}</Link>
          </div>
        </div>
      </section>

      {/* Property Type Selection */}
      <section className="py-20 bg-surface">
        <div className="max-w-screen-2xl mx-auto px-6 md:px-10">
          <div className="text-center mb-14">
            <span className="font-label uppercase tracking-[0.15em] text-secondary text-sm">Browse By</span>
            <h2 className="font-headline text-4xl md:text-5xl text-primary mt-3">Property Types</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {PROPERTY_TYPES.map(({ type, icon, desc }) => (
              <Link key={type} href={`/properties?type=${type}`} className="card-lift group bg-white rounded-xl p-8 text-center border border-outline-variant/20 shadow-sm">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary-fixed/30 mb-5 group-hover:bg-primary-fixed transition-colors">
                  <svg className="w-7 h-7 text-primary" fill="currentColor" viewBox="0 0 24 24"><path d={icon} /></svg>
                </div>
                <h3 className="font-headline text-xl text-primary mb-2">{type}</h3>
                <p className="text-on-surface-variant text-sm">{desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Properties */}
      {featured.length > 0 && (
        <section className="py-20 bg-surface-container-low">
          <div className="max-w-screen-2xl mx-auto px-6 md:px-10">
            <div className="flex items-end justify-between mb-14">
              <div>
                <span className="font-label uppercase tracking-[0.15em] text-secondary text-sm">Curated</span>
                <h2 className="font-headline text-4xl md:text-5xl text-primary mt-3">Featured Properties</h2>
              </div>
              <Link href="/properties" className="hidden md:inline-flex items-center gap-2 font-label uppercase tracking-[0.15em] text-sm text-secondary hover:text-primary transition-colors">View All &rarr;</Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {featured.map((property) => (<PropertyCard key={property.id} property={property} />))}
            </div>
            <div className="mt-8 text-center md:hidden">
              <Link href="/properties" className="inline-flex items-center gap-2 font-label uppercase tracking-[0.15em] text-sm text-secondary">View All Properties &rarr;</Link>
            </div>
          </div>
        </section>
      )}

      {/* Why Choose Us */}
      <section className="py-20 bg-surface">
        <div className="max-w-screen-2xl mx-auto px-6 md:px-10">
          <div className="text-center mb-14">
            <span className="font-label uppercase tracking-[0.15em] text-secondary text-sm">{whyUs.label}</span>
            <h2 className="font-headline text-4xl md:text-5xl text-primary mt-3">{whyUs.headline}</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {whyUs.cards.map((card, i) => (
              <div key={i} className="bg-white rounded-xl p-8 border border-outline-variant/20 shadow-sm">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary-fixed/30 mb-5">
                  <svg className="w-6 h-6 text-primary" fill="currentColor" viewBox="0 0 24 24"><path d={WHY_US_ICONS[i % WHY_US_ICONS.length]} /></svg>
                </div>
                <h3 className="font-headline text-xl text-primary mb-3">{card.title}</h3>
                <p className="text-on-surface-variant text-sm leading-relaxed">{card.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA / Inquiry Section */}
      <section id="inquiry" className="py-20 bg-surface-container-low">
        <div className="max-w-screen-2xl mx-auto px-6 md:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="font-label uppercase tracking-[0.15em] text-secondary text-sm block mb-4">{inquiry.label}</span>
              <h2 className="font-headline text-4xl md:text-5xl text-primary mb-6">{inquiry.headline}</h2>
              <p className="text-on-surface-variant text-lg leading-relaxed mb-8">{inquiry.description}</p>
              <div className="flex flex-col gap-4 text-sm">
                <a href={`tel:${siteConfig.contact_phone}`} className="flex items-center gap-3 text-primary hover:text-primary-container transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/></svg>
                  {siteConfig.contact_phone}
                </a>
                <a href={`mailto:${siteConfig.contact_email}`} className="flex items-center gap-3 text-primary hover:text-primary-container transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>
                  {siteConfig.contact_email}
                </a>
              </div>
            </div>
            <div className="bg-white rounded-2xl p-8 md:p-10 shadow-sm border border-outline-variant/20">
              <InquiryForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
