import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { ArrowLeft, Search, ExternalLink, Play, FolderOpen } from "lucide-react";
import {
  PASTA_ACERVO,
  TEMAS_ACERVO,
  VIDEOS_ACERVO,
  embedVideoAcervo,
  linkVideoAcervo,
  type VideoAcervo,
} from "@/data/acervo";

export const Route = createFileRoute("/acervo")({
  head: () => ({
    meta: [
      { title: "Acervo com +500 vídeos de treino funcional | Life Training" },
      {
        name: "description",
        content:
          "Mais de 500 vídeos de treinos e exercícios funcionais organizados por tema: pernas, core, HIIT, cardio, kettlebell, step e circuitos completos.",
      },
      { property: "og:title", content: "Acervo de +500 vídeos de treino funcional" },
      {
        property: "og:description",
        content: "Assista, busque por tema e use os vídeos como referência nas suas aulas na areia.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Acervo,
});

const PAGINA = 30;

function Acervo() {
  const [busca, setBusca] = useState("");
  const [tema, setTema] = useState<string>("todos");
  const [limite, setLimite] = useState(PAGINA);
  const [aberto, setAberto] = useState<VideoAcervo | null>(null);

  const lista = useMemo(
    () =>
      VIDEOS_ACERVO.filter(
        (v) =>
          (tema === "todos" || v.tema === tema) &&
          `${v.nome} ${v.titulo} ${v.tema}`.toLowerCase().includes(busca.trim().toLowerCase()),
      ),
    [busca, tema],
  );

  return (
    <main className="min-h-screen sand-grain pb-16">
      <div className="mx-auto max-w-2xl px-4 pt-6">
        <Link to="/" className="inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground hover:text-primary">
          <ArrowLeft className="size-4" /> Voltar ao gerador
        </Link>
        <h1 className="mt-3 text-4xl">Acervo de vídeos</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          {VIDEOS_ACERVO.length} vídeos importados da sua pasta “+500 Treinos funcional”.
        </p>
        <a
          href={PASTA_ACERVO}
          target="_blank"
          rel="noreferrer"
          className="mt-3 inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1.5 text-xs font-semibold hover:border-primary"
        >
          <FolderOpen className="size-3.5" /> Abrir a pasta original
        </a>

        <div className="mt-4 flex items-center gap-2 rounded-2xl border border-border bg-card px-4 py-3 shadow-soft">
          <Search className="size-4 text-muted-foreground" />
          <input
            value={busca}
            onChange={(e) => {
              setBusca(e.target.value);
              setLimite(PAGINA);
            }}
            placeholder="Buscar por nome ou tema (ex: abdômen, agachamento)..."
            className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
          />
        </div>

        <div className="mt-3 flex gap-2 overflow-x-auto pb-2">
          {["todos", ...TEMAS_ACERVO].map((t) => (
            <button
              key={t}
              onClick={() => {
                setTema(t);
                setLimite(PAGINA);
              }}
              className={`shrink-0 rounded-full border px-3.5 py-2 text-sm font-semibold capitalize transition-colors ${
                tema === t ? "border-transparent bg-sunset text-primary-foreground" : "border-border bg-card hover:border-primary"
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        <p className="mt-3 text-sm font-semibold text-accent">{lista.length} vídeos encontrados</p>

        {aberto && (
          <div className="mt-3 overflow-hidden rounded-2xl border border-primary bg-card shadow-lift">
            <div className="aspect-video w-full">
              <iframe
                key={aberto.id}
                src={embedVideoAcervo(aberto)}
                title={aberto.nome}
                allow="autoplay"
                allowFullScreen
                className="size-full"
              />
            </div>
            <div className="flex items-center justify-between gap-2 p-3">
              <p className="text-sm font-semibold">{aberto.nome}</p>
              <button
                onClick={() => setAberto(null)}
                className="rounded-full border border-border px-3 py-1 text-xs font-semibold hover:border-primary"
              >
                Fechar
              </button>
            </div>
          </div>
        )}

        <div className="mt-4 space-y-2">
          {lista.slice(0, limite).map((v) => (
            <article
              key={v.id}
              className="flex items-center justify-between gap-3 rounded-2xl border border-border bg-card p-3 shadow-soft"
            >
              <div className="min-w-0">
                <h2 className="truncate text-base font-semibold">{v.nome}</h2>
                <p className="text-xs capitalize text-muted-foreground">{v.tema}</p>
              </div>
              <div className="flex shrink-0 gap-2">
                <button
                  onClick={() => {
                    setAberto(v);
                    window.scrollTo({ top: 200, behavior: "smooth" });
                  }}
                  className="inline-flex items-center gap-1.5 rounded-full bg-primary px-3 py-1.5 text-xs font-semibold text-primary-foreground"
                >
                  <Play className="size-3.5" /> Assistir
                </button>
                <a
                  href={linkVideoAcervo(v)}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`Abrir ${v.nome} no Drive`}
                  className="inline-flex items-center rounded-full border border-border px-2.5 py-1.5 text-xs font-semibold hover:border-primary"
                >
                  <ExternalLink className="size-3.5" />
                </a>
              </div>
            </article>
          ))}
        </div>

        {limite < lista.length && (
          <button
            onClick={() => setLimite((l) => l + PAGINA)}
            className="mt-4 w-full rounded-2xl border border-border bg-card px-6 py-3 text-sm font-semibold shadow-soft hover:border-primary"
          >
            Carregar mais ({lista.length - limite} restantes)
          </button>
        )}
      </div>
    </main>
  );
}
