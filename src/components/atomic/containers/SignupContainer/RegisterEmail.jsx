// @flow

import React, { Component } from 'react';
import { authActions } from 'redux/modules/auth';
import RegisterEmail from 'components/atomic/organisms/RegisterEmail';
import { ErrorMessage } from 'strings';

type PropTypes = {
  dispatch: Function,
  isRegisting: boolean,
  isSignupFailed: boolean,
}

type State = {
  email: string,
  password: string,
  passwordConfirm: string,
  hasChanged: boolean,
  errors: {
    email?: Array<string>,
    password?: Array<string>,
    passwordConfirm?: Array<string>,
  },
}

const Validate = {
  Email: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, // eslint-disable-line
  Password: {
    Min: 8,
  },
};

export default class RegisterContainer extends Component {
  constructor(props: PropTypes) {
    super(props);

    this.state = {
      email: '',
      password: '',
      passwordConfirm: '',
      hasChanged: false,
      errors: {},
    };
  }

  onClickNext = () => {
    const { email, password, passwordConfirm } = this.state;

    this.setState({ hasChanged: false, errors: {} });

    if (this.validate()) {
      const { dispatch } = this.props;
      dispatch(authActions.signupEmail({ email, password }));
      return;
    }

    const errors = {};
    // emailチェック
    if (!email) {
      errors.email = [].concat(errors.email, [ErrorMessage.PleaseInput]);
    }
    if (!email.match(Validate.Email)) {
      errors.email = [].concat(errors.email, [ErrorMessage.InvalidEmail]);
    }
    // パスワードチェック
    if (password.length < Validate.Password.Min) {
      errors.password = [].concat(errors.password, [ErrorMessage.InvalidPassword]);
    }
    // パスワード確認チェック
    if (password !== passwordConfirm) {
      errors.passwordConfirm = [].concat(errors.password, [ErrorMessage.NotMatchPassword]);
    }
    this.setState({ errors });
  }

  onClickFacebook = () => {
    const { dispatch } = this.props;
    dispatch(authActions.signupFacebook());
  }

  handleChangeForm = (name: string, value: any) => {
    const state = this.state;
    state[name] = value;
    state.hasChanged = true;
    this.setState(state);
  }

  validate = () => {
    const { email, password, passwordConfirm } = this.state;
    return (
      email && email.match(Validate.Email)
      && password && password.length >= Validate.Password.Min
      && passwordConfirm && password === passwordConfirm
    );
  }

  props: PropTypes;
  staet: State;

  render() {
    const { isRegisting } = this.props;
    const { email, password, passwordConfirm, hasChanged, errors } = this.state;

    return (
      <RegisterEmail
        onClickNext={this.onClickNext}
        onClickFacebook={this.onClickFacebook}
        onChangeEmail={value => this.handleChangeForm('email', value)}
        onChangePassword={value => this.handleChangeForm('password', value)}
        onChangePasswordConfirm={value => this.handleChangeForm('passwordConfirm', value)}
        email={email}
        emailError={(!hasChanged && errors.email) || []}
        password={password}
        passError={(!hasChanged && errors.password) || []}
        passwordConfirm={passwordConfirm}
        passConfirmError={(!hasChanged && errors.passwordConfirm) || []}
        isRegisterChecking={isRegisting}
      />
    );
  }
}
