/* ==============================////============================== */

const DB_KEY = 'grimorio_player';

class Core {
    static init() {
        if (localStorage.getItem(DB_KEY)) return;
        const player = {
            name: 'Herói Sem Nome',
            title: 'Viajante',
            race: 'Humana',
            class: 'Nenhuma',
            level: 1,
            xp: 0,
            next: 1000,
            points: 0,
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
            skills: [],
            items: [],
            money: { gold: 0, silver: 0, copper: 100 },
            mastery: {
                combat: { sword: 0, axe: 0, spear: 0, hammer: 0, dagger: 0, bow: 0, shield: 0 },
                magic: { fire: 0, ice: 0, elec: 0, earth: 0, wind: 0, dark: 0, light: 0 },
                pacts: { demon: 0, blood: 0, soul: 0 },
                summon: { tamer: 0, necro: 0 },
                special: { brew: 0, stealth: 0 }
            },
            paranormal: {
                nex: 5, rank: 'Nenhum', sanity: 16, sanityMax: 16, effort: 4, effortMax: 4,
                attributes: { agi: 0, str: 0, int: 0, vig: 0, pre: 0 },
                defenses: { defense: 10, block: 0, dodge: 0 },
                resistances: { blood: 0, death: 0, knowledge: 0, energy: 0, fear: 0 },
                rituals: []
            },
            head: '', torso: '', arms: '', legs: '',
            bio: '', motives: '', fears: '', traits: '', ideals: '', flaws: '', habits: '', allies: '', enemies: '',
            avatar: '',
            created: new Date().toISOString(),
            updated: new Date().toISOString()
        };
        this.save(player);
    }

    static save(data) {
        data = data || this.player; // Support both explicit and implicit player
        data.updated = new Date().toISOString();
        localStorage.setItem(DB_KEY, JSON.stringify(data));
        window.dispatchEvent(new CustomEvent('update'));
        return true;
    }

    static load() {
        const raw = localStorage.getItem(DB_KEY);
        if (!raw) { this.init(); return this.load(); }
        try { 
            this.player = JSON.parse(raw);
            return this.player; 
        } catch (e) { this.init(); return this.load(); }
    }

    static get player() {
        return this.load();
    }

    static set player(v) {
        localStorage.setItem(DB_KEY, JSON.stringify(v));
    }

    static notify(msg, type = 'info') {
        const el = document.createElement('div');
        el.className = `fixed top-4 right-4 px-4 py-3 rounded-lg z-50 bg-[#0f0f12] border border-theme-border text-white shadow-lg pointer-events-none transform transition-all duration-300`;
        el.style.borderColor = type === 'success' ? '#22c55e' : (type === 'error' ? '#ef4444' : '#2a2a2e');
        el.innerHTML = `<div class="flex items-center gap-2"><span>${msg}</span></div>`;
        document.body.appendChild(el);
        setTimeout(() => { el.style.opacity = '0'; el.style.transform = 'translateY(-20px)'; setTimeout(() => el.remove(), 300); }, 3000);
    }
}

/* ==============================////============================== */

document.addEventListener('DOMContentLoaded', () => {
    Core.init();
    window.Core = Core;
    window.GrimorioSystem = Core; // Alias for legacy
});