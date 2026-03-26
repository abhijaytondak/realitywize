"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { SUBTYPE_MAP } from "@/lib/types";
import type { PropertyType } from "@/lib/types";

const PROPERTY_TYPES: PropertyType[] = ["Residential", "Commercial", "Industrial", "Institutional"];
const TRANSACTION_TYPES = ["Sale", "Lease", "Pre-Leased"];
const AREA_TYPES = ["SqFt", "SqMt", "SqYd", "Acres"];
const STATUS_OPTIONS = ["New", "Under Construction", "Furnished", "Semi Furnished", "Warm-shell", "Bare-Shell", "Old"];

interface PropertyData {
  id?: string;
  title: string;
  subtitle: string;
  description: string;
  type: string;
  subtype: string;
  transaction_type: string;
  price: string;
  area: string;
  area_type: string;
  facing: string;
  floor: string;
  bedrooms: string;
  status: string;
  address: string;
  pincode: string;
  city: string;
  state: string;
  maps_link: string;
  tags: string;
  is_active: boolean;
  is_featured: boolean;
  is_sold: boolean;
  property_images?: { id: string; url: string; alt_text: string; is_primary: boolean }[];
}

const EMPTY: PropertyData = {
  title: "", subtitle: "", description: "", type: "Residential", subtype: "Apartment",
  transaction_type: "Sale", price: "", area: "", area_type: "SqFt", facing: "",
  floor: "", bedrooms: "", status: "New", address: "", pincode: "", city: "Noida",
  state: "Uttar Pradesh", maps_link: "", tags: "", is_active: true, is_featured: false, is_sold: false,
};

export default function PropertyForm({ initial, isEdit }: { initial?: PropertyData; isEdit?: boolean }) {
  const router = useRouter();
  const [form, setForm] = useState<PropertyData>(initial || EMPTY);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [imageAlt, setImageAlt] = useState("");
  const [uploading, setUploading] = useState(false);
  const [images, setImages] = useState(initial?.property_images || []);

  const subtypes = SUBTYPE_MAP[form.type as PropertyType] || [];

  function set(field: string, value: string | boolean) {
    setForm((f) => ({ ...f, [field]: value }));
    if (field === "type") setForm((f) => ({ ...f, type: value as string, subtype: SUBTYPE_MAP[value as PropertyType]?.[0] || "" }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError("");

    const payload = {
      title: form.title,
      subtitle: form.subtitle || null,
      description: form.description,
      type: form.type,
      subtype: form.subtype,
      transaction_type: form.transaction_type,
      price: form.price || null,
      area: form.area ? parseFloat(form.area) : null,
      area_type: form.area ? form.area_type : null,
      facing: form.facing || null,
      floor: form.floor || null,
      bedrooms: form.bedrooms ? parseInt(form.bedrooms) : null,
      status: form.status || null,
      address: form.address,
      pincode: form.pincode || null,
      city: form.city,
      state: form.state,
      maps_link: form.maps_link || null,
      tags: form.tags ? form.tags.split(",").map((t) => t.trim()).filter(Boolean) : [],
      is_active: form.is_active,
      is_featured: form.is_featured,
      is_sold: form.is_sold,
    };

    try {
      const url = isEdit ? `/api/properties/${form.id}` : "/api/properties";
      const method = isEdit ? "PUT" : "POST";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const data = await res.json();
        setError(data.error || "Failed to save");
        setSaving(false);
        return;
      }

      const data = await res.json();

      // If creating, redirect to edit page to add images
      if (!isEdit && data.id) {
        router.push(`/admin/properties/${data.id}`);
      } else {
        router.push("/admin/properties");
      }
      router.refresh();
    } catch {
      setError("Network error");
    }
    setSaving(false);
  }

  async function handleFileUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file || !form.id) return;
    setUploading(true);

    const fd = new FormData();
    fd.append("file", file);
    fd.append("property_id", form.id);

    try {
      const res = await fetch("/api/upload", { method: "POST", body: fd });
      const data = await res.json();
      if (data.url) {
        await addImage(data.url, file.name);
      }
    } catch { /* ignore */ }
    setUploading(false);
    e.target.value = "";
  }

  async function addImage(url: string, alt?: string) {
    if (!form.id || !url) return;
    const res = await fetch(`/api/properties/${form.id}/images`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url, alt_text: alt || imageAlt || "", is_primary: images.length === 0 }),
    });
    if (res.ok) {
      const img = await res.json();
      setImages((prev) => [...prev, img]);
      setImageUrl("");
      setImageAlt("");
    }
  }

  async function deleteImage(imageId: string) {
    if (!form.id) return;
    await fetch(`/api/properties/${form.id}/images?imageId=${imageId}`, { method: "DELETE" });
    setImages((prev) => prev.filter((i) => i.id !== imageId));
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-4xl">
      {error && (
        <div className="bg-error-container text-on-error-container text-sm px-4 py-3 rounded-lg">{error}</div>
      )}

      {/* Basic Info */}
      <div className="bg-white rounded-xl border border-outline-variant/20 shadow-sm p-6 space-y-4">
        <h2 className="font-headline text-lg text-primary">Basic Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="md:col-span-2">
            <label className="block text-sm font-label text-on-surface-variant mb-1">Title *</label>
            <input type="text" value={form.title} onChange={(e) => set("title", e.target.value)} required className="w-full border border-outline-variant/30 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary" />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-label text-on-surface-variant mb-1">Subtitle</label>
            <input type="text" value={form.subtitle} onChange={(e) => set("subtitle", e.target.value)} className="w-full border border-outline-variant/30 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary" />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-label text-on-surface-variant mb-1">Description</label>
            <textarea value={form.description} onChange={(e) => set("description", e.target.value)} rows={4} className="w-full border border-outline-variant/30 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary resize-none" />
          </div>
        </div>
      </div>

      {/* Classification */}
      <div className="bg-white rounded-xl border border-outline-variant/20 shadow-sm p-6 space-y-4">
        <h2 className="font-headline text-lg text-primary">Classification</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-label text-on-surface-variant mb-1">Type *</label>
            <select value={form.type} onChange={(e) => set("type", e.target.value)} className="w-full border border-outline-variant/30 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary">
              {PROPERTY_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm font-label text-on-surface-variant mb-1">Subtype *</label>
            <select value={form.subtype} onChange={(e) => set("subtype", e.target.value)} className="w-full border border-outline-variant/30 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary">
              {subtypes.map((s) => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm font-label text-on-surface-variant mb-1">Transaction *</label>
            <select value={form.transaction_type} onChange={(e) => set("transaction_type", e.target.value)} className="w-full border border-outline-variant/30 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary">
              {TRANSACTION_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
            </select>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-label text-on-surface-variant mb-1">Price</label>
            <input type="text" value={form.price} onChange={(e) => set("price", e.target.value)} placeholder="e.g. 1.5 Cr" className="w-full border border-outline-variant/30 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary" />
          </div>
          <div>
            <label className="block text-sm font-label text-on-surface-variant mb-1">Area</label>
            <input type="number" value={form.area} onChange={(e) => set("area", e.target.value)} className="w-full border border-outline-variant/30 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary" />
          </div>
          <div>
            <label className="block text-sm font-label text-on-surface-variant mb-1">Area Unit</label>
            <select value={form.area_type} onChange={(e) => set("area_type", e.target.value)} className="w-full border border-outline-variant/30 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary">
              {AREA_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm font-label text-on-surface-variant mb-1">Bedrooms</label>
            <input type="number" value={form.bedrooms} onChange={(e) => set("bedrooms", e.target.value)} className="w-full border border-outline-variant/30 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary" />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-label text-on-surface-variant mb-1">Status</label>
            <select value={form.status} onChange={(e) => set("status", e.target.value)} className="w-full border border-outline-variant/30 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary">
              <option value="">Select</option>
              {STATUS_OPTIONS.map((s) => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm font-label text-on-surface-variant mb-1">Facing</label>
            <input type="text" value={form.facing} onChange={(e) => set("facing", e.target.value)} placeholder="e.g. East" className="w-full border border-outline-variant/30 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary" />
          </div>
          <div>
            <label className="block text-sm font-label text-on-surface-variant mb-1">Floor</label>
            <input type="text" value={form.floor} onChange={(e) => set("floor", e.target.value)} placeholder="e.g. 3rd" className="w-full border border-outline-variant/30 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary" />
          </div>
        </div>
      </div>

      {/* Location */}
      <div className="bg-white rounded-xl border border-outline-variant/20 shadow-sm p-6 space-y-4">
        <h2 className="font-headline text-lg text-primary">Location</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="md:col-span-2">
            <label className="block text-sm font-label text-on-surface-variant mb-1">Address *</label>
            <input type="text" value={form.address} onChange={(e) => set("address", e.target.value)} required className="w-full border border-outline-variant/30 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary" />
          </div>
          <div>
            <label className="block text-sm font-label text-on-surface-variant mb-1">City</label>
            <input type="text" value={form.city} onChange={(e) => set("city", e.target.value)} className="w-full border border-outline-variant/30 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary" />
          </div>
          <div>
            <label className="block text-sm font-label text-on-surface-variant mb-1">State</label>
            <input type="text" value={form.state} onChange={(e) => set("state", e.target.value)} className="w-full border border-outline-variant/30 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary" />
          </div>
          <div>
            <label className="block text-sm font-label text-on-surface-variant mb-1">Pincode</label>
            <input type="text" value={form.pincode} onChange={(e) => set("pincode", e.target.value)} className="w-full border border-outline-variant/30 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary" />
          </div>
          <div>
            <label className="block text-sm font-label text-on-surface-variant mb-1">Google Maps Link</label>
            <input type="text" value={form.maps_link} onChange={(e) => set("maps_link", e.target.value)} className="w-full border border-outline-variant/30 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary" />
          </div>
        </div>
      </div>

      {/* Tags & Flags */}
      <div className="bg-white rounded-xl border border-outline-variant/20 shadow-sm p-6 space-y-4">
        <h2 className="font-headline text-lg text-primary">Tags & Flags</h2>
        <div>
          <label className="block text-sm font-label text-on-surface-variant mb-1">Tags (comma separated)</label>
          <input type="text" value={form.tags} onChange={(e) => set("tags", e.target.value)} placeholder="Premium, Eco-Certified, Riverside" className="w-full border border-outline-variant/30 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary" />
        </div>
        <div className="flex flex-wrap gap-6">
          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" checked={form.is_active} onChange={(e) => set("is_active", e.target.checked)} className="rounded border-outline-variant" />
            Active
          </label>
          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" checked={form.is_featured} onChange={(e) => set("is_featured", e.target.checked)} className="rounded border-outline-variant" />
            Featured
          </label>
          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" checked={form.is_sold} onChange={(e) => set("is_sold", e.target.checked)} className="rounded border-outline-variant" />
            Sold
          </label>
        </div>
      </div>

      {/* Images (only in edit mode) */}
      {isEdit && form.id && (
        <div className="bg-white rounded-xl border border-outline-variant/20 shadow-sm p-6 space-y-4">
          <h2 className="font-headline text-lg text-primary">Images</h2>

          {/* Existing images */}
          {images.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {images.map((img) => (
                <div key={img.id} className="relative group rounded-lg overflow-hidden border border-outline-variant/20">
                  <img src={img.url} alt={img.alt_text} className="w-full aspect-[4/3] object-cover" />
                  {img.is_primary && (
                    <span className="absolute top-2 left-2 bg-primary text-on-primary text-[9px] px-2 py-0.5 rounded">Primary</span>
                  )}
                  <button
                    type="button"
                    onClick={() => deleteImage(img.id)}
                    className="absolute top-2 right-2 bg-error text-on-error w-6 h-6 rounded-full text-xs opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
                  >
                    &times;
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* Upload */}
          <div className="space-y-3">
            <label className="block text-sm font-label text-on-surface-variant font-semibold">Upload Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileUpload}
              disabled={uploading}
              className="text-sm text-on-surface-variant file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-xs file:bg-primary file:text-on-primary hover:file:bg-primary-container"
            />
            {uploading && <p className="text-xs text-on-surface-variant">Uploading...</p>}
          </div>

          {/* Or add by URL */}
          <div className="flex gap-2 items-end">
            <div className="flex-1">
              <label className="block text-sm font-label text-on-surface-variant mb-1">Or add image URL</label>
              <input type="text" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} placeholder="https://..." className="w-full border border-outline-variant/30 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary" />
            </div>
            <button type="button" onClick={() => addImage(imageUrl)} disabled={!imageUrl} className="bg-primary text-on-primary px-4 py-2.5 rounded-lg text-xs disabled:opacity-50">Add</button>
          </div>
        </div>
      )}

      {/* Submit */}
      <div className="flex items-center gap-4">
        <button type="submit" disabled={saving} className="bg-primary text-on-primary px-8 py-3 rounded-lg font-label uppercase tracking-wider text-xs hover:bg-primary-container transition-all disabled:opacity-50">
          {saving ? "Saving..." : isEdit ? "Update Property" : "Create Property"}
        </button>
        <button type="button" onClick={() => router.push("/admin/properties")} className="text-sm text-on-surface-variant hover:text-primary">Cancel</button>
      </div>
    </form>
  );
}
