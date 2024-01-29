class Overworld {
  constructor(config) {
    this.element = config.element;
    this.canvas = this.element.querySelector('.game-canvas');
    this.ctx = this.canvas.getContext('2d');
    this.map = null;
  }

  startGameLoop() {
    const step = () => {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

      // establish camera position
      const cameraPerson = this.map.gameObjects.hero;
      // Draw layers

      // update all objects
      Object.values(this.map.gameObjects).forEach((obj) => {
        obj.update({
          arrow: this.directionInput.getDirection(),
          map: this.map,
        });
      });
      this.map.drawLower(this.ctx, cameraPerson);

      //draw game objects in between
      Object.values(this.map.gameObjects)
        .sort((a, b) => {
          return a.y - b.y;
        })
        .forEach((obj) => {
          obj.sprite.draw(this.ctx, cameraPerson);
        });
      this.map.drawUpper(this.ctx, cameraPerson);

      requestAnimationFrame(() => {
        step();
      });
    };
    step();
  }

  bindActionInput() {
    new KeyPressListener(13, () => {
      this.map.checkForActionCutscene();
    });
  }

  init() {
    this.map = new OverworldMap(window.OverworldMaps.DemoRoom);
    this.map.mountObjects();
    this.directionInput = new DirectionInput();
    this.bindActionInput();
    this.directionInput.init();
    this.startGameLoop();
    // this.map.startCutscene([
    //   {type: "walk", who: "hero", direction: "up"},
    //   {type: "walk", who: "hero", direction: "right"},
    //   {type: "walk", who: "hero", direction: "right"},
    //   {type: "walk", who: "hero", direction: "right"},
    //   {type: "walk", who: "hero", direction: "right"},
    //   {type: "walk", who: "hero", direction: "down"},
    //   {type: "walk", who: "hero", direction: "down"},
    //   {type: "walk", who: "hero", direction: "down"},
    //   {type: "walk", who: "npcA", direction: "right"},
    //   {type: "walk", who: "npcA", direction: "right"},
    //   {type: "walk", who: "npcA", direction: "right"},
    //   {type: "walk", who: "npcA", direction: "right"},
    //   {type: "stand", who: "hero", direction: "left"},
    //   {type: "textMessage", text: "Hey! You must be new here!"},
    // //   {
    // //     who: 'hero',
    // //     type: 'walk',
    // //     direction: 'down',
    // //   },
    // //   {
    // //     who: 'hero',
    // //     type: 'walk',
    // //     direction: 'down',
    // //   },
    // //   {
    // //     who: 'npcA',
    // //     type: 'walk',
    // //     direction: 'up',
    // //   },
    // //   {
    // //     who: 'npcB',
    // //     type: 'stand',
    // //     direction: 'right',
    // //     duration: 800,
    // //   },
    // //   {
    // //     who: 'hero',
    // //     type: 'stand',
    // //     direction: 'left',
    // //     duration: 800,
    // //   },
    // ]);
  }
}
