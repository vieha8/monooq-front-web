import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import firebase from 'firebase';
import Login from 'components/Login';

class LoginContainer extends React.Component {
  loginFacebook = () => {
    const provider = new firebase.auth.FacebookAuthProvider();
    firebase.auth().signInWithRedirect(provider);
    // TODO 認証後の戻りを/login以外のページに変えられないか調査
  };

  showLoginForm = () => {
    if (this.props.isChecking) {
      return null;
    }

    if (!this.props.isLogin) {
      return (
        <Login
          onClickLoginFacebook={this.loginFacebook}
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
