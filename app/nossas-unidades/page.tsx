import type { Metadata } from "next";
import { ExternalLink } from "lucide-react";
import { PageHero } from "@/components/sections/page-hero";
import { SectionHeading } from "@/components/sections/section-heading";
import { DeferredCoverageMap } from "@/components/deferred-coverage-map";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/data/site";

export const metadata: Metadata = {
  title: "Unidades em Mato Grosso",
  description: "Encontre telefones, WhatsApp, e-mails e horários das 23 unidades da Gercadi em Mato Grosso.",
  alternates: { canonical: "/nossas-unidades" },
};

export default function UnitsPage() {
  return (
    <>
      <PageHero eyebrow="Unidades" title="Mato Grosso inteiro no radar" description="Encontre filiais, cidades atendidas e a frequência operacional informada pela Gercadi." image="/images/company/matriz-cuiaba.jpg" imageAlt="Matriz da Gercadi em Cuiabá" compact />
      <section className="section-space bg-surface">
        <div className="site-container">
          <SectionHeading eyebrow="Mapa de atendimento" title="Escolha uma cidade. Encontre o caminho." description="Filiais aparecem em destaque; as demais localidades exibem a frequência ou prazo operacional disponível na relação da Gercadi." />
          <div className="mt-12"><DeferredCoverageMap /></div>
        </div>
      </section>
      <section className="section-space bg-white">
        <div className="site-container flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">
          <div className="max-w-2xl"><p className="eyebrow">Área de atendimento</p><h2 className="text-3xl font-bold tracking-[-0.035em] text-ink sm:text-4xl lg:text-[2rem]">Consulte cidades atendidas e prazos operacionais</h2><p className="mt-4 leading-7 text-muted">A relação completa está disponível em uma planilha externa e é atualizada pela operação da Gercadi.</p></div>
          <Button asChild variant="outline" size="lg"><a href={siteConfig.coverageSheetUrl} target="_blank" rel="noopener noreferrer">Abrir lista de atendimento <ExternalLink className="size-4" /></a></Button>
        </div>
      </section>
    </>
  );
}
