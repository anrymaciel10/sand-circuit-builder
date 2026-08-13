import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import {
  Dumbbell,
  Flame,
  Instagram,
  Image as ImageIcon,
  Youtube,
  Clock,
  RefreshCw,
  Copy,
  FileDown,
  Heart,
  Save,
  Share2,
  Users,
  ChevronRight,
  Check,
} from "lucide-react";
import { linkGif, linkInstagram, linkYoutube, type Exercicio } from "@/data/exercises";
import {
  PRESETS,
  dinamicaDaEstacao,
  serializarCircuito,
  textoCompartilhar,
  type Circuito,
} from "@/lib/circuito";
import { alternarFavorito, listarFavoritos, salvarTreino } from "@/lib/storage";
import { exportarPDF } from "@/lib/pdf";

const FOCO_LABEL: Record<string, string> = {
  forca: "Força",
  potencia: "Potência",
  cardio: "Cardio",
  core: "Core",
  agilidade: "Agilidade",
  equilibrio: "Equilíbrio",
};

export function useFavoritos() {
  const [favoritos, setFavoritos] = useState<string[]>([]);
  useEffect(() => setFavoritos(listarFavoritos()), []);
  return {
    favoritos,
    alternar: (id: string) => setFavoritos(alternarFavorito(id)),
  };
}

export function BotaoFavorito({
  ativo,
  onClick,
  className = "",
}: {
  ativo: boolean;
  onClick: () => void;
  className?: string;
}) {
  return (
    <button
      onClick={onClick}
      aria-label={ativo ? "Remover dos favoritos" : "Favoritar exercício"}
      className={`flex size-9 shrink-0 items-center justify-center rounded-full border transition-colors ${
        ativo
          ? "border-transparent bg-primary/15 text-primary"
          : "border-border bg-background text-muted-foreground hover:text-primary"
      } ${className}`}
    >
      <Heart className={`size-4 ${ativo ? "fill-current" : ""}`} />
    </button>
  );
}

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

export function ExercicioCard({
  ex,
  ordem,
  dinamica,
  favorito,
  onFavoritar,
}: {
  ex: Exercicio;
  ordem?: number;
  dinamica?: string;
  favorito?: boolean;
  onFavoritar?: () => void;
}) {
  return (
    <article className="rounded-2xl border border-border bg-card p-4 shadow-soft">
      <div className="flex items-start gap-3">
        {ordem !== undefined && (
          <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-sunset font-display text-lg text-primary-foreground shadow-soft">
            {ordem}
          </span>
        )}
        <div className="min-w-0 flex-1">
          <div className="flex items-start gap-2">
            <h3 className="flex-1 text-xl leading-tight text-card-foreground">{ex.nome}</h3>
            {onFavoritar && <BotaoFavorito ativo={!!favorito} onClick={onFavoritar} />}
          </div>
          <div className="mt-1 flex flex-wrap items-center gap-2 text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
            <span className="rounded-full bg-accent/10 px-2 py-0.5 text-accent">
              {FOCO_LABEL[ex.foco]}
            </span>
            <span>Nível {ex.nivel}</span>
          </div>
          <p className="mt-2 text-sm text-muted-foreground">{ex.descricao}</p>
          <p className="mt-1 text-sm text-foreground/80">
            <Flame className="mr-1 inline size-3.5 text-primary" />
            {ex.dica}
          </p>
          {dinamica && (
            <p className="mt-2 rounded-xl bg-accent/10 p-2.5 text-sm text-foreground/80">
              <Users className="mr-1 inline size-3.5 text-accent" />
              {dinamica}
            </p>
          )}
          <div className="mt-3">
            <LinksMidia ex={ex} />
          </div>
          <Link
            to="/exercicio/$id"
            params={{ id: ex.id }}
            className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-accent hover:underline"
          >
            Ver detalhes <ChevronRight className="size-4" />
          </Link>
        </div>
      </div>
    </article>
  );
}

function AcaoBotao({
  onClick,
  children,
}: {
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-white/20 px-3 py-2.5 text-sm font-semibold backdrop-blur transition hover:bg-white/30"
    >
      {children}
    </button>
  );
}

export function CircuitoView({
  circuito,
  onRegenerar,
}: {
  circuito: Circuito;
  onRegenerar?: () => void;
}) {
  const preset = PRESETS[circuito.config.formato];
  const { favoritos, alternar } = useFavoritos();
  const [aviso, setAviso] = useState("");
  const [nome, setNome] = useState(circuito.nome ?? "");
  const [salvando, setSalvando] = useState(false);

  const flash = (texto: string) => {
    setAviso(texto);
    window.setTimeout(() => setAviso(""), 2500);
  };

  const copiar = async () => {
    try {
      await navigator.clipboard.writeText(textoCompartilhar(circuito));
      flash("Treino copiado para a área de transferência.");
    } catch {
      flash("Não foi possível copiar neste navegador.");
    }
  };

  const compartilhar = async () => {
    const url = `${window.location.origin}/treino?d=${serializarCircuito(circuito)}`;
    try {
      if (navigator.share) {
        await navigator.share({ title: "Circuito Life Training", url });
        return;
      }
      await navigator.clipboard.writeText(url);
      flash("Link do treino copiado!");
    } catch {
      flash("Link: " + url.slice(0, 60) + "...");
    }
  };

  const confirmarSalvar = () => {
    salvarTreino(circuito, nome || `Circuito ${preset.nome}`);
    setSalvando(false);
    flash("Treino salvo na sua biblioteca.");
  };

  return (
    <section className="space-y-4">
      <div className="rounded-3xl bg-ocean p-5 text-primary-foreground shadow-lift">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] opacity-80">
          {circuito.nome ? "Treino salvo" : "Seu circuito"}
        </p>
        <h2 className="mt-1 text-3xl">{circuito.nome || `${preset.nome} na areia`}</h2>
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
        <p className="mt-3 flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-sm opacity-90">
          <span className="flex items-center gap-1.5">
            <Clock className="size-4" />
            {circuito.config.trabalho}s / {circuito.config.descanso}s
          </span>
          <span className="flex items-center gap-1.5 capitalize">
            <Users className="size-4" />
            {circuito.config.modalidade}
          </span>
        </p>

        <div className="mt-4 grid grid-cols-2 gap-2">
          {onRegenerar && (
            <AcaoBotao onClick={onRegenerar}>
              <RefreshCw className="size-4" /> Novo sorteio
            </AcaoBotao>
          )}
          <AcaoBotao onClick={copiar}>
            <Copy className="size-4" /> Copiar
          </AcaoBotao>
          <AcaoBotao onClick={() => setSalvando((v) => !v)}>
            <Save className="size-4" /> Salvar
          </AcaoBotao>
          <AcaoBotao onClick={compartilhar}>
            <Share2 className="size-4" /> Compartilhar
          </AcaoBotao>
          <AcaoBotao
            onClick={() => exportarPDF(circuito, circuito.nome || `Circuito ${preset.nome}`)}
          >
            <FileDown className="size-4" /> PDF
          </AcaoBotao>
        </div>

        {salvando && (
          <div className="mt-3 flex gap-2">
            <input
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              placeholder="Nome do treino (ex: Turma 6h - segunda)"
              className="w-full rounded-xl bg-white/20 px-3 py-2.5 text-sm outline-none placeholder:text-white/60"
            />
            <button
              onClick={confirmarSalvar}
              className="flex items-center gap-1.5 rounded-xl bg-white px-4 py-2.5 text-sm font-semibold text-accent"
            >
              <Check className="size-4" /> Ok
            </button>
          </div>
        )}
        {aviso && <p className="mt-3 text-sm font-semibold text-sun">{aviso}</p>}
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
          <ExercicioCard
            key={est.exercicio.id}
            ex={est.exercicio}
            ordem={est.ordem}
            dinamica={dinamicaDaEstacao(circuito.config.modalidade, est.exercicio.nome)}
            favorito={favoritos.includes(est.exercicio.id)}
            onFavoritar={() => alternar(est.exercicio.id)}
          />
        ))}
      </div>

      <div className="rounded-2xl border border-border bg-card p-4 text-sm text-muted-foreground">
        <Dumbbell className="mr-1 inline size-4 text-primary" />
        Volta à calma: 3 min de caminhada na beira d'água + alongamento de posterior, panturrilha e
        ombros.
      </div>
    </section>
  );
}
