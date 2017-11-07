import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import { Provider } from 'react-redux';
import store from './redux/store';
import App from './App';

import registerServiceWorker from './registerServiceWorker';

import Raven from 'raven-js';
Raven.config('https://d2a32c77f6f6419a9dfd0d09af5533cf@sentry.io/241485').install();


ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

registerServiceWorker();
