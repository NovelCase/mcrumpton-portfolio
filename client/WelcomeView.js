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
			lat: 40.7484,
			lng: -73.9857,
			city: 'Manhattan',
			data: {},
			weatherColor: 0x87ceeb,
			time: new Date(),
		};
		this.calculateTemp = this.calculateTemp.bind(this);
		this.findMe = this.findMe.bind(this);
		this.chooseWeatherColor = this.chooseWeatherColor.bind(this);
	}

	async componentDidMount() {
		// try {
		// 	const api_call = await fetch(
		// 		`https://api.openweathermap.org/data/2.5/weather?lat=${this.state.lat}&lon=${this.state.lng}&APPID=${api_weather}`
		// 	);
		// 	const data = await api_call.json();
		// 	this.setState({ data });
		// 	console.log('weather data: ', this.state.data);
		// } catch (err) {
		// 	console.log(err);
		// }
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

	//component did update
	// async componentDidUpdate(prevState) {
	// 	try {
	// 		//if the user clicks find me
	// 		if (prevState.city !== this.state.city) {
	// 			const api_call = await fetch(
	// 				`https://api.openweathermap.org/data/2.5/weather?q=${this.state.city}&APPID=${api_weather}`
	// 			);
	// 			const data = await api_call.json();
	// 			this.setState({ data });
	// 		} else if (prevState.lat !== this.state.lat) {
	// 			//get their current weather based on lat/lng
	// 			const api_call = await fetch(
	// 				`https://api.openweathermap.org/data/2.5/weather?lat=${this.state.lat}&lon=${this.state.lng}&APPID=${api_weather}`
	// 			);
	// 			const data = await api_call.json();
	// 			this.setState({ data });
	// 			this.chooseWeatherColor;
	// 		}
	// 		console.log('weather data: ', this.state.data);
	// 	} catch (err) {
	// 		//need better error handling if the api key fails
	// 		console.log(err);
	// 	}
	// }

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

	chooseWeatherColor(temp, clouds) {
		this.setState({ weatherColor: 0x00bfff });
	}

	render() {
		// console.log(PixiApp.popUps);
		return <div></div>;
	}
}
