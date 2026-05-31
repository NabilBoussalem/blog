"use client";

import { useState } from "react";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
      setEmail("");
    }
  };

  return (
    <section className="bg-olive/5 rounded-3xl p-8 md:p-12 text-center">
      <h2 className="text-2xl md:text-3xl font-serif font-bold text-stone-800 mb-3">
        Stay Inspired
      </h2>
      <p className="text-stone-500 mb-6 max-w-md mx-auto">
        Get new recipes delivered to your inbox every week. No spam, just
        wholesome cooking inspiration.
      </p>

      {submitted ? (
        <div className="text-olive font-medium">
          Thank you for subscribing! 🌿
        </div>
      ) : (
        <form
          onSubmit={handleSubmit}
          className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
        >
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your@email.com"
            required
            className="flex-1 px-5 py-3 rounded-full border border-stone-200 bg-white text-stone-700 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-olive/30 focus:border-olive transition-all text-sm"
          />
          <button
            type="submit"
            className="px-6 py-3 bg-olive text-white font-medium rounded-full hover:bg-olive-dark transition-colors text-sm"
          >
            Subscribe
          </button>
        </form>
      )}
    </section>
  );
}
