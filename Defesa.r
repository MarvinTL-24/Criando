import React from "react";
import { Shield } from "lucide-react";
import ResponsabilidadeTemplate from "@/components/rpg/ResponsabilidadeTemplate";

export default function Defesa() {
  return (
    <ResponsabilidadeTemplate
      titulo="Defesa"
      subtitulo="O escudo inabalável do grupo"
      icon={Shield}
      color="#f59e0b"
      descricao="O Defensor é a muralha viva do grupo. Diferente do Vanguarda que avança, o Defensor mantém posição, criando zonas seguras e protegendo pontos estratégicos. Especialista em bloquear ataques e criar barreiras, é essencial em batalhas defensivas e proteção de objetivos."
      funcoes={[
        { titulo: "Proteção de Ponto", descricao: "Mantém posição fixa, defendendo locais importantes como entradas ou aliados feridos." },
        { titulo: "Bloqueador", descricao: "Usa escudo e técnicas para bloquear ataques que seriam direcionados aos aliados." },
        { titulo: "Criador de Barreiras", descricao: "Utiliza habilidades para criar zonas de proteção temporárias." },
        { titulo: "Âncora do Grupo", descricao: "Serve como ponto de referência seguro para recuos táticos." }
      ]}
      habilidadesChave={[
        "Escudo Perfeito",
        "Muralha de Aço",
        "Barreira Mágica",
        "Desviar Projétil",
        "Fortaleza",
        "Último Bastião"
      ]}
      bonusPassivos={[
        "+25% de eficiência de bloqueio com escudo",
        "Aliados próximos recebem +5% de defesa",
        "Imune a efeitos de empurrão quando em postura defensiva",
        "Regeneração de estamina aumentada enquanto parado"
      ]}
    />
  );
}