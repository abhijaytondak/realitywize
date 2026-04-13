"use client";

import { useState, useEffect } from "react";

interface FeedbackItem {
  id: string;
  name: string;
  email: string;
  phone: string;
  rating: number | null;
  message: string;
  status: string;
  created_at: string;
}

const STATUS_OPTIONS = ["new", "reviewed", "resolved"];

export default function AdminFeedbackPage() {
  const [items, setItems] = useState<FeedbackItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/feedback")
      .then((r) => r.json())
      .then((data) => { setItems(data); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  async function updateStatus(id: string, status: string) {
    const res = await fetch(`/api/feedback/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    if (res.ok) {
      setItems((prev) => prev.map((f) => (f.id === id ? { ...f, status } : f)));
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this feedback?")) return;
    const res = await fetch(`/api/feedback/${id}`, { method: "DELETE" });
    if (res.ok) setItems((prev) => prev.filter((f) => f.id !== id));
  }

  const statusColor = (s: string) =>
    s === "new" ? "bg-blue-50 text-blue-700" :
    s === "reviewed" ? "bg-amber-50 text-amber-700" :
    "bg-green-50 text-green-700";

  function renderStars(rating: number | null) {
    if (!rating) return <span className="text-xs text-on-surface-variant">No rating</span>;
    return (
      <div className="flex gap-0.5">
        {[1, 2, 3, 4, 5].map((s) => (
          <svg key={s} className={`w-4 h-4 ${s <= rating ? "text-amber-400" : "text-gray-200"}`} fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
          </svg>
        ))}
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-headline text-2xl md:text-3xl text-primary">Feedback</h1>
        <span className="text-sm text-on-surface-variant">{items.length} total</span>
      </div>

      {loading ? (
        <div className="py-20 text-center text-on-surface-variant">Loading...</div>
      ) : items.length === 0 ? (
        <div className="bg-white rounded-xl border border-outline-variant/20 shadow-sm p-12 text-center">
          <svg className="w-16 h-16 text-outline mx-auto mb-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H5.17L4 17.17V4h16v12z" />
          </svg>
          <h3 className="font-headline text-xl text-primary mb-2">No Feedback Yet</h3>
          <p className="text-sm text-on-surface-variant">User feedback submissions will appear here.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {items.map((fb) => (
            <div key={fb.id} className="bg-white rounded-xl border border-outline-variant/20 shadow-sm p-5">
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-headline text-primary">{fb.name}</h3>
                    <span className={`text-[10px] px-2 py-0.5 rounded uppercase tracking-wider font-label ${statusColor(fb.status)}`}>{fb.status}</span>
                  </div>
                  <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-on-surface-variant mb-2">
                    <a href={`mailto:${fb.email}`} className="hover:text-primary">{fb.email}</a>
                    {fb.phone && <a href={`tel:${fb.phone}`} className="hover:text-primary">{fb.phone}</a>}
                    <span>{new Date(fb.created_at).toLocaleDateString("en-IN", { dateStyle: "medium" })}</span>
                  </div>
                  <div className="mb-2">{renderStars(fb.rating)}</div>
                  {fb.message && <p className="text-sm text-on-surface-variant">{fb.message}</p>}
                </div>

                <div className="flex items-center gap-2 flex-shrink-0">
                  <select
                    value={fb.status}
                    onChange={(e) => updateStatus(fb.id, e.target.value)}
                    className="border border-outline-variant/30 rounded-lg px-3 py-1.5 text-xs focus:ring-2 focus:ring-primary/20"
                  >
                    {STATUS_OPTIONS.map((s) => (
                      <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>
                    ))}
                  </select>
                  <button onClick={() => handleDelete(fb.id)} className="text-xs text-error hover:underline px-2 py-1">Delete</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
