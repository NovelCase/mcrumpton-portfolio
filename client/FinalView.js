import React from 'react';
import * as PixiApp from '../pixi/projectStage.js';
import * as PIXI from 'pixi.js';
import { data } from '../data';

export const onClick = () => {};

let scales = {
	hobbes: 0.5,
	floor: 1.2,
	window: 1.1,
	spotify: 1.1,
	bookcase: 1.02,
	github: 1.1,
	linkedIn: 1.1,
	table: 1.1,
	guestbook: 1.1,
	resume: 0.46,
};

let width = PixiApp.app.renderer.view.width;
let height = PixiApp.app.renderer.view.height;

export default class FinalView extends React.Component {
	constructor() {
		super();
		this.state = {
			visible: false,
		};
		this.onClickTap = this.onClickTap.bind(this);
		this.createSprite.bind(this);
	}

	onClickTap() {
		if (this.state.visible) {
			this.setState({ visible: false });
			//PixiApp.app.stage.pivot.x = width * 3;
			PixiApp.app.renderer.view.width += width / 4;
		} else {
			this.setState({ visible: true });
			PixiApp.app.renderer.view.width += width / 4;
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
		const bookTexture = PIXI.Texture.from('siteAssets/finalView/bookCase.png');
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
		const windowTexture = PIXI.Texture.from('siteAssets/finalView/window.png');
		const resumeTexture = PIXI.Texture.from('siteAssets/finalView/Resume.png');

		const floor = this.createSprite(
			PixiApp.app.renderer.view.width / 2,
			(PixiApp.app.renderer.view.height / 2) * 6.95,
			floorTexture,
			'floor'
		);

		const windowSprite = this.createSprite(
			(PixiApp.app.renderer.view.width / 4) * 2.5,
			(PixiApp.app.renderer.view.height / 2) * 6.721,
			windowTexture,
			'window'
		);

		const spotify = this.createSprite(
			(PixiApp.app.renderer.view.width / 4) * 3.599,
			(PixiApp.app.renderer.view.height / 2) * 7.05,
			spotfiyTexture,
			'spotify',
			true
		);

		spotify.on('pointertap', () => {
			this.onClickTap();
		});

		const bookCase = this.createSprite(
			PixiApp.app.renderer.view.width / 5,
			(PixiApp.app.renderer.view.height / 2) * 6.748,
			bookTexture,
			'bookcase'
		);

		const github = this.createSprite(
			(PixiApp.app.renderer.view.width / 5) * 1.15,
			(PixiApp.app.renderer.view.height / 2) * 6.3,
			githubTexture,
			'github',
			true
		);

		github.on('pointertap', () => {
			window.open(data.github, '_blank');
			PixiApp.app.stage.pivot.y = PixiApp.fourthView;
		});

		const linkedIn = this.createSprite(
			(PixiApp.app.renderer.view.width / 5) * 0.78,
			(PixiApp.app.renderer.view.height / 2) * 6.757,
			linkedinTexture,
			'linkedIn',
			true
		);

		linkedIn.on('pointertap', () => {
			window.open(data.linkedIn, '_blank');
			PixiApp.app.stage.pivot.y = PixiApp.fourthView;
		});

		const resume = this.createSprite(
			(PixiApp.app.renderer.view.width / 5) * 1.33,
			(PixiApp.app.renderer.view.height / 2) * 6.759,
			resumeTexture,
			'resume',
			true
		);

		resume.on('pointertap', () => {
			window.open(data.resume, '_blank');
			PixiApp.app.stage.pivot.y = PixiApp.fourthView;
		});

		const table = this.createSprite(
			(PixiApp.app.renderer.view.width / 4) * 2.5,
			(PixiApp.app.renderer.view.height / 2) * 7.4,
			tableTexture,
			'table'
		);

		const guestbook = this.createSprite(
			(PixiApp.app.renderer.view.width / 4) * 2.5,
			(PixiApp.app.renderer.view.height / 2) * 7,
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
			(PixiApp.app.renderer.view.height / 2) * 7.275,
			hobbesTexture,
			'hobbes',
			true
		);
	}
	render() {
		return (
			<div>
				{this.state.visible ? (
					<div id='container'>
						<iframe
							src={data.spotify}
							width={width / 4}
							height={height}
							// frameborder='0'
							//allowtransparency='true'
							allow='encrypted-media'
						></iframe>
						<img id='loading' src='https://i.ibb.co/TWhb20W/Loading.png' />
					</div>
				) : (
					<div />
				)}
			</div>
		);
	}
}
