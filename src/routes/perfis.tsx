import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { ArrowLeft, Instagram, Search, ExternalLink } from "lucide-react";
import { PERFIS, buscaEmTodosPerfis, buscaNoPerfil, linkPerfil } from "@/data/perfis";

export const Route = createFileRoute("/perfis")({
  head: () => ({
    meta: [
      { title: "Perfis de referência e pesquisa de treinos | Life Training" },
      {
        name: "description",
        content:
          "Pesquise ideias de treino funcional na areia direto nos perfis de referência do Instagram, como @chizfit, @funcionalnaareia_ e @mb9funcional.",
      },
      { property: "og:title", content: "Pesquisa de treinos nos perfis de referência" },
      {
        property: "og:description",
        content:
          "Busque exercícios combinados e circuitos funcionais nos melhores perfis de treino na areia.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Perfis,
});

const SUGESTOES = [
  "agachamento com deslocamento",
  "exercício combinado",
  "circuito na areia",
  "treino em dupla",
  "corda naval",
  "escada de agilidade",
];

function Perfis() {
  const [termo, setTermo] = useState("");
  const [filtro, setFiltro] = useState("");

  const lista = useMemo(
    () =>
      PERFIS.filter((p) =>
        `${p.nome} ${p.handle} ${p.descricao} ${p.tags.join(" ")}`
          .toLowerCase()
          .includes(filtro.toLowerCase()),
      ),
    [filtro],
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
        <h1 className="mt-3 text-4xl">Pesquisa de treinos</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Busque ideias direto nos perfis de referência de funcional na areia.
        </p>

        <section className="mt-4 rounded-3xl border border-border bg-card p-5 shadow-soft">
          <label className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            O que você quer treinar hoje?
          </label>
          <div className="mt-2 flex items-center gap-2 rounded-2xl border border-border bg-background px-4 py-3">
            <Search className="size-4 text-muted-foreground" />
            <input
              value={termo}
              onChange={(e) => setTermo(e.target.value)}
              placeholder="ex: agachamento com deslocamento lateral"
              className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
            />
          </div>
          <div className="mt-3 flex flex-wrap gap-2">
            {SUGESTOES.map((s) => (
              <button
                key={s}
                onClick={() => setTermo(s)}
                className="rounded-full border border-border bg-secondary/60 px-3 py-1.5 text-xs font-semibold hover:border-primary"
              >
                {s}
              </button>
            ))}
          </div>
          <a
            href={buscaEmTodosPerfis(termo)}
            target="_blank"
            rel="noreferrer"
            className="mt-4 flex w-full items-center justify-center gap-2 rounded-2xl bg-sunset px-6 py-3.5 font-display text-xl text-primary-foreground shadow-lift"
          >
            <Search className="size-5" /> Buscar em todos os perfis
          </a>
        </section>

        <div className="mt-5 flex items-center gap-2 rounded-2xl border border-border bg-card px-4 py-3 shadow-soft">
          <Instagram className="size-4 text-muted-foreground" />
          <input
            value={filtro}
            onChange={(e) => setFiltro(e.target.value)}
            placeholder="Filtrar perfis..."
            className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
          />
        </div>

        <div className="mt-3 space-y-3">
          {lista.map((p) => (
            <article key={p.handle} className="rounded-2xl border border-border bg-card p-4 shadow-soft">
              <h2 className="text-xl leading-tight">{p.nome}</h2>
              <p className="text-sm font-semibold text-accent">@{p.handle}</p>
              <p className="mt-1 text-sm text-muted-foreground">{p.descricao}</p>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {p.tags.map((t) => (
                  <span
                    key={t}
                    className="rounded-full bg-secondary/60 px-2 py-0.5 text-[11px] font-semibold text-secondary-foreground"
                  >
                    {t}
                  </span>
                ))}
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                <a
                  href={linkPerfil(p)}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-full bg-primary px-3 py-1.5 text-xs font-semibold text-primary-foreground"
                >
                  <Instagram className="size-3.5" /> Abrir perfil
                </a>
                <a
                  href={buscaNoPerfil(p, termo)}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-full border border-border bg-secondary/60 px-3 py-1.5 text-xs font-semibold hover:border-primary"
                >
                  <ExternalLink className="size-3.5" /> Buscar {termo ? `“${termo}”` : "treinos"} aqui
                </a>
              </div>
            </article>
          ))}
          {lista.length === 0 && (
            <p className="py-10 text-center text-sm text-muted-foreground">Nenhum perfil encontrado.</p>
          )}
        </div>
      </div>
    </main>
  );
}