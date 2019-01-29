// @flow

import React, { Component } from 'react';
import AccountTemplate from 'components/atomic/templates/AccountTemplate';
import Header from 'components/atomic/containers/Header';
import RegisterHowToUse from './RegisterHowToUse';
import connect from '../connect';

class SignUpPurposeContainer extends Component {
  componentDidMount() {
    window.scrollTo(0, 0);
  }

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
  isRegisting: state.auth.isRegisting,
  isLoading: state.user.isLoading,
  isSignupFailed: state.auth.isSignupFailed,
});

export default connect(
  SignUpPurposeContainer,
  mapStateToProps,
);
