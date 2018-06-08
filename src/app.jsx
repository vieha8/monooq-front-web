import React, { Fragment } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import createHistory from 'history/createBrowserHistory';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/storage';
import { Auth } from 'components/Auth';
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

firebase.initializeApp(firebaseConfig());

ReactDOM.render(
  <Provider store={configureStore(history)}>
    <Fragment>
      <Auth />
      <Routes history={history} />
    </Fragment>
  </Provider>,
  document.getElementById('root'),
);

// registerServiceWorker();
unregister();
