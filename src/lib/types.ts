// Property Types
export type PropertyType = "Commercial" | "Industrial" | "Institutional" | "Residential";

export type CommercialSubtype = "Office" | "Shop" | "Showroom" | "Business Center" | "Land" | "Hotel";
export type IndustrialSubtype = "Plot" | "Shed" | "Factory" | "Warehouse/Godown";
export type InstitutionalSubtype =
  | "Corporate Building" | "College Plot" | "School Plot" | "Hospital Building"
  | "Hospital Plot" | "IT Park/SEZ Office" | "Plot" | "Building" | "IT Plot"
  | "IT Building" | "Banquet Hall";
export type ResidentialSubtype = "Apartment" | "Plot" | "Bungalow/Villa" | "Builder Floor Apartment" | "Farm House";

export type PropertySubtype = CommercialSubtype | IndustrialSubtype | InstitutionalSubtype | ResidentialSubtype;

export type TransactionType = "Sale" | "Lease" | "Pre-Leased";

export type AreaType = "Acres" | "SqFt" | "SqMt" | "SqYd";

export type PropertyStatus = "Warm-shell" | "Semi Furnished" | "Furnished" | "Under Construction" | "New" | "Old" | "Bare-Shell";

export const SUBTYPE_MAP: Record<PropertyType, string[]> = {
  Commercial: ["Office", "Shop", "Showroom", "Business Center", "Land", "Hotel"],
  Industrial: ["Plot", "Shed", "Factory", "Warehouse/Godown"],
  Institutional: [
    "Corporate Building", "College Plot", "School Plot", "Hospital Building",
    "Hospital Plot", "IT Park/SEZ Office", "Plot", "Building", "IT Plot",
    "IT Building", "Banquet Hall",
  ],
  Residential: ["Apartment", "Plot", "Bungalow/Villa", "Builder Floor Apartment", "Farm House"],
};

export interface PropertyImage {
  id: string;
  url: string;
  alt_text: string;
  sort_order: number;
  is_primary: boolean;
}

export interface Property {
  id: string;
  slug: string;
  title: string;
  subtitle: string | null;
  description: string;
  type: PropertyType;
  subtype: PropertySubtype;
  transaction_type: TransactionType;
  price: string | null; // e.g. "1 Cr", "1-2 Cr", null = not disclosed
  area: number | null;
  area_type: AreaType | null;
  facing: string | null;
  floor: string | null;
  bedrooms: number | null;
  status: PropertyStatus | null;
  address: string;
  pincode: string | null;
  city: string;
  state: string;
  maps_link: string | null;
  tags: string[];
  images: PropertyImage[];
  is_sold: boolean;
  is_active: boolean;
  is_featured: boolean;
  created_at: string;
  updated_at: string;
}

export interface Enquiry {
  id: string;
  property_id: string | null;
  property_title: string | null;
  name: string;
  email: string;
  phone: string;
  message: string | null;
  status: "new" | "contacted" | "closed";
  created_at: string;
}

export interface SiteConfig {
  contact_phone: string;
  contact_email: string;
  whatsapp_number: string;
  office_address: string;
}

// CMS Content types
export interface HomeHero {
  badge: string;
  headline: string;
  description: string;
  btn1_text: string;
  btn1_link: string;
  btn2_text: string;
  btn2_link: string;
  bg_image: string;
}

export interface HomeWhyUs {
  label: string;
  headline: string;
  cards: { title: string; description: string }[];
}

export interface HomeInquiry {
  label: string;
  headline: string;
  description: string;
}

export interface AboutHero {
  label: string;
  headline: string;
  description: string;
}

export interface AboutStory {
  label: string;
  headline: string;
  paragraphs: string[];
}

export interface AboutStat {
  number: string;
  label: string;
}

export interface AboutValues {
  label: string;
  headline: string;
  cards: { title: string; description: string }[];
}

export interface PageContent {
  home_hero: HomeHero;
  home_why_us: HomeWhyUs;
  home_inquiry: HomeInquiry;
  about_hero: AboutHero;
  about_story: AboutStory;
  about_stats: AboutStat[];
  about_values: AboutValues;
}

// Filter params for listing page
export interface PropertyFilters {
  search?: string;
  type?: PropertyType;
  subtype?: PropertySubtype;
  transaction?: TransactionType;
  min_price?: string;
  max_price?: string;
  min_area?: string;
  max_area?: string;
  sort?: "price_asc" | "price_desc" | "newest" | "area_asc" | "area_desc";
}
