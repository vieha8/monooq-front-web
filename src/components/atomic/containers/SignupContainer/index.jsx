// @flow

import React, { Component } from 'react';

import AccountTemplate from 'components/atomic/templates/AccountTemplate';
import Header from 'components/atomic/organisms/Header';

import RegisterEmail from './RegisterEmail';
import RegisterProfile from './RegisterProfile';
import Registered from './Registered';
import connect from '../connect';

type PropTypes = {
  signupStep: number,
}

class SignupContainer extends Component<PropTypes> {
  getCurrentForm = () => {
    const { signupStep } = this.props;
    const forms = [
      RegisterEmail,
      () => <div />, // TODO,
      () => <div />, // TODO,
      () => <div />, // TODO,
      RegisterProfile,
      Registered,
    ];
    return forms[signupStep];
  }

  render() {
    const Form = this.getCurrentForm();

    return (
      <AccountTemplate
        header={<Header />}
        form={<Form {...this.props} />}
      />
    );
  }
}

function mapStateToProps(state) {
  return ({
    signupStep: state.ui.signupStep || 0,
    user: state.auth.user,
    isRegisting: state.auth.isRegisting,
    isLoading: state.user.isLoading,
    isSignupFailed: state.auth.isSignupFailed,
  });
}

export default connect(SignupContainer, mapStateToProps);
