import type { Metadata } from "next";
import Image from "next/image";
import { CheckCircle2, Eye, HeartHandshake, Target } from "lucide-react";
import { PageHero } from "@/components/sections/page-hero";
import { SectionHeading } from "@/components/sections/section-heading";
import { QuoteLink } from "@/components/shared-links";

export const metadata: Metadata = {
  title: "Sobre a Gercadi",
  description: "Conheça a história, missão, visão e os valores da Gercadi Transportes e Logística.",
  alternates: { canonical: "/empresa" },
};

const values = ["Compromisso com a qualidade", "Responsabilidade social", "Agilidade na execução dos serviços", "Atendimento qualificado", "Liberdade com responsabilidade"];

export default function CompanyPage() {
  return (
    <>
      <PageHero eyebrow="Empresa" title="Mais de 35 anos movendo negócios e conectando cidades" description="Soluções em transporte e logística com agilidade, tecnologia, segurança e uma equipe próxima do cliente." image="/images/company/matriz-cuiaba.jpg" imageAlt="Matriz da Gercadi em Cuiabá" actions={<QuoteLink size="lg" />} />
      <section className="section-space bg-white">
        <div className="site-container grid items-center gap-14 lg:grid-cols-2">
          <div className="image-reveal relative aspect-[5/3] overflow-hidden rounded-lg" data-reveal="media"><Image src="/images/company/carreta-gercadi.jpg" alt="Carreta da Gercadi Transportes e Logística" fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover" /></div>
          <div data-reveal>
            <SectionHeading eyebrow="Nossa história" title="Uma operação construída para aproximar empresas e destinos" />
            <div className="mt-6 space-y-4 text-base leading-7 text-muted">
              <p>O grupo Gercadi Transportes atua no mercado há mais de 35 anos, oferecendo soluções para coletar, movimentar e entregar mercadorias.</p>
              <p>Hoje, conta com 23 unidades em Mato Grosso e uma equipe preparada para manter uma comunicação próxima entre empresa e cliente.</p>
            </div>
          </div>
        </div>
      </section>
      <section className="section-space bg-surface">
        <div className="site-container grid gap-5 lg:grid-cols-3">
          {[
            [Target, "Missão", "Superar as expectativas dos clientes com qualidade, segurança e rapidez, apoiados por uma equipe profissional e motivada."],
            [Eye, "Visão", "Ser referência positiva em serviços logísticos eficientes, com competência técnica e responsabilidade ambiental e social."],
            [HeartHandshake, "Valores", null],
          ].map(([Icon, title, text], index) => {
            const ItemIcon = Icon as typeof Target;
            return <article key={String(title)} className={`operational-card p-7 reveal-delay-${index + 1}`} data-reveal><ItemIcon className="size-7 text-action-red" aria-hidden="true" /><span className="mt-10 block font-mono text-[10px] font-bold tracking-[.18em] text-muted">0{index + 1} / 03</span><h2 className="mt-4 text-2xl font-bold text-ink">{String(title)}</h2>{text ? <p className="mt-4 text-sm leading-6 text-muted">{String(text)}</p> : <ul className="mt-4 space-y-3">{values.map((value) => <li key={value} className="flex gap-2 text-sm leading-6 text-muted"><CheckCircle2 className="mt-1 size-4 shrink-0 text-tracking-green" aria-hidden="true" />{value}</li>)}</ul>}</article>;
          })}
        </div>
      </section>
      <section className="section-space bg-forest text-white"><div className="site-container flex flex-col items-start justify-between gap-8 md:flex-row md:items-center"><div><p className="eyebrow text-[#8ee49b]">Próximo passo</p><h2 className="max-w-2xl text-3xl font-bold tracking-[-0.035em] sm:text-4xl">Leve a experiência da Gercadi para a sua próxima rota.</h2></div><QuoteLink size="lg" /></div></section>
    </>
  );
}
