import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Router from 'next/router';
import Path from 'config/path';
import { uiActions } from 'redux/modules/ui';
import LoadingPage from 'components/LV3/LoadingPage';

const withAuthRequire = Component => props => {
  const dispatch = useDispatch();

  const isLogin = useSelector(state => state.auth.isLogin);
  const isInit = useSelector(state => state.init.isInitialized);

  if (!isLogin) {
    dispatch(uiActions.setUiState({ redirectPath: window.location.pathname }));
  }

  if (!isLogin && !isInit) {
    return <LoadingPage />;
  }

  if (!isLogin && isInit) {
    Router.push(Path.login());
  }

  return <Component {...props} />;
};

export default withAuthRequire;
