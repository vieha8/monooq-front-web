// @flow

import React, { Component } from 'react';
import { Redirect, withRouter } from 'react-router-dom';
import Path from 'config/path';
import { uiActions } from 'redux/modules/ui';
import { connect } from 'react-redux';

export default function authRequired(WrappedComponent: Component) {
  class authRequiredComponent extends Component {
    componentWillMount() {
      const { isLogin } = this.props;
      if (!isLogin) {
        const { dispatch, location } = this.props;
        dispatch(uiActions.setUiState({ redirectPath: location.pathname }));
      }
    }

    render() {
      const { isLogin } = this.props;
      if (!isLogin) {
        return <Redirect to={Path.login()} />;
      }
      return <WrappedComponent {...this.props} />;
    }
  }

  const mapStateToProps = state => ({
    isLogin: state.auth.isLogin,
  });

  return withRouter(connect(mapStateToProps)(authRequiredComponent));
}
