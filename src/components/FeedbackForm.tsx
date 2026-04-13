"use client";

import { useState } from "react";

export default function FeedbackForm() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (rating === 0) {
      setError("Please select a rating.");
      setLoading(false);
      return;
    }

    const form = e.currentTarget;
    const data = {
      name: (form.elements.namedItem("name") as HTMLInputElement).value.trim(),
      email: (form.elements.namedItem("email") as HTMLInputElement).value.trim(),
      phone: (form.elements.namedItem("phone") as HTMLInputElement).value.trim(),
      rating,
      message: (form.elements.namedItem("message") as HTMLTextAreaElement).value.trim(),
    };

    try {
      const res = await fetch("/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        setSubmitted(true);
        setTimeout(() => {
          setSubmitted(false);
          setRating(0);
          form.reset();
        }, 5000);
      } else {
        setError("Something went wrong. Please try again.");
      }
    } catch {
      setError("Network error. Please check your connection and try again.");
    } finally {
      setLoading(false);
    }
  }

  if (submitted) {
    return (
      <div className="success-toast text-center py-10 px-8 bg-gradient-to-br from-primary-fixed/30 to-surface-container-low rounded-2xl border border-primary-fixed/20">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
          <svg className="w-9 h-9 text-primary" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
          </svg>
        </div>
        <h3 className="font-headline text-2xl text-primary mb-2">Thank You!</h3>
        <p className="text-on-surface-variant text-sm mb-1">Your feedback has been submitted successfully.</p>
        <p className="text-on-surface-variant text-xs">We appreciate your input and will use it to improve.</p>
      </div>
    );
  }

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      <div>
        <label htmlFor="fb-name" className="sr-only">Your Name</label>
        <input
          id="fb-name"
          name="name"
          className="w-full bg-transparent border-0 border-b border-outline-variant/30 py-4 focus:ring-0 focus:border-primary transition-all text-lg placeholder:text-outline"
          placeholder="Your Name"
          type="text"
          required
        />
      </div>
      <div>
        <label htmlFor="fb-email" className="sr-only">Email Address</label>
        <input
          id="fb-email"
          name="email"
          className="w-full bg-transparent border-0 border-b border-outline-variant/30 py-4 focus:ring-0 focus:border-primary transition-all text-lg placeholder:text-outline"
          placeholder="Email Address"
          type="email"
          required
        />
      </div>
      <div>
        <label htmlFor="fb-phone" className="sr-only">Phone Number</label>
        <input
          id="fb-phone"
          name="phone"
          className="w-full bg-transparent border-0 border-b border-outline-variant/30 py-4 focus:ring-0 focus:border-primary transition-all text-lg placeholder:text-outline"
          placeholder="Phone Number (optional)"
          type="tel"
        />
      </div>

      {/* Star Rating */}
      <div>
        <p className="font-label text-xs uppercase tracking-widest text-on-surface-variant mb-3">
          Your Rating
        </p>
        <div className="flex gap-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => setRating(star)}
              onMouseEnter={() => setHoverRating(star)}
              onMouseLeave={() => setHoverRating(0)}
              aria-label={`Rate ${star} star${star > 1 ? "s" : ""}`}
              className="p-1 transition-transform hover:scale-110"
            >
              <svg
                className="w-8 h-8 transition-colors"
                fill={(hoverRating || rating) >= star ? "#F59E0B" : "#D1D5DB"}
                viewBox="0 0 24 24"
              >
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
            </button>
          ))}
        </div>
      </div>

      <div>
        <label htmlFor="fb-message" className="sr-only">Your Feedback</label>
        <textarea
          id="fb-message"
          name="message"
          className="w-full bg-transparent border-0 border-b border-outline-variant/30 py-4 focus:ring-0 focus:border-primary transition-all text-lg placeholder:text-outline resize-none"
          placeholder="Your Feedback"
          rows={4}
          required
        />
      </div>

      {error && (
        <p className="text-error text-sm">{error}</p>
      )}

      <button
        type="submit"
        disabled={loading}
        className="w-full md:w-auto bg-primary text-on-primary px-12 py-4 rounded-md font-label uppercase tracking-[0.2em] text-sm hover:bg-primary-container transition-all shadow-sm disabled:opacity-50"
      >
        {loading ? "Sending..." : "Submit Feedback"}
      </button>
    </form>
  );
}
