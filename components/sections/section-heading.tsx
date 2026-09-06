import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  inverse?: boolean;
  className?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  inverse = false,
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "max-w-3xl",
        align === "center" && "mx-auto text-center",
        className,
      )}
      data-reveal
    >
      {eyebrow && (
        <p className={cn("eyebrow", inverse && "eyebrow-inverse")}>{eyebrow}</p>
      )}
      <h2
        className={cn(
          "text-balance text-4xl font-extrabold tracking-[-0.05em] sm:text-[2.75rem] lg:text-5xl",
          inverse ? "text-white" : "text-ink",
        )}
      >
        {title}
      </h2>
      {description && (
        <p
          className={cn(
            "mt-5 max-w-2xl text-pretty text-base leading-7 sm:text-lg",
            inverse ? "text-white/75" : "text-muted",
            align === "center" && "mx-auto",
          )}
        >
          {description}
        </p>
      )}
    </div>
  );
}
