import Link from "next/link";
import { getSiteConfig, getAboutContent } from "@/lib/supabase/queries";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us | RealtyWize",
  description: "Learn about RealtyWize - your trusted partner for premium property listings in Noida and NCR.",
};

export const revalidate = 60;

const VALUE_ICONS = [
  "M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z",
  "M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z",
  "M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z",
  "M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z",
];

export default async function AboutPage() {
  const [siteConfig, cms] = await Promise.all([getSiteConfig(), getAboutContent()]);
  const { hero, story, stats, values } = cms;

  return (
    <div className="min-h-screen bg-surface">
      {/* Hero */}
      <div className="bg-primary py-16 md:py-24">
        <div className="max-w-screen-2xl mx-auto px-6 md:px-10 text-center">
          <span className="font-label uppercase tracking-[0.15em] text-primary-fixed text-xs">{hero.label}</span>
          <h1 className="font-headline text-4xl md:text-6xl text-on-primary mt-3 mb-6">{hero.headline}</h1>
          <p className="text-on-primary/70 text-lg max-w-2xl mx-auto leading-relaxed">{hero.description}</p>
        </div>
      </div>

      {/* Story */}
      <section className="py-20">
        <div className="max-w-screen-2xl mx-auto px-6 md:px-10">
          <div className="max-w-3xl mx-auto text-center">
            <span className="font-label uppercase tracking-[0.15em] text-secondary text-sm">{story.label}</span>
            <h2 className="font-headline text-3xl md:text-4xl text-primary mt-3 mb-8">{story.headline}</h2>
            <div className="text-on-surface-variant leading-relaxed space-y-4 text-left md:text-center">
              {story.paragraphs.map((p, i) => (<p key={i}>{p}</p>))}
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-primary">
        <div className="max-w-screen-2xl mx-auto px-6 md:px-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <div key={i} className="text-center">
                <p className="font-headline text-4xl md:text-5xl text-on-primary mb-2">{stat.number}</p>
                <p className="font-label uppercase tracking-[0.15em] text-primary-fixed text-xs">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-surface-container-low">
        <div className="max-w-screen-2xl mx-auto px-6 md:px-10">
          <div className="text-center mb-14">
            <span className="font-label uppercase tracking-[0.15em] text-secondary text-sm">{values.label}</span>
            <h2 className="font-headline text-3xl md:text-4xl text-primary mt-3">{values.headline}</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.cards.map((card, i) => (
              <div key={i} className="bg-white rounded-xl p-8 border border-outline-variant/20 shadow-sm">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary-fixed/30 mb-5">
                  <svg className="w-6 h-6 text-primary" fill="currentColor" viewBox="0 0 24 24"><path d={VALUE_ICONS[i % VALUE_ICONS.length]} /></svg>
                </div>
                <h3 className="font-headline text-lg text-primary mb-3">{card.title}</h3>
                <p className="text-on-surface-variant text-sm leading-relaxed">{card.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Office */}
      <section className="py-20">
        <div className="max-w-screen-2xl mx-auto px-6 md:px-10">
          <div className="max-w-2xl mx-auto text-center">
            <span className="font-label uppercase tracking-[0.15em] text-secondary text-sm">Visit Us</span>
            <h2 className="font-headline text-3xl md:text-4xl text-primary mt-3 mb-8">Our Office</h2>
            <div className="bg-white rounded-xl p-8 border border-outline-variant/20 shadow-sm space-y-4">
              <p className="text-on-surface-variant">{siteConfig.office_address}</p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <a href={`tel:${siteConfig.contact_phone}`} className="flex items-center gap-2 text-primary hover:underline text-sm">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/></svg>
                  {siteConfig.contact_phone}
                </a>
                <a href={`mailto:${siteConfig.contact_email}`} className="flex items-center gap-2 text-primary hover:underline text-sm">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>
                  {siteConfig.contact_email}
                </a>
              </div>
              <Link href="/properties" className="inline-block mt-4 bg-primary text-on-primary px-8 py-3 rounded-md font-label uppercase tracking-[0.15em] text-xs hover:bg-primary-container transition-all">
                Browse Properties
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
