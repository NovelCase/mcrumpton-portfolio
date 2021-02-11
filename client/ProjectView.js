import React from 'react';
import * as PixiApp from '../pixi/projectStage.js';
import * as PIXI from 'pixi.js';

export const onClick = () => {};

let scales = {
  medallionR: 1.3,
  bluePlant: 0.65,
  floor: 0.6,
  deskH: 1.16,
  deskW: 1.29,
  gobARk: 0.85,
  seeTurtle: 0.85,
  brosApothecary: 0.83,
  plantsR: 1.2,
  plantsL: 1.2,
};

export default class ProjectView extends React.Component {
  createSprite(x, y, texture, type, interactive) {
    const sprite = new PIXI.Sprite(texture);
    PixiApp.projectView.addChild(sprite);
    sprite.anchor.set(0.5);
    sprite.position.x = x;
    sprite.position.y = y;
    sprite.scale.set(scales[type]);
    if (type === 'floor') {
      sprite.width = window.innerWidth;
    } else if (type === 'desk') {
      sprite.scale.x = scales.deskW;
      sprite.scale.y = scales.deskH;
    } else if (interactive) {
      sprite.interactive = true;
      sprite.buttonMode = true;
    }
    return sprite;
  }
  componentDidMount() {
    /* textures */
    const floorTexture = PIXI.Texture.from('siteAssets/projectView/floor.png');
    const deskTexture = PIXI.Texture.from('siteAssets/projectView/desk.png');
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

    const floor = this.createSprite(
      PixiApp.app.renderer.view.width / 2,
      (PixiApp.app.renderer.view.height / 2) * 4.928,
      floorTexture,
      'floor'
    );

    const desk = this.createSprite(
      PixiApp.app.renderer.view.width / 2,
      (PixiApp.app.renderer.view.height / 2) * 4.99,
      deskTexture,
      'desk'
    );

    const gobARk = this.createSprite(
      (PixiApp.app.renderer.view.width / 2) * 0.59,
      (PixiApp.app.renderer.view.height / 2) * 5.47,
      barkTexture,
      'gobARk',
      true
    );

    const seeTurtle = this.createSprite(
      (PixiApp.app.renderer.view.width / 2) * 1.4,
      (PixiApp.app.renderer.view.height / 2) * 5.47,
      seeTexture,
      'seeTurtle',
      true
    );

    const brosApothecary = this.createSprite(
      (PixiApp.app.renderer.view.width / 2) * 1.4,
      (PixiApp.app.renderer.view.height / 2) * 4.53,
      broTexture,
      'brosApothecary',
      true
    );

    const plantsR = this.createSprite(
      (PixiApp.app.renderer.view.width / 2) * 1.629,
      (PixiApp.app.renderer.view.height / 2) * 4.8497,
      plantsRTexture,
      'plantsR'
    );

    const plantsL = this.createSprite(
      (PixiApp.app.renderer.view.width / 2) * 0.16,
      (PixiApp.app.renderer.view.height / 2) * 4.8501,
      plantsLTexture,
      'plantsL'
    );
  }
  render() {
    return <div></div>;
  }
}
