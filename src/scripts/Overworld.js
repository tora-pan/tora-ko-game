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
                // obj.x += 0.02;
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
        this.startGameLoop();

        const x = 5;
        const y = 6;
        const GRID_SIZE = 16;

        const image = new Image();
        image.src = '/assets/images/maps/DemoLower.png';
        image.onload = () => {
            this.ctx.drawImage(image, 0, 0);
        };

        const hero = new GameObject({
            x: 5,
            y: 6,
        });
        const npc = new GameObject({
            x: 7,
            y: 9,
            src: '/assets/images/characters/people/npc1.png',
        });

        setTimeout(() => {
            hero.sprite.draw(this.ctx);
            npc.sprite.draw(this.ctx);
        }, 200);
    }
}
