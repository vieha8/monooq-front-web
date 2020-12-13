import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import loadable from '@loadable/component';
import Root from 'components/pages/Root';
import Meta from 'components/LV1/Meta';

import { unregister } from './registerServiceWorker';
import createStore, { history } from './redux/store';
import Routes from './routes';
import './index.css';

const Error = loadable(() =>
  import('components/LV3/ErrorModal').catch(() => window.location.reload()),
);

const store = createStore();

ReactDOM.render(
  <Provider store={store}>
    <Root history={history}>
      <Meta />
      <Error />
      <Routes history={history} />
    </Root>
  </Provider>,
  document.getElementById('root'),
);

unregister();
