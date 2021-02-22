import React, { Component } from 'react';
import { connect } from 'react-redux';
import Path from 'config/path';
import authActions from 'redux/sagas/auth/generators';
import AccountTemplate from 'components/templates/AccountTemplate';
import LoadingPage from 'components/LV3/LoadingPage';
import RegisterEmail from 'components/LV3/RegisterEmail';

class SignUpPage extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(authActions.checkRedirect());
  }

  render() {
    const { isInitialized, isChecking, user, router } = this.props;

    if (!isInitialized || isChecking) {
      return <LoadingPage />;
    }

    if (user.id) {
      router.push(Path.top());
      return null;
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
