import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  try {
    const body = await request.json();
    const { url, alt_text, is_primary } = body;

    if (!url) return NextResponse.json({ error: "URL required" }, { status: 400 });

    // If marking as primary, unset other primaries
    if (is_primary) {
      await supabase
        .from("property_images")
        .update({ is_primary: false })
        .eq("property_id", id);
    }

    const { data, error } = await supabase
      .from("property_images")
      .insert({
        property_id: id,
        url,
        alt_text: alt_text || "",
        is_primary: is_primary || false,
        sort_order: 0,
      })
      .select("*")
      .single();

    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json(data, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const imageId = request.nextUrl.searchParams.get("imageId");
  if (!imageId) return NextResponse.json({ error: "imageId required" }, { status: 400 });

  const { error } = await supabase.from("property_images").delete().eq("id", imageId);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ success: true });
}
