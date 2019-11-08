import React, { Component } from 'react';
import AccountTemplate from 'components/templates/AccountTemplate';
import Header from 'components/containers/Header';
import Path from 'config/path';
import { authActions } from 'redux/modules/auth';
import { parse } from 'helpers/query-string';
import { isAvailableLocalStorage } from 'helpers/storage';
import connect from '../connect';
import RegisterEmail from './RegisterEmail';

class SignUpContainer extends Component {
  componentDidMount() {
    const { dispatch, user, history, location } = this.props;
    if (user.id) {
      if (user.name === '') {
        history.push(Path.signUpProfile());
      } else {
        history.push(Path.top());
      }
    } else {
      dispatch(authActions.initSignup());
    }
    const query = parse(location.search);
    if (isAvailableLocalStorage()) {
      if (query.invite_code) {
        localStorage.setItem('invite_code', query.invite_code);
      }
    }
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
