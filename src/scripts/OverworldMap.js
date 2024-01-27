class OverworldMap {
  constructor(config) {
    this.gameObjects = config.gameObjects;

    this.lowerImage = new Image();
    this.lowerImage.src = config.lowerSrc;

    this.upperImage = new Image();
    this.upperImage.src = config.upperSrc;
  }

  drawLower(ctx) {
    ctx.drawImage(this.lowerImage, 0, 0);
  }

  drawUpper(ctx) {
    ctx.drawImage(this.upperImage, 0, 0);
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
      npc: new Person({
        x: utils.withGrid(3),
        y: utils.withGrid(8),
        src: '/assets/images/characters/people/npc1.png',
      }),
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
        isPlayerControlled: false,
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
