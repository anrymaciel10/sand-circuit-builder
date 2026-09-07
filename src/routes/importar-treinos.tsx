import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowLeft, Check, ClipboardPaste, Download, Link2, Play } from "lucide-react";
import { todosExercicios, type Exercicio } from "@/data/exercises";
import { PACKS } from "@/data/packs";
import {
  PRESETS,
  desserializarCircuito,
  gerarCircuito,
  serializarCircuito,
  type Circuito,
  type Estacao,
} from "@/lib/circuito";
import { salvarTreino } from "@/lib/storage";
import { CircuitoView } from "@/components/CircuitoView";

export const Route = createFileRoute("/importar-treinos")({
  head: () => ({
    meta: [
      { title: "Importar treinos prontos | Life Training" },
      {
        name: "description",
        content:
          "Importe treinos por link compartilhado, cole a lista de exercícios ou use packs prontos de circuito funcional na areia.",
      },
      { property: "og:title", content: "Importar treinos prontos | Life Training" },
      {
        property: "og:description",
        content: "Traga circuitos de outros professores por link ou lista de exercícios em segundos.",
      },
    ],
  }),
  component: ImportarTreinos,
});

/** Extrai o token de um link /treino?d=... ou aceita o token puro. */
function tokenDoTexto(texto: string) {
  const t = texto.trim();
  const match = t.match(/[?&]d=([^&\s]+)/);
  if (match?.[1]) return decodeURIComponent(match[1]);
  return t;
}

function normalizar(s: string) {
  return s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9 ]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

/** Casa cada linha colada com o exercício mais parecido da base. */
function casarExercicio(linha: string): Exercicio | null {
  const alvo = normalizar(linha.replace(/^\s*\d+[).\-–]?\s*/, ""));
  if (!alvo) return null;
  const base = todosExercicios();
  const exato = base.find((ex) => normalizar(ex.nome) === alvo);
  if (exato) return exato;
  const palavras = alvo.split(" ").filter((p) => p.length > 2);
  let melhor: { ex: Exercicio; pontos: number } | null = null;
  for (const ex of base) {
    const nome = normalizar(`${ex.nome} ${ex.busca}`);
    const pontos = palavras.reduce((acc, p) => acc + (nome.includes(p) ? 1 : 0), 0);
    if (pontos > 0 && (!melhor || pontos > melhor.pontos)) melhor = { ex, pontos };
  }
  return melhor && melhor.pontos >= Math.max(1, Math.ceil(palavras.length / 2))
    ? melhor.ex
    : null;
}

function circuitoDeLista(nome: string, texto: string) {
  const linhas = texto.split(/\r?\n/).map((l) => l.trim()).filter(Boolean);
  const estacoes: Estacao[] = [];
  const naoEncontrados: string[] = [];
  for (const linha of linhas) {
    const ex = casarExercicio(linha);
    if (ex && !estacoes.some((e) => e.exercicio.id === ex.id)) {
      estacoes.push({ ordem: estacoes.length + 1, exercicio: ex });
    } else if (!ex) {
      naoEncontrados.push(linha);
    }
  }
  if (!estacoes.length) return { circuito: null, naoEncontrados };
  const preset = PRESETS.estacoes;
  const circuito: Circuito = {
    id: String(Date.now()),
    criadoEm: Date.now(),
    nome: nome.trim() || "Treino importado",
    config: {
      equipamentos: [...new Set(estacoes.map((e) => e.exercicio.equipamento))],
      focos: [],
      nivel: 3,
      estacoes: estacoes.length,
      rodadas: preset.rodadas,
      trabalho: preset.trabalho,
      descanso: preset.descanso,
      formato: "estacoes",
      modalidade: "individual",
    },
    aquecimento: [],
    alongamentos: [],
    estacoes,
    duracaoMin:
      Math.round(((preset.trabalho + preset.descanso) * estacoes.length * preset.rodadas) / 60) + 8,
  };
  return { circuito, naoEncontrados };
}

const caixa = "rounded-3xl border border-border bg-card p-5 shadow-soft";
const campo =
  "w-full rounded-xl border border-border bg-background px-3 py-2.5 text-sm outline-none focus:border-primary";

/** Monta um circuito leve cujo aquecimento são as dinâmicas coladas. */
function circuitoDeAquecimento(nome: string, texto: string) {
  const linhas = texto.split(/\r?\n/).map((l) => l.trim()).filter(Boolean);
  const dinamicas: Exercicio[] = [];
  const naoEncontrados: string[] = [];
  for (const linha of linhas) {
    const ex = casarExercicio(linha);
    if (ex && !dinamicas.some((d) => d.id === ex.id)) {
      dinamicas.push(ex);
    } else if (!ex) {
      naoEncontrados.push(linha);
    }
  }
  if (!dinamicas.length) return { circuito: null, naoEncontrados };
  const preset = PRESETS.estacoes;
  const base = gerarCircuito(
    {
      equipamentos: ["peso-corporal"],
      focos: [],
      nivel: 2,
      estacoes: 6,
      rodadas: preset.rodadas,
      trabalho: preset.trabalho,
      descanso: preset.descanso,
      formato: "estacoes",
      modalidade: "individual",
    },
    Date.now(),
  );
  const circuito: Circuito = {
    ...base,
    nome: nome.trim() || "Treino com dinâmicas de aquecimento",
    aquecimento: dinamicas,
    duracaoMin: base.duracaoMin + Math.ceil(dinamicas.length / 2),
  };
  return { circuito, naoEncontrados };
}

function ImportarTreinos() {
  const [aba, setAba] = useState<"link" | "lista" | "packs" | "aquecimento">("link");
  const [link, setLink] = useState("");
  const [nome, setNome] = useState("");
  const [lista, setLista] = useState("");
  const [dinamicas, setDinamicas] = useState("");
  const [aviso, setAviso] = useState("");
  const [naoEncontrados, setNaoEncontrados] = useState<string[]>([]);
  const [previa, setPrevia] = useState<Circuito | null>(null);

  const flash = (t: string) => {
    setAviso(t);
    window.setTimeout(() => setAviso(""), 3500);
  };

  const importarLink = () => {
    const circuito = desserializarCircuito(tokenDoTexto(link));
    if (!circuito) {
      setPrevia(null);
      flash("Link inválido. Cole o link completo do treino compartilhado.");
      return;
    }
    setPrevia(circuito);
    setNaoEncontrados([]);
    flash("Treino carregado! Confira abaixo e salve na sua biblioteca.");
  };

  const importarLista = () => {
    const { circuito, naoEncontrados: faltando } = circuitoDeLista(nome, lista);
    setNaoEncontrados(faltando);
    setPrevia(circuito);
    flash(
      circuito
        ? `${circuito.estacoes.length} estações reconhecidas.`
        : "Nenhum exercício reconhecido — tente nomes mais próximos da biblioteca.",
    );
  };

  const importarPack = (packId: string) => {
    const pack = PACKS.find((p) => p.id === packId);
    if (!pack) return;
    const preset = PRESETS[pack.formato];
    const circuito = gerarCircuito(
      {
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
      },
      Date.now(),
    );
    setPrevia({ ...circuito, nome: pack.nome });
    setNaoEncontrados([]);
    flash(`Pack “${pack.nome}” carregado.`);
  };

  const salvar = () => {
    if (!previa) return;
    salvarTreino(previa, previa.nome || nome || "Treino importado");
    flash("Treino salvo na sua biblioteca.");
  };

  return (
    <main className="min-h-screen sand-grain pb-16">
      <div className="mx-auto max-w-2xl px-4 pt-6">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground hover:text-primary"
        >
          <ArrowLeft className="size-4" /> Voltar ao gerador
        </Link>
        <h1 className="mt-3 text-4xl">Importar treinos prontos</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Traga um circuito por link compartilhado, cole a lista de exercícios do seu caderno ou use
          um pack pronto.
        </p>

        <div className="mt-4 grid grid-cols-3 gap-2">
          {(
            [
              ["link", "Por link"],
              ["lista", "Colar lista"],
              ["packs", "Packs prontos"],
            ] as const
          ).map(([id, rotulo]) => (
            <button
              key={id}
              onClick={() => setAba(id)}
              className={`rounded-xl border py-2.5 text-sm font-semibold transition-colors ${
                aba === id
                  ? "border-transparent bg-sunset text-primary-foreground"
                  : "border-border bg-card hover:border-primary"
              }`}
            >
              {rotulo}
            </button>
          ))}
        </div>

        {aba === "link" && (
          <section className={`mt-4 ${caixa}`}>
            <h2 className="text-2xl">Link do treino compartilhado</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Cole o link que outro professor enviou (ex: .../treino?d=...).
            </p>
            <input
              value={link}
              onChange={(e) => setLink(e.target.value)}
              placeholder="https://.../treino?d=..."
              className={`mt-3 ${campo}`}
            />
            <button
              onClick={importarLink}
              disabled={!link.trim()}
              className="mt-3 flex w-full items-center justify-center gap-2 rounded-2xl bg-sunset px-6 py-3.5 font-display text-xl text-primary-foreground shadow-lift disabled:opacity-50"
            >
              <Link2 className="size-5" /> Importar treino
            </button>
          </section>
        )}

        {aba === "lista" && (
          <section className={`mt-4 ${caixa}`}>
            <h2 className="text-2xl">Colar lista de exercícios</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Um exercício por linha. O app procura o movimento correspondente na biblioteca da
              areia.
            </p>
            <input
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              placeholder="Nome do treino"
              className={`mt-3 ${campo}`}
            />
            <textarea
              value={lista}
              onChange={(e) => setLista(e.target.value)}
              rows={8}
              placeholder={"1. Burpee\n2. Agachamento com salto\n3. Prancha isométrica"}
              className={`mt-2 ${campo}`}
            />
            <button
              onClick={importarLista}
              disabled={!lista.trim()}
              className="mt-3 flex w-full items-center justify-center gap-2 rounded-2xl bg-sunset px-6 py-3.5 font-display text-xl text-primary-foreground shadow-lift disabled:opacity-50"
            >
              <ClipboardPaste className="size-5" /> Montar treino
            </button>
            {naoEncontrados.length > 0 && (
              <p className="mt-3 rounded-xl bg-secondary/60 p-3 text-xs text-muted-foreground">
                Não reconhecidos: {naoEncontrados.join(", ")}. Você pode trocar as estações depois na
                prévia.
              </p>
            )}
          </section>
        )}

        {aba === "packs" && (
          <section className="mt-4 space-y-3">
            {PACKS.map((p) => (
              <div key={p.id} className={caixa}>
                <div className="flex items-start gap-3">
                  <span className="text-3xl">{p.emoji}</span>
                  <div className="min-w-0 flex-1">
                    <h2 className="text-xl leading-tight">{p.nome}</h2>
                    <p className="mt-1 text-sm text-muted-foreground">{p.descricao}</p>
                    <p className="mt-1 text-xs font-semibold uppercase tracking-wide text-accent">
                      {p.duracao} · {p.estacoes} estações · {PRESETS[p.formato].nome}
                    </p>
                  </div>
                  <button
                    onClick={() => importarPack(p.id)}
                    className="shrink-0 rounded-xl bg-sunset px-4 py-2 text-sm font-semibold text-primary-foreground"
                  >
                    Importar
                  </button>
                </div>
              </div>
            ))}
          </section>
        )}

        {aviso && <p className="mt-4 text-sm font-semibold text-accent">{aviso}</p>}

        {previa && (
          <div className="mt-5 space-y-3">
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={salvar}
                className="flex items-center justify-center gap-2 rounded-2xl border border-border bg-card py-3 text-sm font-semibold hover:border-primary"
              >
                <Download className="size-4" /> Salvar na biblioteca
              </button>
              <Link
                to="/executar"
                search={{ d: serializarCircuito(previa) }}
                className="flex items-center justify-center gap-2 rounded-2xl bg-ocean py-3 text-sm font-semibold text-primary-foreground"
              >
                <Play className="size-4 fill-current" /> Treino real
              </Link>
            </div>
            <CircuitoView circuito={previa} />
          </div>
        )}

        {!previa && aba !== "packs" && (
          <p className="mt-6 flex items-center justify-center gap-2 text-center text-sm text-muted-foreground">
            <Check className="size-4" /> A prévia do treino importado aparece aqui.
          </p>
        )}
      </div>
    </main>
  );
}
