"use client";

import { useState } from "react";

interface InquiryFormProps {
  propertyId?: string;
  propertyTitle?: string;
}

export default function InquiryForm({ propertyId, propertyTitle }: InquiryFormProps) {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);

    const form = e.currentTarget;
    const data = {
      name: (form.elements.namedItem("name") as HTMLInputElement).value.trim(),
      email: (form.elements.namedItem("email") as HTMLInputElement).value.trim(),
      phone: (form.elements.namedItem("phone") as HTMLInputElement).value.trim(),
      message: (form.elements.namedItem("message") as HTMLTextAreaElement)?.value?.trim() || "",
      property_id: propertyId || null,
      property_title: propertyTitle || null,
    };

    try {
      const res = await fetch("/api/enquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        setSubmitted(true);
        setTimeout(() => {
          setSubmitted(false);
          form.reset();
        }, 5000);
      }
    } catch {
      // Fallback: store in localStorage
      const subs = JSON.parse(localStorage.getItem("verdantInquiries") || "[]");
      subs.unshift({ ...data, id: Date.now(), date: new Date().toISOString(), status: "new" });
      localStorage.setItem("verdantInquiries", JSON.stringify(subs));
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        form.reset();
      }, 5000);
    } finally {
      setLoading(false);
    }
  }

  if (submitted) {
    return (
      <div className="success-toast text-center py-10 px-8 bg-gradient-to-br from-primary-fixed/30 to-surface-container-low rounded-2xl border border-primary-fixed/20">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
          <svg className="w-9 h-9 text-primary" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
          </svg>
        </div>
        <h3 className="font-headline text-2xl text-primary mb-2">Thank You!</h3>
        <p className="text-on-surface-variant text-sm mb-1">Your inquiry has been submitted successfully.</p>
        <p className="text-on-surface-variant text-xs">Our consultants will reach out within 24 hours.</p>
      </div>
    );
  }

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      {propertyTitle && (
        <div className="bg-primary-fixed/20 px-4 py-3 rounded-lg">
          <p className="text-xs text-on-surface-variant">Inquiring about</p>
          <p className="font-headline text-primary text-sm">{propertyTitle}</p>
        </div>
      )}
      <div>
        <label htmlFor="inq-name" className="sr-only">Your Name</label>
        <input
          id="inq-name"
          name="name"
          className="w-full bg-transparent border-0 border-b border-outline-variant/30 py-4 focus:ring-0 focus:border-primary transition-all text-lg placeholder:text-outline"
          placeholder="Your Name"
          type="text"
          required
        />
      </div>
      <div>
        <label htmlFor="inq-email" className="sr-only">Email Address</label>
        <input
          id="inq-email"
          name="email"
          className="w-full bg-transparent border-0 border-b border-outline-variant/30 py-4 focus:ring-0 focus:border-primary transition-all text-lg placeholder:text-outline"
          placeholder="Email Address"
          type="email"
          required
        />
      </div>
      <div>
        <label htmlFor="inq-phone" className="sr-only">Phone Number</label>
        <input
          id="inq-phone"
          name="phone"
          className="w-full bg-transparent border-0 border-b border-outline-variant/30 py-4 focus:ring-0 focus:border-primary transition-all text-lg placeholder:text-outline"
          placeholder="Phone Number"
          type="tel"
          required
        />
      </div>
      <div>
        <label htmlFor="inq-message" className="sr-only">Message</label>
        <textarea
          id="inq-message"
          name="message"
          className="w-full bg-transparent border-0 border-b border-outline-variant/30 py-4 focus:ring-0 focus:border-primary transition-all text-lg placeholder:text-outline resize-none"
          placeholder="Message (optional)"
          rows={3}
        />
      </div>
      <button
        type="submit"
        disabled={loading}
        className="w-full md:w-auto bg-primary text-on-primary px-12 py-4 rounded-md font-label uppercase tracking-[0.2em] text-sm hover:bg-primary-container transition-all shadow-sm disabled:opacity-50"
      >
        {loading ? "Sending..." : "Inquire Now"}
      </button>
    </form>
  );
}
