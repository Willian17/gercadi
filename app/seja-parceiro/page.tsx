import type { Metadata } from "next";
import { CheckCircle2, FileCheck2, Handshake, Network, TrendingUp, Users } from "lucide-react";
import { PageHero } from "@/components/sections/page-hero";
import { SectionHeading } from "@/components/sections/section-heading";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/data/site";

export const metadata: Metadata = {
  title: "Seja Parceiro",
  description: "Conheça os benefícios e requisitos para fazer parte da rede de parceiros da Gercadi.",
  alternates: { canonical: "/seja-parceiro" },
};

const documents = ["CNPJ ativo", "Inscrição Estadual", "Alvará de funcionamento", "Certidões negativas", "Licenças específicas do setor"];
const technical = ["Frota própria ou terceirizada", "Sistema de rastreamento", "Seguros em dia", "Equipe qualificada", "Estrutura operacional"];

export default function PartnerPage() {
  return (
    <>
      <PageHero eyebrow="Seja Parceiro" title="Cresça com uma rede presente em Mato Grosso" description="Conheça os requisitos para estabelecer uma parceria operacional com a Gercadi." image="/images/company/carreta-gercadi.jpg" imageAlt="Carreta da Gercadi Transportes e Logística" actions={<Button asChild size="lg"><a href={`mailto:${siteConfig.email}?subject=Quero ser parceiro da Gercadi`}><Handshake className="size-5" />Falar com o comercial</a></Button>} />
      <section className="section-space bg-surface"><div className="site-container"><SectionHeading eyebrow="Vantagens" title="Uma parceria orientada para operação e crescimento" /><div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-4">{[
        [TrendingUp, "Crescimento", "Amplie oportunidades junto a uma rede de transporte consolidada."],
        [Network, "Cobertura", "Participe de uma operação presente em diferentes regiões de Mato Grosso."],
        [Users, "Suporte", "Conte com uma equipe para apoiar o relacionamento operacional."],
        [Handshake, "Parceria", "Construa uma relação profissional, próxima e duradoura."],
      ].map(([Icon, title, text]) => { const ItemIcon = Icon as typeof Handshake; return <article key={String(title)} className="rounded-lg border border-border bg-white p-6"><ItemIcon className="size-6 text-action-red" /><h2 className="mt-5 text-xl font-bold text-ink">{String(title)}</h2><p className="mt-3 text-sm leading-6 text-muted">{String(text)}</p></article>; })}</div></div></section>
      <section className="section-space bg-white"><div className="site-container"><SectionHeading eyebrow="Requisitos" title="O que é necessário para iniciar a conversa" description="A documentação e os requisitos podem variar conforme o modelo da parceria e passarão por avaliação da Gercadi." /><div className="mt-12 grid gap-5 lg:grid-cols-2">{[[FileCheck2, "Documentação necessária", documents], [Network, "Requisitos técnicos", technical]].map(([Icon, title, list]) => { const ItemIcon = Icon as typeof FileCheck2; return <article key={String(title)} className="rounded-lg border border-border bg-surface p-7 sm:p-9"><ItemIcon className="size-7 text-tracking-green" /><h2 className="mt-6 text-2xl font-bold text-ink">{String(title)}</h2><ul className="mt-6 grid gap-3">{(list as string[]).map((item) => <li key={item} className="flex gap-3 text-sm text-muted"><CheckCircle2 className="size-5 shrink-0 text-tracking-green" />{item}</li>)}</ul></article>; })}</div></div></section>
      <section className="section-space bg-forest text-white"><div className="site-container flex flex-col items-start justify-between gap-8 md:flex-row md:items-center"><div><p className="eyebrow text-[#8ee49b]">Parcerias</p><h2 className="text-3xl font-bold tracking-[-0.035em] sm:text-4xl">Envie seu interesse para nossa equipe comercial.</h2></div><Button asChild variant="light" size="lg"><a href={`mailto:${siteConfig.email}?subject=Quero ser parceiro da Gercadi`}><FileCheck2 className="size-5" />Enviar e-mail</a></Button></div></section>
    </>
  );
}

