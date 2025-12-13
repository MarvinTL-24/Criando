// grimorio-core.js - Sistema Centralizado de Gerenciamento de Dados
class GrimorioCore {
    constructor() {
        this.version = '2.0';
        this.initialized = false;
    }

    // ====================================================================
    // INICIALIZAÇÃO
    // ====================================================================
    init() {
        if (this.initialized) return;
        
        console.log(`🏮 Grimório Digital v${this.version} iniciado`);
        
        // Carrega todos os dados
        this.loadAllData();
        
        // Configura listeners
        this.setupEventListeners();
        
        // Configura auto-save
        this.setupAutoSave();
        
        this.initialized = true;
    }

    // ====================================================================
    // GERENCIAMENTO DE DADOS
    // ====================================================================
    
    // Estrutura principal de dados
    data = {
        character: {
            nome: 'Novo Personagem',
            classe: 'Aventureiro',
            raca: 'Humano',
            nivel: 1,
            xp: 0,
            atributos: {
                forca: 10,
                destreza: 10,
                constituicao: 10,
                inteligencia: 10,
                sabedoria: 10,
                carisma: 10
            },
            recursos: {
                vida: { atual: 10, max: 10 },
                mana: { atual: 10, max: 10 },
                stamina: { atual: 10, max: 10 }
            },
            equipamentos: [],
            habilidades: [],
            pericia: [],
            inventario: []
        },
        
        mascot: {
            nome: '',
            tipo: '',
            nivel: 1,
            xp: 0,
            atributos: {
                vitalidade: 10,
                agilidade: 10,
                forca: 10,
                inteligencia: 10
            },
            habilidades: []
        },
        
        sistema: {
            classes: [],
            racas: [],
            habilidades: [],
            itens: []
        },
        
        configuracoes: {
            tema: 'dark',
            idioma: 'pt-BR',
            autoSave: true,
            notificacoes: true
        },
        
        timestamp: new Date().toISOString()
    };

    // ====================================================================
    // MÉTODOS PARA SALVAR DADOS
    // ====================================================================
    
    // Salva o personagem atual
    saveCharacter(characterData) {
        this.data.character = { ...this.data.character, ...characterData };
        this.data.timestamp = new Date().toISOString();
        this.saveToStorage();
        this.dispatchEvent('character-saved', characterData);
        return this.data.character;
    }

    // Salva o mascote
    saveMascot(mascotData) {
        this.data.mascot = { ...this.data.mascot, ...mascotData };
        this.data.timestamp = new Date().toISOString();
        this.saveToStorage();
        this.dispatchEvent('mascot-saved', mascotData);
        return this.data.mascot;
    }

    // Salva uma classe personalizada
    saveClass(classData) {
        const existingIndex = this.data.sistema.classes.findIndex(c => c.id === classData.id);
        if (existingIndex >= 0) {
            this.data.sistema.classes[existingIndex] = classData;
        } else {
            this.data.sistema.classes.push(classData);
        }
        this.saveToStorage();
        this.dispatchEvent('class-saved', classData);
        return classData;
    }

    // Salva configurações
    saveSettings(settings) {
        this.data.configuracoes = { ...this.data.configuracoes, ...settings };
        this.saveToStorage();
        this.dispatchEvent('settings-saved', settings);
        return this.data.configuracoes;
    }

    // ====================================================================
    // MÉTODOS PARA CARREGAR DADOS
    // ====================================================================
    
    // Carrega todos os dados do localStorage
    loadAllData() {
        try {
            const savedData = localStorage.getItem('grimorio_complete_save');
            if (savedData) {
                const parsed = JSON.parse(savedData);
                this.data = { ...this.data, ...parsed };
                console.log('📂 Dados carregados do save');
            } else {
                console.log('📝 Criando novo save');
                this.saveToStorage();
            }
        } catch (error) {
            console.error('❌ Erro ao carregar dados:', error);
        }
    }

    // Carrega apenas dados específicos (para performance)
    loadPartialData(keys) {
        const partialData = {};
        keys.forEach(key => {
            const data = localStorage.getItem(`grimorio_${key}`);
            if (data) {
                partialData[key] = JSON.parse(data);
            }
        });
        return partialData;
    }

    // ====================================================================
    // EXPORTAÇÃO/IMPORTAÇÃO
    // ====================================================================
    
    // Exporta todos os dados para JSON
    exportAll() {
        const exportData = {
            ...this.data,
            version: this.version,
            exportDate: new Date().toISOString()
        };
        
        const jsonString = JSON.stringify(exportData, null, 2);
        
        // Cria arquivo para download
        const blob = new Blob([jsonString], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        
        const link = document.createElement('a');
        link.href = url;
        link.download = `grimorio_save_${new Date().toISOString().split('T')[0]}.json`;
        link.click();
        
        URL.revokeObjectURL(url);
        
        this.dispatchEvent('export-complete', exportData);
        return exportData;
    }

    // Importa dados de um arquivo JSON
    importFromJSON(jsonString) {
        try {
            const importedData = JSON.parse(jsonString);
            
            // Validação básica
            if (!importedData.character || !importedData.version) {
                throw new Error('Arquivo inválido');
            }
            
            // Mescla dados importados com estrutura atual
            this.data = { ...this.data, ...importedData };
            this.data.timestamp = new Date().toISOString();
            
            // Salva no localStorage
            this.saveToStorage();
            
            this.dispatchEvent('import-complete', importedData);
            return true;
        } catch (error) {
            console.error('❌ Erro ao importar:', error);
            this.dispatchEvent('import-error', error.message);
            return false;
        }
    }

    // Exporta para formato legível (TXT)
    exportToTXT() {
        let txt = '='.repeat(60) + '\n';
        txt += '                 GRIMÓRIO DIGITAL - SAVE FILE\n';
        txt += '='.repeat(60) + '\n\n';
        
        // Dados do personagem
        txt += 'PERSONAGEM:\n';
        txt += '-' .repeat(40) + '\n';
        txt += `Nome: ${this.data.character.nome}\n`;
        txt += `Classe: ${this.data.character.classe}\n`;
        txt += `Raça: ${this.data.character.raca}\n`;
        txt += `Nível: ${this.data.character.nivel}\n`;
        txt += `XP: ${this.data.character.xp}\n\n`;
        
        // Atributos
        txt += 'ATRIBUTOS:\n';
        txt += '-' .repeat(40) + '\n';
        Object.entries(this.data.character.atributos).forEach(([attr, value]) => {
            txt += `${attr.toUpperCase()}: ${value}\n`;
        });
        txt += '\n';
        
        // Recursos
        txt += 'RECURSOS:\n';
        txt += '-' .repeat(40) + '\n';
        Object.entries(this.data.character.recursos).forEach(([recurso, valores]) => {
            txt += `${recurso.toUpperCase()}: ${valores.atual}/${valores.max}\n`;
        });
        
        // Mascote (se existir)
        if (this.data.mascot.nome) {
            txt += '\n' + '='.repeat(60) + '\n';
            txt += '                     MASCOTE\n';
            txt += '='.repeat(60) + '\n\n';
            txt += `Nome: ${this.data.mascot.nome}\n`;
            txt += `Tipo: ${this.data.mascot.tipo}\n`;
            txt += `Nível: ${this.data.mascot.nivel}\n`;
        }
        
        // Metadata
        txt += '\n' + '='.repeat(60) + '\n';
        txt += `Última atualização: ${new Date(this.data.timestamp).toLocaleString('pt-BR')}\n`;
        txt += `Versão do sistema: ${this.version}\n`;
        txt += '='.repeat(60);
        
        // Download
        const blob = new Blob([txt], { type: 'text/plain;charset=utf-8' });
        const url = URL.createObjectURL(blob);
        
        const link = document.createElement('a');
        link.href = url;
        link.download = `grimorio_save_${new Date().toISOString().split('T')[0]}.txt`;
        link.click();
        
        URL.revokeObjectURL(url);
        
        return txt;
    }

    // ====================================================================
    // UTILITÁRIOS
    // ====================================================================
    
    // Salva tudo no localStorage
    saveToStorage() {
        try {
            // Salva versão completa
            localStorage.setItem('grimorio_complete_save', JSON.stringify(this.data));
            
            // Salva versões parciais para acesso rápido
            localStorage.setItem('grimorio_character', JSON.stringify(this.data.character));
            localStorage.setItem('grimorio_mascot', JSON.stringify(this.data.mascot));
            localStorage.setItem('grimorio_classes', JSON.stringify(this.data.sistema.classes));
            localStorage.setItem('grimorio_settings', JSON.stringify(this.data.configuracoes));
            
            this.dispatchEvent('data-saved', this.data);
        } catch (error) {
            console.error('❌ Erro ao salvar:', error);
        }
    }

    // Limpa todos os dados
    clearAllData() {
        localStorage.removeItem('grimorio_complete_save');
        localStorage.removeItem('grimorio_character');
        localStorage.removeItem('grimorio_mascot');
        localStorage.removeItem('grimorio_classes');
        localStorage.removeItem('grimorio_settings');
        
        // Reseta dados locais
        this.data = new GrimorioCore().data;
        
        this.dispatchEvent('data-cleared');
        return true;
    }

    // Sistema de eventos
    dispatchEvent(eventName, detail = null) {
        const event = new CustomEvent(`grimorio-${eventName}`, { detail });
        window.dispatchEvent(event);
    }

    // Auto-save
    setupAutoSave() {
        if (this.data.configuracoes.autoSave) {
            // Salva ao fechar a página
            window.addEventListener('beforeunload', () => {
                this.saveToStorage();
            });
            
            // Salva periodicamente (a cada 30 segundos)
            setInterval(() => {
                this.saveToStorage();
            }, 30000);
        }
    }

    // Listeners para sincronização entre abas
    setupEventListeners() {
        // Detecta mudanças em outras abas
        window.addEventListener('storage', (e) => {
            if (e.key === 'grimorio_complete_save' && e.newValue) {
                this.data = JSON.parse(e.newValue);
                this.dispatchEvent('data-updated', this.data);
            }
        });
        
        // Listener para eventos internos
        window.addEventListener('grimorio-character-updated', (e) => {
            this.saveCharacter(e.detail);
        });
        
        window.addEventListener('grimorio-mascot-updated', (e) => {
            this.saveMascot(e.detail);
        });
    }

    // ====================================================================
    // GETTERS ÚTEIS
    // ====================================================================
    
    getCharacter() {
        return { ...this.data.character };
    }

    getMascot() {
        return { ...this.data.mascot };
    }

    getClasses() {
        return [...this.data.sistema.classes];
    }

    getSettings() {
        return { ...this.data.configuracoes };
    }

    hasData() {
        return this.data.character.nome !== 'Novo Personagem';
    }
}

// Cria instância global
window.Grimorio = new GrimorioCore();

// Inicializa automaticamente
document.addEventListener('DOMContentLoaded', () => {
    window.Grimorio.init();
});