import type { ReactNode } from "react";
import Link from "next/link";
import { ExternalLink, MessageCircle, PackageSearch } from "lucide-react";
import { Button, type ButtonProps } from "@/components/ui/button";
import { createWhatsappUrl } from "@/lib/whatsapp";
import { siteConfig } from "@/data/site";

type LinkButtonProps = {
  children?: ReactNode;
  className?: string;
  variant?: ButtonProps["variant"];
  size?: ButtonProps["size"];
};

export function QuoteLink({
  children = "Solicitar Cotação",
  className,
  variant = "default",
  size,
}: LinkButtonProps) {
  return (
    <Button asChild className={className} variant={variant} size={size}>
      <Link href="/cotacao">
        <MessageCircle className="size-4" aria-hidden="true" />
        {children}
      </Link>
    </Button>
  );
}

export function DirectWhatsappLink({
  message,
  phone = siteConfig.quoteWhatsapp,
  children = "Falar no WhatsApp",
  className,
  variant = "default",
  size,
}: LinkButtonProps & { message: string; phone?: string }) {
  return (
    <Button asChild className={className} variant={variant} size={size}>
      <a
        href={createWhatsappUrl(phone, message)}
        target="_blank"
        rel="noopener noreferrer"
      >
        <MessageCircle className="size-4" aria-hidden="true" />
        {children}
      </a>
    </Button>
  );
}

export function TrackingLink({
  children = "Rastrear Carga",
  className,
  variant = "tracking",
  size,
}: LinkButtonProps) {
  return (
    <Button asChild className={className} variant={variant} size={size}>
      <a
        href={siteConfig.trackingUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Rastrear carga no sistema SSW — abre em nova aba"
      >
        <PackageSearch className="size-4" aria-hidden="true" />
        {children}
        <ExternalLink className="size-3.5 opacity-70" aria-hidden="true" />
      </a>
    </Button>
  );
}

