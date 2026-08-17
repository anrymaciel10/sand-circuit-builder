import {
  definirExerciciosExtra,
  type Equipamento,
  type Exercicio,
  type Foco,
} from "@/data/exercises";
import { useCallback, useEffect, useState } from "react";

const K_IMPORTADOS = "lt.importados";

export type Plataforma = "youtube" | "instagram" | "tiktok" | "drive" | "web";

export const PLATAFORMAS: Record<Plataforma, { nome: string; emoji: string }> = {
  youtube: { nome: "YouTube", emoji: "▶️" },
  instagram: { nome: "Instagram", emoji: "📸" },
  tiktok: { nome: "TikTok", emoji: "🎵" },
  drive: { nome: "Google Drive", emoji: "📁" },
  web: { nome: "Site / outro", emoji: "🔗" },
};

export function detectarPlataforma(url: string): Plataforma {
  const u = url.toLowerCase();
  if (u.includes("youtube.com") || u.includes("youtu.be")) return "youtube";
  if (u.includes("instagram.com")) return "instagram";
  if (u.includes("tiktok.com")) return "tiktok";
  if (u.includes("drive.google.com")) return "drive";
  return "web";
}

export function urlValida(url: string) {
  try {
    const u = new URL(url.trim());
    return u.protocol === "http:" || u.protocol === "https:";
  } catch {
    return false;
  }
}

/** Sugere um nome a partir da própria URL (slug do link ou @perfil). */
export function sugerirNome(url: string) {
  try {
    const u = new URL(url.trim());
    const partes = u.pathname.split("/").filter(Boolean);
    const slug = partes.reverse().find((p) => p.length > 3 && !/^(p|reel|reels|shorts|file|d|view|watch)$/i.test(p));
    if (u.searchParams.get("v") && !slug) return "Exercício do YouTube";
    if (!slug) return `Exercício de ${PLATAFORMAS[detectarPlataforma(url)].nome}`;
    const limpo = decodeURIComponent(slug).replace(/[-_+]/g, " ").replace(/\.\w{2,4}$/, "");
    return limpo.charAt(0).toUpperCase() + limpo.slice(1);
  } catch {
    return "Novo exercício";
  }
}

export type EntradaImportacao = {
  nome: string;
  url: string;
  equipamento: Equipamento;
  foco: Foco;
  nivel: 1 | 2 | 3;
  descricao?: string;
  dica?: string;
  composto?: boolean;
  musculos?: string[];
  beneficio?: string;
};

function ler(): Exercicio[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(K_IMPORTADOS);
    return raw ? (JSON.parse(raw) as Exercicio[]) : [];
  } catch {
    return [];
  }
}

function gravar(lista: Exercicio[]) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(K_IMPORTADOS, JSON.stringify(lista));
  } catch {
    /* storage indisponível */
  }
  definirExerciciosExtra(lista);
}

export function listarImportados(): Exercicio[] {
  const lista = ler();
  definirExerciciosExtra(lista);
  return lista;
}

export function importarExercicio(entrada: EntradaImportacao): Exercicio {
  const ex: Exercicio = {
    id: `imp-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    nome: entrada.nome.trim() || sugerirNome(entrada.url),
    equipamento: entrada.equipamento,
    foco: entrada.foco,
    nivel: entrada.nivel,
    descricao: entrada.descricao?.trim() || "Exercício importado por link — abra o vídeo para ver a execução.",
    dica: entrada.dica?.trim() || "Confira o vídeo antes da aula e adapte o tempo de estação.",
    busca: entrada.nome.trim() || sugerirNome(entrada.url),
    url: entrada.url.trim(),
    origem: PLATAFORMAS[detectarPlataforma(entrada.url)].nome,
    ...(entrada.composto ? { composto: true } : {}),
    ...(entrada.musculos?.length ? { musculos: entrada.musculos } : {}),
    ...(entrada.beneficio?.trim() ? { beneficio: entrada.beneficio.trim() } : {}),
  };
  gravar([ex, ...ler()]);
  return ex;
}

/** Importação em lote: um link por linha (opcionalmente "Nome | link"). */
export function importarEmLote(
  texto: string,
  padrao: { equipamento: Equipamento; foco: Foco; nivel: 1 | 2 | 3 },
): { importados: number; ignorados: number } {
  const linhas = texto.split(/\r?\n/).map((l) => l.trim()).filter(Boolean);
  let importados = 0;
  let ignorados = 0;
  for (const linha of linhas) {
    const [a, b] = linha.includes("|") ? linha.split("|").map((s) => s.trim()) : [undefined, linha];
    const url = b ?? "";
    if (!urlValida(url)) {
      ignorados++;
      continue;
    }
    importarExercicio({ nome: a || sugerirNome(url), url, ...padrao });
    importados++;
  }
  return { importados, ignorados };
}

export function removerImportado(id: string): Exercicio[] {
  const restantes = ler().filter((ex) => ex.id !== id);
  gravar(restantes);
  return restantes;
}

/** Carrega os importados no pool do gerador e devolve a lista reativa. */
export function useImportados() {
  const [lista, setLista] = useState<Exercicio[]>([]);
  useEffect(() => {
    setLista(listarImportados());
  }, []);
  const recarregar = useCallback(() => setLista(listarImportados()), []);
  const remover = useCallback((id: string) => setLista(removerImportado(id)), []);
  return { lista, recarregar, remover };
}
