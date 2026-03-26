import { NextRequest, NextResponse } from "next/server";
import { getProperties } from "@/lib/supabase/queries";
import { PropertyType, TransactionType, PropertyFilters } from "@/lib/types";

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;

  const filters: PropertyFilters = {
    search: searchParams.get("search") || undefined,
    type: (searchParams.get("type") as PropertyType) || undefined,
    subtype: searchParams.get("subtype") as PropertyFilters["subtype"],
    transaction: (searchParams.get("transaction") as TransactionType) || undefined,
    sort: (searchParams.get("sort") as PropertyFilters["sort"]) || undefined,
  };

  const properties = await getProperties(filters);
  return NextResponse.json(properties);
}
