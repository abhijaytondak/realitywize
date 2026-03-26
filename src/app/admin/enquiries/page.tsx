"use client";

import { useState, useEffect } from "react";
import { Enquiry } from "@/lib/types";

export default function AdminEnquiriesPage() {
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchEnquiries() {
      try {
        const res = await fetch("/api/enquiries");
        if (res.ok) {
          const data = await res.json();
          setEnquiries(data);
        }
      } catch {
        // Fallback to localStorage
        try {
          const stored = JSON.parse(localStorage.getItem("verdantInquiries") || "[]");
          setEnquiries(stored);
        } catch { /* empty */ }
      } finally {
        setLoading(false);
      }
    }
    fetchEnquiries();
  }, []);

  return (
    <div>
      <h1 className="font-headline text-2xl md:text-3xl text-primary mb-8">Enquiries</h1>

      {loading ? (
        <div className="text-center py-20 text-on-surface-variant">Loading...</div>
      ) : enquiries.length === 0 ? (
        <div className="bg-white rounded-xl border border-outline-variant/20 shadow-sm p-12 text-center">
          <svg className="w-16 h-16 text-outline mx-auto mb-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
          </svg>
          <h3 className="font-headline text-xl text-primary mb-2">No Enquiries Yet</h3>
          <p className="text-sm text-on-surface-variant">Enquiries from the contact form will appear here.</p>
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-outline-variant/20 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-outline-variant/20 bg-surface-container-low">
                  <th className="text-left px-6 py-4 font-label uppercase tracking-wider text-xs text-on-surface-variant">Name</th>
                  <th className="text-left px-6 py-4 font-label uppercase tracking-wider text-xs text-on-surface-variant">Contact</th>
                  <th className="text-left px-6 py-4 font-label uppercase tracking-wider text-xs text-on-surface-variant">Property</th>
                  <th className="text-left px-6 py-4 font-label uppercase tracking-wider text-xs text-on-surface-variant">Message</th>
                  <th className="text-left px-6 py-4 font-label uppercase tracking-wider text-xs text-on-surface-variant">Date</th>
                  <th className="text-left px-6 py-4 font-label uppercase tracking-wider text-xs text-on-surface-variant">Status</th>
                </tr>
              </thead>
              <tbody>
                {enquiries.map((enq) => (
                  <tr key={enq.id} className="border-b border-outline-variant/10 hover:bg-surface-container-low/50">
                    <td className="px-6 py-4 font-medium text-primary">{enq.name}</td>
                    <td className="px-6 py-4">
                      <div>
                        <p className="text-on-surface-variant">{enq.email}</p>
                        <p className="text-xs text-on-surface-variant">{enq.phone}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-on-surface-variant">
                      {enq.property_title || "General"}
                    </td>
                    <td className="px-6 py-4 text-on-surface-variant max-w-xs truncate">
                      {enq.message || "-"}
                    </td>
                    <td className="px-6 py-4 text-xs text-on-surface-variant">
                      {new Date(enq.created_at).toLocaleDateString("en-IN", { dateStyle: "medium" })}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`text-xs px-2 py-1 rounded ${
                        enq.status === "new" ? "bg-blue-50 text-blue-700" :
                        enq.status === "contacted" ? "bg-amber-50 text-amber-700" :
                        "bg-green-50 text-green-700"
                      }`}>
                        {enq.status}
                      </span>
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
