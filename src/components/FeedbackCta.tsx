"use client";

import { useState } from "react";
import dynamic from "next/dynamic";

const FeedbackForm = dynamic(() => import("@/components/FeedbackForm"));

export default function FeedbackCta() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* CTA Banner */}
      <section className="py-16 bg-primary">
        <div className="max-w-screen-2xl mx-auto px-6 md:px-10 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="text-center md:text-left">
            <h2 className="font-headline text-3xl md:text-4xl text-on-primary mb-3">
              Your Opinion Matters
            </h2>
            <p className="text-on-primary/80 text-lg leading-relaxed max-w-xl">
              Share your thoughts, suggestions, or tell us about your journey — your feedback helps us serve you better.
            </p>
            <div className="flex items-center gap-4 text-sm text-on-primary/70 mt-4 justify-center md:justify-start">
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((s) => (
                  <svg key={s} className="w-5 h-5 text-amber-300" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                  </svg>
                ))}
              </div>
              <span>Trusted by hundreds of happy clients</span>
            </div>
          </div>
          <button
            onClick={() => setOpen(true)}
            className="bg-white text-primary px-8 py-4 rounded-lg font-label uppercase tracking-[0.15em] text-sm font-bold hover:bg-white/90 transition-all active:scale-95 duration-200 shadow-lg whitespace-nowrap"
          >
            Share Feedback
          </button>
        </div>
      </section>

      {/* Modal Overlay */}
      {open && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
          onClick={(e) => {
            if (e.target === e.currentTarget) setOpen(false);
          }}
        >
          <div className="relative bg-white rounded-2xl p-8 md:p-10 shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto animate-in fade-in zoom-in-95 duration-200">
            {/* Close button */}
            <button
              onClick={() => setOpen(false)}
              className="absolute top-4 right-4 text-secondary hover:text-primary transition-colors p-1"
              aria-label="Close"
            >
              <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <h3 className="font-headline text-2xl text-primary mb-2">Share Your Feedback</h3>
            <p className="text-on-surface-variant text-sm mb-6">We value your experience with RealtyWize.</p>

            <FeedbackForm />
          </div>
        </div>
      )}
    </>
  );
}
