import React from 'react';
import * as PixiApp from '../pixi/projectStage.js';
import * as PIXI from 'pixi.js';
import { data } from '../data';

export const onClick = () => {};

/* scales */
let scales = {
  hobbes: [0.5, 0.5],
  hello: [0.75, 0.75],
  floor: [1.2, 1.2],
  window: [1, 1.1],
  spotify: [1, 1],
  bookcase: [1, 1.02],
  github: [1, 1],
  linkedIn: [1, 1],
  table: [1.1, 1.1],
  guestbook: [1.1, 1.1],
  resume: [0.8, 0.8],
};

let mobileScalesY600 = {
  hobbes: [0.25, 0.25],
  hobbesX: (PixiApp.app.renderer.view.width / 4) * 1.3,
  hobbesY: (PixiApp.app.renderer.view.height / 2) * 7.5,
  hello: [0.75, 0.75],
  helloX: (PixiApp.app.renderer.view.width / 4) * 2.5,
  helloY: (PixiApp.app.renderer.view.height / 2) * 6.78,
  floor: [1.2, 1.2],
  floorY: (PixiApp.app.renderer.view.height / 2) * 6.7,
  window: [0, 0],
  spotify: [0.4, 0.4],
  spotifyX: PixiApp.app.renderer.view.width * 1.2,
  spotifyY: (PixiApp.app.renderer.view.height / 2) * 7.85,
  bookcase: [0.5, 0.65],
  bookcaseY: (PixiApp.app.renderer.view.height / 2) * 6.89,
  github: [0.55, 0.55],
  githubX: (PixiApp.app.renderer.view.width / 5) * 1.39,
  githubY: (PixiApp.app.renderer.view.height / 2) * 6.5,
  linkedIn: [0.55, 0.55],
  linkedInX: (PixiApp.app.renderer.view.width / 5) * 0.63,
  linkedInY: (PixiApp.app.renderer.view.height / 2) * 6.96,
  table: [0, 0],
  guestbook: [0.6, 0.6],
  guestbookX: (PixiApp.app.renderer.view.width / 4) * 3,
  guestbookY: (PixiApp.app.renderer.view.height / 2) * 6.4,
  resume: [0.4, 0.4],
  resumeX: (PixiApp.app.renderer.view.width / 5) * 1.94,
  resumeY: (PixiApp.app.renderer.view.height / 2) * 6.97,
};

let mobileScalesY700 = {
  hobbes: [0.27, 0.27],
  hobbesX: (PixiApp.app.renderer.view.width / 4) * 1.3,
  hobbesY: (PixiApp.app.renderer.view.height / 2) * 7.4,
  hello: [0.75, 0.75],
  helloX: (PixiApp.app.renderer.view.width / 4) * 2.5,
  helloY: (PixiApp.app.renderer.view.height / 2) * 6.78,
  floor: [1.2, 1.2],
  floorY: (PixiApp.app.renderer.view.height / 2) * 6.7,
  window: [0, 0],
  spotify: [0.45, 0.45],
  spotifyX: PixiApp.app.renderer.view.width * 1.1,
  spotifyY: (PixiApp.app.renderer.view.height / 2) * 7.65,
  bookcase: [0.5, 0.65],
  bookcaseY: (PixiApp.app.renderer.view.height / 2) * 6.89,
  github: [0.55, 0.55],
  githubX: (PixiApp.app.renderer.view.width / 5) * 1.39,
  githubY: (PixiApp.app.renderer.view.height / 2) * 6.56,
  linkedIn: [0.55, 0.55],
  linkedInX: (PixiApp.app.renderer.view.width / 5) * 0.63,
  linkedInY: (PixiApp.app.renderer.view.height / 2) * 6.96,
  table: [0, 0],
  guestbook: [0.6, 0.6],
  guestbookX: (PixiApp.app.renderer.view.width / 4) * 3,
  guestbookY: (PixiApp.app.renderer.view.height / 2) * 6.4,
  resume: [0.4, 0.4],
  resumeX: (PixiApp.app.renderer.view.width / 5) * 1.84,
  resumeY: (PixiApp.app.renderer.view.height / 2) * 6.97,
};

let mobileScalesY800 = {
  hobbes: [0.29, 0.29],
  hobbesX: (PixiApp.app.renderer.view.width / 4) * 1.3,
  hobbesY: (PixiApp.app.renderer.view.height / 2) * 7.3,
  hello: [0.75, 0.75],
  helloX: (PixiApp.app.renderer.view.width / 4) * 2.5,
  helloY: (PixiApp.app.renderer.view.height / 2) * 6.78,
  floor: [1.2, 1.2],
  floorY: (PixiApp.app.renderer.view.height / 2) * 6.7,
  window: [0, 0],
  spotify: [0.5, 0.5],
  spotifyX: PixiApp.app.renderer.view.width * 1.2,
  spotifyY: (PixiApp.app.renderer.view.height / 2) * 7.56,
  bookcase: [0.5, 0.75],
  bookcaseY: (PixiApp.app.renderer.view.height / 2) * 6.77,
  github: [0.55, 0.55],
  githubX: (PixiApp.app.renderer.view.width / 5) * 1.39,
  githubY: (PixiApp.app.renderer.view.height / 2) * 6.45,
  linkedIn: [0.55, 0.55],
  linkedInX: (PixiApp.app.renderer.view.width / 5) * 0.63,
  linkedInY: (PixiApp.app.renderer.view.height / 2) * 6.85,
  table: [0, 0],
  guestbook: [0.63, 0.63],
  guestbookX: (PixiApp.app.renderer.view.width / 4) * 3,
  guestbookY: (PixiApp.app.renderer.view.height / 2) * 6.4,
  resume: [0.4, 0.4],
  resumeX: (PixiApp.app.renderer.view.width / 5) * 1.74,
  resumeY: (PixiApp.app.renderer.view.height / 2) * 6.85,
};

let width = PixiApp.app.renderer.view.width;
let height = PixiApp.app.renderer.view.height;

export default class FinalView extends React.Component {
  constructor() {
    super();
    this.state = {
      visible: false,
      speech: false,
    };
    this.onClickTap = this.onClickTap.bind(this);
    this.createSprite.bind(this);
  }

  onClickTap() {
    if (this.state.visible) {
      this.setState({ visible: false });
      PixiApp.app.renderer.view.width += width / 4;
    } else {
      this.setState({ visible: true });
      PixiApp.app.renderer.view.width -= width / 4;
    }
  }
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
    PixiApp.finalView.addChild(sprite);
    anchor ? sprite.anchor.set(anchor) : sprite.anchor.set(0.5);
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
        sprite.rotation = 0;
      });
    }
    return sprite;
  }

  componentDidMount() {
    /* textures */
    const hobbesTexture = PIXI.Texture.from('siteAssets/finalView/Hobbes.png');
    const bookTexture = PIXI.Texture.from(
      'siteAssets/finalView/bookCaseFinished.png'
    );
    const floorTexture = PIXI.Texture.from('siteAssets/finalView/floor.png');
    const githubTexture = PIXI.Texture.from('siteAssets/finalView/github.png');
    const guestbookTexture = PIXI.Texture.from(
      'siteAssets/finalView/guestbook.png'
    );
    const linkedinTexture = PIXI.Texture.from(
      'siteAssets/finalView/linkedIn.png'
    );
    const spotfiyTexture = PIXI.Texture.from(
      'siteAssets/finalView/spotifyFinished.png'
    );
    const tableTexture = PIXI.Texture.from('siteAssets/finalView/table.png');
    const windowTexture = PIXI.Texture.from(
      'siteAssets/finalView/darkWindowFinished.png'
    );
    const resumeTexture = PIXI.Texture.from('siteAssets/finalView/Resume.png');
    const speechTexture = PIXI.Texture.from(
      'siteAssets/finalView/hobbesHello.png'
    );

    const floor = this.createSprite(
      PixiApp.app.renderer.view.width / 2,
      (PixiApp.app.renderer.view.height / 2) * 7.07,
      floorTexture,
      'floor',
      false
    );

    const windowSprite = this.createSprite(
      (PixiApp.app.renderer.view.width / 4) * 2.7,
      (PixiApp.app.renderer.view.height / 2) * 6.84,
      windowTexture,
      'window'
    );

    const spotify = this.createSprite(
      PixiApp.app.renderer.view.width / 0.93,
      (PixiApp.app.renderer.view.height / 2) * 7.88,
      spotfiyTexture,
      'spotify',
      true,
      1
    );

    spotify.on('pointertap', () => {
      if (window.innerWidth < 800) {
        window.open(data.spotify, '_blank');
      } else {
        this.onClickTap();
      }
    });

    const bookCase = this.createSprite(
      PixiApp.app.renderer.view.width / 5,
      (PixiApp.app.renderer.view.height / 2) * 6.84,
      bookTexture,
      'bookcase'
    );

    const github = this.createSprite(
      bookCase.x * 1.2,
      bookCase.y * 0.94,
      githubTexture,
      'github',
      true
    );

    github.on('pointertap', () => {
      window.open(data.github, '_blank');
      PixiApp.app.stage.pivot.y = PixiApp.fourthView;
    });

    const linkedIn = this.createSprite(
      bookCase.x * 0.76,
      bookCase.y * 1.008,
      linkedinTexture,
      'linkedIn',
      true
    );

    linkedIn.on('pointertap', () => {
      window.open(data.linkedIn, '_blank');
      PixiApp.app.stage.pivot.y = PixiApp.fourthView;
    });

    const resume = this.createSprite(
      bookCase.x * 1.36,
      bookCase.y * 1.007,
      resumeTexture,
      'resume',
      true
    );

    resume.on('pointertap', () => {
      window.open(data.resume, '_blank');
      PixiApp.app.stage.pivot.y = PixiApp.fourthView;
    });

    const table = this.createSprite(
      (PixiApp.app.renderer.view.width / 4) * 2.55,
      (PixiApp.app.renderer.view.height / 2) * 7.49,
      tableTexture,
      'table'
    );

    const guestbook = this.createSprite(
      (PixiApp.app.renderer.view.width / 4) * 2.52,
      (PixiApp.app.renderer.view.height / 2) * 7.06,
      guestbookTexture,
      'guestbook',
      true
    );

    guestbook.on('pointertap', () => {
      window.location.href =
        'mailto:marie.k.cr@gmail.com?subject=Just visited your website!';
      PixiApp.app.stage.pivot.y = PixiApp.fourthView;
    });

    const hobbes = this.createSprite(
      (PixiApp.app.renderer.view.width / 4) * 1.4,
      (PixiApp.app.renderer.view.height / 2) * 7.38,
      hobbesTexture,
      'hobbes',
      true
    );

    const hobbesHello = this.createSprite(
      (PixiApp.app.renderer.view.width / 4) * 2.1,
      (PixiApp.app.renderer.view.height / 2) * 6.721,
      speechTexture,
      'hello',
      true
    );

    hobbesHello.visible = false;

    hobbes.on('pointertap', () => {
      if (!this.state.speech) {
        hobbesHello.visible = true;
        this.setState({ speech: true });
      } else {
        hobbesHello.visible = false;
        this.setState({ speech: false });
      }
    });
  }
  render() {
    return (
      <div>
        {this.state.visible ? (
          <div id="container">
            <iframe
              src={data.spotify}
              width={width / 4}
              height={height}
              allow="encrypted-media"
              allowtransparency="true"
            ></iframe>
            <div id="loading">
              <div id="atul">
                <img src="siteAssets/finalView/atulPlay.gif" />
              </div>
              <div>
                <h1>Loading!</h1>
              </div>
            </div>
          </div>
        ) : (
          <></>
        )}
      </div>
    );
  }
}
