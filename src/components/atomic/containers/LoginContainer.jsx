// @flow

import React, { Component } from 'react';
import { Redirect } from 'react-router';

import { authActions } from 'redux/modules/auth';
import { uiActions } from 'redux/modules/ui';

import AccountTemplate from 'components/atomic/templates/AccountTemplate';
import Login from 'components/atomic/organisms/Login';
import Header from 'components/atomic/organisms/Header';

import Path from 'config/path';

import connect from './connect';

type PropTypes = {
  dispatch: Function,
  isLogin: boolean,
  isChecking: boolean,
  loginFailed: boolean,
  ui: {
    redirectPath?: string,
  },
}

type State = {
  email: string,
  password: string,
  hasChanged: boolean,
}

class LoginContainer extends Component {
  constructor(props: PropTypes) {
    super(props);

    this.state = {
      email: '',
      password: '',
      hasChanged: false,
    };
  }

  state: State;
  props: PropTypes;

  loginEmail = () => {
    const { dispatch } = this.props;
    const { email, password } = this.state;
    this.setState({ hasChanged: false });
    dispatch(authActions.loginEmail({ email, password }));
  }

  loginFacebook = () => {
    const { dispatch } = this.props;
    dispatch(authActions.loginFacebook());
  }

  handleChangeEmail = (value) => {
    this.setState({ email: value, hasChanged: true });
  }

  handleChangePassword = (value) => {
    this.setState({ password: value, hasChanged: true });
  }

  validate = () => {
    const { email, password } = this.state;
    return (
      email
      && email.length > 0
      && password
      && password.length > 0
    );
  }

  render() {
    const { dispatch, ui, isLogin, isChecking, loginFailed } = this.props;
    const { email, password, hasChanged } = this.state;

    if (!isLogin) {
      return (
        <AccountTemplate
          header={<Header />}
          form={
            <Login
              onClickFacebook={this.loginFacebook}
              onClickLogin={this.loginEmail}
              onChangeEmail={this.handleChangeEmail}
              onChangePassword={this.handleChangePassword}
              email={email}
              password={password}
              loginFailed={loginFailed && !hasChanged}
              buttonDisabled={!this.validate()}
              isLoginChecking={isChecking}
            />
          }
        />
      );
    }

    // 多重render防止
    if (ui.redirectPath) {
      dispatch(uiActions.setUiState({ redirectPath: null }));
    }

    return <Redirect to={ui.redirectPath || Path.top()} />;
  }
}

function mapStateToProps(state) {
  return {
    isLogin: state.auth.isLogin && state.auth.user.Name,
    isChecking: state.auth.isChecking,
    loginFailed: state.auth.error,
    ui: state.ui,
  };
}

export default connect(LoginContainer, mapStateToProps);
