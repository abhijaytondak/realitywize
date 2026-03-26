"use client";

import { useState, useEffect } from "react";
import { TextField, Section } from "@/components/admin/CmsEditor";

interface CardItem { title: string; description: string }
interface StatItem { number: string; label: string }
interface AboutHeroData { label: string; headline: string; description: string }
interface AboutStoryData { label: string; headline: string; paragraphs: string[] }
interface AboutValuesData { label: string; headline: string; cards: CardItem[] }

export default function EditAboutPage() {
  const [hero, setHero] = useState<AboutHeroData | null>(null);
  const [story, setStory] = useState<AboutStoryData | null>(null);
  const [stats, setStats] = useState<StatItem[] | null>(null);
  const [values, setValues] = useState<AboutValuesData | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    Promise.all([
      fetch("/api/config?key=about_hero").then((r) => r.json()),
      fetch("/api/config?key=about_story").then((r) => r.json()),
      fetch("/api/config?key=about_stats").then((r) => r.json()),
      fetch("/api/config?key=about_values").then((r) => r.json()),
    ]).then(([h, s, st, v]) => {
      setHero(h); setStory(s); setStats(st); setValues(v); setLoading(false);
    });
  }, []);

  async function handleSave() {
    setSaving(true);
    await Promise.all([
      fetch("/api/config", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ key: "about_hero", value: hero }) }),
      fetch("/api/config", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ key: "about_story", value: story }) }),
      fetch("/api/config", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ key: "about_stats", value: stats }) }),
      fetch("/api/config", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ key: "about_values", value: values }) }),
    ]);
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  }

  if (loading) return <div className="py-20 text-center text-on-surface-variant">Loading...</div>;
  if (!hero || !story || !stats || !values) return <div className="py-20 text-center text-error">Failed to load</div>;

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-headline text-2xl md:text-3xl text-primary">Edit About Page</h1>
        <div className="flex items-center gap-3">
          {saved && <span className="text-sm text-green-700">Saved!</span>}
          <button onClick={handleSave} disabled={saving} className="bg-primary text-on-primary px-6 py-2.5 rounded-lg font-label uppercase tracking-wider text-xs hover:bg-primary-container transition-all disabled:opacity-50">
            {saving ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </div>

      {/* Hero */}
      <Section title="Hero Section">
        <TextField label="Label" value={hero.label} onChange={(v) => setHero({ ...hero, label: v })} />
        <TextField label="Headline" value={hero.headline} onChange={(v) => setHero({ ...hero, headline: v })} />
        <TextField label="Description" value={hero.description} onChange={(v) => setHero({ ...hero, description: v })} multiline />
      </Section>

      {/* Story */}
      <Section title="Our Story Section">
        <TextField label="Label" value={story.label} onChange={(v) => setStory({ ...story, label: v })} />
        <TextField label="Headline" value={story.headline} onChange={(v) => setStory({ ...story, headline: v })} />
        <div className="space-y-3 mt-4">
          <div className="flex items-center justify-between">
            <p className="text-sm font-label text-on-surface-variant font-semibold">Paragraphs</p>
            <button onClick={() => setStory({ ...story, paragraphs: [...story.paragraphs, ""] })} className="text-xs text-primary hover:underline">+ Add Paragraph</button>
          </div>
          {story.paragraphs.map((p, i) => (
            <div key={i} className="flex gap-2">
              <textarea
                value={p}
                onChange={(e) => {
                  const copy = [...story.paragraphs];
                  copy[i] = e.target.value;
                  setStory({ ...story, paragraphs: copy });
                }}
                className="flex-1 border border-outline-variant/30 rounded-lg px-4 py-3 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary resize-none"
                rows={3}
                placeholder={`Paragraph ${i + 1}`}
              />
              {story.paragraphs.length > 1 && (
                <button onClick={() => setStory({ ...story, paragraphs: story.paragraphs.filter((_, j) => j !== i) })} className="text-error text-xs self-start mt-3">Remove</button>
              )}
            </div>
          ))}
        </div>
      </Section>

      {/* Stats */}
      <Section title="Stats Section">
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <p className="text-sm font-label text-on-surface-variant font-semibold">Statistics</p>
            <button onClick={() => setStats([...stats, { number: "", label: "" }])} className="text-xs text-primary hover:underline">+ Add Stat</button>
          </div>
          {stats.map((stat, i) => (
            <div key={i} className="bg-surface-container-low rounded-lg p-4 flex gap-4 items-end">
              <div className="flex-1">
                <TextField label="Number" value={stat.number} onChange={(v) => {
                  const copy = [...stats]; copy[i] = { ...copy[i], number: v }; setStats(copy);
                }} placeholder="e.g. 500+" />
              </div>
              <div className="flex-1">
                <TextField label="Label" value={stat.label} onChange={(v) => {
                  const copy = [...stats]; copy[i] = { ...copy[i], label: v }; setStats(copy);
                }} placeholder="e.g. Properties Listed" />
              </div>
              {stats.length > 1 && (
                <button onClick={() => setStats(stats.filter((_, j) => j !== i))} className="text-error text-xs pb-3">Remove</button>
              )}
            </div>
          ))}
        </div>
      </Section>

      {/* Values */}
      <Section title="Our Values Section">
        <TextField label="Section Label" value={values.label} onChange={(v) => setValues({ ...values, label: v })} />
        <TextField label="Section Headline" value={values.headline} onChange={(v) => setValues({ ...values, headline: v })} />
        <div className="space-y-4 mt-4">
          <div className="flex items-center justify-between">
            <p className="text-sm font-label text-on-surface-variant font-semibold">Value Cards</p>
            <button onClick={() => setValues({ ...values, cards: [...values.cards, { title: "", description: "" }] })} className="text-xs text-primary hover:underline">+ Add Value</button>
          </div>
          {values.cards.map((card, i) => (
            <div key={i} className="bg-surface-container-low rounded-lg p-4 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-label text-on-surface-variant">Value {i + 1}</span>
                {values.cards.length > 1 && (
                  <button onClick={() => setValues({ ...values, cards: values.cards.filter((_, j) => j !== i) })} className="text-xs text-error hover:underline">Remove</button>
                )}
              </div>
              <TextField label="Title" value={card.title} onChange={(v) => {
                const copy = [...values.cards]; copy[i] = { ...copy[i], title: v }; setValues({ ...values, cards: copy });
              }} />
              <TextField label="Description" value={card.description} onChange={(v) => {
                const copy = [...values.cards]; copy[i] = { ...copy[i], description: v }; setValues({ ...values, cards: copy });
              }} multiline />
            </div>
          ))}
        </div>
      </Section>
    </div>
  );
}
