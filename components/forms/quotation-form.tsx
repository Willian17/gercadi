"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, ArrowUpRight, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Field } from "@/components/forms/field";
import { siteConfig } from "@/data/site";
import { createWhatsappUrl, openWhatsapp } from "@/lib/whatsapp";
import { cn } from "@/lib/utils";

type QuotationFormService = "quote" | "collection";

export function QuotationForm({
  inverse = false,
  defaultDestination,
  service = "quote",
}: {
  inverse?: boolean;
  defaultDestination?: string;
  service?: QuotationFormService;
}) {
  const [step, setStep] = useState<1 | 2>(1);
  const [submitted, setSubmitted] = useState(false);
  const contactHeadingRef = useRef<HTMLHeadingElement>(null);
  const isCollection = service === "collection";
  const serviceLabel = isCollection ? "Solicitação de coleta" : "Cotação de transporte";
  const formTitle = isCollection ? "Organize sua coleta" : "Monte sua rota";
  const routePrompt = isCollection ? "De onde para onde vai sua carga?" : "Para onde sua carga vai?";
  const routeDescription = isCollection
    ? "Informe a rota e o tipo de carga para iniciarmos sua solicitação."
    : "Informe a rota e o tipo de carga para iniciarmos sua cotação.";

  useEffect(() => {
    if (step === 2) {
      contactHeadingRef.current?.focus();
    }
  }, [step]);

  function goToContactStep(form: HTMLFormElement | null) {
    if (!form) return;

    const invalidField = Array.from(
      form.querySelectorAll<HTMLInputElement>('[data-quote-step="1"] input'),
    ).find((field) => !field.checkValidity());

    if (invalidField) {
      invalidField.focus();
      invalidField.reportValidity();
      return;
    }

    setStep(2);
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;

    if (step === 1) {
      goToContactStep(form);
      return;
    }

    const value = (name: string) => {
      const control = form.elements.namedItem(name);

      if (
        control instanceof HTMLInputElement ||
        control instanceof HTMLTextAreaElement ||
        control instanceof HTMLSelectElement
      ) {
        return control.value.trim();
      }

      return "";
    };
    const message = [
      isCollection ? "Olá! Gostaria de solicitar uma coleta." : "Olá! Gostaria de solicitar uma cotação de transporte.",
      "",
      "Nome: " + value("nome"),
      "Empresa: " + (value("empresa") || "Não informado"),
      "WhatsApp: " + value("whatsapp"),
      "Origem: " + value("origem"),
      "Destino: " + value("destino"),
      "Tipo de carga: " + value("carga"),
      "Observações: " + (value("observacoes") || "Sem observações"),
    ].join("\n");

    setSubmitted(true);
    openWhatsapp(createWhatsappUrl(isCollection ? siteConfig.collectionWhatsapp : siteConfig.quoteWhatsapp, message));
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={cn(
        "rounded-2xl border p-5 sm:p-8",
        inverse ? "border-white/15 bg-white text-ink" : "border-black/10 bg-white shadow-[0_28px_80px_rgba(9,12,10,0.10)]",
      )}
    >
      <div className="mb-7 flex items-start justify-between gap-4 border-b border-border pb-5">
        <div>
          <p className="text-[10px] font-extrabold uppercase tracking-[.2em] text-action-red">{serviceLabel}</p>
          <h3 className="mt-2 text-2xl font-extrabold tracking-[-.04em]">{formTitle}</h3>
        </div>
        <span className="pt-1 font-mono text-xs text-muted" aria-label={"Etapa " + step + " de 2"}>
          0{step} / 02
        </span>
      </div>

      <ol className="mb-7 grid grid-cols-2 gap-3" aria-label="Etapas da cotação">
        {[
          { number: 1, label: "Rota" },
          { number: 2, label: "Contato" },
        ].map(({ number, label }) => {
          const isCurrent = step === number;
          const isComplete = step > number;

          return (
            <li
              key={number}
              aria-current={isCurrent ? "step" : undefined}
              className={cn(
                "flex items-center gap-2 border-t pt-3 text-xs font-bold uppercase tracking-[.13em]",
                isCurrent ? "border-action-red text-ink" : isComplete ? "border-tracking-green text-tracking-green" : "border-border text-muted",
              )}
            >
              <span
                className={cn(
                  "grid size-5 place-items-center rounded-full text-[10px]",
                  isCurrent ? "bg-action-red text-white" : isComplete ? "bg-tracking-green text-white" : "bg-muted/15 text-muted",
                )}
              >
                {number}
              </span>
              {label}
            </li>
          );
        })}
      </ol>

      <fieldset data-quote-step="1" disabled={step !== 1} hidden={step !== 1}>
        <legend className="sr-only">Dados da rota</legend>
        <div className="mb-5">
          <p className="text-sm font-bold">{routePrompt}</p>
          <p className="mt-1 text-sm leading-6 text-muted">{routeDescription}</p>
        </div>
        <div className="grid gap-5 sm:grid-cols-2">
          <Field id="quote-origin" label="Origem *">
            <Input id="quote-origin" name="origem" autoComplete="address-level2" required placeholder="Cidade / UF" />
          </Field>
          <Field id="quote-destination" label="Destino *">
            <Input id="quote-destination" name="destino" autoComplete="off" required placeholder="Cidade / UF" defaultValue={defaultDestination} />
          </Field>
          <div className="sm:col-span-2">
            <Field id="quote-cargo" label="Tipo de carga *">
              <Input id="quote-cargo" name="carga" required placeholder="Ex.: caixas, autopeças" />
            </Field>
          </div>
        </div>
      </fieldset>

      <fieldset data-quote-step="2" disabled={step !== 2} hidden={step !== 2}>
        <legend className="sr-only">Seus dados de contato</legend>
        <div className="mb-5">
          <h4 ref={contactHeadingRef} tabIndex={-1} className="text-sm font-bold outline-none">
            Como podemos falar com você?
          </h4>
          <p className="mt-1 text-sm leading-6 text-muted">Enviaremos os dados diretamente para o atendimento da Gercadi no WhatsApp.</p>
        </div>
        <div className="grid gap-5 sm:grid-cols-2">
          <Field id="quote-name" label="Nome *">
            <Input id="quote-name" name="nome" autoComplete="name" required placeholder="Seu nome" />
          </Field>
          <Field id="quote-whatsapp" label="WhatsApp *">
            <Input id="quote-whatsapp" name="whatsapp" type="tel" inputMode="tel" autoComplete="tel" required placeholder="(00) 00000-0000" />
          </Field>
          <div className="sm:col-span-2">
            <Field id="quote-company" label="Empresa">
              <Input id="quote-company" name="empresa" autoComplete="organization" placeholder="Nome da empresa" />
            </Field>
          </div>
          <div className="sm:col-span-2">
            <Field id="quote-notes" label="Observações">
              <Textarea id="quote-notes" name="observacoes" placeholder="Peso, quantidade de volumes ou outra informação importante" />
            </Field>
          </div>
        </div>
      </fieldset>

      <div className={cn("mt-6 grid gap-3", step === 2 && "sm:grid-cols-2")}>
        {step === 1 ? (
          <Button type="button" size="lg" className="w-full" onClick={(event) => goToContactStep(event.currentTarget.form)}>
            Continuar para contato
            <ArrowRight className="size-4" aria-hidden="true" />
          </Button>
        ) : (
          <>
            <Button type="button" size="lg" variant="outline" className="w-full" onClick={() => setStep(1)}>
              <ArrowLeft className="size-4" aria-hidden="true" />
              Voltar para rota
            </Button>
            <Button type="submit" size="lg" className="w-full">
              <MessageCircle className="size-5" aria-hidden="true" />
              Enviar pelo WhatsApp
              <ArrowUpRight className="size-4" aria-hidden="true" />
            </Button>
          </>
        )}
      </div>
      <p className="mt-4 text-sm leading-6 text-muted">
        Ao continuar, o WhatsApp será aberto com os dados preenchidos. Nenhuma informação é armazenada neste site.
      </p>
      <p aria-live="polite" className="mt-2 text-sm font-semibold text-tracking-green">
        {submitted
          ? isCollection
            ? "Solicitação preparada. Continue o atendimento no WhatsApp."
            : "Cotação preparada. Continue o atendimento no WhatsApp."
          : ""}
      </p>
    </form>
  );
}
