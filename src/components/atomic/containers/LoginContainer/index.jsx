// @flow

import React, { Component } from 'react';
import { Redirect } from 'react-router';

import { authActions } from 'redux/modules/auth';
import { uiActions } from 'redux/modules/ui';

import AccountTemplate from 'components/atomic/templates/AccountTemplate';
import Login from 'components/atomic/LV3/Login';
import Header from 'components/atomic/containers/Header';

import Path from 'config/path';

import connect from '../connect';

type PropTypes = {
  dispatch: Function,
  isLogin: boolean,
  isChecking: boolean,
  loginFailed: boolean,
  ui: {
    redirectPath?: string,
  },
};

type State = {
  email: string,
  password: string,
  hasChanged: boolean,
};

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
  };

  loginFacebook = () => {
    const { dispatch } = this.props;
    dispatch(authActions.loginFacebook());
  };

  handleChangeForm = (name: string, value: any) => {
    const state = this.state;
    state[name] = value;
    state.hasChanged = true;
    this.setState(state);
  };

  validate = () => {
    const { email, password } = this.state;
    return email && email.length > 0 && password && password.length > 0;
  };

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
              onChangeEmail={value => this.handleChangeForm('email', value)}
              onChangePassword={value => this.handleChangeForm('password', value)}
              email={email}
              password={password}
              loginFailed={loginFailed && !hasChanged && !isChecking}
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
