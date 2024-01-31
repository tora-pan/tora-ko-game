class Combatant {
  constructor(config, battle) {
    this.battle = battle;
    Object.keys(config).forEach((key) => {
      this[key] = config[key];
    });
  }

  get hpPercent() {
    const percent = (this.hp / this.maxHp) * 100;
    return percent > 0 ? percent : 0;
  }

  get xpPercent() {
    return (this.xp / this.maxXp) * 100;
  }

  get isActive() {
    return this.battle.activeCombatants[this.team] === this.id;
  }

  createElement() {
    this.hudElement = document.createElement('div');
    this.hudElement.classList.add('Combatant');
    this.hudElement.setAttribute('data-combatant', this.id);
    this.hudElement.setAttribute('data-team', this.team);

    this.hudElement.innerHTML = `
    <p class="Combatant_name">${this.name}</p>
    <p class="Combatant_level"></p>
    <div class="Combatant_character_crop">
      <img src="${this.src}" alt="${this.name}" class="Combatant_type">
    </div>
    <img class="Combatant_type" src="${this.icon}" alt="${this.type}">
      <svg viewBox="0 0 26 3" class="Combatant_life-container">
        <rect x=0 y=0 width="0%" height="1" fill="#f82ff71" />
        <rect x=0 y=1 width="0%" height="2" fill="#3ef126" />
      </svg>
      <svg viewBox="0 0 26 2" class="Combatant_xp-container">
        <rect x=0 y=0 width="0%" height="1" fill="#ffd76a" />
        <rect x=0 y=1 width="0%" height="1" fill="#ffc934" />
      </svg>
      <p class="Combatant_status"></p>
      `;

    this.pizzaElement = document.createElement('img');
    this.pizzaElement.classList.add('Pizza');
    this.pizzaElement.setAttribute('src', this.src);
    this.pizzaElement.setAttribute('alt', this.name);
    this.pizzaElement.setAttribute('data-team', this.team);

    this.hpFills = this.hudElement.querySelectorAll(
      '.Combatant_life-container rect',
    );
    this.xpFills = this.hudElement.querySelectorAll(
      '.Combatant_xp-container rect',
    );
  }

  update(changes = {}) {
    // update all incoming items
    Object.keys(changes).forEach((key) => {
      this[key] = changes[key];
    });

    // update level and status
    this.hudElement.setAttribute('data-status', this.status);
    this.hudElement.querySelector(
      '.Combatant_level',
    ).innerText = `${this.level}`;

    // update active pizza/hud element
    this.hudElement.setAttribute('data-active', this.isActive);
    this.pizzaElement.setAttribute('data-active', this.isActive);

    //update the health and xp bars
    this.hpFills.forEach((fill) => (fill.style.width = `${this.hpPercent}%`));
    this.xpFills.forEach((fill) => (fill.style.width = `${this.xpPercent}%`));
  }

  init(container) {
    this.createElement();
    container.appendChild(this.hudElement);
    container.appendChild(this.pizzaElement);
    this.update();
  }
}
