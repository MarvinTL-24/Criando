// No arquivo perfil.html, atualize a função carregarPerfil():

function carregarPerfil() {
    try {
        console.log('Carregando perfil do GrimorioSystem...');
        const personagem = GrimorioSystem.carregarPersonagem();
        
        if (!personagem) {
            console.warn('Nenhum personagem encontrado no Grimorio. Tentando carregar do status...');
            
            // Tentar carregar do sistema de status
            const statusData = localStorage.getItem('grimorio_status_avancado');
            if (statusData) {
                const dados = JSON.parse(statusData);
                mostrarErro('Personagem não encontrado no sistema principal. Use "Sincronizar com Perfil" no sistema de status primeiro.');
                return;
            }
            
            mostrarErro('Nenhum perfil ativo encontrado. Você precisa criar uma ficha primeiro.');
            return;
        }
        
        console.log('Personagem carregado:', personagem.nome);
        
        // Atualizar interface
        atualizarInterface(personagem);
        
        // Verificar se há dados de status mais recentes
        verificarAtualizacoesStatus(personagem);
        
    } catch (error) {
        console.error('Erro ao carregar perfil:', error);
        mostrarErro('Erro ao carregar dados do personagem: ' + error.message);
    }
}

// Adicione esta função para verificar atualizações do status
function verificarAtualizacoesStatus(personagem) {
    const ultimaAtualizacaoStatus = localStorage.getItem('status_ultima_atualizacao');
    const ultimaAtualizacaoPerfil = personagem.atualizadoEm || personagem.criadoEm;
    
    if (ultimaAtualizacaoStatus && ultimaAtualizacaoPerfil) {
        const dataStatus = new Date(ultimaAtualizacaoStatus);
        const dataPerfil = new Date(ultimaAtualizacaoPerfil);
        
        if (dataStatus > dataPerfil) {
            console.log('Há atualizações de status pendentes');
            mostrarNotificacao('Há atualizações de status não sincronizadas. Use "Atualizar" para sincronizar.', 'warning');
        }
    }
}

// Adicione esta função para atualizar dinamicamente
function atualizarDadosDoStatus() {
    try {
        // Carregar dados do status
        const statusDataStr = localStorage.getItem('grimorio_status_avancado');
        if (!statusDataStr) {
            mostrarNotificacao('Nenhum dado de status encontrado', 'info');
            return;
        }
        
        const statusData = JSON.parse(statusDataStr);
        const personagem = GrimorioSystem.carregarPersonagem();
        
        if (!personagem) {
            mostrarNotificacao('Crie um personagem primeiro', 'error');
            return;
        }
        
        // Converter atributos
        const escala = 30;
        Object.keys(statusData.atributos).forEach(attr => {
            if (personagem.atributos[attr] !== undefined) {
                const valorConvertido = Math.round((statusData.atributos[attr] / 100) * escala);
                personagem.atributos[attr] = valorConvertido;
            }
        });
        
        // Atualizar outros dados
        personagem.nivel = statusData.nivel || personagem.nivel;
        personagem.experiencia = statusData.experiencia || personagem.experiencia;
        personagem.experienciaProximoNivel = statusData.experienciaProximoNivel || personagem.experienciaProximoNivel;
        personagem.pontosDisponiveis = statusData.pontosDisponiveis || personagem.pontosDisponiveis;
        
        // Salvar personagem atualizado
        GrimorioSystem.salvarPersonagem(personagem);
        
        // Atualizar interface
        atualizarInterface(personagem);
        
        mostrarNotificacao('Dados do status importados com sucesso!', 'success');
        
    } catch (error) {
        console.error('Erro ao importar dados do status:', error);
        mostrarNotificacao('Erro ao importar dados do status', 'error');
    }
}

// Adicione esta função para mostrar notificações
function mostrarNotificacao(mensagem, tipo = 'info') {
    // Criar elemento de notificação
    const notificacao = document.createElement('div');
    notificacao.className = `status-notification status-notification-${tipo}`;
    notificacao.innerHTML = `
        <i data-lucide="${tipo === 'success' ? 'check-circle' : 
                        tipo === 'warning' ? 'alert-triangle' : 
                        tipo === 'error' ? 'x-circle' : 'info'}" 
        class="notification-icon"></i>
        <span>${mensagem}</span>
    `;
    
    document.body.appendChild(notificacao);
    
    if (window.lucide) {
        lucide.createIcons();
    }
    
    setTimeout(() => {
        notificacao.classList.add('fade-out');
        setTimeout(() => notificacao.remove(), 500);
    }, 3000);
}

// Atualize o evento DOMContentLoaded no perfil.html
document.addEventListener('DOMContentLoaded', function() {
    // Adicionar botão para importar do status
    const rodape = document.querySelector('.max-w-6xl.mx-auto.px-4.pb-12.pt-6');
    if (rodape) {
        const btnImportarStatus = document.createElement('button');
        btnImportarStatus.onclick = atualizarDadosDoStatus;
        btnImportarStatus.innerHTML = `
            <i data-lucide="refresh-ccw" class="w-4 h-4"></i>
            <span>Importar do Status</span>
        `;
        btnImportarStatus.className = 'group flex items-center gap-2 px-6 py-3 bg-theme-green hover:bg-green-600 rounded-lg text-white shadow-lg transition-all font-cinzel text-sm font-bold';
        rodape.insertBefore(btnImportarStatus, rodape.firstChild);
    }
    
    // Resto do código existente...
});