import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import Path from 'config/path';
import { authActions } from 'redux/modules/auth';
import AccountTemplate from 'components/templates/AccountTemplate';
import LoadingPage from '../../LV3/LoadingPage';
import RegisterEmail from './RegisterEmail';

class SignUpPage extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(authActions.checkRedirect());
  }

  render() {
    const { isInitialized, isChecking, user } = this.props;

    if (!isInitialized || isChecking) {
      return <LoadingPage />;
    }

    if (user.id) {
      return <Redirect to={Path.top()} />;
    }

    return <AccountTemplate title="新規登録" form={<RegisterEmail {...this.props} />} />;
  }
}

const mapStateToProps = state => ({
  user: state.auth.user,
  isRegistering: state.auth.isRegistering, // TODO isRegisteringとisCheckingの役割整理
  isChecking: state.auth.isChecking,
  isLoading: state.user.isLoading,
  errorMessage: state.auth.errorMessage,
  isInitialized: state.init.isInitialized,
});

export default connect(mapStateToProps)(SignUpPage);
