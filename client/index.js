import React from 'react';
import ReactDOM from 'react-dom';
import '../public/style.css';
import MarigoldView from './MarigoldView';
import LanternView from './LanternView';
import ProjectView from './ProjectView';
import FinalView from './FinalView';

require('babel-core/register');
require('babel-polyfill');

ReactDOM.render(
  <div>
    <MarigoldView />
    <LanternView />
    <ProjectView />
    <FinalView />
  </div>,
  document.getElementById('app')
);
