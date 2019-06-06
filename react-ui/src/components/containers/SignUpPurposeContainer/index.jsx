// @flow

import React, { Component } from 'react';
import AccountTemplate from 'components/templates/AccountTemplate';
import Header from 'components/containers/Header';
import RegisterHowToUse from './RegisterHowToUse';
import connect from '../connect';

class SignUpPurposeContainer extends Component {
  render() {
    return (
      <AccountTemplate
        header={<Header noHeaderButton />}
        form={<RegisterHowToUse {...this.props} />}
      />
    );
  }
}

const mapStateToProps = state => ({
  user: state.auth.user,
  isRegistering: state.auth.isRegistering,
  isLoading: state.user.isLoading,
  isSignupFailed: state.auth.isSignupFailed,
});

export default connect(
  SignUpPurposeContainer,
  mapStateToProps,
);
