import React from 'react';
import * as PixiApp from '../pixi/projectStage.js';
import * as PIXI from 'pixi.js';

let width = PixiApp.appWidth;
let height = PixiApp.appHeight;
//let visible = PixiApp.visible;

export default class Contact extends React.Component {
	render() {
		// console.log(PixiApp.popUps);
		console.log('visible: ', visible);
		return (
			<div>
				{visible ? (
					<iframe
						src='https://open.spotify.com/embed/playlist/5ajSqvWgjhYX5HwQ6odz2t'
						width={width / 5}
						height={height / 2}
						// frameborder='0'
						allowtransparency='true'
						allow='encrypted-media'
					></iframe>
				) : (
					<div />
				)}
			</div>
		);
	}
}
