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
		let scale = 1;
		if (PixiApp.appWidth < 400) {
			scale = 0.5;
		} else if (PixiApp.appWidth < 500) {
			scale = 0.7;
		}

		weatherWindow
			.beginFill(this.state.weatherColor)
			.drawRect(
				(PixiApp.appWidth / 5) * scale,
				(PixiApp.appHeight / 9.5) * scale,
				(PixiApp.appWidth / 2.4) * scale,
				(PixiApp.appHeight / 2.7) * scale
			)
			.endFill();

		PixiApp.windowWeather.addChild(weatherWindow);

		sideWeatherWindow = new PIXI.Graphics();
		sideWeatherWindow
			.beginFill(this.state.weatherColor)
			.drawPolygon([
				//top left corner
				PixiApp.appWidth / 17,
				PixiApp.appHeight / 2.75,
				//bottom left
				PixiApp.appWidth / 17,
				PixiApp.appHeight - PixiApp.appHeight * 0.3,
				//bottom right
				PixiApp.appWidth / 6,
				PixiApp.appHeight - PixiApp.appHeight * 0.5,
				//top right corner
				PixiApp.appWidth / 6,
				PixiApp.appHeight / 7,
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
