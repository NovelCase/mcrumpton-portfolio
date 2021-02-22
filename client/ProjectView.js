import React from 'react';
import * as PixiApp from '../pixi/projectStage.js';
import * as PIXI from 'pixi.js';
import { data } from '../data';
import { Scrollbox } from 'pixi-scrollbox';

export function createPopUpRect(title) {
  popUpProject.removeChildren();
  let x = PixiApp.app.renderer.view.width / 4;
  let y = (PixiApp.app.renderer.view.height * 9) / 4;
  let width = PixiApp.app.renderer.view.width / 2;
  let height = PixiApp.app.renderer.view.height / 2;
  console.log(window, PixiApp.app.renderer.view.width);
  if (window.outerWidth < 400) {
    x = 0;
    y = PixiApp.app.renderer.view.height * 2.125;
    width = window.outerWidth;
    height = PixiApp.app.renderer.view.height * 0.75;
  }
  const rect = new PIXI.Graphics();
  rect.beginFill(0xc2b9e1).drawRoundedRect(x, y, width, height, 20).endFill();
  rect.visible = true;

  const closeButton = new PIXI.Graphics();

  closeButton
    .beginFill(0x000000)
    .drawCircle(x + 20, y + 15, 10)
    .endFill();

  closeButton.visible = true;
  closeButton.interactive = true;
  closeButton.buttonMode = true;
  closeButton.on('pointertap', function () {
    popUpProject.removeChildren();
    popUpProject.visible = true;
  });
  popUpProject.addChild(rect);
  popUpProject.addChild(closeButton);
  let popTitle = createText(
    data[title].name,
    titleStyle,
    x + 50,
    y + 75,
    false,
    'projectTitle'
  );
  scrollbox = popUpProject.addChild(
    new Scrollbox({
      boxWidth: rect.width - 90,
      boxHeight: rect.height - 210,
    })
  );
  let projectDetails = scrollbox.content.addChild(new PIXI.Graphics());
  projectDetails
    .beginFill(0xc2b9e1, 0.25) /* 0xe3cdfe */
    .drawRect(0, 0, rect.width - 90, rect.height - 210)
    .endFill();
  scrollbox.position.set(x + 50, y + 160);

  let popDesc = createText(
    data[title].description,
    descriptionStyle,
    0,
    0,
    false,
    'projectDescription'
  );
  scrollbox.update();
  let popLinkOne = createText(
    data[title].linkOne,
    descriptionStyle,
    x + 75,
    y + rect.height - 50,
    true,
    'projectGithub'
  );
  popLinkOne.on('pointertap', () => openLink(title, 'One'));

  let popLinkTwo = createText(
    data[title].linkTwo,
    descriptionStyle,
    x + rect.width - 150,
    y + rect.height - 50,
    true,
    'projectLive'
  );
  popLinkTwo.on('pointertap', () => openLink(title, 'Two'));
  return popUpProject;
}

function openLink(projectName, linkType) {
  linkType = 'link' + linkType + 'Url';
  window.open(`${data[projectName][linkType]}`);
}

function createText(words, style, x, y, interactive, type) {
  const smallProject = {
    projectTitle: {
      y: (PixiApp.app.renderer.view.height / 2) * 0.4,
    },
    projectDescription: {
      y: (PixiApp.app.renderer.view.height / 2) * 0.55,
    },
    projectGithub: {
      x: (PixiApp.app.renderer.view.width / 2) * 2.2,
    },
    projectLive: {
      x: (PixiApp.app.renderer.view.width / 2) * 2.7,
    },
  };
  const styleTwo = { ...style };
  if (PixiApp.app.renderer.view.width < 400 && type.includes('project')) {
    smallProject[type].x
      ? (x = smallProject[type].x)
      : (x = (PixiApp.app.renderer.view.width / 2) * 2.2);
    smallProject[type].y
      ? (y = smallProject[type].y)
      : (y = (PixiApp.app.renderer.view.height / 4) * 2.95);
    styleTwo.fontSize = styleTwo.fontSize - 5;
  } else if (PixiApp.app.renderer.view.width < 400) {
    smallProject[type].x
      ? (x = smallProject[type].x)
      : (x = (PixiApp.app.renderer.view.width / 2) * 4.2);
    smallProject[type].y
      ? (y = smallProject[type].y)
      : (y = (PixiApp.app.renderer.view.height / 4) * 2.95);
    styleTwo.fontSize = styleTwo.fontSize - 5;
  }
  const text = new PIXI.Text(words, styleTwo);
  text.visible = true;
  text.position.x = x;
  text.position.y = y;
  if (interactive) {
    text.interactive = true;
    text.buttonMode = true;
  }
  if (type !== 'projectDescription') popUpProject.addChild(text);
  else scrollbox.content.addChild(text);
  return text;
}

let scrollbox;
let popUpProject = new PIXI.Container();
let textInfo = {};
let scales = {
  floor: 0.6,
  deskH: 0.8,
  deskW: 1.29,
  gobARk: 0.37 /* 0.85 */,
  seeTurtleExploration: 0.39 /* 0.85 */,
  brosApothecary: 0.42 /* 0.83 */,
  plantsR: 1,
  plantsL: 1,
  panel: 0.45,
};
/* Styling */
let titleStyle = {
  fontFamily: 'Montserrat',
  fontSize: 35,
  fontWeight: '600',
  wordWrap: true,
  wordWrapWidth: PixiApp.app.renderer.view.width / 2 - 150,
};
let descriptionStyle = {
  fontFamily: 'Montserrat',
  fontSize: 23,
  fontWeight: '400',
  lineHeight: 50,
  wordWrap: true,
  wordWrapWidth: PixiApp.app.renderer.view.width / 2 - 150,
};
let linkStyle = {
  fontFamily: 'Montserrat',
  fontSize: 23,
  fill: '#007EC7',
};
export default class ProjectView extends React.Component {
  createSprite(x, y, texture, type, interactive) {
    const sprite = new PIXI.Sprite(texture);
    PixiApp.projectView.addChild(sprite);
    sprite.anchor.set(0.5);
    sprite.position.x = x;
    sprite.position.y = y;
    sprite.scale.set(scales[type]);
    if (interactive) {
      sprite.interactive = true;
      sprite.buttonMode = true;
      sprite.on('pointertap', function () {
        createPopUpRect(type);
      });
    }

    return sprite;
  }
  componentDidMount() {
    /* textures */

    const plantsRTexture = PIXI.Texture.from(
      'siteAssets/projectView/plantsRightEdit.png'
    );
    const plantsLTexture = PIXI.Texture.from(
      'siteAssets/projectView/plantsLeftEdit.png'
    );
    const barkTexture = PIXI.Texture.from('siteAssets/projectView/gobARk.png');
    const broTexture = PIXI.Texture.from(
      'siteAssets/projectView/brosApothecary.png'
    );
    const seeTexture = PIXI.Texture.from(
      'siteAssets/projectView/seeTurtle.png'
    );

    const panelTexture = PIXI.Texture.from(
      'siteAssets/projectView/animationPanelEdit.png'
    );

    const panel = this.createSprite(
      (PixiApp.app.renderer.view.width / 2) * 0.95,
      (PixiApp.app.renderer.view.height / 2) * 5.13,
      panelTexture,
      'panel'
    );

    const gobARk = this.createSprite(
      (PixiApp.app.renderer.view.width / 2) * 0.78,
      (PixiApp.app.renderer.view.height / 2) * 5.31,
      barkTexture,
      'gobARk',
      true
    );

    const seeTurtle = this.createSprite(
      (PixiApp.app.renderer.view.width / 2) * 1.1,
      (PixiApp.app.renderer.view.height / 2) * 5.31,
      seeTexture,
      'seeTurtleExploration',
      true
    );

    const brosApothecary = this.createSprite(
      (PixiApp.app.renderer.view.width / 2) * 1.102,
      (PixiApp.app.renderer.view.height / 2) * 4.91,
      broTexture,
      'brosApothecary',
      true
    );

    const plantsR = this.createSprite(
      (PixiApp.app.renderer.view.width / 2) * 1.67,
      (PixiApp.app.renderer.view.height / 2) * 4.8497,
      plantsRTexture,
      'plantsR'
    );

    const plantsL = this.createSprite(
      (PixiApp.app.renderer.view.width / 2) * 0.14,
      (PixiApp.app.renderer.view.height / 2) * 4.8501,
      plantsLTexture,
      'plantsL'
    );
    PixiApp.projectView.addChild(popUpProject);
  }
  render() {
    return <div></div>;
  }
}
