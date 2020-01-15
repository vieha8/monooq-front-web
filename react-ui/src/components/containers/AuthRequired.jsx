import React, { Component } from 'react';
import { Redirect, withRouter } from 'react-router-dom';
import Path from 'config/path';
import { uiActions } from 'redux/modules/ui';
import { connect } from 'react-redux';
import LoadingPage from 'components/LV3/LoadingPage';

const authRequired = WrappedComponent => {
  class authRequiredComponent extends Component {
    constructor(props) {
      super(props);

      const { isLogin } = this.props;
      if (!isLogin) {
        const { dispatch, location } = this.props;
        dispatch(uiActions.setUiState({ redirectPath: location.pathname }));
      }
    }

    render() {
      const { isLogin, isInit } = this.props;
      if (!isInit) {
        return <LoadingPage />;
      }
      if (!isLogin && isInit) {
        return <Redirect to={Path.login()} />;
      }
      return <WrappedComponent {...this.props} />;
    }
  }

  const mapStateToProps = state => ({
    isLogin: state.auth.isLogin,
    isInit: state.init.isInitialized,
  });

  return withRouter(connect(mapStateToProps)(authRequiredComponent));
};

export default authRequired;
