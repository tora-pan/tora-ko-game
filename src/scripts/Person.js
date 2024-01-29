class Person extends GameObject {
  constructor(config) {
    super(config);
    this.movingProgressRemainging = 0;
    this.isStanding = false;

    this.isPlayerControlled = config.isPlayerControlled || false;
    this.directionUpdate = {
      up: ['y', -1],
      down: ['y', 1],
      left: ['x', -1],
      right: ['x', 1],
    };
  }
  update(state) {
    if (this.movingProgressRemainging > 0) {
      this.updatePosition();
    } else {
      if (
        !state.map.isCutscenePlaying &&
        this.isPlayerControlled &&
        state.arrow
      ) {
        this.startBehavior(state, {
          type: 'walk',
          direction: state.arrow,
        });
      }
      this.updateSprite(state);
    }
  }
  startBehavior(state, behavior) {
    this.direction = behavior.direction;
    if (behavior.type === 'walk') {
      if (state.map.isSpaceTaken(this.x, this.y, this.direction)) {
        behavior.retry &&
          setTimeout(() => {
            this.startBehavior(state, behavior);
          }, 10);
        return;
      }
      state.map.moveWall(this.x, this.y, this.direction);
      this.movingProgressRemainging = 16;
      this.updateSprite(state);
    }
    if (behavior.type === 'stand') {
      this.isStanding = true;
      setTimeout(() => {
        utils.emitEvent('PersonStandingComplete', { whoId: this.id });
        this.isStanding = false;
      }, behavior.duration);
    }
  }
  updatePosition() {
    if (this.movingProgressRemainging > 0) {
      const [property, change] = this.directionUpdate[this.direction];
      this[property] += change;
      this.movingProgressRemainging -= 1;
      if (this.movingProgressRemainging === 0) {
        //Send the finished notification
        utils.emitEvent('PersonWalkingComplete', { whoId: this.id });
      }
    }
  }
  updateSprite() {
    if (this.movingProgressRemainging > 0) {
      this.sprite.setAnimation('walk-' + this.direction);
      return;
    }
    this.sprite.setAnimation('idle-' + this.direction);
  }
}
