import '../public/style.css';
import React from 'react';
import { Link } from 'react-router-dom';
import * as PixiApp from '../pixi/projectStage.js';
import * as PIXI from 'pixi.js';
const { text } = require('../data');

let roomWidthProject = 2.5;
let roomWidthAbout = 4.5;
let turnOnInteractive = [];

export const onClick = (type, text, projectOne, projectTwo) => {
  if (type === 'about') {
    popUpAbout.visible = true;
    redXAbout.visible = true;
    textInfo[text].visible = true;
    about = text;
  } else {
    popUpProject.visible = true;
    redXProject.visible = true;
    textInfo[text].visible = true;
    textInfo[`${text}Description`].visible = true;
    textInfo[`${text}Github`].visible = true;
    textInfo[`${text}Live`].visible = true;
    project = text;
    turnOnInteractive.push(PixiApp[projectOne], PixiApp[projectTwo]);
  }
};
let about;
let project;
let popUpProject;
let redXProject;
let popUpAbout;
let redXAbout;
let textInfo = {};
export default class Project extends React.Component {
  componentDidMount() {
    /* Pop Up for Project View */
    popUpProject = new PIXI.Graphics();
    popUpProject
      .beginFill(0xf4f5e7)
      .drawRect(
        (window.innerWidth / 2) * roomWidthProject,
        (window.innerHeight / 2) * 0.5,
        window.innerWidth / 2,
        window.innerHeight / 2
      )
      .endFill();
    popUpProject.visible = false;
    PixiApp.popUps.addChild(popUpProject);

    /* Pop Up for About view */
    popUpAbout = new PIXI.Graphics();
    popUpAbout
      .beginFill(0xf4f5e7)
      .drawRect(
        (window.innerWidth / 2) * roomWidthAbout,
        (window.innerHeight / 2) * 0.5,
        window.innerWidth / 2,
        window.innerHeight / 2
      )
      .endFill();
    popUpAbout.visible = false;
    PixiApp.popUps.addChild(popUpAbout);

    const redXTexture = PIXI.Texture.from('/siteAssets/x-mark.png');
    /* redX for Project view */
    redXProject = new PIXI.Sprite(redXTexture);
    redXProject.position.x =
      (window.innerWidth / 2) * (roomWidthProject + 0.05);
    redXProject.position.y = (window.innerHeight / 3) * 0.9;
    redXProject.anchor.set(0.5);
    redXProject.visible = false;
    redXProject.interactive = true;
    redXProject.buttonMode = true;
    PixiApp.popUps.addChild(redXProject);
    redXProject.on('click', () => {
      popUpProject.visible = false;
      redXProject.visible = false;
      textInfo[project].visible = false;
      textInfo[`${project}Description`].visible = false;
      textInfo[`${project}Github`].visible = false;
      textInfo[`${project}Live`].visible = false;
      turnOnInteractive.forEach((project) => (project.interactive = true));
    });
    /* redX for About view */
    redXAbout = new PIXI.Sprite(redXTexture);
    redXAbout.position.x = (window.innerWidth / 2) * (roomWidthAbout + 0.05);
    redXAbout.position.y = (window.innerHeight / 3) * 0.9;
    redXAbout.anchor.set(0.5);
    redXAbout.visible = false;
    redXAbout.interactive = true;
    redXAbout.buttonMode = true;
    PixiApp.popUps.addChild(redXAbout);
    redXAbout.on('click', () => {
      popUpAbout.visible = false;
      redXAbout.visible = false;
      textInfo[about].visible = false;
    });

    /* Styling */
    let titleStyle = {
      fontSize: 30,
      fontWeight: 'bold',
    };
    let descriptionStyle = {
      fontSize: 20,
      fontWeight: '300',
      lineHeight: popUpProject.height / 12,
      wordWrap: true,
      wordWrapWidth: (popUpProject.width / 2) * 1.5,
    };
    let linkStyle = {
      fontSize: 19,
      fill: '#007EC7',
    };

    /* Promise Project */
    textInfo.promise = new PIXI.Text(`${text.promiseHS.name} -`, titleStyle);
    textInfo.promise.position.x =
      (popUpProject.width / 2) * (roomWidthProject * 2.09);
    textInfo.promise.position.y = (window.innerHeight / 2) * 0.63;
    textInfo.promise.visible = false;
    PixiApp.text.addChild(textInfo.promise);

    textInfo.promiseDescription = new PIXI.Text(
      `${text.promiseHS.description}`,
      descriptionStyle
    );
    textInfo.promiseDescription.visible = false;
    textInfo.promiseDescription.position.x =
      (popUpProject.width / 2) * (roomWidthProject * 2.09);
    textInfo.promiseDescription.position.y = (window.innerHeight / 2) * 0.78;
    PixiApp.text.addChild(textInfo.promiseDescription);

    textInfo.promiseGithub = new PIXI.Text('Github', linkStyle);
    textInfo.promiseGithub.visible = false;
    textInfo.promiseGithub.position.x =
      (popUpProject.width / 2) * (roomWidthProject * 2.09);
    textInfo.promiseGithub.position.y = (window.innerHeight / 4) * 2.7;
    textInfo.promiseGithub.interactive = true;
    textInfo.promiseGithub.buttonMode = true;
    textInfo.promiseGithub.on('click', () =>
      console.log(`${text.promiseHS.linkOneUrl}`)
    );
    PixiApp.text.addChild(textInfo.promiseGithub);

    textInfo.promiseLive = new PIXI.Text('Live Site', linkStyle);
    textInfo.promiseLive.visible = false;
    textInfo.promiseLive.position.x =
      (popUpProject.width / 2) * (roomWidthProject * 2.2);
    textInfo.promiseLive.position.y = (window.innerHeight / 4) * 2.7;
    textInfo.promiseLive.interactive = true;
    textInfo.promiseLive.buttonMode = true;
    textInfo.promiseLive.on('click', () =>
      console.log(`${text.promiseHS.linkTwoUrl}`)
    );
    PixiApp.text.addChild(textInfo.promiseLive);

    /* gobARk Project */
    textInfo.gobARk = new PIXI.Text(`${text.gobARk.name} -`, titleStyle);
    textInfo.gobARk.visible = false;
    textInfo.gobARk.position.x =
      (popUpProject.width / 2) * (roomWidthProject * 2.09);
    textInfo.gobARk.position.y = (window.innerHeight / 2) * 0.63;
    PixiApp.text.addChild(textInfo.gobARk);

    textInfo.gobARkDescription = new PIXI.Text(
      `${text.gobARk.description}`,
      descriptionStyle
    );
    textInfo.gobARkDescription.visible = false;
    textInfo.gobARkDescription.position.x =
      (popUpProject.width / 2) * (roomWidthProject * 2.09);
    textInfo.gobARkDescription.position.y = (window.innerHeight / 2) * 0.78;
    PixiApp.text.addChild(textInfo.gobARkDescription);

    textInfo.gobARkGithub = new PIXI.Text('Github', linkStyle);
    textInfo.gobARkGithub.visible = false;
    textInfo.gobARkGithub.position.x =
      (popUpProject.width / 2) * (roomWidthProject * 2.09);
    textInfo.gobARkGithub.position.y = (window.innerHeight / 4) * 2.7;
    textInfo.gobARkGithub.interactive = true;
    textInfo.gobARkGithub.buttonMode = true;
    textInfo.gobARkGithub.on('click', () =>
      console.log(`${text.gobARk.linkOneUrl}`)
    );
    PixiApp.text.addChild(textInfo.gobARkGithub);

    textInfo.gobARkLive = new PIXI.Text('Live Site', linkStyle);
    textInfo.gobARkLive.visible = false;
    textInfo.gobARkLive.position.x =
      (popUpProject.width / 2) * (roomWidthProject * 2.2);
    textInfo.gobARkLive.position.y = (window.innerHeight / 4) * 2.7;
    textInfo.gobARkLive.interactive = true;
    textInfo.gobARkLive.buttonMode = true;
    textInfo.gobARkLive.on('click', () =>
      console.log(`${text.gobARk.linkTwoUrl}`)
    );
    PixiApp.text.addChild(textInfo.gobARkLive);

    /* Chai Noon Project */
    textInfo.chai = new PIXI.Text(`${text.chai.name} -`, titleStyle);
    textInfo.chai.visible = false;
    textInfo.chai.position.x =
      (popUpProject.width / 2) * (roomWidthProject * 2.09);
    textInfo.chai.position.y = (window.innerHeight / 2) * 0.63;
    PixiApp.text.addChild(textInfo.chai);

    textInfo.chaiDescription = new PIXI.Text(
      `${text.chai.description}`,
      descriptionStyle
    );
    textInfo.chaiDescription.visible = false;
    textInfo.chaiDescription.position.x =
      (popUpProject.width / 2) * (roomWidthProject * 2.09);
    textInfo.chaiDescription.position.y = (window.innerHeight / 2) * 0.78;
    PixiApp.text.addChild(textInfo.chaiDescription);

    textInfo.chaiGithub = new PIXI.Text('Github', linkStyle);
    textInfo.chaiGithub.visible = false;
    textInfo.chaiGithub.position.x =
      (popUpProject.width / 2) * (roomWidthProject * 2.09);
    textInfo.chaiGithub.position.y = (window.innerHeight / 4) * 2.7;
    textInfo.chaiGithub.interactive = true;
    textInfo.chaiGithub.buttonMode = true;
    textInfo.chaiGithub.on('click', () =>
      console.log(`${text.chai.linkOneUrl}`)
    );
    PixiApp.text.addChild(textInfo.chaiGithub);

    textInfo.chaiLive = new PIXI.Text('Live Site', linkStyle);
    textInfo.chaiLive.visible = false;
    textInfo.chaiLive.position.x =
      (popUpProject.width / 2) * (roomWidthProject * 2.2);
    textInfo.chaiLive.position.y = (window.innerHeight / 4) * 2.7;
    textInfo.chaiLive.interactive = true;
    textInfo.chaiLive.buttonMode = true;
    textInfo.chaiLive.on('click', () => console.log(`${text.chai.linkTwoUrl}`));
    PixiApp.text.addChild(textInfo.chaiLive);

    /* About Setion */
    textInfo.bfa = new PIXI.Text('thingy mcThingy');
    textInfo.bfa.visible = false;
    textInfo.bfa.position.x = (window.innerWidth / 2) * (roomWidthAbout + 0.05);
    textInfo.bfa.position.y = (window.innerHeight / 3) * 0.9;
    PixiApp.text.addChild(textInfo.bfa);
  }

  render() {
    // console.log(data.text);
    // console.log(textInfo);
    return <div></div>;
  }
}
