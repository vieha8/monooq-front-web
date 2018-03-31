// @flow

import React, { Component } from 'react';

import AccountTemplate from 'components/atomic/templates/AccountTemplate';
import Header from 'components/atomic/organisms/Header';

import RegisterEmail from './RegisterEmail';
import RegisterProfile from './RegisterProfile';
import connect from '../connect';

type PropTypes = {
  signupStep: number,
}

class SignupContainer extends Component {
  getCurrentForm = () => {
    const { signupStep } = this.props;
    const forms = [
      RegisterEmail,
      () => <div />, // TODO,
      () => <div />, // TODO,
      () => <div />, // TODO,
      RegisterProfile,
      () => <div />, // TODO,
    ];
    return forms[signupStep];
  }

  props: PropTypes;

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
    isSignupFailed: state.auth.isSignupFailed,
  });
}

export default connect(SignupContainer, mapStateToProps);
