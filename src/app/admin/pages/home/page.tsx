"use client";

import { useState, useEffect } from "react";
import { TextField, Section } from "@/components/admin/CmsEditor";

interface CardItem { title: string; description: string }
interface TopPickItem { title: string; url: string }
interface AllotmentItem { title: string; size: string; description: string; type: string }
interface SlideItem { src: string; alt: string }
interface YeidaImageItem { src: string; alt: string; label: string }

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
  const [topPicks, setTopPicks] = useState<TopPickItem[] | null>(null);
  const [allotments, setAllotments] = useState<AllotmentItem[] | null>(null);
  const [heroSlides, setHeroSlides] = useState<SlideItem[] | null>(null);
  const [yeidaImages, setYeidaImages] = useState<YeidaImageItem[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    Promise.all([
      fetch("/api/config?key=home_hero").then((r) => r.json()),
      fetch("/api/config?key=home_why_us").then((r) => r.json()),
      fetch("/api/config?key=home_inquiry").then((r) => r.json()),
      fetch("/api/config?key=home_top_picks").then((r) => r.json()),
      fetch("/api/config?key=home_allotments").then((r) => r.json()),
      fetch("/api/config?key=home_hero_slides").then((r) => r.json()),
      fetch("/api/config?key=home_yeida_images").then((r) => r.json()).catch(() => []),
    ]).then(([h, w, i, tp, al, hs, yi]) => {
      setHero(h); setWhyUs(w); setInquiry(i);
      setTopPicks(Array.isArray(tp) ? tp : []);
      setAllotments(Array.isArray(al) ? al : []);
      setHeroSlides(Array.isArray(hs) ? hs : []);
      setYeidaImages(Array.isArray(yi) ? yi : []);
      setLoading(false);
    });
  }, []);

  async function handleSave() {
    setSaving(true);
    await Promise.all([
      fetch("/api/config", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ key: "home_hero", value: hero }) }),
      fetch("/api/config", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ key: "home_why_us", value: whyUs }) }),
      fetch("/api/config", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ key: "home_inquiry", value: inquiry }) }),
      fetch("/api/config", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ key: "home_top_picks", value: topPicks }) }),
      fetch("/api/config", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ key: "home_allotments", value: allotments }) }),
      fetch("/api/config", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ key: "home_hero_slides", value: heroSlides }) }),
      fetch("/api/config", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ key: "home_yeida_images", value: yeidaImages }) }),
    ]);
    setSaving(false); setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  }

  if (loading) return <div className="py-20 text-center text-on-surface-variant">Loading...</div>;
  if (!hero || !whyUs || !inquiry || !topPicks || !allotments || !heroSlides || !yeidaImages) return <div className="py-20 text-center text-error">Failed to load</div>;

  function updateCard(cards: CardItem[], index: number, field: keyof CardItem, value: string) {
    const copy = [...cards]; copy[index] = { ...copy[index], [field]: value }; return copy;
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TextField label="Button 1 Text" value={hero.btn1_text} onChange={(v) => setHero({ ...hero, btn1_text: v })} />
          <TextField label="Button 1 Link" value={hero.btn1_link} onChange={(v) => setHero({ ...hero, btn1_link: v })} />
          <TextField label="Button 2 Text" value={hero.btn2_text} onChange={(v) => setHero({ ...hero, btn2_text: v })} />
          <TextField label="Button 2 Link" value={hero.btn2_link} onChange={(v) => setHero({ ...hero, btn2_link: v })} />
        </div>
      </Section>

      {/* Top Picks / Reels */}
      {/* Hero Slider Images */}
      <Section title="Hero Slider Images">
        <p className="text-xs text-on-surface-variant -mt-2 mb-4">Images that rotate in the hero banner. Use high-quality landscape images.</p>
        <div className="space-y-4">
          {heroSlides.map((slide, i) => (
            <div key={i} className="bg-surface-container-low rounded-lg p-4 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-label text-on-surface-variant">Slide {i + 1}</span>
                <button onClick={() => setHeroSlides(heroSlides.filter((_, j) => j !== i))} className="text-xs text-error hover:underline">Remove</button>
              </div>
              <TextField label="Image URL" value={slide.src} onChange={(v) => {
                const copy = [...heroSlides]; copy[i] = { ...copy[i], src: v }; setHeroSlides(copy);
              }} placeholder="https://..." />
              <TextField label="Alt Text" value={slide.alt} onChange={(v) => {
                const copy = [...heroSlides]; copy[i] = { ...copy[i], alt: v }; setHeroSlides(copy);
              }} />
            </div>
          ))}
          <button onClick={() => setHeroSlides([...heroSlides, { src: "", alt: "" }])} className="text-xs text-primary hover:underline">+ Add Slide</button>
        </div>
      </Section>

      {/* YEIDA Section Images */}
      <Section title="YEIDA Section Images">
        <p className="text-xs text-on-surface-variant -mt-2 mb-4">Images displayed in the YEIDA banner section (Airport, Green Highway, Race Track).</p>
        <div className="space-y-4">
          {yeidaImages.map((img, i) => (
            <div key={i} className="bg-surface-container-low rounded-lg p-4 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-label text-on-surface-variant">Image {i + 1}</span>
                {yeidaImages.length > 1 && (
                  <button onClick={() => setYeidaImages(yeidaImages.filter((_, j) => j !== i))} className="text-xs text-error hover:underline">Remove</button>
                )}
              </div>
              <TextField label="Image URL" value={img.src} onChange={(v) => {
                const copy = [...yeidaImages]; copy[i] = { ...copy[i], src: v }; setYeidaImages(copy);
              }} placeholder="https://..." />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <TextField label="Alt Text" value={img.alt} onChange={(v) => {
                  const copy = [...yeidaImages]; copy[i] = { ...copy[i], alt: v }; setYeidaImages(copy);
                }} />
                <TextField label="Label" value={img.label} onChange={(v) => {
                  const copy = [...yeidaImages]; copy[i] = { ...copy[i], label: v }; setYeidaImages(copy);
                }} placeholder="e.g. Noida Int'l Airport" />
              </div>
            </div>
          ))}
          <button onClick={() => setYeidaImages([...yeidaImages, { src: "", alt: "", label: "" }])} className="text-xs text-primary hover:underline">+ Add Image</button>
        </div>
      </Section>

      <Section title="Top Picks (Reels / YouTube Shorts)">
        <p className="text-xs text-on-surface-variant -mt-2 mb-4">Add YouTube Shorts or Reels URLs. They will be displayed in portrait format.</p>
        <div className="space-y-4">
          {topPicks.map((item, i) => (
            <div key={i} className="bg-surface-container-low rounded-lg p-4 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-label text-on-surface-variant">Reel {i + 1}</span>
                <button onClick={() => setTopPicks(topPicks.filter((_, j) => j !== i))} className="text-xs text-error hover:underline">Remove</button>
              </div>
              <TextField label="Title" value={item.title} onChange={(v) => {
                const copy = [...topPicks]; copy[i] = { ...copy[i], title: v }; setTopPicks(copy);
              }} />
              <TextField label="YouTube URL" value={item.url} onChange={(v) => {
                const copy = [...topPicks]; copy[i] = { ...copy[i], url: v }; setTopPicks(copy);
              }} placeholder="e.g. https://www.youtube.com/shorts/VIDEO_ID" />
            </div>
          ))}
          <button onClick={() => setTopPicks([...topPicks, { title: "", url: "" }])} className="text-xs text-primary hover:underline">+ Add Reel</button>
        </div>
      </Section>

      {/* Allotments */}
      <Section title="Allotments (Township / Industrial Plots)">
        <div className="space-y-4">
          {allotments.map((item, i) => (
            <div key={i} className="bg-surface-container-low rounded-lg p-4 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-label text-on-surface-variant">Allotment {i + 1}</span>
                {allotments.length > 1 && (
                  <button onClick={() => setAllotments(allotments.filter((_, j) => j !== i))} className="text-xs text-error hover:underline">Remove</button>
                )}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <TextField label="Title" value={item.title} onChange={(v) => {
                  const copy = [...allotments]; copy[i] = { ...copy[i], title: v }; setAllotments(copy);
                }} />
                <TextField label="Size" value={item.size} onChange={(v) => {
                  const copy = [...allotments]; copy[i] = { ...copy[i], size: v }; setAllotments(copy);
                }} placeholder="e.g. 50 Acres" />
                <TextField label="Type" value={item.type} onChange={(v) => {
                  const copy = [...allotments]; copy[i] = { ...copy[i], type: v }; setAllotments(copy);
                }} placeholder="Township or Industrial" />
              </div>
              <TextField label="Description" value={item.description} onChange={(v) => {
                const copy = [...allotments]; copy[i] = { ...copy[i], description: v }; setAllotments(copy);
              }} multiline />
            </div>
          ))}
          <button onClick={() => setAllotments([...allotments, { title: "", size: "", description: "", type: "Township" }])} className="text-xs text-primary hover:underline">+ Add Allotment</button>
        </div>
      </Section>

      {/* Why Choose Us */}
      <Section title="Why Choose Us Section">
        <TextField label="Section Label" value={whyUs.label} onChange={(v) => setWhyUs({ ...whyUs, label: v })} />
        <TextField label="Section Headline" value={whyUs.headline} onChange={(v) => setWhyUs({ ...whyUs, headline: v })} />
        <div className="space-y-4 mt-4">
          <div className="flex items-center justify-between">
            <p className="text-sm font-label text-on-surface-variant font-semibold">Cards</p>
            <button onClick={() => setWhyUs({ ...whyUs, cards: [...whyUs.cards, { title: "", description: "" }] })} className="text-xs text-primary hover:underline">+ Add Card</button>
          </div>
          {whyUs.cards.map((card, i) => (
            <div key={i} className="bg-surface-container-low rounded-lg p-4 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-label text-on-surface-variant">Card {i + 1}</span>
                {whyUs.cards.length > 1 && (
                  <button onClick={() => setWhyUs({ ...whyUs, cards: whyUs.cards.filter((_, j) => j !== i) })} className="text-xs text-error hover:underline">Remove</button>
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
