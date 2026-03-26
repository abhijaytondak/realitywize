import { NextRequest, NextResponse } from "next/server";
import { submitEnquiry, getEnquiries } from "@/lib/supabase/queries";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, phone, message, property_id, property_title } = body;

    if (!name || !email || !phone) {
      return NextResponse.json({ error: "Name, email, and phone are required" }, { status: 400 });
    }

    const result = await submitEnquiry({
      name,
      email,
      phone,
      message,
      property_id,
      property_title,
    });

    if (!result.success) {
      return NextResponse.json({ error: result.error }, { status: 500 });
    }

    return NextResponse.json({ success: true, id: result.id });
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}

export async function GET() {
  const enquiries = await getEnquiries();
  return NextResponse.json(enquiries);
}
