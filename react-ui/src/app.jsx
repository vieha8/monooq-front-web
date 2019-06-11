import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import ReactGA from 'react-ga';
import firebase from 'firebase/app';
import { init as sentryInit } from '@sentry/browser';
import Root from 'components/containers/Root';
import Error from 'components/containers/Error';
import Meta from 'components/LV1/Meta';
import firebaseConfig from './config/firebase';
import { unregister } from './registerServiceWorker';
import createStore, { history } from './redux/store';
import Routes from './routes';
import './index.css';

sentryInit({
  dsn: 'https://d3223c25da3e4dcda892c9ac1cf7b0be@sentry.io/1287932',
  environment: process.env.NODE_ENV,
});
ReactGA.initialize('UA-84238514-1');
firebase.initializeApp(firebaseConfig());

if (process.env.NODE_ENV !== 'production') {
  // const { whyDidYouUpdate } = require('why-did-you-update');
  // whyDidYouUpdate(React);
}

const store = createStore();

ReactDOM.render(
  <Provider store={store}>
    <Root>
      <Meta />
      <Error />
      <Routes history={history} />
    </Root>
  </Provider>,
  document.getElementById('root'),
);

unregister();
