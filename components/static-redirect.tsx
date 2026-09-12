"use client";

import { useEffect } from "react";

type StaticRedirectProps = {
  destination: string;
};

export function StaticRedirect({ destination }: StaticRedirectProps) {
  useEffect(() => {
    window.location.replace(destination);
  }, [destination]);

  return (
    <main className="site-container flex min-h-screen flex-col items-start justify-center gap-4 py-16">
      <h1 className="text-3xl font-bold text-ink">Redirecionando...</h1>
      <p className="text-muted">Esta página mudou de endereço.</p>
      <a className="font-semibold text-action-red underline" href={destination}>
        Continuar para a nova página
      </a>
    </main>
  );
}
