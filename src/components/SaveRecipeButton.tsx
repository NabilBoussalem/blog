"use client";

import { useEffect, useMemo, useState } from "react";

const storageKey = "saved-recipes";

function readSavedRecipes() {
  if (typeof window === "undefined") {
    return [] as string[];
  }

  try {
    const rawValue = window.localStorage.getItem(storageKey);
    if (!rawValue) {
      return [] as string[];
    }

    const parsed = JSON.parse(rawValue) as unknown;
    return Array.isArray(parsed) ? parsed.filter((value): value is string => typeof value === "string") : [];
  } catch {
    return [] as string[];
  }
}

function writeSavedRecipes(slugs: string[]) {
  window.localStorage.setItem(storageKey, JSON.stringify(slugs));
}

export function SaveRecipeButton({
  slug,
  title,
  variant = "solid",
}: {
  slug: string;
  title: string;
  variant?: "solid" | "ghost";
}) {
  const [saved, setSaved] = useState(false);
  const className = useMemo(() => `save-button ${variant === "ghost" ? "save-button-ghost" : ""}`.trim(), [variant]);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      const savedRecipes = readSavedRecipes();
      setSaved(savedRecipes.includes(slug));
    });

    return () => window.cancelAnimationFrame(frame);
  }, [slug]);

  const toggleSave = () => {
    const current = readSavedRecipes();
    const next = current.includes(slug) ? current.filter((item) => item !== slug) : [...current, slug];
    writeSavedRecipes(next);
    setSaved(next.includes(slug));
  };

  return (
    <button
      type="button"
      className={className}
      onClick={toggleSave}
      aria-pressed={saved}
      aria-label={`${saved ? "Remove" : "Save"} ${title}`}
    >
      <span aria-hidden="true">{saved ? "★" : "☆"}</span>
      <span>{saved ? "Saved" : "Save"}</span>
    </button>
  );
}
