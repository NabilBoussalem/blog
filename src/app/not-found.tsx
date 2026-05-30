import Link from "next/link";

export default function NotFound() {
  return (
    <section className="container page-heading section-spacing">
      <p className="eyebrow">Not found</p>
      <h1>This recipe is not on the table yet.</h1>
      <p>Try the full archive instead, or head back to the homepage.</p>
      <div className="action-row">
        <Link href="/recipes" className="primary-button">
          Browse recipes
        </Link>
        <Link href="/" className="secondary-button">
          Go home
        </Link>
      </div>
    </section>
  );
}
