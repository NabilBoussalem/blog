import { Metadata } from "next";
import Container from "@/components/Container";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with La Cuisine Française.",
};

export default function ContactPage() {
  return (
    <Container className="max-w-2xl">
      <h1 className="text-4xl font-serif font-bold text-amber-900 mb-4">Contact Us</h1>
      <p className="text-amber-700 mb-8">
        Have a question, suggestion, or just want to say bonjour? Fill out the form
        below and we&apos;ll get back to you.
      </p>

      {/* Contact form — UI only, no backend */}
      <form className="space-y-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-amber-800 mb-1">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            className="w-full px-4 py-3 rounded-xl border border-amber-200 bg-white text-amber-900 placeholder:text-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-300 transition"
            placeholder="Your name"
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-amber-800 mb-1">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            className="w-full px-4 py-3 rounded-xl border border-amber-200 bg-white text-amber-900 placeholder:text-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-300 transition"
            placeholder="you@example.com"
          />
        </div>

        <div>
          <label htmlFor="message" className="block text-sm font-medium text-amber-800 mb-1">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            rows={5}
            required
            className="w-full px-4 py-3 rounded-xl border border-amber-200 bg-white text-amber-900 placeholder:text-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-300 transition resize-y"
            placeholder="Your message..."
          />
        </div>

        <button
          type="submit"
          className="bg-amber-700 text-white px-8 py-3 rounded-full font-medium hover:bg-amber-800 transition-colors shadow-lg"
        >
          Send Message
        </button>
      </form>
    </Container>
  );
}
