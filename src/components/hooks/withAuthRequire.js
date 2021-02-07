import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import Path from 'config/path';
import { uiActions } from 'redux/modules/ui';
import LoadingPage from 'components/LV3/LoadingPage';

const withAuthRequire = Component => props => {
  const dispatch = useDispatch();
  const router = useRouter();

  const isLogin = useSelector(state => state.auth.isLogin);
  const isInit = useSelector(state => state.init.isInitialized);

  if (!isLogin) {
    dispatch(uiActions.setUiState({ redirectPath: router.asPath }));
  }

  if (!isLogin && !isInit) {
    return <LoadingPage />;
  }

  if (!isLogin && isInit) {
    router.push(Path.login());
  }

  return <Component {...props} />;
};

export default withAuthRequire;
