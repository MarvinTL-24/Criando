import React, { useState } from "react";
import { motion } from "framer-motion";
import { Wrench, Hammer, FlaskConical, Utensils, Gem, Scroll, Crosshair, Swords, Axe, Wand2 } from "lucide-react";
import PageHeader from "@/components/rpg/PageHeader";
import SectionCard from "@/components/rpg/SectionCard";

const proficienciasOficio = [
  { id: "ferreiro", label: "Ferreiro", icon: Hammer, descricao: "Forja armas e armaduras de metal", nivel: 3, maxNivel: 10 },
  { id: "alquimia", label: "Alquimia", icon: FlaskConical, descricao: "Cria poções e elixires mágicos", nivel: 5, maxNivel: 10 },
  { id: "culinaria", label: "Culinária", icon: Utensils, descricao: "Prepara refeições com buffs especiais", nivel: 2, maxNivel: 10 },
  { id: "joalheria", label: "Joalheria", icon: Gem, descricao: "Cria anéis e amuletos encantados", nivel: 1, maxNivel: 10 },
  { id: "escriba", label: "Escriba", icon: Scroll, descricao: "Copia e cria pergaminhos mágicos", nivel: 4, maxNivel: 10 },
];

const proficienciasArmas = [
  { id: "espadas", label: "Espadas", icon: Swords, nivel: 7, maxNivel: 10 },
  { id: "machados", label: "Machados", icon: Axe, nivel: 4, maxNivel: 10 },
  { id: "arcos", label: "Arcos", icon: Crosshair, nivel: 6, maxNivel: 10 },
  { id: "cajados", label: "Cajados", icon: Wand2, nivel: 3, maxNivel: 10 },
];

function ProficienciaBar({ proficiencia, color }) {
  const Icon = proficiencia.icon;
  const porcentagem = (proficiencia.nivel / proficiencia.maxNivel) * 100;

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className="bg-[#0a0a0c] border border-[#2a2a2e] p-4 hover:border-[#4a9eff]/30 transition-all"
    >
      <div className="flex items-center gap-4">
        <div 
          className="p-3 rounded-lg"
          style={{ backgroundColor: `${color}15` }}
        >
          <Icon className="w-6 h-6" style={{ color }} />
        </div>
        
        <div className="flex-1">
          <div className="flex justify-between items-center mb-2">
            <h4 className="text-[#e8e4dc] font-medium">{proficiencia.label}</h4>
            <span className="text-sm font-mono" style={{ color }}>
              {proficiencia.nivel}/{proficiencia.maxNivel}
            </span>
          </div>
          
          {proficiencia.descricao && (
            <p className="text-[#606060] text-xs mb-2">{proficiencia.descricao}</p>
          )}
          
          <div className="h-2 bg-[#1a1a1e] rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${porcentagem}%` }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="h-full rounded-full"
              style={{ 
                backgroundColor: color,
                boxShadow: `0 0 10px ${color}50`
              }}
            />
          </div>
          
          {/* Marcadores de nível */}
          <div className="flex justify-between mt-1">
            {[...Array(10)].map((_, i) => (
              <div 
                key={i}
                className={`w-1 h-1 rounded-full ${
                  i < proficiencia.nivel ? '' : 'bg-[#2a2a2e]'
                }`}
                style={i < proficiencia.nivel ? { backgroundColor: color } : {}}
              />
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function NivelMaestria({ nivel }) {
  if (nivel <= 2) return <span className="text-[#606060]">Aprendiz</span>;
  if (nivel <= 4) return <span className="text-[#22c55e]">Iniciante</span>;
  if (nivel <= 6) return <span className="text-[#3b82f6]">Competente</span>;
  if (nivel <= 8) return <span className="text-[#f59e0b]">Experiente</span>;
  return <span className="text-[#dc2626]">Mestre</span>;
}

export default function Proficiencias() {
  return (
    <div className="min-h-screen pb-12">
      <PageHeader 
        title="Proficiências"
        subtitle="Ofícios e Maestria com Armas"
        icon={Wrench}
        color="#f59e0b"
      />

      <div className="max-w-6xl mx-auto px-4 py-8 space-y-6">
        {/* Legenda */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex flex-wrap justify-center gap-6 text-sm"
        >
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-[#606060]" />
            <span className="text-[#606060]">Aprendiz (1-2)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-[#22c55e]" />
            <span className="text-[#606060]">Iniciante (3-4)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-[#3b82f6]" />
            <span className="text-[#606060]">Competente (5-6)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-[#f59e0b]" />
            <span className="text-[#606060]">Experiente (7-8)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-[#dc2626]" />
            <span className="text-[#606060]">Mestre (9-10)</span>
          </div>
        </motion.div>

        {/* Ofícios */}
        <SectionCard title="Ofícios & Crafting" icon={Hammer} color="#f59e0b" delay={0.1}>
          <div className="grid md:grid-cols-2 gap-4">
            {proficienciasOficio.map((prof, idx) => (
              <ProficienciaBar 
                key={prof.id} 
                proficiencia={prof} 
                color="#f59e0b"
              />
            ))}
          </div>
        </SectionCard>

        {/* Maestria com Armas */}
        <SectionCard title="Maestria com Armas" icon={Swords} color="#dc2626" delay={0.2}>
          <div className="grid md:grid-cols-2 gap-4">
            {proficienciasArmas.map((prof, idx) => (
              <ProficienciaBar 
                key={prof.id} 
                proficiencia={prof} 
                color="#dc2626"
              />
            ))}
          </div>
        </SectionCard>

        {/* Resumo */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-[#0f0f12] border border-[#2a2a2e] p-6"
        >
          <h3 className="font-cinzel text-lg text-[#4a9eff] mb-4">Resumo de Progressão</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <p className="text-3xl font-bold text-[#f59e0b]">
                {proficienciasOficio.reduce((acc, p) => acc + p.nivel, 0)}
              </p>
              <p className="text-xs text-[#606060] uppercase tracking-wide">Pontos em Ofícios</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-[#dc2626]">
                {proficienciasArmas.reduce((acc, p) => acc + p.nivel, 0)}
              </p>
              <p className="text-xs text-[#606060] uppercase tracking-wide">Pontos em Armas</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-[#4a9eff]">
                {proficienciasOficio.filter(p => p.nivel >= 5).length}
              </p>
              <p className="text-xs text-[#606060] uppercase tracking-wide">Ofícios Dominados</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-[#22c55e]">
                {proficienciasArmas.filter(p => p.nivel >= 5).length}
              </p>
              <p className="text-xs text-[#606060] uppercase tracking-wide">Armas Dominadas</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}