import React from 'react';
import * as PixiApp from '../pixi/projectStage.js';
import * as PIXI from 'pixi.js';
const { text } = require('../data');

let roomWidthProject = 2.5;
let roomWidthAbout = 4.5;
let turnOnInteractive = [];

export const onClick = (type, title, itemArr) => {
  if (type === 'about') {
    popUpAbout.visible = true;
    redXAbout.visible = true;
    about = title;
    if (textInfo[`${title}GoodReads`]) {
      textInfo[`${title}GoodReads`].visible = true;
    }
  } else {
    popUpProject.visible = true;
    redXProject.visible = true;
    textInfo[`${title}Github`].visible = true;
    textInfo[`${title}Live`].visible = true;
    project = title;
  }
  textInfo[title].visible = true;
  textInfo[`${title}Description`].visible = true;
  itemArr.forEach((item) => turnOnInteractive.push(item));
  console.log(turnOnInteractive);
};
let about;
let project;
let popUpProject;
let redXProject;
let popUpAbout;
let redXAbout;
let textInfo = {};
export default class Project extends React.Component {
  createPopUpRect(x, y) {
    const rect = new PIXI.Graphics();
    rect
      .beginFill(0xf4f5e7)
      .drawRoundedRect(x, y, window.innerWidth / 2, window.innerHeight / 2, 20)
      .endFill();
    rect.visible = false;
    PixiApp.popUps.addChild(rect);
    return rect;
  }
  createRedX(x, y) {
    const redXTexture = PIXI.Texture.from('/siteAssets/x-mark.png');
    const redX = new PIXI.Sprite(redXTexture);
    redX.position.x = x;
    redX.position.y = y;
    redX.anchor.set(0.5);
    redX.visible = false;
    redX.interactive = true;
    redX.buttonMode = true;
    PixiApp.popUps.addChild(redX);
    return redX;
  }
  openLink(projectName, linkType) {
    let link;
    if (linkType === 'Github' || linkType === 'GoodReads') {
      link = 'linkOneUrl';
    } else {
      link = 'linkTwoUrl';
    }
    window.open(`${text[projectName][link]}`);
  }
  createText(words, style, x, y, interactive) {
    const text = new PIXI.Text(words, style);
    text.visible = false;
    text.position.x = x;
    text.position.y = y;
    if (interactive) {
      text.interactive = true;
      text.buttonMode = true;
    }
    PixiApp.text.addChild(text);
    return text;
  }
  componentDidMount() {
    /* Pop Up for Project View */
    popUpProject = this.createPopUpRect(
      (window.innerWidth / 2) * roomWidthProject,
      (window.innerHeight / 2) * 0.5
    );

    /* Pop Up for About view */
    popUpAbout = this.createPopUpRect(
      (window.innerWidth / 2) * roomWidthAbout,
      (window.innerHeight / 2) * 0.5
    );

    /* redX for Project view */
    redXProject = this.createRedX(
      (window.innerWidth / 2) * (roomWidthProject + 0.05),
      (window.innerHeight / 3) * 0.9
    );
    redXProject.on('click', () => {
      popUpProject.visible = false;
      redXProject.visible = false;
      textInfo[project].visible = false;
      textInfo[`${project}Description`].visible = false;
      textInfo[`${project}Github`].visible = false;
      textInfo[`${project}Live`].visible = false;
      turnOnInteractive.forEach((project) => (project.interactive = true));
      turnOnInteractive = [];
    });
    redXProject.on('tap', () => {
      popUpProject.visible = false;
      redXProject.visible = false;
      textInfo[project].visible = false;
      textInfo[`${project}Description`].visible = false;
      textInfo[`${project}Github`].visible = false;
      textInfo[`${project}Live`].visible = false;
      turnOnInteractive.forEach((project) => (project.interactive = true));
      turnOnInteractive = [];
    });

    /* redX for About view */
    redXAbout = this.createRedX(
      (window.innerWidth / 2) * (roomWidthAbout + 0.05),
      (window.innerHeight / 3) * 0.9
    );
    redXAbout.on('click', () => {
      popUpAbout.visible = false;
      redXAbout.visible = false;
      textInfo[about].visible = false;
      textInfo[`${about}Description`].visible = false;
      if (textInfo[`${about}GoodReads`])
        textInfo[`${about}GoodReads`].visible = false;
      turnOnInteractive.forEach((about) => (about.interactive = true));
      turnOnInteractive = [];
    });
    redXAbout.on('tap', () => {
      popUpAbout.visible = false;
      redXAbout.visible = false;
      textInfo[about].visible = false;
      textInfo[`${about}Description`].visible = false;
      if (textInfo[`${about}GoodReads`])
        textInfo[`${about}GoodReads`].visible = false;
      turnOnInteractive.forEach((about) => (about.interactive = true));
      turnOnInteractive = [];
    });

    /* Styling */
    let titleStyle = {
      fontFamily: 'Nunito Sans',
      fontSize: 30,
      fontWeight: 'bold',
    };
    let descriptionStyle = {
      fontFamily: 'Nunito Sans',
      fontSize: 18,
      fontWeight: '300',
      lineHeight: popUpProject.height / 12,
      wordWrap: true,
      wordWrapWidth: (popUpProject.width / 2) * 1.5,
    };
    let linkStyle = {
      fontFamily: 'Nunito Sans',
      fontSize: 18,
      fill: '#007EC7',
    };

    /* Promise Project */
    textInfo.promise = this.createText(
      `${text.promiseHS.name} -`,
      titleStyle,
      (popUpProject.width / 2) * (roomWidthProject * 2.09),
      (window.innerHeight / 2) * 0.63,
      false
    );

    textInfo.promiseDescription = this.createText(
      `${text.promiseHS.description}`,
      descriptionStyle,
      (popUpProject.width / 2) * (roomWidthProject * 2.09),
      (window.innerHeight / 2) * 0.78,
      false
    );

    textInfo.promiseGithub = this.createText(
      'Github',
      linkStyle,
      (popUpProject.width / 2) * (roomWidthProject * 2.09),
      (window.innerHeight / 4) * 2.7,
      true
    );
    textInfo.promiseGithub.on('click', () =>
      this.openLink('promiseHS', 'Github')
    );
    textInfo.promiseGithub.on('tap', () =>
      this.openLink('promiseHs', 'Github')
    );

    textInfo.promiseLive = this.createText(
      'Live Site',
      linkStyle,
      (popUpProject.width / 2) * (roomWidthProject * 2.2),
      (window.innerHeight / 4) * 2.7,
      true
    );
    textInfo.promiseLive.on('click', () => this.openLink('promiseHS', 'Live'));
    textInfo.promiseLive.on('tap', () => this.openLink('promiseHS', 'Live'));

    /* gobARk Project */
    textInfo.gobARk = this.createText(
      `${text.gobARk.name} -`,
      titleStyle,
      (popUpProject.width / 2) * (roomWidthProject * 2.09),
      (window.innerHeight / 2) * 0.63,
      false
    );

    textInfo.gobARkDescription = this.createText(
      `${text.gobARk.description}`,
      descriptionStyle,
      (popUpProject.width / 2) * (roomWidthProject * 2.09),
      (window.innerHeight / 2) * 0.78,
      false
    );

    textInfo.gobARkGithub = this.createText(
      'Github',
      linkStyle,
      (popUpProject.width / 2) * (roomWidthProject * 2.09),
      (window.innerHeight / 4) * 2.7,
      true
    );
    textInfo.gobARkGithub.on('click', () => this.openLink('gobARk', 'Github'));
    textInfo.gobARkGithub.on('tap', () => this.openLink('gobARk', 'Github'));

    textInfo.gobARkLive = this.createText(
      'Presentation',
      linkStyle,
      (popUpProject.width / 2) * (roomWidthProject * 2.2),
      (window.innerHeight / 4) * 2.7,
      true
    );
    new PIXI.Text('Live Site', linkStyle);
    textInfo.gobARkLive.on('click', () => this.openLink('gobARk', 'Live'));
    textInfo.gobARkLive.on('tap', () => this.openLink('gobARk', 'Live'));

    /* Chai Noon Project */
    textInfo.chai = this.createText(
      `${text.chai.name} -`,
      titleStyle,
      (popUpProject.width / 2) * (roomWidthProject * 2.09),
      (window.innerHeight / 2) * 0.63,
      false
    );

    textInfo.chaiDescription = this.createText(
      `${text.chai.description}`,
      descriptionStyle,
      (popUpProject.width / 2) * (roomWidthProject * 2.09),
      (window.innerHeight / 2) * 0.78,
      false
    );

    textInfo.chaiGithub = this.createText(
      'Github',
      linkStyle,
      (popUpProject.width / 2) * (roomWidthProject * 2.09),
      (window.innerHeight / 4) * 2.7,
      true
    );
    textInfo.chaiGithub.on('click', () => this.openLink('chai', 'Github'));
    textInfo.chaiGithub.on('tap', () => this.openLink('chai', 'Github'));

    textInfo.chaiLive = this.createText(
      'Live Site',
      linkStyle,
      (popUpProject.width / 2) * (roomWidthProject * 2.2),
      (window.innerHeight / 4) * 2.7,
      true
    );
    textInfo.chaiLive.on('click', () => this.openLink('chai', 'Live'));
    textInfo.chaiLive.on('tap', () => this.openLink('chai', 'Live'));

    /* About Setion */
    /* bfa book */
    textInfo.bfa = this.createText(
      `${text.bfa.name}`,
      titleStyle,
      (window.innerWidth / 2) * (roomWidthAbout + 0.1),
      (window.innerHeight / 3) * 0.98,
      false
    );
    textInfo.bfaDescription = this.createText(
      `${text.bfa.description}`,
      descriptionStyle,
      (window.innerWidth / 2) * (roomWidthAbout + 0.1),
      (window.innerHeight / 3) * 1.15,
      false
    );
    textInfo.bfaGoodReads = this.createText(
      'Good Reads',
      linkStyle,
      (window.innerWidth / 2) * (roomWidthAbout + 0.1),
      (window.innerHeight / 3) * 2,
      true
    );
    textInfo.bfaGoodReads.on('click', () => this.openLink('bfa', 'GoodReads'));
    textInfo.bfaGoodReads.on('tap', () => this.openLink('bfa', 'GoodReads'));

    /* Convo Book */
    textInfo.convo = this.createText(
      `${text.convo.name}`,
      titleStyle,
      (window.innerWidth / 2) * (roomWidthAbout + 0.1),
      (window.innerHeight / 3) * 0.98,
      false
    );
    textInfo.convoDescription = this.createText(
      `${text.convo.description}`,
      descriptionStyle,
      (window.innerWidth / 2) * (roomWidthAbout + 0.1),
      (window.innerHeight / 3) * 1.15,
      false
    );
    textInfo.convoGoodReads = this.createText(
      'Good Reads',
      linkStyle,
      (window.innerWidth / 2) * (roomWidthAbout + 0.1),
      (window.innerHeight / 3) * 2,
      true
    );
    textInfo.convoGoodReads.on('click', () =>
      this.openLink('convo', 'GoodReads')
    );
    textInfo.convoGoodReads.on('tap', () =>
      this.openLink('convo', 'GoodReads')
    );

    /* Blue Ocean Book */
    textInfo.blueOcean = this.createText(
      `${text.blueOcean.name}`,
      titleStyle,
      (window.innerWidth / 2) * (roomWidthAbout + 0.1),
      (window.innerHeight / 3) * 0.98,
      false
    );
    textInfo.blueOceanDescription = this.createText(
      `${text.blueOcean.description}`,
      descriptionStyle,
      (window.innerWidth / 2) * (roomWidthAbout + 0.1),
      (window.innerHeight / 3) * 1.15,
      false
    );
    textInfo.blueOceanGoodReads = this.createText(
      'Good Reads',
      linkStyle,
      (window.innerWidth / 2) * (roomWidthAbout + 0.1),
      (window.innerHeight / 3) * 2,
      true
    );
    textInfo.blueOceanGoodReads.on('click', () =>
      this.openLink('blueOcean', 'GoodReads')
    );
    textInfo.blueOceanGoodReads.on('tap', () =>
      this.openLink('blueOcean', 'GoodReads')
    );

    /* presence book */
    textInfo.presence = this.createText(
      `${text.presence.name}`,
      titleStyle,
      (window.innerWidth / 2) * (roomWidthAbout + 0.1),
      (window.innerHeight / 3) * 0.98,
      false
    );
    textInfo.presenceDescription = this.createText(
      `${text.presence.description}`,
      descriptionStyle,
      (window.innerWidth / 2) * (roomWidthAbout + 0.1),
      (window.innerHeight / 3) * 1.15,
      false
    );
    textInfo.presenceGoodReads = textInfo.blueOceanGoodReads = this.createText(
      'Good Reads',
      linkStyle,
      (window.innerWidth / 2) * (roomWidthAbout + 0.1),
      (window.innerHeight / 3) * 2,
      true
    );
    textInfo.presenceGoodReads.on('click', () =>
      this.openLink('presence', 'GoodReads')
    );
    textInfo.presenceGoodReads.on('tap', () =>
      this.openLink('presence', 'GoodReads')
    );

    textInfo.krimson = this.createText(
      `${text.plants.name}`,
      titleStyle,
      (window.innerWidth / 2) * (roomWidthAbout + 0.1),
      (window.innerHeight / 3) * 0.98,
      false
    );
    textInfo.krimsonDescription = this.createText(
      `${text.plants.description}`,
      descriptionStyle,
      (window.innerWidth / 2) * (roomWidthAbout + 0.1),
      (window.innerHeight / 3) * 1.15,
      false
    );

    textInfo.goat = this.createText(
      `${text.coffee.name}`,
      titleStyle,
      (window.innerWidth / 2) * (roomWidthAbout + 0.1),
      (window.innerHeight / 3) * 0.98,
      false
    );
    textInfo.goatDescription = this.createText(
      `${text.coffee.description}`,
      descriptionStyle,
      (window.innerWidth / 2) * (roomWidthAbout + 0.1),
      (window.innerHeight / 3) * 1.15,
      false
    );

    textInfo.stagg = this.createText(
      `${text.coffee.name}`,
      titleStyle,
      (window.innerWidth / 2) * (roomWidthAbout + 0.1),
      (window.innerHeight / 3) * 0.98,
      false
    );
    textInfo.staggDescription = this.createText(
      `${text.coffee.description}`,
      descriptionStyle,
      (window.innerWidth / 2) * (roomWidthAbout + 0.1),
      (window.innerHeight / 3) * 1.15,
      false
    );
  }

  render() {
    return <div></div>;
  }
}
