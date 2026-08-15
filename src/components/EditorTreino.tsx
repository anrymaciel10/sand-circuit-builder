import { useMemo, useState } from "react";
import { ArrowDown, ArrowUp, Check, Plus, Shuffle, Trash2, X } from "lucide-react";
import { EXERCICIOS, type Exercicio } from "@/data/exercises";
import { exerciciosDisponiveis, type Circuito, type Estacao } from "@/lib/circuito";

function renumerar(estacoes: Estacao[]): Estacao[] {
  return estacoes.map((e, i) => ({ ...e, ordem: i + 1 }));
}

export function EditorTreino({
  circuito,
  nomeInicial,
  onSalvar,
  onCancelar,
}: {
  circuito: Circuito;
  nomeInicial: string;
  onSalvar: (circuito: Circuito, nome: string) => void;
  onCancelar: () => void;
}) {
  const [nome, setNome] = useState(nomeInicial);
  const [estacoes, setEstacoes] = useState<Estacao[]>(circuito.estacoes);
  const [trabalho, setTrabalho] = useState(circuito.config.trabalho);
  const [descanso, setDescanso] = useState(circuito.config.descanso);
  const [rodadas, setRodadas] = useState(circuito.config.rodadas);
  const [busca, setBusca] = useState("");
  const [adicionando, setAdicionando] = useState(false);

  const pool = useMemo(() => {
    const base = exerciciosDisponiveis(circuito.config.equipamentos);
    return base.length ? base : EXERCICIOS;
  }, [circuito.config.equipamentos]);

  const candidatos = useMemo(
    () =>
      (busca
        ? EXERCICIOS.filter((ex) => ex.nome.toLowerCase().includes(busca.toLowerCase()))
        : pool
      ).slice(0, 30),
    [busca, pool],
  );

  const trocar = (index: number) => {
    const usados = new Set(estacoes.map((e) => e.exercicio.id));
    const opcoes = pool.filter((ex) => !usados.has(ex.id));
    const novo = opcoes[Math.floor(Math.random() * opcoes.length)];
    if (!novo) return;
    setEstacoes((atual) =>
      renumerar(atual.map((e, i) => (i === index ? { ...e, exercicio: novo } : e))),
    );
  };

  const mover = (index: number, delta: number) => {
    setEstacoes((atual) => {
      const alvo = index + delta;
      if (alvo < 0 || alvo >= atual.length) return atual;
      const copia = [...atual];
      const a = copia[index]!;
      copia[index] = copia[alvo]!;
      copia[alvo] = a;
      return renumerar(copia);
    });
  };

  const remover = (index: number) =>
    setEstacoes((atual) => renumerar(atual.filter((_, i) => i !== index)));

  const adicionar = (ex: Exercicio) => {
    setEstacoes((atual) => renumerar([...atual, { ordem: atual.length + 1, exercicio: ex }]));
    setAdicionando(false);
    setBusca("");
  };

  const salvar = () => {
    const segundos = (trabalho + descanso) * estacoes.length * rodadas;
    onSalvar(
      {
        ...circuito,
        nome,
        estacoes,
        config: { ...circuito.config, trabalho, descanso, rodadas },
        duracaoMin: Math.round(segundos / 60) + 8,
      },
      nome,
    );
  };

  const campo =
    "w-full rounded-xl border border-border bg-background px-3 py-2 text-sm outline-none focus:border-primary";

  return (
    <section className="rounded-3xl border border-primary/40 bg-card p-5 shadow-lift">
      <div className="flex items-center justify-between gap-3">
        <h2 className="text-2xl">Editar treino</h2>
        <button
          onClick={onCancelar}
          aria-label="Cancelar edição"
          className="rounded-xl border border-border p-2 text-muted-foreground hover:text-destructive"
        >
          <X className="size-4" />
        </button>
      </div>

      <label className="mt-4 block text-xs font-semibold uppercase tracking-wide text-muted-foreground">
        Nome do treino
      </label>
      <input value={nome} onChange={(e) => setNome(e.target.value)} className={`mt-1 ${campo}`} />

      <div className="mt-4 grid grid-cols-3 gap-2">
        {[
          { label: "Trabalho (s)", valor: trabalho, set: setTrabalho },
          { label: "Descanso (s)", valor: descanso, set: setDescanso },
          { label: "Rodadas", valor: rodadas, set: setRodadas },
        ].map((c) => (
          <div key={c.label}>
            <label className="block text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
              {c.label}
            </label>
            <input
              type="number"
              min={1}
              value={c.valor}
              onChange={(e) => c.set(Math.max(1, Number(e.target.value) || 1))}
              className={`mt-1 ${campo}`}
            />
          </div>
        ))}
      </div>

      <p className="mt-5 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
        Estações ({estacoes.length})
      </p>
      <ul className="mt-2 space-y-2">
        {estacoes.map((est, i) => (
          <li
            key={`${est.exercicio.id}-${i}`}
            className="flex items-center gap-2 rounded-xl border border-border bg-background p-2.5"
          >
            <span className="flex size-7 shrink-0 items-center justify-center rounded-lg bg-sunset font-display text-sm text-primary-foreground">
              {est.ordem}
            </span>
            <span className="min-w-0 flex-1 truncate text-sm font-semibold">
              {est.exercicio.nome}
            </span>
            <button onClick={() => mover(i, -1)} aria-label="Subir" className="p-1 text-muted-foreground hover:text-primary">
              <ArrowUp className="size-4" />
            </button>
            <button onClick={() => mover(i, 1)} aria-label="Descer" className="p-1 text-muted-foreground hover:text-primary">
              <ArrowDown className="size-4" />
            </button>
            <button onClick={() => trocar(i)} aria-label="Trocar exercício" className="p-1 text-muted-foreground hover:text-accent">
              <Shuffle className="size-4" />
            </button>
            <button onClick={() => remover(i)} aria-label="Remover estação" className="p-1 text-muted-foreground hover:text-destructive">
              <Trash2 className="size-4" />
            </button>
          </li>
        ))}
      </ul>

      {adicionando ? (
        <div className="mt-3 rounded-xl border border-border bg-background p-3">
          <input
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            placeholder="Buscar exercício para adicionar..."
            className={campo}
          />
          <ul className="mt-2 max-h-56 space-y-1 overflow-y-auto">
            {candidatos.map((ex) => (
              <li key={ex.id}>
                <button
                  onClick={() => adicionar(ex)}
                  className="w-full rounded-lg px-2 py-1.5 text-left text-sm hover:bg-secondary/60"
                >
                  {ex.nome}
                  {ex.composto && <span className="ml-1 text-xs text-primary">• combinado</span>}
                </button>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <button
          onClick={() => setAdicionando(true)}
          className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl border border-dashed border-border py-2.5 text-sm font-semibold hover:border-primary"
        >
          <Plus className="size-4" /> Adicionar estação
        </button>
      )}

      <button
        onClick={salvar}
        disabled={estacoes.length === 0}
        className="mt-4 flex w-full items-center justify-center gap-2 rounded-2xl bg-sunset px-6 py-3.5 font-display text-xl text-primary-foreground shadow-lift disabled:opacity-50"
      >
        <Check className="size-5" /> Salvar alterações
      </button>
    </section>
  );
}