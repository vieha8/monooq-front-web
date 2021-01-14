import 'core-js/stable';
import 'regenerator-runtime/runtime';
import * as React from 'react';
import 'semantic-ui-css/semantic.min.css';
import 'styles/globals.css';
import wrapper from 'redux/store';

function App({ Component, ...props }) {
  return <Component {...props} />;
}

export default wrapper.withRedux(App);
