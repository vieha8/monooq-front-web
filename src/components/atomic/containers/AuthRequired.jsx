// @flow

import React from 'react';
import { Redirect } from 'react-router-dom';
import Path from 'config/path';
import LoadingPage from 'components/atomic/organisms/LoadingPage';

type PropTypes = {
  isChecking: boolean,
  isLogin: boolean,
};

export function checkAuthState(props: PropTypes) {
  const { isChecking, isLogin } = props;

  if (isChecking) {
    return () => <LoadingPage hideProgress />;
  }

  if (!isLogin) {
    return () => <Redirect to={Path.login()} />;
  }

  return () => null;
}

export function mergeAuthProps(state: Object, props: Object) {
  return {
    ...props,
    isLogin: state.auth.isLogin,
    isChecking: state.auth.isChecking,
  };
}
