import type { Metadata } from "next";
import { Suspense } from "react";
import { CheckCircle2 } from "lucide-react";
import { PageHero } from "@/components/sections/page-hero";
import { QuotationForm } from "@/components/forms/quotation-form";
import { QuotationFormWithDestination } from "@/components/forms/quotation-form-with-destination";

export const metadata: Metadata = {
  title: "Solicite uma Cotação",
  description: "Solicite uma cotação de transporte com a Gercadi e continue o atendimento pelo WhatsApp.",
  alternates: { canonical: "/cotacao" },
};

export default function QuotationPage() {
  return (
    <>
      <PageHero eyebrow="Cotação" title="Sua próxima rota começa aqui" description="Preencha as informações essenciais e envie sua solicitação organizada para o WhatsApp da Gercadi." compact />
      <section className="paper-grid section-space bg-ivory"><div className="site-container grid gap-14 lg:grid-cols-12 lg:items-start"><aside className="lg:col-span-5 lg:sticky lg:top-32"><p className="eyebrow">Assistente de rota</p><h2 className="display-condensed text-[clamp(3.25rem,5.8vw,5rem)] uppercase text-carbon lg:text-[clamp(3rem,4.8vw,4.25rem)]">Conte<br />o caminho.</h2><p className="mt-7 max-w-md text-lg leading-8 text-muted">Organize os dados essenciais da operação. Ao concluir, a conversa segue diretamente no WhatsApp da Gercadi.</p><ol className="mt-10 space-y-4 border-t border-black/15 pt-6">{["Preencha os dados da rota e da carga.", "O site prepara uma mensagem estruturada.", "Continue a conversa com nossa equipe no WhatsApp."].map((step) => <li key={step} className="flex gap-3 text-sm leading-6 text-muted"><CheckCircle2 className="mt-0.5 size-5 shrink-0 text-tracking-green" />{step}</li>)}</ol><p className="mt-7 border-l-2 border-action-red pl-4 text-sm leading-6 text-muted">O envio do formulário não confirma preço, prazo ou disponibilidade. Nossa equipe avaliará os detalhes pelo WhatsApp.</p></aside><div className="lg:col-span-6 lg:col-start-7"><Suspense fallback={<QuotationForm />}><QuotationFormWithDestination /></Suspense></div></div></section>
    </>
  );
}
