import React from "react";
import { Dog } from "lucide-react";
import ResponsabilidadeTemplate from "@/components/rpg/ResponsabilidadeTemplate";

export default function Domador() {
  return (
    <ResponsabilidadeTemplate
      titulo="Domador"
      subtitulo="Mestre das feras e criaturas"
      icon={Dog}
      color="#ec4899"
      descricao="O Domador possui uma conexão especial com criaturas. Capaz de domar, treinar e comandar feras em combate, este papel adiciona versatilidade tática ao grupo. Seus companheiros animais podem servir como batedores, combatentes ou até mesmo montarias."
      funcoes={[
        { titulo: "Treinador de Feras", descricao: "Treina e evolui criaturas, aumentando suas capacidades." },
        { titulo: "Comandante Bestial", descricao: "Dirige suas criaturas em combate com comandos precisos." },
        { titulo: "Comunicador Animal", descricao: "Entende e se comunica com animais selvagens." },
        { titulo: "Criador", descricao: "Cuida da saúde e bem-estar de suas criaturas companheiras." }
      ]}
      habilidadesChave={[
        "Vínculo Animal",
        "Comando de Ataque",
        "Chamado Selvagem",
        "Cura Bestial",
        "Fúria da Matilha",
        "Montaria de Guerra"
      ]}
      bonusPassivos={[
        "Criaturas sob seu comando têm +15% de dano",
        "Pode ter até 2 companheiros ativos simultaneamente",
        "Criaturas selvagens têm menor chance de atacar",
        "Bônus de lealdade ganho por criaturas aumentado"
      ]}
    />
  );
}