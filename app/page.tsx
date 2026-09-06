import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ArrowRight, ArrowUpRight, Clock3, PackageCheck, Route, ShieldCheck, Truck } from "lucide-react";
import { TrackingLink } from "@/components/shared-links";
import { QuotationForm } from "@/components/forms/quotation-form";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/data/site";
import { DeferredCoverageMap } from "@/components/deferred-coverage-map";

const serviceChapters = [
  { index: "01", title: "Carga fracionada", text: "Controle, agilidade e segurança para volumes de diferentes portes, com acompanhamento de coleta e entrega.", href: "/frota", image: "/images/company/frota-centro-operacional.jpg", icon: PackageCheck },
  { index: "02", title: "Gercadi Express", text: "Uma solução para demandas urgentes, com rotas otimizadas e acompanhamento próximo do transporte.", href: "/express", image: "/images/company/caminhao-gercadi-estrada.jpg", icon: Route },
  { index: "03", title: "Coleta", text: "Solicitações expressas, programadas ou especiais direcionadas à equipe responsável pelo atendimento.", href: "/coleta", image: "/images/company/carreta-gercadi.jpg", icon: Truck },
  { index: "04", title: "Atendimento 24 horas", text: "Canal direto para necessidades urgentes de transporte, todos os dias da semana.", href: "/24horas", image: "/images/company/matriz-cuiaba.jpg", icon: Clock3 },
];

export default function Home() {
  return (
    <>
      <section className="route-grid relative isolate -mt-20 min-h-[calc(100svh+2rem)] overflow-hidden bg-carbon-deep text-white md:-mt-24">
        <Image src="/images/company/caminhao-gercadi-estrada.jpg" alt="Caminhão da Gercadi em operação ao pôr do sol" fill preload quality={60} sizes="100vw" className="page-hero-media object-cover object-[62%_center] opacity-70" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,#090c0a_0%,rgba(9,12,10,.92)_42%,rgba(9,12,10,.35)_78%,rgba(9,12,10,.55)_100%)]" />
        <svg className="pointer-events-none absolute inset-0 h-full w-full opacity-55" viewBox="0 0 1440 900" fill="none" aria-hidden="true">
          <path className="route-line" d="M-80 735C214 677 324 787 507 643C713 481 772 332 1035 263C1194 221 1282 129 1511 56" stroke="#C91D24" strokeWidth="3" />
          <circle cx="506" cy="644" r="7" fill="#C91D24" /><circle cx="1036" cy="263" r="7" fill="#fff" />
        </svg>
        <div className="site-container relative z-10 flex min-h-[calc(100svh+2rem)] items-end pb-10 pt-44 sm:pb-14 md:pt-48 lg:pb-20">
          <div className="w-full">
            <div className="hero-eyebrow mb-8 flex items-center gap-4 text-[10px] font-extrabold uppercase tracking-[.25em] text-white/65"><span className="h-px w-12 bg-action-red" />Gercadi • Transporte e logística</div>
            <h1 className="hero-title hero-title-lines display-condensed max-w-[980px] text-[clamp(3.5rem,7.5vw,7rem)] uppercase">
              <span className="hero-title-line">Mato Grosso</span><span className="hero-title-line text-white/36">não para.</span><span className="hero-title-line">Sua carga também não.</span>
            </h1>
            <div className="hero-copy mt-10 grid gap-8 border-t border-white/20 pt-7 lg:grid-cols-[1fr_auto] lg:items-end">
              <p className="max-w-xl text-base leading-7 text-white/72 sm:text-lg">Há mais de 35 anos, conectamos empresas e cidades com presença regional, atendimento próximo e operação em movimento.</p>
              <a href="#operacao" className="inline-flex min-h-12 items-center gap-3 text-xs font-extrabold uppercase tracking-[.16em] text-white hover:text-white/70">Conheça a operação <ArrowDown className="size-4" aria-hidden="true" /></a>
            </div>
          </div>
        </div>
      </section>

      <section aria-label="Ações principais" className="relative z-20 bg-paper">
        <div className="site-container md:-translate-y-1/2">
          <div className="grid overflow-hidden rounded-2xl border border-black/10 bg-white shadow-[0_24px_70px_rgba(9,12,10,.18)] md:grid-cols-2" data-reveal>
            <Link href="/cotacao" className="group flex min-h-28 items-center justify-between bg-action-red p-6 text-white transition-colors hover:bg-[#aa171d] sm:p-8">
              <span><span className="block text-[10px] font-extrabold uppercase tracking-[.22em] text-white/70">Nova operação</span><strong className="mt-2 block text-2xl tracking-[-.04em] sm:text-3xl">Solicitar cotação</strong></span>
              <span className="flex size-12 items-center justify-center rounded-full border border-white/35"><ArrowUpRight className="size-5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" /></span>
            </Link>
            <a href={siteConfig.trackingUrl} target="_blank" rel="noopener noreferrer" className="group flex min-h-28 items-center justify-between bg-forest p-6 text-white transition-colors hover:bg-tracking-green sm:p-8">
              <span><span className="block text-[10px] font-extrabold uppercase tracking-[.22em] text-white/65">Carga em trânsito</span><strong className="mt-2 block text-2xl tracking-[-.04em] sm:text-3xl">Rastrear no SSW</strong></span>
              <span className="flex size-12 items-center justify-center rounded-full border border-white/30"><ArrowUpRight className="size-5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" /></span>
            </a>
          </div>
        </div>
      </section>

      <section id="operacao" className="paper-grid section-space overflow-hidden bg-paper md:-mt-14">
        <div className="site-container">
          <div className="grid gap-14 lg:grid-cols-12 lg:items-end" data-reveal>
            <div className="lg:col-span-7">
              <p className="eyebrow">Escala que se movimenta</p>
              <h2 className="display-condensed text-[clamp(3.25rem,5.8vw,5rem)] uppercase text-carbon">Presença.<br />Ritmo.<br /><span className="text-action-red">Conexão.</span></h2>
            </div>
            <p className="max-w-lg border-l-2 border-action-red pl-6 text-lg leading-8 text-muted lg:col-span-4 lg:col-start-9">Uma estrutura construída para manter empresa e cliente conectados durante cada etapa do transporte.</p>
          </div>

          <div className="mt-20 grid border-y border-black/15 sm:grid-cols-2 lg:grid-cols-4" data-reveal>
            {[ ["35+", "anos de experiência"], ["23", "unidades em Mato Grosso"], ["24h", "canal para urgências"], ["100%", "Mato Grosso"] ].map(([value, label], index) => (
              <div key={label} className="relative min-h-60 border-b border-black/15 p-6 last:border-b-0 sm:border-l lg:min-h-72 lg:border-b-0 lg:p-8">
                <span className="text-[10px] font-bold tracking-[.2em] text-muted">0{index + 1}</span>
                <strong className="display-condensed mt-10 block text-[clamp(4rem,6vw,6rem)] text-carbon">{value}</strong>
                <span className="mt-4 block max-w-40 text-sm font-bold uppercase leading-5 tracking-[.08em] text-muted">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-carbon text-white">
        <div className="site-container py-20 sm:py-28">
          <div className="flex flex-col gap-6 border-b border-white/15 pb-12 md:flex-row md:items-end md:justify-between" data-reveal>
            <div><p className="eyebrow eyebrow-inverse">Soluções em campo</p><h2 className="display-condensed text-[clamp(3.25rem,5.8vw,5rem)] uppercase">Cada carga pede<br /><span className="text-white/35">um movimento.</span></h2></div>
            <p className="max-w-sm text-base leading-7 text-white/62">Quatro frentes operacionais apresentadas com clareza, sem esconder o caminho para falar com nossa equipe.</p>
          </div>

          <div className="divide-y divide-white/15">
            {serviceChapters.map((service, index) => {
              const Icon = service.icon;
              return (
                <article key={service.title} className={`group grid gap-8 py-12 md:grid-cols-12 md:items-center md:py-16 reveal-delay-${index + 1}`} data-reveal>
                  <div className={`image-reveal relative aspect-[16/10] overflow-hidden rounded-xl md:col-span-5 ${index % 2 ? "md:col-start-8 md:row-start-1" : ""}`}>
                    <Image src={service.image} alt={`Operação Gercadi — ${service.title}`} fill sizes="(max-width: 768px) 100vw, 42vw" className="object-cover grayscale-[20%]" />
                    <span className="absolute left-4 top-4 flex size-11 items-center justify-center rounded-full bg-paper text-carbon"><Icon className="size-5" aria-hidden="true" /></span>
                  </div>
                  <div className={`md:col-span-5 ${index % 2 ? "md:col-start-1 md:row-start-1" : "md:col-start-7"}`}>
                    <span className="font-mono text-xs text-action-red">{service.index} / 04</span>
                    <h3 className="mt-5 text-4xl font-extrabold tracking-[-.055em] sm:text-5xl">{service.title}</h3>
                    <p className="mt-5 max-w-lg text-base leading-7 text-white/62">{service.text}</p>
                    <Link href={service.href} className="mt-8 inline-flex min-h-12 items-center gap-3 border-b border-white/35 text-sm font-extrabold transition-colors hover:border-action-red hover:text-action-red">Conhecer esta solução <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden="true" /></Link>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="paper-grid section-space bg-ivory">
        <div className="site-container grid gap-14 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-5" data-reveal>
            <p className="eyebrow">Presença regional</p>
            <h2 className="display-condensed text-[clamp(3.25rem,5.8vw,5rem)] uppercase text-carbon">23 pontos.<br /><span className="text-tracking-green">Um estado.</span></h2>
            <p className="mt-8 max-w-md text-lg leading-8 text-muted">Encontre o contato da unidade mais próxima ou consulte a relação de cidades atendidas e prazos operacionais.</p>
            <div className="mt-9 flex flex-wrap gap-3"><Button asChild size="lg"><Link href="/nossas-unidades">Encontrar unidade <ArrowRight className="size-4" /></Link></Button><Button asChild variant="outline" size="lg"><a href={siteConfig.coverageSheetUrl} target="_blank" rel="noopener noreferrer">Cidades e prazos</a></Button></div>
          </div>
          <DeferredCoverageMap compact className="lg:col-span-6 lg:col-start-7" />
        </div>
      </section>

      <section className="section-space overflow-hidden bg-paper">
        <div className="site-container">
          <div className="grid gap-10 lg:grid-cols-12 lg:items-end" data-reveal><div className="lg:col-span-7"><p className="eyebrow">Estrutura em movimento</p><h2 className="display-condensed text-[clamp(3.25rem,5.8vw,5rem)] uppercase text-carbon">Da base<br />para a estrada.</h2></div><p className="max-w-md text-lg leading-8 text-muted lg:col-span-4 lg:col-start-9">Frota e infraestrutura conectadas à presença regional para manter a operação avançando.</p></div>
          <div className="mt-16 grid gap-4 md:grid-cols-12 md:grid-rows-[300px_300px]" data-reveal="media">
            <figure className="image-reveal relative min-h-80 overflow-hidden rounded-2xl md:col-span-7 md:row-span-2"><Image src="/images/company/frota-centro-operacional.jpg" alt="Frota da Gercadi no centro operacional" fill sizes="(max-width:768px) 100vw, 58vw" className="object-cover" /><figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-carbon-deep/90 to-transparent p-6 pt-24 text-sm font-bold text-white">Centro operacional • Frota Gercadi</figcaption></figure>
            <figure className="image-reveal relative min-h-72 overflow-hidden rounded-2xl md:col-span-5"><Image src="/images/company/carreta-gercadi.jpg" alt="Carreta da Gercadi" fill sizes="(max-width:768px) 100vw, 42vw" className="object-cover" /><figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-carbon-deep/85 to-transparent p-5 pt-20 text-sm font-bold text-white">Capacidade para diferentes operações</figcaption></figure>
            <div className="flex min-h-72 flex-col justify-between rounded-2xl bg-action-red p-7 text-white md:col-span-5"><Truck className="size-9" aria-hidden="true" /><div><p className="text-[10px] font-bold uppercase tracking-[.2em] text-white/65">Conheça a estrutura</p><Link href="/frota" className="mt-3 flex items-end justify-between text-3xl font-extrabold tracking-[-.05em]">Ver nossa frota <ArrowUpRight className="size-6" /></Link></div></div>
          </div>
        </div>
      </section>

      <section className="route-grid bg-carbon-deep py-20 text-white sm:py-28">
        <div className="site-container grid gap-12 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-5" data-reveal><p className="eyebrow eyebrow-inverse">Central de acompanhamento</p><h2 className="display-condensed text-[clamp(3.25rem,5.8vw,5rem)] uppercase">Onde está<br /><span className="text-white/35">sua carga?</span></h2><p className="mt-7 max-w-md text-base leading-7 text-white/62">Tenha em mãos o CNPJ ou CPF do remetente e o número da nota fiscal, pedido ou coleta.</p></div>
          <div className="rounded-2xl border border-white/15 bg-white/[.04] p-5 sm:p-8 lg:col-span-6 lg:col-start-7" data-reveal>
            <div className="flex items-center justify-between border-b border-white/15 pb-5"><span className="flex items-center gap-2 text-xs font-bold uppercase tracking-[.16em]"><span className="size-2 rounded-full bg-[#63d77a]" />Sistema SSW</span><span className="font-mono text-[10px] text-white/45">ACESSO EXTERNO</span></div>
            <div className="grid gap-3 py-8 sm:grid-cols-3">{[[ShieldCheck,"Acesso seguro"],[PackageCheck,"Consulta objetiva"],[Route,"Acompanhamento"]].map(([I,t])=>{const Icon=I as typeof ShieldCheck;return <div key={String(t)} className="border-l border-white/15 pl-4"><Icon className="size-5 text-white/55" /><p className="mt-4 text-sm font-bold">{String(t)}</p></div>})}</div>
            <TrackingLink variant="light" size="lg" className="w-full" />
          </div>
        </div>
      </section>

      <section className="paper-grid section-space bg-ivory" id="cotacao">
        <div className="site-container grid gap-14 lg:grid-cols-12 lg:items-start">
          <div className="lg:col-span-5 lg:sticky lg:top-32" data-reveal><p className="eyebrow">Assistente de rota</p><h2 className="display-condensed text-[clamp(3.25rem,5.8vw,5rem)] uppercase text-carbon">Conte<br />o caminho.</h2><p className="mt-7 max-w-md text-lg leading-8 text-muted">Organize os dados essenciais da operação. Ao concluir, a conversa segue diretamente no WhatsApp da Gercadi.</p><div className="mt-10 flex items-center gap-4 border-t border-black/15 pt-6 text-xs font-bold uppercase tracking-[.14em] text-muted"><span className="flex size-8 items-center justify-center rounded-full bg-carbon text-white">1</span> Rota <span className="h-px flex-1 bg-border" /><span className="flex size-8 items-center justify-center rounded-full border border-black/20">2</span> Contato</div></div>
          <div className="lg:col-span-6 lg:col-start-7" data-reveal><QuotationForm /></div>
        </div>
      </section>

      <section className="bg-paper py-20 sm:py-28">
        <div className="site-container grid overflow-hidden rounded-2xl bg-forest text-white lg:grid-cols-2" data-reveal="media">
          <div className="image-reveal relative min-h-[420px]"><Image src="/images/company/matriz-cuiaba.jpg" alt="Matriz da Gercadi em Cuiabá" fill sizes="(max-width:1024px) 100vw, 50vw" className="object-cover" /></div>
          <div className="flex flex-col justify-center p-7 sm:p-12 lg:p-16"><p className="eyebrow eyebrow-inverse">Mais de 35 anos</p><h2 className="text-4xl font-extrabold tracking-[-.05em] sm:text-5xl">Experiência construída em movimento.</h2><p className="mt-6 max-w-lg text-base leading-7 text-white/68">O grupo Gercadi atua no transporte e na logística com equipe capacitada e presença regional para manter empresa e cliente conectados.</p><div className="mt-9"><Button asChild variant="light" size="lg"><Link href="/empresa">Conhecer nossa história <ArrowRight className="size-4" /></Link></Button></div></div>
        </div>
      </section>
    </>
  );
}
