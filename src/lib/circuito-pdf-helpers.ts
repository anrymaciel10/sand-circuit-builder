export { PRESETS, dinamicaDaEstacao } from "./circuito";
export type { Circuito } from "./circuito";
import { linkYoutube, type Exercicio } from "@/data/exercises";

export function linkOuNada(ex: Exercicio) {
  return linkYoutube(ex);
}
