const { WSAEINVALIDPROCTABLE } = require('constants');
const { Rectangle } = require('pixi.js');

window.WebFontConfig = {
	google: {
		families: ['Roboto Mono'],
	},
};
let samplePlace = 0;
/* eslint-disable */
// include the web-font loader script
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
/* eslint-enabled */
const app = new PIXI.Application({
	backgroundColor: 0xd8d5bb,
	width: appWidth,
	height: appHeight,
});
let pixiDiv = document.getElementById('pixi');
pixiDiv.appendChild(app.view);

let ceiling = new PIXI.Graphics();
ceiling
	.beginFill(0xf4f5e7)
	.drawRect(0, 0, appWidth * 4, appWidth / 20)
	.endFill();
app.stage.addChild(ceiling);
let trim = new PIXI.Graphics();
trim
	.beginFill(0xb39b5f)
	.drawRect(0, ceiling.height, appWidth * 4, ceiling.height / 3)
	.endFill();
app.stage.addChild(trim);
let floor = new PIXI.Graphics();
floor
	.beginFill(0xb39b5f)
	.drawRect(0, appHeight - appHeight * 0.3, appWidth * 4, appWidth / 2)
	.endFill();

app.stage.addChild(floor);
let plantText = PIXI.Texture.from('/siteAssets/monstera-shadow.png');
let monstera = new PIXI.Sprite(plantText);
app.stage.addChild(monstera);
monstera.position.x = appWidth / 2 - 200;
let test = PIXI.Texture.from('/siteAssets/desk-color-scheme.png');
let desk = new PIXI.Sprite(test);
app.stage.addChild(desk);
desk.position.x = (appWidth / 2) * 3 - 300;

/****** About Me room *******/

let shelfTexture = PIXI.Texture.from('/siteAssets/shelf.png');
let leftShelf = new PIXI.Sprite(shelfTexture);
let rightShelf = new PIXI.Sprite(shelfTexture);
app.stage.addChild(leftShelf);
app.stage.addChild(rightShelf);
leftShelf.position.x = (appWidth / 4) * 9.25;
leftShelf.position.y = appHeight / 3;
rightShelf.position.x = (appWidth / 4) * 10.25;
rightShelf.position.y = (appHeight / 5) * 2;

/* Things on shelves */

/* Left Shelf */
let bfaText = PIXI.Texture.from('/siteAssets/bfa-book.png');
let bfaBook = new PIXI.Sprite(bfaText);
// krimson.scale.set(0.5, 0.5);
app.stage.addChild(bfaBook);
bfaBook.position.x = (appWidth / 4) * 9.25;
bfaBook.position.y = appHeight / 3;

// let krimTexture = PIXI.Texture.from('/siteAssets/krimson-queen.png');
// let krimson = new PIXI.Sprite(krimTexture);
// krimson.scale.set(0.5, 0.5);
// app.stage.addChild(krimson);
// krimson.position.x = (appWidth / 4) * 10.45;
// krimson.position.y = (appHeight / 5) * 1.3;

// let krimTexture = PIXI.Texture.from('/siteAssets/krimson-queen.png');
// let krimson = new PIXI.Sprite(krimTexture);
// krimson.scale.set(0.5, 0.5);
// app.stage.addChild(krimson);
// krimson.position.x = (appWidth / 4) * 10.45;
// krimson.position.y = (appHeight / 5) * 1.3;

/* Right Shelf */
// let krimTexture = PIXI.Texture.from('/siteAssets/krimson-queen.png');
// let krimson = new PIXI.Sprite(krimTexture);
// krimson.scale.set(0.5, 0.5);
// app.stage.addChild(krimson);
// krimson.position.x = (appWidth / 4) * 10.45;
// krimson.position.y = (appHeight / 5) * 1.3;

// let krimTexture = PIXI.Texture.from('/siteAssets/krimson-queen.png');
// let krimson = new PIXI.Sprite(krimTexture);
// krimson.scale.set(0.5, 0.5);
// app.stage.addChild(krimson);
// krimson.position.x = (appWidth / 4) * 10.45;
// krimson.position.y = (appHeight / 5) * 1.3;

let krimTexture = PIXI.Texture.from('/siteAssets/krimson-queen.png');
let krimson = new PIXI.Sprite(krimTexture);
krimson.scale.set(0.5, 0.5);
app.stage.addChild(krimson);
krimson.position.x = (appWidth / 4) * 10.45;
krimson.position.y = (appHeight / 5) * 1.3;

let sideTab = PIXI.Texture.from('/siteAssets/sideboard.png');
let sideboard = new PIXI.Sprite(sideTab);
app.stage.addChild(sideboard);
sideboard.position.x = (appWidth / 2) * 5 - 285;
sideboard.position.y = appHeight / 2;

let socialsText = PIXI.Texture.from('/siteAssets/socials-small-keys.png');
let chalkboard = new PIXI.Sprite(socialsText);
app.stage.addChild(chalkboard);
chalkboard.position.x = (appWidth / 2) * 7 - 300;

// function setup() {
// Map keys to actions
let left = keyboard('ArrowLeft'),
	up = keyboard('ArrowUp'),
	right = keyboard('ArrowRight'),
	down = keyboard('ArrowDown'),
	space = keyboard(' ' || 'Spacebar');

//Left arrow key `press` method
left.press = () => {
	if (app.stage.pivot.x >= appWidth) {
		app.stage.pivot.x -= appWidth;
	}
};

//Up
up.press = () => {};

//Right
right.press = () => {
	if (app.stage.pivot.x <= appWidth * 2) {
		app.stage.pivot.x += appWidth;
	}
};

//Down
down.press = () => {};
//spacebar
space.press = () => {};
space.release = () => {};

//Set the game state
state = play;

//Start the game loop
app.ticker.add((delta) => {
	gameLoop(delta);
});
// }
function onClick(object) {
	object.tint = 0x777ec7;
	reset();
}
function gameLoop(delta) {
	//Update the current game state:
	state(delta);
}

function play(delta) {
	//checks for changes
}

//keyboard events
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

	//Attach event listeners
	const downListener = key.downHandler.bind(key);
	const upListener = key.upHandler.bind(key);

	window.addEventListener('keydown', downListener, false);
	window.addEventListener('keyup', upListener, false);

	// Detach event listeners
	key.unsubscribe = () => {
		window.removeEventListener('keydown', downListener);
		window.removeEventListener('keyup', upListener);
	};

	return key;
}
