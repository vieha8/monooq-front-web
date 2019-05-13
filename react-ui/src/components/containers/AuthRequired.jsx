// @flow

import React, { Component } from 'react';
import { Redirect, withRouter } from 'react-router-dom';
import { authActions } from 'redux/modules/auth';
import Path from 'config/path';
import LoadingPage from 'components/LV3/LoadingPage';
import { uiActions } from '../../redux/modules/ui';
import { connect } from 'react-redux';

type PropTypes = {
  dispatch: Function,
  isChecking: boolean,
  isLogin: boolean,
};

export function checkLogin(props: PropTypes) {
  const { dispatch, location } = props;
  if (!props.isChecking && !props.isLogin) {
    dispatch(uiActions.setUiState({ redirectPath: location.pathname }));
    dispatch(authActions.checkLogin());
  }
}

export function checkAuthState({ isChecking, isLogin }: PropTypes) {
  if (isChecking) {
    return <LoadingPage hideProgress />;
  }

  if (!isLogin) {
    return <Redirect to={Path.login()} />;
  }

  return null;
}

export function mergeAuthProps(state: Object, props: Object) {
  return {
    ...props,
    isLogin: state.auth.isLogin,
    isChecking: state.auth.isChecking,
  };
}

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
      return <WrappedComponent />;
    }
  }

  const mapStateToProps = state => ({
    isLogin: state.auth.isLogin,
  });

  return withRouter(connect(mapStateToProps)(authRequiredComponent));
}
