import React from 'react';
import * as PixiApp from '../pixi/projectStage.js';
import * as PIXI from 'pixi.js';
import { data } from '../data';

export const onClick = () => {};

let scales = {
	lantern: 1.1,
	grass: 0.75,
	book: 0.7,
	teapot: 0.7,
	nintendoSwitch: 0.7,
	ipad: 0.7,
	souls: 0.6,
};

let roomWidth = 4.5;

let descriptionStyle = {
	fontFamily: 'Nunito Sans',
	fontSize: 23,
	fontWeight: '300',
	lineHeight: window.innerHeight / 2 / 16,
	wordWrap: true,
	wordWrapWidth: (window.innerWidth / 2 / 4) * 3,
};

export default class LanternView extends React.Component {
	createSprite(x, y, texture, type, interactive) {
		const sprite = new PIXI.Sprite(texture);
		PixiApp.lanternView.addChild(sprite);
		sprite.anchor.set(0.5);
		sprite.position.x = x;
		sprite.position.y = y;
		sprite.scale.set(scales[type]);
		if (type === 'lantern') sprite.width = PixiApp.app.renderer.view.width;
		else if (interactive) {
			sprite.interactive = true;
			sprite.buttonMode = true;
		}
		return sprite;
	}

	createPopUpRect(x, y, type) {
		let width = window.innerWidth / 2;
		let height = window.innerHeight / 2;
		// if (window.innerWidth < 400 && type === 'marigold') {
		// 	width = window.innerWidth;
		// 	height = window.innerHeight / 4;
		// 	x = window.innerWidth;
		// 	y = (window.innerHeight / 2) * 0.2;
		// } else if (window.innerWidth < 400) {
		// 	width = window.innerWidth;
		// 	height = window.innerHeight / 4;
		// 	x = window.innerWidth * 2;
		// 	y = (window.innerHeight / 2) * 0.2;
		// }
		const rect = new PIXI.Graphics();
		rect.beginFill(0xf4f5e7).drawRoundedRect(x, y, width, height, 20).endFill();
		rect.visible = false;
		PixiApp.lanternView.addChild(rect);
		return rect;
	}

	createBlackCircle(x, y) {
		let closeSize = { x: x + 20, y: y + 16, radius: 12 };
		// if (window.innerWidth < 400) {
		// 	x = (window.innerWidth / 2) * 2.2;
		// 	y = (window.innerHeight / 4) * 0.6;
		// 	// } else if (window.innerWidth < 400) {
		// 	// 	x = (window.innerWidth / 2) * 4.2;
		// 	// 	y = (window.innerHeight / 4) * 0.6;
		// }
		const close = new PIXI.Graphics();
		close
			.beginFill(0x000000)
			.drawCircle(closeSize.x, closeSize.y, closeSize.radius)
			.endFill();
		close.visible = false; //set to false when I have click functionality
		close.interactive = true;
		close.buttonMode = true;
		PixiApp.lanternView.addChild(close);
		return close;
	}

	createText(words, style, x, y) {
		const styleTwo = { ...style };
		// if (window.innerWidth < 400 && type.includes('project')) {
		//   smallProject[type].x
		//     ? (x = smallProject[type].x)
		//     : (x = (window.innerWidth / 2) * 2.2);
		//   smallProject[type].y
		//     ? (y = smallProject[type].y)
		//     : (y = (window.innerHeight / 4) * 2.95);
		//   styleTwo.fontSize = styleTwo.fontSize - 5;
		// } else if (window.innerWidth < 400) {
		//   smallProject[type].x
		//     ? (x = smallProject[type].x)
		//     : (x = (window.innerWidth / 2) * 4.2);
		//   smallProject[type].y
		//     ? (y = smallProject[type].y)
		//     : (y = (window.innerHeight / 4) * 2.95);
		//   styleTwo.fontSize = styleTwo.fontSize - 5;
		// }
		const text = new PIXI.Text(words, styleTwo);
		text.visible = false;
		text.position.x = x;
		text.position.y = y;
		// if (interactive) {
		//   text.interactive = true;
		//   text.buttonMode = true;
		// }
		PixiApp.lanternView.addChild(text);
		return text;
	}

	componentDidMount() {
		/* textures */
		const lanternsTexture = PIXI.Texture.from(
			'siteAssets/marigoldView/lanternsLittleGlowEdit.png'
		);
		const grassTexture = PIXI.Texture.from('siteAssets/lanternView/grass.png');
		const soulTexture = PIXI.Texture.from('siteAssets/lanternView/souls.png');
		const bookTexture = PIXI.Texture.from('siteAssets/lanternView/book.png');
		const ipadTexture = PIXI.Texture.from('siteAssets/lanternView/ipad.png');
		const nintendoTexture = PIXI.Texture.from(
			'siteAssets/lanternView/nintendoSwitch.png'
		);
		const teaTexture = PIXI.Texture.from('siteAssets/lanternView/teapot.png');

		const lanterns = this.createSprite(
			PixiApp.app.renderer.view.width / 2,
			(PixiApp.app.renderer.view.height / 2) *
				2.8 /* (PixiApp.app.renderer.view.height / 2) * 3.256 */,
			lanternsTexture,
			'lantern'
		);

		const book = this.createSprite(
			(PixiApp.app.renderer.view.width / 4) * 0.65,
			(PixiApp.app.renderer.view.height / 2) * 2.9,
			bookTexture,
			'book',
			true
		);

		book.on('pointertap', () => {
			popUpBook.visible = true;
			teapot.interactive = false;
			teapot.buttonMode = false;
			nintendoSwitch.interactive = false;
			nintendoSwitch.buttonMode = false;
			ipad.interactive = false;
			ipad.buttonMode = false;
			book.interactive = false;
			book.buttonMode = false;
			blackCircleBook.visible = true;
			bookText.visible = true;
			PixiApp.app.stage.pivot.y = PixiApp.secondView;
		});

		const teapot = this.createSprite(
			(PixiApp.app.renderer.view.width / 4) * 0.94,
			(PixiApp.app.renderer.view.height / 2) * 3.27,
			teaTexture,
			'teapot',
			true
		);

		teapot.on('pointertap', () => {
			popUpTeapot.visible = true;
			book.interactive = false;
			book.buttonMode = false;
			nintendoSwitch.interactive = false;
			nintendoSwitch.buttonMode = false;
			ipad.interactive = false;
			ipad.buttonMode = false;
			teapot.interactive = false;
			teapot.buttonMode = false;
			blackCircleTeapot.visible = true;
			teapotText.visible = true;
			PixiApp.app.stage.pivot.y = PixiApp.secondView;
		});

		const nintendoSwitch = this.createSprite(
			(PixiApp.app.renderer.view.width / 4) * 2.9,
			(PixiApp.app.renderer.view.height / 2) * 3.28,
			nintendoTexture,
			'nintendoSwitch',
			true
		);

		nintendoSwitch.on('pointertap', () => {
			popUpNintendo.visible = true;
			teapot.interactive = false;
			teapot.buttonMode = false;
			book.interactive = false;
			book.buttonMode = false;
			ipad.interactive = false;
			ipad.buttonMode = false;
			nintendoSwitch.interactive = false;
			nintendoSwitch.buttonMode = false;
			blackCircleNintendo.visible = true;
			nintendoText.visible = true;
			PixiApp.app.stage.pivot.y = PixiApp.secondView;
		});

		const ipad = this.createSprite(
			(PixiApp.app.renderer.view.width / 4) * 3.4,
			(PixiApp.app.renderer.view.height / 2) * 2.9,
			ipadTexture,
			'ipad',
			true
		);

		ipad.on('pointertap', () => {
			popUpIpad.visible = true;
			teapot.interactive = false;
			teapot.buttonMode = false;
			nintendoSwitch.interactive = false;
			nintendoSwitch.buttonMode = false;
			book.interactive = false;
			book.buttonMode = false;
			ipad.interactive = false;
			ipad.interactive = false;
			blackCircleIpad.visible = true;
			ipadText.visible = true;
			PixiApp.app.stage.pivot.y = PixiApp.secondView;
		});

		const souls = this.createSprite(
			(PixiApp.app.renderer.view.width / 4) * 1.38,
			(PixiApp.app.renderer.view.height / 2) * 3.6,
			soulTexture,
			'souls'
		);

		const grass = this.createSprite(
			PixiApp.app.renderer.view.width / 2,
			(PixiApp.app.renderer.view.height / 2) * 2.655,
			grassTexture,
			'grass'
		);

		//popups
		const popUpBook = this.createPopUpRect(
			window.innerWidth / 3.9,
			(window.innerHeight / 2) * 2.2
		);

		const blackCircleBook = this.createBlackCircle(
			window.innerWidth / 3.9,
			(window.innerHeight / 2) * 2.2
		);

		blackCircleBook.on('pointertap', () => {
			popUpBook.visible = false;
			blackCircleBook.visible = false;
			teapot.interactive = true;
			teapot.buttonMode = true;
			nintendoSwitch.interactive = true;
			nintendoSwitch.buttonMode = true;
			book.interactive = true;
			book.buttonMode = true;
			ipad.interactive = true;
			ipad.buttonMode = true;
			bookText.visible = false;
			PixiApp.app.stage.pivot.y = PixiApp.secondView;
		});

		const bookText = this.createText(
			data.book.description,
			descriptionStyle,
			window.innerWidth / 3.9 + window.innerWidth / 2 / 10,
			(window.innerHeight / 2) * 2.2 + window.innerHeight / 2 / 10
		);

		const popUpTeapot = this.createPopUpRect(
			window.innerWidth / 3.9,
			(window.innerHeight / 2) * 2.2
		);

		const blackCircleTeapot = this.createBlackCircle(
			window.innerWidth / 3.9,
			(window.innerHeight / 2) * 2.2
		);

		const teapotText = this.createText(
			data.teapot.description,
			descriptionStyle,
			window.innerWidth / 3.9 + window.innerWidth / 2 / 10,
			(window.innerHeight / 2) * 2.2 + window.innerHeight / 2 / 10
		);

		blackCircleTeapot.on('pointertap', () => {
			popUpTeapot.visible = false;
			blackCircleTeapot.visible = false;
			teapot.interactive = true;
			teapot.buttonMode = true;
			nintendoSwitch.interactive = true;
			nintendoSwitch.buttonMode = true;
			book.interactive = true;
			book.buttonMode = true;
			ipad.interactive = true;
			ipad.buttonMode = true;
			teapotText.visible = false;
			PixiApp.app.stage.pivot.y = PixiApp.secondView;
		});

		const popUpNintendo = this.createPopUpRect(
			window.innerWidth / 3.9,
			(window.innerHeight / 2) * 2.2
		);

		const blackCircleNintendo = this.createBlackCircle(
			window.innerWidth / 3.9,
			(window.innerHeight / 2) * 2.2
		);

		const nintendoText = this.createText(
			data.nintendoSwitch.description,
			descriptionStyle,
			window.innerWidth / 3.9 + window.innerWidth / 2 / 10,
			(window.innerHeight / 2) * 2.2 + window.innerHeight / 2 / 10
		);

		blackCircleNintendo.on('pointertap', () => {
			popUpNintendo.visible = false;
			blackCircleNintendo.visible = false;
			teapot.interactive = true;
			teapot.buttonMode = true;
			nintendoSwitch.interactive = true;
			nintendoSwitch.buttonMode = true;
			book.interactive = true;
			book.buttonMode = true;
			ipad.interactive = true;
			ipad.buttonMode = true;
			nintendoText.visible = false;
			PixiApp.app.stage.pivot.y = PixiApp.secondView;
		});

		const popUpIpad = this.createPopUpRect(
			window.innerWidth / 3.9,
			(window.innerHeight / 2) * 2.2
		);

		const blackCircleIpad = this.createBlackCircle(
			window.innerWidth / 3.9,
			(window.innerHeight / 2) * 2.2
		);

		const ipadText = this.createText(
			data.ipad.description,
			descriptionStyle,
			window.innerWidth / 3.9 + window.innerWidth / 2 / 10,
			(window.innerHeight / 2) * 2.2 + window.innerHeight / 2 / 10
		);

		blackCircleIpad.on('pointertap', () => {
			popUpIpad.visible = false;
			blackCircleIpad.visible = false;
			teapot.interactive = true;
			teapot.buttonMode = true;
			nintendoSwitch.interactive = true;
			nintendoSwitch.buttonMode = true;
			book.interactive = true;
			book.buttonMode = true;
			ipad.interactive = true;
			ipad.buttonMode = true;
			ipadText.visible = false;
			PixiApp.app.stage.pivot.y = PixiApp.secondView;
		});
	}
	render() {
		return <div></div>;
	}
}
