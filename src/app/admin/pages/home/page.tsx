"use client";

import { useState, useEffect } from "react";
import { TextField, Section } from "@/components/admin/CmsEditor";

interface CardItem { title: string; description: string }

interface HomeHeroData {
  badge: string; headline: string; description: string;
  btn1_text: string; btn1_link: string; btn2_text: string; btn2_link: string; bg_image: string;
}
interface HomeWhyUsData { label: string; headline: string; cards: CardItem[] }
interface HomeInquiryData { label: string; headline: string; description: string }

export default function EditHomePage() {
  const [hero, setHero] = useState<HomeHeroData | null>(null);
  const [whyUs, setWhyUs] = useState<HomeWhyUsData | null>(null);
  const [inquiry, setInquiry] = useState<HomeInquiryData | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    Promise.all([
      fetch("/api/config?key=home_hero").then((r) => r.json()),
      fetch("/api/config?key=home_why_us").then((r) => r.json()),
      fetch("/api/config?key=home_inquiry").then((r) => r.json()),
    ]).then(([h, w, i]) => {
      setHero(h); setWhyUs(w); setInquiry(i); setLoading(false);
    });
  }, []);

  async function handleSave() {
    setSaving(true);
    await Promise.all([
      fetch("/api/config", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ key: "home_hero", value: hero }) }),
      fetch("/api/config", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ key: "home_why_us", value: whyUs }) }),
      fetch("/api/config", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ key: "home_inquiry", value: inquiry }) }),
    ]);
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  }

  if (loading) return <div className="py-20 text-center text-on-surface-variant">Loading...</div>;
  if (!hero || !whyUs || !inquiry) return <div className="py-20 text-center text-error">Failed to load</div>;

  function updateCard(cards: CardItem[], index: number, field: keyof CardItem, value: string) {
    const copy = [...cards];
    copy[index] = { ...copy[index], [field]: value };
    return copy;
  }

  function addCard(cards: CardItem[]) {
    return [...cards, { title: "", description: "" }];
  }

  function removeCard(cards: CardItem[], index: number) {
    return cards.filter((_, i) => i !== index);
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-headline text-2xl md:text-3xl text-primary">Edit Home Page</h1>
        <div className="flex items-center gap-3">
          {saved && <span className="text-sm text-green-700">Saved!</span>}
          <button onClick={handleSave} disabled={saving} className="bg-primary text-on-primary px-6 py-2.5 rounded-lg font-label uppercase tracking-wider text-xs hover:bg-primary-container transition-all disabled:opacity-50">
            {saving ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </div>

      {/* Hero Section */}
      <Section title="Hero Section">
        <TextField label="Badge Text" value={hero.badge} onChange={(v) => setHero({ ...hero, badge: v })} />
        <TextField label="Headline" value={hero.headline} onChange={(v) => setHero({ ...hero, headline: v })} />
        <TextField label="Description" value={hero.description} onChange={(v) => setHero({ ...hero, description: v })} multiline />
        <TextField label="Background Image URL (optional)" value={hero.bg_image} onChange={(v) => setHero({ ...hero, bg_image: v })} placeholder="Leave empty to use featured property image" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TextField label="Button 1 Text" value={hero.btn1_text} onChange={(v) => setHero({ ...hero, btn1_text: v })} />
          <TextField label="Button 1 Link" value={hero.btn1_link} onChange={(v) => setHero({ ...hero, btn1_link: v })} />
          <TextField label="Button 2 Text" value={hero.btn2_text} onChange={(v) => setHero({ ...hero, btn2_text: v })} />
          <TextField label="Button 2 Link" value={hero.btn2_link} onChange={(v) => setHero({ ...hero, btn2_link: v })} />
        </div>
      </Section>

      {/* Why Choose Us */}
      <Section title="Why Choose Us Section">
        <TextField label="Section Label" value={whyUs.label} onChange={(v) => setWhyUs({ ...whyUs, label: v })} />
        <TextField label="Section Headline" value={whyUs.headline} onChange={(v) => setWhyUs({ ...whyUs, headline: v })} />
        <div className="space-y-4 mt-4">
          <div className="flex items-center justify-between">
            <p className="text-sm font-label text-on-surface-variant font-semibold">Cards</p>
            <button onClick={() => setWhyUs({ ...whyUs, cards: addCard(whyUs.cards) })} className="text-xs text-primary hover:underline">+ Add Card</button>
          </div>
          {whyUs.cards.map((card, i) => (
            <div key={i} className="bg-surface-container-low rounded-lg p-4 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-label text-on-surface-variant">Card {i + 1}</span>
                {whyUs.cards.length > 1 && (
                  <button onClick={() => setWhyUs({ ...whyUs, cards: removeCard(whyUs.cards, i) })} className="text-xs text-error hover:underline">Remove</button>
                )}
              </div>
              <TextField label="Title" value={card.title} onChange={(v) => setWhyUs({ ...whyUs, cards: updateCard(whyUs.cards, i, "title", v) })} />
              <TextField label="Description" value={card.description} onChange={(v) => setWhyUs({ ...whyUs, cards: updateCard(whyUs.cards, i, "description", v) })} multiline />
            </div>
          ))}
        </div>
      </Section>

      {/* Inquiry Section */}
      <Section title="Inquiry Section">
        <TextField label="Section Label" value={inquiry.label} onChange={(v) => setInquiry({ ...inquiry, label: v })} />
        <TextField label="Section Headline" value={inquiry.headline} onChange={(v) => setInquiry({ ...inquiry, headline: v })} />
        <TextField label="Description" value={inquiry.description} onChange={(v) => setInquiry({ ...inquiry, description: v })} multiline />
      </Section>
    </div>
  );
}
