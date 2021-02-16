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

export let firstView = app.stage.pivot.y;
let firsTransition;
export const secondView = app.renderer.view.height;
let secondTransition;
export const thirdView = secondView * 2;
let thirdTransition;
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
		if (app.stage.pivot.y === firstView) {
			app.renderer.backgroundColor = 0x1b1c2b;
		} else if (app.stage.pivot.y === secondView) {
			app.renderer.backgroundColor = 0x15112d;
		} else if (app.stage.pivot.y === thirdView) {
			app.renderer.backgroundColor = 0x7598aa;
		} else if (app.stage.pivot.y === fourthView) {
			app.renderer.backgroundColor = 0xe1b058;
		}
	} else app.stage.pivot.y = 0;
	menuContainer.position.y = app.stage.pivot.y + 10;
};

//Right
down.press = () => {
	if (app.stage.pivot.y <= app.renderer.view.height * 2) {
		app.stage.pivot.y =
			Math.floor(app.stage.pivot.y / app.renderer.view.height) *
				app.renderer.view.height +
			app.renderer.view.height;
		if (app.stage.pivot.y === secondView) {
			app.renderer.backgroundColor = 0x15112d;
		} else if (app.stage.pivot.y === thirdView) {
			app.renderer.backgroundColor = 0x7598aa;
		} else if (app.stage.pivot.y === fourthView) {
			app.renderer.backgroundColor = 0xe1b058;
		}
	} else app.stage.pivot.y = 3 * app.renderer.view.height;
	menuContainer.position.y = app.stage.pivot.y + 10;
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
		// console.log(event);
		if (
			//don't scroll any further (top of page)
			app.stage.pivot.y < 0 ||
			app.stage.pivot.y + (event.deltaY * 1.3 || event.deltaX * 1.3) < 0
		) {
			app.stage.pivot.y = 0;
			// if (app.stage.pivot.y === firstView) {
			//   app.renderer.backgroundColor = 0x1b1c2b;
			// } else if (app.stage.pivot.y === secondView) {
			//   app.renderer.backgroundColor = 0x15112d;
			// } else if (app.stage.pivot.y === thirdView) {
			//   app.renderer.backgroundColor = 0x7598aa;
			// } else if (app.stage.pivot.y === fourthView) {
			//   app.renderer.backgroundColor = 0xe1b058;
			// }
		} else if (
			//don't scroll any further (bottom of page)
			app.stage.pivot.y > app.renderer.view.height * 3 ||
			app.stage.pivot.y + (event.deltaY * 1.3 || event.deltaX * 1.3) >
				app.renderer.view.height * 3
		) {
			app.stage.pivot.y = app.renderer.view.height * 3;
			// if (app.stage.pivot.y === secondView) {
			//   app.renderer.backgroundColor = 0x15112d;
			// } else if (app.stage.pivot.y === thirdView) {
			//   app.renderer.backgroundColor = 0x7598aa;
			// } else if (app.stage.pivot.y === fourthView) {
			//   app.renderer.backgroundColor = 0xe1b058;
			// }
		} else {
			//keep scrolling
			app.stage.pivot.y += event.deltaY * 1.3 || event.deltaX * 1.3;
			if (app.stage.pivot.y >= 0 && app.stage.pivot.y < secondView / 2) {
				// console.log('first background', app.stage.pivot.y);
				app.renderer.backgroundColor = 0x1b1c2b;
			} else if (
				app.stage.pivot.y > secondView / 2 &&
				app.stage.pivot.y < thirdView * 0.94
			) {
				// console.log('second background', app.stage.pivot.y);
				app.renderer.backgroundColor = 0x15112d;
			} else if (
				app.stage.pivot.y > thirdView * 0.94 &&
				app.stage.pivot.y < thirdView
			) {
				// console.log('third background', app.stage.pivot.y);
				app.renderer.backgroundColor = 0x7598aa;
			} else if (app.stage.pivot.y > thirdView) {
				// console.log('fourth view', app.stage.pivot.y);
				app.renderer.backgroundColor = 0xe1b058;
			}
		}
		menuContainer.position.y = app.stage.pivot.y + 10;
	};
	// function onWindowResize() {
	//   app.renderer.setSize(window.innerWidth, window.innerHeight);
	// }

	// Attach event listeners
	const downListener = key.downHandler.bind(key);
	const upListener = key.upHandler.bind(key);

	window.addEventListener('keydown', downListener, false);
	window.addEventListener('keyup', upListener, false);
	window.addEventListener('wheel', _.throttle(onwheel, 0), false);

	// Detach event listeners
	key.unsubscribe = () => {
		window.removeEventListener('keydown', downListener);
		window.removeEventListener('keyup', upListener);
		window.removeEventListener('wheel', _.throttle(onwheel, 0), false);
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

/* resize - web resposive */
window.addEventListener('resize', resize);

/* for scaling adjustment not on refresh */
function resize() {
	//has an issue adjusting for height differece
	let widthDiff = window.innerWidth - app.renderer.view.width;
	let heightDiff = window.innerHeight - app.renderer.view.height;
	let method = 'add';
	if (window.innerWidth < app.renderer.view.width) {
		method = 'subtract';
		widthDiff = app.renderer.view.width - window.innerWidth;
		heightDiff = app.renderer.view.height - window.innerHeight;
	}
	app.renderer.resize(window.innerWidth, window.innerHeight);
	app.stage.children.forEach((child, idx) => {
		if (method === 'add') {
			child.width += widthDiff;
			child.height += heightDiff;
		} else {
			child.width -= widthDiff;
			child.height -= heightDiff;
		}
	});
}
export const menuContainer = new PIXI.Container();
megaContainer.addChild(menuContainer);

menuContainer.position.x = 10;
menuContainer.position.y = 10;
