import React from "react";
import { Heart } from "lucide-react";
import ResponsabilidadeTemplate from "@/components/rpg/ResponsabilidadeTemplate";

export default function Suporte() {
  return (
    <ResponsabilidadeTemplate
      titulo="Suporte"
      subtitulo="A força vital do grupo"
      icon={Heart}
      color="#22c55e"
      descricao="O Suporte é responsável por manter o grupo vivo e operacional. Seja através de cura, buffs ou remoção de condições negativas, este papel é crucial para a sobrevivência em combates prolongados. Um bom Suporte sabe priorizar quem precisa de ajuda e quando intervir."
      funcoes={[
        { titulo: "Curandeiro", descricao: "Restaura a vida dos aliados através de magias, poções ou primeiros socorros." },
        { titulo: "Fortalecedor", descricao: "Aplica buffs que aumentam as capacidades dos companheiros." },
        { titulo: "Purificador", descricao: "Remove venenos, maldições e outras condições negativas." },
        { titulo: "Ressuscitador", descricao: "Capaz de trazer aliados de volta quando caem em combate." }
      ]}
      habilidadesChave={[
        "Cura Maior",
        "Bênção de Proteção",
        "Purificar",
        "Revigorar",
        "Escudo Sagrado",
        "Ressurreição"
      ]}
      bonusPassivos={[
        "+20% de eficiência em curas",
        "Poções usadas em aliados têm efeito ampliado",
        "Pode curar enquanto se move (sem penalidade)",
        "Aliados curados recebem escudo temporário"
      ]}
    />
  );
}