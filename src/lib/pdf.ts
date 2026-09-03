import { jsPDF } from "jspdf";
import { PRESETS, dinamicaDaEstacao, type Circuito } from "./circuito";
import { linkYoutube, musculosDoExercicio } from "@/data/exercises";

export function exportarPDF(circuito: Circuito, titulo: string) {
  const doc = new jsPDF({ unit: "pt", format: "a4" });
  const larguraPagina = doc.internal.pageSize.getWidth();
  const margem = 48;
  const largura = larguraPagina - margem * 2;
  let y = margem;

  const novaPaginaSeNecessario = (altura: number) => {
    if (y + altura > doc.internal.pageSize.getHeight() - margem) {
      doc.addPage();
      y = margem;
    }
  };

  // Cabeçalho
  doc.setFillColor(214, 106, 45);
  doc.rect(0, 0, larguraPagina, 96, "F");
  doc.setTextColor(255, 255, 255);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(22);
  doc.text("LIFE TRAINING", margem, 44);
  doc.setFontSize(13);
  doc.setFont("helvetica", "normal");
  doc.text(titulo, margem, 66);
  const preset = PRESETS[circuito.config.formato];
  doc.setFontSize(10);
  doc.text(
    `${preset.nome} · ${circuito.config.trabalho}s trabalho / ${circuito.config.descanso}s descanso · ${circuito.config.rodadas} rodadas · ~${circuito.duracaoMin} min · ${circuito.config.modalidade}`,
    margem,
    84,
  );

  y = 128;
  doc.setTextColor(40, 32, 26);

  if (circuito.aquecimento.length) {
    doc.setFont("helvetica", "bold");
    doc.setFontSize(13);
    doc.text("Aquecimento (5 min)", margem, y);
    y += 16;
    doc.setFont("helvetica", "normal");
    doc.setFontSize(11);
    circuito.aquecimento.forEach((ex) => {
      doc.text(`- ${ex.nome}`, margem + 8, y);
      y += 15;
    });
    y += 8;
  }

  if (circuito.alongamentos?.length) {
    doc.setFont("helvetica", "bold");
    doc.setFontSize(13);
    doc.text("Alongamento e mobilidade", margem, y);
    y += 16;
    doc.setFont("helvetica", "normal");
    doc.setFontSize(11);
    circuito.alongamentos.forEach((ex) => {
      novaPaginaSeNecessario(20);
      doc.text(`- ${ex.nome}`, margem + 8, y);
      y += 15;
    });
    y += 8;
  }

  doc.setFont("helvetica", "bold");
  doc.setFontSize(13);
  doc.text("Circuito", margem, y);
  y += 18;

  circuito.estacoes.forEach((est) => {
    const ex = est.exercicio;
    const descricao = doc.splitTextToSize(ex.descricao, largura - 16);
    const musculos = doc.splitTextToSize(
      `Musculos: ${musculosDoExercicio(ex).join(", ")}`,
      largura - 16,
    );
    const dinamica = doc.splitTextToSize(
      dinamicaDaEstacao(circuito.config.modalidade, ex.nome),
      largura - 16,
    );
    const link = linkYoutube(ex);
    const linkLinhas = doc.splitTextToSize(`Vídeo: ${link}`, largura - 16);
    const altura =
      26 + (descricao.length + musculos.length + dinamica.length + linkLinhas.length) * 13 + 14;
    novaPaginaSeNecessario(altura);

    doc.setDrawColor(226, 214, 198);
    doc.setFillColor(252, 249, 243);
    doc.roundedRect(margem, y - 14, largura, altura, 8, 8, "FD");

    doc.setFont("helvetica", "bold");
    doc.setFontSize(12);
    doc.setTextColor(214, 106, 45);
    doc.text(`${est.ordem}. ${ex.nome}`, margem + 10, y + 4);
    y += 20;

    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.setTextColor(60, 52, 44);
    doc.text(descricao, margem + 10, y);
    y += descricao.length * 13;
    doc.setTextColor(110, 98, 86);
    doc.text(musculos, margem + 10, y);
    y += musculos.length * 13;
    doc.setTextColor(60, 52, 44);
    doc.text(dinamica, margem + 10, y);
    y += dinamica.length * 13;
    doc.setTextColor(30, 90, 120);
    doc.text(linkLinhas, margem + 10, y);
    y += linkLinhas.length * 13 + 18;
    doc.setTextColor(40, 32, 26);
  });

  novaPaginaSeNecessario(40);
  doc.setFont("helvetica", "italic");
  doc.setFontSize(10);
  doc.setTextColor(110, 98, 86);
  doc.text(
    "Volta a calma: 3 min de caminhada na beira d'agua + alongamento de posterior, panturrilha e ombros.",
    margem,
    y + 6,
  );

  doc.save(`${titulo.replace(/[^\w\s-]/g, "").trim() || "circuito"}.pdf`);
}
