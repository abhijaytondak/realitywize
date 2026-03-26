"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

interface Property {
  id: string; slug: string; title: string; subtype: string; type: string;
  price: string | null; city: string; is_active: boolean; is_featured: boolean;
}

export default function AdminPropertiesPage() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/properties?all=true")
      .then((r) => r.json())
      .then((d) => { setProperties(d); setLoading(false); });
  }, []);

  async function handleDelete(id: string, title: string) {
    if (!confirm(`Delete "${title}"? This cannot be undone.`)) return;
    const res = await fetch(`/api/properties/${id}`, { method: "DELETE" });
    if (res.ok) setProperties((p) => p.filter((x) => x.id !== id));
  }

  async function toggleField(id: string, field: string, current: boolean) {
    const res = await fetch(`/api/properties/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ [field]: !current }),
    });
    if (res.ok) {
      setProperties((prev) =>
        prev.map((p) => (p.id === id ? { ...p, [field]: !current } : p))
      );
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-headline text-2xl md:text-3xl text-primary">Properties</h1>
        <Link
          href="/admin/properties/new"
          className="bg-primary text-on-primary px-5 py-2.5 rounded-lg font-label uppercase tracking-wider text-xs hover:bg-primary-container transition-all flex items-center gap-2"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
          </svg>
          Add Property
        </Link>
      </div>

      {loading ? (
        <div className="py-20 text-center text-on-surface-variant">Loading...</div>
      ) : (
        <div className="bg-white rounded-xl border border-outline-variant/20 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-outline-variant/20 bg-surface-container-low">
                  <th className="text-left px-6 py-4 font-label uppercase tracking-wider text-xs text-on-surface-variant">Title</th>
                  <th className="text-left px-6 py-4 font-label uppercase tracking-wider text-xs text-on-surface-variant">Type</th>
                  <th className="text-left px-6 py-4 font-label uppercase tracking-wider text-xs text-on-surface-variant">Price</th>
                  <th className="text-left px-6 py-4 font-label uppercase tracking-wider text-xs text-on-surface-variant">Active</th>
                  <th className="text-left px-6 py-4 font-label uppercase tracking-wider text-xs text-on-surface-variant">Featured</th>
                  <th className="text-left px-6 py-4 font-label uppercase tracking-wider text-xs text-on-surface-variant">Actions</th>
                </tr>
              </thead>
              <tbody>
                {properties.map((p) => (
                  <tr key={p.id} className="border-b border-outline-variant/10 hover:bg-surface-container-low/50">
                    <td className="px-6 py-4">
                      <p className="font-headline text-primary text-sm">{p.title}</p>
                      <p className="text-xs text-on-surface-variant">{p.subtype} &bull; {p.city}</p>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-xs bg-primary-fixed/20 text-primary px-2 py-1 rounded">{p.type}</span>
                    </td>
                    <td className="px-6 py-4 font-headline text-primary text-sm">
                      {p.price ? `\u20B9${p.price}` : "N/A"}
                    </td>
                    <td className="px-6 py-4">
                      <button onClick={() => toggleField(p.id, "is_active", p.is_active)} className={`text-xs px-2 py-1 rounded cursor-pointer ${p.is_active ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"}`}>
                        {p.is_active ? "Active" : "Inactive"}
                      </button>
                    </td>
                    <td className="px-6 py-4">
                      <button onClick={() => toggleField(p.id, "is_featured", p.is_featured)} className={`text-xs px-2 py-1 rounded cursor-pointer ${p.is_featured ? "bg-amber-50 text-amber-700" : "bg-gray-50 text-gray-500"}`}>
                        {p.is_featured ? "Yes" : "No"}
                      </button>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <Link href={`/admin/properties/${p.id}`} className="text-xs text-primary hover:underline">Edit</Link>
                        <Link href={`/properties/${p.slug}`} className="text-xs text-secondary hover:underline" target="_blank">View</Link>
                        <button onClick={() => handleDelete(p.id, p.title)} className="text-xs text-error hover:underline">Delete</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
