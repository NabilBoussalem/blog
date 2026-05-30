"use client";

import { useState } from "react";

export function ShareRecipeButton({ title, url }: { title: string; url: string }) {
  const [label, setLabel] = useState("Share");

  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({ title, url });
        setLabel("Shared");
      } else {
        await navigator.clipboard.writeText(url);
        setLabel("Link copied");
      }
    } catch {
      setLabel("Unable to share");
      window.setTimeout(() => setLabel("Share"), 1800);
      return;
    }

    window.setTimeout(() => setLabel("Share"), 1800);
  };

  return (
    <button type="button" className="share-button" onClick={handleShare}>
      <span aria-hidden="true">↗</span>
      <span>{label}</span>
    </button>
  );
}
