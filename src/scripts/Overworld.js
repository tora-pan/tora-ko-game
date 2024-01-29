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

  bindHeroPositionCheck() {
    document.addEventListener('PersonWalkingComplete', (e) => {
      if (e.detail.whoId === 'hero') {
        this.map.checkForFootstepCutscene();
      }
    });
  }

  startMap(map) {
    this.map = new OverworldMap(map);
    this.map.overworld = this;
    this.map.mountObjects();
  }

  init() {
    this.startMap(window.OverworldMaps.DemoRoom);

    this.bindActionInput();
    this.bindHeroPositionCheck();

    this.directionInput = new DirectionInput();
    this.directionInput.init();

    this.startGameLoop();
    this.map.startCutscene([
      {
        type: 'textMessage',
        text: "Welcome to Tora-Ko-Game! Let's embark on your journey to learning web development!",
        faceHero: 'hero',
      },
    ]);
  }
}
