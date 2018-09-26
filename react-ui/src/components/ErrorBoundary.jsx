import React from 'react';
import { connect } from 'react-redux';
import * as Sentry from '@sentry/browser';
import { errorActions } from 'redux/modules/error';

class ErrorBoundary extends React.Component {
  componentDidCatch(error, errorInfo) {
    const { user, dispatch } = this.props;
    Sentry.configureScope(scope => {
      Object.keys(errorInfo).forEach(key => {
        scope.setExtra(key, errorInfo[key]);
      });
      scope.setUser({
        id: user.ID,
        username: user.Name,
        email: user.Email,
      });
    });
    Sentry.captureException(error);
    dispatch(errorActions.setError(error));
  }

  render() {
    const { children } = this.props;
    return children;
  }
}

const mapStateToProps = state => ({
  user: state.auth.user,
});

export default connect(mapStateToProps)(ErrorBoundary);
