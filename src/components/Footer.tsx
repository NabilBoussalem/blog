export default function Footer() {
  return (
    <footer className="border-t border-amber-100 bg-amber-50 mt-16">
      <div className="mx-auto max-w-6xl px-4 py-8 text-center text-amber-700 text-sm">
        <p className="font-serif text-lg mb-2">La Cuisine Française</p>
        <p>Celebrating the art of French cooking, one recipe at a time.</p>
        <p className="mt-4">&copy; {new Date().getFullYear()} La Cuisine Française. All rights reserved.</p>
      </div>
    </footer>
  );
}
