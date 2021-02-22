import React, { Component } from 'react';
import { connect } from 'react-redux';
import Path from 'config/path';
import authActions  from 'redux/sagas/auth/generators';
import AccountTemplate from 'components/templates/AccountTemplate';
import Login from 'components/LV3/Login';
import { iskeyDownEnter } from 'helpers/keydown';
import isEmailValid from 'helpers/validations/email';

class LoginPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      isUnVisiblePW: true,
      hasChanged: false,
    };
  }

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

  handleChangeForm = (name, value) => {
    const { state } = this;
    state[name] = value;
    state.hasChanged = true;
    this.setState(state);
  };

  validate = () => {
    const { email, password } = this.state;
    return isEmailValid(email).result && password && password.length > 0;
  };

  form = () => {
    const { isChecking, loginFailed, router } = this.props;
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
        onClickSignup={() => router.push(Path.signUp())}
      />
    );
  };

  render() {
    const { ui, isLogin, router } = this.props;

    if (!isLogin) {
      return <AccountTemplate title="ログイン" form={this.form()} />;
    }

    router.push(ui.redirectPath || Path.top());
    return null;
  }
}

const mapStateToProps = state => ({
  isLogin: state.auth.isLogin,
  isChecking: state.auth.isChecking,
  loginFailed: state.auth.error,
  ui: state.ui,
});

export default connect(mapStateToProps)(LoginPage);
