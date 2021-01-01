import React from 'react';
import * as PixiApp from '../pixi/projectStage.js';
import * as PIXI from 'pixi.js';

// app.stage.addChild(
// 	<iframe
// 		src='https://open.spotify.com/embed/playlist/5ajSqvWgjhYX5HwQ6odz2t'
// 		width='300'
// 		height='380'
// 		frameborder='0'
// 		allowtransparency='true'
// 		allow='encrypted-media'
// 	></iframe>
// );

let spotify;
let width = PixiApp.appWidth;
let height = PixiApp.appHeight;

export default class Contact extends React.Component {
	// async componentDidMount() {
	// 	spotify = new PIXI.Graphics();

	// 	let scale = 1;
	// 	if (width < 400) {
	// 		scale = 0.5;
	// 	} else if (width < 500) {
	// 		scale = 0.7;
	// 	}

	// 	spotify.addChild(
	// 		<iframe
	// 			src='https://open.spotify.com/embed/playlist/5ajSqvWgjhYX5HwQ6odz2t'
	// 			width={width / 5}
	// 			height={height / 2}
	// 			frameborder='0'
	// 			allowtransparency='true'
	// 			allow='encrypted-media'
	// 		></iframe>
	// 	);

	// 	PixiApp.spotifyPixi.addChild(spotify);
	// }

	render() {
		// console.log(PixiApp.popUps);
		return (
			<iframe
				src='https://open.spotify.com/embed/playlist/5ajSqvWgjhYX5HwQ6odz2t'
				width={width / 5}
				height={height / 2}
				// frameborder='0'
				allowtransparency='true'
				allow='encrypted-media'
			></iframe>
		);
	}
}
