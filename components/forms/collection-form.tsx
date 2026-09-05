"use client";

import { useState } from "react";
import { ArrowUpRight, Truck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Field } from "@/components/forms/field";
import { siteConfig } from "@/data/site";
import { createWhatsappUrl, openWhatsapp } from "@/lib/whatsapp";

const inputClass = "h-14 w-full rounded-xl border border-black/15 bg-paper px-4 text-base text-ink outline-none transition-colors focus:border-tracking-green focus:ring-2 focus:ring-tracking-green/15";

export function CollectionForm() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const value = (name: string) => String(data.get(name) ?? "").trim();
    const message = [
      "Olá! Gostaria de solicitar uma coleta.", "",
      `Nome: ${value("nome")}`,
      `Empresa: ${value("empresa")}`,
      `Telefone: ${value("telefone")}`,
      `E-mail: ${value("email") || "Não informado"}`, "",
      "COLETA",
      `Endereço: ${value("origem")}`,
      `Cidade / UF: ${value("cidadeOrigem")}`, "",
      "DESTINO",
      `Endereço: ${value("destino")}`,
      `Cidade / UF: ${value("cidadeDestino")}`, "",
      `Tipo de carga: ${value("carga")}`,
      `Peso aproximado: ${value("peso") || "Não informado"}`,
      `Observações: ${value("observacoes") || "Sem observações"}`,
    ].join("\n");
    setSubmitted(true);
    openWhatsapp(createWhatsappUrl(siteConfig.collectionWhatsapp, message));
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-2xl border border-black/10 bg-white p-5 shadow-[0_28px_80px_rgba(9,12,10,0.10)] sm:p-8">
      <fieldset>
        <legend className="mb-6 text-2xl font-extrabold tracking-[-.04em] text-ink">01. Seus dados</legend>
        <div className="grid gap-5 sm:grid-cols-2">
          <Field id="collection-name" label="Nome *"><Input id="collection-name" name="nome" autoComplete="name" required /></Field>
          <Field id="collection-company" label="Empresa *"><Input id="collection-company" name="empresa" autoComplete="organization" required /></Field>
          <Field id="collection-phone" label="Telefone / WhatsApp *"><Input id="collection-phone" name="telefone" type="tel" inputMode="tel" autoComplete="tel" required /></Field>
          <Field id="collection-email" label="E-mail"><Input id="collection-email" name="email" type="email" inputMode="email" autoComplete="email" /></Field>
        </div>
      </fieldset>

      <fieldset className="mt-8 border-t border-border pt-8">
        <legend className="px-2 text-2xl font-extrabold tracking-[-.04em] text-ink">02. Rota da coleta</legend>
        <div className="mt-5 grid gap-5 sm:grid-cols-2">
          <Field id="collection-origin-address" label="Endereço de coleta *"><Input id="collection-origin-address" name="origem" autoComplete="street-address" required /></Field>
          <Field id="collection-origin-city" label="Cidade / UF de coleta *"><Input id="collection-origin-city" name="cidadeOrigem" autoComplete="address-level2" required /></Field>
          <Field id="collection-destination-address" label="Endereço de destino *"><Input id="collection-destination-address" name="destino" autoComplete="off" required /></Field>
          <Field id="collection-destination-city" label="Cidade / UF de destino *"><Input id="collection-destination-city" name="cidadeDestino" autoComplete="off" required /></Field>
        </div>
      </fieldset>

      <fieldset className="mt-8 border-t border-border pt-8">
        <legend className="px-2 text-2xl font-extrabold tracking-[-.04em] text-ink">03. Carga</legend>
        <div className="mt-5 grid gap-5 sm:grid-cols-2">
          <Field id="collection-type" label="Tipo de carga *">
            <select id="collection-type" name="carga" required defaultValue="" className={inputClass}>
              <option value="" disabled>Selecione</option>
              <option>Carga fracionada</option><option>Coleta expressa</option><option>Coleta programada</option><option>Coleta especial</option><option>Outro tipo</option>
            </select>
          </Field>
          <Field id="collection-weight" label="Peso aproximado (kg)"><Input id="collection-weight" name="peso" type="number" inputMode="decimal" min="0" /></Field>
          <div className="sm:col-span-2"><Field id="collection-notes" label="Observações"><Textarea id="collection-notes" name="observacoes" /></Field></div>
        </div>
      </fieldset>

      <Button type="submit" size="lg" className="mt-7 w-full">
        <Truck className="size-5" aria-hidden="true" /> Solicitar coleta pelo WhatsApp <ArrowUpRight className="size-4" aria-hidden="true" />
      </Button>
      <p className="mt-4 text-sm leading-6 text-muted">O pedido será preparado e aberto no WhatsApp da equipe de coleta. Nenhuma informação é armazenada neste site.</p>
      <p aria-live="polite" className="mt-2 text-sm font-semibold text-tracking-green">{submitted ? "Solicitação preparada. Continue no WhatsApp." : ""}</p>
    </form>
  );
}
