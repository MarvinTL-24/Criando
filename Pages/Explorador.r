import React from "react";
import { Compass } from "lucide-react";
import ResponsabilidadeTemplate from "@/components/rpg/ResponsabilidadeTemplate";

export default function Explorador() {
  return (
    <ResponsabilidadeTemplate
      titulo="Explorador"
      subtitulo="Os olhos e ouvidos do grupo"
      icon={Compass}
      color="#3b82f6"
      descricao="O Explorador vai à frente, mapeando territórios, identificando perigos e encontrando recursos. Seu conhecimento de terreno e habilidades de reconhecimento são inestimáveis em jornadas e dungeons. Sabe quando avançar e quando recuar, guiando o grupo com segurança."
      funcoes={[
        { titulo: "Batedor", descricao: "Avança à frente do grupo para identificar emboscadas e obstáculos." },
        { titulo: "Cartógrafo", descricao: "Mapeia áreas exploradas e memoriza rotas de fuga." },
        { titulo: "Rastreador", descricao: "Segue trilhas, identifica pegadas e localiza alvos." },
        { titulo: "Desarmar Armadilhas", descricao: "Detecta e neutraliza armadilhas mecânicas e mágicas." }
      ]}
      habilidadesChave={[
        "Faro Aguçado",
        "Passos Silenciosos",
        "Olho de Águia",
        "Desarmar",
        "Camuflagem",
        "Sinal de Perigo"
      ]}
      bonusPassivos={[
        "+30% de velocidade de movimento em terreno difícil",
        "Detecta armadilhas automaticamente em 5m",
        "Não sofre penalidade de visão em escuridão parcial",
        "Chance de evitar encontros aleatórios aumentada"
      ]}
    />
  );
}