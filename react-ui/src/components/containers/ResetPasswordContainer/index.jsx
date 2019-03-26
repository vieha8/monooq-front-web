// @flow

import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import Path from 'config/path';

import AccountTemplate from 'components/atomic/templates/AccountTemplate';
import Header from 'components/atomic/containers/Header';
import ResetPassword from 'components/atomic/LV3/ResetPassword';

import { authActions } from 'redux/modules/auth';

import ErrorMessage from 'strings';

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
    window.scrollTo(0, 0);

    const { dispatch } = this.props;
    dispatch(authActions.initPasswordReset());
  }

  onClickSend = () => {
    if (!this.validate()) {
      this.setState({
        hasChanged: false,
        errors: [ErrorMessage.InvalidEmail],
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
        dispErrors.push(ErrorMessage.FailedResetPassword);
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
  resetError: state.auth.error,
});

export default connect(
  ResetPasswordContainer,
  mapStateToProps,
);
