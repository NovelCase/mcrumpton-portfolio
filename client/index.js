import React from 'react';
import ReactDOM from 'react-dom';
import '../public/style.css';
// import * as PixiApp from '../pixi/app.js';
import Project from './ProjectView';
import Welcome from './WelcomeView';
require('babel-core/register');
require('babel-polyfill');

ReactDOM.render(
	<div>
		<Project />
		{/* <Welcome /> */}
	</div>,
	document.getElementById('app')
);
