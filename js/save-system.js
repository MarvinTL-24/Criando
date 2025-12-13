// ============================================
// SAVE SYSTEM - Grimório Digital v3.0
// Sistema completo de gerenciamento de saves
// ============================================

class SaveSystem {
    constructor() {
        this.version = '3.0.0';
        this.localSaves = [];
        this.selectedFile = null;
        this.confirmedAction = null;
        this.importData = null;
        this.currentSaveType = 'character';
        
        // Configurações padrão
        this.config = {
            autoSave: true,
            autoBackup: true,
            saveLocation: 'local', // local, cloud, both
            maxLocalSaves: 50,
            compressBackups: true
        };
    }

    // ============================================
    // 1. INICIALIZAÇÃO
    // ============================================
    init() {
        console.log('💾 Save System inicializando...');
        
        // Carregar configurações
        this.loadConfig();
        
        // Carregar saves locais
        this.loadLocalSaves();
        
        // Configurar eventos
        this.setupEventListeners();
        
        // Atualizar estatísticas
        this.updateStats();
        
        // Configurar drag and drop
        this.setupDragAndDrop();
        
        console.log('✅ Save System pronto!');
        
        // Disparar evento
        this.dispatchEvent('save-system:initialized', {
            version: this.version,
            savesCount: this.localSaves.length
        });
    }

    loadConfig() {
        const savedConfig = localStorage.getItem('grimorio_save_config');
        if (savedConfig) {
            try {
                this.config = { ...this.config, ...JSON.parse(savedConfig) };
            } catch (error) {
                console.error('Erro ao carregar configurações:', error);
            }
        }
        
        // Aplicar configurações na UI
        this.applyConfigToUI();
    }

    saveConfig() {
        localStorage.setItem('grimorio_save_config', JSON.stringify(this.config));
        this.dispatchEvent('config:saved', this.config);
    }

    applyConfigToUI() {
        const autoSaveToggle = document.getElementById('auto-save-toggle');
        const autoBackupToggle = document.getElementById('auto-backup-toggle');
        
        if (autoSaveToggle) autoSaveToggle.checked = this.config.autoSave;
        if (autoBackupToggle) autoBackupToggle.checked = this.config.autoBackup;
        
        // Configurar listeners
        if (autoSaveToggle) {
            autoSaveToggle.addEventListener('change', (e) => {
                this.config.autoSave = e.target.checked;
                this.saveConfig();
                
                if (this.config.autoSave) {
                    this.showNotification('Auto-save ativado', 'success');
                }
            });
        }
        
        if (autoBackupToggle) {
            autoBackupToggle.addEventListener('change', (e) => {
                this.config.autoBackup = e.target.checked;
                this.saveConfig();
                
                if (this.config.autoBackup) {
                    this.showNotification('Backup automático ativado', 'success');
                }
            });
        }
    }

    // ============================================
    // 2. SISTEMA DE SAVES LOCAIS
    // ============================================
    loadLocalSaves() {
        try {
            const saves = localStorage.getItem('grimorio_local_saves');
            this.localSaves = saves ? JSON.parse(saves) : [];
            
            // Ordenar por data (mais recente primeiro)
            this.localSaves.sort((a, b) => new Date(b.date) - new Date(a.date));
            
            // Limitar número máximo de saves
            if (this.localSaves.length > this.config.maxLocalSaves) {
                this.localSaves = this.localSaves.slice(0, this.config.maxLocalSaves);
                this.saveLocalSaves();
            }
            
            this.renderLocalSaves();
            this.updateStats();
            
            return this.localSaves;
        } catch (error) {
            console.error('Erro ao carregar saves locais:', error);
            this.localSaves = [];
            return [];
        }
    }

    saveLocalSaves() {
        try {
            localStorage.setItem('grimorio_local_saves', JSON.stringify(this.localSaves));
            this.dispatchEvent('local-saves:saved', this.localSaves);
            return true;
        } catch (error) {
            console.error('Erro ao salvar saves locais:', error);
            this.showNotification('Erro ao salvar saves locais', 'error');
            return false;
        }
    }

    renderLocalSaves() {
        const container = document.getElementById('saves-container');
        const countElement = document.getElementById('local-saves-count');
        
        if (!container) return;
        
        // Atualizar contador
        if (countElement) {
            countElement.textContent = `${this.localSaves.length} save${this.localSaves.length !== 1 ? 's' : ''}`;
        }
        
        if (this.localSaves.length === 0) {
            container.innerHTML = `
                <div class="text-center py-12 border-2 border-dashed border-border rounded-lg">
                    <i data-lucide="folder-open" class="w-12 h-12 mx-auto mb-3 text-muted"></i>
                    <p class="text-muted">Nenhum save local encontrado</p>
                    <p class="text-xs text-muted mt-1">Exporte seu personagem para criar um save</p>
                </div>
            `;
            return;
        }
        
        // Renderizar saves
        container.innerHTML = '';
        this.localSaves.forEach(save => {
            const saveElement = this.createSaveCard(save);
            container.appendChild(saveElement);
        });
        
        // Atualizar ícones
        lucide.createIcons();
    }

    createSaveCard(save) {
        const div = document.createElement('div');
        div.className = 'save-card card p-4';
        div.dataset.saveId = save.id;
        
        // Parse dos dados para preview
        let previewData = {};
        try {
            previewData = JSON.parse(save.content);
        } catch (e) {
            previewData = { character: { name: 'Save inválido' } };
        }
        
        const character = previewData.character || {};
        const date = new Date(save.date);
        
        div.innerHTML = `
            <div class="flex items-start justify-between mb-3">
                <div class="flex items-center gap-3">
                    <div class="w-10 h-10 rounded-lg ${this.getSaveTypeColor(save.type)} flex items-center justify-center">
                        <i data-lucide="${this.getSaveTypeIcon(save.type)}" class="w-5 h-5 text-white"></i>
                    </div>
                    <div>
                        <h4 class="font-semibold text-white">${save.name}</h4>
                        <p class="text-xs text-muted">${this.formatDate(date)} • ${this.getSaveTypeLabel(save.type)}</p>
                    </div>
                </div>
                <div class="save-type-badge">
                    ${this.createSaveBadge(save.type)}
                </div>
            </div>
            
            <div class="save-preview">
                <div class="grid grid-cols-2 gap-2 text-sm">
                    ${character.name ? `<div><span class="text-muted">Nome:</span> <span class="text-white">${character.name}</span></div>` : ''}
                    ${character.class ? `<div><span class="text-muted">Classe:</span> <span class="text-white">${character.class}</span></div>` : ''}
                    ${character.level ? `<div><span class="text-muted">Nível:</span> <span class="text-white">${character.level}</span></div>` : ''}
                    ${character.race ? `<div><span class="text-muted">Raça:</span> <span class="text-white">${character.race}</span></div>` : ''}
                </div>
            </div>
            
            <div class="save-actions">
                <button onclick="SaveSystem.loadSave('${save.id}')" 
                        class="btn btn-outline btn-sm flex-1">
                    <i data-lucide="upload" class="w-3 h-3 mr-1"></i>
                    Carregar
                </button>
                <button onclick="SaveSystem.exportSave('${save.id}')" 
                        class="btn btn-outline btn-sm flex-1">
                    <i data-lucide="download" class="w-3 h-3 mr-1"></i>
                    Exportar
                </button>
                <button onclick="SaveSystem.deleteSave('${save.id}')" 
                        class="btn btn-outline btn-sm text-red-500 hover:bg-red-500/10">
                    <i data-lucide="trash-2" class="w-3 h-3"></i>
                </button>
            </div>
        `;
        
        return div;
    }

    getSaveTypeColor(type) {
        const colors = {
            'character': 'bg-blue-500/20',
            'backup': 'bg-purple-500/20',
            'mascot': 'bg-pink-500/20',
            'class': 'bg-amber-500/20',
            'complete': 'bg-green-500/20'
        };
        return colors[type] || 'bg-gray-700';
    }

    getSaveTypeIcon(type) {
        const icons = {
            'character': 'user',
            'backup': 'database',
            'mascot': 'dog',
            'class': 'swords',
            'complete': 'package'
        };
        return icons[type] || 'file';
    }

    getSaveTypeLabel(type) {
        const labels = {
            'character': 'Personagem',
            'backup': 'Backup',
            'mascot': 'Mascote',
            'class': 'Classe',
            'complete': 'Completo'
        };
        return labels[type] || 'Arquivo';
    }

    createSaveBadge(type) {
        const colors = {
            'character': 'bg-blue-500 text-white',
            'backup': 'bg-purple-500 text-white',
            'mascot': 'bg-pink-500 text-white',
            'class': 'bg-amber-500 text-white',
            'complete': 'bg-green-500 text-white'
        };
        
        return `<span class="badge ${colors[type] || 'bg-gray-700'} text-xs px-2 py-1">${this.getSaveTypeLabel(type)}</span>`;
    }

    // ============================================
    // 3. OPERAÇÕES DE SAVE
    // ============================================
    
    // Criar novo save
    createSave(name, content, type = 'character') {
        const save = {
            id: 'save_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9),
            name: name,
            type: type,
            content: typeof content === 'string' ? content : JSON.stringify(content, null, 2),
            date: new Date().toISOString(),
            size: typeof content === 'string' ? content.length : JSON.stringify(content).length,
            version: this.version
        };
        
        // Adicionar no início da lista
        this.localSaves.unshift(save);
        
        // Salvar
        this.saveLocalSaves();
        this.renderLocalSaves();
        this.updateStats();
        
        // Disparar evento
        this.dispatchEvent('save:created', save);
        
        // Auto-backup se configurado
        if (this.config.autoBackup && type === 'complete') {
            this.createAutoBackup();
        }
        
        return save;
    }

    // Exportar personagem atual
    exportCharacter() {
        if (!window.Grimorio || !window.Grimorio.data.character) {
            this.showNotification('Nenhum personagem para exportar', 'warning');
            return;
        }
        
        const character = window.Grimorio.data.character;
        const exportData = {
            character: character,
            exportDate: new Date().toISOString(),
            version: window.Grimorio?.version || 'unknown',
            type: 'character_export'
        };
        
        // Criar save local
        this.createSave(character.name || 'Personagem', exportData, 'character');
        
        // Fazer download do arquivo
        this.downloadFile(
            JSON.stringify(exportData, null, 2),
            `grimorio_character_${character.name || 'personagem'}_${new Date().toISOString().split('T')[0]}.json`
        );
        
        this.showNotification(`Personagem "${character.name}" exportado!`, 'success');
    }

    // Exportar backup completo
    exportCompleteBackup() {
        if (!window.Grimorio) {
            this.showNotification('Sistema não inicializado', 'error');
            return;
        }
        
        const allData = {
            ...window.Grimorio.data,
            backupDate: new Date().toISOString(),
            version: window.Grimorio.version,
            type: 'complete_backup'
        };
        
        // Criar save local
        this.createSave('Backup Completo', allData, 'complete');
        
        // Fazer download
        this.downloadFile(
            JSON.stringify(allData, null, 2),
            `grimorio_backup_completo_${new Date().toISOString().split('T')[0]}.json`
        );
        
        this.showNotification('Backup completo exportado!', 'success');
    }

    // Carregar save
    loadSave(saveId) {
        const save = this.localSaves.find(s => s.id === saveId);
        if (!save) {
            this.showNotification('Save não encontrado', 'error');
            return;
        }
        
        try {
            const data = JSON.parse(save.content);
            
                        // Confirmar carregamento
            this.openConfirmationModal({
                title: 'Carregar Save',
                message: `Tem certeza que deseja carregar "${save.name}"? Os dados atuais serão substituídos.`,
                type: 'warning',
                confirmText: 'Carregar',
                cancelText: 'Cancelar',
                onConfirm: () => {
                    // Carregar dados no Grimorio
                    if (window.Grimorio) {
                        window.Grimorio.loadData(data);
                        this.showNotification(`Save "${save.name}" carregado com sucesso!`, 'success');
                        
                        // Fechar modal se estiver aberto
                        const modal = document.getElementById('save-modal');
                        if (modal) modal.close();
                        
                        // Atualizar UI
                        this.updateStats();
                        
                        // Disparar evento
                        this.dispatchEvent('save:loaded', save);
                    }
                }
            });
        } catch (error) {
            console.error('Erro ao carregar save:', error);
            this.showNotification('Erro ao carregar save: formato inválido', 'error');
        }
    }

    // Exportar save para arquivo
    exportSave(saveId) {
        const save = this.localSaves.find(s => s.id === saveId);
        if (!save) {
            this.showNotification('Save não encontrado', 'error');
            return;
        }
        
        this.downloadFile(
            save.content,
            `grimorio_save_${save.name.replace(/\s+/g, '_').toLowerCase()}_${new Date().toISOString().split('T')[0]}.json`
        );
        
        this.showNotification(`Save "${save.name}" exportado!`, 'success');
    }

    // Deletar save
    deleteSave(saveId) {
        const save = this.localSaves.find(s => s.id === saveId);
        if (!save) {
            this.showNotification('Save não encontrado', 'error');
            return;
        }
        
        this.openConfirmationModal({
            title: 'Deletar Save',
            message: `Tem certeza que deseja excluir "${save.name}"? Esta ação não pode ser desfeita.`,
            type: 'danger',
            confirmText: 'Excluir',
            cancelText: 'Cancelar',
            onConfirm: () => {
                const index = this.localSaves.findIndex(s => s.id === saveId);
                if (index !== -1) {
                    this.localSaves.splice(index, 1);
                    this.saveLocalSaves();
                    this.renderLocalSaves();
                    this.updateStats();
                    
                    this.showNotification(`Save "${save.name}" excluído!`, 'success');
                    this.dispatchEvent('save:deleted', save);
                }
            }
        });
    }

    // Limpar todos os saves
    clearAllSaves() {
        if (this.localSaves.length === 0) {
            this.showNotification('Nenhum save para limpar', 'info');
            return;
        }
        
        this.openConfirmationModal({
            title: 'Limpar Todos os Saves',
            message: `Tem certeza que deseja excluir todos os ${this.localSaves.length} saves? Esta ação não pode ser desfeita.`,
            type: 'danger',
            confirmText: 'Limpar Tudo',
            cancelText: 'Cancelar',
            onConfirm: () => {
                this.localSaves = [];
                this.saveLocalSaves();
                this.renderLocalSaves();
                this.updateStats();
                
                this.showNotification('Todos os saves foram excluídos!', 'success');
                this.dispatchEvent('saves:cleared');
            }
        });
    }

    // ============================================
    // 4. SISTEMA DE IMPORT/EXPORT
    // ============================================
    
    // Importar arquivo
    importFile(file) {
        if (!file) {
            this.showNotification('Nenhum arquivo selecionado', 'error');
            return;
        }
        
        const reader = new FileReader();
        
        reader.onload = (e) => {
            try {
                const content = e.target.result;
                const data = JSON.parse(content);
                
                // Validar formato
                if (!this.validateImportData(data)) {
                    this.showNotification('Formato de arquivo inválido', 'error');
                    return;
                }
                
                this.importData = {
                    file: file,
                    content: content,
                    data: data,
                    name: file.name.replace('.json', ''),
                    size: file.size
                };
                
                // Mostrar preview de importação
                this.showImportPreview();
                
            } catch (error) {
                console.error('Erro ao importar arquivo:', error);
                this.showNotification('Erro ao ler arquivo. Certifique-se de que é um JSON válido.', 'error');
            }
        };
        
        reader.onerror = () => {
            this.showNotification('Erro ao ler arquivo', 'error');
        };
        
        reader.readAsText(file);
    }

    validateImportData(data) {
        // Verificar estrutura básica do save
        if (!data || typeof data !== 'object') return false;
        
        // Verificar se é um save de personagem
        if (data.type === 'character_export') {
            return !!(data.character && data.character.name);
        }
        
        // Verificar se é um backup completo
        if (data.type === 'complete_backup') {
            return !!(data.character || data.mascots || data.classes);
        }
        
        // Verificar estrutura alternativa
        return !!(data.character || data.class || data.race);
    }

    showImportPreview() {
        if (!this.importData) return;
        
        const data = this.importData.data;
        const character = data.character || data;
        
        const modalContent = document.getElementById('import-preview-content');
        if (modalContent) {
            modalContent.innerHTML = `
                <div class="space-y-4">
                    <div class="flex items-center gap-3">
                        <div class="w-12 h-12 rounded-lg bg-blue-500/20 flex items-center justify-center">
                            <i data-lucide="file-input" class="w-6 h-6 text-blue-500"></i>
                        </div>
                        <div class="flex-1">
                            <h4 class="font-semibold text-white">${this.importData.name}</h4>
                            <p class="text-xs text-muted">${this.formatBytes(this.importData.size)} • ${new Date().toLocaleDateString()}</p>
                        </div>
                    </div>
                    
                    <div class="bg-content rounded-lg p-4">
                        <h5 class="font-medium mb-2">Conteúdo Detectado:</h5>
                        <div class="space-y-2 text-sm">
                            ${character.name ? `<div class="flex justify-between"><span class="text-muted">Personagem:</span><span class="text-white">${character.name}</span></div>` : ''}
                            ${character.class ? `<div class="flex justify-between"><span class="text-muted">Classe:</span><span class="text-white">${character.class}</span></div>` : ''}
                            ${character.race ? `<div class="flex justify-between"><span class="text-muted">Raça:</span><span class="text-white">${character.race}</span></div>` : ''}
                            ${character.level ? `<div class="flex justify-between"><span class="text-muted">Nível:</span><span class="text-white">${character.level}</span></div>` : ''}
                            ${data.mascots ? `<div class="flex justify-between"><span class="text-muted">Mascotes:</span><span class="text-white">${data.mascots.length || 0}</span></div>` : ''}
                            ${data.classes ? `<div class="flex justify-between"><span class="text-muted">Classes:</span><span class="text-white">${data.classes.length || 0}</span></div>` : ''}
                        </div>
                    </div>
                    
                    <div class="flex gap-2">
                        <button onclick="SaveSystem.confirmImport('load')" 
                                class="btn btn-primary flex-1">
                            <i data-lucide="upload" class="w-4 h-4 mr-2"></i>
                            Carregar
                        </button>
                        <button onclick="SaveSystem.confirmImport('save')" 
                                class="btn btn-outline flex-1">
                            <i data-lucide="save" class="w-4 h-4 mr-2"></i>
                            Salvar como Novo
                        </button>
                    </div>
                </div>
            `;
            
            // Abrir modal
            const modal = document.getElementById('import-modal');
            if (modal) modal.showModal();
            
            // Atualizar ícones
            lucide.createIcons();
        }
    }

    confirmImport(action) {
        if (!this.importData) return;
        
        const data = this.importData.data;
        const character = data.character || data;
        
        if (action === 'load') {
            // Carregar diretamente
            this.openConfirmationModal({
                title: 'Carregar Dados Importados',
                message: `Tem certeza que deseja carregar "${character.name || 'os dados importados'}"? Os dados atuais serão substituídos.`,
                type: 'warning',
                confirmText: 'Carregar',
                cancelText: 'Cancelar',
                onConfirm: () => {
                    if (window.Grimorio) {
                        window.Grimorio.loadData(data);
                        this.showNotification('Dados importados carregados com sucesso!', 'success');
                        
                        // Fechar modais
                        this.closeModals();
                        this.importData = null;
                    }
                }
            });
        } else if (action === 'save') {
            // Salvar como novo save
            const saveName = character.name || `Importado_${new Date().toISOString().split('T')[0]}`;
            const saveType = data.type === 'complete_backup' ? 'complete' : 'character';
            
            this.createSave(saveName, data, saveType);
            this.showNotification('Save importado salvo com sucesso!', 'success');
            
            // Fechar modais
            this.closeModals();
            this.importData = null;
        }
    }

    // ============================================
    // 5. BACKUP AUTOMÁTICO
    // ============================================
    
    createAutoBackup() {
        if (!window.Grimorio) return;
        
        try {
            const backupData = {
                ...window.Grimorio.data,
                backupDate: new Date().toISOString(),
                version: window.Grimorio.version,
                type: 'auto_backup',
                notes: 'Backup automático criado pelo sistema'
            };
            
            const backup = {
                id: 'auto_backup_' + Date.now(),
                name: `Backup Automático ${new Date().toLocaleDateString()}`,
                type: 'backup',
                content: JSON.stringify(backupData, null, 2),
                date: new Date().toISOString(),
                size: JSON.stringify(backupData).length,
                version: this.version
            };
            
            // Adicionar backup
            this.localSaves.unshift(backup);
            
            // Manter apenas últimos 5 backups automáticos
            const autoBackups = this.localSaves.filter(s => s.id.startsWith('auto_backup_'));
            if (autoBackups.length > 5) {
                const toRemove = autoBackups.slice(5);
                toRemove.forEach(backup => {
                    const index = this.localSaves.findIndex(s => s.id === backup.id);
                    if (index !== -1) {
                        this.localSaves.splice(index, 1);
                    }
                });
            }
            
            this.saveLocalSaves();
            this.dispatchEvent('backup:created', backup);
            
            console.log('💾 Backup automático criado');
            
        } catch (error) {
            console.error('Erro ao criar backup automático:', error);
        }
    }

    // ============================================
    // 6. UTILITÁRIOS
    // ============================================
    
    downloadFile(content, filename) {
        const blob = new Blob([content], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        
        // Limpar
        setTimeout(() => {
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
        }, 100);
    }

    formatDate(date) {
        const now = new Date();
        const diff = now - date;
        
        // Hoje
        if (diff < 24 * 60 * 60 * 1000) {
            return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        }
        
        // Esta semana
        if (diff < 7 * 24 * 60 * 60 * 1000) {
            const days = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
            return days[date.getDay()] + ' ' + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        }
        
        // Mais antigo
        return date.toLocaleDateString();
    }

    formatBytes(bytes) {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    }

    updateStats() {
        const stats = {
            total: this.localSaves.length,
            characters: this.localSaves.filter(s => s.type === 'character').length,
            backups: this.localSaves.filter(s => s.type === 'backup').length,
            complete: this.localSaves.filter(s => s.type === 'complete').length,
            totalSize: this.localSaves.reduce((sum, save) => sum + (save.size || 0), 0)
        };
        
        // Atualizar elementos de estatísticas
        const statsElements = {
            'total-saves': stats.total,
            'characters-count': stats.characters,
            'backups-count': stats.backups,
            'complete-saves': stats.complete,
            'total-size': this.formatBytes(stats.totalSize)
        };
        
        Object.entries(statsElements).forEach(([id, value]) => {
            const element = document.getElementById(id);
            if (element) {
                element.textContent = value;
            }
        });
        
        // Disparar evento
        this.dispatchEvent('stats:updated', stats);
    }

    showNotification(message, type = 'info') {
        // Disparar evento para o sistema de notificações
        this.dispatchEvent('notification:show', {
            message,
            type,
            duration: 3000
        });
        
        // Fallback simples
        console.log(`📢 ${type.toUpperCase()}: ${message}`);
    }

    openConfirmationModal(config) {
        this.confirmedAction = config;
        
        // Disparar evento para abrir modal de confirmação
        this.dispatchEvent('modal:confirmation', config);
        
        // Fallback simples
        if (window.confirm(`${config.title}: ${config.message}`)) {
            config.onConfirm?.();
        }
    }

    closeModals() {
        const modals = ['save-modal', 'import-modal', 'confirmation-modal'];
        modals.forEach(modalId => {
            const modal = document.getElementById(modalId);
            if (modal) modal.close();
        });
    }

    dispatchEvent(name, detail = {}) {
        const event = new CustomEvent(name, { 
            detail: { ...detail, timestamp: new Date() }
        });
        document.dispatchEvent(event);
    }

    setupEventListeners() {
        // Exportar personagem
        const exportBtn = document.getElementById('export-character-btn');
        if (exportBtn) {
            exportBtn.addEventListener('click', () => this.exportCharacter());
        }
        
        // Exportar backup completo
        const backupBtn = document.getElementById('export-backup-btn');
        if (backupBtn) {
            backupBtn.addEventListener('click', () => this.exportCompleteBackup());
        }
        
        // Importar arquivo
        const importBtn = document.getElementById('import-file-btn');
        const fileInput = document.getElementById('import-file-input');
        
        if (importBtn && fileInput) {
            importBtn.addEventListener('click', () => fileInput.click());
            fileInput.addEventListener('change', (e) => {
                if (e.target.files.length > 0) {
                    this.importFile(e.target.files[0]);
                    e.target.value = ''; // Reset input
                }
            });
        }
        
        // Limpar todos os saves
        const clearBtn = document.getElementById('clear-saves-btn');
        if (clearBtn) {
            clearBtn.addEventListener('click', () => this.clearAllSaves());
        }
        
        // Atualizar lista
        const refreshBtn = document.getElementById('refresh-saves-btn');
        if (refreshBtn) {
            refreshBtn.addEventListener('click', () => {
                this.loadLocalSaves();
                this.showNotification('Lista de saves atualizada', 'info');
            });
        }
        
        // Fechar modais
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('modal') || e.target.classList.contains('close-modal')) {
                e.target.closest('dialog')?.close();
            }
        });
    }

    setupDragAndDrop() {
        const dropZone = document.getElementById('saves-container');
        if (!dropZone) return;
        
        dropZone.addEventListener('dragover', (e) => {
            e.preventDefault();
            dropZone.classList.add('border-blue-500', 'border-2');
        });
        
        dropZone.addEventListener('dragleave', () => {
            dropZone.classList.remove('border-blue-500', 'border-2');
        });
        
        dropZone.addEventListener('drop', (e) => {
            e.preventDefault();
            dropZone.classList.remove('border-blue-500', 'border-2');
            
            if (e.dataTransfer.files.length > 0) {
                this.importFile(e.dataTransfer.files[0]);
            }
        });
    }

    // ============================================
    // 7. MÉTODOS DE SEGURANÇA
    // ============================================
    
    encryptSave(saveData, password) {
        // Implementação básica de criptografia (em produção, usar biblioteca segura)
        try {
            // Criptografia simples para demonstração
            const encoded = btoa(unescape(encodeURIComponent(
                JSON.stringify(saveData)
            )));
            
            return {
                encrypted: true,
                data: encoded,
                timestamp: new Date().toISOString()
            };
        } catch (error) {
            console.error('Erro ao criptografar save:', error);
            return saveData;
        }
    }

    decryptSave(encryptedData, password) {
        try {
            if (!encryptedData.encrypted) return encryptedData;
            
            // Decodificação simples para demonstração
            const decoded = decodeURIComponent(escape(atob(encryptedData.data)));
            return JSON.parse(decoded);
        } catch (error) {
            console.error('Erro ao descriptografar save:', error);
            throw new Error('Falha na descriptografia');
        }
    }

    validateSaveIntegrity(save) {
        if (!save || !save.id || !save.content) {
            return { valid: false, error: 'Estrutura do save inválida' };
        }
        
        try {
            JSON.parse(save.content);
            return { valid: true };
        } catch (error) {
            return { valid: false, error: 'JSON inválido' };
        }
    }

    // ============================================
    // 8. SISTEMA DE SINC DE NUVEM (ESBOÇO)
    // ============================================
    
    async syncWithCloud() {
        if (this.config.saveLocation !== 'cloud' && this.config.saveLocation !== 'both') {
            return false;
        }
        
        this.showNotification('Sincronizando com a nuvem...', 'info');
        
        try {
            // Aqui você implementaria a lógica real de sincronização
            // usando Firebase, Supabase, ou seu backend preferido
            
            // Exemplo de implementação:
            // const user = await auth.getCurrentUser();
            // const saves = await cloudStorage.getUserSaves(user.id);
            // await this.mergeLocalAndCloudSaves(saves);
            
            await new Promise(resolve => setTimeout(resolve, 1000)); // Simulação
            
            this.showNotification('Sincronização completa!', 'success');
            return true;
        } catch (error) {
            console.error('Erro na sincronização:', error);
            this.showNotification('Erro na sincronização', 'error');
            return false;
        }
    }

    // ============================================
    // 9. INICIALIZAÇÃO
    // ============================================
    
    static getInstance() {
        if (!window.GrimorioSaveSystem) {
            window.GrimorioSaveSystem = new SaveSystem();
        }
        return window.GrimorioSaveSystem;
    }
}

// Inicialização automática quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', () => {
    // Aguardar o Grimorio principal carregar
    if (window.Grimorio) {
        window.SaveSystem = SaveSystem.getInstance();
        window.SaveSystem.init();
    } else {
        // Se o Grimorio não estiver disponível, tentar novamente após delay
        setTimeout(() => {
            if (window.Grimorio) {
                window.SaveSystem = SaveSystem.getInstance();
                window.SaveSystem.init();
            } else {
                console.warn('Grimorio não encontrado. Save System não inicializado.');
            }
        }, 1000);
    }
});

// Exportar para uso em módulos
if (typeof module !== 'undefined' && module.exports) {
    module.exports = SaveSystem;
}