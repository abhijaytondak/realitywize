import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import ImageGallery from "@/components/ImageGallery";
import InquiryForm from "@/components/InquiryForm";
import { getPropertyBySlug, getAllPropertySlugs, getSiteConfig } from "@/lib/supabase/queries";

// Property detail — revalidate every 10 minutes
export const revalidate = 600;

export async function generateStaticParams() {
  const slugs = await getAllPropertySlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const property = await getPropertyBySlug(slug);
  if (!property) return { title: "Property Not Found" };
  const description = property.description?.slice(0, 160) || `${property.type} property in ${property.city}`;
  return {
    title: property.title,
    description,
    alternates: { canonical: `/properties/${property.slug}` },
    openGraph: {
      title: property.title,
      description,
      url: `/properties/${property.slug}`,
      type: "article",
      images: property.images[0]?.url
        ? [{ url: property.images[0].url, width: 1200, height: 630, alt: property.title }]
        : [],
    },
    twitter: {
      card: "summary_large_image",
      title: property.title,
      description,
      images: property.images[0]?.url ? [property.images[0].url] : [],
    },
  };
}

export default async function PropertyDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const [property, siteConfig] = await Promise.all([
    getPropertyBySlug(slug),
    getSiteConfig(),
  ]);

  if (!property) notFound();

  const attributes = [
    { label: "Type", value: `${property.type} - ${property.subtype}` },
    { label: "Transaction", value: property.transaction_type },
    property.area ? { label: "Area", value: `${property.area.toLocaleString()} ${property.area_type}` } : null,
    property.bedrooms ? { label: "Bedrooms", value: `${property.bedrooms} BHK` } : null,
    property.floor ? { label: "Floor", value: property.floor } : null,
    property.facing ? { label: "Facing", value: property.facing } : null,
    property.status ? { label: "Status", value: property.status } : null,
  ].filter(Boolean) as { label: string; value: string }[];

  return (
    <div className="min-h-screen bg-surface">
      {/* Breadcrumbs */}
      <div className="bg-surface-container-low border-b border-outline-variant/20">
        <div className="max-w-screen-2xl mx-auto px-6 md:px-10 py-3">
          <nav className="flex items-center gap-2 text-xs text-on-surface-variant font-label">
            <Link href="/" className="hover:text-primary transition-colors">Home</Link>
            <span>/</span>
            <Link href="/properties" className="hover:text-primary transition-colors">Properties</Link>
            <span>/</span>
            <span className="text-primary font-medium truncate max-w-[200px]">{property.title}</span>
          </nav>
        </div>
      </div>

      <div className="max-w-screen-2xl mx-auto px-6 md:px-10 py-8 md:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          {/* Left column: Gallery + Details */}
          <div className="lg:col-span-2 space-y-8">
            <ImageGallery images={property.images} />

            {/* Title + Price */}
            <div>
              <div className="flex flex-wrap gap-2 mb-3">
                {property.tags.map((tag) => (
                  <span
                    key={tag}
                    className="bg-primary-fixed/30 text-primary text-[10px] uppercase tracking-wider px-3 py-1 rounded font-label font-semibold"
                  >
                    {tag}
                  </span>
                ))}
                <span className="bg-secondary/10 text-secondary text-[10px] uppercase tracking-wider px-3 py-1 rounded font-label font-semibold">
                  {property.transaction_type}
                </span>
              </div>
              <h1 className="font-headline text-3xl md:text-4xl text-primary mb-2">{property.title}</h1>
              {property.subtitle && (
                <p className="text-on-surface-variant text-lg mb-3">{property.subtitle}</p>
              )}
              <div className="flex items-center gap-2 text-on-surface-variant text-sm mb-4">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                </svg>
                {property.address}, {property.city}, {property.state}
                {property.pincode && ` - ${property.pincode}`}
              </div>
              <p className="font-headline text-3xl text-primary">
                {property.price ? `\u20B9${property.price}` : "Price on Request"}
              </p>
            </div>

            {/* Description */}
            {property.description && (
              <div>
                <h2 className="font-headline text-xl text-primary mb-4">Description</h2>
                <p className="text-on-surface-variant leading-relaxed">{property.description}</p>
              </div>
            )}

            {/* Attributes */}
            <div>
              <h2 className="font-headline text-xl text-primary mb-4">Property Details</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {attributes.map(({ label, value }) => (
                  <div key={label} className="bg-white rounded-lg p-4 border border-outline-variant/20">
                    <p className="text-xs text-on-surface-variant font-label uppercase tracking-wider mb-1">{label}</p>
                    <p className="font-headline text-primary text-sm">{value}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Location */}
            {property.maps_link && (
              <div>
                <h2 className="font-headline text-xl text-primary mb-4">Location</h2>
                <div className="bg-white rounded-lg p-6 border border-outline-variant/20">
                  <p className="text-on-surface-variant text-sm mb-4">
                    {property.address}, {property.city}, {property.state}
                    {property.pincode && ` - ${property.pincode}`}
                  </p>
                  <a
                    href={property.maps_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-primary text-sm font-label hover:underline"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                    </svg>
                    Open in Google Maps
                  </a>
                </div>
              </div>
            )}
          </div>

          {/* Right column: Inquiry + CTAs */}
          <div className="space-y-6">
            <div className="lg:sticky lg:top-24 space-y-6">
              {/* CTA Buttons */}
              <div className="bg-white rounded-xl p-6 border border-outline-variant/20 shadow-sm space-y-3">
                <a
                  href={`tel:${siteConfig.contact_phone}`}
                  className="flex items-center justify-center gap-3 w-full bg-primary text-on-primary px-6 py-3.5 rounded-lg font-label uppercase tracking-wider text-xs hover:bg-primary-container transition-all"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
                  </svg>
                  Call Now
                </a>
                <a
                  href={`https://wa.me/${siteConfig.whatsapp_number}?text=Hi, I'm interested in ${property.title}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-3 w-full bg-[#25D366] text-white px-6 py-3.5 rounded-lg font-label uppercase tracking-wider text-xs hover:bg-[#20BD5A] transition-all"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                  </svg>
                  WhatsApp
                </a>
                <a
                  href={`mailto:${siteConfig.contact_email}?subject=Inquiry about ${property.title}`}
                  className="flex items-center justify-center gap-3 w-full border border-primary text-primary px-6 py-3.5 rounded-lg font-label uppercase tracking-wider text-xs hover:bg-primary hover:text-on-primary transition-all"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                  </svg>
                  Email
                </a>
              </div>

              {/* Inquiry Form */}
              <div className="bg-white rounded-xl p-6 md:p-8 border border-outline-variant/20 shadow-sm">
                <h3 className="font-headline text-xl text-primary mb-6">Send an Inquiry</h3>
                <InquiryForm propertyId={property.id} propertyTitle={property.title} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
