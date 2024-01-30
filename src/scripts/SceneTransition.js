class SceneTransition {
  constructor() {
    this.element = null;
  }
  createElement() {
    this.element = document.createElement('div');
    this.element.classList.add('SceneTransition');
  }

  fadeout() {
    this.element.classList.add('fade-out');
    this.element.addEventListener(
      'animationend',
      () => {
        this.element.remove();
      },
      { once: true },
    );
  }

  init(container, callback) {
    console.log(container);
    this.createElement();
    container.appendChild(this.element);

    this.element.addEventListener(
      'animationend',
      () => {
        callback();
      },
      { once: true },
    );
  }
}
