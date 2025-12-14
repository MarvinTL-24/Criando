// debug-sync.js - Sistema de debug para sincronização

class GrimorioDebug {
    static logStorage() {
        console.log('=== DEBUG: LOCALSTORAGE ===');
        console.log('grimorio_personagem_ativo:', localStorage.getItem('grimorio_personagem_ativo'));
        console.log('grimorio_ficha_completa:', localStorage.getItem('grimorio_ficha_completa'));
        console.log('Personagem atual:', GrimorioSystem.carregarPersonagem());
    }
    
    static checkAvatar() {
        const personagem = GrimorioSystem.carregarPersonagem();
        console.log('=== DEBUG: AVATAR ===');
        console.log('Tem avatar?', !!personagem.avatar);
        console.log('Avatar string:', personagem.avatar ? personagem.avatar.substring(0, 100) + '...' : 'null');
        
        if (personagem.avatar) {
            // Testar se a URL é válida
            const img = new Image();
            img.onload = () => console.log('✅ Avatar é uma imagem válida');
            img.onerror = () => console.log('❌ Avatar NÃO é uma imagem válida');
            img.src = personagem.avatar;
        }
    }
    
    static syncAll() {
        console.log('=== DEBUG: SINCRONIZAR TUDO ===');
        GrimorioDebug.logStorage();
        GrimorioDebug.checkAvatar();
        
        // Forçar atualização
        window.dispatchEvent(new CustomEvent('grimorio:dadosAtualizados'));
        
        // Recarregar dados
        if (typeof carregarDadosPersonagem === 'function') {
            carregarDadosPersonagem();
        }
        
        console.log('✅ Sincronização forçada concluída');
    }
}

// Adicionar ao global para acesso pelo console
window.GrimorioDebug = GrimorioDebug;

// Botão de debug (opcional - remover em produção)
if (window.location.href.includes('localhost') || window.location.href.includes('127.0.0.1')) {
    document.addEventListener('DOMContentLoaded', function() {
        const debugBtn = document.createElement('button');
        debugBtn.innerHTML = '🔧 Debug Sync';
        debugBtn.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            background: #ff6b35;
            color: white;
            border: none;
            border-radius: 50%;
            width: 50px;
            height: 50px;
            cursor: pointer;
            z-index: 9999;
            font-size: 20px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.3);
        `;
        debugBtn.onclick = GrimorioDebug.syncAll;
        document.body.appendChild(debugBtn);
    });
}