import React from 'react';
import * as PixiApp from '../pixi/projectStage.js';
import * as PIXI from 'pixi.js';

export const onClick = (type) => {
  popUp.visible = true;
  redX.visible = true;
};

let popUp;
let redX;
export default class Project extends React.Component {
  componentDidMount() {
    popUp = new PIXI.Graphics();
    popUp
      .beginFill(0xf4f5e7)
      .drawRect(
        (window.innerWidth / 2) * 0.5,
        (window.innerHeight / 2) * 0.5,
        window.innerWidth / 2,
        window.innerHeight / 2
      )
      .endFill();
    popUp.visible = false;
    PixiApp.popUps.addChild(popUp);

    const redXTexture = PIXI.Texture.from('/siteAssets/redX.png');
    redX = new PIXI.Sprite(redXTexture);
    redX.position.x = (window.innerWidth / 4) * 1.2;
    redX.position.y = window.innerHeight / 3;
    redX.scale.set(0.05);
    redX.anchor.set(0.5);
    redX.visible = false;
    redX.interactive = true;
    redX.buttonMode = true;
    PixiApp.popUps.addChild(redX);
    redX.on('click', () => {
      popUp.visible = false;
      redX.visible = false;
    });
  }

  render() {
    // console.log(PixiApp.popUps);
    return <div></div>;
  }
}
