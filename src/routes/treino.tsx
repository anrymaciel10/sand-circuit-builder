import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo } from "react";
import { ArrowLeft, Waves } from "lucide-react";
import { CircuitoView } from "@/components/CircuitoView";
import { desserializarCircuito } from "@/lib/circuito";

type Busca = { d?: string };

export const Route = createFileRoute("/treino")({
  validateSearch: (search: Record<string, unknown>): Busca => ({
    d: typeof search["d"] === "string" ? search["d"] : undefined,
  }),
  head: () => ({
    meta: [
      { title: "Treino compartilhado | Life Training" },
      {
        name: "description",
        content: "Circuito funcional na areia compartilhado pelo seu professor do Life Training.",
      },
      { property: "og:title", content: "Treino compartilhado | Life Training" },
      {
        property: "og:description",
        content: "Veja as estações, tempos e vídeos do circuito funcional na areia.",
      },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: TreinoCompartilhado,
});

function TreinoCompartilhado() {
  const { d } = Route.useSearch();
  const circuito = useMemo(() => (d ? desserializarCircuito(d) : null), [d]);

  return (
    <main className="min-h-screen sand-grain pb-16">
      <div className="mx-auto max-w-2xl px-4 pt-6">
        <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.25em] text-primary">
          <Waves className="size-4" /> Life Training
        </p>
        <h1 className="mt-2 text-4xl">Treino compartilhado</h1>

        <div className="mt-5">
          {circuito ? (
            <CircuitoView circuito={circuito} />
          ) : (
            <p className="rounded-2xl border border-border bg-card p-5 text-sm text-muted-foreground">
              Link inválido ou expirado. Peça um novo link ao professor.
            </p>
          )}
        </div>

        <Link
          to="/"
          className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground hover:text-primary"
        >
          <ArrowLeft className="size-4" /> Montar meu próprio circuito
        </Link>
      </div>
    </main>
  );
}
