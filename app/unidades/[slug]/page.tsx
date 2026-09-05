import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Clock3, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { PageHero } from "@/components/sections/page-hero";
import { Button } from "@/components/ui/button";
import { getUnit, phoneToHref, units } from "@/data/units";
import { createWhatsappUrl } from "@/lib/whatsapp";
import { TrackingLink } from "@/components/shared-links";

export function generateStaticParams() {
  return units.map((unit) => ({ slug: unit.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: PageProps<"/unidades/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const unit = getUnit(slug);
  if (!unit) return {};
  return {
    title: `Unidade ${unit.name}`,
    description: `Consulte telefone, WhatsApp, e-mail e horário da unidade Gercadi em ${unit.name}, Mato Grosso.`,
    alternates: { canonical: `/unidades/${unit.slug}` },
  };
}

export default async function UnitPage({ params }: PageProps<"/unidades/[slug]">) {
  const { slug } = await params;
  const unit = getUnit(slug);
  if (!unit) notFound();

  return (
    <>
      <PageHero eyebrow="Unidade" title={unit.name} description="Canais de contato da Gercadi em Mato Grosso para atendimento e informações sobre transporte." compact />
      <section className="section-space bg-surface">
        <div className="site-container grid gap-8 lg:grid-cols-[1fr_0.7fr]">
          <article className="rounded-lg border border-border bg-white p-6 sm:p-9">
            <div className="flex items-center gap-3"><MapPin className="size-6 text-action-red" aria-hidden="true" /><h2 className="text-2xl font-bold text-ink">Informações da unidade</h2></div>
            <dl className="mt-8 divide-y divide-border">
              <div className="grid gap-2 py-5 sm:grid-cols-[11rem_1fr]"><dt className="flex items-center gap-2 font-semibold text-ink"><Phone className="size-4 text-tracking-green" />Telefones</dt><dd className="flex flex-wrap gap-x-4 gap-y-2">{unit.phones.map((phone) => <a key={phone} href={phoneToHref(phone)} className="text-muted hover:text-ink hover:underline">{phone}</a>)}</dd></div>
              <div className="grid gap-2 py-5 sm:grid-cols-[11rem_1fr]"><dt className="flex items-center gap-2 font-semibold text-ink"><Mail className="size-4 text-tracking-green" />E-mail</dt><dd><a href={`mailto:${unit.email}`} className="break-all text-muted hover:text-ink hover:underline">{unit.email}</a></dd></div>
              {unit.hours && <div className="grid gap-2 py-5 sm:grid-cols-[11rem_1fr]"><dt className="flex items-center gap-2 font-semibold text-ink"><Clock3 className="size-4 text-tracking-green" />Horário</dt><dd className="text-muted">{unit.hours}</dd></div>}
            </dl>
            <Button asChild size="lg" className="mt-7"><a href={createWhatsappUrl(unit.whatsapp, `Olá! Gostaria de falar com a unidade Gercadi de ${unit.name}.`)} target="_blank" rel="noopener noreferrer"><MessageCircle className="size-5" />Falar com a unidade</a></Button>
          </article>
          <aside className="rounded-lg bg-forest p-7 text-white sm:p-9"><p className="eyebrow text-[#8ee49b]">Precisa acompanhar uma carga?</p><h2 className="text-3xl font-bold tracking-[-0.035em]">Acesse o rastreamento SSW</h2><p className="mt-4 text-sm leading-6 text-white/70">O sistema abre em uma nova aba para você consultar sua carga.</p><TrackingLink variant="light" className="mt-7" /></aside>
        </div>
        <div className="site-container mt-8"><Link href="/nossas-unidades" className="inline-flex min-h-11 items-center gap-2 font-semibold text-ink hover:text-action-red"><ArrowLeft className="size-4" />Voltar para todas as unidades</Link></div>
      </section>
    </>
  );
}
