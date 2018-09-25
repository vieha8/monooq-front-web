import React, { Fragment } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import ReactGA from 'react-ga';
import createHistory from 'history/createBrowserHistory';
import firebase from 'firebase/app';
import { init as sentryInit } from '@sentry/browser';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/storage';
import { Auth } from 'components/Auth';
import Meta from 'components/Meta';
import Error from 'components/Error';
import Intercom from 'components/Intercom';
import ErrorBoundary from 'components/ErrorBoundary';
import firebaseConfig from './config/firebase';
import { unregister } from './registerServiceWorker';
import configureStore from './redux/store/configureStore';
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
});
ReactGA.initialize('UA-84238514-1');
firebase.initializeApp(firebaseConfig());

ReactDOM.render(
  <Provider store={configureStore(history)}>
    <Fragment>
      <Meta />
      <Error />
      <Auth />
      <Intercom />
      <ErrorBoundary>
        <Routes history={history} />
      </ErrorBoundary>
    </Fragment>
  </Provider>,
  document.getElementById('root'),
);

unregister();
