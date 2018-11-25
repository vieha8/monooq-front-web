// @flow

import React, { Component } from 'react';

import AccountTemplate from 'components/atomic/templates/AccountTemplate';
import Header from 'components/atomic/containers/Header';

import RegisterEmail from './RegisterEmail';
import RegisterProfile from './RegisterProfile';
import RegisterHowToUse from './RegisterHowToUse';
import Registered from './Registered';

import connect from '../connect';

type PropTypes = {
  signupStep: number,
};

class SignUpContainer extends Component<PropTypes> {
  componentDidMount() {
    window.scrollTo(0, 0);
  }

  getCurrentForm = () => {
    const { signupStep } = this.props;
    const forms = [RegisterEmail, RegisterProfile, RegisterHowToUse];
    return forms[2];
  };

  render() {
    const Form = this.getCurrentForm();
    return <AccountTemplate header={<Header />} form={<Form {...this.props} />} />;
  }
}

const mapStateToProps = state => ({
  signupStep: state.ui.signupStep || 0,
  user: state.auth.user,
  isRegisting: state.auth.isRegisting,
  isLoading: state.user.isLoading,
  isSignupFailed: state.auth.isSignupFailed,
});

export default connect(
  SignUpContainer,
  mapStateToProps,
);
