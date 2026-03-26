"use client";

import { useState } from "react";
import { SITE_CONFIG } from "@/lib/sample-data";

export default function AdminSettingsPage() {
  const [config, setConfig] = useState(SITE_CONFIG);
  const [saved, setSaved] = useState(false);

  function handleSave(e: React.FormEvent) {
    e.preventDefault();
    // In MVP, this saves to localStorage. Replace with API call when Supabase is connected.
    localStorage.setItem("siteConfig", JSON.stringify(config));
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  }

  return (
    <div>
      <h1 className="font-headline text-2xl md:text-3xl text-primary mb-8">Settings</h1>

      <form onSubmit={handleSave} className="max-w-2xl space-y-8">
        <div className="bg-white rounded-xl border border-outline-variant/20 shadow-sm p-6 md:p-8 space-y-6">
          <h2 className="font-headline text-lg text-primary">Contact Information</h2>
          <p className="text-xs text-on-surface-variant -mt-4">These are shown on property detail pages and the footer.</p>

          <div>
            <label className="block text-sm font-label text-on-surface-variant mb-2">Phone Number</label>
            <input
              type="tel"
              value={config.contact_phone}
              onChange={(e) => setConfig({ ...config, contact_phone: e.target.value })}
              className="w-full border border-outline-variant/30 rounded-lg px-4 py-3 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary"
            />
          </div>

          <div>
            <label className="block text-sm font-label text-on-surface-variant mb-2">Email Address</label>
            <input
              type="email"
              value={config.contact_email}
              onChange={(e) => setConfig({ ...config, contact_email: e.target.value })}
              className="w-full border border-outline-variant/30 rounded-lg px-4 py-3 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary"
            />
          </div>

          <div>
            <label className="block text-sm font-label text-on-surface-variant mb-2">WhatsApp Number</label>
            <input
              type="text"
              value={config.whatsapp_number}
              onChange={(e) => setConfig({ ...config, whatsapp_number: e.target.value })}
              className="w-full border border-outline-variant/30 rounded-lg px-4 py-3 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary"
              placeholder="Country code + number (e.g., 919876543210)"
            />
          </div>

          <div>
            <label className="block text-sm font-label text-on-surface-variant mb-2">Office Address</label>
            <textarea
              value={config.office_address}
              onChange={(e) => setConfig({ ...config, office_address: e.target.value })}
              className="w-full border border-outline-variant/30 rounded-lg px-4 py-3 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary resize-none"
              rows={3}
            />
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button
            type="submit"
            className="bg-primary text-on-primary px-8 py-3 rounded-lg font-label uppercase tracking-wider text-xs hover:bg-primary-container transition-all"
          >
            Save Changes
          </button>
          {saved && (
            <span className="text-sm text-green-700 font-label">Settings saved successfully!</span>
          )}
        </div>

        <div className="bg-surface-container rounded-xl p-6 text-sm text-on-surface-variant">
          <p className="font-label font-semibold text-primary mb-2">Note</p>
          <p>Settings are currently saved to localStorage. Connect Supabase to persist settings to the database and share across devices.</p>
        </div>
      </form>
    </div>
  );
}
