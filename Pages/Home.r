import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Shield, Sword, ScrollText, Zap, Backpack, Dog, Sparkles, Wrench, ChevronRight } from "lucide-react";

const infoCards = [
  {
    title: "Personagem & Ficha",
    icon: ScrollText,
    color: "#4a9eff",
    content: [
      { label: "Ficha", desc: "Onde reside a alma e o corpo. Foco em aparência detalhada (slots de corpo), história, personalidade e identidade visual." },
      { label: "Status", desc: "A matemática do poder. Força, agilidade, mana e cálculos de combate puro." }
    ]
  },
  {
    title: "Responsabilidades",
    icon: Shield,
    color: "#ff6b35",
    content: [
      { label: "Papel Tático", desc: "Define seu papel em grupo. Desde a Vanguarda que abre caminho, até o Doméstico que gerencia a base, ou o Domador que controla feras." }
    ]
  },
  {
    title: "Inventário & Mascote",
    icon: Backpack,
    color: "#4a9eff",
    content: [
      { label: "Recursos", desc: "Gerenciamento de armas, itens e equipamentos." },
      { label: "Mascote", desc: "Seu companheiro possui sua própria mini-ficha de evolução." }
    ]
  },
  {
    title: "Habilidades",
    icon: Sparkles,
    color: "#ff6b35",
    content: [
      { label: "Combate", desc: "Skills usadas em batalha (Dano, Cura, Buff)." },
      { label: "Proficiências", desc: "Talentos de vida (Ferreiro, Alquimia, Culinária) e maestria com armas." }
    ]
  }
];

const quickLinks = [
  { label: "Criar Ficha", page: "Ficha", icon: ScrollText, color: "#4a9eff" },
  { label: "Ver Status", page: "Status", icon: Zap, color: "#ff6b35" },
  { label: "Inventário", page: "Inventario", icon: Backpack, color: "#4a9eff" },
  { label: "Habilidades", page: "HabilidadesCombate", icon: Sword, color: "#ff6b35" },
];

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Banner - 25vh */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="relative w-full h-[25vh] min-h-[200px] overflow-hidden"
      >
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=1600&q=80')",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0c] via-[#0a0a0c]/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0c]/80 via-transparent to-[#0a0a0c]/80" />
        
        {/* Título central */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <motion.h1 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="font-cinzel text-4xl md:text-6xl font-bold text-[#e8e4dc] tracking-widest text-shadow-glow"
          >
            SISTEMA RPG
          </motion.h1>
          <motion.div 
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="w-32 h-[2px] bg-gradient-to-r from-transparent via-[#4a9eff] to-transparent mt-4"
          />
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="text-[#a0a0a0] mt-3 tracking-[0.3em] text-sm font-light"
          >
            HUB CENTRAL
          </motion.p>
        </div>

        {/* Bordas decorativas */}
        <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#4a9eff]/50 to-transparent" />
      </motion.div>

      {/* Quick Links */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {quickLinks.map((link, idx) => {
            const Icon = link.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + idx * 0.1 }}
              >
                <Link
                  to={createPageUrl(link.page)}
                  className="group flex items-center gap-3 p-4 bg-[#0f0f12] border border-[#2a2a2e] hover:border-[#4a9eff]/50 transition-all duration-300 hover:glow-blue"
                >
                  <div 
                    className="p-2 rounded transition-colors duration-300"
                    style={{ backgroundColor: `${link.color}20` }}
                  >
                    <Icon className="w-5 h-5" style={{ color: link.color }} />
                  </div>
                  <span className="font-cinzel text-sm text-[#e8e4dc] group-hover:text-[#4a9eff] transition-colors">
                    {link.label}
                  </span>
                  <ChevronRight className="w-4 h-4 ml-auto text-[#2a2a2e] group-hover:text-[#4a9eff] group-hover:translate-x-1 transition-all" />
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Info Cards */}
      <div className="max-w-6xl mx-auto px-4 pb-12">
        <div className="grid md:grid-cols-2 gap-6">
          {infoCards.map((card, idx) => {
            const Icon = card.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + idx * 0.15 }}
                className="bg-[#0f0f12] border border-[#2a2a2e] p-6 hover:border-[#4a9eff]/30 transition-all duration-500"
              >
                {/* Header */}
                <div className="flex items-center gap-3 mb-4 pb-4 border-b border-[#2a2a2e]">
                  <div 
                    className="p-2 rounded"
                    style={{ backgroundColor: `${card.color}15` }}
                  >
                    <Icon className="w-5 h-5" style={{ color: card.color }} />
                  </div>
                  <h3 
                    className="font-cinzel text-lg font-semibold"
                    style={{ color: card.color }}
                  >
                    {card.title}
                  </h3>
                </div>

                {/* Content */}
                <div className="space-y-4">
                  {card.content.map((item, i) => (
                    <div key={i}>
                      <span className="text-[#e8e4dc] font-medium">{item.label}:</span>
                      <p className="text-[#808080] text-sm leading-relaxed mt-1">
                        {item.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Footer decorativo */}
      <div className="border-t border-[#2a2a2e] py-8">
        <div className="flex justify-center items-center gap-4">
          <div className="w-16 h-[1px] bg-gradient-to-r from-transparent to-[#4a9eff]/50" />
          <Sword className="w-4 h-4 text-[#4a9eff]/50" />
          <div className="w-16 h-[1px] bg-gradient-to-l from-transparent to-[#4a9eff]/50" />
        </div>
      </div>
    </div>
  );
}