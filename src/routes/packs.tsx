import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { ArrowLeft, Sparkles, Layers, Minus, Plus } from "lucide-react";
import { PACKS, type Pack } from "@/data/packs";
import { EQUIPAMENTOS, TIPOS_ALONGAMENTO, type TipoAlongamento } from "@/data/exercises";
import {
  PRESETS,
  gerarCircuito,
  gerarCircuitoUnindo,
  type Circuito,
  type Formato,
} from "@/lib/circuito";
import { CircuitoView } from "@/components/CircuitoView";
import { useImportados } from "@/lib/importados";

export const Route = createFileRoute("/packs")({
  head: () => ({
    meta: [
      { title: "Packs de treino prontos | Life Training" },
      {
        name: "description",
        content:
          "Packs prontos de circuito funcional na areia: una vários packs, escolha quantos exercícios quer de cada e inclua alongamentos.",
      },
      { property: "og:title", content: "Packs de treino funcional na areia" },
      {
        property: "og:description",
        content: "Escolha um pack ou combine vários e gere o circuito completo em um toque.",
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
  const [unir, setUnir] = useState(false);
  const [quantidades, setQuantidades] = useState<Record<string, number>>({});
  const [formato, setFormato] = useState<Formato>("intervalado");
  const [tiposAlong, setTiposAlong] = useState<TipoAlongamento[]>(["dinamico", "estatico"]);
  const [qtdAlong, setQtdAlong] = useState(4);

  const selecionados = useMemo(
    () => PACKS.filter((p) => (quantidades[p.id] ?? 0) > 0),
    [quantidades],
  );
  const totalExercicios = selecionados.reduce((t, p) => t + (quantidades[p.id] ?? 0), 0);

  const ajustar = (id: string, delta: number) =>
    setQuantidades((q) => ({ ...q, [id]: Math.max(0, Math.min(10, (q[id] ?? 0) + delta)) }));

  const rolar = () =>
    requestAnimationFrame(() =>
      document.getElementById("pack-resultado")?.scrollIntoView({ behavior: "smooth" }),
    );

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
        alongamentos: tiposAlong,
        qtdAlongamentos: tiposAlong.length ? qtdAlong : 0,
      }),
    );
    rolar();
  }

  function gerarUniao() {
    if (!selecionados.length) return;
    const preset = PRESETS[formato];
    setAtivo(null);
    setCircuito(
      gerarCircuitoUnindo(
        selecionados.map((p) => ({
          equipamentos: p.equipamentos,
          focos: p.focos,
          nivel: p.nivel,
          compostos: p.compostos,
          quantidade: quantidades[p.id] ?? 0,
        })),
        {
          nivel: 3,
          rodadas: preset.rodadas,
          trabalho: preset.trabalho,
          descanso: preset.descanso,
          formato,
          modalidade: "individual",
          compostos: true,
          alongamentos: tiposAlong,
          qtdAlongamentos: tiposAlong.length ? qtdAlong : 0,
        },
      ),
    );
    rolar();
  }

  const toggleTipo = (t: TipoAlongamento) =>
    setTiposAlong((l) => (l.includes(t) ? l.filter((v) => v !== t) : [...l, t]));

  return (
    <main className="min-h-screen sand-grain pb-16">
      <div className="mx-auto max-w-2xl px-4 pt-6">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground hover:text-primary"
        >
          <ArrowLeft className="size-4" /> Voltar ao gerador
        </Link>
        <h1 className="mt-3 text-4xl">Packs de treino</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Combinações prontas de material, foco e formato. Gere um pack sozinho ou una vários
          escolhendo quantos exercícios quer de cada.
        </p>

        <button
          onClick={() => setUnir((v) => !v)}
          className={`mt-4 flex w-full items-center justify-center gap-2 rounded-2xl border px-6 py-3.5 font-display text-lg transition ${
            unir ? "border-transparent bg-ocean text-primary-foreground" : "border-border bg-card"
          }`}
        >
          <Layers className="size-5" /> {unir ? "Modo unir packs ativo" : "Unir vários packs"}
        </button>

        {unir && (
          <section className="mt-4 rounded-3xl border border-border bg-card p-5 shadow-soft">
            <h2 className="text-2xl">Formato do circuito unido</h2>
            <div className="mt-3 grid gap-2 sm:grid-cols-2">
              {(Object.keys(PRESETS) as Formato[]).map((f) => (
                <button
                  key={f}
                  onClick={() => setFormato(f)}
                  className={`rounded-xl border p-3 text-left transition-colors ${
                    formato === f
                      ? "border-primary bg-primary/10"
                      : "border-border bg-background hover:border-primary"
                  }`}
                >
                  <p className="font-display text-lg leading-none">{PRESETS[f].nome}</p>
                  <p className="mt-1 text-xs text-muted-foreground">{PRESETS[f].descricao}</p>
                </button>
              ))}
            </div>
          </section>
        )}

        <section className="mt-4 rounded-3xl border border-border bg-card p-5 shadow-soft">
          <h2 className="text-2xl">Alongamentos</h2>
          <div className="mt-3 flex flex-wrap gap-2">
            {TIPOS_ALONGAMENTO.map((t) => {
              const on = tiposAlong.includes(t.id);
              return (
                <button
                  key={t.id}
                  onClick={() => toggleTipo(t.id)}
                  className={`rounded-full border px-3.5 py-2 text-sm font-semibold transition-colors ${
                    on
                      ? "border-transparent bg-accent text-accent-foreground"
                      : "border-border bg-background hover:border-accent"
                  }`}
                >
                  {t.emoji} {t.nome}
                </button>
              );
            })}
          </div>
          <div className="mt-4 flex items-center justify-between">
            <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              Quantidade
            </p>
            <span className="font-display text-2xl text-accent">
              {tiposAlong.length ? qtdAlong : 0}
            </span>
          </div>
          <input
            type="range"
            min={0}
            max={10}
            value={qtdAlong}
            disabled={tiposAlong.length === 0}
            onChange={(e) => setQtdAlong(Number(e.target.value))}
            className="mt-2 w-full accent-[oklch(0.652_0.178_44)] disabled:opacity-40"
          />
        </section>

        <div className="mt-4 space-y-3">
          {PACKS.map((p) => (
            <article
              key={p.id}
              className={`rounded-2xl border bg-card p-4 shadow-soft transition-colors ${
                ativo?.id === p.id || (quantidades[p.id] ?? 0) > 0
                  ? "border-primary"
                  : "border-border"
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

              {unir ? (
                <div className="mt-3 flex items-center justify-between rounded-2xl border border-border bg-background px-3 py-2">
                  <span className="text-sm font-semibold text-muted-foreground">
                    Exercícios deste pack
                  </span>
                  <div className="flex items-center gap-3">
                    <button
                      aria-label={`Menos exercícios de ${p.nome}`}
                      onClick={() => ajustar(p.id, -1)}
                      className="flex size-9 items-center justify-center rounded-full border border-border"
                    >
                      <Minus className="size-4" />
                    </button>
                    <span className="w-6 text-center font-display text-2xl text-primary">
                      {quantidades[p.id] ?? 0}
                    </span>
                    <button
                      aria-label={`Mais exercícios de ${p.nome}`}
                      onClick={() => ajustar(p.id, 1)}
                      className="flex size-9 items-center justify-center rounded-full bg-sunset text-primary-foreground"
                    >
                      <Plus className="size-4" />
                    </button>
                  </div>
                </div>
              ) : (
                <button
                  onClick={() => gerar(p)}
                  className="mt-3 flex w-full items-center justify-center gap-2 rounded-2xl bg-sunset px-6 py-3 font-display text-lg text-primary-foreground shadow-lift"
                >
                  <Sparkles className="size-4" /> Gerar este pack
                </button>
              )}
            </article>
          ))}
        </div>

        {unir && (
          <div className="sticky bottom-3 mt-4">
            <button
              onClick={gerarUniao}
              disabled={totalExercicios === 0}
              className="flex w-full items-center justify-center gap-2 rounded-2xl bg-sunset px-6 py-4 font-display text-2xl text-primary-foreground shadow-lift disabled:opacity-50"
            >
              <Sparkles className="size-5" /> Unir {selecionados.length} packs ·{" "}
              {totalExercicios} exercícios
            </button>
          </div>
        )}

        <div id="pack-resultado" className="mt-6 scroll-mt-4">
          {circuito && (
            <CircuitoView
              circuito={circuito}
              onRegenerar={ativo ? () => gerar(ativo) : gerarUniao}
            />
          )}
        </div>
      </div>
    </main>
  );
}
