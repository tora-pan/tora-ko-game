class OverworldMap {
  constructor(config) {
    this.gameObjects = config.gameObjects;
    this.walls = config.walls || {};

    this.lowerImage = new Image();
    this.lowerImage.src = config.lowerSrc;

    this.upperImage = new Image();
    this.upperImage.src = config.upperSrc;
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
    Object.values(this.gameObjects).forEach((obj) => {
      //TODO: check if this object should actually mount or not
      obj.mount(this);
    });
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
      npc: new Person({
        x: utils.withGrid(3),
        y: utils.withGrid(8),
        src: '/assets/images/characters/people/npc1.png',
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
