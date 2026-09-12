import type { Metadata } from "next";
import Image from "next/image";
import { Box, Building2, Truck } from "lucide-react";
import { PageHero } from "@/components/sections/page-hero";
import { SectionHeading } from "@/components/sections/section-heading";
import { QuoteLink } from "@/components/shared-links";

export const metadata: Metadata = {
  title: "Frota e Estrutura Operacional",
  description: "Conheça a frota e a estrutura usadas pela Gercadi em suas operações de transporte e logística.",
  alternates: { canonical: "/frota" },
};

export default function FleetPage() {
  return (
    <>
      <PageHero eyebrow="Frota" title="Estrutura para cargas, rotas e operações de diferentes portes" description="Veículos de estrada, caminhões urbanos e estrutura operacional para atender as necessidades de transporte dos nossos clientes." image="/images/company/carreta-gercadi.jpg" imageAlt="Carreta da Gercadi em operação" actions={<QuoteLink size="lg" />} />
      <section className="section-space bg-white">
        <div className="site-container">
          <SectionHeading eyebrow="Nossa frota" title="Da coleta urbana ao transporte rodoviário" description="Uma composição de veículos voltada à movimentação de cargas e ao atendimento das rotas da Gercadi." />
          <div className="mt-12 grid gap-5 lg:grid-cols-3">
            {[
              [Truck, "Caminhões", "Veículos para o transporte de cargas diversas nas rotas da operação."],
              [Box, "Carretas", "Estrutura destinada ao transporte de cargas e volumes maiores."],
              [Building2, "Veículos urbanos", "Veículos voltados para coletas e entregas em áreas urbanas."],
            ].map(([Icon, title, text], index) => {
              const ItemIcon = Icon as typeof Truck;
              return <article key={String(title)} className={`operational-card p-7 reveal-delay-${index + 1}`} data-reveal><ItemIcon className="size-7 text-tracking-green" aria-hidden="true" /><span className="mt-10 block font-mono text-[10px] font-bold tracking-[.18em] text-muted">0{index + 1} / 03</span><h2 className="mt-4 text-2xl font-bold text-ink">{String(title)}</h2><p className="mt-3 text-sm leading-6 text-muted">{String(text)}</p></article>;
            })}
          </div>
        </div>
      </section>
      <section className="section-space bg-surface">
        <div className="site-container grid gap-5 lg:grid-cols-2">
          <figure className="image-reveal overflow-hidden rounded-lg bg-white" data-reveal="media"><div className="relative aspect-[5/3]"><Image src="/images/company/frota-centro-operacional.jpg" alt="Veículos da Gercadi reunidos no centro operacional" fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover" /></div><figcaption className="p-5 text-sm text-muted">Veículos em estrutura operacional da Gercadi.</figcaption></figure>
          <figure className="image-reveal overflow-hidden rounded-lg bg-white reveal-delay-2" data-reveal="media"><div className="relative aspect-[5/3]"><Image src="/images/company/caminhao-gercadi-estrada.jpg" alt="Caminhão urbano da Gercadi em estrada de Mato Grosso" fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover" /></div><figcaption className="p-5 text-sm text-muted">Atuação em rotas urbanas e rodoviárias.</figcaption></figure>
        </div>
      </section>
      <section className="section-space bg-forest text-white"><div className="site-container flex flex-col items-start justify-between gap-8 md:flex-row md:items-center"><div><p className="eyebrow text-[#8ee49b]">Sua carga</p><h2 className="text-3xl font-bold tracking-[-0.035em] sm:text-4xl lg:text-[2rem]">Consulte a solução adequada para a sua operação.</h2></div><QuoteLink size="lg" /></div></section>
    </>
  );
}
