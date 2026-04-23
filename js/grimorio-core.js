// ============================================================
// GRIMÓRIO DIGITAL - CORE SYSTEM v2.0
// Sistema Unificado de Gerenciamento de Personagens
// ============================================================

const GRIMORIO_STORAGE_KEY = 'grimorio_personagem_ativo';

<<<<<<< HEAD
class Core {
    static init() {
        if (localStorage.getItem(DB_KEY)) return;
        const player = {
            name: 'Novo Aventureiro',
            title: 'Viajante',
            race: 'Humano',
            class: 'Nenhuma',
            level: 1,
            xp: 0,
            next: 1000,
            points: 0,
            god: false,
            status: {
                cats: [
                    { name: "Vida", val: 100, max: 100, color: "red", active: true, lock: false },
                    { name: "Mana", val: 50, max: 50, color: "blue", active: true, lock: false },
                    { name: "Estamina", val: 50, max: 50, color: "green", active: true, lock: false }
                ],
                attrs: [
                    { name: "Força", val: 10, max: 100, lock: false, active: true },
                    { name: "Destreza", val: 10, max: 100, lock: false, active: true },
                    { name: "Constituição", val: 10, max: 100, lock: false, active: true },
                    { name: "Inteligência", val: 10, max: 100, lock: false, active: true },
                    { name: "Sabedoria", val: 10, max: 100, lock: false, active: true },
                    { name: "Carisma", val: 10, max: 100, lock: false, active: true }
                ],
                derived: [
                    { name: "Dano Físico", formula: "Força * 1.5", val: 15, op: "*", mod: 1.5, base: "Força", active: true },
                    { name: "Defesa", formula: "Constituição * 2", val: 20, op: "*", mod: 2, base: "Constituição", active: true }
                ],
                luck: { val: 50, sentiments: [] },
                dice: { qty: 1, type: 20, useStatus: true, useLuck: true, last: "-", details: "" }
            },
            stats: { str: 10, dex: 10, con: 10, int: 10, wis: 10, cha: 10 },
            res: { hp: 100, hpMax: 100, mp: 50, mpMax: 50, sta: 50, staMax: 50 },
            items: [],
            skills: [],
            money: { gold: 0, silver: 0, copper: 100 },
            limits: { weight: 50.0, use: 10, carry: 20 },
            mastery: {
                sharp: { sword: { lv: 0, xp: 0 }, axe: { lv: 0, xp: 0 }, scythe: { lv: 0, xp: 0 } },
                pierce: { dagger: { lv: 0, xp: 0 }, spear: { lv: 0, xp: 0 } },
                blunt: { hammer: { lv: 0, xp: 0 }, mace: { lv: 0, xp: 0 } },
                range: { bow: { lv: 0, xp: 0 }, staff: { lv: 0, xp: 0 }, grimoire: { lv: 0, xp: 0 } },
                magic: { fire: 0, ice: 0, elec: 0, earth: 0, wind: 0, water: 0, death: 0, life: 0, time: 0, space: 0 },
                pacts: { demon: 0, celestial: 0, ancestor: 0, elemental: 0, blood: 0, soul: 0, beast: 0 },
                summon: { tamer: 0, necro: 0, golem: 0, spirit: 0 },
                special: { druid: 0, psionic: 0, alchemist: 0, shadow: 0, berserker: 0, paladin: 0 }
            },
            styles: { oneHand: 0, twoHands: 0, dual: 0, magic: 0 },
            equip: { main: 'Nenhuma', body: 'Nenhuma', acc: 'Nenhum' },
            mascot: {
                name: 'Mascote', level: 1, type: '', element: '', hp: 50, hpMax: 50, loyalty: 80,
                stats: { agi: 5, str: 5, per: 5, def: 5, sta: 5 }, skills: [],
                desc: { view: '', personality: '', history: '' }, icon: ''
            },
            paranormal: {
                nex: 5, rank: '', sanity: 16, sanityMax: 16, effort: 4, effortMax: 4,
                attributes: { agi: 0, str: 0, int: 0, vig: 0, pre: 0 },
                defenses: { defense: 10, block: 0, dodge: 0 },
                resistances: { blood: 0, death: 0, knowledge: 0, energy: 0, fear: 0 },
                rituals: [], skills: {}
            },
            head: '', torso: '', arms: '', legs: '',
            bio: '', motives: '', fears: '', traits: '', ideals: '', flaws: '', habits: '', allies: '', enemies: '',
            avatar: '',
            created: new Date().toISOString(),
            updated: new Date().toISOString()
        };
        this.save(player);
    }

    static get player() { return this.load(); }

    static save(data) {
        const user = data || this.player;
        user.updated = new Date().toISOString();
        if (user.stats) this.calc(user);
        localStorage.setItem(DB_KEY, JSON.stringify(user));
        window.dispatchEvent(new CustomEvent('update'));
=======
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
                    cortantes: {
                        espadaCurta: { nivel: 0, experiencia: 0 },
                        espadaLonga: { nivel: 0, experiencia: 0 },
                        katanas: { nivel: 0, experiencia: 0 },
                        machados: { nivel: 0, experiencia: 0 },
                        foices: { nivel: 0, experiencia: 0 },
                        laminasDuplas: { nivel: 0, experiencia: 0 },
                        sabre: { nivel: 0, experiencia: 0 },
                        cutelo: { nivel: 0, experiencia: 0 }
                    },
                    
                    perfurantes: {
                        adaga: { nivel: 0, experiencia: 0 },
                        lanca: { nivel: 0, experiencia: 0 },
                        rapiera: { nivel: 0, experiencia: 0 },
                        estilete: { nivel: 0, experiencia: 0 },
                        picareta: { nivel: 0, experiencia: 0 },
                        tridente: { nivel: 0, experiencia: 0 },
                        chuco: { nivel: 0, experiencia: 0 },
                        arpao: { nivel: 0, experiencia: 0 }
                    },
                    
                    concussao: {
                        clava: { nivel: 0, experiencia: 0 },
                        martelo: { nivel: 0, experiencia: 0 },
                        maca: { nivel: 0, experiencia: 0 },
                        mangual: { nivel: 0, experiencia: 0 },
                        porrete: { nivel: 0, experiencia: 0 },
                        bastao: { nivel: 0, experiencia: 0 },
                        corrente: { nivel: 0, experiencia: 0 },
                        chicote: { nivel: 0, experiencia: 0 }
                    },
                    
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
>>>>>>> parent of 069c538 (a)
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
<<<<<<< HEAD

    static calc(user) {
        const s = user.stats;
        if (!s) return;
        user.res.hpMax = Math.max(10, s.con * 5);
        user.res.hp = Math.min(user.res.hp ?? user.res.hpMax, user.res.hpMax);
        user.res.mpMax = s.int * 2;
        user.res.mp = Math.min(user.res.mp ?? user.res.mpMax, user.res.mpMax);
        user.res.staMax = Math.max(20, (s.con + s.dex) * 2);
        user.res.sta = Math.min(user.res.sta ?? user.res.staMax, user.res.staMax);
    }

    static levelUp() {
        const user = this.load();
        user.level++;
        user.points += 5;
        this.save(user);
    }

    static notify(msg, type = 'info') {
        const el = document.createElement('div');
        el.className = `fixed top-4 right-4 px-4 py-3 rounded-lg z-50 bg-[#0f0f12] border border-theme-border text-white shadow-lg`;
        el.style.borderColor = type === 'success' ? '#22c55e' : (type === 'error' ? '#ef4444' : '#2a2a2e');
        el.textContent = msg;
        document.body.appendChild(el);
        setTimeout(() => el.remove(), 3000);
=======
    
    static limparPersonagem() {
        localStorage.removeItem(GRIMORIO_STORAGE_KEY);
        this.inicializarPersonagemPadrao();
        window.dispatchEvent(new CustomEvent('grimorio:personagemAtualizado'));
        return this.carregarPersonagem();
    }
    
    // ============================================================
    // 2. SISTEMA DE ATRIBUTOS
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
    
    static distribuirPontosAleatorios(personagem, pontosParaDistribuir = 10) {
        if (!personagem.modoChefe) {
            const totalAtual = Object.values(personagem.atributos).reduce((a, b) => a + b, 0);
            
            if (totalAtual >= 18 && pontosParaDistribuir > 0) {
                const atributos = Object.keys(personagem.atributos);
                
                for (let i = 0; i < pontosParaDistribuir; i++) {
                    const attrAleatorio = atributos[Math.floor(Math.random() * atributos.length)];
                    personagem.atributos[attrAleatorio]++;
                }
                
                console.log(`[Grimorio] ${pontosParaDistribuir} pontos distribuídos aleatoriamente`);
            }
        }
        
        return personagem;
    }
    
    static subirNivel(personagem, pontosGanhos = 5) {
        personagem.nivel++;
        personagem.pontosDisponiveis += pontosGanhos;
        personagem.experiencia = 0;
        personagem.experienciaProximoNivel = Math.floor(personagem.experienciaProximoNivel * 1.5);
        
        if (personagem.modoChefe) {
            console.log('[Grimorio] Modo Chefe: Você pode distribuir pontos livremente');
        }
        
        this.salvarPersonagem(personagem);
        return personagem;
    }
    
    static alternarModoChefe(personagem, ativar = true) {
        personagem.modoChefe = ativar;
        this.salvarPersonagem(personagem);
        
        console.log(`[Grimorio] Modo Chefe ${ativar ? 'ATIVADO' : 'DESATIVADO'}`);
        return personagem;
    }
    
    // ============================================================
    // 3. SISTEMA DE CLASSE
    // ============================================================
    
    static atualizarClasse(nomeClasse) {
        const personagem = this.carregarPersonagem();
        personagem.classe = nomeClasse;
        
        const bonusPorClasse = {
            'Guerreiro': { forca: 2, constituicao: 2 },
            'Mago': { inteligencia: 3, sabedoria: 1 },
            'Arqueiro': { destreza: 3, sabedoria: 1 },
            'Clérigo': { sabedoria: 3, carisma: 1 },
            'Ladino': { destreza: 2, inteligencia: 2 },
            'Bárbaro': { forca: 3, constituicao: 1 }
        };
        
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
        const notificacao = document.createElement('div');
        notificacao.className = `fixed top-4 right-4 px-4 py-3 rounded-lg shadow-lg z-50 animate-slide-in-right`;
        
        const estilos = {
            success: 'bg-green-900/80 border-green-700 text-green-300',
            error: 'bg-red-900/80 border-red-700 text-red-300',
            warning: 'bg-yellow-900/80 border-yellow-700 text-yellow-300',
            info: 'bg-blue-900/80 border-blue-700 text-blue-300'
        };
        
        notificacao.className += ' ' + (estilos[tipo] || estilos.info);
        
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
        
        document.body.appendChild(notificacao);
        
        if (window.lucide) {
            lucide.createIcons();
        }
        
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
    // 7. COMPATIBILIDADE COM SISTEMA ANTIGO
    // ============================================================
    
    static migrarDadosAntigos() {
        const dadosAntigos = localStorage.getItem('personagemSalvo');
        if (dadosAntigos) {
            try {
                const antigo = JSON.parse(dadosAntigos);
                const novo = this.carregarPersonagem();
                
                if (antigo['inp-nome']) novo.nome = antigo['inp-nome'];
                if (antigo['inp-titulo']) novo.titulo = antigo['inp-titulo'];
                if (antigo['inp-raca']) novo.raca = antigo['inp-raca'];
                if (antigo['inp-classe']) novo.classe = antigo['inp-classe'];
                if (antigo['inp-idade']) novo.idade = antigo['inp-idade'];
                
                if (antigo.atributos) {
                    novo.atributos = { ...novo.atributos, ...antigo.atributos };
                }
                
                if (antigo.avatar) novo.avatar = antigo.avatar;
                
                this.salvarPersonagem(novo);
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
    
    // ============================================================
    // 8. SINCRONIZAÇÃO COM SISTEMA DE STATUS
    // ============================================================
    
    static sincronizarStatus(statusData) {
        try {
            const personagem = this.carregarPersonagem();
            
            if (!personagem) {
                console.error('Nenhum personagem encontrado para sincronização');
                return false;
            }
            
            // Converter atributos de 0-100 para 0-30 (D&D)
            const escala = 30;
            if (statusData.atributos) {
                Object.keys(statusData.atributos).forEach(attr => {
                    if (personagem.atributos[attr] !== undefined) {
                        const valorConvertido = Math.round((statusData.atributos[attr] / 100) * escala);
                        personagem.atributos[attr] = valorConvertido;
                    }
                });
            }
            
            // Sincronizar nível e XP
            if (statusData.nivel) {
                personagem.nivel = statusData.nivel;
            }
            
            if (statusData.experiencia !== undefined) {
                personagem.experiencia = statusData.experiencia;
            }
            
            if (statusData.experienciaProximoNivel) {
                personagem.experienciaProximoNivel = statusData.experienciaProximoNivel;
            }
            
            // Sincronizar pontos
            if (statusData.pontosDisponiveis !== undefined) {
                personagem.pontosDisponiveis = statusData.pontosDisponiveis;
            }
            
            // Calcular recursos
            this.calcularRecursosAutomaticos(personagem);
            
            // Salvar personagem atualizado
            this.salvarPersonagem(personagem);
            
            // Disparar evento de atualização
            window.dispatchEvent(new CustomEvent('grimorio:personagemAtualizado'));
            
            console.log('Status sincronizado com sucesso');
            return true;
            
        } catch (error) {
            console.error('Erro ao sincronizar status:', error);
            return false;
        }
    }
    
    // ============================================================
    // 9. SISTEMA DE SINCRONIZAÇÃO DE IMAGENS E DADOS DA FICHA
    // ============================================================
    
    static salvarAvatar(avatarDataURL) {
        try {
            const personagem = this.carregarPersonagem();
            personagem.avatar = avatarDataURL;
            this.salvarPersonagem(personagem);
            console.log('[Grimorio] Avatar salvo com sucesso');
            return true;
        } catch (error) {
            console.error('[Grimorio] Erro ao salvar avatar:', error);
            return false;
        }
    }
    
    static salvarDadosBasicos(dados) {
        try {
            const personagem = this.carregarPersonagem();
            
            console.log('[Grimorio] Salvando dados básicos:', dados);
            
            // Dados básicos
            personagem.nome = dados.nome || personagem.nome;
            personagem.titulo = dados.titulo || personagem.titulo;
            personagem.raca = dados.raca || personagem.raca;
            personagem.classe = dados.classe || personagem.classe;
            personagem.nivel = parseInt(dados.nivel) || personagem.nivel;
            personagem.idade = dados.idade || personagem.idade;
            personagem.altura = dados.altura || personagem.altura;
            personagem.peso = dados.peso || personagem.peso;
            
            // Se não houver origem na ficha, manter a existente
            if (dados.origem) {
                personagem.origem = dados.origem;
            }
            
            // Calcular recursos automaticamente
            this.calcularRecursosAutomaticos(personagem);
            
            this.salvarPersonagem(personagem);
            console.log('[Grimorio] Dados básicos salvos');
            return true;
            
        } catch (error) {
            console.error('[Grimorio] Erro ao salvar dados básicos:', error);
            return false;
        }
    }
    
    static carregarParaPerfil() {
        return this.carregarPersonagem();
    }
    
    static temDados() {
        const personagem = this.carregarPersonagem();
        return personagem && personagem.nome !== 'Novo Aventureiro';
    }
    
    static exportarTudo() {
        const personagem = this.carregarPersonagem();
        const fichaCompleta = localStorage.getItem('grimorio_ficha_completa');
        
        return {
            personagem: personagem,
            fichaCompleta: fichaCompleta ? JSON.parse(fichaCompleta) : null,
            data: new Date().toISOString()
        };
    }
    
    static sincronizarTudo(dadosFicha) {
        try {
            // Salvar dados básicos
            this.salvarDadosBasicos(dadosFicha);
            
            // Salvar ficha completa no localStorage
            localStorage.setItem('grimorio_ficha_completa', JSON.stringify(dadosFicha));
            
            // Disparar evento para atualizar outras páginas
            window.dispatchEvent(new CustomEvent('grimorio:dadosAtualizados', {
                detail: { timestamp: Date.now() }
            }));
            
            console.log('[Grimorio] Todos os dados sincronizados');
            return true;
        } catch (error) {
            console.error('[Grimorio] Erro na sincronização:', error);
            return false;
        }
    }
    
    // ============================================================
    // 10. FUNÇÕES AUXILIARES
    // ============================================================
    
    static verificarConexao() {
        console.log('[Grimorio] Verificando sistema...');
        console.log('Personagem atual:', this.carregarPersonagem());
        console.log('Funções disponíveis:', Object.keys(GrimorioSystem));
        return true;
>>>>>>> parent of 069c538 (a)
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
    
    @keyframes fade-in-up {
        from { opacity: 0; transform: translateY(20px); }
        to { opacity: 1; transform: translateY(0); }
    }
    .animate-fade-in-up {
        animation: fade-in-up 0.5s ease-out;
    }
`;
document.head.appendChild(style);

<<<<<<< HEAD
document.addEventListener('DOMContentLoaded', () => {
    Core.init();
    window.Core = Core;
});
=======
// ============================================================
// 12. SISTEMA DE SORTE/DESTINO
// ============================================================

GrimorioSystem.calcularSorte = function() {
    const personagem = this.carregarPersonagem();
    
    // Se já tiver dados de sorte, usar eles
    if (personagem.dadosSorte) {
        const dados = personagem.dadosSorte;
        const indice = ((dados.fe + dados.destino) * 2 - dados.sorte) / 2;
        return {
            indice: indice,
            percentual: Math.max(0, Math.min(100, indice * 5 + 50)),
            dados: dados
        };
    }
    
    // Gerar dados aleatórios
    const dadosSorte = {
        fe: Math.floor(Math.random() * 10) + 1,
        sorte: Math.floor(Math.random() * 10) + 1,
        destino: Math.floor(Math.random() * 10) + 1
    };
    
    personagem.dadosSorte = dadosSorte;
    this.salvarPersonagem(personagem);
    
    const indice = ((dadosSorte.fe + dadosSorte.destino) * 2 - dadosSorte.sorte) / 2;
    
    return {
        indice: indice,
        percentual: Math.max(0, Math.min(100, indice * 5 + 50)),
        dados: dadosSorte
    };
};

// ============================================================
// 13. SISTEMA DE EQUIPAMENTOS
// ============================================================

GrimorioSystem.equiparItem = function(tipo, itemNome, atributosBonus = {}) {
    const personagem = this.carregarPersonagem();
    
    if (!personagem.equipamentos) {
        personagem.equipamentos = {};
    }
    
    personagem.equipamentos[tipo] = itemNome;
    
    // Aplicar bônus de atributos temporários (se houver)
    if (Object.keys(atributosBonus).length > 0) {
        if (!personagem.bonusEquipamentos) {
            personagem.bonusEquipamentos = {};
        }
        personagem.bonusEquipamentos[tipo] = atributosBonus;
    }
    
    this.salvarPersonagem(personagem);
    console.log(`[Grimorio] Item equipado: ${itemNome} (${tipo})`);
    return true;
};

GrimorioSystem.desequiparItem = function(tipo) {
    const personagem = this.carregarPersonagem();
    
    if (personagem.equipamentos && personagem.equipamentos[tipo]) {
        delete personagem.equipamentos[tipo];
        
        // Remover bônus
        if (personagem.bonusEquipamentos && personagem.bonusEquipamentos[tipo]) {
            delete personagem.bonusEquipamentos[tipo];
        }
        
        this.salvarPersonagem(personagem);
        console.log(`[Grimorio] Item desequipado: ${tipo}`);
        return true;
    }
    
    return false;
};

// ============================================================
// 14. SISTEMA DE HABILIDADES
// ============================================================

GrimorioSystem.adicionarHabilidade = function(habilidade) {
    const personagem = this.carregarPersonagem();
    
    if (!personagem.habilidades) {
        personagem.habilidades = [];
    }
    
    // Verificar se habilidade já existe
    const existe = personagem.habilidades.find(h => h.id === habilidade.id);
    if (!existe) {
        personagem.habilidades.push({
            id: habilidade.id || Date.now(),
            nome: habilidade.nome,
            descricao: habilidade.descricao,
            nivel: habilidade.nivel || 1,
            tipo: habilidade.tipo || 'Ativa',
            custo: habilidade.custo || 0,
            cooldown: habilidade.cooldown || 0,
            dano: habilidade.dano || '1d6'
        });
        
        this.salvarPersonagem(personagem);
        console.log(`[Grimorio] Habilidade adicionada: ${habilidade.nome}`);
        return true;
    }
    
    return false;
};

GrimorioSystem.removerHabilidade = function(habilidadeId) {
    const personagem = this.carregarPersonagem();
    
    if (personagem.habilidades) {
        const index = personagem.habilidades.findIndex(h => h.id === habilidadeId);
        if (index !== -1) {
            personagem.habilidades.splice(index, 1);
            this.salvarPersonagem(personagem);
            console.log(`[Grimorio] Habilidade removida: ${habilidadeId}`);
            return true;
        }
    }
    
    return false;
};

GrimorioSystem.subirNivelHabilidade = function(habilidadeId) {
    const personagem = this.carregarPersonagem();
    
    if (personagem.habilidades) {
        const habilidade = personagem.habilidades.find(h => h.id === habilidadeId);
        if (habilidade) {
            habilidade.nivel = (habilidade.nivel || 1) + 1;
            this.salvarPersonagem(personagem);
            console.log(`[Grimorio] Habilidade ${habilidade.nome} subiu para nível ${habilidade.nivel}`);
            return habilidade.nivel;
        }
    }
    
    return false;
};

// ============================================================
// INICIALIZAÇÃO AUTOMÁTICA DO SISTEMA
// ============================================================
document.addEventListener('DOMContentLoaded', function() {
    // 1. Tenta migrar dados antigos
    GrimorioSystem.migrarDadosAntigos();
    
    // 2. Garante que sempre exista um personagem
    GrimorioSystem.inicializarPersonagemPadrao();
    
    // 3. Expor para debug no console
    window.Grimorio = GrimorioSystem;
    
    // 4. Verificar conexão
    setTimeout(() => {
        GrimorioSystem.verificarConexao();
    }, 100);
    
    console.log('[Grimorio] Sistema inicializado v2.1');
});

// ============================================================
// EVENTOS GLOBAIS PARA SINCRONIZAÇÃO
// ============================================================

// Ouvir eventos de armazenamento de outras abas
window.addEventListener('storage', function(event) {
    if (event.key === GRIMORIO_STORAGE_KEY) {
        console.log('[Grimorio] Dados atualizados de outra aba');
        // Disparar evento para atualizar a interface
        window.dispatchEvent(new CustomEvent('grimorio:personagemAtualizado'));
    }
});

// Evento customizado para atualização de dados
window.addEventListener('grimorio:dadosAtualizados', function() {
    console.log('[Grimorio] Evento de dados atualizados recebido');
});

// ============================================================
// 11. SISTEMA DE CLASSES PERSONALIZADAS (ADICIONAR AO GRIMORIO-CORE.JS)
// ============================================================

// Adicionar estas funções ao GrimorioSystem:

// Método para salvar uma classe personalizada
GrimorioSystem.saveClass = function(classeData) {
    try {
        let classes = JSON.parse(localStorage.getItem('grimorio_classes_personalizadas') || '[]');
        
        // Verificar se já existe uma classe com este nome
        const index = classes.findIndex(c => c.id === classeData.id || c.nome === classeData.nome);
        
        if (index !== -1) {
            classes[index] = classeData; // Atualizar
        } else {
            classes.push(classeData); // Adicionar nova
        }
        
        localStorage.setItem('grimorio_classes_personalizadas', JSON.stringify(classes));
        console.log('[Grimorio] Classe salva:', classeData.nome);
        return true;
    } catch (error) {
        console.error('[Grimorio] Erro ao salvar classe:', error);
        return false;
    }
};

// Método para carregar todas as classes personalizadas
GrimorioSystem.getClasses = function() {
    try {
        return JSON.parse(localStorage.getItem('grimorio_classes_personalizadas') || '[]');
    } catch (error) {
        console.error('[Grimorio] Erro ao carregar classes:', error);
        return [];
    }
};

// Método para remover uma classe personalizada
GrimorioSystem.removeClass = function(classeId) {
    try {
        let classes = this.getClasses();
        const index = classes.findIndex(c => c.id === classeId);
        
        if (index !== -1) {
            const classeRemovida = classes.splice(index, 1)[0];
            localStorage.setItem('grimorio_classes_personalizadas', JSON.stringify(classes));
            console.log('[Grimorio] Classe removida:', classeRemovida.nome);
            return true;
        }
        return false;
    } catch (error) {
        console.error('[Grimorio] Erro ao remover classe:', error);
        return false;
    }
};

// Método para obter os detalhes da classe atual do personagem
GrimorioSystem.getCurrentClassDetails = function() {
    const personagem = this.carregarPersonagem();
    return personagem.detalhesClasse || null;
};

// Método para aplicar os bônus da classe ao personagem
GrimorioSystem.applyClassBonuses = function(classeNome) {
    const personagem = this.carregarPersonagem();
    
    if (!classeNome || classeNome === 'Não Escolhida') {
        return personagem;
    }
    
    // Verificar se é classe personalizada
    const classes = this.getClasses();
    const classePersonalizada = classes.find(c => c.nome === classeNome);
    
    if (classePersonalizada && classePersonalizada.bonusPontos) {
        // Aplicar bônus de pontos apenas se não foi aplicado antes
        if (!personagem.classBonusesApplied || personagem.classBonusesApplied !== classeNome) {
            personagem.pontosDisponiveis += classePersonalizada.bonusPontos;
            personagem.classBonusesApplied = classeNome;
            console.log(`[Grimorio] Bônus de ${classePersonalizada.bonusPontos} pontos aplicados para ${classeNome}`);
        }
    }
    
    this.salvarPersonagem(personagem);
    return personagem;
};
>>>>>>> parent of 069c538 (a)
