import React from 'react';
import ReactDOM from 'react-dom';
import '../public/style.css';
import MarigoldView from './MarigoldView';
import LanternView from './LanternView';
import ProjectView from './ProjectView';
import FinalView from './FinalView';
import Menu from './Menu';


require('babel-core/register');
require('babel-polyfill');

ReactDOM.render(
  <div>
    <Menu />
    <MarigoldView />
    <LanternView />
    <ProjectView />
    <FinalView />
  </div>,
  document.getElementById('app')
);
