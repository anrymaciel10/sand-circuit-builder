import { useMemo, useState } from "react";
import { Search, Shuffle, X } from "lucide-react";
import {
  EQUIPAMENTOS,
  FOCOS,
  todosExercicios,
  type Equipamento,
  type Exercicio,
  type Foco,
} from "@/data/exercises";

/** Busca exercícios da areia por nome, material ou foco. */
export function buscarExercicios(
  termo: string,
  filtros: { equipamento?: Equipamento | "todos"; foco?: Foco | "todos" } = {},
): Exercicio[] {
  const t = termo.trim().toLowerCase();
  return todosExercicios().filter((ex) => {
    if (filtros.equipamento && filtros.equipamento !== "todos" && ex.equipamento !== filtros.equipamento)
      return false;
    if (filtros.foco && filtros.foco !== "todos" && ex.foco !== filtros.foco) return false;
    if (!t) return true;
    return (
      ex.nome.toLowerCase().includes(t) ||
      ex.descricao.toLowerCase().includes(t) ||
      ex.busca.toLowerCase().includes(t)
    );
  });
}

export function TrocarExercicio({
  atual,
  usados,
  onEscolher,
  onFechar,
}: {
  atual: Exercicio;
  usados: string[];
  onEscolher: (ex: Exercicio) => void;
  onFechar: () => void;
}) {
  const [termo, setTermo] = useState("");
  const [equipamento, setEquipamento] = useState<Equipamento | "todos">(atual.equipamento);
  const [foco, setFoco] = useState<Foco | "todos">("todos");

  const resultados = useMemo(
    () =>
      buscarExercicios(termo, { equipamento, foco })
        .filter((ex) => ex.id === atual.id || !usados.includes(ex.id))
        .slice(0, 60),
    [termo, equipamento, foco, usados, atual.id],
  );

  const sortear = () => {
    const opcoes = buscarExercicios("", { equipamento, foco }).filter(
      (ex) => !usados.includes(ex.id),
    );
    const escolhido = opcoes[Math.floor(Math.random() * opcoes.length)];
    if (escolhido) onEscolher(escolhido);
  };

  const chip = "rounded-full border px-3 py-1.5 text-xs font-semibold transition-colors";

  return (
    <div className="mt-3 rounded-2xl border border-primary/40 bg-background p-3">
      <div className="flex items-center gap-2">
        <div className="flex flex-1 items-center gap-2 rounded-xl border border-border px-3 py-2">
          <Search className="size-4 shrink-0 text-muted-foreground" />
          <input
            autoFocus
            value={termo}
            onChange={(e) => setTermo(e.target.value)}
            placeholder="Buscar exercício na areia..."
            className="w-full bg-transparent text-sm outline-none"
          />
        </div>
        <button
          onClick={sortear}
          aria-label="Sortear outro exercício"
          className="rounded-xl border border-border p-2 text-muted-foreground hover:text-accent"
        >
          <Shuffle className="size-4" />
        </button>
        <button
          onClick={onFechar}
          aria-label="Fechar troca de exercício"
          className="rounded-xl border border-border p-2 text-muted-foreground hover:text-destructive"
        >
          <X className="size-4" />
        </button>
      </div>

      <div className="mt-2 flex flex-wrap gap-1.5">
        <button
          onClick={() => setEquipamento("todos")}
          className={`${chip} ${equipamento === "todos" ? "border-transparent bg-sunset text-primary-foreground" : "border-border"}`}
        >
          Todo material
        </button>
        {EQUIPAMENTOS.map((eq) => (
          <button
            key={eq.id}
            onClick={() => setEquipamento(eq.id)}
            className={`${chip} ${equipamento === eq.id ? "border-transparent bg-sunset text-primary-foreground" : "border-border"}`}
          >
            {eq.emoji} {eq.nome}
          </button>
        ))}
      </div>

      <div className="mt-2 flex flex-wrap gap-1.5">
        <button
          onClick={() => setFoco("todos")}
          className={`${chip} ${foco === "todos" ? "border-transparent bg-accent text-accent-foreground" : "border-border"}`}
        >
          Todos os focos
        </button>
        {FOCOS.map((f) => (
          <button
            key={f.id}
            onClick={() => setFoco(f.id)}
            className={`${chip} ${foco === f.id ? "border-transparent bg-accent text-accent-foreground" : "border-border"}`}
          >
            {f.nome}
          </button>
        ))}
      </div>

      <ul className="mt-3 max-h-72 space-y-1 overflow-y-auto">
        {resultados.length === 0 && (
          <li className="py-6 text-center text-sm text-muted-foreground">
            Nenhum exercício encontrado com esses filtros.
          </li>
        )}
        {resultados.map((ex) => (
          <li key={ex.id}>
            <button
              onClick={() => onEscolher(ex)}
              className={`w-full rounded-xl px-3 py-2 text-left text-sm hover:bg-secondary/60 ${
                ex.id === atual.id ? "bg-secondary/60" : ""
              }`}
            >
              <span className="font-semibold">{ex.nome}</span>
              {ex.composto && <span className="ml-1 text-xs text-primary">• combinado</span>}
              <span className="block text-xs text-muted-foreground">{ex.descricao}</span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
