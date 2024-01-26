class Sprite {
    constructor(config) {
        // setup the image
        this.image = new Image();
        this.image.src = config.src;
        this.image.onload = () => {
            this.isLoaded = true;
        };

        // setup the shadow
        this.shadow = new Image();
        this.shadow.onload = () => {
            this.isShadowLoaded = true;
        };
        this.useShadow = true;
        if (this.useShadow) {
            this.shadow.src = '/assets/images/characters/shadow.png';
        }

        // setup the animations
        this.animations = config.animations || {
            idleDown: [[0, 0]],
        };
        this.currentAnimation = config.currentAnimation || 'idleDown';
        this.currentFrame = config.currentFrame || 0;

        // setup the game object
        this.gameObj = config.gameObj;
    }

    draw(ctx) {
        const x = this.gameObj.x * 16 - 8;
        const y = this.gameObj.y * 16 - 18;
        this.isShadowLoaded && ctx.drawImage(this.shadow, x, y);
        this.isLoaded && ctx.drawImage(this.image, 0, 0, 32, 32, x, y, 32, 32);
    }
}
