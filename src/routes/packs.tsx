import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowLeft, Sparkles } from "lucide-react";
import { PACKS, type Pack } from "@/data/packs";
import { EQUIPAMENTOS } from "@/data/exercises";
import { PRESETS, gerarCircuito, type Circuito } from "@/lib/circuito";
import { CircuitoView } from "@/components/CircuitoView";
import { useImportados } from "@/lib/importados";

export const Route = createFileRoute("/packs")({
  head: () => ({
    meta: [
      { title: "Packs de treino prontos | Life Training" },
      {
        name: "description",
        content:
          "Packs prontos de circuito funcional na areia: queima rápida, força, core, agilidade, desafio em dupla e metcon avançado.",
      },
      { property: "og:title", content: "Packs de treino funcional na areia" },
      {
        property: "og:description",
        content: "Escolha um pack e gere o circuito completo em um toque.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Packs,
});

function Packs() {
  useImportados();
  const [circuito, setCircuito] = useState<Circuito | null>(null);
  const [ativo, setAtivo] = useState<Pack | null>(null);

  function gerar(pack: Pack) {
    const preset = PRESETS[pack.formato];
    setAtivo(pack);
    setCircuito(
      gerarCircuito({
        equipamentos: pack.equipamentos,
        focos: pack.focos,
        nivel: pack.nivel,
        estacoes: pack.estacoes,
        rodadas: preset.rodadas,
        trabalho: preset.trabalho,
        descanso: preset.descanso,
        formato: pack.formato,
        modalidade: pack.modalidade,
        compostos: pack.compostos,
      }),
    );
    requestAnimationFrame(() =>
      document.getElementById("pack-resultado")?.scrollIntoView({ behavior: "smooth" }),
    );
  }

  return (
    <main className="min-h-screen sand-grain pb-16">
      <div className="mx-auto max-w-2xl px-4 pt-6">
        <Link to="/" className="inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground hover:text-primary">
          <ArrowLeft className="size-4" /> Voltar ao gerador
        </Link>
        <h1 className="mt-3 text-4xl">Packs de treino</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Combinações prontas de material, foco e formato. Toque em gerar e o circuito sai completo.
        </p>

        <div className="mt-4 space-y-3">
          {PACKS.map((p) => (
            <article
              key={p.id}
              className={`rounded-2xl border bg-card p-4 shadow-soft transition-colors ${
                ativo?.id === p.id ? "border-primary" : "border-border"
              }`}
            >
              <div className="flex items-start gap-3">
                <span className="text-3xl">{p.emoji}</span>
                <div className="flex-1">
                  <h2 className="text-xl leading-tight">{p.nome}</h2>
                  <p className="text-sm text-muted-foreground">{p.descricao}</p>
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    <span className="rounded-full bg-secondary/60 px-2 py-0.5 text-[11px] font-semibold">
                      {PRESETS[p.formato].nome}
                    </span>
                    <span className="rounded-full bg-secondary/60 px-2 py-0.5 text-[11px] font-semibold">
                      {p.duracao}
                    </span>
                    <span className="rounded-full bg-secondary/60 px-2 py-0.5 text-[11px] font-semibold">
                      {p.modalidade}
                    </span>
                    <span className="rounded-full bg-secondary/60 px-2 py-0.5 text-[11px] font-semibold">
                      {p.nivel === 1 ? "Iniciante" : p.nivel === 2 ? "Intermediário" : "Avançado"}
                    </span>
                  </div>
                  <p className="mt-2 text-xs text-muted-foreground">
                    Material:{" "}
                    {p.equipamentos
                      .map((id) => EQUIPAMENTOS.find((e) => e.id === id)?.nome ?? id)
                      .join(", ")}
                  </p>
                </div>
              </div>
              <button
                onClick={() => gerar(p)}
                className="mt-3 flex w-full items-center justify-center gap-2 rounded-2xl bg-sunset px-6 py-3 font-display text-lg text-primary-foreground shadow-lift"
              >
                <Sparkles className="size-4" /> Gerar este pack
              </button>
            </article>
          ))}
        </div>

        <div id="pack-resultado" className="mt-6 scroll-mt-4">
          {circuito && ativo && <CircuitoView circuito={circuito} onRegenerar={() => gerar(ativo)} />}
        </div>
      </div>
    </main>
  );
}
