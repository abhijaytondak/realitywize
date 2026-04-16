import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { getBuilderProjectBySlug } from "@/lib/supabase/queries";

export const revalidate = 60;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = await getBuilderProjectBySlug(slug);
  if (!project) return { title: "Project Not Found" };
  return {
    title: `${project.title} | Builders & Investors | RealtyWize`,
    description: project.short_description || project.description?.slice(0, 160),
  };
}

export default async function BuilderDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = await getBuilderProjectBySlug(slug);

  if (!project) notFound();

  return (
    <div className="min-h-screen bg-surface">
      {/* Breadcrumbs */}
      <div className="bg-surface-container-low border-b border-outline-variant/20">
        <div className="max-w-screen-xl mx-auto px-6 md:px-10 py-3">
          <nav className="flex items-center gap-2 text-xs text-on-surface-variant font-label">
            <Link href="/" className="hover:text-primary transition-colors">
              Home
            </Link>
            <span>/</span>
            <Link href="/builders" className="hover:text-primary transition-colors">
              Builders
            </Link>
            <span>/</span>
            <span className="text-primary font-medium truncate max-w-[200px]">
              {project.title}
            </span>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-screen-xl mx-auto px-6 md:px-10 py-8 md:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* Main Image */}
            {project.image_url && (
              <div className="relative aspect-video rounded-xl overflow-hidden">
                <Image
                  src={project.image_url}
                  alt={project.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 66vw"
                  priority
                />
              </div>
            )}

            {/* Gallery Images */}
            {project.gallery_images && project.gallery_images.length > 0 && (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {project.gallery_images.map((img, idx) => (
                  <div
                    key={idx}
                    className="relative aspect-video rounded-lg overflow-hidden"
                  >
                    <Image
                      src={img}
                      alt={`${project.title} gallery ${idx + 1}`}
                      fill
                      className="object-cover hover:scale-105 transition-transform duration-300"
                      sizes="(max-width: 768px) 50vw, 22vw"
                    />
                  </div>
                ))}
              </div>
            )}

            {/* Title */}
            <div>
              <h1 className="font-headline text-3xl md:text-4xl text-primary">
                {project.title}
              </h1>
              {project.location && (
                <div className="flex items-center gap-1.5 text-on-surface-variant text-sm mt-2">
                  <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                  </svg>
                  <span>{project.location}</span>
                </div>
              )}
            </div>

            {/* Description */}
            {project.description && (
              <div>
                <p className="text-on-surface-variant leading-relaxed whitespace-pre-line">
                  {project.description}
                </p>
              </div>
            )}

            {/* Highlights */}
            {project.highlights && project.highlights.length > 0 && (
              <div>
                <h2 className="font-headline text-xl text-primary mb-4">Highlights</h2>
                <ul className="space-y-3">
                  {project.highlights.map((highlight, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <svg
                        className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
                      </svg>
                      <span className="text-on-surface-variant text-sm">{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            <div className="lg:sticky lg:top-24 space-y-6">
              {/* Investment Details Card */}
              <div className="bg-white rounded-xl p-6 border border-outline-variant/20 shadow-sm">
                <h3 className="font-headline text-lg text-primary mb-5">Investment Details</h3>
                <div className="space-y-4">
                  <div>
                    <p className="text-xs text-on-surface-variant font-label uppercase tracking-wider mb-1">
                      Investment Range
                    </p>
                    <p className="font-headline text-primary text-lg">
                      {project.investment_range}
                    </p>
                  </div>

                  {project.min_entry_amount && (
                    <div>
                      <p className="text-xs text-on-surface-variant font-label uppercase tracking-wider mb-1">
                        Min Entry Amount
                      </p>
                      <p className="font-headline text-primary text-sm">
                        {project.min_entry_amount}
                      </p>
                    </div>
                  )}

                  <div>
                    <p className="text-xs text-on-surface-variant font-label uppercase tracking-wider mb-1">
                      Collaboration Type
                    </p>
                    <p className="text-on-surface-variant text-sm">
                      {project.collaboration_type}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs text-on-surface-variant font-label uppercase tracking-wider mb-1">
                      Project Type
                    </p>
                    <p className="text-on-surface-variant text-sm">{project.project_type}</p>
                  </div>

                  <div>
                    <p className="text-xs text-on-surface-variant font-label uppercase tracking-wider mb-1">
                      Location
                    </p>
                    <p className="text-on-surface-variant text-sm">{project.location}</p>
                  </div>

                  {project.area && (
                    <div>
                      <p className="text-xs text-on-surface-variant font-label uppercase tracking-wider mb-1">
                        Area
                      </p>
                      <p className="text-on-surface-variant text-sm">{project.area}</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Contact Card */}
              <div className="bg-white rounded-xl p-6 border border-outline-variant/20 shadow-sm space-y-3">
                <h3 className="font-headline text-lg text-primary mb-4">Get in Touch</h3>

                {project.contact_phone && (
                  <a
                    href={`tel:${project.contact_phone}`}
                    className="flex items-center justify-center gap-3 w-full bg-primary text-on-primary px-6 py-3.5 rounded-lg font-label uppercase tracking-wider text-xs hover:bg-primary-container transition-all"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
                    </svg>
                    Call Now
                  </a>
                )}

                {project.contact_email && (
                  <a
                    href={`mailto:${project.contact_email}?subject=Inquiry about ${project.title}`}
                    className="flex items-center justify-center gap-3 w-full border border-primary text-primary px-6 py-3.5 rounded-lg font-label uppercase tracking-wider text-xs hover:bg-primary hover:text-on-primary transition-all"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                    </svg>
                    Email
                  </a>
                )}

                <Link
                  href="/#inquiry"
                  className="flex items-center justify-center gap-3 w-full bg-secondary/10 text-secondary px-6 py-3.5 rounded-lg font-label uppercase tracking-wider text-xs hover:bg-secondary/20 transition-all"
                >
                  General Inquiry
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
