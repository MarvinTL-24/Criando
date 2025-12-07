import React, { useState } from "react";
import { motion } from "framer-motion";
import { ScrollText, User, Palette, BookOpen, Heart, Brain, Sparkles, Save } from "lucide-react";
import PageHeader from "@/components/rpg/PageHeader";
import SectionCard from "@/components/rpg/SectionCard";
import StatInput from "@/components/rpg/StatInput";
import ActionButton from "@/components/rpg/ActionButton";
import { Textarea } from "@/components/ui/textarea";

const bodySlots = [
  { id: "cabeca", label: "Cabeça", placeholder: "Corte de cabelo, cicatrizes faciais..." },
  { id: "olhos", label: "Olhos", placeholder: "Cor, formato, expressão..." },
  { id: "torso", label: "Torso", placeholder: "Tatuagens, cicatrizes, estrutura..." },
  { id: "bracos", label: "Braços", placeholder: "Marcas, músculos, adornos..." },
  { id: "maos", label: "Mãos", placeholder: "Calosidades, anéis, garras..." },
  { id: "pernas", label: "Pernas", placeholder: "Próteses, armaduras, marcas..." },
  { id: "pes", label: "Pés", placeholder: "Botas, descalço, garras..." },
];

export default function Ficha() {
  const [ficha, setFicha] = useState({
    nome: "",
    titulo: "",
    idade: "",
    raca: "",
    classe: "",
    historia: "",
    personalidade: "",
    motivacoes: "",
    medos: "",
    corpo: {}
  });

  const [saving, setSaving] = useState(false);

  const handleChange = (field, value) => {
    setFicha(prev => ({ ...prev, [field]: value }));
  };

  const handleBodyChange = (slot, value) => {
    setFicha(prev => ({
      ...prev,
      corpo: { ...prev.corpo, [slot]: value }
    }));
  };

  const handleSave = async () => {
    setSaving(true);
    // Simula salvamento
    await new Promise(r => setTimeout(r, 1000));
    setSaving(false);
  };

  return (
    <div className="min-h-screen pb-12">
      <PageHeader 
        title="Ficha do Personagem"
        subtitle="Lore & Corpo"
        icon={ScrollText}
        color="#4a9eff"
      />

      <div className="max-w-6xl mx-auto px-4 py-8 space-y-6">
        {/* Identidade */}
        <SectionCard title="Identidade" icon={User} color="#4a9eff" delay={0.1}>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <StatInput 
              label="Nome"
              value={ficha.nome}
              onChange={(e) => handleChange('nome', e.target.value)}
              placeholder="Nome do personagem"
            />
            <StatInput 
              label="Título / Epíteto"
              value={ficha.titulo}
              onChange={(e) => handleChange('titulo', e.target.value)}
              placeholder="O Destemido, A Sombra..."
            />
            <StatInput 
              label="Idade"
              value={ficha.idade}
              onChange={(e) => handleChange('idade', e.target.value)}
              placeholder="25 anos"
            />
            <StatInput 
              label="Raça"
              value={ficha.raca}
              onChange={(e) => handleChange('raca', e.target.value)}
              placeholder="Humano, Elfo, Anão..."
            />
            <StatInput 
              label="Classe"
              value={ficha.classe}
              onChange={(e) => handleChange('classe', e.target.value)}
              placeholder="Guerreiro, Mago..."
            />
          </div>
        </SectionCard>

        {/* Aparência - Slots de Corpo */}
        <SectionCard title="Aparência Física" icon={Palette} color="#ff6b35" delay={0.2}>
          <p className="text-[#606060] text-sm mb-6">
            Descreva cada parte do corpo do seu personagem para criar uma imagem detalhada.
          </p>
          <div className="grid md:grid-cols-2 gap-4">
            {bodySlots.map((slot) => (
              <div key={slot.id} className="space-y-2">
                <label className="block text-xs uppercase tracking-widest text-[#606060] font-cinzel">
                  {slot.label}
                </label>
                <Textarea
                  value={ficha.corpo[slot.id] || ""}
                  onChange={(e) => handleBodyChange(slot.id, e.target.value)}
                  placeholder={slot.placeholder}
                  className="bg-transparent border border-[#2a2a2e] text-[#e8e4dc] placeholder-[#404040] focus:border-[#ff6b35] resize-none h-20"
                />
              </div>
            ))}
          </div>
        </SectionCard>

        {/* História */}
        <SectionCard title="História & Passado" icon={BookOpen} color="#4a9eff" delay={0.3}>
          <div className="space-y-2">
            <label className="block text-xs uppercase tracking-widest text-[#606060] font-cinzel">
              História de Fundo
            </label>
            <Textarea
              value={ficha.historia}
              onChange={(e) => handleChange('historia', e.target.value)}
              placeholder="De onde veio seu personagem? Qual sua origem? O que o levou a essa vida de aventuras?"
              className="bg-transparent border border-[#2a2a2e] text-[#e8e4dc] placeholder-[#404040] focus:border-[#4a9eff] resize-none min-h-[150px]"
            />
          </div>
        </SectionCard>

        {/* Personalidade */}
        <div className="grid md:grid-cols-2 gap-6">
          <SectionCard title="Personalidade" icon={Heart} color="#ff6b35" delay={0.4}>
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="block text-xs uppercase tracking-widest text-[#606060] font-cinzel">
                  Traços de Personalidade
                </label>
                <Textarea
                  value={ficha.personalidade}
                  onChange={(e) => handleChange('personalidade', e.target.value)}
                  placeholder="Como seu personagem age? É corajoso? Tímido? Impulsivo?"
                  className="bg-transparent border border-[#2a2a2e] text-[#e8e4dc] placeholder-[#404040] focus:border-[#ff6b35] resize-none h-24"
                />
              </div>
              <div className="space-y-2">
                <label className="block text-xs uppercase tracking-widest text-[#606060] font-cinzel">
                  Medos & Fraquezas
                </label>
                <Textarea
                  value={ficha.medos}
                  onChange={(e) => handleChange('medos', e.target.value)}
                  placeholder="O que seu personagem teme? Quais são suas fraquezas?"
                  className="bg-transparent border border-[#2a2a2e] text-[#e8e4dc] placeholder-[#404040] focus:border-[#ff6b35] resize-none h-24"
                />
              </div>
            </div>
          </SectionCard>

          <SectionCard title="Motivações & Objetivos" icon={Brain} color="#4a9eff" delay={0.5}>
            <div className="space-y-2">
              <label className="block text-xs uppercase tracking-widest text-[#606060] font-cinzel">
                O que move seu personagem?
              </label>
              <Textarea
                value={ficha.motivacoes}
                onChange={(e) => handleChange('motivacoes', e.target.value)}
                placeholder="Quais são os objetivos do seu personagem? Vingança? Riqueza? Proteção? Conhecimento?"
                className="bg-transparent border border-[#2a2a2e] text-[#e8e4dc] placeholder-[#404040] focus:border-[#4a9eff] resize-none min-h-[180px]"
              />
            </div>
          </SectionCard>
        </div>

        {/* Ações */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
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
            Salvar Ficha
          </ActionButton>
        </motion.div>
      </div>
    </div>
  );
}