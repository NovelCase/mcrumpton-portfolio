const { Sprite } = require('pixi.js');
const PIXI = require('pixi.js');
const Project = require('../client/ProjectView');

const app = new PIXI.Application({
	transparent: false,
	resizeTo: window,
});

app.renderer.backgroundColor = 0xd8d5bb;
let pixiDiv = document.getElementById('pixi');
pixiDiv.appendChild(app.view);

let appWidth = app.renderer.view.width;
let appHeight = app.renderer.view.height;

let left = keyboard('ArrowLeft'),
	up = keyboard('ArrowUp'),
	right = keyboard('ArrowRight'),
	down = keyboard('ArrowDown'),
	space = keyboard(' ' || 'Spacebar');

//Left arrow key `press` method
left.press = () => {
	if (app.stage.pivot.x >= window.innerWidth) {
		app.stage.pivot.x -= window.innerWidth;
	}
};
//Up
up.press = () => {};
//Right
right.press = () => {
	if (app.stage.pivot.x <= window.innerWidth * 2) {
		app.stage.pivot.x += window.innerWidth;
	}
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

let ceiling = new PIXI.Graphics();
ceiling
	.beginFill(0xf4f5e7)
	.drawRect(0, 0, appWidth * 4, appHeight / 20)
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
	.drawRect(0, appHeight - appHeight * 0.3, appWidth * 4, appHeight / 2)
	.endFill();
app.stage.addChild(floor);

let scale = { projects: 0.5, desk: 1 };
if (appWidth < 400) {
	scale.projects = 0.25;
	scale.desk = 0.5;
} else if (appWidth < 500) {
	console.log('inside');
	scale.projects = 0.3;
	scale.desk = 0.7;
}

function createSprite(x, y, texture, type) {
	const sprite = new Sprite(texture);
	app.stage.addChild(sprite);
	sprite.anchor.set(0.5);
	sprite.position.x = x;
	sprite.position.y = y;
	if (type === 'desk') {
		sprite.scale.set(scale.desk);
	} else {
		sprite.scale.set(scale.projects);
		sprite.interactive = true;
		sprite.buttonMode = true;
	}
	return sprite;
}

const deskTexture = PIXI.Texture.from('/siteAssets/desk-color-scheme.png');
const chaiTexture = PIXI.Texture.from('/siteAssets/chaiNoon.png');
const barkTexture = PIXI.Texture.from('/siteAssets/gobARk.png');
const promiseTexture = PIXI.Texture.from('siteAssets/promiseHS.png');

let desk = createSprite(
	(appWidth / 2) * 3,
	(appHeight / 4) * 2.6,
	deskTexture,
	'desk'
);

let chai = createSprite(
	(appWidth / 5) * 6,
	appHeight / 3,
	chaiTexture,
	'project'
);
chai.on('mouseover', () => (chai.tint = 0x007ec7));
chai.on('mouseout', () => (chai.tint = 0xffffff));

let gobARk = createSprite(
	(appWidth / 4) * 6,
	appHeight / 4,
	barkTexture,
	'project'
);
gobARk.on('mouseover', () => (gobARk.tint = 0x007ec7));
gobARk.on('mouseout', () => (gobARk.tint = 0xffffff));

let promiseHS = createSprite(
	(appWidth / 4) * 7.2,
	appHeight / 3,
	promiseTexture,
	'project'
);

promiseHS.on('mouseover', () => (promiseHS.tint = 0x007ec7));
promiseHS.on('mouseout', () => (promiseHS.tint = 0xffffff));
promiseHS.on('click', () => Project.onClick('promise'));

/****** About Me room *******/

let shelfTexture = PIXI.Texture.from('/siteAssets/shelf.png');
let leftShelf = new PIXI.Sprite(shelfTexture);
let rightShelf = new PIXI.Sprite(shelfTexture);
app.stage.addChild(leftShelf);
app.stage.addChild(rightShelf);
leftShelf.position.x = (window.innerWidth / 4) * 9.25;
leftShelf.position.y = window.innerHeight / 3;
rightShelf.position.x = (window.innerWidth / 4) * 10.25;
rightShelf.position.y = (window.innerHeight / 5) * 2;

/* Things on shelves */

/* Left Shelf */
let bfaText = PIXI.Texture.from('/siteAssets/bfa-book.png');
let bfaBook = new PIXI.Sprite(bfaText);
// krimson.scale.set(0.5, 0.5);
app.stage.addChild(bfaBook);
bfaBook.position.x = (window.innerWidth / 4) * 9.25;
bfaBook.position.y = window.innerHeight / 3;

// let krimTexture = PIXI.Texture.from('/siteAssets/krimson-queen.png');
// let krimson = new PIXI.Sprite(krimTexture);
// krimson.scale.set(0.5, 0.5);
// app.stage.addChild(krimson);
// krimson.position.x = (window.innerWidth / 4) * 10.45;
// krimson.position.y = (window.innerHeight / 5) * 1.3;

// let krimTexture = PIXI.Texture.from('/siteAssets/krimson-queen.png');
// let krimson = new PIXI.Sprite(krimTexture);
// krimson.scale.set(0.5, 0.5);
// app.stage.addChild(krimson);
// krimson.position.x = (window.innerWidth / 4) * 10.45;
// krimson.position.y = (window.innerHeight / 5) * 1.3;

/* Right Shelf */
// let krimTexture = PIXI.Texture.from('/siteAssets/krimson-queen.png');
// let krimson = new PIXI.Sprite(krimTexture);
// krimson.scale.set(0.5, 0.5);
// app.stage.addChild(krimson);
// krimson.position.x = (window.innerWidth / 4) * 10.45;
// krimson.position.y = (window.innerHeight / 5) * 1.3;

// let krimTexture = PIXI.Texture.from('/siteAssets/krimson-queen.png');
// let krimson = new PIXI.Sprite(krimTexture);
// krimson.scale.set(0.5, 0.5);
// app.stage.addChild(krimson);
// krimson.position.x = (window.innerWidth / 4) * 10.45;
// krimson.position.y = (window.innerHeight / 5) * 1.3;

let krimTexture = PIXI.Texture.from('/siteAssets/krimson-queen.png');
let krimson = new PIXI.Sprite(krimTexture);
krimson.scale.set(0.5, 0.5);
app.stage.addChild(krimson);
krimson.position.x = (window.innerWidth / 4) * 10.45;
krimson.position.y = (window.innerHeight / 5) * 1.3;

let sideTab = PIXI.Texture.from('/siteAssets/sideboard.png');
let sideboard = new PIXI.Sprite(sideTab);
app.stage.addChild(sideboard);
sideboard.position.x = (window.innerWidth / 2) * 5 - 285;
sideboard.position.y = window.innerHeight / 2;

let socialsText = PIXI.Texture.from('/siteAssets/socials-small-keys.png');
let chalkboard = new PIXI.Sprite(socialsText);
app.stage.addChild(chalkboard);
chalkboard.position.x = (window.innerWidth / 2) * 7 - 300;

export let popUps = new PIXI.Container();
app.stage.addChild(popUps);

// console.log(Project);
// console.log(promiseHS.on);
// console.log(promiseHS);
// console.log(app);
