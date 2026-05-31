import type { Metadata } from "next";
import { Container } from "@/components/Container";

export const metadata: Metadata = {
  title: "Contact",
  description: "Use the contact form to get in touch about the French recipe blog.",
};

export default function ContactPage() {
  return (
    <section className="py-16 sm:py-20">
      <Container className="max-w-3xl space-y-8">
        <div className="space-y-4">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-amber-700">Contact</p>
          <h1 className="text-4xl font-semibold tracking-tight text-stone-900 sm:text-5xl">Say bonjour.</h1>
          <p className="text-lg leading-8 text-stone-600">
            This simple form is ready for styling and content gathering now, with backend handling left for a future iteration.
          </p>
        </div>
        <form className="space-y-5 rounded-[2rem] border border-amber-100 bg-white p-6 shadow-sm sm:p-8">
          <div className="grid gap-5 sm:grid-cols-2">
            <label className="space-y-2 text-sm font-medium text-stone-700">
              <span>Name</span>
              <input type="text" className="w-full rounded-2xl border border-amber-200 px-4 py-3 outline-none transition focus:border-amber-400 focus:ring-4 focus:ring-amber-100" placeholder="Your name" />
            </label>
            <label className="space-y-2 text-sm font-medium text-stone-700">
              <span>Email</span>
              <input type="email" className="w-full rounded-2xl border border-amber-200 px-4 py-3 outline-none transition focus:border-amber-400 focus:ring-4 focus:ring-amber-100" placeholder="you@example.com" />
            </label>
          </div>
          <label className="space-y-2 text-sm font-medium text-stone-700">
            <span>Subject</span>
            <input type="text" className="w-full rounded-2xl border border-amber-200 px-4 py-3 outline-none transition focus:border-amber-400 focus:ring-4 focus:ring-amber-100" placeholder="Recipe question" />
          </label>
          <label className="space-y-2 text-sm font-medium text-stone-700">
            <span>Message</span>
            <textarea className="min-h-40 w-full rounded-2xl border border-amber-200 px-4 py-3 outline-none transition focus:border-amber-400 focus:ring-4 focus:ring-amber-100" placeholder="Tell me what you're cooking or ask about a recipe." />
          </label>
          <button type="button" className="rounded-full bg-stone-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-stone-700">
            Send message
          </button>
        </form>
      </Container>
    </section>
  );
}
