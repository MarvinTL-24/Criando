# 📖 Grimório Digital - RPG Character Manager
> "Uma ferramenta de persistência para arquitetar sua alma, corpo e inventário. Forje sua identidade, defina sua responsabilidade tática e grave sua existência."

![Project Status](https://img.shields.io/badge/Status-Em_Desenvolvimento-orange?style=for-the-badge) 
![Tech Stack](https://img.shields.io/badge/Tech-HTML5_|_CSS3_|_JS-blue?style=for-the-badge) 
![Style](https://img.shields.io/badge/Aesthetic-Minimal_|_Souls_Like-red?style=for-the-badge)  

## ⚔️ Sobre o Projeto 

O **Grimório Digital** é um gerenciador de fichas de RPG *browser-based* com uma estética **Minimalista & Sombria**, inspirada em jogos *Souls-like*. Diferente de fichas tradicionais, este sistema foca em:

1.  **Persistência Local:** Garantindo que seu progresso seja salvo instantaneamente no navegador.
2.  **Anatomia Detalhada:** Organização de características físicas através de slots corporais.
3.  **Responsabilidade Tática:** Definindo o papel do personagem no grupo.

## 🛡️ Funcionalidades Principais

### 1. Ficha de Anatomia & Slots Corporais
Organização de características físicas e detalhes através de slots de texto altamente descritivos (e.g., 8 Slots para Cabeça, 4 Slots para Membros, Detalhamento de Torso e Saúde).

### 2. Persistência e Backup
* **Zero Banco de Dados:** Todo o progresso é salvo instantaneamente no `LocalStorage` do navegador.
* **Exportação/Importação:** O sistema gera arquivos `.json` estruturados para backup ou compartilhamento seguro das fichas.

### 3. Responsabilidades (Papéis Táticos)
O jogador pode selecionar o papel tático do personagem no grupo, utilizando ícones imersivos:
* 🛡️ **Vanguarda**
* 🏰 **Defesa**
* 💉 **Suporte**
* 🗺️ **Explorador**
* 🏠 **Doméstico**
* 🐾 **Domador**

### 4. Interface Imersiva
A interface utiliza inputs minimalistas (estilo *underline*), tipografia **Cinzel** e alto contraste Neon (Azul, Laranja, Vermelho) sobre fundos escuros.

---

## 🛠️ Tecnologias Utilizadas 
* **HTML5 Semântico:** Estrutura base para o layout.
* **CSS3 (Moderno):** Utilização de variáveis CSS (`:root`), Flexbox, Grid Layout e animações.
* **JavaScript (Vanilla):** Lógica principal, manipulação do DOM, JSON parsing e gerenciamento de LocalStorage.

---
## 🚀 Como Utilizar o Grimório Digital

1.  Clone este repositório: 
    ```bash
    git clone [https://github.com/SEU-USUARIO/grimorio-digital-rpg.git](https://github.com/SEU-USUARIO/grimorio-digital-rpg.git)
    ```
    *(Recomendação: Altere o nome do repositório no seu GitHub para refletir o novo nome: `grimorio-digital-rpg.git`)*
2.  Abra o arquivo `index.html` em qualquer navegador moderno.
3.  Preencha os dados e clique em **Salvar** para gravar sua ficha no LocalStorage.
4.  Para baixar sua ficha, clique em **Salvar e Baixar** (Exportação JSON/TXT).

## 🔮 Roadmap (Futuro) 
* [ ] Implementar geração de ficha em PDF/PNG.
* [ ] Integração com API de IA para gerar imagem do personagem baseada na descrição.
* [ ] Sistema de Rolagem de Dados integrado aos Status.

Desenvolvido por Marvin Tavares Lopes
