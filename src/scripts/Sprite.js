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
      'idle-down': [[0, 0]],
      'walk-down': [
        [1, 0],
        [0, 0],
        [3, 0],
        [0, 0],
      ],
    };
    this.currentAnimation = 'walk-down'; // config.currentAnimation || 'idle-down';
    this.currentAnimationFrame = 0;

    this.animationFrameLimit = config.animationFrameLimit || 16;
    this.animationFrameProgress = this.animationFrameLimit;

    // setup the game object
    this.gameObj = config.gameObj;
  }

  get frame() {
    return this.animations[this.currentAnimation][this.currentAnimationFrame];
  }

  updateAnimationProgress() {
    //downtick frame progress
    if (this.animationFrameProgress > 0) {
      this.animationFrameProgress -= 1;
      return;
    }
    this.animationFrameProgress = this.animationFrameLimit;
    this.currentAnimationFrame += 1;
    //increment frame
    if (this.frame === undefined) {
      this.currentAnimationFrame = 0;
    }
  }

  draw(ctx) {
    const x = this.gameObj.x - 8;
    const y = this.gameObj.y - 18;
    const [frameX, frameY] = this.frame;
    this.isShadowLoaded && ctx.drawImage(this.shadow, x, y);
    this.isLoaded &&
      ctx.drawImage(this.image, frameX * 32, frameY * 32, 32, 32, x, y, 32, 32);
    this.updateAnimationProgress();
  }
}
