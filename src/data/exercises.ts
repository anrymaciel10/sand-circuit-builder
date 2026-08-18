export type Equipamento =
  | "peso-corporal"
  | "cones"
  | "escada-agilidade"
  | "miniband"
  | "elastico"
  | "bola-medicinal"
  | "slam-ball"
  | "corda-naval"
  | "kettlebell"
  | "halteres"
  | "trx"
  | "bosu"
  | "step"
  | "corda-de-pular"
  | "bastao"
  | "paraquedas"
  | "aros"
  | "pneu"
  | "colchonete"
  | "bola";

export const EQUIPAMENTOS: { id: Equipamento; nome: string; emoji: string }[] = [
  { id: "peso-corporal", nome: "Peso corporal", emoji: "🤸" },
  { id: "cones", nome: "Cones", emoji: "🔶" },
  { id: "escada-agilidade", nome: "Escada de agilidade", emoji: "🪜" },
  { id: "miniband", nome: "Mini band", emoji: "⭕" },
  { id: "elastico", nome: "Elástico / tubing", emoji: "🎗️" },
  { id: "bola-medicinal", nome: "Bola medicinal", emoji: "🏐" },
  { id: "slam-ball", nome: "Slam ball", emoji: "💣" },
  { id: "corda-naval", nome: "Corda naval", emoji: "🪢" },
  { id: "kettlebell", nome: "Kettlebell", emoji: "🔔" },
  { id: "halteres", nome: "Halteres", emoji: "🏋️" },
  { id: "trx", nome: "TRX / fita suspensa", emoji: "🧗" },
  { id: "bosu", nome: "Bosu", emoji: "🌗" },
  { id: "step", nome: "Step / caixote", emoji: "🟦" },
  { id: "corda-de-pular", nome: "Corda de pular", emoji: "➰" },
  { id: "bastao", nome: "Bastão", emoji: "🪵" },
  { id: "paraquedas", nome: "Paraquedas de corrida", emoji: "🪂" },
  { id: "aros", nome: "Aros / argolas de chão", emoji: "⚪" },
  { id: "pneu", nome: "Pneu", emoji: "🛞" },
  { id: "colchonete", nome: "Colchonete", emoji: "🟩" },
  { id: "bola", nome: "Bola (futevôlei/futebol)", emoji: "⚽" },
];

export type Foco = "forca" | "cardio" | "core" | "agilidade" | "potencia" | "equilibrio";

export const FOCOS: { id: Foco; nome: string }[] = [
  { id: "forca", nome: "Força" },
  { id: "potencia", nome: "Potência" },
  { id: "cardio", nome: "Cardio" },
  { id: "core", nome: "Core" },
  { id: "agilidade", nome: "Agilidade" },
  { id: "equilibrio", nome: "Equilíbrio" },
];

export type Exercicio = {
  id: string;
  nome: string;
  equipamento: Equipamento;
  foco: Foco;
  nivel: 1 | 2 | 3;
  descricao: string;
  dica: string;
  busca: string; // termo usado para montar links de vídeo
  composto?: boolean; // combina duas ações em uma repetição / tem deslocamento
  musculos?: string[];
  beneficio?: string;
  /** exercício importado por link (vídeo próprio, post do Instagram, Drive, etc.) */
  url?: string;
  origem?: string;
};

const e = (
  id: string,
  nome: string,
  equipamento: Equipamento,
  foco: Foco,
  nivel: 1 | 2 | 3,
  descricao: string,
  dica: string,
  busca?: string,
): Exercicio => ({ id, nome, equipamento, foco, nivel, descricao, dica, busca: busca ?? nome });

// combinados: dois movimentos numa repetição ou com deslocamento
const c = (
  id: string,
  nome: string,
  equipamento: Equipamento,
  foco: Foco,
  nivel: 1 | 2 | 3,
  descricao: string,
  dica: string,
  busca: string,
  musculos: string[],
  beneficio: string,
): Exercicio => ({
  id,
  nome,
  equipamento,
  foco,
  nivel,
  descricao,
  dica,
  busca,
  composto: true,
  musculos,
  beneficio,
});

export const EXERCICIOS: Exercicio[] = [
  // Peso corporal
  e("pc1", "Sprint na areia (20 m)", "peso-corporal", "cardio", 2, "Tiros curtos de corrida máxima na areia fofa, volta caminhando.", "Tronco levemente inclinado e braços ativos.", "sprint na areia treino funcional"),
  e("pc2", "Burpee na areia", "peso-corporal", "cardio", 2, "Agacha, joga os pés atrás, peito na areia, levanta e salta.", "Na areia fofa, priorize ritmo constante em vez de velocidade.", "burpee na praia"),
  e("pc3", "Agachamento com salto", "peso-corporal", "potencia", 2, "Agacha até 90° e explode em salto vertical, aterrissando macio.", "A areia absorve impacto: aproveite para mais volume.", "agachamento com salto areia"),
  e("pc4", "Afundo alternado", "peso-corporal", "forca", 1, "Passada longa alternando pernas, joelho quase tocando a areia.", "Joelho alinhado ao pé.", "afundo passada treino funcional"),
  e("pc5", "Prancha isométrica", "peso-corporal", "core", 1, "Apoio nos antebraços e pontas dos pés, corpo em linha.", "Na areia, afunde os cotovelos para estabilizar.", "prancha abdominal isometrica"),
  e("pc6", "Mountain climber", "peso-corporal", "core", 2, "Em apoio de prancha, alterne joelhos rápido em direção ao peito.", "Quadril baixo, sem balançar.", "mountain climber exercicio"),
  e("pc7", "Bear crawl (caminhada do urso)", "peso-corporal", "core", 2, "Quatro apoios com joelhos suspensos, avançando na areia.", "Ótimo para ombros e core em terreno instável.", "bear crawl na areia"),
  e("pc8", "Corrida com joelhos altos", "peso-corporal", "cardio", 1, "Skipping alto no lugar ou avançando na areia.", "Cadência alta, pisada leve.", "skipping alto treino"),
  e("pc9", "Salto horizontal (broad jump)", "peso-corporal", "potencia", 2, "Salto para frente com os dois pés, braços acompanhando.", "Meça a distância na areia e desafie o aluno.", "broad jump salto horizontal"),
  e("pc10", "Flexão de braço na areia", "peso-corporal", "forca", 2, "Flexão tradicional com mãos afundadas na areia.", "Aumenta amplitude e ativação de peitoral.", "flexao de braco na areia"),

  // Cones
  e("co1", "Corrida em ziguezague nos cones", "cones", "agilidade", 1, "Slalom entre 6 cones espaçados 2 m na areia.", "Baixe o centro de gravidade nas mudanças.", "ziguezague cones agilidade"),
  e("co2", "Shuttle run 5-10-15 m", "cones", "cardio", 2, "Ida e volta tocando o cone a cada distância.", "Trabalhe a desaceleração, difícil na areia.", "shuttle run cones"),
  e("co3", "Drill do T", "cones", "agilidade", 2, "Sprint frontal, deslocamento lateral e recuo em formato de T.", "Sem cruzar os pés no deslocamento lateral.", "t drill agilidade"),
  e("co4", "Sprint com troca de direção no apito", "cones", "agilidade", 3, "Aluno corre e muda de cone conforme comando do professor.", "Excelente para reação em grupo.", "treino reacao mudanca de direcao"),
  e("co5", "Corrida em 8 entre cones", "cones", "cardio", 1, "Percurso em formato de oito ao redor de dois cones.", "Mantenha o tronco estável na curva.", "corrida em oito cones"),

  // Escada de agilidade
  e("ea1", "Escada: um pé por espaço", "escada-agilidade", "agilidade", 1, "Passagem rápida com um apoio em cada casa.", "Olhar à frente, braços ritmados.", "escada de agilidade um pe"),
  e("ea2", "Escada: in-in-out-out", "escada-agilidade", "agilidade", 2, "Dois pés dentro, dois fora, avançando.", "Cadência acelerada e pisada curta.", "escada agilidade in in out out"),
  e("ea3", "Escada: deslocamento lateral", "escada-agilidade", "agilidade", 2, "Passagem lateral com apoio duplo em cada casa.", "Quadril baixo.", "escada agilidade lateral"),
  e("ea4", "Escada: saltos com dois pés", "escada-agilidade", "potencia", 2, "Saltos consecutivos casa a casa.", "Contato rápido com o solo.", "escada agilidade saltos"),

  // Mini band / elástico
  e("mb1", "Caminhada lateral com mini band", "miniband", "forca", 1, "Band acima dos joelhos, passos laterais em semi-agachamento.", "Tensão constante no elástico.", "caminhada lateral mini band"),
  e("mb2", "Monster walk", "miniband", "forca", 2, "Passos diagonais para frente com band nos tornozelos.", "Ativa glúteo médio.", "monster walk mini band"),
  e("mb3", "Glúteo em quatro apoios com band", "miniband", "forca", 1, "Extensão de quadril contra a resistência do elástico.", "Sem hiperextender a lombar.", "kickback gluteo mini band"),
  e("el1", "Remada com elástico", "elastico", "forca", 1, "Elástico preso em poste/parceiro, puxada até as costelas.", "Escápulas retraídas.", "remada com elastico"),
  e("el2", "Sprint resistido com elástico", "elastico", "potencia", 3, "Parceiro segura o elástico enquanto o aluno arranca.", "10 a 15 m de arranque máximo.", "sprint resistido elastico"),
  e("el3", "Supino/empurrar com elástico", "elastico", "forca", 1, "Elástico nas costas, extensão de cotovelos à frente.", "Core firme.", "supino com elastico em pe"),
  e("el4", "Rotação de tronco (pallof press)", "elastico", "core", 2, "Resista à rotação empurrando o elástico à frente.", "Anti-rotação: quadril fixo.", "pallof press elastico"),

  // Bola medicinal / slam ball
  e("bm1", "Arremesso frontal da bola medicinal", "bola-medicinal", "potencia", 2, "Arremesso explosivo à frente a partir do agachamento.", "Ótimo em dupla, na areia.", "arremesso bola medicinal"),
  e("bm2", "Russian twist com bola", "bola-medicinal", "core", 1, "Sentado, pés suspensos, rotação de tronco tocando a areia.", "Movimento controlado.", "russian twist bola medicinal"),
  e("bm3", "Wall/partner chest pass", "bola-medicinal", "potencia", 1, "Passe explosivo no peito para o parceiro.", "Extensão total dos braços.", "chest pass bola medicinal"),
  e("bm4", "Agachamento com bola acima da cabeça", "bola-medicinal", "forca", 2, "Overhead squat segurando a bola.", "Mantém a bola alinhada aos ombros.", "overhead squat bola medicinal"),
  e("sb1", "Slam ball (arremesso ao solo)", "slam-ball", "potencia", 2, "Levanta acima da cabeça e arremessa forte na areia.", "Expire no impacto.", "slam ball exercicio"),
  e("sb2", "Slam ball com burpee", "slam-ball", "cardio", 3, "Slam + burpee em sequência contínua.", "Estação de alta intensidade.", "slam ball burpee"),

  // Corda naval
  e("cn1", "Ondas alternadas na corda naval", "corda-naval", "cardio", 2, "Ondas rápidas alternando braços em semi-agachamento.", "Amplitude curta e frequência alta.", "battle rope ondas alternadas"),
  e("cn2", "Ondas duplas + agachamento", "corda-naval", "potencia", 2, "Onda dupla simultânea acompanhada de agachamento.", "Use o quadril, não só os braços.", "battle rope onda dupla"),
  e("cn3", "Corda naval em círculos", "corda-naval", "forca", 2, "Movimentos circulares para dentro e para fora.", "Trabalha ombros e core.", "battle rope circulos"),
  e("cn4", "Slam com corda naval", "corda-naval", "potencia", 3, "Levanta as duas pontas e bate forte na areia.", "Explosão total do quadril.", "battle rope slam"),

  // Kettlebell / halteres
  e("kb1", "Kettlebell swing", "kettlebell", "potencia", 2, "Balanço explosivo do quadril até a altura dos ombros.", "Movimento de dobradiça, não agachamento.", "kettlebell swing tecnica"),
  e("kb2", "Goblet squat", "kettlebell", "forca", 1, "Agachamento segurando o kettlebell no peito.", "Cotovelos por dentro dos joelhos.", "goblet squat kettlebell"),
  e("kb3", "Farmer walk na areia", "kettlebell", "forca", 1, "Caminhada carregada de 20 a 30 m.", "Ombros para trás, passo firme.", "farmer walk caminhada do fazendeiro"),
  e("kb4", "Clean and press", "kettlebell", "potencia", 3, "Puxada até o ombro e desenvolvimento acima da cabeça.", "Exige boa técnica.", "kettlebell clean and press"),
  e("ha1", "Desenvolvimento de ombros com halteres", "halteres", "forca", 1, "Empurre os halteres acima da cabeça em pé.", "Core contraído.", "desenvolvimento ombros halteres"),
  e("ha2", "Remada curvada com halteres", "halteres", "forca", 2, "Tronco inclinado, puxada até as costelas.", "Coluna neutra.", "remada curvada halteres"),
  e("ha3", "Afundo caminhando com halteres", "halteres", "forca", 2, "Passadas longas na areia com carga nas mãos.", "20 a 30 m por série.", "afundo caminhando halteres"),
  e("ha4", "Thruster com halteres", "halteres", "cardio", 3, "Agachamento + desenvolvimento em um só movimento.", "Estação metabólica.", "thruster halteres"),

  // TRX
  e("tr1", "Remada invertida no TRX", "trx", "forca", 1, "Puxada do corpo em suspensão, tronco alinhado.", "Quanto mais deitado, mais difícil.", "remada trx"),
  e("tr2", "Flexão no TRX", "trx", "forca", 2, "Flexão com as mãos nas alças suspensas.", "Instabilidade extra para o core.", "flexao trx"),
  e("tr3", "Agachamento unilateral no TRX", "trx", "equilibrio", 2, "Pistol assistido pelas alças.", "Desça devagar.", "agachamento unilateral trx"),
  e("tr4", "Prancha com joelho ao peito no TRX", "trx", "core", 3, "Pés nas alças, leve os joelhos ao peito.", "Quadril estável.", "knee tuck trx"),

  // Bosu / step
  e("bo1", "Agachamento no Bosu", "bosu", "equilibrio", 2, "Agachamento em cima da cúpula instável.", "Olhar fixo em um ponto.", "agachamento no bosu"),
  e("bo2", "Prancha com apoio no Bosu", "bosu", "core", 2, "Antebraços sobre o Bosu, corpo alinhado.", "Aumente o tempo aos poucos.", "prancha no bosu"),
  e("bo3", "Salto sobre o Bosu", "bosu", "potencia", 3, "Subida em salto e aterrissagem controlada.", "Só para alunos avançados.", "salto no bosu"),
  e("st1", "Step up (subida no caixote)", "step", "forca", 1, "Subida alternada apoiando o pé inteiro.", "Empurre com o calcanhar.", "step up caixote"),
  e("st2", "Box jump", "step", "potencia", 3, "Salto com dois pés sobre o caixote.", "Desça sempre caminhando.", "box jump tecnica"),
  e("st3", "Flexão declinada no step", "step", "forca", 2, "Pés elevados no caixote, flexão de braço.", "Ativa porção clavicular.", "flexao declinada"),

  // Corda de pular
  e("cp1", "Pular corda simples", "corda-de-pular", "cardio", 1, "Saltos contínuos com os dois pés.", "Na areia firme, perto da água.", "pular corda treino"),
  e("cp2", "Corda: corrida no lugar", "corda-de-pular", "cardio", 2, "Alternando pés como se corresse.", "Aumenta o ritmo cardíaco rápido.", "pular corda corrida no lugar"),
  e("cp3", "Double under", "corda-de-pular", "potencia", 3, "Duas voltas da corda por salto.", "Só com solo firme.", "double under corda"),

  // Bastão / paraquedas / aros / pneu
  e("ba1", "Mobilidade de ombros com bastão", "bastao", "equilibrio", 1, "Passagens do bastão à frente e atrás da cabeça.", "Ótimo no aquecimento.", "mobilidade ombro bastao"),
  e("ba2", "Good morning com bastão", "bastao", "forca", 1, "Flexão de quadril com bastão nas costas.", "Coluna neutra.", "good morning bastao"),
  e("ba3", "Agachamento overhead com bastão", "bastao", "equilibrio", 2, "Agachamento com o bastão acima da cabeça.", "Teste de mobilidade.", "overhead squat bastao"),
  e("pa1", "Sprint com paraquedas", "paraquedas", "potencia", 3, "Tiros de 20 a 30 m com resistência do paraquedas.", "Contra o vento fica ainda mais forte.", "sprint com paraquedas treino"),
  e("ar1", "Deslocamento entre aros", "aros", "agilidade", 1, "Passagem rápida pisando dentro de cada aro.", "Varie o padrão dos apoios.", "treino com argolas de agilidade"),
  e("ar2", "Saltos unipodais nos aros", "aros", "equilibrio", 2, "Saltos em uma perna de aro em aro.", "Estabilize 1s a cada aterrissagem.", "salto unipodal argolas"),
  e("pn1", "Viradas de pneu", "pneu", "forca", 3, "Levantar e virar o pneu com pegada baixa.", "Empurre com as pernas, não com as costas.", "virada de pneu tire flip"),
  e("pn2", "Saltos dentro/fora do pneu", "pneu", "potencia", 2, "Saltos consecutivos entrando e saindo do pneu.", "Aterrissagem macia.", "saltos no pneu treino"),

  // Colchonete / bola
  e("cl1", "Abdominal remador", "colchonete", "core", 1, "Flexão simultânea de tronco e pernas.", "Movimento contínuo.", "abdominal remador"),
  e("cl2", "Ponte de glúteo", "colchonete", "forca", 1, "Elevação do quadril com pés apoiados.", "Segure 1s no topo.", "ponte de gluteo"),
  e("cl3", "Superman", "colchonete", "core", 1, "Em decúbito ventral, eleve braços e pernas.", "Fortalece a cadeia posterior.", "exercicio superman lombar"),
  e("bl1", "Passe de peito com bola em dupla", "bola", "cardio", 1, "Passes rápidos alternando com deslocamento lateral.", "Ótimo para dinâmica em grupo.", "passe de peito em dupla treino"),
  e("bl2", "Circuito com domínio de bola", "bola", "agilidade", 2, "Conduza a bola entre cones na areia.", "Integra coordenação e cardio.", "conducao de bola na areia"),

  // ===== COMBINADOS: duas ações numa repetição / com deslocamento =====
  c("cb1", "Agachamento + deslocamento lateral", "peso-corporal", "agilidade", 1,
    "Agacha, sobe e corre 3 passos laterais; agacha de novo do outro lado.",
    "Pés nunca se cruzam no deslocamento e o quadril fica baixo.",
    "agachamento com deslocamento lateral funcional",
    ["Quadríceps", "Glúteo médio", "Glúteo máximo", "Adutores", "Panturrilhas"],
    "Une força de pernas e mudança de direção — melhora arranque lateral e estabilidade do joelho na areia."),
  c("cb2", "Agachamento com salto + sprint 10 m", "peso-corporal", "potencia", 2,
    "3 saltos verticais a partir do agachamento e emenda um sprint curto.",
    "Transição imediata: o último salto já vira a primeira passada.",
    "agachamento salto sprint treino funcional",
    ["Quadríceps", "Glúteos", "Isquiotibiais", "Panturrilhas", "Core"],
    "Transfere potência de salto para aceleração, exatamente o gesto do futevôlei e do beach tennis."),
  c("cb3", "Afundo com rotação de tronco", "peso-corporal", "core", 1,
    "A cada passada, gire o tronco para o lado da perna da frente.",
    "Gire a partir das costelas, mantendo o quadril de frente.",
    "afundo com rotacao de tronco",
    ["Quadríceps", "Glúteos", "Oblíquos", "Transverso do abdome"],
    "Combina força unilateral e rotação: melhora equilíbrio e o giro do tronco em chutes e saques."),
  c("cb4", "Burpee + salto lateral no cone", "cones", "cardio", 2,
    "Burpee completo e, ao levantar, salto lateral por cima do cone; repete do outro lado.",
    "Aterrissagem macia, joelho alinhado ao pé.",
    "burpee com salto lateral cone",
    ["Peitoral", "Tríceps", "Quadríceps", "Glúteos", "Core", "Sistema cardiorrespiratório"],
    "Estação metabólica completa: condicionamento, potência de salto e controle de aterrissagem."),
  c("cb5", "Prancha com deslocamento lateral (walkout)", "peso-corporal", "core", 2,
    "Em prancha alta, caminhe com mãos e pés 4 apoios para cada lado.",
    "Quadril na altura dos ombros, sem balançar.",
    "prancha com deslocamento lateral",
    ["Transverso do abdome", "Oblíquos", "Deltoide anterior", "Serrátil", "Peitoral"],
    "Core anti-rotação em movimento — protege a lombar e melhora estabilidade de ombro."),
  c("cb6", "Agachamento + arremesso da bola medicinal", "bola-medicinal", "potencia", 2,
    "Desce no agachamento com a bola no peito e explode arremessando para o parceiro.",
    "A força sai das pernas; braços só finalizam.",
    "agachamento com arremesso bola medicinal",
    ["Quadríceps", "Glúteos", "Deltoides", "Tríceps", "Core"],
    "Triple extension: ensina a transferir força do chão para os braços, base de todo gesto explosivo."),
  c("cb7", "Kettlebell swing + agachamento", "kettlebell", "potencia", 2,
    "Dois swings e um goblet squat, em fluxo contínuo.",
    "Swing é dobradiça de quadril; squat é flexão de joelho. Sinta a diferença.",
    "kettlebell swing goblet squat complex",
    ["Glúteos", "Isquiotibiais", "Quadríceps", "Lombar", "Antebraços"],
    "Trabalha cadeia posterior e anterior no mesmo bloco, elevando muito o gasto calórico."),
  c("cb8", "Thruster + passada lateral", "halteres", "cardio", 3,
    "Thruster completo e, ao descer os halteres, dê dois passos laterais antes da próxima repetição.",
    "Respire no topo do movimento.",
    "thruster com deslocamento lateral halteres",
    ["Quadríceps", "Glúteos", "Deltoides", "Tríceps", "Core"],
    "Corpo inteiro com deslocamento: alta demanda cardiovascular em pouco tempo."),
  c("cb9", "Farmer walk + agachamento a cada 10 passos", "kettlebell", "forca", 2,
    "Caminhada carregada; a cada 10 passos, um agachamento com a carga.",
    "Ombros para trás e passo firme na areia fofa.",
    "farmer walk com agachamento",
    ["Trapézio", "Antebraços", "Core", "Quadríceps", "Glúteos"],
    "Força de preensão e estabilidade de tronco sob carga em deslocamento."),
  c("cb10", "Escada de agilidade + sprint de saída", "escada-agilidade", "agilidade", 2,
    "Passa a escada em cadência alta e emenda 10 m de sprint.",
    "Sai da escada já em aceleração, sem pausar.",
    "escada de agilidade com sprint",
    ["Panturrilhas", "Quadríceps", "Flexores do quadril", "Core"],
    "Liga frequência de passo e aceleração — clássico para velocidade nos primeiros metros."),
  c("cb11", "Slam ball + burpee + deslocamento", "slam-ball", "cardio", 3,
    "Slam na areia, burpee sobre a bola e três passos laterais para repetir do outro lado.",
    "Expire forte no impacto da bola.",
    "slam ball burpee deslocamento",
    ["Dorsais", "Core", "Ombros", "Quadríceps", "Glúteos", "Sistema cardiorrespiratório"],
    "Estação de alta intensidade que combina potência, condicionamento e agilidade."),
  c("cb12", "Remada com elástico + passada para trás", "elastico", "forca", 1,
    "Puxa o elástico até as costelas e, ao soltar, dê uma passada atrás em afundo.",
    "Escápulas retraídas durante toda a puxada.",
    "remada com elastico e afundo",
    ["Dorsais", "Romboides", "Bíceps", "Glúteos", "Quadríceps"],
    "Postura e força de puxada somadas ao trabalho unilateral de perna."),
  c("cb13", "Prancha com toque no ombro + salto para agachamento", "peso-corporal", "core", 2,
    "4 toques alternados nos ombros, salte os pés para as mãos e finalize em agachamento.",
    "Quadril firme nos toques, sem rodar.",
    "prancha toque no ombro squat jump in",
    ["Core", "Ombros", "Peitoral", "Quadríceps", "Glúteos"],
    "Sequência que exige controle de tronco e transição rápida do chão para de pé."),
  c("cb14", "Corrida em ziguezague + burpee no cone", "cones", "cardio", 2,
    "Slalom entre os cones e um burpee ao chegar no último cone; volta correndo.",
    "Use os braços na virada para não perder velocidade.",
    "ziguezague com burpee treino funcional",
    ["Quadríceps", "Glúteos", "Adutores", "Peitoral", "Core"],
    "Mistura agilidade e condicionamento — ideal para fechar o circuito em grupo."),
  c("cb15", "Step up + joelhada explosiva", "step", "potencia", 2,
    "Sobe no caixote e finaliza levando o joelho oposto à altura do peito com salto.",
    "Empurre com o calcanhar da perna de apoio.",
    "step up com joelhada explosiva",
    ["Glúteos", "Quadríceps", "Flexores do quadril", "Panturrilhas", "Core"],
    "Potência unilateral e equilíbrio dinâmico, muito próximo do gesto da corrida."),
  c("cb16", "Ondas na corda naval + deslocamento lateral", "corda-naval", "cardio", 3,
    "Mantém as ondas alternadas enquanto anda dois passos para cada lado.",
    "Cadência dos braços não pode cair no deslocamento.",
    "battle rope com deslocamento lateral",
    ["Ombros", "Antebraços", "Core", "Glúteo médio", "Quadríceps"],
    "Braços em esforço contínuo com pernas em deslocamento: pico cardiovascular."),

  // ===== AMPLIAÇÃO POR MATERIAL (repertório de funcional na areia) =====
  // Peso corporal
  e("pc11", "Corrida lateral com toque na areia", "peso-corporal", "agilidade", 1, "Deslocamento lateral tocando a areia a cada mudança de lado.", "Quadril baixo e pés sem cruzar.", "corrida lateral toque no chao funcional areia"),
  e("pc12", "Polichinelo com agachamento", "peso-corporal", "cardio", 1, "Dois polichinelos e um agachamento completo.", "Cadência constante.", "polichinelo com agachamento funcional"),
  e("pc13", "Skater jump (salto do patinador)", "peso-corporal", "potencia", 2, "Saltos laterais de uma perna para a outra, aterrissando estável.", "Segure 1s na aterrissagem.", "skater jump treino na areia"),
  e("pc14", "Corrida de costas (backpedal) 20 m", "peso-corporal", "agilidade", 1, "Corrida para trás com tronco levemente à frente.", "Passos curtos e rápidos.", "backpedal corrida de costas treino"),
  e("pc15", "Crab walk (caminhada do caranguejo)", "peso-corporal", "core", 2, "Quadril suspenso, avance apoiado em mãos e pés.", "Quadril sempre alto.", "crab walk exercicio funcional"),
  e("pc16", "Prancha lateral com elevação de quadril", "peso-corporal", "core", 2, "Na prancha lateral, desça e suba o quadril.", "Ombro alinhado ao cotovelo.", "prancha lateral elevacao de quadril"),
  e("pc17", "Sprint em subida na duna", "peso-corporal", "potencia", 3, "Tiros curtos subindo o declive da areia.", "Passada curta e forte, volta caminhando.", "sprint subida duna areia treino"),
  e("pc18", "Flexão com toque no ombro", "peso-corporal", "forca", 2, "A cada flexão, toque a mão no ombro oposto.", "Sem rodar o quadril.", "flexao com toque no ombro"),
  e("pc19", "Agachamento isométrico na parede/apoio", "peso-corporal", "forca", 1, "Sustente a posição de 90° pelo tempo da estação.", "Peso nos calcanhares.", "agachamento isometrico wall sit"),
  e("pc20", "Corrida estacionária com sprint no comando", "peso-corporal", "cardio", 2, "Corrida no lugar até o apito, então 15 m de sprint.", "Ótimo para grupos grandes.", "corrida estacionaria com sprint comando"),

  // Cones
  e("co6", "Sprint em leque (star drill)", "cones", "agilidade", 2, "Do cone central, saia para cada cone da roda e volte de costas.", "Sempre volte de costas ao centro.", "star drill cones agilidade"),
  e("co7", "Corrida em quadrado (box drill)", "cones", "agilidade", 2, "Frente, lateral, costas e lateral entre quatro cones.", "Toque cada cone com a mão.", "box drill quatro cones"),
  e("co8", "Corrida escalonada (suicídio)", "cones", "cardio", 3, "Ida e volta progressiva em cones a 5, 10, 15 e 20 m.", "Trabalhe a frenagem na areia.", "corrida suicidio cones treino"),
  e("co9", "Slalom com sprint final", "cones", "cardio", 2, "Ziguezague nos cones e explosão nos últimos 10 m.", "Não desacelere na saída do último cone.", "slalom cones com sprint"),
  e("co10", "Deslocamento lateral tocando cones", "cones", "agilidade", 1, "Vai e volta lateralmente tocando o cone de cada lado.", "Quadril baixo o tempo todo.", "deslocamento lateral cones treino funcional"),
  e("co11", "Corrida com transporte de cones", "cones", "cardio", 1, "Levar cones de um ponto ao outro, um por vez.", "Ótima gincana para turmas.", "gincana com cones treino funcional"),

  // Escada de agilidade
  e("ea5", "Escada: icky shuffle", "escada-agilidade", "agilidade", 2, "Padrão dentro-dentro-fora avançando em diagonal.", "Braços acompanham o ritmo dos pés.", "icky shuffle escada de agilidade"),
  e("ea6", "Escada: tesoura (scissors)", "escada-agilidade", "agilidade", 2, "Alternância rápida de pés à frente e atrás em cada casa.", "Contato mínimo com o solo.", "escada agilidade tesoura scissors"),
  e("ea7", "Escada: saltos laterais em uma perna", "escada-agilidade", "equilibrio", 3, "Saltos unipodais casa a casa, lateralmente.", "Aterrisse com joelho semiflexionado.", "escada agilidade salto uma perna"),
  e("ea8", "Escada: entrada em prancha (in-out + mountain)", "escada-agilidade", "core", 2, "Passa a escada com as mãos em prancha alta.", "Quadril baixo e estável.", "escada de agilidade com as maos prancha"),
  e("ea9", "Escada: hopscotch (amarelinha)", "escada-agilidade", "potencia", 2, "Dois pés dentro, abre para fora, avança.", "Pisada leve e cadência alta.", "escada agilidade hopscotch"),

  // Mini band
  e("mb4", "Agachamento com mini band", "miniband", "forca", 1, "Agachamento com band acima dos joelhos empurrando para fora.", "Joelhos nunca colapsam para dentro.", "agachamento com mini band"),
  e("mb5", "Ponte de glúteo com abdução", "miniband", "forca", 2, "No topo da ponte, abra os joelhos contra o elástico.", "Segure 1s na abertura.", "ponte de gluteo com mini band"),
  e("mb6", "Corrida lateral com mini band nos tornozelos", "miniband", "cardio", 2, "Deslocamento lateral rápido mantendo tensão.", "Passos curtos e contínuos.", "corrida lateral mini band tornozelo"),
  e("mb7", "Prancha com abdução alternada", "miniband", "core", 2, "Em prancha, abra uma perna por vez contra o elástico.", "Quadril nivelado.", "prancha com mini band abducao"),
  e("mb8", "Salto lateral com mini band", "miniband", "potencia", 3, "Saltos laterais curtos com tensão constante.", "Aterrissagem macia na areia.", "salto lateral mini band"),

  // Elástico
  e("el5", "Puxada alta com elástico (upright row)", "elastico", "forca", 1, "Puxe o elástico até a altura do peito, cotovelos altos.", "Sem elevar os ombros.", "remada alta com elastico"),
  e("el6", "Agachamento com elástico e desenvolvimento", "elastico", "forca", 2, "Pise no elástico, agache e finalize empurrando acima da cabeça.", "Fluxo contínuo.", "agachamento com desenvolvimento elastico"),
  e("el7", "Face pull com elástico", "elastico", "forca", 1, "Puxe o elástico até a altura do rosto abrindo os cotovelos.", "Ótimo para postura de ombro.", "face pull com elastico"),
  e("el8", "Corrida resistida em dupla (deslocamento lateral)", "elastico", "agilidade", 2, "Parceiro segura a resistência enquanto o aluno desloca lateralmente.", "10 m para cada lado.", "deslocamento lateral resistido elastico dupla"),

  // Bola medicinal
  e("bm5", "Arremesso rotacional na lateral", "bola-medicinal", "potencia", 2, "Gire o tronco e arremesse a bola lateralmente para o parceiro.", "Pivô no pé de trás.", "arremesso rotacional bola medicinal"),
  e("bm6", "Bola medicinal overhead slam", "bola-medicinal", "potencia", 2, "Levante acima da cabeça e arremesse na areia.", "Expire no impacto.", "overhead slam bola medicinal"),
  e("bm7", "Afundo com passagem da bola por baixo da perna", "bola-medicinal", "core", 2, "A cada passada, passe a bola sob o joelho da frente.", "Tronco ereto.", "afundo com passagem da bola medicinal"),
  e("bm8", "Sit-up com arremesso", "bola-medicinal", "core", 2, "Suba no abdominal e arremesse a bola para o parceiro.", "Perfeito em dupla.", "situp com arremesso bola medicinal"),
  e("bm9", "Flexão com uma mão na bola", "bola-medicinal", "forca", 3, "Flexão alternando a mão apoiada sobre a bola.", "Quadril estável na troca.", "flexao com bola medicinal alternada"),

  // Slam ball
  e("sb3", "Slam ball com giro (rotational slam)", "slam-ball", "potencia", 2, "Arremesso na areia alternando o lado do corpo.", "Gire a partir do quadril.", "rotational slam ball"),
  e("sb4", "Carregamento da slam ball (bear hug carry)", "slam-ball", "forca", 2, "Abrace a bola e caminhe 20 a 30 m na areia.", "Peito alto e core firme.", "bear hug carry slam ball"),
  e("sb5", "Agachamento com slam ball no peito", "slam-ball", "forca", 1, "Goblet squat segurando a slam ball.", "Cotovelos por dentro dos joelhos.", "agachamento com slam ball"),
  e("sb6", "Lançamento por cima do ombro", "slam-ball", "potencia", 3, "Levante a bola do chão e jogue por cima do ombro para trás.", "Extensão total do quadril.", "over the shoulder throw slam ball"),

  // Corda naval
  e("cn5", "Corda naval em prancha", "corda-naval", "core", 3, "Ondas alternadas em apoio de prancha alta.", "Quadril baixo, sem oscilar.", "battle rope na posicao de prancha"),
  e("cn6", "Corda naval ajoelhado", "corda-naval", "forca", 2, "Ondas de joelhos na areia, foco em braços e core.", "Tronco ereto.", "battle rope ajoelhado"),
  e("cn7", "Corda naval com afundo alternado", "corda-naval", "cardio", 3, "Mantém as ondas enquanto alterna passadas.", "Ritmo dos braços não pode cair.", "battle rope com afundo"),
  e("cn8", "Corda naval: onda dupla + salto", "corda-naval", "potencia", 3, "Onda dupla forte seguida de salto vertical.", "Explosão do quadril.", "battle rope onda dupla com salto"),
  e("cn9", "Corda naval: jogo do apito em dupla", "corda-naval", "cardio", 2, "Dupla alterna 20s de esforço máximo na corda.", "Excelente para revezamento.", "battle rope treino em dupla"),

  // Kettlebell
  e("kb5", "Kettlebell deadlift", "kettlebell", "forca", 1, "Levantamento terra com o kettlebell entre os pés.", "Coluna neutra, quadril para trás.", "kettlebell deadlift tecnica"),
  e("kb6", "Snatch com kettlebell", "kettlebell", "potencia", 3, "Do chão até acima da cabeça em um único movimento.", "Só com técnica consolidada.", "kettlebell snatch"),
  e("kb7", "Kettlebell halo", "kettlebell", "equilibrio", 1, "Círculos com o kettlebell ao redor da cabeça.", "Ótimo no aquecimento de ombro.", "kettlebell halo exercicio"),
  e("kb8", "Suitcase carry (carga unilateral)", "kettlebell", "core", 2, "Caminhada com carga de um lado só, tronco alinhado.", "Não incline o tronco.", "suitcase carry kettlebell"),
  e("kb9", "Swing unilateral alternado", "kettlebell", "potencia", 3, "Swing trocando de mão no topo do movimento.", "Pegada firme na troca.", "kettlebell swing alternado uma mao"),
  e("kb10", "Turkish get-up (parcial)", "kettlebell", "equilibrio", 3, "Da posição deitada até sentado com o peso acima.", "Movimento lento e controlado.", "turkish get up kettlebell"),

  // Halteres
  e("ha5", "Renegade row (remada em prancha)", "halteres", "core", 3, "Em prancha sobre os halteres, reme alternadamente.", "Abra os pés para estabilizar.", "renegade row halteres"),
  e("ha6", "Elevação lateral", "halteres", "forca", 1, "Eleve os halteres até a linha dos ombros.", "Cotovelos levemente flexionados.", "elevacao lateral halteres"),
  e("ha7", "Rosca direta + desenvolvimento", "halteres", "forca", 2, "Rosca completa emendando o empurrão acima da cabeça.", "Core firme, sem arquear.", "rosca com desenvolvimento halteres"),
  e("ha8", "Levantamento terra romeno com halteres", "halteres", "forca", 2, "Desça os halteres pelas pernas com quadril para trás.", "Sinta o alongamento posterior de coxa.", "levantamento terra romeno halteres"),
  e("ha9", "Snatch com halter (uma mão)", "halteres", "potencia", 3, "Do chão até acima da cabeça em um movimento.", "Alterne os braços a cada rodada.", "dumbbell snatch tecnica"),
  e("ha10", "Agachamento búlgaro com halteres", "halteres", "forca", 3, "Pé de trás elevado no step, agachamento unilateral.", "Joelho da frente alinhado.", "agachamento bulgaro halteres"),

  // TRX
  e("tr5", "Afundo com pé no TRX", "trx", "equilibrio", 3, "Perna traseira na alça, afundo controlado.", "Desça devagar e mantenha o tronco ereto.", "afundo com trx pe suspenso"),
  e("tr6", "Bíceps no TRX", "trx", "forca", 1, "Puxada com cotovelos fixos e palmas para cima.", "Corpo em linha.", "biceps no trx"),
  e("tr7", "Tríceps no TRX", "trx", "forca", 2, "Extensão de cotovelos com o corpo inclinado à frente.", "Cotovelos apontando para frente.", "triceps no trx"),
  e("tr8", "Pike no TRX", "trx", "core", 3, "Pés nas alças, eleve o quadril em V invertido.", "Pernas estendidas.", "pike no trx"),
  e("tr9", "Prancha lateral com TRX", "trx", "core", 3, "Pés suspensos, sustente a prancha lateral.", "Quadril alto.", "prancha lateral trx"),
  e("tr10", "Y-fly / abertura no TRX", "trx", "forca", 2, "Abra os braços em Y puxando o corpo.", "Ótimo para postura.", "y fly trx exercicio"),

  // Bosu
  e("bo4", "Afundo com pé no Bosu", "bosu", "equilibrio", 2, "Passada com o pé da frente sobre a cúpula.", "Controle a oscilação.", "afundo no bosu"),
  e("bo5", "Flexão com mãos no Bosu invertido", "bosu", "forca", 2, "Flexão apoiando as mãos na base do Bosu.", "Cotovelos a 45°.", "flexao no bosu invertido"),
  e("bo6", "Equilíbrio unipodal no Bosu", "bosu", "equilibrio", 2, "Sustente uma perna só sobre a cúpula.", "Olhar fixo em um ponto.", "equilibrio uma perna bosu"),
  e("bo7", "Abdominal no Bosu", "bosu", "core", 1, "Sentado sobre a cúpula, flexione o tronco.", "Amplitude maior que no solo.", "abdominal no bosu"),
  e("bo8", "Burpee com Bosu", "bosu", "cardio", 3, "Burpee segurando o Bosu e finalizando acima da cabeça.", "Estação metabólica.", "burpee com bosu"),

  // Step / caixote
  e("st4", "Subida lateral no step", "step", "forca", 1, "Subida lateral alternando o lado a cada repetição.", "Empurre com o calcanhar.", "step up lateral caixote"),
  e("st5", "Bulgarian split squat no step", "step", "forca", 3, "Pé de trás apoiado no caixote, agachamento unilateral.", "Tronco ereto.", "agachamento bulgaro no step"),
  e("st6", "Mountain climber com mãos no step", "step", "core", 1, "Apoio elevado, joelhos alternados rápido.", "Boa progressão para iniciantes.", "mountain climber com apoio elevado"),
  e("st7", "Tríceps banco no step", "step", "forca", 1, "Mãos no caixote, flexione os cotovelos descendo o quadril.", "Cotovelos apontados para trás.", "triceps banco no step"),
  e("st8", "Step over lateral contínuo", "step", "cardio", 2, "Passe de um lado ao outro do caixote sem parar.", "Cadência alta.", "step over lateral treino"),

  // Corda de pular
  e("cp4", "Corda: saltos laterais", "corda-de-pular", "agilidade", 2, "Saltos de um lado ao outro de uma linha imaginária.", "Pés juntos.", "pular corda saltos laterais"),
  e("cp5", "Corda: skier (esqui)", "corda-de-pular", "cardio", 2, "Saltos alternando frente e trás.", "Pisada leve.", "pular corda skier"),
  e("cp6", "Corda: uma perna alternada", "corda-de-pular", "equilibrio", 3, "Saltos unipodais alternando a cada 10 repetições.", "Joelho semiflexionado.", "pular corda uma perna"),
  e("cp7", "Corda: cruzando os braços", "corda-de-pular", "agilidade", 3, "Cruze os braços a cada duas voltas.", "Exige coordenação fina.", "pular corda cruzado criss cross"),

  // Bastão
  e("ba4", "Agachamento frontal com bastão", "bastao", "forca", 1, "Bastão apoiado nos ombros à frente, agachamento completo.", "Cotovelos altos.", "agachamento frontal com bastao"),
  e("ba5", "Rotação de tronco com bastão", "bastao", "core", 1, "Bastão nas costas, gire o tronco de um lado ao outro.", "Quadril fixo.", "rotacao de tronco com bastao"),
  e("ba6", "Equilíbrio com bastão na palma", "bastao", "equilibrio", 2, "Sustente o bastão em pé na palma da mão andando na areia.", "Divertido e proprioceptivo.", "equilibrio com bastao na mao"),
  e("ba7", "Remada com bastão em dupla", "bastao", "forca", 2, "Um segura o bastão enquanto o outro puxa com resistência.", "Comunicação constante na dupla.", "remada em dupla com bastao"),

  // Paraquedas
  e("pa2", "Corrida contínua com paraquedas", "paraquedas", "cardio", 2, "Corrida moderada de 60 a 90s com resistência.", "Mantenha a técnica de passada.", "corrida com paraquedas treino"),
  e("pa3", "Sprint com solta do paraquedas", "paraquedas", "potencia", 3, "20 m resistido e, ao soltar, mais 20 m livres.", "Sensação de velocidade máxima.", "sprint resistido com liberacao paraquedas"),
  e("pa4", "Deslocamento lateral com paraquedas", "paraquedas", "agilidade", 2, "Passos laterais resistidos por 15 m para cada lado.", "Quadril baixo.", "deslocamento lateral com paraquedas"),

  // Aros
  e("ar3", "Aros: corrida com joelhos altos", "aros", "cardio", 1, "Um apoio por aro em cadência alta.", "Braços ativos.", "treino de aros joelhos altos"),
  e("ar4", "Aros: saltos em zigue-zague", "aros", "potencia", 2, "Saltos diagonais de aro em aro.", "Aterrissagem macia.", "saltos em ziguezague com aros"),
  e("ar5", "Aros: amarelinha funcional", "aros", "agilidade", 1, "Padrão de amarelinha alternando um e dois pés.", "Ótimo para turmas mistas.", "amarelinha funcional aros treino"),
  e("ar6", "Aros: deslocamento lateral com toque", "aros", "agilidade", 2, "Passagem lateral pisando dentro de cada aro.", "Sem cruzar os pés.", "deslocamento lateral aros agilidade"),

  // Pneu
  e("pn3", "Marretada no pneu", "pneu", "potencia", 2, "Golpes alternados com marreta sobre o pneu.", "Alterne a mão de cima a cada série.", "marreta no pneu treino funcional"),
  e("pn4", "Empurrar o pneu na areia", "pneu", "forca", 3, "Empurre o pneu por 15 a 20 m.", "Tronco inclinado e passos curtos.", "empurrar pneu na areia"),
  e("pn5", "Arrasto do pneu com corda", "pneu", "forca", 3, "Puxe o pneu preso à corda caminhando ou correndo.", "Excelente na areia fofa.", "arrasto de pneu com corda treino"),
  e("pn6", "Step up no pneu", "pneu", "forca", 1, "Subida alternada na borda do pneu.", "Cuidado com o apoio instável.", "step up no pneu"),

  // Colchonete
  e("cl4", "Dead bug", "colchonete", "core", 1, "Deitado, estenda braço e perna opostos sem tocar o solo.", "Lombar colada no colchonete.", "dead bug exercicio core"),
  e("cl5", "Bicicleta no solo", "colchonete", "core", 1, "Cotovelo ao joelho oposto em ritmo contínuo.", "Não puxe a nuca.", "abdominal bicicleta"),
  e("cl6", "Hollow hold", "colchonete", "core", 2, "Sustente braços e pernas suspensos em forma de banana.", "Lombar sempre apoiada.", "hollow hold exercicio"),
  e("cl7", "Ponte unilateral de glúteo", "colchonete", "forca", 2, "Elevação de quadril apoiando um pé só.", "Quadril nivelado.", "ponte de gluteo unilateral"),
  e("cl8", "Bird dog", "colchonete", "equilibrio", 1, "Em quatro apoios, estenda braço e perna opostos.", "Segure 2s no topo.", "bird dog exercicio"),

  // Bola
  e("bl3", "Rodízio de passes em trio", "bola", "cardio", 1, "Trio em triângulo trocando passes em movimento.", "Sempre em deslocamento.", "treino de passes em trio na areia"),
  e("bl4", "Cabeceio/ombro em dupla", "bola", "agilidade", 2, "Alternar toques de cabeça e ombro com o parceiro.", "Coordenação e reação.", "treino de cabeceio na areia dupla"),
  e("bl5", "Agachamento com passe de bola", "bola", "forca", 1, "Agacha e, ao subir, passa a bola ao parceiro.", "Passe forte com as pernas.", "agachamento com passe de bola"),
  e("bl6", "Corrida com condução e sprint", "bola", "cardio", 2, "Conduza a bola 15 m e faça sprint livre de 10 m.", "Toques curtos na areia.", "conducao de bola com sprint areia"),

  // ===== COMBINADOS EXTRAS (repertório dos perfis de funcional na areia) =====
  c("cb17", "Agachamento + salto no aro + sprint", "aros", "potencia", 2,
    "Agacha, salta para dentro do aro seguinte e finaliza com 10 m de sprint.",
    "A saída do último aro já é a primeira passada do sprint.",
    "agachamento salto aro sprint funcional areia",
    ["Quadríceps", "Glúteos", "Panturrilhas", "Core"],
    "Sequência de potência para aceleração, muito usada nos circuitos de praia."),
  c("cb18", "Afundo lateral + puxada de elástico", "elastico", "forca", 2,
    "Afundo lateral e, na subida, puxada do elástico até as costelas.",
    "Joelho alinhado ao pé no afundo.",
    "afundo lateral com remada elastico",
    ["Adutores", "Glúteo médio", "Dorsais", "Bíceps", "Core"],
    "Une abertura de quadril e força de puxada em uma repetição só."),
  c("cb19", "Bear crawl + burpee no cone", "cones", "cardio", 3,
    "Caminhada do urso até o cone e um burpee ao chegar; volta correndo.",
    "Quadril baixo no crawl, sem levantar demais.",
    "bear crawl com burpee treino funcional",
    ["Ombros", "Core", "Peitoral", "Quadríceps", "Glúteos"],
    "Estação metabólica com deslocamento — clássica das aulas na areia."),
  c("cb20", "Swing + passada à frente", "kettlebell", "potencia", 3,
    "Um swing e, ao controlar o peso, uma passada à frente com a carga.",
    "Quadril comanda o swing, pernas comandam a passada.",
    "kettlebell swing com afundo caminhando",
    ["Glúteos", "Isquiotibiais", "Quadríceps", "Core", "Antebraços"],
    "Combina explosão de quadril e força unilateral em deslocamento."),
  c("cb21", "Flexão + deslocamento lateral em prancha", "peso-corporal", "forca", 2,
    "Uma flexão e três apoios laterais em prancha alta; repete do outro lado.",
    "Quadril na altura dos ombros durante o deslocamento.",
    "flexao com deslocamento lateral prancha",
    ["Peitoral", "Tríceps", "Deltoides", "Core", "Serrátil"],
    "Força de empurrar somada à estabilidade de ombro em movimento."),
  c("cb22", "Sit-up + arremesso + sprint", "bola-medicinal", "cardio", 3,
    "Sobe no abdominal arremessando a bola à frente, levanta e corre para buscá-la.",
    "Ideal para revezamento em dupla.",
    "situp arremesso bola medicinal com sprint",
    ["Reto abdominal", "Oblíquos", "Ombros", "Quadríceps", "Glúteos"],
    "Core explosivo com transição rápida para corrida."),
  c("cb23", "Escada de agilidade + salto no step", "escada-agilidade", "potencia", 3,
    "Passa a escada em cadência alta e finaliza com box jump.",
    "Sem pausa entre a escada e o salto.",
    "escada de agilidade com box jump",
    ["Panturrilhas", "Quadríceps", "Glúteos", "Core"],
    "Frequência de passo seguida de potência vertical — combinação de alto rendimento."),
  c("cb24", "Corda naval + sprint de saída", "corda-naval", "cardio", 3,
    "15s de ondas máximas e imediatamente 15 m de sprint.",
    "Solte a corda e já arranque.",
    "battle rope com sprint funcional",
    ["Ombros", "Antebraços", "Core", "Quadríceps", "Glúteos"],
    "Pico de frequência cardíaca com transição de braços para pernas."),
  c("cb25", "Skater jump + toque na areia", "peso-corporal", "equilibrio", 2,
    "Salto lateral de patinador tocando a areia com a mão a cada aterrissagem.",
    "Segure 1s antes do próximo salto.",
    "skater jump com toque no solo",
    ["Glúteo médio", "Quadríceps", "Isquiotibiais", "Core"],
    "Estabilidade unipodal e controle de aterrissagem — previne lesão de joelho e tornozelo."),
  c("cb26", "Step up + remada com halteres", "step", "forca", 2,
    "Sobe no caixote e, no topo, executa uma remada com os halteres.",
    "Suba empurrando com o calcanhar.",
    "step up com remada halteres",
    ["Glúteos", "Quadríceps", "Dorsais", "Bíceps", "Core"],
    "Trem inferior e puxada de costas no mesmo movimento, economizando tempo de estação."),

  // ===== Ampliação da biblioteca por material =====

  // Peso corporal
  e("xpc1", "Agachamento sumô na areia", "peso-corporal", "forca", 1, "Pés bem afastados e pontas para fora, desça o quadril entre os calcanhares.", "Joelhos acompanhando a linha dos pés.", "agachamento sumo peso corporal"),
  e("xpc2", "Agachamento isométrico (cadeirinha)", "peso-corporal", "forca", 1, "Sustente o agachamento a 90° imóvel por tempo.", "Peso nos calcanhares, respiração contínua.", "cadeirinha isometrica agachamento"),
  e("xpc3", "Elevação de quadril unilateral", "peso-corporal", "forca", 2, "Deitado, uma perna estendida, eleve o quadril com a outra apoiada.", "Aperte o glúteo no topo.", "elevacao de quadril unilateral"),
  e("xpc4", "Prancha lateral com elevação de quadril", "peso-corporal", "core", 2, "Na prancha lateral, desça e suba o quadril.", "Ombro alinhado ao cotovelo.", "prancha lateral elevacao quadril"),
  e("xpc5", "Salto lateral bilateral", "peso-corporal", "potencia", 2, "Saltos laterais contínuos de um lado para o outro.", "Aterrisse com joelho semiflexionado.", "salto lateral areia"),
  e("xpc6", "Corrida com calcanhar no glúteo", "peso-corporal", "cardio", 1, "Anfersen no lugar ou avançando na areia.", "Tronco ereto e cadência alta.", "anfersen corrida calcanhar gluteo"),
  e("xpc7", "Superman no solo", "peso-corporal", "core", 1, "De bruços, eleve braços e pernas simultaneamente.", "Fortalece a lombar sem impacto.", "exercicio superman lombar"),
  e("xpc8", "Flexão diamante", "peso-corporal", "forca", 3, "Mãos juntas formando um triângulo sob o peito.", "Cotovelos rentes ao corpo.", "flexao diamante triceps"),
  e("xpc9", "Agachamento búlgaro no solo", "peso-corporal", "forca", 2, "Pé de trás elevado em duna/step natural da areia.", "Desça controlando o joelho da frente.", "agachamento bulgaro peso corporal"),
  e("xpc10", "Abdominal bicicleta", "peso-corporal", "core", 1, "Cotovelo em direção ao joelho oposto alternando.", "Movimento lento e controlado.", "abdominal bicicleta"),

  // Cones
  e("xco1", "Corrida em quadrado com cones", "cones", "agilidade", 1, "Percurso quadrado: frente, lateral, ré e lateral.", "Sem cruzar os pés nas laterais.", "drill quadrado cones agilidade"),
  e("xco2", "Toque nos cones em leque", "cones", "agilidade", 2, "Do centro, corra e toque cada cone dispostos em leque.", "Volte sempre ao ponto central.", "drill leque cones"),
  e("xco3", "Slalom com bola nos cones", "cones", "agilidade", 2, "Conduza a bola em ziguezague entre os cones.", "Toques curtos e cabeça erguida.", "slalom com bola cones"),
  e("xco4", "Sprint e volta de costas", "cones", "cardio", 2, "Sprint até o cone e retorno correndo de ré.", "Olhe por cima do ombro na volta.", "corrida de re cone"),
  e("xco5", "Pique-cone em dupla", "cones", "agilidade", 2, "Dois alunos disputam o cone chamado pelo professor.", "Ótimo para reação e competitividade.", "jogo de reacao cones dupla"),
  e("xco6", "Deslocamento lateral entre cones", "cones", "agilidade", 1, "Vai e volta lateral tocando o cone com a mão.", "Quadril baixo o tempo todo.", "deslocamento lateral cones"),
  e("xco7", "Corrida em L", "cones", "agilidade", 2, "Sprint frontal, curva de 90° e novo sprint.", "Plante o pé externo para virar.", "l drill agilidade cones"),
  e("xco8", "Skipping alto entre cones", "cones", "cardio", 1, "Joelhos altos passando entre cones próximos.", "Pisada rápida na areia.", "skipping entre cones"),

  // Escada de agilidade
  e("xea1", "Escada: Icky shuffle", "escada-agilidade", "agilidade", 3, "Dentro-dentro-fora alternando o lado a cada casa.", "Comece devagar até acertar o padrão.", "icky shuffle escada agilidade"),
  e("xea2", "Escada: tesoura", "escada-agilidade", "agilidade", 2, "Alterne os pés em movimento de tesoura casa a casa.", "Contato curto no chão.", "escada agilidade tesoura"),
  e("xea3", "Escada: hop unipodal", "escada-agilidade", "potencia", 3, "Saltos casa a casa em uma perna só.", "Aterrisse macio na areia.", "escada agilidade salto uma perna"),
  e("xea4", "Escada: entrada e saída lateral", "escada-agilidade", "agilidade", 2, "Entra com dois pés e sai lateralmente a cada casa.", "Mantenha o ritmo constante.", "escada agilidade entra e sai"),
  e("xea5", "Escada: corrida de costas", "escada-agilidade", "agilidade", 3, "Percurso na escada correndo para trás.", "Passos curtos, olhar sobre o ombro.", "escada agilidade de costas"),
  e("xea6", "Escada: agachamento a cada 2 casas", "escada-agilidade", "cardio", 2, "Avance na escada e agache a cada duas casas.", "Combina agilidade e força.", "escada agilidade com agachamento"),

  // Mini band
  e("xmb1", "Agachamento com mini band", "miniband", "forca", 1, "Band acima dos joelhos, agachamento empurrando para fora.", "Não deixe o joelho colapsar.", "agachamento com mini band"),
  e("xmb2", "Ponte de glúteo com abdução", "miniband", "forca", 2, "No topo da ponte, abra os joelhos contra a band.", "Segure 1s na abertura.", "ponte de gluteo com mini band"),
  e("xmb3", "Salto lateral com mini band", "miniband", "potencia", 3, "Saltos laterais mantendo tensão na band.", "Aterrissagem controlada.", "salto lateral mini band"),
  e("xmb4", "Abdução de quadril em pé", "miniband", "forca", 1, "Band nos tornozelos, abra a perna lateralmente.", "Tronco firme, sem inclinar.", "abducao de quadril mini band"),
  e("xmb5", "Prancha com passos laterais", "miniband", "core", 2, "Em prancha alta, dê passos laterais contra a band.", "Quadril sem balançar.", "prancha com mini band nos pes"),
  e("xmb6", "Clamshell (concha)", "miniband", "forca", 1, "Deitado de lado, abra o joelho contra a resistência.", "Ativa glúteo médio antes do treino.", "clamshell mini band"),

  // Elástico
  e("xel1", "Puxada alta com elástico", "elastico", "forca", 1, "Puxe o elástico até a altura do queixo com cotovelos altos.", "Escápulas ativas.", "remada alta com elastico"),
  e("xel2", "Agachamento com elástico", "elastico", "forca", 1, "Pise no elástico e agache segurando as pontas nos ombros.", "Tensão constante.", "agachamento com elastico"),
  e("xel3", "Face pull com elástico", "elastico", "forca", 2, "Puxe em direção ao rosto abrindo os cotovelos.", "Excelente para postura.", "face pull elastico"),
  e("xel4", "Corrida estacionária resistida", "elastico", "cardio", 2, "Parceiro segura o elástico; corra no lugar contra a tensão.", "Alta frequência de passada.", "corrida resistida elastico"),
  e("xel5", "Bíceps com elástico", "elastico", "forca", 1, "Pise na faixa e flexione os cotovelos.", "Controle a volta.", "biceps com elastico"),
  e("xel6", "Woodchop (lenhador) com elástico", "elastico", "core", 2, "Puxada diagonal de baixo para cima girando o tronco.", "Gire pelo quadril.", "woodchop elastico"),

  // Bola medicinal
  e("xbm1", "Arremesso lateral na parede/parceiro", "bola-medicinal", "potencia", 2, "Gire o tronco e arremesse a bola lateralmente.", "Pivote o pé de trás.", "arremesso lateral bola medicinal"),
  e("xbm2", "Abdominal com passe da bola", "bola-medicinal", "core", 1, "Sit-up e passe a bola ao parceiro no topo.", "Ritmo contínuo em dupla.", "sit up com bola medicinal"),
  e("xbm3", "Afundo com rotação de tronco", "bola-medicinal", "core", 2, "No afundo, gire o tronco com a bola para o lado da perna da frente.", "Rotação lenta.", "afundo com rotacao bola medicinal"),
  e("xbm4", "Prancha com mão sobre a bola", "bola-medicinal", "core", 2, "Prancha alta alternando a mão sobre a bola.", "Quadril estável.", "prancha com bola medicinal"),
  e("xbm5", "Deadlift com bola medicinal", "bola-medicinal", "forca", 1, "Dobradiça de quadril levantando a bola do chão.", "Coluna neutra.", "levantamento terra bola medicinal"),
  e("xbm6", "Corrida carregando a bola", "bola-medicinal", "cardio", 2, "Corrida de 20 a 30 m segurando a bola no peito.", "Cotovelos junto ao corpo.", "corrida com bola medicinal"),

  // Slam ball
  e("xsb1", "Slam ball lateral", "slam-ball", "potencia", 2, "Arremesso ao solo do lado do corpo, alternando lados.", "Gire o tronco no arremesso.", "slam ball lateral"),
  e("xsb2", "Slam ball com agachamento", "slam-ball", "potencia", 2, "Agache para pegar a bola e arremesse acima da cabeça.", "Use o quadril.", "slam ball com agachamento"),
  e("xsb3", "Slam ball caminhando", "slam-ball", "cardio", 3, "Arremessa, avança até a bola e repete por 20 m.", "Estação de deslocamento.", "slam ball caminhando"),
  e("xsb4", "Slam ball em dupla alternada", "slam-ball", "cardio", 2, "Um arremessa, o outro recolhe e repete.", "Mantenha o ritmo alto.", "slam ball dupla"),
  e("xsb5", "Russian twist com slam ball", "slam-ball", "core", 2, "Rotação de tronco sentado com a slam ball.", "Pés suspensos para dificultar.", "russian twist slam ball"),

  // Corda naval
  e("xcn1", "Ondas laterais (side to side)", "corda-naval", "cardio", 2, "Balance as duas pontas para os lados juntas.", "Trabalhe oblíquos.", "battle rope side to side"),
  e("xcn2", "Corda naval com afundo alternado", "corda-naval", "cardio", 3, "Ondas alternadas enquanto alterna afundos.", "Coordenação alta.", "battle rope com afundo"),
  e("xcn3", "Corda naval ajoelhado", "corda-naval", "forca", 2, "Ondas alternadas de joelhos na areia.", "Isola braços e core.", "battle rope ajoelhado"),
  e("xcn4", "Corda naval em jumping jack", "corda-naval", "cardio", 3, "Abre e fecha os braços com a corda saltando.", "Alta demanda cardiorrespiratória.", "battle rope jumping jack"),
  e("xcn5", "Puxada da corda naval (rope pull)", "corda-naval", "forca", 2, "Puxe a corda estendida com peso na ponta até você.", "Costas e antebraços.", "rope pull corda naval"),

  // Kettlebell
  e("xkb1", "Kettlebell deadlift", "kettlebell", "forca", 1, "Dobradiça de quadril levantando o kettlebell entre os pés.", "Coluna neutra.", "kettlebell deadlift"),
  e("xkb2", "Turkish get-up parcial", "kettlebell", "equilibrio", 3, "Do solo até sentado com o kettlebell acima.", "Braço sempre travado.", "turkish get up kettlebell"),
  e("xkb3", "Halo com kettlebell", "kettlebell", "core", 1, "Circule o kettlebell ao redor da cabeça.", "Mobiliza ombros.", "halo kettlebell"),
  e("xkb4", "Remada unilateral com kettlebell", "kettlebell", "forca", 2, "Tronco inclinado, puxada até a costela.", "Sem girar o tronco.", "remada unilateral kettlebell"),
  e("xkb5", "Snatch com kettlebell", "kettlebell", "potencia", 3, "Do chão até acima da cabeça em um movimento.", "Exige técnica; use carga leve.", "kettlebell snatch"),
  e("xkb6", "Agachamento frontal com 2 kettlebells", "kettlebell", "forca", 3, "Kettlebells em rack no ombro, agachamento profundo.", "Cotovelos altos.", "front squat kettlebell"),

  // Halteres
  e("xha1", "Elevação lateral", "halteres", "forca", 1, "Eleve os halteres até a linha dos ombros.", "Cotovelos levemente flexionados.", "elevacao lateral halteres"),
  e("xha2", "Rosca bíceps alternada", "halteres", "forca", 1, "Flexione um cotovelo por vez.", "Sem balançar o tronco.", "rosca alternada halteres"),
  e("xha3", "Renegade row", "halteres", "core", 3, "Em prancha sobre os halteres, reme alternando.", "Quadril imóvel.", "renegade row halteres"),
  e("xha4", "Swing com halter", "halteres", "potencia", 2, "Balanço explosivo do quadril com um halter.", "Movimento de dobradiça.", "swing com halter"),
  e("xha5", "Agachamento goblet com halter", "halteres", "forca", 1, "Segure o halter no peito e agache.", "Desça controlado.", "goblet squat halter"),
  e("xha6", "Farmer walk com halteres", "halteres", "forca", 1, "Caminhada carregada de 20 a 30 m na areia.", "Ombros para trás.", "farmer walk halteres"),

  // TRX
  e("xtr1", "Agachamento assistido no TRX", "trx", "forca", 1, "Segure as alças e agache profundo com apoio.", "Ideal para iniciantes.", "agachamento assistido trx"),
  e("xtr2", "Remada baixa unilateral no TRX", "trx", "forca", 2, "Puxada com um braço só.", "Evite girar o tronco.", "remada unilateral trx"),
  e("xtr3", "Curl de isquiotibiais no TRX", "trx", "forca", 3, "Deitado, pés nas alças, flexione os joelhos elevando o quadril.", "Quadril sempre alto.", "hamstring curl trx"),
  e("xtr4", "Prancha com pés no TRX", "trx", "core", 2, "Prancha com pés suspensos nas alças.", "Core firme, sem afundar.", "prancha com pes no trx"),
  e("xtr5", "Mountain climber no TRX", "trx", "cardio", 3, "Pés suspensos, joelhos alternados rápido.", "Ritmo constante.", "mountain climber trx"),
  e("xtr6", "Sprinter start no TRX", "trx", "potencia", 2, "Inclinado à frente, simule arrancada de corrida.", "Empurre com a perna de trás.", "sprinter start trx"),

  // Bosu
  e("xbo1", "Agachamento sobre o Bosu", "bosu", "equilibrio", 2, "Agache em cima da cúpula do Bosu.", "Pés afastados para estabilizar.", "agachamento em cima do bosu"),
  e("xbo2", "Prancha com antebraços no Bosu", "bosu", "core", 2, "Prancha apoiando os cotovelos na cúpula.", "Segure a oscilação.", "prancha no bosu"),
  e("xbo3", "Salto sobre o Bosu", "bosu", "potencia", 3, "Salto com dois pés sobre a cúpula e aterrissagem estável.", "Segure 1s na aterrissagem.", "salto no bosu"),
  e("xbo4", "Ponte de glúteo com pés no Bosu", "bosu", "forca", 1, "Calcanhares na cúpula, eleve o quadril.", "Aperte o glúteo no topo.", "ponte de gluteo bosu"),
  e("xbo5", "Prancha lateral no Bosu", "bosu", "core", 3, "Cotovelo apoiado na cúpula sustentando a lateral.", "Quadril alinhado.", "prancha lateral bosu"),
  e("xbo6", "Passada sobre o Bosu", "bosu", "equilibrio", 2, "Suba e desça atravessando o Bosu em passadas.", "Controle o apoio instável.", "passada sobre bosu"),

  // Step / caixote
  e("xst1", "Box jump no caixote", "step", "potencia", 3, "Salto com dois pés sobre o caixote.", "Desça sempre em passo.", "box jump caixote"),
  e("xst2", "Step up com joelho alto", "step", "cardio", 1, "Suba e eleve o joelho oposto no topo.", "Ritmo contínuo.", "step up com joelho alto"),
  e("xst3", "Flexão declinada no step", "step", "forca", 3, "Pés no caixote, mãos na areia.", "Aumenta a carga nos ombros.", "flexao declinada step"),
  e("xst4", "Elevação de panturrilha no step", "step", "forca", 1, "Calcanhares para fora da borda, suba e desça.", "Amplitude completa.", "elevacao de panturrilha no step"),
  e("xst5", "Subida rápida alternada (fast feet)", "step", "cardio", 2, "Troca rápida dos pés no topo do step.", "Cadência máxima por 20s.", "fast feet step"),
  e("xst6", "Prancha com pés no step", "step", "core", 2, "Prancha com os pés elevados no caixote.", "Quadril baixo.", "prancha com pes elevados step"),

  // Corda de pular
  e("xcp1", "Pulos alternados (corrida na corda)", "corda-de-pular", "cardio", 1, "Alterne os pés como se corresse pulando corda.", "Pisada leve.", "corda de pular alternado"),
  e("xcp2", "Double under", "corda-de-pular", "cardio", 3, "Duas voltas da corda por salto.", "Salto mais alto e punhos rápidos.", "double under corda"),
  e("xcp3", "Pulo cruzado", "corda-de-pular", "agilidade", 2, "Cruze os braços a cada salto.", "Ritmo constante.", "corda de pular cruzado"),
  e("xcp4", "Pulo unipodal", "corda-de-pular", "potencia", 2, "Saltos em uma perna só, alternando a cada 10.", "Fortalece tornozelo.", "corda de pular uma perna"),
  e("xcp5", "Esqui lateral com corda", "corda-de-pular", "cardio", 2, "Saltos laterais pequenos a cada volta da corda.", "Pés juntos.", "corda de pular esqui lateral"),

  // Bastão
  e("xba1", "Mobilidade de ombros com bastão", "bastao", "equilibrio", 1, "Passe o bastão da frente para trás com braços estendidos.", "Ótimo no aquecimento.", "mobilidade de ombro com bastao"),
  e("xba2", "Bom dia com bastão", "bastao", "forca", 1, "Bastão nas costas, dobradiça de quadril.", "Coluna neutra.", "bom dia com bastao"),
  e("xba3", "Agachamento overhead com bastão", "bastao", "equilibrio", 2, "Agachamento com bastão acima da cabeça.", "Braços sempre atrás da linha da orelha.", "overhead squat com bastao"),
  e("xba4", "Rotação de tronco com bastão", "bastao", "core", 1, "Bastão nos ombros, gire o tronco de um lado ao outro.", "Quadril fixo.", "rotacao de tronco com bastao"),
  e("xba5", "Reação: derrubar o bastão", "bastao", "agilidade", 2, "Parceiro solta o bastão e o aluno pega antes de cair.", "Excelente para tempo de reação.", "exercicio reacao bastao"),

  // Paraquedas
  e("xpq1", "Sprint com paraquedas 30 m", "paraquedas", "cardio", 2, "Arranque máximo com o paraquedas aberto.", "Inclinação de tronco nos primeiros passos.", "sprint com paraquedas"),
  e("xpq2", "Corrida lateral com paraquedas", "paraquedas", "agilidade", 3, "Deslocamento lateral resistido.", "Quadril baixo.", "corrida lateral com paraquedas"),
  e("xpq3", "Skipping alto resistido", "paraquedas", "potencia", 2, "Joelhos altos avançando com o paraquedas.", "Cadência alta.", "skipping resistido paraquedas"),
  e("xpq4", "Tiro com soltura do paraquedas", "paraquedas", "potencia", 3, "Solte o paraquedas no meio do tiro e acelere.", "Sensação de sobrevelocidade.", "sprint soltura paraquedas"),
  e("xpq5", "Corrida contínua resistida", "paraquedas", "cardio", 2, "Trote de 60 a 100 m com resistência.", "Mantenha a técnica de corrida.", "corrida resistida paraquedas"),

  // Aros
  e("xar1", "Corrida dentro dos aros", "aros", "agilidade", 1, "Um apoio por aro em sequência.", "Olhar à frente.", "corrida nos aros agilidade"),
  e("xar2", "Saltos com dois pés nos aros", "aros", "potencia", 2, "Salto de aro em aro com pés juntos.", "Contato curto no solo.", "saltos nos aros"),
  e("xar3", "Saltos unipodais nos aros", "aros", "potencia", 3, "Percorra os aros em uma perna só.", "Aterrisse estável.", "salto unipodal aros"),
  e("xar4", "Aros em ziguezague", "aros", "agilidade", 2, "Aros dispostos em diagonal, salto alternando lados.", "Trabalhe a mudança de direção.", "aros ziguezague treino"),
  e("xar5", "Aros com apoio de mãos (bear)", "aros", "core", 2, "Avance em bear crawl apoiando as mãos nos aros.", "Joelhos suspensos.", "bear crawl com aros"),

  // Pneu
  e("xpn1", "Virada de pneu (tire flip)", "pneu", "potencia", 3, "Levante e vire o pneu usando as pernas.", "Peito colado no pneu ao levantar.", "tire flip pneu"),
  e("xpn2", "Marreta no pneu", "pneu", "potencia", 2, "Golpes alternados com marreta sobre o pneu.", "Alterne o lado a cada 10 golpes.", "marreta no pneu treino"),
  e("xpn3", "Salto para dentro do pneu", "pneu", "potencia", 2, "Salto para dentro e para fora do pneu.", "Aterrissagem macia.", "salto no pneu"),
  e("xpn4", "Flexão com mãos no pneu", "pneu", "forca", 1, "Apoio elevado nas bordas do pneu.", "Boa progressão de flexão.", "flexao com apoio no pneu"),
  e("xpn5", "Arrasto de pneu", "pneu", "forca", 3, "Pneu preso por corda, arraste 20 m na areia.", "Passos curtos e potentes.", "arrasto de pneu na areia"),
  e("xpn6", "Step up no pneu", "pneu", "forca", 1, "Subidas alternadas sobre a borda do pneu.", "Empurre com o calcanhar.", "step up no pneu"),

  // Colchonete
  e("xcl1", "Abdominal remador", "colchonete", "core", 2, "Estenda e recolha braços e pernas simultaneamente.", "Lombar apoiada.", "abdominal remador"),
  e("xcl2", "Prancha com toque no ombro", "colchonete", "core", 2, "Em prancha alta, toque o ombro oposto alternando.", "Quadril sem girar.", "prancha toque no ombro"),
  e("xcl3", "Dead bug", "colchonete", "core", 1, "Braço e perna opostos descendo com lombar apoiada.", "Movimento lento.", "dead bug exercicio"),
  e("xcl4", "Bird dog", "colchonete", "equilibrio", 1, "Em quatro apoios, estenda braço e perna opostos.", "Segure 2s no topo.", "bird dog exercicio"),
  e("xcl5", "Alongamento de cadeia posterior", "colchonete", "equilibrio", 1, "Sentado, alcance os pés mantendo a coluna longa.", "Ideal para volta à calma.", "alongamento cadeia posterior"),
  e("xcl6", "Abdominal canivete", "colchonete", "core", 3, "Suba tronco e pernas ao mesmo tempo formando um V.", "Controle a descida.", "abdominal canivete"),

  // Bola
  e("xbl1", "Toques de bola no ar (embaixadinha)", "bola", "equilibrio", 2, "Sequência de toques sem deixar a bola cair.", "Ótimo aquecimento lúdico.", "embaixadinha treino funcional"),
  e("xbl2", "Passe e sprint em dupla", "bola", "cardio", 2, "Passe a bola e corra para receber de volta.", "Ritmo contínuo por 40s.", "passe e sprint com bola"),
  e("xbl3", "Agachamento com passe de bola", "bola", "forca", 1, "Agache e no topo passe a bola ao parceiro.", "Estação em dupla.", "agachamento com passe de bola"),
  e("xbl4", "Domínio no peito com deslocamento", "bola", "agilidade", 2, "Domine a bola e desloque-se lateralmente.", "Aplicação direta no futevôlei.", "dominio de bola areia"),
  e("xbl5", "Prancha com rolamento de bola", "bola", "core", 2, "Em prancha, role a bola de uma mão para a outra.", "Quadril estável.", "prancha com bola rolando"),
  e("xbl6", "Salto e cabeceio", "bola", "potencia", 2, "Salto vertical para cabecear a bola lançada pelo parceiro.", "Aterrisse macio na areia.", "salto e cabeceio treino"),
];

// ---- músculos e objetivo (explícito quando existe, inferido pelo padrão de movimento) ----
const REGRAS_MUSCULOS: { termo: RegExp; musculos: string[] }[] = [
  { termo: /sprint|corrida|corr[ei]|skipping|tiro|shuttle|paraqued/i, musculos: ["Quadríceps", "Isquiotibiais", "Glúteos", "Panturrilhas"] },
  { termo: /agachamento|squat|step up|afundo|passada|box jump|salto/i, musculos: ["Quadríceps", "Glúteos", "Isquiotibiais", "Panturrilhas"] },
  { termo: /flex[aã]o de bra|flexao|push|supino|empurr|chest/i, musculos: ["Peitoral", "Tríceps", "Deltoide anterior"] },
  { termo: /remada|puxada|invertida|dorsal/i, musculos: ["Dorsais", "Romboides", "Bíceps"] },
  { termo: /prancha|abdominal|core|twist|pallof|climber|bear crawl|superman|knee tuck/i, musculos: ["Transverso do abdome", "Reto abdominal", "Oblíquos"] },
  { termo: /ombro|desenvolvimento|overhead|press|corda naval|battle/i, musculos: ["Deltoides", "Trapézio", "Core"] },
  { termo: /swing|clean|arremesso|slam|good morning|ponte|gl[uú]teo|deadlift/i, musculos: ["Glúteos", "Isquiotibiais", "Lombar", "Core"] },
  { termo: /lateral|mini band|monster|adut|band/i, musculos: ["Glúteo médio", "Adutores", "Quadríceps"] },
  { termo: /corda|pular|escada|aros|agilidade|ziguezague/i, musculos: ["Panturrilhas", "Quadríceps", "Core"] },
  { termo: /farmer|carreg|pneu|bast[aã]o/i, musculos: ["Antebraços", "Trapézio", "Core", "Glúteos"] },
];

const BENEFICIO_POR_FOCO: Record<Foco, string> = {
  forca: "Ganho de força e resistência muscular; deixa o aluno mais firme nos apoios e protege as articulações.",
  potencia: "Desenvolve explosão e velocidade de contração — salto, arranque e mudança de ritmo.",
  cardio: "Eleva o condicionamento cardiorrespiratório e o gasto calórico da aula.",
  core: "Estabiliza tronco e lombar, melhorando postura e transferência de força entre pernas e braços.",
  agilidade: "Aprimora coordenação, tempo de reação e mudança de direção na areia.",
  equilibrio: "Trabalha propriocepção e controle articular, essencial no terreno instável da areia.",
};

export function musculosDoExercicio(ex: Exercicio): string[] {
  if (ex.musculos?.length) return ex.musculos;
  const texto = `${ex.nome} ${ex.descricao} ${ex.busca}`;
  const encontrados = new Set<string>();
  for (const r of REGRAS_MUSCULOS) {
    if (r.termo.test(texto)) r.musculos.forEach((m) => encontrados.add(m));
  }
  if (encontrados.size === 0) {
    return ["Corpo inteiro", "Core"];
  }
  return [...encontrados].slice(0, 5);
}

export function beneficioDoExercicio(ex: Exercicio): string {
  return ex.beneficio ?? BENEFICIO_POR_FOCO[ex.foco];
}

export function linkYoutube(ex: Exercicio) {
  if (ex.url) return ex.url;
  return `https://www.youtube.com/results?search_query=${encodeURIComponent(ex.busca)}`;
}
export function linkInstagram(ex: Exercicio) {
  return `https://www.instagram.com/explore/tags/${encodeURIComponent(
    ex.busca.replace(/[^a-zA-Zà-úÀ-Ú0-9]/g, "").toLowerCase(),
  )}/`;
}
export function linkGif(ex: Exercicio) {
  return `https://www.google.com/search?tbm=isch&q=${encodeURIComponent(ex.busca + " gif")}`;
}

/** Exercícios importados pelo usuário (carregados do dispositivo no client). */
export const EXERCICIOS_EXTRA: Exercicio[] = [];

export function definirExerciciosExtra(lista: Exercicio[]) {
  EXERCICIOS_EXTRA.splice(0, EXERCICIOS_EXTRA.length, ...lista);
}

/** Base completa: catálogo + importados por link. */
export function todosExercicios(): Exercicio[] {
  return [...EXERCICIOS, ...EXERCICIOS_EXTRA];
}
