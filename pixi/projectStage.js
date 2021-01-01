const { Sprite } = require('pixi.js');
const PIXI = require('pixi.js');
const Project = require('../client/ProjectView');
// ? for iframe?
import React from 'react';

const app = new PIXI.Application({
	transparent: false,
	resizeTo: window,
});

app.renderer.backgroundColor = 0xd8d5bb;
let pixiDiv = document.getElementById('pixi');
pixiDiv.appendChild(app.view);

export const appWidth = app.renderer.view.width;
export const appHeight = app.renderer.view.height;

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
	let currCorr = window.pageYOffset;
	onmousewheel = (event) => {
		event.preventDefault();
		console.log(currCorr, window.pageYOffset);
		if (window.pageYOffset > currCorr) {
			left.press();
		} else if (window.pageYOffset < currCorr) {
			right.press();
		}
		currCorr = window.pageYOffset;
		console.log(currCorr, window.pageYOffset);
	};

	//Attach event listeners
	const downListener = key.downHandler.bind(key);
	const upListener = key.upHandler.bind(key);

	window.addEventListener('keydown', downListener, false);
	window.addEventListener('keyup', upListener, false);
	window.addEventListener('onmousewheel', onmousewheel, false);

	// Detach event listeners
	key.unsubscribe = () => {
		window.removeEventListener('keydown', downListener);
		window.removeEventListener('keyup', upListener);
		window.removeEventListener('onscroll', onscroll, false);
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
if (appWidth < 400) {
	welcomeScale.windows = 0.325;
	welcomeScale.card = 0.425;
	welcomeScale.snake1 = 0.4;
	welcomeScale.snake2 = 0.4;
	welcomeScale.monstera = 0.4;
	welcomeScale.maranta = 0.25;
} else if (appWidth < 500) {
	welcomeScale.windows = 0.455;
	welcomeScale.card = 0.595;
	welcomeScale.snake1 = 0.56;
	welcomeScale.snake2 = 0.56;
	welcomeScale.monstera = 0.56;
	welcomeScale.maranta = 0.35;
}

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

let backWindowSprite = createWelcomeSprite(
	appWidth / 2.5,
	appHeight / 3.4,
	backWindow,
	'windows'
);

backWindowSprite.width = 600;
backWindowSprite.height = 300;

let helloCardSprite = createWelcomeSprite(
	appWidth / 1.5,
	appHeight / 1.4,
	helloCard,
	'card'
);

let snakeTwoSprite = createWelcomeSprite(
	appWidth / 4.7,
	appHeight / 2.2,
	snake2,
	'snake2'
);

let snakeOneSprite = createWelcomeSprite(
	appWidth / 3.7,
	appHeight / 1.8,
	snake1,
	'snake1'
);

let marantaSprite = createWelcomeSprite(
	appWidth / 1.7,
	appHeight / 4.2,
	maranta,
	'maranta'
);

let monsteraShadowSprite = createWelcomeSprite(
	appWidth / 6,
	appHeight / 1.3,
	monstera,
	'monstera'
);

//Project view helper code

//project view scaling
let scale = { projects: 0.5, desk: 1, book: 1 };
if (appWidth < 400) {
	scale.projects = 0.25;
	scale.desk = 0.5;
	scale.book = 0.6;
} else if (appWidth < 500) {
	console.log('inside');
	scale.projects = 0.3;
	scale.desk = 0.7;
	scale.book = 0.6;
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
	} else if (type === 'book') {
		sprite.scale.set(scale.book);
		sprite.interactive = true;
		sprite.buttonMode = true;
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

export let chai = createSprite(
	(appWidth / 5) * 6,
	appHeight / 3,
	chaiTexture,
	'project'
);
chai.on('mouseover', () => (chai.tint = 0x007ec7));
chai.on('mouseout', () => (chai.tint = 0xffffff));
chai.on('click', () => {
	Project.onClick('project', 'chai', 'promiseHS', 'gobARk');
	gobARk.interactive = false;
	promiseHS.interactive = false;
});

export let gobARk = createSprite(
	(appWidth / 4) * 6,
	appHeight / 4,
	barkTexture,
	'project'
);
gobARk.on('mouseover', () => (gobARk.tint = 0x007ec7));
gobARk.on('mouseout', () => (gobARk.tint = 0xffffff));
gobARk.on('click', () => {
	Project.onClick('project', 'gobARk', 'promiseHS', 'chai');
	promiseHS.interactive = false;
	chai.interactive = false;
});

export let promiseHS = createSprite(
	(appWidth / 4) * 7.2,
	appHeight / 3,
	promiseTexture,
	'project'
);

promiseHS.on('mouseover', () => (promiseHS.tint = 0x007ec7));
promiseHS.on('mouseout', () => (promiseHS.tint = 0xffffff));
promiseHS.on('click', () => {
	Project.onClick('project', 'promise', 'gobARk', 'chai');
	gobARk.interactive = false;
	chai.interactive = false;
});

/****** About Me room *******/

let shelfTexture = PIXI.Texture.from('/siteAssets/shelf.png');
let leftShelf = createSprite(
	(appWidth / 4) * (9 + scale.book / 2),
	appHeight / 3 + 10,
	shelfTexture,
	'book'
);
let rightShelf = createSprite(
	(appWidth / 4) * (11 - scale.book / 2),
	(appHeight / 5) * 2,
	shelfTexture,
	'book'
);

/* Things on shelves */

/* Left Shelf */
let bfaText = PIXI.Texture.from('/siteAssets/bfa-book.png');
let bfa = createSprite(
	(appWidth / 4) * (9 + scale.book / 2),
	appHeight / 3,
	bfaText,
	'book'
);
bfa.on('mouseover', () => (bfa.tint = 0xaf0000));
bfa.on('mouseout', () => (bfa.tint = 0xffffff));
bfa.on('click', () => Project.onClick('about', 'bfa'));

let convoText = PIXI.Texture.from('/siteAssets/convowfear.png');
let convo = createSprite(
	(appWidth / 4) * (9.05 + scale.book / 2),
	appHeight / 3 - 10 * scale.book,
	convoText,
	'book'
);
convo.on('mouseover', () => (convo.tint = 0x007ec7));
convo.on('mouseout', () => (convo.tint = 0xffffff));
convo.on('click', () => Project.onClick('about', 'convo'));

let blueText = PIXI.Texture.from('/siteAssets/blue-book.png');
let blueOcean = createSprite(
	(appWidth / 4) * (9.05 + scale.book / 2) + 5,
	appHeight / 3 - 25 * scale.book,
	blueText,
	'book'
);
blueOcean.on('mouseover', () => (blueOcean.tint = 0x007ec7));
blueOcean.on('mouseout', () => (blueOcean.tint = 0xffffff));
blueOcean.on('click', () => Project.onClick('about', 'blueOcean'));

/* Right Shelf */
let presText = PIXI.Texture.from('/siteAssets/vertbook.png');
let presence = createSprite(
	(appWidth / 4) * (10.82 - scale.book / 2),
	(appHeight / 5) * 2 - 40 * scale.book,
	presText,
	'book'
);
presence.on('mouseover', () => (presence.tint = 0x007ec7));
presence.on('mouseout', () => (presence.tint = 0xffffff));
presence.on('click', () => Project.onClick('about', 'presence'));

let krimTexture = PIXI.Texture.from('/siteAssets/krimson-queen.png');
let krimson = createSprite(
	(appWidth / 4) * (11.2 - scale.book / 2),
	(appHeight / 5) * 2 - 50 * scale.book,
	krimTexture,
	'plant'
);
krimson.on('mouseover', () => (krimson.tint = 0x007ec7));
krimson.on('mouseout', () => (krimson.tint = 0xffffff));
krimson.on('click', () => Project.onClick('about', 'plant'));

let sideTab = PIXI.Texture.from('/siteAssets/sideboard.png');
let sideboard = createSprite(
	(appWidth / 2) * 5,
	(appHeight / 4) * 2.6,
	sideTab,
	'desk'
);

let goatText = PIXI.Texture.from('/siteAssets/goat.png');
let goat = createSprite(
	(appWidth / 2) * 5 - scale.projects * 140,
	(appHeight / 4) * 2 + scale.projects * 90,
	goatText,
	'coffee'
);
goat.on('mouseover', () => (goat.tint = 0x007ec7));
goat.on('mouseout', () => (goat.tint = 0xffffff));
goat.on('click', () => Project.onClick('about', 'coffee'));
let felText = PIXI.Texture.from('/siteAssets/stagg.png');
let stagg = createSprite(
	(appWidth / 2) * 5 + scale.projects * 150,
	(appHeight / 4) * 2 + scale.projects * 100,
	felText,
	'coffee'
);
stagg.on('mouseover', () => (stagg.tint = 0x007ec7));
stagg.on('mouseout', () => (stagg.tint = 0xffffff));
stagg.on('click', () => Project.onClick('about', 'coffee'));

let socialsText = PIXI.Texture.from('/siteAssets/socials-board-nk.png');
let chalkboard = new PIXI.Sprite(socialsText);
app.stage.addChild(chalkboard);
chalkboard.position.x = (appWidth / 2) * 7 - 300;

/* Pop Ups */
export let popUps = new PIXI.Container();
app.stage.addChild(popUps);

export let text = new PIXI.Container();
app.stage.addChild(text);

export let spotifyPixi = new PIXI.Container();
app.stage.addChild(spotifyPixi);
