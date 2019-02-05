// @flow

import React from 'react';
import { Redirect } from 'react-router-dom';
import { authActions } from 'redux/modules/auth';
import Path from 'config/path';
import LoadingPage from 'components/atomic/LV3/LoadingPage';
import { uiActions } from '../../../redux/modules/ui';

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
