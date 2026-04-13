"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { Section, TextField } from "@/components/admin/CmsEditor";

export default function EditBuilderProjectPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    title: "",
    description: "",
    short_description: "",
    investment_range: "",
    min_entry_amount: "",
    collaboration_type: "Joint Venture",
    location: "",
    area: "",
    project_type: "",
    highlights: [""],
    image_url: "",
    gallery_images: [""],
    contact_phone: "",
    contact_email: "",
    is_active: true,
    is_featured: false,
  });

  useEffect(() => {
    fetch(`/api/builders/${id}`)
      .then((r) => r.json())
      .then((data) => {
        setForm({
          title: data.title || "",
          description: data.description || "",
          short_description: data.short_description || "",
          investment_range: data.investment_range || "",
          min_entry_amount: data.min_entry_amount || "",
          collaboration_type: data.collaboration_type || "Joint Venture",
          location: data.location || "",
          area: data.area || "",
          project_type: data.project_type || "",
          highlights: data.highlights?.length ? data.highlights : [""],
          image_url: data.image_url || "",
          gallery_images: data.gallery_images?.length ? data.gallery_images : [""],
          contact_phone: data.contact_phone || "",
          contact_email: data.contact_email || "",
          is_active: data.is_active ?? true,
          is_featured: data.is_featured ?? false,
        });
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.title || !form.investment_range || !form.location) {
      alert("Title, investment range, and location are required.");
      return;
    }
    setSaving(true);
    const payload = {
      ...form,
      highlights: form.highlights.filter((h) => h.trim()),
      gallery_images: form.gallery_images.filter((g) => g.trim()),
      min_entry_amount: form.min_entry_amount || null,
      area: form.area || null,
      contact_phone: form.contact_phone || null,
      contact_email: form.contact_email || null,
    };

    const res = await fetch(`/api/builders/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (res.ok) {
      router.push("/admin/builders");
    } else {
      alert("Failed to update project");
    }
    setSaving(false);
  }

  if (loading) return <div className="py-20 text-center text-on-surface-variant">Loading...</div>;

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-headline text-2xl md:text-3xl text-primary">Edit Builder Project</h1>
        <div className="flex items-center gap-3">
          <button type="button" onClick={() => router.back()} className="text-sm text-on-surface-variant hover:text-primary">Cancel</button>
          <button type="submit" disabled={saving} className="bg-primary text-on-primary px-6 py-2.5 rounded-lg font-label uppercase tracking-wider text-xs hover:bg-primary-container transition-all disabled:opacity-50">
            {saving ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </div>

      <Section title="Basic Information">
        <TextField label="Project Title *" value={form.title} onChange={(v) => setForm({ ...form, title: v })} placeholder="e.g. Verdant Heights Township" />
        <TextField label="Short Description" value={form.short_description} onChange={(v) => setForm({ ...form, short_description: v })} placeholder="Brief one-line summary for listing cards" />
        <TextField label="Full Description" value={form.description} onChange={(v) => setForm({ ...form, description: v })} multiline placeholder="Detailed project description..." />
      </Section>

      <Section title="Investment Details">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TextField label="Investment Range *" value={form.investment_range} onChange={(v) => setForm({ ...form, investment_range: v })} placeholder="e.g. 50 Cr - 100 Cr" />
          <TextField label="Min Entry Amount" value={form.min_entry_amount} onChange={(v) => setForm({ ...form, min_entry_amount: v })} placeholder="e.g. 10 Cr" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-label text-on-surface-variant mb-2">Collaboration Type</label>
            <select
              value={form.collaboration_type}
              onChange={(e) => setForm({ ...form, collaboration_type: e.target.value })}
              className="w-full border border-outline-variant/30 rounded-lg px-4 py-3 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary"
            >
              <option>Joint Venture</option>
              <option>Revenue Sharing</option>
              <option>Land Partnership</option>
              <option>Project Funding</option>
              <option>Full Acquisition</option>
            </select>
          </div>
          <TextField label="Project Type" value={form.project_type} onChange={(v) => setForm({ ...form, project_type: v })} placeholder="e.g. Residential Township, Commercial Complex" />
        </div>
      </Section>

      <Section title="Location & Area">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TextField label="Location *" value={form.location} onChange={(v) => setForm({ ...form, location: v })} placeholder="e.g. Sector 150, Noida" />
          <TextField label="Area" value={form.area} onChange={(v) => setForm({ ...form, area: v })} placeholder="e.g. 25 Acres" />
        </div>
      </Section>

      <Section title="Highlights">
        <p className="text-xs text-on-surface-variant -mt-2 mb-4">Key selling points for the project.</p>
        <div className="space-y-3">
          {form.highlights.map((h, i) => (
            <div key={i} className="flex gap-2">
              <input
                type="text"
                value={h}
                onChange={(e) => {
                  const copy = [...form.highlights];
                  copy[i] = e.target.value;
                  setForm({ ...form, highlights: copy });
                }}
                placeholder={`Highlight ${i + 1}`}
                className="flex-1 border border-outline-variant/30 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary"
              />
              {form.highlights.length > 1 && (
                <button type="button" onClick={() => setForm({ ...form, highlights: form.highlights.filter((_, j) => j !== i) })} className="text-xs text-error hover:underline px-2">Remove</button>
              )}
            </div>
          ))}
          <button type="button" onClick={() => setForm({ ...form, highlights: [...form.highlights, ""] })} className="text-xs text-primary hover:underline">+ Add Highlight</button>
        </div>
      </Section>

      <Section title="Images">
        <TextField label="Main Image URL" value={form.image_url} onChange={(v) => setForm({ ...form, image_url: v })} placeholder="https://..." />
        <p className="text-xs text-on-surface-variant mt-4 mb-2">Gallery Images</p>
        <div className="space-y-3">
          {form.gallery_images.map((g, i) => (
            <div key={i} className="flex gap-2">
              <input
                type="text"
                value={g}
                onChange={(e) => {
                  const copy = [...form.gallery_images];
                  copy[i] = e.target.value;
                  setForm({ ...form, gallery_images: copy });
                }}
                placeholder="Image URL"
                className="flex-1 border border-outline-variant/30 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary"
              />
              {form.gallery_images.length > 1 && (
                <button type="button" onClick={() => setForm({ ...form, gallery_images: form.gallery_images.filter((_, j) => j !== i) })} className="text-xs text-error hover:underline px-2">Remove</button>
              )}
            </div>
          ))}
          <button type="button" onClick={() => setForm({ ...form, gallery_images: [...form.gallery_images, ""] })} className="text-xs text-primary hover:underline">+ Add Image</button>
        </div>
      </Section>

      <Section title="Contact Info">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TextField label="Contact Phone" value={form.contact_phone} onChange={(v) => setForm({ ...form, contact_phone: v })} placeholder="+91-..." />
          <TextField label="Contact Email" value={form.contact_email} onChange={(v) => setForm({ ...form, contact_email: v })} placeholder="builders@realitywize.com" />
        </div>
      </Section>

      <Section title="Visibility">
        <div className="flex items-center gap-6">
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" checked={form.is_active} onChange={(e) => setForm({ ...form, is_active: e.target.checked })} className="rounded border-outline-variant/30 text-primary focus:ring-primary/20" />
            <span className="text-sm text-on-surface-variant">Active (visible on site)</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" checked={form.is_featured} onChange={(e) => setForm({ ...form, is_featured: e.target.checked })} className="rounded border-outline-variant/30 text-primary focus:ring-primary/20" />
            <span className="text-sm text-on-surface-variant">Featured</span>
          </label>
        </div>
      </Section>
    </form>
  );
}
