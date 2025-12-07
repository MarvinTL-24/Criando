import React from "react";
import { Home } from "lucide-react";
import ResponsabilidadeTemplate from "@/components/rpg/ResponsabilidadeTemplate";

export default function Domestico() {
  return (
    <ResponsabilidadeTemplate
      titulo="Doméstico"
      subtitulo="O coração da base de operações"
      icon={Home}
      color="#8b5cf6"
      descricao="O Doméstico gerencia a base, os recursos e o bem-estar do grupo fora de combate. Responsável por manter suprimentos, cozinhar, organizar equipamentos e criar um ambiente seguro para descanso. Seu trabalho nos bastidores permite que o grupo opere em máxima eficiência."
      funcoes={[
        { titulo: "Gestor de Recursos", descricao: "Controla inventário, rações e suprimentos essenciais do grupo." },
        { titulo: "Cozinheiro", descricao: "Prepara refeições que conferem buffs e restauram moral." },
        { titulo: "Artesão de Campo", descricao: "Repara equipamentos e cria itens básicos durante viagens." },
        { titulo: "Organizador", descricao: "Mantém a base organizada e funcional, otimizando espaço." }
      ]}
      habilidadesChave={[
        "Culinária Avançada",
        "Reparo de Equipamento",
        "Gestão de Estoque",
        "Acampamento Eficiente",
        "Negociação",
        "Primeiros Socorros"
      ]}
      bonusPassivos={[
        "Comidas preparadas têm +25% de duração de buff",
        "Reparo de equipamentos custa menos materiais",
        "Acampamentos restauram mais vida/mana durante descanso",
        "Desconto em compras de suprimentos básicos"
      ]}
    />
  );
}