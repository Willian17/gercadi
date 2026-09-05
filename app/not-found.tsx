import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <section className="section-space bg-surface">
      <div className="site-container max-w-3xl text-center">
        <p className="eyebrow">Erro 404</p>
        <h1 className="text-5xl font-bold tracking-[-0.05em] text-ink sm:text-6xl">Página não encontrada</h1>
        <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-muted">O endereço pode ter mudado. Volte para a página inicial ou consulte nossas unidades.</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3"><Button asChild size="lg"><Link href="/"><ArrowLeft className="size-4" />Voltar ao início</Link></Button><Button asChild size="lg" variant="outline"><Link href="/nossas-unidades">Ver unidades</Link></Button></div>
      </div>
    </section>
  );
}

