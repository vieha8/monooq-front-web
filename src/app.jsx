import React, {Fragment} from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import createHistory from 'history/createBrowserHistory';
import firebase from 'firebase';
import firebaseConfig from './config/firebase';
import registerServiceWorker from './registerServiceWorker';
import configureStore from './redux/store/configureStore';
import Routes from './config/routes';
import './index.css';
import { Auth } from 'components/Auth';

const history = createHistory();

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

registerServiceWorker();
