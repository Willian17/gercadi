import type { Metadata } from "next";
import { CheckCircle2, Clock3, Route, ShieldCheck, Truck } from "lucide-react";
import { PageHero } from "@/components/sections/page-hero";
import { SectionHeading } from "@/components/sections/section-heading";
import { QuoteLink, TrackingLink } from "@/components/shared-links";

export const metadata: Metadata = {
  title: "Gercadi Express",
  description: "Conheça o serviço Gercadi Express para demandas urgentes de transporte em Mato Grosso.",
  alternates: { canonical: "/express" },
};

export default function ExpressPage() {
  const benefits = [
    [Clock3, "Rapidez", "Atendimento para entregas no mesmo dia ou em 24 horas, conforme rota e disponibilidade."],
    [Route, "Eficiência", "Rotas organizadas para dar agilidade à operação e manter a carga em movimento."],
    [ShieldCheck, "Segurança", "Acompanhamento do transporte e contato com a equipe durante a operação."],
  ] as const;
  const steps = ["Solicite o atendimento", "Nossa equipe organiza a retirada", "Acompanhe o transporte", "Receba a confirmação de entrega"];

  return (
    <>
      <PageHero eyebrow="Express" title="Agilidade para demandas que não podem esperar" description="Um serviço voltado a entregas urgentes, com atendimento próximo, rotas organizadas e acompanhamento da carga." image="/images/company/caminhao-gercadi-estrada.jpg" imageAlt="Caminhão da Gercadi em rota" actions={<><QuoteLink size="lg" /><TrackingLink size="lg" variant="light" /></>} />
      <section className="section-space bg-surface"><div className="site-container grid gap-5 lg:grid-cols-3">{benefits.map(([Icon, title, text]) => <article key={title} className="rounded-lg border border-border bg-white p-7"><Icon className="size-7 text-action-red" aria-hidden="true" /><h2 className="mt-6 text-2xl font-bold text-ink">{title}</h2><p className="mt-3 text-sm leading-6 text-muted">{text}</p></article>)}</div></section>
      <section className="section-space bg-white"><div className="site-container"><SectionHeading eyebrow="Como funciona" title="Da solicitação à confirmação da entrega" description="Um fluxo simples para sua empresa iniciar e acompanhar o atendimento." /><ol className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-4">{steps.map((step, index) => <li key={step} className="relative rounded-lg border border-border p-6"><span className="text-5xl font-bold tracking-[-0.05em] text-[#dce9df]">0{index + 1}</span><h2 className="mt-5 text-lg font-bold text-ink">{step}</h2><CheckCircle2 className="absolute right-5 top-5 size-5 text-tracking-green" aria-hidden="true" /></li>)}</ol><p className="mt-6 flex items-start gap-3 rounded-md bg-surface p-4 text-sm leading-6 text-muted"><Truck className="mt-0.5 size-5 shrink-0 text-tracking-green" aria-hidden="true" />Prazos dependem da cidade, rota, tipo de carga e disponibilidade operacional. Consulte nossa equipe.</p></div></section>
      <section className="section-space bg-forest text-white"><div className="site-container flex flex-col items-start justify-between gap-8 md:flex-row md:items-center"><div><p className="eyebrow text-[#8ee49b]">Atendimento Express</p><h2 className="max-w-2xl text-3xl font-bold tracking-[-0.035em] sm:text-4xl">Consulte agora a disponibilidade para sua rota.</h2></div><QuoteLink size="lg" /></div></section>
    </>
  );
}

