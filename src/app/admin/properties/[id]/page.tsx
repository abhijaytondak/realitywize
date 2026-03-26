"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import PropertyForm from "@/components/admin/PropertyForm";

export default function EditPropertyPage() {
  const params = useParams();
  const id = params.id as string;
  const [data, setData] = useState<Record<string, unknown> | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/properties/${id}`)
      .then((r) => r.json())
      .then((d) => { setData(d); setLoading(false); })
      .catch(() => setLoading(false));
  }, [id]);

  if (loading) return <div className="py-20 text-center text-on-surface-variant">Loading...</div>;
  if (!data || data.error) return <div className="py-20 text-center text-error">Property not found</div>;

  const initial = {
    id: data.id as string,
    title: (data.title as string) || "",
    subtitle: (data.subtitle as string) || "",
    description: (data.description as string) || "",
    type: (data.type as string) || "Residential",
    subtype: (data.subtype as string) || "",
    transaction_type: (data.transaction_type as string) || "Sale",
    price: (data.price as string) || "",
    area: data.area ? String(data.area) : "",
    area_type: (data.area_type as string) || "SqFt",
    facing: (data.facing as string) || "",
    floor: (data.floor as string) || "",
    bedrooms: data.bedrooms ? String(data.bedrooms) : "",
    status: (data.status as string) || "",
    address: (data.address as string) || "",
    pincode: (data.pincode as string) || "",
    city: (data.city as string) || "Noida",
    state: (data.state as string) || "Uttar Pradesh",
    maps_link: (data.maps_link as string) || "",
    tags: Array.isArray(data.tags) ? (data.tags as string[]).join(", ") : "",
    is_active: data.is_active as boolean,
    is_featured: data.is_featured as boolean,
    is_sold: data.is_sold as boolean,
    property_images: (data.property_images as { id: string; url: string; alt_text: string; is_primary: boolean }[]) || [],
  };

  return (
    <div>
      <h1 className="font-headline text-2xl md:text-3xl text-primary mb-8">Edit Property</h1>
      <PropertyForm initial={initial} isEdit />
    </div>
  );
}
