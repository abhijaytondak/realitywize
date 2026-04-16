import BuilderCard from "@/components/BuilderCard";
import Link from "next/link";
import type { Metadata } from "next";
import { getBuilderProjects } from "@/lib/supabase/queries";

export const metadata: Metadata = {
  title: "Builders & Investors | RealtyWize",
  description:
    "Premium collaboration opportunities starting from Rs 10 Crore. Partner with us on landmark projects across Noida, Greater Noida, and the Yamuna Expressway corridor.",
};

export const revalidate = 60;

export default async function BuildersPage() {
  const projects = await getBuilderProjects();

  return (
    <div className="min-h-screen bg-surface">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-[#062014] via-[#173124] to-[#1a3a28] py-16 md:py-24">
        <div className="max-w-screen-xl mx-auto px-6 md:px-10 text-center">
          <span className="inline-block font-label uppercase tracking-[0.2em] text-primary-fixed text-xs bg-white/10 px-4 py-1.5 rounded-full mb-6">
            Exclusive Collaborations
          </span>
          <h1 className="font-headline text-3xl md:text-5xl lg:text-6xl text-white mt-2">
            Builders & Investors Portal
          </h1>
          <p className="text-white/70 mt-4 max-w-2xl mx-auto text-sm md:text-base leading-relaxed">
            Premium collaboration opportunities starting from &#8377;10 Crore. Partner with us on
            landmark projects across Noida, Greater Noida, and the Yamuna Expressway corridor.
          </p>

          {/* Stats */}
          <div className="flex flex-wrap justify-center gap-6 mt-10">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl px-8 py-5 min-w-[180px]">
              <p className="font-headline text-3xl text-primary-fixed">&#8377;50Cr+</p>
              <p className="text-white/60 text-xs font-label uppercase tracking-wider mt-1">
                Minimum Project Value
              </p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl px-8 py-5 min-w-[180px]">
              <p className="font-headline text-3xl text-primary-fixed">10+</p>
              <p className="text-white/60 text-xs font-label uppercase tracking-wider mt-1">
                Active Collaborations
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Filter Bar (placeholder) */}
      <div className="border-b border-outline-variant/20 bg-white">
        <div className="max-w-screen-xl mx-auto px-6 md:px-10 py-4 flex items-center gap-4 overflow-x-auto">
          <span className="font-label text-xs uppercase tracking-wider text-on-surface-variant">
            Filter:
          </span>
          <button className="px-4 py-1.5 text-xs font-label rounded-full bg-primary text-on-primary">
            All
          </button>
          <button className="px-4 py-1.5 text-xs font-label rounded-full border border-outline-variant/30 text-on-surface-variant hover:bg-surface-container-low transition-colors">
            Joint Venture
          </button>
          <button className="px-4 py-1.5 text-xs font-label rounded-full border border-outline-variant/30 text-on-surface-variant hover:bg-surface-container-low transition-colors">
            Investment
          </button>
          <button className="px-4 py-1.5 text-xs font-label rounded-full border border-outline-variant/30 text-on-surface-variant hover:bg-surface-container-low transition-colors">
            Co-Development
          </button>
        </div>
      </div>

      {/* Projects Grid */}
      <div className="max-w-screen-xl mx-auto px-6 md:px-10 py-10 md:py-14">
        {projects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <BuilderCard key={project.id} project={project} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <svg
              className="w-16 h-16 text-outline-variant mx-auto mb-4"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 7V3H2v18h20V7H12zM6 19H4v-2h2v2zm0-4H4v-2h2v2zm0-4H4V9h2v2zm0-4H4V5h2v2zm4 12H8v-2h2v2zm0-4H8v-2h2v2zm0-4H8V9h2v2zm0-4H8V5h2v2zm10 12h-8v-2h2v-2h-2v-2h2v-2h-2V9h8v10zm-2-8h-2v2h2v-2zm0 4h-2v2h2v-2z" />
            </svg>
            <h3 className="font-headline text-2xl text-primary mb-2">No Projects Available</h3>
            <p className="text-on-surface-variant text-sm max-w-md mx-auto">
              No collaboration projects available at the moment. Check back soon or contact us for
              exclusive opportunities.
            </p>
          </div>
        )}
      </div>

      {/* Bottom CTA */}
      <div className="bg-primary-container/10 border-t border-outline-variant/20">
        <div className="max-w-screen-xl mx-auto px-6 md:px-10 py-14 text-center">
          <h2 className="font-headline text-2xl md:text-3xl text-primary mb-3">
            Interested in Collaboration?
          </h2>
          <p className="text-on-surface-variant text-sm mb-8 max-w-lg mx-auto">
            Reach out to discuss partnership opportunities on premium real estate projects.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="tel:+919876543210"
              className="inline-flex items-center gap-2 bg-primary text-on-primary px-6 py-3 rounded-lg font-label uppercase tracking-wider text-xs hover:bg-primary-container transition-all"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
              </svg>
              Call Us
            </a>
            <a
              href="mailto:info@realitywize.com?subject=Collaboration Inquiry"
              className="inline-flex items-center gap-2 border border-primary text-primary px-6 py-3 rounded-lg font-label uppercase tracking-wider text-xs hover:bg-primary hover:text-on-primary transition-all"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
              </svg>
              Email Us
            </a>
            <Link
              href="/#inquiry"
              className="inline-flex items-center gap-2 bg-secondary/10 text-secondary px-6 py-3 rounded-lg font-label uppercase tracking-wider text-xs hover:bg-secondary/20 transition-all"
            >
              General Inquiry
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
