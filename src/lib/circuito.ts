import {
  EXERCICIOS,
  type Equipamento,
  type Exercicio,
  type Foco,
} from "@/data/exercises";

export type Formato = "tabata" | "amrap" | "estacoes" | "emom";

export type Config = {
  equipamentos: Equipamento[];
  focos: Foco[];
  nivel: 1 | 2 | 3;
  estacoes: number;
  rodadas: number;
  trabalho: number;
  descanso: number;
  formato: Formato;
};

export type Estacao = {
  ordem: number;
  exercicio: Exercicio;
};

export type Circuito = {
  id: string;
  criadoEm: number;
  config: Config;
  aquecimento: Exercicio[];
  estacoes: Estacao[];
  duracaoMin: number;
};

function embaralhar<T>(arr: T[], seed: number): T[] {
  const a = [...arr];
  let s = seed;
  const rnd = () => {
    s = (s * 1664525 + 1013904223) % 4294967296;
    return s / 4294967296;
  };
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rnd() * (i + 1));
    [a[i], a[j]] = [a[j]!, a[i]!];
  }
  return a;
}

export function exerciciosDisponiveis(equipamentos: Equipamento[]) {
  if (equipamentos.length === 0) return [];
  return EXERCICIOS.filter((ex) => equipamentos.includes(ex.equipamento));
}

export function gerarCircuito(config: Config, seed = Date.now()): Circuito {
  const base = exerciciosDisponiveis(config.equipamentos).filter(
    (ex) => ex.nivel <= config.nivel,
  );

  const comFoco = config.focos.length
    ? base.filter((ex) => config.focos.includes(ex.foco))
    : base;

  const pool = comFoco.length >= 3 ? comFoco : base;
  const sorteados = embaralhar(pool, seed);

  // distribui alternando focos para não repetir o mesmo estímulo em sequência
  const estacoes: Estacao[] = [];
  const usados = new Set<string>();
  let ultimoFoco = "";
  let tentativas = 0;
  while (estacoes.length < config.estacoes && tentativas < 500) {
    tentativas++;
    const candidato =
      sorteados.find((ex) => !usados.has(ex.id) && ex.foco !== ultimoFoco) ??
      sorteados.find((ex) => !usados.has(ex.id));
    if (!candidato) {
      usados.clear();
      continue;
    }
    usados.add(candidato.id);
    ultimoFoco = candidato.foco;
    estacoes.push({ ordem: estacoes.length + 1, exercicio: candidato });
  }

  const aquecimento = embaralhar(
    base.filter((ex) => ex.nivel === 1),
    seed + 7,
  ).slice(0, 3);

  const segundos =
    (config.trabalho + config.descanso) * estacoes.length * config.rodadas;
  const duracaoMin = Math.round(segundos / 60) + 8; // + aquecimento e volta à calma

  return {
    id: String(seed),
    criadoEm: seed,
    config,
    aquecimento,
    estacoes,
    duracaoMin,
  };
}

export const PRESETS: Record<Formato, { nome: string; descricao: string; trabalho: number; descanso: number; rodadas: number }> = {
  tabata: { nome: "Tabata", descricao: "20s de esforço máximo / 10s de pausa", trabalho: 20, descanso: 10, rodadas: 4 },
  estacoes: { nome: "Estações", descricao: "40s de trabalho / 20s de troca", trabalho: 40, descanso: 20, rodadas: 3 },
  amrap: { nome: "AMRAP", descricao: "Máximo de voltas no tempo total", trabalho: 45, descanso: 15, rodadas: 3 },
  emom: { nome: "EMOM", descricao: "A cada minuto, um exercício novo", trabalho: 45, descanso: 15, rodadas: 4 },
};

export function textoCompartilhar(c: Circuito) {
  const p = PRESETS[c.config.formato];
  const linhas = [
    `🏖️ LIFE TRAINING — Circuito Funcional na Areia`,
    `Formato: ${p.nome} (${c.config.trabalho}s trabalho / ${c.config.descanso}s descanso) • ${c.config.rodadas} rodadas • ~${c.duracaoMin} min`,
    ``,
    `AQUECIMENTO (5 min):`,
    ...c.aquecimento.map((ex) => `• ${ex.nome}`),
    ``,
    `CIRCUITO:`,
    ...c.estacoes.map((e) => `${e.ordem}. ${e.exercicio.nome} — ${e.exercicio.descricao}`),
  ];
  return linhas.join("\n");
}
