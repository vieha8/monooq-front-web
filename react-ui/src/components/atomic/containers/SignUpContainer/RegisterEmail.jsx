// @flow

import React, { Component } from 'react';
import { authActions } from 'redux/modules/auth';
import RegisterEmail from 'components/atomic/LV3/RegisterEmail';
import { ErrorMessage } from 'strings';
import Path from 'config/path';

type PropTypes = {
  dispatch: Function,
  isRegisting: boolean,
  isSignupFailed: boolean,
};

type State = {
  email: string,
  password: string,
  hasChanged: boolean,
  errors: {
    email?: Array<string>,
    password?: Array<string>,
  },
};

const Validate = {
  Email: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, // eslint-disable-line
  Password: {
    Min: 8,
  },
};

export default class RegisterContainer extends Component<PropTypes, State> {
  constructor(props: PropTypes) {
    super(props);

    this.state = {
      email: '',
      password: '',
      hasChanged: false,
      errors: {},
    };
  }

  componentDidMount() {
    window.scrollTo(0, 0);
  }

  onClickNext = () => {
    const { email, password } = this.state;

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
    this.setState({ errors });
  };

  onClickFacebook = () => {
    const { dispatch } = this.props;
    dispatch(authActions.signupFacebook());
  };

  handleChangeForm = (name: string, value: any) => {
    const state = this.state;
    state[name] = value;
    state.hasChanged = true;
    this.setState(state);
  };

  validate = () => {
    const { email, password } = this.state;
    return (
      email && email.match(Validate.Email) && password && password.length >= Validate.Password.Min
    );
  };

  render() {
    const { isRegisting, isSignupFailed, history } = this.props;
    const { email, password, hasChanged, errors } = this.state;
    return (
      <RegisterEmail
        onClickNext={this.onClickNext}
        onClickFacebook={this.onClickFacebook}
        onChangeEmail={value => this.handleChangeForm('email', value)}
        onChangePassword={value => this.handleChangeForm('password', value)}
        email={email}
        emailError={(!hasChanged && errors.email) || []}
        password={password}
        passError={(!hasChanged && errors.password) || []}
        isRegisterChecking={isRegisting}
        signUpError={isSignupFailed}
        onClickLogin={() => history.push(Path.login())}
      />
    );
  }
}
