import React from 'react';
import * as PixiApp from '../pixi/projectStage.js';
import * as PIXI from 'pixi.js';

let weatherWindow, sideWeatherWindow;
const api_weather = 'e85282415ad04fe926b501b1b9888316';

export default class Welcome extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			//SF data for testing purposes
			// lat: 37.77,
			// lng: -122.42,
			//NY data
			lat: 40.75,
			lng: -73.98,
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
		//available if needed for addt'l responsive design / scaling
		let width = PixiApp.appWidth;
		let height = PixiApp.appHeight;
		let backWindowWidth = PixiApp.backWindowWidth;
		let backWindowHeight = PixiApp.backWindowWidth;
		//available if needed for addt'l responsive design / scaling
		let leftWindowHeight = PixiApp.leftWindowHeight;
		let backWindowX = PixiApp.backWindowSprite.position.x;
		let backWindowY = PixiApp.backWindowSprite.position.y;
		let leftWindowSprite = PixiApp.leftWindowSprite;

		//back window
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

		//dependent on left window position and back window dimensions
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

	//convert an indivudal r b g component to hex
	componentToHex(c) {
		const hex = c.toString(16);
		return hex.length == 1 ? '0' + hex : hex;
	}

	//convert rbg string to hex
	rgbToHex(r, g, b) {
		const hexVal =
			'#' +
			this.componentToHex(r) +
			this.componentToHex(g) +
			this.componentToHex(b);
		const num = parseInt(hexVal.substring(1), 16);
		return num;
	}

	//choose weather color on time and weather
	chooseWeatherColor(temp, clouds, time) {
		let r, g, b;
		// deal with clouds
		let cloudy = false;
		if (clouds.includes('cloud') || clouds.includes('Cloud')) {
			cloudy = true;
		}
		//get current time of day
		let dayTime = time.getHours();
		r = Math.floor(((temp / 100) * 255) / 2);
		//blue should be higher when lighter
		b = Math.floor((1 - dayTime / 36) * 255);
		//if there are clouds, rgh should be very close together for grey effect
		if (cloudy) {
			g = Math.floor(b * 0.95);
			r = Math.floor(g * 0.95);
		} else {
			//green should generally be half of blue for a blue sky
			g = Math.floor(b / 2);
		}
		//translate rbg elements into hex
		r = this.componentToHex(r);
		g = this.componentToHex(g);
		b = this.componentToHex(b);
		//translate rgb string to hex
		let rgbHex = this.rgbToHex(r, g, b);
		//set weather on state
		this.setState({ weatherColor: rgbHex });
	}

	render() {
		return <div></div>;
	}
}
