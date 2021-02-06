import React from 'react';
import * as PixiApp from '../pixi/projectStage.js';
import * as PIXI from 'pixi.js';

export const onClick = () => {};

let scales = {
  lantern: 1.1,
  grass: 0.75,
  book: 0.7,
  teapot: 0.7,
  nintendoSwitch: 0.7,
  ipad: 0.7,
  souls: 0.6,
};

export default class LanternView extends React.Component {
  createSprite(x, y, texture, type, interactive) {
    const sprite = new PIXI.Sprite(texture);
    PixiApp.lanternView.addChild(sprite);
    sprite.anchor.set(0.5);
    sprite.position.x = x;
    sprite.position.y = y;
    sprite.scale.set(scales[type]);
    if (type === 'lantern') sprite.width = PixiApp.app.renderer.view.width;
    else if (interactive) {
      sprite.interactive = true;
      sprite.buttonMode = true;
    }
    return sprite;
  }
  componentDidMount() {
    /* textures */
    const lanternsTexture = PIXI.Texture.from(
      'siteAssets/marigoldView/lanternsLittleGlowEdit.png'
    );
    const grassTexture = PIXI.Texture.from('siteAssets/lanternView/grass.png');
    const soulTexture = PIXI.Texture.from('siteAssets/lanternView/souls.png');
    const bookTexture = PIXI.Texture.from('siteAssets/lanternView/book.png');
    const ipadTexture = PIXI.Texture.from('siteAssets/lanternView/ipad.png');
    const nintendoTexture = PIXI.Texture.from(
      'siteAssets/lanternView/nintendoSwitch.png'
    );
    const teaTexture = PIXI.Texture.from('siteAssets/lanternView/teapot.png');

    const lanterns = this.createSprite(
      PixiApp.app.renderer.view.width / 2,
      (PixiApp.app.renderer.view.height / 2) *
        2.8 /* (PixiApp.app.renderer.view.height / 2) * 3.256 */,
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
      (PixiApp.app.renderer.view.height / 2) * 2.655,
      grassTexture,
      'grass'
    );
  }
  render() {
    return <div></div>;
  }
}
