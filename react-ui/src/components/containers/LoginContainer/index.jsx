// @flow

import React, { Component } from 'react';
import { Redirect } from 'react-router';

import { authActions } from 'redux/modules/auth';

import AccountTemplate from 'components/templates/AccountTemplate';
import Login from 'components/LV3/Login';
import Header from 'components/containers/Header';
import { iskeyDownEnter } from 'helpers/keydown';

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
  isUnVisiblePW: boolean,
  hasChanged: boolean,
};

class LoginContainer extends Component {
  constructor(props: PropTypes) {
    super(props);

    this.state = {
      email: '',
      password: '',
      isUnVisiblePW: true,
      hasChanged: false,
    };
  }

  state: State;

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

  onClickIconPassword = () => {
    const { isUnVisiblePW } = this.state;
    if (isUnVisiblePW) {
      this.setState({ isUnVisiblePW: !isUnVisiblePW });
    }
    if (!isUnVisiblePW) {
      this.setState({ isUnVisiblePW: !isUnVisiblePW });
    }
  };

  onKeyDownPassword = e => {
    if (iskeyDownEnter(e) && this.validate()) {
      this.loginEmail();
    }
  };

  handleChangeForm = (name: string, value: any) => {
    const { state } = this;
    state[name] = value;
    state.hasChanged = true;
    this.setState(state);
  };

  validate = () => {
    const { email, password } = this.state;
    return email && email.length > 0 && password && password.length > 0;
  };

  form = () => {
    const { isChecking, loginFailed, history } = this.props;
    const { email, password, isUnVisiblePW, hasChanged } = this.state;
    return (
      <Login
        onClickFacebook={this.loginFacebook}
        onClickLogin={this.loginEmail}
        onChangeEmail={value => this.handleChangeForm('email', value)}
        onChangePassword={value => this.handleChangeForm('password', value)}
        onKeyDownPassword={this.onKeyDownPassword}
        email={email}
        password={password}
        ispasswordVisible={isUnVisiblePW}
        onClickIconPassword={this.onClickIconPassword}
        loginFailed={loginFailed && !hasChanged && !isChecking}
        isLoginChecking={isChecking}
        buttonDisabled={!this.validate()}
        onClickSignup={() => history.push(Path.signUp())}
      />
    );
  };

  render() {
    const { ui, isLogin } = this.props;

    if (!isLogin) {
      return <AccountTemplate header={<Header noHeaderButton />} form={this.form()} />;
    }

    return <Redirect to={ui.redirectPath || Path.home()} />;
  }
}

function mapStateToProps(state) {
  return {
    isLogin: state.auth.isLogin,
    isChecking: state.auth.isChecking,
    loginFailed: state.auth.error,
    ui: state.ui,
  };
}

export default connect(
  LoginContainer,
  mapStateToProps,
);
