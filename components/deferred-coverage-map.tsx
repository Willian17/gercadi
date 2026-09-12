"use client";

import type { ReactNode } from "react";
import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { Map } from "lucide-react";

type DeferredCoverageMapProps = {
  compact?: boolean;
  className?: string;
  intro?: ReactNode;
};

const CoverageMap = dynamic(
  () => import("@/components/coverage-map").then((module) => module.CoverageMap),
  {
    ssr: false,
    loading: () => <MapPlaceholder />,
  },
);

function MapPlaceholder({ compact = false, intro }: { compact?: boolean; intro?: ReactNode }) {
  if (compact && intro) {
    return (
      <div className="grid gap-6 lg:grid-cols-[minmax(17rem,0.72fr)_minmax(0,1.28fr)] lg:items-start lg:gap-8">
        <div>{intro}</div>
        <MapPlaceholder compact />
      </div>
    );
  }

  return (
    <div className={`grid min-h-[420px] place-items-center rounded-2xl border p-8 text-center sm:min-h-[520px] ${compact ? "border-white/15 bg-forest text-white" : "border-black/10 bg-white text-ink"}`}>
      <div>
        <Map className={`mx-auto size-8 ${compact ? "text-white/55" : "text-tracking-green"}`} aria-hidden="true" />
        <p className="mt-4 text-sm font-extrabold">Preparando mapa de cobertura</p>
        <p className={`mt-2 text-sm ${compact ? "text-white/65" : "text-muted"}`}>Filiais e cidades atendidas em Mato Grosso.</p>
      </div>
    </div>
  );
}

export function DeferredCoverageMap({ compact = false, className, intro }: DeferredCoverageMapProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setShouldLoad(true);
        observer.disconnect();
      },
      { rootMargin: "320px 0px" },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return <div ref={ref} className={className}>{shouldLoad ? <CoverageMap compact={compact} intro={intro} /> : <MapPlaceholder compact={compact} intro={intro} />}</div>;
}
