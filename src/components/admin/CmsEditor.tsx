"use client";

import { useState, useEffect, useCallback } from "react";

interface CmsEditorProps {
  configKey: string;
  title: string;
  children: (props: {
    data: Record<string, unknown>;
    update: (path: string, value: unknown) => void;
    saving: boolean;
  }) => React.ReactNode;
}

export default function CmsEditor({ configKey, title, children }: CmsEditorProps) {
  const [data, setData] = useState<Record<string, unknown> | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    fetch(`/api/config?key=${configKey}`)
      .then((r) => r.json())
      .then((d) => { setData(d); setLoading(false); })
      .catch(() => setLoading(false));
  }, [configKey]);

  const update = useCallback((path: string, value: unknown) => {
    setData((prev) => {
      if (!prev) return prev;
      const copy = JSON.parse(JSON.stringify(prev));
      const keys = path.split(".");
      let obj = copy;
      for (let i = 0; i < keys.length - 1; i++) {
        obj = obj[keys[i]];
      }
      obj[keys[keys.length - 1]] = value;
      return copy;
    });
  }, []);

  async function handleSave() {
    if (!data) return;
    setSaving(true);
    try {
      await fetch("/api/config", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ key: configKey, value: data }),
      });
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch { /* ignore */ }
    setSaving(false);
  }

  if (loading) return <div className="py-20 text-center text-on-surface-variant">Loading...</div>;
  if (!data) return <div className="py-20 text-center text-on-surface-variant">Failed to load content</div>;

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-headline text-2xl md:text-3xl text-primary">{title}</h1>
        <div className="flex items-center gap-3">
          {saved && <span className="text-sm text-green-700">Saved!</span>}
          <button
            onClick={handleSave}
            disabled={saving}
            className="bg-primary text-on-primary px-6 py-2.5 rounded-lg font-label uppercase tracking-wider text-xs hover:bg-primary-container transition-all disabled:opacity-50"
          >
            {saving ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </div>
      {children({ data, update, saving })}
    </div>
  );
}

// Reusable field components
export function TextField({
  label, value, onChange, multiline, placeholder,
}: {
  label: string; value: string; onChange: (v: string) => void; multiline?: boolean; placeholder?: string;
}) {
  return (
    <div>
      <label className="block text-sm font-label text-on-surface-variant mb-2">{label}</label>
      {multiline ? (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full border border-outline-variant/30 rounded-lg px-4 py-3 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary resize-none"
          rows={4}
        />
      ) : (
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full border border-outline-variant/30 rounded-lg px-4 py-3 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary"
        />
      )}
    </div>
  );
}

export function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-white rounded-xl border border-outline-variant/20 shadow-sm p-6 md:p-8 space-y-5 mb-6">
      <h2 className="font-headline text-lg text-primary border-b border-outline-variant/20 pb-3">{title}</h2>
      {children}
    </div>
  );
}
