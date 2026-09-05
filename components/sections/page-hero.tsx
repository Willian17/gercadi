import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

type PageHeroProps = {
  eyebrow: string;
  title: string;
  description: string;
  image?: string;
  imageAlt?: string;
  actions?: ReactNode;
  compact?: boolean;
};

export function PageHero({
  eyebrow,
  title,
  description,
  image,
  imageAlt = "",
  actions,
  compact = false,
}: PageHeroProps) {
  return (
    <section className="route-grid relative isolate overflow-hidden bg-carbon-deep text-white">
      {image && (
        <>
          <Image
            src={image}
            alt={imageAlt}
            fill
            priority
            sizes="100vw"
            className="object-cover object-center opacity-45 grayscale-[15%]"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-carbon-deep via-carbon-deep/90 to-carbon-deep/30" />
        </>
      )}
      <div
        className={cn(
          "site-container relative z-10",
          compact ? "py-20 sm:py-24" : "py-24 sm:py-32 lg:py-40",
        )}
      >
        <nav aria-label="Navegação estrutural" className="mb-12 border-b border-white/15 pb-5">
          <ol className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-white/65">
            <li><Link href="/" className="transition-colors hover:text-white">Início</Link></li>
            <li><ChevronRight className="size-3.5" aria-hidden="true" /></li>
            <li aria-current="page" className="text-white">{eyebrow}</li>
          </ol>
        </nav>
        <div className="max-w-3xl">
          <p className="eyebrow eyebrow-inverse">Capítulo • {eyebrow}</p>
          <h1 className="display-condensed text-balance text-[clamp(3.8rem,9vw,8.5rem)] uppercase">
            {title}
          </h1>
          <p className="mt-8 max-w-2xl border-l-2 border-action-red pl-5 text-pretty text-lg leading-8 text-white/72 sm:text-xl">
            {description}
          </p>
          {actions && <div className="mt-8 flex flex-wrap gap-3">{actions}</div>}
        </div>
      </div>
    </section>
  );
}
