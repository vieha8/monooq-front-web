import React, { Component, Fragment } from 'react';
import { authActions } from 'redux/modules/auth';
import RegisterEmail from 'components/LV3/RegisterEmail';
import Path from 'config/path';
import styled from 'styled-components';
import { Colors, Dimens, FontSizes, ErrorMessages, ZIndexes } from 'variables';
import { media } from 'helpers/style/media-query';
import { iskeyDownEnter } from 'helpers/keydown';
import isEmailValid from 'helpers/validations/email';

const ErrMessage = styled.div`
  width: 100%;
  height: 54px;
  display: block;
  position: fixed;
  left: 0px;
  top: 85px;
  z-index: ${ZIndexes.frontParts};
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

const Validate = {
  Password: /^([a-zA-Z0-9]{8,})$/,
};

export default class RegisterPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      isUnVisiblePW: true,
      error: {},
    };
  }

  onClickNext = () => {
    const { email, password } = this.state;
    const { dispatch } = this.props;
    dispatch(authActions.signupEmail({ email, password }));
  };

  onClickFacebook = () => {
    const { dispatch } = this.props;
    dispatch(authActions.signupFacebook());
  };

  handleChangeUI = (propName, value) => {
    const { state } = this;
    const { error } = state;
    const errors = [];

    switch (propName) {
      case 'email':
        const { result, reason } = isEmailValid(value);
        if (!result) {
          errors.push(reason);
        }
        break;
      case 'password':
        if (!value || value.trim().length === 0) {
          errors.push(ErrorMessages.PleaseInput);
        } else if (!value.match(Validate.Password)) {
          errors.push(ErrorMessages.InvalidPassword);
        }
        break;
      default:
        break;
    }

    state[propName] = value;
    error[propName] = errors;
    this.setState({ ...state, error });
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
    return isEmailValid(email).result && password && password.match(Validate.Password);
  };

  onKeyDownPassword = e => {
    if (iskeyDownEnter(e) && this.validate()) {
      this.onClickNext();
    }
  };

  render() {
    const { isRegistering, errorMessage, history } = this.props;
    const { email, password, isUnVisiblePW, error } = this.state;
    return (
      <Fragment>
        {errorMessage && <ErrMessage>{errorMessage}</ErrMessage>}
        <RegisterEmail
          errors={error}
          isErrorMessage={errorMessage}
          onClickNext={this.onClickNext}
          onClickFacebook={this.onClickFacebook}
          onChangeEmail={v => this.handleChangeUI('email', v)}
          onChangePassword={v => this.handleChangeUI('password', v)}
          onKeyDownPassword={this.onKeyDownPassword}
          email={email}
          password={password}
          ispasswordVisible={isUnVisiblePW}
          onClickIconPassword={this.onClickIconPassword}
          isRegisterChecking={isRegistering}
          buttonDisabled={!this.validate()}
          onClickLogin={() => history.push(Path.login())}
        />
      </Fragment>
    );
  }
}
