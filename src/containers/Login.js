import React from 'react';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import firebase from 'firebase';
import { firebaseApp } from '../libs/firebase';
import Button from 'material-ui/Button';
import Header from '../components/Header';

class Login extends React.Component {
  //TODO とりあえずFirebase UI component入れてるけどちゃんとスクラッチでつくる予定

  // The component's Local state.
  state = {
    signedIn: false, // Local signed-in state.
  };

  // Configure FirebaseUI.
  uiConfig = {
    // Popup signin flow rather than redirect flow.
    signInFlow: 'redirect',
    // We will display Google and Facebook as auth providers.
    signInOptions: [
      firebase.auth.EmailAuthProvider.PROVIDER_ID,
      firebase.auth.FacebookAuthProvider.PROVIDER_ID,
    ],
    callbacks: {
      // Avoid redirects after sign-in.
      signInSuccess: () => false,
    },
  };

  // Listen to the Firebase Auth state and set the local state.
  componentWillMount() {
    firebaseApp.auth().onAuthStateChanged(user => this.setState({ signedIn: !!user }));
  }

  render() {
    if (!this.state.signedIn) {
      return (
        <div>
          <Header />
          <div style={{ textAlign: 'center' }}>ログイン</div>
          <StyledFirebaseAuth uiConfig={this.uiConfig} firebaseAuth={firebaseApp.auth()} />
        </div>
      );
    }
    return (
      <div>
        <Header />
        <p>ようこそ {firebase.auth().currentUser.displayName}さん!</p>
        <Button raised onClick={() => firebaseApp.auth().signOut()} color="primary">
          ログアウト
        </Button>
      </div>
    );
  }
}

export default Login;
