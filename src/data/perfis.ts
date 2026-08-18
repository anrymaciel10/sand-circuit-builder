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

export type Plataforma = "google" | "instagram" | "youtube" | "tiktok";

export const PLATAFORMAS_BUSCA: { id: Plataforma; nome: string; emoji: string }[] = [
  { id: "google", nome: "Google", emoji: "🔎" },
  { id: "instagram", nome: "Instagram", emoji: "📸" },
  { id: "youtube", nome: "YouTube", emoji: "▶️" },
  { id: "tiktok", nome: "TikTok", emoji: "🎵" },
];

/** Todas as tags usadas pelos perfis, para filtrar por assunto */
export const TAGS_PERFIS = [...new Set(PERFIS.flatMap((p) => p.tags))].sort();

/** Busca de treinos dentro de um perfil, na plataforma escolhida */
export function buscaNoPerfil(p: Perfil, termo: string, plataforma: Plataforma = "google") {
  const t = termo.trim();
  switch (plataforma) {
    case "instagram":
      return `https://www.instagram.com/explore/search/keyword/?q=${encodeURIComponent(`${t} ${p.handle}`.trim())}`;
    case "youtube":
      return `https://www.youtube.com/results?search_query=${encodeURIComponent(`${p.nome} ${t}`.trim())}`;
    case "tiktok":
      return `https://www.tiktok.com/search?q=${encodeURIComponent(`${p.handle} ${t}`.trim())}`;
    default:
      return `https://www.google.com/search?q=${encodeURIComponent(`site:instagram.com/${p.handle} ${t}`.trim())}`;
  }
}

/** Busca do termo em vários perfis de uma vez */
export function buscaEmPerfis(
  termo: string,
  handles: string[] = PERFIS.map((p) => p.handle),
  plataforma: Plataforma = "google",
) {
  const t = termo.trim();
  const lista = handles.length ? handles : PERFIS.map((p) => p.handle);
  if (plataforma === "google") {
    const alvos = lista.map((h) => `site:instagram.com/${h}`).join(" OR ");
    return `https://www.google.com/search?q=${encodeURIComponent(`(${alvos}) ${t}`.trim())}`;
  }
  const primeiro = PERFIS.find((p) => p.handle === lista[0]) ?? PERFIS[0]!;
  return buscaNoPerfil(primeiro, t, plataforma);
}

/** Compatibilidade com chamadas antigas */
export function buscaEmTodosPerfis(termo: string) {
  return buscaEmPerfis(termo);
}
