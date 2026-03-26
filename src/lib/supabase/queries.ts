import { createClient } from "./server";
import { createClient as createBrowserClient } from "@supabase/supabase-js";
import type { Property, PropertyImage, Enquiry, SiteConfig, PropertyFilters } from "../types";

// Client that doesn't need cookies (for build-time use like generateStaticParams)
function createAnonClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}

// Fetch all active properties with images, applying filters
export async function getProperties(filters?: PropertyFilters): Promise<Property[]> {
  const supabase = await createClient();

  let query = supabase
    .from("properties")
    .select("*, property_images(*)")
    .eq("is_active", true)
    .eq("is_sold", false);

  if (filters?.search) {
    query = query.or(
      `title.ilike.%${filters.search}%,address.ilike.%${filters.search}%,city.ilike.%${filters.search}%`
    );
  }
  if (filters?.type) query = query.eq("type", filters.type);
  if (filters?.subtype) query = query.eq("subtype", filters.subtype);
  if (filters?.transaction) query = query.eq("transaction_type", filters.transaction);

  // Sort
  switch (filters?.sort) {
    case "price_asc":
      query = query.order("area", { ascending: true }); // price is text, use area as proxy
      break;
    case "price_desc":
      query = query.order("area", { ascending: false });
      break;
    case "area_asc":
      query = query.order("area", { ascending: true });
      break;
    case "area_desc":
      query = query.order("area", { ascending: false });
      break;
    default:
      query = query.order("created_at", { ascending: false });
  }

  const { data, error } = await query;
  if (error) {
    console.error("Error fetching properties:", error);
    return [];
  }

  return (data || []).map(mapProperty);
}

// Fetch featured properties
export async function getFeaturedProperties(): Promise<Property[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("properties")
    .select("*, property_images(*)")
    .eq("is_active", true)
    .eq("is_featured", true)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching featured properties:", error);
    return [];
  }
  return (data || []).map(mapProperty);
}

// Fetch single property by slug
export async function getPropertyBySlug(slug: string): Promise<Property | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("properties")
    .select("*, property_images(*)")
    .eq("slug", slug)
    .single();

  if (error || !data) return null;
  return mapProperty(data);
}

// Fetch all property slugs for static generation (no cookies needed)
export async function getAllPropertySlugs(): Promise<string[]> {
  const supabase = createAnonClient();
  const { data } = await supabase
    .from("properties")
    .select("slug")
    .eq("is_active", true);
  return (data || []).map((p: { slug: string }) => p.slug);
}

// Fetch all properties for admin (including inactive)
export async function getAllProperties(): Promise<Property[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("properties")
    .select("*, property_images(*)")
    .order("created_at", { ascending: false });

  if (error) return [];
  return (data || []).map(mapProperty);
}

// Submit an enquiry
export async function submitEnquiry(enquiry: {
  name: string;
  email: string;
  phone: string;
  message?: string;
  property_id?: string | null;
  property_title?: string | null;
}): Promise<{ success: boolean; id?: string; error?: string }> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("enquiries")
    .insert({
      name: enquiry.name,
      email: enquiry.email,
      phone: enquiry.phone,
      message: enquiry.message || "",
      property_id: enquiry.property_id || null,
      property_title: enquiry.property_title || null,
    })
    .select("id")
    .single();

  if (error) return { success: false, error: error.message };
  return { success: true, id: data.id };
}

// Fetch all enquiries (admin)
export async function getEnquiries(): Promise<Enquiry[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("enquiries")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) return [];
  return data || [];
}

// Fetch site config
export async function getSiteConfig(): Promise<SiteConfig> {
  const supabase = await createClient();
  const { data } = await supabase.from("site_config").select("*");

  const defaults: SiteConfig = {
    contact_phone: "+91-9876543210",
    contact_email: "info@realitywize.com",
    whatsapp_number: "919876543210",
    office_address: "Plot 22, Sector 150, Noida Expressway, UP 201310",
  };

  if (!data) return defaults;
  for (const row of data) {
    if (row.key in defaults) {
      (defaults as unknown as Record<string, string>)[row.key] = row.value;
    }
  }
  return defaults;
}

// Map DB row to Property type
function mapProperty(row: Record<string, unknown>): Property {
  const images = ((row.property_images as Record<string, unknown>[]) || [])
    .sort((a, b) => (a.sort_order as number) - (b.sort_order as number))
    .map((img) => ({
      id: img.id as string,
      url: img.url as string,
      alt_text: (img.alt_text as string) || "",
      sort_order: (img.sort_order as number) || 0,
      is_primary: (img.is_primary as boolean) || false,
    }));

  return {
    id: row.id as string,
    slug: row.slug as string,
    title: row.title as string,
    subtitle: row.subtitle as string | null,
    description: (row.description as string) || "",
    type: row.type as Property["type"],
    subtype: row.subtype as Property["subtype"],
    transaction_type: row.transaction_type as Property["transaction_type"],
    price: row.price as string | null,
    area: row.area as number | null,
    area_type: row.area_type as Property["area_type"],
    facing: row.facing as string | null,
    floor: row.floor as string | null,
    bedrooms: row.bedrooms as number | null,
    status: row.status as Property["status"],
    address: (row.address as string) || "",
    pincode: row.pincode as string | null,
    city: (row.city as string) || "Noida",
    state: (row.state as string) || "Uttar Pradesh",
    maps_link: row.maps_link as string | null,
    tags: (row.tags as string[]) || [],
    images,
    is_sold: (row.is_sold as boolean) || false,
    is_active: row.is_active as boolean,
    is_featured: (row.is_featured as boolean) || false,
    created_at: row.created_at as string,
    updated_at: row.updated_at as string,
  };
}
