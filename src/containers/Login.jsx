import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import firebase from 'firebase';
import Login from 'components/Login';
import { uiActions } from "../redux/modules/ui";
import { authActions } from "../redux/modules/auth";

class LoginContainer extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: ''
    }
  }

  loginFacebook = () => {
    const provider = new firebase.auth.FacebookAuthProvider();
    firebase.auth().signInWithRedirect(provider);
    // TODO 認証後の戻りを/login以外のページに変えられないか調査
    // TODO authReducerに移動する
  };

  loginEmail = () => {
    const { email, password } = this.props.ui;
    this.props.dispatch(authActions.loginEmail({email, password}));
  };

  handleChangeEmail = (event) => {
    this.props.dispatch(uiActions.setUiState({
      email: event.target.value,
    }));
  };

  handleChangePassword = (event) => {
    this.props.dispatch(uiActions.setUiState({
      password: event.target.value,
    }));
  };

  showLoginForm = () => {
    if (this.props.isChecking) {
      return null;
    }

    if (!this.props.isLogin) {
      return (
        <Login
          onClickLoginFacebook={this.loginFacebook}
          onClickLoginEmail={this.loginEmail}
          handleChangeEmail={this.handleChangeEmail}
          handleChangePassword={this.handleChangePassword}
          email={this.props.ui.email}
          password={this.props.ui.password}
        />
      );
    }

    return <Redirect to="/" />;
  };

  render() {
    return <Fragment>{this.showLoginForm()}</Fragment>;
  }
}

const mapStateToProps = state => ({
  isLogin: state.auth.isLogin,
  isChecking: state.auth.isChecking,
  ui: state.ui,
});

export default connect(mapStateToProps)(LoginContainer);
