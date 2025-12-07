import React, { useState } from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "./utils";
import { ChevronDown, Sword, Shield, Heart, Compass, Home, Dog, Backpack, Sparkles, User, ScrollText, Zap } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const menuItems = [
  {
    label: "Personagem",
    icon: User,
    children: [
      { label: "Ficha (Lore & Corpo)", page: "Ficha", icon: ScrollText },
      { label: "Status (Atributos)", page: "Status", icon: Zap },
    ]
  },
  {
    label: "Responsabilidade",
    icon: Shield,
    children: [
      { label: "🛡️ Vanguarda", page: "Vanguarda" },
      { label: "🏰 Defesa", page: "Defesa" },
      { label: "💉 Suporte", page: "Suporte" },
      { label: "🗺️ Explorador", page: "Explorador" },
      { label: "🏠 Doméstico", page: "Domestico" },
      { label: "🐾 Domador", page: "Domador" },
    ]
  },
  { label: "Inventário", page: "Inventario", icon: Backpack },
  { label: "Mascote", page: "Mascote", icon: Dog },
  {
    label: "Habilidades",
    icon: Sparkles,
    children: [
      { label: "⚔️ Combate (Ativas)", page: "HabilidadesCombate" },
      { label: "🔨 Proficiências (Passivas)", page: "Proficiencias" },
    ]
  },
];

function DropdownMenu({ item, isOpen, onToggle }) {
  const Icon = item.icon;
  
  if (!item.children) {
    return (
      <Link
        to={createPageUrl(item.page)}
        className="flex items-center gap-2 px-5 py-4 text-[#e8e4dc] font-medium tracking-wide transition-all duration-300 hover:text-[#4a9eff] hover:bg-[#1a1a1e] border-b-2 border-transparent hover:border-[#4a9eff]"
      >
        {Icon && <Icon className="w-4 h-4" />}
        <span className="font-cinzel">{item.label}</span>
      </Link>
    );
  }

  return (
    <div className="relative group">
      <button
        onClick={onToggle}
        className="flex items-center gap-2 px-5 py-4 text-[#e8e4dc] font-medium tracking-wide transition-all duration-300 hover:text-[#4a9eff] hover:bg-[#1a1a1e] border-b-2 border-transparent hover:border-[#4a9eff]"
      >
        {Icon && <Icon className="w-4 h-4" />}
        <span className="font-cinzel">{item.label}</span>
        <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-0 min-w-[220px] bg-[#0f0f12] border border-[#2a2a2e] shadow-2xl shadow-black/50 z-50"
          >
            {item.children.map((child, idx) => (
              <Link
                key={idx}
                to={createPageUrl(child.page)}
                className="block px-5 py-3 text-[#a0a0a0] text-sm transition-all duration-300 hover:bg-[#4a9eff]/10 hover:text-[#4a9eff] hover:pl-7 border-l-2 border-transparent hover:border-[#4a9eff]"
              >
                {child.label}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function Layout({ children }) {
  const [openMenu, setOpenMenu] = useState(null);

  return (
    <div className="min-h-screen bg-[#0a0a0c] text-[#e8e4dc]">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;500;600;700&family=Inter:wght@300;400;500;600&display=swap');
        
        .font-cinzel { font-family: 'Cinzel', serif; }
        .font-inter { font-family: 'Inter', sans-serif; }
        
        ::-webkit-scrollbar { width: 8px; }
        ::-webkit-scrollbar-track { background: #0a0a0c; }
        ::-webkit-scrollbar-thumb { background: #2a2a2e; border-radius: 4px; }
        ::-webkit-scrollbar-thumb:hover { background: #4a9eff; }
        
        .glow-blue { box-shadow: 0 0 20px rgba(74, 158, 255, 0.3); }
        .glow-orange { box-shadow: 0 0 20px rgba(255, 107, 53, 0.3); }
        .text-shadow-glow { text-shadow: 0 0 10px rgba(74, 158, 255, 0.5); }
      `}</style>

      {/* Navigation */}
      <nav className="w-full bg-[#0f0f12]/95 backdrop-blur-sm border-b border-[#2a2a2e] sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-center flex-wrap">
            {menuItems.map((item, idx) => (
              <DropdownMenu
                key={idx}
                item={item}
                isOpen={openMenu === idx}
                onToggle={() => setOpenMenu(openMenu === idx ? null : idx)}
              />
            ))}
          </div>
        </div>
        
        {/* Linha neon inferior */}
        <div className="h-[2px] bg-gradient-to-r from-transparent via-[#4a9eff] to-transparent" />
      </nav>

      {/* Content */}
      <main className="font-inter">
        {children}
      </main>

      {/* Overlay para fechar menus */}
      {openMenu !== null && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => setOpenMenu(null)}
        />
      )}
    </div>
  );
}