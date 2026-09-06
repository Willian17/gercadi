import type { Metadata } from "next";
import { Clock3, ExternalLink, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { PageHero } from "@/components/sections/page-hero";
import { SectionHeading } from "@/components/sections/section-heading";
import { Button } from "@/components/ui/button";
import { QuoteLink } from "@/components/shared-links";
import { siteConfig } from "@/data/site";
import { createWhatsappUrl } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: "Fale Conosco",
  description: "Entre em contato com a Gercadi por telefone, WhatsApp, e-mail ou redes sociais.",
  alternates: { canonical: "/fale-conosco" },
};

export default function ContactPage() {
  const contacts = [
    [Phone, "Telefone", siteConfig.phone, siteConfig.phoneHref],
    [Mail, "E-mail", siteConfig.email, `mailto:${siteConfig.email}`],
    [MapPin, "Matriz", "Cuiabá — Mato Grosso", "/nossas-unidades"],
    [Clock3, "Atendimento comercial", "Segunda a sexta, 8h às 18h", null],
  ] as const;

  return (
    <>
      <PageHero eyebrow="Fale Conosco" title="Nossa equipe está pronta para atender você" description="Escolha o canal mais adequado para cotação, coleta, rastreamento ou atendimento comercial." compact actions={<QuoteLink size="lg" />} />
      <section className="section-space bg-surface"><div className="site-container grid gap-12 lg:grid-cols-[1fr_0.8fr]"><div><SectionHeading eyebrow="Canais de contato" title="Fale diretamente com a Gercadi" /><div className="mt-10 grid gap-4 sm:grid-cols-2">{contacts.map(([Icon, title, value, href], index) => { const content = <><Icon className="size-6 text-action-red" aria-hidden="true" /><span className="mt-8 block font-mono text-[10px] font-bold tracking-[.18em] text-muted">0{index + 1} / 04</span><h2 className="mt-4 text-sm font-bold uppercase tracking-[0.1em] text-ink">{title}</h2><p className="mt-2 break-words text-sm leading-6 text-muted">{value}</p></>; const classes = `operational-card block p-6 reveal-delay-${index + 1} focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink`; return href ? <a key={title} href={href} className={classes} data-reveal>{content}</a> : <div key={title} className={classes} data-reveal>{content}</div>; })}</div></div><aside className="rounded-lg bg-forest p-7 text-white sm:p-9" data-reveal><MessageCircle className="size-8 text-[#8ee49b]" /><h2 className="mt-6 text-3xl font-bold tracking-[-0.035em]">Atendimento pelo WhatsApp</h2><p className="mt-4 text-sm leading-6 text-white/70">Inicie uma conversa com a equipe responsável por cotações e atendimento 24 horas.</p><Button asChild variant="light" size="lg" className="mt-7 w-full"><a href={createWhatsappUrl(siteConfig.quoteWhatsapp, "Olá! Gostaria de falar com a Gercadi.")} target="_blank" rel="noopener noreferrer">Abrir WhatsApp</a></Button><div className="mt-9 border-t border-white/15 pt-7"><p className="text-xs font-bold uppercase tracking-[0.14em] text-white/60">Redes sociais</p><div className="mt-4 flex flex-wrap gap-2"><a href={siteConfig.facebook} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center gap-2 rounded-md border border-white/20 px-3 text-sm font-semibold hover:bg-white hover:text-forest">Facebook <ExternalLink className="size-3.5" /></a><a href={siteConfig.instagram} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center gap-2 rounded-md border border-white/20 px-3 text-sm font-semibold hover:bg-white hover:text-forest">Instagram <ExternalLink className="size-3.5" /></a></div></div></aside></div></section>
    </>
  );
}
