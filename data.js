import * as PIXI from 'pixi.js';

function createTexture(asset) {
  return PIXI.Texture.from(asset);
}

export let data = {
  gobARk: {
    name: 'go.bARk',
    description:
      'An Augmented Reality virtual pet game, built using the PERN (PostgreSQL, Express, React (and React Native), and Node.js) stack, and integrated with Viromedia’s ViroReact library. go.bARk comes equipped with three dogs to choose from and four finished dog/user interactions.',
    linkOne: 'Github',
    linkOneUrl: 'https://github.com/gh-capstone-team-c/Go.bARk',
    linkTwo: 'Presentation',
    linkTwoUrl: 'https://www.youtube.com/watch?v=tJig6T0Ccoc',
  },
  brosApothecary: {
    name: "Bro's Apothecary",
    description:
      'Ecommerce site focused on delivering products, such as facial cleansers and candles, to meet the apothecary needs of everyone.',
    linkOne: 'Github',
    linkOneUrl: 'https://bit.ly/3l4m22J',
    linkTwo: 'Live Site',
    linkTwoUrl: 'https://bros-apothecary.herokuapp.com/',
  },
  seeTurtleExploration: {
    name: 'See Turtle Exploration',
    description:
      'Through the eyes of a sea turtle discover the geological and ecological wonders of the ocean.',
    linkOne: 'Github',
    linkOneUrl: 'https://github.com/mkcrumpton/SeeTurtleExploration',
    linkTwo: 'Presentation',
    linkTwoUrl: 'https://www.youtube.com/watch?v=dUDTRJXvqfY',
  },
  novelCase: {
    name: 'Novel Case',
    description:
      'Novel Case is the small but driven development team behind this and other websites! Founded by Leslie Meng, Jackie Feit, and me, this team has banked numerous hours dedicated to creating unique solutions for personal experiences.',
    linkOne: 'Github',
    linkOneUrl: 'https://github.com/NovelCase',
    linkTwo: 'Live Site',
    linkTwoUrl: 'https://github.com/NovelCase',
  },
  stack: {
    name: 'Stack: ',
    techStack: createTexture('siteAssets/projectView/techStack.png'),
  },
  linkedIn: 'https://www.linkedin.com/in/mariecrumpton/',

  github: 'https://github.com/mkcrumpton',

  resume: 'https://mkcrumpton.github.io/Resume/',

  spotify: 'https://open.spotify.com/embed/playlist/1ieXH939lQPONeIlh1ILDo',
  aboutMe: {
    name: 'About Me',
    description:
      'Hi! I’m Marie, a full stack software developer with a background in education who is motivated by continuous learning, creativity, and problem solving. After an exciting indoor recess involving a coding game, I discovered a new passion and desire to become a developer. Now as a developer I enjoy collaborating with others to problem solve and craft solutions. When I’m not programming, you can find me reading, gaming, drawing, or playing with my Saint Bernard, Hobbes.',
    linkOne: 'Resume',
    linkOneUrl: 'https://mkcrumpton.github.io/Resume/',
  },
  ipad: {
    name: 'Draw',
    description:
      'One of my favorite creative outlets is drawing. I especially enjoy drawing on my iPad using the Procreate app. Most of the assets for this site were drawn by me using my iPad.',
  },
  nintendoSwitch: {
    name: 'Play',
    description:
      "When my eyes aren't glued to VSCode or documentation, you can usually find me mapping out a new geographic feature for my island or developing my battle strategy to defeat a dragon. That's to say I really enjoy playing games like Animal Crossing, Paper Mario, Spiritfarer, and Fire Emblem on my Nintendo Switch.",
  },
  teapot: {
    name: 'Relax',
    description:
      'Keyboards are useful, styluses are great, but a warm cup of tea is the perfect accompaniment to solving bugs in my code or getting the right shapes for a drawing. My most reached for teas are chamomile, jasmine, and english breakfast.',
  },
  book: {
    name: 'Learn',
    description:
      'When I find myself strained from staring at a screen or solving a difficult problem, I find reading books eases the tension and resets my brain. Some of my favorite reads include the Harry Potter series, The Invisible Life of Addie Larue, and Calvin & Hobbes.',
  },
};
