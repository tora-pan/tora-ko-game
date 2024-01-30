class OverworldEvent {
  constructor({ map, event }) {
    this.map = map;
    this.event = event;
  }

  init() {
    return new Promise((resolve) => {
      this[this.event.type](resolve);
    });
  }

  stand(resolve) {
    const actor = this.map.gameObjects[this.event.who];
    actor.startBehavior(
      { map: this.map },
      {
        type: 'stand',
        direction: this.event.direction,
        duration: this.event.duration,
      },
    );
    const completeHandler = (e) => {
      if (e.detail.whoId === this.event.who) {
        document.removeEventListener('PersonStandingComplete', completeHandler);
        resolve();
      }
    };
    document.addEventListener('PersonStandingComplete', completeHandler);
  }

  walk(resolve) {
    const actor = this.map.gameObjects[this.event.who];
    actor.startBehavior(
      { map: this.map },
      {
        type: 'walk',
        direction: this.event.direction,
        retry: true,
      },
    );
    const completeHandler = (e) => {
      if (e.detail.whoId === this.event.who) {
        document.removeEventListener('PersonWalkingComplete', completeHandler);
        resolve();
      }
    };
    document.addEventListener('PersonWalkingComplete', completeHandler);
  }

  textMessage(resolve) {
    if (this.event.faceHero) {
      const obj = this.map.gameObjects[this.event.faceHero];
      obj.direction = utils.getOppositeDirection(
        this.map.gameObjects['hero'].direction,
      );
    }

    const message = new TextMessage({
      text: this.event.text,
      onComplete: () => resolve(),
    });
    message.init(document.querySelector('.game-container'));
  }

  changeMap(resolve) {
    const sceneTransition = new SceneTransition();
    sceneTransition.init(document.querySelector('.game-container'), () => {
      this.map.overworld.startMap(window.OverworldMaps[this.event.map]);
    });
    this.map.overworld.startMap(window.OverworldMaps[this.event.map]);
    resolve();
    sceneTransition.fadeout();
  }
}
