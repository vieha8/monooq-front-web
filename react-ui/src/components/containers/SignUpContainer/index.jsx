// @flow

import React, { Component } from 'react';
import AccountTemplate from 'components/templates/AccountTemplate';
import Header from 'components/containers/Header';
import RegisterEmail from './RegisterEmail';
import connect from '../connect';

class SignUpContainer extends Component {
  componentDidMount() {
    window.scrollTo(0, 0);
  }

  render() {
    return (
      <AccountTemplate
        header={<Header noHeaderButton />}
        form={<RegisterEmail {...this.props} />}
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
  SignUpContainer,
  mapStateToProps,
);
