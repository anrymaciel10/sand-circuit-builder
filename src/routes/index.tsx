import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Waves, Sparkles, ListChecks, FolderHeart, Instagram } from "lucide-react";
import heroAreia from "@/assets/hero-areia.jpg";
import logoLifeTraining from "@/assets/logo-life-training.jpg";
import {
  EQUIPAMENTOS,
  FOCOS,
  TIPOS_ALONGAMENTO,
  type Equipamento,
  type Foco,
  type TipoAlongamento,
} from "@/data/exercises";
import {
  MODALIDADES,
  PRESETS,
  exerciciosDisponiveis,
  gerarCircuito,
  type Circuito,
  type Formato,
  type Modalidade,
} from "@/lib/circuito";
import { CircuitoView } from "@/components/CircuitoView";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Life Training — Gerador de Circuito Funcional na Areia" },
      {
        name: "description",
        content:
          "Escolha os materiais disponíveis e receba automaticamente um circuito funcional na areia, com exercícios, dicas e links de vídeos, gifs e imagens.",
      },
      { property: "og:title", content: "Life Training — Circuito Funcional na Areia" },
      {
        property: "og:description",
        content:
          "Monte treinos funcionais na praia em segundos: informe o material e receba estações prontas com vídeos e imagens.",
      },
    ],
  }),
  component: Home,
});

const chip =
  "rounded-full border px-3.5 py-2 text-sm font-semibold transition-colors select-none";

function Home() {
  const [equipamentos, setEquipamentos] = useState<Equipamento[]>(["peso-corporal", "cones"]);
  const [focos, setFocos] = useState<Foco[]>([]);
  const [nivel, setNivel] = useState<1 | 2 | 3>(2);
  const [estacoes, setEstacoes] = useState(6);
  const [formato, setFormato] = useState<Formato>("estacoes");
  const [modalidade, setModalidade] = useState<Modalidade>("individual");
  const [compostos, setCompostos] = useState(true);
  const [tiposAlong, setTiposAlong] = useState<TipoAlongamento[]>(["dinamico", "estatico"]);
  const [qtdAlong, setQtdAlong] = useState(4);
  const [circuito, setCircuito] = useState<Circuito | null>(null);

  const disponiveis = useMemo(() => exerciciosDisponiveis(equipamentos).length, [equipamentos]);

  const toggle = <T,>(lista: T[], set: (v: T[]) => void, valor: T) =>
    set(lista.includes(valor) ? lista.filter((v) => v !== valor) : [...lista, valor]);

  const gerar = () => {
    const preset = PRESETS[formato];
    setCircuito(
      gerarCircuito(
        {
          equipamentos,
          focos,
          nivel,
          estacoes: Math.min(estacoes, Math.max(3, disponiveis)),
          rodadas: preset.rodadas,
          trabalho: preset.trabalho,
          descanso: preset.descanso,
          formato,
          modalidade,
          compostos,
          alongamentos: tiposAlong,
          qtdAlongamentos: tiposAlong.length ? qtdAlong : 0,
        },
        Date.now(),
      ),
    );
    requestAnimationFrame(() =>
      document.getElementById("resultado")?.scrollIntoView({ behavior: "smooth" }),
    );
  };

  return (
    <main className="min-h-screen sand-grain pb-16">
      <header className="relative overflow-hidden">
        <img
          src={heroAreia}
          alt="Cones, corda naval e kettlebells montados na areia da praia ao pôr do sol"
          width={1600}
          height={912}
          className="h-64 w-full object-cover sm:h-80"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-deep/95 via-deep/60 to-black/30" />
        <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
          <div className="flex items-center gap-3.5 mb-2">
            <div className="relative">
              <img
                src={logoLifeTraining}
                alt="Logo Life Training Treinamento Funcional"
                className="h-14 w-14 rounded-2xl border-2 border-sun/90 bg-white object-cover shadow-lift transition-transform hover:scale-105"
              />
              <span className="absolute -bottom-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-sun text-deep text-[10px] font-bold">
                ✓
              </span>
            </div>
            <div>
              <p className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.25em] text-sun">
                <Waves className="size-4" /> Life Training
              </p>
              <span className="text-[11px] font-medium tracking-wider text-white/80 uppercase">
                Treinamento Funcional
              </span>
            </div>
          </div>
          <h1 className="mt-2 max-w-md text-4xl leading-[0.95] text-white sm:text-5xl">
            Circuito funcional na areia, montado sozinho
          </h1>
          <p className="mt-2 max-w-md text-sm text-white/85">
            Diga o que você tem em mãos. O app sorteia as estações, o tempo e ainda entrega vídeo,
            gif e imagem de cada exercício.
          </p>
        </div>
      </header>

      <div className="mx-auto max-w-2xl space-y-6 px-4 pt-6">
        <section className="rounded-3xl border border-border bg-card p-5 shadow-soft">
          <h2 className="text-2xl">1. Material disponível</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Toque em tudo que você leva para a areia hoje.
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            {EQUIPAMENTOS.map((eq) => {
              const ativo = equipamentos.includes(eq.id);
              return (
                <button
                  key={eq.id}
                  onClick={() => toggle(equipamentos, setEquipamentos, eq.id)}
                  className={`${chip} ${
                    ativo
                      ? "border-transparent bg-sunset text-primary-foreground shadow-soft"
                      : "border-border bg-background text-foreground hover:border-primary"
                  }`}
                >
                  <span className="mr-1">{eq.emoji}</span>
                  {eq.nome}
                </button>
              );
            })}
          </div>
          <p className="mt-3 text-sm font-semibold text-accent">
            {disponiveis} exercícios possíveis com esse material
          </p>
        </section>

        <section className="rounded-3xl border border-border bg-card p-5 shadow-soft">
          <h2 className="text-2xl">2. Estímulo e intensidade</h2>

          <p className="mt-4 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            Foco (opcional)
          </p>
          <div className="mt-2 flex flex-wrap gap-2">
            {FOCOS.map((f) => {
              const ativo = focos.includes(f.id);
              return (
                <button
                  key={f.id}
                  onClick={() => toggle(focos, setFocos, f.id)}
                  className={`${chip} ${
                    ativo
                      ? "border-transparent bg-accent text-accent-foreground"
                      : "border-border bg-background text-foreground hover:border-accent"
                  }`}
                >
                  {f.nome}
                </button>
              );
            })}
          </div>

          <p className="mt-5 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            Nível da turma
          </p>
          <div className="mt-2 grid grid-cols-3 gap-2">
            {([1, 2, 3] as const).map((n) => (
              <button
                key={n}
                onClick={() => setNivel(n)}
                className={`rounded-xl border py-2.5 text-sm font-semibold transition-colors ${
                  nivel === n
                    ? "border-transparent bg-sunset text-primary-foreground"
                    : "border-border bg-background hover:border-primary"
                }`}
              >
                {n === 1 ? "Iniciante" : n === 2 ? "Intermediário" : "Avançado"}
              </button>
            ))}
          </div>

          <p className="mt-5 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            Formato do circuito
          </p>
          <div className="mt-2 grid gap-2 sm:grid-cols-2">
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

          <p className="mt-5 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            Treino em dupla ou trio?
          </p>
          <div className="mt-2 grid gap-2 sm:grid-cols-3">
            {MODALIDADES.map((m) => (
              <button
                key={m.id}
                onClick={() => setModalidade(m.id)}
                className={`rounded-xl border p-3 text-left transition-colors ${
                  modalidade === m.id
                    ? "border-accent bg-accent/10"
                    : "border-border bg-background hover:border-accent"
                }`}
              >
                <p className="font-display text-lg leading-none">{m.nome}</p>
                <p className="mt-1 text-xs text-muted-foreground">{m.descricao}</p>
              </button>
            ))}
          </div>

          <div className="mt-5 flex items-center justify-between">
            <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              Estações
            </p>
            <span className="font-display text-2xl text-primary">{estacoes}</span>
          </div>
          <input
            type="range"
            min={3}
            max={10}
            value={estacoes}
            onChange={(ev) => setEstacoes(Number(ev.target.value))}
            className="mt-2 w-full accent-[oklch(0.652_0.178_44)]"
          />

          <button
            onClick={() => setCompostos((v) => !v)}
            className={`mt-5 flex w-full items-start gap-3 rounded-xl border p-3 text-left transition-colors ${
              compostos ? "border-primary bg-primary/10" : "border-border bg-background"
            }`}
          >
            <span
              className={`mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-md border text-xs font-bold ${
                compostos
                  ? "border-transparent bg-sunset text-primary-foreground"
                  : "border-border"
              }`}
            >
              {compostos ? "✓" : ""}
            </span>
            <span>
              <span className="block font-display text-lg leading-none">
                Priorizar exercícios combinados
              </span>
              <span className="mt-1 block text-xs text-muted-foreground">
                Movimentos com deslocamento ou duas ações em uma repetição (ex: agachar e correr
                lateralmente).
              </span>
            </span>
          </button>
        </section>

        <section className="rounded-3xl border border-border bg-card p-5 shadow-soft">
          <h2 className="text-2xl">3. Alongamento e mobilidade</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Escolha os tipos que entram no treino. Os dinâmicos e as brincadeiras funcionam melhor
            no aquecimento; os estáticos, na volta à calma.
          </p>
          <div className="mt-4 grid gap-2 sm:grid-cols-2">
            {TIPOS_ALONGAMENTO.map((t) => {
              const ativo = tiposAlong.includes(t.id);
              return (
                <button
                  key={t.id}
                  onClick={() => toggle(tiposAlong, setTiposAlong, t.id)}
                  className={`rounded-xl border p-3 text-left transition-colors ${
                    ativo ? "border-accent bg-accent/10" : "border-border bg-background hover:border-accent"
                  }`}
                >
                  <p className="font-display text-lg leading-none">
                    {t.emoji} {t.nome}
                  </p>
                  <p className="mt-1 text-xs text-muted-foreground">{t.descricao}</p>
                </button>
              );
            })}
          </div>

          <div className="mt-5 flex items-center justify-between">
            <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              Quantos alongamentos
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
            onChange={(ev) => setQtdAlong(Number(ev.target.value))}
            disabled={tiposAlong.length === 0}
            className="mt-2 w-full accent-[oklch(0.652_0.178_44)] disabled:opacity-40"
          />
        </section>

        <button
          onClick={gerar}
          disabled={equipamentos.length === 0}
          className="flex w-full items-center justify-center gap-2 rounded-2xl bg-sunset px-6 py-4 font-display text-2xl text-primary-foreground shadow-lift transition active:scale-[0.99] disabled:opacity-50"
        >
          <Sparkles className="size-5" /> Gerar circuito
        </button>

        <div id="resultado" className="scroll-mt-4">
          {circuito ? (
            <CircuitoView circuito={circuito} onRegenerar={gerar} />
          ) : (
            <p className="text-center text-sm text-muted-foreground">
              Selecione o material e gere seu treino em um toque.
            </p>
          )}
        </div>

        <Link
          to="/treinos"
          className="flex items-center justify-center gap-2 rounded-2xl border border-border bg-card px-6 py-3.5 text-sm font-semibold shadow-soft transition hover:border-primary"
        >
          <FolderHeart className="size-4 text-primary" /> Meus treinos salvos e favoritos
        </Link>

        <Link
          to="/exercicios"
          className="flex items-center justify-center gap-2 rounded-2xl border border-border bg-card px-6 py-3.5 text-sm font-semibold shadow-soft transition hover:border-accent"
        >
          <ListChecks className="size-4 text-accent" /> Ver biblioteca completa de exercícios
        </Link>

        <Link
          to="/perfis"
          className="flex items-center justify-center gap-2 rounded-2xl border border-border bg-card px-6 py-3.5 text-sm font-semibold shadow-soft transition hover:border-primary"
        >
          <Instagram className="size-4 text-primary" /> Pesquisar treinos nos perfis de referência
        </Link>

        <div className="grid grid-cols-2 gap-3">
          <Link
            to="/packs"
            className="flex flex-col items-center gap-1 rounded-2xl border border-border bg-card px-4 py-4 text-center text-sm font-semibold shadow-soft transition hover:border-accent"
          >
            <span className="text-2xl">🎁</span> Packs de treino
          </Link>
          <Link
            to="/biblioteca"
            className="flex flex-col items-center gap-1 rounded-2xl border border-border bg-card px-4 py-4 text-center text-sm font-semibold shadow-soft transition hover:border-accent"
          >
            <span className="text-2xl">🧰</span> Por material
          </Link>
          <Link
            to="/acervo"
            className="flex flex-col items-center gap-1 rounded-2xl border border-border bg-card px-4 py-4 text-center text-sm font-semibold shadow-soft transition hover:border-accent"
          >
            <span className="text-2xl">🎬</span> Acervo +500 vídeos
          </Link>
          <Link
            to="/importar"
            className="flex flex-col items-center gap-1 rounded-2xl border border-border bg-card px-4 py-4 text-center text-sm font-semibold shadow-soft transition hover:border-accent"
          >
            <span className="text-2xl">🔗</span> Importar por link
          </Link>
          <Link
            to="/importar-treinos"
            className="flex flex-col items-center gap-1 rounded-2xl border border-border bg-card px-4 py-4 text-center text-sm font-semibold shadow-soft transition hover:border-accent"
          >
            <span className="text-2xl">📥</span> Importar treinos prontos
          </Link>
          <Link
            to="/executar"
            search={{ d: undefined }}
            className="flex flex-col items-center gap-1 rounded-2xl border border-border bg-card px-4 py-4 text-center text-sm font-semibold shadow-soft transition hover:border-accent"
          >
            <span className="text-2xl">⏱️</span> Página de treino real
          </Link>
        </div>

      </div>
    </main>
  );
}
