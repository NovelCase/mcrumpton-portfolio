import React from 'react';
import * as PixiApp from '../pixi/projectStage.js';
import * as PIXI from 'pixi.js';

let weatherWindow, sideWeatherWindow;
const api_weather = 'e85282415ad04fe926b501b1b9888316';

export default class Welcome extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			//NY data
			lat: 37.77,
			lng: -122.42,
			city: 'Manhattan',
			data: {},
			weatherColor: 0x87ceeb,
			time: new Date(),
		};
		this.calculateTemp = this.calculateTemp.bind(this);
		this.findMe = this.findMe.bind(this);
		this.chooseWeatherColor = this.chooseWeatherColor.bind(this);
		this.rgbToHex = this.rgbToHex.bind(this);
		this.componentToHex = this.componentToHex.bind(this);
	}

	async componentDidMount() {
		try {
			this.setState({ time: new Date() });
			const api_call = await fetch(
				`https://api.openweathermap.org/data/2.5/weather?lat=${this.state.lat}&lon=${this.state.lng}&APPID=${api_weather}`
			);
			const data = await api_call.json();
			this.setState({ data });
			console.log('weather data: ', this.state.data);
			this.chooseWeatherColor(
				this.calculateTemp(this.state.data.main.temp),
				this.state.data.weather[0].description,
				this.state.time
			);
		} catch (err) {
			console.log(err);
		}
		//creating window colors
		weatherWindow = new PIXI.Graphics();
		let width = PixiApp.appWidth;
		let height = PixiApp.appHeight;
		let backWindowWidth = PixiApp.backWindowWidth;
		let backWindowHeight = PixiApp.backWindowWidth;
		let leftWindowHeight = PixiApp.leftWindowHeight;
		let backWindowX = PixiApp.backWindowSprite.position.x;
		let backWindowY = PixiApp.backWindowSprite.position.y;
		let leftWindowSprite = PixiApp.leftWindowSprite;

		weatherWindow
			.beginFill(this.state.weatherColor)
			.drawRect(
				//based on left window position and back window dimensions
				leftWindowSprite.position.x + backWindowWidth / 7,
				leftWindowSprite.position.y - backWindowHeight * 0.39,
				backWindowWidth * 0.95,
				backWindowHeight * 0.45
			)
			.endFill();

		PixiApp.windowWeather.addChild(weatherWindow);

		sideWeatherWindow = new PIXI.Graphics();

		sideWeatherWindow
			.beginFill(this.state.weatherColor)
			.drawPolygon([
				//top left corner
				leftWindowSprite.position.x - backWindowWidth / 6,
				leftWindowSprite.position.y - backWindowHeight * 0.1,
				//bottom left
				leftWindowSprite.position.x - backWindowWidth / 6,
				leftWindowSprite.position.y + backWindowHeight * 0.35,
				//bottom right
				leftWindowSprite.position.x + backWindowWidth / 12,
				leftWindowSprite.position.y + backWindowHeight * 0.07,
				//top right corner
				leftWindowSprite.position.x + backWindowWidth / 12,
				leftWindowSprite.position.y - backWindowHeight * 0.37,
			])
			.endFill();
		PixiApp.windowWeather.addChild(sideWeatherWindow);
	}

	async findMe() {
		try {
			navigator.geolocation.getCurrentPosition(async (position) => {
				this.setState({
					lat: position.coords.latitude,
					lng: position.coords.longitude,
				});
			});

			//should probably include something if the geolocation is not successful
		} catch (err) {
			console.log(err);
		}
	}

	//temp conversion from kelvin
	calculateTemp(degreesK, displayUnits) {
		let degrees;
		if (displayUnits === 'C') {
			degrees = Math.floor(degreesK - 273);
		} else {
			degrees = Math.floor(((degreesK - 273) * 9) / 5 + 32);
		}
		return degrees;
	}

	componentToHex(c) {
		var hex = c.toString(16);
		return hex.length == 1 ? '0' + hex : hex;
	}

	rgbToHex(r, g, b) {
		// let hexVal = parseInt(
		// 	'0x' +
		// 		this.componentToHex(r) +
		// 		this.componentToHex(g) +
		// 		this.componentToHex(b),
		// 	16
		// );
		let hexVal =
			'0x' +
			this.componentToHex(r) +
			this.componentToHex(g) +
			this.componentToHex(b);
		//not coming out with 0x
		console.log(Number(hexVal));
		return hexVal;
	}

	chooseWeatherColor(temp, clouds, time) {
		let r = 0;
		let g = 255;
		let b = 255;
		// deal with clouds
		let cloudy = false;
		if (clouds.includes('cloud')) {
			cloudy = true;
		}
		let dayTime = time.getHours();
		r = Math.floor(temp / 100);
		b = Math.floor((1 - dayTime / 24) * 255);
		g = Math.floor(b / 2);

		r = this.componentToHex(r);
		g = this.componentToHex(g);
		b = this.componentToHex(b);

		let rgbHex = this.rgbToHex(r, g, b);

		this.setState({ weatherColor: rgbHex });
		console.log(this.state.weatherColor);
	}

	render() {
		return <div></div>;
	}
}
