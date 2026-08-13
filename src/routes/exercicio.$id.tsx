import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, Flame, Sparkles } from "lucide-react";
import { EQUIPAMENTOS, EXERCICIOS, FOCOS } from "@/data/exercises";
import { BotaoFavorito, ExercicioCard, LinksMidia, useFavoritos } from "@/components/CircuitoView";

export const Route = createFileRoute("/exercicio/$id")({
  loader: ({ params }) => {
    const exercicio = EXERCICIOS.find((ex) => ex.id === params.id);
    if (!exercicio) throw notFound();
    return { exercicio };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return { meta: [{ title: "Exercício não encontrado" }, { name: "robots", content: "noindex" }] };
    }
    const ex = loaderData.exercicio;
    const desc = `${ex.descricao} ${ex.dica}`;
    return {
      meta: [
        { title: `${ex.nome} — Exercício funcional na areia | Life Training` },
        { name: "description", content: desc },
        { property: "og:title", content: `${ex.nome} — treino funcional na areia` },
        { property: "og:description", content: desc },
      ],
    };
  },
  component: Detalhe,
});

function Detalhe() {
  const { exercicio: ex } = Route.useLoaderData();
  const { favoritos, alternar } = useFavoritos();
  const equipamento = EQUIPAMENTOS.find((e) => e.id === ex.equipamento);
  const foco = FOCOS.find((f) => f.id === ex.foco);
  const relacionados = EXERCICIOS.filter(
    (o) => o.id !== ex.id && (o.equipamento === ex.equipamento || o.foco === ex.foco),
  ).slice(0, 3);

  return (
    <main className="min-h-screen sand-grain pb-16">
      <div className="bg-ocean px-4 pb-8 pt-6 text-primary-foreground">
        <div className="mx-auto max-w-2xl">
          <Link
            to="/exercicios"
            className="inline-flex items-center gap-2 text-sm font-semibold opacity-85 hover:opacity-100"
          >
            <ArrowLeft className="size-4" /> Biblioteca
          </Link>
          <div className="mt-3 flex items-start gap-3">
            <h1 className="flex-1 text-4xl leading-[0.95]">{ex.nome}</h1>
            <BotaoFavorito
              ativo={favoritos.includes(ex.id)}
              onClick={() => alternar(ex.id)}
              className="border-white/30 bg-white/15 text-white"
            />
          </div>
          <div className="mt-3 flex flex-wrap gap-2 text-xs font-semibold uppercase tracking-wide">
            <span className="rounded-full bg-white/20 px-3 py-1">
              {equipamento?.emoji} {equipamento?.nome}
            </span>
            <span className="rounded-full bg-white/20 px-3 py-1">{foco?.nome}</span>
            <span className="rounded-full bg-white/20 px-3 py-1">Nível {ex.nivel}</span>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-2xl space-y-4 px-4 pt-5">
        <section className="rounded-2xl border border-border bg-card p-5 shadow-soft">
          <h2 className="text-xl">Como executar</h2>
          <p className="mt-2 text-sm text-muted-foreground">{ex.descricao}</p>
          <p className="mt-3 rounded-xl bg-primary/10 p-3 text-sm text-foreground/85">
            <Flame className="mr-1 inline size-4 text-primary" />
            {ex.dica}
          </p>
        </section>

        <section className="rounded-2xl border border-border bg-card p-5 shadow-soft">
          <h2 className="text-xl">Vídeos, gifs e imagens</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Referências de execução buscadas por "{ex.busca}".
          </p>
          <div className="mt-3">
            <LinksMidia ex={ex} />
          </div>
        </section>

        <section className="rounded-2xl border border-border bg-card p-5 shadow-soft">
          <h2 className="text-xl">Progressões na areia</h2>
          <ul className="mt-2 space-y-1.5 text-sm text-muted-foreground">
            <li>• Iniciante: reduza o tempo para 20s e trabalhe na areia mais firme (perto da água).</li>
            <li>• Intermediário: 40s de execução na areia fofa, com 20s de transição.</li>
            <li>• Avançado: adicione carga, resistência elástica ou encurte o descanso para 10s.</li>
          </ul>
        </section>

        {relacionados.length > 0 && (
          <section className="space-y-3">
            <h2 className="flex items-center gap-2 text-xl">
              <Sparkles className="size-5 text-primary" /> Exercícios relacionados
            </h2>
            {relacionados.map((rel) => (
              <ExercicioCard
                key={rel.id}
                ex={rel}
                favorito={favoritos.includes(rel.id)}
                onFavoritar={() => alternar(rel.id)}
              />
            ))}
          </section>
        )}
      </div>
    </main>
  );
}
