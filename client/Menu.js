import React from 'react';
import * as PixiApp from '../pixi/projectStage';
import * as PIXI from 'pixi.js';

const hamMenu = PIXI.Texture.from('/siteAssets/Hamburger_icon.png');
const hamHover = PIXI.Texture.from('/siteAssets/HamburgerHover.png');
const closedIcon = PIXI.Texture.from('/siteAssets/close_icon.png');
const closeHover = PIXI.Texture.from('/siteAssets/closeHover.png');
let menuSprite;
export default class Menu extends React.Component {
  constructor() {
    super();
    this.state = {
      visible: false,
    };
    this.onClickTap = this.onClickTap.bind(this);
  }
  componentDidMount() {
    menuSprite = new PIXI.Sprite(hamMenu);
    PixiApp.menuContainer.addChild(menuSprite);
    menuSprite.interactive = true;
    menuSprite.buttonMode = true;
    if (window.outerWidth <= 400 || window.outerHeight < 500) {
      menuSprite.scale.set(0.1);
    } else menuSprite.scale.set(0.25);

    menuSprite.on('pointertap', () => {
      this.onClickTap();
    });
    menuSprite.on('pointerover', function () {
      if (this.texture === hamMenu) {
        this.texture = hamHover;
      } else {
        this.texture = closeHover;
      }
    });
    menuSprite.on('pointerout', function () {
      if (this.texture === hamHover || this.texture === hamMenu) {
        this.texture = hamMenu;
      } else {
        this.texture = closedIcon;
      }
    });
  }

  onClickTap() {
    if (this.state.visible) {
      this.setState({ visible: false });
      menuSprite.texture = hamMenu;
      PixiApp.shadow.visible = false;
    } else {
      this.setState({ visible: true });
      menuSprite.texture = closedIcon;
      PixiApp.shadow.visible = true;
    }
  }

  render() {
    return (
      <div>
        {this.state.visible ? (
          <div className="menu">
            <h1
              onClick={() => {
                PixiApp.app.stage.pivot.y = 0;
                PixiApp.menuContainer.position.y = 10;
                this.onClickTap();
              }}
            >
              Home
            </h1>
            <h1
              onClick={() => {
                PixiApp.app.stage.pivot.y = PixiApp.app.renderer.view.height;
                PixiApp.menuContainer.position.y =
                  PixiApp.app.renderer.view.height + 10;
                this.onClickTap();
              }}
            >
              About Me
            </h1>
            <h1
              onClick={() => {
                PixiApp.app.stage.pivot.y =
                  PixiApp.app.renderer.view.height * 2;
                PixiApp.menuContainer.position.y =
                  PixiApp.app.renderer.view.height * 2 + 10;
                this.onClickTap();
              }}
            >
              Projects
            </h1>
            <h1
              onClick={() => {
                PixiApp.app.stage.pivot.y =
                  PixiApp.app.renderer.view.height * 3;
                PixiApp.menuContainer.position.y =
                  PixiApp.app.renderer.view.height * 3 + 10;
                this.onClickTap();
              }}
            >
              Connect
            </h1>
          </div>
        ) : (
          <div />
        )}
      </div>
    );
  }
}
