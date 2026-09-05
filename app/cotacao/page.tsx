import type { Metadata } from "next";
import { CheckCircle2 } from "lucide-react";
import { PageHero } from "@/components/sections/page-hero";
import { QuotationForm } from "@/components/forms/quotation-form";

export const metadata: Metadata = {
  title: "Solicite uma Cotação",
  description: "Solicite uma cotação de transporte com a Gercadi e continue o atendimento pelo WhatsApp.",
  alternates: { canonical: "/cotacao" },
};

export default function QuotationPage() {
  return (
    <>
      <PageHero eyebrow="Cotação" title="Sua próxima rota começa aqui" description="Preencha as informações essenciais e envie sua solicitação organizada para o WhatsApp da Gercadi." compact />
      <section className="section-space bg-surface"><div className="site-container grid gap-10 lg:grid-cols-[0.65fr_1.35fr] lg:items-start"><aside><h2 className="text-2xl font-bold tracking-[-0.03em] text-ink">Como funciona</h2><ol className="mt-6 space-y-5">{["Preencha os dados da rota e da carga.", "O site prepara uma mensagem estruturada.", "Continue a conversa com nossa equipe no WhatsApp."].map((step) => <li key={step} className="flex gap-3 text-sm leading-6 text-muted"><CheckCircle2 className="mt-0.5 size-5 shrink-0 text-tracking-green" />{step}</li>)}</ol><p className="mt-7 border-l-2 border-action-red pl-4 text-sm leading-6 text-muted">O envio do formulário não confirma preço, prazo ou disponibilidade. Nossa equipe avaliará os detalhes pelo WhatsApp.</p></aside><QuotationForm /></div></section>
    </>
  );
}
