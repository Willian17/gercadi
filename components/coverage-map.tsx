"use client";

import type { ReactNode } from "react";
import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Building2, CalendarDays, ChevronDown, Route, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { coverageLocations, mapViewBox, mtMunicipalityPaths, type CoverageLocation } from "@/data/coverage-map";

const mapLocations = coverageLocations.map((location) =>
  location.slug === "cuiaba" ? { ...location, schedule: "DIÁRIO" } : location,
);

type CoverageGroup = {
  id: string;
  label: string;
  kind: "unit" | "region";
  locations: CoverageLocation[];
};

const unitGroups: CoverageGroup[] = mapLocations
  .filter((location): location is CoverageLocation & { slug: string } => location.kind === "unit" && Boolean(location.slug))
  .map((unit) => ({
    id: `unit:${unit.slug}`,
    label: unit.name,
    kind: "unit",
    locations: mapLocations.filter((location) => location.kind === "served" && location.hubSlug === unit.slug),
  }));

const regionalGroups: CoverageGroup[] = Array.from(
  new Set(mapLocations.filter((location) => location.kind === "served" && !location.hubSlug && location.region).map((location) => location.region as string)),
).map((region) => ({
  id: `region:${region}`,
  label: region,
  kind: "region",
  locations: mapLocations.filter((location) => location.kind === "served" && !location.hubSlug && location.region === region),
}));

const coverageGroups = [...unitGroups, ...regionalGroups];

type CoverageMapProps = {
  compact?: boolean;
  className?: string;
  intro?: ReactNode;
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
  const tooltipId = `map-tooltip-${location.id}`;
  const tooltipAlignment = location.x > 800 ? "right-0" : location.x < 200 ? "left-0" : "left-1/2 -translate-x-1/2";

  return (
    <button
      type="button"
      style={position}
      onClick={() => onSelect(location)}
      className={`map-marker group absolute z-10 -translate-x-1/2 -translate-y-1/2 cursor-pointer rounded-full hover:z-30 focus-visible:z-30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-forest ${isUnit ? "size-11" : "size-8"} ${active ? "map-marker-active" : ""}`}
      aria-label={`${location.name}: ${isUnit ? "filial" : "cidade atendida"}${location.schedule ? `, ${location.schedule}` : ""}`}
      aria-describedby={tooltipId}
      aria-pressed={active}
    >
      <span data-marker-dot className={`absolute inset-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full transition-all duration-200 ${isUnit ? "size-3.5 bg-action-red ring-4 ring-paper shadow-[0_0_0_2px_rgba(201,29,36,.35)]" : "size-2 bg-white/80"} ${active ? "scale-125 bg-paper ring-2 ring-action-red md:scale-150 md:ring-4" : "group-hover:scale-150"}`} />
      <span id={tooltipId} role="tooltip" className={`pointer-events-none absolute bottom-full z-30 mb-1.5 w-max max-w-52 rounded-md bg-paper px-2.5 py-1.5 text-left text-[11px] font-extrabold leading-4 text-carbon opacity-0 shadow-xl transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100 ${tooltipAlignment}`}>
        {location.name}
        <span className="block text-[9px] uppercase tracking-[.12em] text-muted">{isUnit ? "Unidade Gercadi" : "Cidade atendida"}</span>
      </span>
    </button>
  );
}

function LocationPanel({ location, compact }: { location: CoverageLocation; compact: boolean }) {
  const isUnit = location.kind === "unit";
  return (
    <aside className={`relative ${compact ? "rounded-2xl border border-white/15 bg-carbon-deep p-5 text-white sm:p-6 lg:p-5" : "w-full rounded-2xl border border-black/10 bg-paper p-6 text-ink sm:p-8"}`} aria-live="polite">
      <div className="flex items-center gap-2 text-[10px] font-extrabold uppercase tracking-[.18em] text-action-red"><span className={`size-2 rounded-full ${isUnit ? "bg-action-red" : "bg-tracking-green"}`} />{isUnit ? "Filial Gercadi" : "Cidade atendida"}</div>
      <h3 className={`mt-4 text-3xl font-extrabold tracking-[-.055em] ${compact ? "lg:mt-3 lg:text-2xl" : ""}`}>{location.name}</h3>
      <ul className={`mt-7 space-y-4 border-t pt-5 text-sm ${compact ? "border-white/15 lg:mt-5 lg:space-y-3 lg:pt-4" : "border-black/10"}`}>
        {location.schedule && <li className="flex gap-3"><CalendarDays className={`mt-0.5 size-4 shrink-0 ${compact ? "text-white/55" : "text-tracking-green"}`} /><div><p className="font-bold">Frequência / prazo</p><p className={compact ? "text-white/65" : "text-muted"}>{location.schedule}</p></div></li>}
        {location.hubName && <li className="flex gap-3"><Building2 className={`mt-0.5 size-4 shrink-0 ${compact ? "text-white/55" : "text-tracking-green"}`} /><div><p className="font-bold">Unidade de referência</p><p className={compact ? "text-white/65" : "text-muted"}>{location.hubName}</p></div></li>}
        {location.region && <li className="flex gap-3"><Route className={`mt-0.5 size-4 shrink-0 ${compact ? "text-white/55" : "text-tracking-green"}`} /><div><p className="font-bold">Região operacional</p><p className={compact ? "text-white/65" : "text-muted"}>{location.region}</p></div></li>}
      </ul>
      <div className={`mt-7 grid gap-3 ${compact ? "lg:mt-5 lg:gap-2" : ""}`}>
        <Link href={getLocationLink(location)} className={`inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-action-red px-5 text-sm font-extrabold text-white transition-colors hover:bg-[#a9151b] ${compact ? "lg:min-h-10 lg:text-xs" : ""}`}>Solicitar cotação <ArrowUpRight className="size-4" /></Link>
        {location.slug && <Link href={`/unidades/${location.slug}`} className={`inline-flex min-h-12 items-center justify-center gap-2 rounded-full border px-5 text-sm font-extrabold transition-colors ${compact ? "border-white/25 text-white hover:bg-white hover:text-carbon lg:min-h-10 lg:text-xs" : "border-black/15 text-ink hover:bg-white"}`}>Ver unidade <ArrowUpRight className="size-4" /></Link>}
      </div>
    </aside>
  );
}

function CoverageHierarchy({
  selectedId,
  openGroups,
  onSelect,
  onToggle,
}: {
  selectedId?: string;
  openGroups: string[];
  onSelect: (location: CoverageLocation) => void;
  onToggle: (groupId: string, open: boolean) => void;
}) {
  return (
    <section className="mt-12 border-t border-black/10 pt-10" aria-labelledby="coverage-hierarchy-title">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="eyebrow">Visão geral da cobertura</p>
          <h2 id="coverage-hierarchy-title" className="text-3xl font-extrabold tracking-[-.045em] text-ink lg:text-[2rem]">Filiais e cidades atendidas</h2>
        </div>
        <p className="max-w-md text-sm leading-6 text-muted">Abra uma filial para consultar as cidades vinculadas e seus prazos operacionais.</p>
      </div>

      <div className="mt-8 grid items-start gap-3 xl:grid-cols-2">
        {coverageGroups.map((group) => {
          const GroupIcon = group.kind === "unit" ? Building2 : Route;
          const countLabel = `${group.locations.length} ${group.locations.length === 1 ? "cidade" : "cidades"}`;

          return (
            <details
              key={group.id}
              open={openGroups.includes(group.id)}
              onToggle={(event) => onToggle(group.id, event.currentTarget.open)}
              className="group overflow-hidden rounded-xl border border-black/10 bg-white"
            >
              <summary className="flex min-h-20 cursor-pointer list-none items-center gap-4 px-5 py-4 transition-colors hover:bg-ivory focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-action-red [&::-webkit-details-marker]:hidden">
                <span className={`flex size-10 shrink-0 items-center justify-center rounded-full ${group.kind === "unit" ? "bg-action-red text-white" : "bg-forest text-white"}`}>
                  <GroupIcon className="size-4" aria-hidden="true" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-[10px] font-extrabold uppercase tracking-[.16em] text-muted">{group.kind === "unit" ? "Filial Gercadi" : "Cobertura regional"}</span>
                  <span className="mt-1 block truncate font-extrabold text-ink">{group.label}</span>
                </span>
                <span className="shrink-0 text-xs font-bold text-muted">{countLabel}</span>
                <ChevronDown className="size-4 shrink-0 text-muted transition-transform duration-200 group-open:rotate-180" aria-hidden="true" />
              </summary>

              <div className="border-t border-black/10 bg-paper p-3">
                {group.locations.length > 0 ? (
                  <div className="grid gap-1 sm:grid-cols-2">
                    {group.locations.map((location) => (
                      <button
                        key={location.id}
                        type="button"
                        onClick={() => onSelect(location)}
                        aria-pressed={selectedId === location.id}
                        className={`min-h-14 cursor-pointer rounded-lg px-3 py-2 text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-action-red ${selectedId === location.id ? "bg-ivory" : "hover:bg-ivory"}`}
                      >
                        <span className="flex items-center gap-2 text-xs font-extrabold text-ink"><span className="size-2 rounded-full bg-tracking-green" />{location.name}</span>
                        {location.schedule && <span className="mt-1 block pl-4 text-[11px] leading-4 text-muted">{location.schedule}</span>}
                      </button>
                    ))}
                  </div>
                ) : (
                  <p className="px-3 py-4 text-sm text-muted">Nenhuma cidade vinculada a esta filial.</p>
                )}
              </div>
            </details>
          );
        })}
      </div>
    </section>
  );
}

export function CoverageMap({ compact = false, className, intro }: CoverageMapProps) {
  const [filter, setFilter] = useState<Filter>("unit");
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState(() => mapLocations.find((location) => location.slug === "cuiaba")?.id);
  const [openGroups, setOpenGroups] = useState<string[]>(["unit:cuiaba"]);
  const selected = mapLocations.find((location) => location.id === selectedId);
  const filtered = useMemo(() => {
    const normalizedQuery = normalize(query.trim());
    const isSearching = normalizedQuery.length > 0;
    return mapLocations.filter((location) => (isSearching || filter === "all" || location.kind === filter) && (!normalizedQuery || normalize(location.name).includes(normalizedQuery)));
  }, [filter, query]);
  const visibleMarkers = useMemo(() => {
    const markers = filtered.filter((location) => location.x !== undefined && location.y !== undefined);
    if (selected?.x === undefined || selected?.y === undefined || markers.some((location) => location.id === selected.id)) return markers;
    return [...markers, selected];
  }, [filtered, selected]);
  const suggestions = query.trim() ? filtered.slice(0, 7) : [];
  const unitsCount = mapLocations.filter((location) => location.kind === "unit").length;
  const servedCount = mapLocations.filter((location) => location.kind === "served").length;

  function selectLocation(location: CoverageLocation) {
    setSelectedId(location.id);
    setQuery("");

    const groupId = location.kind === "unit" && location.slug
      ? `unit:${location.slug}`
      : location.hubSlug
        ? `unit:${location.hubSlug}`
        : location.region
          ? `region:${location.region}`
          : undefined;

    if (groupId) {
      setOpenGroups((current) => current.includes(groupId) ? current : [...current, groupId]);
    }
  }

  function toggleGroup(groupId: string, open: boolean) {
    setOpenGroups((current) => {
      if (open) return current.includes(groupId) ? current : [...current, groupId];
      return current.filter((id) => id !== groupId);
    });
  }

  return (
    <section className={className} aria-label="Mapa de cobertura da Gercadi em Mato Grosso">
      <div className={compact ? "grid gap-6 lg:grid-cols-[minmax(17rem,0.72fr)_minmax(0,1.28fr)] lg:items-start lg:gap-8" : "w-full"}>
        {compact && intro && <div className="lg:col-start-1 lg:row-start-1">{intro}</div>}

        <div className={`grid overflow-hidden rounded-2xl ${compact ? "bg-forest text-white lg:col-start-2 lg:row-span-2 lg:row-start-1" : "border border-black/10 bg-white lg:grid-cols-[minmax(0,1.55fr)_minmax(20rem,1fr)] xl:grid-cols-[minmax(0,42rem)_minmax(22rem,1fr)]"}`}>
          <div className={`relative min-w-0 ${compact ? "p-4 sm:p-5 lg:p-6" : "p-5 sm:p-6"}`}>
            <div className={`relative z-20 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between ${compact ? "" : "w-full"}`}>
              <div><p className={`text-[10px] font-extrabold uppercase tracking-[.2em] ${compact ? "text-white/55" : "text-muted"}`}>Cobertura Gercadi</p><p className="mt-2 text-sm font-bold">{unitsCount} filiais · {servedCount} cidades atendidas</p></div>
              <div className="flex items-center gap-3 text-xs font-bold"><span className="flex items-center gap-2"><i className="size-3 rounded-full bg-action-red ring-2 ring-paper" /> Filial</span><span className="flex items-center gap-2"><i className={`size-2 rounded-full ${compact ? "bg-white" : "bg-tracking-green"}`} /> Cidade atendida</span></div>
            </div>

            <div className={`relative z-20 mt-6 max-w-md ${compact ? "" : "w-full"}`}>
              <Search className={`pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 ${compact ? "text-white/55" : "text-muted"}`} aria-hidden="true" />
              <label htmlFor={compact ? "home-map-search" : "coverage-map-search"} className="sr-only">Buscar cidade atendida</label>
              <Input id={compact ? "home-map-search" : "coverage-map-search"} type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Busque uma cidade" className={compact ? "h-12 rounded-full border-white/15 bg-white/10 pl-11 text-white placeholder:text-white/45 focus:border-white focus:ring-white/20" : "h-12 rounded-full bg-paper pl-11"} />
              {suggestions.length > 0 && <div className="absolute inset-x-0 top-[calc(100%+0.5rem)] overflow-hidden rounded-xl border border-black/10 bg-white p-1 text-ink shadow-2xl">{suggestions.map((location) => <button type="button" key={location.id} onClick={() => selectLocation(location)} className="flex w-full items-center justify-between rounded-lg px-3 py-3 text-left text-sm font-bold hover:bg-ivory"><span>{location.name}</span><span className="text-[10px] uppercase tracking-[.12em] text-muted">{location.kind === "unit" ? "Filial" : "Atendida"}</span></button>)}</div>}
            </div>

            {compact && <div className="relative z-10 mt-3 flex flex-wrap gap-2" role="group" aria-label="Filtrar localidades no mapa"><button type="button" onClick={() => setFilter("all")} aria-pressed={filter === "all"} className={`min-h-11 rounded-full border px-4 text-xs font-extrabold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-forest ${filter === "all" ? "border-paper bg-paper text-carbon" : "border-white/25 bg-white/10 text-white hover:bg-white/20"}`}>Todos</button><button type="button" onClick={() => setFilter("unit")} aria-pressed={filter === "unit"} className={`min-h-11 rounded-full border px-4 text-xs font-extrabold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-forest ${filter === "unit" ? "border-paper bg-paper text-carbon" : "border-white/25 bg-white/10 text-white hover:bg-white/20"}`}>Unidades</button><button type="button" onClick={() => setFilter("served")} aria-pressed={filter === "served"} className={`min-h-11 rounded-full border px-4 text-xs font-extrabold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-forest ${filter === "served" ? "border-paper bg-paper text-carbon" : "border-white/25 bg-white/10 text-white hover:bg-white/20"}`}>Cidades atendidas</button></div>}

            {!compact && <div className="relative z-20 mt-5 flex w-full flex-wrap gap-2" role="group" aria-label="Filtrar localidades">{([{ id: "all", label: "Todas" }, { id: "unit", label: "Filiais" }, { id: "served", label: "Cidades atendidas" }] as const).map((item) => <button type="button" key={item.id} onClick={() => setFilter(item.id)} aria-pressed={filter === item.id} className={`min-h-10 rounded-full border px-4 text-xs font-extrabold transition-colors ${filter === item.id ? "border-carbon bg-carbon text-white" : "border-black/10 bg-white text-ink hover:bg-ivory"}`}>{item.label}</button>)}</div>}

            <div className={`relative mt-4 aspect-[10/11] overflow-hidden rounded-xl border border-white/15 bg-carbon-deep ${compact ? "mx-auto w-full max-w-[31rem]" : "w-full"}`}>
              <svg className="coverage-territory absolute inset-0 h-full w-full" viewBox={mapViewBox} aria-hidden="true">
                <rect width="1000" height="1100" fill="#043720" />
                {mtMunicipalityPaths.map((path) => <path className="coverage-boundary" key={path.code} d={path.d} fill="#075532" stroke="rgba(250,250,247,.17)" strokeWidth="1.2" />)}
              </svg>
              <div className="absolute inset-0">{visibleMarkers.map((location) => <Marker key={location.id} location={location} active={selected?.id === location.id} onSelect={selectLocation} />)}</div>
            </div>
            <div className={`mt-3 flex items-center justify-between rounded-lg border border-white/15 bg-carbon-deep px-4 py-3 text-[10px] font-bold uppercase tracking-[.14em] text-white/60 ${compact ? "" : "w-full"}`}><span>Mapa de Mato Grosso</span><span>{visibleMarkers.length} marcadores exibidos</span></div>
          </div>

          {!compact && <div className="border-t border-black/10 bg-ivory p-5 sm:p-6 lg:flex lg:items-center lg:justify-center lg:border-l lg:border-t-0">{selected ? <LocationPanel location={selected} compact={false} /> : <div className="text-muted">Selecione uma cidade no mapa ou na busca.</div>}</div>}
        </div>

        {compact && selected && <div className="lg:col-start-1 lg:row-start-2"><LocationPanel location={selected} compact /></div>}
      </div>

      {!compact && <CoverageHierarchy selectedId={selectedId} openGroups={openGroups} onSelect={selectLocation} onToggle={toggleGroup} />}
    </section>
  );
}
