import type { Metadata } from "next";
import { CalendarDays, Clock3, PackageOpen } from "lucide-react";
import { PageHero } from "@/components/sections/page-hero";
import { SectionHeading } from "@/components/sections/section-heading";
import { QuotationForm } from "@/components/forms/quotation-form";

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
      <section className="paper-grid section-space bg-ivory"><div className="site-container grid gap-14 lg:grid-cols-12 lg:items-start"><div className="lg:col-span-5 lg:sticky lg:top-32"><p className="eyebrow">Assistente de coleta</p><h2 className="display-condensed text-[clamp(3.25rem,5.8vw,5rem)] uppercase text-carbon lg:text-[clamp(3rem,4.8vw,4.25rem)]">Conte<br />o caminho.</h2><p className="mt-7 max-w-md text-lg leading-8 text-muted">Organize os dados essenciais da coleta. Ao concluir, a conversa segue diretamente para a equipe responsável.</p><div className="mt-10 flex items-center gap-4 border-t border-black/15 pt-6 text-xs font-bold uppercase tracking-[.14em] text-muted"><span className="flex size-8 items-center justify-center rounded-full bg-carbon text-white">1</span> Rota <span className="h-px flex-1 bg-border" /><span className="flex size-8 items-center justify-center rounded-full border border-black/20">2</span> Contato</div></div><div className="lg:col-span-6 lg:col-start-7"><QuotationForm service="collection" /></div></div></section>
    </>
  );
}
