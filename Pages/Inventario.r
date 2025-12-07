import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Backpack, Plus, Trash2, Edit2, X, Package, Coins, Weight, Search } from "lucide-react";
import PageHeader from "@/components/rpg/PageHeader";
import SectionCard from "@/components/rpg/SectionCard";
import ActionButton from "@/components/rpg/ActionButton";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

const categorias = [
  { value: "arma", label: "Armas", color: "#dc2626" },
  { value: "armadura", label: "Armaduras", color: "#f59e0b" },
  { value: "consumivel", label: "Consumíveis", color: "#22c55e" },
  { value: "material", label: "Materiais", color: "#8b5cf6" },
  { value: "chave", label: "Itens-Chave", color: "#ec4899" },
  { value: "outro", label: "Outros", color: "#606060" },
];

const itensExemplo = [
  { id: 1, nome: "Espada Longa", categoria: "arma", quantidade: 1, peso: 3, valor: 50, descricao: "Uma espada comum de aço." },
  { id: 2, nome: "Poção de Vida", categoria: "consumivel", quantidade: 5, peso: 0.5, valor: 25, descricao: "Restaura 50 HP." },
  { id: 3, nome: "Armadura de Couro", categoria: "armadura", quantidade: 1, peso: 10, valor: 100, descricao: "Proteção básica." },
];

export default function Inventario() {
  const [itens, setItens] = useState(itensExemplo);
  const [filtro, setFiltro] = useState("todos");
  const [busca, setBusca] = useState("");
  const [modalAberto, setModalAberto] = useState(false);
  const [itemEditando, setItemEditando] = useState(null);
  const [novoItem, setNovoItem] = useState({
    nome: "",
    categoria: "outro",
    quantidade: 1,
    peso: 0,
    valor: 0,
    descricao: ""
  });

  const itensFiltrados = itens.filter(item => {
    const matchCategoria = filtro === "todos" || item.categoria === filtro;
    const matchBusca = item.nome.toLowerCase().includes(busca.toLowerCase());
    return matchCategoria && matchBusca;
  });

  const pesoTotal = itens.reduce((acc, item) => acc + (item.peso * item.quantidade), 0);
  const valorTotal = itens.reduce((acc, item) => acc + (item.valor * item.quantidade), 0);

  const handleAddItem = () => {
    if (!novoItem.nome.trim()) return;
    
    if (itemEditando) {
      setItens(itens.map(item => 
        item.id === itemEditando.id ? { ...novoItem, id: item.id } : item
      ));
    } else {
      setItens([...itens, { ...novoItem, id: Date.now() }]);
    }
    
    setModalAberto(false);
    setItemEditando(null);
    setNovoItem({ nome: "", categoria: "outro", quantidade: 1, peso: 0, valor: 0, descricao: "" });
  };

  const handleEdit = (item) => {
    setItemEditando(item);
    setNovoItem(item);
    setModalAberto(true);
  };

  const handleDelete = (id) => {
    setItens(itens.filter(item => item.id !== id));
  };

  const getCategoriaColor = (cat) => {
    return categorias.find(c => c.value === cat)?.color || "#606060";
  };

  return (
    <div className="min-h-screen pb-12">
      <PageHeader 
        title="Inventário"
        subtitle="Seus pertences e recursos"
        icon={Backpack}
        color="#4a9eff"
      />

      <div className="max-w-6xl mx-auto px-4 py-8 space-y-6">
        {/* Stats do Inventário */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-[#0f0f12] border border-[#2a2a2e] p-4 flex items-center gap-3"
          >
            <Package className="w-8 h-8 text-[#4a9eff]" />
            <div>
              <p className="text-xs text-[#606060] uppercase tracking-wide">Itens</p>
              <p className="text-2xl font-bold text-[#e8e4dc]">{itens.length}</p>
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-[#0f0f12] border border-[#2a2a2e] p-4 flex items-center gap-3"
          >
            <Weight className="w-8 h-8 text-[#ff6b35]" />
            <div>
              <p className="text-xs text-[#606060] uppercase tracking-wide">Peso Total</p>
              <p className="text-2xl font-bold text-[#e8e4dc]">{pesoTotal.toFixed(1)} kg</p>
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-[#0f0f12] border border-[#2a2a2e] p-4 flex items-center gap-3 col-span-2"
          >
            <Coins className="w-8 h-8 text-[#f59e0b]" />
            <div>
              <p className="text-xs text-[#606060] uppercase tracking-wide">Valor Total</p>
              <p className="text-2xl font-bold text-[#f59e0b]">{valorTotal} moedas</p>
            </div>
          </motion.div>
        </div>

        {/* Filtros e Busca */}
        <SectionCard title="Gerenciar Itens" icon={Backpack} color="#4a9eff" delay={0.3}>
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#606060]" />
              <Input
                placeholder="Buscar item..."
                value={busca}
                onChange={(e) => setBusca(e.target.value)}
                className="pl-10 bg-transparent border-[#2a2a2e] text-[#e8e4dc] focus:border-[#4a9eff]"
              />
            </div>
            <Select value={filtro} onValueChange={setFiltro}>
              <SelectTrigger className="w-full md:w-48 bg-transparent border-[#2a2a2e] text-[#e8e4dc]">
                <SelectValue placeholder="Categoria" />
              </SelectTrigger>
              <SelectContent className="bg-[#0f0f12] border-[#2a2a2e]">
                <SelectItem value="todos">Todas Categorias</SelectItem>
                {categorias.map(cat => (
                  <SelectItem key={cat.value} value={cat.value}>{cat.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <ActionButton 
              variant="primary" 
              icon={Plus}
              onClick={() => {
                setItemEditando(null);
                setNovoItem({ nome: "", categoria: "outro", quantidade: 1, peso: 0, valor: 0, descricao: "" });
                setModalAberto(true);
              }}
            >
              Adicionar
            </ActionButton>
          </div>

          {/* Lista de Itens */}
          <div className="space-y-3">
            <AnimatePresence>
              {itensFiltrados.map((item) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="bg-[#0a0a0c] border border-[#2a2a2e] p-4 flex items-center gap-4 group hover:border-[#4a9eff]/30 transition-all"
                >
                  <div 
                    className="w-3 h-12 rounded-full"
                    style={{ backgroundColor: getCategoriaColor(item.categoria) }}
                  />
                  <div className="flex-1">
                    <h4 className="text-[#e8e4dc] font-medium">{item.nome}</h4>
                    <p className="text-[#606060] text-sm">{item.descricao}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[#e8e4dc]">x{item.quantidade}</p>
                    <p className="text-[#606060] text-sm">{item.peso}kg • {item.valor}g</p>
                  </div>
                  <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button 
                      onClick={() => handleEdit(item)}
                      className="p-2 hover:bg-[#4a9eff]/20 rounded transition-colors"
                    >
                      <Edit2 className="w-4 h-4 text-[#4a9eff]" />
                    </button>
                    <button 
                      onClick={() => handleDelete(item.id)}
                      className="p-2 hover:bg-[#dc2626]/20 rounded transition-colors"
                    >
                      <Trash2 className="w-4 h-4 text-[#dc2626]" />
                    </button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {itensFiltrados.length === 0 && (
              <div className="text-center py-12 text-[#606060]">
                <Package className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>Nenhum item encontrado</p>
              </div>
            )}
          </div>
        </SectionCard>
      </div>

      {/* Modal Adicionar/Editar Item */}
      <Dialog open={modalAberto} onOpenChange={setModalAberto}>
        <DialogContent className="bg-[#0f0f12] border-[#2a2a2e] text-[#e8e4dc]">
          <DialogHeader>
            <DialogTitle className="font-cinzel text-xl">
              {itemEditando ? "Editar Item" : "Novo Item"}
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4 mt-4">
            <div>
              <label className="block text-xs uppercase tracking-widest text-[#606060] mb-2">Nome</label>
              <Input
                value={novoItem.nome}
                onChange={(e) => setNovoItem({...novoItem, nome: e.target.value})}
                placeholder="Nome do item"
                className="bg-transparent border-[#2a2a2e] text-[#e8e4dc]"
              />
            </div>
            
            <div>
              <label className="block text-xs uppercase tracking-widest text-[#606060] mb-2">Categoria</label>
              <Select value={novoItem.categoria} onValueChange={(v) => setNovoItem({...novoItem, categoria: v})}>
                <SelectTrigger className="bg-transparent border-[#2a2a2e] text-[#e8e4dc]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-[#0f0f12] border-[#2a2a2e]">
                  {categorias.map(cat => (
                    <SelectItem key={cat.value} value={cat.value}>{cat.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-xs uppercase tracking-widest text-[#606060] mb-2">Qtd</label>
                <Input
                  type="number"
                  value={novoItem.quantidade}
                  onChange={(e) => setNovoItem({...novoItem, quantidade: parseInt(e.target.value) || 1})}
                  className="bg-transparent border-[#2a2a2e] text-[#e8e4dc]"
                />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-widest text-[#606060] mb-2">Peso</label>
                <Input
                  type="number"
                  step="0.1"
                  value={novoItem.peso}
                  onChange={(e) => setNovoItem({...novoItem, peso: parseFloat(e.target.value) || 0})}
                  className="bg-transparent border-[#2a2a2e] text-[#e8e4dc]"
                />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-widest text-[#606060] mb-2">Valor</label>
                <Input
                  type="number"
                  value={novoItem.valor}
                  onChange={(e) => setNovoItem({...novoItem, valor: parseInt(e.target.value) || 0})}
                  className="bg-transparent border-[#2a2a2e] text-[#e8e4dc]"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-xs uppercase tracking-widest text-[#606060] mb-2">Descrição</label>
              <Input
                value={novoItem.descricao}
                onChange={(e) => setNovoItem({...novoItem, descricao: e.target.value})}
                placeholder="Descrição do item"
                className="bg-transparent border-[#2a2a2e] text-[#e8e4dc]"
              />
            </div>
            
            <div className="flex justify-end gap-3 pt-4">
              <ActionButton variant="secondary" onClick={() => setModalAberto(false)}>
                Cancelar
              </ActionButton>
              <ActionButton variant="primary" onClick={handleAddItem}>
                {itemEditando ? "Salvar" : "Adicionar"}
              </ActionButton>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}