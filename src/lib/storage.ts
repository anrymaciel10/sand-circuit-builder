import { desserializarCircuito, serializarCircuito, type Circuito } from "./circuito";

const K_TREINOS = "lt.treinos";
const K_FAVS = "lt.favoritos";

export type TreinoSalvo = {
  id: string;
  nome: string;
  criadoEm: number;
  token: string;
};

function ler<T>(chave: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = window.localStorage.getItem(chave);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function gravar(chave: string, valor: unknown) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(chave, JSON.stringify(valor));
  } catch {
    /* storage cheio ou indisponível */
  }
}

export function listarTreinos(): TreinoSalvo[] {
  return ler<TreinoSalvo[]>(K_TREINOS, []).sort((a, b) => b.criadoEm - a.criadoEm);
}

export function salvarTreino(circuito: Circuito, nome: string): TreinoSalvo {
  const treino: TreinoSalvo = {
    id: `${Date.now()}`,
    nome: nome.trim() || "Treino sem nome",
    criadoEm: Date.now(),
    token: serializarCircuito({ ...circuito, nome: nome.trim() }),
  };
  gravar(K_TREINOS, [treino, ...listarTreinos()]);
  return treino;
}

export function removerTreino(id: string) {
  gravar(
    K_TREINOS,
    listarTreinos().filter((t) => t.id !== id),
  );
}

export function circuitoDoTreino(treino: TreinoSalvo) {
  return desserializarCircuito(treino.token);
}

export function listarFavoritos(): string[] {
  return ler<string[]>(K_FAVS, []);
}

export function alternarFavorito(id: string): string[] {
  const atuais = listarFavoritos();
  const novos = atuais.includes(id) ? atuais.filter((f) => f !== id) : [...atuais, id];
  gravar(K_FAVS, novos);
  return novos;
}
