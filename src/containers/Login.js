import React, { Fragment } from 'react';
import firebase from 'firebase';
import { firebaseApp } from '../libs/firebase';
import Button from 'material-ui/Button';
import Header from '../components/Header';

class Login extends React.Component {
  componentWillMount() {
    // TODO ログイン済みだったら表示されないようにする
  }

  loginFacebook = () => {
    const provider = new firebase.auth.FacebookAuthProvider();
    firebase.auth().signInWithRedirect(provider);
    // TODO 認証後の戻りを/login以外のページに変えられないか調査
  };

  render() {
    return (
      <Fragment>
        <Header />
        <div style={{ textAlign: 'center' }}>
          <Button raised color="primary" onClick={this.loginFacebook}>
            Facebookログイン
          </Button>
        </div>
      </Fragment>
    );
  }
}

export default Login;
