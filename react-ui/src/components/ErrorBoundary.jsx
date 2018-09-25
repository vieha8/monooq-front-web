import React from 'react';
import { connect } from 'react-redux';
import * as Sentry from '@sentry/browser';
import { errorActions } from 'redux/modules/error';

class ErrorBoundary extends React.Component {
  componentDidCatch(error, errorInfo) {
    this.props.dispatch(errorActions.setError(error));
    Sentry.configureScope(scope => {
      Object.keys(errorInfo).forEach(key => {
        scope.setExtra(key, errorInfo[key]);
      });
    });
    Sentry.captureException(error);
  }

  render() {
    const { children } = this.props;
    return children;
  }
}

export default connect()(ErrorBoundary);
