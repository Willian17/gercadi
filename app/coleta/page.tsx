import type { Metadata } from "next";
import { CalendarDays, Clock3, PackageOpen } from "lucide-react";
import { PageHero } from "@/components/sections/page-hero";
import { SectionHeading } from "@/components/sections/section-heading";
import { CollectionForm } from "@/components/forms/collection-form";

export const metadata: Metadata = {
  title: "Solicite sua Coleta",
  description: "Solicite coleta expressa, programada ou especial com a Gercadi pelo WhatsApp.",
  alternates: { canonical: "/coleta" },
};

export default function CollectionPage() {
  return (
    <>
      <PageHero eyebrow="Coleta" title="Sua coleta começa com um pedido simples" description="Informe os dados da carga e da rota. Nossa equipe continuará o atendimento pelo WhatsApp." image="/images/company/frota-centro-operacional.jpg" imageAlt="Veículos da Gercadi preparados para coleta" compact />
      <section className="section-space bg-white"><div className="site-container"><SectionHeading eyebrow="Tipos de coleta" title="Escolha o atendimento mais adequado" description="Prazos estão sujeitos à rota, ao tipo de carga e à disponibilidade operacional." /><div className="mt-12 grid gap-5 lg:grid-cols-3">{[
        [Clock3, "Coleta expressa", "Atendimento para demandas no mesmo dia. Consulte disponibilidade e prazo para sua cidade."],
        [CalendarDays, "Coleta programada", "Agendamento com data e período definidos para organizar sua operação."],
        [PackageOpen, "Coleta especial", "Avaliação específica para cargas especiais ou volumes maiores."],
      ].map(([Icon, title, text], index) => { const ItemIcon = Icon as typeof Clock3; return <article key={String(title)} className={`operational-card p-7 reveal-delay-${index + 1}`} data-reveal><ItemIcon className="size-7 text-action-red" /><span className="mt-10 block font-mono text-[10px] font-bold tracking-[.18em] text-muted">0{index + 1} / 03</span><h2 className="mt-4 text-2xl font-bold text-ink">{String(title)}</h2><p className="mt-3 text-sm leading-6 text-muted">{String(text)}</p></article>; })}</div></div></section>
      <section className="section-space bg-surface"><div className="site-container grid gap-10 lg:grid-cols-[0.6fr_1.4fr] lg:items-start"><SectionHeading eyebrow="Solicitar coleta" title="Envie os detalhes pelo WhatsApp" description="Os dados são usados apenas para preparar a mensagem. A solicitação será enviada ao canal oficial de coleta." /><CollectionForm /></div></section>
    </>
  );
}
