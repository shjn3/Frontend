import React from 'react'
import ReactDOM from 'react-dom'
import reportWebVitals from './reportWebVitals'
import {Provider} from 'react-redux'

import './sass/index.scss'
import 'bootstrap/dist/css/bootstrap.min.css';

import App from './app'
import store from './redux/store'
ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
            <App/>
    </React.StrictMode>
  </Provider>
  ,
  document.getElementById('root')
);
reportWebVitals();
