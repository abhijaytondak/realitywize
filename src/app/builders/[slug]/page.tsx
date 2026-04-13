import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";

export const revalidate = 60;

// Dummy data until Supabase tables are created
const DUMMY_PROJECTS: Record<string, {
  title: string; description: string; short_description: string;
  investment_range: string; min_entry_amount: string | null; collaboration_type: string;
  location: string; area: string | null; project_type: string;
  highlights: string[]; image_url: string; gallery_images: string[];
  contact_phone: string | null; contact_email: string | null;
}> = {
  "verdant-heights-township": {
    title: "Verdant Heights Township",
    description: "A landmark 50-acre integrated township located on the Yamuna Expressway, just 15 minutes from the upcoming Noida International Airport at Jewar.\n\nThis project offers a rare opportunity for builders and investors to co-develop a world-class residential community featuring luxury villas, premium apartments, a commercial plaza, clubhouse with sports facilities, landscaped gardens, and dedicated schools & healthcare zones.\n\nThe township is strategically positioned to benefit from the massive infrastructure development in the region — including the Delhi-Mumbai Industrial Corridor, the upcoming metro extension, and the 6-lane Yamuna Expressway connectivity.\n\nWith YEIDA approvals in place and land acquisition completed, this is a ready-to-develop opportunity with projected ROI of 25-30% over 4 years.",
    short_description: "A 50-acre integrated township with luxury villas, clubhouse, and commercial plaza on the Yamuna Expressway.",
    investment_range: "₹80 Cr - ₹120 Cr",
    min_entry_amount: "₹10 Cr",
    collaboration_type: "Joint Venture",
    location: "Sector 22D, Yamuna Expressway",
    area: "50 Acres",
    project_type: "Integrated Township",
    highlights: [
      "50-acre land parcel with clear YEIDA approvals",
      "15 minutes from Noida International Airport (Jewar)",
      "Direct Yamuna Expressway frontage",
      "Projected ROI of 25-30% over 4 years",
      "Mixed-use development: villas, apartments, retail",
      "Infrastructure-ready with water, sewage, and power connections",
    ],
    image_url: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1200&q=80",
    gallery_images: [
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80",
    ],
    contact_phone: "+91-9876543210",
    contact_email: "builders@realitywize.com",
  },
  "greeno-west-commercial-hub": {
    title: "GRENO West Commercial Hub",
    description: "A premium commercial complex strategically located in Tech Zone IV, Greater Noida West — the fastest-growing real estate micro-market in NCR.\n\nThis Grade-A commercial development spans 8 acres and includes modern office spaces, a curated retail zone, food court, multiplex-ready space, and covered parking for 1,200+ vehicles.\n\nGreater Noida West already has 2 lakh+ residential units delivered with a population exceeding 5 lakh residents — yet severely lacks quality commercial infrastructure. This project fills that gap and offers guaranteed high footfall from Day 1.\n\nIdeal for investors looking for a revenue-sharing model with predictable rental income from pre-committed anchor tenants.",
    short_description: "Premium commercial complex with Grade-A office spaces, retail outlets, and food court in Greater Noida West.",
    investment_range: "₹50 Cr - ₹75 Cr",
    min_entry_amount: "₹15 Cr",
    collaboration_type: "Revenue Sharing",
    location: "Tech Zone IV, Greater Noida West",
    area: "8 Acres",
    project_type: "Commercial Complex",
    highlights: [
      "Located in NCR's fastest-growing micro-market",
      "5 lakh+ captive population in surrounding residential zones",
      "Pre-committed anchor tenants for retail and food court",
      "Revenue-sharing model with predictable rental income",
      "1,200+ covered parking spaces",
      "Metro connectivity planned within 2 km radius",
    ],
    image_url: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&q=80",
    gallery_images: [
      "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80",
      "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=800&q=80",
    ],
    contact_phone: "+91-9876543210",
    contact_email: "builders@realitywize.com",
  },
  "noida-150-luxury-residences": {
    title: "Sector 150 Luxury Residences",
    description: "An ultra-luxury residential project in the premium Sector 150 corridor along the Noida Expressway.\n\nSpread across 25 acres, this project features 3 & 4 BHK premium apartments with world-class amenities including an Olympic-size swimming pool, cricket practice nets, tennis courts, jogging track, meditation garden, and a grand clubhouse.\n\nSector 150 is Noida's most prestigious residential zone — home to leading developers and surrounded by top schools, hospitals, and retail destinations. The location offers seamless connectivity to Delhi via the Noida-Greater Noida Expressway.\n\nThis is a joint venture opportunity with land already acquired and architectural plans approved by Noida Authority.",
    short_description: "Ultra-luxury 3 & 4 BHK residences spread across 25 acres with sports facilities and infinity pool.",
    investment_range: "₹100 Cr - ₹150 Cr",
    min_entry_amount: "₹20 Cr",
    collaboration_type: "Joint Venture",
    location: "Sector 150, Noida Expressway",
    area: "25 Acres",
    project_type: "Luxury Residential",
    highlights: [
      "Sector 150 — Noida's most premium address",
      "Noida Authority-approved architectural plans",
      "Olympic-size pool, cricket nets, tennis courts",
      "25 acres with 70% open and green area",
      "2 minutes from Noida-Greater Noida Expressway",
      "Surrounded by top schools and hospitals",
    ],
    image_url: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200&q=80",
    gallery_images: [
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80",
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&q=80",
    ],
    contact_phone: "+91-9876543210",
    contact_email: "builders@realitywize.com",
  },
  "yamuna-logistics-park": {
    title: "Yamuna Logistics & Warehousing Park",
    description: "A state-of-the-art logistics and warehousing facility on 40 acres along the Yamuna Expressway, strategically positioned near the Noida International Airport at Jewar.\n\nDesigned for Grade-A warehousing with 40-ft clear height, dock-level loading bays, fire sprinkler systems, and 24/7 security with CCTV surveillance. The park includes dedicated zones for cold storage, e-commerce fulfillment, and general warehousing.\n\nWith the airport becoming operational and the Delhi-Mumbai Industrial Corridor passing through, this location is set to become North India's premier logistics hub.\n\nIdeal for institutional investors and logistics companies looking to own or lease premium warehousing space.",
    short_description: "State-of-the-art logistics and warehousing facility on 40 acres near Jewar Airport.",
    investment_range: "₹60 Cr - ₹90 Cr",
    min_entry_amount: "₹10 Cr",
    collaboration_type: "Land Partnership",
    location: "Yamuna Expressway, Near Jewar",
    area: "40 Acres",
    project_type: "Industrial / Logistics",
    highlights: [
      "40 acres on Yamuna Expressway",
      "5 km from Noida International Airport",
      "Grade-A specs: 40-ft clear height, dock-level bays",
      "Cold storage and e-commerce fulfillment zones",
      "Delhi-Mumbai Industrial Corridor connectivity",
      "Pre-leasing interest from major e-commerce players",
    ],
    image_url: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=1200&q=80",
    gallery_images: [],
    contact_phone: "+91-9876543210",
    contact_email: "builders@realitywize.com",
  },
  "greater-noida-it-park": {
    title: "Greater Noida IT Park & SEZ",
    description: "A visionary IT/ITES Special Economic Zone in Knowledge Park V, Greater Noida — designed to attract top multinational corporations and Indian IT companies.\n\nThe campus spans 30 acres with 2.5 million sq ft of built-up area, featuring plug-and-play office floors, a Tier-3 data center, conference and convention facilities, food courts, recreation zones, and landscaped courtyards.\n\nGreater Noida is emerging as a serious IT destination with existing presence of companies like HCL, Samsung, and multiple startups. The proximity to Noida International Airport adds significant value for companies with global operations.\n\nThis is a project-funding opportunity with approved SEZ status and tax benefits under the SEZ Act.",
    short_description: "IT/ITES SEZ project with plug-and-play offices, data center, and campus-style development.",
    investment_range: "₹120 Cr - ₹200 Cr",
    min_entry_amount: "₹25 Cr",
    collaboration_type: "Project Funding",
    location: "Knowledge Park V, Greater Noida",
    area: "30 Acres",
    project_type: "IT Park / SEZ",
    highlights: [
      "Approved SEZ status with tax benefits",
      "2.5 million sq ft built-up area",
      "Tier-3 data center facility",
      "Plug-and-play office floors",
      "Close to Noida International Airport",
      "Existing IT ecosystem with HCL, Samsung nearby",
    ],
    image_url: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&q=80",
    gallery_images: [
      "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=800&q=80",
      "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&q=80",
    ],
    contact_phone: "+91-9876543210",
    contact_email: "builders@realitywize.com",
  },
  "expressway-mixed-use-development": {
    title: "Expressway Mixed-Use Development",
    description: "A premium mixed-use development along the Yamuna Expressway combining retail, hospitality, and co-working spaces in a single integrated project.\n\nThe development features a curated retail mall with entertainment zone, serviced apartments for business travelers and expats, modern co-working spaces, and rooftop dining experiences.\n\nPositioned at a key interchange on the Yamuna Expressway, the project benefits from high visibility and easy access for commuters traveling between Greater Noida, Agra, and the upcoming Jewar Airport.\n\nThis revenue-sharing opportunity is structured for steady returns through diversified income streams across retail, hospitality, and office leasing.",
    short_description: "Premium mixed-use project combining retail mall, serviced apartments, and co-working spaces.",
    investment_range: "₹70 Cr - ₹100 Cr",
    min_entry_amount: "₹12 Cr",
    collaboration_type: "Revenue Sharing",
    location: "Sector 18, Yamuna Expressway",
    area: "15 Acres",
    project_type: "Mixed Use",
    highlights: [
      "Yamuna Expressway interchange location",
      "Diversified income: retail + hospitality + office",
      "Serviced apartments for business travelers",
      "High-visibility frontage on expressway",
      "Revenue-sharing model with multiple income streams",
      "20 minutes from Jewar Airport",
    ],
    image_url: "https://images.unsplash.com/photo-1577495508048-b635879837f1?w=1200&q=80",
    gallery_images: [],
    contact_phone: "+91-9876543210",
    contact_email: "builders@realitywize.com",
  },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = DUMMY_PROJECTS[slug];
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
  // Use dummy data until Supabase tables are created
  // TODO: Replace with getBuilderProjectBySlug(slug) after running migration
  const project = DUMMY_PROJECTS[slug];

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
                  {/* Investment Range */}
                  <div>
                    <p className="text-xs text-on-surface-variant font-label uppercase tracking-wider mb-1">
                      Investment Range
                    </p>
                    <p className="font-headline text-primary text-lg">
                      {project.investment_range}
                    </p>
                  </div>

                  {/* Min Entry Amount */}
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

                  {/* Collaboration Type */}
                  <div>
                    <p className="text-xs text-on-surface-variant font-label uppercase tracking-wider mb-1">
                      Collaboration Type
                    </p>
                    <p className="text-on-surface-variant text-sm">
                      {project.collaboration_type}
                    </p>
                  </div>

                  {/* Project Type */}
                  <div>
                    <p className="text-xs text-on-surface-variant font-label uppercase tracking-wider mb-1">
                      Project Type
                    </p>
                    <p className="text-on-surface-variant text-sm">{project.project_type}</p>
                  </div>

                  {/* Location */}
                  <div>
                    <p className="text-xs text-on-surface-variant font-label uppercase tracking-wider mb-1">
                      Location
                    </p>
                    <p className="text-on-surface-variant text-sm">{project.location}</p>
                  </div>

                  {/* Area */}
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
