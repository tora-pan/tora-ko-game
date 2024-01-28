class Person extends GameObject {
  constructor(config) {
    super(config);
    this.movingProgressRemainging = 0;
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
      if (this.isPlayerControlled && state.arrow) {
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
        return;
      }

      state.map.moveWall(this.x, this.y, this.direction);
      this.movingProgressRemainging = 16;
    }
  }
  updatePosition() {
    if (this.movingProgressRemainging > 0) {
      const [property, change] = this.directionUpdate[this.direction];
      this[property] += change;
      this.movingProgressRemainging -= 1;
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
