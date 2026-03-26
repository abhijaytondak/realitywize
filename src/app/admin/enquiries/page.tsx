"use client";

import { useState, useEffect } from "react";

interface Enquiry {
  id: string; name: string; email: string; phone: string;
  message: string; property_title: string | null; status: string; created_at: string;
}

const STATUS_OPTIONS = ["new", "contacted", "closed"];

export default function AdminEnquiriesPage() {
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/enquiries")
      .then((r) => r.json())
      .then((data) => { setEnquiries(data); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  async function updateStatus(id: string, status: string) {
    const res = await fetch(`/api/enquiries/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    if (res.ok) {
      setEnquiries((prev) => prev.map((e) => (e.id === id ? { ...e, status } : e)));
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this enquiry?")) return;
    const res = await fetch(`/api/enquiries/${id}`, { method: "DELETE" });
    if (res.ok) setEnquiries((prev) => prev.filter((e) => e.id !== id));
  }

  const statusColor = (s: string) =>
    s === "new" ? "bg-blue-50 text-blue-700" :
    s === "contacted" ? "bg-amber-50 text-amber-700" :
    "bg-green-50 text-green-700";

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-headline text-2xl md:text-3xl text-primary">Enquiries</h1>
        <span className="text-sm text-on-surface-variant">{enquiries.length} total</span>
      </div>

      {loading ? (
        <div className="py-20 text-center text-on-surface-variant">Loading...</div>
      ) : enquiries.length === 0 ? (
        <div className="bg-white rounded-xl border border-outline-variant/20 shadow-sm p-12 text-center">
          <svg className="w-16 h-16 text-outline mx-auto mb-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
          </svg>
          <h3 className="font-headline text-xl text-primary mb-2">No Enquiries Yet</h3>
          <p className="text-sm text-on-surface-variant">Enquiries from the contact form will appear here.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {enquiries.map((enq) => (
            <div key={enq.id} className="bg-white rounded-xl border border-outline-variant/20 shadow-sm p-5">
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-headline text-primary">{enq.name}</h3>
                    <span className={`text-[10px] px-2 py-0.5 rounded uppercase tracking-wider font-label ${statusColor(enq.status)}`}>{enq.status}</span>
                  </div>
                  <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-on-surface-variant mb-2">
                    <a href={`mailto:${enq.email}`} className="hover:text-primary">{enq.email}</a>
                    <a href={`tel:${enq.phone}`} className="hover:text-primary">{enq.phone}</a>
                    <span>{new Date(enq.created_at).toLocaleDateString("en-IN", { dateStyle: "medium" })}</span>
                  </div>
                  {enq.property_title && (
                    <p className="text-xs text-secondary mb-1">Property: {enq.property_title}</p>
                  )}
                  {enq.message && <p className="text-sm text-on-surface-variant">{enq.message}</p>}
                </div>

                <div className="flex items-center gap-2 flex-shrink-0">
                  <select
                    value={enq.status}
                    onChange={(e) => updateStatus(enq.id, e.target.value)}
                    className="border border-outline-variant/30 rounded-lg px-3 py-1.5 text-xs focus:ring-2 focus:ring-primary/20"
                  >
                    {STATUS_OPTIONS.map((s) => (
                      <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>
                    ))}
                  </select>
                  <button onClick={() => handleDelete(enq.id)} className="text-xs text-error hover:underline px-2 py-1">Delete</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
