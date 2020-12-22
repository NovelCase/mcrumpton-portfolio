import React from 'react';
import ReactDOM from 'react-dom';
import '../public/style.css';
import * as PixiApp from '../pixi/app.js';
// import socket from "socket.io-client";

// const clientSocket = socket(window.location.origin);

// clientSocket.on("connect", () => {
// 	console.log("Connected to server");
// });

ReactDOM.render(
	<div>
		<h1>Outside of canvas</h1>
	</div>,
	document.getElementById('app')
);
