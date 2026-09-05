"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Clock3, Mail, MapPin, MessageCircle, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { createWhatsappUrl } from "@/lib/whatsapp";
import type { Unit } from "@/data/units";

function normalize(value: string) {
  return value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
}

export function UnitsGrid({ units }: { units: Unit[] }) {
  const [query, setQuery] = useState("");
  const filtered = useMemo(() => {
    const normalized = normalize(query.trim());
    return normalized ? units.filter((unit) => normalize(unit.name).includes(normalized)) : units;
  }, [query, units]);

  return (
    <div>
      <div className="relative max-w-2xl">
        <Search className="pointer-events-none absolute left-4 top-1/2 size-5 -translate-y-1/2 text-muted" aria-hidden="true" />
        <label htmlFor="unit-search" className="sr-only">Buscar unidade por cidade</label>
        <Input id="unit-search" type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Busque uma unidade por cidade" className="h-16 rounded-full bg-white pl-12 pr-6 shadow-[0_12px_35px_rgba(9,12,10,.06)]" />
      </div>
      <p className="mt-3 text-sm text-muted" aria-live="polite">{filtered.length} {filtered.length === 1 ? "unidade encontrada" : "unidades encontradas"}</p>

      <div className="mt-10 grid border-t border-black/15 md:grid-cols-2 xl:grid-cols-3">
        {filtered.map((unit, index) => (
          <article key={unit.slug} id={unit.slug} className="group flex scroll-mt-40 flex-col border-b border-black/15 bg-paper p-6 transition-colors duration-200 hover:bg-white md:border-r lg:p-8">
            <div className="mb-8 flex items-center justify-between font-mono text-[10px] font-bold tracking-[.15em] text-muted"><span>UNIDADE</span><span>{String(index + 1).padStart(2, "0")} / {String(filtered.length).padStart(2, "0")}</span></div>
            <div className="flex items-start gap-3">
              <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-full bg-forest text-white"><MapPin className="size-4" aria-hidden="true" /></span>
              <div>
                <h2 className="text-2xl font-extrabold tracking-[-0.045em] text-ink"><Link href={`/unidades/${unit.slug}`} className="hover:text-action-red">{unit.name}</Link></h2>
                <p className="mt-1 text-sm font-medium text-muted">Mato Grosso</p>
              </div>
            </div>
            <div className="mt-8 space-y-3 border-t border-border pt-5 text-sm text-muted">
              {unit.hours && <p className="flex gap-3"><Clock3 className="mt-0.5 size-4 shrink-0 text-tracking-green" aria-hidden="true" />{unit.hours}</p>}
              <p className="flex gap-3"><Mail className="mt-0.5 size-4 shrink-0 text-tracking-green" aria-hidden="true" /><a href={`mailto:${unit.email}`} className="break-all hover:text-ink hover:underline">{unit.email}</a></p>
            </div>
            <div className="mt-auto flex flex-wrap gap-2 pt-7">
              <Button asChild size="sm"><a href={createWhatsappUrl(unit.whatsapp, `Olá! Gostaria de falar com a unidade Gercadi de ${unit.name}.`)} target="_blank" rel="noopener noreferrer"><MessageCircle className="size-4" /> WhatsApp</a></Button>
              <Button asChild size="sm" variant="outline"><Link href={`/unidades/${unit.slug}`}>Ver unidade</Link></Button>
            </div>
          </article>
        ))}
      </div>
      {filtered.length === 0 && <div className="mt-8 rounded-lg border border-dashed border-border bg-surface p-8 text-center"><p className="font-semibold text-ink">Nenhuma unidade encontrada.</p><p className="mt-2 text-sm text-muted">Consulte a lista de cidades atendidas ou fale com nossa equipe.</p></div>}
    </div>
  );
}
