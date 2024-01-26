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
