import React, { useState } from "react";
import { motion } from "framer-motion";
import { Zap, Sword, Shield, Heart, Flame, Wind, Brain, Eye, Save, Calculator } from "lucide-react";
import PageHeader from "@/components/rpg/PageHeader";
import SectionCard from "@/components/rpg/SectionCard";
import StatInput from "@/components/rpg/StatInput";
import StatBar from "@/components/rpg/StatBar";
import ActionButton from "@/components/rpg/ActionButton";

const atributos = [
  { id: "forca", label: "Força", icon: Sword, color: "#dc2626", desc: "Poder físico bruto" },
  { id: "destreza", label: "Destreza", icon: Wind, color: "#22c55e", desc: "Agilidade e reflexos" },
  { id: "constituicao", label: "Constituição", icon: Shield, color: "#f59e0b", desc: "Resistência e vitalidade" },
  { id: "inteligencia", label: "Inteligência", icon: Brain, color: "#3b82f6", desc: "Conhecimento e razão" },
  { id: "sabedoria", label: "Sabedoria", icon: Eye, color: "#8b5cf6", desc: "Percepção e intuição" },
  { id: "carisma", label: "Carisma", icon: Flame, color: "#ec4899", desc: "Presença e influência" },
];

export default function Status() {
  const [stats, setStats] = useState({
    nivel: 1,
    experiencia: 0,
    vidaAtual: 100,
    vidaMax: 100,
    manaAtual: 50,
    manaMax: 50,
    estaminaAtual: 80,
    estaminaMax: 80,
    forca: 10,
    destreza: 10,
    constituicao: 10,
    inteligencia: 10,
    sabedoria: 10,
    carisma: 10,
  });

  const [saving, setSaving] = useState(false);

  const handleChange = (field, value) => {
    const numValue = parseInt(value) || 0;
    setStats(prev => ({ ...prev, [field]: numValue }));
  };

  // Cálculos derivados
  const calcularDano = () => Math.floor(stats.forca * 1.5 + stats.nivel * 2);
  const calcularDefesa = () => Math.floor(stats.constituicao * 1.2 + stats.destreza * 0.5);
  const calcularEvasao = () => Math.floor(stats.destreza * 1.5 + stats.sabedoria * 0.3);
  const calcularPoderMagico = () => Math.floor(stats.inteligencia * 1.5 + stats.sabedoria * 0.5);

  const handleSave = async () => {
    setSaving(true);
    await new Promise(r => setTimeout(r, 1000));
    setSaving(false);
  };

  return (
    <div className="min-h-screen pb-12">
      <PageHeader 
        title="Status"
        subtitle="Atributos & Cálculos"
        icon={Zap}
        color="#ff6b35"
      />

      <div className="max-w-6xl mx-auto px-4 py-8 space-y-6">
        {/* Nível e XP */}
        <SectionCard title="Progressão" icon={Zap} color="#ff6b35" delay={0.1}>
          <div className="grid md:grid-cols-3 gap-6">
            <StatInput 
              label="Nível"
              type="number"
              value={stats.nivel}
              onChange={(e) => handleChange('nivel', e.target.value)}
              icon={Zap}
            />
            <div className="md:col-span-2">
              <label className="block text-xs uppercase tracking-widest text-[#606060] mb-2 font-cinzel">
                Experiência
              </label>
              <StatBar 
                label=""
                current={stats.experiencia}
                max={stats.nivel * 1000}
                color="#ff6b35"
              />
              <div className="flex justify-between mt-2">
                <input
                  type="number"
                  value={stats.experiencia}
                  onChange={(e) => handleChange('experiencia', e.target.value)}
                  className="w-24 bg-transparent border-b border-[#2a2a2e] text-[#e8e4dc] text-sm focus:outline-none focus:border-[#ff6b35]"
                />
                <span className="text-[#606060] text-sm">/ {stats.nivel * 1000} XP</span>
              </div>
            </div>
          </div>
        </SectionCard>

        {/* Barras de Recursos */}
        <SectionCard title="Recursos Vitais" icon={Heart} color="#dc2626" delay={0.2}>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="space-y-4">
              <StatBar 
                label="Vida"
                current={stats.vidaAtual}
                max={stats.vidaMax}
                color="#dc2626"
                icon={Heart}
              />
              <div className="flex gap-2">
                <input
                  type="number"
                  value={stats.vidaAtual}
                  onChange={(e) => handleChange('vidaAtual', e.target.value)}
                  className="w-20 bg-transparent border-b border-[#2a2a2e] text-[#e8e4dc] text-sm focus:outline-none focus:border-[#dc2626] text-center"
                />
                <span className="text-[#404040]">/</span>
                <input
                  type="number"
                  value={stats.vidaMax}
                  onChange={(e) => handleChange('vidaMax', e.target.value)}
                  className="w-20 bg-transparent border-b border-[#2a2a2e] text-[#e8e4dc] text-sm focus:outline-none focus:border-[#dc2626] text-center"
                />
              </div>
            </div>

            <div className="space-y-4">
              <StatBar 
                label="Mana"
                current={stats.manaAtual}
                max={stats.manaMax}
                color="#3b82f6"
                icon={Flame}
              />
              <div className="flex gap-2">
                <input
                  type="number"
                  value={stats.manaAtual}
                  onChange={(e) => handleChange('manaAtual', e.target.value)}
                  className="w-20 bg-transparent border-b border-[#2a2a2e] text-[#e8e4dc] text-sm focus:outline-none focus:border-[#3b82f6] text-center"
                />
                <span className="text-[#404040]">/</span>
                <input
                  type="number"
                  value={stats.manaMax}
                  onChange={(e) => handleChange('manaMax', e.target.value)}
                  className="w-20 bg-transparent border-b border-[#2a2a2e] text-[#e8e4dc] text-sm focus:outline-none focus:border-[#3b82f6] text-center"
                />
              </div>
            </div>

            <div className="space-y-4">
              <StatBar 
                label="Estamina"
                current={stats.estaminaAtual}
                max={stats.estaminaMax}
                color="#22c55e"
                icon={Wind}
              />
              <div className="flex gap-2">
                <input
                  type="number"
                  value={stats.estaminaAtual}
                  onChange={(e) => handleChange('estaminaAtual', e.target.value)}
                  className="w-20 bg-transparent border-b border-[#2a2a2e] text-[#e8e4dc] text-sm focus:outline-none focus:border-[#22c55e] text-center"
                />
                <span className="text-[#404040]">/</span>
                <input
                  type="number"
                  value={stats.estaminaMax}
                  onChange={(e) => handleChange('estaminaMax', e.target.value)}
                  className="w-20 bg-transparent border-b border-[#2a2a2e] text-[#e8e4dc] text-sm focus:outline-none focus:border-[#22c55e] text-center"
                />
              </div>
            </div>
          </div>
        </SectionCard>

        {/* Atributos */}
        <SectionCard title="Atributos Base" icon={Sword} color="#4a9eff" delay={0.3}>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {atributos.map((attr) => {
              const Icon = attr.icon;
              return (
                <motion.div
                  key={attr.id}
                  whileHover={{ scale: 1.02 }}
                  className="bg-[#0a0a0c] border border-[#2a2a2e] p-4 text-center group hover:border-[#4a9eff]/50 transition-all"
                >
                  <div 
                    className="w-10 h-10 mx-auto mb-3 rounded-lg flex items-center justify-center"
                    style={{ backgroundColor: `${attr.color}20` }}
                  >
                    <Icon className="w-5 h-5" style={{ color: attr.color }} />
                  </div>
                  <label className="block text-xs uppercase tracking-widest text-[#606060] mb-2 font-cinzel">
                    {attr.label}
                  </label>
                  <input
                    type="number"
                    value={stats[attr.id]}
                    onChange={(e) => handleChange(attr.id, e.target.value)}
                    className="w-full bg-transparent border-b-2 border-[#2a2a2e] text-2xl font-bold text-[#e8e4dc] text-center focus:outline-none focus:border-[#4a9eff] py-1"
                    style={{ fontFamily: 'monospace' }}
                  />
                  <p className="text-[#404040] text-xs mt-2">{attr.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </SectionCard>

        {/* Valores Calculados */}
        <SectionCard title="Valores Derivados" icon={Calculator} color="#8b5cf6" delay={0.4}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="bg-[#0a0a0c] border border-[#2a2a2e] p-4 text-center">
              <Sword className="w-6 h-6 mx-auto mb-2 text-[#dc2626]" />
              <p className="text-xs uppercase tracking-widest text-[#606060] font-cinzel">Dano Base</p>
              <p className="text-3xl font-bold text-[#dc2626] font-mono mt-2">{calcularDano()}</p>
            </div>
            <div className="bg-[#0a0a0c] border border-[#2a2a2e] p-4 text-center">
              <Shield className="w-6 h-6 mx-auto mb-2 text-[#f59e0b]" />
              <p className="text-xs uppercase tracking-widest text-[#606060] font-cinzel">Defesa</p>
              <p className="text-3xl font-bold text-[#f59e0b] font-mono mt-2">{calcularDefesa()}</p>
            </div>
            <div className="bg-[#0a0a0c] border border-[#2a2a2e] p-4 text-center">
              <Wind className="w-6 h-6 mx-auto mb-2 text-[#22c55e]" />
              <p className="text-xs uppercase tracking-widest text-[#606060] font-cinzel">Evasão</p>
              <p className="text-3xl font-bold text-[#22c55e] font-mono mt-2">{calcularEvasao()}</p>
            </div>
            <div className="bg-[#0a0a0c] border border-[#2a2a2e] p-4 text-center">
              <Brain className="w-6 h-6 mx-auto mb-2 text-[#8b5cf6]" />
              <p className="text-xs uppercase tracking-widest text-[#606060] font-cinzel">Poder Mágico</p>
              <p className="text-3xl font-bold text-[#8b5cf6] font-mono mt-2">{calcularPoderMagico()}</p>
            </div>
          </div>
        </SectionCard>

        {/* Ações */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="flex justify-end gap-4 pt-6 border-t border-[#2a2a2e]"
        >
          <ActionButton variant="secondary">
            Resetar
          </ActionButton>
          <ActionButton 
            variant="bonfire" 
            icon={Save}
            onClick={handleSave}
            loading={saving}
          >
            Salvar Status
          </ActionButton>
        </motion.div>
      </div>
    </div>
  );
}