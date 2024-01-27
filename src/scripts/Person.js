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
    this.updatePosition();
    if (
      this.isPlayerControlled &&
      this.movingProgressRemainging === 0 &&
      state.arrow
    ) {
      this.direction = state.arrow;
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
}
