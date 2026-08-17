import {
  todosExercicios,
  type Equipamento,
  type Exercicio,
  type Foco,
} from "@/data/exercises";

export type Formato = "tabata" | "amrap" | "estacoes" | "emom";

export type Modalidade = "individual" | "dupla" | "trio";

export const MODALIDADES: {
  id: Modalidade;
  nome: string;
  descricao: string;
  dinamica: (nome: string) => string;
}[] = [
  {
    id: "individual",
    nome: "Individual",
    descricao: "Cada aluno cumpre o tempo da estação",
    dinamica: () => "Execute o tempo cheio da estação e troque no sinal.",
  },
  {
    id: "dupla",
    nome: "Dupla",
    descricao: "Um trabalha, o outro descansa ou apoia",
    dinamica: (nome) =>
      `Aluno A executa ${nome} enquanto B faz o revezamento ativo (corrida leve até o cone). Trocam na metade do tempo.`,
  },
  {
    id: "trio",
    nome: "Trio",
    descricao: "Rodízio contínuo entre trabalho, apoio e recuperação",
    dinamica: (nome) =>
      `A executa ${nome}, B conta as repetições e corrige a técnica, C faz recuperação ativa. Rodízio a cada 1/3 do tempo.`,
  },
];

export type Config = {
  equipamentos: Equipamento[];
  focos: Foco[];
  nivel: 1 | 2 | 3;
  estacoes: number;
  rodadas: number;
  trabalho: number;
  descanso: number;
  formato: Formato;
  modalidade: Modalidade;
  compostos?: boolean; // priorizar exercícios combinados / com deslocamento
};

export type Estacao = {
  ordem: number;
  exercicio: Exercicio;
};

export type Circuito = {
  id: string;
  criadoEm: number;
  nome?: string | undefined;
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
  return todosExercicios().filter((ex) => equipamentos.includes(ex.equipamento));
}

export function gerarCircuito(config: Config, seed = Date.now()): Circuito {
  const base = exerciciosDisponiveis(config.equipamentos).filter(
    (ex) => ex.nivel <= config.nivel,
  );

  const comFoco = config.focos.length
    ? base.filter((ex) => config.focos.includes(ex.foco))
    : base;

  const pool = comFoco.length >= 3 ? comFoco : base;
  const embaralhados = embaralhar(pool, seed);
  const sorteados = config.compostos
    ? [...embaralhados].sort((a, b) => Number(!!b.composto) - Number(!!a.composto))
    : embaralhados;

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

export function dinamicaDaEstacao(modalidade: Modalidade, nomeExercicio: string) {
  return (MODALIDADES.find((m) => m.id === modalidade) ?? MODALIDADES[0]!).dinamica(nomeExercicio);
}

export function serializarCircuito(c: Circuito) {
  const payload = {
    c: c.config,
    e: c.estacoes.map((s) => s.exercicio.id),
    a: c.aquecimento.map((ex) => ex.id),
    d: c.duracaoMin,
    n: c.nome,
  };
  return btoa(encodeURIComponent(JSON.stringify(payload)));
}

export function desserializarCircuito(token: string): Circuito | null {
  try {
    const raw = JSON.parse(decodeURIComponent(atob(token))) as {
      c: Config;
      e: string[];
      a: string[];
      d: number;
      n?: string;
    };
    const byId = (id: string) => todosExercicios().find((ex) => ex.id === id);
    const estacoes = raw.e
      .map((id, i) => {
        const ex = byId(id);
        return ex ? { ordem: i + 1, exercicio: ex } : null;
      })
      .filter(Boolean) as Estacao[];
    if (!estacoes.length) return null;
    return {
      id: String(Date.now()),
      criadoEm: Date.now(),
      nome: raw.n,
      config: raw.c,
      aquecimento: raw.a.map(byId).filter(Boolean) as Exercicio[],
      estacoes,
      duracaoMin: raw.d,
    };
  } catch {
    return null;
  }
}

export function textoCompartilhar(c: Circuito) {
  const p = PRESETS[c.config.formato];
  const linhas = [
    `🏖️ LIFE TRAINING — Circuito Funcional na Areia`,
    `Modalidade: ${c.config.modalidade}`,
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
