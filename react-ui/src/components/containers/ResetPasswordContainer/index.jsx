// @flow

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
  Email: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, // eslint-disable-line
};

type PropTypes = {
  dispatch: Function,
  isLogin: boolean,
  isChecking: boolean,
  emailSended: boolean,
};

type State = {
  email: string,
  hasChanged: boolean,
  errors: Array<string>,
};

class ResetPasswordContainer extends Component<PropTypes, State> {
  constructor(props: PropTypes) {
    super(props);

    this.state = {
      email: '',
      hasChanged: false,
      errors: [],
    };
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(authActions.initPasswordReset());
  }

  onClickSend = () => {
    if (!this.validate()) {
      this.setState({
        hasChanged: false,
        errors: [ErrorMessages.InvalidEmail],
      });
      return;
    }

    this.setState({ hasChanged: false });

    const { dispatch } = this.props;
    const { email } = this.state;
    dispatch(authActions.passwordReset({ email }));
  };

  handleChangeEmail = value => {
    this.setState({ email: value, hasChanged: true, errors: [] });
  };

  validate = () => {
    const { email } = this.state;
    return email && email.match(Validate.Email);
  };

  render() {
    const { isLogin, isChecking, emailSended, resetError } = this.props;
    const { email, hasChanged, errors } = this.state;

    if (isLogin) {
      return <Redirect to={Path.top()} />;
    }

    const dispErrors = [];
    if (!hasChanged) {
      dispErrors.push(...errors);
      if (!isChecking && resetError) {
        dispErrors.push(ErrorMessages.FailedResetPassword);
      }
    }

    return (
      <AccountTemplate
        header={<Header />}
        form={
          <ResetPassword
            email={email}
            onChangeEmail={this.handleChangeEmail}
            onClickSend={this.onClickSend}
            errors={dispErrors}
            sended={emailSended}
            buttonLoading={isChecking}
          />
        }
      />
    );
  }
}

const mapStateToProps = state => ({
  isLogin: state.auth.isLogin,
  isChecking: state.auth.isResetTrying,
  emailSended: state.auth.isResetSuccess,
  resetError: state.auth.errorMessages,
});

export default connect(
  ResetPasswordContainer,
  mapStateToProps,
);
