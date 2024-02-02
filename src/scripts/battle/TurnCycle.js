class TurnCycle {
  constructor({ battle, onNewEvent }) {
    this.battle = battle;
    this.onNewEvent = onNewEvent;
    this.currentTeam = 'player';
  }

  async turn() {
    //caster
    const casterId = this.battle.activeCombatants[this.currentTeam];
    const caster = this.battle.combatants[casterId];

    const EnemyId =
      this.battle.activeCombatants[
        this.currentTeam === 'player' ? 'enemy' : 'player'
      ];
    const enemy = this.battle.combatants[EnemyId];

    const submissionMenu = await this.onNewEvent({
      type: 'submissionMenu',
      caster,
      enemy,
    });

    const resultingEvents = submissionMenu.action.success;
    for (let i = 0; i < resultingEvents.length; i++) {
      const event = {
        ...resultingEvents[i],
        submissionMenu,
        action: submissionMenu.action,
        caster,
        target: submissionMenu.target,
      };
      await this.onNewEvent(event);
    }
    this.currentTeam = this.currentTeam === 'player' ? 'enemy' : 'player';
    this.turn();
  }

  async init() {
    await this.onNewEvent({ type: 'textMessage', text: 'The battle begins!' });
    this.turn();
  }
}
