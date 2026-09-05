"use client";

import Image from "next/image";
import Link from "next/link";
import { ChevronDown, Mail, Menu, Phone } from "lucide-react";
import { mainNavigation, serviceNavigation, siteConfig } from "@/data/site";
import { Button } from "@/components/ui/button";
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { QuoteLink, TrackingLink } from "@/components/shared-links";

export function SiteHeader() {
  const desktopPrimary = mainNavigation.filter((item) => !["Express", "24 Horas", "Coleta"].includes(item.label));

  return (
    <header className="sticky top-0 z-40 bg-paper/95 py-2 backdrop-blur-xl md:py-3">
      <div className="site-container">
        <div className="flex min-h-18 items-center justify-between gap-4 rounded-2xl border border-black/8 bg-white px-3 shadow-[0_14px_45px_rgba(9,12,10,.09)] sm:px-5">
          <Link href="/" aria-label="Gercadi — página inicial" className="shrink-0 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-action-red">
            <Image src="/images/brand/gercadi-logo.png" alt="Gercadi Transportes e Logística — 100% Mato Grosso" width={1920} height={594} className="h-auto w-[150px] sm:w-[178px]" priority />
          </Link>

          <nav aria-label="Navegação principal" className="hidden items-center gap-0.5 xl:flex">
            {desktopPrimary.slice(0, 3).map((item) => <Link key={item.href} href={item.href} className="nav-link">{item.label}</Link>)}
            <details className="group relative">
              <summary className="nav-link flex list-none items-center gap-1">Serviços <ChevronDown className="size-4 transition-transform group-open:rotate-180" aria-hidden="true" /></summary>
              <div className="absolute left-0 top-full mt-3 w-56 rounded-xl border border-black/8 bg-white p-2 shadow-2xl">
                {serviceNavigation.map((item, index) => (
                  <Link key={item.href} href={item.href} className="flex items-center gap-3 rounded-lg px-3 py-3 text-sm font-bold text-ink transition-colors hover:bg-ivory hover:text-action-red">
                    <span className="font-mono text-[10px] text-muted">0{index + 1}</span>{item.label}
                  </Link>
                ))}
              </div>
            </details>
            {desktopPrimary.slice(3).map((item) => <Link key={item.href} href={item.href} className="nav-link">{item.label}</Link>)}
          </nav>

          <div className="hidden shrink-0 items-center gap-2 md:flex"><TrackingLink size="sm" variant="outline" /><QuoteLink size="sm" /></div>

          <Sheet>
            <SheetTrigger asChild><Button variant="outline" size="icon" className="xl:hidden" aria-label="Abrir menu"><Menu className="size-5" aria-hidden="true" /></Button></SheetTrigger>
            <SheetContent className="bg-paper">
              <SheetTitle className="text-3xl tracking-[-.05em]">Navegação</SheetTitle>
              <SheetDescription>Transporte e logística em Mato Grosso.</SheetDescription>
              <nav aria-label="Navegação móvel" className="mt-8 flex flex-col">
                {mainNavigation.map((item, index) => (
                  <SheetClose asChild key={item.href}><Link href={item.href} className="group flex min-h-14 items-center justify-between border-b border-border text-lg font-bold text-ink hover:text-action-red"><span>{item.label}</span><span className="font-mono text-[10px] text-muted">0{index + 1}</span></Link></SheetClose>
                ))}
                <SheetClose asChild><Link href="/seja-parceiro" className="flex min-h-14 items-center justify-between border-b border-border text-lg font-bold text-ink hover:text-action-red"><span>Seja Parceiro</span><span className="font-mono text-[10px] text-muted">08</span></Link></SheetClose>
              </nav>
              <div className="mt-8 grid gap-3"><QuoteLink className="w-full" /><TrackingLink className="w-full" /></div>
              <div className="mt-8 space-y-3 border-t border-border pt-6 text-sm text-muted">
                <a href={siteConfig.phoneHref} className="flex items-center gap-2 hover:text-ink"><Phone className="size-4" aria-hidden="true" />{siteConfig.phone}</a>
                <a href={`mailto:${siteConfig.email}`} className="flex items-center gap-2 hover:text-ink"><Mail className="size-4" aria-hidden="true" />{siteConfig.email}</a>
              </div>
            </SheetContent>
          </Sheet>
        </div>

        <div className="mt-2 grid grid-cols-2 overflow-hidden rounded-xl shadow-lg md:hidden"><QuoteLink className="rounded-none" size="sm" /><TrackingLink className="rounded-none" size="sm" /></div>
      </div>
    </header>
  );
}
