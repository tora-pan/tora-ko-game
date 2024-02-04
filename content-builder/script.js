const canvas = document.querySelector('canvas');
const tilesetContainer = document.querySelector('.tileset-container');
const tilesetSelector = document.querySelector('.tileset-container_selection');
const tilesetImage1 = document.querySelector('#tileset-source1');

let selection = [0, 0]; // which tile to paint from the menu
let currentLayer = 0; // which layer we are curently painting on

// Structure is "x-y": ["tileset_x", "tileset_y"]
// Example "1-1": [3, 4]
// This means that the tile at 1,1 is at 3,4 in the tileset
let layers = [
  //bottom
  {},
  //middle
  {},
  //top
  {},
];

const exportImage = () => {
  let data = canvas.toDataURL();
  let link = document.createElement('a');
  link.href = data;
  link.download = 'background.png';
  let event = new MouseEvent('click');
  link.dispatchEvent(event);
};

const clearCanvas = () => {
  layers = [{}, {}, {}];
  draw();
};

const exportButton = document.querySelector('.primary-button');
const clearButton = document.querySelector('#clear');
exportButton.addEventListener('click', exportImage);
clearButton.addEventListener('click', clearCanvas);

// clicking
const getCoords = (e) => {
  const { x, y } = e.target.getBoundingClientRect();
  const mouseX = e.clientX - x;
  const mouseY = e.clientY - y;
  return [Math.floor(mouseX / 32), Math.floor(mouseY / 32)];
};

tilesetContainer.addEventListener('mousedown', (e) => {
  selection = getCoords(e);
  tilesetSelector.style.left = selection[0] * 32 + 'px';
  tilesetSelector.style.top = selection[1] * 32 + 'px';
});

const addTile = (e) => {
  const [x, y] = getCoords(e);
  layers[currentLayer][`${x}-${y}`] = selection;
  if (e.shiftKey) {
    delete layers[currentLayer][`${x}-${y}`];
  }
  draw();
};

const setLayer = (item) => {
  currentLayer = item.getAttribute('data-layer');
  const layers = document.querySelectorAll('.layer');
  layers.forEach((layer) => {
    layer.innerHTML === item.innerHTML
      ? layer.classList.add('active')
      : layer.classList.remove('active');
  });
};

let isMouseDown = false;
canvas.addEventListener('mousedown', (e) => {
  isMouseDown = true;
});
canvas.addEventListener('mouseup', () => {
  isMouseDown = false;
});
canvas.addEventListener('mouseleave', (e) => {
  isMouseDown = false;
});
canvas.addEventListener('mousedown', addTile);
canvas.addEventListener('mousemove', (e) => {
  if (isMouseDown) {
    addTile(e);
  }
});

// drawing
const draw = () => {
  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const sizeOfCrop = 32;

  layers.forEach((layer) => {
    Object.keys(layer).forEach((key) => {
      const [x, y] = key.split('-').map((v) => Number(v));
      const [tilesetX, tilesetY] = layer[key];

      ctx.drawImage(
        tilesetImage1, //tilesheet
        tilesetX * sizeOfCrop, //tilesheet x
        tilesetY * sizeOfCrop, //tilesheet y
        sizeOfCrop, //how big width
        sizeOfCrop, //how big height
        x * sizeOfCrop, //where to place on right
        y * sizeOfCrop, //where to place on right
        sizeOfCrop, //how big width
        sizeOfCrop, //how big height
      );
    });
  });
};

tilesetImage1.onload = function () {
  draw();
  currentLayer = 0;
};

tilesetImage1.src = './assets/sprites/Tilesets/sprite32x32.png';
