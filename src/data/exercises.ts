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
