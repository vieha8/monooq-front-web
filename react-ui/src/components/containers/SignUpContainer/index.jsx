// @flow

import React, { Component } from 'react';
import AccountTemplate from 'components/templates/AccountTemplate';
import Header from 'components/containers/Header';
import RegisterEmail from './RegisterEmail';
import connect from '../connect';

class SignUpContainer extends Component {
  render() {
    const { isSignupFailed } = this.props;
    return (
      <AccountTemplate
        header={<Header noHeaderButton />}
        form={<RegisterEmail {...this.props} />}
        err={isSignupFailed}
      />
    );
  }
}

const mapStateToProps = state => ({
  user: state.auth.user,
  isRegistering: state.auth.isRegistering,
  isLoading: state.user.isLoading,
  isSignupFailed: state.auth.isSignupFailed,
  errorMessage: state.auth.errorMessage,
});

export default connect(
  SignUpContainer,
  mapStateToProps,
);
