// © 2017 VARRO ANALYTICS. ALL RIGHTS RESERVED.
import React from 'react';
import ReactDOM from 'react-dom';

import { HashRouter } from 'react-router-dom';

import App from './App';
import registerServiceWorker from './registerServiceWorker';

import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/font-awesome/css/font-awesome.min.css';
import '../node_modules/react-rangeslider/lib/index.css'
import 'react-select/dist/react-select.css';

// get rid of this dependencies
import 'jquery/src/jquery'
import '../node_modules/bootstrap/dist/js/bootstrap.min';

import './index.css';



ReactDOM.render(
  <HashRouter>
    <App />
  </HashRouter>,
  document.getElementById('root')
);

registerServiceWorker();
