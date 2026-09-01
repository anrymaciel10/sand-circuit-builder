import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState } from "react";
import { ArrowLeft, Pause, Play, RotateCcw, SkipBack, SkipForward, Volume2, VolumeX } from "lucide-react";
import { desserializarCircuito, dinamicaDaEstacao, PRESETS } from "@/lib/circuito";
import type { Exercicio } from "@/data/exercises";

type Busca = { d?: string | undefined };

export const Route = createFileRoute("/executar")({
  validateSearch: (search: Record<string, unknown>): Busca => ({
    d: typeof search["d"] === "string" ? search["d"] : undefined,
  }),
  head: () => ({
    meta: [
      { title: "Treino real com cronômetro | Life Training" },
      {
        name: "description",
        content:
          "Conduza o circuito funcional na areia em tempo real: cronômetro por estação, trabalho, descanso e rodadas.",
      },
      { property: "og:title", content: "Treino real com cronômetro | Life Training" },
      {
        property: "og:description",
        content: "Execute o circuito estação por estação com tempo de trabalho e descanso guiados.",
      },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: TreinoReal,
});

type Fase = {
  tipo: "preparar" | "trabalho" | "descanso" | "fim";
  segundos: number;
  rodada: number;
  estacao: number;
  exercicio?: Exercicio;
  proximo?: string;
};

function mmss(s: number) {
  const m = Math.floor(s / 60);
  return `${String(m).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;
}

function beep(freq: number, dur = 0.15) {
  try {
    const Ctx =
      window.AudioContext ??
      (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!Ctx) return;
    const ctx = new Ctx();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.frequency.value = freq;
    osc.connect(gain);
    gain.connect(ctx.destination);
    gain.gain.setValueAtTime(0.18, ctx.currentTime);
    osc.start();
    osc.stop(ctx.currentTime + dur);
    osc.onended = () => ctx.close();
  } catch {
    /* áudio indisponível */
  }
}

function TreinoReal() {
  const { d } = Route.useSearch();
  const circuito = useMemo(() => (d ? desserializarCircuito(d) : null), [d]);

  const fases = useMemo<Fase[]>(() => {
    if (!circuito) return [];
    const lista: Fase[] = [
      { tipo: "preparar", segundos: 10, rodada: 1, estacao: 0, proximo: circuito.estacoes[0]?.exercicio.nome },
    ];
    for (let r = 1; r <= circuito.config.rodadas; r++) {
      circuito.estacoes.forEach((est, i) => {
        const seguinte =
          circuito.estacoes[i + 1]?.exercicio.nome ??
          (r < circuito.config.rodadas ? circuito.estacoes[0]?.exercicio.nome : "Volta à calma");
        lista.push({
          tipo: "trabalho",
          segundos: circuito.config.trabalho,
          rodada: r,
          estacao: est.ordem,
          exercicio: est.exercicio,
          ...(seguinte ? { proximo: seguinte } : {}),
        });
        if (circuito.config.descanso > 0) {
          lista.push({
            tipo: "descanso",
            segundos: circuito.config.descanso,
            rodada: r,
            estacao: est.ordem,
            ...(seguinte ? { proximo: seguinte } : {}),
          });
        }
      });
    }
    lista.push({ tipo: "fim", segundos: 0, rodada: circuito.config.rodadas, estacao: 0 });
    return lista;
  }, [circuito]);

  const [indice, setIndice] = useState(0);
  const [restante, setRestante] = useState(fases[0]?.segundos ?? 0);
  const [rodando, setRodando] = useState(false);
  const [som, setSom] = useState(true);
  const somRef = useRef(som);
  somRef.current = som;

  useEffect(() => {
    setIndice(0);
    setRestante(fases[0]?.segundos ?? 0);
    setRodando(false);
  }, [fases]);

  useEffect(() => {
    if (!rodando) return;
    const id = window.setInterval(() => {
      setRestante((s) => {
        if (s > 1) {
          if (s <= 4 && somRef.current) beep(660, 0.08);
          return s - 1;
        }
        if (somRef.current) beep(980, 0.25);
        setIndice((i) => {
          const proximo = Math.min(i + 1, fases.length - 1);
          setRestante(fases[proximo]?.segundos ?? 0);
          if (fases[proximo]?.tipo === "fim") setRodando(false);
          return proximo;
        });
        return 0;
      });
    }, 1000);
    return () => window.clearInterval(id);
  }, [rodando, fases]);

  if (!circuito) {
    return (
      <main className="min-h-screen sand-grain px-4 pt-10">
        <div className="mx-auto max-w-md rounded-2xl border border-border bg-card p-5 text-sm text-muted-foreground">
          Nenhum treino carregado. Gere ou abra um circuito para executá-lo.
          <Link to="/" className="mt-3 block font-semibold text-primary">
            Voltar ao gerador
          </Link>
        </div>
      </main>
    );
  }

  const fase = fases[indice] ?? fases[fases.length - 1]!;
  const total = fase.segundos || 1;
  const progresso = fase.tipo === "fim" ? 100 : ((total - restante) / total) * 100;
  const preset = PRESETS[circuito.config.formato];

  const ir = (delta: number) => {
    const i = Math.min(Math.max(indice + delta, 0), fases.length - 1);
    setIndice(i);
    setRestante(fases[i]?.segundos ?? 0);
  };

  const cor =
    fase.tipo === "trabalho"
      ? "bg-sunset text-primary-foreground"
      : fase.tipo === "descanso"
        ? "bg-ocean text-primary-foreground"
        : "bg-card text-foreground";

  const rotulo =
    fase.tipo === "preparar"
      ? "Prepare-se"
      : fase.tipo === "trabalho"
        ? "Trabalho"
        : fase.tipo === "descanso"
          ? "Descanso / troca"
          : "Treino concluído";

  return (
    <main className="min-h-screen sand-grain pb-16">
      <div className="mx-auto max-w-2xl px-4 pt-6">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground hover:text-primary"
        >
          <ArrowLeft className="size-4" /> Sair do treino
        </Link>

        <h1 className="mt-3 text-4xl">{circuito.nome || `${preset.nome} na areia`}</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          {circuito.estacoes.length} estações · {circuito.config.rodadas} rodadas ·{" "}
          {circuito.config.trabalho}s / {circuito.config.descanso}s
        </p>

        <section className={`mt-5 rounded-3xl p-6 text-center shadow-lift ${cor}`}>
          <p className="text-xs font-semibold uppercase tracking-[0.25em] opacity-80">
            {rotulo}
            {fase.tipo !== "fim" && fase.tipo !== "preparar" && (
              <> · Rodada {fase.rodada}/{circuito.config.rodadas}</>
            )}
          </p>
          <p className="mt-2 font-display text-7xl leading-none tabular-nums">
            {fase.tipo === "fim" ? "🏁" : mmss(restante)}
          </p>

          <div className="mt-4 h-2 overflow-hidden rounded-full bg-white/25">
            <div className="h-full rounded-full bg-white transition-all" style={{ width: `${progresso}%` }} />
          </div>

          <h2 className="mt-4 text-3xl leading-tight">
            {fase.tipo === "trabalho"
              ? `${fase.estacao}. ${fase.exercicio?.nome}`
              : fase.tipo === "fim"
                ? "Muito bem, turma!"
                : fase.proximo}
          </h2>
          {fase.tipo === "trabalho" && fase.exercicio && (
            <p className="mt-2 text-sm opacity-90">{fase.exercicio.dica}</p>
          )}
          {fase.tipo === "trabalho" && fase.exercicio && (
            <p className="mt-2 rounded-xl bg-white/15 p-2.5 text-sm opacity-95">
              {dinamicaDaEstacao(circuito.config.modalidade, fase.exercicio.nome)}
            </p>
          )}
          {fase.tipo !== "fim" && fase.proximo && fase.tipo !== "preparar" && (
            <p className="mt-3 text-sm opacity-80">Próximo: {fase.proximo}</p>
          )}
        </section>

        <div className="mt-4 grid grid-cols-4 gap-2">
          <button
            onClick={() => ir(-1)}
            aria-label="Fase anterior"
            className="flex items-center justify-center rounded-2xl border border-border bg-card py-3.5 text-muted-foreground hover:text-primary"
          >
            <SkipBack className="size-5" />
          </button>
          <button
            onClick={() => setRodando((v) => !v)}
            className="col-span-2 flex items-center justify-center gap-2 rounded-2xl bg-sunset py-3.5 font-display text-2xl text-primary-foreground shadow-lift"
          >
            {rodando ? <Pause className="size-5" /> : <Play className="size-5 fill-current" />}
            {rodando ? "Pausar" : "Começar"}
          </button>
          <button
            onClick={() => ir(1)}
            aria-label="Próxima fase"
            className="flex items-center justify-center rounded-2xl border border-border bg-card py-3.5 text-muted-foreground hover:text-primary"
          >
            <SkipForward className="size-5" />
          </button>
        </div>

        <div className="mt-2 grid grid-cols-2 gap-2">
          <button
            onClick={() => {
              setIndice(0);
              setRestante(fases[0]?.segundos ?? 0);
              setRodando(false);
            }}
            className="flex items-center justify-center gap-2 rounded-2xl border border-border bg-card py-3 text-sm font-semibold hover:border-primary"
          >
            <RotateCcw className="size-4" /> Reiniciar
          </button>
          <button
            onClick={() => setSom((v) => !v)}
            className="flex items-center justify-center gap-2 rounded-2xl border border-border bg-card py-3 text-sm font-semibold hover:border-primary"
          >
            {som ? <Volume2 className="size-4" /> : <VolumeX className="size-4" />}
            {som ? "Som ligado" : "Som desligado"}
          </button>
        </div>

        <ol className="mt-5 space-y-2">
          {circuito.estacoes.map((est) => {
            const ativa = fase.tipo === "trabalho" && fase.estacao === est.ordem;
            return (
              <li
                key={est.ordem}
                className={`flex items-center gap-3 rounded-2xl border p-3 ${
                  ativa ? "border-primary bg-primary/10" : "border-border bg-card"
                }`}
              >
                <span className="flex size-8 shrink-0 items-center justify-center rounded-xl bg-sunset font-display text-primary-foreground">
                  {est.ordem}
                </span>
                <span className="min-w-0 flex-1 truncate text-sm font-semibold">
                  {est.exercicio.nome}
                </span>
              </li>
            );
          })}
        </ol>
      </div>
    </main>
  );
}
