import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import ReactGA from 'react-ga';
import createHistory from 'history/createBrowserHistory';
import firebase from 'firebase/app';
import { init as sentryInit } from '@sentry/browser';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/storage';
import Root from 'components/atomic/containers/Root';
import Error from 'components/atomic/containers/Error';
import Meta from 'components/atomic/LV1/Meta';
import firebaseConfig from './config/firebase';
import { unregister } from './registerServiceWorker';
import configureStore from './redux/store/index';
import Routes from './config/routes';
import './index.css';

const history = createHistory();
history.listen((location, action) => {
  if (action === 'POP') {
    return;
  }
  window.scrollTo(0, 0);
});

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

ReactDOM.render(
  <Provider store={configureStore(history)}>
    <Root>
      <Meta />
      <Error />
      <Routes history={history} />
    </Root>
  </Provider>,
  document.getElementById('root'),
);

unregister();
