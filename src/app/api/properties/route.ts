import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const includeInactive = searchParams.get("all") === "true";

  let query = supabase.from("properties").select("*, property_images(*)");

  if (!includeInactive) {
    query = query.eq("is_active", true).eq("is_sold", false);
  }

  const type = searchParams.get("type");
  const subtype = searchParams.get("subtype");
  const transaction = searchParams.get("transaction");
  const search = searchParams.get("search");

  if (type) query = query.eq("type", type);
  if (subtype) query = query.eq("subtype", subtype);
  if (transaction) query = query.eq("transaction_type", transaction);
  if (search) {
    query = query.or(`title.ilike.%${search}%,address.ilike.%${search}%,city.ilike.%${search}%`);
  }

  query = query.order("created_at", { ascending: false });

  const { data, error } = await query;
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Generate slug from title
    const slug = body.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "") + "-" + Date.now().toString(36);

    const { data, error } = await supabase
      .from("properties")
      .insert({ ...body, slug })
      .select("*")
      .single();

    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json(data, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}
