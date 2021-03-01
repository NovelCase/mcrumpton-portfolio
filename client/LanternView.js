import React from 'react';
import * as PixiApp from '../pixi/projectStage.js';
import * as PIXI from 'pixi.js';
import { data } from '../data';

export const onClick = () => {};

let scales = {
  lantern: [1.1, 1.1],
  grass: [0.8, 1.05],
  book: [0.7, 0.7],
  teapot: [0.7, 0.7],
  nintendoSwitch: [0.7, 0.7],
  ipad: [0.7, 0.7],
  souls: [0.6, 0.6],
  moreInfo: [0.08, 0.08],
};

let mobileScalesY600 = {
  lantern: [0.75, 0.75],
  grass: [0.6, 0.55],
  book: [0.3, 0.3],
  bookX: (PixiApp.app.renderer.view.width / 4) * 0.5,
  bookY: (PixiApp.app.renderer.view.height / 2) * 2.8,
  teapot: [0.35, 0.35],
  teapotX: (PixiApp.app.renderer.view.width / 4) * 0.7,
  nintendoSwitch: [0.35, 0.35],
  nintendoSwitchX: (PixiApp.app.renderer.view.width / 4) * 2.98,
  ipad: [0.35, 0.35],
  ipadY: (PixiApp.app.renderer.view.height / 2) * 2.99,
  souls: [0.35, 0.35],
  soulsX: (PixiApp.app.renderer.view.width / 4) * 1.6,
  moreInfo: [0.06, 0.06],
  moreInfoX: (PixiApp.app.renderer.view.width / 4) * 3,
  moreInfoY: (PixiApp.app.renderer.view.height / 2) * 3.5,
};

let mobileScalesY800 = {
  lantern: [1.2, 1],
  grass: [0.6, 0.8],
  book: [0.35, 0.35],
  bookX: (PixiApp.app.renderer.view.width / 4) * 0.5,
  bookY: (PixiApp.app.renderer.view.height / 2) * 2.8,
  teapot: [0.4, 0.4],
  teapotX: (PixiApp.app.renderer.view.width / 4) * 0.7,
  nintendoSwitch: [0.4, 0.4],
  nintendoSwitchX: (PixiApp.app.renderer.view.width / 4) * 2.98,
  ipad: [0.4, 0.4],
  ipadY: (PixiApp.app.renderer.view.height / 2) * 2.99,
  souls: [0.48, 0.48],
  soulsX: (PixiApp.app.renderer.view.width / 4) * 1.71,
  moreInfo: [0.06, 0.06],
  moreInfoX: (PixiApp.app.renderer.view.width / 4) * 3.2,
  moreInfoY: (PixiApp.app.renderer.view.height / 2) * 3.5,
};

let descriptionStyle = {
  fontFamily: 'Cutive',
  fontSize: 23,
  fontWeight: '300',
  lineHeight: window.innerHeight / 2 / 13,
  wordWrap: true,
  wordWrapWidth: (window.innerWidth / 2 / 4) * 3,
};

let aboutMeStyle = {
  fontFamily: 'Cutive',
  fontSize: 17,
  fontWeight: '300',
  lineHeight: window.innerHeight / 2 / 13,
  wordWrap: true,
  wordWrapWidth: (window.innerWidth / 2 / 4) * 3.4,
};

export default class LanternView extends React.Component {
  createSprite(x, y, texture, type, interactive) {
    let scaleType = scales;
    if (
      PixiApp.app.renderer.view.width < 380 &&
      PixiApp.app.renderer.view.height < 700
    ) {
      scaleType = mobileScalesY600;
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
    PixiApp.lanternView.addChild(sprite);
    sprite.anchor.set(0.5);
    sprite.position.x = x;
    sprite.position.y = y;
    sprite.scale.x = scaleType[type][0];
    sprite.scale.y = scaleType[type][1];
    if (type === 'lantern') sprite.width = PixiApp.app.renderer.view.width;
    else if (interactive) {
      let zoomScale = { ...scaleType };
      sprite.interactive = true;
      sprite.buttonMode = true;
      sprite.on('pointerover', () => {
        sprite.scale.set(zoomScale[type][0] * 1.3);
        sprite.rotation -= 0.4;
      });
      sprite.on('pointerout', () => {
        sprite.scale.set(scaleType[type][0]);
        sprite.rotation = 0;
      });
    }
    return sprite;
  }

  createPopUpRect(x, y, type) {
    let width = window.innerWidth / 2;
    let height = window.innerHeight / 2;
    if (window.innerWidth < 500) {
      width = window.innerWidth;
      height = (window.innerHeight / 4) * 3;
      x = (window.innerWidth / 4) * 0.01;
    }
    const rect = new PIXI.Graphics();
    rect.beginFill(0xc2b9e1).drawRoundedRect(x, y, width, height, 20).endFill();
    rect.visible = false;
    PixiApp.lanternView.addChild(rect);
    return rect;
  }

  createBlackCircle(x, y) {
    let closeSize = { x: x + 20, y: y + 16, radius: 12 };
    if (window.innerWidth < 500) {
      closeSize.x = window.innerWidth / 11;
    }
    const close = new PIXI.Graphics();
    close
      .beginFill(0x000000)
      .drawCircle(closeSize.x, closeSize.y, closeSize.radius)
      .endFill();

    close.visible = false;
    close.interactive = true;
    close.buttonMode = true;
    PixiApp.lanternView.addChild(close);
    close.on('mouseover', () => {
      close.tint = 0x696969;
    });
    close.on('mouseout', () => {
      close.tint = 0x000000;
    });
    return close;
  }

  createText(words, style, x, y) {
    const styleTwo = { ...style };
    if (window.innerWidth < 500 && window.innerHeight < 700) {
      x = (window.innerWidth / 4) * 0.3;
      styleTwo.wordWrapWidth = (window.innerWidth / 2) * 1.7;
      styleTwo.fontSize -= 7;
      styleTwo.lineHeight = window.innerHeight / 2 / 10;
      y = (window.innerHeight / 2) * 2.4;
    } else if (window.innerWidth < 500 && window.innerHeight < 850) {
      x = (window.innerWidth / 4) * 0.3;
      styleTwo.wordWrapWidth = (window.innerWidth / 2) * 1.7;
      styleTwo.fontSize -= 5;
      styleTwo.lineHeight = window.innerHeight / 2 / 10;
      y = (window.innerHeight / 2) * 2.4;
    }
    const text = new PIXI.Text(words, styleTwo);
    text.visible = false;
    text.position.x = x;
    text.position.y = y;
    PixiApp.lanternView.addChild(text);
    return text;
  }

  createTexture(asset) {
    return PIXI.Texture.from(asset);
  }

  componentDidMount() {
    /* textures */
    const lanternsTexture = this.createTexture(
      'siteAssets/lanternView/lanternsLittleGlowTwo.png'
    );
    const grassTexture = this.createTexture(
      'siteAssets/lanternView/newGrass.png'
    );
    const soulTexture = this.createTexture('siteAssets/lanternView/souls.png');
    const bookTexture = this.createTexture('siteAssets/lanternView/book.png');
    const ipadTexture = this.createTexture('siteAssets/lanternView/ipad.png');
    const nintendoTexture = this.createTexture(
      'siteAssets/lanternView/nintendoSwitch.png'
    );
    const teaTexture = this.createTexture('siteAssets/lanternView/teapot.png');
    const moreTexture = this.createTexture(
      'siteAssets/lanternView/moreInfo.png'
    );

    const lanterns = this.createSprite(
      PixiApp.app.renderer.view.width / 2,
      (PixiApp.app.renderer.view.height / 2) * 2.8,
      lanternsTexture,
      'lantern'
    );

    const book = this.createSprite(
      (PixiApp.app.renderer.view.width / 4) * 0.65,
      (PixiApp.app.renderer.view.height / 2) * 2.9,
      bookTexture,
      'book',
      true
    );

    book.on('pointertap', () => {
      popUpBook.visible = true;
      teapot.interactive = false;
      teapot.buttonMode = false;
      nintendoSwitch.interactive = false;
      nintendoSwitch.buttonMode = false;
      ipad.interactive = false;
      ipad.buttonMode = false;
      book.interactive = false;
      book.buttonMode = false;
      blackCircleBook.visible = true;
      bookText.visible = true;
      PixiApp.app.stage.pivot.y = PixiApp.secondView;
      PixiApp.menuContainer.position.y = PixiApp.secondView + 10;
    });

    const teapot = this.createSprite(
      (PixiApp.app.renderer.view.width / 4) * 0.94,
      (PixiApp.app.renderer.view.height / 2) * 3.27,
      teaTexture,
      'teapot',
      true
    );

    teapot.on('pointertap', () => {
      popUpTeapot.visible = true;
      book.interactive = false;
      book.buttonMode = false;
      nintendoSwitch.interactive = false;
      nintendoSwitch.buttonMode = false;
      ipad.interactive = false;
      ipad.buttonMode = false;
      teapot.interactive = false;
      teapot.buttonMode = false;
      blackCircleTeapot.visible = true;
      teapotText.visible = true;
      PixiApp.app.stage.pivot.y = PixiApp.secondView;
      PixiApp.menuContainer.position.y = PixiApp.secondView + 10;
    });

    const nintendoSwitch = this.createSprite(
      (PixiApp.app.renderer.view.width / 4) * 2.9,
      (PixiApp.app.renderer.view.height / 2) * 3.28,
      nintendoTexture,
      'nintendoSwitch',
      true
    );

    nintendoSwitch.on('pointertap', () => {
      popUpNintendo.visible = true;
      teapot.interactive = false;
      teapot.buttonMode = false;
      book.interactive = false;
      book.buttonMode = false;
      ipad.interactive = false;
      ipad.buttonMode = false;
      nintendoSwitch.interactive = false;
      nintendoSwitch.buttonMode = false;
      blackCircleNintendo.visible = true;
      nintendoText.visible = true;
      PixiApp.app.stage.pivot.y = PixiApp.secondView;
    });

    const ipad = this.createSprite(
      (PixiApp.app.renderer.view.width / 4) * 3.4,
      (PixiApp.app.renderer.view.height / 2) * 2.9,
      ipadTexture,
      'ipad',
      true
    );

    ipad.on('pointertap', () => {
      popUpIpad.visible = true;
      teapot.interactive = false;
      teapot.buttonMode = false;
      nintendoSwitch.interactive = false;
      nintendoSwitch.buttonMode = false;
      book.interactive = false;
      book.buttonMode = false;
      ipad.interactive = false;
      // ipad.interactive = false;
      blackCircleIpad.visible = true;
      ipadText.visible = true;
      PixiApp.app.stage.pivot.y = PixiApp.secondView;
      PixiApp.menuContainer.position.y = PixiApp.secondView + 10;
    });

    const souls = this.createSprite(
      (PixiApp.app.renderer.view.width / 4) * 1.38,
      (PixiApp.app.renderer.view.height / 2) * 3.6,
      soulTexture,
      'souls'
    );

    const grass = this.createSprite(
      PixiApp.app.renderer.view.width / 2,
      (PixiApp.app.renderer.view.height / 2) * 3.93,
      grassTexture,
      'grass'
    );

    const moreInfo = this.createSprite(
      (PixiApp.app.renderer.view.width / 4) * 1.84,
      (PixiApp.app.renderer.view.height / 2) * 3.45,
      moreTexture,
      'moreInfo',
      true
    );
    moreInfo.on('pointertap', () => {
      popUpAboutMe.visible = true;
      teapot.interactive = false;
      // teapot.buttonMode = false;
      nintendoSwitch.interactive = false;
      // nintendoSwitch.buttonMode = false;
      book.interactive = false;
      // book.buttonMode = false;
      ipad.interactive = false;
      // ipad.interactive = false;
      blackCircleAboutMe.visible = true;
      aboutMeText.visible = true;
      PixiApp.app.stage.pivot.y = PixiApp.secondView;
      PixiApp.menuContainer.position.y = PixiApp.secondView + 10;
    });

    //popups
    const popUpAboutMe = this.createPopUpRect(
      window.innerWidth / 3.9,
      (window.innerHeight / 2) * 2.2
    );

    const blackCircleAboutMe = this.createBlackCircle(
      window.innerWidth / 3.9,
      (window.innerHeight / 2) * 2.2
    );

    blackCircleAboutMe.on('pointertap', () => {
      popUpAboutMe.visible = false;
      blackCircleAboutMe.visible = false;
      teapot.interactive = true;
      teapot.buttonMode = true;
      nintendoSwitch.interactive = true;
      nintendoSwitch.buttonMode = true;
      book.interactive = true;
      book.buttonMode = true;
      ipad.interactive = true;
      ipad.buttonMode = true;
      aboutMeText.visible = false;
      PixiApp.app.stage.pivot.y = PixiApp.secondView;
      PixiApp.menuContainer.position.y = PixiApp.secondView + 10;
    });

    const aboutMeText = this.createText(
      data.aboutMe.description,
      aboutMeStyle,
      window.innerWidth / 4.2 + window.innerWidth / 2 / 8,
      (window.innerHeight / 2) * 2.2 + window.innerHeight / 2 / 10
    );

    const popUpBook = this.createPopUpRect(
      window.innerWidth / 3.9,
      (window.innerHeight / 2) * 2.2
    );

    const blackCircleBook = this.createBlackCircle(
      window.innerWidth / 3.9,
      (window.innerHeight / 2) * 2.2
    );

    blackCircleBook.on('pointertap', () => {
      popUpBook.visible = false;
      blackCircleBook.visible = false;
      teapot.interactive = true;
      teapot.buttonMode = true;
      nintendoSwitch.interactive = true;
      nintendoSwitch.buttonMode = true;
      book.interactive = true;
      book.buttonMode = true;
      ipad.interactive = true;
      ipad.buttonMode = true;
      bookText.visible = false;
      PixiApp.app.stage.pivot.y = PixiApp.secondView;
      PixiApp.menuContainer.position.y = PixiApp.secondView + 10;
    });

    const bookText = this.createText(
      data.book.description,
      descriptionStyle,
      window.innerWidth / 3.9 + window.innerWidth / 2 / 10,
      (window.innerHeight / 2) * 2.2 + window.innerHeight / 2 / 10
    );

    const popUpTeapot = this.createPopUpRect(
      window.innerWidth / 3.9,
      (window.innerHeight / 2) * 2.2
    );

    const blackCircleTeapot = this.createBlackCircle(
      window.innerWidth / 3.9,
      (window.innerHeight / 2) * 2.2
    );

    const teapotText = this.createText(
      data.teapot.description,
      descriptionStyle,
      window.innerWidth / 3.9 + window.innerWidth / 2 / 10,
      (window.innerHeight / 2) * 2.2 + window.innerHeight / 2 / 10
    );

    blackCircleTeapot.on('pointertap', () => {
      popUpTeapot.visible = false;
      blackCircleTeapot.visible = false;
      teapot.interactive = true;
      teapot.buttonMode = true;
      nintendoSwitch.interactive = true;
      nintendoSwitch.buttonMode = true;
      book.interactive = true;
      book.buttonMode = true;
      ipad.interactive = true;
      ipad.buttonMode = true;
      teapotText.visible = false;
      PixiApp.app.stage.pivot.y = PixiApp.secondView;
      PixiApp.menuContainer.position.y = PixiApp.secondView + 10;
    });

    const popUpNintendo = this.createPopUpRect(
      window.innerWidth / 3.9,
      (window.innerHeight / 2) * 2.2
    );

    const blackCircleNintendo = this.createBlackCircle(
      window.innerWidth / 3.9,
      (window.innerHeight / 2) * 2.2
    );

    const nintendoText = this.createText(
      data.nintendoSwitch.description,
      descriptionStyle,
      window.innerWidth / 3.9 + window.innerWidth / 2 / 10,
      (window.innerHeight / 2) * 2.2 + window.innerHeight / 2 / 10
    );

    blackCircleNintendo.on('pointertap', () => {
      popUpNintendo.visible = false;
      blackCircleNintendo.visible = false;
      teapot.interactive = true;
      teapot.buttonMode = true;
      nintendoSwitch.interactive = true;
      nintendoSwitch.buttonMode = true;
      book.interactive = true;
      book.buttonMode = true;
      ipad.interactive = true;
      ipad.buttonMode = true;
      nintendoText.visible = false;
      PixiApp.app.stage.pivot.y = PixiApp.secondView;
      PixiApp.menuContainer.position.y = PixiApp.secondView + 10;
    });

    const popUpIpad = this.createPopUpRect(
      window.innerWidth / 3.9,
      (window.innerHeight / 2) * 2.2
    );

    const blackCircleIpad = this.createBlackCircle(
      window.innerWidth / 3.9,
      (window.innerHeight / 2) * 2.2
    );

    const ipadText = this.createText(
      data.ipad.description,
      descriptionStyle,
      window.innerWidth / 3.9 + window.innerWidth / 2 / 10,
      (window.innerHeight / 2) * 2.2 + window.innerHeight / 2 / 10
    );

    blackCircleIpad.on('pointertap', () => {
      popUpIpad.visible = false;
      blackCircleIpad.visible = false;
      teapot.interactive = true;
      teapot.buttonMode = true;
      nintendoSwitch.interactive = true;
      nintendoSwitch.buttonMode = true;
      book.interactive = true;
      book.buttonMode = true;
      ipad.interactive = true;
      ipad.buttonMode = true;
      ipadText.visible = false;
      PixiApp.app.stage.pivot.y = PixiApp.secondView;
      PixiApp.menuContainer.position.y = PixiApp.secondView + 10;
    });
  }
  render() {
    return <div></div>;
  }
}
