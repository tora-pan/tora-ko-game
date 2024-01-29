class GameObject {
  constructor(config) {
    this.id = null;
    this.isMounted = false;
    this.x = config.x || 0;
    this.y = config.y || 0;
    this.direction = config.direction || 'down';
    this.sprite = new Sprite({
      gameObj: this,
      src: config.src || '/assets/images/characters/people/hero.png',
    });
    this.behaviorLoop = config.behaviorLoop || [];
    this.behaviorLoopIdx = 0;
    this.talking = config.talking || [];
  }
  mount(map) {
    this.isMounted = true;
    map.addWall(this.x, this.y);

    this.doBehaviorEvent(map);
  }
  update() {}

  async doBehaviorEvent(map) {
    //Check if there is a cutscene playing or if there are no events
    if (
      map.isCutscenePlaying ||
      this.behaviorLoop.length === 0 ||
      this.isStanding
    ) {
      return;
    }
    //Set up the event
    const eventConfig = this.behaviorLoop[this.behaviorLoopIdx];
    eventConfig.who = this.id;

    //Run the event
    const eventHandler = new OverworldEvent({ map, event: eventConfig });
    await eventHandler.init();

    //Set the next event
    this.behaviorLoopIdx += 1;
    if (this.behaviorLoopIdx === this.behaviorLoop.length) {
      this.behaviorLoopIdx = 0;
    }

    // call it again!
    this.doBehaviorEvent(map);
  }
}
