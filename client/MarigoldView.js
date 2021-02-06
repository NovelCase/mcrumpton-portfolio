import React from 'react';
import * as PixiApp from '../pixi/projectStage.js';
import * as PIXI from 'pixi.js';

export const onClick = () => {};

let scales = {
  bridge: 0.9,
  lantern: 0.9,
  lanterns: 1.2,
};

export default class MarigoldView extends React.Component {
  createSprite(x, y, texture, type) {
    const sprite = new PIXI.Sprite(texture);
    PixiApp.marigoldView.addChild(sprite);
    sprite.anchor.set(0.5);
    sprite.position.x = x;
    sprite.position.y = y;
    sprite.scale.set(scales[type]);
    if (type === 'bridge') {
      // sprite.width = PixiApp.app.renderer.view.width;
      sprite.scale.x = scales[type] + 0.3;
    } else if (type === 'lanterns') {
      sprite.width = PixiApp.app.renderer.view.width;
    }
    return sprite;
  }
  componentDidMount() {
    /* textures */
    const bridgeTexture = PIXI.Texture.from(
      'siteAssets/marigoldView/thebridge.png'
    );
    const moveBridgeTextureArr = [
      'siteAssets/marigoldView/bridgeM1.png',
      'siteAssets/marigoldView/bridgeM2.png',
      'siteAssets/marigoldView/bridgeM3.png',
      'siteAssets/marigoldView/bridgeM4.png',
      'siteAssets/marigoldView/bridgeM5.png',
      'siteAssets/marigoldView/bridgeM6.png',
      'siteAssets/marigoldView/bridgeM7.png',
      'siteAssets/marigoldView/bridgeM8.png',
    ].map((image) => PIXI.Texture.from(image));

    const lanternTexture = PIXI.Texture.from(
      'siteAssets/marigoldView/lanterns.png'
    );

    const lanternsTexture = PIXI.Texture.from(
      'siteAssets/marigoldView/lanternsLittleGlowEdit.png'
    );

    // const lanterns = this.createSprite(
    //   PixiApp.app.renderer.view.width / 2,
    //   (PixiApp.app.renderer.view.height / 2) * 2.8,
    //   lanternsTexture,
    //   'lanterns'
    // );

    // const lantern = this.createSprite(
    //   (PixiApp.app.renderer.view.width / 2) * 1.28,
    //   (PixiApp.app.renderer.view.height / 2) * 1.99,
    //   lanternTexture,
    //   'lantern'
    // );

    // const bridge = this.createSprite(
    //   PixiApp.app.renderer.view.width / 2,
    //   (PixiApp.app.renderer.view.height / 2) *
    //     1.2 /* (PixiApp.app.renderer.view.height / 2) * 1.6 */,
    //   moveBridgeTextureArr[0],
    //   'bridge'
    // );


    const UPPER_LIMIT_Y = 10;
    const UPPER_LIMIT_X = 2;
    const LOWER_LIMIT_X = -2;
    const MAX_SIZE = 6;
    const MIN_SIZE = 2;
    const AMOUNT = 300;
    const COLOR = 0xffffff;

    const getRandomColor = () =>
      [0xb54412, 0xd57714, 0xda8928, 0x6c262d, 0xeb5e28, 0xd57714, 0xea492f][
        Math.floor(Math.random() * 7)
      ];
    const floored = (v) => Math.floor(Math.random() * v);
    // Update value by either subtracting to adding
    const update = (p) =>
      Math.random() > 0.5
        ? Math.max(LOWER_LIMIT_X, p - 1)
        : Math.min(p + 1, UPPER_LIMIT_X);
    // Reset particle start points based on screen
    const reset = (p) => {
      p.x = floored(PixiApp.app.renderer.width);
      p.y =
        PixiApp.app.renderer.view.height /
        2 /* -(p.size + floored(PixiApp.app.renderer.height)) */;
      p.vy = floored(UPPER_LIMIT_Y) + 2;
    };
    // Generate a particle set based on a given texture
    const genParticles = (t) =>
      new Array(AMOUNT).fill().map((p) => {
        const SIZE = floored(MAX_SIZE) + MIN_SIZE;
        p = new PIXI.Sprite(t);
        p.size = SIZE;
        p.vx = floored(UPPER_LIMIT_X) - UPPER_LIMIT_X;
        p.vy = floored(UPPER_LIMIT_Y) + 4;
        p.alpha = Math.random();
        p.x = p.startX = floored(PixiApp.app.renderer.width);
        p.y = p.startY =
          // SIZE +
          (PixiApp.app.renderer.view.height / 2) *
          1.3 /* -(SIZE + floored(PixiApp.app.renderer.height)) */;
        p.width = p.height = SIZE;
        // p.scale.x = 5
        p.tint = getRandomColor();
        drops.addChild(p);
        return p;
      });
    const drops = new PIXI.ParticleContainer(AMOUNT, {
      scale: true,
      position: true,
      rotation: true,
      alpha: true,
    });
    PixiApp.marigoldView.addChild(drops);
    // Create a base graphic for our sprites
    const p = new PIXI.Graphics();
    p.beginFill(COLOR);
    p.drawCircle(0, 0, 100);
    p.endFill();
    // Generate a base texture from the base graphic
    const baseTexture = PixiApp.app.renderer.generateTexture(p);
    let particles = genParticles(baseTexture);
    PixiApp.app.ticker.add((i) => {
      if (
        PixiApp.app.renderer.height !== innerHeight ||
        PixiApp.app.renderer.width !== innerWidth
      ) {
        PixiApp.app.renderer.resize(innerWidth, innerHeight);
        drops.removeChildren();
        particles = genParticles(baseTexture);
      }
      for (let particle of particles) {
        if (particle.y > 0) particle.x += particle.vx;
        particle.y += particle.vy;

        if (Math.random() > 0.9) particle.vx = update(particle.vx);
        // if (Math.random() > 0.9)
        //   particle.vy = Math.min(particle.vy + 1, UPPER_LIMIT_Y);
        if (
          particle.x > PixiApp.app.renderer.width ||
          particle.x < 0 ||
          particle.y > PixiApp.app.renderer.height
        )
          reset(particle);
      }
      PixiApp.app.renderer.render(drops);
    });

    const bridge = this.createSprite(
      PixiApp.app.renderer.view.width / 2,
      (PixiApp.app.renderer.view.height / 2) *
        1.2 /* (PixiApp.app.renderer.view.height / 2) * 1.6 */,
      moveBridgeTextureArr[0],
      'bridge'
    );
  }
  render() {
    return <div></div>;
  }
}
