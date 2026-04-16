import { Suspense } from "react";
import PropertyCard from "@/components/PropertyCard";
import PropertyFilters from "@/components/PropertyFilters";
import { getProperties } from "@/lib/supabase/queries";
import { PropertyType, TransactionType, PropertyFilters as Filters } from "@/lib/types";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Properties — Browse Listings in Noida & NCR",
  description:
    "Browse premium residential, commercial, and industrial properties across Noida, Greater Noida, and the Yamuna Expressway corridor. Filter by type, location, price, and more.",
  keywords: [
    "properties Noida",
    "real estate listings",
    "Noida apartments",
    "commercial property NCR",
    "luxury homes Sector 150",
  ],
  alternates: { canonical: "/properties" },
  openGraph: {
    title: "Properties — Browse Listings in Noida & NCR",
    description: "Browse premium properties across Noida, Greater Noida, and the Yamuna Expressway corridor.",
    url: "/properties",
    type: "website",
  },
};

export const revalidate = 60;

export default async function PropertiesPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | undefined>>;
}) {
  const params = await searchParams;

  const filters: Filters = {
    search: params.search,
    type: params.type as PropertyType | undefined,
    subtype: params.subtype as Filters["subtype"],
    transaction: params.transaction as TransactionType | undefined,
    sort: params.sort as Filters["sort"],
  };

  const properties = await getProperties(filters);

  return (
    <div className="min-h-screen bg-surface">
      {/* Page header */}
      <div className="bg-primary py-12 md:py-16">
        <div className="max-w-screen-2xl mx-auto px-6 md:px-10">
          <span className="font-label uppercase tracking-[0.15em] text-primary-fixed text-xs">
            Browse
          </span>
          <h1 className="font-headline text-3xl md:text-5xl text-on-primary mt-2">
            {filters.type ? `${filters.type} Properties` : "All Properties"}
            {filters.transaction ? ` for ${filters.transaction}` : ""}
          </h1>
          <p className="text-on-primary/70 mt-3 text-sm">
            {properties.length} {properties.length === 1 ? "property" : "properties"} found
          </p>
        </div>
      </div>

      {/* Filters + Results */}
      <div className="max-w-screen-2xl mx-auto px-6 md:px-10 py-10">
        <Suspense fallback={<div className="h-20" />}>
          <PropertyFilters />
        </Suspense>

        {properties.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {properties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <svg className="w-16 h-16 text-outline mx-auto mb-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
            </svg>
            <h3 className="font-headline text-2xl text-primary mb-2">No Properties Found</h3>
            <p className="text-on-surface-variant text-sm">Try adjusting your filters or search terms.</p>
          </div>
        )}
      </div>
    </div>
  );
}
