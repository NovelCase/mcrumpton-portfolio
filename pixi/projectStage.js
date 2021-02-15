const { Sprite } = require('pixi.js');
const PIXI = require('pixi.js');
var _ = require('lodash');

window.WebFontConfig = {
	google: {
		families: ['Nunito Sans'],
	},
};
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

export const app = new PIXI.Application({
	transparent: false,
	resizeTo: window,
});

app.renderer.backgroundColor = 0x1b1c2b;
let pixiDiv = document.getElementById('pixi');
pixiDiv.appendChild(app.view);

console.log(app.stage.pivot.y);
export let firstView = app.stage.pivot.y;
export const secondView = app.renderer.view.height;
export const thirdView = secondView * 2;
export const fourthView = secondView * 3;

let left = keyboard('ArrowLeft'),
	up = keyboard('ArrowUp'),
	right = keyboard('ArrowRight'),
	down = keyboard('ArrowDown'),
	space = keyboard(' ' || 'Spacebar');

//Left arrow key `press` method
up.press = () => {
	if (app.stage.pivot.y >= app.renderer.view.height) {
		app.stage.pivot.y =
			Math.floor(app.stage.pivot.y / app.renderer.view.height) *
				app.renderer.view.height -
			app.renderer.view.height;
		console.log(app.stage.pivot.y);
		if (app.stage.pivot.y === firstView) {
			app.renderer.backgroundColor = 0x1b1c2b;
		} else if (app.stage.pivot.y === secondView) {
			app.renderer.backgroundColor = 0x15112d;
		} else if (app.stage.pivot.y === thirdView) {
			app.renderer.backgroundColor = 0x7598aa /* 0xac9caa */ /* 0xeca83f */; //make this color something from lanterns
		} else if (app.stage.pivot.y === fourthView) {
			app.renderer.backgroundColor = 0xe1b058 /* 0xffdd68 */; //make this color something from lanterns
		}
	} else app.stage.pivot.y = 0;
};

//Right
down.press = () => {
	if (app.stage.pivot.y <= app.renderer.view.height * 2) {
		app.stage.pivot.y =
			Math.floor(app.stage.pivot.y / app.renderer.view.height) *
				app.renderer.view.height +
			app.renderer.view.height;
		console.log(app.stage.pivot.y);
		if (app.stage.pivot.y === secondView) {
			app.renderer.backgroundColor = 0x15112d;
		} else if (app.stage.pivot.y === thirdView) {
			app.renderer.backgroundColor = 0x7598aa /* 0xac9caa */ /* 0xeca83f */; //make this color something from lanterns
		} else if (app.stage.pivot.y === fourthView) {
			app.renderer.backgroundColor = 0xe1b058 /* 0xffdd68 */; //make this color something from lanterns
		}
	} else app.stage.pivot.y = 3 * app.renderer.view.height;
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

	onwheel = (event) => {
		if (
			app.stage.pivot.y < 0 ||
			app.stage.pivot.y + (event.deltaY * 1.3 || event.deltaX * 1.3) < 0
		) {
			app.stage.pivot.y = 0;
			// if (app.stage.pivot.y === firstView) {
			//   app.renderer.backgroundColor = 0x1b1c2b;
			// } else if (app.stage.pivot.y === secondView) {
			//   app.renderer.backgroundColor = 0x15112d;
			// } else if (app.stage.pivot.y === thirdView) {
			//   app.renderer.backgroundColor = 0xac9caa /* 0xeca83f */; //make this color something from lanterns
			// } else if (app.stage.pivot.y === fourthView) {
			//   app.renderer.backgroundColor = 0xe1b058 /* 0xffdd68 */; //make this color something from lanterns
			// }
		} else if (
			app.stage.pivot.y > app.renderer.view.height * 3 ||
			app.stage.pivot.y + (event.deltaY * 1.3 || event.deltaX * 1.3) >
				app.renderer.view.height * 3
		) {
			app.stage.pivot.y = app.renderer.view.height * 3;
			// if (app.stage.pivot.y === secondView) {
			//   app.renderer.backgroundColor = 0x15112d;
			// } else if (app.stage.pivot.y === thirdView) {
			//   app.renderer.backgroundColor = 0xac9caa /* 0xeca83f */; //make this color something from lanterns
			// } else if (app.stage.pivot.y === fourthView) {
			//   app.renderer.backgroundColor = 0xe1b058 /* 0xffdd68 */; //make this color something from lanterns
			// }
		} else {
			app.stage.pivot.y += event.deltaY * 1.3 || event.deltaX * 1.3;
			// if (app.stage.pivot.y === firstView) {
			//   app.renderer.backgroundColor = 0x1b1c2b;
			// } else if (app.stage.pivot.y === secondView) {
			//   app.renderer.backgroundColor = 0x15112d;
			// } else if (app.stage.pivot.y === thirdView) {
			//   app.renderer.backgroundColor = 0xac9caa /* 0xeca83f */; //make this color something from lanterns
			// } else if (app.stage.pivot.y === fourthView) {
			//   app.renderer.backgroundColor = 0xe1b058 /* 0xffdd68 */; //make this color something from lanterns
			// }
		}
	};
	function onWindowResize() {
		app.renderer.setSize(window.innerWidth, window.innerHeight);
	}

	//Attach event listeners
	const downListener = key.downHandler.bind(key);
	const upListener = key.upHandler.bind(key);

	window.addEventListener('keydown', downListener, false);
	window.addEventListener('keyup', upListener, false);
	window.addEventListener('wheel', _.throttle(onwheel, 1000), false);

	// Detach event listeners
	key.unsubscribe = () => {
		window.removeEventListener('keydown', downListener);
		window.removeEventListener('keyup', upListener);
		window.removeEventListener('wheel', _.throttle(onwheel, 1000), false);
	};

	return key;
}

/* Containers */
const megaContainer = new PIXI.Container();
app.stage.addChild(megaContainer);

export const marigoldView = new PIXI.Container();
megaContainer.addChild(marigoldView);

export const lanternView = new PIXI.Container();
megaContainer.addChild(lanternView);

export const projectView = new PIXI.Container();
megaContainer.addChild(projectView);

export const finalView = new PIXI.Container();
megaContainer.addChild(finalView);
