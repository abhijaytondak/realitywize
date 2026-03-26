import { Suspense } from "react";
import PropertyCard from "@/components/PropertyCard";
import PropertyFilters from "@/components/PropertyFilters";
import { SAMPLE_PROPERTIES } from "@/lib/sample-data";
import { Property, PropertyType, TransactionType } from "@/lib/types";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Properties | RealtyWize",
  description: "Browse premium properties across Noida and NCR. Filter by type, location, price, and more.",
};

function parsePrice(price: string | null): number {
  if (!price) return 0;
  const lower = price.toLowerCase().replace(/[^\d.a-z/]/g, "");
  if (lower.includes("cr")) return parseFloat(lower) * 10000000;
  if (lower.includes("lakh")) return parseFloat(lower) * 100000;
  return parseFloat(lower) || 0;
}

function filterAndSort(
  properties: Property[],
  params: Record<string, string | undefined>
): Property[] {
  let result = properties.filter((p) => p.is_active && !p.is_sold);

  if (params.search) {
    const q = params.search.toLowerCase();
    result = result.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.address.toLowerCase().includes(q) ||
        p.city.toLowerCase().includes(q) ||
        p.tags.some((t) => t.toLowerCase().includes(q))
    );
  }

  if (params.type) {
    result = result.filter((p) => p.type === params.type);
  }

  if (params.subtype) {
    result = result.filter((p) => p.subtype === params.subtype);
  }

  if (params.transaction) {
    result = result.filter((p) => p.transaction_type === params.transaction);
  }

  // Sort
  switch (params.sort) {
    case "price_asc":
      result.sort((a, b) => parsePrice(a.price) - parsePrice(b.price));
      break;
    case "price_desc":
      result.sort((a, b) => parsePrice(b.price) - parsePrice(a.price));
      break;
    case "area_asc":
      result.sort((a, b) => (a.area || 0) - (b.area || 0));
      break;
    case "area_desc":
      result.sort((a, b) => (b.area || 0) - (a.area || 0));
      break;
    default: // newest
      result.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
  }

  return result;
}

export default async function PropertiesPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | undefined>>;
}) {
  const params = await searchParams;
  const properties = filterAndSort(SAMPLE_PROPERTIES, params);

  const activeType = params.type as PropertyType | undefined;
  const activeTransaction = params.transaction as TransactionType | undefined;

  return (
    <div className="min-h-screen bg-surface">
      {/* Page header */}
      <div className="bg-primary py-12 md:py-16">
        <div className="max-w-screen-2xl mx-auto px-6 md:px-10">
          <span className="font-label uppercase tracking-[0.15em] text-primary-fixed text-xs">
            Browse
          </span>
          <h1 className="font-headline text-3xl md:text-5xl text-on-primary mt-2">
            {activeType ? `${activeType} Properties` : "All Properties"}
            {activeTransaction ? ` for ${activeTransaction}` : ""}
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
