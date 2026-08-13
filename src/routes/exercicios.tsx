import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { ArrowLeft, Search } from "lucide-react";
import { EQUIPAMENTOS, EXERCICIOS, type Equipamento } from "@/data/exercises";
import { ExercicioCard } from "@/components/CircuitoView";

export const Route = createFileRoute("/exercicios")({
  head: () => ({
    meta: [
      { title: "Biblioteca de Exercícios Funcionais na Areia | Life Training" },
      {
        name: "description",
        content:
          "Mais de 60 exercícios funcionais para treino na areia, organizados por material, com dicas técnicas e links para vídeos, gifs e imagens.",
      },
      { property: "og:title", content: "Biblioteca de Exercícios Funcionais na Areia" },
      {
        property: "og:description",
        content: "Exercícios de praia por material: cones, corda naval, kettlebell, TRX e mais.",
      },
    ],
  }),
  component: Biblioteca,
});

function Biblioteca() {
  const [filtro, setFiltro] = useState<Equipamento | "todos">("todos");
  const [busca, setBusca] = useState("");

  const lista = useMemo(
    () =>
      EXERCICIOS.filter(
        (ex) =>
          (filtro === "todos" || ex.equipamento === filtro) &&
          ex.nome.toLowerCase().includes(busca.toLowerCase()),
      ),
    [filtro, busca],
  );

  return (
    <main className="min-h-screen sand-grain pb-16">
      <div className="mx-auto max-w-2xl px-4 pt-6">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground hover:text-primary"
        >
          <ArrowLeft className="size-4" /> Voltar ao gerador
        </Link>
        <h1 className="mt-3 text-4xl">Biblioteca de exercícios</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          {EXERCICIOS.length} movimentos funcionais pensados para a areia.
        </p>

        <div className="mt-4 flex items-center gap-2 rounded-2xl border border-border bg-card px-4 py-3 shadow-soft">
          <Search className="size-4 text-muted-foreground" />
          <input
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            placeholder="Buscar exercício..."
            className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
          />
        </div>

        <div className="mt-3 flex gap-2 overflow-x-auto pb-2">
          {[{ id: "todos" as const, nome: "Todos", emoji: "🏖️" }, ...EQUIPAMENTOS].map((eq) => (
            <button
              key={eq.id}
              onClick={() => setFiltro(eq.id as Equipamento | "todos")}
              className={`shrink-0 rounded-full border px-3.5 py-2 text-sm font-semibold transition-colors ${
                filtro === eq.id
                  ? "border-transparent bg-sunset text-primary-foreground"
                  : "border-border bg-card hover:border-primary"
              }`}
            >
              <span className="mr-1">{eq.emoji}</span>
              {eq.nome}
            </button>
          ))}
        </div>

        <div className="mt-4 space-y-3">
          {lista.map((ex) => (
            <ExercicioCard key={ex.id} ex={ex} />
          ))}
          {lista.length === 0 && (
            <p className="py-10 text-center text-sm text-muted-foreground">
              Nenhum exercício encontrado.
            </p>
          )}
        </div>
      </div>
    </main>
  );
}
