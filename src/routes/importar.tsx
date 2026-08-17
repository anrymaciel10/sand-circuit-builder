import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { ArrowLeft, LinkIcon, Plus, Trash2, ExternalLink, Layers } from "lucide-react";
import { EQUIPAMENTOS, FOCOS, type Equipamento, type Foco } from "@/data/exercises";
import {
  PLATAFORMAS,
  detectarPlataforma,
  importarEmLote,
  importarExercicio,
  sugerirNome,
  urlValida,
  useImportados,
} from "@/lib/importados";

export const Route = createFileRoute("/importar")({
  head: () => ({
    meta: [
      { title: "Importar exercícios por link | Life Training" },
      {
        name: "description",
        content:
          "Cole o link de um vídeo do YouTube, Instagram, TikTok ou Google Drive e transforme em exercício da sua biblioteca de funcional na areia.",
      },
      { property: "og:title", content: "Importar exercícios por link" },
      {
        property: "og:description",
        content: "Adicione seus próprios vídeos de exercícios ao gerador de circuitos.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Importar,
});

function Importar() {
  const { lista, recarregar, remover } = useImportados();
  const [modo, setModo] = useState<"unico" | "lote">("unico");
  const [url, setUrl] = useState("");
  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");
  const [equipamento, setEquipamento] = useState<Equipamento>("peso-corporal");
  const [foco, setFoco] = useState<Foco>("forca");
  const [nivel, setNivel] = useState<1 | 2 | 3>(2);
  const [composto, setComposto] = useState(false);
  const [lote, setLote] = useState("");
  const [aviso, setAviso] = useState("");

  const valido = urlValida(url);
  const plataforma = useMemo(() => (valido ? detectarPlataforma(url) : null), [url, valido]);

  function adicionar() {
    if (!valido) return;
    importarExercicio({
      nome: nome || sugerirNome(url),
      url,
      equipamento,
      foco,
      nivel,
      descricao,
      composto,
    });
    setUrl("");
    setNome("");
    setDescricao("");
    setComposto(false);
    setAviso("Exercício importado e já disponível no gerador.");
    recarregar();
  }

  function adicionarLote() {
    const r = importarEmLote(lote, { equipamento, foco, nivel });
    setLote("");
    setAviso(
      `${r.importados} exercício(s) importado(s)${r.ignorados ? ` • ${r.ignorados} linha(s) ignorada(s)` : ""}.`,
    );
    recarregar();
  }

  return (
    <main className="min-h-screen sand-grain pb-16">
      <div className="mx-auto max-w-2xl px-4 pt-6">
        <Link to="/" className="inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground hover:text-primary">
          <ArrowLeft className="size-4" /> Voltar ao gerador
        </Link>
        <h1 className="mt-3 text-4xl">Importar por link</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Cole o link do vídeo (YouTube, Instagram, TikTok, Drive ou site) e o exercício entra na sua
          biblioteca e no gerador de circuitos.
        </p>

        <div className="mt-4 grid grid-cols-2 gap-2">
          {(["unico", "lote"] as const).map((m) => (
            <button
              key={m}
              onClick={() => setModo(m)}
              className={`rounded-xl border py-2.5 text-sm font-semibold transition-colors ${
                modo === m ? "border-transparent bg-sunset text-primary-foreground" : "border-border bg-card hover:border-primary"
              }`}
            >
              {m === "unico" ? "Um link" : "Vários links"}
            </button>
          ))}
        </div>

        <section className="mt-3 space-y-3 rounded-3xl border border-border bg-card p-5 shadow-soft">
          {modo === "unico" ? (
            <>
              <label className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                Link do exercício
              </label>
              <div className="flex items-center gap-2 rounded-2xl border border-border bg-background px-4 py-3">
                <LinkIcon className="size-4 text-muted-foreground" />
                <input
                  value={url}
                  onChange={(e) => {
                    setUrl(e.target.value);
                    setAviso("");
                  }}
                  placeholder="https://www.instagram.com/reel/..."
                  className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
                />
              </div>
              {plataforma && (
                <p className="text-xs font-semibold text-accent">
                  {PLATAFORMAS[plataforma].emoji} Detectado: {PLATAFORMAS[plataforma].nome}
                </p>
              )}
              <input
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                placeholder={valido ? sugerirNome(url) : "Nome do exercício"}
                className="w-full rounded-2xl border border-border bg-background px-4 py-3 text-sm outline-none placeholder:text-muted-foreground"
              />
              <textarea
                value={descricao}
                onChange={(e) => setDescricao(e.target.value)}
                placeholder="Como executar (opcional)"
                rows={2}
                className="w-full rounded-2xl border border-border bg-background px-4 py-3 text-sm outline-none placeholder:text-muted-foreground"
              />
            </>
          ) : (
            <>
              <label className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                Um link por linha (opcional: <code>Nome | link</code>)
              </label>
              <textarea
                value={lote}
                onChange={(e) => setLote(e.target.value)}
                rows={6}
                placeholder={"Burpee no cone | https://youtu.be/xxxx\nhttps://www.instagram.com/reel/yyyy"}
                className="w-full rounded-2xl border border-border bg-background px-4 py-3 text-sm outline-none placeholder:text-muted-foreground"
              />
            </>
          )}

          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Material</p>
            <div className="mt-2 flex gap-2 overflow-x-auto pb-1">
              {EQUIPAMENTOS.map((eq) => (
                <button
                  key={eq.id}
                  onClick={() => setEquipamento(eq.id)}
                  className={`shrink-0 rounded-full border px-3 py-1.5 text-xs font-semibold transition-colors ${
                    equipamento === eq.id ? "border-transparent bg-sunset text-primary-foreground" : "border-border bg-background hover:border-primary"
                  }`}
                >
                  <span className="mr-1">{eq.emoji}</span>
                  {eq.nome}
                </button>
              ))}
            </div>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Foco</p>
            <div className="mt-2 flex flex-wrap gap-2">
              {FOCOS.map((f) => (
                <button
                  key={f.id}
                  onClick={() => setFoco(f.id)}
                  className={`rounded-full border px-3 py-1.5 text-xs font-semibold transition-colors ${
                    foco === f.id ? "border-transparent bg-accent text-accent-foreground" : "border-border bg-background hover:border-accent"
                  }`}
                >
                  {f.nome}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2">
            {([1, 2, 3] as const).map((n) => (
              <button
                key={n}
                onClick={() => setNivel(n)}
                className={`rounded-xl border py-2 text-xs font-semibold transition-colors ${
                  nivel === n ? "border-transparent bg-sunset text-primary-foreground" : "border-border bg-background hover:border-primary"
                }`}
              >
                {n === 1 ? "Iniciante" : n === 2 ? "Intermediário" : "Avançado"}
              </button>
            ))}
          </div>

          {modo === "unico" && (
            <button
              onClick={() => setComposto((v) => !v)}
              className={`w-full rounded-xl border px-4 py-2.5 text-sm font-semibold transition-colors ${
                composto ? "border-transparent bg-accent text-accent-foreground" : "border-border bg-background hover:border-accent"
              }`}
            >
              É um exercício combinado / com deslocamento
            </button>
          )}

          <button
            onClick={modo === "unico" ? adicionar : adicionarLote}
            disabled={modo === "unico" ? !valido : lote.trim().length === 0}
            className="flex w-full items-center justify-center gap-2 rounded-2xl bg-sunset px-6 py-3.5 font-display text-xl text-primary-foreground shadow-lift disabled:opacity-50"
          >
            {modo === "unico" ? <Plus className="size-5" /> : <Layers className="size-5" />}
            {modo === "unico" ? "Importar exercício" : "Importar lista"}
          </button>
          {aviso && <p className="text-center text-sm font-semibold text-accent">{aviso}</p>}
        </section>

        <h2 className="mt-8 text-2xl">Meus exercícios importados ({lista.length})</h2>
        <div className="mt-3 space-y-3">
          {lista.map((ex) => (
            <article key={ex.id} className="rounded-2xl border border-border bg-card p-4 shadow-soft">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="text-lg leading-tight">{ex.nome}</h3>
                  <p className="text-xs font-semibold text-accent">
                    {ex.origem} • {EQUIPAMENTOS.find((e) => e.id === ex.equipamento)?.nome}
                  </p>
                </div>
                <button
                  onClick={() => remover(ex.id)}
                  aria-label={`Remover ${ex.nome}`}
                  className="rounded-full border border-border p-2 text-muted-foreground hover:border-destructive hover:text-destructive"
                >
                  <Trash2 className="size-4" />
                </button>
              </div>
              <p className="mt-1 text-sm text-muted-foreground">{ex.descricao}</p>
              <div className="mt-2 flex flex-wrap gap-2">
                {ex.url && (
                  <a
                    href={ex.url}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-full bg-primary px-3 py-1.5 text-xs font-semibold text-primary-foreground"
                  >
                    <ExternalLink className="size-3.5" /> Abrir vídeo
                  </a>
                )}
                <Link
                  to="/exercicio/$id"
                  params={{ id: ex.id }}
                  className="inline-flex items-center gap-1.5 rounded-full border border-border bg-secondary/60 px-3 py-1.5 text-xs font-semibold hover:border-primary"
                >
                  Ver detalhes
                </Link>
              </div>
            </article>
          ))}
          {lista.length === 0 && (
            <p className="py-8 text-center text-sm text-muted-foreground">
              Nenhum exercício importado ainda. Cole um link acima para começar.
            </p>
          )}
        </div>
      </div>
    </main>
  );
}
