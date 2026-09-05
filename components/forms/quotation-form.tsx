"use client";

import { useState } from "react";
import { ArrowUpRight, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Field } from "@/components/forms/field";
import { siteConfig } from "@/data/site";
import { createWhatsappUrl, openWhatsapp } from "@/lib/whatsapp";
import { cn } from "@/lib/utils";

export function QuotationForm({ inverse = false }: { inverse?: boolean }) {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const value = (name: string) => String(data.get(name) ?? "").trim();
    const message = [
      "Olá! Gostaria de solicitar uma cotação de transporte.",
      "",
      `Nome: ${value("nome")}`,
      `Empresa: ${value("empresa") || "Não informado"}`,
      `WhatsApp: ${value("whatsapp")}`,
      `Origem: ${value("origem")}`,
      `Destino: ${value("destino")}`,
      `Tipo de carga: ${value("carga")}`,
      `Observações: ${value("observacoes") || "Sem observações"}`,
    ].join("\n");

    setSubmitted(true);
    openWhatsapp(createWhatsappUrl(siteConfig.quoteWhatsapp, message));
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={cn(
        "rounded-2xl border p-5 sm:p-8",
        inverse ? "border-white/15 bg-white text-ink" : "border-black/10 bg-white shadow-[0_28px_80px_rgba(9,12,10,0.10)]",
      )}
    >
      <div className="mb-7 flex items-center justify-between border-b border-border pb-5">
        <div><p className="text-[10px] font-extrabold uppercase tracking-[.2em] text-action-red">Cotação de transporte</p><h3 className="mt-2 text-2xl font-extrabold tracking-[-.04em]">Monte sua rota</h3></div>
        <span className="font-mono text-xs text-muted">01 → 02</span>
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <Field id="quote-origin" label="Origem *">
          <Input id="quote-origin" name="origem" autoComplete="address-level2" required placeholder="Cidade / UF" />
        </Field>
        <Field id="quote-destination" label="Destino *">
          <Input id="quote-destination" name="destino" autoComplete="off" required placeholder="Cidade / UF" />
        </Field>
        <Field id="quote-cargo" label="Tipo de carga *">
          <Input id="quote-cargo" name="carga" required placeholder="Ex.: caixas, autopeças" />
        </Field>
        <Field id="quote-company" label="Empresa">
          <Input id="quote-company" name="empresa" autoComplete="organization" placeholder="Nome da empresa" />
        </Field>
        <Field id="quote-name" label="Nome *">
          <Input id="quote-name" name="nome" autoComplete="name" required placeholder="Seu nome" />
        </Field>
        <Field id="quote-whatsapp" label="WhatsApp *">
          <Input id="quote-whatsapp" name="whatsapp" type="tel" inputMode="tel" autoComplete="tel" required placeholder="(00) 00000-0000" />
        </Field>
        <div className="sm:col-span-2">
          <Field id="quote-notes" label="Observações">
            <Textarea id="quote-notes" name="observacoes" placeholder="Peso, quantidade de volumes ou outra informação importante" />
          </Field>
        </div>
      </div>
      <Button type="submit" size="lg" className="mt-6 w-full">
        <MessageCircle className="size-5" aria-hidden="true" />
        Enviar cotação pelo WhatsApp
        <ArrowUpRight className="size-4" aria-hidden="true" />
      </Button>
      <p className="mt-4 text-sm leading-6 text-muted">
        Ao continuar, o WhatsApp será aberto com os dados preenchidos. Nenhuma informação é armazenada neste site.
      </p>
      <p aria-live="polite" className="mt-2 text-sm font-semibold text-tracking-green">
        {submitted ? "Cotação preparada. Continue o atendimento no WhatsApp." : ""}
      </p>
    </form>
  );
}
