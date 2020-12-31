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

export let appWidth = app.renderer.view.width;
export let appHeight = app.renderer.view.height;

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

/****** Background *******/

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

/****** Welcome room *******/

//for welcome component weather
export let windowWeather = new PIXI.Container();
app.stage.addChild(windowWeather);

//welcome view helper code

//welcome view scaling
let welcomeScale = {
	windows: 0.65,
	snake1: 0.8,
	snake2: 0.8,
	monstera: 0.8,
	maranta: 0.5,
	card: 0.85,
};
// if (appWidth < 400) {
// 	welcomeScale.windows = 0.5;
// 	welcomeScale.card = 0.5;
// 	welcomeScale.snake1 = 0.375;
// 	welcomeScale.snake2 = 0.375;
// 	welcomeScale.monstera = 0.375;
// 	welcomeScale.maranta = 0.375;
// } else if (appWidth < 500) {
// 	welcomeScale.windows = 0.5;
// 	welcomeScale.card = 0.5;
// 	welcomeScale.snake1 = 0.375;
// 	welcomeScale.snake2 = 0.375;
// 	welcomeScale.monstera = 0.375;
// 	welcomeScale.maranta = 0.375;
// }

//function to create welcome sprites
function createWelcomeSprite(x, y, texture, type) {
	const sprite = new Sprite(texture);
	app.stage.addChild(sprite);
	sprite.anchor.set(0.5);
	sprite.position.x = x;
	sprite.position.y = y;
	if (type === 'windows') {
		sprite.scale.set(welcomeScale.windows);
	} else if (type === 'snake1') {
		sprite.scale.set(welcomeScale.snake1);
	} else if (type === 'snake2') {
		sprite.scale.set(welcomeScale.snake2);
	} else if (type === 'monstera') {
		sprite.scale.set(welcomeScale.monstera);
	} else if (type === 'maranta') {
		sprite.scale.set(welcomeScale.maranta);
	} else if (type === 'card') {
		sprite.scale.set(welcomeScale.card);
	}
	return sprite;
}

//textures
const leftWindow = PIXI.Texture.from('/siteAssets/windowside.png');
const backWindow = PIXI.Texture.from('/siteAssets/window.png');
const helloCard = PIXI.Texture.from('/siteAssets/hello-sticker.png');
const snake1 = PIXI.Texture.from('/siteAssets/snakeplant-shadow.png');
const snake2 = PIXI.Texture.from('/siteAssets/snakeplant2-shadow.png');
const maranta = PIXI.Texture.from('/siteAssets/marantatest.png');
const monstera = PIXI.Texture.from('/siteAssets/monstera-shadow.png');

//sprites
let leftWindowSprite = createWelcomeSprite(
	appWidth / 7.5,
	appHeight / 2.4,
	leftWindow,
	'windows'
);

leftWindowSprite.height = 480;

//app.stage.addChild(leftWindowSprite);

let backWindowSprite = createWelcomeSprite(
	appWidth / 2.5,
	appHeight / 3.4,
	backWindow,
	'windows'
);

backWindowSprite.width = 600;
backWindowSprite.height = 300;

//app.stage.addChild(backWindowSprite);

let helloCardSprite = createWelcomeSprite(
	appWidth / 1.5,
	appHeight / 1.4,
	helloCard,
	'card'
);
//app.stage.addChild(helloCardSprite);

let snakeTwoSprite = createWelcomeSprite(
	appWidth / 4.7,
	appHeight / 2.2,
	snake2,
	'snake2'
);
//app.stage.addChild(snakeTwoSprite);

let snakeOneSprite = createWelcomeSprite(
	appWidth / 3.7,
	appHeight / 1.8,
	snake1,
	'snake1'
);
//app.stage.addChild(snakeOneSprite);

let marantaSprite = createWelcomeSprite(
	appWidth / 1.7,
	appHeight / 4.2,
	maranta,
	'maranta'
);
//app.stage.addChild(marantaSprite);

let monsteraShadowSprite = createWelcomeSprite(
	appWidth / 6,
	appHeight / 1.3,
	monstera,
	'monstera'
);
//app.stage.addChild(monsteraShadowSprite);

//Project view helper code

//project view scaling
let scale = { projects: 0.5, desk: 1 };
if (appWidth < 400) {
	scale.projects = 0.25;
	scale.desk = 0.5;
} else if (appWidth < 500) {
	console.log('inside');
	scale.projects = 0.3;
	scale.desk = 0.7;
}

//function to create project sprites
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

/****** Project room *******/

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

let socialsText = PIXI.Texture.from('/siteAssets/socials-board-nk.png');
let chalkboard = new PIXI.Sprite(socialsText);
app.stage.addChild(chalkboard);
chalkboard.position.x = (window.innerWidth / 2) * 7 - 300;

export let popUps = new PIXI.Container();
app.stage.addChild(popUps);

// console.log(Project);
// console.log(promiseHS.on);
// console.log(promiseHS);
// console.log(app);
