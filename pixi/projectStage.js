const PIXI = require('pixi.js');
const Hammer = require('hammerjs');
var _ = require('lodash');

window.WebFontConfig = {
  google: {
    families: ['Cutive'],
  },
};
(function () {
  const wf = document.createElement('script');
  wf.src = `${
    document.location.protocol === 'https:' ? 'https' : 'http'
  }://ajax.googleapis.com/ajax/libs/webfont/1/webfont.js`;
  wf.type = 'text/javascript';
  wf.async = 'true';
  const s = document.getElementsByTagName('script')[0];
  s.parentNode.insertBefore(wf, s);
})();

export const app = new PIXI.Application({
  transparent: false,
  resizeTo: window,
});

app.renderer.backgroundColor = 0x1b1c2b;
let pixiDiv = document.getElementById('pixi');
pixiDiv.appendChild(app.view);
app.renderer.view.draggable = true;

export let firstView = app.stage.pivot.y;
export const secondView = app.renderer.view.height;
export const thirdView = secondView * 2;
export const fourthView = secondView * 3;

export let noScroll = { lanternScrolling: true, projectScrolling: true };

let up = keyboard('ArrowUp'),
  down = keyboard('ArrowDown');

//Left arrow key `press` method
up.press = () => {
  if (app.stage.pivot.y >= app.renderer.view.height) {
    app.stage.pivot.y =
      Math.floor(app.stage.pivot.y / app.renderer.view.height) *
        app.renderer.view.height -
      app.renderer.view.height;
  } else app.stage.pivot.y = 0;
  menuContainer.position.y = app.stage.pivot.y + 10;
};

//Right
down.press = () => {
  if (app.stage.pivot.y <= app.renderer.view.height * 2) {
    app.stage.pivot.y =
      Math.floor(app.stage.pivot.y / app.renderer.view.height) *
        app.renderer.view.height +
      app.renderer.view.height;
  } else app.stage.pivot.y = 3 * app.renderer.view.height;
  menuContainer.position.y = app.stage.pivot.y + 10;
};

function keyboard(value) {
  let key = {};
  key.value = value;
  key.isDown = false;
  key.isUp = true;
  key.press = undefined;
  key.release = undefined;
  //The `downHandler`
  key.downHandler = (event) => {
    if (event.key === key.value) {
      if (key.isUp && key.press) key.press();
      key.isDown = true;
      key.isUp = false;
      event.preventDefault();
    }
  };

  //The `upHandler`
  key.upHandler = (event) => {
    if (event.key === key.value) {
      if (key.isDown && key.release) key.release();
      key.isDown = false;
      key.isUp = true;
      event.preventDefault();
    }
  };

  onwheel = (event) => {
    if (!noScroll.projectScrolling) {
      app.stage.pivot.y = app.renderer.view.height * 2;
    } else if (!noScroll.lanternScrolling) {
      app.stage.pivot.y = secondView;
    } else if (
      //don't scroll any further (top of page)
      app.stage.pivot.y < 0 ||
      app.stage.pivot.y + (event.deltaY * 1.3 || event.deltaX * 1.3) < 0
    ) {
      app.stage.pivot.y = 0;
    } else if (
      //don't scroll any further (bottom of page)
      app.stage.pivot.y > app.renderer.view.height * 3 ||
      app.stage.pivot.y + (event.deltaY * 1.3 || event.deltaX * 1.3) >
        app.renderer.view.height * 3
    ) {
      app.stage.pivot.y = app.renderer.view.height * 3;
    } else {
      //keep scrolling
      app.stage.pivot.y += event.deltaY * 1.5 || event.deltaX * 1.5;
    }
    menuContainer.position.y = app.stage.pivot.y + 10;
  };

  // Attach event listeners
  const downListener = key.downHandler.bind(key);
  const upListener = key.upHandler.bind(key);

  window.addEventListener('keydown', downListener, false);
  window.addEventListener('keyup', upListener, false);
  window.addEventListener('wheel', _.throttle(onwheel, 0), false);

  let hammertime = new Hammer(app.view);
  let Pan = new Hammer.Pan();
  Pan.set({ direction: Hammer.DIRECTION_VERTICAL });
  hammertime.add(Pan);
  hammertime.on('pan', _.throttle(onwheel, 0));

  // Detach event listeners
  key.unsubscribe = () => {
    window.removeEventListener('keydown', downListener);
    window.removeEventListener('keyup', upListener);
    window.removeEventListener('wheel', _.throttle(onwheel, 0), false);
  };

  return key;
}

function createGradTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = app.renderer.view.width;
  canvas.height = app.renderer.view.height;

  const ctx = canvas.getContext('2d');

  const grd = ctx.createLinearGradient(0, 0, 0, canvas.height);
  grd.addColorStop(0, '#15112d');
  grd.addColorStop(0.4, '#231C49');
  grd.addColorStop(0.58, '#413970');
  grd.addColorStop(0.78, '#426783');

  ctx.fillStyle = grd;
  ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);

  return PIXI.Texture.from(canvas);
}

const gradTexture = createGradTexture();

const background = new PIXI.Sprite(gradTexture);
background.position.set(0, 0);
background.width = app.renderer.view.width;
background.height = app.renderer.view.height * 4;
app.stage.addChild(background);

/* Containers */
const megaContainer = new PIXI.Container();
app.stage.addChild(megaContainer);

export const marigoldView = new PIXI.Container();
megaContainer.addChild(marigoldView);

export const lanternView = new PIXI.Container();
megaContainer.addChild(lanternView);

export const projectView = new PIXI.Container();
megaContainer.addChild(projectView);

export const finalView = new PIXI.Container();
megaContainer.addChild(finalView);

export const menuContainer = new PIXI.Container();
megaContainer.addChild(menuContainer);

menuContainer.position.x = 10;
menuContainer.position.y = 10;

/* resize - web resposive */
window.addEventListener('resize', resize);

/* for scaling adjustment not on refresh */
function resize() {
  let widthDiff = window.innerWidth - app.renderer.view.width;
  let heightDiff = window.innerHeight - app.renderer.view.height;
  let method = 'add';
  if (window.innerWidth < app.renderer.view.width) {
    method = 'subtract';
    widthDiff = app.renderer.view.width - window.innerWidth;
    heightDiff = app.renderer.view.height - window.innerHeight;
  }
  app.renderer.resize(window.innerWidth, window.innerHeight);
  app.stage.children.forEach((child, idx) => {
    if (method === 'add') {
      child.width += widthDiff;
      child.height += heightDiff;
    } else {
      child.width -= widthDiff;
      child.height -= heightDiff;
    }
  });
}
