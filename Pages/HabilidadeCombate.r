import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sword, Plus, Trash2, Edit2, Flame, Shield, Heart, Zap, Wind } from "lucide-react";
import PageHeader from "@/components/rpg/PageHeader";
import SectionCard from "@/components/rpg/SectionCard";
import ActionButton from "@/components/rpg/ActionButton";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

const tiposHabilidade = [
  { value: "dano", label: "Dano", icon: Sword, color: "#dc2626" },
  { value: "cura", label: "Cura", icon: Heart, color: "#22c55e" },
  { value: "buff", label: "Buff", icon: Zap, color: "#f59e0b" },
  { value: "debuff", label: "Debuff", icon: Shield, color: "#8b5cf6" },
  { value: "utilidade", label: "Utilidade", icon: Wind, color: "#3b82f6" },
];

const habilidadesExemplo = [
  { 
    id: 1, 
    nome: "Golpe Devastador", 
    tipo: "dano", 
    custoMana: 20, 
    cooldown: 2,
    descricao: "Um golpe poderoso que causa 150% do dano base.",
    nivel: 3
  },
  { 
    id: 2, 
    nome: "Cura Menor", 
    tipo: "cura", 
    custoMana: 15, 
    cooldown: 1,
    descricao: "Restaura 30 HP do alvo.",
    nivel: 2
  },
  { 
    id: 3, 
    nome: "Fúria do Guerreiro", 
    tipo: "buff", 
    custoMana: 30, 
    cooldown: 5,
    descricao: "Aumenta o dano em 25% por 3 turnos.",
    nivel: 1
  },
];

export default function HabilidadesCombate() {
  const [habilidades, setHabilidades] = useState(habilidadesExemplo);
  const [filtroTipo, setFiltroTipo] = useState("todos");
  const [modalAberto, setModalAberto] = useState(false);
  const [habEditando, setHabEditando] = useState(null);
  const [novaHab, setNovaHab] = useState({
    nome: "",
    tipo: "dano",
    custoMana: 10,
    cooldown: 1,
    descricao: "",
    nivel: 1
  });

  const habsFiltradas = filtroTipo === "todos" 
    ? habilidades 
    : habilidades.filter(h => h.tipo === filtroTipo);

  const getTipo = (tipo) => tiposHabilidade.find(t => t.value === tipo);

  const handleAdd = () => {
    if (!novaHab.nome.trim()) return;
    
    if (habEditando) {
      setHabilidades(habilidades.map(h => 
        h.id === habEditando.id ? { ...novaHab, id: h.id } : h
      ));
    } else {
      setHabilidades([...habilidades, { ...novaHab, id: Date.now() }]);
    }
    
    setModalAberto(false);
    setHabEditando(null);
    setNovaHab({ nome: "", tipo: "dano", custoMana: 10, cooldown: 1, descricao: "", nivel: 1 });
  };

  const handleEdit = (hab) => {
    setHabEditando(hab);
    setNovaHab(hab);
    setModalAberto(true);
  };

  const handleDelete = (id) => {
    setHabilidades(habilidades.filter(h => h.id !== id));
  };

  return (
    <div className="min-h-screen pb-12">
      <PageHeader 
        title="Habilidades de Combate"
        subtitle="Skills ativas para batalha"
        icon={Sword}
        color="#dc2626"
      />

      <div className="max-w-6xl mx-auto px-4 py-8 space-y-6">
        {/* Filtros */}
        <div className="flex flex-wrap gap-2 justify-center">
          <button
            onClick={() => setFiltroTipo("todos")}
            className={`px-4 py-2 text-sm font-cinzel transition-all ${
              filtroTipo === "todos" 
                ? "bg-[#4a9eff] text-[#0a0a0c]" 
                : "bg-[#0f0f12] text-[#606060] hover:text-[#e8e4dc] border border-[#2a2a2e]"
            }`}
          >
            Todas
          </button>
          {tiposHabilidade.map(tipo => {
            const Icon = tipo.icon;
            return (
              <button
                key={tipo.value}
                onClick={() => setFiltroTipo(tipo.value)}
                className={`px-4 py-2 text-sm font-cinzel flex items-center gap-2 transition-all ${
                  filtroTipo === tipo.value 
                    ? "text-[#0a0a0c]" 
                    : "bg-[#0f0f12] text-[#606060] hover:text-[#e8e4dc] border border-[#2a2a2e]"
                }`}
                style={filtroTipo === tipo.value ? { backgroundColor: tipo.color } : {}}
              >
                <Icon className="w-4 h-4" />
                {tipo.label}
              </button>
            );
          })}
        </div>

        {/* Grid de Habilidades */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          <AnimatePresence>
            {habsFiltradas.map((hab) => {
              const tipoInfo = getTipo(hab.tipo);
              const Icon = tipoInfo?.icon || Sword;
              return (
                <motion.div
                  key={hab.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="bg-[#0f0f12] border border-[#2a2a2e] p-4 group hover:border-[#4a9eff]/30 transition-all"
                  style={{ borderLeftColor: tipoInfo?.color, borderLeftWidth: '3px' }}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div 
                        className="p-2 rounded"
                        style={{ backgroundColor: `${tipoInfo?.color}20` }}
                      >
                        <Icon className="w-5 h-5" style={{ color: tipoInfo?.color }} />
                      </div>
                      <div>
                        <h4 className="text-[#e8e4dc] font-medium">{hab.nome}</h4>
                        <p className="text-xs text-[#606060]">Nível {hab.nivel}</p>
                      </div>
                    </div>
                    <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button 
                        onClick={() => handleEdit(hab)}
                        className="p-1.5 hover:bg-[#4a9eff]/20 rounded transition-colors"
                      >
                        <Edit2 className="w-3 h-3 text-[#4a9eff]" />
                      </button>
                      <button 
                        onClick={() => handleDelete(hab.id)}
                        className="p-1.5 hover:bg-[#dc2626]/20 rounded transition-colors"
                      >
                        <Trash2 className="w-3 h-3 text-[#dc2626]" />
                      </button>
                    </div>
                  </div>
                  
                  <p className="text-[#808080] text-sm mb-4">{hab.descricao}</p>
                  
                  <div className="flex gap-4 text-xs">
                    <div className="flex items-center gap-1">
                      <Flame className="w-3 h-3 text-[#3b82f6]" />
                      <span className="text-[#606060]">{hab.custoMana} Mana</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Zap className="w-3 h-3 text-[#f59e0b]" />
                      <span className="text-[#606060]">{hab.cooldown} turnos</span>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>

          {/* Botão Adicionar */}
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onClick={() => {
              setHabEditando(null);
              setNovaHab({ nome: "", tipo: "dano", custoMana: 10, cooldown: 1, descricao: "", nivel: 1 });
              setModalAberto(true);
            }}
            className="bg-[#0f0f12] border-2 border-dashed border-[#2a2a2e] p-8 flex flex-col items-center justify-center gap-3 hover:border-[#4a9eff] transition-colors group min-h-[200px]"
          >
            <Plus className="w-8 h-8 text-[#606060] group-hover:text-[#4a9eff] transition-colors" />
            <span className="text-[#606060] group-hover:text-[#4a9eff] font-cinzel">Nova Habilidade</span>
          </motion.button>
        </div>
      </div>

      {/* Modal */}
      <Dialog open={modalAberto} onOpenChange={setModalAberto}>
        <DialogContent className="bg-[#0f0f12] border-[#2a2a2e] text-[#e8e4dc]">
          <DialogHeader>
            <DialogTitle className="font-cinzel text-xl">
              {habEditando ? "Editar Habilidade" : "Nova Habilidade"}
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4 mt-4">
            <div>
              <label className="block text-xs uppercase tracking-widest text-[#606060] mb-2">Nome</label>
              <Input
                value={novaHab.nome}
                onChange={(e) => setNovaHab({...novaHab, nome: e.target.value})}
                placeholder="Nome da habilidade"
                className="bg-transparent border-[#2a2a2e] text-[#e8e4dc]"
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs uppercase tracking-widest text-[#606060] mb-2">Tipo</label>
                <Select value={novaHab.tipo} onValueChange={(v) => setNovaHab({...novaHab, tipo: v})}>
                  <SelectTrigger className="bg-transparent border-[#2a2a2e] text-[#e8e4dc]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-[#0f0f12] border-[#2a2a2e]">
                    {tiposHabilidade.map(tipo => (
                      <SelectItem key={tipo.value} value={tipo.value}>{tipo.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="block text-xs uppercase tracking-widest text-[#606060] mb-2">Nível</label>
                <Input
                  type="number"
                  min="1"
                  max="10"
                  value={novaHab.nivel}
                  onChange={(e) => setNovaHab({...novaHab, nivel: parseInt(e.target.value) || 1})}
                  className="bg-transparent border-[#2a2a2e] text-[#e8e4dc]"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs uppercase tracking-widest text-[#606060] mb-2">Custo Mana</label>
                <Input
                  type="number"
                  value={novaHab.custoMana}
                  onChange={(e) => setNovaHab({...novaHab, custoMana: parseInt(e.target.value) || 0})}
                  className="bg-transparent border-[#2a2a2e] text-[#e8e4dc]"
                />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-widest text-[#606060] mb-2">Cooldown (turnos)</label>
                <Input
                  type="number"
                  value={novaHab.cooldown}
                  onChange={(e) => setNovaHab({...novaHab, cooldown: parseInt(e.target.value) || 1})}
                  className="bg-transparent border-[#2a2a2e] text-[#e8e4dc]"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-xs uppercase tracking-widest text-[#606060] mb-2">Descrição</label>
              <Textarea
                value={novaHab.descricao}
                onChange={(e) => setNovaHab({...novaHab, descricao: e.target.value})}
                placeholder="O que essa habilidade faz?"
                className="bg-transparent border-[#2a2a2e] text-[#e8e4dc] resize-none h-20"
              />
            </div>
            
            <div className="flex justify-end gap-3 pt-4">
              <ActionButton variant="secondary" onClick={() => setModalAberto(false)}>
                Cancelar
              </ActionButton>
              <ActionButton variant="primary" onClick={handleAdd}>
                {habEditando ? "Salvar" : "Adicionar"}
              </ActionButton>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}