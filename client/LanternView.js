import React from 'react';
import * as PixiApp from '../pixi/projectStage.js';
import * as PIXI from 'pixi.js';
import { createPopUpRect } from './ProjectView';

export const onClick = () => {};

let scales = {
  lantern: [1.1, 1.1],
  grass: [0.8, 1.05],
  book: [0.7, 0.7],
  teapot: [0.7, 0.7],
  nintendoSwitch: [0.7, 0.7],
  ipad: [0.7, 0.7],
  souls: [0.6, 0.6],
  aboutMe: [0.08, 0.08],
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
  aboutMe: [0.06, 0.06],
  aboutMeX: (PixiApp.app.renderer.view.width / 4) * 3,
  aboutMeY: (PixiApp.app.renderer.view.height / 2) * 3.5,
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
  aboutMe: [0.06, 0.06],
  aboutMeX: (PixiApp.app.renderer.view.width / 4) * 3.2,
  aboutMeY: (PixiApp.app.renderer.view.height / 2) * 3.5,
};

let mobileScalesY350 = {
  lantern: [0.4, 0.4],
  grass: [0.6, 0.2],
  grassY: (PixiApp.app.renderer.view.height / 2) * 3.87,
  book: [0.28, 0.28],
  bookX: (PixiApp.app.renderer.view.width / 4) * 0.48,
  bookY: (PixiApp.app.renderer.view.height / 2) * 2.82,
  teapot: [0.33, 0.33],
  teapotX: (PixiApp.app.renderer.view.width / 4) * 0.7,
  nintendoSwitch: [0.33, 0.33],
  nintendoSwitchX: (PixiApp.app.renderer.view.width / 4) * 2.98,
  ipad: [0.33, 0.33],
  ipadX: (PixiApp.app.renderer.view.width / 4) * 3.5,
  ipadY: (PixiApp.app.renderer.view.height / 2) * 2.99,
  souls: [0.3, 0.3],
  soulsX: (PixiApp.app.renderer.view.width / 4) * 1.3,
  aboutMe: [0.05, 0.05],
  aboutMeX: (PixiApp.app.renderer.view.width / 4) * 2,
  aboutMeY: (PixiApp.app.renderer.view.height / 2) * 3.5,
};

let mobileScalesY400 = {
  lantern: [0.5, 0.5],
  grass: [0.6, 0.2],
  grassY: (PixiApp.app.renderer.view.height / 2) * 3.87,
  book: [0.28, 0.28],
  bookX: (PixiApp.app.renderer.view.width / 4) * 0.48,
  bookY: (PixiApp.app.renderer.view.height / 2) * 2.82,
  teapot: [0.33, 0.33],
  teapotX: (PixiApp.app.renderer.view.width / 4) * 0.7,
  nintendoSwitch: [0.33, 0.33],
  nintendoSwitchX: (PixiApp.app.renderer.view.width / 4) * 2.98,
  ipad: [0.33, 0.33],
  ipadX: (PixiApp.app.renderer.view.width / 4) * 3.5,
  ipadY: (PixiApp.app.renderer.view.height / 2) * 2.99,
  souls: [0.3, 0.3],
  soulsX: (PixiApp.app.renderer.view.width / 4) * 1.35,
  aboutMe: [0.05, 0.05],
  aboutMeX: (PixiApp.app.renderer.view.width / 4) * 2,
  aboutMeY: (PixiApp.app.renderer.view.height / 2) * 3.5,
};

let mobileScalesY420 = {
  lantern: [0.55, 0.55],
  grass: [0.6, 0.25],
  grassY: (PixiApp.app.renderer.view.height / 2) * 3.87,
  book: [0.28, 0.28],
  bookX: (PixiApp.app.renderer.view.width / 4) * 0.48,
  bookY: (PixiApp.app.renderer.view.height / 2) * 2.82,
  teapot: [0.33, 0.33],
  teapotX: (PixiApp.app.renderer.view.width / 4) * 0.7,
  nintendoSwitch: [0.33, 0.33],
  nintendoSwitchX: (PixiApp.app.renderer.view.width / 4) * 2.98,
  ipad: [0.33, 0.33],
  ipadX: (PixiApp.app.renderer.view.width / 4) * 3.5,
  ipadY: (PixiApp.app.renderer.view.height / 2) * 2.99,
  souls: [0.3, 0.3],
  soulsX: (PixiApp.app.renderer.view.width / 4) * 1.3,
  aboutMe: [0.05, 0.05],
  aboutMeX: (PixiApp.app.renderer.view.width / 4) * 1.9,
  aboutMeY: (PixiApp.app.renderer.view.height / 2) * 3.5,
};

let scalesY680 = {
  lantern: [1.2, 0.8],
  grass: [0.8, 0.6],
  book: [0.45, 0.45],
  bookX: (PixiApp.app.renderer.view.width / 4) * 0.5,
  bookY: (PixiApp.app.renderer.view.height / 2) * 2.8,
  teapot: [0.5, 0.5],
  teapotX: (PixiApp.app.renderer.view.width / 4) * 0.7,
  nintendoSwitch: [0.5, 0.5],
  nintendoSwitchX: (PixiApp.app.renderer.view.width / 4) * 2.98,
  ipad: [0.5, 0.5],
  ipadY: (PixiApp.app.renderer.view.height / 2) * 2.99,
  souls: [0.48, 0.48],
  soulsX: (PixiApp.app.renderer.view.width / 4) * 1.71,
  aboutMe: [0.06, 0.06],
  aboutMeX: (PixiApp.app.renderer.view.width / 4) * 2.2,
  aboutMeY: (PixiApp.app.renderer.view.height / 2) * 3.5,
};
let scalesY800 = {
  lantern: [1.2, 1],
  grass: [0.8, 0.6],
  grassY: (PixiApp.app.renderer.view.height / 2) * 3.89,
  book: [0.45, 0.45],
  bookX: (PixiApp.app.renderer.view.width / 4) * 0.5,
  bookY: (PixiApp.app.renderer.view.height / 2) * 2.8,
  teapot: [0.5, 0.5],
  teapotX: (PixiApp.app.renderer.view.width / 4) * 0.7,
  nintendoSwitch: [0.5, 0.5],
  nintendoSwitchX: (PixiApp.app.renderer.view.width / 4) * 2.98,
  ipad: [0.5, 0.5],
  ipadY: (PixiApp.app.renderer.view.height / 2) * 2.99,
  souls: [0.49, 0.49],
  soulsX: (PixiApp.app.renderer.view.width / 4) * 1.71,
  aboutMe: [0.06, 0.06],
  aboutMeX: (PixiApp.app.renderer.view.width / 4) * 2.2,
  aboutMeY: (PixiApp.app.renderer.view.height / 2) * 3.5,
};

export default class LanternView extends React.Component {
  createSprite(x, y, texture, type, interactive) {
    let scaleType = scales;
    if (PixiApp.app.renderer.view.height < 820) {
      if (PixiApp.app.renderer.view.height <= 360) {
        scaleType = mobileScalesY350;
        if (scaleType[`${type}X`]) x = scaleType[`${type}X`];
        if (scaleType[`${type}Y`]) y = scaleType[`${type}Y`];
      } else if (PixiApp.app.renderer.view.height < 400) {
        scaleType = mobileScalesY400;
        if (scaleType[`${type}X`]) x = scaleType[`${type}X`];
        if (scaleType[`${type}Y`]) y = scaleType[`${type}Y`];
      } else if (PixiApp.app.renderer.view.height < 420) {
        scaleType = mobileScalesY420;
        if (scaleType[`${type}X`]) x = scaleType[`${type}X`];
        if (scaleType[`${type}Y`]) y = scaleType[`${type}Y`];
      } else if (
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
      } else if (PixiApp.app.renderer.view.height < 680) {
        scaleType = scalesY680;
        if (scaleType[`${type}X`]) x = scaleType[`${type}X`];
        if (scaleType[`${type}Y`]) y = scaleType[`${type}Y`];
      } else {
        scaleType = scalesY800;
        if (scaleType[`${type}X`]) x = scaleType[`${type}X`];
        if (scaleType[`${type}Y`]) y = scaleType[`${type}Y`];
      }
    }
    const sprite = new PIXI.Sprite(texture);
    PixiApp.lanternView.addChild(sprite);
    sprite.anchor.set(0.5);
    sprite.position.x = x;
    sprite.position.y = y;
    sprite.scale.x = scaleType[type][0];
    sprite.scale.y = scaleType[type][1];
    if (type === 'lantern')
      window.innerWidth < 800
        ? (sprite.width = PixiApp.app.renderer.view.width * 1.15)
        : (sprite.width = PixiApp.app.renderer.view.width);
    else if (interactive) {
      sprite.interactive = true;
      sprite.buttonMode = true;
      sprite.on('pointerover', function () {
        sprite.scale.set(scaleType[type][0] * 1.3);
      });
      sprite.on('pointerout', function () {
        sprite.scale.set(scaleType[type][0]);
      });
      sprite.on('pointertap', function () {
        PixiApp.app.stage.pivot.y = PixiApp.secondView;
        PixiApp.menuContainer.position.y = PixiApp.secondView + 10;
        createPopUpRect(
          type,
          PixiApp.app.renderer.view.width / 4,
          (PixiApp.app.renderer.view.height * 5) / 4,
          'lanternScrolling',
          PixiApp.secondView
        );
        PixiApp.noScroll.lanternScrolling = false;
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

    const teapot = this.createSprite(
      (PixiApp.app.renderer.view.width / 4) * 0.94,
      (PixiApp.app.renderer.view.height / 2) * 3.27,
      teaTexture,
      'teapot',
      true
    );

    const nintendoSwitch = this.createSprite(
      (PixiApp.app.renderer.view.width / 4) * 2.9,
      (PixiApp.app.renderer.view.height / 2) * 3.28,
      nintendoTexture,
      'nintendoSwitch',
      true
    );

    const ipad = this.createSprite(
      (PixiApp.app.renderer.view.width / 4) * 3.4,
      (PixiApp.app.renderer.view.height / 2) * 2.9,
      ipadTexture,
      'ipad',
      true
    );

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
      'aboutMe',
      true
    );
  }
  render() {
    return <div></div>;
  }
}
