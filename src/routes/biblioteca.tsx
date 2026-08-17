import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { ArrowLeft, Search, ChevronDown } from "lucide-react";
import { EQUIPAMENTOS, EXERCICIOS, type Equipamento } from "@/data/exercises";
import { ExercicioCard } from "@/components/CircuitoView";
import { useImportados } from "@/lib/importados";

export const Route = createFileRoute("/biblioteca")({
  head: () => ({
    meta: [
      { title: "Biblioteca por material | Life Training" },
      {
        name: "description",
        content:
          "Todos os exercícios funcionais na areia organizados por material: cones, kettlebell, corda naval, TRX, escada de agilidade e muito mais.",
      },
      { property: "og:title", content: "Biblioteca de exercícios por material" },
      {
        property: "og:description",
        content: "Escolha o material disponível e veja todos os exercícios possíveis na areia.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: BibliotecaMaterial,
});

function BibliotecaMaterial() {
  const { lista: importados } = useImportados();
  const [aberto, setAberto] = useState<Equipamento | null>(null);
  const [busca, setBusca] = useState("");

  const base = useMemo(() => [...EXERCICIOS, ...importados], [importados]);

  const porMaterial = useMemo(
    () =>
      EQUIPAMENTOS.map((eq) => ({
        ...eq,
        exercicios: base.filter(
          (ex) =>
            ex.equipamento === eq.id &&
            ex.nome.toLowerCase().includes(busca.trim().toLowerCase()),
        ),
      })),
    [base, busca],
  );

  return (
    <main className="min-h-screen sand-grain pb-16">
      <div className="mx-auto max-w-2xl px-4 pt-6">
        <Link to="/" className="inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground hover:text-primary">
          <ArrowLeft className="size-4" /> Voltar ao gerador
        </Link>
        <h1 className="mt-3 text-4xl">Biblioteca por material</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          {base.length} exercícios divididos entre {EQUIPAMENTOS.length} materiais. Toque em um
          material para ver tudo o que dá para fazer com ele na areia.
        </p>

        <div className="mt-4 flex items-center gap-2 rounded-2xl border border-border bg-card px-4 py-3 shadow-soft">
          <Search className="size-4 text-muted-foreground" />
          <input
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            placeholder="Buscar exercício em todos os materiais..."
            className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
          />
        </div>

        <div className="mt-4 space-y-3">
          {porMaterial.map((m) => {
            const expandido = aberto === m.id || (busca.trim().length > 1 && m.exercicios.length > 0);
            return (
              <section key={m.id} className="rounded-2xl border border-border bg-card shadow-soft">
                <button
                  onClick={() => setAberto(aberto === m.id ? null : m.id)}
                  className="flex w-full items-center justify-between gap-3 px-4 py-3.5 text-left"
                >
                  <span className="flex items-center gap-3">
                    <span className="text-2xl">{m.emoji}</span>
                    <span>
                      <span className="block font-display text-xl leading-none">{m.nome}</span>
                      <span className="text-xs text-muted-foreground">
                        {m.exercicios.length} exercício{m.exercicios.length === 1 ? "" : "s"}
                      </span>
                    </span>
                  </span>
                  <ChevronDown
                    className={`size-5 shrink-0 text-muted-foreground transition-transform ${expandido ? "rotate-180" : ""}`}
                  />
                </button>
                {expandido && (
                  <div className="space-y-3 border-t border-border p-4">
                    {m.exercicios.map((ex) => (
                      <ExercicioCard key={ex.id} ex={ex} />
                    ))}
                    {m.exercicios.length === 0 && (
                      <p className="text-sm text-muted-foreground">Nada encontrado neste material.</p>
                    )}
                  </div>
                )}
              </section>
            );
          })}
        </div>
      </div>
    </main>
  );
}
