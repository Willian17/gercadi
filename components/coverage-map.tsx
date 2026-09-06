"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Building2, CalendarDays, Route, Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { coverageLocations, mapViewBox, mtMunicipalityPaths, type CoverageLocation } from "@/data/coverage-map";

type CoverageMapProps = {
  compact?: boolean;
  className?: string;
};

type Filter = "all" | "unit" | "served";

function normalize(value: string) {
  return value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
}

function getLocationLink(location: CoverageLocation) {
  return `/cotacao?destino=${encodeURIComponent(location.name)}`;
}

function Marker({ location, active, onSelect }: { location: CoverageLocation; active: boolean; onSelect: (location: CoverageLocation) => void }) {
  if (location.x === undefined || location.y === undefined) return null;
  const position = { left: `${location.x / 10}%`, top: `${location.y / 11}%` };
  const isUnit = location.kind === "unit";

  return (
    <button
      type="button"
      style={position}
      onClick={() => onSelect(location)}
      className={`group absolute z-10 -translate-x-1/2 -translate-y-1/2 cursor-pointer rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-forest ${isUnit ? "size-7" : "size-4"}`}
      aria-label={`${location.name}: ${isUnit ? "filial" : "cidade atendida"}${location.schedule ? `, ${location.schedule}` : ""}`}
      aria-pressed={active}
    >
      <span className={`absolute inset-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full transition-all duration-200 ${isUnit ? "size-3.5 bg-action-red ring-4 ring-paper shadow-[0_0_0_2px_rgba(201,29,36,.35)]" : "size-2 bg-white/80"} ${active ? "scale-150 bg-paper ring-4 ring-action-red" : "group-hover:scale-150"}`} />
    </button>
  );
}

function LocationPanel({ location, onClose, compact }: { location: CoverageLocation; onClose?: () => void; compact: boolean }) {
  const isUnit = location.kind === "unit";
  return (
    <aside className={`relative ${compact ? "border-t border-white/15 bg-carbon-deep p-5 text-white" : "rounded-2xl border border-black/10 bg-paper p-6 text-ink sm:p-8"}`} aria-live="polite">
      {onClose && <button type="button" onClick={onClose} className="absolute right-4 top-4 inline-flex size-10 items-center justify-center rounded-full hover:bg-black/8 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-action-red" aria-label="Fechar detalhes"><X className="size-4" /></button>}
      <div className="flex items-center gap-2 text-[10px] font-extrabold uppercase tracking-[.18em] text-action-red"><span className={`size-2 rounded-full ${isUnit ? "bg-action-red" : "bg-tracking-green"}`} />{isUnit ? "Filial Gercadi" : "Cidade atendida"}</div>
      <h3 className="mt-4 text-3xl font-extrabold tracking-[-.055em]">{location.name}</h3>
      <dl className={`mt-7 space-y-4 border-t pt-5 text-sm ${compact ? "border-white/15" : "border-black/10"}`}>
        {location.schedule && <div className="flex gap-3"><CalendarDays className={`mt-0.5 size-4 shrink-0 ${compact ? "text-white/55" : "text-tracking-green"}`} /><div><dt className="font-bold">Frequência / prazo</dt><dd className={compact ? "text-white/65" : "text-muted"}>{location.schedule}</dd></div></div>}
        {location.hubName && <div className="flex gap-3"><Building2 className={`mt-0.5 size-4 shrink-0 ${compact ? "text-white/55" : "text-tracking-green"}`} /><div><dt className="font-bold">Unidade de referência</dt><dd className={compact ? "text-white/65" : "text-muted"}>{location.hubName}</dd></div></div>}
        {location.region && <div className="flex gap-3"><Route className={`mt-0.5 size-4 shrink-0 ${compact ? "text-white/55" : "text-tracking-green"}`} /><div><dt className="font-bold">Região operacional</dt><dd className={compact ? "text-white/65" : "text-muted"}>{location.region}</dd></div></div>}
      </dl>
      <div className="mt-7 grid gap-3">
        <Link href={getLocationLink(location)} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-action-red px-5 text-sm font-extrabold text-white transition-colors hover:bg-[#a9151b]">Solicitar cotação <ArrowUpRight className="size-4" /></Link>
        {location.slug && <Link href={`/unidades/${location.slug}`} className={`inline-flex min-h-12 items-center justify-center gap-2 rounded-full border px-5 text-sm font-extrabold transition-colors ${compact ? "border-white/25 text-white hover:bg-white hover:text-carbon" : "border-black/15 text-ink hover:bg-white"}`}>Ver unidade <ArrowUpRight className="size-4" /></Link>}
      </div>
    </aside>
  );
}

export function CoverageMap({ compact = false, className }: CoverageMapProps) {
  const [filter, setFilter] = useState<Filter>("all");
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState(() => coverageLocations.find((location) => location.slug === "cuiaba")?.id);
  const selected = coverageLocations.find((location) => location.id === selectedId);
  const filtered = useMemo(() => {
    const normalizedQuery = normalize(query.trim());
    return coverageLocations.filter((location) => (filter === "all" || location.kind === filter) && (!normalizedQuery || normalize(location.name).includes(normalizedQuery)));
  }, [filter, query]);
  const visibleMarkers = useMemo(() => filtered.filter((location) => location.x !== undefined && location.y !== undefined), [filtered]);
  const suggestions = query.trim() ? filtered.slice(0, 7) : [];
  const unitsCount = coverageLocations.filter((location) => location.kind === "unit").length;
  const servedCount = coverageLocations.filter((location) => location.kind === "served").length;

  function selectLocation(location: CoverageLocation) {
    setSelectedId(location.id);
    setQuery("");
  }

  return (
    <section className={className} aria-label="Mapa de cobertura da Gercadi em Mato Grosso">
      <div className={`grid overflow-hidden rounded-2xl ${compact ? "bg-forest text-white" : "border border-black/10 bg-white lg:grid-cols-[minmax(0,1fr)_25rem]"}`}>
        <div className="relative min-w-0 p-5 sm:p-8">
          <div className="relative z-20 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <div><p className={`text-[10px] font-extrabold uppercase tracking-[.2em] ${compact ? "text-white/55" : "text-muted"}`}>Cobertura Gercadi</p><p className="mt-2 text-sm font-bold">{unitsCount} filiais · {servedCount} cidades atendidas</p></div>
            <div className="flex items-center gap-3 text-xs font-bold"><span className="flex items-center gap-2"><i className="size-3 rounded-full bg-action-red ring-2 ring-paper" /> Filial</span><span className="flex items-center gap-2"><i className={`size-2 rounded-full ${compact ? "bg-white" : "bg-tracking-green"}`} /> Cidade atendida</span></div>
          </div>

          <div className="relative z-20 mt-6 max-w-md">
            <Search className={`pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 ${compact ? "text-white/55" : "text-muted"}`} aria-hidden="true" />
            <label htmlFor={compact ? "home-map-search" : "coverage-map-search"} className="sr-only">Buscar cidade atendida</label>
            <Input id={compact ? "home-map-search" : "coverage-map-search"} type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Busque uma cidade" className={compact ? "h-12 rounded-full border-white/15 bg-white/10 pl-11 text-white placeholder:text-white/45 focus:border-white focus:ring-white/20" : "h-12 rounded-full bg-paper pl-11"} />
            {suggestions.length > 0 && <div className="absolute inset-x-0 top-[calc(100%+0.5rem)] overflow-hidden rounded-xl border border-black/10 bg-white p-1 text-ink shadow-2xl">{suggestions.map((location) => <button type="button" key={location.id} onClick={() => selectLocation(location)} className="flex w-full items-center justify-between rounded-lg px-3 py-3 text-left text-sm font-bold hover:bg-ivory"><span>{location.name}</span><span className="text-[10px] uppercase tracking-[.12em] text-muted">{location.kind === "unit" ? "Filial" : "Atendida"}</span></button>)}</div>}
          </div>

          {!compact && <div className="relative z-20 mt-5 flex flex-wrap gap-2" role="group" aria-label="Filtrar localidades">{([{ id: "all", label: "Todas" }, { id: "unit", label: "Filiais" }, { id: "served", label: "Cidades atendidas" }] as const).map((item) => <button type="button" key={item.id} onClick={() => setFilter(item.id)} aria-pressed={filter === item.id} className={`min-h-10 rounded-full border px-4 text-xs font-extrabold transition-colors ${filter === item.id ? "border-carbon bg-carbon text-white" : "border-black/10 bg-white text-ink hover:bg-ivory"}`}>{item.label}</button>)}</div>}

          <div className="relative mt-4 aspect-[10/11] min-h-[380px] overflow-hidden rounded-xl border border-white/15 bg-carbon-deep sm:min-h-[520px]">
            <svg className="absolute inset-0 h-full w-full" viewBox={mapViewBox} aria-hidden="true">
              <rect width="1000" height="1100" fill="#043720" />
              {mtMunicipalityPaths.map((path) => <path key={path.code} d={path.d} fill="#075532" stroke="rgba(250,250,247,.17)" strokeWidth="1.2" />)}
            </svg>
            <div className="absolute inset-0">{visibleMarkers.map((location) => <Marker key={location.id} location={location} active={selected?.id === location.id} onSelect={selectLocation} />)}</div>
            {selected?.x !== undefined && selected?.y !== undefined && <div style={{ left: `${selected.x / 10}%`, top: `${selected.y / 11}%` }} className="pointer-events-none absolute z-20 -translate-x-1/2 -translate-y-[calc(100%+1rem)] rounded-full bg-paper px-3 py-1.5 text-xs font-extrabold text-carbon shadow-xl">{selected.name}</div>}
            <div className="absolute inset-x-4 bottom-4 flex items-center justify-between rounded-lg border border-white/15 bg-carbon-deep/80 px-4 py-3 text-[10px] font-bold uppercase tracking-[.14em] text-white/60 backdrop-blur"><span>Mapa de Mato Grosso</span><span>{visibleMarkers.length} marcadores exibidos</span></div>
          </div>
        </div>

        {!compact && <div className="border-t border-black/10 bg-ivory lg:border-l lg:border-t-0">{selected ? <LocationPanel location={selected} compact={false} /> : <div className="p-8 text-muted">Selecione uma cidade no mapa ou na busca.</div>}</div>}
      </div>

      {compact && selected && <LocationPanel location={selected} compact onClose={() => setSelectedId(undefined)} />}

      {!compact && <div className="mt-8 border-t border-black/10"><div className="flex items-center justify-between py-5"><p className="text-sm font-extrabold text-ink">{filtered.length} localidades encontradas</p><p className="text-xs text-muted">Selecione para ver atendimento e cotação.</p></div><div className="grid border-l border-t border-black/10 sm:grid-cols-2 xl:grid-cols-3">{filtered.map((location) => <button key={location.id} type="button" onClick={() => selectLocation(location)} className={`min-h-24 border-b border-r border-black/10 p-4 text-left transition-colors hover:bg-ivory ${selected?.id === location.id ? "bg-ivory" : "bg-white"}`}><span className="flex items-center gap-2 text-[10px] font-extrabold uppercase tracking-[.14em] text-muted"><i className={`size-2 rounded-full ${location.kind === "unit" ? "bg-action-red" : "bg-tracking-green"}`} />{location.kind === "unit" ? "Filial" : "Atendida"}</span><strong className="mt-2 block text-base tracking-[-.025em] text-ink">{location.name}</strong>{location.schedule && <span className="mt-1 block truncate text-xs text-muted">{location.schedule}</span>}</button>)}</div></div>}
    </section>
  );
}
