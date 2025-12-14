// ============================================================
// SISTEMA DE INTEGRAÇÃO - STATUS ↔ GRIMÓRIO CORE
// ============================================================

class StatusIntegration {
    // ============================================================
    // 1. SINCRONIZAÇÃO BIDIRECIONAL
    // ============================================================
    
    static sincronizarComGrimorio() {
        console.log('Iniciando sincronização Status ↔ Grimorio...');
        
        // Carregar dados dos dois sistemas
        const statusData = StatusSystemAvancado.load();
        const grimorioData = GrimorioSystem.carregarPersonagem();
        
        // Verificar se tem dados para sincronizar
        if (!statusData || !grimorioData) {
            console.error('Dados não encontrados em um dos sistemas');
            return false;
        }
        
        // 1. Sincronizar Atributos (Status → Grimorio)
        this.sincronizarAtributos(statusData, grimorioData);
        
        // 2. Sincronizar Pontos e Nível
        this.sincronizarProgressao(statusData, grimorioData);
        
        // 3. Sincronizar Recursos Vitais
        this.sincronizarRecursos(statusData, grimorioData);
        
        // 4. Salvar dados no Grimorio
        GrimorioSystem.salvarPersonagem(grimorioData);
        
        // 5. Atualizar interface do status
        loadStatusData();
        
        console.log('Sincronização completa!');
        StatusSystemAvancado.showNotification('✅ Status sincronizado com personagem!', 'success');
        return true;
    }
    
    static sincronizarAtributos(statusData, grimorioData) {
        const statusAttrs = statusData.atributos;
        const grimorioAttrs = grimorioData.atributos;
        
        // Converter escala 0-100 para 0-30 (ou manter conforme necessidade)
        const escala = 30; // Máximo no sistema D&D
        
        Object.keys(statusAttrs).forEach(attr => {
            if (grimorioAttrs[attr] !== undefined) {
                // Converter para escala 0-30 (opcional)
                const valorConvertido = Math.round((statusAttrs[attr] / 100) * escala);
                grimorioAttrs[attr] = valorConvertido;
                
                console.log(`Atributo ${attr}: ${statusAttrs[attr]} → ${valorConvertido}`);
            }
        });
        
        grimorioData.atributos = grimorioAttrs;
    }
    
    static sincronizarProgressao(statusData, grimorioData) {
        // Nível
        grimorioData.nivel = statusData.nivel || 1;
        
        // Pontos Disponíveis
        grimorioData.pontosDisponiveis = statusData.pontosDisponiveis || 0;
        
        // XP (converter se necessário)
        grimorioData.experiencia = statusData.experiencia || 0;
        grimorioData.experienciaProximoNivel = statusData.experienciaProximoNivel || 1000;
        
        // Modo Mestre → Modo Chefe
        grimorioData.modoChefe = statusData.modoMestre || false;
    }
    
    static sincronizarRecursos(statusData, grimorioData) {
        // Se o sistema de status tiver recursos próprios
        if (window.sistemaDerivados && window.sistemaDerivados.recursos) {
            const recursos = window.sistemaDerivados.recursos;
            
            // Vida
            if (recursos.vida) {
                grimorioData.recursos.vidaAtual = recursos.vida.atual || 10;
                grimorioData.recursos.vidaMaxima = recursos.vida.max || 10;
            }
            
            // Mana
            if (recursos.mana) {
                grimorioData.recursos.manaAtual = recursos.mana.atual || 0;
                grimorioData.recursos.manaMaxima = recursos.mana.max || 0;
            }
            
            // Estamina
            if (recursos.estamina) {
                grimorioData.recursos.estaminaAtual = recursos.estamina.atual || 20;
                grimorioData.recursos.estaminaMaxima = recursos.estamina.max || 20;
            }
        }
    }
    
    // ============================================================
    // 2. EXPORTAR STATUS PARA GRIMÓRIO
    // ============================================================
    
    static exportarParaGrimorio() {
        console.log('Exportando status para Grimorio...');
        
        if (!confirm('Exportar todos os status para o sistema principal do Grimório?\n\nIsso substituirá os atributos atuais do personagem.')) {
            return false;
        }
        
        const success = this.sincronizarComGrimorio();
        
        if (success) {
            // Atualizar o perfil se estiver aberto
            window.dispatchEvent(new CustomEvent('grimorio:personagemAtualizado'));
            
            // Feedback visual
            setTimeout(() => {
                if (confirm('Exportação concluída!\n\nDeseja ver o perfil atualizado?')) {
                    window.open('perfil.html', '_blank');
                }
            }, 1000);
        }
        
        return success;
    }
    
    // ============================================================
    // 3. IMPORTAR DO GRIMÓRIO PARA STATUS
    // ============================================================
    
    static importarDoGrimorio() {
        console.log('Importando do Grimorio para Status...');
        
        if (!confirm('Importar dados do personagem para o sistema de status?\n\nIsso substituirá os valores atuais de status.')) {
            return false;
        }
        
        const grimorioData = GrimorioSystem.carregarPersonagem();
        
        if (!grimorioData) {
            StatusSystemAvancado.showNotification('Nenhum personagem encontrado no Grimório!', 'error');
            return false;
        }
        
        // 1. Carregar dados do Status
        const statusData = StatusSystemAvancado.load();
        
        // 2. Converter Atributos (0-30 → 0-100)
        const escala = 100;
        const attrs = grimorioData.atributos || {};
        
        Object.keys(attrs).forEach(attr => {
            if (statusData.atributos[attr] !== undefined) {
                // Converter de 0-30 para 0-100 (proporcional)
                const valorConvertido = Math.round((attrs[attr] / 30) * 100);
                statusData.atributos[attr] = Math.min(100, valorConvertido);
            }
        });
        
        // 3. Atualizar Progressão
        statusData.nivel = grimorioData.nivel || 1;
        statusData.experiencia = grimorioData.experiencia || 0;
        statusData.experienciaProximoNivel = grimorioData.experienciaProximoNivel || 1000;
        
        // 4. Calcular Pontos Usados
        statusData.pontosUsados = Object.values(statusData.atributos).reduce((a, b) => a + b, 0);
        
        // 5. Atualizar Recursos se existirem
        if (window.sistemaDerivados && grimorioData.recursos) {
            const recursos = grimorioData.recursos;
            
            if (recursos.vidaAtual && sistemaDerivados.recursos.vida) {
                sistemaDerivados.recursos.vida.atual = recursos.vidaAtual;
                sistemaDerivados.recursos.vida.max = recursos.vidaMaxima || 100;
            }
            
            if (recursos.manaAtual && sistemaDerivados.recursos.mana) {
                sistemaDerivados.recursos.mana.atual = recursos.manaAtual;
                sistemaDerivados.recursos.mana.max = recursos.manaMaxima || 100;
            }
            
            if (recursos.estaminaAtual && sistemaDerivados.recursos.estamina) {
                sistemaDerivados.recursos.estamina.atual = recursos.estaminaAtual;
                sistemaDerivados.recursos.estamina.max = recursos.estaminaMaxima || 100;
            }
        }
        
        // 6. Salvar dados do Status
        StatusSystemAvancado.save(statusData);
        
        // 7. Atualizar interface
        loadStatusData();
        
        // 8. Atualizar recursos e derivados
        if (window.renderRecursos) renderRecursos();
        if (window.renderDerivados) renderDerivados();
        
        StatusSystemAvancado.showNotification('✅ Dados importados do Grimório!', 'success');
        return true;
    }
    
    // ============================================================
    // 4. SINCRONIZAÇÃO AUTOMÁTICA
    // ============================================================
    
    static iniciarSincronizacaoAutomatica() {
        // Sincronizar a cada mudança no Status
        window.addEventListener('statusAvancadoUpdated', () => {
            setTimeout(() => {
                this.sincronizarComGrimorio();
            }, 500);
        });
        
        // Sincronizar a cada mudança no Grimório
        window.addEventListener('grimorio:personagemAtualizado', () => {
            setTimeout(() => {
                this.importarDoGrimorio();
            }, 500);
        });
        
        console.log('Sincronização automática ativada');
    }
    
    // ============================================================
    // 5. VERIFICAÇÃO DE COMPATIBILIDADE
    // ============================================================
    
    static verificarCompatibilidade() {
        if (typeof GrimorioSystem === 'undefined') {
            console.error('GrimorioSystem não encontrado!');
            StatusSystemAvancado.showNotification('❌ Sistema Grimório não encontrado!', 'error');
            return false;
        }
        
        if (typeof StatusSystemAvancado === 'undefined') {
            console.error('StatusSystemAvancado não encontrado!');
            StatusSystemAvancado.showNotification('❌ Sistema de Status não encontrado!', 'error');
            return false;
        }
        
        console.log('✅ Ambos os sistemas estão disponíveis');
        return true;
    }
}

// ============================================================
// MODIFICAÇÕES NO SEU status.html
// ============================================================

// Adicione estas funções ao final do seu script em status.html:

function setupIntegrationEvents() {
    // Botão de exportar para Grimório
    const btnExportarGrimorio = document.getElementById('btn-exportar-grimorio');
    if (!btnExportarGrimorio) {
        // Criar botão se não existir
        const navButtons = document.querySelector('nav div[style*="display: flex; gap: 0.75rem;"]');
        if (navButtons) {
            const btn = document.createElement('button');
            btn.id = 'btn-exportar-grimorio';
            btn.innerHTML = `
                <i data-lucide="upload-cloud" style="width: 1rem; height: 1rem;"></i>
                Sincronizar
            `;
            btn.style = `
                padding: 0.5rem 1rem;
                background: linear-gradient(135deg, #22c55e, #10b981);
                color: white;
                border: none;
                border-radius: 0.5rem;
                font-weight: 600;
                cursor: pointer;
                display: flex;
                align-items: center;
                gap: 0.5rem;
                transition: all 0.2s;
            `;
            btn.onmouseover = function() {
                this.style.transform = 'translateY(-2px)';
                this.style.boxShadow = '0 4px 15px rgba(34, 197, 94, 0.3)';
            };
            btn.onmouseout = function() {
                this.style.transform = 'translateY(0)';
                this.style.boxShadow = 'none';
            };
            btn.onclick = function() {
                StatusIntegration.exportarParaGrimorio();
            };
            
            navButtons.appendChild(btn);
        }
    } else {
        btnExportarGrimorio.onclick = function() {
            StatusIntegration.exportarParaGrimorio();
        };
    }
    
    // Botão de importar do Grimório
    const btnImportarGrimorio = document.getElementById('btn-importar-grimorio');
    if (!btnImportarGrimorio) {
        // Adicionar ao container de configurações rápidas
        const quickControls = document.querySelector('header > div[style*="display: flex; flex-wrap: wrap; gap: 0.75rem;"]');
        if (quickControls) {
            const btn = document.createElement('button');
            btn.id = 'btn-importar-grimorio';
            btn.innerHTML = `
                <i data-lucide="download-cloud" style="width: 1.25rem; height: 1.25rem;"></i>
                Importar do Personagem
            `;
            btn.style = `
                padding: 0.75rem 1.5rem;
                background: linear-gradient(135deg, #4a9eff, #0ea5e9);
                color: white;
                border: none;
                border-radius: 0.75rem;
                font-weight: 600;
                cursor: pointer;
                display: flex;
                align-items: center;
                gap: 0.75rem;
                transition: all 0.2s;
            `;
            btn.onmouseover = function() {
                this.style.transform = 'translateY(-2px)';
                this.style.boxShadow = '0 8px 25px rgba(59, 130, 246, 0.4)';
            };
            btn.onmouseout = function() {
                this.style.transform = 'translateY(0)';
                this.style.boxShadow = 'none';
            };
            btn.onclick = function() {
                StatusIntegration.importarDoGrimorio();
            };
            
            quickControls.appendChild(btn);
        }
    }
    
    // Atualizar ícones
    if (window.lucide) {
        lucide.createIcons();
    }
}

// ============================================================
// INICIALIZAÇÃO DA INTEGRAÇÃO
// ============================================================

function initIntegration() {
    console.log('Inicializando integração Status ↔ Grimorio...');
    
    // Verificar compatibilidade
    if (!StatusIntegration.verificarCompatibilidade()) {
        console.warn('Sistemas incompatíveis - integração desabilitada');
        return;
    }
    
    // Expor integração para console
    window.StatusIntegration = StatusIntegration;
    
    // Configurar eventos
    setupIntegrationEvents();
    
    // Iniciar sincronização automática (opcional)
    // StatusIntegration.iniciarSincronizacaoAutomatica();
    
    console.log('✅ Integração Status ↔ Grimorio inicializada');
}

// ============================================================
// MODIFIQUE SEU status.html ADICIONANDO:
// ============================================================

/*
1. Adicione este script após grimorio-core.js:

<script src="js/status-integration.js"></script>

2. Modifique o evento DOMContentLoaded para incluir:

document.addEventListener('DOMContentLoaded', function() {
    try {
        console.log('DOM carregado - Inicializando sistemas...');
        
        // Inicializar ícones
        if (window.lucide) {
            lucide.createIcons();
        }
        
        // Inicializar sistema principal
        StatusSystemAvancado.init();
        
        // Carregar dados iniciais
        loadStatusData();
        
        // Carregar dados do sistema de sorte/derivados
        carregarSorteDoLocalStorage();
        carregarDerivadosDoLocalStorage();
        
        // Configurar eventos
        setupEventListeners();
        configurarEventosSorte();
        
        // INICIALIZAR INTEGRAÇÃO COM GRIMÓRIO
        initIntegration();
        
        console.log('Todos os sistemas inicializados com sucesso');
        
    } catch (error) {
        console.error('Erro na inicialização:', error);
        StatusSystemAvancado.showNotification('Erro ao inicializar sistemas!', 'error');
    }
});
*/

// ============================================================
// ATUALIZE SEU NAVBAR NO status.html:
// ============================================================

/*
Substitua a seção de botões do navbar por:

<div style="display: flex; gap: 0.75rem; flex-wrap: wrap;">
    <button id="btn-importar-txt" style="...">
        <i data-lucide="upload" style="width: 1rem; height: 1rem;"></i>
        Importar TXT
    </button>
    
    <button id="btn-exportar-txt" style="...">
        <i data-lucide="download" style="width: 1rem; height: 1rem;"></i>
        Exportar TXT
    </button>
    
    <!-- BOTÃO DE SINCRONIZAÇÃO COM GRIMÓRIO -->
    <button id="btn-exportar-grimorio" style="
        padding: 0.5rem 1rem;
        background: linear-gradient(135deg, #22c55e, #10b981);
        color: white;
        border: none;
        border-radius: 0.5rem;
        font-weight: 600;
        cursor: pointer;
        display: flex;
        align-items: center;
        gap: 0.5rem;
        transition: all 0.2s;
    " onmouseover="this.style.transform='translateY(-2px)'; this.style.boxShadow='0 4px 15px rgba(34, 197, 94, 0.3)';" 
    onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='none';">
        <i data-lucide="upload-cloud" style="width: 1rem; height: 1rem;"></i>
        Sincronizar
    </button>
    
    <button id="btn-config" style="...">
        <i data-lucide="settings" style="width: 1rem; height: 1rem;"></i>
        Configurações
    </button>
    
    <button id="btn-chefe" style="...">
        <i data-lucide="crown" style="width: 1rem; height: 1rem;"></i>
        Modo Mestre
    </button>
</div>
*/