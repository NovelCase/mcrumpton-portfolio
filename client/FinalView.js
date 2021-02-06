import React from 'react';
import * as PixiApp from '../pixi/projectStage.js';
import * as PIXI from 'pixi.js';

export const onClick = () => {};

let scales = {
  hobbes: 0.5,
  floor: 1.2,
  window: 1.1,
  spotify: 1.1,
  bookcase: 1.02,
  github: 1.1,
  linkedIn: 1.1,
  table: 1.1,
  guestbook: 1.1,
  resume: 0.46,
};

export default class FinalView extends React.Component {
  createSprite(x, y, texture, type, interactive) {
    const sprite = new PIXI.Sprite(texture);
    PixiApp.finalView.addChild(sprite);
    sprite.anchor.set(0.5);
    sprite.position.x = x;
    sprite.position.y = y;
    sprite.scale.set(scales[type]);
    if (type === 'floor') {
      sprite.width = window.innerWidth;
    } else if (interactive) {
      sprite.interactive = true;
      sprite.buttonMode = true;
    }
    return sprite;
  }
  componentDidMount() {
    /* textures */
    const hobbesTexture = PIXI.Texture.from('siteAssets/finalView/Hobbes.png');
    const bookTexture = PIXI.Texture.from('siteAssets/finalView/bookCase.png');
    const floorTexture = PIXI.Texture.from('siteAssets/finalView/floor.png');
    const githubTexture = PIXI.Texture.from('siteAssets/finalView/github.png');
    const guestbookTexture = PIXI.Texture.from(
      'siteAssets/finalView/guestbook.png'
    );
    const linkedinTexture = PIXI.Texture.from(
      'siteAssets/finalView/linkedIn.png'
    );
    const spotfiyTexture = PIXI.Texture.from(
      'siteAssets/finalView/spotify.png'
    );
    const tableTexture = PIXI.Texture.from('siteAssets/finalView/table.png');
    const windowTexture = PIXI.Texture.from('siteAssets/finalView/window.png');
    const resumeTexture = PIXI.Texture.from('siteAssets/finalView/Resume.png');

    const floor = this.createSprite(
      PixiApp.app.renderer.view.width / 2,
      (PixiApp.app.renderer.view.height / 2) * 6.95,
      floorTexture,
      'floor'
    );

    const window = this.createSprite(
      (PixiApp.app.renderer.view.width / 4) * 2.5,
      (PixiApp.app.renderer.view.height / 2) * 6.721,
      windowTexture,
      'window'
    );

    const spotify = this.createSprite(
      (PixiApp.app.renderer.view.width / 4) * 3.599,
      (PixiApp.app.renderer.view.height / 2) * 7.05,
      spotfiyTexture,
      'spotify',
      true
    );

    const bookCase = this.createSprite(
      PixiApp.app.renderer.view.width / 5,
      (PixiApp.app.renderer.view.height / 2) * 6.748,
      bookTexture,
      'bookcase'
    );

    const github = this.createSprite(
      (PixiApp.app.renderer.view.width / 5) * 1.15,
      (PixiApp.app.renderer.view.height / 2) * 6.3,
      githubTexture,
      'github',
      true
    );

    const linkedIn = this.createSprite(
      (PixiApp.app.renderer.view.width / 5) * 0.78,
      (PixiApp.app.renderer.view.height / 2) * 6.757,
      linkedinTexture,
      'linkedIn',
      true
    );

    const resume = this.createSprite(
      (PixiApp.app.renderer.view.width / 5) * 1.33,
      (PixiApp.app.renderer.view.height / 2) * 6.759,
      resumeTexture,
      'resume',
      true
    );

    const table = this.createSprite(
      (PixiApp.app.renderer.view.width / 4) * 2.5,
      (PixiApp.app.renderer.view.height / 2) * 7.4,
      tableTexture,
      'table'
    );

    const guestbook = this.createSprite(
      (PixiApp.app.renderer.view.width / 4) * 2.5,
      (PixiApp.app.renderer.view.height / 2) * 7,
      guestbookTexture,
      'guestbook',
      true
    );

    const hobbes = this.createSprite(
      (PixiApp.app.renderer.view.width / 4) * 1.4,
      (PixiApp.app.renderer.view.height / 2) * 7.275,
      hobbesTexture,
      'hobbes',
      true
    );
  }
  render() {
    console.log(PixiApp.finalView);
    return <div></div>;
  }
}
