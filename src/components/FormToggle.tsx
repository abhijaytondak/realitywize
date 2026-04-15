"use client";

import { useState } from "react";
import dynamic from "next/dynamic";

const FeedbackForm = dynamic(() => import("@/components/FeedbackForm"));
const InquiryForm = dynamic(() => import("@/components/InquiryForm"));

type Tab = "feedback" | "inquiry";

interface FormToggleProps {
  inquiry: { label: string; headline: string; description: string };
  contactPhone: string;
  contactEmail: string;
}

export default function FormToggle({ inquiry, contactPhone, contactEmail }: FormToggleProps) {
  const [activeTab, setActiveTab] = useState<Tab>("feedback");

  return (
    <section className="py-20 bg-surface-container-low">
      <div className="max-w-screen-2xl mx-auto px-6 md:px-10">
        {/* Toggle */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex bg-white rounded-full p-1 shadow-sm border border-outline-variant/20">
            <button
              onClick={() => setActiveTab("feedback")}
              className={`px-6 py-2.5 rounded-full font-label uppercase tracking-[0.12em] text-[11px] font-medium transition-all duration-300 ${
                activeTab === "feedback"
                  ? "bg-primary text-on-primary shadow-sm"
                  : "text-secondary hover:text-primary"
              }`}
            >
              Share Feedback
            </button>
            <button
              onClick={() => setActiveTab("inquiry")}
              className={`px-6 py-2.5 rounded-full font-label uppercase tracking-[0.12em] text-[11px] font-medium transition-all duration-300 ${
                activeTab === "inquiry"
                  ? "bg-primary text-on-primary shadow-sm"
                  : "text-secondary hover:text-primary"
              }`}
            >
              Make an Inquiry
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {activeTab === "feedback" ? (
            <>
              <div>
                <span className="font-label uppercase tracking-[0.15em] text-secondary text-sm block mb-4">Your Opinion Matters</span>
                <h2 className="font-headline text-4xl md:text-5xl text-primary mb-6">Share Your Feedback</h2>
                <p className="text-on-surface-variant text-lg leading-relaxed mb-6">
                  We value your experience with RealtyWize. Share your thoughts, suggestions, or tell us about your journey — your feedback helps us serve you better.
                </p>
                <div className="flex items-center gap-4 text-sm text-on-surface-variant">
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <svg key={s} className="w-5 h-5 text-amber-400" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                      </svg>
                    ))}
                  </div>
                  <span>Trusted by hundreds of happy clients</span>
                </div>
              </div>
              <div className="bg-white rounded-2xl p-8 md:p-10 shadow-sm border border-outline-variant/20">
                <FeedbackForm />
              </div>
            </>
          ) : (
            <>
              <div>
                <span className="font-label uppercase tracking-[0.15em] text-secondary text-sm block mb-4">{inquiry.label}</span>
                <h2 className="font-headline text-4xl md:text-5xl text-primary mb-6">{inquiry.headline}</h2>
                <p className="text-on-surface-variant text-lg leading-relaxed mb-8">{inquiry.description}</p>
                <div className="flex flex-col gap-4 text-sm">
                  <a href={`tel:${contactPhone}`} className="flex items-center gap-3 text-primary hover:text-primary-container transition-colors">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/></svg>
                    {contactPhone}
                  </a>
                  <a href={`mailto:${contactEmail}`} className="flex items-center gap-3 text-primary hover:text-primary-container transition-colors">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>
                    {contactEmail}
                  </a>
                </div>
              </div>
              <div className="bg-white rounded-2xl p-8 md:p-10 shadow-sm border border-outline-variant/20">
                <InquiryForm />
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
