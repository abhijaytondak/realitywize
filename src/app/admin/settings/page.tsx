"use client";

import { useState, useEffect } from "react";
import { TextField, Section } from "@/components/admin/CmsEditor";

export default function AdminSettingsPage() {
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    Promise.all([
      fetch("/api/config?key=contact_phone").then((r) => r.json()),
      fetch("/api/config?key=contact_email").then((r) => r.json()),
      fetch("/api/config?key=whatsapp_number").then((r) => r.json()),
      fetch("/api/config?key=office_address").then((r) => r.json()),
    ]).then(([p, e, w, a]) => {
      setPhone(typeof p === "string" ? p : "");
      setEmail(typeof e === "string" ? e : "");
      setWhatsapp(typeof w === "string" ? w : "");
      setAddress(typeof a === "string" ? a : "");
      setLoading(false);
    });
  }, []);

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    await Promise.all([
      fetch("/api/config", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ key: "contact_phone", value: phone }) }),
      fetch("/api/config", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ key: "contact_email", value: email }) }),
      fetch("/api/config", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ key: "whatsapp_number", value: whatsapp }) }),
      fetch("/api/config", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ key: "office_address", value: address }) }),
    ]);
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  }

  if (loading) return <div className="py-20 text-center text-on-surface-variant">Loading...</div>;

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-headline text-2xl md:text-3xl text-primary">Settings</h1>
        <div className="flex items-center gap-3">
          {saved && <span className="text-sm text-green-700">Saved!</span>}
          <button onClick={handleSave} disabled={saving} className="bg-primary text-on-primary px-6 py-2.5 rounded-lg font-label uppercase tracking-wider text-xs hover:bg-primary-container transition-all disabled:opacity-50">
            {saving ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </div>

      <form onSubmit={handleSave} className="max-w-2xl">
        <Section title="Contact Information">
          <TextField label="Phone Number" value={phone} onChange={setPhone} />
          <TextField label="Email Address" value={email} onChange={setEmail} />
          <TextField label="WhatsApp Number (with country code)" value={whatsapp} onChange={setWhatsapp} placeholder="e.g. 919876543210" />
          <TextField label="Office Address" value={address} onChange={setAddress} multiline />
        </Section>
      </form>
    </div>
  );
}
