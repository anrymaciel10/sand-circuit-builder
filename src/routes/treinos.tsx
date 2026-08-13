import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ArrowLeft, CalendarDays, Heart, Trash2 } from "lucide-react";
import { EXERCICIOS } from "@/data/exercises";
import { CircuitoView, ExercicioCard, useFavoritos } from "@/components/CircuitoView";
import { circuitoDoTreino, listarTreinos, removerTreino, type TreinoSalvo } from "@/lib/storage";
import type { Circuito } from "@/lib/circuito";

export const Route = createFileRoute("/treinos")({
  head: () => ({
    meta: [
      { title: "Meus treinos e exercícios favoritos | Life Training" },
      {
        name: "description",
        content:
          "Reutilize circuitos funcionais salvos, exporte em PDF e acesse seus exercícios de areia favoritos.",
      },
      { property: "og:title", content: "Meus treinos salvos | Life Training" },
      {
        property: "og:description",
        content: "Circuitos funcionais salvos e exercícios favoritos para o treino na areia.",
      },
    ],
  }),
  component: MeusTreinos,
});

function MeusTreinos() {
  const [treinos, setTreinos] = useState<TreinoSalvo[]>([]);
  const [aberto, setAberto] = useState<Circuito | null>(null);
  const [aba, setAba] = useState<"treinos" | "favoritos">("treinos");
  const { favoritos, alternar } = useFavoritos();

  useEffect(() => setTreinos(listarTreinos()), []);

  const excluir = (id: string) => {
    removerTreino(id);
    setTreinos(listarTreinos());
    setAberto(null);
  };

  const favoritados = EXERCICIOS.filter((ex) => favoritos.includes(ex.id));

  return (
    <main className="min-h-screen sand-grain pb-16">
      <div className="mx-auto max-w-2xl px-4 pt-6">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground hover:text-primary"
        >
          <ArrowLeft className="size-4" /> Voltar ao gerador
        </Link>
        <h1 className="mt-3 text-4xl">Minha biblioteca</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Treinos e favoritos ficam salvos neste dispositivo.
        </p>

        <div className="mt-4 grid grid-cols-2 gap-2">
          {(["treinos", "favoritos"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setAba(t)}
              className={`rounded-xl border py-2.5 text-sm font-semibold capitalize transition-colors ${
                aba === t
                  ? "border-transparent bg-sunset text-primary-foreground"
                  : "border-border bg-card hover:border-primary"
              }`}
            >
              {t === "treinos" ? `Treinos (${treinos.length})` : `Favoritos (${favoritados.length})`}
            </button>
          ))}
        </div>

        {aba === "treinos" && (
          <div className="mt-4 space-y-3">
            {treinos.length === 0 && (
              <p className="py-10 text-center text-sm text-muted-foreground">
                Nenhum treino salvo ainda. Gere um circuito e toque em “Salvar”.
              </p>
            )}
            {treinos.map((t) => (
              <div key={t.id} className="rounded-2xl border border-border bg-card p-4 shadow-soft">
                <div className="flex items-center gap-3">
                  <div className="min-w-0 flex-1">
                    <h2 className="truncate text-xl">{t.nome}</h2>
                    <p className="mt-0.5 flex items-center gap-1.5 text-xs text-muted-foreground">
                      <CalendarDays className="size-3.5" />
                      {new Date(t.criadoEm).toLocaleDateString("pt-BR")}
                    </p>
                  </div>
                  <button
                    onClick={() => setAberto(circuitoDoTreino(t))}
                    className="rounded-xl bg-sunset px-4 py-2 text-sm font-semibold text-primary-foreground"
                  >
                    Abrir
                  </button>
                  <button
                    onClick={() => excluir(t.id)}
                    aria-label="Excluir treino"
                    className="rounded-xl border border-border p-2 text-muted-foreground hover:text-destructive"
                  >
                    <Trash2 className="size-4" />
                  </button>
                </div>
              </div>
            ))}

            {aberto && (
              <div className="pt-2">
                <CircuitoView circuito={aberto} />
              </div>
            )}
          </div>
        )}

        {aba === "favoritos" && (
          <div className="mt-4 space-y-3">
            {favoritados.length === 0 && (
              <p className="py-10 text-center text-sm text-muted-foreground">
                <Heart className="mx-auto mb-2 size-6 text-primary" />
                Toque no coração de um exercício para salvá-lo aqui.
              </p>
            )}
            {favoritados.map((ex) => (
              <ExercicioCard key={ex.id} ex={ex} favorito onFavoritar={() => alternar(ex.id)} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
