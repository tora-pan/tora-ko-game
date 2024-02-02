class BattleEvent {
  constructor(event, battle) {
    this.battle = battle;
    this.event = event;
  }

  textMessage(resolve) {
    const text = this.event.text
      .replace('{CASTER}', this.event.caster?.name)
      .replace('{TARGET}', this.event.target?.name)
      .replace('{ACTION}', this.event.action?.name);

    const message = new TextMessage({
      text,
      onComplete: () => {
        resolve();
      },
    });
    message.init(this.battle.element);
  }

  async stateChange(resolve) {
    const { caster, target, damage } = this.event;
    console.log(target);
    target.pizzaElement.classList.remove('Combatant_pizza_idle');
    caster.pizzaElement.classList.remove('Combatant_pizza_idle');
    if (damage) {
      target.pizzaElement.classList.add('battle-damage-blink');
      target.update({
        hp: target.hp - damage,
      });

      // if (this.event.target.hp <= 0) {
      //   this.event.target.hp = 0;
      //   this.event.target.status = 'defeated';
      // }
    }
    await utils.wait(600);
    target.pizzaElement.classList.remove('battle-damage-blink');
    target.pizzaElement.classList.add('Combatant_pizza_idle');
    caster.pizzaElement.classList.add('Combatant_pizza_idle');
    resolve();
  }

  submissionMenu(resolve) {
    const submissionMenu = new SubmissionMenu({
      caster: this.event.caster,
      enemy: this.event.enemy,
      onComplete: (action) => {
        // { what move to do and who to do it on},
        resolve(action);
      },
    });
    submissionMenu.init(this.battle.element);
  }

  animation(resolve) {
    const fn = BattleAnimations[this.event.animation];
    fn(this.event, resolve);
  }
  init(resolve) {
    this[this.event.type](resolve);
  }
}
