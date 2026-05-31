import { Container } from "@/components/Container";

export function Footer() {
  return (
    <footer className="mt-16 border-t border-amber-100 bg-white">
      <Container className="flex flex-col gap-3 py-8 text-sm text-stone-600 sm:flex-row sm:items-center sm:justify-between">
        <p>French recipes, seasonal inspiration, and timeless home cooking.</p>
        <p>© 2026 Saveurs Françaises</p>
      </Container>
    </footer>
  );
}
