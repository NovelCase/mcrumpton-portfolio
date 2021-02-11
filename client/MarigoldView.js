import React from 'react';
import * as PixiApp from '../pixi/projectStage.js';
import * as PIXI from 'pixi.js';
import { resourceUsage } from 'process';

export const onClick = () => {};

let scales = {
  bridge: 1.1,
  stayName: 0.47,
  aboutMe: 0.25,
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
      sprite.scale.x = scales[type] + 0.17;
    }
    return sprite;
  }
  createAnimatedSprtie(x, y, textureArr, type, speed, notVisible) {
    const animSprite = new PIXI.AnimatedSprite(textureArr);
    PixiApp.marigoldView.addChild(animSprite);
    animSprite.animationSpeed = speed;
    animSprite.scale.set(scales[type]);
    animSprite.x = x;
    animSprite.y = y;
    // animSprite.play();
    if (notVisible) animSprite.visible = false;
    return animSprite;
  }
  componentDidMount() {
    /* textures */
    const bridgeTexture = PIXI.Texture.from(
      'siteAssets/marigoldView/bridgeFixedLight.png'
    );

    const nameTexture = PIXI.Texture.from('siteAssets/marigoldView/name13.png');

    const aboutMeArrTextures = [];
    for (let i = -5; i < 30; i++) {
      aboutMeArrTextures.push(
        PIXI.Texture.from(
          `siteAssets/marigoldView/aboutMeAnimation/aboutMe${i}.png`
        )
      );
    }

    let stayName = this.createSprite(
      (PixiApp.app.renderer.view.width / 2) * 0.95,
      (PixiApp.app.renderer.view.height / 4) * 0.4,
      nameTexture,
      'stayName'
    );

    let aboutMe = this.createAnimatedSprtie(
      (PixiApp.app.renderer.view.width / 2) * 0.75,
      (PixiApp.app.renderer.view.height / 4) * 0.8,
      aboutMeArrTextures,
      'aboutMe',
      0.6,
      true
    );

    const nameBlur = new PIXI.filters.BlurFilter();
    nameBlur.blur = 100;
    stayName.filters = [nameBlur];

    let nameBlurTicker = PIXI.Ticker.shared;
    nameBlurTicker.speed = 0.1;
    nameBlurTicker.elapsedMS = 10000;
    nameBlurTicker.add(() => {
      if (nameBlur.blur > 0) {
        nameBlur.blur -= 5;
      } else if (nameBlur.blur === 0) {
        setTimeout(() => {
          aboutMe.visible = true;
          aboutMe.play();
        }, 500);
      }
    });

    const UPPER_LIMIT_Y = 3;
    const UPPER_LIMIT_X = 2;
    const LOWER_LIMIT_X = -2;
    const MAX_SIZE = 6;
    const MIN_SIZE = 2;
    const AMOUNT = 230;
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
        (PixiApp.app.renderer.view.height / 2) *
        1.6 /* -(p.size + floored(PixiApp.app.renderer.height)) */;
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
        p.y = p.startY = (PixiApp.app.renderer.view.height / 2) * 1.4;
        p.width = p.height = SIZE;
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
    drops.visible = false;
    PixiApp.marigoldView.addChild(drops);

    // Create a base graphic for sprites
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
          particle.y > PixiApp.app.renderer.height * 1.3 //determines how far down particles fall before reset
        )
          reset(particle);
      }
      PixiApp.app.renderer.render(drops);
    });

    //bridge
    const bridge = this.createSprite(
      PixiApp.app.renderer.view.width / 2,
      (PixiApp.app.renderer.view.height / 2) * 1.6,
      bridgeTexture,
      'bridge'
    );
    setTimeout(() => (drops.visible = true), 500);
  }
  render() {
    return <div></div>;
  }
}
