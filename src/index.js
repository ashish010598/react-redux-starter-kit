import '@babel/polyfill';

import React from 'react';
import ReactDOM from 'react-dom';
import { PersistGate } from 'redux-persist/lib/integration/react';
import { Provider } from 'react-redux';
import configureStore from 'app/store';
import { BrowserRouter } from 'react-router-dom';
import smoothscroll from 'smoothscroll-polyfill';

import config from 'app/config/index.config';
import globalReducer from 'app/state/app.reducer';

import App from './app';
import { BASE_HREF } from './app/app.constants';
// import * as serviceWorker from './serviceWorker';

// import '!file-loader?name=[name].[ext]!./assets/images/favicon.png';
import 'sanitize.css/sanitize.css';
// import 'app/styles/global.scss';

smoothscroll.polyfill();

// Remove console.log for production and QA deployment
if (process.env.NODE_ENV !== 'development') {
  console.log = () => {};
}

if (!config.DEBUG_MODE) {
  /* eslint-disable no-global-assign, func-names */
  console = console || {};
  console.log = function () {};
  console.warn = function () {};
  console.info = function () {};
  console.error = function () {};
  console.debug = function () {};
}

const initialState = {};
const { store, persistor } = configureStore(globalReducer, initialState);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter basename={BASE_HREF}>
          <App />
        </BrowserRouter>
      </PersistGate>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'),
);

// CRA ServiceWorker
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
// serviceWorker.unregister();

// OfflinePlugin Setup
// Install ServiceWorker and AppCache in the end since
// it's not most important operation and if main code fails,
// we do not want it installed
if (process.env.NODE_ENV === 'production') {
  /* eslint-disable global-require */
  // eslint-disable-next-line no-unused-vars
  const OfflinePlugin = require('offline-plugin/runtime');

  /*   OfflinePlugin.install({
    onUpdateReady() {
      console.log('Applying SW Update');
      OfflinePlugin.applyUpdate();
    },

    onUpdated() {
      console.log('SW Updated');
      window.location.reload();
    },
  }); // eslint-disable-line global-require */
}
