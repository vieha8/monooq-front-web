// @flow

import React, { Component } from 'react';
import AccountTemplate from 'components/templates/AccountTemplate';
import Header from 'components/containers/Header';
import RegisterProfile from './RegisterProfile';
import connect from '../connect';

class SignUpProfileContainer extends Component {
  render() {
    return (
      <AccountTemplate
        header={<Header noHeaderButton />}
        form={<RegisterProfile {...this.props} />}
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
  SignUpProfileContainer,
  mapStateToProps,
);
