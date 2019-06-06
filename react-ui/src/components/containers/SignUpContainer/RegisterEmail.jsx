// @flow

import React, { Component, Fragment } from 'react';
import { authActions } from 'redux/modules/auth';
import RegisterEmail from 'components/LV3/RegisterEmail';
import { ErrorMessages } from 'variables';
import Path from 'config/path';
import styled from 'styled-components';
import { Colors, Dimens, FontSizes } from 'variables';
import { media } from 'helpers/style/media-query';

const ErrMessage = styled.div`
  width: 100%;
  height: 54px;
  display: block;
  position: fixed;
  left: 0px;
  top: 64px;
  z-index: 100;
  text-align: center;
  padding: ${Dimens.medium_17}px;
  line-height: 22px;
  font-size: ${FontSizes.small_15}px;
  font-weight: bold;
  color: ${Colors.white};
  background-color: ${Colors.brandPrimary};
  ${media.tablet`
    top: 54px;
  `};
`;

type PropTypes = {
  dispatch: Function,
  isRegistering: boolean,
};

type State = {
  email: string,
  password: string,
  isUnVisiblePW: boolean,
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
      isUnVisiblePW: true,
      hasChanged: false,
      errors: {},
    };
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
      errors.email = [].concat(errors.email, [ErrorMessages.PleaseInput]);
    }
    if (!email.match(Validate.Email)) {
      errors.email = [].concat(errors.email, [ErrorMessages.InvalidEmail]);
    }
    // パスワードチェック
    if (password.length < Validate.Password.Min) {
      errors.password = [].concat(errors.password, [ErrorMessages.InvalidPassword]);
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

  onClickIconPassword = () => {
    const { isUnVisiblePW } = this.state;
    if (isUnVisiblePW) {
      this.setState({ isUnVisiblePW: !isUnVisiblePW });
    }
    if (!isUnVisiblePW) {
      this.setState({ isUnVisiblePW: !isUnVisiblePW });
    }
  };

  validate = () => {
    const { email, password } = this.state;
    return (
      email && email.match(Validate.Email) && password && password.length >= Validate.Password.Min
    );
  };

  onKeyDownPassword = e => {
    if (e && e.keyCode === 13 && this.validate()) {
      this.onClickNext();
    }
  };

  render() {
    const { isRegistering, errorMessage, history } = this.props;
    const { email, password, isUnVisiblePW, hasChanged, errors } = this.state;
    return (
      <Fragment>
        {errorMessage && <ErrMessage>{errorMessage}</ErrMessage>}
        <RegisterEmail
          onClickNext={this.onClickNext}
          onClickFacebook={this.onClickFacebook}
          onChangeEmail={value => this.handleChangeForm('email', value)}
          onChangePassword={value => this.handleChangeForm('password', value)}
          onKeyDownPassword={this.onKeyDownPassword}
          email={email}
          emailError={(!hasChanged && errors.email) || []}
          password={password}
          passError={(!hasChanged && errors.password) || []}
          ispasswordVisible={isUnVisiblePW}
          onClickIconPassword={this.onClickIconPassword}
          isRegisterChecking={isRegistering}
          onClickLogin={() => history.push(Path.login())}
        />
      </Fragment>
    );
  }
}
