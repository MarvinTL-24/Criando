// ============================================================
// GRIMÓRIO DIGITAL - CORE SYSTEM v2.0
// Sistema Unificado de Gerenciamento de Personagens
// ============================================================

const GRIMORIO_STORAGE_KEY = 'grimorio_personagem_ativo';

class GrimorioSystem {
    // ============================================================
    // 1. GESTÃO DO PERSONAGEM PRINCIPAL
    // ============================================================
    
    static inicializarPersonagemPadrao() {
        if (!localStorage.getItem(GRIMORIO_STORAGE_KEY)) {
            const personagemPadrao = {
                // Identificação
                nome: 'Novo Aventureiro',
                titulo: 'Viajante Sem Destino',
                raca: 'Humano',
                classe: 'Não Escolhida',
                
                // Atributos (COMEÇAM TODOS EM 0, como você pediu)
                atributos: {
                    forca: 0,
                    destreza: 0,
                    constituicao: 0,
                    inteligencia: 0,
                    sabedoria: 0,
                    carisma: 0
                },
                
                // Sistema de Pontos
                pontosDisponiveis: 0,
                nivel: 1,
                experiencia: 0,
                experienciaProximoNivel: 1000,
                
                // Modos Especiais
                modoChefe: false, // Quando true, permite edição livre
                
                // Recursos (calculados automaticamente)
                recursos: {
                    vidaMaxima: 10,
                    vidaAtual: 10,
                    manaMaxima: 0,
                    manaAtual: 0,
                    estaminaMaxima: 20,
                    estaminaAtual: 20
                },
                
                // Outras seções (inicialmente vazias)
            inventario: [],
            habilidades: [],
            proficiencias: [],

            // Sistema de Armas e Proficiências
            armasProficiencia: {
                // Armas Cortantes (8 tipos)
                cortantes: {
                    espadaCurta: { nivel: 0, experiencia: 0 },
                    espadaLonga: { nivel: 0, experiencia: 0 },
                    katanas: { nivel: 0, experiencia: 0 },
                    machados: { nivel: 0, experiencia: 0 },
                    foices: { nivel: 0, experiencia: 0 },
                    lâminasDuplas: { nivel: 0, experiencia: 0 },
                    sabre: { nivel: 0, experiencia: 0 },
                    cutelo: { nivel: 0, experiencia: 0 }
                },
                
                // Armas Perfurantes (8 tipos)
                perfurantes: {
                    adaga: { nivel: 0, experiencia: 0 },
                    lança: { nivel: 0, experiencia: 0 },
                    rapiera: { nivel: 0, experiencia: 0 },
                    estilete: { nivel: 0, experiencia: 0 },
                    picareta: { nivel: 0, experiencia: 0 },
                    tridente: { nivel: 0, experiencia: 0 },
                    chuço: { nivel: 0, experiencia: 0 },
                    arpão: { nivel: 0, experiencia: 0 }
                },
                
                // Armas Concussão (8 tipos)
                concussao: {
                    clava: { nivel: 0, experiencia: 0 },
                    martelo: { nivel: 0, experiencia: 0 },
                    maça: { nivel: 0, experiencia: 0 },
                    mangual: { nivel: 0, experiencia: 0 },
                    porrete: { nivel: 0, experiencia: 0 },
                    bastao: { nivel: 0, experiencia: 0 },
                    corrente: { nivel: 0, experiencia: 0 },
                    chicote: { nivel: 0, experiencia: 0 }
                },
                
                // Armas Distância/Magia (8 tipos)
                distancia: {
                    arco: { nivel: 0, experiencia: 0 },
                    besta: { nivel: 0, experiencia: 0 },
                    funda: { nivel: 0, experiencia: 0 },
                    bumerangue: { nivel: 0, experiencia: 0 },
                    shuriken: { nivel: 0, experiencia: 0 },
                    cajado: { nivel: 0, experiencia: 0 },
                    grimorio: { nivel: 0, experiencia: 0 },
                    orbe: { nivel: 0, experiencia: 0 }
                }
            },

            // Estilos de Luta
            estilosLuta: {
                umaMao: { nivel: 0 },
                duasMaos: { nivel: 0 },
                armaEscudo: { nivel: 0 },
                duasArmas: { nivel: 0 },
            armaDistancia: { nivel: 0 },
            magiaPura: { nivel: 0 },
            corpoCorpo: { nivel: 0 },
            armasExoticas: { nivel: 0 }
                        },
            
            equipamentos: {
                    armaPrincipal: 'Nenhuma',
                    armadura: 'Nenhuma',
                    amuleto: 'Nenhum'
                },
                
                // Mascote
                mascote: null,
                
                // Metadados
                criadoEm: new Date().toISOString(),
                atualizadoEm: new Date().toISOString(),
                avatar: '' // URL da imagem
            };
            
            this.salvarPersonagem(personagemPadrao);
            console.log('[Grimorio] Personagem padrão criado');
        }
    }
    
    static salvarPersonagem(dados) {
        // Atualiza timestamp
        dados.atualizadoEm = new Date().toISOString();
        
        // Calcula recursos baseados nos atributos
        this.calcularRecursosAutomaticos(dados);
        
        localStorage.setItem(GRIMORIO_STORAGE_KEY, JSON.stringify(dados));
        
        // Dispara evento para outras abas/páginas
        window.dispatchEvent(new CustomEvent('grimorio:personagemAtualizado'));
        
        console.log('[Grimorio] Personagem salvo:', dados.nome);
        return true;
    }
    
    static carregarPersonagem() {
        const dados = localStorage.getItem(GRIMORIO_STORAGE_KEY);
        if (!dados) {
            this.inicializarPersonagemPadrao();
            return this.carregarPersonagem(); // Recursão para pegar o padrão
        }
        
        try {
            return JSON.parse(dados);
        } catch (error) {
            console.error('[Grimorio] Erro ao carregar personagem:', error);
            this.inicializarPersonagemPadrao();
            return this.carregarPersonagem();
        }
    }
    
    static limparPersonagem() {
        localStorage.removeItem(GRIMORIO_STORAGE_KEY);
        this.inicializarPersonagemPadrao();
        window.dispatchEvent(new CustomEvent('grimorio:personagemAtualizado'));
        return this.carregarPersonagem();
    }
    
    // ============================================================
    // 2. SISTEMA DE ATRIBUTOS (SEU PEDIDO ESPECÍFICO)
    // ============================================================
    
    static calcularRecursosAutomaticos(personagem) {
        const attr = personagem.atributos;
        
        // Vida = Constituição × 5 (mínimo 10)
        personagem.recursos.vidaMaxima = Math.max(10, attr.constituicao * 5);
        personagem.recursos.vidaAtual = Math.min(
            personagem.recursos.vidaAtual || personagem.recursos.vidaMaxima,
            personagem.recursos.vidaMaxima
        );
        
        // Mana = Inteligência × 2 (mínimo 0)
        personagem.recursos.manaMaxima = attr.inteligencia * 2;
        personagem.recursos.manaAtual = Math.min(
            personagem.recursos.manaAtual || personagem.recursos.manaMaxima,
            personagem.recursos.manaMaxima
        );
        
        // Estamina = (Constituição + Destreza) × 2 (mínimo 20)
        personagem.recursos.estaminaMaxima = Math.max(20, (attr.constituicao + attr.destreza) * 2);
        personagem.recursos.estaminaAtual = Math.min(
            personagem.recursos.estaminaAtual || personagem.recursos.estaminaMaxima,
            personagem.recursos.estaminaMaxima
        );
        
        return personagem;
    }
    
    // FUNÇÃO QUE VOCÊ PEDIU: Distribuição aleatória quando total >= 18
    static distribuirPontosAleatorios(personagem, pontosParaDistribuir = 10) {
        if (!personagem.modoChefe) {
            // Calcula total atual de atributos
            const totalAtual = Object.values(personagem.atributos).reduce((a, b) => a + b, 0);
            
            // Só distribui se total for 18 ou mais (como você pediu)
            if (totalAtual >= 18 && pontosParaDistribuir > 0) {
                const atributos = Object.keys(personagem.atributos);
                
                // Distribui pontos aleatoriamente
                for (let i = 0; i < pontosParaDistribuir; i++) {
                    const attrAleatorio = atributos[Math.floor(Math.random() * atributos.length)];
                    personagem.atributos[attrAleatorio]++;
                }
                
                console.log(`[Grimorio] ${pontosParaDistribuir} pontos distribuídos aleatoriamente`);
            }
        }
        
        return personagem;
    }
    
    // FUNÇÃO QUE VOCÊ PEDIU: Subir de nível
    static subirNivel(personagem, pontosGanhos = 5) {
        personagem.nivel++;
        personagem.pontosDisponiveis += pontosGanhos;
        personagem.experiencia = 0;
        personagem.experienciaProximoNivel = Math.floor(personagem.experienciaProximoNivel * 1.5);
        
        // Se modo chefe ativo, permite aumentar qualquer atributo
        if (personagem.modoChefe) {
            console.log('[Grimorio] Modo Chefe: Você pode distribuir pontos livremente');
        }
        
        this.salvarPersonagem(personagem);
        return personagem;
    }
    
    // FUNÇÃO QUE VOCÊ PEDIU: Alternar Modo Chefe
    static alternarModoChefe(personagem, ativar = true) {
        personagem.modoChefe = ativar;
        this.salvarPersonagem(personagem);
        
        console.log(`[Grimorio] Modo Chefe ${ativar ? 'ATIVADO' : 'DESATIVADO'}`);
        return personagem;
    }
    
    // ============================================================
    // 3. SISTEMA DE CLASSE (ATUALIZAÇÃO AUTOMÁTICA)
    // ============================================================
    
    static atualizarClasse(nomeClasse) {
        const personagem = this.carregarPersonagem();
        personagem.classe = nomeClasse;
        
        // Atributos base por classe (você pode ajustar)
        const bonusPorClasse = {
            'Guerreiro': { forca: 2, constituicao: 2 },
            'Mago': { inteligencia: 3, sabedoria: 1 },
            'Arqueiro': { destreza: 3, sabedoria: 1 },
            'Clérigo': { sabedoria: 3, carisma: 1 },
            'Ladino': { destreza: 2, inteligencia: 2 },
            'Bárbaro': { forca: 3, constituicao: 1 }
        };
        
        // Aplica bônus se for uma classe conhecida
        if (bonusPorClasse[nomeClasse] && !personagem.modoChefe) {
            Object.entries(bonusPorClasse[nomeClasse]).forEach(([attr, bonus]) => {
                personagem.atributos[attr] += bonus;
            });
        }
        
        this.salvarPersonagem(personagem);
        console.log(`[Grimorio] Classe atualizada para: ${nomeClasse}`);
        
        return personagem;
    }
    
    // ============================================================
    // 4. SISTEMA DE MASCOTE
    // ============================================================
    
    static vincularMascote(dadosMascote) {
        const personagem = this.carregarPersonagem();
        personagem.mascote = dadosMascote;
        this.salvarPersonagem(personagem);
        
        console.log(`[Grimorio] Mascote vinculado: ${dadosMascote.nome}`);
        return true;
    }
    
    static desvincularMascote() {
        const personagem = this.carregarPersonagem();
        personagem.mascote = null;
        this.salvarPersonagem(personagem);
        
        console.log('[Grimorio] Mascote desvinculado');
        return true;
    }
    
    // ============================================================
    // 5. UTILITÁRIOS DE PERSISTÊNCIA
    // ============================================================
    
    static exportarPersonagem() {
        const personagem = this.carregarPersonagem();
        const dadosExportacao = {
            personagem: personagem,
            sistema: 'Grimório Digital v2.0',
            exportadoEm: new Date().toISOString(),
            versao: '2.0'
        };
        
        return JSON.stringify(dadosExportacao, null, 2);
    }
    
    static importarPersonagem(jsonString) {
        try {
            const dados = JSON.parse(jsonString);
            if (dados.personagem && dados.sistema === 'Grimório Digital v2.0') {
                this.salvarPersonagem(dados.personagem);
                console.log('[Grimorio] Personagem importado com sucesso!');
                return true;
            } else {
                console.error('[Grimorio] Formato de importação inválido');
                return false;
            }
        } catch (error) {
            console.error('[Grimorio] Erro na importação:', error);
            return false;
        }
    }
    
    // ============================================================
    // 6. SISTEMA DE NOTIFICAÇÕES VISUAIS
    // ============================================================
    
    static mostrarNotificacao(mensagem, tipo = 'info', duracao = 3000) {
        // Cria elemento de notificação
        const notificacao = document.createElement('div');
        notificacao.className = `fixed top-4 right-4 px-4 py-3 rounded-lg shadow-lg z-50 animate-slide-in-right`;
        
        // Cores por tipo
        const estilos = {
            success: 'bg-green-900/80 border-green-700 text-green-300',
            error: 'bg-red-900/80 border-red-700 text-red-300',
            warning: 'bg-yellow-900/80 border-yellow-700 text-yellow-300',
            info: 'bg-blue-900/80 border-blue-700 text-blue-300'
        };
        
        notificacao.className += ' ' + (estilos[tipo] || estilos.info);
        
        // Ícone por tipo
        const icones = {
            success: 'check-circle',
            error: 'alert-circle',
            warning: 'alert-triangle',
            info: 'info'
        };
        
        notificacao.innerHTML = `
            <div class="flex items-center gap-3">
                <i data-lucide="${icones[tipo] || 'info'}" class="w-5 h-5"></i>
                <span>${mensagem}</span>
            </div>
        `;
        
        // Adiciona ao documento
        document.body.appendChild(notificacao);
        
        // Atualiza ícones Lucide
        if (window.lucide) {
            lucide.createIcons();
        }
        
        // Remove após duração
        setTimeout(() => {
            notificacao.classList.add('opacity-0', 'transition-opacity', 'duration-500');
            setTimeout(() => {
                if (notificacao.parentNode) {
                    notificacao.parentNode.removeChild(notificacao);
                }
            }, 500);
        }, duracao);
        
    return notificacao;
}

// ============================================================
// 7. COMPATIBILIDADE COM SISTEMA ANTIGO (personagemSalvo)
// ============================================================

static migrarDadosAntigos() {
        // Verifica se existe dados no formato antigo
        const dadosAntigos = localStorage.getItem('personagemSalvo');
        if (dadosAntigos) {
            try {
                const antigo = JSON.parse(dadosAntigos);
                const novo = this.carregarPersonagem();
                
                // Migra dados básicos
                if (antigo['inp-nome']) novo.nome = antigo['inp-nome'];
                if (antigo['inp-titulo']) novo.titulo = antigo['inp-titulo'];
                if (antigo['inp-raca']) novo.raca = antigo['inp-raca'];
                if (antigo['inp-classe']) novo.classe = antigo['inp-classe'];
                if (antigo['inp-idade']) novo.idade = antigo['inp-idade'];
                
                // Migra atributos se existirem
                if (antigo.atributos) {
                    novo.atributos = { ...novo.atributos, ...antigo.atributos };
                }
                
                // Migra avatar
                if (antigo.avatar) novo.avatar = antigo.avatar;
                
                // Salva no novo formato
                this.salvarPersonagem(novo);
                
                // Remove dados antigos
                localStorage.removeItem('personagemSalvo');
                
                console.log('[Grimorio] Dados antigos migrados com sucesso!');
                return true;
                
            } catch (error) {
                console.error('[Grimorio] Erro na migração:', error);
                return false;
            }
        }
        return false;
    }
}

// ============================================================
// CSS para animações (adiciona dinamicamente)
// ============================================================
const style = document.createElement('style');
style.textContent = `
    @keyframes slide-in-right {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    .animate-slide-in-right {
        animation: slide-in-right 0.3s ease-out;
    }
`;
document.head.appendChild(style);

// ============================================================
// INICIALIZAÇÃO AUTOMÁTICA DO SISTEMA
// ============================================================
document.addEventListener('DOMContentLoaded', function() {
    // 1. Tenta migrar dados antigos
    GrimorioSystem.migrarDadosAntigos();
    
    // 2. Garante que sempre exista um personagem
    GrimorioSystem.inicializarPersonagemPadrao();
    
    console.log('[Grimorio] Sistema inicializado');
    
    // 3. Expor para debug no console
    window.Grimorio = GrimorioSystem;
});

