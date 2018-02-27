import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import firebase from 'firebase';
import Button from 'material-ui/Button';
import Login from 'components/Login';

class _Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLogin: false,
    };
  }

  loginFacebook = () => {
    const provider = new firebase.auth.FacebookAuthProvider();
    firebase.auth().signInWithRedirect(provider);
    // TODO 認証後の戻りを/login以外のページに変えられないか調査
  };

  showLoginButton = () => {
    if (this.props.isChecking) {
      return null;
    }
    if (!this.props.isLogin) {
      return (
        <div style={{ textAlign: 'center' }}>
          <Button raised color="primary" onClick={this.loginFacebook}>
            Facebookログイン
          </Button>
        </div>
      );
    }

    return <Redirect to="/" />;
  };

  render() {
    return <Fragment>{this.showLoginButton()}</Fragment>;
  }
}

const mapStateToProps = state => ({
  isLogin: state.auth.isLogin,
  isChecking: state.auth.isChecking,
  ui: state.ui,
});

export default connect(mapStateToProps)(Login);
