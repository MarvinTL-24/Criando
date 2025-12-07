import React from "react";
import { Shield } from "lucide-react";
import ResponsabilidadeTemplate from "@/components/rpg/ResponsabilidadeTemplate";

export default function Vanguarda() {
  return (
    <ResponsabilidadeTemplate
      titulo="Vanguarda"
      subtitulo="A linha de frente da batalha"
      icon={Shield}
      color="#dc2626"
      descricao="O Vanguarda é o primeiro a entrar em combate e o último a sair. Sua função é abrir caminho pelo inimigo, atrair atenção e garantir que os aliados mais frágeis possam atuar com segurança. São guerreiros destemidos que não recuam diante do perigo."
      funcoes={[
        { titulo: "Iniciador de Combate", descricao: "Entra primeiro em batalha, estabelecendo a linha de frente e engajando inimigos prioritários." },
        { titulo: "Tanque de Dano", descricao: "Absorve o máximo de dano possível, usando provocações e posicionamento tático." },
        { titulo: "Controle de Zona", descricao: "Mantém inimigos ocupados em uma área específica, impedindo que avancem." },
        { titulo: "Protetor de Aliados", descricao: "Posiciona-se entre ameaças e companheiros mais vulneráveis." }
      ]}
      habilidadesChave={[
        "Provocar",
        "Investida",
        "Grito de Guerra",
        "Golpe Devastador",
        "Postura Defensiva",
        "Contra-Ataque"
      ]}
      bonusPassivos={[
        "+15% de resistência a dano físico",
        "+10% de chance de agravo (taunt) em ataques",
        "Regeneração aumentada quando abaixo de 30% HP",
        "Movimento não é reduzido por armadura pesada"
      ]}
    />
  );
}