/* ==============================////============================== */

const DB_KEY = 'grimorio_player';

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
        return true;
    }

    static load() {
        const raw = localStorage.getItem(DB_KEY);
        if (!raw) { this.init(); return this.load(); }
        try { return JSON.parse(raw); }
        catch (e) { this.init(); return this.load(); }
    }

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
    }
}

/* ==============================////============================== */

document.addEventListener('DOMContentLoaded', () => {
    Core.init();
    window.Core = Core;
});