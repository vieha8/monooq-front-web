import React from 'react';
import {connect} from 'react-redux';
import path from '../config/path';

import SignUp from 'components/SignUp';
import { authActions } from "../redux/modules/auth";
import {uiActions} from "../redux/modules/ui";

class SignUpContainer extends React.Component {

  constructor(props) {
    super(props);
  }

  handleChangeEmail = (e) => {
    this.props.dispatch(
      uiActions.setUiState({
        email: e.target.value,
      }),
    );
  };

  handleChangePassword = (e) => {
    this.props.dispatch(
      uiActions.setUiState({
        password: e.target.value,
      }),
    );
  };

  handleChangeRePassword = (e) => {
    this.props.dispatch(
      uiActions.setUiState({
        passwordConfirm: e.target.value,
      }),
    );
  };

  test = () => {

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
    // this.setState({step: 4});
  };

  onClickRegisterProfile = () => {
    this.setState({step: 5});
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
        onClickRegisterProfile={this.onClickRegisterProfile}
        onClickGuest={this.onClickGuest}
        onClickHost={this.onClickHost}
        handleChangeEmail={this.handleChangeEmail}
        handleChangePassword={this.handleChangePassword}
        handleChangeRePassword={this.handleChangeRePassword}
        email={this.props.ui.email}
        password={this.props.ui.password}
        passwordConfirm={this.props.ui.passwordConfirm}
      />
    );
  }
}

const mapStateToProps = state => ({
  ui: state.ui,
});

export default connect(mapStateToProps)(SignUpContainer);
