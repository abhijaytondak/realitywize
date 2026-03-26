"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useState } from "react";
import { PropertyType, TransactionType, SUBTYPE_MAP } from "@/lib/types";

const PROPERTY_TYPES: PropertyType[] = ["Residential", "Commercial", "Industrial", "Institutional"];
const TRANSACTION_TYPES: TransactionType[] = ["Sale", "Lease", "Pre-Leased"];

export default function PropertyFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [search, setSearch] = useState(searchParams.get("search") || "");
  const currentType = searchParams.get("type") as PropertyType | null;
  const currentSubtype = searchParams.get("subtype") || "";
  const currentTransaction = searchParams.get("transaction") || "";
  const currentSort = searchParams.get("sort") || "newest";
  const [mobileOpen, setMobileOpen] = useState(false);

  const updateParams = useCallback(
    (key: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      if (value) {
        params.set(key, value);
      } else {
        params.delete(key);
      }
      // Reset subtype when type changes
      if (key === "type") params.delete("subtype");
      router.push(`/properties?${params.toString()}`);
    },
    [router, searchParams]
  );

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    updateParams("search", search);
  };

  const clearFilters = () => {
    setSearch("");
    router.push("/properties");
  };

  const hasFilters = searchParams.toString().length > 0;
  const subtypes = currentType ? SUBTYPE_MAP[currentType] : [];

  return (
    <>
      {/* Search bar */}
      <form onSubmit={handleSearch} className="mb-6">
        <div className="flex gap-2">
          <div className="flex-1 relative">
            <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-outline" fill="currentColor" viewBox="0 0 24 24">
              <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
            </svg>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by title, location, keyword..."
              className="w-full pl-12 pr-4 py-3 bg-white border border-outline-variant/30 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm"
            />
          </div>
          <button
            type="submit"
            className="bg-primary text-on-primary px-6 py-3 rounded-lg font-label uppercase tracking-wider text-xs hover:bg-primary-container transition-all"
          >
            Search
          </button>
        </div>
      </form>

      {/* Mobile filter toggle */}
      <button
        onClick={() => setMobileOpen(!mobileOpen)}
        className="md:hidden w-full mb-4 flex items-center justify-center gap-2 py-3 border border-outline-variant/30 rounded-lg text-sm text-primary"
      >
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M10 18h4v-2h-4v2zM3 6v2h18V6H3zm3 7h12v-2H6v2z" />
        </svg>
        Filters {hasFilters && "(Active)"}
      </button>

      {/* Filter bar */}
      <div className={`${mobileOpen ? "block" : "hidden"} md:block mb-8`}>
        <div className="flex flex-wrap gap-3 items-center">
          {/* Property Type */}
          <select
            value={currentType || ""}
            onChange={(e) => updateParams("type", e.target.value)}
            className="bg-white border border-outline-variant/30 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary"
          >
            <option value="">All Types</option>
            {PROPERTY_TYPES.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>

          {/* Subtype */}
          {subtypes.length > 0 && (
            <select
              value={currentSubtype}
              onChange={(e) => updateParams("subtype", e.target.value)}
              className="bg-white border border-outline-variant/30 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary"
            >
              <option value="">All Subtypes</option>
              {subtypes.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          )}

          {/* Transaction Type */}
          <select
            value={currentTransaction}
            onChange={(e) => updateParams("transaction", e.target.value)}
            className="bg-white border border-outline-variant/30 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary"
          >
            <option value="">All Transactions</option>
            {TRANSACTION_TYPES.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>

          {/* Sort */}
          <select
            value={currentSort}
            onChange={(e) => updateParams("sort", e.target.value)}
            className="bg-white border border-outline-variant/30 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary"
          >
            <option value="newest">Newest First</option>
            <option value="price_asc">Price: Low to High</option>
            <option value="price_desc">Price: High to Low</option>
            <option value="area_asc">Area: Small to Large</option>
            <option value="area_desc">Area: Large to Small</option>
          </select>

          {/* Clear */}
          {hasFilters && (
            <button
              onClick={clearFilters}
              className="text-sm text-error hover:underline font-label"
            >
              Clear All
            </button>
          )}
        </div>
      </div>
    </>
  );
}
