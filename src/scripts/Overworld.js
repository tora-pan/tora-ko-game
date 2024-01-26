class Overworld {
    constructor(config) {
        this.element = config.element;
        this.canvas = this.element.querySelector('.game-canvas');
        this.ctx = this.canvas.getContext('2d');
    }

    
    init() {
      const x = 5;
      const y = 6;
      const GRID_SIZE = 16;

        const image = new Image();
        image.src = '/assets/images/maps/DemoLower.png';
        image.onload = () => {
            this.ctx.drawImage(image, 0, 0);
        };

        const shadow = new Image();
        shadow.src = '/assets/images/characters/shadow.png';
        shadow.onload = () => {
            this.ctx.drawImage(shadow, 0, 0, 32,32, x * GRID_SIZE -8, y * GRID_SIZE -18, 32, 32);
        };

        

        const player = new Image();
        player.src = '/assets/images/characters/people/hero.png';
        player.onload = () => {
            this.ctx.drawImage(player, 0, 0, 32,32, x * GRID_SIZE -8, y * GRID_SIZE -18, 32, 32);
        };
    }
}
