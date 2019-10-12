// @flow

import React, { Component } from 'react';
import AccountTemplate from 'components/templates/AccountTemplate';
import Header from 'components/containers/Header';
import Path from 'config/path';
import { authActions } from 'redux/modules/auth';
import RegisterEmail from './RegisterEmail';
import connect from '../connect';

class SignUpContainer extends Component {
  componentDidMount() {
    const { dispatch, user, history } = this.props;
    if (user.id) {
      history.push(Path.top());
    }
    dispatch(authActions.initSignup());
  }

  render() {
    const { isSignUpFailed } = this.props;
    return (
      <AccountTemplate
        header={<Header noHeaderButton />}
        form={<RegisterEmail {...this.props} />}
        err={isSignUpFailed}
      />
    );
  }
}

const mapStateToProps = state => ({
  user: state.auth.user,
  isRegistering: state.auth.isRegistering,
  isLoading: state.user.isLoading,
  isSignUpFailed: state.auth.isSignupFailed,
  errorMessage: state.auth.errorMessage,
});

export default connect(
  SignUpContainer,
  mapStateToProps,
);
