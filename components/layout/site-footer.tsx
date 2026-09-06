import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, ExternalLink, Mail, MapPin, Phone } from "lucide-react";
import { mainNavigation, siteConfig } from "@/data/site";
import { QuoteLink, TrackingLink } from "@/components/shared-links";

export function SiteFooter() {
  return (
    <footer className="route-grid bg-carbon-deep text-white">
      <div className="site-container border-b border-white/15 py-16 sm:py-24">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7" data-reveal><p className="text-[10px] font-extrabold uppercase tracking-[.24em] text-white/50">Gercadi Transportes e Logística</p><h2 className="display-condensed mt-6 text-[clamp(3.5rem,6.5vw,6rem)] uppercase">A próxima rota<br /><span className="text-white/30">começa aqui.</span></h2></div>
          <div className="grid gap-3 lg:col-span-4 lg:col-start-9"><QuoteLink size="lg" className="w-full" /><TrackingLink size="lg" variant="light" className="w-full" /></div>
        </div>
      </div>

      <div className="site-container grid gap-12 py-14 md:grid-cols-2 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <Image src="/images/brand/gercadi-logo.png" alt="Gercadi Transportes e Logística" width={1920} height={594} sizes="220px" className="h-auto w-[220px] rounded-lg bg-white p-2" />
          <p className="mt-6 max-w-sm text-sm leading-6 text-white/60">Mais de 35 anos conectando empresas e cidades com soluções em transporte e logística em Mato Grosso.</p>
          <div className="mt-7 flex gap-5 text-xs font-bold uppercase tracking-[.12em]"><a href={siteConfig.facebook} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 hover:text-action-red">Facebook <ExternalLink className="size-3" /></a><a href={siteConfig.instagram} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 hover:text-action-red">Instagram <ExternalLink className="size-3" /></a></div>
        </div>
        <div className="lg:col-span-3 lg:col-start-6"><h2 className="footer-title">Navegação</h2><ul className="mt-6 grid grid-cols-2 gap-x-6 gap-y-3 text-sm text-white/65">{mainNavigation.map((item)=><li key={item.href}><Link href={item.href} className="hover:text-white">{item.label}</Link></li>)}<li><Link href="/seja-parceiro" className="hover:text-white">Seja Parceiro</Link></li></ul></div>
        <div className="lg:col-span-4 lg:col-start-9"><h2 className="footer-title">Base de contato</h2><ul className="mt-6 space-y-4 text-sm text-white/65"><li><a href={siteConfig.phoneHref} className="flex gap-3 hover:text-white"><Phone className="size-4 text-action-red" />{siteConfig.phone}</a></li><li><a href={`mailto:${siteConfig.email}`} className="flex gap-3 break-all hover:text-white"><Mail className="size-4 text-action-red" />{siteConfig.email}</a></li><li className="flex gap-3"><MapPin className="size-4 text-action-red" />Matriz em Cuiabá, Mato Grosso</li><li><a href={siteConfig.coverageSheetUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 font-bold text-white">Cidades atendidas <ArrowUpRight className="size-4" /></a></li></ul></div>
      </div>

      <div className="border-t border-white/10"><div className="site-container flex flex-col gap-3 py-5 text-[10px] font-bold uppercase tracking-[.12em] text-white/35 sm:flex-row sm:justify-between"><p>© {new Date().getFullYear()} Gercadi. Todos os direitos reservados.</p><p>100% Mato Grosso</p></div></div>
    </footer>
  );
}
