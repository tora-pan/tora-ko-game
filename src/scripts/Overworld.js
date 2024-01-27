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
      // Draw layers
      this.map.drawLower(this.ctx);
      //draw game objects in between
      Object.values(this.map.gameObjects).forEach((obj) => {
        obj.update({
            arrow: this.directionInput.getDirection(),
        });
        obj.sprite.draw(this.ctx);
      });
      this.map.drawUpper(this.ctx);

      requestAnimationFrame(() => {
        step();
      });
    };
    step();
  }

  init() {
    this.map = new OverworldMap(window.OverworldMaps.Kitchen);
    this.directionInput = new DirectionInput();
    this.directionInput.init();
    this.startGameLoop();
  }
}
