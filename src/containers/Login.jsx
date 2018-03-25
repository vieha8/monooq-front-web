import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import Login from 'components/Login';
import { uiActions } from 'redux/modules/ui';
import { authActions } from 'redux/modules/auth';
import Path from 'config/path';

class LoginContainer extends React.Component {
  loginFacebook = () => {
    this.props.dispatch(authActions.loginFacebook());
  };

  loginEmail = () => {
    const { email, password } = this.props.ui;
    this.props.dispatch(uiActions.setUiState({ inputed: false }));
    this.props.dispatch(authActions.loginEmail({ email, password }));
  };

  handleChangeEmail = (event) => {
    this.props.dispatch(uiActions.setUiState({
      email: event.target.value,
      inputed: true,
    }));
  };

  handleChangePassword = (event) => {
    this.props.dispatch(uiActions.setUiState({
      password: event.target.value,
      inputed: true,
    }));
  };

  validate = () => {
    const { ui } = this.props;
    return (
      ui.email && ui.email.length > 0
      && ui.password && ui.password.length > 0
    );
  }

  showLoginForm = () => {
    const { dispatch, ui, isLogin } = this.props;

    if (!isLogin) {
      return (
        <Login
          onClickLoginFacebook={this.loginFacebook}
          onClickLoginEmail={this.loginEmail}
          handleChangeEmail={this.handleChangeEmail}
          handleChangePassword={this.handleChangePassword}
          email={this.props.ui.email}
          password={this.props.ui.password}
          error={this.props.loginFailed}
          buttonDisabled={!this.validate()}
          isLoginProcessing={this.props.isChecking}
        />
      );
    }

    // 多重render防止
    if (ui.redirectPath) {
      dispatch(uiActions.setUiState({ redirectPath: null }));
    }
    return <Redirect to={ui.redirectPath || Path.top()} />;
  };

  render() {
    return <Fragment>{this.showLoginForm()}</Fragment>;
  }
}

const mapStateToProps = state => ({
  isLogin: state.auth.isLogin && state.auth.user.Name,
  isChecking: state.auth.isChecking,
  loginFailed: state.auth.error && !state.ui.inputed,
  ui: state.ui,
});

export default connect(mapStateToProps)(LoginContainer);
