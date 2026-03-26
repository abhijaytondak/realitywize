import { NextRequest, NextResponse } from "next/server";
import { SAMPLE_PROPERTIES } from "@/lib/sample-data";

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  let properties = [...SAMPLE_PROPERTIES].filter((p) => p.is_active);

  const type = searchParams.get("type");
  const subtype = searchParams.get("subtype");
  const transaction = searchParams.get("transaction");
  const search = searchParams.get("search");

  if (type) properties = properties.filter((p) => p.type === type);
  if (subtype) properties = properties.filter((p) => p.subtype === subtype);
  if (transaction) properties = properties.filter((p) => p.transaction_type === transaction);
  if (search) {
    const q = search.toLowerCase();
    properties = properties.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.address.toLowerCase().includes(q) ||
        p.city.toLowerCase().includes(q)
    );
  }

  return NextResponse.json(properties);
}
