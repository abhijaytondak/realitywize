import { NextRequest, NextResponse } from "next/server";

// In-memory storage for MVP (replace with Supabase when connected)
let enquiries: Array<{
  id: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  property_id: string | null;
  property_title: string | null;
  status: string;
  created_at: string;
}> = [];

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, phone, message, property_id, property_title } = body;

    if (!name || !email || !phone) {
      return NextResponse.json({ error: "Name, email, and phone are required" }, { status: 400 });
    }

    const enquiry = {
      id: Date.now().toString(),
      name,
      email,
      phone,
      message: message || "",
      property_id: property_id || null,
      property_title: property_title || null,
      status: "new",
      created_at: new Date().toISOString(),
    };

    enquiries.unshift(enquiry);

    return NextResponse.json({ success: true, id: enquiry.id });
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}

export async function GET() {
  return NextResponse.json(enquiries);
}
