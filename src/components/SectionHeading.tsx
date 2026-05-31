type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
};

export function SectionHeading({ eyebrow, title, description, align = "left" }: SectionHeadingProps) {
  return (
    <div className={align === "center" ? "text-center" : "text-left"}>
      {eyebrow ? (
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-terracotta-700">
          {eyebrow}
        </p>
      ) : null}
      <h2 className="mt-3 font-serif text-4xl text-olive-950 sm:text-5xl">{title}</h2>
      {description ? (
        <p className={`mt-4 text-sm leading-7 text-stone-600 ${align === "center" ? "mx-auto max-w-2xl" : "max-w-2xl"}`}>
          {description}
        </p>
      ) : null}
    </div>
  );
}
