const utils = {
  withGrid(n) {
    return n * 16;
  },
  asGridCoord(x, y) {
    return `${x * 16},${y * 16}`;
  },
  getNextPostion(initialX, initialY, direction) {
    let x = initialX;
    let y = initialY;
    const size = 16;
    if (direction === 'up') {
      y -= size;
    }
    if (direction === 'down') {
      y += size;
    }
    if (direction === 'left') {
      x -= size;
    }
    if (direction === 'right') {
      x += size;
    }
    return { x, y };
  },
  emitEvent(name, detail) {
    const event = new CustomEvent(name, { detail });
    document.dispatchEvent(event);
  },
  getOppositeDirection(heroDirection) {
    if (heroDirection === 'up') {
      return 'down';
    }
    if (heroDirection === 'down') {
      return 'up';
    }
    if (heroDirection === 'left') {
      return 'right';
    }
    if (heroDirection === 'right') {
      return 'left';
    }
    return null;
  }
};
