"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, Mail, Menu, Phone } from "lucide-react";
import { mainNavigation, serviceNavigation, siteConfig } from "@/data/site";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { QuoteLink, TrackingLink } from "@/components/shared-links";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  const pathname = usePathname();
  const servicesMenuRef = useRef<HTMLDivElement>(null);
  const [servicesMenuPath, setServicesMenuPath] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const desktopPrimary = mainNavigation.filter(
    (item) => !["Express", "24 Horas", "Coleta"].includes(item.label),
  );
  const servicesActive = serviceNavigation.some(
    (item) => pathname === item.href,
  );
  const servicesOpen = servicesMenuPath === pathname;

  const isActive = (href: string) =>
    pathname === href ||
    (href !== "/" && pathname.startsWith(`${href}/`)) ||
    (href === "/nossas-unidades" && pathname.startsWith("/unidades/"));

  useEffect(() => {
    const updateHeader = () => setScrolled(window.scrollY > 24);
    updateHeader();
    window.addEventListener("scroll", updateHeader, { passive: true });
    return () => window.removeEventListener("scroll", updateHeader);
  }, []);

  useEffect(() => {
    if (!servicesOpen) return;

    const closeOnOutsideClick = (event: PointerEvent) => {
      if (!servicesMenuRef.current?.contains(event.target as Node))
        setServicesMenuPath(null);
    };
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setServicesMenuPath(null);
    };

    document.addEventListener("pointerdown", closeOnOutsideClick);
    document.addEventListener("keydown", closeOnEscape);
    return () => {
      document.removeEventListener("pointerdown", closeOnOutsideClick);
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, [servicesOpen]);

  const navClass = (active: boolean) =>
    cn("nav-link", active && "nav-link-active");

  return (
    <>
      <header
        className="pointer-events-none sticky top-0 z-40 h-20 md:h-24"
        style={{ viewTransitionName: "site-header" }}
      >
        <div className="site-container pointer-events-auto pt-2 md:pt-3">
          <div
            className={cn(
              "flex h-[4.5rem] items-center justify-between gap-3 rounded-2xl border bg-white px-3 transition-[height,box-shadow,border-color] duration-200 sm:px-5 md:h-[4.5rem]",
              scrolled
                ? "border-black/12 shadow-[0_16px_45px_rgba(9,12,10,.14)] md:h-16"
                : "border-black/8 shadow-[0_14px_45px_rgba(9,12,10,.09)]",
            )}
          >
            <Link
              href="/"
              aria-label="Gercadi — página inicial"
              className="shrink-0 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-action-red"
            >
              <Image
                src="/images/brand/gercadi-logo.png"
                alt="Gercadi Transportes e Logística — 100% Mato Grosso"
                width={1920}
                height={594}
                className={cn(
                  "h-auto w-[142px] transition-[width] duration-200 sm:w-[160px]",
                  scrolled && "md:w-[148px]",
                )}
                priority
              />
            </Link>

            <nav
              aria-label="Navegação principal"
              className="hidden items-center gap-0.5 xl:flex"
            >
              {desktopPrimary.slice(0, 3).map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  className={navClass(isActive(item.href))}
                >
                  {item.label}
                </Link>
              ))}
              <div className="relative" ref={servicesMenuRef}>
                <button
                  type="button"
                  className={navClass(servicesActive)}
                  aria-expanded={servicesOpen}
                  aria-haspopup="true"
                  aria-controls="services-navigation"
                  onClick={() =>
                    setServicesMenuPath((openPath) =>
                      openPath === pathname ? null : pathname,
                    )
                  }
                >
                  Serviços
                  <ChevronDown
                    className={cn(
                      "size-4 transition-transform duration-200",
                      servicesOpen && "rotate-180",
                    )}
                    aria-hidden="true"
                  />
                </button>
                <div
                  id="services-navigation"
                  className={cn(
                    "absolute left-0 top-full mt-3 w-56 origin-top overflow-hidden rounded-xl border border-black/8 bg-white p-2 shadow-2xl transition-[opacity,transform,visibility] duration-200",
                    servicesOpen
                      ? "visible translate-y-0 opacity-100"
                      : "invisible -translate-y-2 opacity-0",
                  )}
                >
                  {serviceNavigation.map((item, index) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      aria-current={isActive(item.href) ? "page" : undefined}
                      className={cn(
                        "flex items-center gap-3 rounded-lg px-3 py-3 text-sm font-bold text-ink transition-colors hover:bg-ivory hover:text-action-red",
                        isActive(item.href) && "bg-ivory text-action-red",
                      )}
                    >
                      <span className="font-mono text-[10px] text-muted">
                        0{index + 1}
                      </span>
                      {item.label}
                    </Link>
                  ))}
                </div>
              </div>
              {desktopPrimary.slice(3).map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  className={navClass(isActive(item.href))}
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            <div className="hidden shrink-0 items-center gap-1.5 md:flex">
              <TrackingLink size="sm" variant="ghost" className="px-3">
                Rastrear
              </TrackingLink>
              <QuoteLink size="sm">Cotação</QuoteLink>
            </div>

            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className="xl:hidden"
                  aria-label="Abrir menu"
                >
                  <Menu className="size-5" aria-hidden="true" />
                </Button>
              </SheetTrigger>
              <SheetContent className="bg-paper">
                <SheetTitle className="text-3xl tracking-[-.05em]">
                  Navegação
                </SheetTitle>
                <SheetDescription>
                  Transporte e logística em Mato Grosso.
                </SheetDescription>
                <nav
                  aria-label="Navegação móvel"
                  className="mt-8 flex flex-col"
                >
                  {mainNavigation.map((item, index) => (
                    <SheetClose asChild key={item.href}>
                      <Link
                        href={item.href}
                        aria-current={isActive(item.href) ? "page" : undefined}
                        className={cn(
                          "group flex min-h-14 items-center justify-between border-b border-border text-lg font-bold text-ink transition-colors hover:text-action-red",
                          isActive(item.href) && "text-action-red",
                        )}
                      >
                        <span>{item.label}</span>
                        <span className="font-mono text-[10px] text-muted">
                          0{index + 1}
                        </span>
                      </Link>
                    </SheetClose>
                  ))}
                  <SheetClose asChild>
                    <Link
                      href="/seja-parceiro"
                      aria-current={
                        isActive("/seja-parceiro") ? "page" : undefined
                      }
                      className={cn(
                        "flex min-h-14 items-center justify-between border-b border-border text-lg font-bold text-ink transition-colors hover:text-action-red",
                        isActive("/seja-parceiro") && "text-action-red",
                      )}
                    >
                      <span>Seja Parceiro</span>
                      <span className="font-mono text-[10px] text-muted">
                        08
                      </span>
                    </Link>
                  </SheetClose>
                </nav>
                <div className="mt-8 grid gap-3">
                  <QuoteLink className="w-full" />
                  <TrackingLink className="w-full" />
                </div>
                <div className="mt-8 space-y-3 border-t border-border pt-6 text-sm text-muted">
                  <a
                    href={siteConfig.phoneHref}
                    className="flex items-center gap-2 hover:text-ink"
                  >
                    <Phone className="size-4" aria-hidden="true" />
                    {siteConfig.phone}
                  </a>
                  <a
                    href={`mailto:${siteConfig.email}`}
                    className="flex items-center gap-2 hover:text-ink"
                  >
                    <Mail className="size-4" aria-hidden="true" />
                    {siteConfig.email}
                  </a>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>
    </>
  );
}
