class OverworldMap {
  constructor(config) {
    this.gameObjects = config.gameObjects;
    this.walls = config.walls || {};

    this.lowerImage = new Image();
    this.lowerImage.src = config.lowerSrc;

    this.upperImage = new Image();
    this.upperImage.src = config.upperSrc;

    this.isCutscenePlaying = false;
  }

  drawLower(ctx, cameraPerson) {
    ctx.drawImage(
      this.lowerImage,
      utils.withGrid(10.5) - cameraPerson.x,
      utils.withGrid(6) - cameraPerson.y,
    );
  }

  drawUpper(ctx, cameraPerson) {
    ctx.drawImage(
      this.upperImage,
      utils.withGrid(10.5) - cameraPerson.x,
      utils.withGrid(6) - cameraPerson.y,
    );
  }

  isSpaceTaken(currentX, currentY, direction) {
    const { x, y } = utils.getNextPostion(currentX, currentY, direction);
    return this.walls[`${x},${y}`] || false;
  }

  mountObjects() {
    Object.keys(this.gameObjects).forEach((key) => {
      let obj = this.gameObjects[key];
      obj.id = key;
      //TODO: check if this object should actually mount or not
      obj.mount(this);
    });
  }

  async startCutscene(events) {
    this.isCutscenePlaying = true;
    console.log('cutscense starts', events);

    for (let i = 0; i < events.length; i++) {
      console.log(events[i]);
      const eventHandler = new OverworldEvent({ event: events[i], map: this });
      await eventHandler.init();
    }
    // start loop of events for cutscene
    this.isCutscenePlaying = false;

    Object.values(this.gameObjects).forEach((obj) => {
      obj.doBehaviorEvent(this);
    });
  }

  checkForActionCutscene() {
    const hero = this.gameObjects.hero;
    const nextCoords = utils.getNextPostion(hero.x, hero.y, hero.direction);
    const match = Object.values(this.gameObjects).find((obj) => {
      return `${obj.x},${obj.y}` === `${nextCoords.x},${nextCoords.y}`;
    });
    if (!this.isCutscenePlaying && match && match.talking.length) {
      this.startCutscene(match.talking[0].events);
    }
  }

  addWall(x, y) {
    this.walls[`${x},${y}`] = true;
  }
  removeWall(x, y) {
    delete this.walls[`${x},${y}`];
  }
  moveWall(x, y, direction) {
    const { x: newX, y: newY } = utils.getNextPostion(x, y, direction);
    this.removeWall(x, y);
    this.addWall(newX, newY);
  }
}
window.OverworldMaps = {
  DemoRoom: {
    lowerSrc: '/assets/images/maps/DemoLower.png',
    upperSrc: '/assets/images/maps/DemoUpper.png',
    gameObjects: {
      hero: new Person({
        isPlayerControlled: true,
        x: utils.withGrid(5),
        y: utils.withGrid(6),
      }),
      npcA: new Person({
        x: utils.withGrid(3),
        y: utils.withGrid(8),
        src: '/assets/images/characters/people/npc1.png',
        behaviorLoop: [
          { type: 'walk', direction: 'right' },
          { type: 'walk', direction: 'left' },
          // { type: 'stand', direction: 'right', duration: 800 },
          // { type: 'walk', direction: 'down' },
          // { type: 'stand', direction: 'down', duration: 1800 },
          // { type: 'walk', direction: 'up' },
          // { type: 'stand', direction: 'up', duration: 800 },
          // { type: 'walk', direction: 'left' },
          // { type: 'stand', direction: 'left', duration: 800 },
        ],
        talking: [
          {
            events: [
              { type: 'textMessage', text: 'Hey! You must be new here!' },
              { type: 'textMessage', text: "I'm NPC A" },
              {
                type: 'textMessage',
                text: "I'm just here to show you how to talk to people",
              },
              { type: 'textMessage', text: 'Press enter to talk to me' },
            ],
          },
        ],
      }),
      npcB: new Person({
        x: utils.withGrid(3),
        y: utils.withGrid(5),
        src: '/assets/images/characters/people/npc2.png',
        behaviorLoop: [
          { type: 'stand', direction: 'right', duration: 800 },
          { type: 'stand', direction: 'down', duration: 200 },
          { type: 'stand', direction: 'left', duration: 1200 },
          { type: 'stand', direction: 'up', duration: 400 },
          { type: 'stand', direction: 'left', duration: 600 },
        ],
      }),
    },
    walls: {
      // "16,16": true,
      [utils.asGridCoord(7, 6)]: true,
      [utils.asGridCoord(8, 6)]: true,
      [utils.asGridCoord(7, 7)]: true,
      [utils.asGridCoord(8, 7)]: true,
    },
  },
  Kitchen: {
    lowerSrc: '/assets/images/maps/KitchenLower.png',
    upperSrc: '/assets/images/maps/KitchenUpper.png',
    gameObjects: {
      hero: new Person({
        isPlayerControlled: true,
        x: utils.withGrid(5),
        y: utils.withGrid(6),
      }),
      npc: new Person({
        x: utils.withGrid(3),
        y: utils.withGrid(8),
        src: '/assets/images/characters/people/npc4.png',
      }),
      npc1: new Person({
        x: utils.withGrid(1),
        y: utils.withGrid(9),
        src: '/assets/images/characters/people/npc2.png',
      }),
    },
  },
};
