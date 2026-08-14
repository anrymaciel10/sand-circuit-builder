export type Perfil = {
  handle: string; // sem @
  nome: string;
  descricao: string;
  tags: string[];
};

export const PERFIS: Perfil[] = [
  {
    handle: "chizfit",
    nome: "Chiz Fit",
    descricao: "Circuitos funcionais criativos com muito movimento e exercícios combinados.",
    tags: ["funcional", "combinados", "circuito"],
  },
  {
    handle: "funcionalnaareia_",
    nome: "Funcional na Areia",
    descricao: "Ideias de estações na areia com cones, elástico e peso corporal.",
    tags: ["areia", "cones", "peso corporal"],
  },
  {
    handle: "funcional.na.areia",
    nome: "Funcional na Areia (perfil alternativo)",
    descricao: "Variações de treino de praia para turmas e treinos em dupla.",
    tags: ["areia", "dupla", "turma"],
  },
  {
    handle: "2bstudiofuncional",
    nome: "2B Studio Funcional",
    descricao: "Complexos com halteres, kettlebell e deslocamentos.",
    tags: ["halteres", "kettlebell", "complexos"],
  },
  {
    handle: "studiofighterfuncional",
    nome: "Studio Fighter Funcional",
    descricao: "Funcional com pegada de luta: potência, agilidade e reação.",
    tags: ["potência", "agilidade", "reação"],
  },
  {
    handle: "trainingcenterprof.ediposouza",
    nome: "Training Center — Prof. Édipo Souza",
    descricao: "Circuitos de alta intensidade e progressões por nível.",
    tags: ["hiit", "progressões", "circuito"],
  },
  {
    handle: "mb9funcional",
    nome: "MB9 Funcional",
    descricao: "Estações com bola medicinal, slam ball e corda naval.",
    tags: ["bola medicinal", "slam ball", "corda naval"],
  },
  {
    handle: "welpersonal",
    nome: "Wel Personal",
    descricao: "Exercícios compostos e treinos individuais bem detalhados.",
    tags: ["compostos", "individual", "técnica"],
  },
  {
    handle: "funcionalj7oficial",
    nome: "Funcional J7",
    descricao: "Treinos em grupo com muito deslocamento e dinâmica de turma.",
    tags: ["grupo", "deslocamento", "dinâmica"],
  },
  {
    handle: "studio.m10performace",
    nome: "Studio M10 Performance",
    descricao: "Performance esportiva: escada de agilidade, sprints e saltos.",
    tags: ["performance", "escada", "sprint"],
  },
];

export function linkPerfil(p: Perfil) {
  return `https://www.instagram.com/${p.handle}/`;
}

/** Busca de treinos dentro dos perfis de referência (Google) */
export function buscaNoPerfil(p: Perfil, termo: string) {
  const q = `site:instagram.com/${p.handle} ${termo}`.trim();
  return `https://www.google.com/search?q=${encodeURIComponent(q)}`;
}

/** Busca do termo em todos os perfis de referência de uma vez */
export function buscaEmTodosPerfis(termo: string) {
  const alvos = PERFIS.map((p) => `site:instagram.com/${p.handle}`).join(" OR ");
  return `https://www.google.com/search?q=${encodeURIComponent(`(${alvos}) ${termo}`.trim())}`;
}