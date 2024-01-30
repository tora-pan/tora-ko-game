class KeyPressListener {
  constructor(keycode, callback) {
    let keysafe = true;
    this.keydownFunction = (e) => {
      if (e.keyCode === keycode && keysafe) {
        keysafe = false;
        callback();
      }
    };
    this.keyUpFunction = (e) => {
      if (e.keyCode === keycode) {
        keysafe = true;
      }
    };

    document.addEventListener('keydown', this.keydownFunction);
    document.addEventListener('keyup', this.keyUpFunction);
  }

  unbind() {
    document.removeEventListener('keydown', this.keydownFunction);
    document.removeEventListener('keyup', this.keyUpFunction);
  }
}
