import React from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';


import './scss/index.scss'
import Layout from './components/Layout'

import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { fas } from '@fortawesome/free-solid-svg-icons'
import {far} from '@fortawesome/free-regular-svg-icons'
library.add(fab, fas,far)

ReactDOM.render(
  <React.StrictMode>
    <Layout />
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
