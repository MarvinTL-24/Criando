import React, { useState } from "react";
import { motion } from "framer-motion";
import { Dog, Heart, Zap, Shield, Sparkles, Save, Star } from "lucide-react";
import PageHeader from "@/components/rpg/PageHeader";
import SectionCard from "@/components/rpg/SectionCard";
import StatInput from "@/components/rpg/StatInput";
import StatBar from "@/components/rpg/StatBar";
import ActionButton from "@/components/rpg/ActionButton";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const tiposMascote = [
  { value: "canino", label: "Canino (Lobo, Cão)" },
  { value: "felino", label: "Felino (Gato, Pantera)" },
  { value: "ave", label: "Ave (Falcão, Corvo)" },
  { value: "reptil", label: "Réptil (Lagarto, Serpente)" },
  { value: "fantastico", label: "Fantástico (Dragão, Fênix)" },
  { value: "outro", label: "Outro" },
];

export default function Mascote() {
  const [mascote, setMascote] = useState({
    nome: "",
    tipo: "canino",
    nivel: 1,
    lealdade: 80,
    vidaAtual: 50,
    vidaMax: 50,
    aparencia: "",
    personalidade: "",
    habilidadeEspecial: "",
    historia: ""
  });

  const [saving, setSaving] = useState(false);

  const handleChange = (field, value) => {
    setMascote(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    setSaving(true);
    await new Promise(r => setTimeout(r, 1000));
    setSaving(false);
  };

  return (
    <div className="min-h-screen pb-12">
      <PageHeader 
        title="Mascote"
        subtitle="Seu companheiro fiel"
        icon={Dog}
        color="#ec4899"
      />

      <div className="max-w-6xl mx-auto px-4 py-8 space-y-6">
        {/* Identidade do Mascote */}
        <SectionCard title="Identidade" icon={Dog} color="#ec4899" delay={0.1}>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <StatInput 
              label="Nome do Mascote"
              value={mascote.nome}
              onChange={(e) => handleChange('nome', e.target.value)}
              placeholder="Como se chama seu companheiro?"
            />
            <div>
              <label className="block text-xs uppercase tracking-widest text-[#606060] mb-2 font-cinzel">
                Tipo de Criatura
              </label>
              <Select value={mascote.tipo} onValueChange={(v) => handleChange('tipo', v)}>
                <SelectTrigger className="bg-transparent border-b-2 border-[#2a2a2e] text-[#e8e4dc] rounded-none">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-[#0f0f12] border-[#2a2a2e]">
                  {tiposMascote.map(tipo => (
                    <SelectItem key={tipo.value} value={tipo.value}>{tipo.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <StatInput 
              label="Nível"
              type="number"
              value={mascote.nivel}
              onChange={(e) => handleChange('nivel', parseInt(e.target.value) || 1)}
              icon={Star}
            />
          </div>
        </SectionCard>

        {/* Status do Mascote */}
        <SectionCard title="Status" icon={Heart} color="#dc2626" delay={0.2}>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <StatBar 
                label="Vida"
                current={mascote.vidaAtual}
                max={mascote.vidaMax}
                color="#dc2626"
                icon={Heart}
              />
              <div className="flex gap-2">
                <input
                  type="number"
                  value={mascote.vidaAtual}
                  onChange={(e) => handleChange('vidaAtual', parseInt(e.target.value) || 0)}
                  className="w-20 bg-transparent border-b border-[#2a2a2e] text-[#e8e4dc] text-sm focus:outline-none focus:border-[#dc2626] text-center"
                />
                <span className="text-[#404040]">/</span>
                <input
                  type="number"
                  value={mascote.vidaMax}
                  onChange={(e) => handleChange('vidaMax', parseInt(e.target.value) || 0)}
                  className="w-20 bg-transparent border-b border-[#2a2a2e] text-[#e8e4dc] text-sm focus:outline-none focus:border-[#dc2626] text-center"
                />
              </div>
            </div>

            <div className="space-y-4">
              <StatBar 
                label="Lealdade"
                current={mascote.lealdade}
                max={100}
                color="#ec4899"
                icon={Heart}
              />
              <input
                type="range"
                min="0"
                max="100"
                value={mascote.lealdade}
                onChange={(e) => handleChange('lealdade', parseInt(e.target.value))}
                className="w-full accent-[#ec4899]"
              />
              <p className="text-[#606060] text-sm text-center">
                {mascote.lealdade < 30 ? "Desconfiado" : 
                 mascote.lealdade < 60 ? "Amigável" : 
                 mascote.lealdade < 90 ? "Leal" : "Devoto"}
              </p>
            </div>
          </div>
        </SectionCard>

        {/* Aparência e Personalidade */}
        <div className="grid md:grid-cols-2 gap-6">
          <SectionCard title="Aparência" icon={Sparkles} color="#8b5cf6" delay={0.3}>
            <Textarea
              value={mascote.aparencia}
              onChange={(e) => handleChange('aparencia', e.target.value)}
              placeholder="Descreva a aparência do seu mascote: pelagem, olhos, marcas distintivas..."
              className="bg-transparent border border-[#2a2a2e] text-[#e8e4dc] placeholder-[#404040] focus:border-[#8b5cf6] resize-none min-h-[150px]"
            />
          </SectionCard>

          <SectionCard title="Personalidade" icon={Heart} color="#f59e0b" delay={0.4}>
            <Textarea
              value={mascote.personalidade}
              onChange={(e) => handleChange('personalidade', e.target.value)}
              placeholder="Como seu mascote se comporta? É bravo? Tímido? Protetor?"
              className="bg-transparent border border-[#2a2a2e] text-[#e8e4dc] placeholder-[#404040] focus:border-[#f59e0b] resize-none min-h-[150px]"
            />
          </SectionCard>
        </div>

        {/* Habilidade Especial */}
        <SectionCard title="Habilidade Especial" icon={Zap} color="#4a9eff" delay={0.5}>
          <div className="space-y-4">
            <StatInput 
              label="Nome da Habilidade"
              value={mascote.habilidadeEspecial}
              onChange={(e) => handleChange('habilidadeEspecial', e.target.value)}
              placeholder="Ex: Faro Aguçado, Voo Rasante, Mordida Venenosa..."
              icon={Zap}
            />
            <div className="bg-[#0a0a0c] border border-[#2a2a2e] p-4 rounded">
              <p className="text-[#606060] text-sm">
                A habilidade especial do seu mascote é única e pode ser usada em combate ou exploração.
                Converse com o mestre para definir os efeitos mecânicos.
              </p>
            </div>
          </div>
        </SectionCard>

        {/* História */}
        <SectionCard title="História" icon={Dog} color="#22c55e" delay={0.6}>
          <Textarea
            value={mascote.historia}
            onChange={(e) => handleChange('historia', e.target.value)}
            placeholder="Como você encontrou seu mascote? Qual a história de vocês juntos?"
            className="bg-transparent border border-[#2a2a2e] text-[#e8e4dc] placeholder-[#404040] focus:border-[#22c55e] resize-none min-h-[120px]"
          />
        </SectionCard>

        {/* Ações */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="flex justify-end gap-4 pt-6 border-t border-[#2a2a2e]"
        >
          <ActionButton variant="secondary">
            Cancelar
          </ActionButton>
          <ActionButton 
            variant="primary" 
            icon={Save}
            onClick={handleSave}
            loading={saving}
          >
            Salvar Mascote
          </ActionButton>
        </motion.div>
      </div>
    </div>
  );
}