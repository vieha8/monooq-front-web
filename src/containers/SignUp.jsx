import React from 'react';
import {connect} from 'react-redux';
import path from '../config/path';

import SignUp from 'components/SignUp';
import { authActions } from "../redux/modules/auth";
import { userActions } from "../redux/modules/user";
import {uiActions} from "../redux/modules/ui";

class SignUpContainer extends React.Component {

  constructor(props) {
    super(props);
  }

  handleChangeText = ({target}) => {
    this.props.dispatch(
      uiActions.setUiState({
        [target.name]: target.value,
      }),
    );
  };

  onClickSignUpEmail = () => {
    const {email, password, passwordConfirm} = this.props.ui;

    if(!email || email === '') {
      // TODO エラー
      return;
    }

    if(!password || password === '') {
      // TODO エラー
      return;
    }

    if(password !== passwordConfirm) {
      // TODO エラー
      return;
    }

    this.props.dispatch(authActions.signupEmail({ email: email, password: password }));
  };

  onClickSignUpFacebook = () => {
    this.props.dispatch(authActions.signupFacebook());
  };

  onClickRegisterProfile = () => {
    const {name, address, profile} = this.props.ui;

    if(!name || name === '') {
      //TODO エラー
      return;
    }

    if(!address || address === '') {
      //TODO エラー
      return;
    }

    if(!profile || profile === '') {
      //TODO エラー
      return;
    }

    this.props.dispatch(userActions.updateUser({
      userId: this.props.user.ID,
      body:{ Name: name, PrefCode: '13', Profile: profile}
    }));
  };

  onClickGuest = () => {
    this.props.history.push(`${path.search()}?location=東京都`);
  };

  onClickHost = () => {
    this.props.history.push(`${path.createSpaceInfo()}`);
  };

  render() {
    return (
      <SignUp
        step={this.props.ui.signUpStep}
        onClickSignUpEmail={this.onClickSignUpEmail}
        onClickSignUpFacebook={this.onClickSignUpFacebook}
        onClickRegisterProfile={this.onClickRegisterProfile}
        onClickGuest={this.onClickGuest}
        onClickHost={this.onClickHost}
        handleChangeText={this.handleChangeText}
        {...this.props.ui}
      />
    );
  }
}

const mapStateToProps = state => ({
  ui: state.ui,
  user: state.auth.user,
});

export default connect(mapStateToProps)(SignUpContainer);
