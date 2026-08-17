import type { Equipamento, Foco } from "./exercises";
import type { Formato, Modalidade } from "@/lib/circuito";

export type Pack = {
  id: string;
  nome: string;
  emoji: string;
  descricao: string;
  duracao: string;
  equipamentos: Equipamento[];
  focos: Foco[];
  nivel: 1 | 2 | 3;
  estacoes: number;
  formato: Formato;
  modalidade: Modalidade;
  compostos: boolean;
};

export const PACKS: Pack[] = [
  {
    id: "queima-rapida",
    nome: "Queima rápida",
    emoji: "🔥",
    descricao: "HIIT curto de peso corporal e cones para acabar com a aula suando.",
    duracao: "~20 min",
    equipamentos: ["peso-corporal", "cones"],
    focos: ["cardio", "potencia"],
    nivel: 2,
    estacoes: 6,
    formato: "tabata",
    modalidade: "individual",
    compostos: true,
  },
  {
    id: "forca-areia",
    nome: "Força na areia",
    emoji: "💪",
    descricao: "Kettlebell, halteres e TRX para um bloco de força completo.",
    duracao: "~40 min",
    equipamentos: ["kettlebell", "halteres", "trx"],
    focos: ["forca"],
    nivel: 2,
    estacoes: 7,
    formato: "estacoes",
    modalidade: "individual",
    compostos: false,
  },
  {
    id: "core-total",
    nome: "Core total",
    emoji: "🧱",
    descricao: "Abdômen, lombar e estabilidade com colchonete, bola e peso corporal.",
    duracao: "~25 min",
    equipamentos: ["colchonete", "bola-medicinal", "peso-corporal"],
    focos: ["core"],
    nivel: 1,
    estacoes: 6,
    formato: "estacoes",
    modalidade: "individual",
    compostos: false,
  },
  {
    id: "agilidade-performance",
    nome: "Agilidade & performance",
    emoji: "⚡",
    descricao: "Escada, aros, cones e paraquedas para velocidade e mudança de direção.",
    duracao: "~35 min",
    equipamentos: ["escada-agilidade", "aros", "cones", "paraquedas"],
    focos: ["agilidade", "potencia"],
    nivel: 2,
    estacoes: 8,
    formato: "estacoes",
    modalidade: "individual",
    compostos: true,
  },
  {
    id: "dupla-desafio",
    nome: "Desafio em dupla",
    emoji: "🤝",
    descricao: "Estações de revezamento com bola medicinal, corda naval e cones.",
    duracao: "~30 min",
    equipamentos: ["bola-medicinal", "corda-naval", "cones", "peso-corporal"],
    focos: ["potencia", "cardio"],
    nivel: 2,
    estacoes: 6,
    formato: "amrap",
    modalidade: "dupla",
    compostos: true,
  },
  {
    id: "turma-iniciante",
    nome: "Turma iniciante",
    emoji: "🌱",
    descricao: "Circuito seguro e progressivo só com material simples.",
    duracao: "~25 min",
    equipamentos: ["peso-corporal", "cones", "miniband", "colchonete"],
    focos: [],
    nivel: 1,
    estacoes: 6,
    formato: "estacoes",
    modalidade: "individual",
    compostos: false,
  },
  {
    id: "metcon-avancado",
    nome: "Metcon avançado",
    emoji: "🌋",
    descricao: "Slam ball, corda naval, pneu e halteres em ritmo alto.",
    duracao: "~40 min",
    equipamentos: ["slam-ball", "corda-naval", "pneu", "halteres"],
    focos: ["cardio", "potencia", "forca"],
    nivel: 3,
    estacoes: 8,
    formato: "emom",
    modalidade: "individual",
    compostos: true,
  },
  {
    id: "trio-rodizio",
    nome: "Rodízio em trio",
    emoji: "🔁",
    descricao: "Três alunos por estação, com trabalho, correção e recuperação ativa.",
    duracao: "~35 min",
    equipamentos: ["peso-corporal", "kettlebell", "escada-agilidade", "bola"],
    focos: [],
    nivel: 2,
    estacoes: 6,
    formato: "estacoes",
    modalidade: "trio",
    compostos: true,
  },
  {
    id: "equilibrio-mobilidade",
    nome: "Equilíbrio & mobilidade",
    emoji: "🧘",
    descricao: "Bosu, bastão e TRX para propriocepção e controle articular.",
    duracao: "~25 min",
    equipamentos: ["bosu", "bastao", "trx", "colchonete"],
    focos: ["equilibrio", "core"],
    nivel: 1,
    estacoes: 6,
    formato: "estacoes",
    modalidade: "individual",
    compostos: false,
  },
];
