"use client";

import { useSearchParams } from "next/navigation";
import { QuotationForm } from "@/components/forms/quotation-form";

export function QuotationFormWithDestination() {
  const destination = useSearchParams().get("destino")?.slice(0, 100);

  return <QuotationForm defaultDestination={destination} />;
}
