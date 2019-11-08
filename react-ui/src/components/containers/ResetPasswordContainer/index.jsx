import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import Path from 'config/path';

import AccountTemplate from 'components/templates/AccountTemplate';
import Header from 'components/containers/Header';
import ResetPassword from 'components/LV3/ResetPassword';

import { authActions } from 'redux/modules/auth';

import { ErrorMessages } from 'variables';

import connect from '../connect';

const Validate = {
  Email: /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, // eslint-disable-line
};

class ResetPasswordContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      error: {},
    };
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(authActions.initPasswordReset());
  }

  onClickSend = () => {
    if (this.validate()) {
      const { dispatch } = this.props;
      const { email } = this.state;
      dispatch(authActions.passwordReset({ email }));
    }
  };

  handleChangeUI = (propName, value) => {
    const { state } = this;
    const { error } = state;
    const errors = [];

    switch (propName) {
      case 'email':
        if (!value || value.trim().length === 0) {
          errors.push(ErrorMessages.PleaseInput);
        } else if (!value.match(Validate.Email)) {
          errors.push(ErrorMessages.InvalidEmail);
        }
        break;
      default:
        break;
    }

    state[propName] = value;
    error[propName] = errors;
    this.setState({ ...state, error });
  };

  validate = () => {
    const { email } = this.state;
    return email && email.match(Validate.Email);
  };

  form = () => {
    const { isChecking, emailSended, resetError } = this.props;
    const { email, error } = this.state;
    return (
      <ResetPassword
        email={email}
        onChangeEmail={v => this.handleChangeUI('email', v)}
        onClickSend={this.onClickSend}
        errors={error}
        resetError={resetError.toString() || ''}
        sended={emailSended}
        buttonLoading={isChecking}
        buttonDisabled={!this.validate()}
      />
    );
  };

  render() {
    const { isLogin } = this.props;

    if (isLogin) {
      return <Redirect to={Path.top()} />;
    }

    return <AccountTemplate header={<Header />} form={this.form()} />;
  }
}

const mapStateToProps = state => ({
  isLogin: state.auth.isLogin,
  isChecking: state.auth.isResetTrying,
  emailSended: state.auth.isResetSuccess,
  resetError: state.auth.error,
});

export default connect(
  ResetPasswordContainer,
  mapStateToProps,
);
