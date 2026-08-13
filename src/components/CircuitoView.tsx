import { Dumbbell, Flame, Instagram, Image as ImageIcon, Youtube, Clock, RefreshCw, Copy } from "lucide-react";
import { linkGif, linkInstagram, linkYoutube, type Exercicio } from "@/data/exercises";
import { PRESETS, textoCompartilhar, type Circuito } from "@/lib/circuito";

const FOCO_LABEL: Record<string, string> = {
  forca: "Força",
  potencia: "Potência",
  cardio: "Cardio",
  core: "Core",
  agilidade: "Agilidade",
  equilibrio: "Equilíbrio",
};

export function LinksMidia({ ex }: { ex: Exercicio }) {
  const base =
    "inline-flex items-center gap-1.5 rounded-full border border-border bg-secondary/60 px-3 py-1.5 text-xs font-semibold text-secondary-foreground transition-colors hover:bg-primary hover:text-primary-foreground";
  return (
    <div className="flex flex-wrap gap-2">
      <a className={base} href={linkYoutube(ex)} target="_blank" rel="noreferrer">
        <Youtube className="size-3.5" /> Vídeo
      </a>
      <a className={base} href={linkGif(ex)} target="_blank" rel="noreferrer">
        <ImageIcon className="size-3.5" /> GIF / imagens
      </a>
      <a className={base} href={linkInstagram(ex)} target="_blank" rel="noreferrer">
        <Instagram className="size-3.5" /> Instagram
      </a>
    </div>
  );
}

export function ExercicioCard({ ex, ordem }: { ex: Exercicio; ordem?: number }) {
  return (
    <article className="rounded-2xl border border-border bg-card p-4 shadow-soft">
      <div className="flex items-start gap-3">
        {ordem !== undefined && (
          <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-sunset font-display text-lg text-primary-foreground shadow-soft">
            {ordem}
          </span>
        )}
        <div className="min-w-0 flex-1">
          <h3 className="text-xl leading-tight text-card-foreground">{ex.nome}</h3>
          <div className="mt-1 flex flex-wrap items-center gap-2 text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
            <span className="rounded-full bg-accent/10 px-2 py-0.5 text-accent">{FOCO_LABEL[ex.foco]}</span>
            <span>Nível {ex.nivel}</span>
          </div>
          <p className="mt-2 text-sm text-muted-foreground">{ex.descricao}</p>
          <p className="mt-1 text-sm text-foreground/80">
            <Flame className="mr-1 inline size-3.5 text-primary" />
            {ex.dica}
          </p>
          <div className="mt-3">
            <LinksMidia ex={ex} />
          </div>
        </div>
      </div>
    </article>
  );
}

export function CircuitoView({
  circuito,
  onRegenerar,
}: {
  circuito: Circuito;
  onRegenerar: () => void;
}) {
  const preset = PRESETS[circuito.config.formato];

  const copiar = async () => {
    try {
      await navigator.clipboard.writeText(textoCompartilhar(circuito));
    } catch {
      /* clipboard indisponível */
    }
  };

  return (
    <section className="space-y-4">
      <div className="rounded-3xl bg-ocean p-5 text-primary-foreground shadow-lift">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] opacity-80">Seu circuito</p>
        <h2 className="mt-1 text-3xl">{preset.nome} na areia</h2>
        <p className="mt-1 text-sm opacity-90">{preset.descricao}</p>
        <div className="mt-4 grid grid-cols-3 gap-2 text-center">
          {[
            { label: "Estações", valor: String(circuito.estacoes.length) },
            { label: "Rodadas", valor: String(circuito.config.rodadas) },
            { label: "Duração", valor: `${circuito.duracaoMin}′` },
          ].map((i) => (
            <div key={i.label} className="rounded-2xl bg-white/15 px-2 py-3 backdrop-blur">
              <p className="font-display text-2xl leading-none">{i.valor}</p>
              <p className="mt-1 text-[11px] uppercase tracking-wide opacity-80">{i.label}</p>
            </div>
          ))}
        </div>
        <p className="mt-3 flex items-center justify-center gap-2 text-sm opacity-90">
          <Clock className="size-4" />
          {circuito.config.trabalho}s de trabalho / {circuito.config.descanso}s de descanso
        </p>
        <div className="mt-4 flex gap-2">
          <button
            onClick={onRegenerar}
            className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-white/20 px-4 py-2.5 text-sm font-semibold backdrop-blur transition hover:bg-white/30"
          >
            <RefreshCw className="size-4" /> Novo sorteio
          </button>
          <button
            onClick={copiar}
            className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-white/20 px-4 py-2.5 text-sm font-semibold backdrop-blur transition hover:bg-white/30"
          >
            <Copy className="size-4" /> Copiar treino
          </button>
        </div>
      </div>

      {circuito.aquecimento.length > 0 && (
        <div className="rounded-2xl border border-dashed border-border bg-card/70 p-4">
          <h3 className="text-lg">Aquecimento · 5 min</h3>
          <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
            {circuito.aquecimento.map((ex) => (
              <li key={ex.id}>• {ex.nome}</li>
            ))}
          </ul>
        </div>
      )}

      <div className="space-y-3">
        {circuito.estacoes.map((est) => (
          <ExercicioCard key={est.exercicio.id} ex={est.exercicio} ordem={est.ordem} />
        ))}
      </div>

      <div className="rounded-2xl border border-border bg-card p-4 text-sm text-muted-foreground">
        <Dumbbell className="mr-1 inline size-4 text-primary" />
        Volta à calma: 3 min de caminhada na beira d'água + alongamento de posterior, panturrilha e ombros.
      </div>
    </section>
  );
}
