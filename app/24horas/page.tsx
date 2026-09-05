import type { Metadata } from "next";
import { CalendarClock, CheckCircle2, Clock3, Headphones, ShieldCheck } from "lucide-react";
import { PageHero } from "@/components/sections/page-hero";
import { DirectWhatsappLink } from "@/components/shared-links";
import { SectionHeading } from "@/components/sections/section-heading";

export const metadata: Metadata = {
  title: "Transporte 24 Horas",
  description: "Canal de atendimento 24 horas da Gercadi para necessidades urgentes de transporte.",
  alternates: { canonical: "/24horas" },
};

const availableServices = ["Coletas de emergência", "Entregas urgentes", "Transporte de medicamentos", "Cargas especiais", "Transporte hospitalar", "Documentos urgentes"];

export default function AroundTheClockPage() {
  return (
    <>
      <PageHero eyebrow="24 Horas" title="Atendimento direto para necessidades urgentes" description="Nossa central está disponível 24 horas por dia, 7 dias por semana, incluindo feriados." image="/images/company/frota-centro-operacional.jpg" imageAlt="Frota da Gercadi no centro operacional" actions={<DirectWhatsappLink message="Olá! Preciso de atendimento de transporte 24 horas." size="lg">Solicitar atendimento</DirectWhatsappLink>} />
      <section className="section-space bg-surface"><div className="site-container grid gap-5 lg:grid-cols-3">{[
        [CalendarClock, "Disponibilidade total", "Canal de atendimento ativo 24 horas por dia, todos os dias da semana."],
        [Headphones, "Resposta rápida", "Contato direto para organizar demandas urgentes de transporte."],
        [ShieldCheck, "Equipe preparada", "Atendimento para avaliar rota, carga e disponibilidade operacional."],
      ].map(([Icon, title, text]) => { const ItemIcon = Icon as typeof Clock3; return <article key={String(title)} className="rounded-lg border border-border bg-white p-7"><ItemIcon className="size-7 text-action-red" /><h2 className="mt-6 text-2xl font-bold text-ink">{String(title)}</h2><p className="mt-3 text-sm leading-6 text-muted">{String(text)}</p></article>; })}</div></section>
      <section className="section-space bg-white"><div className="site-container grid gap-12 lg:grid-cols-2 lg:items-start"><SectionHeading eyebrow="Serviços disponíveis" title="Uma central para diferentes tipos de urgência" description="Consulte a disponibilidade para sua cidade, rota e tipo de carga antes de confirmar a operação." /><ul className="grid gap-3 sm:grid-cols-2">{availableServices.map((service) => <li key={service} className="flex items-center gap-3 rounded-md border border-border p-4 font-semibold text-ink"><CheckCircle2 className="size-5 shrink-0 text-tracking-green" />{service}</li>)}</ul></div></section>
      <section className="section-space bg-forest text-white"><div className="site-container grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center"><div><p className="eyebrow text-[#8ee49b]">Central 24h</p><h2 className="text-4xl font-bold tracking-[-0.04em] sm:text-5xl">(66) 99712-1672</h2><p className="mt-3 text-white/65">Atendimento por WhatsApp para urgências e cotações.</p></div><DirectWhatsappLink message="Olá! Preciso de atendimento de transporte 24 horas." variant="light" size="lg">Chamar no WhatsApp</DirectWhatsappLink></div></section>
    </>
  );
}

