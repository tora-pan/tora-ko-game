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

    // setup the behaviors
    this.behaviorLoop = config.behaviorLoop || [];

    // setup the animations
    this.animations = config.animations || {
      'idle-down': [[0, 0]],
      'idle-right': [[0, 1]],
      'idle-up': [[0, 2]],
      'idle-left': [[0, 3]],
      'walk-down': [
        [1, 0],
        [0, 0],
        [3, 0],
        [0, 0],
      ],
      'walk-right': [
        [1, 1],
        [0, 1],
        [3, 1],
        [0, 1],
      ],
      'walk-up': [
        [1, 2],
        [0, 2],
        [3, 2],
        [0, 2],
      ],
      'walk-left': [
        [1, 3],
        [0, 3],
        [3, 3],
        [0, 3],
      ],
    };
    this.currentAnimation = 'idle-down'; // config.currentAnimation || 'idle-down';
    this.currentAnimationFrame = 0;

    this.animationFrameLimit = config.animationFrameLimit || 8;
    this.animationFrameProgress = this.animationFrameLimit;

    // setup the game object
    this.gameObj = config.gameObj;
  }

  get frame() {
    return this.animations[this.currentAnimation][this.currentAnimationFrame];
  }

  setAnimation(key) {
    if (this.currentAnimation !== key) {
      this.currentAnimation = key;
      this.currentAnimationFrame = 0;
      this.animationFrameProgress = this.animationFrameLimit;
    }
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

  draw(ctx, cameraPerson) {
    const x = this.gameObj.x - 8 + utils.withGrid(10.5) - cameraPerson.x;
    const y = this.gameObj.y - 18 + utils.withGrid(6) - cameraPerson.y;
    const [frameX, frameY] = this.frame;
    this.isShadowLoaded && ctx.drawImage(this.shadow, x, y);
    this.isLoaded &&
      ctx.drawImage(this.image, frameX * 32, frameY * 32, 32, 32, x, y, 32, 32);
    this.updateAnimationProgress();
  }
}
