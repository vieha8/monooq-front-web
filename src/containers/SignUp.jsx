import React from 'react';
import {connect} from 'react-redux';
import path from '../config/path';

import SignUp from 'components/SignUp';
import { authActions } from "../redux/modules/auth";
import { userActions } from "../redux/modules/user";
import {uiActions} from "../redux/modules/ui";

class SignUpContainer extends React.Component {

  handleChangeText = ({target}) => {
    const {user} = this.props.ui;
    Object.assign(user, {[target.name]: target.value});
    this.props.dispatch(uiActions.setUiState({user}));
  };

  handleChangeSelect = (_, target) => {
    this.handleChangeText({target});
  };

  handleChangeImage = (accepted, rejected) => {
    if(rejected.length > 0){
      console.error(rejected);
    }
    const {user} = this.props.ui;
    Object.assign(user, {image: accepted[0]});
    this.props.dispatch(uiActions.setUiState({user}));
  };

  onClickSignUpEmail = () => {
    const {email, password, passwordConfirm} = this.props.ui.user;

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
    const {name, address, profile, image} = this.props.ui.user;

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
      body:{ name, profile, image, PrefCode: '13'}
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
        handleChangeImage={this.handleChangeImage}
        {...this.props}
      />
    );
  }
}

const mapStateToProps = state => ({
  ui: state.ui,
  user: state.auth.user,
});

export default connect(mapStateToProps)(SignUpContainer);
