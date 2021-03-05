import React from 'react';
import * as PixiApp from '../pixi/projectStage.js';
import * as PIXI from 'pixi.js';
import { data } from '../data';
import { Scrollbox } from 'pixi-scrollbox';

let width = PixiApp.app.renderer.view.width / 2;
export function createPopUpRect(title, x, y, scrollView, popUpView) {
  popUpProject.removeChildren();
  let height = PixiApp.app.renderer.view.height / 2;
  if (window.innerWidth < 500) {
    x = 0;
    popUpView === PixiApp.secondView
      ? (y = PixiApp.app.renderer.view.height * 1.125)
      : (y = PixiApp.app.renderer.view.height * 2.125);
    width = window.innerWidth;
    height = PixiApp.app.renderer.view.height * 0.75;
  }
  let shadow = new PIXI.Graphics();
  shadow
    .beginFill(0x000000, 0.65)
    .drawRect(
      0,
      0,
      PixiApp.app.renderer.view.width * 4,
      PixiApp.app.renderer.view.height * 4
    )
    .endFill();
  shadow.visible = true;

  let rect = new PIXI.Graphics();
  rect.beginFill(0xd4cce7).drawRoundedRect(x, y, width, height, 20).endFill();
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
    PixiApp.app.stage.pivot.y = popUpView;
    PixiApp.menuContainer.position.y = popUpView + 10;
    popUpProject.removeChildren();
    popUpProject.visible = true;
    PixiApp.noScroll[scrollView] = true;
  });
  popUpProject.addChild(shadow);
  popUpProject.addChild(rect);
  popUpProject.addChild(closeButton);
  let popTitle = createText(
    data[title].name,
    titleStyle,
    x + rect.width / 10,
    y + 50,
    false,
    'projectTitle'
  );
  scrollbox = popUpProject.addChild(
    new Scrollbox({
      boxWidth: (rect.width / 11) * 8.9,
      boxHeight: rect.height - 210,
    })
  );
  let projectDetails = scrollbox.content.addChild(new PIXI.Graphics());
  projectDetails
    .beginFill(0xd4cce7, 0.25)
    .drawRect(0, 0, (rect.width / 11) * 8.5, rect.height - 210)
    .endFill();
  scrollbox.position.set(x + rect.width / 10, y + 160);
  if (window.innerWidth < 800) {
    scrollbox.boxWidth = (rect.width / 11) * 9.5;
    scrollbox.position.x = rect.width / 15;
  }

  if (title === 'stack') {
    let stacks = createStackSprite(0, 0, data.stack.techStack, 'techStack');
    scrollbox.boxWidth = (rect.width / 11) * 9.2;
  } else {
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
      linkStyle,
      x + rect.width / 6,
      y + rect.height - 50,
      true,
      'projectGithub'
    );
    popLinkOne.on('pointertap', () => openLink(title, 'One'));

    let popLinkTwo = createText(
      data[title].linkTwo,
      linkStyle,
      x + (rect.width / 6) * 5,
      y + rect.height - 50,
      true,
      'projectLive'
    );
    popLinkTwo.on('pointertap', () => openLink(title, 'Two'));
  }

  return popUpProject;
}

function createStackSprite(x, y, texture, type) {
  const sprite = new PIXI.Sprite(texture);
  scrollbox.content.addChild(sprite);
  sprite.position.x = x;
  sprite.position.y = y;
  sprite.scale.set(scales[type][0]);
  return sprite;
}

function openLink(projectName, linkType) {
  linkType = 'link' + linkType + 'Url';
  window.open(`${data[projectName][linkType]}`);
}

function createText(words, style, x, y, interactive, type) {
  const styleTwo = { ...style };
  if (window.innerWidth < 500 && window.innerHeight < 700) {
    styleTwo.fontSize -= 10;
    styleTwo.wordWrapWidth = (window.innerWidth / 4) * 3.4;
  } else if (window.innerWidth < 500 && window.innerHeight < 850) {
    styleTwo.fontSize -= 5;
  }
  const text = new PIXI.Text(words, styleTwo);
  if (type === 'projectLive') text.anchor.set(1, 0);
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

/* Scales */
let scales = {
  gobARk: [0.37, 0.36],
  seeTurtleExploration: [0.38, 0.37],
  brosApothecary: [0.39, 0.41],
  novelCase: [0.35, 0.35],
  plantsR: [1, 1.1],
  plantsL: [1, 1.1],
  panel: [0.45, 0.45],
  stack: [0.4, 0.4],
  techStack: [0.3, 0.3],
};

let mobileScalesY600 = {
  gobARk: [0.24, 0.24],
  gobARkX: (PixiApp.app.renderer.view.width / 2) * 0.5,
  gobARkY: (PixiApp.app.renderer.view.height / 2) * 5.2799,
  seeTurtleExploration: [0.26, 0.26],
  seeTurtleExplorationX: (PixiApp.app.renderer.view.width / 2) * 1.52,
  seeTurtleExplorationY: (PixiApp.app.renderer.view.height / 2) * 5.275,
  brosApothecary: [0.27, 0.27],
  brosApothecaryX: (PixiApp.app.renderer.view.width / 2) * 1.53,
  brosApothecaryY: (PixiApp.app.renderer.view.height / 2) * 4.88,
  plantsR: [0, 0],
  plantsL: [0, 0],
  panel: [0.3, 0.3],
  panelX: (PixiApp.app.renderer.view.width / 2) * 1.02,
  panelY: (PixiApp.app.renderer.view.height / 2) * 5.1,
  novelCase: [0.24, 0.24],
  novelCaseX: (PixiApp.app.renderer.view.width / 2) * 0.5,
  novelCaseY: (PixiApp.app.renderer.view.height / 2) * 4.87,
  stack: [0.3, 0.3],
  stackX: (PixiApp.app.renderer.view.width / 2) * 1.47,
  stackY: (PixiApp.app.renderer.view.height / 2) * 4.47,
};

let mobileScalesY700 = {
  gobARk: [0.265, 0.265],
  gobARkX: (PixiApp.app.renderer.view.width / 2) * 0.5,
  gobARkY: (PixiApp.app.renderer.view.height / 2) * 5.2799,
  seeTurtleExploration: [0.28, 0.28],
  seeTurtleExplorationX: (PixiApp.app.renderer.view.width / 2) * 1.52,
  seeTurtleExplorationY: (PixiApp.app.renderer.view.height / 2) * 5.275,
  brosApothecary: [0.29, 0.29],
  brosApothecaryX: (PixiApp.app.renderer.view.width / 2) * 1.53,
  brosApothecaryY: (PixiApp.app.renderer.view.height / 2) * 4.88,
  plantsR: [0, 0],
  plantsL: [0, 0],
  panel: [0.35, 0.35],
  panelX: (PixiApp.app.renderer.view.width / 2) * 1.02,
  panelY: (PixiApp.app.renderer.view.height / 2) * 5.1,
  novelCase: [0.24, 0.24],
  novelCaseX: (PixiApp.app.renderer.view.width / 2) * 0.5,
  novelCaseY: (PixiApp.app.renderer.view.height / 2) * 4.87,
  stack: [0.3, 0.3],
  stackX: (PixiApp.app.renderer.view.width / 2) * 1.47,
  stackY: (PixiApp.app.renderer.view.height / 2) * 4.47,
};

let mobileScalesY800 = {
  gobARk: [0.29, 0.29],
  gobARkX: (PixiApp.app.renderer.view.width / 2) * 0.46,
  gobARkY: (PixiApp.app.renderer.view.height / 2) * 5.27,
  seeTurtleExploration: [0.3, 0.3],
  seeTurtleExplorationX: (PixiApp.app.renderer.view.width / 2) * 1.52,
  seeTurtleExplorationY: (PixiApp.app.renderer.view.height / 2) * 5.265,
  brosApothecary: [0.31, 0.31],
  brosApothecaryX: (PixiApp.app.renderer.view.width / 2) * 1.53,
  brosApothecaryY: (PixiApp.app.renderer.view.height / 2) * 4.9,
  plantsR: [0, 0],
  plantsL: [0, 0],
  panel: [0.375, 0.375],
  panelX: (PixiApp.app.renderer.view.width / 2) * 1.02,
  panelY: (PixiApp.app.renderer.view.height / 2) * 5.1,
  novelCase: [0.24, 0.24],
  novelCaseX: (PixiApp.app.renderer.view.width / 2) * 0.5,
  novelCaseY: (PixiApp.app.renderer.view.height / 2) * 4.88,
  stack: [0.3, 0.3],
  stackX: (PixiApp.app.renderer.view.width / 2) * 1.47,
  stackY: (PixiApp.app.renderer.view.height / 2) * 4.53,
};

/* Styling */
let titleStyle = {
  fontFamily: 'Cutive',
  fontSize: 35,
  fontWeight: '600',
  wordWrap: true,
  wordWrapWidth: Math.max(PixiApp.app.renderer.view.width / 2.5, 300),
};
let descriptionStyle = {
  fontFamily: 'Cutive',
  fontSize: 23,
  fontWeight: '400',
  lineHeight: 50,
  wordWrap: true,
  wordWrapWidth: Math.max(PixiApp.app.renderer.view.width / 2.5, 300),
};
let linkStyle = {
  fontFamily: 'Cutive',
  fontSize: 23,
  fill: '#007EC7',
};
export default class ProjectView extends React.Component {
  createSprite(x, y, texture, type, interactive, anchor) {
    let scaleType = scales;
    if (
      PixiApp.app.renderer.view.width < 380 &&
      PixiApp.app.renderer.view.height < 600
    ) {
      scaleType = mobileScalesY600;
      if (scaleType[`${type}X`]) x = scaleType[`${type}X`];
      if (scaleType[`${type}Y`]) y = scaleType[`${type}Y`];
    } else if (
      PixiApp.app.renderer.view.width < 380 &&
      PixiApp.app.renderer.view.height < 700
    ) {
      scaleType = mobileScalesY700;
      if (scaleType[`${type}X`]) x = scaleType[`${type}X`];
      if (scaleType[`${type}Y`]) y = scaleType[`${type}Y`];
    } else if (
      PixiApp.app.renderer.view.width < 450 &&
      PixiApp.app.renderer.view.height < 850
    ) {
      scaleType = mobileScalesY800;
      if (scaleType[`${type}X`]) x = scaleType[`${type}X`];
      if (scaleType[`${type}Y`]) y = scaleType[`${type}Y`];
    }
    const sprite = new PIXI.Sprite(texture);
    PixiApp.projectView.addChild(sprite);
    anchor ? sprite.anchor.set(anchor[0], anchor[1]) : sprite.anchor.set(0.5);
    sprite.position.x = x;
    sprite.position.y = y;
    sprite.scale.x = scaleType[type][0];
    sprite.scale.y = scaleType[type][1];
    if (interactive) {
      sprite.interactive = true;
      sprite.buttonMode = true;
      sprite.on('pointerover', function () {
        sprite.scale.set(scaleType[type][0] * 1.3);
      });
      sprite.on('pointerout', function () {
        sprite.scale.set(scaleType[type][0]);
      });
      sprite.on('pointertap', function () {
        PixiApp.app.stage.pivot.y = PixiApp.thirdView;
        PixiApp.menuContainer.position.y = PixiApp.thirdView + 10;
        createPopUpRect(
          type,
          PixiApp.app.renderer.view.width / 4,
          (PixiApp.app.renderer.view.height * 9) / 4,
          'projectScrolling',
          PixiApp.thirdView
        );
        PixiApp.noScroll.projectScrolling = false;
      });
      sprite.on('touchstart', function () {
        sprite.scale.set(scaleType[type][0] * 1.5);
      });
      sprite.on('touchend', function () {
        sprite.scale.set(scaleType[type][0]);
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
      'siteAssets/projectView/animationPanel.png'
    );
    const novelTexture = PIXI.Texture.from(
      'siteAssets/projectView/novelCase.png'
    );
    const stackTexture = PIXI.Texture.from('siteAssets/projectView/stack.png');

    const panel = this.createSprite(
      (PixiApp.app.renderer.view.width / 2) * 0.95,
      (PixiApp.app.renderer.view.height / 2) * 5.13,
      panelTexture,
      'panel'
    );

    const gobARk = this.createSprite(
      panel.x * 0.83,
      panel.y * 1.034,
      barkTexture,
      'gobARk',
      true
    );

    const seeTurtle = this.createSprite(
      panel.x * 1.158,
      panel.y * 1.034,
      seeTexture,
      'seeTurtleExploration',
      true
    );

    const brosApothecary = this.createSprite(
      panel.x * 1.15,
      panel.y * 0.96,
      broTexture,
      'brosApothecary',
      true
    );

    const stack = this.createSprite(
      panel.x * 1.15,
      panel.y * 0.885,
      stackTexture,
      'stack',
      true
    );

    const novelCase = this.createSprite(
      panel.x * 0.838,
      panel.y * 0.96,
      novelTexture,
      'novelCase',
      true
    );

    const plantsR = this.createSprite(
      PixiApp.app.renderer.view.width * 0.89,
      (PixiApp.app.renderer.view.height / 2) * 4.9,
      plantsRTexture,
      'plantsR',
      false
    );

    const plantsL = this.createSprite(
      0,
      (PixiApp.app.renderer.view.height / 2) * 4.3,
      plantsLTexture,
      'plantsL',
      false,
      [0.2, 0.2]
    );
    PixiApp.projectView.addChild(popUpProject);
  }
  render() {
    return <div></div>;
  }
}
