import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with Harvest Table for collaborations, questions, or recipe notes.",
};

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
      <section className="grid gap-8 rounded-[2rem] border border-border bg-card p-8 shadow-[0_20px_50px_rgba(79,55,38,0.07)] lg:grid-cols-[0.9fr_1.1fr] sm:p-12">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-accent">Contact</p>
          <h1 className="mt-4 font-serif text-5xl text-balance">Let’s talk recipes, stories, and collaborations.</h1>
          <p className="mt-6 text-lg leading-8 text-muted">
            This form is a simple UI placeholder for future integrations. Use it for newsletter ideas, content partnerships, or to share what you’ve been cooking.
          </p>
        </div>

        <form className="grid gap-5" aria-label="Contact form">
          <label className="grid gap-2">
            <span className="text-sm font-medium text-foreground">Name</span>
            <input
              type="text"
              name="name"
              placeholder="Your name"
              className="rounded-2xl border border-border bg-white px-4 py-3 outline-none transition focus:border-accent focus:ring-4 focus:ring-ring"
            />
          </label>
          <label className="grid gap-2">
            <span className="text-sm font-medium text-foreground">Email</span>
            <input
              type="email"
              name="email"
              placeholder="you@example.com"
              className="rounded-2xl border border-border bg-white px-4 py-3 outline-none transition focus:border-accent focus:ring-4 focus:ring-ring"
            />
          </label>
          <label className="grid gap-2">
            <span className="text-sm font-medium text-foreground">Message</span>
            <textarea
              name="message"
              rows={6}
              placeholder="Tell me what’s on your mind..."
              className="rounded-2xl border border-border bg-white px-4 py-3 outline-none transition focus:border-accent focus:ring-4 focus:ring-ring"
            />
          </label>
          <button
            type="submit"
            className="inline-flex w-fit items-center justify-center rounded-full bg-accent px-6 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-accent-strong"
          >
            Send message
          </button>
        </form>
      </section>
    </div>
  );
}
