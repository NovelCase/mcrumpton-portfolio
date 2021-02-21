import React from 'react';
import * as PixiApp from '../pixi/projectStage.js';
import * as PIXI from 'pixi.js';
import { data } from '../data';
import { Scrollbox } from 'pixi-scrollbox';

export function createPopUpRect(title) {
	popUpProject.removeChildren();
	let x = PixiApp.app.renderer.view.width / 4;
	let y = (PixiApp.app.renderer.view.height * 9) / 4;
	let width = PixiApp.app.renderer.view.width / 2;
	let height = PixiApp.app.renderer.view.height / 2;
	console.log(window, PixiApp.app.renderer.view.width);
	if (window.outerWidth < 400) {
		x = 0;
		y = PixiApp.app.renderer.view.height * 2.125;
		width = window.outerWidth;
		height = PixiApp.app.renderer.view.height * 0.75;
	}
	const rect = new PIXI.Graphics();
	rect.beginFill(0xc2b9e1).drawRoundedRect(x, y, width, height, 20).endFill();
	rect.visible = true;

	const closeButton = new PIXI.Graphics();

	closeButton
		.beginFill(0x000000)
		.drawCircle(x + 20, y + 15, 10)
		.endFill();

	closeButton.visible = true;
	closeButton.interactive = true;
	closeButton.buttonMode = true;
	closeButton.on('pointertap', function () {
		popUpProject.removeChildren();
		popUpProject.visible = true;
	});
	popUpProject.addChild(rect);
	popUpProject.addChild(closeButton);
	let popTitle = createText(
		data[title].name,
		titleStyle,
		x + rect.width / 10,
		y + 50,
		false,
		'projectTitle'
	);
	scrollbox = popUpProject.addChild(
		new Scrollbox({
			boxWidth: (rect.width / 11) * 10,
			boxHeight: rect.height - 210,
		})
	);
	let projectDetails = scrollbox.content.addChild(new PIXI.Graphics());
	projectDetails
		.beginFill(0xc2b9e1, 0.25) /* 0xe3cdfe */
		.drawRect(0, 0, (rect.width / 11) * 9, rect.height - 210)
		.endFill();
	scrollbox.position.set(x + rect.width / 10, y + 160);

	let popDesc = createText(
		data[title].description,
		descriptionStyle,
		0,
		0,
		false,
		'projectDescription'
	);
	scrollbox.update();
	let popLinkOne = createText(
		data[title].linkOne,
		linkStyle,
		x + rect.width / 6,
		y + rect.height - 50,
		true,
		'projectGithub'
	);
	popLinkOne.on('pointertap', () => openLink(title, 'One'));

	let popLinkTwo = createText(
		data[title].linkTwo,
		linkStyle,
		x + (rect.width / 6) * 5,
		y + rect.height - 50,
		true,
		'projectLive'
	);
	popLinkTwo.on('pointertap', () => openLink(title, 'Two'));
	return popUpProject;
}

function openLink(projectName, linkType) {
	linkType = 'link' + linkType + 'Url';
	window.open(`${data[projectName][linkType]}`);
}

function createText(words, style, x, y, interactive, type) {
	const text = new PIXI.Text(words, style);
	if (type === 'projectLive') text.anchor.set(1, 0);
	text.visible = true;
	text.position.x = x;
	text.position.y = y;
	if (interactive) {
		text.interactive = true;
		text.buttonMode = true;
	}
	if (type !== 'projectDescription') popUpProject.addChild(text);
	else scrollbox.content.addChild(text);
	return text;
}

let scrollbox;
let popUpProject = new PIXI.Container();
let textInfo = {};
let scales = {
	medallionR: 1.3,
	bluePlant: 0.65,
	floor: 0.6,
	deskH: 1.16,
	deskW: 1.29,
	gobARk: 0.85,
	seeTurtleExploration: 0.85,
	brosApothecary: 0.83,
	plantsR: 1.2,
	plantsL: 1.2,
};
/* Styling */
let titleStyle = {
	fontFamily: 'Cutive',
	fontSize: 35,
	fontWeight: '600',
	wordWrap: true,
	wordWrapWidth: Math.max(PixiApp.app.renderer.view.width / 2.5, 300),
};
let descriptionStyle = {
	fontFamily: 'Cutive',
	fontSize: 23,
	fontWeight: '400',
	lineHeight: 50,
	wordWrap: true,
	wordWrapWidth: Math.max(PixiApp.app.renderer.view.width / 2.5, 300),
};
let linkStyle = {
	fontFamily: 'Cutive',
	fontSize: 23,
	fill: '#007EC7',
};
export default class ProjectView extends React.Component {
	createSprite(x, y, texture, type, interactive) {
		const sprite = new PIXI.Sprite(texture);
		PixiApp.projectView.addChild(sprite);
		sprite.anchor.set(0.5);
		sprite.position.x = x;
		sprite.position.y = y;
		sprite.scale.set(scales[type]);
		if (type === 'floor') {
			sprite.width = PixiApp.app.renderer.view.width;
		} else if (type === 'desk') {
			sprite.scale.x = scales.deskW;
			sprite.scale.y = scales.deskH;
		} else if (interactive) {
			sprite.interactive = true;
			sprite.buttonMode = true;
			sprite.on('pointerover', function () {
				sprite.scale.set(scales[type] * 1.05);
			});
			sprite.on('pointerout', function () {
				sprite.scale.set(scales[type]);
			});
			sprite.on('pointerdown', function () {
				sprite.rotation = 0.2;
			});
			sprite.on('pointerup', function () {
				sprite.rotation = 0;
			});
			sprite.on('pointertap', function () {
				PixiApp.app.stage.pivot.y = PixiApp.thirdView;
				PixiApp.menuContainer.position.y = PixiApp.thirdView + 10;
				createPopUpRect(type);
			});
		}

		return sprite;
	}
	componentDidMount() {
		/* textures */

		const floorTexture = PIXI.Texture.from('siteAssets/projectView/floor.png');
		const deskTexture = PIXI.Texture.from('siteAssets/projectView/desk.png');
		const plantsRTexture = PIXI.Texture.from(
			'siteAssets/projectView/plantsRightEdit.png'
		);
		const plantsLTexture = PIXI.Texture.from(
			'siteAssets/projectView/plantsLeftEdit.png'
		);
		const barkTexture = PIXI.Texture.from('siteAssets/projectView/gobARk.png');
		const broTexture = PIXI.Texture.from(
			'siteAssets/projectView/brosApothecary.png'
		);
		const seeTexture = PIXI.Texture.from(
			'siteAssets/projectView/seeTurtle.png'
		);

		const floor = this.createSprite(
			PixiApp.app.renderer.view.width / 2,
			(PixiApp.app.renderer.view.height / 2) * 4.928,
			floorTexture,
			'floor'
		);

		const desk = this.createSprite(
			PixiApp.app.renderer.view.width / 2,
			(PixiApp.app.renderer.view.height / 2) * 4.99,
			deskTexture,
			'desk'
		);

		const gobARk = this.createSprite(
			(PixiApp.app.renderer.view.width / 2) * 0.59,
			(PixiApp.app.renderer.view.height / 2) * 5.47,
			barkTexture,
			'gobARk',
			true
		);

		const seeTurtle = this.createSprite(
			(PixiApp.app.renderer.view.width / 2) * 1.4,
			(PixiApp.app.renderer.view.height / 2) * 5.47,
			seeTexture,
			'seeTurtleExploration',
			true
		);

		const brosApothecary = this.createSprite(
			(PixiApp.app.renderer.view.width / 2) * 1.4,
			(PixiApp.app.renderer.view.height / 2) * 4.53,
			broTexture,
			'brosApothecary',
			true
		);

		const plantsR = this.createSprite(
			(PixiApp.app.renderer.view.width / 2) * 1.6289,
			(PixiApp.app.renderer.view.height / 2) * 4.8497,
			plantsRTexture,
			'plantsR'
		);

		const plantsL = this.createSprite(
			(PixiApp.app.renderer.view.width / 2) * 0.179,
			(PixiApp.app.renderer.view.height / 2) * 4.8501,
			plantsLTexture,
			'plantsL'
		);
		PixiApp.projectView.addChild(popUpProject);
	}
	render() {
		return <div></div>;
	}
}
