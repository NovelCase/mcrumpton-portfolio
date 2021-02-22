import React from 'react';
import * as PixiApp from '../pixi/projectStage.js';
import * as PIXI from 'pixi.js';
import { data } from '../data';
// import loading from 'public/siteAssets/finalView/loading.png';

export const onClick = () => {};

let scales = {
	hobbes: 0.5,
	hello: 0.75,
	floor: 1.2,
	window: 1.1,
	spotify: 1.1,
	bookcase: 1.02,
	github: 1.1,
	linkedIn: 1.1,
	table: 1.1,
	guestbook: 1.1,
	resume: 0.9,
};

let width = PixiApp.app.renderer.view.width;
let height = PixiApp.app.renderer.view.height;

export default class FinalView extends React.Component {
	constructor() {
		super();
		this.state = {
			visible: false,
			speech: false,
		};
		this.onClickTap = this.onClickTap.bind(this);
		this.createSprite.bind(this);
	}

	onClickTap() {
		if (this.state.visible) {
			this.setState({ visible: false });
			PixiApp.app.renderer.view.width += width / 4;
		} else {
			this.setState({ visible: true });
			PixiApp.app.renderer.view.width -= width / 4;
		}
	}
	createSprite(x, y, texture, type, interactive) {
		const sprite = new PIXI.Sprite(texture);
		PixiApp.finalView.addChild(sprite);
		sprite.anchor.set(0.5);
		sprite.position.x = x;
		sprite.position.y = y;
		sprite.scale.set(scales[type]);
		if (type === 'floor') {
			sprite.width = window.innerWidth;
		} else if (interactive) {
			sprite.interactive = true;
			sprite.buttonMode = true;
		}
		return sprite;
	}

	componentDidMount() {
		/* textures */
		const hobbesTexture = PIXI.Texture.from('siteAssets/finalView/Hobbes.png');
		const bookTexture = PIXI.Texture.from(
			'siteAssets/finalView/bookCaseShadow.png'
		);
		const floorTexture = PIXI.Texture.from('siteAssets/finalView/floor.png');
		const githubTexture = PIXI.Texture.from('siteAssets/finalView/github.png');
		const guestbookTexture = PIXI.Texture.from(
			'siteAssets/finalView/guestbook.png'
		);
		const linkedinTexture = PIXI.Texture.from(
			'siteAssets/finalView/linkedIn.png'
		);
		const spotfiyTexture = PIXI.Texture.from(
			'siteAssets/finalView/spotify.png'
		);
		const tableTexture = PIXI.Texture.from('siteAssets/finalView/table.png');
		const windowTexture = PIXI.Texture.from(
			'siteAssets/finalView/darkWindow.png'
		);
		const resumeTexture = PIXI.Texture.from('siteAssets/finalView/Resume.png');
		const speechTexture = PIXI.Texture.from(
			'siteAssets/finalView/hobbesHello.png'
		);

		const floor = this.createSprite(
			PixiApp.app.renderer.view.width / 2,
			(PixiApp.app.renderer.view.height / 2) * 7.07,
			floorTexture,
			'floor'
		);

		const windowSprite = this.createSprite(
			(PixiApp.app.renderer.view.width / 4) * 2.7,
			(PixiApp.app.renderer.view.height / 2) * 6.84,
			windowTexture,
			'window'
		);

		const spotify = this.createSprite(
			(PixiApp.app.renderer.view.width / 4) * 3.599,
			(PixiApp.app.renderer.view.height / 2) * 7.16,
			spotfiyTexture,
			'spotify',
			true
		);

		spotify.on('pointertap', () => {
			this.onClickTap();
		});

		const bookCase = this.createSprite(
			PixiApp.app.renderer.view.width / 5,
			(PixiApp.app.renderer.view.height / 2) * 6.84,
			bookTexture,
			'bookcase'
		);

		const github = this.createSprite(
			(PixiApp.app.renderer.view.width / 5) * 1.16,
			(PixiApp.app.renderer.view.height / 2) * 6.391,
			githubTexture,
			'github',
			true
		);

		github.on('pointertap', () => {
			window.open(data.github, '_blank');
			PixiApp.app.stage.pivot.y = PixiApp.fourthView;
		});

		const linkedIn = this.createSprite(
			(PixiApp.app.renderer.view.width / 5) * 0.75,
			(PixiApp.app.renderer.view.height / 2) * 6.882,
			linkedinTexture,
			'linkedIn',
			true
		);

		linkedIn.on('pointertap', () => {
			window.open(data.linkedIn, '_blank');
			PixiApp.app.stage.pivot.y = PixiApp.fourthView;
		});

		const resume = this.createSprite(
			(PixiApp.app.renderer.view.width / 5) * 1.37,
			(PixiApp.app.renderer.view.height / 2) * 6.88,
			resumeTexture,
			'resume',
			true
		);

		resume.on('pointertap', () => {
			window.open(data.resume, '_blank');
			PixiApp.app.stage.pivot.y = PixiApp.fourthView;
		});

		const table = this.createSprite(
			(PixiApp.app.renderer.view.width / 4) * 2.55,
			(PixiApp.app.renderer.view.height / 2) * 7.49,
			tableTexture,
			'table'
		);

		const guestbook = this.createSprite(
			(PixiApp.app.renderer.view.width / 4) * 2.52,
			(PixiApp.app.renderer.view.height / 2) * 7.06,
			guestbookTexture,
			'guestbook',
			true
		);

		guestbook.on('pointertap', () => {
			window.location.href =
				'mailto:marie.k.cr@gmail.com?subject=Just visited your website!';
			PixiApp.app.stage.pivot.y = PixiApp.fourthView;
		});

		const hobbes = this.createSprite(
			(PixiApp.app.renderer.view.width / 4) * 1.4,
			(PixiApp.app.renderer.view.height / 2) * 7.38,
			hobbesTexture,
			'hobbes',
			true
		);

		const hobbesHello = this.createSprite(
			(PixiApp.app.renderer.view.width / 4) * 2.5,
			(PixiApp.app.renderer.view.height / 2) * 6.721,
			speechTexture,
			'hello',
			true
		);

		hobbesHello.visible = false;

		hobbes.on('pointertap', () => {
			if (!this.state.speech) {
				hobbesHello.visible = true;
				this.state.speech = true;
			} else {
				hobbesHello.visible = false;
				this.state.speech = false;
			}
		});
	}
	render() {
		return (
			<div id="container">
				{this.state.visible ? (
					<div>
						<iframe
							src={data.spotify}
							width={width / 4}
							height={height}
							allow="encrypted-media"
							allowTransparency={true}
						></iframe>
						<img id="loading" src="https://i.ibb.co/P13DzXz/loading.png" />
					</div>
				) : (
					<div />
				)}
			</div>
		);
	}
}
